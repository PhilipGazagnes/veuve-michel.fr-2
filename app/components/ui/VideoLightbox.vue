<script setup lang="ts">
const props = defineProps<{ modelValue: boolean; videoUrl: string }>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const embedUrl = computed(() => {
  const base = toYoutubeEmbedUrl(props.videoUrl)
  return base ? `${base}?autoplay=1&rel=0` : ''
})

function close() {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  (open) => {
    if (!import.meta.client) return
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) window.addEventListener('keydown', onKeydown)
    else window.removeEventListener('keydown', onKeydown)
  },
)

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
      @click.self="close"
    >
      <button
        type="button"
        class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white md:right-8 md:top-8"
        aria-label="Fermer la vidéo"
        @click="close"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M2 2l16 16M18 2 2 18" />
        </svg>
      </button>
      <div class="aspect-video w-full max-w-4xl overflow-hidden rounded-lg bg-black">
        <iframe
          v-if="embedUrl"
          :src="embedUrl"
          class="h-full w-full"
          title="Lecteur vidéo"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        />
      </div>
    </div>
  </Teleport>
</template>
