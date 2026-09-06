export const COOKIE_CONSENT_KEY = 'indlio-cookie-consent'

export interface CookieConsent {
  necessary: true
  analytics: boolean
  marketing: boolean
}

export const defaultCookieConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
}

export function useCookieConsent() {
  const consent = useCookie<CookieConsent | null>(COOKIE_CONSENT_KEY, {
    default: () => null,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })

  const settingsOpen = useState('cookie-settings-open', () => false)

  const decided = computed(() => consent.value !== null)
  const bannerVisible = computed(() => !decided.value && !settingsOpen.value)
  const canUseAnalytics = computed(() => consent.value?.analytics === true)
  const canUseMarketing = computed(() => consent.value?.marketing === true)

  function acceptAll() {
    consent.value = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    settingsOpen.value = false
  }

  function rejectOptional() {
    consent.value = { ...defaultCookieConsent }
    settingsOpen.value = false
  }

  function save(next: Pick<CookieConsent, 'analytics' | 'marketing'>) {
    consent.value = {
      necessary: true,
      analytics: next.analytics,
      marketing: next.marketing,
    }
    settingsOpen.value = false
  }

  function openSettings() {
    settingsOpen.value = true
  }

  function closeSettings() {
    settingsOpen.value = false
  }

  return {
    consent,
    decided,
    bannerVisible,
    settingsOpen,
    canUseAnalytics,
    canUseMarketing,
    acceptAll,
    rejectOptional,
    save,
    openSettings,
    closeSettings,
  }
}
