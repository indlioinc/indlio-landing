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
    return 'bottom-0 flex flex-col bg-white'
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

function toggleMenu() {
  open.value = !open.value
  mobileOpen.value = null
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

watch(open, (isOpen) => {
  if (!import.meta.client) {
    return
  }
  document.body.style.overflow = isOpen ? 'hidden' : ''
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
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header
    class="fixed top-0 z-[80] w-full transition-colors duration-300"
    :class="surfaceClass"
  >
    <Container :class="open && 'flex min-h-0 flex-1 flex-col'">
      <div
        class="relative"
        :class="open && 'flex min-h-0 flex-1 flex-col'"
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
            @click="toggleMenu"
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
        class="flex min-h-0 flex-1 flex-col bg-white lg:hidden"
      >
        <nav
          class="min-h-0 flex-1 overflow-y-auto border-t border-[#ececec]"
          :aria-label="ui.mobileNav"
        >
          <template v-for="(link, index) in navbar.links" :key="link.label">
            <div :class="index > 0 && 'border-t border-[#ececec]'">
              <template v-if="hasItems(link)">
              <button
                type="button"
                class="flex w-full items-center justify-between px-4 py-4 text-[17px] font-semibold tracking-tight text-ink sm:px-6"
                :aria-expanded="mobileOpen === link.label"
                @click="toggleMobile(link.label)"
              >
                {{ link.label }}
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 text-ink transition-transform duration-200"
                  :class="mobileOpen === link.label && 'rotate-180'"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                v-if="mobileOpen === link.label"
                class="px-4 pb-5 sm:px-6"
              >
                <template v-if="link.columns?.length">
                  <div
                    v-for="column in link.columns"
                    :key="column.heading"
                    class="mt-5 first:mt-1"
                  >
                    <p class="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8b90a0]">
                      {{ column.heading }}
                    </p>
                    <div
                      v-if="column.variant !== 'featured'"
                      class="ml-1 border-l border-[#ececec] pl-5"
                    >
                      <a
                        v-for="item in column.items"
                        :key="item.href"
                        :href="item.href"
                        class="block py-3 text-[15px] font-medium text-[#1a2030]"
                        @click.prevent="goTo(item.href)"
                      >
                        {{ item.label }}
                      </a>
                    </div>
                    <div
                      v-else
                      class="flex flex-col gap-5"
                    >
                      <a
                        v-for="item in column.items"
                        :key="item.href"
                        :href="item.href"
                        class="flex items-start gap-3"
                        @click.prevent="goTo(item.href)"
                      >
                        <NavItemIcon
                          v-if="item.icon"
                          :name="item.icon"
                          monochrome
                        />
                        <span class="min-w-0 pt-0.5">
                          <span class="flex flex-wrap items-center gap-2">
                            <span class="text-[15px] font-semibold tracking-tight text-ink">
                              {{ item.label }}
                            </span>
                            <span
                              v-if="item.badge"
                              class="rounded-md bg-[#f1f2f4] px-1.5 py-0.5 text-[10px] font-medium text-[#5b6178]"
                            >
                              {{ item.badge }}
                            </span>
                          </span>
                          <span
                            v-if="item.description"
                            class="mt-0.5 block text-[13px] leading-snug text-[#8b90a0]"
                          >
                            {{ item.description }}
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </template>
                <div
                  v-else
                  class="mt-1 flex flex-col gap-5"
                >
                  <a
                    v-for="item in link.items"
                    :key="item.label"
                    :href="item.href"
                    class="block"
                    @click.prevent="goTo(item.href)"
                  >
                    <span class="block text-[15px] font-semibold tracking-tight text-ink">
                      {{ item.label }}
                    </span>
                    <span
                      v-if="item.description"
                      class="mt-0.5 block text-[13px] leading-snug text-[#8b90a0]"
                    >
                      {{ item.description }}
                    </span>
                  </a>
                </div>
              </div>
              </template>
              <a
                v-else
                :href="link.href"
                class="flex w-full items-center justify-between px-4 py-4 text-[17px] font-semibold tracking-tight text-ink sm:px-6"
                @click.prevent="goTo(link.href)"
              >
                {{ link.label }}
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 text-ink"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </template>
        </nav>
        <div class="shrink-0 px-4 pb-6 pt-3 sm:px-6">
          <a
            :href="branding.waitlistUrl"
            class="flex h-12 w-full items-center justify-center rounded-xl bg-[#0b162f] text-sm font-semibold text-white"
            @click="close"
          >
            {{ sections.hero.form.buttonLabel }}
          </a>
        </div>
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
