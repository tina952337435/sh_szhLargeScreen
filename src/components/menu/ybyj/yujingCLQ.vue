<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">防汛风险点预警</p>
      <el-button type="primary" @click="MessageSearch()" style="position: absolute;right: 0px;"
        class="age-btn">发送短信</el-button>
    </div>
    <div class="txt" style="overflow-y: auto">
      <!-- <el-table :data="tableData" style="width: 100%;height:calc(100% - 75px);" class="tableHeight" ref="tableRef"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="20px" :indeterminate="true"></el-table-column>
        <el-table-column type="index" label="序号" width="60" header-align="center" align="center" />
        <el-table-column label="风险点名称" prop="stnm" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="撤离条件" prop="condition" align="center">
        </el-table-column>
        <el-table-column label="联系人" prop="owen" align="center">
        </el-table-column>
      </el-table> -->
      <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table CLQTable" :border="0"
        :cellspacing="0" :cellpadding="0" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleNameCLQ" :typeValue="typeValueCLQ"
    style="width: 70%; height: 700px">
    <yujingCLQ />
  </ComZujian>
</template>

<script setup>
import MyDialog from "@/components/ComDialog.vue";
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/mode/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import { ElButton, ElMessage, ElTable, ElTableColumn } from "element-plus";
import {
  onMounted,
  ref,
  shallowRef,
  defineAsyncComponent,
  nextTick,
  provide,
  inject,
  watch
} from "vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const tableHeaders = ref(null);
tableHeaders.value = [
  { name: "name", label: "风险点名称" },
  { name: "owen", label: "联系人" },
  { name: "nameType", label: "类型" },
  // { name: "iswarning", label: "是否撤离" }
];

const titleNameCLQ = ref();
const titleNameLine = ref();
const showDialog = ref(false);


const showDialogM = ref(false);
const titleName = ref("防汛风险点短信通知");
const emergencyList = ref([]);
const baseDataNew = ref([]);
function MessageSearch() {
  // emergencyList.value = tableData.value
  // .filter(function (e) { return e.colorCss == "#DA0112" })
  $(".g-rside").css({ "z-index": 99 });
  showDialogM.value = true;
  titleName.value = "防汛风险点短信通知";
}
const props = defineProps({
  DD_ARR: {
    type: String,
    default: ""
  },
  wqstrJson: {
    type: Array,
    default: []
  },
});
var DD_ARR = props.DD_ARR; //调度方案编号
var wqstrJson = props.wqstrJson;
const tableData = ref([]);
watch(props, () => {
  Weacontent();
});

onMounted(() => {
  Weacontent();
});
function Weacontent() {
}
function fangda() {
  // Weacontent();
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  nextTick(() => {
    showDialog.value = true;
  });
}
provide("titleName", titleName);
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
:deep(.el-button--primary span) {
  padding-left: 0px;
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
  color: var(--popupContentTitleColor);
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
  background: none;
}

:deep(.el-table .cell) {
  padding: 0 8px;
  white-space: nowrap;
  cursor: pointer;
}
</style>