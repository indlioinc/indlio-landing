export function useSiteSeo() {
  const { seo, branding } = useLandingContent()

  useSeoMeta({
    title: computed(() => seo.value.title),
    description: computed(() => seo.value.description),
    ogTitle: computed(() => seo.value.ogTitle),
    ogDescription: computed(() => seo.value.description),
    ogImage: computed(() => seo.value.ogImage),
    ogSiteName: branding.name,
    twitterCard: computed(() => seo.value.twitterCard as 'summary_large_image'),
    twitterTitle: computed(() => seo.value.ogTitle),
    twitterDescription: computed(() => seo.value.description),
    twitterImage: computed(() => seo.value.ogImage),
  })
}
