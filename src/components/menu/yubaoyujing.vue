<template>
  <!-- 左侧 -->
  <div class="g-lside">
    <div style="width: 100%">
      <yujingTongji :DD_ARR="DD_ARR" :swstrJson="swstrJson" :key="datekey"  />
    </div>
    <div style="width: 100%">
      <yujingMaxTable :DD_ARR="DD_ARR" :swstrJson="swstrJson" :key="datekey" @reviceProgessTimeParent="reviceProgessTime" @parentMethodshowDynamicLayers="parentMethodshowDynamicLayer" />
    </div>
  </div>

  <!-- 右侧 -->
  <div class="g-rside">
    <div style="width: 100%">
      <yujingXinxi :key="datekeyWQ" />
    </div>
    <!-- <div style="width: 100%">
      <yujingCLQ :DD_ARR="DD_ARR" :CLQtableData="CLQtableData" :key="datekey" />
    </div> -->
    <div style="width: 100%">
      <yujingFB :DD_ARR="DD_ARR" :key="datekeyYL" />
    </div>
  </div>

  <!-- 图例 -->
  <div class="tuli">
    <div>
      <el-switch class="switch-xs iconMarker" @click="SpanItem('riverMarker')" v-model="riverMarker" />
      <span style="vertical-align: -10px; margin-left: 50px">标注</span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <!-- <input style="vertical-align: 15px" @click="getTLObj('cb_waterZC')" v-model="cb_waterZC" type="checkbox"
      checked="checked" />-->
      <img alt src="/images/icon_51.png" style="width: 15px; height: 30px; margin-top: 2px; display: inline-block">
      <span style="padding-left: 2px; color: white; vertical-align: 15px; margin-left: 2px">正常</span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <!-- <input style="vertical-align: 15px" @click="getTLObj('cb_waterCJ')" v-model="cb_waterCJ" type="checkbox"
      checked="checked" />-->
      <img alt src="/images/cheng2.png" style="width: 15px; height: 30px; margin-top: 2px; display: inline-block">
      <span style="padding-left: 2px; color: white; vertical-align: 15px">超警</span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <!-- <input style="vertical-align: 15px" @click="getTLObj('cb_waterCB')" v-model="cb_waterCB" type="checkbox"
      checked="checked" />-->
      <img alt src="/images/hong.png" style="width: 15px; height: 30px; margin-top: 2px; display: inline-block">
      <span style="padding-left: 2px; color: white; vertical-align: 15px">超保</span>
    </div>
  </div>
</template>
<script setup>
import yujingTongji from "@/components/menu/ybyj/yujingTongji.vue";
import yujingMaxTable from "@/components/menu/ybyj/yujingMaxTable.vue";
import yujingXinxi from "@/components/menu/ybyj/yujingXinxi.vue";
import yujingCLQ from "@/components/menu/ybyj/yujingCLQ.vue";
import yujingFB from "@/components/menu/ybyj/yujingFB.vue";

import $ from "jquery";
import { onMounted, ref, provide, defineAsyncComponent, reactive, h, onUnmounted } from "vue";
import { useStore } from "vuex";
import * as PointMark from "@/utils/ArcGis/PointMark.js"; 
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";

import dayjs from "dayjs";
import api from "@/api/mode/index.js";
import apizonglan from "@/api/zonglan/index.js";
import Dialog from "@/api/utils/Dialog.js";

import { getGeojson } from "@/api/Common/api.js"
import {destroy,dyCenter,removeEntityByName,addAreaLineQS,setZOOM} from "@/utils/ArcGis/MapComm.js";

const CLQtableData = ref([]);
// 获取当前主题
const _theme = localStorage.getItem("curTheme");

const store = useStore();
const { viewer } = store.state;

const datekey = ref(null);
const datekeyRiver = ref(null);
var DD_ID = ref(null); //调度方案编号
var DD_ARR = ref({}); //调度方案编号

var myData = [];
const riverMarker = ref(true);
const RainMarker = ref(true);

