import React from "react";
import { Metadata } from "next";
import { DsaLeetCodeCard } from "@/components/dsa-leetcode-card";
import { CodeforcesChart } from "@/components/codeforces-chart";
import { DsaTimelineTable } from "@/components/dsa-timeline-table";
import { Code2, Target, Trophy, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "DSA Tracker & Competitive Programming",
  description:
    "DSA dashboard tracking 480+ problems solved on LeetCode, Codeforces contest rating graph, and daily solved problem log.",
};

export default function DsaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-10">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <Code2 className="w-3.5 h-3.5" />
          <span>Competitive Programming & Problem Solving</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          DSA & Contest Tracker
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          A dedicated dashboard tracking continuous algorithmic problem solving across LeetCode,
          Codeforces, and CSES. Focuses on patterns, graph theory, dynamic programming, and systems algorithms.
        </p>
      </div>

      {/* Grid of stats: LeetCode stats card + Codeforces graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DsaLeetCodeCard />
        <CodeforcesChart />
      </div>

      {/* Timeline table where user can view and manually add problems */}
      <div className="w-full">
        <DsaTimelineTable />
      </div>
    </div>
  );
}
