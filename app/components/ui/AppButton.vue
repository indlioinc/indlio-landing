<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost' | 'inverse' | 'accent' | 'outline' | 'outline-inverse'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
})

const isHashLink = computed(() =>
  Boolean(props.href && (props.href.startsWith('#') || props.href.startsWith('/#'))),
)

const isRouted = computed(() =>
  Boolean(props.href && props.href.startsWith('/') && !isHashLink.value),
)

const NuxtLink = resolveComponent('NuxtLink')

const tag = computed(() => {
  if (!props.href) {
    return 'button'
  }
  return isRouted.value ? NuxtLink : 'a'
})
</script>

<template>
  <component
    :is="tag"
    :to="isRouted ? href : undefined"
    :href="href && !isRouted ? href : undefined"
    :type="href ? undefined : type"
    :disabled="href ? undefined : disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60',
      size === 'lg' && 'h-12 px-6 text-sm sm:text-base',
      size === 'md' && 'h-11 px-5 text-sm',
      size === 'sm' && 'h-10 px-4 text-sm',
      variant === 'primary' && 'bg-brand text-white hover:bg-brand/90',
      variant === 'ghost' && 'text-ink hover:bg-ink/5',
      variant === 'inverse' && 'bg-white text-ink hover:bg-white/90',
      variant === 'accent' && 'bg-accent text-hero hover:bg-accent/90',
      variant === 'outline' && 'border border-ink/20 bg-transparent text-ink hover:bg-ink/5',
      variant === 'outline-inverse' && 'border border-white/35 bg-transparent text-white hover:bg-white/10',
    ]"
  >
    <slot />
  </component>
</template>
