export type Accent = 'primary' | 'cyan' | 'teal'

export type NavIconName =
  | 'calendar'
  | 'spark'
  | 'code'
  | 'user'
  | 'users'
  | 'building'
  | 'briefcase'
  | 'book'
  | 'heart'
  | 'palette'

export type NavColumnVariant = 'featured' | 'text' | 'plain'

export interface NavLink {
  label: string
  href: string
  id?: string
  description?: string
  icon?: NavIconName
  badge?: string
  items?: NavLink[]
  columns?: NavColumn[]
}

export interface NavColumn {
  heading: string
  variant?: NavColumnVariant
  items: NavLink[]
}

export interface Branding {
  name: string
  tagline: string
  waitlistUrl: string
  colors: {
    primary: string
    cyan: string
    teal: string
    ink: string
    muted: string
    surface: string
    white: string
    accent: string
    hero: string
  }
  fonts: {
    sans: string
  }
  logos: {
    iconColor: string
    fullColor: string
    navbar: string
    navbarLight: string
    footer: string
  }
}

export interface SeoContent {
  title: string
  description: string
  ogImage: string
  ogTitle: string
  twitterCard: string
}

export interface NavbarAction extends NavLink {
  variant: 'ghost' | 'outline' | 'accent'
}

export interface NavbarBadge {
  label: string
}

export interface NavbarContent {
  links: NavLink[]
  actions?: NavbarAction[]
  badge?: NavbarBadge
}

export interface HomePageContent {
  sections: SectionId[]
}

export interface WaitlistFormCopy {
  placeholder: string
  buttonLabel: string
  successMessage: string
  errorFallback: string
  disclaimer?: string
}

export type SocialIcon =
  | 'linkedin'
  | 'medium'
  | 'x'
  | 'facebook'
  | 'instagram'
  | 'whatsapp'
  | 'discord'
  | 'youtube'

export interface FooterLinkGroup {
  title: string
  links: NavLink[]
}

export interface FooterColumn {
  groups: FooterLinkGroup[]
}

export interface FooterSocial {
  label: string
  href: string
  icon: SocialIcon
}

export type FooterStoreIcon =
  | 'apple'
  | 'play'
  | 'edge'
  | 'safari'
  | 'chrome'
  | 'firefox'
  | 'outlook'

export interface FooterStore {
  label: string
  href: string
  icon: FooterStoreIcon
}

export interface FooterLanguage {
  code: string
  label: string
}

export interface FooterContent {
  columns: FooterColumn[]
  storesTitle: string
  stores: FooterStore[]
  socialsTitle: string
  socials: FooterSocial[]
  legal: NavLink[]
  languages: FooterLanguage[]
  copyright: string
}

export interface HeroContent {
  id: string
  eyebrow: string
  title: string
  titleAccent: string
  subtitle: string
  form: WaitlistFormCopy
}

export interface IntegrationLogo {
  name: string
  src: string
}

export interface IntegrationSuite {
  name: string
  logo: string
  body: string
  href?: string
}

export interface IntegrationsContent {
  id: string
  eyebrow?: string
  title: string
  subtitle: string
  cta?: NavLink
  rows: {
    mobile: IntegrationLogo[][]
    desktop: IntegrationLogo[][]
  }
  suites: IntegrationSuite[]
}

export interface WaitlistContent {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  form: WaitlistFormCopy
}

export interface TrustedBrand {
  name: string
  src: string
}

export interface TrustedContent {
  id: string
  eyebrow: string
  brands: TrustedBrand[]
}

export interface MetricItem {
  label: string
  body: string
}

export interface MetricsContent {
  id: string
  eyebrow?: string
  title?: string
  subtitle?: string
  items: MetricItem[]
}

export interface ImpactContent {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  items: AboutStoryItem[]
}

export interface PricingPlan {
  name: string
  price: string
  period?: string
  yearlyPrice?: string
  yearlyPeriod?: string
  listPrice?: string
  discountLabel?: string
  body: string
  includesLabel?: string
  features: string[]
  cta: NavLink
  featured?: boolean
  badge?: string
  ctaVariant?: 'primary' | 'accent' | 'outline'
  yearlyOnly?: boolean
}

export interface PricingBillingToggle {
  monthlyLabel: string
  yearlyLabel: string
  yearlyHint?: string
  note?: string
}

export interface PricingIncluded {
  title: string
  items: string[]
}

export type PricingComparisonValue = boolean | string

export interface PricingComparisonRow {
  label: string
  hint?: string
  values: PricingComparisonValue[]
}

export interface PricingComparisonGroup {
  title: string
  rows: PricingComparisonRow[]
}

export interface PricingComparison {
  title: string
  subtitle?: string
  groups: PricingComparisonGroup[]
}

export interface PricingFaqItem {
  question: string
  answer: string
}

export interface PricingFaq {
  title: string
  items: PricingFaqItem[]
}

export interface PricingClosing {
  title: string
  subtitle: string
  cta: NavLink
}

