<template>
  <div class="tableDiv tableDivWQ" style="height:630px;width:100%;display:none;">
    <el-table class="m-table" style="height:calc(100% - 30px);width:100%;--el-table-border-color:none;" :data="tableData"
      ref="tableList" :row-class-name="rowClassNameMethod" :row-style="getColor" empty-text="暂无数据">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column label="圩区名称" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.wqnm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="圩外站点水位" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.notew }}</span>
        </template>
      </el-table-column>
      <el-table-column label="圩内站点水位" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.noten }}</span>
        </template>
      </el-table-column>
      <el-table-column label="堤防安全水位差" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.chanote }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调度措施" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.nt }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div id="divEchartsData" class="echartsmaxmindata">
    </div>
  </div>
  <div class="tableDiv tableDivQT" style="height:630px;width:100%;display:none;">
    <el-table class="m-table" style="height:calc(100% - 30px);width:100%;--el-table-border-color:none;" :data="tableData"
      ref="tableList" :row-class-name="rowClassNameMethod" :row-style="getColor" empty-text="暂无数据">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column label="工程名称" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.wqnm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="条件" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.notew }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调度建议" header-align="center" align="center">
        <template #default="scope">
          <span>{{ scope.row.nt }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div id="divEchartsData" class="echartsmaxmindata">
    </div>
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
import { ElInput, ElTable, ElTableColumn} from "element-plus";
import {
  ElDatePicker,
  ElRadio,
  ElButton,
  ElSelect,
  ElConfigProvider
} from "element-plus";
import api from "@/api/zonglan/index.js";
import { SetNull, sortObjectArray } from "@/api/ComUnit";
var props = inject("props");
const tableData = ref([]);
if (props.value != undefined) {
  props = props.value
}
const pid = inject("pid");
console.error('props', props);
const tableDivName = ref("tableDivQT");
onMounted(() => {
  console.error("props", props.pathname,props);
  var propsPathName=props.pathname;
  if(SetNull(propsPathName)==""){
    propsPathName = "圩区调度";
  }
  console.error("props=========",SetNull(propsPathName), props.pathname);
  if (propsPathName != "圩区调度") {
    tableDivName.value = "tableDivQT";
    $(".tableDivQT").show();
  } 
  else {
    tableDivName.value = "tableDivWQ";
    $(".tableDivWQ").show();
  }
  console.error("tableDivName", tableDivName.value);
  Weacontent();
});
function Weacontent() {
  // console.error("props", props, pid)
  var datasource = props.datasource == undefined ? "SC" : props.datasource;
  var strParam = { "pathname": props.wqid, "datasource": datasource };//"strExp":"true"
  if (datasource == "YB") {
    strParam["pid"] = pid;
  }
  api.wqbaseddgz(strParam).then(res => {
    tableData.value = sortObjectArray(res.result,["orderbyid"],"asc"); 
    if (res.result.length > 0) {
      var strData = res.result.filter(function (item) {
          return item.flag == true;
      });
      // console.error("strData", props.id, strData)
      var strMsg = "";
      if (strData.length > 0) {
        var stnmw = "-", stnmn = "-", upz = "-", dwz = "-", cha = "-";
        if (SetNull(strData[0].stnmw) != "") {
          stnmw = strData[0].stnmw;
        }
        if (SetNull(strData[0].stnmn) != "") {
          stnmn = strData[0].stnmn;
        }
        if (SetNull(strData[0].upz) != "") {
          upz = Number(strData[0].upz).toFixed(2);
        }
        if (SetNull(strData[0].dwz) != "") {
          dwz = Number(strData[0].dwz).toFixed(2);
        }
        if (SetNull(strData[0].cha) != "") {
          cha = Number(strData[0].cha).toFixed(2);
        }



        if(strData[0]["pathname"]=="圩区调度"){
          strMsg = "推荐方案参考：圩外(" + stnmw + "):" + upz + " m";
          if(SetNull(dwz)!=""){
            strMsg+="，圩内(" + stnmn + "):" + dwz + " m，水位差:" + cha + " m";
          }
        }
        else{
          strMsg = "无需推荐调度方案";
          if(SetNull(upz)!=""){
            if(Number(upz)>0){
              strMsg = "推荐方案参考：条件(" + stnmw + "):" + upz + " m";
              if(SetNull(dwz)!=""){
                if(Number(dwz)>0){
                  strMsg+="，(" + stnmn + "):" + dwz + " m";
                }
              }
            } 
          }
          
        }
      
      } else {
        strMsg = "无需推荐调度方案";
      }
      $("." + tableDivName.value + " #divEchartsData").html(strMsg);
    }
  })
}
function rowClassNameMethod({ row, rowIndex }) {
  // console.error(row);
  if (row.flag) {
    return 'highlight-row';
  }
  return '';
}

function getColor({ row, rowIndex }) {
  if (row.flag) {
    return "background-color:var(--pingguSelectFangAn) !important;";
  }
  return "";
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
  height: 50px;
  line-height: 50px;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  border-bottom: 0px;
}

:deep(.el-table td.el-table__cell) {
  border-bottom: 0px;
  font-size: 1rem;
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

:deep(.m-table tr td) {
  color: var(--mtablecolor) !important;
}

.highlight-row {
  background-color: var(--pingguSelectFangAn) !important;
}

.echartsmaxmindata {
  width: 100%;
  font-size: 16px;
  margin: 0 auto;
  border: 1.5px solid var(--popContentHeadbg);
  height: auto;
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  color: var(--mtablecolor);
  text-align: center;
}
</style>