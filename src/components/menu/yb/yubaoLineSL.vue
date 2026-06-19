<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" v-if="showClick" @click="fangda()">水利片进出水量</p>
                <span class="spanTitle"></span>
            </div>
        </div>
        <div class="txt">
            <div style="position: absolute;top:40px;right:0px;width:170px;height:30px;">
                <div
                    style="width:20px;height:10px;background: linear-gradient(0deg,rgba(48, 236, 166, 1), rgba(48, 236, 166, 0.5) 100%);border-radius: 3px;float:left;">
                </div>
                <div style="float:left;font-size:11px;margin-top: -5px;padding-left: 2px;color:var(--mtablecolor);">进水(净)量&nbsp;&nbsp;</div>
                <div
                    style="width:20px;height:10px;background: linear-gradient(0deg,rgba(0,255,255, 1), rgba(0,153,255,1) 100%);border-radius: 3px;float:left;margin-left:5px;">
                </div>
                <div style="float:left;font-size:11px;margin-top: -5px;padding-left: 2px;color:var(--mtablecolor);">出水(净)量</div>
            </div>
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" style="width: 70%; height: 700px">
        <yubaoLineSL :rainListSL="rainListSL" />
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
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showClick = ref(true)
const dateid = ref("yubaoLineSL");
const Drpswiper = ref("YL3");
const stime = ref({});
const etime = ref({});
const props = defineProps({
    rainListSL: {
        type: String,
        default: ""
    },
});
watch(props.rainListSL, () => {
    Weacontent();
});

onMounted(() => {
    if (props.rainListSL != undefined) {
        Weacontent();
    }
});
function Weacontent() {
    var chartTM = [], chartData = [];
    if (props.rainListSL.length > 0) {
        for (var num = 0; num < props.rainListSL.length; num++) {
            if (Number(props.rainListSL[num].rsl) > Number(props.rainListSL[num].csl))//进为绿色，出为红色
            {
                chartTM.push(props.rainListSL[num].stnm + "正");
            } else {
                chartTM.push(props.rainListSL[num].stnm + "负");
            }
            var JSL = Math.abs(Number(props.rainListSL[num].rsl) - Number(props.rainListSL[num].csl)).toFixed(1);
            chartData.push(JSL);
        }
    }
    var LineColor = ["#3E8BFF", "#1CB8B2", "#01DDFF", "#F9C823", "#0264FD", "#FE7923", "#8E30FF",];
    const _Option = ChartJs.chartAreaSLZF("", chartTM, chartData, LineColor, "水量(万方)", _theme,);
    lineOption.value = _Option;
    datekey.value = Date.now();
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateid.value = "yubaoFQSL1";
}
</script> 
  