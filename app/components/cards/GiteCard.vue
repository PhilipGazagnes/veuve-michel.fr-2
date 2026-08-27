<script setup lang="ts">
import type { CmsImage, Gite } from '~/content/types'

const props = defineProps<{ gite: Gite }>()

const mosaicImages = computed<(CmsImage | undefined)[]>(() =>
  Array.from({ length: 4 }, (_, i) => props.gite.images[i]),
)
const extraCount = computed(() => Math.max(props.gite.images.length - 4, 0))

const diaporamaOpen = ref(false)
const startIndex = ref(0)

function openDiaporama(index: number) {
  startIndex.value = index
  diaporamaOpen.value = true
}
</script>

<template>
  <article class="relative flex flex-col overflow-hidden rounded-card border border-hairline-strong bg-white shadow-card md:flex-row">
    <div class="grid aspect-[16/10] grid-cols-2 grid-rows-2 gap-1 md:aspect-square md:w-[340px] md:shrink-0">
      <button
        v-for="(image, i) in mosaicImages"
        :key="i"
        type="button"
        class="relative overflow-hidden"
        :aria-label="`Voir les photos de ${gite.name}`"
        @click="openDiaporama(i)"
      >
        <UiPlaceholderImage
          :image="image"
          gradient-from="#e9dece"
          gradient-to="#dccbb8"
          sizes="sm:50vw md:170px"
        />
        <span
          v-if="i === mosaicImages.length - 1 && extraCount > 0"
          class="absolute inset-0 flex items-center justify-center bg-black/55 font-serif text-lg text-white"
        >
          +{{ extraCount }}
        </span>
      </button>
    </div>

    <p class="absolute right-0 top-0 z-10 whitespace-nowrap rounded-bl-card bg-maroon px-4 py-2 font-serif text-sm text-white md:px-5 md:py-2.5 md:text-base">
      {{ gite.pricePerNight }} €<span class="ml-1 font-sans text-[10px] italic text-white/70">/ nuit</span>
    </p>

    <div class="flex max-w-2xl flex-1 flex-col justify-center gap-4 p-7 md:p-8">
      <h3 class="font-serif text-2xl text-ink md:pr-32 md:text-[26px]">{{ gite.name }}</h3>

      <p class="font-sans text-[14.5px] leading-relaxed text-body md:text-[15.5px]">
        {{ gite.description }}
      </p>

      <div class="flex flex-wrap gap-2">
        <span class="rounded-full border border-[#e7ddd0] bg-[#f4efe8] px-3 py-1.5 font-sans text-[11px] text-[#6b5a4f]">
          {{ gite.surfaceM2 }} m²
        </span>
        <span class="rounded-full border border-[#e7ddd0] bg-[#f4efe8] px-3 py-1.5 font-sans text-[11px] text-[#6b5a4f]">
          {{ gite.capacity }} pers.
        </span>
        <span class="rounded-full border border-[#e7ddd0] bg-[#f4efe8] px-3 py-1.5 font-sans text-[11px] text-[#6b5a4f]">
          {{ gite.rooms }} chambres
        </span>
      </div>

      <details class="group/details">
        <summary class="cursor-pointer font-sans text-xs font-semibold uppercase tracking-[0.1em] text-maroon">
          Inventaire &amp; équipements
        </summary>
        <ul class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 font-sans text-sm text-body">
          <li v-for="entry in gite.inventory" :key="entry">{{ entry }}</li>
        </ul>
      </details>
    </div>

    <UiPhotoDiaporama
      :open="diaporamaOpen"
      :images="gite.images"
      :start-index="startIndex"
      @close="diaporamaOpen = false"
    />
  </article>
</template>
