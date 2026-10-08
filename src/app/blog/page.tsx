"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, Search, Clock, Calendar, ArrowRight, Tag } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blog-posts";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    BLOG_POSTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-10">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Technical Writing & Insights</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Engineering Blog
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Deep dives into distributed systems, protocol engineering, operating systems, and
          algorithmic problem-solving. Written from first-hand project experiences.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-md">
          {/* Search */}
          <div className="relative flex-1 px-2 sm:px-0">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles by title, keyword, or concept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-background/60 border border-border/50 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Post count badge */}
          <span className="text-xs font-mono text-muted-foreground px-3">
            {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Tags filter list */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-1">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? "bg-foreground text-background font-semibold"
                  : "bg-secondary/40 text-muted-foreground hover:text-foreground border border-border/40"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="p-6 rounded-2xl border border-border/60 bg-secondary/20 hover:border-border hover:bg-secondary/35 transition-all flex flex-col justify-between space-y-4 group backdrop-blur-sm block"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                {post.title}
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-border/30 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="text-xs font-mono font-medium text-foreground group-hover:text-emerald-400 flex items-center gap-1 transition-colors">
                <span>Read article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center rounded-2xl border border-border/40 bg-secondary/10 space-y-3">
            <p className="text-muted-foreground text-sm">No blog posts found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedTag("All");
                setSearchQuery("");
              }}
              className="text-xs font-mono text-emerald-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
