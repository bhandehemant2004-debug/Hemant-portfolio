# Hemant's Developer Portfolio 🚀

A developer portfolio website built for **Hemant** (Final Year Computer Science Undergraduate), specializing in Distributed Systems, Backend Architecture, Low-Level Design (LLD), and Competitive Programming.

Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **shadcn/ui styling**, and **Framer Motion**.

---

## ✨ Features & Architecture

### 1. `/` (Home)
- **Hero Section**: Animated typography, status indicator pill, copyable email button, and interactive system terminal showcasing cluster status.
- **Tech Stack Marquee**: Smooth infinite horizontal marquee covering Go, Java 21+, Raft, Redis, POSIX, Linux, PostgreSQL, Docker, etc.
- **GitHub Contribution Heatmap**: Live GitHub API & GraphQL integration displaying 52-week activity calendar, current/max streaks, and tooltips.
- **3 Featured Projects**: Detailed cards for *Distributed Job Scheduler Platform*, *In-Memory Redis Server (RESP)*, and *TrustFs Encrypted Storage*, complete with metrics, architecture points, and links.

### 2. `/projects` (Live GitHub Repositories Grid)
- Live API integration with GitHub REST API (`/api/github/repos`) querying user repos with fallback.
- Dynamic tech stack filter pills (All, Go, Java, TypeScript, Systems, CodeCrafters).
- Instant search bar filtering by repo name, description, or topic tags.
- Star counts, language color badges, forks, topics, and `timeAgo` timestamp formatting.

### 3. `/dsa` (DSA Tracker & Contest Dashboard)
- **LeetCode Stats Dashboard**: Total solved, streak count, acceptance rate, global ranking, and difficulty distribution (Easy / Medium / Hard).
- **Codeforces Rating Graph**: SVG rating trajectory chart with contest nodes, rating delta changes (+85, -46), contest titles, and Specialist/Expert rank badges.
- **Daily Solved Problem Timeline**: Interactive table with topic & platform filters.
- **Add Problem Solved Modal**: Allows manually adding new daily problems with immediate `localStorage` browser persistence and celebratory confetti animation!

### 4. `/codecrafters` (Systems Engineering Journey)
- Comprehensive progress cards for systems built from scratch:
  1. **Build Your Own Redis** (Go - 100% Completed, RESP parser, concurrent TCP, RDB snapshots)
  2. **Build Your Own Shell (jsh)** (Java - 100% Completed, pipelines, redirection, builtins)
  3. **Build Your Own Git** (Go - 80% In Progress, object DB, trees, commits, blobs)
  4. **Build Your Own SQLite** (Go - 90% Completed, B-Trees, varints, page headers)
  5. **Build Your Own HTTP Server** (Go - 100% Completed, RFC 7230, gzip compression)
  6. **Build Your Own Docker** (Go/Linux - 75% In Progress, namespaces, chroot)
- Expandable stage breakdowns, architectural takeaways, and CLI verification snippets.

### 5. `/blog` & `/blog/[slug]` (MDX / Markdown Technical Blog)
- List of technical engineering deep dives with tags, search, and reading times.
- Full responsive article viewer with syntax-highlighted code blocks, copy code buttons, callouts, and related article links.

### 6. `/about` (Journey Timeline)
- Chronological timeline tracking freshman year to final year undergraduate milestones.
- Technical skills matrix categorized into Languages, Systems & Backend, Storage, and DevOps.
- Core engineering philosophies and direct contact links.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Vercel/Linear dark mode default with light mode support)
- **Animations**: [Framer Motion](https://www.framer-motion.com/) & [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: Custom SVG Brand Icons & [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **SEO**: Static Site Generation (SSG), OpenGraph, dynamic `sitemap.xml`, and `robots.txt`

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.17+ or 20+

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your handles and token:
```env
# Optional: Increases GitHub API rate limit from 60 to 5000 requests/hour
GITHUB_TOKEN=your_github_token_here

NEXT_PUBLIC_GITHUB_USERNAME=bhandehemant2004-debug
NEXT_PUBLIC_LEETCODE_USERNAME=bhandehemant2004
NEXT_PUBLIC_CODEFORCES_USERNAME=bhandehemant2004
```

### 3. Installation & Local Development
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm run start
```
