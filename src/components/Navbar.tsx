// Usage:
// <Navbar />
//
// Fixed top navbar with scroll-aware background and active section highlighting.
// Desktop: nav links with underline animation, active link highlighted.
// Mobile: inline compact links (no hamburger menu), 3 items max.
// 8-bit pixel style: Press Start 2P font for brand, square hover effects, dashed border.

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface NavItem {
  label: string
  href: string
  sectionId: string
}

const NAV_ITEMS: NavItem[] = [
  { label: '關於', href: '#about', sectionId: 'about' },
  { label: '經歷', href: '#experience', sectionId: 'experience' },
  { label: '技能', href: '#skills', sectionId: 'skills' },
  { label: '聯絡', href: '#contact', sectionId: 'contact' },
]

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const
const springFast = { type: 'spring', stiffness: 140, damping: 18 } as const

const navbarVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...spring, delayChildren: 0.08, staggerChildren: 0.06 },
  },
}

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: springFast },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('about')

  const detectActiveSection = useCallback(() => {
    const offset = 120
    const sections = NAV_ITEMS.map((item) => ({
      id: item.sectionId,
      el: document.getElementById(item.sectionId),
    })).filter((s) => s.el !== null)

    for (let i = sections.length - 1; i >= 0; i--) {
      const rect = sections[i].el!.getBoundingClientRect()
      if (rect.top <= offset) {
        setActiveSection(sections[i].id)
        return
      }
    }
    if (sections.length > 0) {
      setActiveSection(sections[0].id)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
      detectActiveSection()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    detectActiveSection()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [detectActiveSection])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault()
    setActiveSection(item.sectionId)
    const el = document.getElementById(item.sectionId)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={[
        'fixed top-0 left-0 right-0 z-50 py-3',
        'transition-all duration-300',
        scrolled
          ? 'bg-navy/80 backdrop-blur-lg border-b-2 border-dashed border-accent/30'
          : 'bg-transparent',
      ].join(' ')}
      role="banner"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Brand — "CW" initials, 8-bit pixel font */}
        <motion.a
          variants={navItemVariants}
          href="#"
          className="text-accent hover:text-accent-light transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-none
                     cursor-pointer"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '11px', letterSpacing: '0.05em' }}
          aria-label="CW - 回到頂部"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          CW
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Section links">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.sectionId
            return (
              <motion.a
                key={item.href}
                variants={navItemVariants}
                href={item.href}
                className={[
                  'relative px-4 py-2 text-sm font-mono',
                  'transition-colors duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-none',
                  'cursor-pointer group',
                  isActive
                    ? 'text-accent bg-navy-light'
                    : 'text-slate-400 hover:text-accent hover:bg-navy-light',
                ].join(' ')}
                aria-label={`跳轉至${item.label}區塊`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
                {/* 像素化底線：active 或 hover 時顯示 */}
                <span
                  className={[
                    'absolute bottom-1 left-4 right-4 h-px bg-accent',
                    'transition-transform duration-150 origin-left',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  ].join(' ')}
                  aria-hidden="true"
                />
              </motion.a>
            )
          })}
        </nav>

        {/* Mobile: inline compact links (no hamburger) */}
        <nav className="flex md:hidden items-center gap-4" aria-label="Section links mobile">
          {NAV_ITEMS.slice(0, 3).map((item) => {
            const isActive = activeSection === item.sectionId
            return (
              <motion.a
                key={item.href}
                variants={navItemVariants}
                href={item.href}
                className={[
                  'text-xs font-mono',
                  'transition-colors duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-none',
                  'cursor-pointer',
                  isActive ? 'text-accent' : 'text-slate-400 hover:text-accent',
                ].join(' ')}
                aria-label={`跳轉至${item.label}區塊`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </motion.a>
            )
          })}
        </nav>
      </div>
    </motion.header>
  )
}
