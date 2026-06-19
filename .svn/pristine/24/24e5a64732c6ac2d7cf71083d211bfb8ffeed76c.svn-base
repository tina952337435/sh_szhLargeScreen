<template>
  <div class="m-box">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div style="line-height: 30px">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" v-if="showClick" @click="fangda()">
          分区降雨统计
        </p>
        <span class="spanTitle"></span>
      </div>

      <div style="width: calc(100% - 150px)" class="div-swiper">
        <div
          class="swiper-slide"
          style="width: 25%"
          :class="
            Drpswiper == 'YL1' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="GetDrp('YL1')"
        >
          1小时
        </div>
        <div
          class="swiper-slide"
          style="width: 25%"
          :class="
            Drpswiper == 'YL3' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="GetDrp('YL3')"
        >
          3小时
        </div>
        <div
          class="swiper-slide"
          style="width: 25%"
          :class="
            Drpswiper == 'YL6' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="GetDrp('YL6')"
        >
          6小时
        </div>
        <div
          class="swiper-slide"
          style="width: 25%"
          :class="
            Drpswiper == 'YL0' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="GetDrp('YL0')"
        >
          今日
        </div>
      </div>
    </div>
    <div class="txt">
      <Echarts
        :width="'100%'"
        :height="'100%'"
        :option="lineOption"
        :key="datekey"
        :id="dateid"
      />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian
    :showDialog="showDialog"
    @close="showDialog = false"
    :title="titleName"
    style="width: 70%; height: 700px"
  >
    <EchartZLYQDay />
  </ComZujian>
</template>
<script setup>
import "@/assets/styles/swiper.css";
import ComZujian from "@/components/ComZujian.vue";
import EchartZLYQDay from "@/components/menu/yq/EchartZLYQDay.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showClick = ref(true);
const dateid = ref("daydrp");
const Drpswiper = ref("YL3");
const stime = ref({});
const etime = ref({});

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = "2024060516432392160";
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  strParam["datasource"] = "BX";
  api
    .stPptnRainDay(strParam)
    .then((res) => {
      const strJson = res.data; //sortObjectArray(res.result, ["drp"], "desc");
      const result = [];
      // if (strJson.length > 0) {
      let numDay = 10;
      if (strJson.length < numDay) {
        numDay = strJson.length;
      }
      for (let num = 0; num < numDay; num++) {
        const item = strJson[num];
        let strParam = {};
        strParam["stnm"] = item["stnm"];
        strParam["drp"] = item["drp"];
        result.push(strParam);
      }
      const strNote = [];
      strNote.push({
        name: "名称",
        codename: "stnm",
        tableV: "0",
        isShow: true,
      });
      strNote.push({
        name: "雨量",
        codename: "drp",
        tableV: "0",
        isShow: true,
      });
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
        result,
        strNote,
        LineColor,
        "雨量",
        "true",
        _theme,
      );
      lineOption.value = _Option;
      datekey.value = Date.now();
      // }
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
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "daydrp1";
}
function GetDrp(obj) {
  Drpswiper.value = obj;
  var now = new Date();
  var v = obj.replace("YL", "");
  if (v > 0) {
    etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD  HH:mm:ss"))
      .add(-v, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  } else if (v == 0) {
    stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
    if (dayjs(now).format("HH") < 8) {
      stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
        .add(-24, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    } else {
      stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
    }
    etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  }
  Weacontent();
}
onMounted(() => {
  GetDrp("YL3");
  // Weacontent();
});
</script>
