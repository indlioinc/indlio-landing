<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <section class="pt-24 sm:pt-28">
    <Container>
      <div
        :class="align === 'left' ? 'mx-auto w-full max-w-3xl' : 'mx-auto w-full max-w-3xl text-center'"
      >
        <slot name="leading" />
        <SectionEyebrow v-if="eyebrow" :label="eyebrow" />
        <h1
          class="text-[1.75rem] font-semibold leading-snug tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
          :class="eyebrow ? 'mt-3' : ''"
        >
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="mt-4 text-[15px] leading-relaxed text-pretty text-muted sm:text-lg"
          :class="align === 'left' ? 'max-w-xl' : 'mx-auto max-w-xl'"
        >
          {{ subtitle }}
        </p>
        <span
          class="mt-5 block h-0.5 w-12 rounded-full bg-brand"
          :class="align === 'left' ? '' : 'mx-auto'"
          aria-hidden="true"
        />
        <slot />
      </div>
    </Container>
  </section>
</template>
