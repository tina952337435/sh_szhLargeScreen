<template>
  <div class="m-box m-box-2" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">积水点情况</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <el-table :data="tableData" @row-click="handleclick"
        style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;">
        <el-table-column type="index" label="序号" width="60" header-align="center" align="center" />
        <el-table-column label="站点名称" prop="stnm" style="width:20%" align="center">
        </el-table-column>
        <el-table-column label="是否有积水" prop="status" style="width:20%" align="center">
        </el-table-column>
        <el-table-column label="时间" prop="tm" style="width:20%" align="center" :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
    </div>
    <div class="bot"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableJSD />
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
import { ElMessage , ElTable, ElTableColumn } from "element-plus";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const showDialog = ref(false);
const store = useStore();
const { viewer } = store.state;
const tableHeaders = [
  { name: "stnm", label: "名称" },
  { name: "district", label: "行政区划" },
  { name: "type", label: "类型" },
  { name: "type2", label: "排水分类" },
];
const tableData = ref();
const stime = ref('2024-11-13 00:00:00');
const etime = ref('2024-11-13 23:59:59');

function Weacontent() {
  var strParam = {};
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;

  api.MyVideoSiteSelectListhydrops(strParam)
    .then(res => {
      var strJson = sortObjectArray(res.result, ['status'], 'desc');;
      // console.error(strJson)
      var result = [];
      if (strJson.length > 0) {
        for (var num = 0; num < strJson.length; num++) {
          var item = strJson[num];
          if (Number(strJson[num].status) >= 0.9) {
            item["status"] = "有";
          } else {
            item["status"] = "无";
          }
          if (SetNull(strJson[num].tm) != "") {
            item["tm"] = dayjs(strJson[num].tm).format("M-DD HH:mm");
          }
          result.push(item)
        }
      }
      tableData.value = result;
    })
    .catch(err => { });
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

function handleclick(evt) {
  let _lgtd = SetNull(evt["lgtd"]);
  let _lttd = SetNull(evt["lttd"]);
  if (_lgtd == "" || _lttd == "") {
    ElMessage.error("缺少经纬度坐标");
  } else {
    
  }
}
onMounted(() => {
  var now = new Date();
  stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 00:00:00"))
    .add(-1, "month")
    .format("YYYY-MM-DD HH:mm:ss");
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
/* 自定义滚动条样式 */
.el-table__body-wrapper::-webkit-scrollbar {
  width: 1px;
  /* 设置滚动条宽度 */
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  border-radius: 50%;
  z-index: 2;
}

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
