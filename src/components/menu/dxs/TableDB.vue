<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">单站对比统计</p>
            <div style="width:calc(100% - 220px);margin-left:50px;" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'other' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('other')">
                    深层</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'all' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('all')">
                    浅层</div>
            </div>
        </div>
        <div class="txt" style="overflow-y: auto;">
            <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table tableYQ" :border="0"
                :cellspacing="0" :cellpadding="0" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableGX />
    </ComZujian>
</template>
<script setup>
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
const Typeswiper = ref('other');
const datekey = ref(null);
const dateid = ref('shujugx');
const lineOption = ref({});
const trendsTooltip = ref();
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const tableHeaders = ref([
    { name: "stnm", label: "测站名称" },
    { name: "upz", label: "埋深" },
    { name: "lastmounth", label: "上月同比" },
    { name: "lastyear", label: "上年同比 " },
]);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
function Weacontent() {
    var result = [
        { stnm: "平望", upz: "5.38", lastmounth: "-1.50(3.88)", lastyear: "-1.13(4.25)", },
        { stnm: "瓜泾口", upz: "4.87", lastmounth: "-1.01(3.76)", lastyear: "-0.68(4.09)", },
        { stnm: "金泽", upz: "5.61", lastmounth: "+0.47(6.08)", lastyear: "+0.84(6.45)", },
        { stnm: "陈墅", upz: "1.56", lastmounth: "0.24(1.80)", lastyear: "-0.26(1.30)", },
        { stnm: "甘露", upz: "3.79", lastmounth: "-1.23(2.56)", lastyear: "-1.13(3.76)", },
        { stnm: "洛社", upz: "5.38", lastmounth: "-1.5(3.88)", lastyear: "-1.13(4.25)", },
        { stnm: "青阳", upz: "5.38", lastmounth: "-1.5(3.88)", lastyear: "-1.13(4.25)", },
        { stnm: "宜兴", upz: "5.38", lastmounth: "-1.5(3.88)", lastyear: "-1.13(4.25)", },
        { stnm: "金家坝", upz: "5.38", lastmounth: "-1.5(3.88)", lastyear: "-1.13(4.25)", },
    ]
    tableData.value = result;
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
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
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

.text-xiaolv {
    height: 40px;
    width: 60px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--titled1);
    box-shadow: 0 0 10px var(--titled1), inset 0 0 10px var(--titled1);
    padding: 4px 10px;
    /* margin: 0px auto; */
    margin-top: 13px;
    line-height: 30px;
    color: var(--titled1);
    float: left;
    margin-right: 10px;
}

.text-22 {
    font-size: 22px;
}

.text-white {
    --text-opacity: 1;
    color: var(--mtablecolor);
}

.gradient-text {
    font-family: "number";
    background: linear-gradient(180deg, #ed9b42, #fef886);
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: 0;
    font-weight: 800;
}
</style>
