<template> 
<!-- 左侧tab切换 -->
  <!-- 侧边栏 -->
    <aside class="aside">
        <tabToggleSQ />
    </aside>
  <!-- 右侧 -->
  <div class="g-rside">
    <div style="width: 100%">
      <songpudaqiaoLL :stcdVal="stcdVal" :stnmVal="stnmVal" :resultDataSL="resultDataSL" :key="datekeyAll" />
    </div>
    <div style="width: 100%">
      <TableStationjc :stcdVal="stcdVal" :stnmVal="stnmVal" :resultDataSL="resultDataSL" :key="datekeyAll"  @parentMethodshowDynamicLayers="parentMethodshowDynamicLayer"/>
    </div>
  </div>
  <!-- 图例 -->
  <div class="tuli">
    <div>
      <el-switch class="switch-xs iconMarker" @click="SpanItem('riverMarker')" v-model="riverMarker" />
      <span style="vertical-align: -10px; margin-left: 50px"> 标注 </span>
    </div>
    <!-- <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <img alt="" src="/images/outInfo.png"
        style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block" />
      <span style="padding-left: 2px; color: white; vertical-align: 15px; margin-left: 2px">入境水量 </span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <img alt="" src="/images/inInfo.png"
        style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block" />
      <span style="padding-left: 2px; color: white; vertical-align: 15px">出境水量 </span>
    </div> -->
  </div>
  <!-- <div class="xiala"
    style="right: 5px;position: absolute;top: calc(5rem + 20px);width:100px;line-height: 30px;cursor: pointer;">
    <label id="SLTitle" @click="showItem('SLList')"
      style="margin-top: 4px;margin-right: 5px;font-size: 14px;font-family: var(--calcite-font-family);cursor: pointer;color:var(--mtablecolor)">
    </label>
    <img src="/images/icon_select.png" style="position:absolute;right:0px;margin-top: 2px;cursor: pointer;"
      @click="showItem('SLList')">
    <ul class="el-dropdown-menu"
      style="width:100px;height:120px;overflow-y:auto;overflow-x:hidden;margin-top:5px;font-family: var(--calcite-font-family);"
      id="SLList">
    </ul>
  </div> -->
  <Mapbiaozhu />
</template>

<script setup>
import '@/assets/styles/style.css';
import { useStore } from "vuex";
import songpudaqiaoLL from "@/components/menu/szy/crj/songpudaqiaoLL.vue";
import TableStationjc from "@/components/menu/szy/crj/TableStationjc.vue";
import Mapbiaozhu from "@/components/untils/Mapbiaozhu.vue";
import tabToggleSQ from "@/components/tab/tabToggleSQ.vue";
import { onMounted, ref, shallowRef, defineAsyncComponent, nextTick, inject, provide, reactive, onUnmounted, } from "vue";
import { SetNull, groupBy, GetJosns,sortObjectArray } from "@/api/ComUnit.js";
import apizonglan from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import * as PointMark from "@/utils/ArcGis/PointMark.js";
import { destroy, removeEntityByName,dyCenter ,setZOOM} from "@/utils/ArcGis/MapComm.js";
import $ from "jquery";
import { useRoute } from "vue-router";

const jsonModules = import.meta.glob('@/assets/json/shuiliang/*.json');
const pathData = ref({})
function loadAllJson() {
}
const route = useRoute();

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const popupCloseImg = ref("/images/missWhite.png");
// 开始时间、结束时间
const stime = ref({});
const etime = ref({});
const strJsonData = ref({});
const store = useStore();
const riverMarker = ref(true);
const datekeyAll = ref(null);

//自动刷新
var interVal;
window.curDataRefresh = function () {
  if (interVal != null) {
    clearInterval(interVal);
  }
  if (localStorage.getItem("curDataRefresh") == "true") {
    interVal = setInterval(function () {
      refreshData();
    }, 180000); //180000
  }
}
onUnmounted(() => {
})
//刷新的方法
function refreshData() {
  var _curDataRefresh = localStorage.getItem("curDataRefresh");
  if (_curDataRefresh == true || _curDataRefresh == 'true') {
    Weacontent();
  } else {
    if (interVal != null && interVal != undefined) {
      clearInterval(interVal);
    }
  }
}
const stcdVal = ref('');
const stnmVal = ref('');
const resultDataSL = ref([]);
// let isSceneReadyRegistered = false;

function SpanItem(obj) {
  if (obj == "riverMarker") {
    Weacontent();
  }
}

function Weacontent() {
  window.loadingShow();
  var strParam = {};
  strParam["pid"] = "2026031114184492913-4";
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  apizonglan.stFlowJC(strParam).then((res) => {  
    var dataLL=res.data; 
    dataLL=sortObjectArray(dataLL, ['orderbyid'], 'asc'); 
    resultDataSL.value=dataLL;
    PointMark.addLLMark(dataLL, riverMarker.value)
    window.loadingHide();
    datekeyAll.value=new Date();
  });
}
function showItem(id) {
  var obj = $("#" + id);
  var dis = obj.css("display");
  if (dis == "block") {
    obj.css("display", "none");
  } else {
    obj.css("display", "block");
  }
}
onMounted(() => {
  $("#tabll").addClass('swDivSelect swDiv');
  $("#m_shik").addClass('z-crtitem z-crt wow slideInUp link-item');
  if (_theme == "default") {
    popupCloseImg.value = "/images/missWhite.png"
  } else {
    popupCloseImg.value = "/images/missBlack.png"
  }

  var now = new Date();
  etime.value = dayjs(now).add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
  if (Number(dayjs(now).format("HH")) > 7) {
    stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
  }
  else {
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  clearALL();
  Weacontent();
});
function clearALL() {
  try {
    removeEntityByName();
  } catch (ex) { }
}
function parentMethodshowDynamicLayer(item) { 
  setZOOM(13);
  dyCenter(item[0],item[1]);
}
</script>
<style scoped>
.tuli {
  width: 115px;
  height: 200px;
  color: white;
  font-size: 12px;
  font-size: 0.15rem;
  padding: 0px 5px;
  cursor: pointer;
  position: absolute;
  border-radius: 8px;
  bottom: 15px;
  height: auto !important;
  right: 29rem;
  padding: 0px 0px 20px 0px !important;
  z-index: 2;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.2);
}

