<script setup lang="ts">
import type { CmsImage } from '~/content/types'

const props = withDefaults(
  defineProps<{
    image?: CmsImage
    gradientFrom?: string
    gradientTo?: string
    caption?: string
    imgClass?: string
    sizes?: string
  }>(),
  {
    gradientFrom: '#efe7db',
    gradientTo: '#dccbb8',
    sizes: 'sm:100vw md:600px',
  },
)

const hasRealImage = computed(() => !!props.image?.filename)
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <NuxtImg
      v-if="hasRealImage"
      :src="image!.filename"
      :alt="image!.alt"
      :sizes="sizes"
      densities="1x"
      class="h-full w-full object-cover"
      :class="imgClass"
    />
    <div
      v-else
      class="flex h-full w-full items-end"
      :style="{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }"
      role="img"
      :aria-label="image?.alt ?? caption ?? 'Photo à venir'"
    >
      <span
        v-if="caption"
        class="p-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/40"
      >
        {{ caption }}
      </span>
    </div>
  </div>
</template>
