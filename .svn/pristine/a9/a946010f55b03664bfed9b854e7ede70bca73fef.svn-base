<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" v-if="showClick" @click="fangda()">登录访问数据</p>
                <span class="spanTitle"></span>
            </div>
        </div>
        <div class="txt">
            <div class="m-list2 box-siz">
                <div
                    class="swiper-container gallery-thumbs1 swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-free-mode">
                    <div class="swiper-wrapper" id="swiper-wrapper-5989c4b8f4b43cf1" aria-live="polite">
                        <div class="swiper-slide swiper-slide-visible  swiper-slide-thumb-active" id="LoginDay"
                            onclick="OnClickTitle('gallery-thumbs1',this.id,'登录')" role="group" aria-label="1 / 3">
                            今日
                        </div>
                        <div class="swiper-slide swiper-slide-visible swiper-slide-next" id="LoginMonth"
                            onclick="OnClickTitle('gallery-thumbs1',this.id,'登录')" role="group" aria-label="2 / 3">
                            本月
                        </div>
                        <div class="swiper-slide swiper-slide-visible" id="LoginYear"
                            onclick="OnClickTitle('gallery-thumbs1',this.id,'登录')" role="group" aria-label="3 / 3">
                            今年
                        </div>
                    </div>
                    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                </div>

                <div class="left-conter">
                    <div class="left-conter-supply">
                        <span>总登录次数</span>
                        <div class="left-conter-tle" id="loginCount"></div>
                    </div>
                    <div class="right-conter">
                        <div class="right-conter-item hvr-pulse-grow">
                            <img src="" alt="" style="margin-right: 12px;">
                            <span>平台</span>
                            <div class="right-conter-tle" id="loginCountPC">35</div>次
                        </div>
                        <div class="right-conter-item hvr-pulse-grow">
                            <img src="" alt="" style="margin-right: 12px;">
                            <span>iPhone</span>
                            <div class="right-conter-tle" id="loginCountIOS">52</div>次
                        </div>
                        <div class="right-conter-item hvr-pulse-grow">
                            <img src="" alt="" style="margin-right: 12px;">
                            <span>Android</span>
                            <div class="right-conter-tle" id="loginCountAndroid">139</div>次
                        </div>
                    </div>
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

.m-list5 .swiper-container:first-child,
.m-list2 .swiper-container:first-child {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10px;
}
</style>