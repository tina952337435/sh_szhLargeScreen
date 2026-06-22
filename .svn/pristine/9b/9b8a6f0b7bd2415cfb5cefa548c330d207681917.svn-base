<template>
  <div class="m-box" style="position: relative">

    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">管网信息</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <!-- <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table" :border="0" :cellspacing="0"
        :cellpadding="0" @click="handleclick" /> -->
      <el-table :data="tableData" @row-click="handleclick"
        style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;">
        <el-table-column label="名称" prop="stnm" style="width:40%" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="相对液位" prop="relative_WL" style="width:20%" align="center">
        </el-table-column>
        <el-table-column label="水深" prop="dept" style="width:20%" align="center">
        </el-table-column>
        <el-table-column label="时间" prop="mdhm" style="width:20%" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="bot"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableGW />
  </ComZujian>
</template>
<script setup>
import { useStore } from "vuex";
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElTable, ElTableColumn  } from "element-plus";
import { SetNull } from "@/api/ComUnit.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const showDialog = ref(false);
const store = useStore();
const { viewer } = store.state;
const tableHeaders = [
  { name: "stnm", label: "名称" },
  { name: "relative_WL", label: "相对液位" },
  { name: "dept", label: "水深" },
];
const tableData = ref();

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD 00:00:00"))
    .add(-6, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
  strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  strParam["pid"] = "2024111900003";
  api
    .att_shaftdatanewqueryList(strParam)
    .then(res => {
      var strJson = res.result;
      var result = [];
      for (var num = 0; num < strJson.length; num++) {
        var item = strJson[num];
        var dept = item.dept != undefined ? Number(item.dept).toFixed(2) : "—";
        var relative_WL = item.relative_WL != undefined ? Number(item.relative_WL).toFixed(2) : "—";

        var _strParam = {};
        _strParam["stnm"] = item.stnm;
        _strParam["relative_WL"] = relative_WL;
        _strParam["dept"] = dept;
        _strParam["stcd"] = item.stcd;
        _strParam["lgtd"] = item.lgtd;
        _strParam["lttd"] = item.lttd;

        _strParam["mdhm"] = SetNull(item.tm) != "" ? dayjs(item.tm).format("MM-DD HH:mm") : "";

        result.push(_strParam);

        tableData.value = result;

      }
    })
    .catch(err => { });
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
function handleclick(evt) {
  // const _rowindex = evt.target.className;
  // const strJson = tableData.value[_rowindex];
  let _lgtd = SetNull(evt["lgtd"]);
  let _lttd = SetNull(evt["lttd"]);
  if (_lgtd == "" || _lttd == "") {
    ElMessage.error("缺少经纬度坐标");
  } else {
  }
}
onMounted(() => {
  Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
:deep(.el-tabs--card>.el-tabs__header) {
  padding: 0px;
  margin: 0px;
}

:deep(.el-tabs--card>.el-tabs__header) {
  border-bottom: 0px;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
  border: 0px;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
  background: var(--swDivSelectcolor);
  border-radius: 6px;
  border: var(--portalborder);
  min-width: 80px;
  /* padding: 8px; */
  height: 34px;
  line-height: 34px;
  color: var(--widgetcolor);
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
  background: var(--portal);
  border-radius: 6px;
  min-width: 80px;
  border: var(--portalborder);
  /* padding: 8px; */
  height: 34px;
  line-height: 34px;
  color: white;
  margin: 0px 5px;
}

:deep(.demo-tabs > .el-tabs__content) {
  border: none;
  background: transparent;
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

:deep(.el-input) {
  --el-input-border-color: var(--mtablecolor);
  width: 200px;
  border-radius: 6px;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--mtablecolor) inset;
}

:deep(.el-input__inner) {
  color: var(--mtablecolor);
}

:deep(.el-table__body-wrapper .el-table__row:nth-child(even)) {
  background: var(--mtabletrcolor);
}

:deep(.el-table .cell) {
  padding: 0 8px;
  white-space: nowrap;
  cursor: pointer;
}
</style>
