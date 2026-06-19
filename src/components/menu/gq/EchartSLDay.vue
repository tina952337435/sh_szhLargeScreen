<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()">逐日水量统计</p>
      </div>
      <div style="width:calc(100% - 150px);" class="div-swiper">
        <div class="swiper-slide" style="width: 25%;"
          :class="SLswiper == 'YJ' && 'swiper-slide swiper-slide-thumb-active'" @click="GetSL('YJ')">
          沿江各闸
        </div>
        <div class="swiper-slide" style="width: 25%;"
          :class="SLswiper == 'WYH' && 'swiper-slide swiper-slide-thumb-active'" @click="GetSL('WYH')">
          望虞河</div>
        <div class="swiper-slide" style="width: 25%;"
          :class="SLswiper == 'TPH' && 'swiper-slide swiper-slide-thumb-active'" @click="GetSL('TPH')">
          太浦河</div>
        <!-- <div class="swiper-slide" style="width: 25%;"
          :class="SLswiper == 'DBW' && 'swiper-slide swiper-slide-thumb-active'" @click="GetSL('DBW')">
          大包围</div> -->
      </div>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartSLDay />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import SLjinchu from "@/components/menu/sl/SLjinchu.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { groupBy } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive } from "vue";
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const SLDATA = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("SLDay");
const SLswiper = ref("YJ");
function Weacontent() {
  var nowTM = new Date();
  let endDate = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  let startDate = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  // if (Number(dayjs(nowTM).format("HH"))< 8) {
    startDate = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-7, "day")
      .format("YYYY-MM-DD HH:mm:ss");
  // }
  var strParam = {};
  strParam["pathname"] = "DAY";
  strParam["pid"] = "202410230021";
  strParam["pid"] = "202411100001";
  strParam["stime"] = startDate;
  strParam["etime"] = endDate;
  api
    .stPptnGQSLAll(strParam)
    .then((res) => {
      var strJson = res.result;
      SLDATA.value = strJson
      GetSL(SLswiper.value)
    });
}

function GetSL(obj) {
  SLswiper.value = obj;
  var strJson = SLDATA.value;
  if (obj == "YJ") {
    strJson = strJson.filter(function (e) {
      return e.STNM == "沿江各闸";
    })
  } else if (obj == "Ctiy") {
    strJson = strJson.filter(function (e) {
      return e.STNM == "城区水量";
    })
  } else if (obj == "YCH") {
    strJson = strJson.filter(function (e) {
      return e.STNM == "阳澄湖水量";
    })
  } else if (obj == "DBW") {
    strJson = strJson.filter(function (e) {
      return e.STNM == "防洪大包围枢纽";
    })
  }
  else if(obj == "TPH") {
    strJson = strJson.filter(function (e) {
      return e.STNM == "太浦河";
    })
  }
  else if(obj == "WYH") {
    strJson = strJson.filter(function (e) {
      return e.STNM == "望虞河";
    })
  }
  loadSL(strJson, obj);
}

function loadSL(strJson, obj) {
  var result = []
  if (strJson.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      var _strParam = {};
      _strParam["accdw"] = Number(strJson[num].accdw).toFixed(1);
      _strParam["accpw"] = Number(strJson[num].accpw).toFixed(1);
      _strParam["tm"] = strJson[num].TM;
      result.push(_strParam);
    }
  }
  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  if(obj!="TPH"){
    strNote.push({ name: "引水量", codename: "accpw", tableV: "0", isShow: true });
  }
  strNote.push({ name: "排水量", codename: "accdw", tableV: "0", isShow: true });
  var LineColor = ["#30B90F", "#50CAE1"];
  if(obj=="TPH"){
    LineColor = ["#50CAE1","#30B90F"];
  }
  const _Option = ChartJs.chartSL(
    "",
    result,
    strNote,
    LineColor,
    "水量",
    "Day",
    _theme,
    false
  );
if(_Option.series.length>0){
  for(var num=0;num<_Option.series.length;num++){
    _Option.series[num].label.normal.show = true;
  }
}
  lineOption.value = _Option;
  datekey.value = Date.now();
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "SLDay1";
}
onMounted(() => {
  Weacontent();
});
</script> 