.switch-xs {
  position: absolute;
  left: 6px;
  height: 40px;
  line-height: 40px;
}

/* 搜索开始 */
.top-left-icon {
  width: 5vh;
  height: 5vh;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  position: fixed;
  left: 28rem;
  bottom: 0.8rem;
  color: white;
}

.opencz1 {
  width: 46px;
  height: 36px;
  margin-left: 10px;
  float: right;
  background: #fff;
  cursor: pointer;
  border: 1px #c5d1ff solid;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  float: right;
  height: 36px;
  width: 100px;
  left: -380px;
  line-height: 36px;
  color: #42ecef !important;
  border-style: solid;
  border-width: 2px;
  border-image-source: linear-gradient(0deg, #11a8ff, #134dea 49%, #11a8ff);
  border-image-slice: 1;
  box-shadow: inset 0 0 0 1px transparent;
  background-color: rgba(76, 152, 176, 0.2);
  text-align: center;
}

.top-left-icon-menu {
  width: 455px;
  height: 180px;
  z-index: 99;
  margin-left: 10px;
  cursor: pointer;
  position: fixed;
  left: 28rem;
  bottom: 1rem;
  color: var(--sel_wraplabelcolor);
  padding: 10px;
  box-shadow: inset 0 0 0 1px transparent;
  /* background-color: rgba(2, 24, 31, 0.8); */
  background-color: var(--boxtitlebg);
  border: var(--portalborder);
  /* border-image-source: linear-gradient(0deg, #11a8ff, #134dea 49%, #11a8ff); */
  display: none;
  border-radius: 8px;
}

.top-left-icon-menu-close {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 22px;
  padding: 3px;
}

.shdswDiv .swDiv {
  margin: 0px;
  width: 50px;
  font-size: 14px;
  margin-left: 6px;
}

.divArea {
  /* width: 100%; */
  height: 100px;
  margin: 0px;
  padding: 0px 0px 0px 0px;
}

.area {
  background: var(--portal);
  border: var(--portalborder);
  width: 80px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  margin-right: 8px;
  font-size: 13px;
  list-style: none;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  padding: 0px;
  margin: 0px 0px 5px 10px;
  color: var(--sel_wraplabelcolor);
}

.areaSelect {
  background: var(--swDivSelectcolor);
  color: var(--sel_wraplabelcolorSel);
  width: 80px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  margin-right: 8px;
  font-size: 13px;
  list-style: none;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  padding: 0px;
  margin: 0px 0px 5px 10px;
}

.textbox {
  background: none;
  border: var(--portalborder);
  padding-left: 6px;
  padding-right: 6px;
  height: 26px;
  border-radius: 4px;
  margin-left: -1px;
  color: #fff;
}

.textbox:fous-visible {
  background: var(--portal) !important;
  border: var(--portalborder) !important;
  color: var(--widgetcolor);
}

#zhandianbox {
  width: 150px;
  height: auto;
  display: table;
  position: absolute;
  background: var(--boxtitlebg);
  left: 55px;
  bottom: 0px;
  z-index: 99;
  margin-left: 8px;
  border-radius: 4px;
  color: var(--widgetcolor);
}

/* 自定义滚动条样式 */
.el-dropdown-menu::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.el-dropdown-menu::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: 0px;
  top: 0px;
  background: var(--popContentHeadbg);
  z-index: 2;
}

#zhandianbox ul {
  padding: 0px 5px;
}

#zhandianbox ul li {
  cursor: pointer;
  line-height: 30px;
  height: 30px;
  list-style: none;
  color: var(--sel_wraplabelcolor);
}

#zhandianbox ul li:hover {
  color: var(--popupContentTitleColor);
}

:deep(.el-radio) {
  margin-right: 20px;
  --el-radio-input-bg-color: #d5141400;
}

:deep(.el-radio__label) {
  color: var(--widgetcolor);
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
  width: 160px;
}

:deep(.el-input__prefix-inner) {
  margin-left: -9px;
}

:deep(.el-input__suffix) {
  margin-right: -9px;
}

:deep(.el-input__wrapper) {
  background-color: #d5141400;
  box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
  ;
}

:deep(.el-input__inner) {
  color: var(--widgetcolor);
}

:deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}


:deep(.el-checkbox__input.is-checked+.el-checkbox__label),
:deep(.el-radio__input.is-checked+.el-radio__label) {
  color: var(--swDivSelectcolor);
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner),
:deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: var(--swDivSelectcolor);
  border-color: var(--swDivSelectcolor)
}

/* 搜索结束 */
</style>