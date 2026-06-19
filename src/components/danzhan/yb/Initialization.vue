<template>
  <div class="topClass">
    <div style="float:left;">
      <span>&nbsp;&nbsp;预报时间：</span>
      <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
        showTime="true" showOkButton="true" showClearButton="false" @change="StimeeChange" />
      <span>&nbsp;&nbsp;预见期：</span>
      <el-select v-model="selectedValue" class="m-2" placeholder="Select" size="small" style="width:80px"
        @change="TypeeChangeSel">
        <el-option v-for="item in shichangoptions" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>&nbsp;
    </div>

    <div style="width:200px;margin:7px 0px 0px 10px;float:left;" class="div-swiper" v-if="yuliangguochengdiv">
      <div class="swiper-slide" style="width: 50%;"
        :class="Drpswiper == 'YLPL' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YLPL')">批量输入</div>
      <div class="swiper-slide" style="width: 50%;"
        :class="Drpswiper == 'YLPL20' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YLPL20')">设计暴雨

        <div class="tableWQDIV">
          <el-tree style="width: 100%;height: 100%;" :data="treeResult.value" :props="defaultProps"
            @node-click="handleNodeClick" :default-expand-all="true" />
        </div>

      </div>
    </div>

    <el-button type="primary" @click="changeJYData()">
      查询
    </el-button>
  </div>

  <div class="tableDiv" style="height:630px;width:100%;">
    <div style="height:240px;width:100%;">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>

    <el-table class="m-table" style="height:calc(100% - 250px);width:100%;--el-table-border-color:none;" :data="tableData"
      ref="tableList" @cell-click="onTableChange">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column label="时间" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.tm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="{{tableField}}" header-align="center" align="center">
        <template #header>
          {{ tableField }}
          <el-input v-model="search" size="small" placeholder="请输入雨量" @blur="searchblurevt" />
        </template>
        <template #default="scope">
          <span v-show="!scope.row.isEdit">{{ scope.row.drp }}</span>
          <el-input v-show="scope.row.isEdit" v-model="scope.row.drp" :id="index" placeholder="请输入雨量"
            @blur="searchblurevtOne" />
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div style="width:100%;text-align:center;padding-top:10px;">
    <el-button @click="getTableData">启动模型计算</el-button>
  </div>
</template>


<script setup>
import $ from "jquery";
import {
  ref,
  onMounted,
  getCurrentInstance, 
  inject,
  reactive
} from "vue";
import { ElInput, ElTable, ElTableColumn, ElTree  } from "element-plus";
import {
  ElDatePicker,
  ElRadio,
  ElButton,
  ElSelect,
  ElConfigProvider
} from "element-plus";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import dayjs from "dayjs";
import api from "@/api/mode/index.js";
import apizonglan from "@/api/zonglan/index.js";
import { listToTree, SetNull, jsonToList, SumJson } from "@/api/ComUnit";
import { set } from "date-fns";

const treeResult = reactive([]);
const defaultProps = {
  children: "children",
  label: "title"
};
treeResult.value = [];
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("InitializationYBJY");
const _theme = localStorage.getItem("curTheme");

const shichangoptions = [
  { value: 24, label: "一天" },
  { value: 48, label: "二天" },
  { value: 72, label: "三天" },
  { value: 168, label: "一周" }
];
const DD_ID = inject("DD_ID");
const DD_ARR = inject("DD_ARR");
const tableData = ref([]);

var systemCtm = dayjs(new Date(DD_ARR.value.STIME)).format(
  "YYYY-MM-DD HH:00:00"
);
const stime = ref(systemCtm);
const selectedValue = ref(24);//ref(DD_ARR.value.DD_STANA);

var yuliangguochengdiv = ref(true);
var tableField = ref("雨量");

const search = ref("");

const Drpswiper = ref("YLPL");

