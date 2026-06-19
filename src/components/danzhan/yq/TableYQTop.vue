<template>
  <div class="m-box m-box-1" style="position: relative">
    <!-- <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius"
    >
      <span class="spanTitle"></span>
      <span>水位监测</span>
    </div> -->
    <!-- <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">水位监测</p>
      <el-input v-model="searchKey" placeholder="请输入搜索站点" clearable @input="handleSearch"></el-input>
    </div> -->
    <div class="txt" style="overflow-y: auto">
      <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table FirstTable" :border="0"
        :cellspacing="0" :cellpadding="0" @click="handleclick" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableSWJC />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/Table.css';
import ComZujian from "@/components/ComZujian.vue";
import TableSWJC from "@/components/menu/sq/TableSWJC.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { useStore } from 'vuex'
import Dialog from "@/api/utils/Dialog.js";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const props = defineProps({
  data: {
    type: Array,
    default:[]
  }
});
const store = useStore();
const datekey = ref(null);
const tableHeaders = ref([
  { name: "stnm", label: "名称" },
  { name: "drp", label: "雨量(mm)" },
{ name: "sortnum", label: "排名" },
]);
const tableData = ref([]);
const tableDataAll = ref([]);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const stime = ref({});
const etime = ref({});

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = "20241025000002";
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  // api.stPptnWater(strParam).then((res) => {

    var strJson = props.data;
    strJson.filter(function(e,_index){
        e.sortnum=_index+1;
    })
     tableData.value = strJson;
      tableDataAll.value = strJson;
  // }).catch((err) => { });
}
function handleclick(evt) {
  const name = evt.target.innerText;
  const strJson = tableData.value.find(item => item.stnm === name);
  if (SetNull(strJson["lgtd"]) == "" && SetNull(strJson["lttd"]) == "") {
    ElMessage.error("缺少经纬度坐标");
  }
  else {
    let _lgtd = Number(strJson["lgtd"]);
    let _lttd = Number(strJson["lttd"]);
  }
  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/sq/SQLine.vue")
  );
  const props = {};
  props["stcd"] = strJson["stcd"];
  props["stime"] = stime.value;
  props["etime"] = etime.value;
  props["mtype"] = strJson["mtype"];
  //ChildVue为弹窗中嵌入的slot
  Dialog.open({ title: strJson["stnm"] + "水位过程线", widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
}
const searchKey = ref('')
function handleSearch(evt) {
  searchKey.value = evt;
  tableData.value = tableDataAll.value.filter(function (e) {
    return (e.stnm).includes(evt) == true;
  })
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
onMounted(() => {
  var nowTM = new Date();
  etime.value = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  if (Number(dayjs(nowTM).format("HH")) > 7) {
    stime.value = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  }
  else {
    stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  Weacontent();
});
</script> 
<style scoped>
.m-table tr th:nth-child(1),
.m-table tr td:nth-child(1) {
  width: 100px;
}

.m-table tr td:nth-child(2) {
  width: 80px;
}

tr td:nth-child(3) {
  width: 10vh;
}

tr td:nth-child(4) {
  width: 10vh;
}

tr td:nth-child(5) {
  width: 12vh;
}

/* 自定义滚动条样式 */
.txt::-webkit-scrollbar {
  width: 2px;
}

.txt::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

:deep(.el-input) {
  --el-input-border-color: var(--popContentHeadbg) !important;
  width: 160px;
  border-radius: 6px;
  margin-left: 50px;
  height: 1.8rem;
  vertical-align: 0.8rem;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}

:deep(.el-input__inner) {
  color: var(--mtablecolor);
}
</style>
