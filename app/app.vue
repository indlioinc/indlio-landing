<script setup lang="ts">
const { branding, navbar, footer, locale } = useLandingContent()
const { style } = useBrandTheme()
useSiteSeo()

useHead({
  htmlAttrs: computed(() => ({
    lang: locale.value,
    class: 'scroll-smooth',
  })),
})
</script>

<template>
  <div :style="style" class="flex min-h-dvh flex-col overflow-x-clip bg-brand/7 font-sans text-ink antialiased selection:bg-brand/25 selection:text-ink">
    <AppHeader :branding="branding" :navbar="navbar" />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter :branding="branding" :footer="footer" />
    <CookieBanner />
    <CookieSettings />
  </div>
</template>
