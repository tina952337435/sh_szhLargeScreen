<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">水利分区预报水位过程线</p>


      <div class="xiala" style="right: 5px;top: 0px;position: absolute;width:70px;line-height: 30px;cursor: pointer;">
        <label id="hedaoTitle" @click="showItem('SWDBZLISTSLPQ')"
          style="margin-top: 4px;margin-right: 5px;font-size: 14px;font-family: var(--calcite-font-family);cursor: pointer;">
          滨湖区
        </label>
        <img src="/images/icon_select.png" style="position:absolute;right:0px;margin-top: 4px;cursor: pointer;"
          @click="showItem('SWDBZLISTSLPQ')">
        <ul class="el-dropdown-menu"
          style="width:66px;height:100px;overflow-y:auto;margin-top:5px;font-family: var(--calcite-font-family);"
          id="SWDBZLISTSLPQ">
          <!-- <li id="23010517">新沙区</li>
          <li id="23010518">虞西区</li> -->
          <li id="23010519">阳澄区</li>
          <li id="23010520">淀泖区</li>
          <li id="23010521">滨湖区</li>
          <li id="23010522">浦南区</li>
        </ul>
      </div>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <yubaoDanZhanLineChartSLPQ :DD_ARR="DD_ARR" :key="datekeyDialog" />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import { Postcard } from "@element-plus/icons-vue";

import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";

import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import * as echarts from "echarts";
import { SetNull, groupBy, GetSZStateBy, GetSZState } from "@/api/ComUnit.js";

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

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("yubaoSWLineSLPQ");

const datekeyDialog = ref(null);
const stcd = ref("23010521");

const props = defineProps({
  rainListAll: {
    type: Array,
    default: () => []
  },
  resultWQDATA: {
    type: Array,
    default: () => []
  },
  DD_ARRWQ: {
    type: Array,
    default: () => { }
  },
});
// var rainListAll = props.rainListAll; //调度方案编号

// watch(props, () => { Weacontent(); }, { deep: true });
onMounted(() => {
  if (props.resultWQDATA.length > 0) {
    Weacontent();
  }
  $("#SWDBZLISTSLPQ li").click(function (res) {
    $("#SWDBZLISTSLPQ").css("display", "none");
    var html = $(this).html();
    $("#SWDBZLISTSLPQ").parent().find("label").html(html);
    stcd.value = res.currentTarget.id;
    Weacontent();
  });
});

function Weacontent() {
  var rainListAll = props.resultWQDATA;
  if (rainListAll.length > 0) {
    var rainListTemp = rainListAll.filter(function (res) {
      return res.wqid == stcd.value;
    });
    // console.error("rainListTemprainListTemprainListTemp", rainListTemp)
    if (rainListTemp.length > 0) {
      JsonColumnChart(rainListTemp[0].waterList);
    }
  }
}

function JsonColumnChart(res) {
  // console.error("resresresres", res)
  const strJson = res;
  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "预报", codename: "dwz", tableV: "0", isShow: true });
  // strNote.push({ name: "实时", codename: "aqsw", tableV: "0", isShow: true });
  // strNote.push({ name: "警戒", codename: "WRZ", tableV: "0", isShow: false });
  // strNote.push({ name: "保证", codename: "GRZ", tableV: "0", isShow: false });
  var LineColor = [
    "#16FF8D",
    "#1CB8B2",
    "#01DDFF",
    "#F9C823",
    "#0264FD",
    "#FE7923",
    "#8E30FF",
  ];

  const _Option = ChartJs.chartSW(
    "yubaoSWLineSLPQ",
    strJson,
    strNote,
    LineColor,
    "水位",
    "Mouth",
    _theme, 55, 14
  );

  var chartDom = document.getElementById(dateid.value);
  let myChart = echarts.init(chartDom);
  myChart.clear();
  myChart.setOption(_Option);
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
  dateid.value = "yubaoSWLineSLPQ1";
}

function showItem(id) {
  var obj = $("#" + id);
  var dis = obj.css("display");
  if (dis == "block") {
    obj.css("display", "none");
  } else {
    obj.css("display", "block");
  }
}
</script>
<style scoped>
/* 自定义滚动条样式 */
.el-dropdown-menu::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.el-dropdown-menu::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.el-dropdown-menu::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: 0px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}
</style>