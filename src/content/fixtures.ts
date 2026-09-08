export type WorkCandidate = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  status: string;
};

export const identity = {
  name: "Nguyen Tien Phat",
  role: "Software Engineer",
  specialization: "AI-native Products & Agentic Systems",
} as const;

export const workCandidates: readonly WorkCandidate[] = [
  {
    slug: "knowledge-first-ielts-learning-system",
    title: "Knowledge-first IELTS Learning System",
    category: "Product / Domain Engineering",
    summary: "A current product and domain engineering candidate centered on an IELTS learning system.",
    status: "Current evidence-backed candidate",
  },
  {
    slug: "governed-agentic-engineering-system",
    title: "Governed Agentic Engineering System",
    category: "Agentic Engineering System",
    summary: "A current system candidate spanning architecture, skills, documents, standards, and local runtime governance.",
    status: "Current evidence-backed candidate",
  },
] as const;

export const engineeringPrinciples = [
  {
    title: "Proof before claims",
    description: "Credibility follows verifiable evidence. Claims stay proportional to what the underlying work can prove.",
  },
  {
    title: "Smallest sufficient system",
    description: "Prefer direct, maintainable solutions over speculative layers, services, and infrastructure.",
  },
  {
    title: "Server-first by default",
    description: "Keep public content useful without client JavaScript and add browser-only boundaries only when behavior requires them.",
  },
] as const;
