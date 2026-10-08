import React from "react";
import { Metadata } from "next";
import { CodeCraftersCard } from "@/components/codecrafters-card";
import { CODECRAFTERS_CHALLENGES } from "@/data/codecrafters";
import { Layers, Terminal, CheckCircle, Flame, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "CodeCrafters Journey & Systems Engineering",
  description:
    "Rebuilding Redis, POSIX Shell, Git, SQLite, HTTP Server, and Docker from scratch. Hands-on systems programming and protocol implementations.",
};

export default function CodeCraftersPage() {
  const completedCount = CODECRAFTERS_CHALLENGES.filter((c) => c.status === "Completed").length;
  const totalStagesPassed = CODECRAFTERS_CHALLENGES.reduce((acc, c) => acc + c.completedStages, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-10">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Systems Mastery from Scratch</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              CodeCrafters Journey
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              Software engineering isn't just about using third-party libraries—it's about understanding 
              how the foundational tools of our industry are constructed. Here is my journey rebuilding 
              databases, shells, version control systems, and container runtimes.
            </p>
          </div>

          <a
            href="https://codecrafters.io"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-center px-4 py-2 rounded-xl border border-border/60 bg-secondary/40 hover:bg-secondary text-xs font-mono text-foreground flex items-center gap-2 transition-all"
          >
            <span>CodeCrafters.io</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-md">
        <div className="p-3 rounded-xl bg-background/50 border border-border/40">
          <span className="text-[11px] text-muted-foreground font-mono uppercase block">Challenges</span>
          <span className="text-2xl font-black text-foreground mt-0.5 block">
            {CODECRAFTERS_CHALLENGES.length}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">Systems implemented</span>
        </div>

        <div className="p-3 rounded-xl bg-background/50 border border-border/40">
          <span className="text-[11px] text-muted-foreground font-mono uppercase block">Completed</span>
          <span className="text-2xl font-black text-emerald-400 mt-0.5 block">
            {completedCount}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">100% verified</span>
        </div>

        <div className="p-3 rounded-xl bg-background/50 border border-border/40">
          <span className="text-[11px] text-muted-foreground font-mono uppercase block">Stages Passed</span>
          <span className="text-2xl font-black text-indigo-400 mt-0.5 block">
            {totalStagesPassed}+
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">Automated test suites</span>
        </div>

        <div className="p-3 rounded-xl bg-background/50 border border-border/40">
          <span className="text-[11px] text-muted-foreground font-mono uppercase block">Languages</span>
          <span className="text-2xl font-black text-cyan-400 mt-0.5 block">
            Go • Java
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">POSIX & low-level</span>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CODECRAFTERS_CHALLENGES.map((challenge) => (
          <CodeCraftersCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}
