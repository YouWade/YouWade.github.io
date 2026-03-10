// Usage:
// <Hero />
//
// Asymmetric split hero layout: left side text content, right side profile photo.
// Mobile: photo on top centered, text below centered (text-center md:text-left).
// Desktop: grid two-column, left text, right photo.
// Background: offset accent blob + subtle dot grid pattern (8-bit aesthetic).
// 8-bit pixel style: square photo border, square CTA buttons, pixel font subtitle.

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Envelope, Phone, LinkedinLogo, ThreadsLogo, InstagramLogo } from '@phosphor-icons/react'
import profile from '../assets/profile.jpg'

// ─── Spring config ────────────────────────────────────────────────────────────
const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
}

const slideUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

const photoVariants = {
  hidden: { opacity: 0, x: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { ...spring, delay: 0.3 },
  },
}

// ─── Text Scramble hook ───────────────────────────────────────────────────────
const SKILLS = ['Angular', 'React', 'TypeScript', 'Next.js', 'Vue']
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'
const SCRAMBLE_DURATION = 1200
const HOLD_DURATION = 1800

function useTextScramble(words: string[]) {
  const [display, setDisplay] = useState(words[0])
  const frameRef = useRef<number>(0)

  useEffect(() => {
    let startTime: number
    let wordIndex = 0
    let holdStart: number

    const target = () => words[wordIndex]

    const scramble = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1)

      const resolved = Math.floor(progress * target().length)
      let result = ''
      for (let i = 0; i < target().length; i++) {
        if (i < resolved) {
          result += target()[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplay(result)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(scramble)
      } else {
        setDisplay(target())
        holdStart = timestamp
        frameRef.current = requestAnimationFrame(holdFrame)
      }
    }

    const holdFrame = (timestamp: number) => {
      if (timestamp - holdStart < HOLD_DURATION) {
        frameRef.current = requestAnimationFrame(holdFrame)
      } else {
        wordIndex = (wordIndex + 1) % words.length
        startTime = 0
        frameRef.current = requestAnimationFrame(scramble)
      }
    }

    frameRef.current = requestAnimationFrame(scramble)
    return () => cancelAnimationFrame(frameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return display
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const scrambledSkill = useTextScramble(SKILLS)

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16"
      aria-label="Introduction"
    >
      {/* ── Background decoration ────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Offset accent blob — positioned left-of-center for asymmetric feel */}
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-[55%]
                     w-[480px] h-[480px] rounded-full bg-accent/5 blur-[160px]"
        />
        {/* Dot grid pattern — 8-bit aesthetic */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ── Split layout container ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-8 md:gap-12 items-center w-full">

          {/* ── Right side: profile photo (renders first on mobile via order) ── */}
          <motion.div
            className="flex justify-center md:justify-end order-first md:order-last"
            variants={photoVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="relative inline-block pixel-float">
              {/* 像素化邊框光暈 */}
              <div
                className="absolute -inset-1 bg-accent/20 blur-sm"
                aria-hidden="true"
              />
              {/* 外框：像素風格方角雙層邊框 */}
              <div
                className="absolute -inset-[3px] border-2 border-dashed border-accent/40"
                aria-hidden="true"
              />
              {/* 四角像素方塊裝飾 */}
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-accent z-10" aria-hidden="true" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-accent z-10" aria-hidden="true" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-accent z-10" aria-hidden="true" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-accent z-10" aria-hidden="true" />
              <img
                src={profile}
                alt="游承緯的個人照片"
                className="relative w-56 h-64 md:w-60 md:h-72
                           rounded-none object-cover object-[center_20%]
                           border-2 border-accent
                           shadow-2xl shadow-black/40"
              />
            </div>
          </motion.div>

          {/* ── Left side: text content ─────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-5 order-last md:order-first
                       items-center md:items-start text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Greeting */}
            <motion.p
              variants={slideUpVariants}
              className="text-sm text-accent-light font-mono tracking-wider"
            >
              Hi, my name is
            </motion.p>

            {/* Name block */}
            <motion.div variants={slideUpVariants} className="flex flex-col gap-1">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-200
                           tracking-tight leading-tight text-glow transition-all duration-300 cursor-default"
              >
                游承緯
              </h1>
              {/* 英文名：像素字體裝飾 */}
              <p
                className="text-slate-500 tracking-wider mt-1"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}
              >
                YOU, CHENG-WEI
              </p>
            </motion.div>

            {/* Title badge */}
            <motion.div
              variants={slideUpVariants}
              className="inline-flex items-center gap-2 w-fit text-sm font-mono
                         text-accent-light tracking-wider"
              aria-label="Job title: Front-End Engineer"
            >
              <span
                className="w-1.5 h-1.5 rounded-none bg-accent flex-shrink-0 animate-pulse"
                aria-hidden="true"
              />
              Front-End Engineer
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={slideUpVariants}
              className="text-base text-slate-400 leading-relaxed max-w-md"
            >
              3+ 年前端開發經驗，專精 Angular 與 TypeScript。
              擅長 SAP 系統整合、Figma 切版與 RESTful API 串接，
              能獨立完成網頁開發並有效與設計師協作。
            </motion.p>

            {/* Skill scramble */}
            <motion.div
              variants={slideUpVariants}
              className="flex items-center gap-3"
              aria-label={`Currently displaying skill: ${scrambledSkill}`}
            >
              <span className="text-xs text-slate-600 uppercase tracking-widest font-mono">
                Stack
              </span>
              <span className="w-px h-3 bg-navy-lightest" aria-hidden="true" />
              <span
                className="font-mono text-sm text-accent-light tracking-wider"
                aria-live="polite"
                aria-atomic="true"
              >
                {scrambledSkill}
              </span>
            </motion.div>

            {/* CTA buttons — 8-bit square style, min 44px touch target */}
            <motion.div
              variants={slideUpVariants}
              className="flex flex-col sm:flex-row gap-3 mt-1 w-full sm:w-auto
                         items-center md:items-start"
            >
              <a
                href="mailto:u096205660@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-3
                           bg-accent hover:bg-accent-light
                           active:scale-[0.97] transition-all duration-150
                           text-navy text-sm font-semibold rounded-none
                           focus:outline-none focus:ring-2 focus:ring-accent/50
                           focus:ring-offset-2 focus:ring-offset-navy
                           cursor-pointer w-full sm:w-auto min-h-[44px]"
                aria-label="Send email to u096205660@gmail.com"
              >
                <Envelope size={15} weight="bold" aria-hidden="true" />
                u096205660@gmail.com
              </a>
              <a
                href="tel:+886962056640"
                className="inline-flex items-center justify-center gap-2 px-5 py-3
                           bg-navy-light border-2 border-navy-lightest
                           hover:border-accent/60 hover:text-slate-200
                           text-slate-400
                           active:scale-[0.97] transition-all duration-150
                           text-sm rounded-none
                           focus:outline-none focus:ring-2 focus:ring-accent/30
                           focus:ring-offset-2 focus:ring-offset-navy
                           cursor-pointer w-full sm:w-auto min-h-[44px]"
                aria-label="Call (+886) 962-056-640"
              >
                <Phone size={15} weight="bold" aria-hidden="true" />
                (+886) 962-056-640
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={slideUpVariants}
              className="flex gap-3 items-center mt-1"
            >
              <a
                href="https://www.linkedin.com/in/wadeyou/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-10 h-10
                           border-2 border-navy-lightest rounded-none
                           text-slate-400 hover:text-accent hover:border-accent/60
                           active:translate-y-[1px]
                           transition-[color,border-color] duration-150 cursor-pointer"
              >
                <LinkedinLogo size={18} weight="duotone" aria-hidden="true" />
              </a>
              <a
                href="https://www.threads.com/@wade0805"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads"
                className="flex items-center justify-center w-10 h-10
                           border-2 border-navy-lightest rounded-none
                           text-slate-400 hover:text-accent hover:border-accent/60
                           active:translate-y-[1px]
                           transition-[color,border-color] duration-150 cursor-pointer"
              >
                <ThreadsLogo size={18} weight="duotone" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/wade0805/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-10 h-10
                           border-2 border-navy-lightest rounded-none
                           text-slate-400 hover:text-accent hover:border-accent/60
                           active:translate-y-[1px]
                           transition-[color,border-color] duration-150 cursor-pointer"
              >
                <InstagramLogo size={18} weight="duotone" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

        </div>
    </section>
  )
}
