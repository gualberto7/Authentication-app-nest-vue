<script lang="ts" setup>
import { type PropType } from 'vue'
import Table from '@/core/components/Table.vue'
import { type TableColumn } from '@/core/interfaces/Table'
import { TaskStatus, type Task } from '@/core/interfaces/Task'
const columns: TableColumn[] = [
  {
    label: '',
    key: 'status'
  },
  {
    label: 'Task',
    key: 'title'
  },
  {
    label: 'Description',
    key: 'description'
  },
  {
    label: '',
    key: 'actions'
  }
]
defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true
  }
})

const emit = defineEmits(['markAsDone', 'removeTask'])
</script>

<template>
  <Table :columns="columns" :data="tasks" useSlots>
    <template #status="task">
      <div class="form-control">
        <label class="cursor-pointer label">
          <input
            type="checkbox"
            @click="emit('markAsDone', task)"
            :checked="task.status == TaskStatus.DONE"
            :disabled="task.status == TaskStatus.DONE"
            class="checkbox checkbox-info"
            data-testid="mark-as-done-checkbox"
          />
        </label>
      </div>
    </template>
    <template #title="{ title }">
      <span>{{ title }}</span>
    </template>
    <template #description="{ description }">
      <span>{{ description }}</span>
    </template>
    <template #actions="task">
      <Button
        emphasis="warning"
        size="sm"
        @click="emit('removeTask', task)"
        data-testid="remove-task-button"
        >Remove</Button
      >
    </template>
  </Table>
</template>
