<script lang="ts" setup>
import { useSnackbarStore } from '@/core/store/snackbar'
import { storeToRefs } from 'pinia'

const snackbarStore = useSnackbarStore()
const store = storeToRefs(snackbarStore)
</script>

<template>
  <div v-if="store.isOpen.value">
    <div class="c-snackbar" data-testid="snackbar">
      <div class="c-snackbar__content">
        <span data-testid="snackbar-message">{{ store.message }}</span>
        <button @click="snackbarStore.onUndoClick">UNDO</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-snackbar {
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 1000;
}
.c-snackbar__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
}
button {
  color: rgb(24, 145, 237);
  background-color: #333;
  font-weight: 600;
}
</style>
