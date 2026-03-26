// Usage:
// <Experience />
//
// Left-aligned numbered section header ("01." + title + horizontal rule),
// one full-width work card with pixel corner decorations,
// and projects in a 2-column grid with thumbnail images, tech tags, and links.

import { motion } from 'framer-motion'
import {
  PawPrint,
  ArrowSquareOut,
} from '@phosphor-icons/react'
import { useI18n } from '../i18n'

// ─── Animation config ────────────────────────────────────────────────────────

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectKey = 'scanup' | 'lnez' | 'linebot' | 'taskManager' | 'fengti'

interface ProjectConfig {
  key: ProjectKey
  name: string
  tags: string[]
  image?: string
  Icon?: React.ElementType
  iconColor?: string
  gradient?: string
  link?: string
}

interface Project extends ProjectConfig {
  subtitle: string
  summary: string
}

// ─── Static config (non-translatable fields) ──────────────────────────────────

const WORK_COMPANY = 'GLSoft'
const WORK_PERIOD = 'Jul 2022 — Present'
const WORK_TAGS = ['Angular', 'TypeScript', 'SAP', 'IMPEX', 'Figma', 'REST API']

const PROJECT_CONFIGS: ProjectConfig[] = [
  {
    key: 'scanup',
    name: 'ScanUp',
    tags: ['React 19', 'TypeScript', 'Turborepo', 'Zustand', 'TanStack Query', 'Stripe', 'Docker', 'GCP'],
    Icon: PawPrint,
    iconColor: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-cyan-500/20',
  },
  {
    key: 'lnez',
    name: 'lnez-website',
    tags: ['React', 'TypeScript', 'RWD', 'REST API'],
    image: '/projects/lnez.png',
    link: 'https://youwade.github.io/freelancing-lnez/',
  },
  {
    key: 'linebot',
    name: 'Line Bot 患者管理',
    tags: ['Node.js', 'Line Messaging API', 'Webhook'],
    image: '/projects/linebot.png',
    link: 'https://docs.google.com/presentation/d/11O6BOesXiONenlBPlJx7Zzje0D3TziDKylIroBOXAq0',
  },
  {
    key: 'taskManager',
    name: '任務管理系統',
    tags: ['React', 'Context API', 'LocalStorage', 'Hooks'],
    image: '/projects/task.webp',
    link: 'https://drive.google.com/file/d/1LCY-oEUApk2ChPkfJL345ew3h1udEup3',
  },
  {
    key: 'fengti',
    name: '瘋貼車體包膜',
    tags: ['WordPress', 'Fullpage.js', 'Facebook Pixel', 'SEO'],
    image: '/projects/fengti.webp',
  },
]

// ─── Pixel Corners Helper ────────────────────────────────────────────────────

function PixelCorners({ className = 'bg-accent' }: { className?: string }) {
  return (
    <>
      <div className={`absolute top-0 left-0 w-1.5 h-1.5 ${className}`} aria-hidden="true" />
      <div className={`absolute top-0 right-0 w-1.5 h-1.5 ${className}`} aria-hidden="true" />
      <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 ${className}`} aria-hidden="true" />
      <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 ${className}`} aria-hidden="true" />
    </>
  )
}

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <motion.div
      variants={fadeUp}
      className={`relative bg-navy-light/50 border-2 border-navy-lightest/30 rounded-none
                  flex flex-col overflow-hidden h-full
                  hover:border-accent/60 active:translate-y-[1px] transition-colors group
                  ${project.link ? 'cursor-pointer' : ''}`}
    >
      <PixelCorners className="bg-accent/60" />

      {/* Thumbnail area */}
      {project.image ? (
        <div className="relative h-32 overflow-hidden border-b-2 border-navy-lightest/20">
          <img
            src={project.image}
            alt={`${project.name} screenshot`}
            className="w-full h-full object-cover object-top
                       opacity-70 group-hover:opacity-90 transition-opacity duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-light/80 to-transparent" />
        </div>
      ) : (
        <div
          className={`relative h-32 flex items-center justify-center
                      bg-gradient-to-br ${project.gradient}
                      border-b-2 border-navy-lightest/20`}
        >
          {project.Icon && (
            <project.Icon
              size={48}
              weight="duotone"
              className={`${project.iconColor} opacity-60 group-hover:opacity-90 transition-opacity`}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-baseline gap-2 mb-1">
          <p className="text-sm font-semibold text-slate-200 leading-snug">
            {project.name}
          </p>
          {project.link && (
            <ArrowSquareOut
              size={14}
              weight="bold"
              className="text-slate-500 group-hover:text-accent-light transition-colors shrink-0"
              aria-hidden="true"
            />
          )}
        </div>
        <span className="text-[10px] text-accent-light/70 font-mono mb-1">
          {project.subtitle}
        </span>

        <p className="text-xs text-slate-400 leading-relaxed flex-1">
          {project.summary}
        </p>

        <div
          className="flex flex-wrap gap-1.5 mt-3"
          role="list"
          aria-label="Technologies"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="font-mono text-[10px] bg-accent-tint text-accent-light rounded-none px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        role="listitem"
        className="no-underline"
        aria-label={`${project.name} — 開啟外部連結`}
      >
        {inner}
      </a>
    )
  }

  return <div role="listitem">{inner}</div>
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Experience() {
  const { t } = useI18n()

  // Build projects by merging static config with translated text
  const projects: Project[] = PROJECT_CONFIGS.map((config) => ({
    ...config,
    subtitle: t.experience.projects[config.key].subtitle,
    summary: t.experience.projects[config.key].summary,
  }))

  return (
    <section
      id="experience"
      aria-label="Work experience and projects"
      className="border-t-2 border-dashed border-navy-lightest/40 pt-16 md:pt-20"
    >
      <div>

        {/* ── Section heading ──────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="flex items-center gap-4 mb-12"
        >
          <motion.h2
            variants={fadeUp}
            className="flex items-baseline gap-2 shrink-0 text-2xl md:text-3xl font-bold text-slate-200 tracking-tight whitespace-nowrap"
          >
            <span
              className="text-accent-light text-xs md:text-sm"
              style={{ fontFamily: "'Press Start 2P'" }}
            >
              01.
            </span>
            {t.experience.sectionTitle}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="flex-1 border-t-2 border-dashed border-navy-lightest"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Work card ──────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.div
            variants={fadeUp}
            className="relative bg-navy-light border-2 border-navy-lightest rounded-none p-6 md:p-8
                       hover:border-accent/60 active:translate-y-[1px] transition-colors"
          >
            <PixelCorners />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-6">
              <div>
                <p className="text-lg font-semibold text-slate-200 leading-snug">
                  {t.experience.workTitle}
                </p>
                <p className="text-sm text-accent-light mt-0.5">
                  {WORK_COMPANY}
                </p>
              </div>
              <time className="font-mono text-xs text-slate-500 sm:shrink-0 sm:mt-1">
                {WORK_PERIOD}
              </time>
            </div>

            <ul className="space-y-3 mb-7" role="list">
              {t.experience.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-slate-400 leading-relaxed"
                >
                  <span className="text-accent shrink-0 mt-0.5" aria-hidden="true">▹</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {WORK_TAGS.length > 0 && (
              <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                {WORK_TAGS.map((tag) => (
                  <span
                    key={tag}
                    role="listitem"
                    className="font-mono text-xs px-2 py-0.5 rounded-none bg-accent-tint border border-accent/20 text-accent-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* ── Projects ──────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-12 mb-6"
          >
            {t.experience.projectsLabel}
          </motion.p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
            aria-label="Projects"
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
