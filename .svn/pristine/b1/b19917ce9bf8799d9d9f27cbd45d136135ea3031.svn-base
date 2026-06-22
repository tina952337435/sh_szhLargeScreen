<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" v-if="showClick" @click="fangda()">测站统计</p>
                <span class="spanTitle"></span>
            </div>
        </div>
        <div class="txt">
            <div class="m-list2" id="echartZDTJ" style="padding:10px 10px;width:calc(100% - 20px);height:calc(100% - 20px);">
                    <div style="height:calc(50% - 10px);width:50%;float:left;">
                        <div style="height: 100%;width:3px;position: relative;background-image: initial;background-position: initial;background-repeat: initial;background-attachment: initial;background-origin: initial;background-clip: initial;background-color: rgb(74, 144, 226);border-radius: 5px;opacity: 1;float:left;"></div>
                        <div style="height: 100%;background-image: linear-gradient(90deg, rgba(14, 141, 246, 0.3) 0%, rgba(26, 44, 83, 0) 100%);padding-left:10%;padding-top: 5%;">
                            <div style="font-size:15px;height:30px;line-height:30px;color: #fff;">水位站</div>
                            <div style="font-size:15px;height:40px;line-height:40px;">
                                <span style="font-size:1.5rem;font-weight: 600;color: #0DD3ED;" id="swzCount">105</span>
                                <span style="font-size:14px;color:white;">个</span>
                            </div>
                        </div>

                    </div>
                    <div style="height:calc(50% - 10px);width:calc(50% - 20px);float:right;">
                        <div style="height: 100%;width:3px;position: relative;background-image: initial;background-position: initial;background-repeat: initial;background-attachment: initial;background-origin: initial;background-clip: initial;background-color: rgb(74, 144, 226);border-radius: 5px;opacity: 1;float:left;"></div>
                        <div style="height: 100%;background-image: linear-gradient(90deg, rgba(14, 141, 246, 0.3) 0%, rgba(26, 44, 83, 0) 100%);padding-left:10%;padding-top: 5%;">
                            <div style="font-size:15px;height:30px;line-height:30px;color: #fff;">雨量站</div>
                            <div style="font-size:15px;height:40px;line-height:40px;">
                                <span style="font-size:1.5rem;font-weight: 600;color: #0DD3ED;" id="ylzCount">369</span>
                                <span style="font-size:14px;color:white;">个</span>
                            </div>
                        </div>
                    </div>
                    <div style="height:calc(50% - 10px);width:50%;float:left;clear:both;margin-top:20px;">
                        <div style="height: 100%;width:3px;position: relative;background-image: initial;background-position: initial;background-repeat: initial;background-attachment: initial;background-origin: initial;background-clip: initial;background-color: rgb(74, 144, 226);border-radius: 5px;opacity: 1;float:left;"></div>
                        <div style="height: 100%;background-image: linear-gradient(90deg, rgba(14, 141, 246, 0.3) 0%, rgba(26, 44, 83, 0) 100%);padding-left:10%;padding-top: 5%;">
                            <div style="font-size:15px;height:30px;line-height:30px;color: #fff;" >泵闸站</div>
                            <div style="font-size:15px;height:40px;line-height:40px;">
                                <span style="font-size:1.5rem;font-weight: 600;color: #0DD3ED;" id="bzzCount">96</span>
                                <span style="font-size:14px;color:white;">个</span>
                            </div>
                        </div>
                    </div>
                    <div style="height:calc(50% - 10px);width:calc(50% - 20px);float:right;margin-top:20px;">
                        <div style="height: 100%;width:3px;position: relative;background-image: initial;background-position: initial;background-repeat: initial;background-attachment: initial;background-origin: initial;background-clip: initial;background-color: rgb(74, 144, 226);border-radius: 5px;opacity: 1;float:left;"></div>
                        <div style="height: 100%;background-image: linear-gradient(90deg, rgba(14, 141, 246, 0.3) 0%, rgba(26, 44, 83, 0) 100%);padding-left:10%;padding-top: 5%;">
                            <div style="font-size:15px;height:30px;line-height:30px;color: #fff;">视频点</div>
                            <div style="font-size:15px;height:40px;line-height:40px;">
                                <span style="font-size:1.5rem;font-weight: 600;color: #0DD3ED;"  id="spzCount">113</span>
                                <span style="font-size:14px;color:white;">个</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" style="width: 70%; height: 700px">
        <stationTJ :rainListSW="rainListSW" />
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

}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialog.value = true;
}
</script> 
  <style scoped>

  </style>