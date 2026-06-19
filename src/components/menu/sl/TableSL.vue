<template>
  <div class="m-box m-box-1" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p1" id="title2">{{ SLTitle }}</p>
    </div>
    <div class="txt">
      <div class="slTable" style="height: calc(100% - 55px); overflow-y: auto">
        <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table" :border="0" :cellspacing="0"
          :cellpadding="0" />
      </div>
      <div v-html="slTableTotal"></div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script setup>
import customTable from "@/components/Table/customTable.vue";
import dayjs from "dayjs";

import { ref, onMounted, reactive } from "vue";
import { SetNull } from "@/api/ComUnit";
const datekey = ref(null);
const tableHeaders = [
  { name: "stnm", label: "分段名称" },
  { name: "accpw", label: "入境水量(万m³)" },
  { name: "accdw", label: "出境水量(万m³)" },
];
const tableData = ref([]);
const props = defineProps({
  stnmVal: {
    type: String,
    default: "",
  },
  resultDataSL: {
    type: String,
    default: [],
  },
});
const slTableTotal = ref();
const SLTitle = ref('');
function Weacontent() {
  var strJson = props.resultDataSL;
  if (SetNull(props.stnmVal) != "") {
    SLTitle.value = props.stnmVal + "水量月报";
  }
  // console.error(props.stnmVal, props.resultDataSL)

  var accpwSum = 0, accdwSum = 0;
  if (strJson.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      var items = strJson[num];
      var accpw = items.accpw != undefined & "" != items.accpw ? Number(items.accpw).toFixed(0) : "0";
      var accdw = items.accdw != undefined & "" != items.accdw ? Number(items.accdw).toFixed(0) : "0";
      var stnm = items.stnm != undefined ? items.stnm : "—";
      if (SetNull(accpw) != "") {
        accpwSum += Number(accpw);
      }
      if (SetNull(accdw) != "") {
        accdwSum += Number(accdw);
      }

      tableData.value.push({ "stnm": stnm, "accpw": accpw, "accdw": accdw, });

      var paiBili = "";
      paiBili =
        '	<div class="text-xiaolv" style="width:auto;margin:13px 10px 0px 20px">';
      paiBili += '		<span style="padding-left:8px;">累计水量</span>（';
      paiBili +=
        '		<span style="padding-left:5px;">入境：</span><span class="gradient-text text-22 text-white">' +
        accpwSum +
        '</span> <span class="text-14 text-gray-500 text-gray-danwei">万m³</span>';
      paiBili +=
        '		<span style="padding-left:5px;">出境：</span><span class="gradient-text text-22 text-white">' +
        accdwSum +
        '</span> <span class="text-14 text-gray-500 text-gray-danwei">万m³</span>';
      paiBili += "		）";
      paiBili += "	</div>";
      slTableTotal.value = paiBili;
      datekey.value = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    }
    // console.error(tableData.value)
  }
}
onMounted(() => {
  Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style>
tr td:nth-child(1) {
  width: 16vh;
}

tr td:nth-child(2) {
  width: 10vh;
}

tr td:nth-child(3) {
  width: 10vh;
}

tr td:nth-child(4) {
  width: 10vh;
}

tr td:nth-child(5) {
  width: 12vh;
}

/* 自定义滚动条样式 */
.slTable::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.slTable::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.slTable::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--popContentHeadbg);
  z-index: 2;
}

.text-xiaolv {
  height: 40px;
  width: 135px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--titled1);
  box-shadow: 0 0 10px var(--titled1), inset 0 0 10px var(--titled1);
  padding: 4px 10px;
  /* margin: 0px auto; */
  margin-top: 13px;
  line-height: 30px;
  color: var(--titled1);
  float: left;
  margin-right: 10px;
}

.text-22 {
  font-size: 22px;
}

.text-white {
  --text-opacity: 1;
  color: var(--mtablecolor);
}

.gradient-text {
  font-family: "number";
}
</style>
