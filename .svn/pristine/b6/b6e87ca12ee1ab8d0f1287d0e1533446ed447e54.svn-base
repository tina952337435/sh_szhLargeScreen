<template>
  <div class="m-box" style="width: 100%; height: 100%">
    <!-- <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius"
    >
      <span class="spanTitle"></span>
      <span>进出水量</span>
    </div> -->
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2">进出水量</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <div style="width: 50%; height: 100%; float: left; padding: 10px 0px">
        <div class="icontitle font-pangmen font-pangmenRU">
          <div class="title-name">入境水量</div>
        </div>
        <Echarts
          :width="'100%'"
          :height="'100%'"
          :option="lineOption"
          :key="datekey"
          id="slTableRU"
        />
      </div>
      <div style="width: 50%; height: 100%; float: left; padding: 10px 0px">
        <div class="icontitle font-pangmen font-pangmenCHU">
          <div class="title-name">出境水量</div>
        </div>
        <Echarts
          :width="'100%'"
          :height="'100%'"
          :option="lineOption1"
          :key="datekey"
          id="slTableCHU"
        />
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script setup>
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";

import { ref, onMounted, reactive } from "vue";
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const lineOption1 = ref({});

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["stime"] = strParam["etime"] = dayjs(nowTM).format("YYYY") + "-01-01 00:00:00";
  strParam["etime"] = dayjs(nowTM).format("YYYY") + "-12-31 23:59:59";
  strParam["pathname"] = "出入境水量月报";
  api
    .stPptnSLTable(strParam)
    .then((res) => {
      var isSet = true; // 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
      const strJson = res.result;
      // if (strJson.length > 0) {
        var pieArrYSL = [];
        var pieArrPSL = [];
        var slList = [];
        var accpwSum = 0,
          accdwSum = 0;
        var data = strJson.filter(function (res) {
          return res.xqkb_ID == "2024081310500101";
        });
        var v = [];
        if (data.length > 0) {
          var val = data[0].xqkb_NOTE.toString();
          v = JSON.parse(val);
        }

        for (var num = 0; num < v.length; num++) { 
          var items = v[num];
          var accpw =
            (items.accpw != undefined) & ("" != items.accpw)
              ? Number(items.accpw).toFixed(0)
              : "0";
          var accdw =
            (items.accdw != undefined) & ("" != items.accdw)
              ? Number(items.accdw).toFixed(0)
              : "0";
          var stnm = items.stnm != undefined ? items.stnm : "—";
          if ("—" != accpw) {
            accpwSum += Number(accpw);
          }
          if ("—" != accdw) {
            accdwSum += Number(accdw);
          }
          if (Number(accpw) > 0) {
            pieArrYSL.push({ name: stnm, value: accpw });
          }
          if (Number(accdw) > 0) {
            pieArrPSL.push({ name: stnm, value: accdw });
          }
        }
        var LineColor = [
          "#3E8BFF",
          "#1CB8B2",
          "#01DDFF",
          "#F9C823",
          "#0264FD",
          "#FE7923",
          "#8E30FF",
        ];
        const _Option = ChartJs.echartSLpei("slTableRU", pieArrYSL, LineColor, _theme);
        const _Option1 = ChartJs.echartSLpei("slTableCHU", pieArrPSL, LineColor, _theme);
        

        lineOption.value = _Option;
        lineOption1.value = _Option1;
        datekey.value = Date.now();
      // }
    })
    .catch((err) => {
      console.error(err);
    });
}
onMounted(() => {
  Weacontent();
});
</script>
<style>
.title-name {
  color: var(--titled1);
}
</style>
