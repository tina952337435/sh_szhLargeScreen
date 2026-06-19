<template>
        <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">出入水量</p>
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
           "accpw": 3921,
           "accdw": 2488
        },
        {
            "accpw": 3610,
            "accdw": 2732
        },
        {
            "accpw": 3029,
            "accdw": 2735
        },
        {
            "accpw": 3523,
            "accdw": 3089
        },
        {
            "accpw": 3574,
            "accdw": 2772
        },
        {
            "accpw": 3717,
            "accdw": 2935
        },
        {
            "accpw": 4098,
            "accdw": 2557
        }
    ],
    "total": 9,
    "Message": "操作成功",
    "success": "true"
};
      const strJson = res.result; //sortObjectArray(res.result, ["drp"], "desc");
      strJson.filter(function(e,_index){
            var now = new Date();
            var tm = dayjs(now).add(_index-strJson.length, "day").format("YYYY-MM-DD HH:mm:ss");
            e.tm=tm;
      });
      const result = strJson;

      const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "入水量", codename: "accpw", tableV: "0", isShow: true });
  strNote.push({ name: "出水量", codename: "accdw", tableV: "0", isShow: true });
  var LineColor = ["#30B90F", "#50CAE1"];
  const _Option = ChartJs.chartSL(
    "",
    result,
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
</script>
