export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "demystifying-resp-redis-in-go",
    title: "Demystifying RESP: How I Built an In-Memory Redis Server in Go from Scratch",
    excerpt:
      "A deep dive into Redis Serialization Protocol (RESP), raw TCP socket multiplexing with Goroutines, thread-safe memory storage, and active TTL expiration.",
    date: "Sep 24, 2026",
    readTime: "7 min read",
    tags: ["Go", "Redis", "TCP", "Protocols", "Systems"],
    author: {
      name: "Hemant",
      avatar: "https://avatars.githubusercontent.com/u/252012804?v=4",
      role: "Final Year Undergraduate • Systems Enthusiast",
    },
    content: `## Why Rebuild Redis?

When learning distributed key-value stores, reading whitepapers only gets you so far. Building the system from zero using raw TCP sockets in Go forced me to understand every byte traveling across the wire.

Redis isn't magic; it's a remarkably clean state machine wrapped in a high-performance network layer with a deterministic wire protocol called **RESP (REdis Serialization Protocol)**.

### The RESP Wire Format

RESP is a text-based, binary-safe serialization protocol designed for human readability and fast single-pass parsing. The first byte determines the data type:

- \`+\` : **Simple String** (e.g. \`+OK\\r\\n\`)
- \`-\` : **Simple Error** (e.g. \`-ERR unknown command\\r\\n\`)
- \`:\` : **Integer** (e.g. \`:1000\\r\\n\`)
- \`$\` : **Bulk String** (e.g. \`$4\\r\\nECHO\\r\\n\`)
- \`*\` : **Array** (e.g. \`*2\\r\\n$4\\r\\nECHO\\r\\n$5\\r\\nhello\\r\\n\`)

### Writing the Parser

Here is how we read and parse a bulk string safely without buffer overrun in Go:

\`\`\`go
func readBulkString(reader *bufio.Reader) (string, error) {
    line, err := reader.ReadString('\\n')
    if err != nil {
        return "", err
    }
    // Remove \\r\\n
    line = strings.TrimSuffix(line, "\\r\\n")
    length, err := strconv.Atoi(line[1:])
    if err != nil {
        return "", err
    }
    if length == -1 {
        return "", nil // Null bulk string
    }

    buf := make([]byte, length+2) // +2 for \\r\\n trailer
    _, err = io.ReadFull(reader, buf)
    if err != nil {
        return "", err
    }
    return string(buf[:length]), nil
}
\`\`\`

### Handling Concurrent Clients

Instead of using an event loop like Redis's single-threaded \`ae\` loop, in Go we can leverage Goroutines with lightweight synchronized data access:

\`\`\`go
type Store struct {
    mu   sync.RWMutex
    data map[string]ValueItem
}

type ValueItem struct {
    Val       string
    ExpiresAt int64 // Unix milliseconds, 0 if persistent
}
\`\`\`

Whenever a client connects via \`net.Listen("tcp", ":6379")\`, we spawn an isolated goroutine \`go handleClient(conn, store)\`.

### TTL Expiration: Passive vs Active

Real Redis doesn't launch a separate timer per key. That would exhaust memory. Instead, it combines two strategies:

1. **Passive Eviction**: When a client issues a \`GET key\`, we check if \`ExpiresAt > 0 && time.Now().UnixMilli() > ExpiresAt\`. If expired, delete it and return \`$-1\\r\\n\` (nil).
2. **Active Periodic Eviction**: A background ticker fires every 100ms, samples 20 keys at random with an expiration timestamp, deletes all expired ones, and repeats if >25% were expired!

Building this gave me unprecedented intuition for low-level protocol engineering.`,
  },
  {
    slug: "distributed-job-scheduler-raft",
    title: "Designing a Fault-Tolerant Distributed Job Scheduler in Java",
    excerpt:
      "How I engineered a resilient distributed task execution platform with Raft leader election, heartbeat health checks, worker state machines, and WAL persistence.",
    date: "Aug 18, 2026",
    readTime: "9 min read",
    tags: ["Java", "Distributed Systems", "Raft", "Concurrency"],
    author: {
      name: "Hemant",
      avatar: "https://avatars.githubusercontent.com/u/252012804?v=4",
      role: "Final Year Undergraduate • Systems Enthusiast",
    },
    content: `## The Problem: Scheduling at Scale

In modern cloud infrastructures, batch processing and asynchronous background jobs cannot rely on a single server. A single failure would result in dropped jobs, duplicated execution, or cascading bottlenecks.

I designed **Distributed Job Scheduler** in Java to address these constraints with high availability and deterministic state machines.

### System Architecture

The cluster comprises:
1. **Leader Node**: Elected via Raft. Coordinates state, monitors worker health, and dispatches tasks from a prioritized queue.
2. **Follower Nodes**: Replicate the state log and stand ready to take over if the leader drops off.
3. **Worker Nodes**: Register over TCP, pull jobs according to capacity, and emit heartbeats every 500ms.

\`\`\`
       +-----------------------+
       |   Leader Node (Raft)  |
       +-----------+-----------+
                   | Dispatches Jobs
       +-----------v-----------+
       |    Worker Cluster     |
       | +-------+   +-------+ |
       | |Node A |   |Node B | |
       | +-------+   +-------+ |
       +-----------------------+
\`\`\`

### Leader Election via Raft

When an election timeout expires (randomized between 150ms and 300ms to avoid split votes), a node transitions from \`FOLLOWER\` to \`CANDIDATE\`:

\`\`\`java
public synchronized void startElection() {
    state = NodeState.CANDIDATE;
    currentTerm++;
    votedFor = myNodeId;
    int votesReceived = 1;

    for (Peer peer : peers) {
        VoteResponse res = peer.requestVote(currentTerm, myNodeId, lastLogIndex, lastLogTerm);
        if (res.isVoteGranted()) {
            votesReceived++;
            if (votesReceived > totalNodes / 2) {
                becomeLeader();
                return;
            }
        }
    }
}
\`\`\`

### Handling Worker Node Failures

Every worker node sends periodic heartbeat packets containing current CPU load and active tasks. If the leader fails to receive a heartbeat within \`2.5 seconds\`:
- The worker is marked \`SUSPECT\` then \`DEAD\`.
- All unfinished tasks assigned to that worker are automatically reclaimed and requeued into the priority dispatch pool with retry incrementation.

This ensures zero lost tasks, even during catastrophic worker crashes.`,
  },
  {
    slug: "writing-unix-shell-in-java",
    title: "Building My Own Unix Shell in Java: Process Lifecycles and Pipeline I/O",
    excerpt:
      "Demystifying command execution, POSIX path searching, file descriptor plumbing, and multi-stage pipelines in a custom Unix shell.",
    date: "Jul 12, 2026",
    readTime: "6 min read",
    tags: ["Java", "POSIX", "Shell", "Operating Systems", "CodeCrafters"],
    author: {
      name: "Hemant",
      avatar: "https://avatars.githubusercontent.com/u/252012804?v=4",
      role: "Final Year Undergraduate • Systems Enthusiast",
    },
    content: `## A Shell in Java?

Most Unix shells are implemented in C to stay close to \`fork()\`, \`exec()\`, and \`dup2()\`. Building **jsh** in Java taught me how modern virtual machines interface with the underlying POSIX kernel via the Java standard library's \`ProcessBuilder\`.

### Breaking Down the Command Loop (REPL)

A shell is conceptually straightforward:
1. Print prompt \`$ \`
2. Read line from standard input
3. Tokenize input respecting double and single quotes
4. Execute: Builtin command vs External binary
5. Repeat

### Implementing Pipelines (\`cmd1 | cmd2\`)

The most fascinating part was implementing UNIX pipes. In Java, \`ProcessBuilder.startPipeline()\` was introduced in Java 9, allowing clean plumbing between stages:

\`\`\`java
List<ProcessBuilder> builders = new ArrayList<>();
for (String segment : pipelineSegments) {
    List<String> tokens = parseTokens(segment);
    ProcessBuilder pb = new ProcessBuilder(tokens);
    builders.add(pb);
}

List<Process> processes = ProcessBuilder.startPipeline(builders);
Process lastProcess = processes.get(processes.size() - 1);
lastProcess.waitFor();
\`\`\`

### Redirection & File Descriptors

Supporting \`>\`, \`>>\`, and \`2>\` (standard error):

\`\`\`java
if (command.contains("2>")) {
    String[] parts = command.split("2>");
    pb.redirectError(new File(parts[1].trim()));
}
\`\`\`

The result is a fast, responsive shell capable of compiling programs, executing scripts, and running interactive development sessions!`,
  },
  {
    slug: "concurrency-models-go-vs-java",
    title: "Concurrency Under the Hood: Go Goroutines vs Java Virtual Threads",
    excerpt:
      "A comparison of M:N scheduling, memory overhead, epoll multiplexing, and practical throughput benchmarks between Go and Java 21+ Project Loom.",
    date: "Jun 20, 2026",
    readTime: "8 min read",
    tags: ["Go", "Java", "Concurrency", "Performance", "Benchmarks"],
    author: {
      name: "Hemant",
      avatar: "https://avatars.githubusercontent.com/u/252012804?v=4",
      role: "Final Year Undergraduate • Systems Enthusiast",
    },
    content: `## The Evolution of Asynchronous I/O

For years, Go was the undisputed king of high-concurrency microservices thanks to **Goroutines**—lightweight user-space threads multiplexed onto OS threads by the Go runtime scheduler.

With Java 21's **Virtual Threads (Project Loom)**, Java caught up dramatically. Having written high-load systems in both (Redis in Go, Distributed Scheduler in Java), here is a look under the hood.

### Memory Overhead Comparison

- **Traditional Java Thread**: ~1MB fixed stack size allocated by the OS kernel. 10,000 threads = 10GB RAM!
- **Go Goroutine**: ~2KB initial stack size that grows and shrinks dynamically on demand.
- **Java Virtual Thread**: ~1KB initial footprint, allocated on the Java heap, mounting onto carrier threads during CPU work.

### Channel vs Blocking Style

Go encourages Communicating Sequential Processes (CSP):
> "Do not communicate by sharing memory; instead, share memory by communicating."

Java retains the traditional blocking synchronous programming style, but virtual threads yield execution transparently when hitting socket or file I/O!

\`\`\`java
// Java 21: Simple synchronous code, millions of parallel tasks
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 100_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofMillis(500));
            return i;
        });
    });
}
\`\`\`

### Key Takeaway

Both languages have mastered high-throughput I/O. Go provides cleaner primitives for inter-routine synchronization with channels, while Java provides unrivaled tooling, profiling, and battle-tested enterprise libraries.`,
  },
  {
    slug: "systematic-dsa-codeforces-framework",
    title: "From Novice to Specialist: A Systematic Approach to DSA & Codeforces",
    excerpt:
      "How I structured daily problem solving across LeetCode and Codeforces, mastered pattern recognition, and built my daily problem tracking workflow.",
    date: "May 10, 2026",
    readTime: "5 min read",
    tags: ["DSA", "Codeforces", "LeetCode", "Algorithms", "Competitive Programming"],
    author: {
      name: "Hemant",
      avatar: "https://avatars.githubusercontent.com/u/252012804?v=4",
      role: "Final Year Undergraduate • Systems Enthusiast",
    },
    content: `## Beyond Random Problem Solving

Early on, I made the mistake of solving random problems on LeetCode without structure. I would solve an easy array question, jump to a hard dynamic programming question, get stuck, and feel demotivated.

Everything changed when I adopted a **pattern-first systematic framework**.

### The 4-Pillar Routine

1. **Pattern Mastery**: Focus on one fundamental algorithmic paradigm for two solid weeks (e.g., Topological Sort, Monotonic Stack, Binary Search on Answer).
2. **Upsolving Contests**: Participate in Codeforces Div 3 and Div 2 rounds. Immediately afterwards, solve the first problem you failed to solve during the contest.
3. **Write It Down**: Maintain a daily log tracking the problem, topic, core trick, and space-time complexity.
4. **Time-Boxed Thinking**: Never stare at a problem for more than 40 minutes without checking a hint or editorial.

Consistent daily tracking transformed my algorithm fluency, leading to 480+ solved problems and a 1600+ Codeforces rating!`,
  },
];
