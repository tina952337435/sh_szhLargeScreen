<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" @click="fangda()">省市边界</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <el-table :data="tableData" style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;"
                @row-click="handleclick">
                <el-table-column fixed type="index" label="序号" width="60" header-align="center" align="center" />
                <el-table-column fixed label="名称" prop="stnm" width="120" header-align="center" align="center"
                    :show-overflow-tooltip="true">
                    <template #header>
                        名称
                    </template>
                    <template #default="scope">
                        <span style="cursor: pointer;" v-show="!scope.row.isEdit">{{ scope.row.stnm }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="站类" header-align="center" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.type }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <TableSBJ />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
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

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const tableHeaders = ref(null);
const tableData = ref();

function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 90 });
    $(".g-rside ").css({ "z-index": 99 });
    showDialog.value = true;
}

const props = defineProps({
    strJsonZF: {
        type: Array,
        default: () => []
    }
});

watch(props.strJsonZF, () => {
    Weacontent();
})

// 判断弹窗是否显示,默认隐藏
const showDialogSZ = ref(false);
const titleNameSZ = ref();

function Weacontent() {
    tableData.value = [
        {"stnm":"盐铁躺北闸","type":"水文站"},
        {"stnm":"商榻北","type":"水文站"},
        {"stnm":"商榻（流量）","type":"水文站"},
        {"stnm":"商榻（水质）","type":"水文站"},
        {"stnm":"大观园","type":"水文站"},
        {"stnm":"商榻北","type":"水文站"},
    ];
}

onMounted(() => {
    Weacontent();
})
function handleclick(evt) {
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
  