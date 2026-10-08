"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Code2, 
  Layers, 
  Mail, 
  Phone,
  Briefcase,
  Check,
  GraduationCap
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "./icons";
import { PERSONAL_INFO } from "@/data/about";

export function Hero() {
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
    <section className="relative pt-10 pb-8 sm:pt-16 sm:pb-12 flex flex-col items-center text-center">
      {/* Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-6"
      >
        <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-xs font-mono font-medium text-emerald-400">
          SGGS IE&T Nanded • B.Tech IT (Graduating May 2027) • CGPA: 8.29
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-balance"
      >
        Hey, I'm <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">{PERSONAL_INFO.name}</span>.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed"
      >
        {PERSONAL_INFO.summary}
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
          href="/experience"
          className="px-5 py-2.5 rounded-xl border border-border/80 bg-secondary/50 hover:bg-secondary text-foreground font-medium text-sm transition-all flex items-center gap-2"
        >
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span>Internship Experience</span>
        </Link>

        <Link
          href="/dsa"
          className="px-5 py-2.5 rounded-xl border border-border/80 bg-secondary/50 hover:bg-secondary text-foreground font-medium text-sm transition-all flex items-center gap-2"
        >
          <Code2 className="w-4 h-4 text-amber-400" />
          <span>DSA (700+ Solved)</span>
        </Link>
      </motion.div>

      {/* Contact & Socials Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground font-mono"
      >
        <button
          onClick={copyEmail}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors px-2.5 py-1 rounded-md hover:bg-secondary/60"
          title="Click to copy email"
        >
          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
          <span>{copiedEmail ? "Copied Email!" : PERSONAL_INFO.email}</span>
        </button>

        <span className="text-border hidden sm:inline">•</span>

        <button
          onClick={copyPhone}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors px-2.5 py-1 rounded-md hover:bg-secondary/60"
          title="Click to copy phone"
        >
          {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Phone className="w-3.5 h-3.5" />}
          <span>{copiedPhone ? "Copied Phone!" : PERSONAL_INFO.phone}</span>
        </button>

        <span className="text-border hidden sm:inline">•</span>

        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors px-2.5 py-1 rounded-md hover:bg-secondary/60"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>

        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors px-2.5 py-1 rounded-md hover:bg-secondary/60"
        >
          <LinkedinIcon className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
        </a>
      </motion.div>
    </section>
  );
}
