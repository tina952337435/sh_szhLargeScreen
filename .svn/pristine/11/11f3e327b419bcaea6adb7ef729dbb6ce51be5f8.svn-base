<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">测站统计</p>
            </div>
        </div>
        <div class="txt">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName"
        style="width: 70%; height: 700px">
        <datatoReportRate :rainListSW="rainListSW" />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import EchartZLYQDay from "@/components/menu/yq/EchartZLYQDay.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import * as echarts from "echarts";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, inject, watch } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const Typeswiper = ref("daobaolu");
const dateid = ref("echartLogin1");

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
function Weacontent() {
    lineOption.value = echartsCZTJ(_theme);
    datekey.value = Date.now();

}
function GetType(type) {
    Typeswiper.value = type;
}
function echartsCZTJ(theme) {
 let dataPie = [

     {
         value: 708,
         name: '在线'
     },
     {
         value: 125,
         name: '离线'
     },
 ];
 let colorPie = ['#173852', '#0b2036', '#002e49'];
 let colorWrap = ['#3087d6', '#f6ce54', '#4be1ff'];
 let baseDataPie = [],
     baseDataWrap = [];
 let total = 0;
 dataPie.forEach(function(val, idx, arr) {
     total += val.value;
 })
 for (let i = 0; i < dataPie.length; i++) {
     baseDataPie.push({
         value: dataPie[i].value,
         name: dataPie[i].name,
         itemStyle: {
             normal: {
                 borderWidth: 20,
                 borderColor: colorPie[i],
             }
         }
     });
     baseDataWrap.push({
         value: dataPie[i].value,
         name: dataPie[i].name,
         itemStyle: {
             normal: {
                 color: colorWrap[i],
                 borderWidth: 5,
                 borderColor: colorWrap[i],
                 shadowBlur: 50,
                 shadowColor: 'rgba(7, 132, 250, 0.8)',
             }
         }
     }, {
         value: 20,
         name: '',
         itemStyle: {
             normal: {
                 color: 'transparent',
                 borderWidth: 5,
                 borderColor: 'transparent',

             }
         }
     });
 }

 var option = {
     backgroundColor: "#031223",
     title: {
         text: '站点总数',
         subtext: '833',
         textStyle: {
             color: '#00b5f3',
             fontSize: 14,

         },
         subtextStyle: {
             align: 'center',
             fontSize: 20,
             color: ['#85c7e3'],
             fontWeight: 800
         },
         x: '28%',
         y: 'center',
     },
     grid: {
         left: '1%', // 与容器左侧的距离
         right: '1%', // 与容器右侧的距离
         top: '1%', // 与容器顶部的距离
         bottom: '1%', // 与容器底部的距离

     },
     tooltip: {
         show: true,
         trigger: 'item',
         formatter: "{a}：{b} <br/>占比：{d}%"
     },
     legend: {
         data: ['在线', '离线'],
         icon: 'vertical',
         right: '5%',
         top: 'center',
         orient: 'vertical',
         itemGap: 20,
         itemWidth: 15,
         itemHeight: 8,
         formatter: function(name) {


             let target,percent;
             for (let i = 0; i < dataPie.length; i++) {
                 if (dataPie[i].name === name) {
                     target = dataPie[i].value;
                     percent = ((target/total)*100).toFixed(2);
                 }
             }
             let arr = [ percent+'% '+' {yellow|' + target + '}', ' {blue|' + name + '}' ];
             return arr.join("")

         },
         textStyle: {

             lineHeight: 20,
             color: '#f0f4f6',
             align: 'right',
             rich: {
                 yellow: {
                     color: '#f6ce54',
                    

                 },
                 blue: {
                     color: '#4be1ff',
                      align: 'right',

                 },
             }

         },
     },

     series: [{
             name: '',
             type: 'pie',
             clockWise: false, //顺时加载
             hoverAnimation: false, //鼠标移入变大
             center: ['35%', '50%'],
             radius: ['75%', '76%'],
             tooltip: {
                 show: false
             },
             label: {
                 normal: {
                     show: false
                 }
             },
             data: baseDataWrap
         },
         {
             name: '报警',
             type: 'pie',
             color: colorPie,
             selectedMode: 'single',
             radius: ['50%', '53%'],
             center: ['35%', '50%'],
             hoverAnimation: false,
             label: {
                 normal: {
                     show: false,
                 }
             },
             data: baseDataPie
         },

     ]
 };

    return option;
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateid.value = "datatoReportRate1";
}
</script>
<style scoped></style>