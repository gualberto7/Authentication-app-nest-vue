<script setup>
import { ref, onMounted } from 'vue'
</script>

<template>
  <dialog id="modal" class="modal">
    <div class="modal-box">
      <slot></slot>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
