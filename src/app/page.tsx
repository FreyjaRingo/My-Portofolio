"use client";

import { motion } from "framer-motion";
import { Terminal, ShieldAlert } from "lucide-react";
import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] font-mono min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative Telemetry */}
      <div className="fixed top-20 left-4 text-[10px] text-[var(--surface-border)] opacity-50 z-0 pointer-events-none tracking-widest" style={{ writingMode: "vertical-rl" }}>
        SYS_ADMIN_OS // ACCESS_GRANTED // SCANNING
      </div>
      <div className="fixed bottom-20 right-8 text-[10px] text-[var(--cyber-blue)] opacity-40 z-0 pointer-events-none flex flex-col gap-1 text-right">
        <span>FRAME_RATE: 144Hz</span>
        <span>NEURAL_LINK: OPTIMAL</span>
        <span>[HACKER_MODE: ACTIVE]</span>
      </div>

      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-2 bg-[var(--surface)] border-b border-[var(--surface-border)] text-xs uppercase">
        <div className="flex items-center gap-4 relative">
          <div className="absolute -top-1 left-0 w-full h-[3px] hazard-stripes"></div>
          <span className="font-bold text-[var(--terminal-green)] text-base group cursor-default">
            ATHALLAH_SYS <span className="opacity-50">v2.0</span>
          </span>
          <nav className="hidden md:flex gap-6 ml-8">
            <a href="#hero" className="text-[var(--terminal-green)] border-b border-[var(--terminal-green)] pb-1 hover:text-white transition-colors">ST_01_BOOT</a>
            <a href="#experience" className="text-[var(--foreground)] hover:text-[var(--terminal-green)] transition-colors pb-1">ST_02_EXP</a>
            <a href="#projects" className="text-[var(--foreground)] hover:text-[var(--terminal-green)] transition-colors pb-1">ST_03_PRJ</a>
            <a href="#skills" className="text-[var(--foreground)] hover:text-[var(--cyber-blue)] transition-colors pb-1">ST_04_SKL</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[var(--cyber-blue)] border border-[var(--cyber-blue)] hover:bg-[var(--cyber-blue)] hover:text-[var(--background)] px-4 py-1 transition-all duration-300">
            ROOT_ACCESS
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 pt-16 lg:pl-16 lg:pr-16 relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Ticker Tape */}
        <div className="w-full bg-[var(--surface)] border-y border-[var(--surface-border)] text-[var(--terminal-green-dim)] text-[11px] py-1 mb-6 overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-2 hazard-stripes"></div>
          <div className="whitespace-nowrap flex animate-[scanline_10s_linear_infinite] px-4 overflow-hidden">
             <span className="mr-8">[PYTHON] <span className="text-[var(--cyber-blue)]">ACTIVE</span></span>
             <span className="mr-8">[DATA SCIENCE] <span className="text-[var(--cyber-blue)]">OPTIMAL</span></span>
             <span className="mr-8">[AI] <span className="text-white">PROCESSING</span></span>
             <span className="mr-8">[SQL] <span className="text-[var(--terminal-green)]">100%</span></span>
             <span className="mr-8">[MACHINE LEARNING] <span className="text-[var(--terminal-green)]">+5.2%</span></span>
          </div>
        </div>

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          id="hero"
          className="relative border border-[var(--surface-border)] bg-[var(--surface)] mb-6 flex flex-col md:flex-row p-6 md:p-10 group overflow-hidden"
        >
          {/* Decorative Corner Marks */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--terminal-green)]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--terminal-green)]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--terminal-green)]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--terminal-green)]"></div>

          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden select-none">
            <span className="text-[12rem] font-bold text-[var(--terminal-green)] whitespace-nowrap transform -rotate-12">SYSTEM_ROOT</span>
          </div>

          <div className="relative z-10 flex flex-col gap-4 flex-1">
            <div className="text-[10px] text-[var(--cyber-blue)] border border-[var(--cyber-blue)] px-1 w-max opacity-80 mb-2">IDENTIFICATION_PROTO</div>
            
            <div className="border-l-2 border-[var(--terminal-green)] pl-4 py-2 bg-[var(--terminal-green)]/10 relative">
              <h1 className="text-2xl md:text-4xl text-[var(--terminal-green)] font-bold mb-2 flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--terminal-green)] inline-block animate-pulse"></span>
                {portfolioData.personal.name}
              </h1>
              <h2 className="text-sm md:text-base text-[var(--foreground)] opacity-90">
                &gt; ROLE: {portfolioData.personal.role}
              </h2>
            </div>

            <div className="mt-4 text-sm text-[var(--foreground)] opacity-80 max-w-2xl leading-relaxed space-y-2">
              <p>&gt; <span className="text-white">STATUS:</span> {portfolioData.personal.status}</p>
              <p>&gt; <span className="text-white">CURRENT_THREAD:</span> {portfolioData.personal.currentThread}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[var(--background)] border border-[var(--cyber-blue)] text-[var(--cyber-blue)] px-6 py-2 hover:bg-[var(--cyber-blue)] hover:text-black transition-all shadow-[2px_2px_0px_var(--cyber-blue)]">
                <Terminal size={14} /> CONNECT_LINKEDIN
              </a>
              <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-2 border border-[var(--surface-border)] px-6 py-2 hover:bg-[var(--surface-border)] hover:text-[var(--terminal-green)] transition-all">
                <ShieldAlert size={14} /> PING_EMAIL
              </a>
            </div>
          </div>
        </motion.section>

        {/* 2 Column Layout for EXP & PRJ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Experience Log */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            id="experience"
            className="border border-[var(--surface-border)] bg-[var(--surface)] flex flex-col h-96 relative group"
          >
            <header className="bg-[var(--background)] border-b border-[var(--surface-border)] px-4 py-2 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--terminal-green)] inline-block"></span>
                <span className="text-[var(--terminal-green)] font-bold">EXP_LOG.sys</span>
              </div>
            </header>
            <div className="p-4 flex-1 overflow-y-auto text-sm space-y-6">
              
              {portfolioData.experience.map((exp) => (
                <div key={exp.id} className={`border-l ${exp.type === "primary" ? "border-[var(--cyber-blue)]" : "border-[var(--surface-border)]"} pl-4 relative`}>
                  <div className={`absolute -left-[5px] top-1 w-2 h-2 ${exp.type === "primary" ? "bg-[var(--cyber-blue)]" : "bg-[var(--surface-border)]"}`}></div>
                  <div className={`flex justify-between items-start mb-1 ${exp.type === "primary" ? "text-[var(--cyber-blue)]" : "text-[var(--foreground)]"}`}>
                    <span className={`font-bold ${exp.type !== "primary" ? "text-white" : ""}`}>{exp.title}</span>
                    <span className={`text-[10px] border px-1 ${exp.type === "primary" ? "border-[var(--cyber-blue)]" : "border-[var(--surface-border)] text-[var(--terminal-green)]"}`}>{exp.status}</span>
                  </div>
                  <div className="text-xs text-[var(--foreground)] opacity-70 mb-2">@ {exp.company} // [{exp.period}]</div>
                  <p className="text-[var(--foreground)] opacity-90 whitespace-pre-line text-xs">
                    {exp.descriptions.map((desc, i) => (
                      <React.Fragment key={i}>
                        &gt; {desc}<br/>
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}

              <div className="text-[10px] text-[var(--surface-border)] border-b border-[var(--surface-border)] pb-2 mb-4">ORG_LOGS.sys</div>

              {portfolioData.organizations.map((org) => (
                <div key={org.id} className={`border-l ${org.type === "primary" ? "border-[var(--cyber-blue)]" : "border-[var(--surface-border)]"} pl-4 relative`}>
                  <div className={`absolute -left-[5px] top-1 w-2 h-2 ${org.type === "primary" ? "bg-[var(--cyber-blue)]" : "bg-[var(--surface-border)]"}`}></div>
                  <div className={`flex justify-between items-start mb-1 ${org.type === "primary" ? "text-[var(--cyber-blue)]" : "text-[var(--foreground)]"}`}>
                    <span className={`font-bold ${org.type !== "primary" ? "text-white" : ""}`}>{org.title}</span>
                    <span className={`text-[10px] border px-1 ${org.type === "primary" ? "border-[var(--cyber-blue)]" : "border-[var(--surface-border)] text-[var(--terminal-green)]"}`}>{org.status}</span>
                  </div>
                  <div className="text-xs text-[var(--foreground)] opacity-70 mb-2">@ {org.company} // [{org.period}]</div>
                  <p className="text-[var(--foreground)] opacity-90 whitespace-pre-line text-xs">
                    {org.descriptions.map((desc, i) => (
                      <React.Fragment key={i}>
                        &gt; {desc}<br/>
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}

            </div>
          </motion.section>

          {/* Projects Matrix */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            id="projects"
            className="border border-[var(--surface-border)] bg-[var(--surface)] flex flex-col h-96 relative group"
          >
            <header className="bg-[var(--background)] border-b border-[var(--surface-border)] px-4 py-2 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--cyber-blue)] inline-block"></span>
                <span className="text-[var(--cyber-blue)] font-bold">PRJ_MATRIX.db</span>
              </div>
            </header>
            <div className="p-4 flex-1 overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-[var(--foreground)] border-b border-[var(--surface-border)] opacity-60">
                    <th className="py-2 font-normal w-8">ID</th>
                    <th className="py-2 font-normal">CLASSIFICATION</th>
                    <th className="py-2 font-normal">TECH_STACK</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioData.projects.map((prj) => (
                    <tr key={prj.id} className="border-b border-[var(--surface-border)]/50 hover:bg-[var(--surface-border)]/20 transition-colors group/row">
                      <td className="py-4 text-[var(--cyber-blue)]">{prj.id}</td>
                      <td className="py-4 text-white">{prj.title}</td>
                      <td className="py-4 text-[var(--terminal-green)] opacity-80">{prj.stack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 border-t border-[var(--surface-border)] pt-4">
                <div className="flex justify-between text-[10px] text-[var(--foreground)] opacity-60 mb-1">
                  <span>MEMORY_ALLOCATION</span>
                  <span className="text-[var(--terminal-green)]">100%</span>
                </div>
                <div className="text-[var(--terminal-green)] text-[10px] tracking-[0.2em] flex items-center justify-between">
                  <span>[|||||||||||||||||||||||||||||]</span>
                  <span className="border border-[var(--terminal-green)] px-1">SYS_OK</span>
                </div>
              </div>
            </div>
          </motion.section>

        </div>

        {/* Skills Section (Command Line Style) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          id="skills"
          className="border border-[var(--surface-border)] bg-[var(--surface)] mb-6 text-sm"
        >
          <div className="bg-[var(--background)] border-b border-[var(--surface-border)] px-4 py-2 flex items-center gap-2 text-xs">
            <span className="text-[var(--foreground)]">root@athallah-os:~#</span>
            <span className="text-white">cat skills.json</span>
          </div>
          <div className="p-6 text-[var(--foreground)] font-mono space-y-4">
            <p className="text-[var(--terminal-green)]">&#123;</p>
            <div className="pl-4 space-y-4">
              {Object.entries(portfolioData.skills).map(([category, items], idx, arr) => (
                <div key={category}>
                  <span className="text-[var(--cyber-blue)]">"{category}"</span>: <span className="text-white">[{items.map(i => `"${i}"`).join(", ")}]</span>{idx < arr.length - 1 ? "," : ""}
                </div>
              ))}
            </div>
            <p className="text-[var(--terminal-green)]">&#125;</p>
            <div className="mt-4 flex animate-pulse text-[var(--terminal-green)]">
              _
            </div>
          </div>
        </motion.section>

      </main>
      
      {/* Scanline Overlay */}
      <div className="scanline"></div>
    </div>
  );
}
