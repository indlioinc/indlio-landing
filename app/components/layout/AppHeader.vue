<script setup lang="ts">
import type * as Content from '~/types/content'

const props = defineProps<{
  branding: Content.Branding
  navbar: Content.NavbarContent
}>()

const { ui, sections } = useLandingContent()
const { resolve } = useBrandLogos()

const route = useRoute()
const open = ref(false)
const overHero = ref(isDarkHeroPath(route.path))
const showBackground = ref(!isDarkHeroPath(route.path))

const logoOnDark = computed(() => overHero.value && !open.value)
const lightLogo = computed(() => resolve(props.branding.logos.navbarLight))
const darkLogo = computed(() => resolve(props.branding.logos.navbar))

useHead({
  link: computed(() => [
    {
      rel: 'preload',
      as: 'image',
      href: logoOnDark.value ? darkLogo.value : lightLogo.value,
      fetchpriority: 'high',
    },
    {
      rel: 'preload',
      as: 'image',
      href: logoOnDark.value ? lightLogo.value : darkLogo.value,
    },
  ]),
})
const desktopOpen = ref<string | null>(null)
const mobileOpen = ref<string | null>(null)
const megaReady = ref(false)
const megaFading = ref(false)
const megaInner = ref<HTMLElement | null>(null)
const megaSize = reactive({ width: 0, height: 0 })

let closeTimer: ReturnType<typeof setTimeout> | null = null
let fadeTimer: ReturnType<typeof setTimeout> | null = null

const surfaceClass = computed(() => {
  if (open.value) {
    return 'border-b border-ink/6 bg-white/90 backdrop-blur-md'
  }
  if (!showBackground.value) {
    return 'bg-transparent'
  }
  if (overHero.value) {
    return 'bg-hero/40 backdrop-blur-sm'
  }
  return 'border-b border-ink/6 bg-white/90 backdrop-blur-md'
})

const triggerClass = computed(() => overHero.value && !open.value
  ? 'text-white/65 hover:text-white'
  : 'text-muted hover:text-ink',
)

const activeMegaLink = computed(() => {
  return props.navbar.links.find(link => link.label === desktopOpen.value) ?? null
})

function menuItems(link: Content.NavLink) {
  if (link.columns?.length) {
    return link.columns.flatMap(column => column.items)
  }
  return link.items ?? []
}

function hasItems(link: Content.NavLink) {
  return menuItems(link).length > 0
}

function clearClose() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

function openDesktop(label: string) {
  clearClose()
  if (desktopOpen.value && desktopOpen.value !== label) {
    megaFading.value = true
    if (fadeTimer) {
      clearTimeout(fadeTimer)
    }
    fadeTimer = setTimeout(() => {
      desktopOpen.value = label
      megaFading.value = false
      measureMega()
    }, 90)
    return
  }
  desktopOpen.value = label
}

function scheduleClose() {
  clearClose()
  closeTimer = setTimeout(() => {
    desktopOpen.value = null
    megaReady.value = false
    megaFading.value = false
  }, 180)
}

function close() {
  clearClose()
  if (fadeTimer) {
    clearTimeout(fadeTimer)
    fadeTimer = null
  }
  open.value = false
  desktopOpen.value = null
  mobileOpen.value = null
  megaReady.value = false
  megaFading.value = false
}

function toggleDesktop(label: string) {
  if (desktopOpen.value === label) {
    desktopOpen.value = null
    megaReady.value = false
    return
  }
  openDesktop(label)
}

function toggleMobile(label: string) {
  mobileOpen.value = mobileOpen.value === label ? null : label
}

function onNavLeave(event: MouseEvent) {
  const next = event.relatedTarget as Node | null
  const current = event.currentTarget as HTMLElement
  if (next && current.contains(next)) {
    return
  }
  scheduleClose()
}

function isDarkHeroPath(path: string) {
  const clean = path.replace(/\/$/, '') || '/'
  return clean === '/'
}

function updateScroll() {
  if (!import.meta.client) {
    return
  }
  if (!isDarkHeroPath(route.path)) {
    overHero.value = false
    showBackground.value = true
    return
  }
  showBackground.value = window.scrollY > 100
  const hero = document.getElementById('hero')
  if (!hero) {
    overHero.value = false
    return
  }
  overHero.value = window.scrollY < hero.offsetHeight - 72
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null
  if (target?.closest('[data-nav-menu]')) {
    return
  }
  desktopOpen.value = null
  megaReady.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    desktopOpen.value = null
    megaReady.value = false
  }
}

async function measureMega() {
  await nextTick()
  const el = megaInner.value
  if (!el) {
    return
  }
  megaSize.width = el.offsetWidth
  megaSize.height = el.offsetHeight
  requestAnimationFrame(() => {
    megaReady.value = true
  })
}

