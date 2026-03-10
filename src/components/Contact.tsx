// Usage:
// <Contact />
//
// Large centered CTA section with accent blur glow decoration.
// Pixel-art envelope decoration above heading (CSS box-shadow technique).
// Email button (bg-accent) and phone button (bg-navy-light outlined)
// both have pixel-style box-shadow, active:translate-y-[2px] press effect,
// shadow disappears on hover/active to simulate button press.
// 8-bit pixel style: square corners, dashed borders.

import { motion } from 'framer-motion'
import { Envelope, Phone, LinkedinLogo, ThreadsLogo, InstagramLogo } from '@phosphor-icons/react'

// ─── Animation config ────────────────────────────────────────────────────────

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t-2 border-dashed border-navy-lightest/40 pt-16 md:pt-20 overflow-hidden"
      aria-label="Contact section"
    >

      {/* ── Background accent glow ────────────────────────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[560px] h-[320px] rounded-full
                   bg-accent/5 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center"
        >

          {/* Envelope icon decoration */}
          <motion.div
            variants={fadeUp}
            className="mb-6 text-accent-light/60"
            aria-hidden="true"
          >
            <Envelope size={40} weight="duotone" />
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-sm font-mono text-accent-light tracking-widest uppercase mb-4"
          >
            Get In Touch
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-slate-200 tracking-tight mb-4"
          >
            Let's Build Something Together
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-base text-slate-400 max-w-md mx-auto mb-10 leading-relaxed"
          >
            對新機會、技術合作或前端工程討論保持開放態度
          </motion.p>

          {/* Primary contact buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <a
              href="mailto:u096205660@gmail.com"
              aria-label="Send email to u096205660@gmail.com"
              className="inline-flex items-center justify-center gap-2
                         bg-accent text-white
                         px-6 py-3 rounded-none text-sm font-medium
                         min-h-[44px] w-full sm:w-auto
                         shadow-[4px_4px_0_0_rgba(16,185,129,0.3)]
                         hover:shadow-none hover:translate-y-[2px]
                         active:translate-y-[2px]
                         transition-[box-shadow,transform] duration-150
                         focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-navy
                         cursor-pointer"
            >
              <Envelope size={18} weight="duotone" aria-hidden="true" />
              u096205660@gmail.com
            </a>

            <a
              href="tel:+886962056640"
              aria-label="Call +886 962 056 640"
              className="inline-flex items-center justify-center gap-2
                         bg-navy-light border-2 border-navy-lightest/50 text-slate-300
                         hover:border-accent/60 hover:text-slate-200
                         px-6 py-3 rounded-none text-sm font-medium
                         min-h-[44px] w-full sm:w-auto
                         shadow-[4px_4px_0_0_rgba(35,53,84,0.5)]
                         hover:shadow-none hover:translate-y-[2px]
                         active:translate-y-[2px]
                         transition-[border-color,color,box-shadow,transform] duration-150
                         focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:ring-offset-2 focus:ring-offset-navy
                         cursor-pointer"
            >
              <Phone size={18} weight="duotone" aria-hidden="true" />
              (+886) 962-056-640
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeUp}
            className="flex gap-4 justify-center items-center mt-8"
          >
            <a
              href="https://www.linkedin.com/in/wadeyou/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-11 h-11
                         border-2 border-navy-lightest/50 rounded-none
                         text-slate-400 hover:text-accent hover:border-accent/60
                         shadow-[3px_3px_0_0_rgba(35,53,84,0.5)]
                         hover:shadow-none hover:translate-y-[2px]
                         active:translate-y-[2px]
                         transition-[color,border-color,box-shadow,transform] duration-150
                         cursor-pointer"
            >
              <LinkedinLogo size={20} weight="duotone" aria-hidden="true" />
            </a>

            <a
              href="https://www.threads.com/@wade0805"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="flex items-center justify-center w-11 h-11
                         border-2 border-navy-lightest/50 rounded-none
                         text-slate-400 hover:text-accent hover:border-accent/60
                         shadow-[3px_3px_0_0_rgba(35,53,84,0.5)]
                         hover:shadow-none hover:translate-y-[2px]
                         active:translate-y-[2px]
                         transition-[color,border-color,box-shadow,transform] duration-150
                         cursor-pointer"
            >
              <ThreadsLogo size={20} weight="duotone" aria-hidden="true" />
            </a>

            <a
              href="https://www.instagram.com/wade0805/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-11 h-11
                         border-2 border-navy-lightest/50 rounded-none
                         text-slate-400 hover:text-accent hover:border-accent/60
                         shadow-[3px_3px_0_0_rgba(35,53,84,0.5)]
                         hover:shadow-none hover:translate-y-[2px]
                         active:translate-y-[2px]
                         transition-[color,border-color,box-shadow,transform] duration-150
                         cursor-pointer"
            >
              <InstagramLogo size={20} weight="duotone" aria-hidden="true" />
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
