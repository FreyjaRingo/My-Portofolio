// GitHub activity for the home page, fetched on the server and cached with ISR
// (see `revalidate` in app/page.tsx).
//
// Sources, in order:
// - Repositories: GitHub REST API (public, no token needed; 60 requests/hour per IP).
// - Contribution calendar: GitHub GraphQL when GITHUB_TOKEN is set (any token with
//   read:user works), otherwise the public github-contributions-api.jogruber.de mirror.
// Every source is optional. If one fails the section shows what it has.

import { readFile } from "node:fs/promises";

export const GITHUB_USER = "FreyjaRingo";
const REVALIDATE = 60 * 60 * 6;

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Repo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
};
export type GithubActivity = {
  days: Day[] | null; // oldest first, about one year
  total: number | null;
  repos: Repo[];
  publicRepos: number | null;
  languages: { name: string; count: number }[];
  fetchedAt: string;
};

const headers = (): HeadersInit => ({
  Accept: "application/vnd.github+json",
  "User-Agent": "athallah-portfolio",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
});

async function getJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(8000),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type RestRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
};

async function fetchRepos() {
  return getJson<RestRepo[]>(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner&sort=pushed`, {
    headers: headers(),
  });
}

const LEVEL: Record<string, Day["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

async function fetchCalendar(): Promise<{ days: Day[]; total: number } | null> {
  if (process.env.GITHUB_TOKEN) {
    type Gql = {
      data?: {
        user?: {
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: number;
              weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
            };
          };
        };
      };
    };
    const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
    const gql = await getJson<Gql>("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login: GITHUB_USER } }),
    });
    const cal = gql?.data?.user?.contributionsCollection.contributionCalendar;
    if (cal) {
      const days = cal.weeks.flatMap((w) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVEL[d.contributionLevel] ?? 0 })),
      );
      return { days, total: cal.totalContributions };
    }
  }

  type Mirror = { total?: Record<string, number>; contributions?: { date: string; count: number; level: number }[] };
  const m = await getJson<Mirror>(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`);
  if (!m?.contributions?.length) return null;
  const days = m.contributions
    .map((d) => ({ date: d.date, count: d.count, level: Math.max(0, Math.min(4, d.level)) as Day["level"] }))
    .sort((a, b) => a.date.localeCompare(b.date));
  return { days, total: m.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0) };
}

export async function getGithubActivity(): Promise<GithubActivity | null> {
  // Local test hook: render the section from a JSON file instead of the network.
  if (process.env.GITHUB_ACTIVITY_FIXTURE) {
    return JSON.parse(await readFile(process.env.GITHUB_ACTIVITY_FIXTURE, "utf8")) as GithubActivity;
  }

  const [rest, cal] = await Promise.all([fetchRepos(), fetchCalendar()]);
  if (!rest && !cal) return null;

  const own = (rest ?? []).filter((r) => !r.fork && !r.private && !r.archived);
  const counts = new Map<string, number>();
  for (const r of own) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  const languages = [...counts.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  return {
    days: cal?.days ?? null,
    total: cal?.total ?? null,
    repos: own
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      })),
    publicRepos: rest ? rest.filter((r) => !r.private).length : null,
    languages,
    fetchedAt: new Date().toISOString(),
  };
}

// ---- Derived numbers -------------------------------------------------------

export function streaks(days: Day[]) {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Current streak may end today or yesterday (today can still be empty).
  let current = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  for (; i >= 0 && days[i].count > 0; i--) current++;
  return { longest, current, active: days.filter((d) => d.count > 0).length };
}

/** Columns of 7 days (Sunday first), padded at the start so weeks line up. */
export function toWeeks(days: Day[]): (Day | null)[][] {
  if (!days.length) return [];
  const first = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array<null>(first).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
