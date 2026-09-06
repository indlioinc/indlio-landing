<script setup lang="ts">
import type { WaitlistContent } from '~/types/content'

defineProps<{
  content: WaitlistContent
}>()

const { branding } = useLandingContent()
</script>

<template>
  <section
    class="relative z-[70] flex scroll-mt-24 items-center px-6 pb-0 pt-16 sm:px-12 sm:pt-24 lg:px-24 lg:pt-32"
    :id="content.id"
  >
    <div
      class="mx-auto w-full max-w-4xl -mb-20 rounded-[2rem] bg-white px-5 py-8 shadow-[0_22px_50px_-28px_rgba(15,18,34,0.35)] ring-1 ring-ink/6 sm:-mb-32 sm:max-w-5xl sm:rounded-[2.5rem] sm:px-8 sm:py-12 lg:-mb-40 lg:rounded-[3.5rem] lg:px-10 lg:py-12"
    >
      <div class="grid w-full items-center justify-items-center gap-8 text-center xl:grid-cols-2 xl:justify-items-stretch xl:gap-12 xl:text-left">
        <SectionHeading
          align="center"
          class="xl:mx-0 xl:text-left"
          :eyebrow="content.eyebrow"
          :title="content.title"
          :subtitle="content.subtitle"
        />
        <div class="flex w-full min-w-0 justify-center xl:justify-end">
          <AppButton
            :href="branding.waitlistUrl"
            variant="accent"
            size="sm"
            class="h-10 px-5 text-sm sm:h-12 sm:px-7 sm:text-base xl:h-14 xl:px-8 xl:text-lg"
          >
            {{ content.form.buttonLabel }}
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>
