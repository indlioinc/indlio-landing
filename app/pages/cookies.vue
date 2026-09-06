<script setup lang="ts">
const { cookiePolicy } = useLandingContent()

useSeoMeta({
  title: computed(() => cookiePolicy.value.seo.title),
  description: computed(() => cookiePolicy.value.seo.description),
  ogTitle: computed(() => cookiePolicy.value.seo.title),
  ogDescription: computed(() => cookiePolicy.value.seo.description),
})
</script>

<template>
  <LegalDocument :content="cookiePolicy" />
</template>
