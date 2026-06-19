<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">圩区水位(单位:m)</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartGQSW />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("GQSW");

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["stcd"] = "23010037,23010010,23010034,23010011,23010018";
  api
    .stPptnGQSW(strParam)
    .then((res) => {
      const strJson = res.result;
      // if (strJson.length > 0) {
      const strNote = [];
      strNote.push({ name: "圩区名称", codename: "wqname", tableV: "0", isShow: true });
      strNote.push({ name: "安全水位", codename: "wqgrz", tableV: "0", isShow: true });
      strNote.push({ name: "警戒水位", codename: "wqwrz", tableV: "0", isShow: false });
      strNote.push({ name: "圩区水位", codename: "upz", tableV: "0", isShow: false });
      const _Option = ChartJs.chartWQSW("", strJson, strNote, _theme);

      lineOption.value = _Option;
      datekey.value = Date.now();
      // }
    })
    .catch((err) => {
      console.error(err);
    });
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "GQSW1";
}
onMounted(() => {
  Weacontent();
});
</script>
