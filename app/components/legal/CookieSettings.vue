<script setup lang="ts">
const { cookies } = useLandingContent()
const {
  consent,
  settingsOpen,
  closeSettings,
  save,
  acceptAll,
} = useCookieConsent()

const draft = reactive({
  analytics: false,
  marketing: false,
})

watch(settingsOpen, (open) => {
  if (open) {
    draft.analytics = consent.value?.analytics ?? false
    draft.marketing = consent.value?.marketing ?? false
  }
}, { immediate: true })

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeSettings()
  }
}

watch(settingsOpen, (open) => {
  if (!import.meta.client) {
    return
  }
  if (open) {
    document.addEventListener('keydown', onKeydown)
    return
  }
  document.removeEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('keydown', onKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="settingsOpen && cookies"
      class="fixed inset-0 z-[90] flex items-end justify-center bg-ink/40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center"
      role="dialog"
      aria-modal="true"
      :aria-label="cookies.settingsTitle"
      @click.self="closeSettings"
    >
      <div class="w-full max-w-lg rounded-[1.5rem] bg-white p-6 shadow-[0_22px_50px_-28px_rgba(15,18,34,0.5)] sm:p-8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold tracking-tight text-ink sm:text-xl">
              {{ cookies.settingsTitle }}
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-pretty text-muted">
              {{ cookies.settingsBody }}
            </p>
          </div>
          <button
            type="button"
            class="text-sm font-semibold text-ink/70 hover:text-ink"
            @click="closeSettings"
          >
            {{ cookies.close }}
          </button>
        </div>

        <ul class="mt-6 space-y-4">
          <li class="rounded-[1.15rem] bg-brand/6 px-4 py-3">
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm font-semibold text-ink">
                {{ cookies.necessary.label }}
              </p>
              <span class="text-[11px] font-semibold uppercase tracking-wide text-brand">
                {{ cookies.alwaysOn }}
              </span>
            </div>
            <p class="mt-1 text-[13px] leading-relaxed text-muted">
              {{ cookies.necessary.hint }}
            </p>
          </li>
          <li class="rounded-[1.15rem] px-4 py-3 ring-1 ring-ink/8">
            <label class="flex items-start justify-between gap-3">
              <span>
                <span class="block text-sm font-semibold text-ink">
                  {{ cookies.analytics.label }}
                </span>
                <span class="mt-1 block text-[13px] leading-relaxed text-muted">
                  {{ cookies.analytics.hint }}
                </span>
              </span>
              <input
                v-model="draft.analytics"
                type="checkbox"
                class="mt-1 size-4 accent-brand"
              >
            </label>
          </li>
          <li class="rounded-[1.15rem] px-4 py-3 ring-1 ring-ink/8">
            <label class="flex items-start justify-between gap-3">
              <span>
                <span class="block text-sm font-semibold text-ink">
                  {{ cookies.marketing.label }}
                </span>
                <span class="mt-1 block text-[13px] leading-relaxed text-muted">
                  {{ cookies.marketing.hint }}
                </span>
              </span>
              <input
                v-model="draft.marketing"
                type="checkbox"
                class="mt-1 size-4 accent-brand"
              >
            </label>
          </li>
        </ul>

        <div class="mt-6 flex flex-col gap-2 sm:flex-row">
          <AppButton variant="accent" size="sm" class="justify-center" @click="save(draft)">
            {{ cookies.save }}
          </AppButton>
          <AppButton variant="outline" size="sm" class="justify-center" @click="acceptAll">
            {{ cookies.acceptAll }}
          </AppButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
