<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" v-if="showClick" @click="fangda()">视频点运行状态</p>
                <span class="spanTitle"></span>
            </div>
        </div>
        <div class="txt">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" style="width: 70%; height: 700px">
        <videoStatus :rainListSW="rainListSW" />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import EchartZLYQDay from "@/components/menu/yq/EchartZLYQDay.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, inject, watch } from "vue";
import * as echarts from "echarts";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("videoStatus");
const trendsTooltip = ref();

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showClick = ref(true);
const Drpswiper = ref("YL3");
const stime = ref({});
const etime = ref({});
const props = defineProps({
    rainListSW: {
        type: String,
        default: ""
    },
});
watch(props.rainListSW, () => {
    Weacontent();
});

onMounted(() => {
    if (props.rainListSW != undefined) {
        Weacontent();
    }
});

const tSLIntervalVideo = ref();
var tSLInterval=ref();
function Weacontent() {
    var pieArr = [
					{ value: 97, name: "在线" },
                    { value: 16, name: "离线" }
                ];
    var LineColor = ["#0DD3ED", "#FF5347", "#efc30a", "#ffef00", "#0264FD", "#6374FD", "#ECAEFD", "#EC30FD", "#EC3032"];
    lineOption.value = ChartJs.echartSLPieVideo(pieArr,_theme,LineColor);
    // datekey.value = Date.now();
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
       myChart.on('mouseover', function(params){
        // 百分比  
         myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
           myChart.dispatchAction({
              type: "showTip", // 根据 tooltip 的配置项显示提示框。
              seriesIndex: 0,
              dataIndex: params.dataIndex
            });
           currentIndex =params.dataIndex
      })
      // 鼠标移出
      myChart.on('mouseout', function(params) {
        // 百分比  
        myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
      })
      trendsTooltip.value = setInterval(function () {          
        let dataLen = lineOption.value.series[0].data.length;
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // 当前高亮图形
        currentIndex = (currentIndex + 1) % dataLen;
        
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
        
        // console.error('currentIndex',currentIndex);
      }, 1500);
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 90 });
    $(".g-rside ").css({ "z-index": 99 });
    showDialog.value = true;
    dateid.value = "videoStatus1";
}
</script> 
  <style scoped>

  </style>