<template>
  <div class="m-box m-box-1" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">水文测站实时数据</p>
    </div>
    <div class="txt" style="overflow-y: auto">
      <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table FirstTable jcllTable" :border="0"
        :cellspacing="0" :cellpadding="0" @click="handleclick" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableStationjc  :resultDataSL="props.resultDataSL"/>
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/Table.css';
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { useStore } from 'vuex'
import Dialog from "@/api/utils/Dialog.js";
import { ref, onMounted, reactive, defineAsyncComponent, h,defineProps,watch } from "vue";
import { SetNull,formatFlow} from "@/api/ComUnit";
import { ElMessage } from "element-plus";

const store = useStore();
const { viewer } = store.state;
const datekey = ref(null);
const tableHeaders = ref([
  { name: "num", label: "序号" },
  { name: "stnm", label: "名称" },
  { name: "q", label: "流量(m³/s)" },
  { name: "rvnm", label: "所在河道" },
  // { name: "sl", label: "昨日净水量(万方)" }
]);
const tableData = ref([]);
const tableDataAll = ref([]);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const stime = ref({});
const etime = ref({});
const props = defineProps({
  resultDataSL: {
    type: String,
    default: ""
  }
});
function Weacontent() {
    var result=[];
    var strJson =props.resultDataSL;
    for (var num = 0; num < strJson.length; num++) {
      var item = strJson[num];
      var wrz = item.wrz != undefined ? Number(item.wrz).toFixed(2) : "—";
      var grz = item.grz != undefined ? Number(item.grz).toFixed(2) : "—";
      var upz = item.upz != undefined ? Number(item.upz).toFixed(2) : "—";
      var wrzCha = "—";
      var colorCss = "";
      var tm = "—";
      if (item.tm != undefined) {
        tm = dayjs(item.tm).format("MM-DD HH:mm");
      }
      var q = formatFlow(item["q"]);
      var _strParam = {};
      _strParam["num"] = num+1;
      _strParam["stnm"] = SetNull(item["stnm"]).replaceAll(" ", "");
      _strParam["upz"] = upz;
      _strParam["wrz"] = wrz;
      _strParam["grz"] = grz;
      _strParam["wrzCha"] = wrzCha;
      _strParam["tm"] = tm;
      _strParam["stcd"] = item.stcd;
      _strParam["lgtd"] = item.lgtd;
      _strParam["lttd"] = item.lttd;
      _strParam["colorCss"] = colorCss;
      _strParam["mtype"] = item.mtype;
      _strParam["q"] = q;
      _strParam["dwz"] = item.dwz;
      _strParam["BZtm"] = item.tm;
      _strParam["sl"] = item.sl;       
      _strParam["rvnm"] = item.rvnm;
      result.push(_strParam);
      // result.push([item.stnm, upz, grz, wrzCha, tm]);
      tableData.value = result;
      tableDataAll.value = result;
    }
  // }).catch((err) => { });
}
const emit = defineEmits(['parentMethodshowDynamicLayers']);
function handleclick(evt) {
  const targetId = evt.target.id;
  var name = evt.target.innerText;
  if(targetId=="q"){
        const parentDom = evt.target.parentNode; 
        const prevSibling = parentDom.previousElementSibling; 
         // 查找 prevSibling 下的第一个 span 元素
        const spanElement = prevSibling.querySelector('span');
        if (spanElement) {
            // 获取文本内容
            name = spanElement.textContent;
        }
    }

  const strJson = tableData.value.find(item => item.stnm === name);
  if(strJson==undefined){
    return;
  }
  if (SetNull(strJson["lgtd"]) == "" && SetNull(strJson["lttd"]) == "") {
    ElMessage.error("缺少经纬度坐标");
  }
  else {
    let _lgtd = Number(strJson["lgtd"]);
    let _lttd = Number(strJson["lttd"]);
    var evt=[_lgtd,_lttd];
    emit("parentMethodshowDynamicLayers", evt);
  }
  if(targetId=="q"){
    var nowTM = new Date();
    const ChildVue = defineAsyncComponent(() =>
      import("@/components/danzhan/sq/DanZHanSel.vue")
    );
    const props = {};
    props["stcd"] = strJson["stcd"];
    props["stime"] = "";
    props["etime"] = dayjs(nowTM).add(1, "HOUR").format("YYYY-MM-DD HH:00:00");
    props["mtype"] = strJson["mtype"];
    props["type"] = "流量过程";
    //ChildVue为弹窗中嵌入的slot
    Dialog.open({ title: strJson["stnm"], widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
  }
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
  if(SetNull(props.resultDataSL)!=""){
    Weacontent();
  }
});
watch(props.resultDataSL, () => {
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
