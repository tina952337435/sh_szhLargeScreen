<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">预报最高水位极值</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table wqtable" :border="0"
                :cellspacing="0" :cellpadding="0" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <yubaoSWMax :rainListSW="rainListSW" />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import $ from "jquery";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import { convertToDate } from "@/api/dateUtil.js";
import Dialog from "@/api/utils/Dialog.js";
const titleName = ref();
const typeValue = ref();
const showDialog = ref(false);
const datekeyDialog = ref(null);
import { onMounted, ref, shallowRef, defineAsyncComponent, nextTick, provide, inject, watch, h } from "vue";
import dayjs from "dayjs";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");

const tableHeaders = ref(null);
tableHeaders.value = [
    { name: "stnm", label: "站名" },
    { name: "maxz", label: "最高水位(m)" },
    { name: "maxtm", label: "出现时间(m)" },
    { name: "xzdz", label: "历史最高(m)" }
];

const props = defineProps({
    rainListSW: {
        type: String,
        default: ""
    },
});
const tableData = ref([]);
watch(props.rainListSW, () => {
    Weacontent();
});

onMounted(() => {
    if (props.rainListSW != undefined) {
        Weacontent();
    }
});
function Weacontent() {
    var dataResult = [];
    if (props.rainListSW.length > 0) {
        var data = props.rainListSW;
        for (var num = 0; num < data.length; num++) {
            var maxz = SetNull(data[num].maxz) != "" ? Number(data[num].maxz).toFixed(2) : "—";
            var minz = SetNull(data[num].maxz) != "" ? Number(data[num].maxz).toFixed(2) : "—";
            var xzdz = SetNull(data[num].xzdz) != "" ? Number(data[num].xzdz).toFixed(2) : "—";
            var wrz = SetNull(data[num].wrz) != "" ? Number(data[num].wrz).toFixed(2) : "—";
            var grz = SetNull(data[num].grz) != "" ? Number(data[num].grz).toFixed(2) : "—";
            var maxtm = SetNull(data[num].maxtm) != "" ? dayjs(convertToDate(data[num].maxtm)).format("M-D HH:mm") : "—";
            var mintm = SetNull(data[num].maxtm) != "" ? dayjs(convertToDate(data[num].maxtm)).format("M-D HH:mm") : "—";
            var colorCss = "";
            if (wrz != "—" && maxz != "—") {
                if (maxz > wrz) {
                    colorCss = "#F9C33D";
                }
            }

            if (grz != "—" && maxz != "—") {
                if (maxz > grz) {
                    colorCss = "#F70019";
                }
            }
            dataResult.push({
                stnm: SetNull(data[num].stnm),
                maxz: maxz,
                minz: minz,
                xzdz: xzdz,
                maxtm: maxtm,
                mintm: mintm,
                colorCss: colorCss,
                wrz: wrz,
                grz: grz,
            })
        }

    }
    tableData.value = dataResult;
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
function OnBoot() {
    const propsAll = {};
    propsAll["datasource"] = "YB";
    propsAll["pid"] = DD_ARR.DD_ID;

    //ChildVue为弹窗中嵌入的slot
    const ChildVue = defineAsyncComponent(() =>
        import("@/components/danzhan/wq/WQDiaoduAll.vue")
    );
    Dialog.open({ title: "推荐调度", widh: 1200, heig: 800 }, h(ChildVue, propsAll)).then(() => { console.log('弹窗关闭了') })
}
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
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

:deep(.wqtable tr td:nth-child(2)) {
    /* color: var(--mtablecolorIm) !important; */
    /* color: #07EF7D !important; */
}
</style>
  