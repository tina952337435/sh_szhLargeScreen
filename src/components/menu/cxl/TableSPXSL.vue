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
import {
  SetNull,
  sortObjectArray,
  getWindDirectionName,
  groupBy,
} from "@/api/ComUnit.js";
const props = defineProps({
  strJsonData: { type: Array, default: () => [] },
});

const tableHeaders = ref([
  { name: "stnm", label: "名称" },
  { name: "z", label: "水位(m)" },
  { name: "ssl", label: "蓄量余量(百万m³)" },
  // { name: "drp", label: "纳雨能力(mm)" },
]);
const tableData = ref([]);

onMounted(() => {
  if (props.strJsonData.length > 0) {
    var dataG = groupBy(props.strJsonData, "id");
    var data = [];
    dataG.forEach((item) => {
      var obj = {};
      obj.stnm = item[0].name.replace("槽蓄", "");
      obj.z = parseFloat(item[item.length - 1].upz).toFixed(2);
      obj.ssl =parseFloat(item[item.length - 1].bxsl).toFixed(1);
      // obj.drp=item[item.length-1].drp;
      data.push(obj);
    });
    tableData.value = data;
  }
});
</script>
