<template>
  <div class="m-box m-box-1">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p1" id="title2" @click="fangda()">水质信息</p>
      <span class="spanTitle"></span>
      <!-- <div>
        <div @click="OnBoot()"
          style="height:26px;line-height: 24px;font-size:14px;font-family:arial;position: absolute;right: 10px;top: 8px;padding:0px 10px;color: var(--mtablethcolor);border-radius:5px;border:1px solid var(--mtablethcolor) !important;cursor:pointer;">
          水质评价标准
        </div>
      </div> -->
    </div>
    <div class="txt">
      <el-table :data="tableData" style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;"
        @row-click="handleclick">
        <el-table-column fixed type="index" label="序号" width="60" header-align="center" align="center" />
        <el-table-column fixed label="名称" prop="stnm" width="140" header-align="center" align="center"
          :show-overflow-tooltip="true">
          <template #header>
            名称
          </template>
          <template #default="scope">
            <span style="cursor: pointer;" v-show="!scope.row.isEdit">{{ scope.row.stnm }}</span>
          </template>
        </el-table-column>

        <el-table-column label="水质等级" header-align="center" align="center">
          <template #default="scope">
            <span :style="computedStyle(scope.row.stnm, scope.row.score)">{{ scope.row.score }}</span>
          </template>
        </el-table-column>

        <el-table-column label="时间" header-align="center" align="center">
          <template #default="scope">
            <span>{{ scope.row.stime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>


<script setup>
import MyDialog from "@/components/ComDialog.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { SetNull, groupBy, GetSZStateBy, GetSZState, getSZColor } from "@/api/ComUnit.js";
import { ref, onMounted, reactive, inject, watch, defineAsyncComponent, onUnmounted, h } from "vue";
import { ElInput, ElTable, ElTableColumn, ElMessage } from "element-plus";
import Dialog from "@/api/utils/Dialog.js";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");

const datekey = ref(null);
const tableHeaders = ref(null);
const tableData = ref();


const props = defineProps({
  strJsonSZ: {
    type: Array,
    default: () => []
  }
});

watch(props.strJsonSZ, () => {
  Weacontent();

})

tableHeaders.value = [
  { name: "rownum", label: "序号" },
  { name: "stnmshort", label: "名称" },
  { name: "score", label: "水质等级" },
  { name: "stime", label: "时间" }
];

// 判断弹窗是否显示,默认隐藏
const showDialogSZ = ref(false);
const titleNameSZ = ref();

function Weacontent() {
  tableData.value = props.strJsonSZ;
}

onMounted(() => {
  Weacontent();
});
function handleclick(evt) {
  s
  // if (SetNull(evt["lgtd"]) == "" && SetNull(evt["lttd"]) == "") {
  //   ElMessage.error("缺少经纬度坐标");
  // }
  // else {
  //   let _lgtd = Number(evt["lgtd"]);
  //   let _lttd = Number(evt["lttd"]);
  //   setCameraPosition(viewer, "addWaterQualityMark" + evt["stcd"], _lgtd, _lttd);
  //   pointMapBZ.showBiaoZhuMethod(evt, "addWaterQualityMark");

  // }
  // const ChildVue = defineAsyncComponent(() =>
  //   import("@/components/danzhan/sz/WaterQualityScreenDan.vue")
  // );
  // const props = {};
  // props["stcd"] = evt["stcd"];
  // props["stnm"] = evt["stnm"];
  // //ChildVue为弹窗中嵌入的slot
  // Dialog.open({ title: props["stnm"] + "水质过程线", widh: 1600, heig: 800 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })

}

function OnBoot() {
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialogSZ.value = true;
  titleNameSZ.value = "地表水环境质量标准基本项目标准限值";
}
// 颜色
function computedStyle(stnm, state) {
  var colorbg = getSZColor(state);
  var fontColor = "#ffffff";
  if (state == "0"|| state == "III" || SetNull(state) == "") {
    fontColor = "#000000";
  }
  return { background: colorbg, color: fontColor, padding: "10px", border: "1px", borderRadius: "8px" };
}

</script>
<style src="@/assets/styles/style.css"></style>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
/* 自定义滚动条样式 */
.txt::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.txt::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.txt::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--popContentHeadbg);
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
</style>
