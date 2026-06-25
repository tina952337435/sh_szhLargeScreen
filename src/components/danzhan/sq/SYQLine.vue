<template>
  <div style="width: 100%; height: 100%">
    <div class="topClass">
      <!-- <ul class="toptabTop">
        <li :class="mtype == 'YC' && 'toptabToponlyliHover'" class="toptabToponlyli" @click="getType('YC')">遥测</li>
        <li :class="mtype == 'BX' && 'toptabToponlyliHover'" class="toptabToponlyli" @click="getType('BX')">报汛</li>
        <li :class="mtype == 'QX' && 'toptabToponlyliHover'" class="toptabToponlyli" @click="getType('QX')">气象</li>
      </ul> -->
      <span style="margin-left: 20px">水位站：</span>
      <el-select style="max-width: 120px;" v-model="value" filterable placeholder="请选择站点" @change="handleChange">
        <el-option v-for="item in Liststnm" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <span style="margin-left: 20px">雨量站：</span>
      <el-select style="max-width: 120px;" v-model="valueYL" filterable placeholder="请选择站点" @change="handleChangeYL">
        <el-option v-for="item in ListstnmYL" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <span style="margin-left: 20px">开始时间：</span>
      <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
        showTime="true" showOkButton="true" showClearButton="false" />
      <span style="margin-left: 20px">结束时间：</span>
      <input id="ETIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
        showTime="true" showOkButton="true" showClearButton="false" />

      <el-radio-group style="margin-left: 20px" v-model="pathname">
        <el-radio @click="TypeeChange('MIN')" v-model="pathname" label="MIN">分钟</el-radio>
        <el-radio @click="TypeeChange('HOUR')" v-model="pathname" label="HOUR">小时</el-radio>
        <el-radio @click="TypeeChange('DAY')" v-model="pathname" label="DAY">8时</el-radio>
      </el-radio-group>
      <el-button type="primary" @click="BtnSearch()">查询</el-button>
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
    <div style="height:450px; width: 100%; margin-top: 10px">
      <div class="content-echarts">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="YQLine" />
      </div>
      <div class="content-table">
        <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="tableYQ" :border="0" :cellspacing="0"
          :cellpadding="0" />
      </div>
    </div>
    <div id="divEchartsData" class="echartsmaxmindata">
    </div>
  </div>
</template>
<script setup>
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray,SetNull } from "@/api/ComUnit.js";
import { downloadFile } from "@/utils/share/downFile.js";
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElConfigProvider, ElMessage, ElSelect, ElOption } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";


import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const YLdata = ref({});

const stime = ref("");
const etime = ref("");
const stcd = ref("");
const mtype = ref("");
const pathname = ref("HOUR");
const tabName = ref("fit1");
const img1 = ref("/images/line-chart.png");
const img2 = ref("/images/line-table4.png");
const Liststnm = ref([]);
const ListstnmYL = ref([]);
const value = ref([]);
const valueYL=ref([]);

