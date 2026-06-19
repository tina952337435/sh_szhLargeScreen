<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" @click="fangda()">测站站别</p>
            <span class="spanTitle"></span>
            <div style="width:calc(100% - 120px);" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'nei' && 'swiper-slide swiper-slide-thumb-active'" @click="getType('nei')">
                    流域内</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'wai' && 'swiper-slide swiper-slide-thumb-active'" @click="getType('wai')">
                    流域片
                </div>
            </div>
        </div>
        <div class="txt" style="height: calc(calc(100vh - 12.225rem) * (2 / 6));">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
</template>
<script setup>
import MyDialog from "@/components/ComDialog.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import $ from "jquery";
import * as echarts from "echarts";
import { ref, onMounted, watch, provide, } from "vue";
import { SetNull } from "@/api/ComUnit";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const dateid = ref("echartTotalQX");
const emergencyList = [];
const Typeswiper = ref('nei');
const props = defineProps({
    chartTM: {
        type: Array,
        default: () => []
    },
    chartSL: {
        type: Array,
        default: () => []
    },
    TableData: {
        type: Array,
        default: () => []
    },
    SLtotal: {
        type: String,
        default: "",
    }
});
// 判断弹窗是否显示,默认隐藏
const showDialogZD = ref(false);
const titleNameZD = ref('');
watch(props, () => {
    Weacontent();
})
function getType(type) {
    Typeswiper.value = type;
}
function Weacontent() {
    // console.error("总数据TableData", props.TableData);

    const SLtotal = ['fxwz', 'qxdw', 'fxcl', 'yhry', 'yhcl'];
    const chartTM = ['潮位站', '水质站','流量站', '降水站', '雨量站', '水文站',];
    const chartSL = ['147', '430', '550', '1378','7001', '7980',]
    const _Option = ChartJs.chartTotalQX("", chartTM, chartSL, SLtotal, "数量", _theme);
    lineOption.value = _Option;
    datekey.value = new Date();
    // let chartDom = document.getElementById(dateid.value);
    // let myChart = echarts.init(chartDom);
    // myChart.setOption(lineOption.value);
    // myChart.on("click", eSLChage);
}
//点击事件
function eSLChage(e) {
    $(".g-lside ").css({ "z-index": 90 });
    $(".g-rside ").css({ "z-index": 99 });
    // emergencyList.value = props.TableData;
    const v = props.TableData.filter(item => {
        return item.type === e.name;
    });
    emergencyList.value = v;
    // console.error("v", v)
    showDialogZD.value = true;
    titleNameZD.value = e.name;
}
onMounted(() => {
    Weacontent();
});
</script>