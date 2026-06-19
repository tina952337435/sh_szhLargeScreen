<template>
  <div class="m-box m-box-3" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2">台风信息</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <div style="height: 350px; width: 96%; margin-bottom: 5px; width: 100%">
        <div class="wqtitle">
          <el-select v-model="selectedValue" class="m-2" placeholder="Select" size="small" style="width:80px"
            @change="yearChangeSel">
            <el-option v-for="item in yearoptions" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </div>
        <div style="width: 100%; height: 310px" class="two-list" id="SSXQList">
          <el-table :data="tableData" style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;"
            @selection-change="doSelectChange" ref="myTable" @select="selectionSelect">
            <el-table-column type="selection" width="20px"></el-table-column>
            <el-table-column label="编号" prop="ZJ_TFBH" style="width:30%" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="中文名" prop="ZJ_TFM" style="width:30%" align="center">
            </el-table-column>
            <el-table-column label="英文名" prop="ZJ_TFME" style="width:30%" align="center" :show-overflow-tooltip="true">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="tableWQ" style="height: calc(100% - 350px); width: 98%;">
        <div class="wqtitle">
          <span id="tftitle"> 台风路径 </span>
          <div @click="OnBoot()"
            style="height:24px;line-height: 22px;font-size:14px;font-family:arial;position: absolute;right: 10px;top: 8px;padding:0px 10px;color: var(--mtablethcolor);border-radius:5px;border:1px solid var(--mtablethcolor) !important;cursor:pointer;">
            清除
          </div>


          <!-- <div @click="OnBootStart()"
          style="height:24px;line-height: 22px;font-size:14px;font-family:arial;position: absolute;right:70px;top: 8px;padding:0px 10px;color: var(--mtablethcolor);border-radius:5px;border:1px solid var(--mtablethcolor) !important;cursor:pointer;">
          播放
        </div> -->


        </div>
        <div class="tableWQDIV" style="height: calc(100% - 40px); width: 100%; overflow-y: auto">
          <el-table :data="tableLJData" style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;"
            @row-click="doRowClick" row-key="ID">
            <el-table-column label="时间" prop="times" style="width:30%" align="center">
            </el-table-column>
            <el-table-column label="风速" prop="FS" style="width:30%" align="center">
            </el-table-column>
            <el-table-column label="移向" prop="MOVEFX" style="width:30%" align="center">
            </el-table-column>
            <el-table-column label="气压" prop="QY" style="width:30%" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script  lang="ts" setup>
import {
  ElTable,
  ElSelect,
  ElOption,
  ElMessage,
  ElTableColumn
} from "element-plus";
import {
  onMounted,
  ref,
  nextTick,
  reactive,
  provide,
  defineAsyncComponent,
  getCurrentInstance,
  h,
  inject,
  onUnmounted
} from "vue";
import apityphoon from "@/api/typhoon/indexJD.js";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";

import $ from "jquery";
import { convertToDate } from "@/api/dateUtil.js";
import dayjs from "dayjs";
import * as myTyphoon from "@/utils/ArcGis/myTyphoon.js";
import { windyUtil } from "@/utils/share/windyUtil.js";

import { useStore } from "vuex";

const store = useStore();
const { viewer } = store.state;


const rbl = ref(null);
const Drpswiper = ref(null);

const myTable = ref(null);
const yearoptions = [];
var yearList = [];
var year = new Date().getFullYear();
for (var num = year; num >= 1949; num--) {
  yearoptions.push({ value: num, label: num });
}
const selectedValue = ref(year);
const tfbhValue = ref(null);
const tableData = ref([]);
const tableLJData = ref([]);
const { proxy } = getCurrentInstance();
const iscomObj = ref("0");

