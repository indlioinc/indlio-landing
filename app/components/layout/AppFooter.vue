<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowDown01Icon,
  DiscordIcon,
  Facebook02Icon,
  InstagramIcon,
  Linkedin02Icon,
  MediumIcon,
  NewTwitterIcon,
  WhatsappIcon,
  YoutubeIcon,
} from '@hugeicons/core-free-icons'
import type { Branding, FooterContent, FooterStoreIcon, NavLink, SocialIcon } from '~/types/content'

const props = defineProps<{
  branding: Branding
  footer: FooterContent
}>()

const route = useRoute()
const { ui } = useLandingContent()
const { openSettings } = useCookieConsent()

const compactLegalFooter = computed(() => {
  const clean = route.path.replace(/\/$/, '') || '/'
  return ['/privacy', '/legal', '/cookies'].includes(clean)
})

const footerClass = computed(() => compactLegalFooter.value
  ? 'relative z-[60]'
  : 'footer-curve relative z-[60] bg-accent pt-32 text-left text-hero sm:pt-40 lg:pt-48')

const year = new Date().getFullYear()
const { resolve } = useBrandLogos()

const socialIcons: Record<SocialIcon, typeof Linkedin02Icon> = {
  linkedin: Linkedin02Icon,
  medium: MediumIcon,
  x: NewTwitterIcon,
  facebook: Facebook02Icon,
  instagram: InstagramIcon,
  whatsapp: WhatsappIcon,
  discord: DiscordIcon,
  youtube: YoutubeIcon,
}

const socials = computed(() => props.footer.socials)

const storeIcons: Record<FooterStoreIcon, string> = {
  apple: '/downloads/apple.CoF0IO47.svg',
  play: '/downloads/google-play.BnDlh9fx.svg',
  edge: '/downloads/edge.CoGLKjTb.svg',
  safari: '/downloads/safari.D_kv1qWz.svg',
  chrome: '/downloads/chomre.B5KY3aBe.svg',
  firefox: '/downloads/firefox.CZPCZ-Ap.svg',
  outlook: '/downloads/outlook.BVilOKGX.svg',
}

const glassTileClass = [
  'inline-flex size-11 items-center justify-center rounded-2xl sm:size-12 lg:size-14',
  'border border-white/35 bg-white/20 backdrop-blur-md',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]',
].join(' ')

function isCookieSettings(link: NavLink) {
  return link.id === 'cookie-settings' || /cookie\s*settings/i.test(link.label)
}

function legalTag(link: NavLink) {
  if (link.href) {
    return resolveComponent('NuxtLink')
  }
  return isCookieSettings(link) ? 'button' : 'span'
}

function showLegalLink(link: NavLink) {
  return Boolean(link.href) || isCookieSettings(link)
}

function groupKey(columnIndex: number, title: string) {
  return `${columnIndex}-${title}`
}

const firstGroup = props.footer.columns[0]?.groups[0]
const openGroup = ref(firstGroup ? groupKey(0, firstGroup.title) : null)

function isGroupOpen(columnIndex: number, title: string) {
  return openGroup.value === groupKey(columnIndex, title)
}

function toggleGroup(columnIndex: number, title: string) {
  const key = groupKey(columnIndex, title)
  openGroup.value = openGroup.value === key ? null : key
}
</script>

