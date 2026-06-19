<template>
        <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">近7年全市平均降水量</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
           <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <EchartQSJSL :strJsonLHW="props.strJsonLHW" />
    </ComZujian>
</template>

<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import SQTJ from "@/components/danzhan/sq/SQTJ.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ElMessage, ElTimePicker } from "element-plus";
import * as echarts from "echarts";

import { ref, onMounted, reactive, inject, provide, watch } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const trendsTooltip = ref();
const dateid = ref("EchartQSJSL");
const Riverswiper=ref("year");

const props = defineProps({
    strJsonLHW: {
        type: Array,
        default: () => []
    }
});
onMounted(() => {
    Weacontent();
});
function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
      var res={
    "result": [
        {
            "dyp": 48.0,
            "stnm": "2019",
            "drp": 1152.3
        },
        {
            "dyp": 99.5,
            "stnm": "2020",
            "drp": 1483.4
        },
        {
            "dyp": 69.7,
            "stnm": "2021",
            "drp": 1405.4
        },
        {
            "dyp": 0.2,
            "stnm": "2022",
            "drp": 1032.8
        },
        {
            "dyp": 0.0,
            "stnm": "2023",
            "drp":1239.8
        },
        {
            "dyp": 0.0,
            "stnm": "2024",
            "drp":1303.5
        },
        {
            "dyp": 0.0,
            "stnm": "2025",
            "drp": 734.8
        }
    ],
    "total": 9,
    "Message": "操作成功",
    "success": "true"
};
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
        "false",
        _theme
      );
      lineOption.value = _Option;
      datekey.value = Date.now();
}
</script>
