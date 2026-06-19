<template>
  <!-- 左侧 -->
  <div class="g-lside">
    <div style="width: 100%">
      <DDTable :DDData="DDData" :key="DDdatekey" @DDValue="getDDType" />
    </div>
    <div style="width: 100%">
      <SWMaxTable :SWData="SWData" :SWHeader="SWHeader" :key="datekey" />
    </div>
  </div>

  <!-- 右侧 -->
  <div class="g-rside">
    <div style="width: 100%">
      <SWEchart :selectData="selectData" :key="SWdatekey" :ZhanDanSW="ZhanDanSW"/>
    </div>
    <div style="width: 100%">
      <LLEchart :selectData="selectData" :key="datekeyLLGC" :ZhanDanLL="ZhanDanLL"/>
    </div>
    <div style="width: 100%">
      <CJEChart :CJData="CJData" :CJCount="CJCount" :key="datekey" />
    </div>    
  </div>

  <!-- 图例 -->
  <div class="tuli">
    <div>
      <el-switch class="switch-xs iconMarker" @click="SpanItem('riverMarker')" v-model="riverMarker" />
      <span style="vertical-align: -10px; margin-left: 50px">标注</span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <img alt src="/images/icon_51.png" style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block">
      <span style="padding-left: 2px; color: white; vertical-align: 15px; margin-left: 2px">正常</span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <img alt src="/images/cheng2.png" style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block">
      <span style="padding-left: 2px; color: white; vertical-align: 15px">超警</span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <img alt src="/images/hong.png" style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block">
      <span style="padding-left: 2px; color: white; vertical-align: 15px">超保</span>
    </div>
    <div class="colorL" id="colorLSW" style="margin-top:15px;padding: 0px 10px;">

    </div>
  </div>
  <div id="SSTTL" style="background: rgba(0,0,0,0.2) 30%;position:absolute;left:29rem;top:250px;height:275px;
    width: 75px;-moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;display:block;">
      <div id="swTuli" class="colorL">
              <p><span class="colorSpan" style="background-color:#000049"></span><span class="colorSpanValue">4.00</span></p>
              <p><span class="colorSpan" style="background-color:#000087"></span><span class="colorSpanValue">3.80</span></p>
              <p><span class="colorSpan" style="background-color:#0000D0"></span><span class="colorSpanValue">3.60</span></p>
              <p><span class="colorSpan" style="background-color:#2424FF"></span><span class="colorSpanValue">3.40</span></p>
              <p><span class="colorSpan" style="background-color:#4444FF"></span><span class="colorSpanValue">3.20</span></p>    
              <p><span class="colorSpan" style="background-color:#6363FF"></span><span class="colorSpanValue">3.00</span></p>
              <p><span class="colorSpan" style="background-color:#9797FF"></span><span class="colorSpanValue">2.80</span></p>
              <p><span class="colorSpan" style="background-color:#0098C6"></span><span class="colorSpanValue">2.60</span></p>
              <p><span class="colorSpan" style="background-color:#00B8EF"></span><span class="colorSpanValue">2.40</span></p>
              <p><span class="colorSpan" style="background-color:#2FCFFF"></span><span class="colorSpanValue">2.20</span></p>
              <p><span class="colorSpan" style="background-color:#82E2FF"></span><span class="colorSpanValue">2.00</span></p>
              <p><span class="colorSpan" style="background-color:#C1F1FF"></span><span class="colorSpanValue">0.00</span></p>
      </div>

      <div id="llTuli" class="colorL" style="display:none;">
          <p><span class="colorSpan" style="background-color:#EF0004"></span><span class="colorSpanValue">300</span></p>
          <p><span class="colorSpan" style="background-color:#EF0088"></span><span class="colorSpanValue">200</span></p>
          <p><span class="colorSpan" style="background-color:#000087"></span><span class="colorSpanValue">150</span></p>
          <p><span class="colorSpan" style="background-color:#0000D0"></span><span class="colorSpanValue">100</span></p>
          <p><span class="colorSpan" style="background-color:#2424FF"></span><span class="colorSpanValue">80.0</span></p>
          <p><span class="colorSpan" style="background-color:#6363FF"></span><span class="colorSpanValue">60.0</span></p>
          <p><span class="colorSpan" style="background-color:#9797FF"></span><span class="colorSpanValue">40.0</span></p>
          <p><span class="colorSpan" style="background-color:#0098C6"></span><span class="colorSpanValue">30.0</span></p>
          <p><span class="colorSpan" style="background-color:#00B8EF"></span><span class="colorSpanValue">20.0</span></p>
          <p><span class="colorSpan" style="background-color:#2FCFFF"></span><span class="colorSpanValue">10.0</span></p>
          <p><span class="colorSpan" style="background-color:#82E2FF"></span><span class="colorSpanValue">5.0</span></p>
          <p><span class="colorSpan" style="background-color:#C1F1FF"></span><span class="colorSpanValue">0.0</span></p>
      </div>
    </div>
  <!-- 底图图层切换 -->
  <!-- <div style="cursor: pointer;margin-right: 25px;width: 40px;  height: 40px; text-align: center; border-radius: 30%; background: rgb(28 177 195 / 40%);margin-top: 5px;
    position: absolute;top:7rem; right: 30rem;" @click="reductionSystem">
    <img style="width: 30px;padding-top: 8px;" src="/images/suzhoumapSmall.png" alt="全视角" />
  </div> -->

  <!--播放条-->
  <div class="progresspanel">
    <progresstime :progesstimeObj="progesstimeObj" :key="datekey" @progresstime="reviceProgessTime" />
  </div>

  <div id="tmCenter"  class="tmCenter">
    {{ tmCenter }}</div>
