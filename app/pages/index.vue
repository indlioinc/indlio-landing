<script setup lang="ts">
import type { Component } from 'vue'
import type { SectionId } from '~/types/content'
import MetricsSection from '~/components/sections/MetricsSection.vue'
import ProblemSection from '~/components/sections/ProblemSection.vue'
import WorkflowSection from '~/components/sections/WorkflowSection.vue'
import WhoSection from '~/components/sections/WhoSection.vue'

const { home, sections, locale } = useLandingContent()

const HeroSection = resolveComponent('HeroSection')
const LazyIntegrationsSection = resolveComponent('LazyIntegrationsSection')
const LazyWaitlistSection = resolveComponent('LazyWaitlistSection')

const registry: Partial<Record<SectionId, Component>> = {
  hero: HeroSection,
  metrics: MetricsSection,
  problem: ProblemSection,
  workflow: WorkflowSection,
  who: WhoSection,
  integrations: LazyIntegrationsSection,
  waitlist: LazyWaitlistSection,
}
</script>

<template>
  <div>
    <component
      :is="registry[id]"
      v-for="id in home.sections"
      :key="`${locale}-${id}`"
      :content="sections[id]"
      :hydrate-on-visible="id !== 'hero'"
    />
  </div>
</template>
