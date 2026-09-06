<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import { Linkedin02Icon } from '@hugeicons/core-free-icons'

const { about } = useLandingContent()

useSeoMeta({
  title: computed(() => about.value.seo.title),
  description: computed(() => about.value.seo.description),
  ogTitle: computed(() => about.value.seo.title),
  ogDescription: computed(() => about.value.seo.description),
})

const openBios = ref<Record<string, boolean>>({})

function isBioOpen(name: string) {
  return Boolean(openBios.value[name])
}

function toggleBio(name: string) {
  openBios.value = {
    ...openBios.value,
    [name]: !openBios.value[name],
  }
}
</script>

<template>
  <div class="overflow-x-clip">
    <section class="pt-28 sm:pt-32">
      <Container>
        <div class="mx-auto max-w-4xl border-l-2 border-brand pl-6 sm:pl-10">
          <SectionEyebrow :label="about.eyebrow" />
          <h1 class="mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]">
            {{ about.title }}
          </h1>
          <p class="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-xl">
            {{ about.subtitle }}
          </p>
        </div>
      </Container>
    </section>

    <section class="py-16 sm:py-24">
      <Container>
        <div class="overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-center text-white sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:px-16">
          <SectionEyebrow :label="about.opportunity.eyebrow" tone="inverse" />
          <h2 class="mx-auto mt-4 max-w-3xl text-[1.75rem] font-semibold leading-snug tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {{ about.opportunity.title }}
          </h2>
          <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/65 sm:text-lg">
            {{ about.opportunity.body }}
          </p>
        </div>
      </Container>
    </section>

    <section v-if="about.founders" class="pb-16 sm:pb-24">
      <Container>
        <SectionHeading
          :eyebrow="about.founders.eyebrow"
          :title="about.founders.title"
          :subtitle="about.founders.subtitle"
        />
        <article
          v-for="person in about.founders.people"
          :key="person.name"
          class="mt-8 overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/6 sm:mt-12 sm:rounded-[2rem] lg:grid lg:grid-cols-[minmax(17rem,20rem)_minmax(0,1fr)]"
        >
          <div class="relative aspect-[4/5] overflow-hidden bg-[#e8e8e8] lg:aspect-auto lg:min-h-full">
            <img
              :src="person.src"
              :alt="person.alt"
              width="640"
              height="800"
              decoding="async"
              class="absolute inset-0 size-full object-cover object-[center_top]"
            >
          </div>
          <div class="flex flex-col justify-center bg-white px-6 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-12">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <h3 class="text-[1.5rem] font-semibold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                  {{ person.name }}
                </h3>
                <p class="mt-1 text-sm font-medium text-ink/70 sm:text-[15px]">
                  {{ person.role }}
                </p>
              </div>
              <a
                v-if="person.linkedin"
                :href="person.linkedin"
                target="_blank"
                rel="noreferrer"
                class="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-ink/6 text-ink transition-colors hover:bg-ink/10"
                :aria-label="`${person.name} on LinkedIn`"
              >
                <HugeiconsIcon :icon="Linkedin02Icon" :size="16" color="currentColor" :stroke-width="1.8" />
              </a>
            </div>
            <div class="relative mt-5">
              <p
                class="text-[15px] leading-relaxed text-pretty text-muted sm:text-base"
                :class="isBioOpen(person.name) ? '' : 'line-clamp-4 lg:line-clamp-5'"
              >
                {{ person.body }}
              </p>
              <div
                v-if="!isBioOpen(person.name)"
                class="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent"
                aria-hidden="true"
              />
            </div>
            <button
              type="button"
              class="mt-5 self-start text-sm font-semibold text-ink transition-colors hover:text-ink/70"
              :aria-expanded="isBioOpen(person.name)"
              @click="toggleBio(person.name)"
            >
              {{ isBioOpen(person.name) ? 'Show less −' : `More about ${person.name} +` }}
            </button>
          </div>
        </article>
      </Container>
    </section>

    <section
      v-if="about.closing"
      class="relative z-[70] flex scroll-mt-24 items-center px-6 pb-0 pt-8 sm:px-12 sm:pt-16 lg:px-24"
    >
      <div class="mx-auto w-full max-w-4xl -mb-20 rounded-[2rem] bg-white px-5 py-8 text-center shadow-[0_22px_50px_-28px_rgba(15,18,34,0.35)] ring-1 ring-ink/6 sm:-mb-32 sm:max-w-5xl sm:rounded-[2.5rem] sm:px-8 sm:py-12 lg:-mb-40 lg:rounded-[3.5rem] lg:px-10 lg:py-12">
        <h2 class="text-[1.75rem] font-semibold leading-snug tracking-tight text-balance text-ink sm:text-4xl">
          {{ about.closing.title }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {{ about.closing.subtitle }}
        </p>
        <AppButton
          class="mt-8"
          :href="about.closing.cta.href"
          variant="accent"
          size="lg"
        >
          {{ about.closing.cta.label }}
        </AppButton>
      </div>
    </section>
  </div>
</template>
