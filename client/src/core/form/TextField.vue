<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const touched = ref(false)

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function onBlur() {
  touched.value = true
}

const showError = computed(() => touched.value && props.error)
</script>

<template>
  <div class="flex flex-col">
    <label :for="name" class="mb-2">{{ label }}</label>
    <input
      :id="name"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      @change="onChange"
      @blur="onBlur"
      class="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
      :class="{ 'border-rose-500 focus:ring-0': showError }"
      :data-testid="`${name}-input`"
    />
    <span id="error-message" v-if="showError" class="text-rose-500">{{ error }}</span>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
