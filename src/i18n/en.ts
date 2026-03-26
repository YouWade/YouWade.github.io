import type { Translations } from './types'

export const en: Translations = {
  nav: {
    about: 'About',
    experience: 'Experience',
    ai: 'AI',
    skills: 'Skills',
    contact: 'Contact',
  },
  hero: {
    greeting: 'Hi, my name is',
    title: 'Front-End Engineer',
    bio: '4 years of front-end experience specializing in Angular & TypeScript. Capable of independently delivering full front-end products — from Figma mockups, component development, API integration to SAP enterprise system integration, leveraging AI multi-agent workflows to boost development efficiency and code quality.',
  },
  experience: {
    sectionTitle: 'Work Experience',
    workTitle: 'Front-End Engineer',
    bullets: [
      'Independently led front-end development for multiple SAP integration projects using Angular & TypeScript, building feature modules from scratch with 100% on-time delivery',
      'Precisely implemented UI from Figma designs, streamlined front-end/back-end integration workflow using IMPEX for Slot & Component imports',
      'Proactively collaborated with client-side engineers to clarify requirements, reducing communication overhead and accelerating delivery',
      'Proficient in SAP ERP Backoffice & hac platform operations, independently handling enterprise system integrations uncommon for typical front-end engineers',
    ],
    projectsLabel: 'Projects',
    projects: {
      scanup: {
        subtitle: 'Pet Grooming Booking Platform',
        summary: 'Helps pet owners book grooming services with one tap. Turborepo Monorepo tri-app architecture (Consumer / Seller / Admin) with AI pet scanning, map search & Stripe payments',
      },
      lnez: {
        subtitle: 'E-commerce Website',
        summary: 'Complete shopping experience from browsing to checkout, featuring search & filters, cart, multiple payment methods, member center, and responsive design',
      },
      linebot: {
        subtitle: 'Medical Line Bot',
        summary: 'Enables medical staff to query and manage patient records directly in Line without switching systems, with fuzzy search and duplicate detection',
      },
      taskManager: {
        subtitle: 'Enterprise Internal Tool',
        summary: 'Solves internal task assignment and tracking needs with Context API global state management and LocalStorage data persistence',
      },
      fengti: {
        subtitle: 'Corporate Website',
        summary: 'Delivered corporate website built with WordPress and Fullpage.js for full-page scroll experience, with Facebook Pixel integration for ad tracking and user behavior analysis',
      },
    },
  },
  ai: {
    sectionTitle: 'AI Development',
    intro: {
      text1: 'Using ',
      highlight1: 'Claude Code',
      text2: ' as the core AI development partner, established a comprehensive',
      highlight2: ' AI-assisted development workflow',
      text3: ' in the ScanUp project (Turborepo Monorepo tri-app architecture). Core principle: AI participates in every step, but',
      highlight3: ' humans retain decision-making authority',
      text4: ', and all outputs must trace back to specific specification sources.',
    },
    workflowLabel: 'Multi-Agent Workflow',
    workflow: [
      {
        title: 'Architecture Planning → SDD Constraints',
        description: 'Planner / Architect Agents auto-generate PRD, System Design Documents (SDD) & task breakdown. SDD serves as AI ground truth, preventing hallucinations in subsequent development',
      },
      {
        title: 'Multi-Agent Collaboration + File Boundaries',
        description: 'Each Agent is locked to strict file boundaries — api-engineer can only modify types + api-client, hook-engineer can only modify hooks. Cross-layer modifications forbidden, blast radius confined to a single layer',
      },
      {
        title: 'Git Worktree Isolation',
        description: 'All sub-agents operate in isolated Git Worktrees, changes never go directly to main branch. If something breaks, discard the branch and restart — built-in rollback mechanism',
      },
      {
        title: 'Three-Part Acceptance (Auto-Triggered)',
        description: 'After each implementation, three independent Agents auto-trigger: Validator runs lint + typecheck and fixes errors, Code Reviewer audits quality & performance via checklist, UI/UX Designer checks visual compliance against design specs',
      },
      {
        title: 'OpenAPI MCP Spec Validation',
        description: 'Before API modifications, OpenAPI MCP queries Swagger specs to confirm fields & paths. Caught AI writing /merchant/apply instead of /merchants/apply (missing one "s" → 404)',
      },
    ],
    verificationLabel: 'Verification Pipeline',
    verification: [
      {
        title: 'Automated Checks',
        description: 'local-ci command chain: package security scan → ESLint → TypeScript type checking, Turborepo runs all three apps in parallel. Failed Docker builds on Cloud Build block deployment',
      },
      {
        title: 'Visual Regression Testing',
        description: 'Playwright screenshot scripts auto-login to all three apps and capture page-by-page screenshots, diffing against previous versions. RWD manually verified at 375 / 768 / 1024 / 1920 breakpoints',
      },
      {
        title: 'Manual Flow Verification',
        description: 'Test accounts walk through critical user flows — form validation, OAuth redirects, state-based navigation. Code touching Axios interceptor, useAuth, or cross-app shared modules requires line-by-line review before merge',
      },
    ],
    securityLabel: 'Security & Risk Control',
    security: [
      {
        title: 'Three-Layer Data Isolation',
        details: [
          'Layer 1: .gitignore excludes .env / .pem / credentials — agents cannot commit them',
          'Layer 2: Agent spec files lock down file boundaries, write scope is fixed',
          'Layer 3: Sensitive data stored in .claude/ directory (gitignored), API keys injected via CI',
        ],
      },
      {
        title: 'AI Output Protection',
        details: [
          'Types must align with Swagger schema, no invented fields — rejected if not traceable to spec',
          'Never feed entire external docs, limit searches to 60-100 lines to prevent context pollution',
          'Separation of production and review — the API-writing Agent and reviewing Agent are different roles, cross-checking each other',
          'API call limit of 2 max, preventing hallucination-driven API spam',
        ],
      },
      {
        title: 'Prompt Injection Protection',
        details: [
          'Agent self-check checklist: type alignment, path existence, correct HTTP method',
          'Dedicated injection detection agent communicates with sub-agents for verification, then reports to main agent',
          'Claude Code platform built-in: tool return content suspected of injection triggers user alert',
          'Production API calls strictly forbidden — only public Swagger endpoints queried during development',
        ],
      },
    ],
    lessonsLabel: 'Lessons Learned',
    lessons: [
      {
        incident: 'AI Invented Non-existent Swagger Fields',
        root: 'Type checks passed but production read undefined — multiple consecutive commits fixing build failures',
        fix: 'Added rule: "Types must align with Swagger, no invented fields" + every field must trace back to Swagger source',
      },
      {
        incident: 'Code Splitting Refactor Broke Pages',
        root: "Agent didn't just change import patterns — it also modified JSX structure and business logic → white screen",
        fix: 'Rolled back to pre-refactor version. Added rule: refactoring tasks must have zero functional and zero visual changes, prompts must explicitly state "what NOT to touch"',
      },
      {
        incident: 'Authentication Solutions Contradicted Each Other',
        root: 'Two SDDs recommended HttpOnly Cookie and localStorage respectively, causing architectural conflict',
        fix: 'Checked Swagger response confirming JWT return (not Set-Cookie), inspected existing interceptor — decisions based on system facts, not AI speculation',
      },
    ],
    principlesLabel: 'Core Principles',
    principles: [
      "Minimize agent freedom — more specific prompts are safer. Better to run multiple rounds than give too large a scope at once",
      "All AI outputs must trace back to a specific specification source — reject anything that can't",
      'Feed data in limited scope (specific files, specific lines), never ask open-ended questions like "how does this project work"',
      'Security-related code (auth, authorization, cross-app shared) never fully relies on AI — always line-by-line review before merge',
      'Prompts should state "what NOT to do" not just "what to do" — constraints matter more than instructions',
    ],
  },
  skills: {
    sectionTitle: 'Technical Skills',
    coreLabel: 'Core Stack',
    otherLabel: 'Other Strengths',
    softSkills: [
      'Cross-team Requirements',
      'Independent & Team Work',
      'Root Cause Analysis',
      'AI Engineering Workflow',
      'Spec-Driven Development',
      'Continuous Learning',
    ],
  },
  education: {
    sectionTitle: 'Education',
    institution: 'Shu-Te University',
    department: 'Dept. of Information Engineering',
    capstoneLabel: 'Capstone Project',
    capstoneName: 'Vehicle Diagnostic System — Lanya',
    capstoneSummary: 'Mobile app connecting to vehicles via OBD Bluetooth, reading real-time data and simulating fault information display and diagnostics',
  },
  contact: {
    eyebrow: 'Get In Touch',
    heading: "Let's Build Something Together",
    subtext: 'Looking for a team that values code quality and engineering culture — open to frontend, fullstack, or AI engineering roles',
    formTitle: 'Leave a Message',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'Message',
    messagePlaceholder: 'What would you like to say...',
    submit: 'Send Message',
    submitting: 'Sending...',
    success: 'Message sent, thank you for reaching out!',
    error: 'Failed to send. Please try again later or email me directly.',
  },
  footer: {
    builtWith: '· Built with React + TypeScript · 2026',
  },
}
