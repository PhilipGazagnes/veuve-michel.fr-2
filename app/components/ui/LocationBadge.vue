<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 72 });
</script>

<template>
  <div
    class="relative flex shrink-0 items-center justify-center rounded-full bg-white shadow-md"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg
      viewBox="0 0 95 110"
      class="relative top-[3px] h-[80%] w-[80%] fill-none stroke-black"
      stroke-width="2"
    >
      <polygon
        points="54.33 92.83 53 85.67 61.83 81.17 71.33 84 77.17 87 81.67 85.33 90.33 78.5 92.5 75.17 87.5 75.17 85 72.33 85.17 69.5 87 68.33 83.17 65.33 87.83 62.17 85 58 86.5 55 84.5 50 80.83 51.33 78.5 53.67 79 47.33 89.33 38.33 91.5 29.83 95 23 83.33 20.33 83 17.17 74.67 17.17 69.83 13.17 70.17 9.67 66.17 11.83 65 8.83 61.83 7.67 58.67 3.17 56 3.17 54.17 0 47.5 2 46 9.67 38.17 12.67 36.83 14.83 38.5 16.5 30.5 15.83 28.92 14.25 29 11.67 23 11.17 24.33 16 24.5 20.67 25.5 23.67 20.17 22.33 15.67 22.67 13 19 8.67 20.67 4.67 20.33 0 21.5 1.33 23.33 4.17 24.67 2 26.17 0 26.33 2.67 29.33 7.33 29.67 11 32.33 11.5 34.17 14 33.83 16.67 36.67 19.17 38.17 17.67 41.67 22.83 47.67 24.5 52.17 23.17 54.17 20 52.67 21.33 55 23.05 56.17 24.02 56.82 26 58.17 26 62.83 24.83 59.17 21.83 56.83 22.33 65.17 23.17 67.17 21.33 67.17 19.83 74 16.83 78.5 14.83 80 18.83 83.17 27.5 88 34 89 34.67 86.83 40 89.67 43.33 92.83 49.5 93.83 54.33 92.83"
      />
    </svg>
    <span
      class="absolute left-[55%] top-[69%] -translate-x-1/2 -translate-y-1/2"
    >
      <span
        class="absolute inset-0 -m-1.5 animate-ping-slow rounded-full bg-maroon opacity-75"
      />
      <span class="relative block h-1.5 w-1.5 rounded-full bg-maroon" />
    </span>
  </div>
</template>
