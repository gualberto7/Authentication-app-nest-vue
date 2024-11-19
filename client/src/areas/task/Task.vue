<script setup lang="ts">
// imports
import { computed, onMounted } from 'vue'
import { useTasksStore } from './store/task'
import { useTasks } from './composables/useTasks'

// components
import TaskTable from './components/TaskTable.vue'
import CreateTask from '@/areas/task/components/CreateTask.vue'

// state
const { getTasks, markAsDone, remove } = useTasks()
const tasksStore = useTasksStore()

// hooks
onMounted(() => {
  getTasks()
})

// computed
const tasks = computed(() => tasksStore.tasks)
</script>
<template>
  <div>
    <button class="btn" onclick="modal.showModal()" data-testid="add-task-button">Add task</button>
    <Modal>
      <CreateTask />
    </Modal>
    <div>
      <TaskTable :tasks="tasks" @mark-as-done="markAsDone" @remove-task="remove" />
    </div>
  </div>
</template>