onMounted(() => {
  Weacontent();
});
onUnmounted(() => {
  myTyphoon.clearTaiFeng();
});
function yearChangeSel(value) {
  selectedValue.value = value;
  Weacontent();
}
function Weacontent() {
  var postParam = { "STIME": selectedValue.value + "-01-01 00:00:00", "ETIME": selectedValue.value + "-12-31 23:59:59" };
  apityphoon.GetTyphoonWeacontent('TYPHOON_ZJ_TFSel', postParam).then(res => {
    JosnSel(res, "TFSel");
  });
}
function GetTyphoonList() {
  var postParam = { "tfbh": tfbhValue.value, "isYB": "false" };
  apityphoon.GetTyphoonWeacontent('GetTyphoonList', postParam).then(res => {
    JosnSel(res, "TFLJSel");
  });
}
const emit = defineEmits(['parentMethods', 'parentMethodPoints', 'parentMethodPointStarts', 'parentMethodshowDynamicLayers']);
function JosnSel(data, typeID) {
  if (typeID == "TFSel") {
    tableData.value = data.data;
    var indexArr=[];
    var tfListData = tableData.value.filter(function (res,_index) {
      var iscom = res.ZJ_ISCOMPLETED;
      if(iscom == 1 || iscom == "1"){
        indexArr.push(_index);
      }
      return iscom == 1 || iscom == "1";
    });
    if (tfListData.length > 0) {
      emit("parentMethods", tableData.value);
      setTimeout(() => {
          // 默认勾选第一个
          for(var _index=0;_index<indexArr.length;_index++){
            myTable.value.toggleRowSelection(tableData.value[indexArr[_index]], true);

            tfbhValue.value = tableData.value[indexArr[_index]].ZJ_TFBH;
            iscomObj.value = tableData.value[indexArr[_index]].ZJ_ISCOMPLETED;
            GetTyphoonList();
          }
        }, 100);
    }
  }
  else if (typeID == "TFLJSel") {
    var strJsonTM = [];
    if (data.data[0].points.length > 0) {
      for (var num = 0; num < data.data[0].points.length; num++) {
        var items = data.data[0].points[num];
        items["times"] = dayjs(convertToDate(items["RQSJ2"])).format("MM-DD HH:mm");
        strJsonTM.push(items);
      }
    }
    // tableLJData.value = data.data[0].points;
    tableLJData.value = sortObjectArray(strJsonTM, ['times'], 'desc');
    $("#tftitle").html("【<span style='font-weight:600;'>" + data.data[0].name + "</span>】实况路径");
    // console.error("taifeng",data.data)
    var strJsonList = data.data;
    // strJsonList[0]["points"]=sortObjectArray(strJsonList[0]["points"], ['times'], 'desc');
    emit("parentMethodPoints", strJsonList, true, iscomObj.value);
  }
}

function doSelectChange(evt) {
  var InputList = evt
  // if (InputList.length > 0) {
  //     var TFBHID = "";
  // for (var num = 0; num < InputList.length; num++) {
  //     TFBHID += InputList[num].ZJ_TFBH + ",";
  // }
  // TFBHID=TFBHID.substring(0,TFBHID.length-1);
  // tfbhValue.value=InputList[InputList.length-1].ZJ_TFBH;
  // GetTyphoonList();
  //} else {}
}
function doRowClick(evt) {
  if (SetNull(evt["JD"]) == "" || SetNull(evt["WD"]) == "") {
    ElMessage.error("缺少经纬度坐标");
  }
  else {
    let _lgtd = Number(evt["JD"]);
    let _lttd = Number(evt["WD"]);
    
    emit('parentMethodshowDynamicLayers', evt);
  }
}
function tableRowClassName(row, rowIndex) {
  row.row.index = row.rowIndex;
  // console.error('row',row.row,'rowIndex',rowIndex);
}
function formatDate(row, column, cellValue, index) {
  // 这里使用 row 和 cellValue 来格式化日期
  // 假设 cellValue 是一个 ISO 字符串，例如 '2024-03-12'
  cellValue = convertToDate(cellValue);
  var date = new Date(cellValue);
  // date = dayjs(date).format("MM-DD HH:mm");
  return date;
}
function selectionSelect(selection, row) {
  // console.error('row',row);
  if (selection.length > 0) {
    var selectionTemp = selection.filter(function (res) {
      return res.ZJ_TFBH == row.ZJ_TFBH;
    });
    if (selectionTemp.length > 0) {//选中
      tfbhValue.value = row.ZJ_TFBH;
      iscomObj.value = row.ZJ_ISCOMPLETED;
      GetTyphoonList();
    } else {//取消
      tfbhValue.value = row.ZJ_TFBH;
      iscomObj.value = row.ZJ_ISCOMPLETED;
      emit("parentMethodPoints", [], tfbhValue.value, iscomObj.value);
    }
  } else {//取消
    tfbhValue.value = row.ZJ_TFBH;
    emit("parentMethodPoints", [], tfbhValue.value, iscomObj.value);
  }
}

