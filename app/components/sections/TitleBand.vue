<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    heading: string
    headingLevel?: 'h1' | 'h2'
  }>(),
  { headingLevel: 'h1' },
)
</script>

<template>
  <section class="border-b border-hairline bg-cream px-6 py-9 text-center md:px-14 md:py-[52px]">
    <p v-if="eyebrow" class="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-maroon">
      {{ eyebrow }}
    </p>
    <component :is="headingLevel" class="mt-2 font-serif text-4xl text-ink md:text-[44px]">
      {{ heading }}
    </component>
  </section>
</template>
