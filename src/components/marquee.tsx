"use client";

import React from "react";
import { 
  Server, 
  Cpu, 
  Database, 
  Layers, 
  Terminal, 
  Box, 
  Network, 
  Workflow, 
  GitBranch, 
  ShieldCheck, 
  Code2 
} from "lucide-react";

const TECH_ITEMS = [
  { name: "Golang", icon: Terminal, category: "Language" },
  { name: "Java 21+", icon: Code2, category: "Language" },
  { name: "Distributed Systems", icon: Network, category: "Systems" },
  { name: "Raft Consensus", icon: Workflow, category: "Systems" },
  { name: "Redis Internals", icon: Database, category: "Storage" },
  { name: "Docker & Namespaces", icon: Box, category: "DevOps" },
  { name: "Linux / POSIX", icon: Terminal, category: "OS" },
  { name: "TypeScript", icon: Code2, category: "Frontend" },
  { name: "Next.js 14", icon: Layers, category: "Framework" },
  { name: "PostgreSQL", icon: Database, category: "Storage" },
  { name: "Low-Level Design", icon: Cpu, category: "Architecture" },
  { name: "TCP / Sockets", icon: Network, category: "Networking" },
  { name: "Git Internals", icon: GitBranch, category: "Tools" },
  { name: "Cryptographic Storage", icon: ShieldCheck, category: "Security" },
];

export function TechMarquee() {
  // Duplicate for seamless loop
  const duplicated = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="w-full overflow-hidden py-6 relative select-none">
      {/* Side gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {duplicated.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-secondary/40 border border-border/50 text-foreground text-xs font-mono backdrop-blur-sm hover:border-primary/40 hover:bg-secondary/70 transition-all cursor-default"
            >
              <Icon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">{tech.name}</span>
              <span className="text-[10px] text-muted-foreground px-1.5 py-0.2 rounded bg-background/50 border border-border/30">
                {tech.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
