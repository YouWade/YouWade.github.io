export type Locale = 'zh-TW' | 'en'

// All translatable strings in the app
export interface Translations {
  nav: {
    about: string
    experience: string
    ai: string
    skills: string
    contact: string
  }
  hero: {
    greeting: string
    title: string
    bio: string
  }
  experience: {
    sectionTitle: string
    workTitle: string
    bullets: string[]
    projectsLabel: string
    projects: {
      scanup: { subtitle: string; summary: string }
      lnez: { subtitle: string; summary: string }
      linebot: { subtitle: string; summary: string }
      taskManager: { subtitle: string; summary: string }
      fengti: { subtitle: string; summary: string }
    }
  }
  ai: {
    sectionTitle: string
    intro: {
      text1: string
      highlight1: string
      text2: string
      highlight2: string
      text3: string
      highlight3: string
      text4: string
    }
    workflowLabel: string
    workflow: {
      title: string
      description: string
    }[]
    verificationLabel: string
    verification: {
      title: string
      description: string
    }[]
    securityLabel: string
    security: {
      title: string
      details: string[]
    }[]
    lessonsLabel: string
    lessons: {
      incident: string
      root: string
      fix: string
    }[]
    principlesLabel: string
    principles: string[]
  }
  skills: {
    sectionTitle: string
    coreLabel: string
    otherLabel: string
    softSkills: string[]
  }
  education: {
    sectionTitle: string
    institution: string
    department: string
    capstoneLabel: string
    capstoneName: string
    capstoneSummary: string
  }
  contact: {
    eyebrow: string
    heading: string
    subtext: string
    formTitle: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submit: string
    submitting: string
    success: string
    error: string
  }
  footer: {
    builtWith: string
  }
}
