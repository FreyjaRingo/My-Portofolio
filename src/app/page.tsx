"use client";

import {
  Activity,
  ArrowUpRight,
  BadgeJapaneseYen,
  BarChart3,
  BriefcaseBusiness,
  CandlestickChart,
  Download,
  GraduationCap,
  Languages,
  Mail,
  Radio,
  Sparkles,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { portfolioData } from "@/data/portfolio";

const panelIn = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const statusClassMap: Record<string, string> = {
  LIVE: "status-buy",
  CLOSED: "status-closed",
  TRAINING: "status-training",
};

const getStatusClass = (status: string) =>
  statusClassMap[status.trim().toUpperCase()] ?? "status-neutral";

export default function Home() {
  return (
    <main className="terminal-shell min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--surface-border)] bg-[var(--background)]/95 backdrop-blur">
        <div className="flex min-h-12 flex-col border-b border-[var(--surface-border)] lg:flex-row lg:items-center">
          <div className="flex items-center gap-3 border-b border-[var(--surface-border)] px-4 py-3 lg:w-[360px] lg:border-b-0 lg:border-r">
            <CandlestickChart className="h-5 w-5 text-[var(--terminal-amber)]" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Bloomberg-inspired personal terminal
              </p>
              <p className="text-sm font-bold text-white">
                {portfolioData.personal.ticker} / PORTFOLIO MONITOR
              </p>
            </div>
          </div>
          <nav className="flex flex-1 items-center gap-1 overflow-x-auto px-2 py-2 text-[11px] uppercase">
            {["Overview", "Experience", "Projects", "Skills", "Education"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="market-tab"
                >
                  {item}
                </a>
              ),
            )}
          </nav>
          <div className="hidden border-l border-[var(--surface-border)] px-4 py-3 text-right text-xs lg:block">
            <p className="text-[var(--muted)]">SESSION</p>
            <p className="font-bold text-[var(--positive)]">LIVE / ASIA-JKT</p>
          </div>
        </div>

        <div className="ticker-tape text-[11px] uppercase">
          <div className="ticker-track">
            {[...portfolioData.terminalTape, ...portfolioData.terminalTape].map(
              (item, index) => (
                <span key={`${item.label}-${index}`} className="ticker-item">
                  <span className="text-[var(--muted)]">{item.label}</span>
                  <span className="text-white">{item.value}</span>
                  <span className="text-[var(--positive)]">{item.trend}</span>
                </span>
              ),
            )}
          </div>
        </div>
      </header>

      <section
        id="overview"
        className="grid gap-px bg-[var(--surface-border)] p-px lg:grid-cols-[1.35fr_0.65fr]"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={panelIn}
          transition={{ duration: 0.4 }}
          className="terminal-panel min-h-[560px] p-5 md:p-8"
        >
          <div className="mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase">
            <span className="terminal-chip bg-[var(--terminal-amber)] text-black">
              Equity Research Note
            </span>
            <span className="terminal-chip">Data desk active</span>
            <span className="terminal-chip text-[var(--jp-pink)]">
              オタク・マーケット
            </span>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1fr_280px]">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[var(--terminal-amber)]">
                {portfolioData.personal.alias}
              </p>
              <h1 className="max-w-5xl text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl xl:text-7xl">
                {portfolioData.personal.name}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--foreground)] md:text-lg">
                {portfolioData.personal.summary}
              </p>
            </div>

            <div className="terminal-card jp-card">
              <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3">
                <div>
                  <p className="text-[11px] uppercase text-[var(--muted)]">
                    Language Alpha
                  </p>
                  <p className="font-bold text-white">JLPT N2 Certified</p>
                </div>
                <Languages className="h-5 w-5 text-[var(--jp-pink)]" />
              </div>
              <div className="py-5">
                <p className="text-5xl font-black text-[var(--jp-pink)]">
                  日本語
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                  Japanese-ready operator with an otaku-coded curiosity for
                  systems, story worlds, and disciplined craft.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-[var(--surface-border)] text-xs">
                <div className="bg-[var(--surface)] p-3">
                  <p className="text-[var(--muted)]">LEVEL</p>
                  <p className="font-bold text-white">N2</p>
                </div>
                <div className="bg-[var(--surface)] p-3">
                  <p className="text-[var(--muted)]">SIGNAL</p>
                  <p className="font-bold text-[var(--positive)]">STRONG</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-px bg-[var(--surface-border)] sm:grid-cols-2 xl:grid-cols-4">
            {portfolioData.kpis.map((kpi) => (
              <div key={kpi.label} className="stat-cell">
                <p className="text-[11px] uppercase text-[var(--muted)]">
                  {kpi.label}
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {kpi.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-[var(--foreground)]">
                  {kpi.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-px bg-[var(--surface-border)] md:grid-cols-[1fr_auto_auto]">
            <div className="bg-[var(--surface)] p-4">
              <p className="text-[11px] uppercase text-[var(--muted)]">
                Current Thread
              </p>
              <p className="mt-2 text-sm leading-6 text-white">
                {portfolioData.personal.currentThread}
              </p>
            </div>
            <a
              href={portfolioData.personal.cv}
              className="action-cell"
              target="_blank"
              rel="noreferrer"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="action-cell"
            >
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </div>
        </motion.div>

        <motion.aside
          initial="hidden"
          animate="visible"
          variants={panelIn}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="terminal-panel p-5"
        >
          <div className="terminal-title">
            <Radio className="h-4 w-4 text-[var(--positive)]" />
            Market Pulse
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["FOCUS", "Financial data product strategy"],
              ["MODEL", "ML, NLP, CV, Decision Support"],
              ["STACK", "Python, SQL, Streamlit, VBA"],
              ["LOCATION", portfolioData.personal.location],
            ].map(([label, value]) => (
              <div key={label} className="quote-row">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="mt-6 terminal-card p-4">
            <p className="text-xs uppercase text-[var(--terminal-amber)]">
              Akihabara Watchlist
            </p>
            <div className="mt-4 space-y-3 text-sm">
              {[
                ["JLPT N2", "Language alpha"],
                ["Anime literacy", "Culture radar"],
                ["Data storytelling", "Insight arc"],
                ["Discipline", "Shonen training loop"],
              ].map(([name, note]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-4 border-b border-[var(--surface-border)] pb-2 last:border-0"
                >
                  <span className="text-white">{name}</span>
                  <span className="text-xs text-[var(--muted)]">{note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-px bg-[var(--surface-border)]">
            {["Python", "SQL", "NLP", "YOLO", "VBA", "JP-N2"].map((skill) => (
              <div key={skill} className="heat-cell">
                {skill}
              </div>
            ))}
          </div>
        </motion.aside>
      </section>

      <section className="grid gap-px bg-[var(--surface-border)] p-px xl:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={panelIn}
          id="experience"
          className="terminal-panel"
        >
          <PanelHeader
            icon={<BriefcaseBusiness className="h-4 w-4" />}
            label="Experience Blotter"
            code="EXP"
          />
          <div className="overflow-x-auto">
            <table className="market-table">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Position</th>
                  <th>Desk</th>
                  <th>Period</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.experience.map((item) => (
                  <tr key={item.id}>
                    <td className="text-[var(--terminal-amber)]">{item.id}</td>
                    <td>
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="mt-1 max-w-xl text-[11px] leading-5 text-[var(--muted)]">
                        {item.descriptions.join(" ")}
                      </p>
                    </td>
                    <td>{item.company}</td>
                    <td>{item.period}</td>
                    <td>
                      <span
                        className={getStatusClass(item.status)}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={panelIn}
          id="projects"
          className="terminal-panel"
        >
          <PanelHeader
            icon={<BarChart3 className="h-4 w-4" />}
            label="Project Watchlist"
            code="PRJ"
          />
          <div className="grid gap-px bg-[var(--surface-border)]">
            {portfolioData.projects.map((project) => (
              <article key={project.id} className="project-row">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] text-[var(--terminal-amber)]">
                      {project.id} / {project.stack}
                    </p>
                    <h2 className="mt-1 text-lg font-black text-white">
                      {project.title}
                    </h2>
                  </div>
                  <span className="signal-pill">{project.signal}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">
                  {project.thesis}
                </p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="grid gap-px bg-[var(--surface-border)] p-px lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={panelIn}
          id="education"
          className="terminal-panel"
        >
          <PanelHeader
            icon={<GraduationCap className="h-4 w-4" />}
            label="Education & Awards"
            code="EDU"
          />
          <div className="grid gap-px bg-[var(--surface-border)]">
            {portfolioData.education.map((item) => (
              <div key={item.title} className="bg-[var(--surface)] p-5">
                <p className="text-xs uppercase text-[var(--muted)]">
                  {item.period}
                </p>
                <h2 className="mt-2 text-xl font-black text-white">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--foreground)]">
                  {item.subtitle}
                </p>
                <p className="mt-3 font-bold text-[var(--positive)]">
                  {item.meta}
                </p>
              </div>
            ))}
          </div>
          <div className="p-5">
            <p className="mb-3 text-xs uppercase text-[var(--terminal-amber)]">
              Honors
            </p>
            <div className="space-y-2">
              {portfolioData.awards.map((award) => (
                <p key={award} className="flex gap-2 text-sm text-white">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--jp-pink)]" />
                  {award}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={panelIn}
          id="skills"
          className="terminal-panel"
        >
          <PanelHeader
            icon={<Terminal className="h-4 w-4" />}
            label="Skill Heatmap"
            code="SKL"
          />
          <div className="grid gap-px bg-[var(--surface-border)] md:grid-cols-2">
            {Object.entries(portfolioData.skills).map(([category, skills]) => (
              <div key={category} className="skill-panel">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-black uppercase text-white">{category}</h2>
                  <Activity className="h-4 w-4 text-[var(--positive)]" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <footer className="flex flex-col gap-3 border-t border-[var(--surface-border)] p-5 text-sm md:flex-row md:items-center md:justify-between">
            <p className="text-[var(--muted)]">
              root@athallah-terminal:~$ open bilingual_data_strategy.deck
            </p>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-bold uppercase text-[var(--terminal-amber)]"
            >
              LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </footer>
        </motion.div>
      </section>
    </main>
  );
}

function PanelHeader({
  icon,
  label,
  code,
}: {
  icon: ReactNode;
  label: string;
  code: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--surface-border)] bg-[var(--panel-header)] px-4 py-3 text-xs uppercase">
      <div className="flex items-center gap-2 font-bold text-[var(--terminal-amber)]">
        {icon}
        {label}
      </div>
      <div className="flex items-center gap-2 text-[var(--muted)]">
        <BadgeJapaneseYen className="h-4 w-4 text-[var(--jp-pink)]" />
        {code} / 東京-データ
      </div>
    </div>
  );
}
