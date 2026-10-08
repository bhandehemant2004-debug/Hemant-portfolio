"use client";

import React, { useState, useEffect } from "react";
import { Flame, Trophy, Award, CheckCircle2, TrendingUp, RefreshCw, ExternalLink } from "lucide-react";
import { LeetCodeStats } from "@/app/api/dsa/leetcode/route";

export function DsaLeetCodeCard() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [handle, setHandle] = useState("bhandehemant2004");

  const fetchStats = async (userToFetch: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dsa/leetcode?username=${userToFetch}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch LeetCode data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(handle);
  }, []);

  return (
    <div className="rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-md p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              LC
            </div>
            <h3 className="text-lg font-bold text-foreground">LeetCode Statistics</h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Live API
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Algorithmic problem solving across dynamic programming, trees, and graphs.
          </p>
        </div>

        <a
          href={`https://leetcode.com/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-center"
        >
          <span>@{handle}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {loading ? (
        <div className="h-44 flex items-center justify-center text-xs text-muted-foreground gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
          <span>Synchronizing LeetCode profile...</span>
        </div>
      ) : stats ? (
        <div className="space-y-6">
          {/* Top highlight stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-background/50 border border-border/40">
              <span className="text-[11px] text-muted-foreground font-mono uppercase block">Total Solved</span>
              <span className="text-2xl font-black text-foreground mt-0.5 block">
                {stats.totalSolved}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                / {stats.totalQuestions} questions
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background/50 border border-border/40">
              <span className="text-[11px] text-muted-foreground font-mono uppercase flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400" />
                Streak
              </span>
              <span className="text-2xl font-black text-orange-400 mt-0.5 block">
                {stats.streak} Days
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">Continuous solve</span>
            </div>

            <div className="p-3 rounded-xl bg-background/50 border border-border/40">
              <span className="text-[11px] text-muted-foreground font-mono uppercase block">Acceptance</span>
              <span className="text-2xl font-black text-emerald-400 mt-0.5 block">
                {stats.acceptanceRate}%
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">Submission rate</span>
            </div>

            <div className="p-3 rounded-xl bg-background/50 border border-border/40">
              <span className="text-[11px] text-muted-foreground font-mono uppercase flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-400" />
                Global Rank
              </span>
              <span className="text-2xl font-black text-foreground mt-0.5 block">
                ~{stats.ranking.toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">Top percentile</span>
            </div>
          </div>

          {/* Difficulty Breakdown Bars */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
              Difficulty Distribution
            </span>

            {/* Easy */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">Easy</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{stats.easySolved}</strong> / {stats.totalEasy}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary/80 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.easySolved / stats.totalEasy) * 100}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-amber-400 font-semibold">Medium</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{stats.mediumSolved}</strong> / {stats.totalMedium}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary/80 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.mediumSolved / stats.totalMedium) * 100}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-rose-400 font-semibold">Hard</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{stats.hardSolved}</strong> / {stats.totalHard}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary/80 overflow-hidden">
                <div
                  className="h-full bg-rose-400 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.hardSolved / stats.totalHard) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
