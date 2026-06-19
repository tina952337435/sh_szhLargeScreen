<template>
  <div class="m-box"> 
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">代表站场次降雨排序</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table FirstTable" :border="0"
        :cellspacing="0" :cellpadding="0"/>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <DrpTablePX :typenameRadio="props.typenameRadio" />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray,SumJson } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import customTable from "@/components/Table/customTable.vue";
import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const JYTitle = ref("场次降雨");
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const pid = ref("201901101419326076-2");
const stime = ref(null);
const etime = ref(null);
const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
});
const tableData = ref([]);
const tableHeaders = ref([
  { name: "sortnum", label: "序号" },
  { name: "stnm", label: "站名" },
  { name: "dyp", label: "雨量(mm)" },  
  { name: "rank", label: "排名" },   
  { name: "stormtotal", label: "总场次" },
]);
function Weacontent() {
  var strParam = {
    pid:pid.value,
    stime:stime.value,
    etime:etime.value,
  };
  window.loadingShow();
  api
    .getEventRain32(strParam)
    .then((res) => {
      const jsondata = res.data; 
      tableData.value = jsondata;
      bindData();
      window.loadingHide();
    })
    .catch((err) => {
      console.error(err);
    });
}
function bindData() {
  var dataNew=tableData.value;
  dataNew.filter(function(e,_index){
      e.sortnum=_index+ 1;
      e.dyp=Number(e.dyp).toFixed(1);
      e.drp=Number(e.drp).toFixed(1);
  });
  tableData.value=dataNew;
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
onMounted(() => {
  var now = new Date();
  stime.value = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
      .add(-72, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  Weacontent();
});

function showItem(id) {
  var obj = $("#" + id);
  var dis = obj.css("display");
  if (dis == "block") {
    obj.css("display", "none");
  } else {
    obj.css("display", "block");
  }
}
</script>
<style scoped>
/* .g-lside {
  z-index: 99 !important;
}
.g-rside {
  z-index: 90 !important;
} */
</style>
