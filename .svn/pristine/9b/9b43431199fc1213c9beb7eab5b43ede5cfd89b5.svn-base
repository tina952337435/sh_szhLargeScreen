<template>
    <div style="height: calc(100% - 100px); width: 100%; margin-top: 10px">
        <div style="width:60%;" class="div-swiper">
            <div class="swiper-slide" style="width: 33.3%;"
                :class="Drpswiper == 'river' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('river')">
                河道水位线
            </div>
            <div class="swiper-slide" style="width:33.3%;"
                :class="Drpswiper == 'liuliang' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('liuliang')">
                圩区实时流量
            </div>
            <div class="swiper-slide" style="width:33.3%;"
                :class="Drpswiper == 'gongcheng' && 'swiper-slide swiper-slide-thumb-active'"
                @click="GetRiver('gongcheng')">
                河道工程
            </div>
        </div>
        <div class="content-echarts">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="WQriverLine"
                v-if="Drpswiper == 'river'" /> 
            <Echarts :width="'100%'" :height="'100%'" :option="lineOptionLL" :key="datekeyLL" id="WQriverLineLL"
                v-else-if="Drpswiper == 'liuliang'" />
            <div class="tableDiv" style="height:100%;width:100%;" v-else-if="Drpswiper == 'gongcheng'">
                <ul class="toptabTop">
                    <li :class="mtype == '闸站' && 'toptabToponlyliHover'" class="toptabToponlyli" @click="getType('闸站')">
                        闸站</li>
                    <li :class="mtype == '泵站' && 'toptabToponlyliHover'" class="toptabToponlyli" @click="getType('泵站')">
                        泵站</li>
                </ul>
                <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table riverGC-table"
                    :border="0" :cellspacing="0" :cellpadding="0" @click="handleclick"
                    style=" height: calc(100% - 20px);" />
            </div>
        </div>
    </div>
    <div id="divEchartsData" class="echartsmaxmindata">
    </div>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import * as echarts from "echarts";
import { groupBy, SetNull, sortObjectArray } from "@/api/ComUnit.js";
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElConfigProvider } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";
import customTable from "@/components/Table/customTable.vue";
import { getGeojson } from "@/api/Common/api.js"
import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const datekeyLL = ref(null);
const lineOptionLL = ref({});
const SQdata = ref({});
const stcd = ref("");
const stnm = ref("");
const Drpswiper = ref("river");
const mtype = ref("泵站");

const tableHeaders = ref([
    { name: "index", label: "序号" },
    { name: "stnm", label: "名称" },
    { name: "cityname", label: "流经区县" },
    { name: "ygtq", label: "排水流量" },
    { name: "pgtq", label: "引水流量" },
    // { name: "swmax", label: "极限安全水位" },
    { name: "fangdire", label: "运行方向" },
    { name: "typename", label: "类型" },
]);
const tableJson = ref();
const tableData = ref([]);
const props = defineProps({
    stcd: {
        type: String,
        default: "",
    },
    stnm: {
        type: String,
        default: "",
    },
    gqpid: {
        type: String,
        default: "",
    },
    swpid: {
        type: String,
        default: "",
    },
});

