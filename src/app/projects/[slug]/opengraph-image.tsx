import { getProject, projects } from "@/data/projects";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug)!;
  return renderOg({ code: p.code, kicker: `Case study · ${p.period}`, title: p.title, sub: p.tagline });
}
