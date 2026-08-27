<script setup lang="ts">
withDefaults(defineProps<{ label: string; tone?: 'solid' | 'outline-light' | 'outline-dark' }>(), {
  tone: 'solid',
})

const toneClasses: Record<string, string> = {
  solid: 'bg-maroon text-white',
  'outline-light': 'bg-white/10 text-white border border-white/50',
  'outline-dark': 'bg-transparent text-maroon border border-maroon/30',
}
</script>

<template>
  <span
    class="inline-flex w-fit items-center rounded-full px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em]"
    :class="toneClasses[tone]"
  >
    {{ label }}
  </span>
</template>
