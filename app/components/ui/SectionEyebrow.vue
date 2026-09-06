<script setup lang="ts">
defineProps<{
  label: string
  tone?: 'default' | 'inverse'
}>()
</script>

<template>
  <p
    class="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
    :class="tone === 'inverse' ? 'text-white/70' : 'text-brand'"
  >
    {{ label }}
  </p>
</template>
