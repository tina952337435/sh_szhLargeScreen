<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" @click="fangda()">站网概况</p>
            <el-button type="primary" @click="MessageSearch()" style="position: absolute;right: 0px;"
                class="age-btn">站网管理<img style="width: 14px;margin-left:6px;" src="/images/Moreright.png"
                    alt="进入站网管理系统"></el-button>
        </div>
        <div class="txt" style="overflow-y: auto;height: calc(calc(100vh - 24.225rem) * (2 / 6));">
            <div class="dwDiv">
                <div>站网管理</div>
                <ul>
                    <li>水文测站<span class="spanNum">7980</span>个</li>
                    <li>综合站网密度<span class="spanNum">5.67</span>k㎡/个</li>
                </ul>
                <div style="clear:both;">年度建设进展</div>
                <ul>
                    <li>新建站点数<span class="spanNum">2678</span>个</li>
                    <li>年度计划完成率<span class="spanNum">68</span>%</li>
                    <!-- <li>多年平均水位<span class="spanNum">3.38</span>m</li> -->
                </ul>
                <!-- <div>浦东新区水文水资源事务管理中心</div> -->
            </div>
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
import { ElInput, ElTable, ElTableColumn, ElMessage, ElButton } from "element-plus";
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
:deep(.el-button--primary span) {
    padding-left: 0px;
    color: #def1ff;
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

.dwDiv {
    padding: 0px 10px;
    font-size: 15px;
    color: var(--mtablecolor);
}

.dwDiv div {
    padding: 15px 0px 5px 0px;
}

.dwDiv ul {
    list-style: none;
    padding-left: 26px;

}

.dwDiv ul li {
    width: 45%;
    position: relative;
    float: left;
    padding: 5px 0px;
}

.dwDiv ul li::before {
    content: "\2022";
    /* 使用实体来创建点 */
    color: var(--titled1);
    /* 修改点的颜色 */
    display: inline-block;
    /* 确保它以块级元素显示 */
    width: 20px;
    font-size: 30px;
    /* 设置宽度 */
    margin-left: -1em;
    vertical-align: -6px;
    /* 对齐文本 */
}

.dwDiv ul li span.spanNum {
    font-size: 20px;
    color: var(--titled1);
    font-weight: bold;
}
</style>