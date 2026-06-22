<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">今年水资源数据统计</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-900 bg-opacity-30 p-3 rounded-lg">
                    <div class="text-sm text-blue-300">地表水资源总量</div>
                    <div class="text-xl font-bold">24.56亿m³</div>
                    <div class="text-xs mt-1">较去年 <span class="text-green-400">+12.5%</span></div>
                </div>
                <div class="bg-green-900 bg-opacity-30 p-3 rounded-lg">
                    <div class="text-sm text-green-300">地下水资源总量</div>
                    <div class="text-xl font-bold">8.70亿m³</div>
                    <div class="text-xs mt-1">较去年 <span class="text-red-400">-3.2%</span></div>
                </div>
                <div class="bg-yellow-900 bg-opacity-30 p-3 rounded-lg">
                    <div class="text-sm text-yellow-300">年平均降水量</div>
                    <div class="text-xl font-bold">734.8mm</div>
                    <div class="text-xs mt-1">较多年平均 <span class="text-green-400">+18.7%</span></div>
                </div>
                <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
                    <div class="text-sm text-purple-300">水资源总量</div>
                    <div class="text-xl font-bold">31.05亿m³</div>
                    <div class="text-xs mt-1">重复计算量 2.21亿m³</div>
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <yearWaterResources :strJsonLHW="props.strJsonLHW" />
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

import { ref, onMounted, reactive, inject, provide, watch } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const trendsTooltip = ref();
const dateid = ref("AreasurfaceWater");
const Riverswiper=ref("year");

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
</script>

<style>
.grid {
    display: grid;
    padding:15px;
;
}
.grid-cols-2 {
    grid-template-columns: repeat(2,minmax(0,1fr))
}
.gap-4 {
    gap: 1rem
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
    padding: .75rem
}
.text-sm {
    font-size: .875rem;
    line-height: 1.25rem;
}
.text-blue-300 {
    --tw-text-opacity: 1;
    color: rgba(147, 197, 253,var(--tw-text-opacity));
}
.text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color:white;
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
.bg-green-900 {
    background-color: rgba(6, 78, 59, 0.3);
}
.bg-yellow-900 {
    background-color: rgba(120, 53, 15,0.3);
}
.bg-purple-900 {
    background-color: rgba(76, 29, 149,0.3);
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
    color: rgba(196, 181, 253, var(--tw-text-opacity));
}
</style>