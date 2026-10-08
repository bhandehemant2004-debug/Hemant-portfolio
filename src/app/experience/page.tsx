"use client";

import React from "react";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  Download
} from "lucide-react";
import { EXPERIENCES } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work Experience</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Internship Experience
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              Software engineering internship experience building developer tooling and automation pipelines.
            </p>
          </div>

          <a
            href="mailto:bhandehemant2004@gmail.com?subject=Resume%20Request%20-%20Hemant%20Bhande"
            className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-foreground text-background font-medium text-xs hover:opacity-90 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Contact for Resume</span>
          </a>
        </div>
      </div>

      {/* Experience List */}
      <div className="space-y-8">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.id}
            className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-secondary/20 hover:border-border transition-all space-y-5 backdrop-blur-sm"
          >
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {exp.role}
                  </h2>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-medium">
                    {exp.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="text-foreground font-semibold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{exp.company}</span>
                  </span>
                  {exp.organizationUnit && (
                    <>
                      <span>•</span>
                      <span className="text-zinc-300">{exp.organizationUnit}</span>
                    </>
                  )}
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Period */}
              <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground px-3 py-1 rounded-lg bg-background/50 border border-border/40 shrink-0 self-start">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {exp.description}
            </p>

            {/* Responsibilities list (Exact from resume) */}
            <div className="space-y-2 pt-2 border-t border-border/30">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                Key Contributions & Responsibilities
              </span>
              <div className="space-y-2.5">
                {exp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/30">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