</template>

<script setup>
import '@/assets/styles/style.css';
import DDTable from "@/components/menu/yuyan/DDTable.vue";
import SWMaxTable from "@/components/menu/yuyan/SWMaxTable.vue";
import SWEchart from "@/components/menu/yuyan/SWEchart.vue";
import CJEChart from "@/components/menu/yuyan/CJEChart.vue";
import LLEchart from "@/components/menu/yuyan/LLEchart.vue";
import progresstime from "@/components/menu/yb/progress-time.vue";
import $ from "jquery";
import { onMounted, ref, provide, defineAsyncComponent, onUnmounted, watch, h, nextTick } from "vue";
import { useStore } from "vuex";
import * as PointMark from "@/utils/ArcGis/PointMark.js";

import { GetJosns, SetNull, sortObjectArray, groupBy } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import api from "@/api/mode/index.js";
import apizonglan from "@/api/zonglan/index.js";
import apiHuishui from "@/api/mode/indexHuishui.js";
import { getDateDiff, convertToDate } from "@/api/dateUtil";
import { getGeojson } from '@/api/Common/api';
import Dialog from "@/api/utils/Dialog.js";
import { ElButton, ElMessage, } from "element-plus";

import SHSWZZModeRiver2000 from "@/assets/json/SHSWZZModeRiver2000.json";

import { destroy,removeEntityByName,addAreaLineQS} from "@/utils/ArcGis/MapComm.js";
const CLQtableData = ref([]);
const rainListAll = ref([]);
const resultWQDATA = ref([]);
const ZhanDanLL = ref([]);
const ZhanDanSW = ref([]);
const datekeySWGC=ref("");
const datekeyLLGC=ref("");

// 获取当前主题
const _theme = localStorage.getItem("curTheme");

const store = useStore();
const { viewer } = store.state;

const datekey = ref(null);
const SWdatekey = ref(null);
var DD_ID = ref(null); //调度方案编号
var DD_ARR = ref({}); //调度方案编号
var DD_ARRWQ = ref({}); //圩区方案
// 圩区方案编号
var wqddID = ref(null);
var progesstimeObj = ref({});
var myData = [];
const riverMarker = ref(true);
var wqstrJson = ref([]);
const currentComponentTanchu = ref(null);
const tmCenterName = ref(null);
const tmCenter = ref(null);
const heatMapFlag = ref(false);
const colorLSW1 = ref(true), colorLSW2 = ref(true), colorLSW3 = ref(true), colorLSW4 = ref(true), colorLSW5 = ref(true);

const DDData = ref([]);
const SWData = ref([]);
const SWHeader = ref([]);
const DDdatekey = ref(null);

const CJData = ref([]);
const CJCount = ref(0);

onUnmounted(() => {
  clearALL();
});
onMounted(async () => {
  $("#m_yuyan").addClass("z-crtitem z-crt wow slideInUp link-item");
  clearALL();
  BaseZhan();
  loadFangList();
  reductionSystem();
});

