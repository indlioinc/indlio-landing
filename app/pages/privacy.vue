<script setup lang="ts">
const { privacy } = useLandingContent()

useSeoMeta({
  title: computed(() => privacy.value.seo.title),
  description: computed(() => privacy.value.seo.description),
  ogTitle: computed(() => privacy.value.seo.title),
  ogDescription: computed(() => privacy.value.seo.description),
})
</script>

<template>
  <LegalDocument :content="privacy" />
</template>
