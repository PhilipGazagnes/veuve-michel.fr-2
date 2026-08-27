<script setup lang="ts">
import type { IconName } from '~/types/icons'

const props = withDefaults(
  defineProps<{
    icon: IconName
    size?: 44 | 48 | 56
  }>(),
  { size: 44 },
)

const sizeClasses: Record<number, string> = {
  44: 'h-11 w-11',
  48: 'h-12 w-12',
  56: 'h-14 w-14',
}
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center justify-center rounded-full bg-maroon text-white"
    :class="sizeClasses[size]"
  >
    <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path v-if="icon === 'phone'" d="M4 5c0 8.5 6.5 15 15 15l2-4-5-2-1.5 1.5A11 11 0 0 1 9.5 10.5L11 9 9 4 5 4Z" />
      <template v-else-if="icon === 'mail'">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </template>
      <template v-else-if="icon === 'map-pin'">
        <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.3" />
      </template>
      <template v-else-if="icon === 'clock'">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </template>
      <path v-else-if="icon === 'flame'" d="M12 22c4 0 6-3 6-6.5 0-3-2-4.5-3-6.5-.5 2-2 3-2 3 0-3-1.5-5.5-4-7 0 3-1 5-3 7-1.3 1.3-2 3-2 5C4 19 8 22 12 22Z" />
      <path v-else-if="icon === 'wine'" d="M8 3h8l-1 6a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3Zm4 9v6m-3.5 0h7" />
      <template v-else-if="icon === 'waves'">
        <path d="M2 10c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
        <path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
      </template>
      <template v-else-if="icon === 'users'">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" />
        <path d="M16 5.2a3 3 0 0 1 0 5.8M20.5 20c0-2.8-1.8-5.1-4.5-5.8" />
      </template>
    </svg>
  </span>
</template>
