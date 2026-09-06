<script setup lang="ts">
import type { AboutProblem } from '~/types/content'

defineProps<{
  content: AboutProblem
}>()
</script>

<template>
  <section :id="content.id" class="py-16 sm:py-24">
    <Container>
      <RevealBlock class="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <SectionHeading
            :eyebrow="content.eyebrow"
            :title="content.title"
          />
          <div class="mt-6 max-w-xl space-y-4 sm:mt-8">
            <p
              v-for="paragraph in content.paragraphs"
              :key="paragraph"
              class="text-[15px] leading-relaxed text-pretty text-muted sm:text-base"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
        <blockquote class="rounded-[2rem] bg-ink p-7 text-white sm:rounded-[2.25rem] sm:p-10">
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            {{ content.quoteLabel }}
          </p>
          <p class="mt-5 text-xl font-semibold leading-snug tracking-tight text-balance sm:text-2xl">
            {{ content.quote }}
          </p>
        </blockquote>
      </RevealBlock>
    </Container>
  </section>
</template>
