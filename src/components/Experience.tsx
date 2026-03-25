// Usage:
// <Experience />
//
// Left-aligned numbered section header ("01." + title + horizontal rule),
// one full-width work card with pixel corner decorations,
// and projects in a 2-column grid with thumbnail images, tech tags, and links.

import { motion } from 'framer-motion'
import {
  PawPrint,
  Wrench,
  ArrowSquareOut,
} from '@phosphor-icons/react'

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
  title: string
  company: string
  period: string
  bullets: string[]
  tags?: string[]
}

interface Project {
  name: string
  subtitle: string
  summary: string
  tags: string[]
  /** Screenshot image path */
  image?: string
  /** Phosphor icon (fallback when no image) */
  Icon?: React.ElementType
  iconColor?: string
  gradient?: string
  /** External link (GitHub Pages, PPT, repo) */
  link?: string
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

const PROJECTS: Project[] = [
  {
    name: 'ScanUp',
    subtitle: '寵物美容預約平台',
    summary:
      'Turborepo Monorepo 三端架構（Consumer / Seller / Admin），AI 寵物掃描、地圖搜尋、Stripe 金流整合',
    tags: ['React 19', 'TypeScript', 'Turborepo', 'Zustand', 'TanStack Query', 'Stripe', 'Docker', 'GCP'],
    Icon: PawPrint,
    iconColor: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-cyan-500/20',
  },
  {
    name: 'lnez-website',
    subtitle: '電商網站',
    summary:
      '完整電商流程：商品搜尋篩選、購物車、多種付款結帳、會員中心，桌面與手機響應式設計',
    tags: ['React', 'TypeScript', 'RWD', 'REST API'],
    image: '/projects/lnez.png',
    link: 'https://youwade.github.io/freelancing-lnez/',
  },
  {
    name: 'Line Bot 患者管理',
    subtitle: '醫療 Line Bot',
    summary:
      '透過 Line Bot 進行患者 CRUD，支援格式提示、電話模糊搜尋與重複資料檢測',
    tags: ['Node.js', 'Line Messaging API', 'Webhook'],
    image: '/projects/linebot.png',
    link: 'https://docs.google.com/presentation/d/11O6BOesXiONenlBPlJx7Zzje0D3TziDKylIroBOXAq0',
  },
  {
    name: '任務管理系統',
    subtitle: '企業內部工具',
    summary:
      '公司內部任務規劃系統，Context API 全域狀態管理，LocalStorage 資料持久化',
    tags: ['React', 'Context API', 'LocalStorage', 'Hooks'],
    image: '/projects/task.webp',
    link: 'https://drive.google.com/file/d/1LCY-oEUApk2ChPkfJL345ew3h1udEup3',
  },
  {
    name: '瘋貼車體包膜',
    subtitle: '形象網站',
    summary:
      '企業形象網站，使用 Next.js + Fullpage.js 打造全頁滾動體驗，優化 SEO 與用戶體驗',
    tags: ['Next.js', 'React', 'Fullpage.js', 'Tailwind CSS'],
    image: '/projects/fengti.webp',
  },
  {
    name: '車輛診斷系統',
    subtitle: '大學專題 — 藍雅',
    summary:
      '手機 APP 透過 OBD 藍芽連接車輛，讀取即時數據並模擬故障資訊顯示與診斷',
    tags: ['Android Studio', 'Java', 'Python', 'MySQL', 'Laravel'],
    Icon: Wrench,
    iconColor: 'text-rose-400',
    gradient: 'from-rose-500/20 to-pink-500/20',
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
            Work Experience
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

            {WORK_EXPERIENCE.tags && WORK_EXPERIENCE.tags.length > 0 && (
              <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
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
            Projects
          </motion.p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
            aria-label="Projects"
          >
            {PROJECTS.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
