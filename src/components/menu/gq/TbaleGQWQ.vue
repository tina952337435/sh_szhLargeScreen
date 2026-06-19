<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">圩区信息</p>
        </div>
        <div class="txt" style="overflow-y: auto">
            <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table gqwq-table" :border="0" :cellspacing="0"
                :cellpadding="0" @click="handleclick" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TbaleGQWQ />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { SetNull } from "@/api/ComUnit";
import { ref, onMounted, reactive, inject, watch, defineAsyncComponent, onUnmounted, h } from "vue";
import { ElInput, ElTable, ElTableColumn, ElMessage } from "element-plus";
import Dialog from "@/api/utils/Dialog.js";
const datekey = ref(null);
const tableHeaders = ref([
    {
        name: "wqname",
        label: "圩区名称"
    },
    {
        name: "upz",
        label: "实时水位"
    },
    {
        name: "maxUpz",
        label: "控制水位"
    },
    {
        name: "indexQ",
        label: "实时流量"
    },
    {
        name: "paiBili",
        label: "运行情况"
    },
]);
const WQtableData = inject("WQtableDataAll");
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const props = defineProps({
    WQtableDataAll: {
        type: Array,
        default: () => []
    },
});

watch(props.WQtableDataAll, () => {
    Weacontent();
});
function Weacontent() {
    tableData.value = WQtableData.value;
}
function handleclick(evt) {
    // const name = evt.target.innerText;
    // const strJson = tableData.value.find(item => item.wqname === name);
    // console.error(strJson)
    // const ChildVue = defineAsyncComponent(() =>
    //     import("@/components/danzhan/gq/DanZHanSel.vue")
    // );
    // const props = {};
    // props["wqid"] = strJson["wqid"];
    // props["wqname"] = strJson["wqname"];
    // props["tableData"] = strJson["rainList"];
    // //ChildVue为弹窗中嵌入的slot
    // Dialog.open({ title: props["stnm"], widh: 1700, heig: 800 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({
        "z-index": 99
    });
    $(".g-rside ").css({
        "z-index": 90
    });
    showDialog.value = true;
}
onMounted(() => {
    Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
:deep(tr td:nth-child(1)) {
    width: 20vh !important;
}

tr td:nth-child(2) {
    width: 15vh;
}

tr td:nth-child(3) {
    width: 15vh;
}

tr td:nth-child(4) {
    width: 10vh;
}

tr td:nth-child(5) {
    width: 12vh;
}

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

:deep(.liSelected) {
    color: var(--sel_wraplabelcolorSel) !important;
    background: var(--swDivSelectcolor) !important;
    ;
}

:deep(.liSelected td span) {
    color: var(--sel_wraplabelcolorSel) !important;
}
</style>