<script setup lang="ts">
const route = useRoute()
const { sitePages } = useLandingContent()

const path = computed(() => {
  const raw = route.params.slug
  const parts = Array.isArray(raw) ? raw : raw ? [raw] : []
  return parts.join('/')
})

const content = computed(() => sitePages.value[path.value])

watch(content, (page) => {
  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    })
  }
}, { immediate: true })

useSeoMeta({
  title: computed(() => content.value?.seo.title),
  description: computed(() => content.value?.seo.description),
  ogTitle: computed(() => content.value?.seo.title),
  ogDescription: computed(() => content.value?.seo.description),
})
</script>

<template>
  <MarketingPage v-if="content" :key="path" :content="content" />
</template>
