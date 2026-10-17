import Image from "next/image";
import Link from "next/link";
import { AtSign, Download, GitBranch, Link2, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { ExperienceList } from "@/components/ExperienceList";
import { GithubActivity } from "@/components/GithubActivity";
import { HeroCommand } from "@/components/HeroCommand";
import { T } from "@/components/LangProvider";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Sparkline } from "@/components/Sparkline";
import type { DictKey } from "@/data/i18n";
import { portfolioData } from "@/data/portfolio";

const { personal } = portfolioData;

const pulse = [
  ["Focus", "Financial data products"],
  ["Models", "Forecasting, NLP, recommenders"],
  ["Stack", "Python, SQL, Streamlit, Next.js"],
  ["Based in", personal.location],
];

const socialIcon: Record<string, ReactNode> = {
  GitHub: <GitBranch className="h-4 w-4" aria-hidden />,
  LinkedIn: <Link2 className="h-4 w-4" aria-hidden />,
  Email: <Mail className="h-4 w-4" aria-hidden />,
  Instagram: <AtSign className="h-4 w-4" aria-hidden />,
};

// Rebuild the page in the background at most every 6 hours so GitHub activity stays fresh.
export const revalidate = 21600;

export default async function Home() {
  const photo = personal.media.find((m) => m.src);

  return (
    <>
      <section id="overview" className="hero" aria-labelledby="hero-name">
        <div className="rise" style={{ "--d": 0 } as React.CSSProperties}>
          <HeroCommand />
        </div>

        <div className="hero-grid">
          <div className="hero-main">
            <p className="hero-role rise" style={{ "--d": 1 } as React.CSSProperties}>
              <T k="hero.role" />
            </p>
            <h1 id="hero-name" className="hero-name rise" style={{ "--d": 2 } as React.CSSProperties}>
              Athallah Azhar
              <br />
              Aulia Hadi
            </h1>
            <p className="hero-summary rise" style={{ "--d": 3 } as React.CSSProperties}>
              <T k="hero.summary" />
            </p>
            <div className="hero-now rise" style={{ "--d": 4 } as React.CSSProperties}>
              <p>
                <span className="now-label">
                  <T k="hero.nowLabel" />
                </span>
                <T k="hero.now" />
              </p>
            </div>
            <div className="hero-actions rise" style={{ "--d": 5 } as React.CSSProperties}>
              <a href={personal.cv} className="btn btn-primary" target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" aria-hidden />
                <T k="cta.cv" />
              </a>
              <a href={personal.linkedin} className="btn" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={personal.github} className="btn" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>

          <aside className="hero-side rise" style={{ "--d": 3 } as React.CSSProperties}>
            {photo ? (
              <figure className="portrait">
                <Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 559px) 100vw, (max-width: 1099px) 240px, 380px" className="portrait-img" />
                <figcaption className="portrait-cap mono">
                  <span>{personal.ticker}</span>
                  <span lang="ja">日本語 N2</span>
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
          </aside>
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

      <section id="experience" className="block" aria-labelledby="exp-title">
        <SectionHead code="EXP" id="exp-title" k="section.experience" note={`${portfolioData.experience.length} positions`} />
        <ExperienceList />
      </section>

      <section id="projects" className="block" aria-labelledby="prj-title">
        <SectionHead code="PRJ" id="prj-title" k="section.projects" noteKey="section.projectsNote" />
        <ProjectGrid />
      </section>

      <section id="github" className="block" aria-labelledby="git-title">
        <SectionHead code="GIT" id="git-title" k="section.github" noteKey="section.githubNote" />
        <GithubActivity />
      </section>

      <section id="lab" className="block" aria-labelledby="lab-title">
        <SectionHead code="LAB" id="lab-title" k="section.lab" />
        <Link href="/lab/fund-monitor" className="lab-teaser" transitionTypes={["nav-forward"]}>
          <div className="lab-teaser-chart">
            <Sparkline seed="fund-monitor-a" className="spark spark-a" />
            <Sparkline seed="fund-monitor-c" className="spark spark-b" />
          </div>
          <div className="lab-teaser-body">
            <p className="project-meta mono">Interactive demo · synthetic data</p>
            <h3 className="lab-teaser-title">
              <T k="lab.title" />
            </h3>
            <p className="lab-teaser-text">
              <T k="lab.blurb" />
            </p>
            <span className="btn btn-primary lab-teaser-cta">
              <T k="lab.open" />
            </span>
          </div>
        </Link>
      </section>

      <section id="skills" className="block" aria-labelledby="skl-title">
        <SectionHead code="SKL" id="skl-title" k="section.skills" />
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
            <JapanesePanel />
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
            <h3 className="group-title">
              <T k="honors" />
            </h3>
            <ul className="awards">
              {portfolioData.awards.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h3 className="group-title group-gap">
              <T k="certs" />
            </h3>
            <ul className="awards">
              {portfolioData.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="block contact" aria-labelledby="cnt-title">
        <SectionHead code="CNT" id="cnt-title" k="section.contact" />
        <div className="contact-grid">
          <div>
            <p className="contact-lead">
              <T k="contact.lead" />
            </p>
            <a href={`mailto:${personal.email}`} className="contact-mail">
              {personal.email}
            </a>
          </div>
          <ul className="socials">
            {portfolioData.socialLinks
              .filter((l) => !l.href.startsWith("mailto:"))
              .map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="social">
                    <span className="social-icon">{socialIcon[l.label]}</span>
                    <span className="social-label">{l.label}</span>
                    <span className="social-handle mono">{l.handle}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function SectionHead({ code, id, k, note, noteKey }: { code: string; id: string; k: DictKey; note?: string; noteKey?: DictKey }) {
  return (
    <div className="section-head">
      <kbd className="section-code">{code}</kbd>
      <h2 id={id} className="section-title">
        <T k={k} />
      </h2>
      {note || noteKey ? <span className="section-note mono">{noteKey ? <T k={noteKey} /> : note}</span> : null}
    </div>
  );
}

function JapanesePanel() {
  const jp = portfolioData.japanese;
  return (
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
  );
}
