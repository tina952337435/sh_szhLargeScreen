<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">阳澄湖水量</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartSLYCH />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import SLjinchu from "@/components/menu/sl/SLjinchu.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive } from "vue";
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("SLych");

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["TREEID"] = "2021062714171915450";
  strParam["STIME"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss"))
    .add(-3, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
  strParam["ETIME"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  // api
  //   .stPptnRainsumtable(strParam)
  //   .then((res) => {
  // const strJson = sortObjectArray(res.data, ["DRP"], "desc");
  const strJson = [
    { tm: "2024/10/25", ysl: 642655.7, psl: 403966, TPZPS: 1486 },
    { tm: "2024/10/16", ysl: 602655.7, psl: 382396.6, TPZPS: 1901 },
    { tm: "2024/10/17", ysl: 592655.7, psl: 378966, TPZPS: 1685 },
    { tm: "2024/10/18", ysl: 622655.7, psl: 391966, TPZPS: 1322 },
    { tm: "2024/10/19", ysl: 612655.7, psl: 399966, TPZPS: 1935 },
    { tm: "2024/10/20", ysl: 602655.7, psl: 413966.5, TPZPS: 1702 },
    { tm: "2024/10/21", ysl: 612655.5, psl: 403966.5, TPZPS: 794 },
  ];
  // if (strJson.length > 0) {
  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "入水量", codename: "ysl", tableV: "0", isShow: true });
  strNote.push({ name: "出水量", codename: "psl", tableV: "0", isShow: true });
  var LineColor = ["#30B90F", "#50CAE1"];
  const _Option = ChartJs.chartSL(
    "",
    strJson,
    strNote,
    LineColor,
    "水量",
    "Day",
    _theme,
    true
  );

  lineOption.value = _Option;
  datekey.value = Date.now();
}

function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 90 });
  $(".g-lside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "SLych1";
}
onMounted(() => {
  Weacontent();
});
</script>
