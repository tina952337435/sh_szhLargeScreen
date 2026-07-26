<template>
  <el-config-provider :locale="zhCn">
  <div class="topClass">
    <div style="position: absolute;left: 20px;height: 30px;border-radius: 5px;">
      <span style="margin-left: 20px;">开始时间：</span>
      <el-date-picker v-model="stime" type="datetime" format="YYYY-MM-DD HH:mm" placeholder="开始时间" style="width: 160px;" />
      <span style="margin-left: 20px;">结束时间：</span>
      <el-date-picker v-model="etime" type="datetime" format="YYYY-MM-DD HH:mm" placeholder="结束时间" style="width: 160px;" />
      <el-button type="primary" @click="BtnSearch()" style="margin-left: 20px;">查询</el-button>
    </div>
    <span
      style="position: absolute;right: 20px;width: 70px;height: 30px;margin: 5px 0px;background: rgb(238 238 238 / 60%);border-radius: 5px;      ">
      <span class="switch" style="border-radius: 5px 0px 0px 5px" @click="OnBoot('fit1')"
        :class="tabName == 'fit1' && 'handleon'">
        <img :src="img1">
      </span>
      <span class="switch" style="border-radius: 0px 5px 5px 0px; margin-left: 35px" @click="OnBoot('fit2')"
        :class="tabName == 'fit2' && 'handleon'">
        <img :src="img2">
      </span>
    </span>
  </div>
  <div style="height: calc(100% - 110px); width: 100%; margin-top: 10px">
    <div class="content-echarts">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="SQYBLineTM" />
    </div>
    <div class="content-table">
      <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="tableYQ" :border="0" :cellspacing="0"
        :cellpadding="0" />
    </div>
  </div>
  </el-config-provider>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import { Postcard } from "@element-plus/icons-vue";
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import apiMode from "@/api/mode/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy, GetSZStateBy, GetSZState } from "@/api/ComUnit.js";
import { onMounted, ref, shallowRef, defineAsyncComponent, nextTick, provide, inject } from "vue";
import * as echarts from 'echarts';
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElButton, ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { convertToDate } from "@/api/dateUtil.js";
const tabName = ref("fit1");
const img1 = ref("/images/line-chart.png");
const img2 = ref("/images/line-table4.png");
const stime = ref("");
const etime = ref("");

const tableHeaders = ref([
  // { name: "num", label: "序号" },
  { name: "tm", label: "时间" },
  { name: "ybz", label: "预报水位(m)" },
  { name: "upz", label: "实时水位(m)" },
  // { name: "wrz", label: "警戒水位(m)" },
  // { name: "grz", label: "保证水位(m)" },
]);
const tableData = ref([]);

// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();
const showDialog = ref(false);

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("modeyubaoSWLine");

const datekeyDialog = ref(null);

// dataZoom 动态加载相关
let queryStime = "";
let queryEtime = "";
let isLoadingMore = false;
let currentStrNote = [];
let SQdata = ref([]);

const props = defineProps({
  stcd: {
    type: String,
    default: ""
  },
  dd_id: {
    type: String,
    default: ""
  },
  stime: {
    type: String,
    default: ""
  },
  etime: {
    type: String,
    default: ""
  }
});
onMounted(() => {
  stime.value = props.stime || dayjs(new Date()).format("YYYY-MM-DD HH:mm");
  etime.value = props.etime || dayjs(new Date()).add(1, "day").format("YYYY-MM-DD HH:mm");
  Weacontent();
});
function Weacontent() {
  var strParam = {
    startdate: stime.value,
    enddate: etime.value,
    stcd: props.stcd
  };
  queryStime = stime.value;
  queryEtime = etime.value;
  apiMode.findLatestPredictByStation(strParam).then(res => {
    //绘制图形
    if (res.data.length > 0) {
      var data = res.data;
      SQdata.value = data;
      JsonColumnChart(data);
    }
  }).catch(err => { });
}
function BtnSearch() {
  Weacontent();
}
// ========== dataZoom 动态加载 ==========
function bindDataZoomEvent() {
  var chartDom = document.getElementById('SQYBLineTM');
  if (!chartDom) return;
  var myChart = echarts.getInstanceByDom(chartDom);
  if (!myChart) return;
  myChart.off('dataZoom');
  myChart.on('dataZoom', handleDataZoom);
}

