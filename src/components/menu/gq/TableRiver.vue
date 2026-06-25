<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">水利片</p>
            </div>
            <!-- <div style="width:calc(100% - 170px);" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'district' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('district')">
                    水利片区</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'river' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('river')">
                    骨干河道</div>
            </div> -->
        </div>
        <div class="txt" style="overflow-y: auto">
            <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table river-table" :border="0"
                :cellspacing="0" :cellpadding="0" @click="handleclick" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableRiver />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, watch } from "vue";
import { SetNull, groupBy } from "@/api/ComUnit";
import { convertToDate } from "@/api/dateUtil.js";
const Typeswiper = ref('district')
const datekey = ref(null);
const emit = defineEmits(['passValue',"passValueTJ"]);
const tableHeaders = ref([]);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const GCtableDataAll = ref([]);
tableHeaders.value = [
            {
                name: "num",
                label: "序号"
            },
            {
                name: "title",
                label: "名称"
            },
            {
                name: "total",
                label: "工程数量"
            },
            {
                name: "paiBili",
                label: "运行情况"
            },
];


const pidTJ=ref("2023060214563122171-2");

function loadGCTJ() {
  api.stPptnGQSLPTJ({ "key": "1", "pid": pidTJ.value }).then(res => { 
    GCtableDataAll.value = res.data;
    WeacontentDistrict();
  }).catch(err => { });
}

function WeacontentDistrict() {
    var strJson =GCtableDataAll.value;
    var result=[];
    if (strJson.length > 0) {
        var data =strJson;  
        data.filter(function(e,_index){
            e.num=_index+1;
            e.title=e.stnm;
            e.paiBili=Number(e.ROTATE).toFixed(1);
            e.total=e.NUM;
        }); 
        result=data;  
        // console.error('result',result);  
    }
    tableData.value = result;
}
function GetType(obj) {
    Typeswiper.value = obj;
    if(Typeswiper.value == "district") {
        pidTJ.value="2023060214563122171-2";
    }
    else if(Typeswiper.value == "river") {
        pidTJ.value="2023060214563122171-4";
    }    
    loadGCTJ();
}
const lastClickedRow = ref(null); // 新增：用于记录当前选中的河道行
function handleclick(evt) {
    // 找到点击的 tr 元素
    let targetTr = evt.target.closest('tr');
    if (!targetTr) return;

    // 移除所有 tr 元素的 active 类名
    const allTrs = document.querySelectorAll('.river-table tr');
    allTrs.forEach(tr => {
        tr.classList.remove('liSelected');
    });

    // 获取行索引
    var _rowindex = Array.from(allTrs).indexOf(targetTr) - 1;
    const currentRow = tableData.value[_rowindex];
    if (!currentRow) return;

        console.error('currentRow1',currentRow);
    if (lastClickedRow.value && lastClickedRow.value.stcd === currentRow.stcd) {
        // 再次点击同一行，取消选中
        lastClickedRow.value = null;
        emit('passValue', Typeswiper.value, "", "");
    } else {
        // 给当前点击的 tr 元素添加 active 类名
        targetTr.classList.add('liSelected');
        if (Typeswiper.value == "river") {
            emit('passValue', Typeswiper.value, currentRow.stcd, currentRow.stnm, currentRow.stnm);
        } else if (Typeswiper.value == "district") {
            emit('passValue', Typeswiper.value, currentRow.stcd, currentRow.stnm);
        }
    }
    lastClickedRow.value = currentRow;       
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
    loadGCTJ();
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
}

:deep(.liSelected td span) {
    color: var(--sel_wraplabelcolorSel) !important;
}
</style>