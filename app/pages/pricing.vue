<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowDown01Icon, MinusSignIcon, Tick02Icon } from '@hugeicons/core-free-icons'
import type { PricingComparisonValue, PricingPlan } from '~/types/content'

const { pricing, ui } = useLandingContent()

useSeoMeta({
  title: computed(() => pricing.value.seo.title),
  description: computed(() => pricing.value.seo.description),
  ogTitle: computed(() => pricing.value.seo.title),
  ogDescription: computed(() => pricing.value.seo.description),
})

const cycle = ref<'monthly' | 'yearly'>('yearly')

const visiblePlans = computed(() => {
  return pricing.value.plans.filter(plan => cycle.value === 'yearly' || !plan.yearlyOnly)
})

function planPrice(plan: PricingPlan) {
  return cycle.value === 'yearly' && plan.yearlyPrice ? plan.yearlyPrice : plan.price
}

function planPeriod(plan: PricingPlan) {
  return cycle.value === 'yearly' && plan.yearlyPeriod ? plan.yearlyPeriod : plan.period
}

function showYearlyDiscount(plan: PricingPlan) {
  return cycle.value === 'yearly'
    && !!plan.yearlyPrice
    && plan.yearlyPrice !== plan.price
}

function planListPrice(plan: PricingPlan) {
  if (!showYearlyDiscount(plan)) {
    return null
  }

  return plan.listPrice ?? plan.price
}

function planDiscountLabel(plan: PricingPlan) {
  if (!showYearlyDiscount(plan)) {
    return null
  }

  return plan.discountLabel ?? null
}

function planCtaVariant(plan: PricingPlan) {
  return plan.ctaVariant ?? (plan.featured ? 'accent' : 'primary')
}

function cellIncluded(value: PricingComparisonValue) {
  return value === true
}

function cellExcluded(value: PricingComparisonValue) {
  return value === false
}

function mobileCellLabel(value: PricingComparisonValue, planName?: string) {
  const name = planName ?? 'Plan'
  if (cellIncluded(value)) {
    return `${name}: Included`
  }
  if (cellExcluded(value)) {
    return `${name}: Not included`
  }
  return `${name}: ${value}`
}
</script>

