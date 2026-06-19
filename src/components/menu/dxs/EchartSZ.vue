<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">地下水水质统计</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialogZJ" @close="showDialogZJ = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <riverdmTongji />
    </ComZujian>

    <ComZujian :showDialog="showDialogSZ" @close="showDialogSZ = false" :title="titleNameSZ"
        style="width: 70%; height: 700px">
        <EchartSZ/>
    </ComZujian>
</template>


<script setup>
import ComZujian from "@/components/ComZujian.vue";
import api from "@/api/zonglan/index.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ElMessage } from "element-plus";
import { SetNull, groupBy, GetSZStateBy, GetSZState } from "@/api/ComUnit.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import * as echarts from "echarts";

import {
    onMounted,
    ref,
    shallowRef,
    defineAsyncComponent,
    nextTick,
    provide,
    inject,
    watch
} from "vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showDialogLine = ref(false);
const showDialogZJ = ref(false);
const shuju = ref();
// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();

// 判断弹窗是否显示,默认隐藏
const showDialogSZ = ref(false);
const titleNameSZ = ref();

const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("WaterQualityPie");

const trendsTooltip = ref();

var WaterQualitydata = inject("WaterQualitydata");
const szType = ref(null);

const props = defineProps({
    WaterQualitydataAll: {
        type: Array,
        default: () => []
    },
    etime: {
        type: String,
        default: "",
    },
});
watch(WaterQualitydata, () => {
    Weacontent();
});

function Weacontent() {
    // WaterQualitydata.value = props.WaterQualitydataAll;
    bindData();
}

function bindData() {
    console.error("WaterQualitydata",WaterQualitydata.value);
    var data = WaterQualitydata.value;
    var WaterQualityTypeArr = ["劣V类", "V类", "IV类", "III类", "II类", "I类"];
    var pieArrNew = [];
    var totalcount = data.length;
    for (var num = 0; num < WaterQualityTypeArr.length; num++) {
        var dataTemp = data.filter(res => {
            return res.statename == WaterQualityTypeArr[num];
        });
        var strWhereNew = {};
        strWhereNew["value"] = dataTemp.length;
        strWhereNew["name"] = WaterQualityTypeArr[num];

        var bili = ((dataTemp.length / totalcount) * 100).toFixed(0);
        console.error(dataTemp.length,totalcount,bili);
        strWhereNew["percent"] = bili;
        pieArrNew.push(strWhereNew);
    }
    var LineColor = [
        "#E10724",
        "#FD5B30",
        "#E0CF22",
        "#229FE0",
        "#27E022",
        "#8BEAC3"
    ];
    const _Option = ChartJs.echartSZPie(
        dateid.value,
        pieArrNew,
        LineColor,
        _theme,
        true,
        WaterQualityTypeArr,
        ""
    );
    lineOption.value = _Option;
    // datekey.value = Date.now();

    let chartDom = document.getElementById(dateid.value);
    let myChart = echarts.init(chartDom);
    myChart.setOption(lineOption.value);
    myChart.on("click", eSLChage);

    // 动态显示tootip
    // 当前高亮图形所在下标
    let currentIndex = -1;
    // 取消之前高亮的图形
    if (trendsTooltip.value != null) {
        clearInterval(trendsTooltip.value);
    }
    trendsTooltip.value = setInterval(function () {
        let dataLen = lineOption.value.series.data.length;
        myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        // 当前高亮图形
        currentIndex = (currentIndex + 5) % dataLen;
        myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        if (currentIndex >= lineOption.value.series.data.length) {
            currentIndex = 0;
        }
    }, 1000);
}

onMounted(() => {
    bindData();
});

function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialogZJ.value = true;
    dateid.value = "WaterQualityPie11";
}

//饼图点击事件
function eSLChage(e) {
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialogSZ.value = true;
    titleNameSZ.value = e.name;
    if (e.name == "劣V类") {
        szType.value = "6";
    } else if (e.name == "V类") {
        szType.value = "5";
    } else if (e.name == "IV类") {
        szType.value = "4";
    } else if (e.name == "III类") {
        szType.value = "3";
    } else if (e.name == "II类") {
        szType.value = "2";
    } else if (e.name == "I类") {
        szType.value = "1";
    }
}

provide("WaterQualitydata", WaterQualitydata);
provide("szType", szType);
</script>