"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useState, ViewTransition } from "react";
import { domains, projects, type Domain } from "@/data/projects";
import { useT } from "./LangProvider";

export function ProjectGrid() {
  const t = useT();
  const [filter, setFilter] = useState<Domain | "All">("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.domains.includes(filter));

  const counts = Object.fromEntries(domains.map((d) => [d, projects.filter((p) => p.domains.includes(d)).length]));

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by domain">
        {(["All", ...domains] as const).map((d) => (
          <button
            key={d}
            type="button"
            className="filter-chip"
            aria-pressed={filter === d}
            onClick={() => startTransition(() => setFilter(d))}
          >
            {d === "All" ? t("filter.all") : d}
            <span className="filter-count mono">{d === "All" ? projects.length : counts[d]}</span>
          </button>
        ))}
      </div>

      <ul className="projects" aria-live="polite">
        {visible.map((p, i) => (
          <ViewTransition key={p.slug} name={`card-${p.slug}`} share="auto" enter="auto" exit="auto" default="none">
            <li className={`project ${i === 0 && filter === "All" ? "project-lead" : ""}`}>
              <Link href={`/projects/${p.slug}`} className="project-link" transitionTypes={["nav-forward"]}>
                <div className="project-media">
                  <ViewTransition name={`cover-${p.slug}`} share="morph">
                    <Image
                      src={p.cover.src}
                      alt=""
                      width={p.cover.width}
                      height={p.cover.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="project-img"
                    />
                  </ViewTransition>
                  <span className="project-code mono">{p.code}</span>
                  <span className="project-signal mono">
                    {p.signal.value}
                    <span className="project-signal-label"> {p.signal.label}</span>
                  </span>
                </div>
                <div className="project-body">
                  <p className="project-meta mono">
                    {p.period} · {p.role}
                  </p>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-text">{p.tagline}</p>
                  <ul className="tags" aria-label="Tools">
                    {p.stack.slice(0, 4).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                    {p.stack.length > 4 ? <li className="tag-more">+{p.stack.length - 4}</li> : null}
                  </ul>
                  <span className="project-cta">{t("project.read")}</span>
                </div>
              </Link>
            </li>
          </ViewTransition>
        ))}
      </ul>
    </>
  );
}
