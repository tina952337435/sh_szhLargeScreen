<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">预报预演</p>
            <span class="spanTitle"></span>
            <div class="xiala"
                style="right: 5px;top: 6px;position: absolute;width:150px;line-height: 30px;cursor: pointer;">
                <label @click="showItem('fangan')" id="labelName"
                    style="position: absolute;right: 26px;font-size: 14px;font-family: var(--calcite-font-family);cursor: pointer;color:var(--mtablecolor);">
                    20251205预测分析
                </label>
                <img src="/images/icon_select.png" style="position:absolute;right:0px;margin-top: 2px;cursor: pointer;"
                    @click="showItem('fangan')">
                <ul class="el-dropdown-menu"
                    style="width:122px;height:212px;overflow-y:auto;margin-top:5px;font-family: var(--calcite-font-family);cursor: pointer;"
                    id="fangan">
                    <li v-for="item in SwiperData">{{ item.title }}</li>
                    <!-- <li>水雨情分析报告</li>
                    <li>汛情快报</li>
                    <li>汛期水位预报</li>
                    <li>专题预报</li>
                    <li>周预报</li>
                    <li>月预报</li>
                    <li>警响应单/取消单</li>
                    <li>编号洪水</li> -->
                </ul>
            </div>
        </div>
        <div class="txt" style="overflow-y: auto;height:calc(calc(100vh - 7.225rem)*(2/6));">
            <div class="m-list4 box-siz" id="tableSW">
                <div class="ysts-group" style="width:98%; display: flex;margin: 0px auto;" id="ysts-group-daibiao">
                    <div v-for="(item, index) in tableData" :key="index" class="ysts-item"
                        @click="loc(item.lgtd, item.lttd, item.stcd, item.stnm)">
                        <div class="ysts-name"><span class="ysts-numorder">{{ index + 1 }}</span> {{ item.stnm }}</div>
                        <div class="ysts-value">
                            最高：<span :class="item.groupCls" style="font-size: 1.3rem;">{{ item.upz }}</span>
                            <span class="ysts-unit">({{ item.tm }})</span><span style="padding-left: 70px;"></span>
                            涨幅：<span class="ysts-num font-agency color-min">{{ item.swzf }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table FirstTable" :border="0"
                :cellspacing="0" :cellpadding="0" @click="handleclick" /> -->
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableBXTJ />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";
import Dialog from "@/api/utils/Dialog.js";

const datekey = ref(null);
const tableHeaders = ref([
    { name: "stnm", label: "序号" },
    { name: "stnm", label: "站点" },
    { name: "upz", label: "预报水位" },
    { name: "wrz", label: "警戒(m)" },
    { name: "ivhz", label: "保证(m)" },
]);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);

