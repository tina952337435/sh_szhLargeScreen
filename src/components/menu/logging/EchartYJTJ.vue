<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()">预警统计</p>
        <span class="spanTitle"></span>
      </div>
    </div>
    <div class="txt">
      <div style="width: 40%; height: 70%; float: left;margin-top: 3%;;margin-left:5%">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionXLJ" :key="datekeyXLJ" :id="dateidXLJ" />
        <div style="text-align: center;font-size: 1.2rem;color: var(--mtablecolor);margin-top: 3%">下立交预警统计</div>
      </div>
      <div style="width:40%;height: 70%;margin-left:50%;margin-top:3%;">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionGW" :key="datekeyGW" :id="dateidGW" />
        <div style="text-align: center;font-size: 1.2rem;color: var(--mtablecolor);margin-top: 3%">管网溢流统计</div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartYJTJ />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import MyDialog from "@/components/ComDialog.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import * as echarts from "echarts";
// import { getWarningDuoColor } from "@/api/ComUnit.js";

import { ref, onMounted, provide } from "vue";
const _theme = localStorage.getItem("curTheme");
const datekeyXLJ = ref(null);
const datekeyGW = ref(null);
const lineOptionXLJ = ref({});
const lineOptionGW = ref({});
const trendsTooltipXLJ = ref();
const trendsTooltipGW = ref();
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
// 判断弹窗是否显示,默认隐藏
const showDialogXLJ = ref(false);
const titleNameXLJ = ref();
const TypeXLJ = ref();
const XLJdata = ref([]);
const XLJname = ref();
const showDialogGW = ref(false);
const titleNameGW = ref();
const TypeGW = ref();
const GWdata = ref([]);
const GWname = ref();
const pid = ref("");
const stime = ref("");
const etime = ref("");
const dateidXLJ = ref("xljjs");
const dateidGW = ref("gwyl");
const SLDATA = ref({});
const props = defineProps({
  ystsGroup: String,
});

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD 00:00:00"))
    .add(-6, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
  strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  strParam["pid"] = "2024111900002";

  // 下立交
  api
    .att_wpnewdataqueryList(strParam)
    .then(res => {
      const data = res.result;
      var Allcount = 0, kaiCount = 0, guanCount = 0;
      var subtextStr = "未积水";
      var nametextStr = "无预警";
      if (data.length > 0) {
        for (var num = 0; num < data.length; num++) {
          var item = data[num];
          if (item.dept != undefined) {
            if (Number(item.dept) > 5) {
              subtextStr = "积水";
              kaiCount++;
              nametextStr = "红色预警";
            } else {
              subtextStr = "未积水";
              guanCount++;
              nametextStr = "无预警";
            }
          } else {
            subtextStr = "未积水";
            guanCount++;
            nametextStr = "无预警";
          }
        }
      }
      if (kaiCount > 0) {
        Allcount = kaiCount;
      }
      XLJdata.value = data;
      XLJname.value = subtextStr;
      var itemBg = getWarningDuoColor(nametextStr);
      var _Option = ChartJs.echartWaterPie(Allcount, "", itemBg, _theme);
      lineOptionXLJ.value = _Option;

      let chartDom = document.getElementById(dateidXLJ.value);
      let myChart = echarts.init(chartDom);
      myChart.setOption(lineOptionXLJ.value);
      myChart.on("click", XLJeSLChage);
    })
    .catch(err => { });



  var strWhere = {};
  strWhere["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD 00:00:00"))
    .add(-6, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
  strWhere["etime"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  strWhere["pid"] = "2024111900003";
  // 管网
  api
    .att_shaftdatanewqueryList(strWhere)
    .then(res => {
      const data = res.result;
      var Allcount = 0, kaiCount = 0, guanCount = 0;
      var subtextStr = "未溢流";
      var nametextStr = "无预警";
      if (data.length > 0) {
        for (var num = 0; num < data.length; num++) {
          var item = data[num];
          if (item.relative_WL != undefined) {
            if (Number(item.relative_WL) > 0) {
              subtextStr = "溢流";
              kaiCount++;
              nametextStr = "红色预警";
            } else {
              subtextStr = "未溢流";
              guanCount++;
              nametextStr = "无预警";
            }
          } else {
            subtextStr = "未溢流";
            guanCount++;
            nametextStr = "无预警";
          }
        }
      }
      GWdata.value = data;
      GWname.value = subtextStr;
      var itemBg = getWarningDuoColor(nametextStr);
      if (kaiCount > 0) {
        Allcount = kaiCount;
      }
      var _Option = ChartJs.echartWaterPie(Allcount, "", itemBg, _theme);
      lineOptionGW.value = _Option;

      let chartDom = document.getElementById(dateidGW.value);
      let myChart = echarts.init(chartDom);
      myChart.setOption(lineOptionGW.value);
      myChart.on("click", GWeSLChage);
    })
    .catch(err => { });
}
function getWarningDuoColor(name) {
  //gcolor圆圈颜色
  //fontColor文本字体颜色
  //color 水波颜色
  var item = {};
  var color = [
    {
      offset: 1,
      color: ["rgba(7,222,119,0.4)"], // 0% 处的颜色
    },
    {
      offset: 0,
      color: ["rgba(5,151,81,0.8)"], // 100% 处的颜色
    },
  ];
  var bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
    {
      offset: 1,
      color: "rgba(111,234,140,0.3)",
    },
    {
      offset: 0.95,
      color: "rgba(111,234,140, 0.5)",
    },
    {
      offset: 0.8,
      color: "rgba(111,234,140, 0.3)",
    },
    {
      offset: 0.4,
      color: "rgba(30,209,73, 0.01)",
    },
  ]);
  var fontColor = "#00ffff";// "#46F604";
  var gcolor = [
    {
      offset: 1,
      color: "rgba(30,209,73, 0.01)",
    },
    {
      offset: 0,
      color: "rgba(111,234,140, 0.6)",
    },
  ];
  if (name == "红色预警") {
    gcolor = [
      {
        offset: 1,
        color: "rgba(205,40,24, 0.01)",
      },
      {
        offset: 0,
        color: "rgba(231,76,60, 0.6)",
      },
    ];
    color = [
      {
        offset: 1,
        color: ["rgba(231,76,60,0.4)"], // 0% 处的颜色
      },
      {
        offset: 0,
        color: ["rgba(234,92,78,0.8)"], // 100% 处的颜色
      },
    ];
    bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
      {
        offset: 1,
        color: "rgba(231,76,60,0.3)",
      },
      {
        offset: 0.95,
        color: "rgba(231,76,60, 0.5)",
      },
      {
        offset: 0.8,
        color: "rgba(231,76,60, 0.3)",
      },
      {
        offset: 0.4,
        color: "rgba(205,40,24, 0.01)",
      },
    ]);
  }
  item.color = color;
  item.bgcolor = bgcolor;
  item.gcolor = gcolor;
  item.fontColor = fontColor;
  return item;
}

function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 90 });
  $(".g-lside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateidXLJ.value = "xljjs1";
  dateidGW.value = "gwyl1";
}
function XLJeSLChage(e) {
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialogXLJ.value = true;
  titleNameXLJ.value = "下立交积水信息"
}
function GWeSLChage(e) {
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialogGW.value = true;
  titleNameGW.value = "管网信息"
}
onMounted(() => {
  var nowTM = new Date();
  stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
    .add(-1, "day")
    .format("YYYY-MM-DD 08:00:00");;
  etime.value = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  if (dayjs(nowTM).format("HH") < 8) {
    stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-2, "day")
      .format("YYYY-MM-DD 08:00:00");
  }
  Weacontent();
});
provide("XLJdata", XLJdata);
provide("XLJname", XLJname);
provide("GWdata", GWdata);
provide("GWname", GWname);
</script> 
<style scoped>
.text-xiaolv {
  height: 40px;
  width: auto;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #5ee9ff;
  box-shadow: 0 0 10px #5ee9ff, inset 0 0 10px #5ee9ff;
  padding: 4px 10px;
  /* margin: 0px auto; */
  margin-top: 13px;
  line-height: 30px;
  color: var(--textXiaolv);
  float: left;
  margin-right: 10px;
}
</style>

