// Usage:
// <Skills />
//
// Left-aligned numbered section header ("03." + title + horizontal rule),
// core skills (Angular, React, TypeScript) rendered as large pixel-border badges,
// other skills as muted smaller mono pills,
// and a 2-col / 3-col soft skills grid with Phosphor duotone icons.
// 8-bit pixel style: square corners, dashed borders, pixel font for numbering.

import { motion } from 'framer-motion'
import {
  ChatCircle,
  UsersThree,
  Lightbulb,
  Robot,
  BookOpen,
  GitBranch,
} from '@phosphor-icons/react'
import { useI18n } from '../i18n'

// ─── Animation config ────────────────────────────────────────────────────────

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORE_SKILLS: string[] = ['Angular', 'React', 'TypeScript']

const OTHER_SKILLS: string[] = [
  'RxJS',
  'Node.js',
  'JavaScript',
  'SASS',
  'HTML',
  'RESTful API',
  'Open API',
  'WordPress',
  'SEO',
  'BEM',
  'Vue',
  'Next.js',
]

type SoftSkill = {
  /** Display label */
  label: string
  /** Phosphor icon component */
  Icon: React.ElementType
}

const SOFT_SKILL_ICONS = [ChatCircle, UsersThree, Lightbulb, Robot, GitBranch, BookOpen]

// ─── Main Component ───────────────────────────────────────────────────────────

export function Skills() {
  const { t } = useI18n()

  const softSkills: SoftSkill[] = t.skills.softSkills.map((label, i) => ({
    label,
    Icon: SOFT_SKILL_ICONS[i],
  }))

  return (
    <section
      id="skills"
      className="border-t-2 border-dashed border-navy-lightest/40 pt-16 md:pt-20"
      aria-label="Skills section"
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
              03.
            </span>
            {t.skills.sectionTitle}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="flex-1 border-t-2 border-dashed border-navy-lightest"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Hard skills pills ──────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          {/* Core skills container with subtle background */}
          <div className="bg-navy-light/30 border border-navy-lightest/20 rounded-none p-4 mb-3">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
              {t.skills.coreLabel}
            </p>
            <div
              className="flex flex-wrap gap-3"
              role="list"
              aria-label="Core skills"
            >
              {/* Core skills — large pixel-border accented badges */}
              {CORE_SKILLS.map((skill) => (
                <motion.span
                  key={skill}
                  role="listitem"
                  variants={fadeUp}
                  className="relative px-5 py-2 rounded-none
                             bg-accent-tint text-accent-light
                             text-sm font-semibold cursor-default select-none
                             border-2 border-accent/40
                             hover:border-accent hover:bg-accent/10
                             active:translate-y-[1px]
                             transition-colors"
                  style={{
                    boxShadow: '3px 3px 0 0 rgba(16,185,129,0.25)',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Other skills — muted smaller mono pills */}
          <div
            className="flex flex-wrap gap-2 pt-1"
            role="list"
            aria-label="Other skills"
          >
            {OTHER_SKILLS.map((skill) => (
              <motion.span
                key={skill}
                role="listitem"
                variants={fadeUp}
                className="px-3 py-1 rounded-none bg-navy-light border border-navy-lightest/30
                           text-slate-400 text-xs font-mono
                           hover:text-slate-200 hover:border-navy-lightest
                           transition-colors duration-200 cursor-default select-none"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Soft skills ───────────────────────────────────────────────── */}
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
            {t.skills.otherLabel}
          </motion.p>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            role="list"
            aria-label="Soft skills"
          >
            {softSkills.map((skill) => (
              <motion.div
                key={skill.label}
                role="listitem"
                variants={fadeUp}
                className="flex items-center gap-3 py-2"
              >
                <skill.Icon
                  size={18}
                  weight="duotone"
                  className="text-accent-light shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-400">{skill.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
