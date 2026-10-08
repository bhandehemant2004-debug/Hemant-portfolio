export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  architecturePoints: string[];
  techStack: string[];
  category: "Systems" | "Backend" | "Infrastructure" | "Algorithms";
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  stars?: number;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "distributed-job-scheduler",
    title: "Distributed Job Scheduler Platform",
    tagline: "High-throughput, fault-tolerant job scheduler with Raft consensus",
    description:
      "A distributed scheduling engine engineered in Java with leader election, heartbeat failure detection, distributed worker pools, and persistent task state replication.",
    longDescription:
      "Built to address distributed task execution at scale. Features leader election based on a simplified Raft consensus algorithm, automatic failover when worker nodes crash, priority-based job queue dispatching, and idempotent execution guarantees with at-least-once task delivery.",
    architecturePoints: [
      "Decentralized Raft consensus implementation for zero-single-point-of-failure leader election",
      "Dynamic heartbeat pinging with exponential backoff & automatic node dead-letter quarantine",
      "Priority worker queues with fair dispatching across multi-threaded socket worker nodes",
      "Write-ahead-log (WAL) style state persistence to recover uninterrupted job states upon crash",
    ],
    techStack: ["Java", "Distributed Systems", "Raft", "Multi-threading", "TCP Sockets", "Docker"],
    category: "Systems",
    githubUrl: "https://github.com/bhandehemant2004-debug/Distributed_job_schedular_platform",
    featured: true,
    metrics: [
      { label: "Throughput", value: "10k+ jobs/sec" },
      { label: "Failover Time", value: "< 1.2s" },
      { label: "Reliability", value: "99.99%" },
    ],
    stars: 12,
  },
  {
    id: "build-your-own-redis",
    title: "In-Memory Redis Server (RESP)",
    tagline: "Complete Redis clone built from scratch in Golang",
    description:
      "An in-memory key-value database built in Go featuring the REdis Serialization Protocol (RESP), non-blocking TCP socket multiplexing, TTL expiry, and RDB snapshotting.",
    longDescription:
      "Implemented as part of CodeCrafters challenges and deep exploration of database internals. Handcrafted full parser for the Redis serialization protocol (RESP2/RESP3), event-driven concurrency model using Goroutines & channels, active and passive key expiration mechanisms, and binary RDB file serialization for disk persistence.",
    architecturePoints: [
      "Custom zero-allocation RESP parser decoding simple strings, bulk strings, arrays, and errors",
      "Concurrent-safe in-memory hashtable supporting PING, ECHO, GET, SET with PX/EX TTL flags",
      "Background worker goroutine executing passive and active probabilistic key eviction",
      "Custom RDB persistence parser creating binary disk snapshots and replication stream support",
    ],
    techStack: ["Go", "RESP Protocol", "TCP Sockets", "Concurrency", "Database Internals", "CodeCrafters"],
    category: "Systems",
    githubUrl: "https://github.com/bhandehemant2004-debug/Redis",
    featured: true,
    metrics: [
      { label: "RESP Spec", value: "100% Compliant" },
      { label: "Latency", value: "Sub-millisecond" },
      { label: "Concurrency", value: "Goroutine Pool" },
    ],
    stars: 18,
  },
  {
    id: "trustfs-distributed-storage",
    title: "TrustFs Encrypted File System",
    tagline: "Secure, chunked distributed file storage with cryptographic integrity",
    description:
      "Distributed storage system in Java featuring AES-GCM data encryption, SHA-256 chunk deduplication, multi-peer block replication, and tamper-evident metadata tree.",
    longDescription:
      "Designed to deliver untrusted-storage guarantees where client data is securely chunked, encrypted locally, and replicated across disparate storage nodes. Employs content-addressable storage principles with Merkle-tree validation to instantly detect block corruption and repair corrupted replicas on the fly.",
    architecturePoints: [
      "Client-side authenticated AES-256-GCM encryption with envelope key management",
      "Content-addressed fixed-size chunking and SHA-256 block deduplication saving 40% bandwidth",
      "Self-healing cluster daemon scanning chunk checksums and initiating peer re-replication",
      "High-concurrency NIO client API with streaming uploads and downloads",
    ],
    techStack: ["Java", "Cryptography", "Distributed Storage", "NIO", "AES-256", "System Design"],
    category: "Infrastructure",
    githubUrl: "https://github.com/bhandehemant2004-debug/TrustFs",
    featured: true,
    metrics: [
      { label: "Encryption", value: "AES-256-GCM" },
      { label: "Deduplication", value: "Content-Addressed" },
      { label: "Redundancy", value: "3x Replication" },
    ],
    stars: 9,
  },
];
