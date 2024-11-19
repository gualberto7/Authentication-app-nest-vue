import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const modalRef = ref<HTMLElement | null>(null)

  const showModal = () => {
    isOpen.value = true
  }

  const hideModal = () => {
    isOpen.value = false
  }

  const setModalRef = (el: any) => {
    modalRef.value = el
  }

  return { isOpen, showModal, hideModal, setModalRef, modalRef }
})
