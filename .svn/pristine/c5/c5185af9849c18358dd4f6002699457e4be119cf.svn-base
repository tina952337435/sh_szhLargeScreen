<template>
  <div class="m-box m-box-small">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">超警超保统计</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>

  <ComZujian :showDialog="showDialogZJ" @close="showDialogZJ = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <riverdmarea />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
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

import { onMounted, ref, shallowRef, defineAsyncComponent, nextTick, provide, inject, watch } from "vue";

import tbaSQ from "@/assets/json/tbaSQ.json";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showDialogLine = ref(false);
const showDialogZJ = ref(false);
const shuju = ref();
// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();

// 判断弹窗是否显示,默认隐藏
const showDialogSZ = ref(false);
const titleNameSZ = ref();

const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("WaterQualityArea");
var WaterQualitydata = inject("WaterQualitydata");
const areaname = ref(null);
const szType = ref("3");

const props = defineProps({
  WaterQualitydataAll: {
    type: Array,
    default: () => []
  },
});

watch(props.WaterQualitydataAll, () => {
  Weacontent();
});


function Weacontent() {
  // WaterQualitydata.value = props.WaterQualitydataAll;
  bindData()
}

function bindData() {
  var strJson = groupBy(tbaSQ, "sttp");
  var pieArrNew = [];
  if (strJson.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      var strWhereNew = {};
      // var wrznum = 0, grznum = 0;
      // for (var i = 0; i < strJson[num].length; i++) {
      //   var upz = SetNull(strJson[num][i].upz);
      //   var wrz = SetNull(strJson[num][i].wrz);
      //   var grz = SetNull(strJson[num][i].grz);
      // }
      var wrzstrJson = strJson[num].filter(function (item) {
        return SetNull(item.upz) != "" && SetNull(item.wrz) != "" && Number((item.upz)) > Number((item.wrz));
      });
      var grzstrJson = strJson[num].filter(function (item) {
        return SetNull(item.upz) != "" && SetNull(item.grz) != "" && Number((item.upz)) > Number((item.grz));
      });
      if (SetNull(strJson[num][0].sttp) == "") {
        continue;
      }
      strWhereNew["wrznum"] = wrzstrJson.length;
      strWhereNew["grznum"] = grzstrJson.length;
      strWhereNew["name"] = strJson[num][0].sttp;
      pieArrNew.push(strWhereNew);
    }
  }
  var LineColor = ['#F6903D', '#D95053'];
  var strNote = [
    { name: "方案", codename: "name", tableV: "1", isShow: true, width: "40%" },
    { name: "超警戒(汛限)", codename: "wrznum", tableV: "1", isShow: true, width: "40%" },
    { name: "超保证(设计)", codename: "grznum", tableV: "1", isShow: true, width: "40%" }
  ];
  // const _Option = ChartJs.chartYL("", pieArrNew, strNote, LineColor, "个数", "true", _theme, "", "", 0);
  const _Option = ChartJs.chartCJCBTJ("", pieArrNew, strNote, LineColor, "数量(个)", _theme);
  lineOption.value = _Option;
  let chartDom = document.getElementById(dateid.value);
  let myChart = echarts.init(chartDom);
  myChart.setOption(lineOption.value);
  myChart.on("click", eSLChage);
}
//饼图点击事件
function eSLChage(e) {
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialogSZ.value = true;
  titleNameSZ.value = e.name;
  areaname.value = e.name;
}
onMounted(() => {
  Weacontent();
});

function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialogZJ.value = true;
  dateid.value = "WaterQualityArea1";
}
</script>
