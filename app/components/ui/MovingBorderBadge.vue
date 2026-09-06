<script setup lang="ts">
const props = withDefaults(defineProps<{
  duration?: number
}>(), {
  duration: 8000,
})

const pathRef = ref<SVGRectElement | null>(null)
const glowStyle = ref<Record<string, string>>({
  transform: 'translate(-9999px, -9999px)',
})
const reduceMotion = ref(false)

let frame = 0

function tick(time: number) {
  const path = pathRef.value
  const length = path?.getTotalLength?.() ?? 0
  if (length > 0) {
    const progress = (time * (length / props.duration)) % length
    const point = path!.getPointAtLength(progress)
    glowStyle.value = {
      transform: `translateX(${point.x}px) translateY(${point.y}px) translateX(-50%) translateY(-50%)`,
    }
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion.value) {
    frame = requestAnimationFrame(tick)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
})
</script>

<template>
  <span class="relative inline-flex overflow-hidden rounded-full p-px">
    <span
      v-if="!reduceMotion"
      class="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        class="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          ref="pathRef"
          fill="none"
          width="100%"
          height="100%"
          rx="50%"
          ry="50%"
        />
      </svg>
      <span
        class="absolute top-0 left-0 h-12 w-12 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_28%,transparent_62%)]"
        :style="glowStyle"
      />
    </span>
    <span
      class="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-[13px] font-medium text-white antialiased backdrop-blur-md sm:px-4 sm:text-sm"
    >
      <slot />
    </span>
  </span>
</template>
