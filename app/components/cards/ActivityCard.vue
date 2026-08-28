<script setup lang="ts">
import type { ActivityCardContent } from '~/content/types'

withDefaults(defineProps<{ item: ActivityCardContent; showText?: boolean }>(), {
  showText: true,
})

const gradients: Record<ActivityCardContent['key'], { from: string; to: string }> = {
  vins: { from: '#efe7db', to: '#d8b8a0' },
  arboriculture: { from: '#e2e5cf', to: '#cdd4b0' },
  gites: { from: '#e9dece', to: '#dccbb8' },
  evenements: { from: '#cfd9e0', to: '#aebfca' },
}
</script>

<template>
  <NuxtLink
    :to="item.to"
    class="group flex flex-col overflow-hidden rounded border border-hairline-strong bg-white transition-all duration-150 hover:-translate-y-1 hover:shadow-card-hover"
  >
    <div class="aspect-[16/10]">
      <UiPlaceholderImage
        :image="item.image"
        :gradient-from="gradients[item.key].from"
        :gradient-to="gradients[item.key].to"
        sizes="560px"
      />
    </div>
    <div class="flex flex-1 flex-col gap-1.5 p-4">
      <h3 class="font-serif text-lg text-ink md:text-[18px]">{{ item.title }}</h3>
      <p v-if="showText" class="font-sans text-[13px] text-body">{{ item.text }}</p>
      <span class="mt-auto pt-2 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-maroon">
        En savoir plus →
      </span>
    </div>
  </NuxtLink>
</template>
