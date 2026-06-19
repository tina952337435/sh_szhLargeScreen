<template>
  <div class="m-box">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()" style="width: 120px">
        {{ onetitleName }}
      </p>
      <div style="width: calc(100% - 100px)" class="div-swiper">
        <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '63401750' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('63401750')"
        >
          吴淞口
        </div>
        <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '63401500' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('63401500')"
        >
          黄浦公园
        </div>
        <div
          class="swiper-slide"
          style="width: 33%"
          :class="
            Drpswiper == '63401100' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('63401100')"
        >
          米市渡
        </div>
      </div>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <!-- <div style="height: 100%;color: white;width: 100%;text-align: center; height: 22vh;">
                水情报表
            </div> -->
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
    <TaihuZS />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import apityphoon from "@/api/typhoon/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray, SetNull } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { convertToDate } from "@/api/dateUtil.js";
import { ref, onMounted, reactive,defineProps } from "vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("TbaSW");
const stime = ref({});
const etime = ref({});
const stcdList = ref("63401750");
const onetitleName = ref("潮位过程");
const Drpswiper = ref("63401750");
const props = defineProps({
  strJsonData: {
    type: String,
    default: {},
  },
});
function qiehuan(stcd) {
  stcdList.value = stcd;
  Drpswiper.value = stcd;
  var stnm = "";
  if (stcd == "63401750") {
    stnm = "吴淞口";
  } else if (stcd == "63401500") {
    stnm = "黄浦公园";
  } else if (stcd == "63401100") {
    stnm = "米市渡";
  }
  Weacontent();
}
function Weacontent() {
  var strParam = {    
    startdate:stime.value,
    enddate:etime.value,
    stcd: stcdList.value,
    tdptn: "2",
  };
  apityphoon
    .ZhuantiTideGC(strParam)
    .then((res) => {
      var swresult = res.data;
      const strJson = sortObjectArray(swresult, ["tm"], "desc").reverse();
      // if (strJson.length > 0) {
      const strNote = [];
      strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
      strNote.push({
        name: "潮位",
        codename: "tdz",
        tableV: "0",
        isShow: true,
      });
      strNote.push({
        name: "天文潮",
        codename: "htdz",
        tableV: "0",
        isShow: true,
      });
      strNote.push({
        name: "增水",
        codename: "ztdz",
        tableV: "0",
        isShow: true,
      });
      var LineColor = [
        "#01DDFF",
        "#0264FD",
        "#F70019",
        "#F9C823",
        "#0264FD",
        "#FE7923",
        "#8E30FF",
      ];
      const _Option = ChartJs.chartSW(
        "",
        strJson,
        strNote,
        LineColor,
        "水位",
        "Mouth",
        _theme,
        55,
        14,
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
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "TbaSW1";
}
onMounted(() => {
  if (SetNull(props.strJsonData)!="") {
    if (SetNull(props.strJsonData.stm)!=""){ 
      stime.value =props.strJsonData.stm;
      etime.value =props.strJsonData.etm;
      Weacontent();
    }
  }  
});
</script>
