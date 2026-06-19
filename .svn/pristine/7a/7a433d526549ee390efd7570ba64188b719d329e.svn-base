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
            <div class="m-list5" id="zbTable" style="margin-top:20px;margin-left: revert;width:100%;">
                <div class="web-box">
                    <ul>
                        <li>
                            <div class="div-circle" style="border: 3px solid var(--titled1);">
                                <p class="div-circle-info">达梦</p>
                            </div>
                            <div class="div-circle-title">
                                <div style="color:var(--titled1);margin-top:10px;"><b>数据库</b></div>
                            </div>
                        </li>
                        <li>
                            <div class="div-circle" style="border: 3px solid var(--titled1);">
                                <p class="div-circle-info">oracle</p>
                            </div>
                            <div class="div-circle-title">
                                <div style="color:var(--titled1);margin-top:10px;"><b>数据库</b></div>
                            </div>
                        </li>
                        <li>
                            <div class="div-circle" style="border: 3px solid var(--titled1);">
                                <p class="div-circle-info">超图</p>
                            </div>
                            <div class="div-circle-title">
                                <div style="color:var(--titled1);margin-top:10px;"><b>GIS地图</b></div>
                            </div>
                        </li>
                        <li style="margin-top:40px;">
                            <div class="div-circle" style="border: 3px solid var(--titled1);">
                                <p class="div-circle-info">BP模型</p>
                            </div>
                            <div class="div-circle-title">
                                <div style="color:var(--titled1);margin-top:10px;"><b>模型</b></div>
                            </div>
                        </li>
                        <li style="margin-top:40px;">
                            <div class="div-circle" style="border: 3px solid var(--titled1);">
                                <p class="div-circle-info">东方通</p>
                            </div>
                            <div class="div-circle-title">
                                <div style="color:var(--titled1);margin-top:10px;"><b>中间件</b></div>
                            </div>
                        </li>
                        <li style="margin-top:40px;">
                            <div class="div-circle" style="border: 3px solid var(--titled1);">
                                <p class="div-circle-info">麒麟</p>
                            </div>
                            <div class="div-circle-title">
                                <div style="color:var(--titled1);margin-top:10px;"><b>操作系统</b></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName"
        style="width: 70%; height: 700px">
        <exchangeProgram :rainListSW="rainListSW" />
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
const dateid = ref("datatoReportRate");
const Typeswiper = ref("fuwu");

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
    lineOption.value = ChartJs.chartBalloon(_theme);
    datekey.value = Date.now();

}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 90 });
    $(".g-rside ").css({ "z-index": 99 });
    showDialog.value = true;
    dateid.value = "datatoReportRate1";
}
</script>
<style scoped>
.left-conter {
    display: flex;
    justify-content: normal;
    width: 100%;
    margin-top: 30px;
    /*height: calc(100% - 60px);*/
}

.left-conter .left-conter-supply {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 35%;
    font-size: 1rem;
    color: rgb(255, 255, 255);
    background: url(/images/loginDataBg.png) 0% 0% / 100% 100%;
    margin: 0px 10%;
}

.left-conter .left-conter-supply .left-conter-tle {
    margin: .25rem 0 1.125rem 0;
    /*font-family: AgencyFB-Bold;*/
    font-size: 1.375rem;
    font-weight: 400;
    /*font-style: italic;*/
    font-stretch: normal;
    letter-spacing: .0625rem;
    color: #f4fbff;
}

.right-conter {
    width: 45%;
    font-size: 1.125rem;
    color: #fff;
}

.right-conter-item {
    cursor: pointer;
    line-height: 1.5rem;
    display: flex;
    margin-bottom: 10%;
}

.right-conter-tle {
    margin-left: 10px;
    margin-right: 10px;
    /*font-family: AgencyFB-Bold;*/
    font-size: 1.5rem;
    font-weight: 600;
    font-stretch: normal;
    letter-spacing: 0;
    color: #fec658;
}

.m-list5 .gallery-thumbs .swiper-slide,
.m-list2 .gallery-thumbs1 .swiper-slide {
    width: 33%;
}

.div-circle {
    border: 3px solid #0dd3ed;
    border-radius: 50%;
    /* text-align: center; */
    margin: 0px auto;
    text-align: center;
    width: 70px;
    height: 70px;
    /* padding: 5px 15px 0px 15px; */
    /*float: left;*/
    /* background: url(images/circle.png); */
}

.web-box ul {
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
}

.web-box p {
    font-size: 16px;
    margin: 5px;
    color: #25f3e6;
}

.web-box ul li {
    width: 33.3%;
    height: 70px;
    cursor: pointer;
    float: left;
    display: inline-block;
}

.div-circle-info {
    font-size: 15px !important;
    color: var(--mtablecolor) !important;
    text-align: center !important;
    margin-top: 25px !important;
    font-weight: bold;
}

.div-circle-title span {
    width: 175px;
    font-size: 14px;
    letter-spacing: 0;
    height: 16px;
    display: block;
    line-height: 28px;
    color: white;
}

.div-circle-title {
    font-size: 14px;
    text-align: center;
}
</style>