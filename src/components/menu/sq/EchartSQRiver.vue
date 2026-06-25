<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()">河道水位线</p>
        <span class="spanTitle"></span>
      </div>
      <div style="width:calc(100% - 250px);" class="div-swiper">
        <div class="swiper-slide" style="width: 50%;"
          :class="Riverswiper == 'HPJ' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('HPJ')">
          黄浦江
        </div>
        <div class="swiper-slide" style="width: 50%;"
          :class="Riverswiper == 'SZH' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('SZH')">
          苏州河</div>
      </div>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartSQRiver />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import EchartSQRiverDong from "@/components/menu/sq/EchartSQRiverDong.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import { ElButton } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";
import * as echarts from "echarts";
import { ref, onMounted, defineAsyncComponent, onUnmounted, h } from "vue";
import Dialog from "@/api/utils/Dialog.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("danzhanhour");
const Riverswiper = ref("HPJ");
const pid = ref("2021082417454958999-1");

function Weacontent() {
  var nowTM = new Date();
  var endDate = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  var startDate = dayjs(dayjs(endDate).format("YYYY-MM-DD HH:mm:ss"))
    .add(-3, "hour")
    .format("YYYY-MM-DD HH:mm:ss");

  var strParam = {};
  strParam["pid"] = pid.value;
  strParam["stime"] = startDate;
  strParam["etime"] = endDate;
  api.stPptnSQRiver(strParam).then((res) => {    
    const strJson = res.data;
    if (strJson.length > 0) {
      for (var numII = 0; numII < strJson.length; numII++) {
        var tempItem = strJson[numII];
        if (SetNull(tempItem["upz"]) != "") {
          if (Number(tempItem["upz"]) == 0) {
            if (Number(tempItem["dwz"]) > 0) {
              tempItem["upz"] = tempItem["dwz"];
            }
          }
        }
      }
    }
    var strNote = [];
    if (strJson.length > 0) {
      strNote.push({ "name": "", "codename": "1", "tableV": "1", "isShow": true, "width": "20%" });
      strNote.push({ "name": strJson[0].stnm, "codename": strJson[0].stcd, "tableV": "1", "isShow": true, "width": "20%" })

      for (var num = 1; num < strJson.length; num++) {
        for (var i = 0; i < parseInt(Number(strJson[num].distance) / 1000); i++) {
          strNote.push({ "name": "", "codename": (i + 1), "tableV": "1", "isShow": true, "width": "20%" });
        }

        var stnmNew=strJson[num].stnm.indexOf("（")>-1?strJson[num].stnm.substring(0,strJson[num].stnm.indexOf("（")):strJson[num].stnm;

        strNote.push({ "name": stnmNew, "codename": strJson[num].stcd, "tableV": "1", "isShow": true, "width": "20%" });
      }
      strNote.push({ "name": "", "codename": "13", "tableV": "1", "isShow": true, "width": "20%" });
    }
    // console.error('strNote',strNote);
    const _Option = ChartJs.chartHD("", strJson, strNote, _theme,true);
    if (pid.value == "2024103110210061872") {
      _Option.grid.bottom = 30;
    } else if (pid.value == "2023061517201546817") {
      _Option.grid.bottom = 15;
    }
    lineOption.value = _Option;
    datekey.value = Date.now();
    let chartDom = document.getElementById(dateid.value);
    let myChart = echarts.init(chartDom);
    myChart.clear();
    // myChart.resize();
    myChart.setOption(lineOption.value);
  }).catch((err) => { console.error(err); });
}
function GetRiver(obj) {
  Riverswiper.value = obj;
  if (obj == "HPJ") {
    pid.value = "2021082417454958999-1"
  } else if (obj == "SZH") {
    pid.value = "2021082417454958999-2"
  }
   Weacontent();
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "danzhanhour1";
}
onMounted(() => {
  Weacontent();
});
</script> 
<style scoped>
:deep(.el-button span) {
  padding-left: 0px;
}
</style>

