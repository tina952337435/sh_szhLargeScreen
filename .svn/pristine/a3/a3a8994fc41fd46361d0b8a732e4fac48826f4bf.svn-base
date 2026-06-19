<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" v-if="showClick" @click="fangda()">数据库资源</p>
                <span class="spanTitle"></span>
            </div>
            <div style="width:calc(100% - 200px);margin-left:40px;" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'tongji' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('tongji')">
                    站点分类</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'daobaolu' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('daobaolu')">
                    行政分类</div>
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
const dateid = ref("jiaohuan");
const Typeswiper = ref("tongji");

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
    const strJson = [
        { stnm: "水位", num: 1673 },
        { stnm: "雨量", num: 2011 },
        { stnm: "流量", num: 1298 },
        { stnm: "工情", num: 2768 },
        { stnm: "水质", num: 852 },
        { stnm: "视频", num: 2671 },
    ]
    const strNote = [];
    strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
    strNote.push({ name: "个数", codename: "num", tableV: "0", isShow: true });
    var LineColor = ["#3E8BFF", "#1CB8B2", "#01DDFF", "#F9C823", "#0264FD", "#FE7923", "#8E30FF",];
    const _Option = ChartJs.chartYL("", strJson, strNote, LineColor, "个数", "true", _theme, "", "", 0);
    lineOption.value = _Option;
    _Option.grid.bottom = 10;
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
    dateid.value = "datatoReportRate1";
}
</script>
<style scoped></style>