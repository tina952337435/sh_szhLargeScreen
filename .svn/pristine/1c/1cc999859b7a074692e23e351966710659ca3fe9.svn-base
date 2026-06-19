<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" @click="fangda()">
                <!-- 水文年鉴 -->
                <!-- <span style="font-size: 14px;padding:0px;">(截止2024年已纳入本平台总册数)</span> -->
                年度整编-站别统计
            </p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <!-- <div class="wqtitle" style="margin: 0px 0px 0px 10px;">
                <div class="titleDiv"></div>
                <div class="titleTxt">水文年鉴<span style="font-size: 12px;opacity: 0.8;">(截止2024年已纳入本平台总册数)</span>
                </div>
            </div> -->
            <!-- <div style="width: 100%;height: 120px;">
                <div class="widget-inline-box text-center fl">
                    <div class="SWImg"></div>
                    <p>水文年鉴</p>
                </div>
                <div class="widget-inline-box text-center fl">
                    <p>国家类</p>
                    <h3 class="def1ff" ref="Color25" style="height: 50px; line-height: 26px">
                        25
                    </h3>
                </div>
                <div class="widget-inline-box text-center fl">
                    <p>水库类</p>
                    <h3 class="def1ff" ref="Color25" style="height: 50px; line-height: 26px">
                        20
                    </h3>
                </div>
                <div class="widget-inline-box text-center fl">
                    <p>遥测类</p>
                    <h3 class="def1ff" ref="Color25" style="height: 50px; line-height: 26px">
                        5
                    </h3>
                </div>
            </div>
            <div style="width: 100%;height:60px;">
                <ul>
                    <li>水文、水位</li>
                    <li>降水、蒸发</li>
                </ul>
                <ul>
                    <li> 214个</li>
                    <li>703个</li>
                </ul>
                <ul>
                    <li>223个</li>
                    <li> 396个</li>
                </ul>
                <ul>
                    <li>142个</li>
                    <li>238个</li>
                </ul>
            </div> -->

            <div style="width: 100%;height:100%;">
                <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
            </div>
                
            <!-- <div class="wqtitle" style="margin: 0px 0px 0px 10px;">
                <div class="titleDiv"></div>
                <div class="titleTxt">资料系列
                </div>
            </div> -->
            <!-- <div style="width: 100%;height: 120px;">
                <div style="width: 33.3%; height: 100%; float: left">
                    <Echarts :width="'100%'" :height="'100%'" :option="lineOptionWater" :key="datekeyWater"
                        :id="dateidWater" />
                </div>
                <div style="width: 33.3%; height: 100%; float: left">
                    <Echarts :width="'100%'" :height="'100%'" :option="lineOptionRain" :key="datekeyRain"
                        :id="dateidRain" />
                </div>
                <div style="width: 33.3%; height: 100%; float: left">
                    <Echarts :width="'100%'" :height="'100%'" :option="lineOptionFlow" :key="datekeyFlow"
                        :id="dateidFlow" />
                </div>
            </div>
            <div style="width: 98%;height:236px;margin: 0px auto;">
                <table class="m-table" style="width: 100%;">
                    <tbody>
                        <tr>
                            <th>资料系列(年)</th>
                            <th>水位</th>
                            <th>降水</th>
                            <th>流量</th>
                        </tr>
                        <tr>
                            <td>
                                <div class="circle" style="background: #4498FF;"></div>&nbsp;&gt;70&nbsp;&nbsp;&nbsp;
                            </td>
                            <td>11<span class="spanPoint">(0.93%)</span></td>
                            <td>52<span class="spanPoint">(2.56%)</span></td>
                            <td>1<span class="spanPoint">(0.07%)</span></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circle" style="background: #16FF8D;"></div>&nbsp;50-70
                            </td>
                            <td>81<span class="spanPoint">(6.82%)</span></td>
                            <td>433<span class="spanPoint">(21.35%)</span></td>
                            <td>28<span class="spanPoint">(1.96%)</span></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circle" style="background: #01F3FF;"></div>&nbsp;30-50
                            </td>
                            <td>76<span class="spanPoint">(6.4%)</span></td>
                            <td>244<span class="spanPoint">(12.03%)</span></td>
                            <td>56<span class="spanPoint">(3.97%)</span></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circle" style="background: #EFC30A;"></div>&nbsp;10-30
                            </td>
                            <td>186<span class="spanPoint">(15.66%)</span></td>
                            <td>409<span class="spanPoint">(20.17%)</span></td>
                            <td>238<span class="spanPoint">(16.86%)</span></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="circle" style="background: #f94f00;"></div>&nbsp;&lt;10&nbsp;&nbsp;&nbsp;
                            </td>
                            <td>834<span class="spanPoint">(70.2%)</span></td>
                            <td>890<span class="spanPoint">(43.89%)</span></td>
                            <td>1089<span class="spanPoint">(77.12%)</span></td>
                        </tr>
                    </tbody>
                </table>
            </div> -->
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <TableCG />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { SetNull, groupBy, GetSZStateBy, GetSZState, getSZColor } from "@/api/ComUnit.js";
import { ref, onMounted, reactive, inject, watch, defineAsyncComponent, onUnmounted, h } from "vue";
import { ElInput, ElTable, ElTableColumn, ElMessage } from "element-plus";
import Dialog from "@/api/utils/Dialog.js";
import * as echarts from "echarts";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const tableHeaders = ref(null);
const tableData = ref([]);
const lineOptionWater = ref({});
const lineOptionRain = ref({});
const lineOptionFlow = ref({});
const dateidWater = ref("dateidWater");
const dateidRain = ref("dateidRain");
const dateidFlow = ref("dateidFlow");
const datekeyWater = ref("");
const datekeyRain = ref("");
const datekeyFlow = ref("");