function clearALL() {
  try {
    removeEntityByName();
  } catch (error) { }
}
function BaseZhan() {
  var strParam = {pattem: "1,8"};
  api
  .loadjisuanzhanData(strParam)
  .then(reszhan => {
    $.data(myData, "ZhanDanData", reszhan.data);
    var dataTemp = reszhan.data.filter(function (e) {
        return e.type =="1";
    });
    ZhanDanSW.value = dataTemp;
    SWdatekey.value=new Date();
    var dataTemp = reszhan.data.filter(function (e) {
        return e.type =="8";
    });
    ZhanDanLL.value = dataTemp;
    datekeyLLGC.value=new Date();
  })
  .catch(err => { console.error(err);});
}
//方案列表
function loadFangList() {
  var strParam = {};
  api.loadFangListTZ(strParam).then(res => { 
     JosnSel(res, "MODE_DD_SOLUTIONTZSel");
  }).catch(err => { });
}
//勾选数据,选中行数据
const selectData = ref([]);
const selectedRow = ref(null);
function getDDType(Data, Row) {
  if (selectData.value == Data && selectedRow.value == Row) {
    return;
  }

  if (Row != undefined) {
    tmCenter.value = Row.DD_NAME + "(" + dayjs(Row.STIME).format("M月D日H时") + ")";
    $.data(myData, "STIME", Row.STIME);
    $.data(myData, "ETIME", Row.ETIME);
    $.data(myData, "DD_NAME", Row.DD_NAME);
    $.data(myData, "taskID",Row.DD_FOR)
    DD_ID.value=Row.DD_ID;
    progesstimeObj.value = {
      startTime: Row.STIME,
      endTime: Row.ETIME,
      currentTime: Row.STIME,
      stopTime: Row.ETIME,
      formatFooter: "MM-DD",
      formatTooltip: "MM-DD HH:00",
      formatTooltipDay: "YYYY-MM-DD",
      formatTooltipFull: "YYYY-MM-DD HH:mm:00",
      delay: 1500,
      animateAfter: reviceProgessTime
    };
  }
  var SOLUTIONIDList = Data.map(item => item.DD_ID);
  if (SOLUTIONIDList.length > 0) {
    const SOLUTIONID = SOLUTIONIDList.join(",");
    const SOLUTIONIDNAME = Data.map(item => item.DD_NAME).join(",");
    fengxianTJ(SOLUTIONID, SOLUTIONIDNAME);
  }
  selectData.value = Data;
  selectedRow.value = Row;
  SWdatekey.value = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  datekeyLLGC.value=dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
}
var DD_NAME = "";
function fengxianTJ(SOLUTIONID, SOLUTIONIDNAME) {
  window.loadingShow();
  var strParam = {
    "solutionid": SOLUTIONID,
    "data_TYPE": "1"
  };
  api.loadMODELSINGRESULT(strParam).then(data => { 
    var strJsonData =data.data;
    var s = SOLUTIONID.split(',');
    var stcdList = SOLUTIONIDNAME.split(',');
    var colunm = [];
    var result = [];
    if (s.length > 0) {
      //统计每个方案各站点最高水位
      var arrMaxZ = [];
      var _XData = [];
      var total = 0;
      colunm.push({ name: "STNM", label: "站点" });
      var THSWMin = 10000;
      var _faIndex = 0, _faMinZ = 10000;
      for (var n = 0; n < s.length; n++) {
        var t = strJsonData.filter(function (e) {
          return e.solutionid == s[n];
        });
        for (var num = 0; num < t.length; num++) {
          if (t[num].STCD == "x") {
            t[num].WRZ = 4.66;
            t[num].GRZ = 3.8
          }
          if (t[num].STCD == "63205150") {
            if (Number(t[num].maxz) < _faMinZ) {
              _faIndex = n + 1;
              _faMinZ = Number(t[num].maxz);
            }
          }
          if (n == 0) {
            var item = {};
            item.STNM = t[num].stnm;
            item.STCD = t[num].stcd;
            item.LGTD = t[num].lgtd84;
            item.LTTD = t[num].lttd84;
            item.WRZ = t[num].wrz;
            item.GRZ = t[num].grz;
            item[s[n] + "MAXZ"] = SetNull(t[num].maxz) != "" ? Number(t[num].maxz).toFixed(2) : "—";
            item[s[n] + "MINZ"] = SetNull(t[num].minz) != "" ? Number(t[num].minz).toFixed(2) : "—";
            arrMaxZ.push(item);
          }
          else {
            try {
              arrMaxZ[num].STNM = t[num].stnm;
              arrMaxZ[num][s[n] + "MAXZ"] = SetNull(t[num].maxz) != "" ? Number(t[num].maxz).toFixed(2) : "—";
              arrMaxZ[num][s[n] + "MINZ"] = SetNull(t[num].minz) != "" ? Number(t[num].minz).toFixed(2) : "—";
            } catch (e) {

            }
          }
          if (t[num].STCD == "63201999") {
            if (THSWMin > t[num].minz) {
              THSWMin = t[num].minz;
              DD_NAME = SOLUTIONIDNAME[s];
            }
          }
        }
        if (t.length > 0) {
          // console.error("t", t)
          var strJson = t.filter(function (res) {
            return res["wrz"] != undefined && res["wrz"] != 0;
          })
          var arrJsonWRZ = t.filter(function (its) {
            if (SetNull(its.grz) != "") {
              return Number(its.maxz) >= Number(its.wrz) && Number(its.maxz) < Number(its.grz);
            } else {
              return Number(its.maxz) >= Number(its.wrz)&&Number(its.wrz)>0;
            }
          });
          // console.error("arrJsonWRZ", arrJsonWRZ)
          strJson = t.filter(function (res) {
            return res["grz"] != undefined && res["grz"] != 0;
          })
          var arrJsonGRZ = strJson.filter(function (its) {
            return Number(its.maxz) >= Number(its.grz)&&Number(its.grz)>0;
          });
          var name = stcdList[n];
          _XData.push({ "DD_NAME": name, "WRZ_COUNT": arrJsonWRZ.length, "GRZ_COUNT": arrJsonGRZ.length });
          // total += arrJsonWRZ.length + arrJsonGRZ.length;
          total=t.length;
          colunm.push({ name: s[n] + "MAXZ", label: stcdList[n] });
        }
        // console.error("_XData", _XData, total);
        SWData.value = arrMaxZ;
        SWHeader.value = colunm;
        CJData.value = _XData;
        CJCount.value = total;
        datekey.value = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
        window.loadingHide();
      }
    }
  }).catch(err => { });
}
function loadYBList(time) {
  var strParam = { solutionid: DD_ID.value, typeID: "1", tm: time };
  api.loadMODEYBList(strParam).then(res => {  
     JosnSel(res, "SelAll");
  }).catch(err => { });
}
function SetSDEGC(time) {  
    var strParam = { taskID: $.data(myData, "taskID"),time: time };
    apiHuishui.modeGetResultAllModelByTime(strParam).then(res => {  
       JosnSel(res, "GetResultAllModelByTime");
    }).catch(err => { });
}
const WQybdrplist = ref([]);
function JosnSel(data, typeID) {
  if (typeID == "MODE_DD_SOLUTIONTZSel") {
    DDData.value = data.data;
    if (data.data.length > 0) {
      var item = data.data[0];
      // console.error(item)
      var STIME = SetNull(item.DD_TM) != '' ? dayjs(convertToDate(item.DD_TM)).format("YYYY-MM-DD HH:mm:ss") : '';
      var ETIME = SetNull(item.DD_CHECKBY) != '' ? dayjs(convertToDate(item.DD_CHECKBY)).format("YYYY-MM-DD HH:mm:ss") : '';
      $.data(myData, "STIME", STIME);
      $.data(myData, "ETIME", ETIME);
      $.data(myData, "DD_NAME", item.DD_NAME);
      $.data(myData, "taskID",item.DD_FOR)
      
      DD_ID.value=item.DD_ID;
      progesstimeObj.value = {
        startTime: STIME,
        endTime: ETIME,
        currentTime: STIME,
        stopTime: ETIME,
        formatFooter: "MM-DD",
        formatTooltip: "MM-DD HH:00",
        formatTooltipDay: "YYYY-MM-DD",
        formatTooltipFull: "YYYY-MM-DD HH:mm:00",
        delay: 1500,
        animateAfter: reviceProgessTime
      };
    }
    DDdatekey.value = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  } 
  else if (typeID == "SelAll") {//水位、流量数据
    var dataYBSW = data.data;
    var strResult = dataYBSW;
    PointMark.addYBSWMark(strResult, DD_ID.value, $.data(myData, "STIME"), $.data(myData, "ETIME"), riverMarker.value,);
  }
  else if (typeID == "GetResultAllModelByTime") {    
    //  console.error('河道结果results',data.results);
     $.data(myData, "AllModelByTimeData", data.results);
     queryComplete();
  }
}
function queryComplete() {
    var features = SHSWZZModeRiver2000.features;
    PointMark.queryCompleteSWLL($.data(myData, "AllModelByTimeData"),features,"水位");
}

