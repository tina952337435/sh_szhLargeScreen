<template>
    <div class="m-box">
      <!-- <div
        class="title display_flex justify-content_flex-start align-items_center leftTop-radius"
      >
        <span class="spanTitle"></span>
        <span>米市渡</span>
      </div> -->
      <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()" style="width: 120px;">{{ onetitleName }}</p>
        <div style="width:calc(100% - 100px);" class="div-swiper">
          <div class="swiper-slide" style="width: 33%;"
            :class="Drpswiper == '63401120' && 'swiper-slide swiper-slide-thumb-active'" @click="qiehuan('63401120')">
            松浦大桥</div>
          <div class="swiper-slide" style="width: 33%;"
            :class="Drpswiper == '63405100' && 'swiper-slide swiper-slide-thumb-active'" @click="qiehuan('63405100')">
            黄渡
          </div>
          <div class="swiper-slide" style="width:33%;"
            :class="Drpswiper == '63403190' && 'swiper-slide swiper-slide-thumb-active'" @click="qiehuan('63403190')">
            练塘
          </div>
        </div>
        <span class="spanTitle"></span>
      </div>
      <div class="txt">
        <!-- <div style="height: 100%;color: white;width: 100%;text-align: center; height: 22vh;">
                  水情报表
              </div> -->
        <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
      </div>
      <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
      style="width: 70%; height: 700px">
      <songpudaqiaoLL />
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
  import { convertToDate } from "@/api/dateUtil.js";
  
  import { ref, onMounted, reactive } from "vue";
  
  // 获取当前主题
  const _theme = localStorage.getItem("curTheme");
  const datekey = ref(null);
  const lineOption = ref({});
  // 判断弹窗是否显示,默认隐藏
  const showDialog = ref(false);
  const dateid = ref("TbaLL");
  const stime = ref({});
  const etime = ref({});
  const stcdList = ref("63401120");
  const onetitleName = ref("流量过程");
  const Drpswiper = ref("63401120");
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
    if (stcd == "63401120") {
      stnm = "吴淞口";
    } else if (stcd == "63405100") {
      stnm = "黄浦公园";
    } else if (stcd == "63403190") {
      stnm = "米市渡";
    }
    // onetitleName.value = stnm;
  
    Weacontent();
  }
  function Weacontent() {
    var nowTM = new Date();
    var strParam = {};
    strParam["stcd"] = stcdList.value;
    strParam["pathname"] = "Hour";
    strParam["stime"] = stime.value;
    strParam["datasource"] = "BX";
    strParam["etime"] = etime.value;
    api
      .stFlowLine(strParam)
      .then((res) => {        
        var swresult=res.data;
        const strJson = sortObjectArray(swresult, ["tm"], "desc").reverse();
        if (strJson.length > 0) {
          const strNote = [];
          strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
          strNote.push({ name: "流量", codename: "q", tableV: "0", isShow: true });
          var LineColor = [
            "#17E9B1",
            "#3E8BFF",
            "#1CB8B2",
            "#01DDFF",
            "#F9C823",
            "#0264FD",
            "#FE7923",
            "#8E30FF",
          ];
          
          const _Option = ChartJs.chartLL(
            "",
            strJson,
            strNote,
            LineColor,
            "流量",
            "Mouth",
            _theme, 55, 14
          );
    
          lineOption.value = _Option;
          datekey.value = Date.now();
        }
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
    // stime.value = "2024-08-07 00:00:00";
    // etime.value = "2024-08-08 23:59:59";
  
    Weacontent();
  });
  </script>
  