async function goTo(href: string) {
  close()
  await navigateTo(href)

  const id = href.includes('#') ? href.slice(href.indexOf('#') + 1) : ''
  if (!id || !import.meta.client) {
    return
  }

  await nextTick()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('resize', updateScroll)
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

watch(() => route.path, () => {
  close()
  updateScroll()
})

watch(() => route.hash, () => {
  desktopOpen.value = null
  if (open.value) {
    close()
  }
})

watch(desktopOpen, async (label) => {
  if (!label) {
    return
  }
  await measureMega()
})

onBeforeUnmount(() => {
  clearClose()
  if (fadeTimer) {
    clearTimeout(fadeTimer)
  }
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('resize', updateScroll)
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header
    class="fixed top-0 z-[80] w-full transition-colors duration-300"
    :class="surfaceClass"
  >
    <Container>
      <div
        class="relative"
        data-nav-menu
        @mouseleave="onNavLeave"
      >
      <div class="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div class="flex min-w-0 items-center justify-self-start">
          <BrandLogo
            :name="branding.name"
            :icon-src="branding.logos.navbarLight"
            :full-src="branding.logos.navbarLight"
            :dark-src="branding.logos.navbar"
            :on-dark="logoOnDark"
            variant="full"
            blend="none"
          />
        </div>

        <nav
          class="hidden items-center justify-center gap-5 lg:flex xl:gap-7"
          :aria-label="ui.primaryNav"
        >
          <template v-for="link in navbar.links" :key="link.label">
            <div v-if="hasItems(link)">
              <button
                type="button"
                class="inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium"
                :class="triggerClass"
                :aria-expanded="desktopOpen === link.label"
                :aria-controls="'nav-mega'"
                @mouseenter="openDesktop(link.label)"
                @click="toggleDesktop(link.label)"
              >
                {{ link.label }}
                <svg
                  viewBox="0 0 24 24"
                  class="h-3.5 w-3.5 transition-transform duration-200"
                  :class="desktopOpen === link.label && 'rotate-180'"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
            <a
              v-else
              :href="link.href"
              class="whitespace-nowrap text-sm font-medium"
              :class="triggerClass"
              @mouseenter="scheduleClose"
              @click.prevent="goTo(link.href)"
            >
              {{ link.label }}
            </a>
          </template>
        </nav>

        <div class="flex shrink-0 items-center justify-end gap-2 justify-self-end sm:gap-3">
          <div class="hidden lg:block">
            <AppButton
              :href="branding.waitlistUrl"
              variant="accent"
              size="sm"
              class="h-8 px-3 text-[11px] sm:h-9 sm:px-4 sm:text-[0.8125rem]"
            >
              {{ sections.hero.form.buttonLabel }}
            </AppButton>
          </div>

          <button
            type="button"
            class="inline-flex h-10 w-10 shrink-0 items-center justify-center lg:hidden"
            :class="overHero && !open ? 'text-white' : 'text-ink'"
            :aria-expanded="open"
            aria-controls="mobile-nav"
            :aria-label="open ? ui.closeMenu : ui.openMenu"
            @click="open = !open"
          >
            <svg v-if="!open" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      <Transition name="mega-shell">
        <div
          v-if="activeMegaLink"
          id="nav-mega"
          class="fixed inset-x-0 top-14 z-50 hidden pt-3 sm:top-16 lg:block"
          @mouseenter="clearClose"
        >
          <div class="flex justify-center px-4">
          <div
            class="overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_18px_50px_rgba(15,18,34,0.12)]"
            :class="megaReady && 'mega-frame'"
            :style="megaReady ? { width: `${megaSize.width}px`, height: `${megaSize.height}px` } : undefined"
          >
            <div
              ref="megaInner"
              class="w-max px-7 py-6 transition-opacity duration-150"
              :class="megaFading && 'opacity-0'"
            >
              <NavMegaMenu
                :link="activeMegaLink"
                @go="goTo"
              />
            </div>
          </div>
          </div>
        </div>
      </Transition>

      <div
        v-if="open"
        id="mobile-nav"
        class="border-t border-ink/6 py-4 lg:hidden"
      >
        <nav class="flex flex-col gap-1" :aria-label="ui.mobileNav">
          <template v-for="link in navbar.links" :key="link.label">
            <div v-if="hasItems(link)">
              <button
                type="button"
                class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink"
                :aria-expanded="mobileOpen === link.label"
                @click="toggleMobile(link.label)"
              >
                {{ link.label }}
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 text-muted transition-transform duration-200"
                  :class="mobileOpen === link.label && 'rotate-180'"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div v-if="mobileOpen === link.label" class="mb-2 space-y-3 px-3 pb-2">
                <template v-if="link.columns?.length">
                  <div v-for="column in link.columns" :key="column.heading">
                    <p class="mb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b90a0]">
                      {{ column.heading }}
                    </p>
                    <a
                      v-for="item in column.items"
                      :key="item.href"
                      :href="item.href"
                      class="block rounded-lg py-1.5"
                      @click.prevent="goTo(item.href)"
                    >
                      <span class="block text-sm font-medium text-ink">{{ item.label }}</span>
                    </a>
                  </div>
                </template>
                <template v-else>
                  <a
                    v-for="item in link.items"
                    :key="item.label"
                    :href="item.href"
                    class="block rounded-lg py-1.5"
                    @click.prevent="goTo(item.href)"
                  >
                    <span class="block text-sm font-medium text-ink">{{ item.label }}</span>
                  </a>
                </template>
              </div>
            </div>
            <a
              v-else
              :href="link.href"
              class="rounded-xl px-3 py-2.5 text-sm font-medium text-ink"
              @click.prevent="goTo(link.href)"
            >
              {{ link.label }}
            </a>
          </template>
          <AppButton
            :href="branding.waitlistUrl"
            variant="accent"
            class="mt-4 w-full"
            @click="close"
          >
            {{ sections.hero.form.buttonLabel }}
          </AppButton>
        </nav>
      </div>
      </div>
    </Container>
  </header>
</template>

<style scoped>
.mega-frame {
  transition:
    width 280ms cubic-bezier(0.22, 1, 0.36, 1),
    height 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mega-shell-enter-active,
.mega-shell-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mega-shell-enter-from,
.mega-shell-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.mega-shell-enter-to,
.mega-shell-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