// 雨量初始值全部为0
var ybdrplist = ref([]);
function SpanItem(obj) {
  if (obj == "riverMarker") {
    loadYBList($.data(myData, "time"));
  }
}
var _onerelitu = false;
//收取子组件消息：
var hoursNumber = ref(0);
function reviceProgessTime(msg) {
  var time = dayjs(new Date(msg.time)).format("YYYY-MM-DD HH:mm:ss");
  tmCenterName.value = $.data(myData, "DD_NAME");
  tmCenter.value = $.data(myData, "DD_NAME") + "(" + dayjs(new Date(msg.time)).format("M月D日H时") + ")";
  var hours = getDateDiff($.data(myData, "STIME"), time, 'hour');
  hoursNumber.value = hours;
  $.data(myData, "time", time)
  loadYBList(time);
  SetSDEGC(time);
}

const cancel = () => {
  $(".popModel:last-child").hide();
};
function reductionSystem() {
  addAreaLineQS();
}
const tabWQnameType = ref(null);
//传参
provide("DD_ID", DD_ID);
provide("DD_ARR", DD_ARR);
provide("tabWQnameType", tabWQnameType);
provide("ybdrplist", ybdrplist);
provide("tabWQnameArr", ybdrplist);
</script>
 
<style scoped>
.tuli {
  /* width: 130px; */
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
  /* padding: 0px 0px 0px 0px !important; */
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

.progresspanel {
  height: 60px;
  margin: 0px auto 0;
  position: absolute;
  display: block;
  border-radius: 10px;
  z-index: 99;
  background: rgba(0, 17, 33, 0.4) 30% !important;
  width: calc(100% - 80rem) !important;
  right: calc(30rem) !important;
  left: 30rem;
  bottom: 10px;
  padding: 5px 0px;
}

.popModel {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  /* opacity: 0.5; */
  transition: all 1s;
  display: none;
  z-index: 999;
}

.popupContent {
  width: 1300px;
  height: 800px;
  overflow-y: hidden;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* border: 10px solid #fff; */
  background: var(--el-table-bg-colornew);
}

.popupContent>.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  background: var(--popContentHeadbg);
  height: 56px;
  margin: 0px 0px 15px 0px;
}

