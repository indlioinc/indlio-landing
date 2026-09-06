<script setup lang="ts">
const { blog } = useLandingContent()

useSeoMeta({
  title: computed(() => blog.value.seo.title),
  description: computed(() => blog.value.seo.description),
  ogTitle: computed(() => blog.value.seo.title),
  ogDescription: computed(() => blog.value.seo.description),
})

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
</script>

<template>
  <div class="overflow-x-clip">
    <PageIntro
      :eyebrow="blog.eyebrow"
      :title="blog.title"
      :subtitle="blog.subtitle"
    />

    <section id="blog" class="py-12 sm:py-16">
      <Container>
        <div v-if="blog.posts.length" class="mx-auto max-w-3xl space-y-4">
          <NuxtLink
            v-for="post in blog.posts"
            :key="post.slug"
            :to="`/blog/${post.slug}`"
            class="block rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/6 transition-colors hover:ring-ink/12 sm:p-7"
          >
            <p class="text-sm text-muted">
              {{ formatDate(post.date) }}
            </p>
            <h2 class="mt-2 text-[1.15rem] font-semibold leading-snug tracking-tight text-ink sm:text-xl">
              {{ post.title }}
            </h2>
            <p class="mt-3 text-[15px] leading-relaxed text-pretty text-muted">
              {{ post.excerpt }}
            </p>
          </NuxtLink>
        </div>
        <p v-else class="mx-auto max-w-xl text-center text-[15px] leading-relaxed text-muted">
          {{ blog.empty }}
        </p>
      </Container>
    </section>

    <section
      v-if="blog.closing"
      class="relative z-[70] flex scroll-mt-24 items-center px-6 pb-0 pt-8 sm:px-12 sm:pt-16 lg:px-24"
    >
      <div class="mx-auto w-full max-w-4xl -mb-20 rounded-[2rem] bg-white px-5 py-8 text-center shadow-[0_22px_50px_-28px_rgba(15,18,34,0.35)] ring-1 ring-ink/6 sm:-mb-32 sm:max-w-5xl sm:rounded-[2.5rem] sm:px-8 sm:py-12 lg:-mb-40 lg:rounded-[3.5rem] lg:px-10 lg:py-12">
        <h2 class="text-[1.75rem] font-semibold leading-snug tracking-tight text-balance text-ink sm:text-4xl">
          {{ blog.closing.title }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {{ blog.closing.subtitle }}
        </p>
        <AppButton
          class="mt-8"
          :href="blog.closing.cta.href"
          variant="accent"
          size="lg"
        >
          {{ blog.closing.cta.label }}
        </AppButton>
      </div>
    </section>
  </div>
</template>