var swstrJson = ref(null);
var MaxResult = ref([]);
const datekeyWQ = ref(null);
const datekeyYL = ref(null);
onUnmounted(() => {
  try {
    destroy();
  } catch (error) { }
})
onMounted(() => {
  $("#m_yujing").addClass("z-crtitem z-crt wow slideInUp link-item");
  clearALL();
  loadFangList();
  reductionSystem();
});

function clearALL() {
  removeEntityByName();
}
//方案列表
function loadFangList() {
  var strParam = {};
  strParam["PageSize"] = 10;
  strParam["PageIndex"] = 0;
  api
    .loadFangList(strParam)
    .then(res => {
      JosnSel(res, "MODE_DD_SOLUTIONSel");
    })
    .catch(err => { });
}
function JosnSel(data, typeID) {
  if (typeID == "MODE_DD_SOLUTIONSel") {
    if (data.data.length > 0) {
      $.data(myData, "DD_SOLUTIONList", data.data);
      var item = data.data[0];
      var STIME = item.dd_TM;
      var ETIME = item.dd_CHECKBY;
      var DD_STANA = Number(item.dd_STANA);
      var DD_CARRYBY = item.dd_CARRYBY;
      DD_ID.value = item.dd_ID;

      var itemDD = {
        gcTime: ETIME,
        DD_ID: item.dd_ID,
        ZU_ID: item.dd_MIND,
        STIME: STIME,
        ETIME: ETIME,
        DD_STANA: DD_STANA,
        DD_CARRYBY: DD_CARRYBY,
        DRP: 0,
      };
      DD_ARR.value = itemDD;
      Weacontent();
    }

  }
}
function Weacontent() {
  window.loadingShow();
  var strParam = {
    "solutionid": DD_ID.value,
    "data_TYPE": "1"
  };
  api
    .loadMODELSINGRESULT(strParam)
    .then(res => {
      swstrJson.value=res.data;
      datekey.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
      PointMark.addYBSWMark(swstrJson.value,DD_ARR.value.DD_ID, DD_ARR.value.STIME, DD_ARR.value.ETIME, riverMarker.value);
      window.loadingHide();
    })
    .catch(err => { });
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
//收取子组件消息：
function reviceProgessTime(res) {
  JosnSel(res, "SelAll");
}
function SpanItem(obj) {
  if (obj == "riverMarker") {
    PointMark.addYBSWMark(swstrJson.value,DD_ARR.value.DD_ID, DD_ARR.value.STIME, DD_ARR.value.ETIME, riverMarker.value);
  } 
}
function reductionSystem() {
  addAreaLineQS();
}
function parentMethodshowDynamicLayer(item) {
  setZOOM(13);
  dyCenter (item[0],item[1]);
}
//传参
provide("DD_ID", DD_ID);
provide("DD_ARR", DD_ARR);
provide("CLQtableData", CLQtableData);
</script>
<style src="@/assets/styles/style.css"></style>
<style scoped>
.tuli {
  /* width: 130px; */
  height: 200px;
  color: white;
  font-size: 12px;
  font-size: 0.15rem;
  padding: 0px 5px 10px 5px;
  cursor: pointer;
  position: absolute;
  border-radius: 8px;
  bottom: 15px;
  height: auto !important;
  right: 24%;
  /* padding: 0px !important; */
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

:deep(.el-checkbox__input.is-checked + .el-checkbox__label),
:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: var(--swDivSelectcolor);
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner),
:deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: var(--swDivSelectcolor);
  border-color: var(--swDivSelectcolor);
}

.colorSpan {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 0px 5px;
  line-height: 12px;
  vertical-align: -2px;
}

.colorL p {
  line-height: 16px;
  margin-bottom: 5px;
}

.colorSpanValue {
  margin-top: 7px;
  font-size: 13px;
  vertical-align: 2px;
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
  background: var(--mtabletrcolor);
  z-index: 2;
}

:deep(.liSelected) {
  color: var(--sel_wraplabelcolorSel) !important;
  background: var(--popupContentTitleColor);
}
</style>