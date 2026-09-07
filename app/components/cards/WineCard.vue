<script setup lang="ts">
import type { Cuvee } from '~/content/types'

const props = defineProps<{ cuvee: Cuvee }>()

// Only the flagship cuvée has a real detail page today — avoid linking the
// placeholder gamme entries to routes that don't exist yet.
const hasDetailPage = computed(() => props.cuvee.isPrestige)
</script>

<template>
  <component
    :is="hasDetailPage ? resolveComponent('NuxtLink') : 'div'"
    :to="hasDetailPage ? `/vins/${cuvee.slug}` : undefined"
    class="group flex flex-col overflow-hidden rounded-card border border-hairline-strong bg-white transition-all duration-150"
    :class="hasDetailPage ? 'hover:-translate-y-1 hover:shadow-card-hover' : ''"
  >
    <div class="relative aspect-square">
      <UiPlaceholderImage :image="cuvee.image" sizes="sm:100vw md:300px" />
    </div>
    <div class="flex flex-1 flex-col gap-1 px-5 pb-5 pt-[18px]">
      <h3 class="font-serif text-xl text-ink">{{ cuvee.name }}</h3>
      <p class="text-[13.5px] text-muted">Cépages : {{ cuvee.cepages }}</p>
      <p class="text-[13.5px] text-muted">{{ cuvee.description }}</p>
      <div class="mt-3 flex items-center justify-between border-t border-hairline pt-3">
        <span class="font-serif text-ink">{{ cuvee.price }} €</span>
      </div>
    </div>
  </component>
</template>
