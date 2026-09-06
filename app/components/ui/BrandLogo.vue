<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  iconSrc: string
  fullSrc?: string
  to?: string
  variant?: 'mark' | 'full'
  invert?: boolean
  blend?: 'screen' | 'none'
}>(), {
  to: '/',
  variant: 'mark',
  invert: false,
  blend: 'none',
})

const { resolve } = useBrandLogos()

const markSrc = computed(() => resolve(props.iconSrc))
const lockupSrc = computed(() => resolve(props.fullSrc || props.iconSrc))
</script>

<template>
  <a :href="to" class="inline-flex min-w-0 items-center">
    <img
      v-if="variant === 'full'"
      :src="lockupSrc"
      :alt="name"
      height="36"
      class="h-8 w-auto max-w-[7.5rem] object-contain object-left sm:h-9 sm:max-w-none"
      :class="blend === 'screen' && 'mix-blend-screen'"
    >
    <template v-else>
      <img
        :src="markSrc"
        :alt="`${name} mark`"
        width="36"
        height="36"
        class="h-9 w-9 object-cover object-left"
        :class="blend === 'screen' && 'mix-blend-screen'"
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
