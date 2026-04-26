/**
 * Single source of truth for the resume content.
 * Sourced from Khandelwal_Ankit.docx (committed at repo root).
 * All four /holographic, /workspace, /constellation, /dashboard
 * variations render from this same data.
 */

export interface Identity {
  name: string;
  title: string;
  city: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string[];
}

export interface SkillGroup {
  name: string;
  level: number; // 0..1, used for visual emphasis
  items: string[];
  color: string; // hex, palette per group
}

export interface Role {
  title: string;
  company: string;
  client?: string;
  location: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM | 'Present'
  bullets: string[];
  platforms?: string[];
}

export interface Project {
  name: string;
  url: string;
  stack: string[];
  blurb: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: number;
  credential?: string;
}

export interface Education {
  degree: string;
  school: string;
  years: string;
}

export const IDENTITY: Identity = {
  name: 'Ankit Khandelwal',
  title:
    'Senior Full Stack Architect · Financial Services & FinTech · AI/ML Integration · Engineering Lead',
  city: 'Dallas, TX',
  email: 'ankitcts@gmail.com',
  phone: '(682) 772-0096',
  github: 'github.com/ankitcts',
  linkedin: 'linkedin.com/in/ankitkhandelwal101',
  summary: [
    'Senior Full Stack Architect and Engineering Lead with 20+ years of experience building enterprise-scale digital platforms — including 12+ years delivering complex wealth management and financial products at Goldman Sachs.',
    'Expert in end-to-end architecture across React / Next.js, Node.js, Python, GraphQL, and cloud-native deployments — with a proven track record of leading distributed engineering teams, managing SOW and delivery governance, and shipping high-reliability platforms across 20+ release cycles.',
    'Actively integrating AI/ML and LLM workflows (LangChain, OpenAI, RAG) into production financial applications — bridging modern AI capabilities with enterprise engineering rigour.',
  ],
};

export const SKILLS: SkillGroup[] = [
  {
    name: 'Languages',
    level: 0.95,
    color: '#22d3ee',
    items: ['TypeScript', 'JavaScript (ES6+)', 'Python'],
  },
  {
    name: 'Frameworks',
    level: 0.95,
    color: '#a855f7',
    items: [
      'React',
      'Angular',
      'Next.js',
      'Node.js',
      'Express.js',
      'Micro-Frontend Architecture',
    ],
  },
  {
    name: 'Engineering',
    level: 0.92,
    color: '#facc15',
    items: [
      'Design Systems',
      'Monorepo',
      'REST API Design',
      'GraphQL',
      'State (Redux / MobX / Zustand)',
      'Webpack / Vite',
      'Performance',
      'TDD',
      'Microservices',
    ],
  },
  {
    name: 'Accessibility',
    level: 0.85,
    color: '#10b981',
    items: ['WCAG 2.1 AA', 'ARIA'],
  },
  {
    name: 'DevOps',
    level: 0.88,
    color: '#f97316',
    items: [
      'CI/CD',
      'Docker',
      'AWS (EC2, S3, Lambda)',
      'IBM Cloud (Code Engine)',
      'Git',
      'Agile / Jira',
      'System Design',
      'Cloud-Native',
    ],
  },
  {
    name: 'AI / ML',
    level: 0.82,
    color: '#ec4899',
    items: [
      'LangChain',
      'OpenAI / GPT-4',
      'RAG',
      'Pinecone / FAISS',
      'LLM API Integration',
      'Agentic UI',
      'Prompt Engineering',
      'AI Workflow Automation',
    ],
  },
  {
    name: 'Design',
    level: 0.7,
    color: '#06b6d4',
    items: ['Figma'],
  },
];