function OnBoot() {
  proxy.$refs.myTable.clearSelection();
  emit("parentMethodPoints", [], undefined);
}

function OnBootStart() {
  emit("parentMethodPointStarts", tableLJData.value);
}
</script>

<style src="@/assets/styles/Table.css"></style>
<style scoped>
.typhoonMenu {
  height: 40px;
  padding-top: 10px;
  display: none;
}

tr td:nth-child(1) {
  width: 20vh;
}

tr td:nth-child(2) {
  width: 10vh;
}

tr td:nth-child(3) {
  width: 10vh;
}

tr td:nth-child(4) {
  width: 10vh;
}

tr td:nth-child(5) {
  width: 12vh;
}

/* 自定义滚动条样式 */
.tableWQ::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.tableWQ::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.tableWQ::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.tableWQDIV::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.tableWQDIV::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.two-list .two-item {
  padding: 0 10px;
}

.two-list .two-item .two-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-bottom: var(--titleborder);
}

.area {
  background: var(--wqbotton);
  border: 1px solid #016aa4;
  width: 96px;
  height: 30px;
  line-height: 26px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #ffffff;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-radius: 4px;
}

.areaSelect {
  background: var(--swDivSelectcolor);
  color: var(--sel_wraplabelcolorSel);
  border: 1px solid #016aa4;
  width: 96px;
  height: 30px;
  line-height: 26px;
  margin-right: 10px;
  margin-bottom: 10px;
  /* color: #ffffff; */
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-radius: 4px;
}

.spanTitleName {
  width: 40px !important;
  position: absolute;
  left: 10px;
  width: 100%;
  height: 30px;
  background: url(/images/titleImg.png) no-repeat left center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.wqtitle {
  /* display: flex; */
  margin: 0px 10px;
  color: var(--title2);
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-bottom: 1px solid var(--wqtitleline);
  position: relative;
}

.wq-table tr td:nth-child(2) {
  color: var(--mtablecolorIm) !important;
}

:deep(.el-select__wrapper) {
  /* background-color: var(--el-inputbg);
  box-shadow: 0 0 0 1.5px var(--el-inputbox-shadow); */

  background-color: #d5141400;
  box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
  ;
}

:deep(.el-select__placeholder) {
  /* color: var(--titlemenu) */
  color: var(--widgetcolor);
}

:deep(.el-table),
:deep(.el-table tr),
:deep(.el-table:not(.el-table--border) .el-table__cell) {
  background: transparent;
  color: var(--mtablecolor);
  border: none;
  --el-table-border-color: none;
}

:deep(.el-table__header-wrapper:not(.el-table--border) .el-table__cell) {
  color: var(--mtablethcolor);
}

:deep(.el-table .cell) {
  padding: 0 8px;
  white-space: nowrap;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell) {
  background-color: transparent;
}


:deep(.is-leaf .el-checkbox) {
  display: none;
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
  position: relative;
}

.swiper-slide-thumb-active {
  font-size: 0.875rem;
  /* color: var(--mtablethcolor); */
  color: #ffffff;
  background: var(--swiperSlideActive) no-repeat top center;
  background-size: 100% 1.875rem;
}

.menu_rainFall_content {
  display: none;
  position: absolute;
  width: 240px;
  top: -55px;
  left: 5px;
  font-family: '微软雅黑';
  padding: 10px 5px 10px 5px;
  z-index: 99;
  background: var(--portal);
}

.menu_rainFall_type {
  /* padding-top:5px; */
}
</style>
