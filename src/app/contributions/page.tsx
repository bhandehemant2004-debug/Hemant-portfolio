"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  GitCommit, 
  GitPullRequest, 
  GitBranch, 
  Flame, 
  Trophy, 
  FolderGit2, 
  ExternalLink, 
  RefreshCw, 
  Calendar, 
  Activity, 
  Code2, 
  Star,
  CheckCircle2,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { GithubIcon } from "@/components/icons";
import { timeAgo, formatDate } from "@/lib/utils";

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: {
      sha: string;
      message: string;
      url: string;
    }[];
    pull_request?: {
      title: string;
      html_url: string;
      number: number;
    };
    issue?: {
      title: string;
      html_url: string;
      number: number;
    };
  };
  created_at: string;
}

export default function ContributionsPage() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"All" | "PushEvent" | "PullRequestEvent">("All");
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "bhandehemant2004-debug";

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/github/events?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error("Failed to load GitHub events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [username]);

  const filteredEvents = useMemo(() => {
    if (filterType === "All") return events;
    return events.filter((e) => e.type === filterType);
  }, [events, filterType]);

  const getCleanRepoName = (fullName: string) => {
    return fullName.replace(`${username}/`, "");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5" />
          <span>Real-Time GitHub Activity</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Contributions & Activity
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              Live tracking of all commits, pull requests, repository updates, and active streaks
              for{" "}
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-emerald-500/50 hover:decoration-emerald-500"
              >
                @{username}
              </a>
              .
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={fetchEvents}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl border border-border/60 bg-secondary/40 hover:bg-secondary text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
              <span>Sync Activity</span>
            </button>

            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-foreground text-background font-medium text-xs hover:opacity-90 transition-all flex items-center gap-2"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>
      </div>

      {/* 1. Full 52-Week Contribution Calendar Heatmap */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>52-Week Contribution Matrix</span>
          </h2>
          <span className="text-xs font-mono text-muted-foreground">
            Live GraphQL API
          </span>
        </div>
        <ContributionHeatmap username={username} />
      </section>

      {/* 2. Top Highlights Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-sm space-y-1">
          <span className="text-[11px] text-muted-foreground font-mono uppercase block">Repositories</span>
          <span className="text-2xl font-black text-foreground block">18+</span>
          <span className="text-[10px] text-muted-foreground font-mono">Public codebases</span>
        </div>

        <div className="p-4 rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-sm space-y-1">
          <span className="text-[11px] text-muted-foreground font-mono uppercase flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            Active Streak
          </span>
          <span className="text-2xl font-black text-orange-400 block">Daily Active</span>
          <span className="text-[10px] text-muted-foreground font-mono">Consistent commits</span>
        </div>

        <div className="p-4 rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-sm space-y-1">
          <span className="text-[11px] text-muted-foreground font-mono uppercase block">Primary Stacks</span>
          <span className="text-2xl font-black text-emerald-400 block">Go • Java</span>
          <span className="text-[10px] text-muted-foreground font-mono">Systems & backend</span>
        </div>

        <div className="p-4 rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-sm space-y-1">
          <span className="text-[11px] text-muted-foreground font-mono uppercase flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Yearly Activity
          </span>
          <span className="text-2xl font-black text-foreground block">200+</span>
          <span className="text-[10px] text-muted-foreground font-mono">Commits & PRs</span>
        </div>
      </div>

      {/* 3. Live Recent Activity Stream & Commits Log */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-emerald-400" />
              <span>Recent Commit History & Push Events</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Real-time feed of latest commits pushed to GitHub branches.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/40 border border-border/40 text-xs font-mono">
            <button
              onClick={() => setFilterType("All")}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterType === "All"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilterType("PushEvent")}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterType === "PushEvent"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pushes & Commits
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-2xl border border-border/40 bg-secondary/20 animate-pulse p-4 space-y-2"
              >
                <div className="h-4 bg-secondary rounded w-1/3" />
                <div className="h-3 bg-secondary rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted-foreground rounded-2xl border border-border/40 bg-secondary/10">
            No recent activity found.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((evt) => {
              const commits = evt.payload?.commits || [];
              const branch = evt.payload?.ref ? evt.payload.ref.replace("refs/heads/", "") : "main";
              const repoName = getCleanRepoName(evt.repo.name);

              return (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-secondary/20 hover:border-border hover:bg-secondary/35 transition-all space-y-3 backdrop-blur-sm group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                        <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                        <a
                          href={`https://github.com/${evt.repo.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-400 hover:underline transition-colors"
                        >
                          {repoName}
                        </a>
                      </span>

                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/40 flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        {branch}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 self-start sm:self-center">
                      <Clock className="w-3 h-3" />
                      {timeAgo(evt.created_at)}
                    </span>
                  </div>

                  {/* Commits List */}
                  {commits.length > 0 ? (
                    <div className="space-y-1.5 pt-1">
                      {commits.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-start gap-2.5 text-xs font-mono text-zinc-300"
                        >
                          <span className="px-1.5 py-0.5 rounded bg-background/80 border border-border/50 text-emerald-400 text-[10px] shrink-0 font-bold">
                            {c.sha.slice(0, 7)}
                          </span>
                          <span className="leading-relaxed flex-1 truncate font-sans text-xs">
                            {c.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground font-mono">
                      Pushed updates to repository {repoName}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
