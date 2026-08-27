<script setup lang="ts">
defineProps<{
  items: { title: string; body: string }[]
  gradientFrom?: string
  gradientTo?: string
}>()
</script>

<template>
  <ol class="mx-auto flex max-w-content flex-col gap-9 md:gap-9">
    <li v-for="(item, i) in items" :key="item.title" class="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
      <div class="flex items-center gap-4 md:contents">
        <span class="w-14 shrink-0 font-serif text-3xl text-[#c9a24a] md:text-4xl">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
        <h3 class="font-serif text-xl text-ink md:hidden">{{ item.title }}</h3>
      </div>
      <div class="aspect-video w-full overflow-hidden rounded md:aspect-[16/10] md:w-[180px] md:shrink-0">
        <UiPlaceholderImage :gradient-from="gradientFrom ?? '#e2e5cf'" :gradient-to="gradientTo ?? '#cdd4b0'" />
      </div>
      <div class="max-w-2xl flex-1">
        <h3 class="hidden font-serif text-xl text-ink md:block md:text-[22px]">{{ item.title }}</h3>
        <p class="mt-1 font-sans text-sm leading-relaxed text-body md:text-base">{{ item.body }}</p>
      </div>
    </li>
  </ol>
</template>
