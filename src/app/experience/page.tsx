"use client";

import React, { useState, useMemo } from "react";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  Building2, 
  Layers, 
  ArrowRight,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCES, ExperienceItem } from "@/data/experience";

const EXPERIENCE_TYPES = ["All", "Internship", "Open Source", "Leadership"];

export default function ExperiencePage() {
  const [selectedType, setSelectedType] = useState("All");

  const filteredExperiences = useMemo(() => {
    if (selectedType === "All") return EXPERIENCES;
    return EXPERIENCES.filter((exp) => exp.type === selectedType);
  }, [selectedType]);

  const getTypeBadge = (type: ExperienceItem["type"]) => {
    switch (type) {
      case "Internship":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Open Source":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Leadership":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Professional Experience</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Work & Contributions
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              Internships, open-source engineering, and technical leadership roles where I’ve
              applied systems programming, backend scalability, and distributed design in practice.
            </p>
          </div>

          <a
            href="mailto:bhandehemant2004@gmail.com?subject=Resume%20Request%20-%20Hemant"
            className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-foreground text-background font-medium text-xs hover:opacity-90 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Request Resume</span>
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-md w-max">
        {EXPERIENCE_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              selectedType === type
                ? "bg-foreground text-background font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Experience List / Timeline */}
      <div className="space-y-8 relative pl-6 sm:pl-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-border/60">
        <AnimatePresence mode="popLayout">
          {filteredExperiences.map((exp, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              key={exp.id}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-6 sm:-left-8 top-2 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-background border-2 border-emerald-400 group-hover:scale-125 transition-transform flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-7 rounded-2xl border border-border/60 bg-secondary/20 hover:border-border hover:bg-secondary/35 transition-all space-y-5 backdrop-blur-sm">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-foreground">
                        {exp.role}
                      </h2>
                      <span
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-medium ${getTypeBadge(
                          exp.type
                        )}`}
                      >
                        {exp.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold transition-colors"
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{exp.company}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-foreground font-semibold flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{exp.company}</span>
                        </span>
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

                {/* Metrics Highlight Pills (if present) */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    {exp.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="rounded-xl bg-background/60 border border-border/40 p-2.5 text-center"
                      >
                        <span className="block text-[10px] text-muted-foreground uppercase font-mono truncate">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-foreground truncate block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Responsibilities list */}
                <div className="space-y-2 pt-2 border-t border-border/30">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                    Key Deliverables & Technical Achievements
                  </span>
                  <div className="space-y-2">
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Available for Roles Callout */}
      <div className="p-6 rounded-2xl border border-border/60 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-foreground font-bold text-base">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Seeking Full-Time Software Engineering Roles</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Graduating in 2025/2026. Available for Backend, Distributed Systems & Infrastructure positions.
          </p>
        </div>

        <a
          href="mailto:bhandehemant2004@gmail.com"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-all whitespace-nowrap shadow-sm"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}
