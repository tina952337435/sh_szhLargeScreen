<template>
<Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
</template>

<script setup>
import $ from "jquery";
import { onMounted, ref, provide, defineAsyncComponent, reactive,inject,defineProps } from "vue";
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
const dateid = ref("PingYBYQBar");
const props = defineProps({
  dd_ID: {
    type: String,
    default: "",
  },
  dd_NAME: {
    type: String,
    default: "",
  }
});

onMounted(() => {
    Weacontent();
});
function Weacontent(){
  var strParam = {
		pid: props.dd_ID,
		datasource: "0",
		pathname: "day"
	};
	api
		.loadModeZhanDianDataBind(strParam)
		.then(res => {
			var dataResult = res.result;
			if (dataResult != [] && dataResult != null) {
				getYLQUSHI(dataResult);
			}
		})
		.catch(err => { });
}
function getYLQUSHI(data) {
  data=sortObjectArray(data, ["TM"], "asc");
  
  var strNote = [];
  strNote.push({ name: "时间", codename: "TM", tableV: "0", isShow: true });
  strNote.push({
    name: "预报",
    codename: "1744830539",
    tableV: "0",
    isShow: true
  });
  strNote.push({
    name: "实测",
    codename: "1744830562",
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
  const _OptionYL = ChartJs.chartYBYL(
    "",
    data,
    strNote,
    LineColor,
    "雨量",
    "Day",
    _theme,
    true
  );
  lineOption.value = _OptionYL;
  datekey.value = Date.now();
}
</script>