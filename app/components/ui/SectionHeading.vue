<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  tone?: 'default' | 'inverse'
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'">
    <SectionEyebrow v-if="eyebrow" :label="eyebrow" :tone="tone" />
    <h2
      class="text-[1.75rem] font-semibold leading-snug tracking-tight text-balance sm:text-4xl lg:text-5xl"
      :class="[eyebrow ? 'mt-3' : '', tone === 'inverse' ? 'text-white' : 'text-ink']"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mt-4 text-base leading-relaxed text-pretty sm:text-lg"
      :class="tone === 'inverse' ? 'text-white/70' : 'text-muted'"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
