<script setup lang="ts">
import { defineEmits, defineProps, type PropType } from 'vue'

import type { Color, Size } from '@/core/customTypes'

const emit = defineEmits(['click'])

const props = defineProps({
  emphasis: {
    type: String as PropType<Color>,
    default: 'primary'
  },
  size: {
    type: String as PropType<Size>,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const handleClick = () => {
  // Emit a custom event
  emit('click')
}
</script>

<template>
  <button
    class="button"
    :class="[props.emphasis, props.size]"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  @apply px-4 py-2 rounded-md text-white font-semibold focus:outline-none focus:ring focus:ring-opacity-50;
}
.primary {
  @apply bg-primary focus:ring-primary;
}
.secondary {
  @apply bg-secondary focus:ring-secondary;
}
.warning {
  @apply bg-warning focus:ring-warning;
}
.sm {
  @apply text-sm px-2 py-1;
}
</style>
