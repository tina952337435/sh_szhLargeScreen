<template>
  <div class="tableDiv" style="height:630px;width:96%;margin: 0 auto;">
    <el-table class="m-table" style="height:100%;width:100%;--el-table-border-color:none;" :data="tableData"
      ref="tableList" empty-text="暂无数据">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column label="工程名称" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.stnm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设计流量(m³/s)" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.plsjpum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.typename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="河道" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.rvnm }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import $ from "jquery";
import { ref, onMounted, defineAsyncComponent, inject, h } from "vue";
import { ElInput, ElTable, ElTableColumn } from "element-plus";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import Dialog from "@/api/utils/Dialog.js";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);

var props = inject("props");
const tableData = ref([]);
onMounted(() => {
  Weacontent();
});

function Weacontent() {
  var strParam = {};
  strParam["strExp"] = props.wqid;
  // strParam["pid"] = "泵站,雨水排站";
  api.WQFindResult(strParam).then(res => {
    console.error("res", res);
    tableData.value = res.result;
  })
}
</script>
<style src="@/assets/styles/style.css"></style>
<style src="@/assets/styles/Table.css"></style>

<style scoped>
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
  height: 50px;
  line-height: 50px;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  border-bottom: 0px;
}

:deep(.el-table td.el-table__cell) {
  border-bottom: 0px;
  font-size: 1rem;
}

:deep(.el-table th.el-table__cell.is-leaf) {
  border-bottom: 0px;
  font-size: 1rem;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background: none;
}

:deep(.el-table tr:nth-child(even)) {
  background: var(--mtabletrcolorgc);
}

:deep(.el-input__wrapper) {
  background-color: var(--el-inputbg);
  box-shadow: 0 0 0 0 rgba(0, 163, 255, 0.6) !important;
  border: 1px solid var(--el-inputbox-shadow);
}

:deep(.el-input__inner) {
  color: var(--conter-nayulabel) !important;
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
</style>