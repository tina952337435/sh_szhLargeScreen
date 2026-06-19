<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">水资源量</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
                    <div class="text-sm text-purple-300">降雨</div>
                    <div class="text-xl" @click="bootJY('jy')">1058.0
                        <span class="danwei"> mm </span>
                        <span class="text-orange-400">-13.15%</span>
                    </div>
                </div>
                <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
                    <div class="text-sm text-purple-300">本地产水量</div>
                    <div class="text-xl" @click="bootJY('csl')">219.9
                        <span class="danwei"> 亿m³ </span>
                    </div>
                </div>
                <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
                    <div class="text-sm text-purple-300">出入湖水量(入/出)</div>
                    <div class="text-xl">115.3/93.8 <span class="danwei"> 亿m³ </span></div>
                </div>
                <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
                    <div class="text-sm text-purple-300">长江主要口门引水量</div>
                    <div class="text-xl">131.6<span class="danwei"> 亿m³ </span><span class="text-green-400">+128.07%</span></div>
                </div>
                <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
                    <div class="text-sm text-purple-300">总用水量</div>
                    <div class="text-xl">306.2<span class="danwei"> 亿m³ </span></div>
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <TableTHYearSL :strJsonLHW="props.strJsonLHW" />
    </ComZujian>
</template>

<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import SQTJ from "@/components/danzhan/sq/SQTJ.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ElMessage, ElTimePicker } from "element-plus";
import * as echarts from "echarts";

import Dialog from "@/api/utils/Dialog.js";
import { ref, onMounted, reactive, inject, provide, watch,defineAsyncComponent , h} from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const trendsTooltip = ref();
const dateid = ref("AreasurfaceWater");
const Riverswiper=ref("year");
const showDialog=ref(false);

const props = defineProps({
    strJsonLHW: {
        type: Array,
        default: () => []
    }
});
onMounted(() => {
    Weacontent();
});
function Weacontent() {
}
function bootJY(type){
}
function fangda(){
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialog.value = true;
}
</script>

<style>
.grid {
    display: grid;
    padding:5px 25px;
;
}
.grid-cols-2 {
    grid-template-columns: repeat(2,minmax(0,1fr))
}
.gap-4 {
    gap: 0.8rem
}
.rounded-lg {
    border-radius: .5rem
}
.bg-blue-900 {
    --tw-bg-opacity: 1;
    background-color: rgba(30, 58, 138, var(--tw-bg-opacity));
}
.bg-opacity-30 {
    --tw-bg-opacity: 0.3;
}
.p-3 {
    padding:0.6rem .75rem
}
.text-sm {
    font-size: .875rem;
    line-height: 1.10rem;
}
.text-blue-300 {
    --tw-text-opacity: 1;
    color: rgba(147, 197, 253,var(--tw-text-opacity));
}
.text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
    /* color:white; */
    color: var(--titled1);
    cursor:pointer;
}
.font-bold {
    font-weight: 700;
}
.mt-1 {
    margin-top: .25rem;
}
.text-xs {
    font-size: .80rem;
    line-height: 1rem;
    color:white;
}
.text-green-400{
    font-size: .80rem;
    line-height: 1rem;
    color:#77F10A;
    padding-left:10px;
}
.text-orange-400{
    font-size: .80rem;
    line-height: 1rem;
    color:#FFA200;
    padding-left:10px;
}
.bg-green-900 {
    background-color: rgba(6, 78, 59, 0.3);
}
.bg-yellow-900 {
    background-color: rgba(120, 53, 15,0.3);
}
.bg-purple-900 {
    background-color: rgba(76, 29, 149,0);
    background-image: url(/images/zb_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.text-green-300 {
    color: rgba(110, 231, 183,1);
}
.text-yellow-300 {
    --tw-text-opacity: 1;
    color: rgba(252, 211, 77, var(--tw-text-opacity));
}
.text-purple-300 {
    --tw-text-opacity: 1;
    /* color: rgba(196, 181, 253, var(--tw-text-opacity)); */
    color: var(--mtablecolor);
}
.danwei{
     color: var(--mtablecolor);
     font-size:.875rem;
}
</style>