<template>
    <div class="m-box">
      <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()" style="width: 120px;">{{ onetitleName }}</p>
        <div style="width:calc(100% - 250px);" class="div-swiper">          
          <div class="swiper-slide" style="width: 50%;"
            :class="Drpswiper == 'E17' && 'swiper-slide swiper-slide-thumb-active'" @click="qiehuan('E17')">
            浦东北部
          </div>
          <div class="swiper-slide" style="width:50%;"
            :class="Drpswiper == 'E18' && 'swiper-slide swiper-slide-thumb-active'" @click="qiehuan('E18')">
            浦东南部
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
      <haichao />
    </ComZujian>
  </template>
  <script setup>
  import ComZujian from "@/components/ComZujian.vue";
  import Echarts from "@/components/MyEcharts/echartsLine.vue";
  import * as apiqixiang from "@/api/qixiang/qixiangapi.js";
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
  const dateid = ref("haichaoZS");
  const stime = ref({});
  const etime = ref({});
  const stcdList = ref("E17");
  const onetitleName = ref("海潮增水");
  const Drpswiper = ref("E17");
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
    if (stcd == "E17") {
      stnm = "浦东北部";
    } 
    else if (stcd == "E18") {
      stnm = "浦东北部";
    }   
    Weacontent();
  }
  function Weacontent() {
    var nowTM = new Date();
    var strParam = {
      pattem:"海潮增水预报"
    };
    strParam["pageindex"] =1;
    strParam["pagesize"] = 1;
    apiqixiang.STTIDERDATA(strParam)
      .then((res) => {    
          if(res.data!=undefined){
            strParam = {
                kid1:res.data[0].ybtm, 
                kid2:res.data[0].ybtm, 
                stcd:stcdList.value
            }
            apiqixiang.STTIDERDATA(strParam)
            .then((resZI) => { 
                loadChart(resZI.data);
            })
            .catch((err) => {
                console.error(err);
            });   
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function loadChart(swresult){
        const strJson = swresult;//sortObjectArray(swresult, ["tm"], "desc").reverse();
        // if (strJson.length > 0) {
        const strNote = [];
        strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
        strNote.push({ name: "增水", codename: "tdz", tableV: "0", isShow: true });
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
          _theme, 55, 14
        );
  
        lineOption.value = _Option;
        datekey.value = Date.now();
        // }
  }
  function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
      return false;
    }
    $(".g-rside ").css({ "z-index": 99 });
    $(".g-lside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateid.value = "haichaoZS1";
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
  