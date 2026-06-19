<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p1" id="title2">出入境水量统计</p>
        <span class="spanTitle"></span>
      </div>
    </div>
    <div class="txt">
      <div style="width: 45%; height: 100%; float: left">
        <div class="icontitle font-pangmen font-pangmenRU">
          <div class="title-name">入境水量</div>
        </div>
        <Echarts :width="'100%'" :height="'90%'" :option="lineOptionRu" :key="datekey" :id="dateidRu" />
      </div>
      <div style="width: 45%; height: 100%; float: left">
        <div class="icontitle font-pangmen font-pangmenRU">
          <div class="title-name">出境水量</div>
        </div>
        <Echarts :width="'100%'" :height="'90%'" :option="lineOptionChu" :key="datekey" :id="dateidChu" />
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 800px">
    <EchartYPSL />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import MyDialog from "@/components/ComDialog.vue";
import SLLineSTCD from "@/components/danzhan/sl/SLLineSTCD.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import * as echarts from "echarts";

import { ref, onMounted, provide } from "vue";
import { SetNull } from '@/api/ComUnit';
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOptionRu = ref({});
const lineOptionChu = ref({});
const trendsTooltipRu = ref();
const trendsTooltipChu = ref();
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
// 判断弹窗是否显示,默认隐藏
const showDialogSL = ref(false);
const titleNameSL = ref();
const pid = ref("");
const stime = ref("");
const etime = ref("");
const dateidRu = ref("Rusl");
const dateidChu = ref("Chusl");
const SLswiper = ref("YSL");
const SLDATA = ref({});
const props = defineProps({
  stcdVal: {
    type: String,
    default: "",
  },
  resultDataSL: {
    type: String,
    default: [],
  },
});
var myData = [];
function Weacontent() {
  // console.error(props.stcdVal, props.resultDataSL)
  var strJson = props.resultDataSL;
  var pieArrYSL = [];
  var pieArrPSL = [];
  if (strJson.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      var items = strJson[num];
      var accpw = items.accpw != undefined & "" != items.accpw ? Number(items.accpw).toFixed(0) : "0";
      var accdw = items.accdw != undefined & "" != items.accdw ? Number(items.accdw).toFixed(0) : "0";
      var stnm = items.stnm != undefined ? items.stnm : "—";
      // if (Number(accpw) > 0) {
      pieArrYSL.push({ "name": stnm, "value": accpw })
      // }
      // if (Number(accdw) > 0) {
      pieArrPSL.push({ "name": stnm, "value": accdw });
      // }
    }
  }
  var LineColor = [
    "#01F3FF",
    "#efc30a",
    "#00fd6d",
    "#4498FF",
    "#9C34FF",
    "#B5F320",
    "#FFDC26",
    "#00CCFB",
    "#FF8526",
  ];
  const _OptionRu = ChartJs.echartSLpei(dateidRu.value, pieArrYSL, LineColor, _theme);
  lineOptionRu.value = _OptionRu;
  let chartDomRu = document.getElementById(dateidRu.value);
  let myChartRu = echarts.init(chartDomRu);
  myChartRu.setOption(lineOptionRu.value);
  // myChartRu.on("click", eSLChage);
  // 动态显示tootip
  // 当前高亮图形所在下标
  let currentIndexRu = -1;
  // 取消之前高亮的图形
  if (trendsTooltipRu.value != null) {
    clearInterval(trendsTooltipRu.value);
  }
  trendsTooltipRu.value = setInterval(function () {
    let dataLenRu = lineOptionRu.value.series[0].data.length;
    myChartRu.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: currentIndexRu,
    });
    // 当前高亮图形
    currentIndexRu = (currentIndexRu + 3) % dataLenRu;
    myChartRu.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: currentIndexRu,
    });
    if (currentIndexRu >= lineOptionRu.value.series[0].data.length) {
      currentIndexRu = 0;
    }
  }, 1000);

  const _OptionChu = ChartJs.echartSLpei(dateidChu.value, pieArrPSL, LineColor, _theme);
  lineOptionChu.value = _OptionChu;
  let chartDomChu = document.getElementById(dateidChu.value);
  let myChartChu = echarts.init(chartDomChu);
  myChartChu.setOption(lineOptionChu.value);
  // myChartChu.on("click", eSLChage);
  // 动态显示tootip
  // 当前高亮图形所在下标
  let currentIndexChu = -1;
  // 取消之前高亮的图形
  if (trendsTooltipChu.value != null) {
    clearInterval(trendsTooltipChu.value);
  }
  trendsTooltipChu.value = setInterval(function () {
    let dataLenChu = lineOptionChu.value.series[0].data.length;
    myChartChu.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: currentIndexChu,
    });
    // 当前高亮图形
    currentIndexChu = (currentIndexChu + 3) % dataLenChu;
    myChartChu.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: currentIndexChu,
    });
    if (currentIndexChu >= lineOptionChu.value.series[0].data.length) {
      currentIndexChu = 0;
    }
  }, 1000);
  // datekey.value = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
}
function eSLChage(e) {
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateidRu.value = "Rusl1";
  dateidChu.value = "Chusl1";
}
onMounted(() => {
  Weacontent();
});
provide("pid", pid);
</script> 
<style scoped>
.text-xiaolv {
  height: 40px;
  width: auto;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--titled1);
  box-shadow: 0 0 10px var(--titled1), inset 0 0 10px var(--titled1);
  padding: 4px 10px;
  /* margin: 0px auto; */
  margin-top: 13px;
  line-height: 30px;
  color: var(--textXiaolv);
  float: left;
  margin-right: 10px;
}

.icontitle {
  margin-left: 50px;
  margin-top: 10px;
  color: var(--mtablecolor) !important;
}
</style>