export interface PricingPageContent {
  eyebrow: string
  title: string
  subtitle: string
  billing?: PricingBillingToggle
  plans: PricingPlan[]
  included?: PricingIncluded
  comparison?: PricingComparison
  faq?: PricingFaq
  closing?: PricingClosing
  seo: {
    title: string
    description: string
  }
}

export interface AboutStoryItem {
  title: string
  body: string
}

export interface AboutStory {
  eyebrow: string
  title: string
  subtitle: string
  items: AboutStoryItem[]
}

export interface AboutFounder {
  name: string
  role: string
  body: string
  src: string
  alt: string
  linkedin?: string
}

export interface AboutFounders {
  eyebrow: string
  title: string
  subtitle?: string
  people: AboutFounder[]
}

export interface AboutProblem {
  id?: string
  eyebrow: string
  title: string
  paragraphs: string[]
  quoteLabel: string
  quote: string
}

export interface AboutWorkflowLane {
  label: string
  hint: string
  steps: string[]
}

export interface AboutWorkflow {
  id?: string
  eyebrow: string
  title: string
  subtitle: string
  current: AboutWorkflowLane
  desired: AboutWorkflowLane
}

export interface WhoItem {
  label: string
  href?: string
}

export interface AboutWho {
  id?: string
  eyebrow: string
  title: string
  subtitle: string
  items: WhoItem[]
}

export interface AboutOpportunity {
  eyebrow: string
  title: string
  body: string
}

export interface AboutPageContent {
  eyebrow: string
  title: string
  subtitle: string
  problem: AboutProblem
  workflow: AboutWorkflow
  who: AboutWho
  opportunity: AboutOpportunity
  founders?: AboutFounders
  closing?: PricingClosing
  seo: {
    title: string
    description: string
  }
}

export interface CareerRole {
  title: string
  location: string
  type: string
  body: string
  cta: NavLink
}

export interface CareersRoles {
  eyebrow: string
  title: string
  subtitle: string
  empty: string
  items: CareerRole[]
}

export interface CareersPageContent {
  eyebrow: string
  title: string
  subtitle: string
  principles: AboutStory
  roles: CareersRoles
  closing?: PricingClosing
  seo: {
    title: string
    description: string
  }
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  body: string[]
}

export interface BlogPageContent {
  eyebrow: string
  title: string
  subtitle: string
  empty: string
  backLabel: string
  posts: BlogPost[]
  closing?: PricingClosing
  seo: {
    title: string
    description: string
  }
}

export interface SitePageQuote {
  label: string
  body: string
}

export interface SitePageContent {
  eyebrow: string
  title: string
  subtitle: string
  quote?: SitePageQuote
  highlights: AboutStory
  who?: AboutWho
  closing?: PricingClosing
  seo: {
    title: string
    description: string
  }
}

export type SitePagesContent = Record<string, SitePageContent>

export type SectionId =
  | 'hero'
  | 'metrics'
  | 'impact'
  | 'problem'
  | 'workflow'
  | 'who'
  | 'integrations'
  | 'waitlist'

export type SectionContentMap = {
  hero: HeroContent
  metrics: MetricsContent
  impact: ImpactContent
  problem: AboutProblem
  workflow: AboutWorkflow
  who: AboutWho
  integrations: IntegrationsContent
  waitlist: WaitlistContent
}

export interface UiCopy {
  primaryNav: string
  mobileNav: string
  openMenu: string
  closeMenu: string
  legal: string
  billingPeriod: string
  featuresEyebrow: string
  navOverview: string
  language: string
  copyrightLabel: string
}

export interface CookieCategoryCopy {
  label: string
  hint: string
}

export interface CookieConsentCopy {
  bannerTitle: string
  bannerBody: string
  acceptAll: string
  rejectOptional: string
  customize: string
  save: string
  close: string
  settingsTitle: string
  settingsBody: string
  alwaysOn: string
  necessary: CookieCategoryCopy
  analytics: CookieCategoryCopy
  marketing: CookieCategoryCopy
  policyLink: string
}

export interface LegalSection {
  title: string
  paragraphs: string[]
}

export interface LegalPageContent {
  seo: {
    title: string
    description: string
  }
  eyebrow: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export interface LegalPagesContent {
  privacy: LegalPageContent
  terms: LegalPageContent
  cookiePolicy: LegalPageContent
}

export interface I18nConfig {
  default: string
  published?: string[]
  languages: FooterLanguage[]
}

export interface LocaleCopy {
  seo: SeoContent
  navbar: NavbarContent
  footer: Omit<FooterContent, 'languages'>
  hero: HeroContent
  trusted: Omit<TrustedContent, 'brands'>
  metrics?: MetricsContent
  impact?: ImpactContent
  problem?: AboutProblem
  workflow?: AboutWorkflow
  who?: AboutWho
  integrations: Omit<IntegrationsContent, 'rows'>
  waitlist: WaitlistContent
  pricing: PricingPageContent
  about?: AboutPageContent
  careers?: CareersPageContent
  blog?: BlogPageContent
  sitePages?: SitePagesContent
  cookies?: CookieConsentCopy
  privacy?: LegalPageContent
  terms?: LegalPageContent
  cookiePolicy?: LegalPageContent
  ui: UiCopy
}
