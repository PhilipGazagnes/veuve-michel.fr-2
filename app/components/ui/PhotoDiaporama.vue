<script setup lang="ts">
import type { CmsImage } from '~/content/types'

const props = defineProps<{ open: boolean; images: CmsImage[]; startIndex?: number }>()
const emit = defineEmits<{ close: [] }>()

const index = ref(props.startIndex ?? 0)
const dialogRef = ref<HTMLElement | null>(null)

watch(
  () => props.open,
  (open) => {
    if (open) {
      index.value = props.startIndex ?? 0
      nextTick(() => dialogRef.value?.focus())
    }
    if (import.meta.client) {
      document.documentElement.style.overflow = open ? 'hidden' : ''
    }
  },
)

function prev() {
  index.value = (index.value - 1 + props.images.length) % props.images.length
}

function next() {
  index.value = (index.value + 1) % props.images.length
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

const currentImage = computed<CmsImage | undefined>(() => props.images[index.value])
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        ref="dialogRef"
        class="fixed inset-0 z-50 flex flex-col bg-black/95 px-6 pb-10 pt-6 outline-none md:px-14"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        @keydown="onKeydown"
      >
        <div class="flex items-center justify-between">
          <span class="font-sans text-xs uppercase tracking-[0.14em] text-white/50">{{ index + 1 }} / {{ images.length }}</span>
          <button
            type="button"
            class="text-3xl font-light leading-none text-cream"
            aria-label="Fermer le diaporama"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>

        <div class="relative flex flex-1 items-center justify-center overflow-hidden">
          <button
            v-if="images.length > 1"
            type="button"
            class="absolute left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 md:left-4"
            aria-label="Photo précédente"
            @click="prev"
          >
            ‹
          </button>

          <NuxtImg
            v-if="currentImage"
            :src="currentImage.filename"
            :alt="currentImage.alt"
            class="max-h-full max-w-full object-contain"
          />

          <button
            v-if="images.length > 1"
            type="button"
            class="absolute right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 md:right-4"
            aria-label="Photo suivante"
            @click="next"
          >
            ›
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
