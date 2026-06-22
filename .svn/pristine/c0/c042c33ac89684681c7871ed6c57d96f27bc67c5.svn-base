<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">方案1淹涝情况</p>
            </div>
        </div>
        <div class="txt" style="overflow-y: auto">
            <customTable :headers="tableHeaders" :rows="tableData" class="m-table FirstTable" :border="0" :cellspacing="0"
                :cellpadding="0" @click="handleclick" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <YanlaoTable />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/Table.css';
import ComZujian from "@/components/ComZujian.vue";
import TableSWJC from "@/components/menu/sq/TableSWJC.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { useStore } from 'vuex'
import { ref, onMounted, reactive, watch, defineAsyncComponent, h } from "vue";
import Dialog from "@/api/utils/Dialog.js";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";
const store = useStore();
const { viewer } = store.state;
const datekey = ref(null);
const tableHeaders = ref([
    { name: "zhen", label: "行政分区" },
    { name: "area", label: "最大淹没面积(k㎡)" },
    { name: "upz", label: "平均淹没水深(m)" },
]);
const tableData = ref([
    { "zhen": "徐汇区", "area": 48.0, "upz": 0.56 },
    { "zhen": "黄浦区", "area": 34.2, "upz": 1.00 },
    { "zhen": "长宁区", "area": 22.0, "upz": 0.60 },
    { "zhen": "静安区", "area": 206.0, "upz": 0.57 },
    { "zhen": "闵行区", "area": 288.7, "upz": 0.76 },
    { "zhen": "浦东浦西区", "area": 154.5, "upz": 0.34 },
    { "zhen": "合计", "area": 753.4, "upz": 0.62 },
]);
const tableDataAll = ref([]);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const stime = ref({});
const etime = ref({});
const props = defineProps({
    SWData: {
        type: Array,
        default: []
    },
    SWHeader: {
        type: String,
        default: ""
    },
});
var strJson = props.SWData;
var strJsonHeader = props.SWHeader;
// watch(props.SWData, () => {
//     Weacontent();
// });
function Weacontent() {
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
<style scoped>
.m-table tr th:nth-child(1),
.m-table tr td:nth-child(1) {
    width: 100px;
}

.m-table tr td:nth-child(2) {
    width: 80px;
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
.txt::-webkit-scrollbar {
    width: 2px;
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

:deep(.el-input) {
    --el-input-border-color: var(--popContentHeadbg) !important;
    width: 160px;
    border-radius: 6px;
    margin-left: 50px;
    height: 1.8rem;
    vertical-align: 0.8rem;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}

:deep(.el-input__inner) {
    color: var(--mtablecolor);
}
</style>