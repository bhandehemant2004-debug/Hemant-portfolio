export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  architecturePoints: string[];
  techStack: string[];
  category: "Systems" | "Backend" | "Full Stack";
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "redis-clone",
    title: "Distributed In-Memory Key-Value Database (Redis Clone)",
    tagline: "Go (Golang), TCP/IP Sockets, RESP Protocol, Radix Tree, Concurrency",
    description:
      "A Redis-compatible in-memory store in Go with multi-client TCP server, byte-level RESP parser, Radix Tree for Redis Streams, Pub/Sub, and master-slave replication.",
    architecturePoints: [
      "Engineered a Redis-compatible in-memory store in Go, building a multi-client TCP server and a custom byte-level RESP parser to handle pipelined commands and fragmented network buffers.",
      "Implemented core data structures and TTL management, supporting string operations (SET, GET, INCR with passive expiration), list primitives (LPUSH, RPUSH, LRANGE), and blocking operations (BLPOP) using Go channels.",
      "Designed a custom Radix Tree (Patricia Trie) from scratch to power Redis Streams (XADD, XRANGE, XREAD BLOCK), supporting auto-generated monotonic IDs and range queries.",
      "Built advanced Redis subsystems, including atomic transactions with optimistic locking (MULTI/EXEC/WATCH), Pub/Sub message broadcasting, and master-slave replication handshaking.",
    ],
    techStack: ["Go", "TCP Sockets", "RESP Protocol", "Radix Tree", "Concurrency", "Goroutines"],
    category: "Systems",
    githubUrl: "https://github.com/bhandehemant2004-debug/Redis",
    featured: true,
  },
  {
    id: "distributed-job-scheduler",
    title: "Distributed Job Scheduling Platform",
    tagline: "Spring Boot, PostgreSQL, Redis, React, Docker",
    description:
      "Distributed job scheduling backend supporting immediate, delayed, scheduled, recurring (cron), and batch jobs with exactly-once claiming across concurrent workers.",
    architecturePoints: [
      "Architected a distributed job scheduling backend supporting immediate, delayed, scheduled, recurring (cron), and batch jobs, horizontally scaled across multiple Spring Boot instances.",
      "Implemented atomic job claiming via conditional SQL updates to guarantee exactly-once claiming across concurrent workers, backed by Redis Streams consumer groups.",
      "Built heartbeat-based lease renewal, recovery services to reclaim stale jobs, and configurable retry policies with dead-letter queue routing.",
      "Containerized the full stack with Docker Compose and validated behavior with 69 unit, controller-slice, and concurrency integration tests.",
    ],
    techStack: ["Spring Boot", "PostgreSQL", "Redis Streams", "Docker", "React", "Java"],
    category: "Backend",
    githubUrl: "https://github.com/bhandehemant2004-debug/Distributed_job_schedular_platform",
    featured: true,
  },
  {
    id: "chat-application-whiteboard",
    title: "Chat Application with Collaborative Whiteboard",
    tagline: "Core Java, TCP Sockets, RSA, MySQL",
    description:
      "Real-time LAN messaging and collaborative whiteboard with custom Spring-inspired IoC container, multithreaded socket server, and RSA digital signatures.",
    architecturePoints: [
      "Built a custom IoC container and annotation-driven routing framework inspired by Spring to map and invoke controller methods over raw TCP sockets and WebSocket frames.",
      "Designed a multithreaded TCP server with per-client reader/writer threads for real-time LAN messaging and a collaborative multi-room whiteboard with MySQL authentication.",
      "Implemented RSA key generation, digital signatures, and verification for message integrity.",
    ],
    techStack: ["Java", "TCP Sockets", "RSA Cryptography", "MySQL", "WebSockets", "Multithreading"],
    category: "Full Stack",
    githubUrl: "https://github.com/bhandehemant2004-debug/Chat_Application",
    featured: true,
  },
];
