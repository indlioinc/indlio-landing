export function useBrandTheme() {
  const { branding } = useLandingContent()

  return {
    style: {
      '--brand-primary': branding.colors.primary,
      '--brand-cyan': branding.colors.cyan,
      '--brand-teal': branding.colors.teal,
      '--brand-ink': branding.colors.ink,
      '--brand-muted': branding.colors.muted,
      '--brand-surface': branding.colors.surface,
      '--brand-accent': branding.colors.accent,
      '--brand-hero': branding.colors.hero,
    },
  }
}
