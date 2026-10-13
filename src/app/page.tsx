"use client";

import {
  ArrowUpRight,
  Download,
  GitBranch,
  Link2,
  Mail,
  AtSign,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { portfolioData } from "@/data/portfolio";

const { personal } = portfolioData;

const sections = [
  { id: "overview", code: "DES", label: "Overview" },
  { id: "experience", code: "EXP", label: "Experience" },
  { id: "projects", code: "PRJ", label: "Projects" },
  { id: "skills", code: "SKL", label: "Skills" },
  { id: "contact", code: "CNT", label: "Contact" },
];

const statusMeta: Record<string, { label: string; tone: string }> = {
  LIVE: { label: "Active", tone: "up" },
  TRAINING: { label: "In training", tone: "info" },
  CLOSED: { label: "Completed", tone: "flat" },
};

const socialIcon: Record<string, ReactNode> = {
  GitHub: <GitBranch className="h-4 w-4" aria-hidden />,
  LinkedIn: <Link2 className="h-4 w-4" aria-hidden />,
  Email: <Mail className="h-4 w-4" aria-hidden />,
  Instagram: <AtSign className="h-4 w-4" aria-hidden />,
};

const pulse = [
  ["Focus", "Financial data products"],
  ["Models", "Forecasting, NLP, recommenders"],
  ["Stack", "Python, SQL, Streamlit, Next.js"],
  ["Based in", personal.location],
];

export default function Home() {
  const active = useActiveSection();

  return (
    <div className="site">
      <a href="#overview" className="skip-link">
        Skip to content
      </a>

      <header className="topbar">
        <div className="topbar-row">
          <a href="#overview" className="brand" aria-label="Back to top">
            <span className="brand-ticker">{personal.ticker}</span>
            <span className="brand-name">Athallah Azhar</span>
          </a>
          <nav className="fn-nav" aria-label="Sections">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="fn-key"
                aria-current={active === s.id ? "true" : undefined}
              >
                <kbd>{s.code}</kbd>
                <span>{s.label}</span>
              </a>
            ))}
          </nav>
          <JakartaClock />
        </div>
        <Ticker />
      </header>

      <main>
        <Hero />
        <Experience />
        <Projects />
        <SkillsAndEducation />
        <Contact />
      </main>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} Athallah Azhar Aulia Hadi
        </span>
        <span className="mono">Built with Next.js. Not investment advice.</span>
      </footer>
    </div>
  );
}

/* ---------- Header pieces ---------- */

function JakartaClock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="clock" aria-label="Local time in Jakarta">
      <span className="clock-zone">JKT</span>
      <span className="clock-time">{now ?? "--:--:--"}</span>
      <span className="clock-zone">WIB</span>
    </div>
  );
}

