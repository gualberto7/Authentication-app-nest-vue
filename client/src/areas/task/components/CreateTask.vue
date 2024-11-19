<script setup lang="ts">
import TaskRequest from '../classes/TaskRequest'
import { useTasks } from '../composables/useTasks'

const form = new TaskRequest()
const { create } = useTasks()
const createTask = async () => {
  console.log(form.model)
  create(form.model)
  //await form.create()
}
</script>

<template>
  <div class="create-task">
    <h2 class="font-bold text-lg my-2">Create a task</h2>
    <form @submit.prevent="createTask" method="dialog">
      <div class="py-4">
        <TextField
          name="title"
          label="title"
          v-model="form.model.title"
          placeholder="Title"
          :error="form.errors.title"
          data-testid="title"
        />
      </div>
      <div class="py-4">
        <TextField
          name="description"
          label="description"
          v-model="form.model.description"
          placeholder="Description"
          :error="form.errors.description"
          data-testid="description"
        />
      </div>
      <div class="modal-action pt-3">
        <Button onclick="modal.close()" data-testid="save-task-button">Save</Button>
      </div>
    </form>
  </div>
</template>
