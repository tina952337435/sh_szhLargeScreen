<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2">日降雨量</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="daydrp" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script setup>
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";

import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = "2024060516432392160";
  strParam["stime"] = "2024-01-01 00:00:00";
  strParam["etime"] = "2024-08-08 23:59:59";
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
      let numDay = 10;
      if (strJson.length < numDay) {
        numDay = strJson.length;
      }
      for (let num = 0; num < numDay; num++) {
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
onMounted(() => {
  Weacontent();
});
</script>
