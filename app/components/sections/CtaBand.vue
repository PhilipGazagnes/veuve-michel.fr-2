<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    heading: string
    note?: string
    noteItalic?: boolean
  }>(),
  { noteItalic: false },
)
</script>

<template>
  <section class="border-t border-hairline bg-[#FAF6F0] px-6 py-11 text-center md:px-14 md:py-[72px]">
    <div class="mx-auto flex max-w-lg flex-col items-center gap-3">
      <p v-if="eyebrow" class="font-sans text-[11px] font-semibold uppercase tracking-label text-maroon">
        {{ eyebrow }}
      </p>
      <h2 class="font-serif text-[26px] text-ink md:text-[32px]">{{ heading }}</h2>
      <p
        v-if="note"
        class="font-sans text-[15px] text-body"
        :class="noteItalic ? 'italic' : ''"
      >
        {{ note }}
      </p>
      <div class="mt-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
        <slot />
      </div>
    </div>
  </section>
</template>
