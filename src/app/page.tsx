import React from "react";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { TechMarquee } from "@/components/marquee";
import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { FeaturedProjects } from "@/components/featured-projects";
import { ArrowRight, Code2, Layers, BookOpen, CheckCircle, Sparkles } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog-posts";

export default function Home() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "bhandehemant2004-debug";

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 max-w-6xl mx-auto space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Tech Stack Marquee */}
      <div className="w-full">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1 px-1">
          <span>{"//"} CORE TECHNOLOGIES & COMPETENCIES</span>
          <span>SYSTEM ARCHITECTURE & CLOUD</span>
        </div>
        <TechMarquee />
      </div>

      {/* 3. GitHub Contribution Heatmap */}
      <section className="w-full space-y-3">
        <ContributionHeatmap username={username} />
      </section>

      {/* 4. 3 Featured Projects */}
      <FeaturedProjects />

      {/* 5. Highlights Grid: CodeCrafters & DSA Tracker Preview */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CodeCrafters Card Preview */}
        <div className="rounded-2xl border border-border/60 bg-secondary/20 p-6 flex flex-col justify-between space-y-4 backdrop-blur-sm relative overflow-hidden group">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400">
              <Layers className="w-4 h-4" />
              <span>SYSTEMS JOURNEY</span>
            </div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-indigo-400 transition-colors">
              CodeCrafters Challenges
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Rebuilding industry-standard software from first principles: In-Memory Redis with RESP protocol, POSIX Unix Shell (jsh), Git object store, and SQLite B-trees.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground">Redis & Shell Challenges</span>
              <span className="text-emerald-400 font-semibold">100% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-secondary/80 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 w-[95%]" />
            </div>
          </div>

          <Link
            href="/codecrafters"
            className="pt-2 text-xs font-medium text-foreground hover:text-indigo-400 flex items-center gap-1.5 transition-colors font-mono"
          >
            <span>Explore CodeCrafters walkthroughs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* DSA Tracker Preview */}
        <div className="rounded-2xl border border-border/60 bg-secondary/20 p-6 flex flex-col justify-between space-y-4 backdrop-blur-sm relative overflow-hidden group">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <Code2 className="w-4 h-4" />
              <span>COMPETITIVE PROGRAMMING</span>
            </div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-400 transition-colors">
              DSA Problem Tracker
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tracking 480+ problems solved across LeetCode & Codeforces. Live LeetCode stats, Codeforces contest rating progression graph, and an interactive daily problem log.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="p-2.5 rounded-xl bg-background/60 border border-border/40 text-center">
              <span className="text-[10px] text-muted-foreground font-mono uppercase block">Solved</span>
              <span className="text-sm font-bold text-foreground">480+</span>
            </div>
            <div className="p-2.5 rounded-xl bg-background/60 border border-border/40 text-center">
              <span className="text-[10px] text-muted-foreground font-mono uppercase block">Codeforces</span>
              <span className="text-sm font-bold text-emerald-400">Specialist</span>
            </div>
            <div className="p-2.5 rounded-xl bg-background/60 border border-border/40 text-center">
              <span className="text-[10px] text-muted-foreground font-mono uppercase block">Streak</span>
              <span className="text-sm font-bold text-orange-400">64 Days</span>
            </div>
          </div>

          <Link
            href="/dsa"
            className="pt-2 text-xs font-medium text-foreground hover:text-emerald-400 flex items-center gap-1.5 transition-colors font-mono"
          >
            <span>Open DSA Tracker Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. Recent Blog Posts */}
      <section className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Writing</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Recent Engineering Articles</h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
          >
            <span>All posts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-5 rounded-2xl border border-border/60 bg-secondary/20 hover:bg-secondary/40 hover:border-border transition-all flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground mb-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h4 className="text-base font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
