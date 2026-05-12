"use client";

import {
  Activity,
  ArrowUpRight,
  BadgeJapaneseYen,
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  CandlestickChart,
  Download,
  GitBranch,
  GraduationCap,
  Image as ImageIcon,
  Languages,
  Radio,
  Sparkles,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useMemo, useState } from "react";
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

const navItems = ["Overview", "Experience", "Projects", "Skills", "Media", "Waifu"];

const AUTO_ROTATE_MS = 3000;

const getStatusClass = (status: string) =>
  statusClassMap[status.trim().toUpperCase()] ?? "status-neutral";

type MediaItem = {
  src: string;
  alt: string;
  caption: string;
  slot: string;
};

export default function Home() {
  return (
    <main className="terminal-shell min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--surface-border)] bg-[var(--background)]/95 backdrop-blur">
        <div className="terminal-topbar">
          <div className="brand-cell">
            <CandlestickChart className="h-5 w-5 text-[var(--terminal-amber)]" />
            <div className="min-w-0">
              <p className="truncate text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-xs">
                Bloomberg-inspired personal terminal
              </p>
              <p className="truncate text-sm font-bold text-white">
                {portfolioData.personal.ticker} / PORTFOLIO MONITOR
              </p>
            </div>
          </div>
          <nav className="market-nav">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="market-tab"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="session-cell">
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

      <section id="overview" className="terminal-grid hero-grid">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={panelIn}
          transition={{ duration: 0.4 }}
          className="terminal-panel p-4 sm:p-6 lg:p-8"
        >
          <div className="terminal-chip-row">
            <span className="terminal-chip bg-[var(--terminal-amber)] text-black">
              Equity Research Note
            </span>
            <span className="terminal-chip">Data desk active</span>
            <span className="terminal-chip text-[var(--jp-pink)]">
              {portfolioData.japanese.market}
            </span>
          </div>

          <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_320px]">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[var(--terminal-amber)]">
                {portfolioData.personal.alias}
              </p>
              <h1 className="hero-title">{portfolioData.personal.name}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--foreground)] sm:text-base md:text-lg">
                {portfolioData.personal.summary}
              </p>
            </div>

            <MediaFrame
              media={portfolioData.personal.media}
              ratio="portrait"
              kicker="PROFILE_MEDIA"
            />
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

          <div className="mt-8 grid gap-px bg-[var(--surface-border)] lg:grid-cols-[1fr_auto_auto]">
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
              CV
            </a>
            <a
              href={portfolioData.personal.github}
              className="action-cell"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.aside
          initial="hidden"
          animate="visible"
          variants={panelIn}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="terminal-panel p-4 sm:p-5"
        >
          <PanelTitle icon={<Radio className="h-4 w-4" />} label="Market Pulse" />
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
            <div className="flex items-center justify-between gap-4 border-b border-[var(--surface-border)] pb-3">
              <div>
                <p className="text-[11px] uppercase text-[var(--muted)]">
                  Language Alpha
                </p>
                <p className="font-bold text-white">JLPT N2 Certified</p>
              </div>
              <Languages className="h-5 w-5 text-[var(--jp-pink)]" />
            </div>
            <p className="mt-5 text-5xl font-black text-[var(--jp-pink)]">
              {portfolioData.japanese.headline}
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">
              {portfolioData.japanese.motto}
            </p>
          </div>

          <div className="mt-6 grid gap-px bg-[var(--surface-border)]">
            {portfolioData.japanese.watchlist.map((item) => (
              <div key={item.romaji} className="jp-signal-row">
                <span className="text-2xl font-black text-[var(--jp-pink)]">
                  {item.term}
                </span>
                <div>
                  <p className="font-bold uppercase text-white">{item.romaji}</p>
                  <p className="text-xs text-[var(--muted)]">{item.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.aside>
      </section>

      <section className="terminal-grid social-grid">
        <div className="terminal-panel p-4 sm:p-5">
          <PanelTitle icon={<GitBranch className="h-4 w-4" />} label="Social Tickers" />
          <div className="mt-4 grid gap-px bg-[var(--surface-border)] md:grid-cols-3">
            {portfolioData.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="social-card"
              >
                <div>
                  <p className="text-xs uppercase text-[var(--muted)]">
                    {link.status}
                  </p>
                  <p className="mt-1 font-black text-white">{link.label}</p>
                  <p className="mt-2 text-xs text-[var(--foreground)]">
                    {link.handle}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--terminal-amber)]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="terminal-grid">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={panelIn}
          className="terminal-panel"
        >
          <PanelHeader
            icon={<BriefcaseBusiness className="h-4 w-4" />}
            label="Experience Blotter"
            code="EXP"
            jp={portfolioData.japanese.desk}
          />
          <div className="blotter-list">
            {portfolioData.experience.map((item) => (
              <article key={item.id} className="experience-card">
                <MediaFrame media={item.media} ratio="wide" kicker={item.id} />
                <div className="min-w-0 p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase text-[var(--terminal-amber)]">
                        {item.id} / {item.company}
                      </p>
                      <h2 className="mt-1 text-xl font-black text-white">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {item.period}
                      </p>
                    </div>
                    <span className={getStatusClass(item.status)}>
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {item.descriptions.map((desc) => (
                      <p key={desc} className="terminal-line">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="projects" className="terminal-grid project-grid">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={panelIn}
          className="terminal-panel"
        >
          <PanelHeader
            icon={<BarChart3 className="h-4 w-4" />}
            label="Project Watchlist"
            code="PRJ"
            jp={portfolioData.japanese.desk}
          />
          <div className="project-board">
            {portfolioData.projects.map((project) => (
              <article key={project.id} className="project-card">
                <MediaFrame media={project.media} ratio="wide" kicker={project.id} />
                <div className="p-4">
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
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="terminal-grid bottom-grid">
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
            jp={portfolioData.japanese.desk}
          />
          <div className="grid gap-px bg-[var(--surface-border)] sm:grid-cols-2">
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
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={panelIn}
          className="terminal-panel"
        >
          <PanelHeader
            icon={<GraduationCap className="h-4 w-4" />}
            label="Education & Awards"
            code="EDU"
            jp={portfolioData.japanese.desk}
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
      </section>

      <section id="media" className="terminal-grid">
        <div className="terminal-panel p-4 sm:p-5">
          <PanelTitle icon={<BookOpenText className="h-4 w-4" />} label="Media Template" />
          <div className="mt-4 grid gap-px bg-[var(--surface-border)] md:grid-cols-2 xl:grid-cols-4">
            {portfolioData.mediaGuide.map((path) => (
              <div key={path} className="media-guide-cell">
                <ImageIcon className="h-5 w-5 text-[var(--terminal-amber)]" />
                <p className="mt-3 break-all text-xs leading-5 text-white">
                  {path}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="waifu" className="terminal-grid waifu-grid">
        <div className="terminal-panel p-4 sm:p-5">
          <PanelTitle icon={<Sparkles className="h-4 w-4" />} label="Waifu Archive" />
          <div className="mt-4 grid gap-px bg-[var(--surface-border)] md:grid-cols-2 xl:grid-cols-3">
            {portfolioData.waifuGallery.items.map((waifu) => (
              <div key={waifu.name} className="waifu-card">
                <MediaFrame media={waifu.media} ratio="portrait" kicker={waifu.name} />
              </div>
            ))}
            <div className="waifu-card">
              <MediaFrame
                media={portfolioData.waifuGallery.realWaifu.media}
                ratio="portrait"
                kicker={portfolioData.waifuGallery.realWaifu.name}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PanelTitle({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="terminal-title">
      <span className="text-[var(--positive)]">{icon}</span>
      {label}
    </div>
  );
}

function PanelHeader({
  icon,
  label,
  code,
  jp,
}: {
  icon: ReactNode;
  label: string;
  code: string;
  jp: string;
}) {
  return (
    <div className="panel-header">
      <div className="flex items-center gap-2 font-bold text-[var(--terminal-amber)]">
        {icon}
        {label}
      </div>
      <div className="flex items-center gap-2 text-[var(--muted)]">
        <BadgeJapaneseYen className="h-4 w-4 text-[var(--jp-pink)]" />
        {code} / {jp}
      </div>
    </div>
  );
}

function MediaFrame({
  media,
  ratio = "wide",
  kicker,
  autoRotateMs = AUTO_ROTATE_MS,
}: {
  media: MediaItem[];
  ratio?: "wide" | "portrait";
  kicker: string;
  autoRotateMs?: number;
}) {
  const items = useMemo(
    () =>
      media.length
        ? media
        : [
            {
              src: "",
              alt: "Media placeholder",
              caption: "",
              slot: "MEDIA_SLOT",
            },
          ],
    [media],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, autoRotateMs);

    return () => window.clearInterval(intervalId);
  }, [items.length, autoRotateMs]);

  useEffect(() => {
    setActiveIndex((current) => (items.length ? current % items.length : 0));
  }, [items.length]);

  const activeItem = items[activeIndex] ?? items[0];
  const hasImage = Boolean(activeItem.src);

  return (
    <figure className={`media-frame media-frame-${ratio}`}>
      {hasImage ? (
        <div className="media-image-wrap">
          <NextImage
            key={`${activeItem.src || activeItem.slot}-${activeIndex}`}
            src={activeItem.src}
            alt={activeItem.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 420px"
            quality={90}
            className="media-image media-slide"
          />
        </div>
      ) : (
        <div className="media-placeholder">
          <ImageIcon className="h-6 w-6 text-[var(--terminal-amber)]" />
          <p className="mt-3 text-xs font-black uppercase text-white">
            {activeItem.slot}
          </p>
          <p className="mt-2 break-all text-[11px] leading-5 text-[var(--muted)]">
            {activeItem.caption}
          </p>
        </div>
      )}
      <figcaption className="media-caption">
        <span>{kicker}</span>
        <span>{hasImage ? activeItem.alt : activeItem.slot}</span>
      </figcaption>
    </figure>
  );
}