export const ROLES: Role[] = [
  {
    title: 'Senior Manager — Experience Engineering',
    company: 'Sapient Corporation',
    client: 'Goldman Sachs — Asset & Wealth Management',
    location: 'Dallas, TX',
    start: '2021-11',
    end: 'Present',
    bullets: [
      'Architected production full-stack applications for Goldman Sachs AWM — transactional UIs in React/Next.js, Node.js/Express APIs, and real-time dashboards for global wealth practitioners and HNW clients.',
      'Engineered an enterprise-scale component library across 6+ products — reducing front-end dev time by 40% across 20+ releases.',
      'Integrated LLM-powered workflows (Python + LangChain); built Node.js backend APIs supporting real-time advisor dashboards — improving task throughput by 25%.',
      'Defined architecture standards and quality gates across 20+ release cycles; drove UAT sign-off with zero design-intent drift at production.',
      'Led and mentored a distributed team of engineers and designers across multiple time zones; established Jira-based sprint cadence, code review culture, and engineering documentation standards.',
      'Partnered with GS product owners and stakeholders to define SOW scope, manage milestones, and present architecture decisions at steering-committee level.',
    ],
    platforms: [
      'AWM Core Banking',
      'Funds Transfer',
      'Unified Onboarding',
      'GS Authentication',
      'OOBA Verification',
    ],
  },
  {
    title: 'Senior Manager — Experience Engineering',
    company: 'Sapient Corporation',
    client:
      'Goldman Sachs — Private Wealth Management, Asset Management & Alternative Investments',
    location: 'Dallas, TX',
    start: '2013-04',
    end: '2021-11',
    bullets: [
      'Delivered wealth management features across goldman.com — Portfolio, Transfers, Onboarding, Insights — using React, Node.js, and REST APIs for HNW clients and advisors globally.',
      'Engineered shared libraries across 8+ product workstreams — reducing front-end dev time by 30% across 15+ releases; owned UAT handoff and production readiness.',
      'Defined architecture standards for GS Insights and Onboarding platforms; drove 35% page-load improvement through asset optimisation, code splitting, and API tuning.',
      'Built Portfolio and Transfers visualisation layers for alternative investment platforms; established technical governance reducing defect rate by 20%.',
      'Led GS stakeholder engagement — owning SOW reviews, resource planning, and cross-functional coordination with product, UX, and compliance across multi-workstream programmes.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Avaya India Pvt. Ltd.',
    location: 'Bangalore',
    start: '2011-10',
    end: '2013-04',
    bullets: [
      'Built web interfaces using ExtJS (Sencha) for Avaya router management and network configuration tools.',
    ],
  },
  {
    title: 'IT Analyst',
    company: 'TATA Consultancy Services (TCS)',
    location: 'Bangalore',
    start: '2011-06',
    end: '2011-10',
    bullets: [
      'Developed web interfaces using Dojo framework for Cisco device management and network monitoring dashboards.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'America Online (AOL)',
    location: 'Bangalore',
    start: '2008-02',
    end: '2011-05',
    bullets: [
      'Delivered web domain projects using PHP, JavaScript, MySQL, and Perl; built ETL pipelines using Talend for data integration across AOL web properties.',
    ],
  },
  {
    title: 'Programmer Analyst',
    company: 'Cognizant Technology Solutions',
    location: 'Pune',
    start: '2006-11',
    end: '2008-02',
    bullets: [
      'Developed BI reporting solutions using Business Objects XI (BOXI) and ETL pipelines for enterprise data warehousing and analytics.',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Foreign-Born Congress Members Tracker',
    url: 'https://foreignborncongressmembers.com',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'Chart.js', 'Claude API', 'Vercel'],
    blurb:
      'Full-stack data dashboard tracking 125+ foreign-born US Congress members across 38 countries; interactive world map, timeline player, SEO-optimized pages, GitHub Actions CI/CD on Vercel.',
  },
  {
    name: 'U Visa Tracker',
    url: 'https://uvisatracker.com',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind',
      'R3F + drei',
      'Chart.js',
      'Groq LLM',
      'Vercel',
    ],
    blurb:
      'Public-data dashboard for the U nonimmigrant visa (USCIS Form I-918) — aggregate filings, live news feed, 3D history gallery, server-side TTS narration, nightly auto-data-sync workflow that auto-PRs new USCIS data.',
  },
  {
    name: 'Social Media Automation Pipeline',
    url: 'https://www.reddit.com/r/CongressTracker/',
    stack: ['Python', 'Playwright', 'PRAW', 'AT Protocol', 'Tweepy', 'GitHub Actions'],
    blurb:
      'Serverless content automation generating 100 unique social posts per cycle via headless-browser screenshots; auto-publishes to Bluesky, Twitter/X, and Reddit on GitHub Actions cron.',
  },
  {
    name: 'GenAI Assistant',
    url: 'https://genai-assistant.27t87ldnhmk3.us-south.codeengine.appdomain.cloud/',
    stack: ['LangChain', 'Python', 'IBM Cloud Code Engine'],
    blurb:
      'LangChain-powered conversational AI assistant deployed on IBM Cloud Code Engine; demonstrates end-to-end LLM application architecture and cloud-native production deployment.',
  },
  {
    name: 'Angular Portfolio App',
    url: 'http://98-86-83-222.nip.io/',
    stack: ['Angular', 'AWS EC2'],
    blurb:
      'Angular SPA built and self-hosted on AWS EC2; demonstrates end-to-end deployment ownership outside managed cloud platforms.',
  },
  {
    name: 'SuperKart Sales Predictor',
    url: 'https://huggingface.co/spaces/ankitcts/superkart-streamlit-frontend',
    stack: ['Python', 'Flask', 'Streamlit', 'Hugging Face'],
    blurb:
      'Decoupled microservice: Flask REST API + Streamlit frontend, independently deployed on Hugging Face Spaces.',
  },
  {
    name: 'Boston Housing Predictor',
    url: 'https://huggingface.co/spaces/ankitcts/bouston-housing-prediction',
    stack: ['Python', 'Scikit-learn', 'Hugging Face'],
    blurb:
      'End-to-end ML pipeline with live prediction UI; demonstrates AI-integrated product architecture shipped to production.',
  },
  {
    name: 'Coding Practice Platform',
    url: 'https://projects-coder.onrender.com/',
    stack: ['Node.js', 'Express', 'Render', 'Netlify'],
    blurb:
      'LeetCode-style challenge platform; Node/Express API on Render + responsive frontend on Netlify. Full-stack architectural ownership.',
  },
];

export const CERTIFICATIONS: Certification[] = [
  { title: 'Introduction to AI Agents', issuer: 'Great Learning', year: 2026, credential: 'QTVEQOQG' },
  { title: 'Python Foundations', issuer: 'Great Learning', year: 2026, credential: 'AKIREFVU' },
  {
    title: 'Introduction to Generative AI Learning Path',
    issuer: 'Google Cloud / Coursera',
    year: 2026,
  },
  { title: 'Introduction to IT and AWS Cloud', issuer: 'Amazon Web Services / Coursera', year: 2026 },
  { title: 'Claude Code in Action', issuer: 'Anthropic / Coursera', year: 2026 },
];

export const EDUCATION: Education[] = [
  {
    degree: 'Post Graduate Program — AI and ML: Business Applications',
    school: 'University of Texas at Austin · McCombs School of Business',
    years: '2025 – 2026',
  },
  { degree: 'M.Sc. Computer Science', school: 'Manipal University', years: '2013' },
  { degree: 'B.E. Mechanical Engineering', school: 'University of Rajasthan', years: '2006' },
];

export const STATS = {
  yearsExperience: 20,
  yearsAtGS: 12,
  releasesShipped: 35,
  productsShipped: 14,
} as const;

export const VARIATIONS = [
  {
    slug: 'holographic',
    name: 'Holographic Terminal',
    blurb: 'Sci-fi OS booting up — z-stacked panels, scan lines, custom shaders.',
    accent: '#22d3ee',
  },
  {
    slug: 'workspace',
    name: 'Pixar Workspace',
    blurb: 'A 3D desk that comes alive — pick up the resume, click the keyboard.',
    accent: '#a47148',
  },
  {
    slug: 'constellation',
    name: 'Constellation',
    blurb: 'A star field of skills + projects — connections glow as you explore.',
    accent: '#a855f7',
  },
  {
    slug: 'dashboard',
    name: 'Tilted Dashboard',
    blurb: 'Bloomberg-terminal panels in 3D-tilted perspective with live KPIs.',
    accent: '#fde047',
  },
] as const;

export type VariationSlug = (typeof VARIATIONS)[number]['slug'];
