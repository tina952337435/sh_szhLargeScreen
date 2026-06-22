<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" @click="fangda()">管理单位简介</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt" style="overflow-y: auto;">
            <div style="font-size: 14px;color:var(--mtablecolor);padding-left:10px;line-height:30px;">
                &nbsp;&nbsp;&nbsp;&nbsp;1、贯彻执行国家和本市有关水文管理的方针、政策和法律、法规、规章。</div>
            <div style="font-size: 14px;color:var(--mtablecolor);padding-left:10px;line-height:30px;">&nbsp;&nbsp;&nbsp;&nbsp;2、依法承担本市水文行业管理工作，协助主管部门编制实施本市水文事业发展规划、水文行业技术规范和标准等。</div>
            <div style="font-size: 14px;color:var(--mtablecolor);padding-left:10px;line-height:30px;">&nbsp;&nbsp;&nbsp;&nbsp;3、负责编制本市水水文站网规划，开展水文站网和水文测报设施的建设、维护和管理工作;对本市水文测站的设立、迁移、改级、裁微等申顶进行申校。</div>
            <div style="font-size: 14px;color:var(--mtablecolor);padding-left:10px;line-height:30px;">&nbsp;&nbsp;&nbsp;&nbsp;4、负责本市水文水情监测、水资源(地下水、地表水)监测评价、水文水质信启通报、水文情报预报与发布、防汛防台水文测报、突发事件应急监测等工作。</div>
            <div style="font-size: 14px;color:var(--mtablecolor);padding-left:10px;line-height:30px;">&nbsp;&nbsp;&nbsp;&nbsp;5、负责本市水文资料收集和管理，水文数据库和信息系统建设和管理等工作。</div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <TableJJ />
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
        { "stnm": "盐铁躺北闸", "type": "水文站" },
        { "stnm": "商榻北", "type": "水文站" },
        { "stnm": "商榻（流量）", "type": "水文站" },
        { "stnm": "商榻（水质）", "type": "水文站" },
        { "stnm": "大观园", "type": "水文站" },
        { "stnm": "商榻北", "type": "水文站" },
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
  