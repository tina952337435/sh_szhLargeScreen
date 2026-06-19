<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" v-if="showClick" @click="fangda()">软件监控</p>
                <span class="spanTitle"></span>
            </div>
        </div>
        <div class="txt">
            <div class="left-conter">
                <div class="left-conter-supply">
                    <span>用户统计</span>
                    <div class="left-conter-tle" id="loginCount"></div>
                </div>
                <div class="right-conter">
                    <div class="right-conter-item hvr-pulse-grow">
                        <img src="" alt="" style="margin-right: 12px;">
                        <span>当前在线用户</span>
                        <div class="right-conter-tle" id="loginCountPC">5</div>人
                    </div>
                    <div class="right-conter-item hvr-pulse-grow">
                        <img src="" alt="" style="margin-right: 12px;">
                        <span>今日系统访问人次</span>
                        <div class="right-conter-tle" id="loginCountIOS">68</div>人
                    </div>
                    <div class="right-conter-item hvr-pulse-grow">
                        <img src="" alt="" style="margin-right: 12px;">
                        <span>今年登录人次</span>
                        <div class="right-conter-tle" id="loginCountAndroid">6289</div>人
                    </div>
                    <div class="right-conter-item hvr-pulse-grow">
                        <img src="" alt="" style="margin-right: 12px;">
                        <span>历史累计登录</span>
                        <div class="right-conter-tle" id="loginCountAndroid">190642</div>人
                    </div>
                </div>
            </div>
            <div class="top-conter">
                <ul>
                    <li>
                        <div class="div-circle" style="border: 5px solid #00fd6d;">
                            <p class="div-circle-info">门户</p>
                        </div>
                    </li>
                    <li>
                        <div class="div-circle" style="border: 5px solid #00fd6d;">
                            <p class="div-circle-info">四预</p>
                        </div>
                    </li>
                    <li>
                        <div class="div-circle" style="border: 5px solid #00fd6d;">
                            <p class="div-circle-info">水文业务</p>
                        </div>
                    </li>
                </ul>
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
.top-conter {
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 140px);
    overflow-y: auto;
}

.top-conter::-webkit-scrollbar {
    width: 2px;
    /* 设置滚动条宽度 */
}

.top-conter::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    background: var(--popContentHeadbg);
    z-index: 2;
}

.top-conter .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    background: var(--mtabletrcolor);
    color: var(--mtablecolor);
    border-radius: 6px;
    width: 94%;
    margin: 10px auto 10px;
    position: relative;
}

.top-conter .item .item-title {
    font-size: 14px;
    /* font-weight: bold; */
    width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.top-conter .item .item-time {
    position: absolute;
    right: 10px;
    font-size: 14px;
    opacity: 0.8;
}

.left-conter {
    display: flex;
    justify-content: normal;
    width: 100%;
    margin-top: 10px;
    height: 130px;
}

.left-conter .left-conter-supply {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 35%;
    font-size: 1rem;
    color: var(--mtablecolor);
    background: url(/images/loginDataBg.png) 0% 0% / 100% 100%;
    margin: 0px 10%;
}

.left-conter .left-conter-supply .left-conter-tle {
    margin: .25rem 0 1.125rem 0;
    /*font-family: AgencyFB-Bold;*/
    font-size: 1.2rem;
    font-weight: 400;
    /*font-style: italic;*/
    font-stretch: normal;
    letter-spacing: .0625rem;
    color: #f4fbff;
}

.right-conter {
    width: 55%;
    font-size: 1rem;
    color: var(--mtablecolor);
}

.right-conter-item {
    cursor: pointer;
    line-height: 1rem;
    display: flex;
    margin-bottom: 10%;
}

.right-conter-tle {
    margin-left: 10px;
    margin-right: 10px;
    /*font-family: AgencyFB-Bold;*/
    font-size: 1.4rem;
    font-weight: 600;
    font-stretch: normal;
    letter-spacing: 0;
    color: #0DD3ED;
    ;
}

.m-list5 .gallery-thumbs .swiper-slide,
.m-list2 .gallery-thumbs1 .swiper-slide {
    width: 33%;
}

.m-list5 .swiper-container:first-child,
.m-list2 .swiper-container:first-child {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10px;
}

.div-circle {
    border: 5px solid #0dd3ed;
    border-radius: 50%;
    /* text-align: center; */
    margin: 0px auto;
    text-align: center;
    width: 84px;
    height: 84px;
    /* padding: 5px 15px 0px 15px; */
    /*float: left;*/
    /* background: url(images/circle.png); */
}

.top-conter ul {
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
}

.top-conter p {
    font-size: 16px;
    margin: 5px;
    color: #25f3e6;
}

.top-conter ul li {
    width: 33.3%;
    height: 84px;
    cursor: pointer;
    float: left;
    display: inline-block;
}

.div-circle-info {
    font-size: 15px !important;
    color: var(--mtablecolor) !important;
    text-align: center !important;
    margin-top: 30px !important;
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