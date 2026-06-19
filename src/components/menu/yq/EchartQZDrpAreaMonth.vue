<template>
  <div class="m-box">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">分区雨量</p>
      <div style="width: calc(100% - 200px)" class="div-swiper">
        <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '当月累计' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('当月累计')"
        >
          当月累计
        </div>
        <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '汛期以来' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('汛期以来')"
        >
          汛期以来
        </div>
        <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '今年以来' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('今年以来')"
        >
          今年以来
        </div>
      </div>

      <span class="spanTitle"></span>
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
    :typeValue="typeValue"
    style="width: 70%; height: 700px"
  >
    <EchartQZDrpAreaMonth :typenameRadio="props.typenameRadio" />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray, SumJson } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import customTable from "@/components/Table/customTable.vue";
import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const JYTitle = ref("当月累计");
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("daydrpAvgMonth");
const pid = ref("2024060516432392160");
const stime = ref(null);
const etime = ref(null);
const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
});
const tableData = ref([]);

const Drpswiper = ref("当月累计");

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = pid.value;
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  if (props.typenameRadio == "2") {
    strParam["datasource"] = "QX";
  } else if (props.typenameRadio == "3") {
    strParam["datasource"] = "BX";
  } else if (props.typenameRadio == "4") {
    strParam["datasource"] = "YC";
  }
  window.loadingShow();
  api
    .findResultDayArea(strParam)
    .then((res) => {
      tableData.value = res.data;
      bindData();
      window.loadingHide();
    })
    .catch((err) => {
      console.error(err);
    });
}
function bindData() {
  const strNote = [];
  strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
  strNote.push({ name: "雨量", codename: "drp", tableV: "0", isShow: true });
  //   strNote.push({ name: "多年平均", codename: "maxdrp", tableV: "0", isShow: true });
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
    tableData.value,
    strNote,
    LineColor,
    "雨量",
    "true",
    _theme,
  );
  lineOption.value = _Option;
  datekey.value = Date.now();
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "daydrpAvg1";
}
onMounted(() => {
    // 获取当月第一天
    const firstDay = dayjs().startOf('month').format('YYYY-MM-DD');
    // 获取当月最后一天
    const lastDay = dayjs().endOf('month').format('YYYY-MM-DD');
    stime.value = firstDay+" 00:00:00";    
    etime.value = lastDay+" 23:59:00";
    Weacontent();
});

function qiehuan(stcd) {
  Drpswiper.value = stcd;
  var stnm = "";
  if (stcd == "当月累计") {
    // 获取当月第一天
    const firstDay = dayjs().startOf('month').format('YYYY-MM-DD');
    // 获取当月最后一天
    const lastDay = dayjs().endOf('month').format('YYYY-MM-DD');
    stime.value = firstDay+" 00:00:00";    
    etime.value = lastDay+" 23:59:00";
  } 
  else if (stcd == "汛期以来") {    
    const currentYear = dayjs().year();
    stime.value = currentYear+"-06-01 00:00:00";    
    etime.value = dayjs().format('YYYY-MM-DD')+" 23:59:00";
  }
  else if (stcd == "今年以来") {
    const currentYear = dayjs().year()
      stime.value = currentYear+"-01-01 00:00:00";    
      etime.value = dayjs().format('YYYY-MM-DD')+" 23:59:00";
  }
  Weacontent();
}
</script>
<style scoped>
/* .g-lside {
  z-index: 99 !important;
}
.g-rside {
  z-index: 90 !important;
} */
</style>