const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("echartshuiwennianjian");

function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 90 });
    $(".g-rside ").css({ "z-index": 99 });
    showDialog.value = true;
}

const props = defineProps({
    strJsonZF: {
        type: Array,
        default: () => []
    }
});

watch(props.strJsonZF, () => {
    Weacontent();
})

// 判断弹窗是否显示,默认隐藏
const showDialogSZ = ref(false);
const titleNameSZ = ref();

function Weacontent() {
    var pieArrWater = [
        { "name": ">70", "value": 11 },
        { "name": "50-70", "value": 81 },
        { "name": "30-50", "value": 76 },
        { "name": "10-30", "value": 186 },
        { "name": "<10", "value": 834 },
    ]
    var LineColor = ["#4498FF", "#16FF8D", "#01F3FF", "#EFC30A", "#f94f00", "#B5F320", "#FFDC26", "#00CCFB", "#FF8526",];
    const _OptionWater = ChartJs.echartSLpei(dateidWater.value, pieArrWater, LineColor, _theme, "", [], "水位", false, 0, true);
    lineOptionWater.value = _OptionWater;
    datekeyWater.value = new Date();

    var pieArrRain = [
        { "name": ">70", "value": 52 },
        { "name": "50-70", "value": 433 },
        { "name": "30-50", "value": 244 },
        { "name": "10-30", "value": 409 },
        { "name": "<10", "value": 890 },
    ]
    const _OptionRain = ChartJs.echartSLpei(dateidRain.value, pieArrRain, LineColor, _theme, "", [], "降水", false, 0, true);
    lineOptionRain.value = _OptionRain;
    datekeyRain.value = new Date();

    var pieArrFlow = [
        { "name": ">70", "value": 1 },
        { "name": "50-70", "value": 28 },
        { "name": "30-50", "value": 56 },
        { "name": "10-30", "value": 238 },
        { "name": "<10", "value": 1089 },
    ]
    const _OptionFlow = ChartJs.echartSLpei(dateidFlow.value, pieArrFlow, LineColor, _theme, "", [], "流量", false, 0, true);
    lineOptionFlow.value = _OptionFlow;
    datekeyFlow.value = new Date();


    // var data = [
    //     { "stnm": "水文", "city": "703", "sk": "20" },
    //     { "stnm": "水位", "city": "614", "sk": "33" },
    //     { "stnm": "降水", "city": "490", "sk": "20" },
    //     { "stnm": "蒸发", "city": "198", "sk": "0" },
    // ]
    // const strNote = [];
    // strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
    // strNote.push({ name: "数量", codename: "city", tableV: "0", isShow: true });
    // var LineColor = ["#16FF8D", "#01DDFF", "#F9C823", "#0264FD", "#FE7923", "#8E30FF",];
    // const _Option = ChartJs.chartBar("", data, strNote, LineColor, "", "true", _theme,null,null,0,false,true);
    // lineOption.value = _Option;
    // datekey.value = new Date();
}

