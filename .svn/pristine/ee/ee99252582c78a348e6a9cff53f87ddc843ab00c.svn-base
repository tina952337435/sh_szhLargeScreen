<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">超警超保统计(统计站数：{{ totalCount }})</p>
        </div>
        <div class="txt">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" style="width: 70%; height: 700px">
        <CJEChart :CJData="props.CJData" :CJCount="props.CJCount"/>
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import $ from "jquery";
import dayjs from "dayjs";

import { ref, onMounted, watch } from "vue";
import { number } from "echarts";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("DBZCJCB");
const totalCount = ref(0);
const props = defineProps({
    CJData: {
        type: Array,
        default: []
    },
    CJCount: {
        type: Array,
        default: ""
    },
});
var strJson = props.CJData;
watch(props.CJData, () => {
    Weacontent();
});
function Weacontent() {
    totalCount.value = props.CJCount;
    var LineColor = ['#F6903D', '#D95053'];
    var strNote = [];
    strNote.push({ "name": "方案", "codename": "DD_NAME", "tableV": "1", "isShow": true, "width": "40%" });
    strNote.push({ "name": "超警个数", "codename": "WRZ_COUNT", "tableV": "1", "isShow": true, "width": "30%" });
    strNote.push({ "name": "超保个数", "codename": "GRZ_COUNT", "tableV": "1", "isShow": true, "width": "30%" });
    const _Option = ChartJs.chartCJCBTJ("", strJson, strNote, LineColor, "数量(个)", _theme);
    lineOption.value = _Option;
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
    dateid.value = "DBZCJCB1";
}
onMounted(() => {
    if (props.CJData != null) {
        Weacontent();
    }
});
</script>
  