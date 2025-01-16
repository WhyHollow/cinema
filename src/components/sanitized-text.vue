<script lang="ts" setup>
import { computed } from 'vue'
import { decodeHtmlEntities } from '../utils/htmlUtils'

const props = defineProps({
  rawText: {
    type: String,
    required: true,
  },
})

const decodedText = computed(() => decodeHtmlEntities(props.rawText))
</script>
<template>
  <p v-html="decodedText" class="sanitized-text"></p>
</template>

<style scoped>
.sanitized-text {
  font-size: 1rem;
  line-height: 1.5;
  color: #4a4a4a;
}
</style>
