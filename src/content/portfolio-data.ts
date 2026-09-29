const portfolioTimestamp = new Date("2026-09-08T00:00:00.000Z");

export const portfolioSiteProfile = {
  _id: "site",
  schemaVersion: 1,
  identity: {
    name: "Nguyen Tien Phat",
    role: "Software Engineer",
    specialization: "AI-native Products & Agentic Systems",
    intro: "I build software around clear ownership, bounded complexity, and evidence that can survive review.",
  },
  home: {
    currentBuilding: "I am building evidence-first software systems and turning the strongest work into inspectable engineering case studies.",
    evidencePhilosophy:
      "Implemented, verified, accepted, deployed, and operated are different states. Claims stay proportional to the evidence available.",
    aboutSummary:
      "AI-native Products & Agentic Systems is the current specialization. The goal is to compress complexity into software that remains understandable and reviewable.",
    contactPrompt:
      "For engineering conversations, use the direct contact route. No form, tracking layer, or inbox infrastructure is required.",
  },
  engineeringPrinciples: [
    {
      title: "Proof before claims",
      description:
        "Credibility follows verifiable evidence. Claims stay proportional to what the underlying work can prove.",
    },
    {
      title: "Smallest sufficient system",
      description:
        "Prefer direct, maintainable solutions over speculative layers, services, and infrastructure.",
    },
    {
      title: "Server-first by default",
      description:
        "Keep public content useful without client JavaScript and add browser-only boundaries only when behavior requires them.",
    },
  ],
  contactLinks: [
    {
      label: "GitHub",
      url: "https://github.com/phatnguyen03022001",
    },
  ],
  createdAt: portfolioTimestamp,
  updatedAt: portfolioTimestamp,
} as const;

export const portfolioWorkItems = [
  {
    _id: "knowledge-first-ielts-learning-system",
    schemaVersion: 1,
    slug: "knowledge-first-ielts-learning-system",
    title: "Knowledge-first IELTS Learning System",
    summary:
      "A current product and domain engineering candidate centered on an IELTS learning system.",
    category: "PRODUCT_DOMAIN",
    collection: "WORK",
    featuredRank: 1,
    currentRank: 1,
    repositoryReferences: [
      {
        label: "ilets",
        url: "https://github.com/phatnguyen03022001/ilets",
      },
    ],
    sections: [
      {
        kind: "OVERVIEW",
        title: "Overview",
        markdown:
          "current product/domain engineering candidate centered on a knowledge-first IELTS learning system.",
      },
      {
        kind: "KNOWN_LIMITATIONS",
        title: "Known limitations",
        markdown:
          "the portfolio does not yet publish outcome/operation claims that are not independently evidenced.",
      },
    ],
    evidence: [],
    technologies: [],
    externalLinks: [],
    createdAt: portfolioTimestamp,
    updatedAt: portfolioTimestamp,
  },
  {
    _id: "governed-agentic-engineering-system",
    schemaVersion: 1,
    slug: "governed-agentic-engineering-system",
    title: "Governed Agentic Engineering System",
    summary:
      "A current system candidate spanning architecture, skills, documents, standards, and local runtime governance.",
    category: "AGENTIC_SYSTEM",
    collection: "WORK",
    featuredRank: 2,
    currentRank: 2,
    repositoryReferences: [
      {
        label: "architect-profile",
        url: "https://github.com/phatnguyen03022001/architect-profile",
      },
      {
        label: "agent-skills",
        url: "https://github.com/phatnguyen03022001/agent-skills",
      },
      {
        label: "agent-documents",
        url: "https://github.com/phatnguyen03022001/agent-documents",
      },
      {
        label: "agent-standards",
        url: "https://github.com/phatnguyen03022001/agent-standards",
      },
      {
        label: "agent-runtime",
        url: "https://github.com/phatnguyen03022001/agent-runtime",
      },
    ],
    sections: [
      {
        kind: "OVERVIEW",
        title: "Overview",
        markdown:
          "current agentic engineering system candidate spanning architect-profile, agent-skills, agent-documents, agent-standards, and agent-runtime.",
      },
      {
        kind: "KNOWN_LIMITATIONS",
        title: "Known limitations",
        markdown:
          "the portfolio does not collapse repository/task evidence into a synthetic maturity or production-readiness score.",
      },
    ],
    evidence: [],
    technologies: [],
    externalLinks: [],
    createdAt: portfolioTimestamp,
    updatedAt: portfolioTimestamp,
  },
] as const;
