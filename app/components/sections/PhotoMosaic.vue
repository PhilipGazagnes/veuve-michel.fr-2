<script setup lang="ts">
const tiles = [
  { from: '#cfd9e0', to: '#aebfca' },
  { from: '#e0d0b8', to: '#c9b291' },
  { from: '#e2e5cf', to: '#cdd4b0' },
  { from: '#e9dece', to: '#dccbb8' },
  { from: '#efe7db', to: '#d8b8a0' },
]
</script>

<template>
  <div
    class="mx-auto grid max-w-content grid-cols-2 grid-rows-3 gap-3 md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2"
  >
    <div class="col-span-2 row-span-1 overflow-hidden rounded md:col-span-1 md:row-span-2">
      <UiPlaceholderImage class="h-full" :gradient-from="tiles[0]!.from" :gradient-to="tiles[0]!.to" />
    </div>
    <div v-for="(tile, i) in tiles.slice(1)" :key="i" class="h-[130px] overflow-hidden rounded md:h-[160px]">
      <UiPlaceholderImage class="h-full" :gradient-from="tile.from" :gradient-to="tile.to" />
    </div>
  </div>
</template>
