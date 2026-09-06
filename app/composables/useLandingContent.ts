import brandingJson from '#content/branding.json'
import homeJson from '#content/pages/home.json'
import legalPagesJson from '#content/pages/legal-pages.json'
import sitePagesJson from '#content/pages/site-pages.json'
import integrationRowsJson from '#content/shared/integrations.json'
import en from '#content/locales/en.json'
import ta from '#content/locales/ta.json'
import te from '#content/locales/te.json'
import kn from '#content/locales/kn.json'
import hi from '#content/locales/hi.json'
import ml from '#content/locales/ml.json'
import type {
  Branding,
  FooterContent,
  HomePageContent,
  IntegrationsContent,
  LegalPagesContent,
  LocaleCopy,
  NavbarContent,
  NavLink,
  SectionContentMap,
  SitePagesContent,
} from '~/types/content'

const localePacks: Record<string, LocaleCopy> = {
  en: en as LocaleCopy,
  ta: ta as LocaleCopy,
  te: te as LocaleCopy,
  kn: kn as LocaleCopy,
  hi: hi as LocaleCopy,
  ml: ml as LocaleCopy,
}

export function useLandingContent() {
  const { locale, languages } = useLocale()
  const branding = brandingJson as Branding
  const home = homeJson as HomePageContent

  const pack = computed(() => localePacks[locale.value] ?? localePacks.en)

  const seo = computed(() => pack.value.seo)
  const navbar = computed(() => localizeNavbar(
    pack.value.navbar,
    localePacks.en.navbar,
    pack.value.footer,
  ))
  const ui = computed(() => pack.value.ui)
  const pricing = computed(() => pack.value.pricing)
  const about = computed(() => pack.value.about ?? localePacks.en.about!)
  const careers = computed(() => pack.value.careers ?? localePacks.en.careers!)
  const blog = computed(() => pack.value.blog ?? localePacks.en.blog!)
  const sitePages = computed<SitePagesContent>(() => ({
    ...(sitePagesJson as SitePagesContent),
    ...(pack.value.sitePages ?? {}),
  }))

  const legalPages = legalPagesJson as LegalPagesContent
  const cookies = computed(() => pack.value.cookies ?? localePacks.en.cookies!)
  const privacy = computed(() => pack.value.privacy ?? legalPages.privacy)
  const terms = computed(() => pack.value.terms ?? legalPages.terms)
  const cookiePolicy = computed(() => pack.value.cookiePolicy ?? legalPages.cookiePolicy)

  const footer = computed<FooterContent>(() => ({
    ...pack.value.footer,
    languages,
  }))

  const integrations = computed<IntegrationsContent>(() => ({
    ...pack.value.integrations,
    rows: integrationRowsJson,
  }))

  const sections = computed<SectionContentMap>(() => ({
    hero: pack.value.hero,
    metrics: pack.value.metrics ?? localePacks.en.metrics!,
    impact: pack.value.impact ?? localePacks.en.impact!,
    problem: pack.value.problem ?? localePacks.en.problem!,
    workflow: pack.value.workflow ?? localePacks.en.workflow!,
    who: pack.value.who ?? localePacks.en.who!,
    integrations: integrations.value,
    waitlist: pack.value.waitlist,
  }))

  return {
    branding,
    home,
    locale,
    seo,
    navbar,
    footer,
    pricing,
    about,
    careers,
    blog,
    sitePages,
    cookies,
    privacy,
    terms,
    cookiePolicy,
    ui,
    sections,
  }
}

function collectLabels(links?: NavLink[], map = new Map<string, string>()) {
  for (const link of links ?? []) {
    map.set(link.href, link.label)
    collectLabels(link.items, map)
    for (const column of link.columns ?? []) {
      collectLabels(column.items, map)
    }
  }
  return map
}

function applyLabels(link: NavLink, labels: Map<string, string>): NavLink {
  return {
    ...link,
    label: labels.get(link.href) ?? link.label,
    items: link.items?.map(item => applyLabels(item, labels)),
    columns: link.columns?.map(column => ({
      ...column,
      items: column.items.map(item => applyLabels(item, labels)),
    })),
  }
}

function localizeNavbar(
  localeNav: NavbarContent,
  englishNav: NavbarContent,
  footer: Omit<FooterContent, 'languages'>,
): NavbarContent {
  const labels = new Map<string, string>()
  for (const column of footer.columns) {
    for (const group of column.groups) {
      collectLabels(group.links, labels)
    }
  }
  collectLabels(footer.legal, labels)
  collectLabels(localeNav.links, labels)

  return {
    ...localeNav,
    links: englishNav.links.map((englishLink) => {
      const localeLink = localeNav.links.find(link => link.href === englishLink.href)
      const localized = applyLabels(englishLink, labels)
      return {
        ...localized,
        label: localeLink?.label ?? localized.label,
        href: localeLink?.href ?? localized.href,
      }
    }),
  }
}
