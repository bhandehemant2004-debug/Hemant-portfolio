"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, 
  GraduationCap, 
  Mail, 
  Check, 
  Sparkles, 
  Cpu, 
  CheckCircle2 
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { TIMELINE_EVENTS, SKILL_CATEGORIES } from "@/data/about";

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("bhandehemant2004@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-16">
      {/* Bio / Introduction Section */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <User className="w-3.5 h-3.5" />
          <span>About Me & My Journey</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Hemant
            </h1>
            <p className="text-base sm:text-lg text-emerald-400 font-mono font-medium">
              Final Year Undergraduate • Systems & Backend Engineer
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I am a final year computer science undergraduate dedicated to mastering 
              low-level systems, distributed infrastructure, and database internals. 
              Rather than merely gluing frameworks together, I believe in rebuilding systems from 
              the wire up to understand their true failure modes and performance characteristics.
            </p>
          </div>

          {/* Quick contact badge */}
          <div className="p-4 rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-md space-y-3 w-full sm:w-64 shrink-0 text-xs font-mono">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Full-Time Roles</span>
            </div>
            <div className="text-muted-foreground text-[11px] leading-relaxed">
              Graduation: 2025/2026
              <br />
              Location: India (Open to Remote / Relocation)
            </div>
            <button
              onClick={copyEmail}
              className="w-full py-2 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground flex items-center justify-center gap-2 border border-border/40 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Email!" : "Copy Email"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Chronological Path</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Journey Timeline
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Key academic, engineering, and competitive milestones from freshman year to final year.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-12 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-border/60">
          {TIMELINE_EVENTS.map((event, idx) => (
            <div key={event.year} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-background border-2 border-emerald-400 group-hover:scale-125 transition-transform flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              {/* Event card */}
              <div className="p-6 rounded-2xl border border-border/60 bg-secondary/20 hover:border-border hover:bg-secondary/35 transition-all space-y-3 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {event.year}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {event.period}
                    </span>
                  </div>
                  {event.role && (
                    <span className="text-xs font-medium text-foreground">
                      {event.role}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {event.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2">
                  {event.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/30">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills Matrix */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Skills & Core Competencies
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.category}
              className="p-6 rounded-2xl border border-border/60 bg-secondary/20 space-y-4 backdrop-blur-sm"
            >
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-400">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 rounded-xl bg-background/60 border border-border/40 text-xs font-mono text-foreground hover:border-emerald-500/40 transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section className="p-8 rounded-2xl border border-border/60 bg-secondary/20 space-y-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xl font-bold text-foreground">Engineering Philosophy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Understand the Wire</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Real engineering intuition starts when you inspect the raw bytes transmitted across 
              TCP sockets and POSIX file descriptors, rather than abstracting them away.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Design for Failure</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In distributed networks, partitions, crashes, and clock drift are facts of life. 
              Systems must be idempotent, resilient, and automatically self-healing.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Algorithmic Fluency</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Strong algorithms and time-space complexity analysis provide the foundation for 
              identifying bottlenecks and designing optimal system architectures.
            </p>
          </div>
        </div>
      </section>

      {/* Get in touch / Socials Footer */}
      <section className="p-8 rounded-2xl border border-border/60 bg-zinc-950 text-center space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-foreground">Let's Connect & Build</h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          I am actively exploring full-time Software Engineer, Backend Engineer, and Distributed 
          Systems roles. Feel free to reach out directly.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:bhandehemant2004@gmail.com"
            className="px-5 py-2.5 rounded-xl bg-foreground text-background font-medium text-xs hover:opacity-90 transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>bhandehemant2004@gmail.com</span>
          </a>

          <a
            href="https://github.com/bhandehemant2004-debug"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/50 hover:bg-secondary text-xs font-mono text-foreground flex items-center gap-2 transition-all"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/50 hover:bg-secondary text-xs font-mono text-foreground flex items-center gap-2 transition-all"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>
    </div>
  );
}
