<template>
  <div class="pointer-events-none absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true">
    <div
      class="absolute -left-[16%] -top-[10%] aspect-square w-[40%] rounded-full bg-accent/20 blur-[80px] animate-orb-a motion-reduce:animate-none"
    />
    <div
      class="absolute -right-[14%] top-[4%] aspect-square w-[42%] rounded-full bg-brand/28 blur-[90px] animate-orb-b motion-reduce:animate-none"
    />
    <div
      class="absolute -bottom-[14%] left-[18%] aspect-square w-[44%] rounded-full bg-brand-cyan/16 blur-[80px] animate-orb-c motion-reduce:animate-none"
    />
  </div>
</template>

<style>
/* Painted on the section so the wash cannot be clipped mid-hero. */
.hero-field {
  background-color: var(--color-hero);
  background-image:
    radial-gradient(ellipse 88% 58% at 10% 0%, color-mix(in srgb, var(--color-accent) 22%, transparent) 0%, transparent 100%),
    radial-gradient(ellipse 82% 68% at 98% 10%, color-mix(in srgb, var(--color-brand) 30%, transparent) 0%, transparent 100%),
    radial-gradient(ellipse 115% 95% at 4% 52%, color-mix(in srgb, var(--color-brand-cyan) 24%, transparent) 0%, transparent 100%),
    radial-gradient(ellipse 105% 88% at 96% 62%, color-mix(in srgb, var(--color-brand) 20%, transparent) 0%, transparent 100%),
    radial-gradient(ellipse 130% 70% at 38% 100%, color-mix(in srgb, var(--color-brand-cyan) 16%, transparent) 0%, transparent 100%);
}
</style>
