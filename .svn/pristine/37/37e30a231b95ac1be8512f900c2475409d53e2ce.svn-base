<template>
  <div class="m-box" style="position: relative">

    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">污水井信息</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <!-- <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table" :border="0" :cellspacing="0"
        :cellpadding="0" @click="handleclick" /> -->
      <el-table :data="tableData" @row-click="handleclick"
        style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;">
        <el-table-column label="名称" prop="rtuname" style="width:40%" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="黄海液位" prop="altitudewater" style="width:20%" align="center">
        </el-table-column>
        <el-table-column label="相对水位" prop="waterlevel" style="width:20%" align="center">
        </el-table-column>
        <el-table-column label="时间" prop="tm" style="width:20%" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="bot"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableWSJ />
  </ComZujian>
</template>
<script setup>
import { useStore } from "vuex";
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElTable, ElTableColumn } from "element-plus";
import { SetNull, sortObjectArray, groupBy } from "@/api/ComUnit.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const showDialog = ref(false);
const store = useStore();
const { viewer } = store.state;
const tableData = ref();

function Weacontent() {
  var strParam = {};
  var nowTM = new Date();
  var etime = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  var stime = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  if (Number(dayjs(nowTM).format("HH")) > 7) {
    stime = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  }
  else {
    stime = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00")).add(-24, "hour").format("YYYY-MM-DD HH:mm:ss");
  }
  strParam["stime"] = stime;
  strParam["etime"] = etime;
  strParam["pid"] = "2025041423455185015";
  api.WS_3HSCADASlectList(strParam).then(res => {
    var strJson = res.result;
    var result = [];
    for (var num = 0; num < strJson.length; num++) {
      const resultList = groupBy(sortObjectArray(res.result, ["datetime"], "desc"), "rtuname");
      var result = [];
      if (res.result.length > 0) {
        for (var num = 0; num < res.result.length; num++) {
          var item = res.result[num];
          result.push(item);
        }
      }

      var strJson = [];
      if (resultList.length > 0) {
        for (var num = 0; num < resultList.length; num++) {
          var item = resultList[num][0];
          item["stcd"] = num + 1;
          if (SetNull(item["datetime"]) != "") {
            item["tm"] = dayjs(item["datetime"]).format("MM-DD HH:mm");
          } else {
            item["tm"] = "-";
          }
          if (SetNull(item["altitudewater"]) != "") {
            item["altitudewater"] = Number(item["altitudewater"]).toFixed(2);
          } else {
            item["altitudewater"] = "-";
          }
          if (SetNull(item["waterlevel"]) != "") {
            item["waterlevel"] = Number(item["waterlevel"]).toFixed(2);
          } else {
            item["waterlevel"] = "-";
          }
          strJson.push(item);
        }
      }
      // console.error("strJson", strJson)
      tableData.value = sortObjectArray(strJson, ["tm"], "desc");

    }
  }).catch(err => { });
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
function handleclick(evt) {
  // const _rowindex = evt.target.className;
  // const strJson = tableData.value[_rowindex];
  let _lgtd = SetNull(evt["lgtd"]);
  let _lttd = SetNull(evt["lttd"]);
  if (_lgtd == "" || _lttd == "") {
    ElMessage.error("缺少经纬度坐标");
  } else {
  }
}
onMounted(() => {
  Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
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
</style>
