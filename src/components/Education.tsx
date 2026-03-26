// Usage:
// <Education />
//
// Left-aligned numbered section header ("04." + title + horizontal rule),
// followed by a single clean education card with pixel corner decorations,
// icon, institution, department, and period.
// 8-bit pixel style: square corners, dashed borders, pixel font for numbering,
// active:translate-y-[1px] press effect.

import { motion } from 'framer-motion'
import { GraduationCap } from '@phosphor-icons/react'
import { useI18n } from '../i18n'

// ─── Animation config ────────────────────────────────────────────────────────

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const CAPSTONE_TAGS = ['Android Studio', 'Java', 'Python', 'MySQL', 'Laravel'] as const

// ─── Main Component ───────────────────────────────────────────────────────────

export function Education() {
  const { t } = useI18n()
  return (
    <section
      id="education"
      aria-label="Education background"
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
              04.
            </span>
            {t.education.sectionTitle}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="flex-1 border-t-2 border-dashed border-navy-lightest"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Education card ──────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.div
            variants={fadeUp}
            className="relative bg-navy-light/30 border-2 border-navy-lightest/30 rounded-none p-5
                       flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
                       hover:border-accent/60 active:translate-y-[1px] transition-colors"
          >
            {/* Pixel corner decorations */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-accent/60" aria-hidden="true" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent/60" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-accent/60" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-accent/60" aria-hidden="true" />

            {/* Left: icon + info */}
            <div className="flex items-center gap-4">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-none bg-accent-tint border border-accent/20
                           flex items-center justify-center"
                aria-hidden="true"
              >
                <GraduationCap
                  size={20}
                  weight="duotone"
                  className="text-accent-light"
                />
              </div>

              <div>
                <p className="text-base font-semibold text-slate-200 leading-snug">
                  {t.education.institution}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">
                  {t.education.department}
                </p>
              </div>
            </div>

            {/* Right: period */}
            <time className="font-mono text-xs text-slate-600 sm:shrink-0">
              2018 — 2022
            </time>
          </motion.div>

          {/* ── Capstone project ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="mt-4 bg-navy-light/20 border border-navy-lightest/20 rounded-none p-4"
          >
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
              {t.education.capstoneLabel}
            </p>
            <p className="text-sm font-semibold text-slate-300 mb-1">
              {t.education.capstoneName}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {t.education.capstoneSummary}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CAPSTONE_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] bg-accent-tint/50 text-accent-light/70 rounded-none px-1.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
