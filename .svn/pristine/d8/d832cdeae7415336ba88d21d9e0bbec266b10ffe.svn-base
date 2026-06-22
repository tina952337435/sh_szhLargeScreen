<template>
    <div class="m-box m-box-3" style="position: relative">

        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" @click="fangda()">排涝车辆信息</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <div style="color: var(--mtablecolor);margin: 10px 0px 0px 0px;">
                <span style="margin-left: 20px">时间：</span>
                <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
                    showTime="true" showOkButton="true" showClearButton="false" />
                &nbsp;-&nbsp;
                <input id="ETIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
                    showTime="true" showOkButton="true" showClearButton="false" />
                <el-button type="primary" style="margin-left: 10px" @click="BtnSearch()">
                    查询
                </el-button>
            </div>
            <el-table ref="myTable" :data="tableData"
                style="width: 96%;height:75%;--el-table-border-color:none;margin:auto;" @selection-change="doSelectChange"
                @row-click="doRowClick" row-key="stcd">
                <!-- <el-table-column style="width:20px !important;">
                    <template slot-scope="scope">
                        <input class="cur" style="" type="checkbox" name="inputCar" :id="scope.row.stcd" />
                    </template>
                </el-table-column> -->
                <el-table-column type="selection" width="20px" :indeterminate="true"></el-table-column>
                <el-table-column label="序号" type="index" style="width:6%" align="center">
                </el-table-column>
                <el-table-column label="车辆号" prop="stnm" style="width:40%" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="排涝动力" prop="remark" style="width:15%" align="center">
                </el-table-column>
                <el-table-column label="时间" prop="tm" style="width:20%" align="center" :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
            <!-- <div>
                <el-button type="primary" style="margin-left: 10px" @click="increaseSpeed()">
                    增加速度
                </el-button>
            </div> -->
        </div>
        <div class="bot"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableCar />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/Table.css';
import { useStore } from "vuex";
import ComZujian from "@/components/ComZujian.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, onUnmounted } from "vue";
import { ElMessage , ElTable, ElTableColumn  } from "element-plus";
import { groupBy, jsonToList, SetNull } from "@/api/ComUnit.js";
import { number } from "echarts";

const myTable = ref()

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const showDialog = ref(false);
const store = useStore();
const { viewer } = store.state;

const tableData = ref([]);
const stime = ref('2024-11-13 00:00:00');
const etime = ref('2024-11-13 23:59:59');
const emit = defineEmits(["stime", "etime", "updateValue"]);
var lines = reactive([]);
const strJsonData = ref([]);
const dataPointList = ref([]);
var AirGlbResult = [];


var dataPoint = reactive([]);
const modelEntity = ref(null);
const propertyNew = ref(null), flightEntity = ref(null);

function BtnSearch() {
    if (etime.value < stime.value) {
        ElMessage.error("结束时间不得小于开始时间");
    } else {
        stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
        etime.value = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
        Weacontent();
        emit('stime', stime);
        emit('etime', etime);
    }
}
function Weacontent() {
    var strParam = {};
    strParam["pid"] = "2024111900001";
    strParam["stime"] = stime.value;
    strParam["etime"] = etime.value;
    api.CarQuerytreeList(strParam).then((res) => {
        const resultList = res.result;
        if (resultList.length > 0) {
            for (var num = 0; num < resultList.length; num++) {
                if (SetNull(resultList[num]["time"]) != "") {
                    resultList[num]["tm"] = dayjs(resultList[num]["time"]).format("MM-DD HH:mm")
                }
                else {
                    resultList[num]["tm"] = "—";
                }
            }
        }
        tableData.value = resultList;

        emit('updateValue', tableData.value)
    });
}
var rowList = [];
var carCount = 0;

function doSelectChange(evt) {

    var InputList = evt
    if (SetNull(evt) != "") {

    }
    if (rowList.length > 0) {

        for (var numII = 0; numII < rowList.length; numII++) {
            var itemList = rowList[numII];
            var oneList = InputList.filter(function (res) {
                return res["id"] === itemList["id"];
            })
            if (oneList.length === 0) {
                //移除取消值
                // console.log("itemList移除",itemList)
                var oneAirGlbResult = AirGlbResult.filter(function (evt) {
                    return evt["ID"] == itemList["stcd"];
                });
                if (oneAirGlbResult.length > 0) {
                    oneAirGlbResult[0]["text"].destroy();
                }
            }
        }
    }
    if (InputList.length > 0) {
        if (rowList.length == 0) {

        }
        for (var numII = 0; numII < InputList.length; numII++) {
            var itemList = InputList[numII];
            var oneList = rowList.filter(function (res) {
                return res["id"] === itemList["id"];
            })
            if (oneList.length == 0) {
                // console.log("itemList新增",oneList,itemList)
                var strParam = {};
                strParam["stcd"] = itemList["stcd"];
                strParam["stime"] = stime.value;
                strParam["etime"] = etime.value;
            }
        }
    }
    rowList = InputList;
    if (rowList.length > 0) {
    } else {
        carCount = 0;
        emit('updateValue', tableData.value)
    }

}

function getguiji(stcd, stnm, color) {
 
}

//添加圈画线
function getPolyline(lines, color, dataPoint) {//#9305B6

}

function changeCameraHeading(dataPoint, stnm, color) {
}

const increaseSpeed = () => {
};

const decreaseSpeed = () => {
};
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialog.value = true;
}
onUnmounted(() => {
    if (AirGlbResult.length > 0) {
        for (var num = 0; num < AirGlbResult.length; num++) {
            var oneAirGlbResult = AirGlbResult[num];
            oneAirGlbResult["text"].destroy();
        }
    }

})
onMounted(() => {
    mini.parse();
    var now = new Date();
    var startTime = dayjs(now).add(-90, "day").format("YYYY-MM-DD 00:00:00");
    var endTime = dayjs(now).format("YYYY-MM-DD 23:59:59");

    mini.get("STIME").setValue(dayjs(startTime).format("YYYY-MM-DD HH:00"));
    mini.get("ETIME").setValue(dayjs(endTime).format("YYYY-MM-DD HH:00"));
    stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
    etime.value = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
    Weacontent();
    emit('stime', stime);
    emit('etime', etime);
});
//这里需要暴露出去不然父组件调用不到这个方法
defineExpose({ dataPointList })
</script> 
<style scoped>
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

:deep(.el-table .cell) {
    padding: 0 8px;
    white-space: nowrap;
    cursor: pointer;
}

.el-checkbox.el-checkbox--large {
    color: var(--widgetcolor);
    min-width: 30px;
    padding: 0px;
    margin: 0px;
}


:deep(.el-radio) {
    margin-right: 20px;
    --el-radio-input-bg-color: #d5141400;
}

:deep(.el-radio__label) {
    color: var(--widgetcolor);
}

:deep(.el-date-editor.el-input),
:deep(.el-date-editor.el-input__wrapper) {
    width: 118px;
}

:deep(.el-input__prefix-inner) {
    margin-left: -9px;
}

:deep(.el-input__suffix) {
    margin-right: -9px;
}

:deep(.el-input__wrapper) {
    background-color: #d5141400;
    box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
}

:deep(.el-input__inner) {
    color: var(--widgetcolor);
}

:deep(.el-button) {
    background-color: var(--popContentHeadbg);
    border-color: var(--popContentHeadbg);
    color: #fff;
}
</style>
  