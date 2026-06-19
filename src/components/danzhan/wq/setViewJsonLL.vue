<template>
  <div class="tableDiv" style="height:550px;width:100%;">
    <el-table class="m-table" style="height:100%;width:100%;--el-table-border-color:none;" :data="tableData"
      ref="tableList" @cell-click="onTableChange">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column label="时间" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.tm }}</span>
          <!-- <el-input
              v-show="scope.row.isEdit"
              v-model="scope.row.tm"
          />-->
        </template>
      </el-table-column>
      <el-table-column label="流量" header-align="center" align="center">
        <template #header>
          流量
          <el-input v-model="search" size="small" placeholder="请输入流量" @blur="searchblurevt" />
        </template>
        <template #default="scope">
          <span v-show="!scope.row.isEdit">{{ scope.row.tgtq }}</span>
          <el-input v-show="scope.row.isEdit" v-model="scope.row.tgtq" placeholder="请输入流量" />
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div style="width:100%;text-align:center;padding-top:10px;">
    <!-- <button type="button" class="el-button"
      style="background: var(--buttonsearchbg); border: var(--buttonsearchbordercolor); color: #fff"
      @click="getTableData">确定</button> -->
      
    <el-button @click="getTableData">确定</el-button>
  </div>
</template>

<script setup>
import $ from "jquery";
import {
  ref,
  onMounted,
  getCurrentInstance, 
  inject
} from "vue";
import { ElInput, ElTable, ElTableColumn } from "element-plus";
import {
  ElDatePicker,
  ElRadio,
  ElButton,
  ElSelect,
  ElConfigProvider
} from "element-plus";

const props = defineProps({
  tableData: {
    type: Array,
    default: []
  }
});
//const tableData =ref(props.tableData);
var tabWQname = inject("tabWQname");
const tableData = ref(tabWQname.value);

const search = ref("");

const Drpswiper = ref("YLPL");

function onTableChange(row, column, cell, event) {
  row.isEdit = true;
}

const { proxy } = getCurrentInstance();
const emit = defineEmits(['childClick', 'parentMethods']);
function getTableData() {
  const table = proxy.$refs.tableList;
  const data = table.data;
  //获取表格的值传给父页面
  //getCurrentInstance().appContext.config.globalProperties.childClick(data);
  localStorage.setItem('tableList', data);

  emit("childClick", data);
  emit("parentMethods", data);

  //关闭窗体
  closeDialog();

}
function closeDialog() {
  $(".popModel:last-child").hide();
}

function searchblurevt(e) {
  GetDrpTen(Drpswiper.value);
}

function GetDrpTen(obj) {
  Drpswiper.value = obj;
  var value = search.value;
  const table = proxy.$refs.tableList;
  const data = table.data;
  if (obj == "YLPL") {
    //批量输入
    for (var num = 0; num < data.length; num++) {
      data[num].drp = value;
    }
  } else if (obj == "YLPL20") {
    search.value = 202.6;
    var tempbili = 1;
    var tempResult = [];
    tempResult.push({ dayhour: 1, drp: 0.5 });
    tempResult.push({ dayhour: 2, drp: 0.0 });
    tempResult.push({ dayhour: 3, drp: 0.0 });
    tempResult.push({ dayhour: 4, drp: 0.0 });
    tempResult.push({ dayhour: 5, drp: 1.0 });
    tempResult.push({ dayhour: 6, drp: 0.0 });
    tempResult.push({ dayhour: 7, drp: 0.0 });
    tempResult.push({ dayhour: 8, drp: 0.0 });
    tempResult.push({ dayhour: 9, drp: 4.0 });
    tempResult.push({ dayhour: 10, drp: 27.5 });
    tempResult.push({ dayhour: 11, drp: 27.5 });
    tempResult.push({ dayhour: 12, drp: 6.5 });
    tempResult.push({ dayhour: 13, drp: 5.0 });
    tempResult.push({ dayhour: 14, drp: 5.0 });
    tempResult.push({ dayhour: 15, drp: 10 });
    tempResult.push({ dayhour: 16, drp: 10.2 });
    tempResult.push({ dayhour: 17, drp: 1.1 });
    tempResult.push({ dayhour: 18, drp: 10.8 });
    tempResult.push({ dayhour: 19, drp: 7.6 });
    tempResult.push({ dayhour: 20, drp: 77.7 });
    tempResult.push({ dayhour: 21, drp: 0.8 });
    tempResult.push({ dayhour: 22, drp: 1.5 });
    tempResult.push({ dayhour: 23, drp: 1.5 });
    tempResult.push({ dayhour: 24, drp: 1.5 });
    var tempSUMDRP = 202.6;
    if (data.length > 0) {
      var val = search.value / (data.length / 24);
      for (num = 0; num < data.length; num++) {
        var itemDrp = tempResult.filter(function (evt) {
          return evt["dayhour"] == (num % 24) + 1;
        });
        if (itemDrp.length > 0) {
          var drp = Number(
            ((val * itemDrp[0]["drp"]) / tempSUMDRP) * tempbili
          ).toFixed(2);
          data[num]["drp"] = drp;
        }
      }
    }
  } else if (obj == "YLPJ") {
    //平均分配
    var value_h = Number((value / data.length).toFixed(1));
    if (value > 0 && value_h < 0.1) {
      value_h = 0.1;
    }
    for (var num = 0; num < data.length; num++) {
      var value_d = value - value_h * num;
      var value_z = num < data.length - 1 ? value_h : value_d;
      var mValue = value_d <= 0 ? 0 : value_d < value_z ? value_d : value_z;
      data[num].drp = mValue.toFixed(1);
    }
  }
  tableData.value = data;
}

function handleAdd() {
  tableData.value.push({
    date: "",
    name: "",
    age: "",
    sex: null,
    isEdit: true
  });
}
function handleEdit(row) {
  row.isEdit = true;
}
function handleDelete(index) {
  tableData.value.splice(index, 1);
}
function handleSave(row) {
  row.isEdit = false;
}
</script>
<style src="@/assets/styles/style.css"></style>
<style src="@/assets/styles/Table.css"></style>

<style scoped>
:deep(.el-table) {
  background-color: var(--el-table-bg-colornew);
  border-bottom: 0px;
}

:deep(.el-table th.el-table__cell) {
  background-color: var(--el-table-tr-bg-colornew);
}

:deep(.el-table tr) {
  background-color: var(--el-table-tr-bg-colornew);
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  border-bottom: 0px;
}

:deep(.el-table td.el-table__cell) {
  border-bottom: 0px;
}

:deep(.el-table th.el-table__cell.is-leaf) {
  border-bottom: 0px;
  font-size: 1rem;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background: none;
}

:deep(.el-table tr:nth-child(even)) {
  background: var(--mtabletrcolorgc);
}

:deep(.el-input__wrapper) {
  background-color: var(--el-inputbg);
  box-shadow: 0 0 0 0 rgba(0, 163, 255, 0.6) !important;
  border: 1px solid var(--el-inputbox-shadow);
}

:deep(.el-input__inner) {
  color: var(--el-inputbox-shadow) !important;
}

:deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}
</style>