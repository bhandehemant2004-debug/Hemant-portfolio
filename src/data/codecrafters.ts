export interface CodeCraftersStage {
  id: string;
  name: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
}

export interface CodeCraftersChallenge {
  id: string;
  title: string;
  tagline: string;
  language: string;
  languageColor: string;
  status: "Completed" | "In Progress";
  progressPercentage: number;
  totalStages: number;
  completedStages: number;
  githubUrl: string;
  summary: string;
  keyLearnings: string[];
  terminalSnippet?: string;
  stages: CodeCraftersStage[];
}

export const CODECRAFTERS_CHALLENGES: CodeCraftersChallenge[] = [
  {
    id: "redis",
    title: "Build Your Own Redis",
    tagline: "An in-memory key-value store implementing the Redis RESP wire protocol",
    language: "Go",
    languageColor: "#00ADD8",
    status: "Completed",
    progressPercentage: 100,
    totalStages: 7,
    completedStages: 7,
    githubUrl: "https://github.com/bhandehemant2004-debug/Redis",
    summary:
      "Engineered an in-memory key-value database from scratch using raw Go TCP sockets. Implemented the complete RESP2/RESP3 protocol parser, concurrent connection multiplexing via Goroutines, TTL expirations with active probabilistic sampling, and RDB disk snapshots.",
    keyLearnings: [
      "RESP protocol parsing: Simple strings (+), Errors (-), Integers (:), Bulk strings ($), Arrays (*)",
      "High-concurrency TCP socket programming with Go channel worker pools",
      "Key expiration algorithms: Passive on-access check combined with active periodic sampling",
      "Binary RDB file formatting: Magic strings, auxiliary fields, opcode parsing, CRC64 checksums",
      "Replication architecture: Leader-follower handshake, replication offset tracking, and INFO replication commands",
    ],
    terminalSnippet: `$ redis-cli -p 6379 PING
PONG
$ redis-cli -p 6379 SET mykey "Hello CodeCrafters" PX 5000
OK
$ redis-cli -p 6379 GET mykey
"Hello CodeCrafters"
[Waiting 5s...]
$ redis-cli -p 6379 GET mykey
(nil)`,
    stages: [
      { id: "stage-1", name: "Bind to TCP port 6379", description: "Listen on port 6379 and accept inbound TCP connections", status: "completed" },
      { id: "stage-2", name: "Respond to PING", description: "Parse RESP PING command and reply with +PONG\\r\\n", status: "completed" },
      { id: "stage-3", name: "Handle Concurrent Clients", description: "Support multiple parallel TCP client connections using goroutines", status: "completed" },
      { id: "stage-4", name: "Implement ECHO", description: "Parse bulk strings and echo back payload to client", status: "completed" },
      { id: "stage-5", name: "Implement SET and GET", description: "Thread-safe key-value store with concurrent map access", status: "completed" },
      { id: "stage-6", name: "Expiry (PX & EX flags)", description: "Support millisecond and second TTL expiration timestamps", status: "completed" },
      { id: "stage-7", name: "RDB File Persistence & Replication", description: "Parse binary RDB files and stream replicas via PSYNC", status: "completed" },
    ],
  },
  {
    id: "shell",
    title: "Build Your Own Shell (jsh)",
    tagline: "A POSIX-compliant command-line interpreter with piping & redirection",
    language: "Java",
    languageColor: "#b07219",
    status: "Completed",
    progressPercentage: 100,
    totalStages: 6,
    completedStages: 6,
    githubUrl: "https://github.com/bhandehemant2004-debug/jsh",
    summary:
      "Crafted a custom Unix shell in Java. Implemented REPL prompt, command path discovery using the PATH environment variable, builtins (echo, type, pwd, cd, exit), single and multi-stage pipeline command chaining, and stdout/stderr redirection.",
    keyLearnings: [
      "Process lifecycle management: ProcessBuilder, Process fork & wait dynamics, return code propagation",
      "Stream redirection: Plumbing standard output (1>), standard error (2>), and append mode (>>)",
      "Pipeline chaining: Connecting stdout of preceding process to stdin of succeeding process via pipes",
      "Path resolution: Traversing PATH entries with file permission validation",
      "Terminal raw mode manipulation for Tab-autocompletion handling",
    ],
    terminalSnippet: `$ $ ./jsh
$ echo "Hello from custom Java shell!"
Hello from custom Java shell!
$ type cd
cd is a shell builtin
$ cat /etc/passwd | grep -v nobody | wc -l > output.txt
$ cat output.txt
38`,
    stages: [
      { id: "sh-1", name: "REPL and Exit Builtin", description: "Display $ prompt and handle exit 0 command cleanly", status: "completed" },
      { id: "sh-2", name: "Echo Builtin", description: "Parse arguments and print space-separated tokens", status: "completed" },
      { id: "sh-3", name: "Type Builtin & Path Discovery", description: "Differentiate builtins from executables residing in PATH", status: "completed" },
      { id: "sh-4", name: "Running External Programs", description: "Invoke system binaries with command line arguments", status: "completed" },
      { id: "sh-5", name: "PWD & CD Builtins", description: "Directory navigation with support for absolute and ~ relative paths", status: "completed" },
      { id: "sh-6", name: "Pipes & Stream Redirection", description: "Plumbing pipes (|) and file descriptor redirection (>, 1>, 2>, >>)", status: "completed" },
    ],
  },
  {
    id: "git",
    title: "Build Your Own Git",
    tagline: "A distributed version control system replicating Git's object model",
    language: "Go",
    languageColor: "#00ADD8",
    status: "In Progress",
    progressPercentage: 80,
    totalStages: 6,
    completedStages: 5,
    githubUrl: "https://github.com/bhandehemant2004-debug",
    summary:
      "Rebuilding the core of Git. Explores the internal content-addressable object database (.git/objects), zlib compression, SHA-1 cryptographic hashes, blobs, trees, commit history traversal, and packfile parsing.",
    keyLearnings: [
      "Git object storage format: Header (`<type> <size>\\0`) followed by raw content compressed with zlib",
      "Blobs vs Trees vs Commits: Structural decomposition of the Git DAG (Directed Acyclic Graph)",
      "Tree parsing: Variable octal mode string, null terminator, 20-byte binary SHA-1 checksum",
      "Commit creation: Tree SHA, parent commit hashes, author & committer timestamps, and commit messages",
    ],
    terminalSnippet: `$ mygit init
Initialized empty Git repository in .git/
$ mygit hash-object -w main.go
a4b5c6...
$ mygit cat-file -p a4b5c6...
package main
import "fmt"
...`,
    stages: [
      { id: "git-1", name: "Initialize .git directory", description: "Generate HEAD pointer and object directory structure", status: "completed" },
      { id: "git-2", name: "Read Blob Object (cat-file)", description: "Decompress zlib blob objects and verify type and payload", status: "completed" },
      { id: "git-3", name: "Write Blob Object (hash-object)", description: "Compute SHA-1 hash, format header, and write zlib compressed object", status: "completed" },
      { id: "git-4", name: "Read Tree Object (ls-tree)", description: "Parse binary tree entry records and format listing", status: "completed" },
      { id: "git-5", name: "Write Tree & Commit (write-tree / commit-tree)", description: "Build tree recursively from working tree and generate commit object", status: "completed" },
      { id: "git-6", name: "Clone Remote Repository", description: "Git Smart HTTP protocol handshake and packfile unpacker", status: "in-progress" },
    ],
  },
  {
    id: "sqlite",
    title: "Build Your Own SQLite",
    tagline: "A zero-configuration, serverless relational database engine",
    language: "Go",
    languageColor: "#00ADD8",
    status: "Completed",
    progressPercentage: 90,
    totalStages: 5,
    completedStages: 5,
    githubUrl: "https://github.com/bhandehemant2004-debug",
    summary:
      "Deep dive into SQLite file format and query execution. Reads database file headers, parses variable-length integers (varints), navigates B-Tree leaf and interior pages, and runs SQL table scans with WHERE filters.",
    keyLearnings: [
      "SQLite 100-byte database header layout: page size, format version, reserved space",
      "B-Tree page structures: Interior Table pages vs Leaf Table pages, cell pointers, cell payload offset",
      "Varint decoding: Variable-length Huffman-style 1 to 9-byte integers",
      "Record format serial type codes: NULL, integers, floats, and variable length strings",
    ],
    terminalSnippet: `$ sqlite-reader test.db .dbinfo
database page size:  4096
number of tables:    3
$ sqlite-reader test.db "SELECT id, name FROM users WHERE role = 'admin'"
1|alice
4|bob`,
    stages: [
      { id: "sql-1", name: "Parse Database Header", description: "Extract page size, schema cookie, and SQLite version signature", status: "completed" },
      { id: "sql-2", name: "Read sqlite_schema Table", description: "Parse master schema table to enumerate tables, columns, and roots", status: "completed" },
      { id: "sql-3", name: "Execute SELECT COUNT(*)", description: "Traverse B-tree leaf pages and sum total valid row cells", status: "completed" },
      { id: "sql-4", name: "Table Scan Column Projection", description: "Extract specific columns from payload records according to record headers", status: "completed" },
      { id: "sql-5", name: "WHERE Clause Filter Execution", description: "Evaluate predicate conditions during page traversal scan", status: "completed" },
    ],
  },
  {
    id: "http-server",
    title: "Build Your Own HTTP Server",
    tagline: "Concurrent HTTP/1.1 server supporting persistent connections & compression",
    language: "Go",
    languageColor: "#00ADD8",
    status: "Completed",
    progressPercentage: 100,
    totalStages: 5,
    completedStages: 5,
    githubUrl: "https://github.com/bhandehemant2004-debug",
    summary:
      "Developed a custom HTTP/1.1 server handling RFC 7230 request line parsing, path routing, header extraction, request body streaming, file serving with MIME types, and gzip compression.",
    keyLearnings: [
      "RFC 7230 compliance: Request line (`GET / HTTP/1.1\\r\\n`), header normalization",
      "Concurrent connection lifecycle handling using non-blocking goroutines",
      "Gzip compression middleware: checking `Accept-Encoding: gzip` and compressing dynamic response body",
      "File server endpoint: reading filesystem and streaming chunks with appropriate Content-Length",
    ],
    terminalSnippet: `$ curl -v http://localhost:4221/echo/codecrafters
< HTTP/1.1 200 OK
< Content-Type: text/plain
< Content-Length: 12
< 
codecrafters`,
    stages: [
      { id: "http-1", name: "Respond with 200 OK", description: "Accept TCP connection and send HTTP/1.1 200 OK response", status: "completed" },
      { id: "http-2", name: "Extract URL Path", description: "Parse requested URL and implement 404 Not Found routing", status: "completed" },
      { id: "http-3", name: "Implement /echo/{str} Endpoint", description: "Return URL parameter string in response body", status: "completed" },
      { id: "http-4", name: "Read Request Headers & User-Agent", description: "Extract arbitrary headers and return /user-agent data", status: "completed" },
      { id: "http-5", name: "Serve Files & Gzip Compression", description: "Read files from directory and support Content-Encoding: gzip", status: "completed" },
    ],
  },
  {
    id: "docker",
    title: "Build Your Own Docker",
    tagline: "Lightweight container runtime leveraging Linux namespaces and cgroups",
    language: "Go / Linux",
    languageColor: "#00ADD8",
    status: "In Progress",
    progressPercentage: 75,
    totalStages: 4,
    completedStages: 3,
    githubUrl: "https://github.com/bhandehemant2004-debug",
    summary:
      "Exploration of container primitives on Linux. Implements process isolation with PID & Mount namespaces, chroot / pivot_root filesystem confinement, and pulling images from Docker Registry v2.",
    keyLearnings: [
      "Linux namespaces: `CLONE_NEWPID`, `CLONE_NEWUTS`, `CLONE_NEWNS`",
      "Filesystem isolation with chroot and overlayfs root mounting",
      "Docker Registry v2 API: Authentication tokens, manifests, and tar layer extraction",
      "Exit code forwarding and standard stream piping to parent terminal",
    ],
    terminalSnippet: `$ ./mydocker run ubuntu /bin/sh
# ps
PID   USER     TIME  COMMAND
  1   root     0:00  /bin/sh
  2   root     0:00  ps
# exit`,
    stages: [
      { id: "doc-1", name: "Run external program", description: "Execute target binary and forward stdout/stderr and exit code", status: "completed" },
      { id: "doc-2", name: "Filesystem Isolation (chroot)", description: "Confine child process filesystem using chroot syscall", status: "completed" },
      { id: "doc-3", name: "PID Namespace Isolation", description: "Isolate process table so container process has PID 1", status: "completed" },
      { id: "doc-4", name: "Fetch Image from Docker Hub Registry", description: "Download Docker Registry v2 blobs and uncompress layers", status: "in-progress" },
    ],
  },
];
