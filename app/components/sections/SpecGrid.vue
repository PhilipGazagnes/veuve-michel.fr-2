<script setup lang="ts">
defineProps<{ items: { label: string; value: string }[] }>()
</script>

<template>
  <div class="grid max-w-md grid-cols-2 gap-x-8 gap-y-4 md:gap-x-10 md:gap-y-[22px]">
    <div v-for="item in items" :key="item.label" class="flex flex-col gap-1">
      <span class="font-sans text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted md:text-[10px]">
        {{ item.label }}
      </span>
      <span class="font-serif text-base text-ink md:text-[17px]">{{ item.value }}</span>
    </div>
  </div>
</template>
