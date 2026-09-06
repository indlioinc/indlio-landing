<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Appointment01Icon,
  CalendarCheckIn01Icon,
  Notebook01Icon,
  Wallet02Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import type { MetricsContent } from '~/types/content'

defineProps<{
  content: MetricsContent
}>()

const icons = [WhatsappIcon, CalendarCheckIn01Icon, Wallet02Icon, Notebook01Icon]
</script>

<template>
  <section :id="content.id" class="py-16 sm:py-24">
    <Container>
      <RevealBlock v-if="content.title">
        <SectionHeading
          align="center"
          :eyebrow="content.eyebrow"
          :title="content.title"
          :subtitle="content.subtitle"
        />
      </RevealBlock>
      <div
        class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
        :class="content.title ? 'mt-10 sm:mt-14' : ''"
      >
        <RevealBlock
          v-for="(item, index) in content.items"
          :key="item.label"
          :delay="index * 70"
        >
        <article
          class="rounded-[1.25rem] bg-white p-4 ring-1 ring-ink/6 sm:rounded-[1.75rem] sm:p-7"
        >
          <div class="flex size-11 items-center justify-center rounded-[0.9rem] bg-brand/10 text-brand">
            <HugeiconsIcon
              :icon="icons[index] ?? Appointment01Icon"
              :size="22"
              color="currentColor"
              :stroke-width="1.8"
            />
          </div>
          <h3 class="mt-5 text-[1.05rem] font-semibold leading-snug tracking-tight text-ink sm:text-lg">
            {{ item.label }}
          </h3>
          <p class="mt-2 text-[15px] leading-relaxed text-pretty text-muted">
            {{ item.body }}
          </p>
        </article>
        </RevealBlock>
      </div>
    </Container>
  </section>
</template>
