<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 0,
  },
  className: {
    type: String,
    default: "",
  },
});

const optimizedImage = computed(() => {
  const baseUrl = new URL(props.url, import.meta.url);
  baseUrl.searchParams.set("w", props.width.toString());
  if (props.height > 0) {
    baseUrl.searchParams.set("h", props.height.toString());
  }
  baseUrl.searchParams.set("format", "webp");
  return baseUrl.href;
});
</script>

<template>
  <div
    class="relative overflow-hidden rounded-md bg-gradient-to-r from-gray-100 to-gray-300"
  >
    <img
      :src="optimizedImage"
      :alt="alt"
      :class="className"
      decoding="async"
      loading="lazy"
      class="transition-transform duration-300 ease-in-out transform hover:scale-115"
    />
  </div>
</template>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem;
}

img {
  max-width: 100%;

  max-height: 100%;
  display: block;
  transition: transform 0.3s ease-in-out;
  cursor: zoom-in;
}

img:hover {
  transform: scale(1.15);
}
</style>
