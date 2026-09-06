<script setup lang="ts">
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  CalendarCheckIn01Icon,
  Message01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import type { AboutWorkflow, AboutWorkflowLane } from '~/types/content'

defineProps<{
  content: AboutWorkflow
}>()

function isLastStep(lane: AboutWorkflowLane, index: number) {
  return index === lane.steps.length - 1
}
</script>

<template>
  <section :id="content.id" class="pb-16 sm:pb-24">
    <Container>
      <RevealBlock>
        <SectionHeading
          align="center"
          :eyebrow="content.eyebrow"
          :title="content.title"
          :subtitle="content.subtitle"
        />
      </RevealBlock>

      <RevealBlock class="mx-auto mt-10 grid max-w-5xl items-stretch gap-4 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-0" :delay="80">
        <article
          v-for="(lane, laneIndex) in [content.current, content.desired]"
          :key="lane.label"
          class="relative min-w-0 overflow-hidden rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-8"
          :class="laneIndex === 1
            ? 'order-3 bg-ink text-white shadow-[0_28px_60px_-32px_rgba(15,18,34,0.65)] ring-1 ring-white/10'
            : 'order-1 bg-white shadow-[0_22px_50px_-28px_rgba(15,18,34,0.28)] ring-1 ring-ink/6'"
        >
          <span
            v-if="laneIndex === 1"
            class="pointer-events-none absolute -right-10 -top-12 size-44 rounded-full bg-accent/18 blur-3xl"
            aria-hidden="true"
          />
          <span
            v-if="laneIndex === 1"
            class="pointer-events-none absolute -bottom-16 -left-10 size-40 rounded-full bg-brand/25 blur-3xl"
            aria-hidden="true"
          />

          <div class="relative flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p
                class="inline-flex max-w-full items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                :class="laneIndex === 1 ? 'bg-accent/15 text-accent' : 'bg-brand/10 text-brand'"
              >
                <span
                  class="flex size-5 shrink-0 items-center justify-center rounded-full"
                  :class="laneIndex === 1 ? 'bg-accent text-ink' : 'bg-brand text-white'"
                >
                  <HugeiconsIcon
                    :icon="laneIndex === 1 ? CalendarCheckIn01Icon : Message01Icon"
                    :size="11"
                    color="currentColor"
                    :stroke-width="2"
                  />
                </span>
                <span class="truncate">{{ lane.label }}</span>
              </p>
              <p
                class="mt-3 text-sm leading-relaxed text-pretty"
                :class="laneIndex === 1 ? 'text-white/65' : 'text-muted'"
              >
                {{ lane.hint }}
              </p>
            </div>
            <span
              class="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums"
              :class="laneIndex === 1
                ? 'bg-white/8 text-accent ring-1 ring-white/10'
                : 'bg-ink/4 text-brand ring-1 ring-ink/8'"
              aria-hidden="true"
            >
              {{ lane.steps.length }}
            </span>
          </div>

          <ol class="relative mt-7">
            <li
              v-for="(step, index) in lane.steps"
              :key="`${lane.label}-${step}`"
              class="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-3.5"
              :class="isLastStep(lane, index) ? '' : 'pb-5'"
            >
              <span
                v-if="!isLastStep(lane, index)"
                class="absolute bottom-0 left-[15px] top-8"
                :class="laneIndex === 1
                  ? 'w-px bg-gradient-to-b from-accent/70 to-accent/15'
                  : 'border-l border-dashed border-ink/18'"
                aria-hidden="true"
              />
              <span
                class="relative z-10 mt-0.5 flex size-8 items-center justify-center rounded-full text-xs font-semibold tabular-nums"
                :class="laneIndex === 1
                  ? isLastStep(lane, index)
                    ? 'bg-accent text-ink ring-4 ring-accent/20'
                    : 'bg-white/8 text-accent ring-1 ring-white/12'
                  : isLastStep(lane, index)
                    ? 'bg-brand text-white'
                    : 'bg-brand/10 text-brand ring-1 ring-brand/15'"
              >
                {{ index + 1 }}
              </span>
              <p
                class="min-w-0 pt-1.5 text-[15px] leading-snug tracking-tight"
                :class="isLastStep(lane, index) ? 'font-semibold' : ''"
              >
                {{ step }}
              </p>
            </li>
          </ol>
        </article>

        <div
          class="order-2 flex items-center justify-center lg:px-3 xl:px-4"
          aria-hidden="true"
        >
          <span class="flex size-11 items-center justify-center rounded-full bg-white text-brand shadow-[0_12px_28px_-16px_rgba(15,18,34,0.45)] ring-1 ring-ink/8">
            <span class="lg:hidden">
              <HugeiconsIcon
                :icon="ArrowDown01Icon"
                :size="18"
                color="currentColor"
                :stroke-width="2"
              />
            </span>
            <span class="hidden lg:block">
              <HugeiconsIcon
                :icon="ArrowRight01Icon"
                :size="18"
                color="currentColor"
                :stroke-width="2"
              />
            </span>
          </span>
        </div>
      </RevealBlock>
    </Container>
  </section>
</template>
