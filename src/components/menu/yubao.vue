<template>
  <!-- 左侧 -->
  <div class="g-lside">
    <div style="width: 100%">
      <yubaoAreaChart :DD_ARR="DD_ARR" :key="datekey" />
    </div>
    
    <div style="width: 100%">
      <yubaoCJTJ :rainListSW="rainListSW" :key="datekeySW" />
    </div>

    <div style="width: 100%">
      <yubaoLineSL :DD_ARR="DD_ARR" :key="datekeySL" :rainListSL="rainListSL"/>
    </div>

  </div>

  <!-- 右侧 -->
  <div class="g-rside">
    <div style="width: 100%">
      <yubaoMaxTable :DD_ARR="DD_ARR" :rainListSW="rainListSW" :key="datekeySW"  @parentMethodshowDynamicLayers="parentMethodshowDynamicLayer"/>
    </div>

    <div style="width: 100%">
      <yubaoDanZhanLineChart :ZhanDanSW="ZhanDanSW" :DD_ARR="DD_ARR" :key="datekeySWGC" />

    </div>
    <div style="width: 100%">
      <yubaoDanZhanLineCW :ZhanDanCW="ZhanDanCW" :DD_ARR="DD_ARR" :key="datekeyCWGC" />
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
      <img alt src="/images/icon_51.png" style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block">
      <span style="padding-left: 2px; color: white; vertical-align: 15px; margin-left: 2px">正常</span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <!-- <input style="vertical-align: 15px" @click="getTLObj('cb_waterCJ')" v-model="cb_waterCJ" type="checkbox"
      checked="checked" />-->
      <img alt src="/images/cheng2.png" style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block">
      <span style="padding-left: 2px; color: white; vertical-align: 15px">超警</span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <!-- <input style="vertical-align: 15px" @click="getTLObj('cb_waterCB')" v-model="cb_waterCB" type="checkbox"
      checked="checked" />-->
      <img alt src="/images/hong.png" style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block">
      <span style="padding-left: 2px; color: white; vertical-align: 15px">超保</span>
    </div>
    
  </div>

  <!-- 右侧天数的切换 -->
  <div id="sqTopToggle" style="height: 40px; position: absolute; top: 8.5rem; right: 30rem;z-index: 2;">
    <div class="shdswDiv" id="sswz">
      <div class="swDiv" style="width:90px;">
        <div class="sel_wrap" style="position:relative;">
          <label @click="showItem('FANGANLIST')">方案切换</label>
          <img src="/images/icon_select.png" style="position:absolute;right:0px;margin-top: 4px;transform: rotate(90deg);"
            onclick="showItem('FANGANLIST')">
          <ul class="el-dropdown-menu" id="FANGANLIST"
            style="width:250px; margin-left: 3px;height:400px;overflow-y:auto;margin-top:5px;position:absolute;left:-260px;top: -5px;border: 2px solid var(--popContentHeadbgyb) !important;text-align: center;background-color: var(--boxtitlebg);;">
             <li v-for="(item, index) in diaoduList" :id="item.dd_ID" :class="liSelectedF==item.dd_ID?'liSelected':''" @click="liClick(item)" style="font-size:15px; border-bottom: 1px solid #afcfcf;line-height: 30px;color: var(--sel_wraplabelcolor);"> 
               {{ item.dd_NAME }}
             </li>
          </ul>
        </div>
      </div>
      <div class="shdswDiv">
        <div class="swDiv" id="hourYS" style="width:90px;" @click="WindowOpen()">
          <div class="sel_wrap">
            <label style="padding: 0px 5px;">模型演算</label>
          </div>
        </div>
      </div>
      <!-- <div class="shdswDiv">
        <div class="swDiv" id="hourYS" style="width:90px;" @click="diaodu()">
          <div class="sel_wrap">
            <label style="padding: 0px 5px;">推荐调度</label>
          </div>
        </div>
      </div> -->
    </div>
  </div>

  <!--播放条-->
  <div class="progresspanel">
    <progresstime :progesstimeObj="progesstimeObj" :key="datekey" @progresstime="reviceProgessTime" />
  </div>



  <div id="tmCenter" class="tmCenter">{{ tmCenter }}</div>



  <!--单站弹窗-->
  <div class="popModel" id="mypopModel">
    <div class="popupContent">
      <div class="head">
        <span></span>
        <img src="/images/close.png" alt="关闭" @click="cancel()">
      </div>
      <component :is="currentComponentTanchu" @parentMethods="parentMethod"></component>
    </div>
  </div>
</template>

<script setup>

