<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  iconSrc: string
  fullSrc?: string
  darkSrc?: string
  onDark?: boolean
  to?: string
  variant?: 'mark' | 'full'
  invert?: boolean
  blend?: 'screen' | 'none'
}>(), {
  to: '/',
  variant: 'mark',
  invert: false,
  blend: 'none',
  onDark: false,
})

const { resolve } = useBrandLogos()

const markSrc = computed(() => resolve(props.iconSrc))
const lightSrc = computed(() => resolve(props.fullSrc || props.iconSrc))
const darkSrc = computed(() => props.darkSrc ? resolve(props.darkSrc) : '')
const blendClass = computed(() => props.blend === 'screen' ? 'mix-blend-screen' : '')
</script>

<template>
  <a :href="to" class="inline-flex min-w-0 items-center">
    <span
      v-if="variant === 'full'"
      class="relative inline-flex h-8 items-center sm:h-9"
    >
      <img
        :src="lightSrc"
        :alt="onDark && darkSrc ? '' : name"
        :aria-hidden="onDark && darkSrc ? 'true' : undefined"
        width="120"
        height="36"
        decoding="async"
        :fetchpriority="onDark && darkSrc ? 'low' : 'high'"
        class="h-8 w-auto max-w-[7.5rem] object-contain object-left transition-opacity duration-200 sm:h-9 sm:max-w-none"
        :class="[blendClass, onDark && darkSrc ? 'opacity-0' : 'opacity-100']"
      >
      <img
        v-if="darkSrc"
        :src="darkSrc"
        :alt="onDark ? name : ''"
        :aria-hidden="onDark ? undefined : 'true'"
        width="120"
        height="36"
        decoding="async"
        :fetchpriority="onDark ? 'high' : 'low'"
        class="pointer-events-none absolute left-0 top-1/2 h-8 w-auto max-w-[7.5rem] -translate-y-1/2 object-contain object-left transition-opacity duration-200 sm:h-9 sm:max-w-none"
        :class="[blendClass, onDark ? 'opacity-100' : 'opacity-0']"
      >
    </span>
    <template v-else>
      <img
        :src="markSrc"
        :alt="`${name} mark`"
        width="36"
        height="36"
        decoding="async"
        class="h-9 w-9 object-cover object-left"
        :class="blendClass"
      >
      <span
        class="font-title ml-2.5 text-xl font-semibold tracking-tight"
        :class="invert ? 'text-white' : 'text-ink'"
      >
        {{ name }}
      </span>
    </template>
  </a>
</template>
