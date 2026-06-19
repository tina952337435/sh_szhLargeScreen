<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">数据接收</p>
            <div style="width:calc(100% - 200px);margin-left:70px;" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'other' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('other')">
                    站点数</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'all' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('all')">
                    总数</div>
            </div>
        </div>
        <div class="txt" style="overflow-y: auto;">
            <EchartsList :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
            <!-- <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table tableYQ tableYQSJ"
                :border="0" :cellspacing="0" :cellpadding="0" /> -->
            <div style="width: 140px; height:25%;position: absolute;bottom: -20px;right: 0px;">
                <div class="text-xiaolv" style="width:130px;margin:0px;">
                    <span style="padding-left:8px;color: var(--mtablecolor);">总数：</span>
                    <span class="gradient-text text-22 text-white">1210</span>
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableJS />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import EchartsList from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import * as echarts from "echarts";
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
const dateid = ref('shujujs');
const lineOption = ref({});
const trendsTooltip = ref();
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
// const tableHeaders = ref([
//     [
//         { name: "", label: "", colspan: 1 ,rowspan: 2},
//         { name: "", label: "文件接收", colspan: 2 },
//         { name: "", label: "数据入库情况(条)", colspan: 2 }
//     ],
//     [
//         { name: "name", label: "信息来源单位" },
//         { name: "jieshou", label: "已接收" },
//         { name: "chuli", label: "已处理" },
//         { name: "zdnum", label: "自动入库" },
//         { name: "rgnum", label: "人工干预入库" },
//     ]
// ]);
const tableHeaders = ref([
    { name: "name", label: "信息来源单位" },
    { name: "jieshou", label: "文件接收" },
    { name: "chuli", label: "文件处理" },
    { name: "zdnum", label: "数据入库(自动)" },
    { name: "rgnum", label: "数据入库(人工)" },
]);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
function GetType(type) {
    Typeswiper.value = type;
    Weacontent();
}

function Weacontent() {
    var result = [
        { name: "长江水利委员会水文局", jieshou: "68", chuli: "68", zdnum: "186", rgnum: "0", },
        { name: "报汛代遥测(浙闽)", jieshou: "116", chuli: "116", zdnum: "116", rgnum: "0", },
        { name: "上海市防汛信息中心", jieshou: "55", chuli: "55", zdnum: "3605", rgnum: "0", },
        { name: "江苏省水文水资源勘测局", jieshou: "168", chuli: "168", zdnum: "11008", rgnum: "0", },
        { name: "浙江省水文局", jieshou: "160", chuli: "160", zdnum: "145849", rgnum: "0", },
        { name: "安徽省水文局", jieshou: "113", chuli: "113", zdnum: "5036", rgnum: "0", },
        { name: "福建省水文水资源勘测局", jieshou: "530", chuli: "530", zdnum: "768505", rgnum: "0", },
    ]

    var strNote = ["水文局", "浙闽", "上海市", "江苏省", "浙江省", "安徽省", "福建省"];
    var data = [
        { name: "水文局", value: 68 },
        { name: "浙闽", value: 116 },
        { name: "上海市", value: 55 },
        { name: "江苏省", value: 168 },
        { name: "浙江省", value: 160 },
        { name: "安徽省", value: 113 },
        { name: "福建省", value: 530 },
    ];
    var LineColor = ["#01F3FF", "#efc30a", "#00fd6d", "#4498FF", "#9C34FF", "#B5F320", "#FFDC26", "#00CCFB", "#FF8526",];
    // const _Option = ChartJs.chartPie(dateid.value, data, strNote, LineColor, "", _theme);
    const _Option = ChartJs.echartSLpei(dateid.value, data, LineColor, _theme, true, strNote, "", false, 0);
    lineOption.value = _Option;
    let chartDom = document.getElementById(dateid.value);
    let myChart = echarts.init(chartDom);
    myChart.setOption(lineOption.value);
    // 动态显示tootip
    // 当前高亮图形所在下标
    let currentIndex = -1;
    // 取消之前高亮的图形
    if (trendsTooltip.value != null) {
        clearInterval(trendsTooltip.value);
    }
    trendsTooltip.value = setInterval(function () {
        let dataLen = lineOption.value.series[0].data.length;
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
        if (currentIndex >= lineOption.value.series[0].data.length) {
            currentIndex = 0;
        }
    }, 2000);
    // var colorCss = "#00e4ff";
    // if (_theme == "BlueTheme") {
    //     colorCss = "#5794ff";
    // } else {
    //     if (_theme == "VioletTheme") {
    //         colorCss = "#6457de";
    //     }
    // }
    // // 计算合计值
    // const totalObj = { name: "合计", jieshou: "0", chuli: "0", zdnum: "0", rgnum: "0", colorCss: colorCss };

    // // 遍历数组计算每个字段的总和
    // result.forEach(item => {
    //     totalObj.jieshou = (parseInt(totalObj.jieshou) + parseInt(item.jieshou)).toString();
    //     totalObj.chuli = (parseInt(totalObj.chuli) + parseInt(item.chuli)).toString();
    //     totalObj.zdnum = (parseInt(totalObj.zdnum) + parseInt(item.zdnum)).toString();
    //     totalObj.rgnum = (parseInt(totalObj.rgnum) + parseInt(item.rgnum)).toString();
    // });

    // // 将合计行插入到数组最前面
    // result.unshift(totalObj);
    // tableData.value = result;
}

function handleclick(evt) {
    const name = evt.target.innerText;
    const strJson = tableData.value.find(item => item.stnm === name);
    const ChildVue = defineAsyncComponent(() =>
        import("@/components/danzhan/sq/SQLine.vue")
    );
    const props = {};
    props["stcd"] = strJson["stcd"];
    props["stime"] = dayjs(new Date()).add(-24, "hour").format("YYYY-MM-DD HH:mm:ss");
    props["etime"] = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    props["mtype"] = strJson["mtype"];
    //ChildVue为弹窗中嵌入的slot
    Dialog.open({ title: strJson["stnm"] + "水位过程线", widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateid.value ='shujujs1';
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
    --text-opacity: 1;
    color: var(--mtablecolor);
}

.gradient-text {
    font-family: "number";
    background: linear-gradient(180deg, #ed9b42, #fef886);
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: 0;
    font-weight: 800;
    color: var(--titled1);
}
</style>
