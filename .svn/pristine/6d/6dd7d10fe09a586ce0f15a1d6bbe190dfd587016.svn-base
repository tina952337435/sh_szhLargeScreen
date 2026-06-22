<template>
  <div class="tableDiv" style="height:730px;width:100%;">
    <div style="width:40%;" class="div-swiper">
      <div class="swiper-slide" style="width: 33%;"
        :class="Drpswiper == '圩区调度' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('圩区调度')">
        圩区调度
      </div>
      <div class="swiper-slide" style="width:33%;"
        :class="Drpswiper == '洪水调度' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('洪水调度')">
        洪水调度
      </div>
      <div class="swiper-slide" style="width:33%;"
        :class="Drpswiper == '超标准洪水调度' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('超标准洪水调度')">
        超标准洪水调度
      </div>
    </div>
    <el-table class="m-table" style="height:calc(100% - 70px);width:100%;--el-table-border-color:none;" :data="tableData"
      ref="tableList" :row-class-name="rowClassNameMethod" :row-style="getColor" @cell-click="handleCellClick"
      empty-text="无推荐调度方案">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column :label="Drpswiper == '圩区调度' ? '圩区名称' : '名称'" header-align="center" align="center">
        <template #default="scope">
          <span class="spanSelect">{{ scope.row.wqnm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐调度" header-align="center" align="center">
        <template #default="scope">
          <div class="spanText">{{ scope.row.nt }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <MyDialog :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 1400px; height: 800px;" v-if="props.pathname == 'yubao'">
    <WQDiaoduYB />
  </MyDialog>
  <MyDialog :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 1200px; height: 800px;" v-else>
    <WQDiaodu />
  </MyDialog>
</template> 
<script setup>
import '@/assets/styles/style.css';
import '@/assets/styles/Table.css';
import '@/assets/styles/swiper.css';
import MyDialog from "@/components/ComDialog.vue";
import WQDiaodu from "@/components/danzhan/wq/WQDiaodu.vue";
import WQDiaoduYB from "@/components/danzhan/wq/WQDiaoduYB.vue";
import $ from "jquery";
import {
  ref,
  onMounted,
  getCurrentInstance, 
  inject,
  provide
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
import { SetNull } from '@/api/ComUnit';
const Drpswiper = ref("圩区调度");
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const titleName = ref('');
const typeValue = ref({});

var props = defineProps({
  datasource: {
    type: String,
    default: ""
  },
  pathname: {
    type: String,
    default: ""
  },
  wqid: {
    type: String,
    default: ""
  },
  pid: {
    type: String,
    default: ""
  },
  etime: {
    type: String,
    default: ""
  },
});
const tableData = ref([]);
onMounted(() => {
  console.error(props.pathname)
  Weacontent();
});
function GetRiver(obj) {
  Drpswiper.value = obj;
  Weacontent();
}
function Weacontent() {
  window.loadingShow();
  var strParam = { "datasource": props.datasource, "strExp": "true", "key": Drpswiper.value };
  if (SetNull(props.pid) != "") {
    strParam.pid = props.pid;
  }
  api.wqbaseddgz(strParam).then(res => {
    // console.error("res", res);
    tableData.value = res.result;
  })
  window.loadingHide();
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
    //return "background-color:var(--pingguSelectFangAn) !important;";
  }
  //return "";
}


function handleCellClick(row, column, cell, event) {
  // if (column.label == "圩区名称") {
  titleName.value = row.wqnm;
  row.datasource = props.datasource;
  row.etime = props.etime;
  typeValue.value = row;
  showDialog.value = true;
  // }
  // console.error("点击了单元格");
  // console.error("行数据：", row);
  // console.error("列的 label：", column.label);
  // console.error("列的 prop：", column.property);
  // console.error("事件对象：", event);
}
// 提供方法给子组件
provide("props", typeValue);
provide("pid", props.pid);
</script>

<style scoped>
:deep(.spantitle) {
  font-size: 20px;
}

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

:deep(.spanSelect) {
  text-decoration: underline;
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

:deep(.spanText) {
  text-align: left !important;
}
</style>