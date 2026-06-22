<template>
  <div class="m-box m-box-3" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
      style="height:0px;border-bottom:0px;">
    </div>
    <div class="txt">
        <div class="wqtitle title layout_title px-2  leftTop-radius" style="background: none;margin-top:0px;">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" style="vertical-align: 4px;">巡检分析</p>
          </div>
          <div style="width: 100%; height: calc(100% - 40px);" class="two-list" id="SSXQList">
            <div class="topClass">
                <span style="margin-left: 20px">开始时间：</span>
                <input id="STIME" class="mini-datepicker" style="width:100px;" format="yyyy-MM-dd"
                    showTime="true" showOkButton="true" showClearButton="false" />
                <span style="margin-left: 20px">结束时间：</span>
                <input id="ETIME" class="mini-datepicker" style="width:100px;" format="yyyy-MM-dd"
                    showTime="true" showOkButton="true" showClearButton="false" />
              
                <el-button type="primary" @click="BtnSearch()" style="margin-left:10px;">查询</el-button>
            </div>
            <div style="width: 100%; height: calc(100% - 40px);">
                <el-table :data="tableData" style="width: 96%;height:98%;--el-table-border-color:none;margin:auto;">
                    <el-table-column  width="30px">
                        <template #default="scope">
                                <el-radio  v-model="selectedId" 
                                :label="scope.row.id"
                                @change="handleRadioChange(scope.row)"
                                @click.native.stop>
                                </el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" prop="num" width="60px;" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="任务名称" prop="name" width="180px" align="center">
                    </el-table-column>
                    <el-table-column label="开始时间" prop="stime" width="120px" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column  width="30px">
                        <template #default="scope">
                                <el-icon size="22px" style="position: absolute;right: 10px;top: 13px;cursor:pointer;" @click="OnBoot(scope.row)">
                                    <Postcard />
                                </el-icon>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
          </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script setup>
import Table from "@/components/Table/Table.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import { Postcard } from "@element-plus/icons-vue";
// ElConfigProvider：时间选择框汉化
import { 
  ElDatePicker, ElRadio, ElButton, ElConfigProvider, ElCascader, ElMessage,
  ElTable,
  ElSelect,
  ElOption,
  ElTableColumn } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, provide, inject } from "vue";

import xunjianData from "@/assets/json/xunjian.json";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const stime = ref("");
const etime = ref("");const tableHeaders = ref([
    { name: "num", label: "序号" ,width:"50px"},
    { name: "name", label: "任务内容",width:"200px" },
    // { name: "xunjianower", label: "巡检人" },
    { name: "stime", label: "开始时间",width:"100px" }
]);
const tableData = ref();
const selectedId=ref("");
onMounted(() => {
    mini.parse();
    stime.value = "2024-08-06 08:00:00";
    etime.value = "2024-08-08 08:00:00";
    mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:00"));
    mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:00"));
    Weacontent();
});
function Weacontent() {
    var data=xunjianData.data;
    var strJson=[];
    var _index=1;
    data.forEach(element => {
        var item=element;
        var maintainerList=item.maintainerList;
        var xunjianower="";
        maintainerList.map(e=>{
            xunjianower+=e.name+",";
        });
        var startTime=dayjs(item.startTime).format("YYYY-MM-DD HH:00");
        item.num=_index;
        item.xunjianower=xunjianower;
        item.stime=startTime;
        strJson.push(item);
        _index++;
    });
    selectedId.value=strJson[0].id;
    emit("parentMethods", selectedId.value);
    tableData.value=strJson;
}
const emit = defineEmits(['parentMethods','opencurrentComponentTanchu']);
function handleRadioChange(row) {
    selectedId.value=row.id;
    emit("parentMethods", selectedId.value);
}
function OnBoot(row) {
  emit("opencurrentComponentTanchu",row);
}
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
.topClass {
    height: 45px;
    line-height: 40px;
    color: var(--widgetcolor);
}

:deep(.el-select__wrapper) {
  /* background-color: var(--el-inputbg);
  box-shadow: 0 0 0 1.5px var(--el-inputbox-shadow); */

  background-color: #d5141400;
  box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
  ;
}

:deep(.el-select__placeholder) {
  /* color: var(--titlemenu) */
  color: var(--widgetcolor);
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


:deep(.is-leaf .el-checkbox) {
  display: none;
}

</style>