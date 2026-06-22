<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">蓝藻预报</p>
            <span class="spanTitle"></span>
            <div class="xiala"
                style="right: 20px;top: 6px;position: absolute;width:150px;line-height: 30px;cursor: pointer;">
                <label @click="showItem('SwiperType')" id="labelName"
                    style="position: absolute;right: 26px;font-size: 14px;font-family: var(--calcite-font-family);cursor: pointer;color:var(--mtablecolor);">
                    2025年12月1日
                </label>
            </div>
        </div>
        <div class="txt" style="overflow-y: auto;height:calc(calc(100vh - 28.825rem)*(2/6));">
            <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table tableYQ" :border="0"
                :cellspacing="0" :cellpadding="0" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <Tablelanzao />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";
import Dialog from "@/api/utils/Dialog.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const tableHeaders = ref([
    { name: "name", label: "片区" },
    { name: "one", label: "第一天" },
    { name: "two", label: "第二天" },
    { name: "three", label: "第三天 " },
]);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);

const Typeswiper = ref('yuntu');
function GetType(type) {
    Typeswiper.value = type;
}
function Weacontent() {
    tableData.value = [
        { "name": "全太湖", "one": "30.27", "two": "61.84", "three": "179.94" },
        { "name": "贡湖", "one": "2.19", "two": "0.98", "three": "13.34" },
        { "name": "南部沿岸区", "one": "27.33", "two": "8.14", "three": "0.16" },
        { "name": "中西北湖区", "one": "67.02", "two": "92.43", "three": "90.23" },
    ]
}

function handleclick(evt) {
    const name = evt.target.innerText;
    const strJson = tableData.value.find(item => item.stnm === name);
    const ChildVue = defineAsyncComponent(() =>
        import("@/components/danzhan/sq/SQLine.vue")
    );
    const props = {};
    props["stcd"] = strJson["stcd"];
    props["stime"] = dayjs(new Date()).add(-24, "hour").format("YYYY-MM-DD HH:mm:ss");
    props["etime"] = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    props["mtype"] = strJson["mtype"];
    //ChildVue为弹窗中嵌入的slot
    Dialog.open({ title: strJson["stnm"] + "水位过程线", widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
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
    background: var(--mtabletrcolor);
    z-index: 2;
}
</style>