function Weacontent2(){  
    var LineColor=["#01FFFF","#91CC75","#E9C00A","#4498FF"];
    let imgSrc = "/images/zwzb.png"
    let pieData = [
    { name: '水文', value: 3320, },
    { name: '水位', value: 1120, },
    { name: '雨量', value: 1258, },
    { name: '蒸发', value: 2540, },
    ];
    let option = {
        // backgroundColor:"#041c3a",
        tooltip: {
            trigger: 'item',
            extraCssText:
                'width:auto;height:auto;background-color:#303742;color:#fff;border:none',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                color: 'rgba(252, 249, 249, 1)'
            },
        },
        graphic: {
            elements: [
                {
                    type: "image",
                    z: 6,
                    style: {
                    image: imgSrc,
                    width: 50,
                    height: 50,
                    backgroundColor: {
                        type: 'circle',
                        style: {
                            fill: '#062123',
                            r: 70
                        }
                    },
                    shadowBlur: 0,
                    shadowColor: "#000",
                    shadowOffsetX: 1,
                    shadowOffsetY: 1
                    },
                    left: "21.5%",
                    top: "38.5%"
                },
                {
                    type: "circle",
                    z: 5,
                    shape: {
                        cx: 0,
                        cy: 0,
                        r: 30
                    },
                    style: {
                    fill: '#062123',
                    stroke: '#060F1C',
                    lineWidth: 4
                    },
                    left: "20.6%",
                    top: "35%"
                }
            ]
        },
        legend: {
            itemWidth: 15,
            itemHeight: 15,
            textStyle: {
                color: 'unset'
            },
            orient: 'vertical',
            left: '60%',
            top: '15%',
            itemGap: 25,
            formatter: function (item) {
                const data = pieData;
                let sum = 0;
                data.forEach((item) => {
                    sum += parseInt(item.value);
                });
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name === item) {
                    return (
                        `${item}  ${data[i].value}`
                    );
                    }
                }
            }
        },
        color: LineColor,
        series: [
            {
                type: 'pie',
                radius: ['70%', '55%'],
                center: ['28%', '50%'],
                padAngle: 5,
                label: {
                    show: false,
                },
                itemStyle: {
                    borderWidth: 8,
                    borderRadius: 10,
                },
                emphasis: {
                    scale: false
                },
                data: pieData,
            },
            {
                type: 'pie',
                radius: ['45%', '35%'],
                center: ['28%', '50%'],
                padAngle: 5,
                label: {
                    show: false,
                },
                itemStyle: {
                    borderWidth: 8,
                    borderRadius: 10,
                    opacity: 0.5,
                },
                emphasis: {
                    scale: false
                },
                data: pieData,
            },
        ],
    };
    
    lineOption.value = option;
    datekey.value = new Date();
}

function run(rotate = -60, deg = 50) {
   lineOption.value.series[1].startAngle = rotate;
   let chartDomRu = document.getElementById(dateid.value);
   let myChart = echarts.init(chartDomRu);
   myChart.setOption(lineOption.value);
   myChart.resize();
   rotate -= 1;
   deg += 0.1;
   if (deg > 80) {
      deg = 50;
   }
   requestAnimationFrame(() => run(rotate, deg));
};

