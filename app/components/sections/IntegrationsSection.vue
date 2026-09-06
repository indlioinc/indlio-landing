<script setup lang="ts">
import type { IntegrationsContent } from '~/types/content'

defineProps<{
  content: IntegrationsContent
}>()

const root = ref<HTMLElement | null>(null)
const revealed = ref(false)
let observer: IntersectionObserver | undefined

function hasHref(href?: string) {
  return Boolean(href && href.trim())
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealed.value = true
    return
  }

  observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      revealed.value = true
      observer?.disconnect()
    }
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -8% 0px',
  })

  if (root.value) {
    observer.observe(root.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="root"
    class="integrations-section z-20 overflow-x-clip pt-20 pb-24 sm:pt-28 sm:pb-32"
    :id="content.id"
  >
    <Container>
      <div
        class="transition duration-700 ease-out"
        :class="revealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
      >
        <SectionHeading
          align="center"
          :title="content.title"
          :subtitle="content.subtitle"
        />
      </div>

      <div
        class="mt-10 transition duration-700 ease-out sm:mt-16"
        :class="revealed ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
        :style="{ transitionDelay: revealed ? '90ms' : '0ms' }"
      >
        <div class="flex flex-col items-center gap-4 sm:gap-6 lg:hidden">
          <div
            v-for="(row, rowIndex) in content.rows.mobile"
            :key="`mobile-${rowIndex}`"
            class="flex items-center justify-center"
          >
            <IntegrationLogoNode
              v-for="(logo, logoIndex) in row"
              :key="logo.name"
              :logo="logo"
              :left="logoIndex === 0 ? 0 : 1"
              :right="logoIndex === row.length - 1 ? 0 : 1"
            />
          </div>
        </div>

        <div class="hidden flex-col items-center gap-8 lg:flex">
          <div
            v-for="(row, rowIndex) in content.rows.desktop"
            :key="`desktop-${rowIndex}`"
            class="flex items-center justify-center"
          >
            <IntegrationLogoNode
              v-for="(logo, logoIndex) in row"
              :key="logo.name"
              :logo="logo"
              :left="logoIndex === 0 ? 0 : 1"
              :right="logoIndex === row.length - 1 ? 0 : 1"
            />
          </div>
        </div>
      </div>

      <div
        class="mt-10 grid gap-4 transition duration-700 ease-out sm:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        :class="revealed ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
        :style="{ transitionDelay: revealed ? '180ms' : '0ms' }"
      >
        <component
          :is="hasHref(suite.href) ? 'a' : 'article'"
          v-for="suite in content.suites"
          :key="suite.name"
          :href="hasHref(suite.href) ? suite.href : undefined"
          :rel="hasHref(suite.href) ? 'noreferrer' : undefined"
          :target="hasHref(suite.href) ? '_blank' : undefined"
          class="relative min-w-0 rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/6 sm:rounded-[2rem] sm:p-8"
        >
          <img
            :src="suite.logo"
            :alt="suite.name"
            class="size-10 rounded-xl object-contain sm:size-12 lg:size-14"
            width="56"
            height="56"
          >
          <h3 class="mt-6 text-xl font-semibold leading-snug tracking-tight text-ink">
            {{ suite.name }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
            {{ suite.body }}
          </p>
        </component>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.integrations-section {
  isolation: isolate;
  background: transparent;
  box-shadow: none;
}
</style>
