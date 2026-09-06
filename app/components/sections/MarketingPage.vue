<script setup lang="ts">
import type { SitePageContent } from '~/types/content'

defineProps<{
  content: SitePageContent
}>()
</script>

<template>
  <div class="overflow-x-clip">
    <PageIntro
      :eyebrow="content.eyebrow"
      :title="content.title"
      :subtitle="content.subtitle"
    />

    <section v-if="content.quote" class="pt-4 sm:pt-6">
      <RevealBlock>
      <Container>
        <blockquote class="mx-auto max-w-3xl rounded-[2rem] bg-ink px-6 py-8 text-center text-white sm:rounded-[2.25rem] sm:px-10 sm:py-10">
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            {{ content.quote.label }}
          </p>
          <p class="mt-4 text-xl font-semibold leading-snug tracking-tight text-balance sm:text-2xl">
            {{ content.quote.body }}
          </p>
        </blockquote>
      </Container>
      </RevealBlock>
    </section>

    <section class="py-12 sm:py-16">
      <RevealBlock>
      <Container>
        <SectionHeading
          align="center"
          :eyebrow="content.highlights.eyebrow"
          :title="content.highlights.title"
          :subtitle="content.highlights.subtitle"
        />
        <div class="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3">
          <article
            v-for="item in content.highlights.items"
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
      </RevealBlock>
    </section>

    <WhoSection v-if="content.who" :content="content.who" />

    <section
      v-if="content.closing"
      class="relative z-[70] flex scroll-mt-24 items-center px-6 pb-0 pt-8 sm:px-12 sm:pt-16 lg:px-24"
    >
      <div class="mx-auto w-full max-w-4xl -mb-20 rounded-[2rem] bg-white px-5 py-8 text-center shadow-[0_22px_50px_-28px_rgba(15,18,34,0.35)] ring-1 ring-ink/6 sm:-mb-32 sm:max-w-5xl sm:rounded-[2.5rem] sm:px-8 sm:py-12 lg:-mb-40 lg:rounded-[3.5rem] lg:px-10 lg:py-12">
        <h2 class="text-[1.75rem] font-semibold leading-snug tracking-tight text-balance text-ink sm:text-4xl">
          {{ content.closing.title }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {{ content.closing.subtitle }}
        </p>
        <AppButton
          class="mt-8"
          :href="content.closing.cta.href"
          variant="accent"
          size="lg"
        >
          {{ content.closing.cta.label }}
        </AppButton>
      </div>
    </section>
  </div>
</template>
