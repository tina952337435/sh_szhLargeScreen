<template>
  <div class="topClass">
    <span style="margin-left: 20px">站点选择：</span>
    <el-cascader style="max-width: 120px;" v-model="value" :options="Liststnm" @change="handleChange" />
    <span style="margin-left: 20px">开始时间：</span>
    <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
      showTime="true" showOkButton="true" showClearButton="false" />
    <span style="margin-left: 20px">结束时间：</span>
    <input id="ETIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
      showTime="true" showOkButton="true" showClearButton="false" />

    <el-button type="primary" style="margin-left: 20px" @click="BtnSearch()">查询</el-button>
    <el-button type="success" style="margin-left: 20px" @click="ExportData()">导出</el-button>
    <span style="
        position: absolute;
        right: 20px;
        width: 70px;
        height: 30px;
        margin: 5px 0px;
        background: rgb(238 238 238 / 60%);
        border-radius: 5px;
      ">
      <span class="switch" style="border-radius: 5px 0px 0px 5px" @click="OnBoot('fit1')"
        :class="tabName == 'fit1' && 'handleon'">
        <img :src="img1" />
      </span>
      <span class="switch" style="border-radius: 0px 5px 5px 0px; margin-left: 35px" @click="OnBoot('fit2')"
        :class="tabName == 'fit2' && 'handleon'">
        <img :src="img2" />
      </span>
    </span>
  </div>
  <div style="height: calc(100% - 80px); width: 100%; margin-top: 10px">
    <div class="content-echarts">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="SLLine" />
    </div>
    <div class="content-table">
      <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="tableYQ" :border="0" :cellspacing="0"
        :cellpadding="0" />
    </div>
  </div>
</template>
<script setup>
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import { downloadFile } from "@/utils/share/downFile.js";
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElConfigProvider, ElCascader } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const SLdata = ref({});
const stime = ref({});
const etime = ref({});
const stcd = ref("");
const pathname = ref({});
const tabName = ref("fit1");
const img1 = ref("/images/line-chart.png");
const img2 = ref("/images/line-table4.png");
const Liststnm = ref([]);
const value = ref([])

const tableHeaders = ref([
  { name: "num", label: "序号" },
  { name: "tm", label: "时间" },
  { name: "accpw", label: "引水量(万方)" },
  { name: "accdw", label: "排水量(万方)" },
]);
const tableData = ref();
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const props = defineProps({
  stcd: {
    type: String,
    default: "",
  },
});

function loadZhan() {
  value.value = [stcd.value];
  api.QuSel({ "pid": "2024111100000001" }).then((res) => {
    console.error("res", res.result)
    var strJson = [];
    if (res.result.length > 0) {
      for (var i = 0; i < res.result.length; i++) {
        var strTemp = {
          value: res.result[i].stcd,
          label: res.result[i].stnm,
          children: []
        }
        strJson.push(strTemp)
      }
    }
    Liststnm.value = strJson;
  });
}
function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["stcd"] = stcd.value;
  // strParam["pathname"] = pathname.value; 
  strParam["stime"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  strParam["etime"] = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  api
    .stPptnGQSL(strParam)
    .then((res) => {
      const jsondata = res.result;
      var strJson = jsondata.sort(function (a, b) {
        return dayjs(a.tm).format("YYYY-MM-DD HH:mm:ss") - dayjs(b.tm).format("YYYY-MM-DD HH:mm:ss"); //时间正序
      });

      var result = [];
      for (var num = 0; num < strJson.length; num++) {
        var accdw = strJson[num].accdw != undefined ? Number(strJson[num].accdw).toFixed(1) : 0;
        var accpw = strJson[num].accpw != undefined ? Number(strJson[num].accpw).toFixed(1) : 0;
        var tm = dayjs(strJson[num].idtm).format("YYYY-MM-DD HH:mm:ss");
        result.push({ "num": num + 1, "tm": tm, "accpw": accpw, "accdw": accdw, })
      }
      SLdata.value = result;
      SLload();
    })
    .catch((err) => { });
}
function SLload() {
  const strJson = SLdata.value;
  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "引水量", codename: "accpw", tableV: "0", isShow: true });
  strNote.push({ name: "排水量", codename: "accdw", tableV: "0", isShow: true });
  var LineColor = ["#30B90F", "#50CAE1"];
  const _Option = ChartJs.chartSL(
    "",
    strJson,
    strNote,
    LineColor,
    "水量",
    "Day",
    _theme,
    true
  );

  lineOption.value = _Option;
  datekey.value = Date.now();

  var result = [];
  for (var num = 0; num < strJson.reverse().length; num++) {
    var item = strJson.reverse()[num];
    result.push({ "num": num + 1, "tm": item.tm, "accpw": item.accpw, "accdw": item.accdw, })
  }
  tableData.value = result;
}

