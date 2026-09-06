<script setup lang="ts">
const { terms } = useLandingContent()

useSeoMeta({
  title: computed(() => terms.value.seo.title),
  description: computed(() => terms.value.seo.description),
  ogTitle: computed(() => terms.value.seo.title),
  ogDescription: computed(() => terms.value.seo.description),
})
</script>

<template>
  <LegalDocument :content="terms" />
</template>
