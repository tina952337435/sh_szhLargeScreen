<template>
  <div class="m-box"> 
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">面雨量小时过程</p>
      <div style="width: calc(100% - 220px)" class="div-swiper">
        <div
          class="swiper-slide"
          style="width:33%"
          :class="
            Drpswiper == '12小时' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('12小时')"
        >
          12小时
        </div>
        <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '24小时' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('24小时')"
        >
          24小时
        </div>
        <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '场次降雨' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('场次降雨')"
        >
          场次降雨
        </div>
      </div>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
       <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartQZDrpAreaGC :typenameRadio="props.typenameRadio" />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray,SumJson,groupBy } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import customTable from "@/components/Table/customTable.vue";
import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const JYTitle = ref("24小时");
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("daydrpAvgGC");
const pid = ref("2024060516432392160");
const stime = ref(null);
const etime = ref(null);
const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
});
const tableData = ref([]);

const Drpswiper = ref("12小时");
function Weacontent() {
    var strParam = {};
    strParam["pid"] = "201901101419326076-1-1";
    strParam["stime"] = stime.value;
    strParam["etime"] = etime.value;
    strParam["datasource"] = "BX";
    strParam["pathname"] = "5";
    api
    .selectListHourlyArea(strParam)
    .then((res) => {
        loadYLGC(res.data);
    })
    .catch((err) => {
      console.error(err);
    });    
}
function loadYLGC(data){    
    var dataNew=data;
    const strNote = [];
    strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
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
    dataNew,
    strNote,
    LineColor,
    "雨量",
    "false",
    _theme,
    "",
    "Hours",
    null,
    true
    );
    lineOption.value = _Option;
    datekey.value = Date.now();
}

function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "daydrpAvg1";
}
onMounted(() => {
  qiehuan(Drpswiper.value);
});

function qiehuan(stcd) {
  Drpswiper.value = stcd;  
  var hour= Drpswiper.value.replace("小时","");
  var now = new Date();
  stime.value = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
      .add(-hour, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
//   alert(stime.value);
  Weacontent();
}
</script>
<style scoped>
/* .g-lside {
  z-index: 99 !important;
}
.g-rside {
  z-index: 90 !important;
} */
</style>
