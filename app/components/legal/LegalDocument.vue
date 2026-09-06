<script setup lang="ts">
import type { LegalPageContent } from '~/types/content'

defineProps<{
  content: LegalPageContent
}>()
</script>

<template>
  <div class="overflow-x-clip pb-20 sm:pb-28">
    <PageIntro
      align="left"
      :eyebrow="content.eyebrow"
      :title="content.title"
      :subtitle="content.intro"
    >
      <p class="mt-4 text-sm text-muted">
        {{ content.updated }}
      </p>
    </PageIntro>

    <section class="pt-8 sm:pt-10">
      <Container>
        <div class="mx-auto max-w-3xl space-y-10">
          <article
            v-for="section in content.sections"
            :key="section.title"
          >
            <h2 class="text-lg font-semibold tracking-tight text-ink sm:text-xl">
              {{ section.title }}
            </h2>
            <p
              v-for="paragraph in section.paragraphs"
              :key="paragraph"
              class="mt-3 text-[15px] leading-relaxed text-pretty text-muted"
            >
              {{ paragraph }}
            </p>
          </article>
        </div>
      </Container>
    </section>
  </div>
</template>
