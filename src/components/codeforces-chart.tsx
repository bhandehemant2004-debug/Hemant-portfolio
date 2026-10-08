"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, Award, ExternalLink, Calendar, ChevronRight } from "lucide-react";
import { CodeforcesData } from "@/app/api/dsa/codeforces/route";

export function CodeforcesChart() {
  const [data, setData] = useState<CodeforcesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<{
    contestName: string;
    rating: number;
    change: number;
    date: string;
    rank: number;
    x: number;
    y: number;
  } | null>(null);

  const handle = process.env.NEXT_PUBLIC_CODEFORCES_USERNAME || "bhandehemant2004";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/dsa/codeforces?handle=${handle}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.error("Failed to load Codeforces data", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [handle]);

  if (loading || !data) {
    return (
      <div className="rounded-2xl border border-border/60 bg-secondary/20 p-6 h-64 flex items-center justify-center text-xs text-muted-foreground animate-pulse">
        Loading Codeforces rating trajectory...
      </div>
    );
  }

  // Calculate SVG dimensions & path points
  const history = data.history;
  const width = 700;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const minRating = Math.min(...history.map((h) => h.rating), 1200) - 50;
  const maxRating = Math.max(...history.map((h) => h.rating), 1700) + 50;

  const points = history.map((item, index) => {
    const x = paddingX + (index / (history.length - 1)) * (width - 2 * paddingX);
    const y =
      height -
      paddingY -
      ((item.rating - minRating) / (maxRating - minRating)) * (height - 2 * paddingY);
    return { ...item, x, y };
  });

  const pathD = points.reduce((acc, curr, index) => {
    return index === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${
    height - paddingY
  } Z`;

  return (
    <div className="rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-md p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
              CF
            </div>
            <h3 className="text-lg font-bold text-foreground">Codeforces Contest Rating</h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Specialist
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Contest performance in Div. 2, Div. 3, and Educational Rounds.
          </p>
        </div>

        <a
          href={`https://codeforces.com/profile/${data.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-center"
        >
          <span>@{data.handle}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-background/50 border border-border/40">
          <span className="text-[11px] text-muted-foreground font-mono uppercase block">Current Rating</span>
          <span className="text-2xl font-black text-cyan-400 mt-0.5 block">
            {data.currentRating}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">{data.rankTitle}</span>
        </div>

        <div className="p-3 rounded-xl bg-background/50 border border-border/40">
          <span className="text-[11px] text-muted-foreground font-mono uppercase block">Max Rating</span>
          <span className="text-2xl font-black text-indigo-400 mt-0.5 block">
            {data.maxRating}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">Peak: {data.maxRankTitle}</span>
        </div>

        <div className="p-3 rounded-xl bg-background/50 border border-border/40">
          <span className="text-[11px] text-muted-foreground font-mono uppercase block">Contests</span>
          <span className="text-2xl font-black text-foreground mt-0.5 block">
            {data.contestsCount}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">Rated rounds</span>
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative w-full overflow-x-auto pt-2">
        <div className="min-w-[580px] relative select-none">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="cf-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            {[1300, 1400, 1500, 1600].map((rVal) => {
              const y =
                height -
                paddingY -
                ((rVal - minRating) / (maxRating - minRating)) * (height - 2 * paddingY);
              return (
                <g key={rVal}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.07)"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    fill="rgba(255, 255, 255, 0.3)"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {rVal}
                  </text>
                </g>
              );
            })}

            {/* Filled area below path */}
            <path d={areaD} fill="url(#cf-gradient)" />

            {/* Rating Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data nodes */}
            {points.map((p, idx) => (
              <circle
                key={idx}
                cx={p.x}
                cy={p.y}
                r={hoveredPoint?.contestName === p.contestName ? 6 : 4}
                className="cursor-pointer transition-all duration-150"
                fill={p.change >= 0 ? "#22d3ee" : "#f43f5e"}
                stroke="#09090b"
                strokeWidth="2"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}
          </svg>

          {/* Floating Tooltip */}
          {hoveredPoint && (
            <div
              className="absolute z-20 pointer-events-none p-3 rounded-xl bg-zinc-900 border border-border/80 shadow-xl text-xs font-mono space-y-1"
              style={{
                left: `${(hoveredPoint.x / width) * 100}%`,
                top: `${(hoveredPoint.y / height) * 100 - 30}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="font-semibold text-foreground">{hoveredPoint.contestName}</div>
              <div className="flex items-center justify-between gap-4 text-muted-foreground text-[11px]">
                <span>Rank #{hoveredPoint.rank}</span>
                <span>{hoveredPoint.date}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-border/30">
                <span className="text-cyan-400 font-bold">{hoveredPoint.rating}</span>
                <span
                  className={
                    hoveredPoint.change >= 0 ? "text-emerald-400 font-medium" : "text-rose-400 font-medium"
                  }
                >
                  {hoveredPoint.change >= 0 ? `+${hoveredPoint.change}` : hoveredPoint.change}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
