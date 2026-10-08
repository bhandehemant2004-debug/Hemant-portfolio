"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  Terminal, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { GithubIcon } from "./icons";
import { CodeCraftersChallenge } from "@/data/codecrafters";

interface CodeCraftersCardProps {
  challenge: CodeCraftersChallenge;
}

export function CodeCraftersCard({ challenge }: CodeCraftersCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl border border-border/60 bg-secondary/20 hover:border-border hover:bg-secondary/35 transition-all p-6 backdrop-blur-sm relative group">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: challenge.languageColor }}
          />
          <span className="text-xs font-mono font-medium text-foreground">
            {challenge.language}
          </span>
        </div>

        <span
          className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-medium ${
            challenge.status === "Completed"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
          }`}
        >
          {challenge.status}
        </span>
      </div>

      {/* Title & Tagline */}
      <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-400 transition-colors">
        {challenge.title}
      </h3>
      <p className="text-xs font-mono text-muted-foreground mt-1 mb-3">
        {challenge.tagline}
      </p>

      {/* Summary */}
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">
        {challenge.summary}
      </p>

      {/* Progress Bar & Stages Count */}
      <div className="space-y-2 my-5 pt-4 border-t border-border/30">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-muted-foreground">Challenge Progress</span>
          <span className="font-semibold text-foreground">
            {challenge.completedStages} / {challenge.totalStages} stages ({challenge.progressPercentage}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-secondary/80 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${challenge.progressPercentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${
              challenge.status === "Completed"
                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                : "bg-gradient-to-r from-cyan-500 to-indigo-500"
            }`}
          />
        </div>
      </div>

      {/* Expand / Details Toggle Button */}
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-mono font-medium text-foreground hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
        >
          <span>{isExpanded ? "Hide Architecture & Stages" : "View Stages & Architecture"}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <a
          href={challenge.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>Repo</span>
        </a>
      </div>

      {/* Expanded Stages & Key Concepts Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 pt-5 border-t border-border/40 space-y-5 overflow-hidden"
          >
            {/* Stages Breakdown List */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                Verification Stages
              </span>
              <div className="space-y-1.5">
                {challenge.stages.map((stage) => (
                  <div
                    key={stage.id}
                    className="flex items-start gap-2.5 p-2 rounded-xl bg-background/50 border border-border/30 text-xs"
                  >
                    {stage.status === "completed" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <span className="font-semibold text-foreground font-mono block">
                        {stage.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {stage.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Technical Learnings */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                Key Technical Learnings
              </span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {challenge.keyLearnings.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono text-sm leading-none">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terminal Preview Snippet */}
            {challenge.terminalSnippet && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  Terminal CLI Verification
                </span>
                <pre className="p-3.5 rounded-xl bg-zinc-950 border border-border/60 text-zinc-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {challenge.terminalSnippet}
                </pre>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
