<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import type { TableColumn, TableRow } from '@/core/interfaces/Table'

defineProps({
  columns: {
    type: Array as PropType<TableColumn[]>,
    required: true
  },
  data: {
    type: Array as PropType<TableRow[]>,
    required: true
  },
  useSlots: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr data-testid="table-head">
          <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody v-if="useSlots">
        <tr v-for="(item, index) in data" :key="index" data-testid="table-body-row">
          <td v-for="(column, colIndex) in columns" :key="colIndex">
            <slot :name="column.key" v-bind="item"></slot>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in data" :key="index" data-testid="table-body-row">
          <td v-for="(column, colIndex) in columns" :key="colIndex">{{ item[column.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
