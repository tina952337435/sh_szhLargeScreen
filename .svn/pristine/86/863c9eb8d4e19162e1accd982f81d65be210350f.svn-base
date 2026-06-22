<template>
  <div class="m-box">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">区镇降雨</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <Echarts
        :width="'100%'"
        :height="'100%'"
        :option="lineOption"
        :key="datekey"
        :id="dateid"
      />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian
    :showDialog="showDialog"
    @close="showDialog = false"
    :title="titleName"
    :typeValue="typeValue"
    style="width: 70%; height: 700px"
  >
    <EchartYQQZDrp />
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
const dateid = ref("qzdrp");

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = "2023052903053732314";
  strParam["stime"] = "2024-01-01 00:00:00";
  strParam["etime"] = "2024-08-31 23:59:59";
  // strParam["STIME"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss"))
  //   .add(-3, "hour")
  //   .format("YYYY-MM-DD HH:mm:ss");
  // strParam["ETIME"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  api
    .stPptnRainDay(strParam)
    .then((res) => {
      const strJson = res.result; //sortObjectArray(res.result, ["drp"], "desc");
      const result = [];
      // if (strJson.length > 0) {
      for (let num = 0; num < strJson.length; num++) {
        const item = strJson[num];
        let strParam = {};
        strParam["stnm"] = item["stnm"];
        strParam["drp"] = item["drp"];
        result.push(strParam);
      }
      const strNote = [];
      strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
      strNote.push({ name: "雨量", codename: "drp", tableV: "0", isShow: true });
      var LineColor = [
        "#3E8BFF",
        "#1CB8B2",
        "#01DDFF",
        "#F9C823",
        "#0264FD",
        "#FE7923",
        "#8E30FF",
      ];
      const _Option = ChartJs.chartYL(
        "",
        result,
        strNote,
        LineColor,
        "雨量",
        "true",
        _theme
      );
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
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "qzdrp1";
}
onMounted(() => {
  Weacontent();
});
</script>