function handleDataZoom(params) {
  if (isLoadingMore) return;
  var batch = params.batch || [params];
  if (!batch.length) return;
  var start = batch[0].start;

  if (start < 10) {
    isLoadingMore = true;
    loadMorePrev();
  }
}

function loadMorePrev() {
  var currentStime = dayjs(queryStime);
  var newStime = currentStime.add(-1, 'day').format('YYYY-MM-DD HH:mm');
  var newEtime = currentStime.format('YYYY-MM-DD HH:mm');

  var strParam = {
    startdate: newStime,
    enddate: newEtime,
    stcd: props.stcd
  };

  apiMode.findLatestPredictByStation(strParam).then(function (res) {
    queryStime = newStime;

    var newData = res.data || [];
    var existingTms = {};
    SQdata.value.forEach(function (d) { existingTms[d.ymdhm] = true; });
    var uniqueNew = [];
    newData.forEach(function (d) {
      if (!existingTms[d.ymdhm]) { uniqueNew.push(d); }
    });
    var merged = uniqueNew.concat(SQdata.value).sort(function (a, b) {
      return dayjs(new Date(a.ymdhm)).valueOf() - dayjs(new Date(b.ymdhm)).valueOf();
    });
    SQdata.value = merged;

    stime.value = newStime;

    var chartDom = document.getElementById('SQYBLineTM');
    var myChart = echarts.getInstanceByDom(chartDom);
    if (myChart && merged.length > 0 && currentStrNote.length > 0) {
      var chartTM = merged.map(function (d) {
        return dayjs(new Date(d.ymdhm)).format("MM-DD HH:mm");
      });
      var seriesUpdates = [];
      for (var j = 0; j < currentStrNote.length; j++) {
        var note = currentStrNote[j];
        if (note.name === "时间" || note.name === "名称") continue;
        var codename = note.codename;
        var values = merged.map(function (d) {
          var fieldName = codename;
          if (codename === "ybz") fieldName = "data";
          else if (codename === "upz") fieldName = "upz";
          else if (codename === "wrz") fieldName = "WRZ";
          else if (codename === "grz") fieldName = "GRZ";
          else if (codename === "tm") fieldName = "ymdhm";
          var val = d[fieldName];
          return (isNaN(val) === false && val != null && val !== "") ? val : null;
        });
        seriesUpdates.push({ name: note.name, data: values });
      }
      myChart.setOption({ xAxis: { data: chartTM }, series: seriesUpdates });
    }

    var result = [];
    merged.forEach(function (item, idx) {
      var wrz = item.WRZ != undefined ? Number(item.WRZ).toFixed(2) : "—";
      var grz = item.GRZ != undefined ? Number(item.GRZ).toFixed(2) : "—";
      var upz = item.upz != undefined ? Number(item.upz).toFixed(2) : "—";
      var ybz = item.data != undefined ? Number(item.data).toFixed(2) : "—";
      var tm = dayjs(new Date(item.ymdhm)).format("YYYY-MM-DD HH:mm");
      result.push({ tm: tm, upz: upz, ybz: ybz, wrz: wrz, grz: grz });
    });
    tableData.value = result;

    isLoadingMore = false;
  }).catch(function () {
    isLoadingMore = false;
  });
}
// =========================================

