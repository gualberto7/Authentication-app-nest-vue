<script setup lang="ts">
import { useUserStore } from '@/core/store/user'
import Tasks from '@/areas/task/Task.vue'

const { user } = useUserStore()
</script>

<template>
  <div class="home-page">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-center mt-10" data-testid="home-title">Home Page</h1>
      <p class="text-center mt-5" data-testid="home-description">
        Welcome to the home page: <strong>{{ user?.name }}</strong>
      </p>
      <div class="w-1/2 mx-auto my-10">
        <Tasks />
      </div>
    </div>
  </div>
</template>
