<template>
  <div class="pointer-events-none absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true">
    <div
      class="absolute -left-[28%] -top-[6%] aspect-square w-[92%] rounded-full bg-accent/28 blur-[56px] animate-orb-a motion-reduce:animate-none sm:-left-[16%] sm:-top-[10%] sm:w-[40%] sm:bg-accent/20 sm:blur-[80px]"
    />
    <div
      class="absolute -right-[30%] top-[12%] aspect-square w-[88%] rounded-full bg-brand/40 blur-[60px] animate-orb-b motion-reduce:animate-none sm:-right-[14%] sm:top-[4%] sm:w-[42%] sm:bg-brand/28 sm:blur-[90px]"
    />
    <div
      class="absolute -bottom-[8%] left-[4%] aspect-square w-[96%] rounded-full bg-brand-cyan/26 blur-[56px] animate-orb-c motion-reduce:animate-none sm:-bottom-[14%] sm:left-[18%] sm:w-[44%] sm:bg-brand-cyan/16 sm:blur-[80px]"
    />
  </div>
</template>

<style>
/* Painted on the section so the wash cannot be clipped mid-hero. */
.hero-field {
  background-color: var(--color-hero);
  background-image:
    radial-gradient(ellipse 120% 72% at 50% -8%, color-mix(in srgb, var(--color-accent) 32%, transparent) 0%, transparent 68%),
    radial-gradient(ellipse 100% 78% at 108% 16%, color-mix(in srgb, var(--color-brand) 46%, transparent) 0%, transparent 70%),
    radial-gradient(ellipse 110% 80% at -8% 52%, color-mix(in srgb, var(--color-brand-cyan) 38%, transparent) 0%, transparent 68%),
    radial-gradient(ellipse 105% 70% at 92% 78%, color-mix(in srgb, var(--color-brand) 26%, transparent) 0%, transparent 66%),
    radial-gradient(ellipse 130% 60% at 42% 108%, color-mix(in srgb, var(--color-brand-cyan) 22%, transparent) 0%, transparent 62%);
}

@media (min-width: 640px) {
  .hero-field {
    background-image:
      radial-gradient(ellipse 88% 58% at 10% 0%, color-mix(in srgb, var(--color-accent) 22%, transparent) 0%, transparent 100%),
      radial-gradient(ellipse 82% 68% at 98% 10%, color-mix(in srgb, var(--color-brand) 30%, transparent) 0%, transparent 100%),
      radial-gradient(ellipse 115% 95% at 4% 52%, color-mix(in srgb, var(--color-brand-cyan) 24%, transparent) 0%, transparent 100%),
      radial-gradient(ellipse 105% 88% at 96% 62%, color-mix(in srgb, var(--color-brand) 20%, transparent) 0%, transparent 100%),
      radial-gradient(ellipse 130% 70% at 38% 100%, color-mix(in srgb, var(--color-brand-cyan) 16%, transparent) 0%, transparent 100%);
  }
}
</style>
