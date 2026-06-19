<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" v-if="showClick" @click="fangda()">片区面雨量</p>
        <span class="spanTitle"></span>
      </div>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" style="width: 70%; height: 700px">
    <EchartZLYQDay />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import EchartZLYQDay from "@/components/menu/yq/EchartZLYQDay.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray,SetNull } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import apityphoon from "@/api/typhoon/index.js";

import { ref, onMounted, reactive, inject,defineProps } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showClick = ref(true)
const dateid = ref("daydrp");
const Drpswiper = ref("YL3");
const stime = ref({});
const etime = ref({});
const props = defineProps({
  strJsonData: {
    type: String,
    default: '',
  },
});
function Weacontent() {
  var strParam = {};
  strParam["startdate"] = stime.value;
  strParam["enddate"] = etime.value;
  strParam["pid"] = "行政分区";
  apityphoon
    .ZHUANTIAreaJYDay(strParam)
    .then((res) => {
      const result = res.data; 
      const strNote = [];
      strNote.push({ name: "名称", codename: "areaname", tableV: "0", isShow: true });
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
  dateid.value = "daydrp1";
}

onMounted(() => {  
  if (SetNull(props.strJsonData)!="") {
    if (SetNull(props.strJsonData.stm)!=""){    
      console.error(SetNull(props.strJsonData),props.strJsonData);
      stime.value =props.strJsonData.stm;
      etime.value =props.strJsonData.etm;
      Weacontent();
    }
  }
});
</script> 
