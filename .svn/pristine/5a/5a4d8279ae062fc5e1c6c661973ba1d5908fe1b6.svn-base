<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">边界水量交换</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <div style="width: 45%; height: 100%; float: left">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
      </div>
      <div class="ysts-group" style="width: 55%" v-html="ystsGroup"></div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartGQBJSL />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import * as echarts from "echarts";

import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const trendsTooltip = ref();
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("TableRU");
const props = defineProps({
  ystsGroup: String,
});
const ystsGroup = ref();

function Weacontent() {
  var nowTM = new Date();
  var startDate = dayjs(nowTM).format("YYYY-MM-DD 08:mm:ss");
  var endDate = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  var strParam = {};
  strParam["pid"] = "202306021452313162";
  strParam["stime"] = startDate;
  strParam["etime"] = endDate;
  api
    .stPptnGQBJSL(strParam)
    .then((res) => {
      const strJson = res.result;
      // if (strJson.length > 0) {
      var pieArr = [],
        SLtotal = 0,
        pieArrNew = [];
      for (var num = 0; num < strJson.length; num++) {
        var strWhere = {};
        var ysl = strJson[num].ysl;
        var sl = strJson[num].sl;
        var value = Number(ysl + sl);
        strWhere["value"] = Number(value).toFixed(2);
        strWhere["name"] = strJson[num].stnm;
        SLtotal += Number(value);
        pieArr.push(strWhere);
        var strWhereNew = {};
        strWhereNew["value"] = Number(Math.abs(value)).toFixed(2);
        strWhereNew["name"] = strJson[num].stnm;
        pieArrNew.push(strWhereNew);
      }
      var LineColor = [
        "#00cfff",
        "#00fd6d",
        "#efc30a",
        "#ffef00",
        "#0264FD",
        "#6374FD",
        "#ECAEFD",
        "#EC30FD",
        "#EC3032",
      ];
      const _Option = ChartJs.echartSLpei(dateid.value, pieArrNew, LineColor, _theme);
      lineOption.value = _Option;
      let chartDom = document.getElementById(dateid.value);
      let myChart = echarts.init(chartDom);
      myChart.setOption(lineOption.value);

      // 动态显示tootip
      // 当前高亮图形所在下标
      let currentIndex = -1;
      // 取消之前高亮的图形
      if (trendsTooltip.value != null) {
        clearInterval(trendsTooltip.value);
      }
      trendsTooltip.value = setInterval(function () {
        let dataLen = lineOption.value.series[0].data.length;
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // 当前高亮图形
        currentIndex = (currentIndex + 3) % dataLen;
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // 显示 tooltip
        // tootip每隔三秒依次显示
        // myChart.dispatchAction({
        //   type: "showTip", // 根据 tooltip 的配置项显示提示框。
        //   seriesIndex: 0,
        //   dataIndex: currentIndex,
        // });
        if (currentIndex >= lineOption.value.series[0].data.length) {
          currentIndex = 0;
        }
      }, 1000);
      // datekey.value = Date.now();

      pieArr.push({ value: SLtotal, name: "净量" });

      var strHtml = "";
      for (var num = 0; num < pieArr.length; num++) {
        //入湖水量
        var sl = Number(pieArr[num].value).toFixed(2);
        var cls = "color-hh" + (num + 1);
        strHtml += '<div class="ysts-item">';
        strHtml += '<div class="ysts-name" >' + pieArr[num].name + "</div>";
        strHtml += '<div class="ysts-value ' + cls + '">';
        strHtml += '<span class="ysts-num font-agency">' + sl + "</span>";
        strHtml += '<span class="ysts-unit">万方</span>';
        strHtml += "</div>";
        strHtml += "</div>";
      }

      ystsGroup.value = strHtml;
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
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "danzhanhour1";
}
onMounted(() => {
  Weacontent();
});
</script>
<style scoped></style>
