<script setup lang="ts">
import type { IntegrationLogo } from '~/types/content'

defineProps<{
  logo: IntegrationLogo
  left?: number
  right?: number
}>()

const connectorPath = 'M6.9722 27.4315C3.53722 27.4319 0.944676 31.4613 0.412166 36.7245C-0.117137 41.9559 0.0285468 40.3814 0.0303304 40.3622V20.7186H6.9722ZM6.9722 20.7167H0.0234945L0.0205648 0.246933C0.0205648 0.246933 -0.133062 -1.4469 0.399471 4.03795C0.932075 9.52264 3.5312 13.7215 6.97076 13.7215V20.7167Z'
</script>

<template>
  <div
    class="flex shrink-0 items-center"
    :style="{
      '--_left': left ?? 1,
      '--_right': right ?? 1,
    }"
  >
    <div class="integration-connector integration-connector-left">
      <svg
        class="integration-connector-svg integration-connector-svg-left"
        viewBox="0 0 6.9722 40.5991"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path :d="connectorPath" />
      </svg>
    </div>
    <div class="radius-slash relative z-10 flex size-20 items-center justify-center overflow-hidden bg-white transition-transform duration-200 hover:scale-105 motion-reduce:hover:scale-100 sm:size-24 lg:size-28">
      <img
        :src="logo.src"
        :alt="logo.name"
        class="size-10 rounded-xl object-contain sm:size-12 lg:size-14"
        width="56"
        height="56"
      >
    </div>
    <div class="integration-connector integration-connector-right">
      <svg
        class="integration-connector-svg"
        viewBox="0 0 6.9722 40.5991"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path :d="connectorPath" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.integration-connector {
  height: 28px;
  position: relative;
}

.integration-connector-left {
  flex: 0 1 calc(var(--_left, 1) * 8px);
  width: calc(var(--_left, 1) * 8px);
  overflow: hidden;
}

.integration-connector-right {
  flex: 0 1 calc(var(--_right, 1) * 8px);
  width: calc(var(--_right, 1) * 8px);
  overflow: hidden;
}

.integration-connector-svg {
  fill: #fff;
  width: calc(100% + 2px);
  height: 100%;
  position: absolute;
  left: -1px;
}

.integration-connector-svg-left {
  transform: scaleX(-1);
}

@media (width >= 640px) {
  .integration-connector {
    height: 34px;
  }

  .integration-connector-left {
    flex: 0 1 calc(var(--_left, 1) * 10px);
    width: calc(var(--_left, 1) * 10px);
  }

  .integration-connector-right {
    flex: 0 1 calc(var(--_right, 1) * 10px);
    width: calc(var(--_right, 1) * 10px);
  }
}

@media (width >= 768px) {
  .integration-connector {
    height: 42px;
  }

  .integration-connector-left {
    flex: 0 1 calc(var(--_left, 1) * 12px);
    width: calc(var(--_left, 1) * 12px);
  }

  .integration-connector-right {
    flex: 0 1 calc(var(--_right, 1) * 12px);
    width: calc(var(--_right, 1) * 12px);
  }
}
</style>