onMounted(() => {
  mini.parse();
  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:00"));
  loadTreeData();
  changeJYData();
});
function loadTreeData() {
  var strParam = {
  };
  api
    .loadRainFallTree(strParam)
    .then(res => {
      var dataResult = res.result;
      var strJson = listToTree(dataResult, "id", "pid");
      treeResult.value = strJson;
    })
    .catch(err => { });

}

function JsonColumnChart() {
  var strJson = tableData.value;
  const strNote = [];
  strNote.push({ name: "时间", codename: "tmShort", tableV: "0", isShow: true });
  strNote.push({ name: "雨量", codename: "drp", tableV: "0", isShow: true });
  var LineColor = [
    "#3E8BFF",
    "#1CB8B2",
    "#01DDFF",
    "#F9C823",
    "#0264FD",
    "#FE7923",
    "#8E30FF"
  ];
  const _Option = ChartJs.chartYL(
    "",
    strJson,
    strNote,
    LineColor,
    "雨量",
    "false",
    _theme
  );
  lineOption.value = _Option;
  datekey.value = Date.now();
}
function onTableChange(row, column, cell, event) {
  row.isEdit = true;
}

const { proxy } = getCurrentInstance();
const emit = defineEmits(["childClick", "parentMethods"]);
function getTableData() {
  stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  const table = proxy.$refs.tableList;
  const data = table.data;
  var ybdrplist = tableData.value;
  var strParam = {};
  var startDate = stime.value;
  var hour = parseInt(selectedValue.value);
  var endDate = dayjs(dayjs(startDate).format("YYYY-MM-DD HH:mm:ss")).add(hour, "hour").format("YYYY-MM-DD HH:mm:ss");
  strParam["wqplength"] = "0.3";
  strParam["stime"] = startDate;
  strParam["etime"] = endDate;
  strParam["ybdrplist"] = JSON.stringify(ybdrplist);
  strParam["dayhour"] = "HOUR";
  apizonglan.stPptnWQTable(strParam)
    .then(res => {
      var strJson = res.result;
      if (strJson.length > 0) {
        var waterList = strJson[0].waterList;
        var rainList = strJson[0].rainList.length > 0 ? strJson[0].rainList : waterList;

      }
    })
    .catch(err => { });
}

function GetDrpTen(obj) {
  Drpswiper.value = obj;
  var value = search.value;
  const table = proxy.$refs.tableList;
  const data = table.data;
  if (obj == "YLPL") {
    $(".tableWQDIV").hide();
    //批量输入
    for (var num = 0; num < data.length; num++) {
      data[num].drp = value;
    }
    tableData.value = data;
    JsonColumnChart();
  } else if (obj == "YLPL20") {
    $(".tableWQDIV").show();
  } else if (obj == "YLPJ") {
    $(".tableWQDIV").hide();
  }
}

function TypeeChangeSel(value) {
  selectedValue.value = value;
  changeJYData();
}
function changeJYData() {
  stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  var result = [];
  var startDate = stime.value;
  var hour = Number(selectedValue.value);
  for (var num = 0; num < hour; num++) {
    var tm = dayjs(startDate).add(num, "hour").format("YYYY-MM-DD HH:mm:ss");
    var tmShort = dayjs(tm).format("MM-DD HH:mm");
    result.push({ tm: tm, drp: 0, tmShort: tmShort });
  }
  tableData.value = result;
  JsonColumnChart();
}
function searchblurevt(e) {
  var value = search.value;
  const table = proxy.$refs.tableList;
  const data = table.data;
  for (var num = 0; num < data.length; num++) {
    data[num].drp = value;
  }
  tableData.value = data;
  JsonColumnChart();
}
function searchblurevtOne(e) {
  console.error('e', e);
}
function handleNodeClick(evt) {
  var data = tableData.value;
  $(".tableWQDIV").hide();
  var item = evt;
  if (SetNull(item["children"]) == "") {
    // alert(evt.id);
    var strParam = { pathname: evt.id };
    api.loadRainFallData(strParam)
      .then(res => {
        var strJson = res.result;
        if (strJson.length > 0) {
          var totalDrp = SumJson(strJson, 'drp');
          search.value = totalDrp;
          for (var num = 0; num < data.length; num++) {
            var value = 0;
            if (num < strJson.length) {
              value = strJson[num].drp;
            }
            data[num].drp = value;
          }
          tableData.value = data;
          JsonColumnChart();
        }
      })
      .catch(err => { });
  }
}
</script>
<style src="@/assets/styles/style.css"></style>
<style src="@/assets/styles/Table.css"></style>

