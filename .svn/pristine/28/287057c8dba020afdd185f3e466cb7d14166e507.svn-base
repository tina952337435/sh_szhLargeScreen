<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">平均水位</p>
            <div style="width:calc(100% - 200px);margin-left:80px;" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'other' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('other')">
                    深层</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'all' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('all')">
                    浅层</div>
            </div>
        </div>
        <div class="txt" style="overflow-y: auto;">
            <EchartsList :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
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
        { "tm": "2025-03", "shnaghai": "1.15", "jiangsu": "2.21", "zhejiang": "1.67", "anhui": "1.08", "fujian": "1.74" },
        { "tm": "2025-04", "shnaghai": "1.47", "jiangsu": "1.93", "zhejiang": "1.51", "anhui": "1.01", "fujian": "1.54" },
        { "tm": "2025-05", "shnaghai": "1.28", "jiangsu": "2.36", "zhejiang": "2.13", "anhui": "1.28", "fujian": "1.53" },
        { "tm": "2025-06", "shnaghai": "1.65", "jiangsu": "2.15", "zhejiang": "1.75", "anhui": "1.5", "fujian": "2.11" },
        { "tm": "2025-07", "shnaghai": "1.34", "jiangsu": "1.85", "zhejiang": "1.62", "anhui": "1.32", "fujian": "2.09" },
        { "tm": "2025-08", "shnaghai": "1.18", "jiangsu": "2.13", "zhejiang": "1.43", "anhui": "1.15", "fujian": "1.85" },
        { "tm": "2025-09", "shnaghai": "1.46", "jiangsu": "2.09", "zhejiang": "1.3", "anhui": "1.5", "fujian": "1.89" },
    ]

    var LineColor = ["#01F3FF", "#efc30a", "#00fd6d", "#FEA5F5", "#0561F5"];
    const strNote = [];
    strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
    strNote.push({ name: "上海市", codename: "shnaghai", tableV: "0", isShow: true });
    strNote.push({ name: "江苏省", codename: "jiangsu", tableV: "0", isShow: true });
    strNote.push({ name: "浙江省", codename: "zhejiang", tableV: "0", isShow: true });
    strNote.push({ name: "安徽省", codename: "anhui", tableV: "0", isShow: true });
    strNote.push({ name: "福建省", codename: "fujian", tableV: "0", isShow: true });
    const _Option = ChartJs.chartSW("", result, strNote, LineColor, "(m)", "", _theme, 80, 20);
    lineOption.value = _Option;
    datekey.value = Date.now();
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
}
</style>
