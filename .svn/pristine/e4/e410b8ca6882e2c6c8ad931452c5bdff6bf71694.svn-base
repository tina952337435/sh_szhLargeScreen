<template>
  <div class="m-box">
    <!-- <div
        class="title display_flex justify-content_flex-start align-items_center leftTop-radius"
      >
        <span class="spanTitle"></span>
        <span>米市渡</span>
      </div> -->
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()" style="width: 120px">
        {{ onetitleName }}
      </p>
      <div style="width: calc(100% - 150px)" class="div-swiper">
        <div
          class="swiper-slide"
          style="width: 25%"
          :class="
            Drpswiper == '63401500' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('63401500')"
        >
          黄浦公园
        </div>
        <div
          class="swiper-slide"
          style="width: 25%"
          :class="
            Drpswiper == '63401750' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('63401750')"
        >
          吴淞口
        </div>
        <div
          class="swiper-slide"
          style="width: 25%"
          :class="
            Drpswiper == '63401100' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('63401100')"
        >
          米市渡
        </div>
        <div
          class="swiper-slide"
          style="width: 25%"
          :class="
            Drpswiper == '63405800' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('63405800')"
        >
          芦潮港
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
    <TaihuSW />
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

import { ref, onMounted, reactive } from "vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("TbaSW");
const stime = ref({});
const etime = ref({});
const stcdList = ref("63401500");
const onetitleName = ref("潮位过程");
const Drpswiper = ref("63401500");
const props = defineProps({
  stcd: {
    type: String,
    default: "",
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
  } else if (stcd == "63405800") {
    stnm = "芦潮港";
  }
  Weacontent();
}
function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["stcd"] = stcdList.value;
  strParam["pathname"] = "1";
  strParam["stime"] = stime.value;
  strParam["datasource"] = "BX";
  strParam["etime"] = etime.value;
  api
    .stPptnWaterLineAndYB(strParam)
    .then((res) => {
      var swresult = res.data.filter(function (e) {
        return e.stcd == stcdList.value;
      });
      if (swresult.length > 0) {
        for (var num = 0; num < swresult.length; num++) {
          swresult[num].ssupz = swresult[num].upz;
          swresult[num].ybupz = swresult[num].ybz;
        }
      }
      const strJson = sortObjectArray(swresult, ["tm"], "desc").reverse();
      // if (strJson.length > 0) {
      const strNote = [];
      strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
      strNote.push({
        name: "实时",
        codename: "ssupz",
        tableV: "0",
        isShow: true,
      });
      strNote.push({
        name: "预报",
        codename: "ybupz",
        tableV: "0",
        isShow: true,
      });
      strNote.push({
        name: "警戒",
        codename: "wrz",
        tableV: "0",
        isShow: true,
      });
      strNote.push({
        name: "历史最高",
        codename: "ivhz",
        tableV: "0",
        isShow: true,
      });
      // strNote.push({ name: "保证", codename: "grz", tableV: "0", isShow: false });
      var LineColor = [
        "#16FF8D",
        "#3E8BFF",
        "#1CB8B2",
        "#01DDFF",
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
  var now = new Date();
  stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
    .add(-1, "day")
    .format("YYYY-MM-DD HH:mm:ss");
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");

  Weacontent();
});
</script>