function ExportData() {
  var listcolumnname = [];
  if (tableHeaders.value.length > 0) {
    for (var i = 0; i < tableHeaders.value.length; i++) {
      var item = tableHeaders.value[i];
      listcolumnname.push({ "name": item["label"], "value": item["name"] });
    }
  }

  var strParam = {};
  strParam["title"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00" + "至" + dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00" + "水量数据";
  strParam["pathname"] = "temp";
  strParam["columnname"] = listcolumnname;
  strParam["maplist"] = tableData.value;
  api.ExportExcel(strParam).then((res) => {
    var strJson = res.result;
    if (strJson.length > 0) {
      downloadFile("/UploadDoc/" + strJson[0].value, strParam["title"]);
    }
  })
}
function handleChange(value) {
  // console.error(value)
  stcd.value = value[0]
  Weacontent();
}
function BtnSearch() {
  Weacontent();
}
function OnBoot(e) {
  tabName.value = e;
  SLload();
  if (e == "fit1") {
    $(".content-echarts").css({ display: "block" });
    $(".content-table").css({ display: "none" });
    img1.value = "/images/line-chart.png";
    img2.value = "/images/line-table4.png";
  } else if (e == "fit2") {
    $(".content-echarts").css({ display: "none" });
    $(".content-table").css({ display: "block" });

    img1.value = "/images/line-chart1.png";
    img2.value = "/images/line-table3.png";
  }
}
onMounted(() => {
  mini.parse();
  pathname.value = "HOUR";

  var nowTM = new Date();
  etime.value = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  stime.value = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  if (Number(dayjs(nowTM).format("HH")) > 7) {
    stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-7, "day")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  if (props.stcd != "") {
    stcd.value = props.stcd;
  } else {
    stcd.value = inject("stcd").value;
  }
  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:00"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:00"));
  loadZhan();
  Weacontent();
});
</script>
<style scoped>
.topClass {
  height: 45px;
  line-height: 40px;
  color: var(--widgetcolor);
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
  width: 20vh;
}

.switch {
  position: fixed;
  height: 30px;
  width: 35px;
  padding: 2px 8px;
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
  /* background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg); */
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
</style>

<style lang="scss">
/* 站点选择 */
.el-cascader-node {
  padding: 0 0px 0 10px;
  width: 118px;
  color: var(--widgetcolor);
}

.el-cascader-menu {
  min-width: 20px;
}

.el-cascader-menu:last-child .el-cascader-node {
  padding-right: 0px;
}


.el-cascader-node__prefix {
  left: 0px !important;
}

.el-cascader-node__label {
  padding: 0 4px;
}

.el-input__suffix {
  color: var(--popContentHeadbg);
}

.el-cascader__dropdown.el-popper,
.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
  background: none;
}

.el-cascader__dropdown.el-popper {
  box-shadow: var(--popContentHeadbg);
}

.el-popper.is-light,
.el-popper.is-light .el-popper__arrow:before {
  border: 1px solid var(--popContentHeadbg);
  background: var(--boxtitlebg);
}

.el-cascader:not(.is-disabled):hover .el-input__wrapper,
.el-input__wrapper {
  box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
  cursor: pointer;
}

// 时间选择框
.el-date-picker,
.el-picker-panel__footer {
  // width: 174px;
  background: none;
  color: var(--widgetcolor);
}

.el-date-picker .el-picker-panel__content {
  // width: 160px;
}

.el-date-picker__header,
.el-picker-panel__content {
  // margin: 6px;
}

.el-date-table td {
  padding: 0;
}

.el-date-picker table {
  width: none !important;
}

.el-date-picker__time-header {
  background: var(--boxtitlebg);
  // display: none;
}

.el-picker-panel__icon-btn,
.el-time-panel__btn {
  // padding: 0;
  color: var(--widgetcolor);
}

.el-input--small .el-input__inner,
.el-date-table th,
.el-date-picker__header-label,
.el-button.is-text,
.el-button.is-plain,
.el-time-spinner__item {
  color: var(--widgetcolor);
}

.el-cascader .el-input.is-focus .el-input__wrapper {
  box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}

.el-time-panel__content:before {
  border-bottom: 1px solid var(--popContentHeadbg);
  border-top: 1px solid var(--popContentHeadbg);
}

.el-cascader-node.in-active-path,
.el-cascader-node.is-selectable.in-checked-path,
.el-year-table td .cell:hover,
.el-date-picker__header-label:hover,
.el-time-spinner__item.is-active:not(.is-disabled) {
  color: var(--swDivSelectcolor);
}

.el-date-table th,
.el-date-picker__time-header {
  border-bottom: 1px solid var(--popContentHeadbg);
}

.el-picker-panel__footer,
.el-time-panel__footer {
  border-top: 1px solid var(--popContentHeadbg);
}

.el-button.is-plain,
.el-button.is-text:not(.is-disabled):hover,
.el-scrollbar__thumb {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}

.el-date-picker__editor-wrap:nth-child(1) .el-input--small .el-input__wrapper {
  width: 90px;
}

.el-date-picker__editor-wrap {
  width: 50%;
}

.el-year-table td {
  padding: 0px;
}

.el-cascader-node.is-active .el-cascader-node__label,
.el-cascader-node.is-active {
  font-size: 1rem;
  color: var(--swDivSelectcolor);
}

.el-date-table td.current:not(.disabled) .el-date-table-cell__text,
.el-year-table td.current:not(.disabled) .cell {
  background-color: var(--swDivSelectcolor);
  border-color: var(--swDivSelectcolor);
  color: #fff;
}

.el-date-table td.today .el-date-table-cell__text,
.el-date-table td.available:hover {
  color: var(--swDivSelectcolor);
}
</style>