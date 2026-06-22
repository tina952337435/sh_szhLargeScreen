<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p1" id="title2">地下水变化</p>
            </div>
        </div>
        <div class="txt">
            <div style="height: 46%;width: 100%;margin: 2% 0 2% 2%;display: flex;">
                <div class="DivTitle">深层区域</div>
                <div class="DivEchart">
                    <div style="width: 33%; height: 100%;">
                        <div class="DIVText">上升<span class="up">30</span>%</div>
                        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionSC1" :key="datekeySC1"
                            :id="dateidSC1" />
                    </div>
                    <div style="width: 33%; height: 100%;">
                        <div class="DIVText">稳定<span>35</span>%</div>
                        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionSC2" :key="datekeySC2"
                            :id="dateidSC2" />
                    </div>
                    <div style="width: 33%; height: 100%;">
                        <div class="DIVText">下降<span class="down">35</span>%</div>
                        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionSC3" :key="datekeySC3"
                            :id="dateidSC3" />
                    </div>
                </div>
                <div style="width:180px; height: 100%;">
                    <ul class="DIvul">
                        <li>上升最大：金泽<span>0.47</span>m</li>
                        <li>下降最大：平望<span>1.50</span>m</li>
                    </ul>
                </div>
            </div>
            <div style="height: 46%;width:100%;margin: 0 0 0 2%;display: flex;">
                <div class="DivTitle">浅层区域</div>
                <div class="DivEchart">
                    <div style="width: 33%; height: 100%;">
                        <div class="DIVText1">上升<span class="up">40</span>%</div>
                        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionQC1" :key="datekeyQC1"
                            :id="dateidQC1" />
                    </div>
                    <div style="width: 33%; height: 100%;">
                        <div class="DIVText1">稳定<span>30</span>%</div>
                        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionQC2" :key="datekeyQC2"
                            :id="dateidQC2" />
                    </div>
                    <div style="width: 33%; height: 100%;">
                        <div class="DIVText1">下降<span class="down">30</span>%</div>
                        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionQC3" :key="datekeyQC3"
                            :id="dateidQC3" />
                    </div>
                </div>
                <div style="width:180px; height: 100%;">
                    <ul class="DIvul">
                        <li>上升最大：甘露<span>1.07</span>m</li>
                        <li>下降最大：宜兴<span>1.21</span>m</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 800px">
        <EchartYPSL />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import MyDialog from "@/components/ComDialog.vue";
import SLLineSTCD from "@/components/danzhan/sl/SLLineSTCD.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import * as echarts from "echarts";

import { ref, onMounted, provide } from "vue";
import { SetNull } from '@/api/ComUnit';
const _theme = localStorage.getItem("curTheme");
// 深层
const datekeySC1 = ref(null);
const lineOptionSC1 = ref({});
const dateidSC1 = ref("dateidSC1");

const datekeySC2 = ref(null);
const lineOptionSC2 = ref({});
const dateidSC2 = ref("dateidSC2");

const datekeySC3 = ref(null);
const lineOptionSC3 = ref({});
const dateidSC3 = ref("dateidSC3");

// 浅层
const datekeyQC1 = ref(null);
const lineOptionQC1 = ref({});
const dateidQC1 = ref("dateidQC1");

const datekeyQC2 = ref(null);
const lineOptionQC2 = ref({});
const dateidQC2 = ref("dateidQC2");

const datekeyQC3 = ref(null);
const lineOptionQC3 = ref({});
const dateidQC3 = ref("dateidQC3");

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const props = defineProps({
    stcdVal: {
        type: String,
        default: "",
    },
    resultDataSL: {
        type: String,
        default: [],
    },
});
var myData = [];
function Weacontent() {
    const _OptionSC1 = ChartJs.chartBarRadius(dateidSC1, 45, 30, "#16FF8D", "上升30%", _theme);
    lineOptionSC1.value = _OptionSC1;
    datekeySC1.value = new Date();

    const _OptionSC2 = ChartJs.chartBarRadius(dateidSC2, 52, 35, "#F9C823", _theme);
    lineOptionSC2.value = _OptionSC2;
    datekeySC2.value = new Date();

    const _OptionSC3 = ChartJs.chartBarRadius(dateidSC3, 52, 35, "#FE1023", _theme);
    lineOptionSC3.value = _OptionSC3;
    datekeySC3.value = new Date();

    const _OptionQC1 = ChartJs.chartBarRadius(dateidQC1, 52, 40, "#16FF8D", "上升30%", _theme);
    lineOptionQC1.value = _OptionQC1;
    datekeyQC1.value = new Date();

    const _OptionQC2 = ChartJs.chartBarRadius(dateidQC2, 39, 30, "#F9C823", _theme);
    lineOptionQC2.value = _OptionQC2;
    datekeyQC2.value = new Date();

    const _OptionQC3 = ChartJs.chartBarRadius(dateidQC3, 39, 30, "#FE1023", _theme);
    lineOptionQC3.value = _OptionQC3;
    datekeyQC3.value = new Date();
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-rside ").css({ "z-index": 99 });
    $(".g-lside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateidRu.value = "Rusl1";
    dateidChu.value = "Chusl1";
}

onMounted(() => {
    Weacontent();
});
</script>
<style scoped>
.DivTitle {
    width: 40px;
    height: 100%;
    max-height: 160px;
    background-image: url(/images/projectType.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 16px;
    color: var(--mtablecolor);
    letter-spacing: 8px;
    line-height: 10px;
    font-weight: 600;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    text-orientation: upright;
    padding-right: 10px;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
}

.DivEchart {
    width: calc(100% - 200px);
    height: 100%;
    display: flex;
    align-items: center;
}

.DIVText {
    font-size: 14px;
    color: var(--mtablecolor);
    width: 22%;
    text-align: center;
    margin-top: 10px;
    position: absolute;
    top: 14%;
}

.DivEchart span,
.DIvul li span {
    font-family: 'number';
    font-size: 18px;
    color: #F9C823;
    font-weight: 600;
}

.DIVText1 {
    font-size: 14px;
    color: var(--mtablecolor);
    width: 22%;
    text-align: center;
    margin-top: 10px;
    position: absolute;
    top: 56%;
}

.DIvul {
    padding: 2.6rem 2px;
    margin: 0px;
    font-size: 14px;
    color: var(--mtablecolor);
    list-style: none;
}

.DIvul li {
    height: 30px;
    line-height: 30px;
}

.DIvul li::before {
    content: "\2022";
    /* 使用实体来创建点 */
    color: var(--titled1);
    /* 修改点的颜色 */
    display: inline-block;
    /* 确保它以块级元素显示 */
    width: 10px;
    font-size: 30px;
    /* 设置宽度 */
    margin-left: -0em;
    vertical-align: -6px;
    /* 对齐文本 */
}

.DivEchart .up,
.DIvul li:nth-child(1) span,
.DIvul li:nth-child(1)::before {
    color: #16FF8D;
}

.DivEchart .down,
.DIvul li:nth-child(2) span,
.DIvul li:nth-child(2)::before {
    color: #FE1023;
}
</style>