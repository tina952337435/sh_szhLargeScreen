<template>
  <div style="width:200px;margin:0px;" class="div-swiper" v-if="yuliangguochengdiv">
    <div class="swiper-slide" style="width: 50%;" :class="Drpswiper == 'YLPL' && 'swiper-slide swiper-slide-thumb-active'"
      @click="GetDrpTen('YLPL')">批量输入</div>
    <div class="swiper-slide" style="width: 50%;"
      :class="Drpswiper == 'YLPL20' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YLPL20')">20年一遇</div>
  </div>
  <div style="width:200px;margin:0px;" class="div-swiper" v-if="yuliangguochengdiv==false">
    <div class="swiper-slide" style="width: 50%;" :class="Drpswiper == 'ZNDD' && 'swiper-slide swiper-slide-thumb-active'"
      @click="GetDrpTen('ZNDD')">智能调度</div> 
      <div style="color:#FFFFFF; position: absolute;
    top: 73px;font-size: 18px;
    right: 0%;">
        {{gongshiwenzi}}
      </div>
  </div>
  <div class="tableDiv" style="height:520px;width:100%;">
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
      <el-table-column label="{{tableField}}" header-align="center" align="center">
        <template #header>
          {{ tableField }}
          <el-input v-model="search" size="small" placeholder="请输入数值" @blur="searchblurevt" />
        </template>
        <template #default="scope">
          <span v-show="!scope.row.isEdit">{{ scope.row.drp }}</span>
          <el-input v-show="scope.row.isEdit" v-model="scope.row.drp" placeholder="请输入数值" />
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div style="width:100%;text-align:center;padding-top:10px;">
    <!-- <button
      type="button"
      class="el-button"
      style="background: var(--buttonsearchbg); border: var(--buttonsearchbordercolor); color: #fff"
      @click="getTableData"
    >确定</button> -->
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
import {  SetNull, sortObjectArray, groupBy } from "@/api/ComUnit.js";
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
  },
  tableDataLL: {
    type: Array,
    default: []
  }
}); 
const tableData = ref([]);
const tableDRPData = ref([]);
var tabWQname = inject("tabWQnameArr");
var drpData = inject("propsdrplist");

var yuliangguochengdiv = ref(false);
var tabWQnameType = inject("tabWQnameType");
var tableField = ref("流量");
const gongshiwenzi=ref("");

onMounted(()=>{

  setTimeout(() => {
      tableData.value = tabWQname.value;
      console.error("tableDRPDatatableDRPData",tableData, drpData);
console.error("@@@@@@@@",tableData.value)
      if(SetNull(drpData)!=""){
        if (tabWQnameType.value == "调度流量") { 
          var tempResult = [];
          for (var num = 0; num < drpData.value.tableData.length; num++) {
            var mItem=drpData.value.tableData[num];
            var strWhere={};
            strWhere["tm"]=mItem["tm"];
            var llItem=drpData.value.tableDataLL[num];
            strWhere["drp"]='0';
            console.error("!!!!@@@@@####",strWhere["tm"],llItem)
            if(SetNull(llItem)!=""){
              strWhere["drp"]=llItem["drp"];
            }
            tempResult.push(strWhere);
          }
          console.error("tempResult",tempResult)
          tableDRPData.value=tempResult;
        }
        else{
          tableDRPData.value=drpData.value;
        }
        
      }

      
      if (tabWQnameType.value == "预报降雨") {
        yuliangguochengdiv.value = true;
        tableField.value = "雨量";
      }
      else if (tabWQnameType.value == "调度流量") {
        yuliangguochengdiv.value = false;
        tableField.value = "流量"; 
        gongshiwenzi.value='公式：y='+SetNull(drpData.value.wqBaseList.nt);
        console.error("tableDRPData.value",  gongshiwenzi.value,'y='+SetNull(drpData.value.wqBaseList.nt));
      }
  },500)
 

})

console.error("tableDRPDatatableDRPDatatableDRPData", tableDRPData);


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
  emit("parentMethods", data);
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
  console.error("GetDrpTendata",Drpswiper.value,value,table, data);
  var listDrpResult=[];
  if (obj == "YLPL") {
    //批量输入
    for (var num = 0; num < data.length; num++) {
      data[num].drp = value;
    }
  } 
  else if (obj == "YLPL20") {
    console.error("search",search.value)
    if(SetNull(search.value)==""){
      search.value = 202.6;
    }
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
    tempResult.push({ dayhour: 15, drp: 10.0 });
    tempResult.push({ dayhour: 16, drp: 10.2 });
    tempResult.push({ dayhour: 17, drp: 4.1 });
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
      console.error("search",search.value,data.length,val)
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
  } 
  else if (obj == "YLPJ") {
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
  else if(obj=="ZNDD"){ 

    var gongshi=SetNull(drpData.value.wqBaseList.nt).split('+');
    var pumcap=SetNull(drpData.value.wqBaseList.pumcap)
    var a=0,b=0,c=0;
    if(gongshi.length>0){
      for(var i=0;i<gongshi.length;i++){
        var temp = gongshi[i];
        if(i==0){
          a=Number(temp.replace("x^2",""));
        }
        else if(i==1){
          b=Number(temp.replace("x",""));
        }
        else if(i==2){
          c=Number(temp);
        }
      }
    } 
    listDrpResult=[];
    if(drpData.value.tableData.length>0){
      for(var num=0;num<drpData.value.tableData.length;num++){
        var mItem=drpData.value.tableData[num];
        var strWhere={};
        var val=Number(mItem.drp);
        strWhere["drp"]=a*val*val+b*val+c;
        if(strWhere["drp"]>Number(pumcap)){
          strWhere["drp"]=Number(pumcap);
        }
        else{
          strWhere["drp"]=Number(strWhere["drp"].toFixed(2));
        }
        strWhere["tm"]=mItem.tm;
        listDrpResult.push(strWhere);
      }
    }

  }
  if(listDrpResult.length>0){
    tableData.value=listDrpResult;
  }
  else{
    tableData.value = data;
  }
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
  display: revert;
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
  color: var(--conter-nayulabel) !important;
}

.div-swiper {
  line-height: 26px;
  margin: 0 auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
  position: relative;
  width: 25%;
  height: 1.875rem;
  font-size: 0.875rem;
  color: var(--mtablethcolor);
  white-space: nowrap;
  line-height: 2rem;
  text-align: center;
  cursor: pointer;
  background: var(--swiperSlide) no-repeat top center;
  background-size: 100% 1.875rem;
  display: inline-block;
  font-family: arial, "Hiragino Sans GB";
}

.swiper-slide-thumb-active {
  font-size: 0.875rem;
  /* color: var(--mtablethcolor); */
  color: #ffffff;
  background: var(--swiperSlideActive) no-repeat top center;
  background-size: 100% 1.875rem;
}

.dialog .div-swiper {
  line-height: 34px;
  margin: 0 auto;
  max-width: 60%;
}

:deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}
</style>