<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">累计雨量排名前5</p>
            <!-- <div style="width:calc(100% - 200px);margin-left:10px;" class="div-swiper">
                <div class="swiper-slide" style="width: 33.3%;"
                    :class="Typeswiper == 'other' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('other')">
                    注册数量</div>
                <div class="swiper-slide" style="width: 33.3%;"
                    :class="Typeswiper == 'daobaolu' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('daobaolu')">
                    调用次数</div>
                <div class="swiper-slide" style="width: 33.3%;"
                    :class="Typeswiper == 'daobaolu' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('daobaolu')">
                    响应时长</div>
            </div> -->
        </div>
        <div class="txt" style="overflow-y: auto;">
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
import Echarts from "@/components/MyEcharts/echartsLine.vue";
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
const dateid = ref('shujugx');
const lineOption = ref({});
const trendsTooltip = ref();
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const tableHeaders = ref([
    { name: "type", label: "数据类型" },
    // { name: "pl", label: "频率" },
    { name: "fasong", label: "已收数据量(条)" },
    { name: "jieshou", label: "应收数据量(条)" },
    { name: "dbl", label: "到报率 " },
    { name: "num", label: "调用次数" },
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


    const SLtotal = ['fxwz', 'qxdw', 'fxcl', 'yhry', 'yhcl'];
    const chartTM = ['新石洞', '曹家渡', '吴淞口', '黄渡', '赵屯', '望新', '嘉定南门',];
    const chartSL = ['88.5', '96.0', '99.5', '107.0', '108.0', '121.5', '141.5',]
    const _Option = ChartJs.chartTotalQX("", chartTM, chartSL, SLtotal, "数量", _theme);
    lineOption.value = _Option;
    datekey.value = new Date();
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
