"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Star, 
  GitFork, 
  Search, 
  RefreshCw, 
  FolderGit2, 
  Calendar 
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { GitHubRepo } from "@/lib/github";
import { timeAgo } from "@/lib/utils";

const TECH_FILTERS = ["All", "Go", "Java", "TypeScript", "Systems", "CodeCrafters"];

export default function ProjectsPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "bhandehemant2004-debug";

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/github/repos?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        setRepos(data);
      }
    } catch (err) {
      console.error("Failed to load GitHub repos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      // Tech filter
      let matchesTech = true;
      if (selectedTech !== "All") {
        if (selectedTech === "Systems") {
          matchesTech = 
            repo.topics.some(t => t.includes("system") || t.includes("raft") || t.includes("storage")) ||
            repo.name.toLowerCase().includes("distributed") ||
            repo.name.toLowerCase().includes("redis") ||
            repo.name.toLowerCase().includes("fs");
        } else if (selectedTech === "CodeCrafters") {
          matchesTech = 
            repo.topics.some(t => t.includes("codecrafters")) ||
            repo.name.toLowerCase().includes("redis") ||
            repo.name.toLowerCase().includes("jsh");
        } else {
          matchesTech = repo.language?.toLowerCase() === selectedTech.toLowerCase();
        }
      }

      // Search filter
      const matchesSearch = 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        repo.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTech && matchesSearch;
    });
  }, [repos, selectedTech, searchQuery]);

  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case "go":
        return "bg-cyan-400";
      case "java":
        return "bg-amber-500";
      case "typescript":
        return "bg-blue-400";
      case "python":
        return "bg-emerald-400";
      case "c++":
        return "bg-pink-400";
      default:
        return "bg-indigo-400";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-10">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Live Repositories</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Projects & Repositories
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
              Live GitHub repositories for{" "}
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-emerald-500/50 hover:decoration-emerald-500"
              >
                @{username}
              </a>
              . Built with a focus on systems programming, distributed storage, and performance.
            </p>
          </div>

          <button
            onClick={fetchRepos}
            disabled={loading}
            className="self-start sm:self-center px-3.5 py-2 rounded-xl border border-border/60 bg-secondary/40 hover:bg-secondary text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all"
            title="Refresh repos from GitHub"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
            <span>Sync GitHub</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-md">
        {/* Tech Stack Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 px-2">
          {TECH_FILTERS.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                selectedTech === tech
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px] px-2 md:px-0">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects by name, topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-background/60 border border-border/50 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl border border-border/40 bg-secondary/20 animate-pulse p-6 space-y-4"
            >
              <div className="h-4 bg-secondary rounded w-2/3" />
              <div className="h-3 bg-secondary rounded w-full" />
              <div className="h-3 bg-secondary rounded w-4/5" />
              <div className="h-8 bg-secondary rounded w-full mt-8" />
            </div>
          ))}
        </div>
      ) : filteredRepos.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-border/40 bg-secondary/10 space-y-3">
          <p className="text-muted-foreground text-sm">No repositories found matching your filter.</p>
          <button
            onClick={() => {
              setSelectedTech("All");
              setSearchQuery("");
            }}
            className="text-xs font-mono text-emerald-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredRepos.map((repo) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={repo.id}
                className="flex flex-col justify-between rounded-2xl border border-border/60 bg-secondary/20 hover:border-border hover:bg-secondary/35 transition-all p-6 group backdrop-blur-sm relative"
              >
                <div>
                  {/* Top row: Language & Stars */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`}
                      />
                      <span className="text-xs font-mono font-medium text-foreground">
                        {repo.language || "Software"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      {repo.forks_count > 0 && (
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          <span>{repo.forks_count}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                    {repo.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                    {repo.description || "System engineering project built by Hemant."}
                  </p>

                  {/* Topics Pills */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary/70 border border-border/40 text-muted-foreground"
                        >
                          #{topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 text-muted-foreground">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer: Last updated & Links */}
                <div className="pt-5 mt-4 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="text-[11px] font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {timeAgo(repo.pushed_at || repo.updated_at)}
                  </span>

                  <div className="flex items-center gap-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:text-foreground hover:bg-secondary transition-colors"
                        title="Live Preview"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/60 hover:bg-secondary text-foreground font-mono text-[11px] transition-colors border border-border/40"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
