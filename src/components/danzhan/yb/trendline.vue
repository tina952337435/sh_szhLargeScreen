<template>
<Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
</template>

<script setup>
import $ from "jquery";
import { onMounted, ref, provide, defineAsyncComponent, reactive,inject } from "vue";
import { useStore } from "vuex";
import { SetNull, groupBy, SumJson,sortObjectArray } from "@/api/ComUnit.js";

import dayjs from "dayjs";
import api from "@/api/mode/index.js";
import apizonglan from "@/api/zonglan/index.js";

import * as echarts from "echarts";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("PingGutrendline");
const typeValue = inject("typeValue");
onMounted(() => {
    getYLQUSHI();
});
function getYLQUSHI() {
  var strNote = [];
  strNote.push({ name: "时间", codename: "dd_TM", tableV: "0", isShow: true });
  strNote.push({
    name: "预报精度",
    codename: "dd_STATUS",
    tableV: "0",
    isShow: true
  });
  strNote.push({
    name: "降雨偏差",
    codename: "dd_DISTRIBY",
    tableV: "0",
    isShow: true
  });
  var LineColor = [
    "#00FF00",
    "#00E4FF",
    "#01DDFF",
    "#F9C823",
    "#0264FD",
    "#FE7923",
    "#8E30FF"
  ];
  var data=sortObjectArray(typeValue.value, ["dd_TM"], "asc");
  const _OptionYL = ChartJs.chartYBXS(
    "",
    data,
    strNote,
    LineColor,
    "(%)",
    "Mouth",
    _theme,
    55,
    14
  );

  lineOption.value = _OptionYL;
  datekey.value = Date.now();
}
</script>