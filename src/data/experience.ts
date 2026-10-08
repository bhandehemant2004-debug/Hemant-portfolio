export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  organizationUnit?: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: "Internship" | "Project";
  description: string;
  responsibilities: string[];
  skills: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "bodhitree-intern",
    role: "Software Engineering Intern",
    company: "BodhiTree Platform (Bodhicoder)",
    organizationUnit: "IIT Bombay Trust Lab",
    companyUrl: "https://github.com/bhandehemant2004-debug",
    location: "IIT Bombay Trust Lab",
    period: "May 2026 – Jul 2026",
    type: "Internship",
    description:
      "Engineered automated test-case pipelines and bulk upload modules for the BodhiTree DSA learning platform.",
    responsibilities: [
      "Built a Bulk CSV Upload and LLM-based edge case generation module for the BodhiTree DSA learning platform using React, Django, and SQLite.",
      "Designed an LLM-driven pipeline that auto-generates edge cases for DSA problems, reducing manual test-case authoring effort for instructors.",
      "Implemented bulk test-case upload supporting large volumes of data via ZIP and CSV formats, integrating it into the Django backend and React frontend.",
    ],
    skills: ["React", "Django", "SQLite", "Python", "REST APIs", "LLM Integration"],
  },
];
