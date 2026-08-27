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
    <div class="relative aspect-square" style="background: linear-gradient(135deg, #efe7db, #dccbb8)">
      <span class="absolute bottom-1/2 left-1/2 h-[120px] w-[30px] -translate-x-1/2 translate-y-1/2 rounded-t-full bg-[#a5321f]/50" />
    </div>
    <div class="flex flex-1 flex-col gap-1 px-5 pb-5 pt-[18px]">
      <h3 class="font-serif text-xl text-ink">{{ cuvee.name }}</h3>
      <p class="text-[13.5px] text-muted">{{ cuvee.cepages }} · millésime {{ cuvee.millesime }}</p>
      <div class="mt-3 flex items-center justify-between border-t border-hairline pt-3">
        <span class="font-serif text-ink">{{ cuvee.price }} €</span>
        <span v-if="hasDetailPage" class="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-maroon">
          Détails →
        </span>
        <span v-else class="font-sans text-xs italic text-muted">Bientôt disponible</span>
      </div>
    </div>
  </component>
</template>
