// Usage:
// <Contact />
//
// Contact section with EmailJS-powered form.
// 8-bit pixel style: square corners, dashed borders.

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  Envelope,
  Phone,
  LinkedinLogo,
  ThreadsLogo,
  InstagramLogo,
  PaperPlaneTilt,
  CheckCircle,
  WarningCircle,
} from '@phosphor-icons/react'

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

// ─── EmailJS config ──────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID = 'service_82071no'
const EMAILJS_TEMPLATE_ID = 'template_89bylga'
const EMAILJS_PUBLIC_KEY = 'HrU-zBR6GxsExGngs'

// ─── Main Component ───────────────────────────────────────────────────────────

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY,
      )
      setFormState('success')
      formRef.current?.reset()
    } catch {
      setFormState('error')
    }
  }

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
            {[
              { href: 'https://www.linkedin.com/in/wadeyou/', label: 'LinkedIn', Icon: LinkedinLogo },
              { href: 'https://www.threads.com/@wade0805', label: 'Threads', Icon: ThreadsLogo },
              { href: 'https://www.instagram.com/wade0805/', label: 'Instagram', Icon: InstagramLogo },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-11 h-11
                           border-2 border-navy-lightest/50 rounded-none
                           text-slate-400 hover:text-accent hover:border-accent/60
                           shadow-[3px_3px_0_0_rgba(35,53,84,0.5)]
                           hover:shadow-none hover:translate-y-[2px]
                           active:translate-y-[2px]
                           transition-[color,border-color,box-shadow,transform] duration-150
                           cursor-pointer"
              >
                <Icon size={20} weight="duotone" aria-hidden="true" />
              </a>
            ))}
          </motion.div>

          {/* ── Contact Form (EmailJS) ────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="w-full max-w-md mx-auto mt-14"
          >
            <div className="relative bg-navy-light border-2 border-navy-lightest rounded-none p-6">
              {/* Pixel corner decorations */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-accent" aria-hidden="true" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-accent" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-accent" aria-hidden="true" />

              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-5 text-left">
                Leave a Message
              </p>

              {formState === 'success' ? (
                <div className="flex flex-col items-center gap-3 py-6">
                  <CheckCircle size={40} weight="duotone" className="text-accent-light" />
                  <p className="text-sm text-slate-300">訊息已送出，感謝您的聯繫！</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-slate-500 mb-1.5">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="from_name"
                      required
                      placeholder="您的名字"
                      className="w-full bg-navy border-2 border-navy-lightest/50 rounded-none
                                 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600
                                 focus:border-accent/60 focus:outline-none
                                 transition-colors duration-150"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-slate-500 mb-1.5">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="from_email"
                      required
                      placeholder="your@email.com"
                      className="w-full bg-navy border-2 border-navy-lightest/50 rounded-none
                                 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600
                                 focus:border-accent/60 focus:outline-none
                                 transition-colors duration-150"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-slate-500 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      placeholder="想說些什麼..."
                      className="w-full bg-navy border-2 border-navy-lightest/50 rounded-none
                                 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600
                                 focus:border-accent/60 focus:outline-none
                                 transition-colors duration-150 resize-none"
                    />
                  </div>

                  {/* Error message */}
                  {formState === 'error' && (
                    <div className="flex items-center gap-2 text-xs text-rose-400">
                      <WarningCircle size={16} weight="bold" />
                      <span>送出失敗，請稍後再試或直接寄信給我</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="inline-flex items-center justify-center gap-2
                               bg-accent text-white
                               px-5 py-2.5 rounded-none text-sm font-medium
                               shadow-[4px_4px_0_0_rgba(16,185,129,0.3)]
                               hover:shadow-none hover:translate-y-[2px]
                               active:translate-y-[2px]
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_0_rgba(16,185,129,0.3)]
                               transition-[box-shadow,transform,opacity] duration-150
                               focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-navy
                               cursor-pointer"
                  >
                    <PaperPlaneTilt size={16} weight="bold" aria-hidden="true" />
                    {formState === 'submitting' ? '送出中...' : '送出訊息'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
