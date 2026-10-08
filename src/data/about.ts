export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
  boardOrExam?: string;
  details?: string[];
}

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
  skills: { name: string }[];
}

export const PERSONAL_INFO = {
  name: "Hemant Bhande",
  role: "Undergraduate (2023 – 2027) • B.Tech IT",
  email: "bhandehemant2004@gmail.com",
  phone: "+91 9284732641",
  github: "https://github.com/bhandehemant2004-debug",
  linkedin: "https://linkedin.com",
  leetcode: "https://leetcode.com",
  codeforces: "https://codeforces.com",
  gfg: "https://geeksforgeeks.org",
  summary:
    "Developer and curious problem solver who enjoys understanding how systems work from the inside. Punctual, hardworking, and driven to learn by building. Experienced in backend development, distributed systems, concurrency, and full-stack web applications, supported by a strong foundation in data structures and algorithms.",
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "B.Tech in Information Technology",
    institution: "Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded",
    period: "2023 – Expected May 2027",
    score: "CGPA: 8.29",
    details: [
      "Core Coursework: Data Structures & Algorithms, Operating Systems, Computer Networks, Database Management Systems, Object-Oriented Programming, System Design.",
    ],
  },
  {
    degree: "Competitive Entrance Exams",
    institution: "National & State Level Engineering Examinations",
    period: "2023",
    score: "MHT-CET: 96 %ile | JEE Mains: 93 %ile",
    boardOrExam: "MHT-CET & JEE Mains 2023",
    details: [
      "MHT-CET 2023: 96 Percentile",
      "JEE Mains 2023: 93 Percentile",
    ],
  },
  {
    degree: "Higher Secondary (Class XII - PCM)",
    institution: "Shivaji Mahavidyalaya, Udgir",
    period: "2020 – 2022",
    score: "80.67%",
    boardOrExam: "Maharashtra State Board",
  },
  {
    degree: "Secondary Education (Class X)",
    institution: "Podar International School",
    period: "2020",
    score: "93%",
    boardOrExam: "CBSE Board",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Java" },
      { name: "Go (Golang)" },
      { name: "C++" },
      { name: "C" },
    ],
  },
  {
    category: "Backend & Frameworks",
    skills: [
      { name: "Spring Boot" },
      { name: "Spring Security" },
      { name: "Spring Data JPA" },
      { name: "Django" },
      { name: "REST APIs" },
    ],
  },
  {
    category: "Databases & Messaging",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Redis (Streams, Pub/Sub)" },
      { name: "SQLite" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React" },
      { name: "JavaFX" },
    ],
  },
  {
    category: "Tools & Concepts",
    skills: [
      { name: "Docker & Docker Compose" },
      { name: "Git" },
      { name: "JWT" },
      { name: "Multithreading & Concurrency" },
      { name: "Distributed Systems" },
      { name: "Socket Programming" },
      { name: "JUnit & Mockito" },
      { name: "Linux / Unix" },
    ],
  },
];

export const ACHIEVEMENTS = [
  "Solved 700+ Data Structures & Algorithms and competitive programming problems across LeetCode, GeeksforGeeks, and Codeforces.",
  "MHT-CET 2023: 96 Percentile | JEE Mains 2023: 93 Percentile",
  "Class 10th CBSE: 93% at Podar International School",
];