onMounted(() => {
    Weacontent();
    Weacontent2();
    
    run();
})
function handleclick(evt) {
}


</script>
<style src="@/assets/styles/style.css"></style>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
/* 自定义滚动条样式 */
.txt::-webkit-scrollbar {
    width: 2px;
    /* 设置滚动条宽度 */
}

.txt::-webkit-scrollbar-track {
    /* 滚动条轨道 */
    /* background: rgb(49, 139, 167); */
}

.txt::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    background: var(--popContentHeadbg);
    z-index: 2;
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

:deep(.el-tabs--card>.el-tabs__header) {
    padding: 0px;
    margin: 0px;
}

:deep(.el-tabs--card>.el-tabs__header) {
    border-bottom: 0px;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
    border: 0px;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
    background: var(--swDivSelectcolor);
    border-radius: 6px;
    border: var(--portalborder);
    min-width: 80px;
    /* padding: 8px; */
    height: 34px;
    line-height: 34px;
    color: var(--widgetcolor);
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
    background: var(--portal);
    border-radius: 6px;
    min-width: 80px;
    border: var(--portalborder);
    /* padding: 8px; */
    height: 34px;
    line-height: 34px;
    color: white;
    margin: 0px 5px;
}

:deep(.demo-tabs > .el-tabs__content) {
    border: none;
    background: transparent;
}

:deep(.el-table),
:deep(.el-table tr),
:deep(.el-table:not(.el-table--border) .el-table__cell) {
    background: transparent;
    color: var(--mtablecolor);
    border: none;
    --el-table-border-color: none;
}

:deep(.el-table__header-wrapper:not(.el-table--border) .el-table__cell) {
    color: var(--mtablethcolor);
}

:deep(.el-table .cell) {
    padding: 0 8px;
    white-space: nowrap;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell) {
    background-color: transparent;
}

:deep(.el-input) {
    --el-input-border-color: var(--mtablecolor);
    width: 200px;
    border-radius: 6px;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--mtablecolor) inset;
}

:deep(.el-input__inner) {
    color: var(--mtablecolor);
}

:deep(.el-table__body-wrapper .el-table__row:nth-child(even)) {
    background: var(--mtabletrcolor);
}

.widget-inline-box {
    text-align: center;
    color: var(--widgetcolor);
    width: 50%;
    padding: 10% 0;
    text-align: center;
    font-size: 14px;
    float: left;
    overflow: hidden;
    width: 24%;
    margin: 0 0.4%;
    background: var(--portal);
    /* background: var(--widgetColor); */
    padding: 1% 0;
    height: 100%;
}


.SWImg {
    background: var(--caseBtnDDCur) no-repeat center center;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: 10px auto 0px;
}

.widget-inline-box p {
    padding: 20px 0px;
}

.def1ff {
    color: var(--titled1);
    cursor: pointer;
    font-size: 26px;
}


ul {
    list-style: none;
    width: 25%;
    display: inline-block;
    /* padding-left: 26px; */
    margin-top: 6px;

}

ul li {
    width: 100%;
    display: block;
    color: var(--mtablecolor);
    height: 24px;
    line-height: 24px;
    font-size: 14px;
}

ul li:first-child:before {
    content: "\2022";
    /* 使用实体来创建点 */
    color: var(--titled1);
    /* 修改点的颜色 */
    display: inline-block;
    /* 确保它以块级元素显示 */
    width: 20px;
    font-size: 30px;
    /* 设置宽度 */
    margin-left: -1em;
    vertical-align: -6px;
    /* 对齐文本 */
}

ul li:nth-child(2):before {
    content: "\2022";
    /* 使用实体来创建点 */
    color: #EFC30A;
    /* 修改点的颜色 */
    display: inline-block;
    /* 确保它以块级元素显示 */
    width: 20px;
    font-size: 30px;
    /* 设置宽度 */
    margin-left: -1em;
    vertical-align: -6px;
    /* 对齐文本 */
}

.circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    background: #EFC30A;
}

.spanPoint {
    opacity: 0.8;
}
</style>