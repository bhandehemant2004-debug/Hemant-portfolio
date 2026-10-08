export interface TimelineItem {
  year: string;
  period: string;
  title: string;
  organization?: string;
  role?: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level?: string; icon?: string }[];
}

export const TIMELINE_EVENTS: TimelineItem[] = [
  {
    year: "2026",
    period: "Present (Final Year)",
    title: "Final Year Undergraduate & Systems Specialization",
    role: "B.Tech Computer Science and Engineering",
    description:
      "Deepening focus on distributed systems, database internals, and high-concurrency architectures. Actively building projects from scratch using CodeCrafters and preparing for full-time software engineering roles.",
    highlights: [
      "Built production-grade Redis clone in Go with full RESP2/RESP3 protocol & RDB persistence",
      "Reached 480+ problems solved on LeetCode and Specialist rating on Codeforces",
      "Developed high-throughput Distributed Job Scheduler in Java with Raft leader election",
      "Open to Full-Time Software Engineer / Backend Engineer opportunities starting 2025/2026",
    ],
    tags: ["Distributed Systems", "Go", "Java", "Raft", "Database Internals"],
  },
  {
    year: "2025",
    period: "Junior Year",
    title: "Distributed Storage, Security & Low-Level Design",
    role: "Core Developer & Systems Explorer",
    description:
      "Focused heavily on system architecture, design patterns, and network programming. Explored cryptographic storage and container virtualization primitives.",
    highlights: [
      "Engineered TrustFs: a peer-to-peer chunked encrypted file system with AES-256 and SHA-256 deduplication",
      "Authored clean solutions for real-world Low-Level Design (LLD) problems: Rate Limiters, Distributed Caches, Cinema Booking",
      "Built custom POSIX shell 'jsh' in Java with stream pipelines and file descriptor redirection",
      "Implemented JWT authentication service in Go with RS256 token rotation and Redis blacklist",
    ],
    tags: ["TrustFs", "LLD", "Design Patterns", "NIO", "AES-256"],
  },
  {
    year: "2024",
    period: "Sophomore Year",
    title: "Operating Systems, Computer Networks & Competitive Coding",
    role: "Computer Science Undergraduate",
    description:
      "Mastered low-level operating system concepts, process synchronization, socket programming, and competitive programming on Codeforces and LeetCode.",
    highlights: [
      "Competed actively in weekly Codeforces contests, climbing to 1600+ peak rating",
      "Built multithreaded chat server using non-blocking TCP sockets",
      "Explored Linux kernel namespaces and cgroups container runtime internals",
      "Studied ACID database transactions, indexing mechanisms, and relational query plans",
    ],
    tags: ["Codeforces", "Operating Systems", "Networking", "TCP/IP", "C++"],
  },
  {
    year: "2023",
    period: "Freshman Year",
    title: "Data Structures, Algorithms & Software Foundations",
    role: "CS Undergraduate",
    description:
      "Built foundational intuition for algorithmic complexity, memory management, pointers, and object-oriented design in Java and C++.",
    highlights: [
      "Solved 200+ foundational algorithmic problems across arrays, trees, dynamic programming, and graphs",
      "Transitioned development environment entirely to Linux and command line workflows",
      "Contributed to student developer clubs and open-source hackathons",
    ],
    tags: ["Algorithms", "Data Structures", "OOP", "Linux", "Java"],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Go (Golang)" },
      { name: "Java (21+)" },
      { name: "TypeScript" },
      { name: "C / C++" },
      { name: "SQL" },
      { name: "Python" },
    ],
  },
  {
    category: "Systems & Backend",
    skills: [
      { name: "Distributed Systems" },
      { name: "Raft Consensus" },
      { name: "Low-Level Design (LLD)" },
      { name: "High-Concurrency / Multi-threading" },
      { name: "TCP / UDP Socket Programming" },
      { name: "RESTful APIs & Microservices" },
    ],
  },
  {
    category: "Databases & Storage",
    skills: [
      { name: "Redis (RESP Internals)" },
      { name: "PostgreSQL" },
      { name: "SQLite" },
      { name: "Content-Addressed Storage" },
      { name: "In-Memory Caches" },
    ],
  },
  {
    category: "Infrastructure & DevOps",
    skills: [
      { name: "Docker & Linux Namespaces" },
      { name: "Linux / POSIX Systems" },
      { name: "Git & Version Control" },
      { name: "CI / CD Pipelines" },
      { name: "Vercel & Next.js" },
    ],
  },
];
