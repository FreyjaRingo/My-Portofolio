import { GitBranch, Star } from "lucide-react";
import { getGithubActivity, GITHUB_USER, streaks, toWeeks, type Day } from "@/lib/github";

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 26;
const TOP = 16;

// Site palette, in rank order, so the bar matches the rest of the terminal.
const LANG_COLORS = ["var(--amber)", "var(--up)", "var(--info)", "var(--jp)", "#c9a86a", "var(--muted)"];

const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
const dayFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const pushedFmt = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "Asia/Jakarta" });
const stampFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Jakarta",
});

const d = (iso: string) => new Date(`${iso}T00:00:00Z`);

export async function GithubActivity() {
  const data = await getGithubActivity();
  const profile = `https://github.com/${GITHUB_USER}`;

  // During ISR regeneration a failed fetch should keep the last good page,
  // so throw instead of rendering an empty section. At build time, degrade.
  const runtime = process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build";
  if (runtime && (!data || !data.days || !data.repos.length) && !process.env.GITHUB_ACTIVITY_FIXTURE) {
    throw new Error("GitHub activity unavailable; keeping the cached page");
  }

  if (!data) {
    return (
      <div className="gh-fallback">
        <p>Live GitHub activity could not be loaded right now.</p>
        <a className="btn" href={profile} target="_blank" rel="noreferrer">
          <GitBranch className="h-4 w-4" aria-hidden /> Open GitHub profile
        </a>
      </div>
    );
  }

  const s = data.days ? streaks(data.days) : null;
  const langTotal = data.languages.reduce((a, l) => a + l.count, 0);
  const langs = data.languages.length > 5
    ? [...data.languages.slice(0, 5), { name: "Other", count: data.languages.slice(5).reduce((a, l) => a + l.count, 0) }]
    : data.languages;

  return (
    <div className="gh">
      <dl className="gh-stats">
        <div className="kpi">
          <dt className="kpi-label">Contributions, last 12 months</dt>
          <dd className="kpi-value">{data.total ?? "–"}</dd>
        </div>
        <div className="kpi">
          <dt className="kpi-label">Active days</dt>
          <dd className="kpi-value">{s ? s.active : "–"}</dd>
        </div>
        <div className="kpi">
          <dt className="kpi-label">Longest streak</dt>
          <dd className="kpi-value">{s ? `${s.longest}d` : "–"}</dd>
        </div>
        <div className="kpi">
          <dt className="kpi-label">Public repositories</dt>
          <dd className="kpi-value">{data.publicRepos ?? "–"}</dd>
        </div>
      </dl>

      {data.days ? <Heatmap days={data.days} /> : null}

      <div className="gh-lower">
        {langs.length ? (
          <div className="gh-langs">
            <p className="gh-sub mono">Primary language, by repository</p>
            <div className="gh-bar" role="img" aria-label={langs.map((l) => `${l.name} ${l.count}`).join(", ")}>
              {langs.map((l, i) => (
                <span key={l.name} style={{ flexGrow: l.count, background: LANG_COLORS[i] }} />
              ))}
            </div>
            <ul className="gh-legend">
              {langs.map((l, i) => (
                <li key={l.name}>
                  <span className="gh-dot" style={{ background: LANG_COLORS[i] }} aria-hidden />
                  {l.name}
                  <span className="mono gh-pct">{Math.round((l.count / langTotal) * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {data.repos.length ? (
          <div className="gh-repos">
            <p className="gh-sub mono">Recently pushed</p>
            <ul>
              {data.repos.map((r) => (
                <li key={r.name}>
                  <a href={r.url} target="_blank" rel="noreferrer" className="gh-repo">
                    <span className="gh-repo-name mono">{r.name}</span>
                    {r.description ? <span className="gh-repo-desc">{r.description}</span> : null}
                    <span className="gh-repo-meta mono">
                      {r.language ? <span>{r.language}</span> : null}
                      {r.stars ? (
                        <span>
                          <Star className="h-3 w-3" aria-hidden /> {r.stars}
                        </span>
                      ) : null}
                      <span>{pushedFmt.format(new Date(r.pushedAt))}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <p className="gh-foot mono">
        <span>Data from GitHub · refreshed every 6 hours · last {stampFmt.format(new Date(data.fetchedAt))} WIB</span>
        <a href={profile} target="_blank" rel="noreferrer">
          github.com/{GITHUB_USER} ↗
        </a>
      </p>
    </div>
  );
}

function Heatmap({ days }: { days: Day[] }) {
  const weeks = toWeeks(days);
  const width = LEFT + weeks.length * STEP;
  const height = TOP + 7 * STEP;

  // Month label wherever a column starts a new month; skip labels that would collide.
  const months: { x: number; label: string }[] = [];
  let prevMonth = -1;
  weeks.forEach((w, i) => {
    const first = w.find(Boolean);
    if (!first) return;
    const m = d(first.date).getUTCMonth();
    if (m === prevMonth) return;
    prevMonth = m;
    const x = LEFT + i * STEP;
    if (months.length && x - months[months.length - 1].x < STEP * 3) return;
    months.push({ x, label: monthFmt.format(d(first.date)) });
  });

  const total = days.reduce((a, x) => a + x.count, 0);
  return (
    <figure className="gh-heat">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${total} contributions from ${dayFmt.format(d(days[0].date))} to ${dayFmt.format(d(days[days.length - 1].date))}`}
      >
        {months.map((m) => (
          <text key={`${m.x}`} x={m.x} y={10} className="gh-axis">
            {m.label}
          </text>
        ))}
        {[1, 3, 5].map((r) => (
          <text key={r} x={0} y={TOP + r * STEP + CELL - 1} className="gh-axis">
            {["", "Mon", "", "Wed", "", "Fri", ""][r]}
          </text>
        ))}
        {weeks.map((w, i) =>
          w.map((c, r) =>
            c ? (
              <rect key={c.date} x={LEFT + i * STEP} y={TOP + r * STEP} width={CELL} height={CELL} rx={2} className={`gh-l${c.level}`}>
                <title>{`${c.count} contribution${c.count === 1 ? "" : "s"} on ${dayFmt.format(d(c.date))}`}</title>
              </rect>
            ) : null,
          ),
        )}
      </svg>
      <figcaption className="gh-scale mono" aria-hidden>
        Less
        {[0, 1, 2, 3, 4].map((l) => (
          <svg key={l} width={CELL} height={CELL} viewBox={`0 0 ${CELL} ${CELL}`}>
            <rect width={CELL} height={CELL} rx={2} className={`gh-l${l}`} />
          </svg>
        ))}
        More
      </figcaption>
    </figure>
  );
}