import '@/assets/styles/style.css';
import yubaoAreaChart from "@/components/menu/yb/yubaoAreaChart.vue";
import yubaoMaxTable from "@/components/menu/yb/yubaoMaxTable.vue";
import yubaoDanZhanLineChart from "@/components/menu/yb/yubaoDanZhanLineChart.vue";
import yubaoCJTJ from "@/components/menu/yb/yubaoCJTJ.vue";
import yubaoLineSL from "@/components/menu/yb/yubaoLineSL.vue";
import yubaoDanZhanLineCW from "@/components/menu/yb/yubaoDanZhanLineCW.vue";
import yubaoWQTable from "@/components/menu/yb/yubaoWQTable.vue";
import progresstime from "@/components/menu/yb/progress-time.vue";
import EchartSQRiver from "@/components/menu/sq/EchartSQRiver.vue";

import $ from "jquery";
import { onMounted, ref, provide, defineAsyncComponent, reactive, onUnmounted, watch, h, nextTick } from "vue";
import { useStore } from "vuex";
import * as PointMark from "@/utils/ArcGis/PointMark.js";

import { GetJosns, SetNull, sortObjectArray, groupBy } from "@/api/ComUnit.js";
import { destroy,removeEntityByName,addAreaLineQS,dyCenter } from "@/utils/ArcGis/MapComm.js";
import dayjs from "dayjs";
import api from "@/api/mode/index.js";
import apizonglan from "@/api/zonglan/index.js";
import { getDateDiff } from "@/api/dateUtil";


import { getGeojson } from '@/api/Common/api';
import Dialog from "@/api/utils/Dialog.js";
import { ElButton, ElMessage, } from "element-plus";
import { convertToDate } from "@/api/dateUtil.js";

const CLQtableData = ref([]);
const rainListAll = ref([]);
const resultWQDATA = ref([]);
const rainListSW = ref([]);
const datekeySW = ref(null);
const rainListSL = ref([]);
const datekeySL = ref(null);
const datekeySWGC = ref(null);
const datekeyCWGC = ref(null);
// 获取当前主题
const _theme = localStorage.getItem("curTheme");

const store = useStore();
const { viewer } = store.state;
const datekey = ref(null);
const datekeyWQ = ref(null);
var DD_ID = ref(null); //调度方案编号
var DD_ARR = ref({}); //调度方案编号
var DD_ARRWQ = ref({}); //圩区方案
// 圩区方案编号
var wqddID = ref(null);
var progesstimeObj = ref({});
var myData = [];
const riverMarker = ref(true);
var wqstrJson = ref(null);
const AreaName = ref('太湖分区预报')
const currentComponentTanchu = ref(null);
const tmCenter = ref(null);
const heatMapFlag = ref(false);
const diaoduList=ref([]);

