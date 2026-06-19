<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">调度方案库</p>
        </div>
        <div class="txt" style="overflow-y: auto">
            <el-table :data="tableData" style="width: 100%;height:calc(100%);" ref="tableRef"
                @selection-change="handleSelectionChange" @row-click="handleclick" :row-class-name="getRowClassName">
                <el-table-column type="selection" width="20px" :indeterminate="true"></el-table-column>
                <el-table-column label="名称" prop="name" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="上海市雨量(mm)" prop="avgDrp" align="center" :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
            <!-- <div class="title-bottom2">
                推荐方案：方案1
            </div> -->
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" style="width: 70%; height: 700px">
        <DDTable :DDData="props.DDData" />
    </ComZujian>
</template>
  
<script setup>
import MyDialog from "@/components/ComDialog.vue";
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/mode/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import { ElButton, ElMessage, ElTable, ElTableColumn } from "element-plus";
import { onMounted, ref, shallowRef, defineAsyncComponent, nextTick, provide, inject, watch } from "vue";
import { getDateDiff, convertToDate } from "@/api/dateUtil";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const tableHeaders = ref([
    { name: "", label: "" },
    { name: "name", label: "名称" },
    { name: "DATA", label: "昆山水位(m)" },
    { name: "avgDrp", label: "昆山市雨量(mm)" },
]);
const emit = defineEmits(['DDValue']);
const tableRef = ref(null); // 用于获取表格实例
const showDialog = ref(false);
const titleName = ref("防汛风险点短信通知");
const emergencyList = ref([]);
const baseDataNew = ref([]);
var tuijianFang = "TH";//推荐方案标准
const props = defineProps({
    DDData: {
        type: Array,
        default: []
    },
});
var strJson = props.DDData;
const tableData = ref([]);
watch(props.DDData, () => {
    Weacontent();
});

onMounted(() => {
    if (props.DDData != null) {
        Weacontent();
    }
});
function Weacontent() {
    var result = [];
    strJson = props.DDData;
    if (strJson.length > 0) {
        var DD_IDS = "";
        var DD_NAMES = "";
        var dataFA = strJson;
        var data = { data: dataFA };
        var THSWMax = 1000;
        var tItem = data.data[0];
        // console.error("tItemtItem", tItem)

        tItem.name = "方案1";
        for (var num = 0; num < data.data.length; num++) {
            var cls = "";
            var name = '方案' + (num + 1);
            var DD_ID = data.data[num].DD_ID;
            if (tuijianFang == "TH") {
                if (data.data[num].THSWMAX != undefined) {
                    if (THSWMax > data.data[num].THSWMAX) {
                        THSWMax = data.data[num].THSWMAX;
                        tItem = data.data[num];
                        tItem.name = name;
                    }
                }
            }
            if (tuijianFang == "CJ") {
                if (data.data[num].CJCOUNT != undefined && data.data[num].CJCOUNT > 0) {
                    if (THSWMax > data.data[num].CJCOUNT) {
                        THSWMax = data.data[num].CJCOUNT;
                        tItem = data.data[num];
                        tItem.name = name;
                    }
                }
            }
            if (num == 0) {
                cls = "trSelect";
            }
            DD_IDS += data.data[num].DD_ID + ",";
            DD_NAMES += name + ",";

            var DATA = "-";
            if (data.data[num].listBDMS != undefined) {
                var listBDMS = data.data[num].listBDMS.filter(function (e) {
                    return e.STCD == "63205150";//降雨
                });
                if (listBDMS.length > 0) {
                    DATA = listBDMS[0].DATA;
                }
            }
            if (data.data[num].listTZ != undefined) {
                var avgDrp = 0;
                var listTZ = data.data[num].listTZ.filter(function (e) {
                    return e.PTYPE == "0";//降雨
                });
                if (listTZ.length > 0) {
                    listTZ = listTZ.filter(function (res) {
                        return res.ZHANID == '1744830472';
                    });
                    avgDrp = listTZ.length > 0 ? Number(listTZ[0].DATA).toFixed(1) : 0;
                }
            }
            result.push({
                name: name,
                DATA: DATA,
                avgDrp: avgDrp,
                DD_ID: DD_ID,
                DD_NAME: name,
                STIME: dayjs(convertToDate(data.data[num].DD_TM)).format("YYYY-MM-DD HH:mm:ss"),
                ETIME: dayjs(convertToDate(data.data[num].DD_CHECKBY)).format("YYYY-MM-DD HH:mm:ss"),
                gcTime: dayjs(convertToDate(data.data[num].DD_TM)).format("YYYY-MM-DD HH:mm:ss"),
            })
            tableData.value = result;
            selectAllRows(); // 数据加载完成后调用勾选函数
        }
    }

}
const selectedRow = ref(null);
const currentRowIndex = ref(-1); // 存储当前点击的行索引
const selectData = ref([]);
// 修改点击事件处理函数
function handleclick(row, event, column) {
    selectedRow.value = row; // 记录被点击的行
    currentRowIndex.value = tableData.value.indexOf(row); // 更新当前点击的行索引

    // console.error("selectDataselectDataselectDataselectData", selectData.value, selectedRow.value)
    emit('DDValue', selectData.value, selectedRow.value);
}
const getRowClassName = ({ row, rowIndex }) => {
    if (rowIndex === currentRowIndex.value) {
        return 'clicked-row'; // 返回类名，用于改变背景色
    }
    return ''; // 如果没有被选中，返回空字符串或null
};
// 定义默认勾选所有行的函数
const selectAllRows = () => {
    nextTick(() => {
        if (tableRef.value && tableData.value.length > 0) {
            tableData.value.forEach((row,_index) => {
                if(_index<3){
                 tableRef.value.toggleRowSelection(row, true);
                }
            });
        }
        nextTick(() => {
            // 默认选中第一行
            if (tableData.value.length > 0) {
                const firstRow = tableData.value[0];
                handleclick(firstRow);
            }
        });
    });
};

function handleSelectionChange(val) {
    selectData.value = val;
    if (val != null && selectedRow.value != null) {
        // console.error("valvalvalval", val, selectedRow.value)
        emit('DDValue', val, selectedRow.value);
    }
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    nextTick(() => {
        showDialog.value = true;
    });
}
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
.title-bottom2 {
    font-size: 18px;
    text-align: center;
    width: 200px;
    margin: 10px auto 0px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #5ee9ff;
    box-shadow: 0 0 10px #5ee9ff, inset 0 0 10px #5ee9ff;
    border-radius: 20px;
    color: var(--mtablecolor);
}

:deep(.el-button--primary span) {
    padding-left: 0px;
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
    color: var(--popupContentTitleColor);
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
    background: none;
}

:deep(.el-table .cell) {
    padding: 0 8px;
    white-space: nowrap;
    cursor: pointer;
}

:deep(.clicked-row) {
    color: var(--sel_wraplabelcolorSel) !important;
    background: var(--swDivSelectcolor) !important;
}

:deep(.el-table .clicked-row:not(.el-table--border) .el-table__cell) {
    color: var(--sel_wraplabelcolorSel) !important;
}
</style>