function JsonColumnChart(res) {
  const strJson = res;
  var result = [];
  if (strJson.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      var item = strJson[num];
      var wrz = item.WRZ != undefined ? Number(item.WRZ).toFixed(2) : "—";
      var grz = item.GRZ != undefined ? Number(item.GRZ).toFixed(2) : "—";
      var upz = item.upz != undefined ? Number(item.upz).toFixed(2) : "—";
      var ybz = item.data != undefined ? Number(item.data).toFixed(2) : "—";
      var tm = dayjs(new Date(item.ymdhm)).format("YYYY-MM-DD HH:mm");

      var wrzCha = "—";
      var colorCss = "";
      if (wrz != "—" && ybz != "—") {
        wrzCha = Number(Number(ybz) - Number(wrz)).toFixed(2);
        if (Number(wrzCha) > 0) {
          colorCss = "#F9C33D";
        }
      }

      if (grz != "—" && ybz != "—") {
        if (Number(Number(ybz) - Number(grz)).toFixed(2) > 0) {
          colorCss = "#F70019";
        }
      }

      result.push({ tm: tm, upz: upz, ybz: ybz, wrz: wrz, grz: grz, colorCss: colorCss });
    }
  }
  tableData.value = result;
  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "预报", codename: "ybz", tableV: "0", isShow: true });
  strNote.push({ name: "实时", codename: "upz", tableV: "0", isShow: true });
  // strNote.push({ name: "警戒", codename: "wrz", tableV: "0", isShow: false });
  // strNote.push({ name: "保证", codename: "grz", tableV: "0", isShow: false });
  var LineColor = ["#35FF55", "#F9C823", "#0264FD", "#FE7923", "#8E30FF"];
  // 保存 strNote 供增量更新使用
  currentStrNote = strNote;
  const _Option = ChartJs.chartSWZoom("", result, strNote, LineColor, "水位", "Mouth", _theme, 55, 14);
  lineOption.value = _Option;
  datekey.value = Date.now();

  // 绑定 dataZoom 事件
  nextTick(() => {
    bindDataZoomEvent();
  });
}

function OnBoot(e) {
  tabName.value = e;
  // SQload();
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
</script>
<style scoped>
.topClass {
  height: 45px;
  line-height: 40px;
  color: var(--widgetcolor);
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

.echartsmaxmindata {
  width: 100%;
  font-size: 16px;
  margin: 0 auto;
  border: 1.5px solid var(--popContentHeadbg);
  height: auto;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
  color: var(--mtablecolor);
  text-align: center;
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

.el-input {
    height: 29px;
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

// 站点选择 - el-select 适配
.el-select {
    height: 29px;
    width: 300px;

    .el-select__wrapper {
        min-height: 29px;
        height: 29px;
        background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;

        &:hover {
            box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
        }
    }

    &.is-hovering {
        .el-select__wrapper {
            box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
        }
    }

    .el-select__selection {
        line-height: 27px;
    }

    .el-select__placeholder {
        color: var(--widgetcolor);
    }

    .el-select__input {
        color: var(--widgetcolor);
    }
}

.el-select-dropdown {
    max-height: 300px;
    overflow-y: auto;

    .el-select-dropdown__item {
        padding: 0 10px;
        width: 100%;
        color: var(--widgetcolor);

        &.hover,
        &:hover {
            background: var(--popContentHeadbg);
        }

        &.is-selected {
            color: var(--widgetcolor) !important;
            background: var(--popContentHeadbg) !important;
        }
    }
}

.el-popper.is-light.el-select-dropdown {
    border: 1px solid var(--popContentHeadbg);
    background: var(--boxtitlebg);
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
    // display: block;
}

.el-picker-panel__icon-btn {
    // padding: 0;
    color: var(--widgetcolor);
}

.el-input--small .el-input__inner,
.el-date-table th,
.el-date-picker__header-label,
.el-button.is-text,
.el-button.is-plain {
    color: var(--widgetcolor);
}

.el-cascader .el-input.is-focus .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}

.el-cascader-node.in-active-path,
.el-cascader-node.is-selectable.in-checked-path,
.el-year-table td .cell:hover,
.el-date-picker__header-label:hover {
    color: var(--swDivSelectcolor);
}

.el-date-table th {
    border-bottom: 1px solid var(--popContentHeadbg);
}

.el-picker-panel__footer {
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

.el-year-table td .cell,
.el-month-table td .cell {
    color: #fff;
}
</style>