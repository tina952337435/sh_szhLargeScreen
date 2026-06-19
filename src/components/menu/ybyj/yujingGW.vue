<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">下穿立交预警</p>
    </div>
    <div class="txt" style="overflow-y: auto">
      <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table " :border="0" :cellspacing="0"
        :cellpadding="0" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <yujingGW />
  </ComZujian>
</template>

<script setup>
import ComZujian from "@/components/ComZujian.vue";
import { Postcard } from "@element-plus/icons-vue";

import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";

import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull } from "@/api/ComUnit.js";

import {
  onMounted,
  ref,
  shallowRef, 
  defineAsyncComponent,
  nextTick,
  provide,
  inject,
  watch
} from "vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");

const tableHeaders = ref(null);
tableHeaders.value = [
  { name: "stnm", label: "风险点名称" },
  { name: "dept", label: "积水深度(cm)" },
  { name: "showtrue", label: "达标情况" }
];

const titleName = ref();
const titleNameLine = ref();
const showDialog = ref(false);

const props = defineProps({
  DD_ARR: {
    type: String,
    default: ""
  },
  wqstrJson: {
    type: Array,
    default: []
  },
});
var DD_ARR = props.DD_ARR; //调度方案编号
var wqstrJson = props.wqstrJson;
const tableData = ref([]);
watch(props.wqstrJson, () => {
  Weacontent();
});

onMounted(() => {
  Weacontent();
});
function Weacontent() {
  api.XLJBASESelectList({}).then(res => {
    tableData.value = res.result.filter(function (e) {
      if (SetNull(e.standard) == "重现期不达标" || SetNull(e.standard) == "客水汇入") {
        e.showtrue = "不达标";
      } else {
        e.showtrue = "达标";
      }
      return e;
    });
  }).catch(err => { });
  // var dataResult = [
  //   { stnm: "桑田岛东延路下穿立交", biaozhun: "20年一遇", grade: "安全" },
  //   { stnm: "海关路下穿立交", biaozhun: "30年一遇", grade: "安全" },
  //   { stnm: "戴巷路（职中路）下穿立交", biaozhun: "30年一遇", grade: "安全" },
  //   { stnm: "老宅路下穿立交", biaozhun: "20年一遇", grade: "安全" },
  //   { stnm: "G346华昌路下穿立交", biaozhun: "10年一遇", grade: "安全" },
  //   { stnm: "S228杨塘路主线下穿立交", biaozhun: "10年一遇", grade: "安全" },
  //   { stnm: "S228西塘路主线下穿立交", biaozhun: "10年一遇", grade: "安全" },
  //   { stnm: "S604沪通铁路下穿立交", biaozhun: "10年一遇", grade: "安全" },
  //   { stnm: "S604港华路下穿立交", biaozhun: "10年一遇", grade: "安全" },
  // ];
  // tableData.value = dataResult;
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialog.value = true;
}
</script>
<style src="@/assets/styles/Table.css"></style>