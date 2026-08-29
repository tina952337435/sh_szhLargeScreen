<template>
  <div class="m-box" style="position: relative">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">水利片蓄量</p>
    </div>
    <div class="txt">
      <Table
        :headers="tableHeaders"
        :rows="tableData"
        :key="datekey"
        class="m-table wq-table"
        :border="0"
        :cellspacing="0"
        :cellpadding="0"
        @click="handleclick"
      />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Table from "@/components/Table/Table.vue";
const props = defineProps({
  strJsonData: { type: Array, default: () => [] },
});

const tableHeaders = ref([
  { name: "stnm", label: "名称" },
  { name: "z", label: "水位(m)" },  
  { name: "xsl", label: "蓄量(百万m³)" },
  { name: "ssl", label: "余量(百万m³)" },
  { name: "bzNyl", label: "纳雨量(mm)" },
]);
const tableData = ref([]);

onMounted(() => {
  if (props.strJsonData.length > 0) {
    tableData.value = props.strJsonData.map((item) => ({
      stnm: item.slpName,
      z: parseFloat(item.sw).toFixed(2),
      ssl: parseFloat(item.bxsl).toFixed(1),
      bzNyl: item.bzNyl != null ? Number(item.bzNyl).toFixed(1) : "—",
      xsl: item.xsl != null ? Number(item.xsl).toFixed(1) : "—",
    }));
  }
});
</script>
