<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">河道过程线</p>

      <div style="width:calc(100% - 175px);" class="div-swiper">
        <div class="swiper-slide" style="width: 25%;"
          :class="Riverswiper == 'SNYH' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('SNYH')">
          苏南运河
        </div>
        <div class="swiper-slide" style="width: 25%;"
          :class="Riverswiper == 'WYH' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('WYH')">
          望虞河</div>
        <!-- <div class="swiper-slide" style="width: 25%;"
          :class="Riverswiper == 'WSJ' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('WSJ')">
          吴淞江</div> -->
        <div class="swiper-slide" style="width: 25%;"
          :class="Riverswiper == 'TPH' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('TPH')">
          太浦河</div>
      </div>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <yubaoRiverLineChart :riverResult="riverResult" :key="datekeyDialog" />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import { Postcard } from "@element-plus/icons-vue";

import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";

import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy, GetSZStateBy, GetSZState } from "@/api/ComUnit.js";
import * as echarts from "echarts";

import {
  onMounted,
  ref,
  shallowRef, 
  defineAsyncComponent,
  nextTick,
  provide,
  inject,
  watch
} from "vue";

// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();
const showDialog = ref(false);


const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("yubaoRiverLine");
const Riverswiper = ref("SNYH");


const datekeyDialog = ref(null);

const _theme = localStorage.getItem("curTheme");

var myData = [];

const props = defineProps({
  DD_ARR: {
    type: String,
    default: ""
  },
  riverResult: {
    type: Array,
    default: []
  },
});
var DD_ARR = props.DD_ARR; //调度方案编号
var riverResult = props.riverResult;

var stcdsARR = [
  { typeid: "SNYH", stnm: "苏南运河", stcds: "63201300,63203000,63203050,63205350" },//望亭（太）、枫桥、苏州（二）、平望
  { typeid: "WYH", stnm: "望虞河", stcds: "63204260,63204250,63201320,63201300" },//张桥、甘露、琳桥、望亭（太）
  { typeid: "WSJ", stnm: "吴淞江", stcds: "" },
  { typeid: "TPH", stnm: "太浦河", stcds: "63201050,63205350,1905" },//大浦口、平望、金泽
];

watch(props.riverResult, () => {
  Weacontent();
});

onMounted(() => {
  if (props.riverResult != undefined) {
    Weacontent();
  }
});

function Weacontent() {
  var stcdsARRTemp = stcdsARR.filter(function (res) {
    return res.typeid == Riverswiper.value;
  });
  var strJson = props.riverResult;
  if (strJson.length > 0) {
    var stcds = stcdsARRTemp[0].stcds;
    var stcdsArr = stcds.split(',');
    strJson = strJson.filter(function (res) {
      res.upz = res.data;
      return stcds.indexOf(res.stcd) > -1;
    });

    var strNote = [];
    if (strJson.length > 0) {
      strNote.push({ "name": "", "codename": "1", "tableV": "1", "isShow": true, "width": "20%" });
      var strJsonTemp = strJson.filter(function (res) {
        return stcdsArr[0] == res.stcd;
      });
      if (strJsonTemp.length > 0) {
        strNote.push({ "name": strJsonTemp[0].stnm, "codename": strJsonTemp[0].stcd, "tableV": "1", "isShow": true, "width": "20%" })
      }
      for (var num = 1; num < stcdsArr.length; num++) {
        strJsonTemp = strJson.filter(function (res) {
          return stcdsArr[num] == res.stcd;
        });
        if (strJsonTemp.length > 0) {
          for (var i = 0; i < parseInt(Number(strJsonTemp[0].distance) / 1000); i++) {
            strNote.push({ "name": "", "codename": (i + 1), "tableV": "1", "isShow": true, "width": "20%" });
          }
          strNote.push({ "name": strJsonTemp[0].stnm, "codename": strJsonTemp[0].stcd, "tableV": "1", "isShow": true, "width": "20%" });
        }

      }
      strNote.push({ "name": "", "codename": "13", "tableV": "1", "isShow": true, "width": "20%" });
    }
    // console.error('strNote',strNote,'strJson',strJson);
    const _Option = ChartJs.chartHD("", strJson, strNote, _theme);
    lineOption.value = _Option;
    let chartDom = document.getElementById(dateid.value);
    let myChart = echarts.init(chartDom);
    myChart.clear();
    myChart.setOption(lineOption.value);
  }
}
function fangda() {
  datekeyDialog.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "yubaoAreaDiv1";
}
function GetRiver(obj) {
  Riverswiper.value = obj;
  // if (obj == "SNYH") {
  //   pid.value = "2024103110190061872"
  // } else if (obj == "WYH") {
  //   pid.value = "2024103110210061872"
  // } else if (obj == "WSJ") {
  //   pid.value = "2023061517201546817"
  // } else if (obj == "TPH") {
  //   pid.value = "2024103110260061872"
  // }
  Weacontent();
}
</script>
 