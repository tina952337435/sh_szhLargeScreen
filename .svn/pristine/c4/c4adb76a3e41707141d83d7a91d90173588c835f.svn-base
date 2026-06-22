<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" @click="fangda()">年度整编-施测项目统计</p>
            <el-button type="primary" @click="MessageSearch()" style="position: absolute;right: 0px;"
                class="age-btn">在线整编系统<img style="width: 14px;margin-left:6px;" src="/images/Moreright.png"
                    alt="进入在线整编系统"></el-button>
        </div>
        <div class="txt" style="overflow-y: auto;height:calc(calc(100vh - 7.225rem)*(2/6));">
            <div style="width: 100%; height: 70px;">
                <ul class="year-type">
                    <li @click="getTab('water')" :class="tabActive == 'water' && 'active'">
                        <p>水位</p>
                        <p class="num">5789</p>
                    </li>
                    <div class="line"></div>
                    <li @click="getTab('flow')" :class="tabActive == 'flow' && 'active'">
                        <p>流量</p>
                        <p class="num">1378</p>
                    </li>
                    <div class="line"></div>
                    <li @click="getTab('rain')" :class="tabActive == 'rain' && 'active'">
                        <p>降水</p>
                        <p class="num">7001</p>
                    </li>
                    <div class="line"></div>
                    <li @click="getTab('evap')" :class="tabActive == 'evap' && 'active'">
                        <p>蒸发</p>
                        <p class="num">128</p>
                    </li>
                    <div class="line"></div>
                    <li @click="getTab('sediment')" :class="tabActive == 'sediment' && 'active'">
                        <p>泥沙</p>
                        <p class="num">16</p>
                    </li>
                    <div class="line"></div>
                    <li @click="getTab('tide')" :class="tabActive == 'tide' && 'active'">
                        <p>潮位</p>
                        <p class="num">147</p>
                    </li>
                </ul>
            </div>
            <div style="width: 100%; height: calc(100% - 70px);">
                <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
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
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const dateid = ref("echartYear");
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
    tabActive.value = tab;
}
function Weacontent() {
    // console.error("总数据TableData", props.TableData);

    const SLtotal = ['fxwz', 'qxdw', 'fxcl', 'yhry', 'yhcl'];
    const chartTM = ['地下水站', '水质站', '降水站', '水位站', '水文站',];
    const chartSL = ['54', '430', '150', '197', '36',]
    // const _Option = ChartJs.chartTotalQX("", chartTM, chartSL, SLtotal, "数量", _theme);
    var data = [
        // { "stnm": "省本级", "city": "0", "sk": "0" },
        { "stnm": "流域禸", "city": "20", "sk": "20" },
        { "stnm": "浙江", "city": "18", "sk": "33" },
        { "stnm": "上海", "city": "25", "sk": "20" },
        { "stnm": "江苏", "city": "9", "sk": "0" },
        { "stnm": "福建", "city": "24", "sk": "6" },
        { "stnm": "安徽", "city": "32", "sk": "25" },
        // { "stnm": "金华", "city": "16", "sk": "28" },
        // { "stnm": "衢州", "city": "10", "sk": "17" },
        // { "stnm": "舟山", "city": "2", "sk": "6" },
        // { "stnm": "台州", "city": "22", "sk": "18" },
        // { "stnm": "丽水", "city": "20", "sk": "26" },
    ]
    const strNote = [];
    strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
    strNote.push({ name: "国家类", codename: "city", tableV: "0", isShow: true });
    // strNote.push({ name: "水库类", codename: "sk", tableV: "0", isShow: true });
    var LineColor = ["#01DDFF", "#16FF8D", "#01DDFF", "#F9C823", "#0264FD", "#FE7923", "#8E30FF",];
    const _Option = ChartJs.chartBar("", data, strNote, LineColor, "", "true", _theme,null,null,0,false,true);
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
<style scoped lang="scss">
:deep(.el-button--primary span) {
    padding-left: 0px;
    color: #def1ff;
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
</style>