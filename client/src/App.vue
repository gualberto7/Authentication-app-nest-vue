<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/core/store/user'
import Snackbar from '@/core/components/Snackbar.vue'

const loading = ref(true)
const { loadUser } = useUserStore()

onMounted(() => {
  loadUser().then(() => {
    loading.value = false
  })
})
</script>

<template>
  <div>
    <div v-if="!loading">
      <RouterView />
    </div>
    <div v-else>
      <div class="flex justify-center items-center h-screen">
        <div
          class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"
        ></div>
      </div>
    </div>
    <Snackbar />
  </div>
</template>

<style scoped></style>
