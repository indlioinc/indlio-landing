<script setup lang="ts">
import type { ImpactContent } from '~/types/content'

defineProps<{
  content: ImpactContent
}>()
</script>

<template>
  <section :id="content.id" class="py-16 sm:py-24">
    <Container>
      <SectionHeading
        align="center"
        :eyebrow="content.eyebrow"
        :title="content.title"
        :subtitle="content.subtitle"
      />
      <div class="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3">
        <article
          v-for="item in content.items"
          :key="item.title"
          class="rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/6 sm:p-7"
        >
          <h3 class="text-[1.05rem] font-semibold leading-snug tracking-tight text-ink sm:text-lg">
            {{ item.title }}
          </h3>
          <p class="mt-3 text-[15px] leading-relaxed text-pretty text-muted">
            {{ item.body }}
          </p>
        </article>
      </div>
    </Container>
  </section>
</template>
