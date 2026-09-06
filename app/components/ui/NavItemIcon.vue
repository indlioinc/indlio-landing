<script setup lang="ts">
import type { NavIconName } from '~/types/content'

const props = defineProps<{
  name: NavIconName
}>()

const tones: Record<NavIconName, string> = {
  calendar: 'bg-[#d6e8ff] text-[#1a4a8a]',
  spark: 'bg-[#e4f2b0] text-[#3d5a14]',
  code: 'bg-[#e4d9ff] text-[#4a3480]',
  user: 'bg-[#ffe0c2] text-[#8a4b1a]',
  users: 'bg-[#d6e8ff] text-[#1a4a8a]',
  building: 'bg-[#d4f4f0] text-[#0f5c54]',
  briefcase: 'bg-[#d6e8ff] text-[#1a4a8a]',
  book: 'bg-[#e4d9ff] text-[#4a3480]',
  heart: 'bg-[#ffd6e0] text-[#8a2a44]',
  palette: 'bg-[#ffe0c2] text-[#8a4b1a]',
}

const paths: Record<NavIconName, string> = {
  calendar: 'M7 4v3M17 4v3M5 9h14M6 6h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z',
  spark: 'M12 4l1.4 5.2L18 12l-4.6 2.8L12 20l-1.4-5.2L6 12l4.6-2.8L12 4z',
  code: 'M9 8l-4 4 4 4M15 8l4 4-4 4',
  user: 'M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM6.5 19a5.5 5.5 0 0 1 11 0',
  users: 'M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM15.5 12a2.5 2.5 0 1 0 0-5M5.5 19a4.5 4.5 0 0 1 8 0M16 19a4 4 0 0 0-2-3.5',
  building: 'M5 20V6.5A1.5 1.5 0 0 1 6.5 5h7A1.5 1.5 0 0 1 15 6.5V20M15 10h3.5A1.5 1.5 0 0 1 20 11.5V20M5 20h15M8 8h2M8 12h2M8 16h2M11.5 8H13M11.5 12H13',
  briefcase: 'M8 8V6.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5V8M5 8h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM4 12h16',
  book: 'M6 5.5A1.5 1.5 0 0 1 7.5 4H18v15H7.5A1.5 1.5 0 0 0 6 20.5V5.5zM6 20.5h12',
  heart: 'M12 19s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 2.8C19 14.6 12 19 12 19z',
  palette: 'M12 4a8 8 0 1 0 0 16h1.2a2.2 2.2 0 0 0 2-3.1 2 2 0 0 1 .3-2.2 2.2 2.2 0 0 0-1.6-3.6H12',
}
</script>

<template>
  <span
    class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
    :class="tones[props.name]"
    aria-hidden="true"
  >
    <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path :d="paths[props.name]" />
    </svg>
  </span>
</template>
