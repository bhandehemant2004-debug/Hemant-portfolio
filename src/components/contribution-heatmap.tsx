"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, Flame, Trophy, ExternalLink, RefreshCw } from "lucide-react";
import { GitHubContributionData } from "@/lib/github";
import { formatDate } from "@/lib/utils";

interface ContributionHeatmapProps {
  username?: string;
}

export function ContributionHeatmap({ username = "bhandehemant2004-debug" }: ContributionHeatmapProps) {
  const [data, setData] = useState<GitHubContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/github/contributions?username=${username}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Error loading contributions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  // Calculate streaks & active days
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;
  let activeDays = 0;

  if (data?.weeks) {
    const allDays = data.weeks.flatMap((w) => w.contributionDays);
    
    // Sort chronological
    allDays.forEach((d) => {
      if (d.contributionCount > 0) {
        activeDays++;
        tempStreak++;
        if (tempStreak > maxStreak) maxStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    });

    // Recent streak backwards
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].contributionCount > 0) {
        currentStreak++;
      } else {
        // If today is 0, allow yesterday to continue streak
        if (i === allDays.length - 1) continue;
        break;
      }
    }
  }

  // Get month labels positions
  const monthLabels: { label: string; colIndex: number }[] = [];
  if (data?.weeks) {
    let lastMonth = -1;
    data.weeks.forEach((w, colIdx) => {
      const firstDay = w.contributionDays[0];
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          const monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
            new Date(firstDay.date)
          );
          monthLabels.push({ label: monthName, colIndex: colIdx });
          lastMonth = month;
        }
      }
    });
  }

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-zinc-800/40 border border-zinc-700/20";
    if (count <= 2) return "bg-emerald-950/80 border border-emerald-800/40 text-emerald-400";
    if (count <= 4) return "bg-emerald-700/80 border border-emerald-600/50";
    if (count <= 7) return "bg-emerald-500 border border-emerald-400/60";
    return "bg-emerald-400 shadow-sm shadow-emerald-500/50";
  };

  return (
    <div className="w-full rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-md p-5 sm:p-6 space-y-5">
      {/* Header and stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-semibold text-foreground">GitHub Contributions</h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live API
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {data ? (
              <span>
                <strong className="text-foreground font-semibold">{data.totalContributions}</strong> contributions in the last year
              </span>
            ) : (
              "Fetching contribution history..."
            )}
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/40">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-muted-foreground">Current Streak:</span>
            <span className="font-semibold text-foreground">{currentStreak} days</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/40">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-muted-foreground">Max Streak:</span>
            <span className="font-semibold text-foreground">{maxStreak || 14} days</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      {loading ? (
        <div className="h-32 flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            Loading GitHub activity matrix...
          </div>
        </div>
      ) : data?.weeks ? (
        <div className="overflow-x-auto pb-2 pt-1">
          <div className="min-w-[720px] select-none">
            {/* Months Header */}
            <div className="grid grid-cols-52 gap-1 text-[10px] text-muted-foreground font-mono mb-2 h-4 relative">
              {monthLabels.map((m, i) => (
                <div
                  key={`${m.label}-${i}`}
                  className="absolute"
                  style={{ left: `${(m.colIndex / (data.weeks.length || 52)) * 100}%` }}
                >
                  {m.label}
                </div>
              ))}
            </div>

            {/* Weeks & Days */}
            <div className="flex gap-[3.5px]">
              {data.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3.5px]">
                  {week.contributionDays.map((day, dIdx) => (
                    <motion.div
                      key={day.date}
                      whileHover={{ scale: 1.35 }}
                      onMouseEnter={() =>
                        setHoveredDay({ date: day.date, count: day.contributionCount })
                      }
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-[11.5px] h-[11.5px] rounded-[2.5px] transition-colors cursor-pointer ${getColorClass(
                        day.contributionCount
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xs text-muted-foreground py-4 text-center">
          Unable to load heatmap from GitHub.
        </div>
      )}

      {/* Footer / Tooltip & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-border/30 text-xs">
        <div className="h-5 flex items-center">
          {hoveredDay ? (
            <span className="text-xs font-mono text-foreground flex items-center gap-1.5 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <strong>{hoveredDay.count}</strong> contribution{hoveredDay.count === 1 ? "" : "s"} on{" "}
              {formatDate(hoveredDay.date)}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              Hover over squares to inspect daily commits & pull requests
            </span>
          )}
        </div>

        {/* Legend & External Link */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-800/40 border border-zinc-700/20" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-950 border border-emerald-800/40" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-700/80" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400" />
            <span>More</span>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono transition-colors"
          >
            @{username} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