function Ticker() {
  const items = portfolioData.terminalTape;
  return (
    <div className="ticker" aria-label="Highlights">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="ticker-list" aria-hidden={copy === 1}>
            {items.map((item) => (
              <li key={`${copy}-${item.label}`}>
                <span className="t-label">{item.label}</span>
                <span className="t-value">{item.value}</span>
                <span className="t-trend">▲ {item.trend}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const reduce = useReducedMotion();
  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: 0.08 * i, ease: [0.2, 0.7, 0.2, 1] as const },
        };

  const photo = personal.media.find((m) => m.src);

  return (
    <section id="overview" className="hero" aria-labelledby="hero-name">
      <div className="cmdline" aria-hidden>
        <span className="cmd-ticker">ATHL JK</span>
        <span className="cmd-mkt">&lt;Equity&gt;</span>
        <span className="cmd-fn">DES</span>
        <span className="cmd-go">&lt;GO&gt;</span>
        <span className="caret" />
      </div>

      <div className="hero-grid">
        <div className="hero-main">
          <motion.p className="hero-role" {...rise(0)}>
            {personal.role}
          </motion.p>
          <motion.h1 id="hero-name" className="hero-name" {...rise(1)}>
            Athallah Azhar
            <br />
            Aulia Hadi
          </motion.h1>
          <motion.p className="hero-summary" {...rise(2)}>
            {personal.summary}
          </motion.p>

          <motion.div className="hero-now" {...rise(3)}>
            <span className="now-dot" aria-hidden />
            <p>
              <span className="now-label">Now</span>
              {personal.currentThread}
            </p>
          </motion.div>

          <motion.div className="hero-actions" {...rise(4)}>
            <a href={personal.cv} className="btn btn-primary" target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" aria-hidden />
              Download CV
            </a>
            <a href={personal.linkedin} className="btn" target="_blank" rel="noreferrer">
              LinkedIn
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={personal.github} className="btn" target="_blank" rel="noreferrer">
              GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>
        </div>

        <motion.aside className="hero-side" {...rise(2)}>
          {photo ? (
            <figure className="portrait">
              <NextImage
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
                className="portrait-img"
              />
              <figcaption className="portrait-cap mono">
                <span>{personal.ticker}</span>
                <span>{personal.alias.split("/").pop()?.trim()}</span>
              </figcaption>
            </figure>
          ) : null}
          <dl className="pulse">
            {pulse.map(([k, v]) => (
              <div key={k} className="pulse-row">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>

      <dl className="kpis">
        {portfolioData.kpis.map((kpi) => (
          <div key={kpi.label} className="kpi">
            <dt className="kpi-label">{kpi.label}</dt>
            <dd className="kpi-value">{kpi.value}</dd>
            <dd className="kpi-detail">{kpi.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------- Experience ---------- */

function Experience() {
  return (
    <section id="experience" className="block" aria-labelledby="exp-title">
      <SectionHead
        code="EXP"
        id="exp-title"
        title="Experience"
        note={`${portfolioData.experience.length} positions`}
      />
      <ol className="blotter">
        {portfolioData.experience.map((item) => {
          const status = statusMeta[item.status.toUpperCase()] ?? {
            label: item.status,
            tone: "flat",
          };
          const image = item.media.find((m) => m.src);
          return (
            <li key={item.id} className="trade">
              <div className="trade-meta">
                <span className="mono trade-period">{item.period}</span>
                <span className={`status status-${status.tone}`}>{status.label}</span>
              </div>
              <div className="trade-body">
                <p className="trade-company">{item.company}</p>
                <h3 className="trade-title">{item.title}</h3>
                <ul className="trade-notes">
                  {item.descriptions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              {image ? (
                <div className="trade-media">
                  <NextImage src={image.src} alt={image.alt} fill sizes="240px" className="cover" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ---------- Projects ---------- */

function Projects() {
  return (
    <section id="projects" className="block" aria-labelledby="prj-title">
      <SectionHead
        code="PRJ"
        id="prj-title"
        title="Projects"
        note="Selected work"
      />
      <div className="projects">
        {portfolioData.projects.map((p) => {
          const image = p.media.find((m) => m.src);
          return (
            <article key={p.id} className="project">
              <div className="project-chart">
                {image ? (
                  <NextImage src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="cover" />
                ) : (
                  <Sparkline seed={p.id} />
                )}
                <span className="project-id mono">{p.id}</span>
                <span className="project-signal mono">{p.signal}</span>
              </div>
              <div className="project-body">
                <p className="project-period mono">{p.period}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-text">{p.thesis}</p>
                <ul className="tags" aria-label="Tools">
                  {p.stack.split(",").map((t) => (
                    <li key={t}>{t.trim()}</li>
                  ))}
                </ul>
                {p.links.length ? (
                  <div className="project-links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Sparkline({ seed }: { seed: string }) {
  const { line, area } = useMemo(() => {
    let h = 2166136261;
    for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    const rand = () => {
      h = Math.imul(h ^ (h >>> 15), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return ((h ^= h >>> 16) >>> 0) / 4294967296;
    };
    const n = 32;
    const pts: number[] = [];
    let v = 0.35 + rand() * 0.2;
    for (let i = 0; i < n; i++) {
      v += (rand() - 0.42) * 0.12;
      v = Math.min(0.72, Math.max(0.12, v));
      pts.push(v);
    }
    const coords = pts.map((y, i) => `${(i / (n - 1)) * 300},${(1 - y) * 100}`);
    return {
      line: coords.join(" "),
      area: `0,100 ${coords.join(" ")} 300,100`,
    };
  }, [seed]);

  return (
    <svg className="spark" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden>
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" x2="300" y1={y} y2={y} className="spark-grid" />
      ))}
      <polygon points={area} className="spark-area" />
      <polyline points={line} className="spark-line" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* ---------- Skills & education ---------- */

function SkillsAndEducation() {
  const jp = portfolioData.japanese;
  return (
    <section id="skills" className="block" aria-labelledby="skl-title">
      <SectionHead code="SKL" id="skl-title" title="Skills and education" />
      <div className="split">
        <div className="skills">
          {Object.entries(portfolioData.skills).map(([cat, list]) => (
            <div key={cat} className="skill-group">
              <h3 className="group-title">{cat}</h3>
              <ul className="tags">
                {list.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="jp-panel">
            <div className="jp-head">
              <span className="jp-big" lang="ja">
                {jp.headline}
              </span>
              <div>
                <p className="jp-title">JLPT N2</p>
                <p className="jp-motto" lang="ja">
                  {jp.motto}
                </p>
              </div>
            </div>
            <dl className="jp-words">
              {jp.watchlist.map((w) => (
                <div key={w.romaji}>
                  <dt lang="ja">{w.term}</dt>
                  <dd>
                    <span className="mono">{w.romaji}</span>
                    {w.meaning}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="edu">
          <ol className="edu-list">
            {portfolioData.education.map((e) => (
              <li key={e.title} className="edu-item">
                <span className="mono edu-period">{e.period}</span>
                <h3 className="edu-title">{e.title}</h3>
                <p className="edu-sub">{e.subtitle}</p>
                <p className="mono edu-meta">{e.meta}</p>
              </li>
            ))}
          </ol>
          <h3 className="group-title">Honors</h3>
          <ul className="awards">
            {portfolioData.awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h3 className="group-title group-gap">Certifications</h3>
          <ul className="awards">
            {portfolioData.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <section id="contact" className="block contact" aria-labelledby="cnt-title">
      <SectionHead code="CNT" id="cnt-title" title="Contact" />
      <div className="contact-grid">
        <div>
          <p className="contact-lead">
            Open to internships and projects in data, AI, and financial products.
          </p>
          <a href={`mailto:${personal.email}`} className="contact-mail">
            {personal.email}
          </a>
        </div>
        <ul className="socials">
          {portfolioData.socialLinks
            .filter((l) => !l.href.startsWith("mailto:"))
            .map((l) => {
            const external = !l.href.startsWith("mailto:");
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="social"
                >
                  <span className="social-icon">{socialIcon[l.label] ?? <ArrowUpRight className="h-4 w-4" />}</span>
                  <span className="social-label">{l.label}</span>
                  <span className="social-handle mono">{l.handle}</span>
                  <ArrowUpRight className="social-arrow h-4 w-4" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Shared ---------- */

function SectionHead({
  code,
  id,
  title,
  note,
}: {
  code: string;
  id: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="section-head">
      <kbd className="section-code">{code}</kbd>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {note ? <span className="section-note mono">{note}</span> : null}
    </div>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}
