<template>
    <div class="m-box m-box-1">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" @click="fangda()">地下水监测站总体情况</p>
        </div>
        <div class="txt">
            <div style="width: 100%; height: 70px;">
                <ul class="year-type">
                    <li @click="getTab('water')" :class="tabActive == 'water' && ''">
                        <p>合计</p>
                        <p class="num">1893</p>
                    </li>
                    <div class="line"></div>
                    <li @click="getTab('flow')" :class="tabActive == 'flow' && 'active'">
                        <p>上海市</p>
                        <p class="num">313</p>
                    </li>
                    <div class="line"></div>
                    <li @click="getTab('rain')" :class="tabActive == 'rain' && 'active'">
                        <p>江苏省</p>
                        <p class="num">454</p>
                    </li>
                    <div class="line"></div>
                    <li @click="getTab('evap')" :class="tabActive == 'evap' && 'active'">
                        <p>浙江省</p>
                        <p class="num">447</p>
                    </li>
                    <div class="line"></div>
                    <li @click="getTab('sediment')" :class="tabActive == 'sediment' && 'active'">
                        <p>安徽省</p>
                        <p class="num">376</p>
                    </li>
                    <div class="line"></div>
                    <li @click="getTab('tide')" :class="tabActive == 'tide' && 'active'">
                        <p>福建省</p>
                        <p class="num">303</p>
                    </li>
                </ul>
            </div>
            <div style="width: 100%; height: calc(100% - 320px);">
                <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
            </div>
            <div style="height: 220px;margin: 10px 0px 0px 15px;width: 100%;">
                <div style="width: 48%; height: 100%; float: left">
                    <div class="icontitle font-pangmen font-pangmenRU">
                        <div class="title-name">地下水类型</div>
                    </div>
                    <Echarts :width="'100%'" :height="'100%'" :option="lineOptionType" :key="datekeyType"
                        :id="dateidType" />
                </div>
                <div style="width: 48%; height: 100%; float: left">
                    <div class="icontitle font-pangmen font-pangmenRU">
                        <div class="title-name">监测层位</div>
                    </div>
                    <Echarts :width="'100%'" :height="'100%'" :option="lineOptionJC" :key="datekeyJC" :id="dateidJC" />
                </div>
            </div>
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
import { ElButton, ElMessage, ElTable, ElTableColumn } from "element-plus";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const datekeyType = ref(null);
const lineOption = ref({});
const lineOptionType = ref({});
const datekeyJC = ref(null);
const lineOptionJC = ref({});
const dateid = ref("echartYear");
const dateidType = ref("echartYearType");
const dateidJC = ref("echartYearJC");
const trendsTooltip = ref();
const trendsTooltipJC = ref();
// 判断弹窗是否显示,默认隐藏
const emergencyList = [];
const tabActive = ref('water');
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
function getTab(tab) {
    // tabActive.value = tab;
}
function Weacontent() {
    var data = [
        { "stnm": "上海市", "city": "222", "sk": "91" },
        { "stnm": "江苏省", "city": "337", "sk": "117" },
        { "stnm": "浙江省", "city": "292", "sk": "155" },
        { "stnm": "安徽省", "city": "372", "sk": "4" },
        { "stnm": "福建省", "city": "249", "sk": "54" },
    ]
    const strNote = [];
    strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
    strNote.push({ name: "国土部", codename: "city", tableV: "0", isShow: true });
    strNote.push({ name: "水利部", codename: "sk", tableV: "0", isShow: true });
    var LineColor = ["#01DDFF", "#16FF8D", "#01DDFF", "#F9C823", "#0264FD", "#FE7923", "#8E30FF",];
    const _Option = ChartJs.chartBar("", data, strNote, LineColor, "站点(个)", "true", _theme, "时间", "", 0);
    lineOption.value = _Option;
    datekey.value = new Date();


    var strNoteType = ["孔隙水", "裂隙水", "岩溶水"];
    var data = [
        { name: "孔隙水", value: 359 },
        { name: "裂隙水", value: 44 },
        { name: "岩溶水", value: 18 },
    ];
    var LineColorType = ["#01F3FF", "#efc30a", "#00fd6d", "#4498FF", "#9C34FF", "#B5F320", "#FFDC26", "#00CCFB", "#FF8526",];
    const _OptionType = ChartJs.echartSLpei(dateidType.value, data, LineColorType, _theme, "", [], "", false, 0);
    lineOptionType.value = _OptionType;
    let chartDom = document.getElementById(dateidType.value);
    let myChart = echarts.init(chartDom);
    myChart.setOption(lineOptionType.value);
    // 动态显示tootip
    // 当前高亮图形所在下标
    let currentIndex = -1;
    // 取消之前高亮的图形
    if (trendsTooltip.value != null) {
        clearInterval(trendsTooltip.value);
    }
    trendsTooltip.value = setInterval(function () {
        let dataLen = lineOptionType.value.series[0].data.length;
        myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: currentIndex,
        });
        // 当前高亮图形
        currentIndex = (currentIndex + 1) % dataLen;
        myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: currentIndex,
        });
        if (currentIndex >= lineOptionType.value.series[0].data.length) {
            currentIndex = 0;
        }
    }, 2000);

    var dataJC = [
        { name: "潜水", value: 172 },
        { name: "承压水", value: 249 },
        { name: "混合水", value: 0 },
    ];
    var LineColorJC = ["#01F3FF", "#efc30a", "#00fd6d", "#4498FF", "#9C34FF", "#B5F320", "#FFDC26", "#00CCFB", "#FF8526",];
    const _OptionTypeJC = ChartJs.echartSLpei(dateidJC.value, dataJC, LineColorJC, _theme, "", [], "", false, 0);
    lineOptionJC.value = _OptionTypeJC;
    let chartDomJC = document.getElementById(dateidJC.value);
    let myChartJC = echarts.init(chartDomJC);
    myChartJC.setOption(lineOptionJC.value);
    // 动态显示tootip
    // 当前高亮图形所在下标
    let currentIndexJC = -1;
    // 取消之前高亮的图形
    if (trendsTooltipJC.value != null) {
        clearInterval(trendsTooltipJC.value);
    }
    trendsTooltipJC.value = setInterval(function () {
        let dataLen = lineOptionJC.value.series[0].data.length;
        myChartJC.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: currentIndexJC,
        });
        // 当前高亮图形
        currentIndexJC = (currentIndexJC + 1) % dataLen;
        myChartJC.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: currentIndexJC,
        });
        if (currentIndexJC >= lineOptionJC.value.series[0].data.length) {
            currentIndexJC = 0;
        }
    }, 2000);
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
<style scoped lang="scss">
:deep(.el-button--primary span) {
    padding-left: 0px;
}

