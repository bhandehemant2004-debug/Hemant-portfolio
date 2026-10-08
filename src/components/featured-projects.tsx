"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ExternalLink, 
  ArrowRight, 
  Cpu, 
  CheckCircle2,
  FolderGit2
} from "lucide-react";
import { GithubIcon } from "./icons";
import { FEATURED_PROJECTS } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Core Projects
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Key systems projects in Go, Java, Spring Boot, Redis Streams, and TCP Sockets.
          </p>
        </div>

        <Link
          href="/projects"
          className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group font-mono"
        >
          <span>View all repositories</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of 3 Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {FEATURED_PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex flex-col rounded-2xl border border-border/60 bg-secondary/20 hover:border-border hover:bg-secondary/35 transition-all p-6 group relative backdrop-blur-sm"
          >
            {/* Top row: Category */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                {project.category}
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                {project.tagline.split(",")[0]}
              </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-muted-foreground mt-1 mb-3">
              {project.tagline}
            </p>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Key Deliverables Points from Resume */}
            <div className="space-y-2 my-4 pt-4 border-t border-border/30">
              {project.architecturePoints.slice(0, 2).map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed line-clamp-2">{point}</span>
                </div>
              ))}
            </div>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-1.5 my-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary border border-border/50 text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="pt-4 border-t border-border/40 flex items-center justify-between">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-foreground hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>

              <Link
                href="/projects"
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <span>Details</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