<style scoped>
.topClass {
  height: 45px;
  line-height: 40px;
  color: var(--widgetcolor);
}

.tableWQDIV {
  display: none;
  max-height: 200px;
  position: absolute;
  z-index: 2;
  background: #031223;
  border: 1px solid #45a9cb;
  padding-right: 10px;
}

:deep(.el-table) {
  background-color: var(--el-table-bg-colornew);
  border-bottom: 0px;
}

:deep(.el-table th.el-table__cell) {
  background-color: var(--el-table-tr-bg-colornew);
}

:deep(.el-table tr) {
  background-color: var(--el-table-tr-bg-colornew);
  display: revert;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  border-bottom: 0px;
}

:deep(.el-table td.el-table__cell) {
  border-bottom: 0px;
}

:deep(.el-table th.el-table__cell.is-leaf) {
  border-bottom: 0px;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background: none;
}

:deep(.el-table tr:nth-child(even)) {
  background: var(--mtabletrcolor);
}

:deep(.el-input__wrapper) {
  background-color: var(--el-inputbg);
  box-shadow: 0 0 0 0 rgba(0, 163, 255, 0.6) !important;
  border: 1px solid var(--el-inputbox-shadow);
}

.textbox {
  background: none;
  border: var(--portalborder);
  padding-left: 6px;
  padding-right: 6px;
  height: 26px;
  border-radius: 4px;
  margin-left: -1px;
  color: #fff;
}

.textbox:fous-visible {
  background: var(--portal) !important;
  border: var(--portalborder) !important;
  color: var(--widgetcolor);
}

:deep(.el-date-editor.el-input) {
  width: 160px;
}

:deep(.el-select__wrapper) {
  /* background-color: var(--el-inputbg);
  box-shadow: 0 0 0 1.5px var(--el-inputbox-shadow); */

  background-color: #d5141400;
  box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
}

:deep(.el-select__placeholder) {
  /* color: var(--titlemenu) */
  color: var(--widgetcolor);
}

:deep(.el-input__wrapper) {
  background-color: #d5141400;
  box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
}

:deep(.el-input__inner) {
  color: var(--widgetcolor);
}

.div-swiper {
  line-height: 26px;
  margin: 0 auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
  position: relative;
  width: 25%;
  height: 1.875rem;
  font-size: 0.875rem;
  color: var(--mtablethcolor);
  white-space: nowrap;
  line-height: 2rem;
  text-align: center;
  cursor: pointer;
  background: var(--swiperSlide) no-repeat top center;
  background-size: 100% 1.875rem;
  display: inline-block;
  font-family: arial, "Hiragino Sans GB";
}

.swiper-slide-thumb-active {
  font-size: 0.875rem;
  /* color: var(--mtablethcolor); */
  color: #ffffff;
  background: var(--swiperSlideActive) no-repeat top center;
  background-size: 100% 1.875rem;
}

.dialog .div-swiper {
  line-height: 34px;
  margin: 0 auto;
  max-width: 60%;
}

:deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}

.el-tree {
  color: var(--title2);
}

:deep(.el-tree-node__content:hover) {
  background-color: var(--popupContentTitleColor);
  color: #fff;
}

:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: var(--popupContentTitleColor);
  color: #fff;
}

:deep(.el-tree-node .el-tree-node__children .el-tree-node__children) {
  color: var(--title2);
}
</style>