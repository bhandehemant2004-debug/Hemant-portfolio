"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Plus, 
  Search, 
  ExternalLink, 
  Calendar, 
  Filter, 
  Trash2, 
  X, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw,
  BookOpen
} from "lucide-react";
import confetti from "canvas-confetti";
import { DailyProblem, INITIAL_DSA_PROBLEMS, TOPIC_OPTIONS } from "@/data/dsa-problems";
import { formatDate } from "@/lib/utils";

const STORAGE_KEY = "hemant_portfolio_dsa_problems_v1";

export function DsaTimelineTable() {
  const [problems, setProblems] = useState<DailyProblem[]>(INITIAL_DSA_PROBLEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    platform: "LeetCode" as DailyProblem["platform"],
    topic: "Dynamic Programming",
    difficulty: "Medium" as DailyProblem["difficulty"],
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProblems(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load saved problems from localStorage");
    }
  }, []);

  // Save changes
  const saveProblems = (newProblems: DailyProblem[]) => {
    setProblems(newProblems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProblems));
    } catch (e) {
      console.warn("Could not save to localStorage");
    }
  };

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newProblem: DailyProblem = {
      id: `custom-${Date.now()}`,
      name: formData.name.trim(),
      link: formData.link.trim() || `https://leetcode.com/problemset/all/?search=${encodeURIComponent(formData.name)}`,
      platform: formData.platform,
      topic: formData.topic.trim(),
      difficulty: formData.difficulty,
      notes: formData.notes.trim() || "Solved and tested successfully.",
      date: formData.date || new Date().toISOString().split("T")[0],
    };

    const updated = [newProblem, ...problems];
    saveProblems(updated);

    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {}

    // Reset form & close
    setFormData({
      name: "",
      link: "",
      platform: "LeetCode",
      topic: "Dynamic Programming",
      difficulty: "Medium",
      notes: "",
      date: new Date().toISOString().split("T")[0],
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = problems.filter((p) => p.id !== id);
    saveProblems(updated);
  };

  const handleReset = () => {
    if (confirm("Reset to default curated list of solved problems?")) {
      saveProblems(INITIAL_DSA_PROBLEMS);
    }
  };

  // Filtered problems
  const filteredProblems = useMemo(() => {
    return problems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTopic =
        selectedTopic === "All Topics" || item.topic.toLowerCase().includes(selectedTopic.toLowerCase());

      const matchesPlatform =
        selectedPlatform === "All" || item.platform === selectedPlatform;

      return matchesSearch && matchesTopic && matchesPlatform;
    });
  }, [problems, searchQuery, selectedTopic, selectedPlatform]);

  const getDifficultyBadge = (diff: DailyProblem["difficulty"]) => {
    switch (diff) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Hard":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    }
  };

  const getPlatformBadge = (plat: DailyProblem["platform"]) => {
    switch (plat) {
      case "LeetCode":
        return "bg-amber-950/40 text-amber-400 border-amber-800/40";
      case "Codeforces":
        return "bg-cyan-950/40 text-cyan-400 border-cyan-800/40";
      case "CSES":
        return "bg-indigo-950/40 text-indigo-400 border-indigo-800/40";
      case "GFG":
        return "bg-emerald-950/40 text-emerald-400 border-emerald-800/40";
    }
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-md p-6 space-y-6">
      {/* Table Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-lg font-bold text-foreground">Daily Solved Problems Timeline</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Log of practice questions with core patterns and complexities. Stored locally.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Reset to default problems"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-foreground text-background font-medium text-xs hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Problem Solved</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-2 rounded-xl bg-background/50 border border-border/40 text-xs">
        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-secondary/40 border border-border/40 text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* Topic Filter */}
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-secondary/40 border border-border/40 text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {TOPIC_OPTIONS.map((t) => (
            <option key={t} value={t} className="bg-background text-foreground">
              {t}
            </option>
          ))}
        </select>

        {/* Platform Filter */}
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-secondary/40 border border-border/40 text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="All" className="bg-background text-foreground">All Platforms</option>
          <option value="LeetCode" className="bg-background text-foreground">LeetCode</option>
          <option value="Codeforces" className="bg-background text-foreground">Codeforces</option>
          <option value="CSES" className="bg-background text-foreground">CSES</option>
          <option value="GFG" className="bg-background text-foreground">GFG</option>
        </select>
      </div>

      {/* Timeline Table */}
      <div className="overflow-x-auto rounded-xl border border-border/40 bg-background/30">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-secondary/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Problem Name</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Topic / Tag</th>
              <th className="px-4 py-3">Difficulty</th>
              <th className="px-4 py-3">Notes & Core Intuition</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filteredProblems.map((prob) => (
              <tr key={prob.id} className="hover:bg-secondary/30 transition-colors group">
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground text-[11px]">
                  {formatDate(prob.date)}
                </td>
                <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                  <a
                    href={prob.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{prob.name}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-emerald-400" />
                  </a>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] border font-medium ${getPlatformBadge(
                      prob.platform
                    )}`}
                  >
                    {prob.platform}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  <span className="px-2 py-0.5 rounded bg-secondary border border-border/50 text-[10px] text-foreground">
                    {prob.topic}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] border font-semibold ${getDifficultyBadge(
                      prob.difficulty
                    )}`}
                  >
                    {prob.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground max-w-xs truncate text-[11px] font-sans">
                  {prob.notes || "—"}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(prob.id)}
                    className="p-1 rounded hover:bg-rose-500/10 hover:text-rose-400 text-muted-foreground transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProblems.length === 0 && (
          <div className="p-8 text-center text-xs text-muted-foreground font-sans">
            No problems found matching this filter criteria.
          </div>
        )}
      </div>

      {/* Interactive Modal: Add Daily Problem Solved */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-border/80 bg-zinc-950 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h4 className="text-base font-bold text-foreground">Add Daily Problem Solved</h4>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProblem} className="space-y-4 text-xs">
              {/* Problem Name */}
              <div className="space-y-1">
                <label className="text-muted-foreground font-medium">Problem Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Course Schedule III or C. Quests"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-secondary/40 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              {/* Problem Link */}
              <div className="space-y-1">
                <label className="text-muted-foreground font-medium">Problem Link (URL)</label>
                <input
                  type="url"
                  placeholder="https://leetcode.com/problems/..."
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-secondary/40 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              {/* Platform & Difficulty */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-muted-foreground font-medium">Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) =>
                      setFormData({ ...formData, platform: e.target.value as DailyProblem["platform"] })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-secondary/40 border border-border/50 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="LeetCode">LeetCode</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="CSES">CSES</option>
                    <option value="GFG">GFG</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-muted-foreground font-medium">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        difficulty: e.target.value as DailyProblem["difficulty"],
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-secondary/40 border border-border/50 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Topic & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-muted-foreground font-medium">Topic / Paradigm</label>
                  <input
                    type="text"
                    placeholder="e.g. Dynamic Programming, Graphs, Trie"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-secondary/40 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-muted-foreground font-medium">Date Solved</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-secondary/40 border border-border/50 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-muted-foreground font-medium">Notes & Key Trick (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Kahn's Algorithm + min-heap for lexicographical tie breaking..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-secondary/40 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none font-sans"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Problem</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
