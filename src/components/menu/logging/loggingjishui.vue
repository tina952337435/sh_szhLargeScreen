<template>
  <el-table :data="jishuidiandata" style="width: 100%;--el-table-border-color:none;" height="750"
    @row-click="handleclick">
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

    <el-table-column label="行政区划" header-align="center" align="center">
      <template #default="scope">
        <span>{{ scope.row.district }}</span>
      </template>
    </el-table-column>

    <el-table-column label="类型" header-align="center" align="center">
      <template #default="scope">
        <span>{{ scope.row.type }}</span>
      </template>
    </el-table-column>

    <el-table-column label="排水分类" header-align="center" align="center">
      <template #default="scope">
        <span>{{ scope.row.type2 }}</span>
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



const jishuidiandata = ref(jishuidianjson.data);
onMounted(() => {
  Weacontent();
});
function Weacontent() {
}

function handleclick(evt) {
  if (SetNull(evt["lgtd"]) == "" || SetNull(evt["latd"]) == "") {
    ElMessage.error("缺少经纬度坐标");
  }
  else {
    let _lgtd = Number(evt["lgtd"]);
    let _lttd = Number(evt["latd"]);
  }

}
</script>