<template>
  <div class="overflow-x-clip">
    <PageIntro
      :eyebrow="pricing.eyebrow"
      :title="pricing.title"
      :subtitle="pricing.subtitle"
    >
      <div v-if="pricing.billing" class="mt-8 flex flex-col items-center gap-3">
        <div
          class="inline-flex max-w-full items-center rounded-full border border-ink/10 bg-white p-1"
          role="group"
          :aria-label="ui.billingPeriod"
        >
          <button
            type="button"
            class="rounded-full px-2.5 py-2 text-sm font-medium transition-colors sm:px-4"
            :class="cycle === 'monthly' ? 'bg-ink text-white shadow-sm' : 'text-muted hover:text-ink'"
            :aria-pressed="cycle === 'monthly'"
            @click="cycle = 'monthly'"
          >
            {{ pricing.billing.monthlyLabel }}
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-medium transition-colors sm:gap-2 sm:px-4"
            :class="cycle === 'yearly' ? 'bg-ink text-white shadow-sm' : 'text-muted hover:text-ink'"
            :aria-pressed="cycle === 'yearly'"
            @click="cycle = 'yearly'"
          >
            {{ pricing.billing.yearlyLabel }}
            <span
              v-if="pricing.billing.yearlyHint"
              class="hidden rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-hero sm:inline-flex"
            >
              {{ pricing.billing.yearlyHint }}
            </span>
          </button>
        </div>
        <p
          v-if="pricing.billing.yearlyHint"
          class="text-xs font-medium text-muted sm:hidden"
        >
          {{ pricing.billing.yearlyHint }}
        </p>
        <p v-if="pricing.billing.note" class="max-w-md text-sm text-pretty text-muted">
          {{ pricing.billing.note }}
        </p>
      </div>
    </PageIntro>

    <section class="py-12 sm:py-16">
      <Container>
        <div v-if="pricing.included" class="mx-auto max-w-3xl text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {{ pricing.included.title }}
          </p>
          <ul class="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <li
              v-for="item in pricing.included.items"
              :key="item"
              class="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink shadow-[0_4px_20px_rgba(15,18,34,0.05)]"
            >
              <HugeiconsIcon
                :icon="Tick02Icon"
                :size="16"
                color="currentColor"
                :stroke-width="1.8"
                class="text-brand"
              />
              {{ item }}
            </li>
          </ul>
        </div>

        <div
          class="mt-10 grid items-stretch gap-5 sm:mt-14 lg:gap-6"
          :class="visiblePlans.length === 2 ? 'lg:grid-cols-2 lg:max-w-4xl lg:mx-auto' : 'lg:grid-cols-3'"
        >
          <article
            v-for="plan in visiblePlans"
            :key="plan.name"
            class="plan-card relative mx-auto flex w-full max-w-md flex-col p-7 sm:p-8 lg:max-w-none"
            :class="plan.featured ? 'plan-card-featured lg:-my-3 lg:py-10' : ''"
          >
            <p
              v-if="plan.badge"
              class="mb-4 inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
              :class="plan.featured ? 'bg-accent text-hero' : 'bg-brand/10 text-brand'"
            >
              {{ plan.badge }}
            </p>
            <p
              class="text-xs font-semibold uppercase tracking-[0.14em]"
              :class="plan.featured ? 'text-white/55' : 'text-muted'"
            >
              {{ plan.name }}
            </p>
            <div class="mt-4">
              <p class="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span
                  class="text-4xl font-semibold tracking-tight sm:text-[2.75rem]"
                  :class="plan.featured ? 'text-white' : 'text-ink'"
                >
                  {{ planPrice(plan) }}
                </span>
                <span
                  v-if="planListPrice(plan)"
                  class="text-lg font-medium line-through"
                  :class="plan.featured ? 'text-white/40' : 'text-ink/35'"
                >
                  {{ planListPrice(plan) }}
                </span>
                <span
                  v-if="planDiscountLabel(plan)"
                  class="inline-flex translate-y-px items-center rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  :class="plan.featured ? 'bg-accent text-hero' : 'bg-brand/10 text-brand'"
                >
                  {{ planDiscountLabel(plan) }}
                </span>
              </p>
              <p
                v-if="planPeriod(plan)"
                class="mt-1 text-sm"
                :class="plan.featured ? 'text-white/55' : 'text-muted'"
              >
                {{ planPeriod(plan) }}
              </p>
            </div>
            <p
              class="mt-3 text-[15px] leading-relaxed"
              :class="plan.featured ? 'text-white/68' : 'text-muted'"
            >
              {{ plan.body }}
            </p>
            <AppButton
              class="mt-6 w-full"
              :href="plan.cta.href"
              :variant="planCtaVariant(plan)"
            >
              {{ plan.cta.label }}
            </AppButton>
            <div
              class="mt-7 border-t pt-6"
              :class="plan.featured ? 'border-white/12' : 'border-ink/8'"
            >
              <p
                v-if="plan.includesLabel"
                class="text-xs font-semibold uppercase tracking-[0.12em]"
                :class="plan.featured ? 'text-white/45' : 'text-muted'"
              >
                {{ plan.includesLabel }}
              </p>
              <ul class="mt-3 space-y-2.5">
                <li
                  v-for="item in plan.features"
                  :key="item"
                  class="flex gap-2.5 text-sm leading-relaxed"
                  :class="plan.featured ? 'text-white/80' : 'text-ink/80'"
                >
                  <HugeiconsIcon
                    :icon="Tick02Icon"
                    :size="18"
                    color="currentColor"
                    :stroke-width="1.8"
                    class="mt-0.5 shrink-0"
                    :class="plan.featured ? 'text-brand-cyan' : 'text-brand'"
                  />
                  {{ item }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </Container>
    </section>

    <section v-if="pricing.comparison" class="py-16 sm:py-24">
      <Container>
        <SectionHeading
          :title="pricing.comparison.title"
          :subtitle="pricing.comparison.subtitle"
          :eyebrow="ui.featuresEyebrow"
          align="center"
        />

        <div class="mt-10 lg:hidden">
          <div
            class="sticky top-14 z-20 mb-3 rounded-2xl bg-white/95 px-4 py-2.5 shadow-[0_4px_20px_rgba(15,18,34,0.06)] ring-1 ring-ink/6 backdrop-blur-sm sm:top-16 sm:px-6"
          >
            <div class="grid grid-cols-3 gap-2 text-center">
              <span
                v-for="plan in pricing.plans"
                :key="`mobile-head-${plan.name}`"
                class="truncate text-[11px] font-semibold text-ink sm:text-xs"
              >
                {{ plan.name }}
              </span>
            </div>
          </div>

          <div class="space-y-4">
            <div
              v-for="group in pricing.comparison.groups"
              :key="`mobile-${group.title}`"
              class="rounded-[1.5rem] bg-white px-4 py-5 shadow-[0_4px_20px_rgba(15,18,34,0.05)] sm:p-6"
            >
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                {{ group.title }}
              </p>
              <div class="mt-3 divide-y divide-ink/8">
                <div
                  v-for="row in group.rows"
                  :key="row.label"
                  class="py-3.5 first:pt-0 last:pb-0"
                >
                  <p class="text-sm font-medium text-ink">{{ row.label }}</p>
                  <p v-if="row.hint" class="mt-0.5 text-xs leading-snug text-muted">
                    {{ row.hint }}
                  </p>
                  <div class="mt-2.5 grid grid-cols-3 gap-2">
                    <div
                      v-for="(value, index) in row.values"
                      :key="`${row.label}-m-${index}`"
                      class="flex min-h-8 min-w-0 items-center justify-center text-center"
                      :aria-label="mobileCellLabel(value, pricing.plans[index]?.name)"
                    >
                      <HugeiconsIcon
                        v-if="cellIncluded(value)"
                        :icon="Tick02Icon"
                        :size="18"
                        color="currentColor"
                        :stroke-width="1.8"
                        class="text-brand"
                      />
                      <HugeiconsIcon
                        v-else-if="cellExcluded(value)"
                        :icon="MinusSignIcon"
                        :size="16"
                        color="currentColor"
                        :stroke-width="1.8"
                        class="text-ink/25"
                      />
                      <span
                        v-else
                        class="max-w-full text-[11px] leading-tight text-pretty text-ink/80 sm:text-xs"
                      >
                        {{ value }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 hidden overflow-x-auto rounded-[1.75rem] bg-white p-6 shadow-[0_4px_20px_rgba(15,18,34,0.05)] lg:block lg:p-8">
          <table class="w-full min-w-[40rem] border-collapse text-left">
            <thead>
              <tr class="border-b border-ink/10">
                <th class="w-[40%] py-4 pr-4 text-sm font-medium text-muted" scope="col">
                  <span class="sr-only">Feature</span>
                </th>
                <th
                  v-for="plan in pricing.plans"
                  :key="plan.name"
                  class="px-3 py-4 text-center"
                  scope="col"
                >
                  <span class="block text-sm font-semibold text-ink">{{ plan.name }}</span>
                  <NuxtLink
                    :to="plan.cta.href"
                    class="mt-1 inline-block text-xs font-medium text-brand hover:text-brand/80"
                  >
                    {{ plan.cta.label }}
                  </NuxtLink>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="group in pricing.comparison.groups" :key="group.title">
                <tr>
                  <th
                    colspan="4"
                    class="pb-2 pt-8 text-xs font-semibold uppercase tracking-[0.14em] text-brand"
                    scope="colgroup"
                  >
                    {{ group.title }}
                  </th>
                </tr>
                <tr
                  v-for="row in group.rows"
                  :key="row.label"
                  class="border-b border-ink/6 last:border-0"
                >
                  <th class="py-3.5 pr-4 text-sm font-medium text-ink" scope="row">
                    {{ row.label }}
                    <span v-if="row.hint" class="mt-0.5 block text-xs font-normal text-muted">
                      {{ row.hint }}
                    </span>
                  </th>
                  <td
                    v-for="(value, index) in row.values"
                    :key="`${row.label}-${index}`"
                    class="px-3 py-3.5 text-center"
                  >
                    <HugeiconsIcon
                      v-if="cellIncluded(value)"
                      :icon="Tick02Icon"
                      :size="20"
                      color="currentColor"
                      :stroke-width="1.8"
                      class="mx-auto text-brand"
                    />
                    <HugeiconsIcon
                      v-else-if="cellExcluded(value)"
                      :icon="MinusSignIcon"
                      :size="18"
                      color="currentColor"
                      :stroke-width="1.8"
                      class="mx-auto text-ink/25"
                    />
                    <span v-else class="text-sm text-ink/80">{{ value }}</span>
                    <span v-if="cellIncluded(value)" class="sr-only">Included</span>
                    <span v-else-if="cellExcluded(value)" class="sr-only">Not included</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </Container>
    </section>

    <section v-if="pricing.faq" class="py-16 sm:py-24">
      <Container>
        <div class="mx-auto max-w-3xl">
          <h2 class="text-center text-[1.75rem] font-semibold leading-snug tracking-tight text-ink sm:text-4xl">
            {{ pricing.faq.title }}
          </h2>
          <span class="mx-auto mt-5 block h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />
          <div class="mt-10 space-y-3">
            <details
              v-for="item in pricing.faq.items"
              :key="item.question"
              class="group rounded-[1.5rem] bg-white px-5 shadow-[0_4px_20px_rgba(15,18,34,0.05)] sm:px-6"
            >
              <summary class="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-left text-sm font-medium text-ink marker:content-none sm:gap-4 sm:py-5 sm:text-base [&::-webkit-details-marker]:hidden">
                {{ item.question }}
                <HugeiconsIcon
                  :icon="ArrowDown01Icon"
                  :size="18"
                  color="currentColor"
                  :stroke-width="1.8"
                  class="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p class="border-t border-ink/8 pb-5 pt-4 pr-8 text-[15px] leading-relaxed text-pretty text-muted sm:pr-10">
                {{ item.answer }}
              </p>
            </details>
          </div>
        </div>
      </Container>
    </section>

    <section
      v-if="pricing.closing"
      class="relative z-[70] flex scroll-mt-24 items-center px-6 pb-0 pt-8 sm:px-12 sm:pt-16 lg:px-24"
    >
      <div class="mx-auto w-full max-w-4xl -mb-20 rounded-[2rem] bg-white px-5 py-8 text-center shadow-[0_22px_50px_-28px_rgba(15,18,34,0.35)] ring-1 ring-ink/6 sm:-mb-32 sm:max-w-5xl sm:rounded-[2.5rem] sm:px-8 sm:py-12 lg:-mb-40 lg:rounded-[3.5rem] lg:px-10 lg:py-12">
        <h2 class="text-[1.75rem] font-semibold leading-snug tracking-tight text-balance text-ink sm:text-4xl">
          {{ pricing.closing.title }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {{ pricing.closing.subtitle }}
        </p>
        <AppButton
          class="mt-8"
          :href="pricing.closing.cta.href"
          variant="accent"
          size="lg"
        >
          {{ pricing.closing.cta.label }}
        </AppButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.plan-card {
  border-radius: 1.5rem;
  background: #fff;
  box-shadow: 0 4px 20px rgba(15, 18, 34, 0.05);
}

.plan-card-featured {
  isolation: isolate;
  background:
    radial-gradient(ellipse 80% 55% at 8% -10%, rgba(106, 90, 224, 0.85) 0%, transparent 56%),
    radial-gradient(ellipse 65% 50% at 100% 110%, rgba(29, 185, 222, 0.4) 0%, transparent 50%),
    linear-gradient(165deg, #16123a 0%, #241a5c 48%, #0c3342 100%);
  box-shadow:
    0 22px 50px -28px rgba(15, 18, 34, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

@media (min-width: 640px) {
  .plan-card {
    border-radius: 1.75rem;
  }
}
</style>
