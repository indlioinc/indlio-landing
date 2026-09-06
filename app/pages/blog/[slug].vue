<script setup lang="ts">
const { blog } = useLandingContent()
const route = useRoute()

const post = computed(() =>
  blog.value.posts.find(item => item.slug === route.params.slug),
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
  })
}

useSeoMeta({
  title: computed(() => `${post.value!.title} — Indlio`),
  description: computed(() => post.value!.excerpt),
  ogTitle: computed(() => post.value!.title),
  ogDescription: computed(() => post.value!.excerpt),
})

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
</script>

<template>
  <div v-if="post" class="overflow-x-clip">
    <PageIntro :title="post.title" align="left">
      <template #leading>
        <NuxtLink
          to="/blog"
          class="mb-8 inline-block text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          ← {{ blog.backLabel }}
        </NuxtLink>
        <p class="mb-3 text-sm text-muted">
          {{ formatDate(post.date) }}
        </p>
      </template>
    </PageIntro>

    <article class="py-12 sm:py-16">
      <RevealBlock>
      <Container>
        <div class="mx-auto max-w-2xl space-y-5">
          <p
            v-for="(paragraph, index) in post.body"
            :key="index"
            class="text-[16px] leading-relaxed text-pretty text-ink sm:text-lg"
          >
            {{ paragraph }}
          </p>
        </div>
      </Container>
      </RevealBlock>
    </article>

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