.popupContent>.head span {
  font-weight: bold;
  font-size: 18px;
  /* color: #21a6ff;
  background: linear-gradient(90deg, #3be1f6 0%, #21a6ff 100%); */
  width: 100%;
  background: #ffffff;
  text-align: center;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.popupContent>.head img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  cursor: pointer;
  margin-right: 10px;
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
  background: var(--popContentHeadbg);
  z-index: 2;
}

:deep(.liSelected) {
  color: var(--sel_wraplabelcolorSel) !important;
  background: var(--popupContentTitleColor);
}


.divArea {
  list-style: none;
  color: #00feff;
  border-color: #00feff;
  width: 200px !important;
  display: inline;
  position: relative;
  left: 0px;
  bottom: 0px;
  top: 5px;
  padding: 0px;
}

.area {
  float: left;
  height: 36px;
  width: 90px;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  background-color: var(--portal);
  border: 1px solid var(--portal);
  color: var(--sel_wraplabelcolor);
}

.divArea li:first-child {
  border-radius: 5px 0 0 5px;
}

.divArea li:last-child {
  border-radius: 0 5px 5px 0;
}

.areaSelect {
  background-color: var(--swDivSelectcolor);
  border: 1px solid var(--swDivSelectcolor);
  color: var(--sel_wraplabelcolorSel);
}

.colork {
            width: 70%;
            height: 80%;
            margin: auto;
        }

        .colorL {
            padding: 10px 0px 10px 0px;
        }

            .colorL p {
                width: 55px;
                margin: 0px auto;
                margin-top: -4px;
            }

        .colorSpan {
            display: inline-block;
            width: 20px;
            height: 30px;
            margin: 0px;
            margin-right: 5px;
        }

        .colorSpanValue {
            margin-top: 7px;
            font-size: 13px;
            color: white;
        }
</style>