// Usage:
// <Experience />
//
// Left-aligned numbered section header ("01." + title + horizontal rule),
// one full-width work card with pixel corner decorations,
// and side projects in a 2-column grid with pixel corner decorations.
// 8-bit pixel style: square corners, dashed borders, pixel font for numbering,
// pixel corner squares on cards, active:translate-y-[1px] press effect.

import { motion } from 'framer-motion'

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

interface WorkExperience {
  /** Job title */
  title: string
  /** Company name */
  company: string
  /** Employment period */
  period: string
  /** Bullet-point responsibilities */
  bullets: string[]
  /** Technology tags */
  tags?: string[]
}

interface SideProject {
  /** Project name */
  name: string
  /** Client or context label */
  context?: string
  /** Date range */
  period: string
  /** Technology tags */
  tags: string[]
  /** Single sentence description */
  summary: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const WORK_EXPERIENCE: WorkExperience = {
  title: 'Front-End Engineer',
  company: 'GLSoft',
  period: 'Jul 2022 — Present',
  bullets: [
    '獨立負責前端網頁開發，主要運用 Angular 與 TypeScript 完成功能實作及與 SAP 系統整合',
    '應用 IMPEX 進行 Slot 與 Component 匯入後端，並依據 Figma 設計稿進行切版、功能開發與 API 串接',
    '主動與客戶方工程師協作，精確釐清需求與解決任務難題，確保專案按時交付',
    '熟悉操作 SAP ERP 的 Backoffice 與 hac 平台',
  ],
  tags: ['Angular', 'TypeScript', 'SAP', 'IMPEX', 'Figma', 'REST API'],
}

const SIDE_PROJECTS: SideProject[] = [
  {
    name: '形象網站製作',
    context: '瘋貼車體包膜',
    period: 'Jun 2023 — Aug 2023',
    tags: ['WordPress', 'SEO'],
    summary: '多頁式形象網站，優化架構提升用戶體驗及網站效能',
  },
  {
    name: '任務管理系統',
    period: '2023',
    tags: ['React', 'Context API', 'LocalStorage'],
    summary: '公司內部任務規劃系統，使用 Hook、Context API、LocalStorage',
  },
  {
    name: '車輛診斷系統',
    context: '大學專題',
    period: '2020 — 2021',
    tags: ['Android Studio', 'Java', 'Python', 'MySQL', 'Laravel'],
    summary: '手機 APP 透過 OBD 藍芽連接，模擬故障資訊顯示',
  },
]

// ─── Main Component ───────────────────────────────────────────────────────────

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Work experience and side projects"
      className="border-t-2 border-dashed border-navy-lightest/40 pt-16 md:pt-20"
    >
      <div>

        {/* ── Section heading (left-aligned, numbered) ────────────────────── */}
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
            Work Experience
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="flex-1 border-t-2 border-dashed border-navy-lightest"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Work card ──────────────────────────────────────────────────── */}
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
            {/* Pixel corner decorations */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-accent" aria-hidden="true" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-accent" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-accent" aria-hidden="true" />

            {/* Top row: title/company + period */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-6">
              <div>
                <p className="text-lg font-semibold text-slate-200 leading-snug">
                  {WORK_EXPERIENCE.title}
                </p>
                <p className="text-sm text-accent-light mt-0.5">
                  {WORK_EXPERIENCE.company}
                </p>
              </div>
              <time className="font-mono text-xs text-slate-500 sm:shrink-0 sm:mt-1">
                {WORK_EXPERIENCE.period}
              </time>
            </div>

            {/* Responsibilities */}
            <ul className="space-y-3 mb-7" role="list">
              {WORK_EXPERIENCE.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-slate-400 leading-relaxed"
                >
                  <span className="text-accent shrink-0 mt-0.5" aria-hidden="true">▹</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tech tags */}
            {WORK_EXPERIENCE.tags && WORK_EXPERIENCE.tags.length > 0 && (
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label="Technologies used"
              >
                {WORK_EXPERIENCE.tags.map((tag) => (
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

        {/* ── Side Projects ───────────────────────────────────────────────── */}
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
            Side Projects
          </motion.p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            role="list"
            aria-label="Side projects"
          >
            {SIDE_PROJECTS.map((project) => (
              <motion.div
                key={project.name}
                role="listitem"
                variants={fadeUp}
                className="relative bg-navy-light/50 border-2 border-navy-lightest/30 rounded-none p-5 flex flex-col
                           hover:border-accent/60 active:translate-y-[1px] transition-colors"
              >
                {/* Pixel corner decorations */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-accent/60" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent/60" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-accent/60" aria-hidden="true" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-accent/60" aria-hidden="true" />

                <p className="text-sm font-semibold text-slate-200 leading-snug">
                  {project.name}
                </p>
                {project.context && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {project.context}
                  </p>
                )}
                <time className="font-mono text-xs text-slate-600 mt-1">
                  {project.period}
                </time>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed flex-1">
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
                      className="font-mono text-xs bg-accent-tint text-accent-light rounded-none px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
