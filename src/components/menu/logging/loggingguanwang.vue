<template>
  <el-table :data="guanwangdata" style="width: 100%;--el-table-border-color:none;" height="750" @row-click="handleclick">
    <el-table-column fixed type="index" label="序号" width="60" header-align="center" align="center" />
    <el-table-column fixed label="名称" prop="name" width="200" header-align="center" align="center">
      <template #header>
        名称
        <!-- <el-input v-model="search" size="small" placeholder="请输入关键字" @blur="searchblurevt"/> -->
      </template>
      <template #default="scope">
        <span v-show="!scope.row.isEdit">{{ scope.row.stnm }}</span>
      </template>
    </el-table-column>

    <el-table-column label="相对液位" header-align="center" align="center">
      <template #default="scope">
        <span>{{ scope.row.relative_WL }}</span>
      </template>
    </el-table-column>

    <el-table-column label="水深" header-align="center" align="center">
      <template #default="scope">
        <span>{{ scope.row.dept }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import $ from "jquery";

import api from "@/api/zonglan/index.js";
import { SetNull } from "@/api/ComUnit";
import { ElMessage , ElTable, ElTableColumn  } from "element-plus";

const guanwangdata = ref([]);
onMounted(() => {
  Weacontent();
});
function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD 00:00:00"))
    .add(-6, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
  strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  strParam["pid"] = "2024111900003";

  api
    .att_shaftdatanewqueryList(strParam)
    .then(res => {
      guanwangdata.value = res.result;
    })
    .catch(err => { });
}

function handleclick(evt) {
  if (SetNull(evt["lgtd"]) == "" || SetNull(evt["lttd"]) == "") {
    ElMessage.error("缺少经纬度坐标");
  }
  else {
    let _lgtd = Number(evt["lgtd"]);
    let _lttd = Number(evt["lttd"]);
  }

}
</script>