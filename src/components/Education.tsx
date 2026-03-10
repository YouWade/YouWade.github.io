// Usage:
// <Education />
//
// Left-aligned numbered section header ("03." + title + horizontal rule),
// followed by a single clean education card with pixel corner decorations,
// icon, institution, department, and period.
// 8-bit pixel style: square corners, dashed borders, pixel font for numbering,
// active:translate-y-[1px] press effect.

import { motion } from 'framer-motion'
import { GraduationCap } from '@phosphor-icons/react'

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const EDUCATION = {
  institution: '樹德科技大學',
  department: '資訊工程系',
  period: '2018 — 2022',
} as const

// ─── Main Component ───────────────────────────────────────────────────────────

export function Education() {
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
              03.
            </span>
            Education
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
                  {EDUCATION.institution}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">
                  {EDUCATION.department}
                </p>
              </div>
            </div>

            {/* Right: period */}
            <time className="font-mono text-xs text-slate-600 sm:shrink-0">
              {EDUCATION.period}
            </time>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
