<script setup lang="ts">
import { SparkleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import type { HeroContent } from '~/types/content'

defineProps<{
  content: HeroContent
}>()

const { branding, navbar } = useLandingContent()

const productSrc = '/product_images/spark_welcome_page.png'
const comingSoon = computed(() => navbar.value.badge?.label || 'Coming soon')
</script>

<template>
  <section
    class="relative bg-hero flex min-h-svh flex-col overflow-x-clip overflow-y-visible text-white"
    :id="content.id"
  >
    <HeroBackdrop />
    <Container class="relative z-10 flex flex-1 flex-col justify-center pb-16 pt-20 sm:pb-20 sm:pt-24 lg:justify-start lg:pb-24 lg:pt-32">
      <div class="mx-auto w-full max-w-4xl px-3 text-center sm:px-0 lg:pt-24">
        <MovingBorderBadge :duration="8000">
          <HugeiconsIcon :icon="SparkleIcon" :size="14" color="currentColor" :stroke-width="1.8" />
          {{ comingSoon }}
        </MovingBorderBadge>
        <h1 class="mt-5 text-[1.65rem] font-semibold leading-snug tracking-tight text-balance sm:mt-7 sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-snug">
          {{ content.title }}
          <template v-if="content.titleAccent"> {{ content.titleAccent }}</template>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/55 text-pretty sm:mt-7 sm:text-lg">
          {{ content.subtitle }}
        </p>
        <div class="mx-auto mt-8 flex w-full min-w-0 flex-col items-center sm:mt-12">
          <AppButton
            :href="branding.waitlistUrl"
            variant="accent"
            size="sm"
            class="h-10 px-5 text-sm sm:h-12 sm:px-7 sm:text-base"
          >
            {{ content.form.buttonLabel }}
            <span aria-hidden="true">→</span>
          </AppButton>
        </div>
      </div>
      <div class="mx-auto mt-10 hidden w-full max-w-6xl sm:mt-14 lg:mt-16 lg:block">
        <div class="overflow-hidden rounded-xl shadow-[0_24px_80px_-16px_rgba(0,0,0,0.55)] ring-1 ring-white/12 sm:rounded-2xl lg:rounded-[1.25rem]">
          <img
            :src="productSrc"
            alt="Indlio Spark welcome screen"
            width="1706"
            height="953"
            fetchpriority="high"
            decoding="async"
            class="block h-auto w-full"
          >
        </div>
      </div>
    </Container>
  </section>
</template>