<template>
  <footer :class="footerClass">
    <Container v-if="!compactLegalFooter" class="pb-12 sm:mt-16 sm:pb-16">
      <a href="/" class="mb-6 flex w-fit sm:mb-10">
        <img
          :src="resolve(branding.logos.footer)"
          :alt="branding.name"
          class="h-8 w-auto object-contain sm:h-9"
        >
      </a>

      <div class="overflow-hidden rounded-2xl bg-hero/[0.07] sm:grid sm:grid-cols-2 sm:gap-12 sm:overflow-visible sm:rounded-none sm:bg-transparent lg:grid-cols-4">
        <nav
          v-for="(column, columnIndex) in footer.columns"
          :key="column.groups[0]?.title || columnIndex"
          class="min-w-0 border-b border-hero/10 last:border-b-0 sm:border-0"
          :aria-label="column.groups.map(group => group.title).join(', ')"
        >
          <div
            v-for="(group, groupIndex) in column.groups"
            :key="group.title"
            :class="groupIndex > 0 && 'sm:mt-10'"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-[15px] font-semibold tracking-tight text-hero sm:hidden sm:px-0 sm:py-0"
              :aria-expanded="isGroupOpen(columnIndex, group.title)"
              :aria-controls="`footer-group-${groupKey(columnIndex, group.title)}`"
              @click="toggleGroup(columnIndex, group.title)"
            >
              {{ group.title }}
              <span
                class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-hero/10"
                aria-hidden="true"
              >
                <HugeiconsIcon
                  :icon="ArrowDown01Icon"
                  :size="16"
                  color="currentColor"
                  :stroke-width="1.8"
                  class="text-hero/70 transition-transform duration-200"
                  :class="isGroupOpen(columnIndex, group.title) && 'rotate-180'"
                />
              </span>
            </button>
            <p class="hidden text-sm font-semibold text-hero sm:block">
              {{ group.title }}
            </p>
            <ul
              :id="`footer-group-${groupKey(columnIndex, group.title)}`"
              class="space-y-2.5 px-4 sm:mt-4 sm:px-0"
              :class="isGroupOpen(columnIndex, group.title) ? 'pb-4' : 'hidden sm:block'"
            >
              <li
                v-for="link in group.links"
                :key="`${group.title}-${link.label}`"
                class="flex flex-wrap items-center justify-start gap-2"
              >
                <component
                  :is="link.href ? 'a' : 'span'"
                  :href="link.href || undefined"
                  class="text-sm text-hero/70 transition-colors hover:text-hero"
                >
                  {{ link.label }}
                </component>
                <span
                  v-if="link.badge"
                  class="rounded-md bg-brand px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white"
                >
                  {{ link.badge }}
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="mt-12 hidden flex-col items-center gap-8 border-t border-hero/15 py-8 sm:flex-row sm:items-start sm:justify-between">
        <div v-if="footer.stores.length" class="flex flex-col items-center gap-3 sm:items-start">
          <p class="text-base font-semibold text-hero">
            {{ footer.storesTitle }}
          </p>
          <div
            class="footer-icon-row"
            :aria-label="footer.storesTitle"
          >
            <component
              :is="store.href ? 'a' : 'span'"
              v-for="store in footer.stores"
              :key="store.icon"
              :href="store.href || undefined"
              :aria-label="store.label"
              :title="store.label"
              :rel="store.href ? 'noreferrer' : undefined"
              :target="store.href ? '_blank' : undefined"
              :class="[
                glassTileClass,
                store.href ? 'transition-opacity hover:opacity-90' : 'cursor-default',
              ]"
            >
              <img
                :src="storeIcons[store.icon]"
                alt=""
                class="size-7 object-contain drop-shadow-sm sm:size-8"
              >
            </component>
          </div>
        </div>
        <div v-if="socials.length" class="flex flex-col items-center gap-3 sm:items-end">
          <p class="text-base font-semibold text-hero">
            {{ footer.socialsTitle }}
          </p>
          <nav
            class="footer-icon-row footer-icon-row-end"
            :aria-label="footer.socialsTitle"
          >
            <component
              :is="item.href ? 'a' : 'span'"
              v-for="item in socials"
              :key="item.label"
              :href="item.href || undefined"
              :aria-label="item.label"
              :title="item.label"
              :rel="item.href ? 'noreferrer' : undefined"
              :target="item.href ? '_blank' : undefined"
              :class="[
                glassTileClass,
                'text-hero',
                item.href ? 'transition-opacity hover:opacity-90' : 'cursor-default',
              ]"
            >
              <HugeiconsIcon
                :icon="socialIcons[item.icon]"
                :size="26"
                color="currentColor"
                :stroke-width="1.5"
              />
            </component>
          </nav>
        </div>
      </div>

    </Container>

    <div class="bg-hero text-white">
      <Container>
        <div class="flex flex-col items-start gap-4 py-5 text-left text-xs text-white/70 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3 sm:py-3.5">
          <FooterLanguageSelect
            v-if="footer.languages?.length"
            :languages="footer.languages"
            class="shrink-0 text-white"
          />
          <nav
            class="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 sm:gap-x-6"
            :aria-label="ui.legal"
          >
            <component
              :is="legalTag(link)"
              v-for="link in footer.legal.filter(showLegalLink)"
              :key="link.label"
              :to="link.href || undefined"
              :type="legalTag(link) === 'button' ? 'button' : undefined"
              class="transition-colors hover:text-white"
              @click="isCookieSettings(link) ? openSettings() : undefined"
            >
              {{ link.label }}
            </component>
          </nav>
          <p class="text-white/60 sm:ml-auto">
            © {{ ui.copyrightLabel }} {{ footer.copyright }} {{ year }}
          </p>
        </div>
      </Container>
    </div>
  </footer>
</template>

<style scoped>


.footer-icon-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  max-width: calc(4 * 2.75rem + 3 * 0.625rem);
}

@media (width >= 640px) {
  .footer-icon-row {
    max-width: none;
    gap: 0.75rem;
    justify-content: flex-start;
  }

  .footer-icon-row-end {
    justify-content: flex-end;
  }
}
</style>
