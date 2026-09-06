<script setup lang="ts">
const props = defineProps<{
  delay?: number
}>()

const root = useTemplateRef<HTMLElement>('root')
const revealed = useRevealOnScroll(root)
</script>

<template>
  <div
    ref="root"
    class="reveal-block"
    :class="{ 'is-revealed': revealed }"
    :style="revealed && props.delay ? { transitionDelay: `${props.delay}ms` } : undefined"
  >
    <slot />
  </div>
</template>