function Weacontent() {
    var strParam = {};
    // strParam["pid"] = "2021082417454958997";
    //   strParam["stime"] = "2024-08-07 00:00:00";
    // strParam["etime"] = "2024-08-08 23:59:59";
    var nowTM = new Date();
    var endDate = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
    var startDate = dayjs(dayjs(endDate).format("YYYY-MM-DD HH:mm:ss"))
        .add(-8, "hour")
        .format("YYYY-MM-DD HH:mm:ss");

    // endDate = "2024-05-16 08:00:00";
    // startDate = "2024-05-16 05:00:00";
    var strParam = {};
    strParam["pid"] = "20241025000002";
    strParam["stime"] = startDate;
    strParam["etime"] = endDate;
    // api.stPptnWater(strParam).then((res) => {

    var strJson = [
        { "stnm": "太湖水位", "upz": "3.44", "wrz": "3.80", "grz": "4.65", "ivhz": "11", "year": "72", "paiBili": "15" },
        { "stnm": "王母观", "upz": "3.65", "wrz": "4.60", "grz": "5.60", "ivhz": "18", "year": "70", "paiBili": "26" },
        { "stnm": "坊前", "upz": "3.58", "wrz": "4.30", "grz": "4.60", "ivhz": "12", "year": "53", "paiBili": "23" },
        { "stnm": "宜兴 (西) ", "upz": "3.50", "wrz": "4.20", "grz": "5.20", "grz": "5.60", "ivhz": "18", "year": "70", "paiBili": "26" },
        { "stnm": "常州(三)", "upz": "3.82", "wrz": "4.30", "grz": "5.20", "ivhz": "8", "year": "70", "paiBili": "11" },
        { "stnm": "青阳", "upz": "3.79", "wrz": "4.20", "grz": "4.85", "ivhz": "4", "year": "70", "paiBili": "6" },
        { "stnm": "陈墅", "upz": "3.78", "wrz": "4.00", "grz": "4.80", "ivhz": "2", "year": "66", "paiBili": "3" },
        { "stnm": "无锡 (大)", "upz": "3.68", "wrz": "4.20", "grz": "4.80", "ivhz": "6", "year": "70", "paiBili": "9" },
        { "stnm": "陈墓(锦溪)", "upz": "3.18", "wrz": "3.60", "grz": "4.00", "ivhz": "6", "year": "64", "paiBili": "9" },
        { "stnm": "湘城", "upz": "3.31", "wrz": "3.70", "grz": "4.00", "ivhz": "4", "year": "70", "paiBili": "6" },
        { "stnm": "苏州(枫桥)", "upz": "3.41", "wrz": "4.10", "grz": "4.60", "ivhz": "8", "year": "47", "paiBili": "17" },
    ];
    var result = [];
    for (var num = 0; num < strJson.length; num++) {
        var item = strJson[num];
        var upz = item.upz != undefined ? Number(item.upz).toFixed(2) : "—";
        var wrz = item.wrz != undefined ? Number(item.wrz).toFixed(2) : "—";
        var grz = item.grz != undefined ? Number(item.grz).toFixed(2) : "—";
        var wrzCha = "—";
        var colorCss = "";
        if (wrz != "—" && upz != "—") {
            wrzCha = Number(Number(upz) - Number(wrz)).toFixed(2);
            if (Number(wrzCha) > 0) {
                colorCss = "#F9C33D";
            }
        }

        if (grz != "—" && upz != "—") {
            if (Number(Number(upz) - Number(grz)).toFixed(2) > 0) {
                colorCss = "#F70019";
            }
        }
        var tm = "—";
        if (item.tm != undefined) {
            tm = dayjs(item.tm).format("MM-DD HH:mm");
        }
        var _strParam = {};
        _strParam["stnm"] = SetNull(item["stnm"]).replaceAll(" ", "");
        _strParam["upz"] = upz;
        _strParam["wrz"] = wrz;
        _strParam["grz"] = grz;
        _strParam["wrzCha"] = wrzCha;
        _strParam["mtype"] = item.mtype;
        _strParam["tm"] = tm;
        _strParam["year"] = item.year;
        _strParam["paiBili"] = Number(item.paiBili);;
        _strParam["stcd"] = item.stcd;
        _strParam["lgtd"] = Number(item.lgtd);
        _strParam["lttd"] = Number(item.lttd);
        _strParam["colorCss"] = colorCss;
        _strParam["ivhz"] = item.ivhz;
        result.push(_strParam);
        tableData.value = result;
    }
    tableData.value = [
        { "stnm": "太湖水位", "upz": "3.88", "wrz": "3.80", "grz": "4.65", "tm": "08-07 17:00", "swzf": "0.08", groupCls: "color-wrz" },
        { "stnm": "平望", "upz": "3.72", "wrz": "3.80", "grz": "4.65", "tm": "08-07 17:00", "swzf": "0.02", groupCls: "color-wrz" },
        { "stnm": "金泽", "upz": "3.19", "wrz": "3.80", "grz": "4.65", "tm": "08-07 17:00", "swzf": "-0.01", groupCls: "color-zc" },
        { "stnm": "瓜泾口", "upz": "3.79", "wrz": "3.80", "grz": "4.65", "tm": "08-07 17:00", "swzf": "0.09", groupCls: "color-wrz" },
    ]
    // }).catch((err) => { });
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
    $(".g-lside ").css({ "z-index": 90 });
    $(".g-rside ").css({ "z-index": 99 });
    showDialog.value = true;
}
onMounted(() => {
    Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>

<style scoped>
.ysts-group {
    overflow-y: auto;
    overflow-x: hidden;
}

/* 自定义滚动条样式 */
.ysts-group::-webkit-scrollbar {
    width: 2px;
    /* 设置滚动条宽度 */
}

.ysts-group::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: 0px;
    top: 0px;
    background: var(--mtabletrcolor);
    z-index: 2;
}

.ysts-item {
    flex: 0 0 100%;
    margin: 5px 10px;
    /* padding: 0px 10px; */
    cursor: pointer;
    border-bottom: 0.12rem solid var(--portal);
    /* border-image: linear-gradient(90deg, #0e5892, #07111d) 20 20; */
    /* background: rgba(0, 255, 255, .2); */
    float: left;
    width: 100%;
}

.ysts-line {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    /*border-bottom: .02rem solid;
                border-image: linear-gradient(90deg,#0784e7,#103bb3) 20 20;*/
    border-bottom: 0.12rem solid;
    border-image: linear-gradient(90deg, #0e5892, #07111d) 20 20;
}

.ysts-name {
    font-size: 15px;
    /* color: #fff; */
    color: var(--sel_wraplabelcolor);
    /* font-family: '汉仪菱心体简'; */
    font-weight: 550;
    text-align: left;
    height: 28px;
    line-height: 28px;
}

.ysts-value {
    color: var(--ystsVvalue);
    padding: 5px 0px 5px 33px;
    font-size: 14px;
}

.ysts-value:before {
    left: 1.5vh;
    background: none;
}

.ysts-unit {
    font-size: 0.9rem;
}

.ysts-numorder {
    width: 26px;
    height: 26px;
    border-radius: 20px;
    display: block;
    /* background: #09469d82; */
    background: var(--mtabletrcolor);
    color: var(--mtablecolor) !important;
    line-height: 28px;
    text-align: center;
    float: left;
    margin-right: 10px;
    font-size: 0.9rem;
    z-index: 99;
}

.font-agency {
    font-family: AGENCYB, "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
}
</style>
