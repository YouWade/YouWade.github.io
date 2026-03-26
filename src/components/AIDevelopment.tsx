// Usage:
// <AIDevelopment />
//
// Left-aligned numbered section header ("02." + title + horizontal rule),
// showcasing AI-assisted development workflow, verification pipeline,
// security/risk control, and real-world lessons learned from the ScanUp project.
// 8-bit pixel style: square corners, dashed borders, pixel font for numbering.

import { motion } from 'framer-motion'
import {
  Robot,
  ShieldCheck,
  Eye,
  Brain,
  Code,
  Warning,
  Lock,
  GitBranch,
  TestTube,
  TreeStructure,
  Bug,
  Lightning,
  Detective,
  Checks,
  FileDashed,
  BrowsersIcon,
} from '@phosphor-icons/react'
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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

// ─── Icon arrays ──────────────────────────────────────────────────────────────

const WORKFLOW_ICONS = [TreeStructure, Code, GitBranch, Eye, Detective]
const VERIFICATION_ICONS = [TestTube, BrowsersIcon, Checks]
const SECURITY_ICONS = [Lock, ShieldCheck, Warning]
const LESSON_ICONS = [Bug, Lightning, FileDashed]

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

// ─── Main Component ───────────────────────────────────────────────────────────

export function AIDevelopment() {
  const { t } = useI18n()

  const workflowSteps = t.ai.workflow.map((step, i) => ({
    Icon: WORKFLOW_ICONS[i],
    ...step,
  }))

  const verificationItems = t.ai.verification.map((item, i) => ({
    Icon: VERIFICATION_ICONS[i],
    ...item,
  }))

  const securityMeasures = t.ai.security.map((measure, i) => ({
    Icon: SECURITY_ICONS[i],
    ...measure,
  }))

  const lessonsLearned = t.ai.lessons.map((lesson, i) => ({
    Icon: LESSON_ICONS[i],
    ...lesson,
  }))

  return (
    <section
      id="ai-development"
      aria-label="AI-assisted development workflow"
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
              02.
            </span>
            {t.ai.sectionTitle}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="flex-1 border-t-2 border-dashed border-navy-lightest"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Intro ────────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.div
            variants={fadeUp}
            className="relative bg-navy-light/50 border-2 border-navy-lightest/30 rounded-none p-6 md:p-8 mb-8"
          >
            <PixelCorners className="bg-accent/60" />
            <div className="flex items-start gap-4">
              <Robot
                size={28}
                weight="duotone"
                className="text-accent-light shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.ai.intro.text1}<span className="text-accent-light font-semibold">{t.ai.intro.highlight1}</span>{t.ai.intro.text2}
                  <span className="text-accent-light font-semibold">{t.ai.intro.highlight2}</span>{t.ai.intro.text3}
                  <span className="text-accent-light font-semibold">{t.ai.intro.highlight3}</span>{t.ai.intro.text4}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── AI 開發工作流 ──────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6"
          >
            {t.ai.workflowLabel}
          </motion.p>

          <div className="space-y-3">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex gap-4 bg-navy-light/30 border border-navy-lightest/20 rounded-none p-4
                           hover:border-accent/40 transition-colors group"
              >
                <div className="flex flex-col items-center shrink-0">
                  <span
                    className="text-accent/60 text-[10px] mb-1.5"
                    style={{ fontFamily: "'Press Start 2P'" }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <step.Icon
                    size={20}
                    weight="duotone"
                    className="text-accent-light group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-200 mb-1">{step.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Verification Pipeline ────────────────────────────────────── */}
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
            {t.ai.verificationLabel}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {verificationItems.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="relative bg-navy-light/50 border-2 border-navy-lightest/30 rounded-none p-5
                           hover:border-accent/40 transition-colors"
              >
                <PixelCorners className="bg-accent/40" />
                <div className="flex items-center gap-2 mb-3">
                  <item.Icon
                    size={18}
                    weight="duotone"
                    className="text-accent-light shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold text-slate-200">{item.title}</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Security & Risk Control ──────────────────────────────────── */}
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
            {t.ai.securityLabel}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {securityMeasures.map((measure) => (
              <motion.div
                key={measure.title}
                variants={fadeUp}
                className="relative bg-navy-light/50 border-2 border-navy-lightest/30 rounded-none p-5
                           hover:border-accent/40 transition-colors flex flex-col"
              >
                <PixelCorners className="bg-accent/40" />
                <div className="flex items-center gap-2 mb-3">
                  <measure.Icon
                    size={18}
                    weight="duotone"
                    className="text-accent-light shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold text-slate-200">{measure.title}</p>
                </div>
                <ul className="space-y-2 flex-1" role="list">
                  {measure.details.map((detail, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                      <span className="text-accent/60 shrink-0 mt-0.5" aria-hidden="true">▹</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Lessons Learned (Real Cases) ──────────────────────────────── */}
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
            {t.ai.lessonsLabel}
          </motion.p>

          <div className="space-y-4">
            {lessonsLearned.map((lesson) => (
              <motion.div
                key={lesson.incident}
                variants={fadeUp}
                className="relative bg-navy-light border-2 border-navy-lightest/30 rounded-none p-5
                           hover:border-accent/40 transition-colors"
              >
                <PixelCorners className="bg-accent/40" />
                <div className="flex items-start gap-3">
                  <lesson.Icon
                    size={20}
                    weight="duotone"
                    className="text-accent-light shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-200 mb-2">{lesson.incident}</p>
                    <div className="space-y-1.5">
                      <p className="text-xs text-slate-400 leading-relaxed">
                        <span className="text-slate-500 font-mono">ROOT</span>{' '}
                        {lesson.root}
                      </p>
                      <p className="text-xs text-accent-light/80 leading-relaxed">
                        <span className="text-accent font-mono">FIX</span>{' '}
                        {lesson.fix}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Core Principles ──────────────────────────────────────────── */}
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
            {t.ai.principlesLabel}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative bg-navy-light/30 border border-navy-lightest/20 rounded-none p-5"
          >
            <Brain
              size={16}
              weight="duotone"
              className="text-accent/40 absolute top-4 right-4"
              aria-hidden="true"
            />
            <ul className="space-y-3" role="list">
              {t.ai.principles.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                  <span
                    className="text-accent/50 text-[9px] shrink-0 mt-1"
                    style={{ fontFamily: "'Press Start 2P'" }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
