<script setup lang="ts">
import type * as Content from '~/types/content'

const props = defineProps<{
  link: Content.NavLink
}>()

const emit = defineEmits<{
  go: [href: string]
}>()

const columns = computed(() => {
  if (props.link.columns?.length) {
    return props.link.columns
  }

  return [{
    heading: props.link.label,
    variant: 'text' as const,
    items: props.link.items ?? [],
  }]
})
</script>

<template>
  <div class="flex font-title">
    <div
      v-for="(column, index) in columns"
      :key="`${column.heading}-${index}`"
      class="min-w-[188px]"
      :class="[
        column.variant === 'plain' ? 'min-w-[168px]' : 'min-w-[200px]',
        index > 0 ? 'border-l border-[#ececec] pl-6 ml-6' : '',
      ]"
    >
      <p class="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8b90a0]">
        {{ column.heading }}
      </p>

      <div
        v-if="column.variant === 'featured'"
        class="flex flex-col gap-1"
      >
        <a
          v-for="item in column.items"
          :key="item.href"
          :href="item.href"
          class="group flex items-start gap-3 rounded-xl px-2 py-2 -mx-2 transition-colors duration-150 hover:bg-[#f6f7f9]"
          @click.prevent="emit('go', item.href)"
        >
          <NavItemIcon v-if="item.icon" :name="item.icon" />
          <span class="min-w-0">
            <span class="flex items-center gap-2">
              <span class="text-[15px] font-semibold tracking-tight text-[#0b162f] group-hover:text-ink">
                {{ item.label }}
              </span>
              <span
                v-if="item.badge"
                class="rounded-md bg-[#f1f2f4] px-1.5 py-0.5 text-[10px] font-medium text-[#5b6178]"
              >
                {{ item.badge }}
              </span>
            </span>
            <span v-if="item.description" class="mt-0.5 block text-[13px] leading-snug text-[#8b90a0]">
              {{ item.description }}
            </span>
          </span>
        </a>
      </div>

      <div
        v-else-if="column.variant === 'plain'"
        class="flex flex-col gap-3.5"
      >
        <a
          v-for="item in column.items"
          :key="item.href"
          :href="item.href"
          class="text-[15px] font-medium text-[#4b5163] transition-colors duration-150 hover:text-[#0b162f]"
          @click.prevent="emit('go', item.href)"
        >
          {{ item.label }}
        </a>
      </div>

      <div
        v-else
        class="flex flex-col gap-5"
      >
        <a
          v-for="item in column.items"
          :key="item.href"
          :href="item.href"
          class="group block"
          @click.prevent="emit('go', item.href)"
        >
          <span class="block text-[15px] font-semibold tracking-tight text-[#0b162f] transition-colors duration-150 group-hover:text-brand">
            {{ item.label }}
          </span>
          <span v-if="item.description" class="mt-0.5 block text-[13px] leading-snug text-[#8b90a0]">
            {{ item.description }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