onUnmounted(() => {
  clearALL();
});
onMounted(async () => {
  $("#tabyubao").addClass('swDivSelect swDiv');
  $("#m_yubao").addClass('z-crtitem z-crt wow slideInUp link-item');
  clearALL();
  BaseZhan();
  loadFangList();
  reductionSystem();
});
const ZhanDanCW = ref([]);
const ZhanDanSW = ref([]);
function BaseZhan() {
  
  var strParam = {pattem: "1"}
  api
    .loadSlTongjiData(strParam)
    .then(res => {
        var strParam = {pattem: "1"};
        api
        .loadjisuanzhanData(strParam)
        .then(reszhan => {      
            $.data(myData, "ZhanDanData", reszhan.data);
            // console.error("err", reszhan.data);
            var ZhanDanData=reszhan;
            var tjDataTemp = res.data.filter(function (e) {
              return e.id == "a9bc40bb55680cec";//预报水位站
            });
            if (tjDataTemp.length > 0) {
              var STCDS = tjDataTemp[0].stcd;
              var dataTemp = ZhanDanData.data.filter(function (e) {
                return STCDS.indexOf(e.stcd) > -1;
              });
              ZhanDanSW.value = dataTemp;
              datekeySWGC.value=new Date();
              // console.error("预报水位站", dataTemp)
            }
            var _tjDataTemp = res.data.filter(function (e) {
              return e.id == "3907b92c8c69ee7a";//预报潮位站
            });
            if (_tjDataTemp.length > 0) {
              var _STCDS = _tjDataTemp[0].stcd;
              var dataTemp = ZhanDanData.data.filter(function (e) {
                return _STCDS.indexOf(e.stcd) > -1;
              });
              ZhanDanCW.value = dataTemp;
              datekeyCWGC.value=new Date();
              // console.error("预报潮位站", dataTemp)
            }
        })
        .catch(err => { console.error(err);});
    })
    .catch(err => { console.error(err);});
}
function clearALL() {
  try {
    removeEntityByName();
  } catch (error) { }
}
function diaodu() {
  const props = {};
  props["datasource"] = "YB";
  props["pid"] = DD_ID.value;
  props["pathname"] = "yubao";
  var day1 = DD_ARR.value.STIME;
  var day2 = dayjs(DD_ARR.value.STIME).add(1, "day").format("YYYY-MM-DD HH:mm:ss");
  var day3 = dayjs(DD_ARR.value.STIME).add(2, "day").format("YYYY-MM-DD HH:mm:ss");
  props["etime"] = day1 + "," + day2 + "," + day3;
  // console.error("etime", day1, day2, day3)
  // console.error("props", props)
  //ChildVue为弹窗中嵌入的slot
  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/wq/WQDiaoduAll.vue")
  );
  Dialog.open({ title: "推荐调度", widh: 1200, heig: 800 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })

}
//方案列表
function loadFangList() {
  var strParam = {};
  strParam["PageSize"] = 10;
  strParam["PageIndex"] = 0;
  api.loadFangList(strParam).then(res => {  
    JosnSel(res, "MODE_DD_SOLUTIONSel");
  }).catch(err => { console.error("API 请求失败:", err); });
}
function loadYBList(time) {
  var strParam = { solutionid: DD_ID.value, typeID: "1", tm: time };
  api.loadMODEYBList(strParam).then(res => {  
     JosnSel(res, "SelAll");
  }).catch(err => { });
}
function JosnSel(data, typeID) {
  if (typeID == "MODE_DD_SOLUTIONSel") {
    if (data.data.length > 0) {
      $.data(myData, "DD_SOLUTIONList", data.data);
      diaoduList.value=data.data;
      var item = data.data[0];
      
        liSelectedF.value=item.dd_ID;
        item.dd_CARRYBY = SetNull(item.dd_CARRYBY) != '' ? dayjs(convertToDate(item.dd_CARRYBY)).format("YYYY-MM-DD HH:mm:ss") : '';
        item.dd_CARRYTM = SetNull(item.dd_CARRYTM) != '' ? dayjs(convertToDate(item.dd_CARRYTM)).format("YYYY-MM-DD HH:mm:ss") : '';
        item.dd_CHECKBY = SetNull(item.dd_CHECKBY) != '' ? dayjs(convertToDate(item.dd_CHECKBY)).format("YYYY-MM-DD HH:mm:ss") : '';
        item.dd_TM = SetNull(item.dd_TM) != '' ? dayjs(convertToDate(item.dd_TM)).format("YYYY-MM-DD HH:mm:ss") : '';

        var nameStr = item.dd_NAME;
        // if (num == 0) {
          $("#qxDANWEI").parent().find("label").html(nameStr);
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
            DD_CARRYBY: DD_CARRYBY
          };
          DD_ARR.value = itemDD;
          $.data(myData, "DD_ARR", itemDD);
          $.data(myData, "progesstimeObjTM", item);
          progesstimeObj.value = {
            startTime: STIME,
            endTime: ETIME,
            currentTime: STIME,
            stopTime: ETIME,
            formatFooter: "MM-DD",
            formatTooltip: "MM-DD HH:00",
            formatTooltipDay: "yyyy-MM-DD",
            formatTooltipFull: "yyyy-MM-DD HH:mm:00",
            delay: 1500,
            animateAfter: reviceProgessTime
          };
          datekey.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
           datekeySWGC.value=new Date();
              datekeyCWGC.value=new Date();
        // }
    }
    loadSW();
    loadSL();
  } 
  else if (typeID == "SelAll") {
    var dataYBSW = data.data;
    var strResult = [];
    if (dataYBSW.length > 0) {
      strResult = dataYBSW.filter(function (e) {
        if (SetNull(e.tm) != "") {
          e.tm = dayjs(convertToDate(e.tm)).format("YYYY-MM-DD HH:mm:ss")
        }
        if (SetNull(e.maxdatatm) != "") {
          e.maxdatatm = dayjs(convertToDate(e.maxdatatm)).format("YYYY-MM-DD HH:mm:ss")
        }
        return e;
      })
    }
    PointMark.addYBSWMark(strResult, DD_ID.value, DD_ARR.value.STIME, DD_ARR.value.ETIME, riverMarker.value,);

  } 
  else if (typeID == "SWSel") {
    rainListSW.value = data.data;
    datekeySW.value = new Date();
  } 
  else if (typeID == "SLSel") {
    rainListSL.value = data.data;
    datekeySL.value = new Date();
  }
}
function loadSW() {
  window.loadingShow();
  var strWhere = {
    "solutionid": DD_ID.value,
    "data_TYPE": "1"
  };
  api.loadMODELSINGRESULT(strWhere)
		.then(res => {
       JosnSel(res, "SWSel");
       window.loadingHide();
		})
		.catch(err => { }); 
}
function loadSL() {
  window.loadingShow();
  //水量分布
  var s_where = { dd_id: DD_ID.value };
  api.loadAreajinchusl(s_where).then(res => {    
    JosnSel(res, "SLSel");    
    window.loadingHide();
  }).catch(err => { 
  });
}
// 雨量初始值全部为0
var ybdrplist = ref([]);
const RainList = ref([]);
function showItem(id) {
  var obj = $("#" + id);
  var dis = obj.css("display");
  if (dis == "block") {
    obj.css("display", "none");
  } else {
    obj.css("display", "block");
  }
}

