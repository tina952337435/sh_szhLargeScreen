<template>
  <div class="topClass">
    <div style="position: absolute;left: 20px;height: 30px;border-radius: 5px;">
     <span style="margin-left: 20px;">方案：</span> 
     <el-select style="max-width: 500px;" v-model="value" filterable placeholder="请选择方案" @change="handleChange">
            <el-option v-for="item in ListFangAn" :key="item.dd_ID" :label="item.dd_NAME" :value="item.dd_ID" />
      </el-select>
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
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey"/>
    </div>
    <div class="content-table">
      <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="tableYQ" :border="0" :cellspacing="0"
        :cellpadding="0" />
    </div>
  </div>

  <div id="divEchartsData" class="echartsmaxmindata">
    超警时长：<span style="color:var(--wqdanzhansycmsh2color);font-size: 1.4rem;" id="SWwrz">0</span>&nbsp;小时
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    超保时长：<span style="color:var(--wqdanzhansycmsh2color);font-size: 1.4rem;" id="SWgrz">0</span>&nbsp;小时
  </div>
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
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElConfigProvider, ElSelect, ElOption, ElMessage } from "element-plus";
import { convertToDate } from "@/api/dateUtil.js";
const tabName = ref("fit1");
const img1 = ref("/images/line-chart.png");
const img2 = ref("/images/line-table4.png");
const ListFangAn = ref([]);
const value = ref([]);

const tableHeaders = ref([
  // { name: "num", label: "序号" },
  { name: "tm", label: "时间" },
  { name: "ybz", label: "预报水位(m)" },
  { name: "upz", label: "实时水位(m)" },
  { name: "wrz", label: "警戒水位(m)" },
  { name: "grz", label: "保证水位(m)" },
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
  value.value=props.dd_id;
  loadFangAn();
  Weacontent();
});
function Weacontent() {
  var strParam = {
    startdate: props.stime,
    enddate: props.etime,
    stcd: props.stcd,
    type: "1",
    plan_n: value.value
  };
  api.loadModeYBSHUIWEI(strParam).then(res => {
    //绘制图形
    if (res.data.length > 0) {
      var data = res.data;
      JsonColumnChart(data);
    }
  }).catch(err => { });
}
function loadFangAn() {
  var strParam = {};
  strParam["PageSize"] = 10;
  strParam["PageIndex"] = 0;
  apiMode.loadFangList(strParam).then(res => {  
    ListFangAn.value=res.data;
  }).catch(err => { console.error("API 请求失败:", err); });
}
function handleChange(evalue) {
    value.value = evalue;
    Weacontent();
}
function JsonColumnChart(res) {
  const strJson = res;
  var result = [];
  var maxZ = -1, maxTM = null;
  var minZ = 999, minTM = null;
  if (strJson.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      var item = strJson[num];
      var wrz = item.WRZ != undefined ? Number(item.WRZ).toFixed(2) : "—";
      var grz = item.GRZ != undefined ? Number(item.GRZ).toFixed(2) : "—";
      var upz = item.UPZ != undefined ? Number(item.UPZ).toFixed(2) : "—";
      var ybz = item.YBZ != undefined ? Number(item.YBZ).toFixed(2) : "—";
      var tm = dayjs(new Date(item.TM)).format("YYYY-MM-DD HH:mm");

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

      if (SetNull(upz) != "—") {
        if (upz > maxZ) {
          maxZ = upz;
          maxTM = tm;
        }
        if (upz < minZ) {
          minZ = upz;
          minTM = tm;
        }
      }
      result.push({ tm: tm, upz: upz, ybz: ybz, wrz: wrz, grz: grz, colorCss: colorCss });
    }
  }
  // console.error('result',result);
  var strMsg = `最低水位：<span style='color:#0cdc0c;font-size: 18px;'>${minZ}</span>m（${minTM}）
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
最高水位：<span style='color:#0cdc0c;font-size: 18px;'>${maxZ}</span>m（${maxTM}）
    `;
  $("#divEchartsData").html(strMsg);
  tableData.value = result;
  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "预报", codename: "ybz", tableV: "0", isShow: true });
  strNote.push({ name: "实时", codename: "upz", tableV: "0", isShow: true });
  strNote.push({ name: "警戒", codename: "wrz", tableV: "0", isShow: false });
  strNote.push({ name: "保证", codename: "grz", tableV: "0", isShow: false });
  var LineColor = ["#35FF55", "#F9C823", "#0264FD", "#FE7923", "#8E30FF"];
  const _Option = ChartJs.chartSW("", result, strNote, LineColor, "水位", "Mouth", _theme, 55, 14);
  console.error('_Option',_Option);
  lineOption.value = _Option;
  datekey.value = Date.now();


  // 统计受淹时长
  let SWwrz = 0, SWgrz = 0;
  for (let i = 0; i < strJson.length - 1; i++) {
    const currentItem = strJson[i];
    const nextItem = strJson[i + 1];

    const currentTime = dayjs(currentItem.tm);
    const nextTime = dayjs(nextItem.tm);
    const duration = nextTime.diff(currentTime, 'hour');
    if (SetNull(currentItem.ybz) != "" && SetNull(currentItem.wrz) != "") {
      if (Number(currentItem.ybz) > Number(currentItem.wrz)) {
        SWwrz += duration;
      }
    }
    if (SetNull(currentItem.ybz) != "" && SetNull(currentItem.grz) != "") {
      if (Number(currentItem.ybz) > Number(currentItem.grz)) {
        SWgrz += duration;
      }
    }
  }
  // 处理最后一个元素
  const lastItem = strJson[strJson.length - 1];
  if (Number(lastItem.ybz) > Number(lastItem.wrz)) {
    // 假设最后一个时间点到预报结束时间的间隔为 1 小时
    SWwrz += 1;
  }
  if (Number(lastItem.ybz) > Number(lastItem.grz)) {
    // 假设最后一个时间点到预报结束时间的间隔为 1 小时
    SWgrz += 1;
  }
  // console.error(SWwrz, SWgrz)
  $("#SWwrz").html(SWwrz.toFixed(1));
  $("#SWgrz").html(SWgrz.toFixed(1));
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