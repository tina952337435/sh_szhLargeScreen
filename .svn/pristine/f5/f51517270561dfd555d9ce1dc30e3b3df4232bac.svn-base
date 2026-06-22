<template>
  <div style="width: 100%; height: 100%">
    <div class="topClass">
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
        <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="YQLine" />
      </div>
      <div class="content-table">
        <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="tableYQ" :border="0" :cellspacing="0"
          :cellpadding="0" />
      </div>
    </div>
  </div>
</template>
<script setup>
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElConfigProvider, ElMessage } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";
import * as apiqixiang from "@/api/qixiang/qixiangapi.js";
import { convertToDate } from "@/api/dateUtil.js";


import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const YLdata = ref({});

const ybtm = ref("");
const type = ref("");
const ereaname = ref("");
const tabName = ref("fit1");
const img1 = ref("/images/line-chart.png");
const img2 = ref("/images/line-table4.png");

const tableHeaders = [
  { name: "num", label: "序号" },
  { name: "tm", label: "日期" },
  { name: "drp", label: "雨量(mm)" },
];
const tableData = ref();
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  ereaname: {
    type: String,
    default: "",
  },
  ybtm: {
    type: String,
    default: "",
  },
});
function Weacontent() {
  window.loadingShow();
  var nowTM = new Date();
  var strParam = {};
  strParam["ybtm"] = ybtm.value;
  apiqixiang
    .RainWeacontentDay(strParam)
    .then((res) => {
      var strJson = sortObjectArray(res.data, ["TM"], "asc");
    console.error('strJson1',strJson,type.value);
      strJson=strJson.filter(function(res){
          res.tm=dayjs(convertToDate(res.TM)).format("YYYY-MM-DD HH:mm:ss");
          res.drp=res.DRP;
          return res.NAME==type.value;
      });
    //console.error('strJson2',strJson);
      YLdata.value = strJson;
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
  var LineColor = [
    "#3E8BFF",
    "#1CB8B2",
    "#01DDFF",
    "#F9C823",
    "#0264FD",
    "#FE7923",
    "#8E30FF",
  ];
  const _Option = ChartJs.chartYL(
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
  for (var num = 0; num < strJson.reverse().length; num++) {
    var item = strJson.reverse()[num];
    var drp = item.drp != undefined ? Number(item.drp).toFixed(1) : "—";
    var tm = dayjs(new Date(item.tm)).format("YYYY-MM-DD HH:mm");

    result.push({ num: num + 1, tm: tm, drp: drp });
  }
  tableData.value = result;
}
function getType(obj) {
  mtype.value = obj;
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
  if (props.ybtm != "") {
    ybtm.value = props.ybtm;
  } else {
    ybtm.value = inject("ybtm").value;
  }
  if (props.type != "") {
    type.value = props.type
  } else {
    type.value = inject("type").value;
  }
  if (props.ereaname != "") {
    ereaname.value = props.ereaname
  } else {
    ereaname.value = inject("ereaname").value;
  }
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
</style>
