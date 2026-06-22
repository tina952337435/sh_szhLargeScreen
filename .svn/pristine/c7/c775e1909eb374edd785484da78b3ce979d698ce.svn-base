<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">数据监控</p>
            <div style="width:calc(100% - 220px);margin-left:70px;" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'other' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('other')">
                    数据量</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'all' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('all')">
                    到报率</div>
            </div>
        </div>
        <div class="txt">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
            <!-- <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table tableYQ" :border="0"
                :cellspacing="0" :cellpadding="0" /> -->
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableGX />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";

import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";
import Dialog from "@/api/utils/Dialog.js";
const Typeswiper = ref('other');
const datekey = ref(null);
const dateid = ref('shujuliang');
const lineOption = ref({});
const trendsTooltip = ref();
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const tableHeaders = ref([
    { name: "type", label: "数据类型" },
    // { name: "pl", label: "频率" },
    { name: "fasong", label: "已收数据量(条)" },
    { name: "jieshou", label: "应收数据量(条)" },
    { name: "num", label: "数据量" },
    { name: "dbl", label: "到报率 " },
]);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
function Weacontent() {
    var result = [
        { type: "水位", pl: "5分钟", fasong: "14498", jieshou: "31187", dbl: "46.49%", "num": "1498" },
        { type: "雨量", pl: "5分钟", fasong: "3455", jieshou: "5578", dbl: "61.94%", "num": "3155" },
        { type: "流量", pl: "5分钟", fasong: "10964", jieshou: "18649", dbl: "58.79%", "num": "1964" },
        { type: "工程", pl: "5分钟", fasong: "9468", jieshou: "32092", dbl: "29.50%", "num": "4468" },
        { type: "水质", pl: "10分钟", fasong: "14685", jieshou: "21653", dbl: "67.82%", "num": "1465" },
        { type: "视频", pl: "5分钟", fasong: "14498", jieshou: "31187", dbl: "46.49%", "num": "1448" },
    ]
    tableData.value = result;


    // var strNote = ["水位", "雨量", "大中型流量库站", "工程",];
    // var data = [
    //     { name: "水位", value: 1498 },
    //     { name: "雨量", value: 3155 },
    //     { name: "流量", value: 1964 },
    //     { name: "工程", value: 4468 },
    //     { name: "水质", value: 1465 },
    //     { name: "视频", value: 1448 },
    // ];
    var LineColor = ["#01F3FF", "#efc30a", "#00fd6d", "#4498FF", "#9C34FF", "#B5F320", "#FFDC26", "#00CCFB", "#FF8526",];
    // const _Option = ChartJs.chartPie3D(dateid.value, data, strNote, LineColor, "", _theme);
    // // const _Option = ChartJs.echartSZPie(dateid.value, data, LineColor, _theme, true, WaterQualityTypeArr, ""); 
    // lineOption.value = _Option;
    // datekey.value = new Date();

    var data = [
        { "stnm": "水位", "shanghai": "822", "jiangsu": "391", "zhejiang": "555", "anhui": "454", "fujian": "154" },
        { "stnm": "雨量", "shanghai": "837", "jiangsu": "117", "zhejiang": "655", "anhui": "654", "fujian": "154" },
        { "stnm": "流量", "shanghai": "892", "jiangsu": "155", "zhejiang": "755", "anhui": "454", "fujian": "54" },
        { "stnm": "工程", "shanghai": "672", "jiangsu": "524", "zhejiang": "155", "anhui": "444", "fujian": "554" },
        { "stnm": "水质", "shanghai": "749", "jiangsu": "524", "zhejiang": "755", "anhui": "114", "fujian": "354" },
        { "stnm": "山洪", "shanghai": "549", "jiangsu": "354", "zhejiang": "455", "anhui": "356", "fujian": "454" },
    ]
    const strNote = [];
    strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
    strNote.push({ name: "上海市", codename: "shanghai", tableV: "0", isShow: true });
    strNote.push({ name: "江苏省", codename: "jiangsu", tableV: "0", isShow: true });
    strNote.push({ name: "浙江省", codename: "zhejiang", tableV: "0", isShow: true });
    strNote.push({ name: "安徽省", codename: "anhui", tableV: "0", isShow: true });
    strNote.push({ name: "福建省", codename: "fujian", tableV: "0", isShow: true });
    // var LineColor = ["#01DDFF", "#F9C823", "#8E30FF", "#16FF8D", "#0264FD",];
    // const _Option = ChartJs.chartBar("", data, strNote, LineColor, "数据量(条)", "true", _theme, "时间", "", 0);
    const _Option = echartline(_theme);
    lineOption.value = _Option;
    datekey.value = new Date();
}
function echartline(theme) {
    var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
    if (theme == "BlueTheme" || theme == "VioletTheme") {
        toolboxColor = "#ccc";
        axisLabelColor = "#000";
        axisLineColor = "#000";
        splitLineColor = "#eee";
        legendColor = "#000";
        labelColor = "#0099FF";
        titleColor = 'rgba(0,0,0,0.70)';
    } else if (theme == "default") {
        toolboxColor = "#074159";
        axisLabelColor = "#00FFFF";
        axisLineColor = "#00FFFF";
        splitLineColor = "#074159";
        legendColor = "#fff";
        labelColor = "#57CDF9";
        titleColor = 'rgba(255,255,255,0.60)';
    }
    // 数据定义
    const dataArr = {
        xdata: ['上海市', '江苏省', '浙江省', '安徽省', '福建省'],
        result: [
            { name: '水位', data: [0, 435, 490, 340, 320, 270, 360] },
            { name: '雨量', data: [150, 220, 210, 310, 140, 180, 288] },
            { name: '流量', data: [250, 120, 240, 280, 240, 180, 188] },
            { name: '工程', data: [180, 420, 370, 250, 210, 180, 228] },
            { name: '水质', data: [130, 210, 340, 240, 220, 180, 218] },
            { name: '气象', data: [210, 260, 230, 220, 260, 180, 388] }
        ]
    }

    // 渐变色定义
    const color = [
        // [{ offset: 0, color: "#f67c20" }, { offset: 0.5, color: "#f67c20" }, { offset: 0.5, color: "#cc681e" }, { offset: 1, color: "#cc681e" }],
        [{ offset: 0, color: "#32ffee" }, { offset: 0.5, color: "#32ffee" }, { offset: 0.5, color: "#00e8d5" }, { offset: 1, color: "#00e8d5" }],
        [{ offset: 0, color: "#F679F9" }, { offset: 0.5, color: "#F672F9" }, { offset: 0.5, color: "#F641F9" }, { offset: 1, color: "#F669F9" }],
        [{ offset: 0, color: "#efff37" }, { offset: 0.5, color: "#efff37" }, { offset: 0.5, color: "#d5e700" }, { offset: 1, color: "#d5e700" }],
        [{ offset: 0, color: "#46c9ff" }, { offset: 0.5, color: "#46c9ff" }, { offset: 0.5, color: "#00b4ff" }, { offset: 1, color: "#00b4ff" }],
        [{ offset: 0, color: "#54a0ff" }, { offset: 0.5, color: "#54a0ff" }, { offset: 0.5, color: "#1f83ff" }, { offset: 1, color: "#1f83ff" }],
        [{ offset: 0, color: "#54E600" }, { offset: 0.5, color: "#2DF927" }, { offset: 0.5, color: "#00D700" }, { offset: 1, color: "#54E600" }],
    ]

    // 初始化图例状态
    const selected = {};
    dataArr.result.forEach(item => selected[item.name] = true);

    // 计算顶部菱形数据
    function calcTopDiamondData(selected) {
        return dataArr.result.map((s, i) => {
            if (!selected[s.name]) return s.data.map(_ => 0);
            return s.data.map((v, idx) => {
                let sum = 0;
                for (let j = 0; j <= i; j++) {
                    if (selected[dataArr.result[j].name]) {
                        sum += dataArr.result[j].data[idx];
                    }
                }
                return sum;
            });
        });
    }

    // 计算底部菱形数据
    function calcBottomDiamondData(selected) {
        return dataArr.result.map((s, i) => {
            if (!selected[s.name]) return s.data.map(_ => 0);

            return s.data.map((v, idx) => {
                // 找出当前显示的最底层 series
                let bottom = 0;
                let bottomIndex = -1;

                for (let j = 0; j <= i; j++) {
                    if (selected[dataArr.result[j].name]) {
                        // 检查是否是第一个被选中的系列
                        const isFirstSelected = Object.keys(selected).slice(0, j).every(k => !selected[k]);
                        if (isFirstSelected) {
                            bottom = dataArr.result[j].data[idx];
                            bottomIndex = j;
                            break;
                        }
                    }
                }

                // 只有当前系列是最底层时才显示底部菱形
                return (i === bottomIndex) ? bottom : 0;
            });
        });
    }
    function firstTrueIndex(obj) {
        const keys = Object.keys(obj); // 获取对象的键顺序
        for (let i = 0; i < keys.length; i++) {
            if (obj[keys[i]]) return i; // 找到第一个 true 返回下标
        }
        return -1; // 如果没有 true，返回 -1
    }

    // 创建系列数据
    function createSeries(selected) {
        const topData = calcTopDiamondData(selected);
        const bottomData = calcBottomDiamondData(selected);
        let colorIndex = firstTrueIndex(selected);
        return dataArr.result.map((c, i) => {
            return [
                // 主柱
                {
                    z: i + 1,
                    stack: '总量',
                    type: 'bar',
                    name: c.name,
                    barGap: '-100%',
                    barWidth: 30,
                    data: c.data,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0, x2: 1, y: 0, y2: 0,
                            colorStops: color[i]
                        }
                    }
                },
                // 顶部菱形
                {
                    z: i + 10,
                    type: 'pictorialBar',
                    name: c.name,
                    symbolPosition: 'end',
                    symbol: 'diamond',
                    symbolOffset: [0, '-50%'],
                    symbolSize: [30, 10],
                    data: topData[i],
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0, x2: 1, y: 0, y2: 0,
                            colorStops: color[i]
                        }
                    },
                    tooltip: { show: false }
                },
                // 底部菱形
                {
                    z: i + 20,
                    type: 'pictorialBar',
                    name: c.name,
                    symbolPosition: 'start',
                    symbol: 'diamond',
                    symbolOffset: [0, '50%'],
                    symbolSize: [30, 10],
                    data: bottomData[i],
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0, x2: 1, y: 0, y2: 0,
                            colorStops: color[colorIndex]
                        }
                    },
                    tooltip: { show: false }
                }
            ];
        }).flat();
    }

    // 初始化系列
    let series = createSeries(selected);

    // ECharts 配置
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                let result = `<div style="font-weight:bold;margin-bottom:5px;">${params[0].axisValue}</div>`;
                let total = 0;

                params.forEach(param => {
                    if (param.seriesType === 'bar') {
                        console.error(param)
                        result += `<div style="display:flex;align-items:center;margin:3px 0;">
                                    <div style="width:10px;height:10px;background:${param.color.colorStops[0].color};margin-right:5px;"></div>
                                    ${param.seriesName}: <span style="font-weight:bold;margin-left:5px;">${param.value}</span>
                                    </div>`;
                        total += param.value;
                    }
                });
                result += `<div style="border-top:1px solid #ccc;margin-top:5px;font-weight:bold;height:20px;">
                            总计: <span style="margin-left:5px;">${total}</span>
                            </div>`;
                return result;
            }
        },
        legend: {
            data: dataArr.result.map(item => item.name),
            textStyle: {
                color: legendColor,
                fontSize: 14
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 15,
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 0,
            top: 40,
            containLabel: true
        },
        xAxis: {
            axisTick: {
                alignWithLabel: true,
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: axisLineColor
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 12,
                    color: axisLabelColor
                }
            },
            data: dataArr.xdata
        },
        yAxis: {
            splitLine: {
                show: true,
                lineStyle: {
                    color: splitLineColor
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: axisLineColor
                }
            },
            axisLabel: {
                fontSize: 14,
            },
        },
        series: series
    };
    return option;
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
onMounted(() => {
    Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
:deep(tr td:nth-child(1)) {
    width: 20vh !important;
}

tr td:nth-child(2) {
    width: 15vh;
}

tr td:nth-child(3) {
    width: 15vh;
}

tr td:nth-child(4) {
    width: 10vh;
}

tr td:nth-child(5) {
    width: 12vh;
}

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
    background: var(--mtabletrcolor);
    z-index: 2;
}

.text-xiaolv {
    height: 40px;
    width: 60px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--titled1);
    box-shadow: 0 0 10px var(--titled1), inset 0 0 10px var(--titled1);
    padding: 4px 10px;
    /* margin: 0px auto; */
    margin-top: 13px;
    line-height: 30px;
    color: var(--titled1);
    float: left;
    margin-right: 10px;
}

.text-22 {
    font-size: 22px;
}

.text-white {
    --text-opashanghai: 1;
    color: var(--mtablecolor);
}

.gradient-text {
    font-family: "number";
    background: linear-gradient(180deg, #ed9b42, #fef886);
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: 0;
    font-weight: 800;
}
</style>