function SpanItem(obj) {
  if (obj == "riverMarker") {
    loadYBList($.data(myData, "time"));
  }
}
var _onerelitu = false;
//收取子组件消息：
var hoursNumber = ref(0);
function reviceProgessTime(msg) {
  // console.error("msgmsgmsgmsgmsgmsgmsgmsg", msg)
  var time = dayjs(new Date(msg.time)).format("YYYY-MM-DD HH:mm:ss");
  tmCenter.value = dayjs(new Date(msg.time)).format("YYYY年M月D日H时");
  var dataListTemp = $.data(myData, "DD_SOLUTIONList");
  var result = [];
  if (SetNull(dataListTemp) != "") {
    result = dataListTemp.filter(function (evt) {
      return evt["dd_ID"] == DD_ID.value;
    })
  }
  var hours = getDateDiff(dayjs(result[0]["dd_TM"]).format("YYYY-MM-DD HH:mm:ss"), time, 'hour');
  hoursNumber.value = hours;
  $.data(myData, "time", time);
  loadYBList(time);
}


function WindowOpen() {
  const type = "模型预报";
  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/yb/Initialization.vue")
  );
  currentComponentTanchu.value = ChildVue;
  $(".popupContent").css({ width: "1300px", height: "800px" })
  $(".popupContent .head span").html(type);
  $(".popModel").show();
}

const cancel = () => {
  $(".popModel:last-child").hide();
};
function reductionSystem() {
  addAreaLineQS();
}
const tabWQnameType = ref(null);
var rainListName = ref(null);

const parentMethod = res => {
  $("#mypopModel").hide();
  ybdrplist = res;
  YLData(res);
};
function parentMethodshowDynamicLayer(item) {
 dyCenter (item[0],item[1]);
}
const liSelectedF=ref("");
function liClick(item){
  clearALL();
  liSelectedF.value=item.dd_ID;
      // $("#FANGANLIST li").removeClass("liSelected");
      // $(this).addClass("liSelected");
      $("#FANGANLIST").css("display", "none");
      DD_ID.value = item.dd_ID;
        var STIME = item.dd_TM;
        var ETIME = item.dd_CHECKBY;
        var DD_STANA = Number(item.dd_STANA);
        var DD_CARRYBY = item.dd_CARRYBY;
        var itemDD = {
          gcTime: ETIME,
          DD_ID: item.dd_ID,
          ZU_ID: item.dd_MIND,
          STIME: STIME,
          ETIME: ETIME,
          DD_STANA: DD_STANA,
          DD_CARRYBY: DD_CARRYBY
        };
        DD_ARR.value = itemDD;

        $.data(myData, "DD_ARR", itemDD);
        $.data(myData, "progesstimeObjTM", item);
        progesstimeObj.value = {
          startTime: STIME,
          endTime: ETIME,
          currentTime: STIME,
          stopTime: ETIME,
          formatFooter: "MM-DD",
          formatTooltip: "MM-DD HH:00",
          formatTooltipDay: "yyyy-MM-DD",
          formatTooltipFull: "yyyy-MM-DD HH:mm:00",
          delay: 1500,
          animateAfter: reviceProgessTime
        };
        datekey.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
        datekeySWGC.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
        datekeyCWGC.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
        datekeySW.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
        datekeySL.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
}
//传参
provide("DD_ID", DD_ID);
provide("DD_ARR", DD_ARR);
// provide("DD_ARRWQ", DD_ARRWQ);
// provide("rainListAll", rainListAll);
// provide("wqddID", wqddID);
provide("tabWQnameType", tabWQnameType);
provide("ybdrplist", ybdrplist);
provide("tabWQnameArr", ybdrplist);
</script>
 
<style scoped>
.tuli {
  width: auto;
  height: 200px;
  color: white;
  font-size: 12px;
  font-size: 0.15rem;
  padding: 0px 5px 15px 5px;
  cursor: pointer;
  position: absolute;
  border-radius: 8px;
  bottom: 15px;
  height: auto !important;
  right: 24%;
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
  background: var(--mtabletrcolor);
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
</style>