import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Locale, Translations } from './types'
import { zhTW } from './zh-TW'
import { en } from './en'

const translations: Record<Locale, Translations> = {
  'zh-TW': zhTW,
  en,
}

interface I18nContextValue {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'zh-TW'
  const saved = localStorage.getItem('locale') as Locale | null
  if (saved && (saved === 'zh-TW' || saved === 'en')) return saved
  return 'zh-TW'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale === 'zh-TW' ? 'zh-Hant' : 'en'
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'zh-TW' ? 'en' : 'zh-TW')
  }, [locale, setLocale])

  const value: I18nContextValue = {
    locale,
    t: translations[locale],
    setLocale,
    toggleLocale,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
