<template>
    <div class="m-box m-box-1" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">雨情分析</p>
            <span class="spanTitle"  style='font-size: 0.875rem;font-family: arial, "Hiragino Sans GB";'>(站数：{{tableData.length}}个)</span>            
            <el-input v-model="searchKey" placeholder="请输入搜索站点" clearable @input="handleSearch"></el-input>
        </div>
        <div class="txt" style="overflow-y: auto">
            <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table FirstTable" :border="0"
                :cellspacing="0" :cellpadding="0" @click="handleclick" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableYQJC :strJsonData="props.strJsonData"/>
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, defineAsyncComponent, h,defineProps } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";
import Dialog from "@/api/utils/Dialog.js";

const datekey = ref(null);
const tableHeaders = ref([
    { name: "sortnum", label: "序号",width:"10%" },
    { name: "stnm", label: "站名",width:"35%" },
    { name: "drp", label: "雨量(mm)" },
    { name: "addvnm", label: "分区" },
]);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const props = defineProps({
  strJsonData: {
    type: String,
    default: ""
  },
  stime: {
    type: String,
    default: ""
  },
  etime: {
    type: String,
    default: ""
  }
});
function Weacontent() {
        var strJson = props.strJsonData;
        if(props.strJsonData==undefined||strJson.length==undefined){
            return;
        }
        strJson=strJson.sort((a, b) => {
            // 1. 获取字段值，兼容 null/undefined
            const aVal = a?.drp;
            const bVal = b?.drp;

            // 2. 空值处理：空值始终排到最后
            if ((aVal == null || aVal === "") && (bVal != null && bVal !== "")) return 1;
            if ((aVal != null && aVal !== "") && (bVal == null || bVal === "")) return -1;
            if ((aVal == null || aVal === "") && (bVal == null || bVal === "")) return 0;

            // 3. 【核心修复】强制转换为数字类型，并使用 b - a 实现降序（最大值在前）
            const aNum = Number(aVal);
            const bNum = Number(bVal);

            // 防止转换后出现 NaN，如果转换失败则按 0 处理
            const safeANum = isNaN(aNum) ? 0 : aNum;
            const safeBNum = isNaN(bNum) ? 0 : bNum;

            // b - a 为降序排列（大数在前）
            return safeBNum - safeANum;
        });
        var result = [];
        for (var num = 0; num < strJson.length; num++) {
            var item = strJson[num];
            var _strParam = {};
            _strParam["stnm"] = SetNull(item["stnm"]).replaceAll(" ", "");
            _strParam["drp"] =SetNull(item["drp"])==""?"-":item.drp.toFixed(1);
            _strParam["tm"] = item.tm;
            _strParam["stcd"] = item.stcd;
            _strParam["lgtd"] = Number(item.lgtd);
            _strParam["lttd"] = Number(item.lttd);
            _strParam["addvnm"] = item.addvnm;
            _strParam["sortnum"] =num+1;
            result.push(_strParam);
            
        }
        tableData.value = result;
    // }).catch((err) => { });
}
const searchKey = ref('')
function handleSearch(evt) {
  searchKey.value = evt;
  tableData.value = props.strJsonData.filter(function (e) {
    return (e.stnm).includes(evt) == true;
  })
}
const emit = defineEmits(['parentMethodshowDynamicLayers']);
function handleclick(evt) {
    const targetId = evt.target.id;
    var name = evt.target.innerText;
    if(targetId=="drp"){
        const parentDom = evt.target.parentNode; 
        const prevSibling = parentDom.previousElementSibling; 
         // 查找 prevSibling 下的第一个 span 元素
        const spanElement = prevSibling.querySelector('span');
        if (spanElement) {
            // 获取文本内容
            name = spanElement.textContent;
        }
    }
    
    const strJson = tableData.value.find(item => item.stnm === name);
    if(strJson==undefined){
        return;
    }
    if (SetNull(strJson["lgtd"]) == "" && SetNull(strJson["lttd"]) == "") {
        ElMessage.error("缺少经纬度坐标");
    }
    else {
        let _lgtd = Number(strJson["lgtd"]);
        let _lttd = Number(strJson["lttd"]);
        var evt=[_lgtd,_lttd];
        emit("parentMethodshowDynamicLayers", evt);
        
    }
    //雨量弹开过程
    if(targetId=="drp"){
        const ChildVue = defineAsyncComponent(() =>
        import("@/components/danzhan/sq/DanZHanSel.vue")
        );
        const strWhere = {};
        strWhere["stcd"] = strJson["stcd"];
        strWhere["stime"] = props.stime;
        strWhere["etime"] = props.etime;
        strWhere["mtype"] = strJson["mtype"];
        strWhere["type"] = "降雨过程";
        //ChildVue为弹窗中嵌入的slot
        Dialog.open({ title: strJson["stnm"] , widh: 1500, heig: 700 }, h(ChildVue, strWhere)).then(() => { console.log('弹窗关闭了') })
    }
    
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index":  90});
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

:deep(.el-input) {
  --el-input-border-color: var(--popContentHeadbg) !important;
  width: 160px;
  border-radius: 6px;
  margin-left: 10px;
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
