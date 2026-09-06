declare global {
  interface Window {
    va?: (...args: unknown[]) => void
    vaq?: unknown[]
  }
}

export default defineNuxtPlugin({
  enforce: 'pre',
  setup() {
    const { canUseAnalytics } = useCookieConsent()

    window.va = window.va || function (...params: unknown[]) {
      window.vaq = window.vaq || []
      window.vaq.push(params)
    }

    const sync = () => {
      window.va?.('beforeSend', (event: unknown) => {
        return canUseAnalytics.value ? event : null
      })
    }

    sync()
    watch(canUseAnalytics, sync)
  },
})
