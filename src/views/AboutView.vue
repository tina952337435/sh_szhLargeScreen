
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="showDialog = true">打开对话框</button>
    <MyDialog
      :showDialog="showDialog"
      @close="showDialog = false"
      title="常州水位过程线"
      style="width: 80%; height: 500px"
    >
      这是一个自定义对话框的内容。
      <AnalysisSQ />
    </MyDialog>
  </div>
</template>

<script setup>
import MyDialog from "@/components/ComDialog.vue";
import AnalysisSQ from "../components/mapage/sq/AnalysisSQ.vue";

import { ref } from "vue";

const showDialog = ref(false);
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
