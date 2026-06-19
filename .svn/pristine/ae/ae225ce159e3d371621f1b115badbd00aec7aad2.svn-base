<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="row.id">
        <td>{{ row.wqname }}</td>
        <td>{{ row.indexQ }}</td>
        <td>{{ row.wqgrz }}</td>
        <td>
          <progress-bar :value="row.paiBili" max="100">{{ row.paiBili }}%</progress-bar>
        </td>
        <!-- <td v-for="(cell, cellIndex) in row" :key="cellIndex">
          <progress :value="row.paiBili" max="100">{{ row.paiBili }}%</progress>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import ProgressBar from "./ProgressBar.vue";
import { ref, onMounted } from "vue";
const tableWidth = ref(0);
const tableHeight = ref(300); // 假设表格高度是300px
const progress = ref(50); // 进度条的百分比值
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
});
</script>
<style scoped></style>
