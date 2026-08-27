<script setup lang="ts">
withDefaults(
  defineProps<{
    showOrnaments?: boolean
    address?: string
  }>(),
  {
    showOrnaments: true,
    address: 'Veuve Michel — Mas de l\'Église, 34800 Octon, France',
  },
)
</script>

<template>
  <footer class="relative overflow-hidden bg-maroon px-6 pb-9 pt-11 md:px-14 md:pb-[76px] md:pt-[76px]">
    <div v-if="showOrnaments" class="pointer-events-none absolute inset-0 hidden md:block">
      <UiOliveBranch :width="230" :height="138" class="absolute -left-16 -top-4 rotate-180 text-white opacity-[0.08]" />
      <UiOliveBranch :width="230" :height="138" class="absolute -bottom-4 -right-16 text-white opacity-[0.08]" />
    </div>

    <div class="relative mx-auto flex max-w-lg flex-col items-center gap-4 text-center">
      <UiLogoMark :size="80" class="text-white" />

      <div class="flex flex-col items-center leading-none">
        <span
            class="font-sans text-[9px] font-semibold uppercase tracking-[0.5em] text-white/70"
          >Domaine</span>
          <div class="font-script leading-[0.9] text-3xl relative -left-[2px] text-white py-2">Veuve Michel</div>
          <span
            class="font-sans text-[9px] font-semibold uppercase tracking-[0.5em] text-white/70"
          >Octon · Hérault</span>
      </div>

      <nav class="flex flex-wrap justify-center gap-8">
        <NuxtLink to="/mentions-legales" class="font-sans text-[13px] text-white/90 transition-colors hover:text-white">
          Mentions légales
        </NuxtLink>
        <NuxtLink to="/contact" class="font-sans text-[13px] text-white/90 transition-colors hover:text-white">
          Contact
        </NuxtLink>
      </nav>

      <p class="font-sans text-[11.5px] leading-[1.5] tracking-[0.06em] text-white/55 md:text-[12.5px]">
        {{ address }}
      </p>
    </div>
  </footer>
</template>
