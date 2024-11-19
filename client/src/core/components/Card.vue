<script setup lang="ts">
import { type PropType, computed } from 'vue'

type size = 'sm' | 'md' | 'lg'

const props = defineProps({
  size: {
    type: String as PropType<size>,
    required: false,
    default: 'md'
  },
  title: {
    type: String,
    required: false
  }
})

const cardSize = computed(() => {
  return {
    'w-96': props.size === 'md',
    'w-72': props.size === 'sm',
    'w-1/3': props.size === 'lg'
  }
})
</script>

<template>
  <div class="card-component card shadow-md p-8" data-testid="card-title" :class="cardSize">
    <h1 v-if="props.title" class="card-title">{{ props.title }}</h1>
    <slot />
  </div>
</template>
