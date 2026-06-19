<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">整编</p>
            </div>
        </div>
        <div class="txt">
            <!-- <div class="desc flexDiv flexC">
                全流域今年以来水资源量
                <span>738.96</span>亿m³，
                较前一年
                <img src="/images/down-icon.png" alt="" style="margin: 0px 0px 0px 0.1rem;"><span>24.6</span>%
            </div> -->
            <div class="top flexDiv flexSB">
                <div class="topItem flexDivCol flexC">
                    <div class="name">2025年度整编站</div>
                    <div class="num"><span>1187</span>个</div>
                </div>
                <div class="topItem flexDivCol flexC">
                    <div class="name">日清旬(月)结完成率</div>
                    <div class="num"><span>100</span>%</div>
                </div>
                <div class="topItem flexDivCol flexC">
                    <div class="name">1949年来年鉴刊印</div>
                    <div class="num"><span>56630</span>站年</div>
                </div>
            </div>
            <div style="width: 100%;height: calc(100% - 80px);">
                <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <zhengbian />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import * as echarts from "echarts";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElButton, ElMessage, ElTable, ElTableColumn } from "element-plus";
import { setZOOM, dyCenter } from "@/utils/ArcGis/MapComm.js";
import { useStore } from "vuex";
import Dialog from "@/api/utils/Dialog.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const store = useStore();
const { viewer } = store.state;
const Typeswiper = ref('share');
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const lineOption = ref({});
const datekey = ref(null);
const dateid = ref("3DPei");
const trendsTooltip = ref();
function Weacontent() {
    var strNote = ["国家站", "地下水站", "大中型水库站", "环湖巡测站",];
    var data = [
        { name: "国家站", value: 725 },
        { name: "地下水站", value: 166 },
        { name: "大中型水库站", value: 190 },
        { name: "环湖巡测站", value: 106 },
    ];
    var LineColor = ["#01F3FF", "#efc30a", "#00fd6d", "#4498FF", "#9C34FF", "#B5F320", "#FFDC26", "#00CCFB", "#FF8526",];
    const _Option = ChartJs.chartPie3D(dateid.value, data, strNote, LineColor, "", _theme);
    // const _Option = ChartJs.echartSZPie(dateid.value, data, LineColor, _theme, true, WaterQualityTypeArr, ""); 
    lineOption.value = _Option;
    datekey.value = new Date();
    // let chartDom = document.getElementById(dateid.value);
    // let myChart = echarts.init(chartDom);
    // myChart.setOption(lineOption.value);
    // // myChart.on("click", eSLChage);
    // // 动态显示tootip
    // // 当前高亮图形所在下标
    // let currentIndex = -1;
    // // 取消之前高亮的图形
    // if (trendsTooltip.value != null) {
    //     clearInterval(trendsTooltip.value);
    // }
    // myChart.on('mouseover', function (params) {
    //     // 百分比  
    //     myChart.dispatchAction({
    //         type: "downplay",
    //         seriesIndex: 0,
    //         dataIndex: currentIndex,
    //     });
    //     myChart.dispatchAction({
    //         type: "showTip", // 根据 tooltip 的配置项显示提示框。
    //         seriesIndex: 0,
    //         dataIndex: params.dataIndex
    //     });
    //     currentIndex = params.dataIndex
    // })
    // // 鼠标移出
    // myChart.on('mouseout', function (params) {
    //     // 百分比  
    //     myChart.dispatchAction({
    //         type: "downplay",
    //         seriesIndex: 0,
    //         dataIndex: currentIndex,
    //     });
    // })
    // trendsTooltip.value = setInterval(function () {
    //     let dataLen = lineOption.value.series.data.length;
    //     myChart.dispatchAction({
    //         type: "downplay",
    //         seriesIndex: 0,
    //         dataIndex: currentIndex,
    //     });
    //     // 当前高亮图形
    //     currentIndex = (currentIndex + 1) % dataLen;
    //     myChart.dispatchAction({
    //         type: "highlight",
    //         seriesIndex: 0,
    //         dataIndex: currentIndex,
    //     });
    //     // 显示 tooltip
    //     // tootip每隔三秒依次显示
    //     myChart.dispatchAction({
    //         type: "showTip", // 根据 tooltip 的配置项显示提示框。
    //         seriesIndex: 0,
    //         dataIndex: currentIndex,
    //     });
    //     if (currentIndex >= lineOption.value.series.data.length) {
    //         currentIndex = 0;
    //     }
    // }, 1500);

}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    $(".g-bside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateid.value="3DPei2";
}
onMounted(() => {
    Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
.desc {
    width: 96%;
    margin: 0 auto;
    height: 40px;
    background-image: url(/images/csBg1.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 14px;
    color: var(--mtablecolor);
    letter-spacing: 0;
    font-weight: 500;
    padding: 10px 20px;
}

.flexSB {
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.flexDivCol {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-around;
}

.top {
    width: 100%;
    height: 60px;
    margin: 16px 0px 0px;
}

.topItem {
    width: 136px;
    height: 100%;
    background-image: url(/images/zb_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 14px;
    color: var(--mtablecolor);
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
}

.topItem .name {
    margin-top: 6px;
}

.topItem .num span {
    font-family: 'number';
    font-size: 20px;
    color: var(--titled1);
    letter-spacing: 0;
    font-weight: 400;
    margin-right: 5px;
}
</style>