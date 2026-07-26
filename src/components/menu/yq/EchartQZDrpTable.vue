<template>
  <div class="m-box"> 
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">片区最大雨量</p>
      <div style="width: calc(100% - 220px)" class="div-swiper">
        <div
          class="swiper-slide"
          style="width:33%"
          :class="
            Drpswiper == '1小时' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('1小时')"
        >
          1小时
        </div>
        <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '3小时' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('3小时')"
        >
          3小时
        </div>
        <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '6小时' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('6小时')"
        >
          6小时
        </div>
        <!-- <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '场次降雨' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('场次降雨')"
        >
          场次降雨
        </div> -->
      </div>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table FirstTable" :border="0"
        :cellspacing="0" :cellpadding="0"/>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartQZDrpTable :typenameRadio="props.typenameRadio" />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray,SumJson } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import customTable from "@/components/Table/customTable.vue";
import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const JYTitle = ref("场次降雨");
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("daydrpAvg");
const pid = ref("201901101419326076-4");
const stime = ref(null);
const etime = ref(null);
const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
});
const tableData = ref([]);
const tableHeaders = ref([
  { name: "sortnum", label: "序号",width:"10%" },
  { name: "name", label: "区域" ,width:"20%"},
  { name: "maxdrp", label: "最大雨量(mm)",width:"25%" },
  { name: "maxstnm", label: "站名" },
]);
const Drpswiper = ref("1小时");
function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = pid.value;
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  strParam["datasource"] = "BX";
  api.stPptnRainMaxDay(strParam).then((res) => {
        YLload(res.data);
  });
}

function YLload(areaData) {    
    var _index=1;
    var dataNew=[];
    areaData.map(e=>{
         var item=e;
         item.name=e.addvnm;
         item.maxdrp=parseFloat(e.drp).toFixed(1);
         item.drp=e.drp;
         item.maxstnm=e.stnm;
         item.sortnum=_index;
         dataNew.push(item);
        _index++;    
    });
    dataNew=sortObjectArray(dataNew, ['drp'], 'desc');
    dataNew.filter(function(e,_index){
        e.sortnum=_index+ 1;
    });
    tableData.value=dataNew;
}

function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "daydrpAvg1";
}
onMounted(() => {
  var now = new Date();
  stime.value = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
      .add(-1, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  Weacontent();
});

function qiehuan(stcd) {
  Drpswiper.value = stcd;
  var now = new Date();
  stime.value = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
      .add(-parseInt(Drpswiper.value.replace("小时", "")), "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  var stnm = "";
  if (stcd == "63405800") {
    stnm = "芦潮港";
  } else if (stcd == "63401750") {
    stnm = "吴淞口";
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
