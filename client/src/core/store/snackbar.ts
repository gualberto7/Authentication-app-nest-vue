import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import eventBus from './eventBus'

export const useSnackbarStore = defineStore('snackbar', () => {
  const isOpen = ref(false)
  const message = ref('')

  const showSnackbar = (msj: string) => {
    isOpen.value = true
    message.value = msj
    setTimeout(() => {
      hideSnackbar()
    }, 3000)
  }

  const onUndoClick = () => {
    eventBus.emit('task:undo')
    hideSnackbar()
  }

  const hideSnackbar = () => {
    isOpen.value = false
    message.value = ''
  }

  return { isOpen, message, showSnackbar, onUndoClick }
})