function GetRiver(obj) {
    Drpswiper.value = obj;
    loadAll(obj);
    if (obj == "river") {
        window.loadingShow();
        var nowTM = new Date();
        var endDate = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
        var startDate = dayjs(dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")).add(-3, "hour").format("YYYY-MM-DD HH:mm:ss");
        var strParam = {};
        strParam["pid"] = props.swpid;
        strParam["stime"] = startDate;
        strParam["etime"] = endDate;
        api.stPptnSQRiver(strParam).then((res) => {
            const strJson = res.result;
            if (strJson.length > 0) {
                for (var numII = 0; numII < strJson.length; numII++) {
                    var tempItem = strJson[numII];
                    if (SetNull(tempItem["upz"]) != "") {
                        if (Number(tempItem["upz"]) == 0) {
                            if (Number(tempItem["dwz"]) > 0) {
                                tempItem["upz"] = tempItem["dwz"];
                            }
                        }
                    }
                }
            }
            var strNote = [];
            if (strJson.length > 0) {
                strNote.push({ "name": "", "codename": "1", "tableV": "1", "isShow": true, "width": "20%" });
                strNote.push({ "name": strJson[0].stnm, "codename": strJson[0].stcd, "tableV": "1", "isShow": true, "width": "20%" })

                for (var num = 1; num < strJson.length; num++) {
                    for (var i = 0; i < parseInt(Number(strJson[num].distance) / 1000); i++) {
                        strNote.push({ "name": "", "codename": (i + 1), "tableV": "1", "isShow": true, "width": "20%" });
                    }
                    strNote.push({ "name": strJson[num].stnm, "codename": strJson[num].stcd, "tableV": "1", "isShow": true, "width": "20%" });
                }
                strNote.push({ "name": "", "codename": "13", "tableV": "1", "isShow": true, "width": "20%" });

            }
            const _Option = ChartJs.chartHD("", strJson, strNote, _theme);
            _Option.grid.bottom = 20;
            lineOption.value = _Option;
            let chartDom = document.getElementById("WQriverLine");
            let myChart = echarts.init(chartDom);
            myChart.clear();
            myChart.setOption(lineOption.value);
        }).catch((err) => { });
        window.loadingHide();
    }
    else if (obj == "gongcheng") {
        api.Wqbaserivergc({ "pid": props.stcd }).then((res) => {
            console.error(res.result)
            if (res.result.length > 0) {
                tableJson.value = res.result;

                getType(mtype.value);
                // tableData.value = res.result;
            }
        }).catch((err) => { });
    }
}
function loadAll(obj) {
    window.loadingShow();
    getGeojson("json/suzhouweiquAll.json").then((res) => {
        var WQJsonData = res["res"]["features"];
        var SNYHData = WQJsonData.filter(e => {
            if (e.properties && e.properties.river_name) {
                return e.properties.river_name.indexOf(stnm.value) > -1;
            }
            return false;
        });

        if (SetNull(props.gqpid) != "") {
            var nowTM = new Date();
            var etime = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
            var stime = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
            if (Number(dayjs(nowTM).format("HH")) > 7) {
                stime = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
            }
            else {
                stime = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
                    .add(-24, "hour")
                    .format("YYYY-MM-DD HH:mm:ss");
            }
            var strWhere = {};
            strWhere["pathname"] = "NEW";
            strWhere["pid"] = props.gqpid;
            strWhere["stime"] = stime;
            strWhere["etime"] = etime;
            api.stPptnGQTable(strWhere).then((res) => {
                var STCDList = "";
                var plsjpumTotal = 0, bznumTotal = 0, gtqTotal = 0;
                if (res.result.length > 0) {
                    for (var num = 0; num < res.result.length; num++) {
                        STCDList += res.result[num].stcd + ",";
                        if (SetNull(res.result[num].flow) != "") {
                            plsjpumTotal += Number(res.result[num].flow);
                        }
                    }
                    // "stime": "2025-04-13 08:10:00", "etime": "2025-04-13 13:25:00"
                    api.stPptnGQDanZhan({ "stcd": STCDList, "stime": stime, "etime": etime }).then((res) => {
                        var strJson = res.result.filter(function (res) {
                            return SetNull(res.eqptp) == "泵站状态";
                        });
                        // console.error("strJson", strJson)
                        var wqname = "";
                        if (stnm.value == "苏南运河") {
                            wqname = "城市中心区大包围";
                        }
                        var WQLLData = groupBy(sortObjectArray(strJson, ["tm"], "desc"), "stcd");
                        var strJsonLL = []
                        if (WQLLData.length > 0) {
                            for (var num = 0; num < WQLLData.length; num++) {
                                var item = groupBy(sortObjectArray(WQLLData[num], ["tm"], "desc"), "exkey");
                                // console.error(item)
                                for (var numII = 0; numII < item.length; numII++) {
                                    // console.error(item, item[numII])
                                    if (SetNull(item[numII][0].gtq) != "") {
                                        gtqTotal += Number(item[numII][0].insflow);
                                    }
                                }
                            }

                            if (SNYHData.length > 0) {
                                for (var i = 0; i < SNYHData.length; i++) {
                                    var strWhere = {};
                                    strWhere["wqname"] = SNYHData[i].properties.element_name;
                                    if (SNYHData[i].properties.element_name == "城市中心区大包围") {
                                        strWhere["wqname"] = wqname;
                                        strWhere["plsjpum"] = plsjpumTotal.toFixed(2);
                                        strWhere["q"] = gtqTotal.toFixed(2);
                                    } else {
                                        strWhere["plsjpum"] = 0;
                                        strWhere["q"] = 0;
                                    }
                                    strWhere["bznum"] = WQLLData.length;
                                    strJsonLL.push(strWhere);
                                }
                            }
                        }

                        const strNote = [];
                        strNote.push({ name: "名称", codename: "wqname", tableV: "0", isShow: true });
                        strNote.push({ name: "设计流量", codename: "plsjpum", tableV: "0", isShow: true });
                        strNote.push({ name: "实时流量", codename: "q", tableV: "0", isShow: true });
                        var LineColor = [
                            "#3E8BFF",
                            "#1CB8B2",
                            "#01DDFF",
                            "#F9C823",
                            "#0264FD",
                            "#FE7923",
                            "#8E30FF",
                        ];
                        const _Option = ChartJs.chartSL(
                            "",
                            strJsonLL,
                            strNote,
                            LineColor,
                            "流量(m³/s)",
                            "Day",
                            _theme,
                            true
                        );
                        lineOptionLL.value = _Option;
                        datekeyLL.value = Date.now();
                        var strMsg = "运行统计(设计流量:" + Number(plsjpumTotal).toFixed(2) + " m³/s，总流量:" + Number(gtqTotal).toFixed(2) + " m³/s，总泵工程: " + WQLLData.length + " 座)";
                        $("#divEchartsData").html(strMsg);
                    })
                }
            });
        } else {
            api.WQFindResult({ "datasource": stnm.value, "pid": "泵站,雨水排站" }).then((res) => {
                var plsjpumTotal = 0, bznumTotal = 0;
                var strNotedata = res.result.filter(function (res) {
                    return SetNull(res.wqname) != "";
                })
                var WQLLData = groupBy(strNotedata, "wqname");
                var strJsonLL = []
                var plsjpumTotal = 0, bznumTotal = 0;
                if (WQLLData.length > 0) {
                    for (var num = 0; num < WQLLData.length; num++) {
                        for (var numII = 0; numII < WQLLData[num].length; numII++) {
                            if (SetNull(WQLLData[num][numII].plsjpum) != "") {
                                plsjpumTotal += Number(WQLLData[num][numII].plsjpum);
                            }
                            if (SetNull(WQLLData[num][numII].bznum) != "") {
                                bznumTotal += Number(WQLLData[num][numII].bznum);
                            }
                        }
                        var strWhere = {};
                        strWhere["wqname"] = WQLLData[num][0].wqname;
                        strWhere["plsjpum"] = plsjpumTotal.toFixed(2);
                        strWhere["q"] = 0;
                        strWhere["bznum"] = bznumTotal;
                        strJsonLL.push(strWhere);

                    }
                }

                const strNote = [];
                strNote.push({ name: "名称", codename: "wqname", tableV: "0", isShow: true });
                strNote.push({ name: "设计流量", codename: "plsjpum", tableV: "0", isShow: true });
                strNote.push({ name: "实时流量", codename: "q", tableV: "0", isShow: true });
                var LineColor = [
                    "#3E8BFF",
                    "#1CB8B2",
                    "#01DDFF",
                    "#F9C823",
                    "#0264FD",
                    "#FE7923",
                    "#8E30FF",
                ];
                if (obj == "liuliang") {
                    const _Option = ChartJs.chartSL(
                        "",
                        strJsonLL,
                        strNote,
                        LineColor,
                        "流量(m³/s)",
                        "Day",
                        _theme,
                        true
                    );
                    lineOption.value = _Option;
                    datekey.value = Date.now();
                }

            }).catch((err) => { });
        }
    })
    window.loadingHide();
}
function getType(obj) {
    mtype.value = obj;
    if (obj == "泵站") {
        tableHeaders.value = [
            { name: "index", label: "序号" },
            { name: "stnm", label: "名称" },
            { name: "cityname", label: "流经区县" },
            { name: "ygtq", label: "排水流量" },
            { name: "pgtq", label: "引水流量" },
            { name: "fangdire", label: "运行方向" },
            { name: "typename", label: "类型" },
        ];
    } else if (obj == "闸站") {
        tableHeaders.value = [
            { name: "index", label: "序号" },
            { name: "stnm", label: "名称" },
            { name: "cityname", label: "流经区县" },
            { name: "ygtq", label: "排水流量" },
            { name: "pgtq", label: "引水流量" },
            { name: "swmax", label: "极限安全水位" },
            { name: "typename", label: "类型" },
        ];
    }
    let _index = 0;
    tableData.value = tableJson.value.filter(function (e) {
        if (e.typename == obj) {
            _index = _index + 1;
            e.index = _index;
            return e;
        }
    });
}
onMounted(() => {
    // console.error(props)
    if (props.stcd != "") {
        stcd.value = props.stcd;
    }
    if (props.stnm != "") {
        stnm.value = props.stnm;
    }
    GetRiver("river");
    // Weacontent();
});
</script> 
<style scoped>
.topClass {
    height: 45px;
    line-height: 40px;
    color: var(--widgetcolor);
}

.toptabTop {
    list-style: none;
    color: #00feff;
    border-color: #00feff;
    width: 500px !important;
    display: inline;
    position: relative;
    left: 50px;
    bottom: 0px;
    top: 5px;
    padding: 0px;
}

.toptabToponlyli {
    float: left;
    height: 32px;
    width: 40px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    background-color: var(--portal);
    border: 1px solid var(--portal);
    color: var(--sel_wraplabelcolor);
}

.toptabTop li:first-child {
    border-radius: 5px 0 0 5px;
}

.toptabTop li:last-child {
    border-radius: 0 5px 5px 0;
}

.toptabToponlyliHover {
    background-color: var(--swDivSelectcolor);
    border: 1px solid var(--swDivSelectcolor);
    color: var(--sel_wraplabelcolorSel);
}

.datatime {
    width: 180px !important;
    height: 36px !important;
}

.content-echarts {
    display: block;
    width: 100%;
    height: 100%;
}

.content-table {
    display: none;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

/* 自定义滚动条样式 */
.content-table::-webkit-scrollbar {
    width: 4px;
    /* 设置滚动条宽度 */
}

.content-table::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    background: var(--mtabletrcolor);
    z-index: 2;
}

.tableYQ {
    width: 100%;
    /* table-layout: fixed; */
    margin-top: 0rem;
    margin: 0 auto;
    /* 表格里面显示省略号必须加fixed，td设置的宽度会失效，宽度限定写在th中*/
}

.tableYQ tr th {
    background: var(--mtabletrcolor);
    color: var(--mtablecolor);
}

.tableYQ tr {
    height: 38px;
    line-height: 38px;
}

.tableYQ tr th {
    font-size: 0.8rem;
    font-weight: bold;
    height: 2.1rem;
    text-align: center;
}

.tableYQ tr td {
    height: 1.6rem;
    font-size: 14px;
    text-align: center;
}

.tableYQ tr td {
    color: var(--widgetcolor);
}

.tableYQ .trSelect {
    background: rgba(0, 255, 255, 0.5) !important;
}

.tableYQ tbody tr td {
    width: 15vh !important;
}

.tableYQ tbody tr td:nth-child(1) {
    width: 80px !important;
}

.tableYQ tbody tr td:nth-child(2) {
    width: 20vh !important;
}

.switch {
    position: fixed;
    height: 30px;
    width: 35px;
    padding: 2px 8px;
    cursor: pointer;
}

.switch img {
    width: 22px;
    height: 22px;
}

.handleon {
    background-size: 100% 100%;
    background: var(--popContentHeadbg);
}

:deep(.el-radio) {
    margin-right: 20px;
    --el-radio-input-bg-color: #d5141400;
}

:deep(.el-radio__label) {
    color: var(--widgetcolor);
}

:deep(.el-date-editor.el-input),
:deep(.el-date-editor.el-input__wrapper) {
    width: 160px;
}

:deep(.el-input__prefix-inner) {
    margin-left: -9px;
}

:deep(.el-input__suffix) {
    margin-right: -9px;
}

:deep(.el-input__wrapper) {
    background-color: #d5141400;
    box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
    ;
}

:deep(.el-input__inner) {
    color: var(--widgetcolor);
}

:deep(.el-button) {
    background-color: var(--popContentHeadbg);
    border-color: var(--popContentHeadbg);
    color: #fff;
}

:deep(.el-checkbox__input.is-checked+.el-checkbox__label),
:deep(.el-radio__input.is-checked+.el-radio__label) {
    color: var(--swDivSelectcolor);
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner),
:deep(.el-radio__input.is-checked .el-radio__inner) {
    background-color: var(--swDivSelectcolor);
    border-color: var(--swDivSelectcolor)
}

.echartsmaxmindata {
    width: 40%;
    font-size: 16px;
    margin: 0 auto;
    border: 1.5px solid var(--popContentHeadbg);
    height: auto;
    margin-top: 40px;
    height: 40px;
    line-height: 40px;
    color: var(--mtablecolor);
    text-align: center;
}
</style>
  