<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Briefcase01Icon,
  Camera01Icon,
  Dumbbell01Icon,
  GraduationCapIcon,
  Hospital01Icon,
  House01Icon,
  ScissorIcon,
  Sofa01Icon,
  UserMultipleIcon,
  Wrench01Icon,
} from '@hugeicons/core-free-icons'
import type { AboutWho, WhoItem } from '~/types/content'

defineProps<{
  content: AboutWho
}>()

const iconsByLabel: Record<string, typeof Hospital01Icon> = {
  'Clinics and healthcare': Hospital01Icon,
  'Salons and beauty': ScissorIcon,
  'Consultants and freelancers': Briefcase01Icon,
  'Tuition and coaching': GraduationCapIcon,
  'Real-estate agents': House01Icon,
  'Interior designers': Sofa01Icon,
  'Fitness trainers': Dumbbell01Icon,
  'Repair and home services': Wrench01Icon,
  'Photographers and wedding vendors': Camera01Icon,
  'Agencies and B2B services': UserMultipleIcon,
}

const iconsByIndex = [
  Hospital01Icon,
  ScissorIcon,
  Briefcase01Icon,
  GraduationCapIcon,
  House01Icon,
  Sofa01Icon,
  Dumbbell01Icon,
  Wrench01Icon,
  Camera01Icon,
  UserMultipleIcon,
]

function iconFor(item: WhoItem, index: number) {
  return iconsByLabel[item.label] ?? iconsByIndex[index] ?? Briefcase01Icon
}

const pillClass =
  'inline-flex max-w-full items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-ink/8 sm:px-5 sm:py-2.5'
</script>

<template>
  <section :id="content.id" class="pb-16 sm:pb-24">
    <Container>
      <RevealBlock>
        <SectionHeading
          align="center"
          :eyebrow="content.eyebrow"
          :title="content.title"
          :subtitle="content.subtitle"
        />
      </RevealBlock>
      <RevealBlock class="mx-auto mt-10 max-w-4xl sm:mt-12" :delay="90">
      <ul class="flex flex-wrap justify-center gap-2.5 sm:gap-3">
        <li v-for="(item, index) in content.items" :key="item.label">
          <NuxtLink
            v-if="item.href"
            :to="item.href"
            :class="[pillClass, 'transition-colors hover:ring-brand/40']"
          >
            <HugeiconsIcon
              :icon="iconFor(item, index)"
              :size="16"
              color="currentColor"
              :stroke-width="1.7"
              class="shrink-0"
            />
            <span>{{ item.label }}</span>
          </NuxtLink>
          <span
            v-else
            :class="pillClass"
          >
            <HugeiconsIcon
              :icon="iconFor(item, index)"
              :size="16"
              color="currentColor"
              :stroke-width="1.7"
              class="shrink-0"
            />
            <span>{{ item.label }}</span>
          </span>
        </li>
      </ul>
      </RevealBlock>
    </Container>
  </section>
</template>
