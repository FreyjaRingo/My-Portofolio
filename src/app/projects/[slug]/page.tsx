import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getProject, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} | Athallah Azhar`,
    description: p.tagline,
    openGraph: { title: p.title, description: p.tagline, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <article className="case" aria-labelledby="case-title">
        <nav className="crumbs mono" aria-label="Breadcrumb">
          <Link href="/#projects" transitionTypes={["nav-back"]}>
            Projects
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{p.code}</span>
        </nav>

        <header className="case-head">
          <p className="case-kicker mono">
            <span className="case-code">{p.code}</span>
            {p.domains.join(" · ")}
          </p>
          <h1 id="case-title" className="case-title">
            {p.title}
          </h1>
          <p className="case-tagline">{p.tagline}</p>

          <dl className="case-strip">
            <div>
              <dt>Period</dt>
              <dd>{p.period}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>{p.team}</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>{p.context}</dd>
            </div>
          </dl>
        </header>

        <figure className="case-cover">
          <ViewTransition name={`cover-${p.slug}`} share="morph">
            <Image
              src={p.cover.src}
              alt={p.cover.alt}
              width={p.cover.width}
              height={p.cover.height}
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="case-cover-img"
            />
          </ViewTransition>
        </figure>

        <div className="case-grid">
          <div className="case-main">
            <section className="case-section" aria-labelledby="sec-problem">
              <h2 id="sec-problem" className="case-h2">
                Problem
              </h2>
              <p className="case-lead">{p.problem}</p>
            </section>

            <section className="case-section" aria-labelledby="sec-approach">
              <h2 id="sec-approach" className="case-h2">
                Approach
              </h2>
              <ul className="steps">
                {p.approach.map((s) => (
                  <li key={s.title} className="step">
                    <h3 className="step-title">{s.title}</h3>
                    <p className="step-body">{s.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="case-section" aria-labelledby="sec-results">
              <h2 id="sec-results" className="case-h2">
                Results
              </h2>
              <ul className="results">
                {p.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </section>

            {p.gallery.length ? (
              <section className="case-section" aria-labelledby="sec-gallery">
                <h2 id="sec-gallery" className="case-h2">
                  More from the project
                </h2>
                <div className="gallery">
                  {p.gallery.map((g) => (
                    <figure key={g.src} className={`gallery-item ${g.height > g.width ? "gallery-tall" : ""}`}>
                      <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(max-width: 900px) 100vw, 800px" />
                      {g.caption ? <figcaption>{g.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="case-side" aria-label="Key facts">
            <div className="factsheet">
              <p className="factsheet-head mono">Key facts</p>
              <dl>
                <div className="fact fact-signal">
                  <dt>{p.signal.label}</dt>
                  <dd>{p.signal.value}</dd>
                </div>
                {p.facts.map((f) => (
                  <div key={f.label} className="fact">
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="factsheet-head mono">Stack</p>
              <ul className="tags">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {p.links.length ? (
                <div className="factsheet-links">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={`btn ${l.label === "Live" ? "btn-primary" : ""}`}>
                      {l.label === "Live" ? "Open live site" : "View code"}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="factsheet-note">No public link. Material is from the project report and slides.</p>
              )}
            </div>
          </aside>
        </div>

        <nav className="case-pager" aria-label="More projects">
          <Link href={`/projects/${prev.slug}`} className="pager-link" transitionTypes={["nav-back"]}>
            <span className="pager-dir mono">Previous · {prev.code}</span>
            <span className="pager-title">{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="pager-link pager-next" transitionTypes={["nav-forward"]}>
            <span className="pager-dir mono">Next · {next.code}</span>
            <span className="pager-title">{next.title}</span>
          </Link>
        </nav>
      </article>
    </ViewTransition>
  );
}
