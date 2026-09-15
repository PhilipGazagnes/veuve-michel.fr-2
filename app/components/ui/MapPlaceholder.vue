<script setup lang="ts">
const props = withDefaults(defineProps<{ caption?: string; address?: string; zoom?: number }>(), {
  caption: 'Google Maps — localisation du domaine',
  zoom: 14,
})

// No Google Maps API key needed for this query-based embed — it just geocodes the address.
const embedSrc = computed(() =>
  props.address ? `https://www.google.com/maps?q=${encodeURIComponent(props.address)}&z=${props.zoom}&output=embed` : undefined,
)
</script>

<template>
  <iframe
    v-if="embedSrc"
    :src="embedSrc"
    :title="caption"
    class="h-full min-h-[220px] w-full rounded-card md:min-h-[380px]"
    style="border: 0"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  />
  <div
    v-else
    class="relative flex h-full min-h-[220px] items-center justify-center overflow-hidden rounded-card md:min-h-[380px]"
    style="background: linear-gradient(135deg, #dfe6df, #c3d0c2)"
  >
    <div
      class="absolute inset-0 opacity-50"
      style="background-image: linear-gradient(#b7c6b6 1px, transparent 1px), linear-gradient(90deg, #b7c6b6 1px, transparent 1px); background-size: 38px 38px"
    />
    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" class="relative text-maroon">
      <path d="M12 22s7-6.5 7-11.5A7 7 0 0 0 5 10.5C5 15.5 12 22 12 22Z" />
      <circle cx="12" cy="10.5" r="2.6" fill="#dfe6df" />
    </svg>
    <span class="absolute bottom-3 left-3.5 font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-[#6f8070]">
      {{ caption }}
    </span>
  </div>
</template>
