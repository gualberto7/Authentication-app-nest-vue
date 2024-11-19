<script lang="ts" setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const isDisabled = computed(() => {
  console.log('changed', props.disabled)
  return props.disabled
})
</script>

<template>
  <div class="form-control">
    <label class="cursor-pointer label">
      <input
        type="checkbox"
        @click="emit('update:modelValue')"
        :checked="modelValue"
        :disabled="isDisabled"
        class="checkbox checkbox-info"
      />
    </label>
  </div>
</template>
