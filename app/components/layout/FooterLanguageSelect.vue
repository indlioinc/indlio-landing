<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Globe02Icon,
  Tick02Icon,
} from '@hugeicons/core-free-icons'
import type { FooterLanguage } from '~/types/content'

const props = defineProps<{
  languages: FooterLanguage[]
}>()

const { locale, setLocale } = useLocale()
const { ui } = useLandingContent()

const open = ref(false)
const selectedCode = computed(() => locale.value)
const activeIndex = ref(0)
const rootRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const uid = useId()
const listboxId = `${uid}-languages`

const selected = computed(() => (
  props.languages.find(language => language.code === selectedCode.value)
  ?? props.languages[0]
))

function applyLocale(code: string) {
  setLocale(code)
}

function close() {
  open.value = false
}

function openMenu() {
  open.value = true
  activeIndex.value = Math.max(
    0,
    props.languages.findIndex(language => language.code === selectedCode.value),
  )
  nextTick(() => listRef.value?.focus())
}

function toggle() {
  if (open.value) {
    close()
    return
  }
  openMenu()
}

function select(code: string) {
  applyLocale(code)
  close()
}

function moveActive(delta: number) {
  const count = props.languages.length
  if (!count) {
    return
  }
  activeIndex.value = (activeIndex.value + delta + count) % count
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!open.value || !rootRef.value) {
    return
  }
  if (!rootRef.value.contains(event.target as Node)) {
    close()
  }
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    close()
  }
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (!open.value) {
      openMenu()
    }
  }
}

function onListKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveActive(1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveActive(-1)
  } else if (event.key === 'Home') {
    event.preventDefault()
    activeIndex.value = 0
  } else if (event.key === 'End') {
    event.preventDefault()
    activeIndex.value = props.languages.length - 1
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    const language = props.languages[activeIndex.value]
    if (language) {
      select(language.code)
    }
  } else if (event.key === 'Tab') {
    close()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    close()
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onDocumentKeydown)
})
</script>

<template>
  <div
    v-if="languages.length && selected"
    ref="rootRef"
    class="relative"
  >
    <button
      v-if="languages.length > 1"
      type="button"
      class="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-current transition-colors hover:opacity-80"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-label="`${ui.language}: ${selected.label}`"
      @click="toggle"
      @keydown="onTriggerKeydown"
    >
      <HugeiconsIcon
        :icon="Globe02Icon"
        :size="18"
        color="currentColor"
        :stroke-width="1.5"
      />
      <span>{{ selected.label }}</span>
      <HugeiconsIcon
        :icon="open ? ChevronUpIcon : ChevronDownIcon"
        :size="14"
        color="currentColor"
        :stroke-width="1.5"
      />
    </button>
    <p
      v-else
      class="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-current"
      :aria-label="`${ui.language}: ${selected.label}`"
    >
      <HugeiconsIcon
        :icon="Globe02Icon"
        :size="18"
        color="currentColor"
        :stroke-width="1.5"
      />
      <span>{{ selected.label }}</span>
    </p>

    <ul
      v-show="open && languages.length > 1"
      :id="listboxId"
      ref="listRef"
      role="listbox"
      tabindex="-1"
      :aria-activedescendant="`${listboxId}-${languages[activeIndex]?.code}`"
      :aria-label="selected.label"
      class="absolute bottom-full left-0 z-20 mb-2 min-w-[11.5rem] overflow-hidden rounded-sm bg-white py-1 shadow-[0_8px_24px_rgba(15,18,34,0.18)] outline-none"
      @keydown="onListKeydown"
    >
      <li
        v-for="(language, index) in languages"
        :id="`${listboxId}-${language.code}`"
        :key="language.code"
        role="option"
        :aria-selected="language.code === selectedCode"
        class="flex cursor-pointer items-center justify-between gap-6 px-3.5 py-2 text-sm"
        :class="language.code === selectedCode
          ? 'bg-surface font-semibold text-ink'
          : index === activeIndex
            ? 'bg-surface/70 text-muted'
            : 'text-muted'"
        @pointerenter="activeIndex = index"
        @click="select(language.code)"
      >
        <span>{{ language.label }}</span>
        <HugeiconsIcon
          v-if="language.code === selectedCode"
          :icon="Tick02Icon"
          :size="16"
          color="currentColor"
          :stroke-width="2"
        />
      </li>
    </ul>
  </div>
</template>
