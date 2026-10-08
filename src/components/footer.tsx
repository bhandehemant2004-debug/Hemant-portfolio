"use client";

import Link from "next/link";
import { Mail, ArrowUp, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border/40 bg-background/50 backdrop-blur-md mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-lg text-foreground">Hemant</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                graduating 2025/2026
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Final year undergraduate software engineer passionate about distributed systems, 
              low-level performance, backend architecture, and problem solving.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs text-muted-foreground">
                Seeking Full-Time Software Engineering & Backend Roles
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/dsa" className="hover:text-foreground transition-colors">
                  DSA Tracker
                </Link>
              </li>
              <li>
                <Link href="/codecrafters" className="hover:text-foreground transition-colors">
                  CodeCrafters Journey
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Technical Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About & Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <a
                href="https://github.com/bhandehemant2004-debug"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                <span>LeetCode</span>
              </a>
              <a
                href="mailto:bhandehemant2004@gmail.com"
                className="hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Hemant. Crafted with Next.js 14, Tailwind CSS & Framer Motion.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 hover:border-border hover:text-foreground bg-secondary/30 transition-all text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
