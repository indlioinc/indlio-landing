<script setup lang="ts">
const { careers } = useLandingContent()

useSeoMeta({
  title: computed(() => careers.value.seo.title),
  description: computed(() => careers.value.seo.description),
  ogTitle: computed(() => careers.value.seo.title),
  ogDescription: computed(() => careers.value.seo.description),
})
</script>

<template>
  <div class="overflow-x-clip">
    <PageIntro
      :eyebrow="careers.eyebrow"
      :title="careers.title"
      :subtitle="careers.subtitle"
    />

    <section id="careers" class="py-12 sm:py-16">
      <Container>
        <SectionHeading
          align="center"
          :eyebrow="careers.principles.eyebrow"
          :title="careers.principles.title"
          :subtitle="careers.principles.subtitle"
        />
        <div class="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3">
          <article
            v-for="item in careers.principles.items"
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

    <section class="pb-16 sm:pb-24">
      <Container>
        <SectionHeading
          align="center"
          :eyebrow="careers.roles.eyebrow"
          :title="careers.roles.title"
          :subtitle="careers.roles.subtitle"
        />
        <div v-if="careers.roles.items.length" class="mx-auto mt-10 max-w-3xl space-y-4 sm:mt-14">
          <article
            v-for="role in careers.roles.items"
            :key="role.title"
            class="rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/6 sm:p-7"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div class="min-w-0">
                <h3 class="text-[1.05rem] font-semibold leading-snug tracking-tight text-ink sm:text-lg">
                  {{ role.title }}
                </h3>
                <p class="mt-1 text-sm text-muted">
                  {{ role.location }} · {{ role.type }}
                </p>
                <p class="mt-3 text-[15px] leading-relaxed text-pretty text-muted">
                  {{ role.body }}
                </p>
              </div>
              <AppButton
                :href="role.cta.href"
                variant="accent"
                size="sm"
                class="shrink-0"
              >
                {{ role.cta.label }}
              </AppButton>
            </div>
          </article>
        </div>
        <p v-else class="mx-auto mt-10 max-w-xl text-center text-[15px] leading-relaxed text-muted">
          {{ careers.roles.empty }}
        </p>
      </Container>
    </section>

    <section
      v-if="careers.closing"
      class="relative z-[70] flex scroll-mt-24 items-center px-6 pb-0 pt-8 sm:px-12 sm:pt-16 lg:px-24"
    >
      <div class="mx-auto w-full max-w-4xl -mb-20 rounded-[2rem] bg-white px-5 py-8 text-center shadow-[0_22px_50px_-28px_rgba(15,18,34,0.35)] ring-1 ring-ink/6 sm:-mb-32 sm:max-w-5xl sm:rounded-[2.5rem] sm:px-8 sm:py-12 lg:-mb-40 lg:rounded-[3.5rem] lg:px-10 lg:py-12">
        <h2 class="text-[1.75rem] font-semibold leading-snug tracking-tight text-balance text-ink sm:text-4xl">
          {{ careers.closing.title }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {{ careers.closing.subtitle }}
        </p>
        <AppButton
          class="mt-8"
          :href="careers.closing.cta.href"
          variant="accent"
          size="lg"
        >
          {{ careers.closing.cta.label }}
        </AppButton>
      </div>
    </section>
  </div>
</template>
