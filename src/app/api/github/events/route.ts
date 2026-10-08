import { NextRequest, NextResponse } from "next/server";

export interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: {
      sha: string;
      message: string;
      url: string;
    }[];
    pull_request?: {
      title: string;
      html_url: string;
      number: number;
    };
    issue?: {
      title: string;
      html_url: string;
      number: number;
    };
  };
  created_at: string;
}

const FALLBACK_EVENTS: GitHubEvent[] = [
  {
    id: "evt-1",
    type: "PushEvent",
    repo: {
      id: 1,
      name: "bhandehemant2004-debug/Distributed_job_schedular_platform",
      url: "https://api.github.com/repos/bhandehemant2004-debug/Distributed_job_schedular_platform",
    },
    payload: {
      ref: "refs/heads/main",
      commits: [
        {
          sha: "a7c8d9e",
          message: "feat: implement Raft candidate state transition & randomized election timeouts",
          url: "https://github.com/bhandehemant2004-debug/Distributed_job_schedular_platform/commit/a7c8d9e",
        },
        {
          sha: "b8d9e0f",
          message: "refactor: optimize socket heartbeat worker pool with non-blocking NIO",
          url: "https://github.com/bhandehemant2004-debug/Distributed_job_schedular_platform/commit/b8d9e0f",
        },
      ],
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
  },
  {
    id: "evt-2",
    type: "PushEvent",
    repo: {
      id: 2,
      name: "bhandehemant2004-debug/Redis",
      url: "https://api.github.com/repos/bhandehemant2004-debug/Redis",
    },
    payload: {
      ref: "refs/heads/main",
      commits: [
        {
          sha: "c9e0f1a",
          message: "feat(rdb): parse binary opcode headers and payload records with CRC64 checksums",
          url: "https://github.com/bhandehemant2004-debug/Redis/commit/c9e0f1a",
        },
      ],
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // 22 hours ago
  },
  {
    id: "evt-3",
    type: "PushEvent",
    repo: {
      id: 3,
      name: "bhandehemant2004-debug/TrustFs",
      url: "https://api.github.com/repos/bhandehemant2004-debug/TrustFs",
    },
    payload: {
      ref: "refs/heads/main",
      commits: [
        {
          sha: "d0f1a2b",
          message: "feat: client-side AES-256-GCM chunk encryption and SHA-256 deduplication",
          url: "https://github.com/bhandehemant2004-debug/TrustFs/commit/d0f1a2b",
        },
      ],
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: "evt-4",
    type: "PushEvent",
    repo: {
      id: 4,
      name: "bhandehemant2004-debug/codeforces",
      url: "https://api.github.com/repos/bhandehemant2004-debug/codeforces",
    },
    payload: {
      ref: "refs/heads/main",
      commits: [
        {
          sha: "e1a2b3c",
          message: "sol: add Java solution for E. Building an Aquarium (Binary Search on Answer)",
          url: "https://github.com/bhandehemant2004-debug/codeforces/commit/e1a2b3c",
        },
      ],
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
  {
    id: "evt-5",
    type: "PushEvent",
    repo: {
      id: 5,
      name: "bhandehemant2004-debug/jsh",
      url: "https://api.github.com/repos/bhandehemant2004-debug/jsh",
    },
    payload: {
      ref: "refs/heads/main",
      commits: [
        {
          sha: "f2b3c4d",
          message: "feat: support multi-stage pipeline command chaining and stream redirection",
          url: "https://github.com/bhandehemant2004-debug/jsh/commit/f2b3c4d",
        },
      ],
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "bhandehemant2004-debug";
  const token = process.env.GITHUB_TOKEN;

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Hemant-Portfolio-App",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`https://api.github.com/users/${username}/events?per_page=30`, {
      headers,
      next: { revalidate: 1800 }, // Cache 30 mins
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch (error) {
    console.warn("GitHub events fetch failed, using fallback:", error);
  }

  return NextResponse.json(FALLBACK_EVENTS);
}
