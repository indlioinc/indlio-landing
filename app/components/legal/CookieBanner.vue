<script setup lang="ts">
const { cookies } = useLandingContent()
const { bannerVisible, acceptAll, rejectOptional, openSettings } = useCookieConsent()
</script>

<template>
  <div
    v-if="bannerVisible && cookies"
    class="fixed right-0 bottom-0 z-[80] w-full max-w-md p-4 sm:p-6"
    role="dialog"
    aria-live="polite"
    :aria-label="cookies.bannerTitle"
  >
    <div class="rounded-[1.5rem] bg-white p-5 shadow-[0_22px_50px_-28px_rgba(15,18,34,0.45)] ring-1 ring-ink/8 sm:p-6">
      <p class="text-sm font-semibold text-ink">
        {{ cookies.bannerTitle }}
      </p>
      <p class="mt-2 text-[13px] leading-relaxed text-pretty text-muted sm:text-sm">
        {{ cookies.bannerBody }}
        <NuxtLink to="/cookies" class="font-medium text-ink underline decoration-ink/20 underline-offset-2 hover:decoration-ink">
          {{ cookies.policyLink }}
        </NuxtLink>
      </p>
      <div class="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <AppButton variant="accent" size="sm" class="justify-center" @click="acceptAll">
          {{ cookies.acceptAll }}
        </AppButton>
        <AppButton variant="outline" size="sm" class="justify-center" @click="rejectOptional">
          {{ cookies.rejectOptional }}
        </AppButton>
        <button
          type="button"
          class="px-3 py-2 text-sm font-semibold text-ink transition-colors hover:text-ink/70"
          @click="openSettings"
        >
          {{ cookies.customize }}
        </button>
      </div>
    </div>
  </div>
</template>