const tableHeaders = ref([
  { name: "num", label: "序号" },
  { name: "tm", label: "日期" },
  { name: "drp", label: "雨量(mm)" },
]);
const tableData = ref();
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const props = defineProps({
  stcd: {
    type: String,
    default: "",
  },
  mtype: {
    type: String,
    default: "",
  },
  stime: {
    type: String,
    default: "",
  },
  etime: {
    type: String,
    default: "",
  },
});
function loadZhan() {
  value.value = stcd.value;
  valueYL.value=stcd.value;
  api.QuSelDuo({ "pid": "2026031114184492913-2,2026031114184492913-7,2026031114184492913-8" }).then((res) => {//所有水位站
    // console.error("res", res.data)
    var strJson = [];
    if (res.data.length > 0) {
      for (var i = 0; i < res.data.length; i++) {
        var strTemp = {
          value: res.data[i].stcd,
          label: res.data[i].stnm,
          children: []
        }
        strJson.push(strTemp)
      }
    }
    Liststnm.value = strJson;
  });

  api.QuSelDuo({ "pid": "201901101419326076-1-1,201901101419326076-5" }).then((res) => {//所有雨量站
    // console.error("res", res.data)
    var strJson = [];
    if (res.data.length > 0) {
      for (var i = 0; i < res.data.length; i++) {
        var strTemp = {
          value: res.data[i].stcd,
          label: res.data[i].stnm,
          children: []
        }
        strJson.push(strTemp)
      }
    }
    ListstnmYL.value = strJson;
  });
}
function Weacontent() {
  window.loadingShow();
  var strParam = {};
  strParam["stcd"] = stcd.value+","+valueYL.value;
  strParam["stime"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  strParam["etime"] = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  strParam["pathname"] = pathname.value;
  strParam["datasource"] ="BX";
  api
    .querySWDRPDANZHANListSYL(strParam)
    .then((res) => {    
      const strJson = sortObjectArray(res.data, ["tm"], "asc");
      var jsondata = strJson.sort(function (a, b) {
        return dayjs(a.tm).format("YYYY-MM-DD HH:mm:ss") - dayjs(b.tm).format("YYYY-MM-DD HH:mm:ss"); //时间正序
      });
      YLdata.value = jsondata;
      YLload();
      window.loadingHide();
    })
    .catch((err) => { });
}
function YLload() {
  const strJson = YLdata.value
  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "雨量", codename: "drp", tableV: "0", isShow: true });
  strNote.push({ name: "水位", codename: "upz", tableV: "0", isShow: true });
  var LineColor = [
    "#3E8BFF",
    "#1CB8B2",
    "#01DDFF",
    "#F9C823",
    "#0264FD",
    "#FE7923",
    "#8E30FF",
  ];
  const _Option = ChartJs.chartSWYL(
    "",
    strJson,
    strNote,
    LineColor,
    "雨量",
    "true",
    _theme,
    "时间",
    "Mouth"
  );

  lineOption.value = _Option;
  datekey.value = Date.now();

  var result = [];
  var maxDrp = 0, maxTM = "—";
  var drpTotal = 0;
  for (var num = 0; num < strJson.reverse().length; num++) {
    var item = strJson.reverse()[num];
    var drp = item.drp != undefined ? Number(item.drp).toFixed(1) : "—";
    var tm = dayjs(new Date(item.tm)).format("YYYY-MM-DD HH:mm");
    if (Number(drp) > 0) {
      if (drp > maxDrp) {
        maxDrp = drp;
        maxTM = tm;
      }
      drpTotal += Number(drp);
      // console.error("drpTotal", drpTotal, Number(drp))
    }
    if (drpTotal == 0) {
      maxDrp = 0;
      maxTM = dayjs(new Date(strJson.reverse()[strJson.reverse().length - 1].tm)).format("YYYY-MM-DD HH:mm");
    }
    result.push({ num: num + 1, tm: tm, drp: drp });
  }
  if (Number(drpTotal) > 0) {
    drpTotal = Number(drpTotal).toFixed(1);
  }
  var strMsg = `最大雨量：<span style='color:#0cdc0c;font-size: 18px;'>${maxDrp}</span>mm（${maxTM}）
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
  累计雨量：<span style='color:#0cdc0c;font-size: 18px;'>${drpTotal}</span>mm
    `;
  $("#divEchartsData").html(strMsg);
  tableData.value = result;
}

function ExportData() {
  var listcolumnname = [];
  console.error("tableHeaders.value", tableHeaders.value)
  if (tableHeaders.value.length > 0) {
    for (var i = 0; i < tableHeaders.value.length; i++) {
      var item = tableHeaders.value[i];
      listcolumnname.push({ "name": item["label"], "value": item["name"] });
    }
  }

  var strParam = {};
  strParam["title"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00" + "至" + dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00" + "小时雨强排名前10";
  strParam["pathname"] = "temp";
  strParam["columnname"] = listcolumnname;
  strParam["maplist"] = tableData.value;
  api.ExportExcel(strParam).then((res) => {
    var strJson = res.data;
    if (strJson.length > 0) {
      // window.open("/UploadDoc/" + strJson[0]["value"], strParam["title"]);      
      downloadFile("/UploadDoc/" + strJson[0].value, strParam["title"]);
    }
  })
}
function getType(obj) {
  mtype.value = obj;
  Weacontent();
}
function handleChange(value) {
  // console.error(value)
  stcd.value = value;
  Weacontent();
}
function handleChangeYL(value) {
  valueYL.value = value;
  Weacontent();
}
function TypeeChange(e) {
  pathname.value = e;
  Weacontent();
}
function BtnSearch() {
  Weacontent();
}
function OnBoot(e) {
  tabName.value = e;
  YLload();
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
  var now = new Date();
  if (SetNull(props.stcd) != "") {
    stcd.value = props.stcd;
  } else {
    if (SetNull(inject("stcd")) != "") {
      stcd.value = inject("stcd").value;
    }
  }
  if (SetNull(props.stime) != "") {
    stime.value = props.stime
  } else {
    if(SetNull(inject("stime"))  != ""){
      stime.value = inject("stime").value;
    }else{          
      stime.value = dayjs(now).add(-24, "hour").format("YYYY-MM-DD HH:mm:ss");
    }    
  }
  if (SetNull(props.etime) != "") {
    etime.value = props.etime
  } else {
    if(SetNull(inject("etime"))  != ""){
      etime.value = inject("etime").value;
    }
    else{
      etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
    }
  }
  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:mm"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:mm"));
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


.toptabTop {
  list-style: none;
  color: #00feff;
  border-color: #00feff;
  width: 500px !important;
  display: inline;
  position: relative;
  left: 0px;
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

.toptabToponlyli:nth-child(2) {
  border-left: 1px solid var(--popContentHeadbg);
  border-right: 1px solid var(--popContentHeadbg);
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
  min-width: 50px;
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
  width: 120px;

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
    width: 118px;
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
  // display: none;
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