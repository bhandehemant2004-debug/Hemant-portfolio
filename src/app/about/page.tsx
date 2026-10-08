"use client";

import React, { useState } from "react";
import { 
  User, 
  GraduationCap, 
  Mail, 
  Phone,
  Check, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Trophy,
  BookOpen,
  Award,
  ExternalLink
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/icons";
import { PERSONAL_INFO, EDUCATION_DATA, SKILL_CATEGORIES, ACHIEVEMENTS } from "@/data/about";

export default function AboutPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-16">
      {/* 1. Header Bio */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <User className="w-3.5 h-3.5" />
          <span>About Me</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-base sm:text-lg text-emerald-400 font-mono font-medium">
              {PERSONAL_INFO.role}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Quick contact card */}
          <div className="p-4 rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-md space-y-3 w-full sm:w-72 shrink-0 text-xs font-mono">
            <div className="text-foreground font-bold border-b border-border/40 pb-2">
              Contact Details
            </div>
            
            <div className="space-y-2 text-muted-foreground text-xs">
              <button
                onClick={copyEmail}
                className="w-full text-left flex items-center justify-between p-2 rounded-lg bg-background/60 hover:bg-secondary border border-border/40 text-foreground transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </div>
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : null}
              </button>

              <button
                onClick={copyPhone}
                className="w-full text-left flex items-center justify-between p-2 rounded-lg bg-background/60 hover:bg-secondary border border-border/40 text-foreground transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : null}
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-border/30">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="LeetCode"
              >
                <LeetCodeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Education Section */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Education & Qualifications
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {EDUCATION_DATA.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-border/60 bg-secondary/20 hover:border-border transition-all space-y-3 backdrop-blur-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-foreground">
                  {edu.degree}
                </h3>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
                  {edu.score}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="text-foreground font-semibold">{edu.institution}</span>
                {edu.boardOrExam && (
                  <>
                    <span>•</span>
                    <span>{edu.boardOrExam}</span>
                  </>
                )}
                <span>•</span>
                <span>{edu.period}</span>
              </div>

              {edu.details && (
                <ul className="space-y-1.5 pt-1 text-xs text-muted-foreground">
                  {edu.details.map((d, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400 leading-none mt-0.5">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Technical Skills Section */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Technical Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.category}
              className="p-6 rounded-2xl border border-border/60 bg-secondary/20 space-y-3 backdrop-blur-sm"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 rounded-xl bg-background/60 border border-border/40 text-xs font-mono text-foreground"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Key Achievements */}
      <section className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-secondary/20 space-y-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h2 className="text-xl font-bold text-foreground">Key Achievements</h2>
        </div>

        <div className="space-y-2.5">
          {ACHIEVEMENTS.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
