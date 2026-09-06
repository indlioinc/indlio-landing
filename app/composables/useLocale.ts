import i18nJson from '#content/i18n.json'
import type { I18nConfig } from '~/types/content'

export const LOCALE_STORAGE_KEY = 'indlio-locale'

export function useLocale() {
  const i18n = i18nJson as I18nConfig
  const languages = i18n.published?.length
    ? i18n.languages.filter(language => i18n.published!.includes(language.code))
    : i18n.languages
  const supported = new Set(languages.map(language => language.code))

  const cookie = useCookie<string>(LOCALE_STORAGE_KEY, {
    default: () => i18n.default,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  const localeState = useState<string>(LOCALE_STORAGE_KEY, () => (
    supported.has(cookie.value) ? cookie.value : i18n.default
  ))

  const locale = computed(() => (
    supported.has(localeState.value) ? localeState.value : i18n.default
  ))

  function setLocale(code: string) {
    if (!supported.has(code)) {
      return
    }

    localeState.value = code
    cookie.value = code

    if (import.meta.client) {
      localStorage.setItem(LOCALE_STORAGE_KEY, code)
      document.documentElement.lang = code
    }
  }

  function restoreStoredLocale() {
    if (!import.meta.client) {
      return
    }

    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored && supported.has(stored)) {
      setLocale(stored)
      return
    }

    document.documentElement.lang = locale.value
  }

  return {
    locale,
    languages,
    defaultLocale: i18n.default,
    setLocale,
    restoreStoredLocale,
  }
}
