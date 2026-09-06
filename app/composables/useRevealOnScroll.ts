const revealChecks = new Set<() => void>()
let revealListening = false

function onRevealViewportChange() {
  revealChecks.forEach(check => check())
}

function subscribeRevealCheck(check: () => void) {
  revealChecks.add(check)
  if (!revealListening) {
    revealListening = true
    window.addEventListener('scroll', onRevealViewportChange, { passive: true })
    window.addEventListener('resize', onRevealViewportChange)
  }

  return () => {
    revealChecks.delete(check)
    if (revealListening && revealChecks.size === 0) {
      revealListening = false
      window.removeEventListener('scroll', onRevealViewportChange)
      window.removeEventListener('resize', onRevealViewportChange)
    }
  }
}

function isPastRevealThreshold(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  if (rect.height <= 0) {
    return false
  }

  const visible = Math.min(rect.bottom, window.innerHeight * 0.92) - Math.max(rect.top, 0)
  return visible / rect.height >= 0.16
}

export function useRevealOnScroll(target: MaybeRefOrGetter<HTMLElement | null>) {
  const revealed = ref(false)
  let observer: IntersectionObserver | undefined
  let unsubscribe: (() => void) | undefined

  function cleanup() {
    observer?.disconnect()
    observer = undefined
    unsubscribe?.()
    unsubscribe = undefined
  }

  function reveal() {
    if (revealed.value) {
      return
    }
    revealed.value = true
    cleanup()
  }

  function attach(el: HTMLElement | null | undefined) {
    cleanup()
    if (!import.meta.client || revealed.value) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal()
      return
    }

    if (!el) {
      return
    }

    observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        reveal()
      }
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px',
    })
    observer.observe(el)

    const check = () => {
      if (!revealed.value && el.isConnected && isPastRevealThreshold(el)) {
        reveal()
      }
    }

    check()
    unsubscribe = subscribeRevealCheck(check)
  }

  watch(() => toValue(target), attach, { flush: 'post', immediate: true })
  onBeforeUnmount(cleanup)

  return revealed
}
