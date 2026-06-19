<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" v-if="showClick" @click="fangda()">软件组件资源</p>
                <span class="spanTitle"></span>
            </div>
        </div>
        <div class="txt">
            <img style="width: 60%;margin-left: 20%;" src="/images/shujuku.png" alt="">
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName"
        style="width: 70%; height: 700px">
        <fuwuqiyunxing :rainListSW="rainListSW" />
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
const dateid = ref("serverChartMEM");

const datekey1 = ref(null);
const lineOption1 = ref({});
const dateid1 = ref("serverChartDISK");


const datekey2 = ref(null);
const lineOption2 = ref({});
const dateid2 = ref("serverChartMEM-yingyong");

const datekey3 = ref(null);
const lineOption3 = ref({});
const dateid3 = ref("serverChartDISK-yingyong");

const datekey4 = ref(null);
const lineOption4 = ref({});
const dateid4 = ref("serverChartMEM-database");

const datekey5 = ref(null);
const lineOption5 = ref({});
const dateid5 = ref("serverChartDISK-database");

const datekey6 = ref(null);
const lineOption6 = ref({});
const dateid6 = ref("serverChartVIS");

const datekey7 = ref(null);
const lineOption7 = ref({});
const dateid7 = ref("serverChartVIS-yingyong");

const datekey8 = ref(null);
const lineOption8 = ref({});
const dateid8 = ref("serverChartVIS-database");

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
    lineOption.value = chartZhanBi(33, "serverChartMEM", "国产服务器");;
    datekey.value = Date.now();

    lineOption1.value = chartZhanBi(11, "serverChartDISK", "实体机器");;
    datekey1.value = Date.now();

    lineOption2.value = chartZhanBi(31, "serverChartMEM-yingyong", "磁盘");;
    datekey2.value = Date.now();

    lineOption3.value = chartZhanBi(14, "serverChartDISK-yingyong", "磁盘");;
    datekey3.value = Date.now();

    lineOption4.value = chartZhanBi(51, "serverChartMEM-database", "内存");;
    datekey4.value = Date.now();

    lineOption5.value = chartZhanBi(16, "serverChartDISK-database", "内存");;
    datekey5.value = Date.now();

    lineOption6.value = chartZhanBi(16, "serverChartVIS", "内存");;
    datekey6.value = Date.now();

    lineOption7.value = chartZhanBi(16, "serverChartVIS-yingyong", "内存");;
    datekey7.value = Date.now();

    lineOption8.value = chartZhanBi(16, "serverChartVIS-database", "内存");;
    datekey8.value = Date.now();
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateid.value = "yubaoCJTJ1";
    dateid1.value = "yubaoCJTJ2";
    dateid2.value = "yubaoCJTJ3";
    dateid3.value = "yubaoCJTJ4";
    dateid4.value = "yubaoCJTJ5";
    dateid5.value = "yubaoCJTJ6";
}
function chartZhanBi(bili, ChartName, titleName) {
    let value = [bili];
    var rich = {
        b: {
            fontSize: 13,
            padding: [20, 0, 60, 0],
        },
        d: {
            fontSize: 14,
            fontWeight: 100,
            padding: [2, 0, 0, 0]
        }
    },
        option = {
            name: titleName,
            grid: {
                top: 20,
                left: 5,
                right: 5,
                bottom: 5,
                containLabel: true,
            },
            xAxis: {
                show: false,
                type: "value",
                //boundaryGap: [0, 0],
                max: 100
            },
            yAxis: {
                type: 'category',
                show: false,
            },
            series: [
                {
                    data: value,
                    type: 'bar',
                    barWidth: 16,
                    stack: titleName,
                    showBackground: true,
                    backgroundStyle: {
                        borderRadius: 50,
                        color: "#E7EAF0"
                    },
                    itemStyle: {
                        color: {
                            x: 1,
                            y: 0,
                            x2: 0,
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: '#00ff60' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#0C95FF' // 100% 处的颜色
                            }],
                        },
                        borderRadius: 50,
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b|' + titleName + "(" + value + "%)" + '}',
                            color: "rgba(35, 254, 232, 1)",
                            position: 'left',
                            align: "left",
                            verticalAlign: "middle",
                            fontSize: 13,
                            rich: rich
                        }
                    },
                }
            ]
        };
    return option;
}
</script>
<style scoped>
.sever-item {
    position: relative;
    height: 100%;
    width: calc(25% - 14px);
    background-color: var(--mtabletrcolor);
    float: left;
    margin-left: 10px;
}

.sever-item:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 10;
    height: 3.6vh;
    background: linear-gradient(180deg, #0299f5 0, #132a61);
    transform-origin: top center;
    transform: perspective(4vh) rotateX(-12deg);
}

.sever-title {
    position: relative;
    height: 30px;
    line-height: 30px;
    font-size: 1rem;
    text-align: center;
    color: white;
}
</style>