.year-type {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 0px;
    margin: 0px 0px 0px 10px;
}

.year-type li {
    width: 16.4%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    list-style: none;
    // border-left: 1px solid var(--mtablecolor);
    cursor: pointer;
    border-radius: 6px;
}

.line {
    width: 1px;
    height: 30px;
    background: var(--titled1);
    margin: 0 auto;
}

.year-type li:first-child {
    border-left: none;
}

.year-type .active {
    background: var(--bgYear);
}

.year-type p {
    font-size: 14px;
    color: var(--mtablecolor);
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
}

.year-type .num {
    font-size: 20px;
    color: var(--mtablecolor);
}

.wqtitle {
    margin: 0px 10px;
    color: var(--title2);
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-bottom: 1px solid var(--wqtitleline);
    position: relative;
    font-size: 14px;
    height: 28px;
}

.titleDiv {
    width: 6px;
    height: 24px;
    line-height: 24px;
    display: inline-block;
    background: var(--popContentDiv);
}

.titleTxt {
    height: 24px;
    line-height: 24px;
    display: inline-block;
    vertical-align: 6px;
    margin-left: 4px;
    color: var(--popContentDiv);
}

.icontitle {
    margin-left: 50px;
    margin-top: 10px;
    color: var(--mtablecolor) !important;
}
</style>