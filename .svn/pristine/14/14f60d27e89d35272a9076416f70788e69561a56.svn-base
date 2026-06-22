<template>
        <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">水资源量</p>
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
import Dialog from "@/api/utils/Dialog.js";

import { ref, onMounted, reactive, inject, provide, watch,defineAsyncComponent , h } from "vue";
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
           "accpw": 65.52,
           "accdw": 94.28,
           "pjsl": 94.28,
           "name":"降水总量"
        },
        {
            "accpw": 50.85,
            "accdw": 46.61,
            "pjsl": 26.91,
            "name":"地表水资源量"
        },
        {
            "accpw": 58.85,
            "accdw": 53.35,
            "name":"水资源总量"
        },
        // {
        //     "accdw": 10.65,
        //     "name":"地下水资源量"
        // },
        // {
        //     "accpw": 165.52,
        //     "accdw": 200.7,
        //     "name":"太湖来水量"
        // },
        // {
        //     "accpw": 165.52,
        //     "accdw": 10.65,
        //     "name":"长江干流来水量"
        // }
    ],
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
  strNote.push({ name: "2025", codename: "accpw", tableV: "0", isShow: true });
  strNote.push({ name: "2024", codename: "accdw", tableV: "0", isShow: true });
  strNote.push({ name: "多年平均", codename: "pjsl", tableV: "0", isShow: true });
  var LineColor = ["#A8DBF0","#4AC1EC","#30B90F","#30B90F", "#50CAE1","#4AC1EC"];
  const _Option = ChartJs.chartSL(
    "",
    result,
    strNote,
    LineColor,
    "水量（亿方）",
    "Day",
    _theme,
    false
  );
  lineOption.value = _Option;
  datekey.value = Date.now();
}
function fangda(){
}
</script>
