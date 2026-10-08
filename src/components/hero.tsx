"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Code2, 
  Layers, 
  Mail, 
  Briefcase,
  Check
} from "lucide-react";
import { GithubIcon } from "./icons";

export function Hero() {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("bhandehemant2004@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-12 flex flex-col items-center text-center">
      {/* Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-xs font-mono font-medium text-emerald-400">
          Final Year CS Undergrad • Open to SWE & Backend Roles
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-balance"
      >
        Hey, I'm <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Hemant</span>.
        <br />
        <span className="text-foreground">Building systems from the ground up.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed"
      >
        Final year computer science undergraduate obsessed with{" "}
        <strong className="text-foreground font-semibold">distributed systems</strong>,{" "}
        <strong className="text-foreground font-semibold">database internals</strong>, and{" "}
        <strong className="text-foreground font-semibold">low-level performance</strong>.
        Crafting high-throughput services in Go & Java, solving hard algorithms, and rebuilding infrastructure from scratch.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="/projects"
          className="px-5 py-2.5 rounded-xl bg-foreground text-background font-medium text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-sm group"
        >
          <span>View Projects</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href="/dsa"
          className="px-5 py-2.5 rounded-xl border border-border/80 bg-secondary/50 hover:bg-secondary text-foreground font-medium text-sm transition-all flex items-center gap-2"
        >
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>DSA Tracker (480+ Solved)</span>
        </Link>

        <Link
          href="/experience"
          className="px-5 py-2.5 rounded-xl border border-border/80 bg-secondary/50 hover:bg-secondary text-foreground font-medium text-sm transition-all flex items-center gap-2"
        >
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span>Experience</span>
        </Link>
      </motion.div>

      {/* Quick socials & contact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 flex items-center gap-3 text-xs text-muted-foreground font-mono"
      >
        <a
          href="https://github.com/bhandehemant2004-debug"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors px-2.5 py-1 rounded-md hover:bg-secondary/60"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>github.com/bhandehemant2004-debug</span>
        </a>

        <span className="text-border">•</span>

        <button
          onClick={copyEmail}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors px-2.5 py-1 rounded-md hover:bg-secondary/60"
          title="Click to copy email address"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied to clipboard!" : "bhandehemant2004@gmail.com"}</span>
        </button>
      </motion.div>

      {/* Interactive Terminal / System Architecture Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-12 w-full max-w-3xl rounded-2xl border border-border/60 bg-zinc-950/80 shadow-2xl overflow-hidden text-left"
      >
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/70 border-b border-border/40 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-zinc-400">hemant@workstation: ~/systems</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              cluster active
            </span>
            <span>Go 1.22 • Java 21</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] space-y-2.5 text-zinc-300">
          <div className="flex items-center gap-2 text-emerald-400">
            <span>$</span>
            <span>./start-systems-cluster --mode=distributed --raft-leader=true</span>
          </div>
          <div className="text-zinc-500 text-[11px] leading-relaxed">
            [SYS] Initializing Raft consensus group (3 peers: worker-1, worker-2, worker-3)...
            <br />
            [RAFT] Leader elected for Term 4: Node ID #0 (state: LEADER, commitIndex: 142)
            <br />
            [RESP] Redis wire engine started on :6379 (TCP non-blocking socket loop active)
            <br />
            [LLD] Task scheduler ready. Worker pools online: 3/3 active.
          </div>
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
              ✓ Raft Consensus
            </span>
            <span className="px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-800/40 text-indigo-300">
              ✓ RESP Protocol
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-800/40 text-amber-300">
              ✓ AES-GCM Encrypted Storage
            </span>
            <span className="px-2.5 py-1 rounded-md bg-sky-950/60 border border-sky-800/40 text-sky-300">
              ✓ 480+ DSA Problems Solved
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
