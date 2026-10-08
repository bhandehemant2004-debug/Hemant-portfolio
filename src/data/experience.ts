export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: "Internship" | "Full-time" | "Open Source" | "Leadership";
  description: string;
  responsibilities: string[];
  skills: string[];
  metrics?: { label: string; value: string }[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Backend & Systems Engineer Intern",
    company: "Distributed Systems Lab / Stealth Tech",
    companyUrl: "https://github.com/bhandehemant2004-debug",
    location: "Remote",
    period: "May 2025 – Aug 2025",
    type: "Internship",
    description:
      "Engineered high-concurrency microservices, optimized database query execution plans, and implemented distributed task dispatchers.",
    responsibilities: [
      "Architected an asynchronous job queue dispatcher handling 10k+ events/sec with exponential backoff retries in Java & Go.",
      "Reduced p99 database query latency by 35% through Redis caching layer implementation and PostgreSQL index tuning.",
      "Constructed RESTful and gRPC API endpoints with robust authentication (JWT with RS256 rotation) and rate limiting.",
      "Integrated Docker containerized pipelines with CI/CD workflows for automated integration testing.",
    ],
    skills: ["Java", "Go", "Redis", "PostgreSQL", "Docker", "Distributed Systems", "gRPC"],
    metrics: [
      { label: "Throughput", value: "10k+ req/sec" },
      { label: "P99 Latency", value: "-35%" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    id: "exp-2",
    role: "Open Source Contributor",
    company: "Hyperledger Besu & Systems Ecosystem",
    companyUrl: "https://github.com/hyperledger/besu",
    location: "Open Source / Global",
    period: "Jan 2025 – Present",
    type: "Open Source",
    description:
      "Investigating blockchain execution environments, EVM transaction throughput benchmarks, and peer-to-peer gossip networking.",
    responsibilities: [
      "Benchmarked Ethereum execution client throughput under peak transaction volume and identified synchronization bottlenecks.",
      "Contributed bug fixes and test coverage improvements to networking and consensus modules.",
      "Documented low-level socket protocol behavior and peer discovery handshakes in developer wiki.",
    ],
    skills: ["Java 21", "Peer-to-Peer", "Blockchain", "Networking", "Benchmarking", "Git"],
    metrics: [
      { label: "Ecosystem", value: "Hyperledger" },
      { label: "Focus", value: "Consensus & EVM" },
    ],
  },
  {
    id: "exp-3",
    role: "Technical Lead & Competitive Coding Mentor",
    company: "University CS Student Chapter",
    companyUrl: "https://github.com/bhandehemant2004-debug",
    location: "Campus",
    period: "Aug 2024 – Present",
    type: "Leadership",
    description:
      "Mentored 100+ students in Data Structures, Algorithms, Codeforces contest upsolving, and Systems Design fundamentals.",
    responsibilities: [
      "Conducted weekly workshops on Dynamic Programming, Graph Theory, and Tree algorithms.",
      "Organized university-wide hackathons and competitive programming contests on HackerRank and Codeforces.",
      "Guided junior developers in building backend architectures and transitioning to Linux command line workflows.",
    ],
    skills: ["Mentorship", "Data Structures", "Algorithms", "Public Speaking", "System Design"],
    metrics: [
      { label: "Mentees", value: "100+ Students" },
      { label: "Workshops", value: "15+ Sessions" },
    ],
  },
];
