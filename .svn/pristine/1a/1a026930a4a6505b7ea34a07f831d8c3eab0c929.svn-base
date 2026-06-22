<template>
        <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">入湖水量</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt"  style="height: calc(-9.60833rem + 33.3333vh);">
           <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <EchartSSTRSL :strJsonLHW="props.strJsonLHW" />
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
import Dialog from "@/api/utils/Dialog.js";

import { ref, onMounted, reactive, inject, provide, watch,defineAsyncComponent , h } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const trendsTooltip = ref();
const dateid = ref("EchartSSTRSL");
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
  var strParam ={
        "y": [
            "湖西区",
            "浙西区",
            "杭嘉湖区",
            "望虞河"
        ],
        "rhsl": [
            "75.9",
            "15.51",
            "3.86",
            "18.34"
        ],
        "hList": [
            "67.94",
            "21.64",
            "4.24",
            "7.17"
        ]
    };
    var  resultData=[];
    for(var i=0;i<strParam.y.length;i++){
        resultData.push({
           "rhsl": strParam.rhsl[i],
           "hList":strParam.hList[i],
           "name":strParam.y[i]
        });
    }
      var res={
    "result": resultData,
    "total": 9,
    "Message": "操作成功",
    "success": "true"
};
      const strJson = res.result; //sortObjectArray(res.result, ["drp"], "desc");
      strJson.filter(function(e,_index){
            var now = new Date();
            var tm = e.name
            e.tm=tm;
      });
      const result = strJson;

      const strNote = [];
  strNote.push({ name: "名称", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "2025", codename: "rhsl", tableV: "0", isShow: true });
  strNote.push({ name: "历史同期", codename: "hList", tableV: "0", isShow: true });
  var LineColor = ["#A0CA69","#00ECFF","#4AC1EC","#30B90F","#30B90F", "#50CAE1","#4AC1EC","#A8DBF0"];
  const _Option = ChartJs.chartCRSL(
    "",
    result,
    strNote,
    LineColor,
    "水量（亿方）",
    "Day",
    _theme,
    false
  );

//   const chartTM=strParam.y;
//   const chartSL=strParam.rhsl;
//   const chartSL2=strParam.hList;
//   const SLtotal=strParam.y;
//   const _Option=ChartJs.chartTotalRSL("", chartTM, chartSL,chartSL2, SLtotal, "数量", _theme);

  lineOption.value = _Option;
  datekey.value = Date.now();
}
function fangda(){
    
}
</script>
