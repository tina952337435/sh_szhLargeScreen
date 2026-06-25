<template>
  <!-- 侧边栏 -->
  <aside class="aside">
    <tabToggleZT />
  </aside>
  <!-- 左侧 -->
  <div class="g-lside">
    <div style="width: 100%">
      <TableTFTJ :strJsonData="strJsonData" :key="datekeyAll" />
    </div>
    <div style="width: 100%">
      <EchartYQFP :strJsonData="strJsonData" :key="datekeyAll" />
    </div>
    <div style="width: 100%">
      <TaihuZS :strJsonData="strJsonData" :key="datekeyAll" />
    </div>
  </div>
  <!-- 右侧 -->
  <div class="g-rside">
    <div style="width: 100%">
      <TableZSTJ :strJsonData="strJsonData" :key="datekeyAll" />
    </div>
    <div style="width: 100%">
      <gongchengdd :strJsonData="strJsonData" :key="datekeyAll" />
    </div>
    <div style="width: 100%">
      <fxmeiguitu :strJsonData="strJsonData" :key="datekeyAll" />
    </div>
  </div>

  <!-- 图例 -->
  <div class="tuli">
    图例
    <!-- <img
      src="/images/close.png"
      alt="关闭"
      @click="closeTuli('hide')"
      style="
        width: 22px;
        height: 22px;
        object-fit: cover;
        cursor: pointer;
        float: right;
      "
    /> -->
    <div class="colorL">
      <div style="color: white; padding: 5px">台风等级</div>
      <ul style="padding-inline-start: 0px">
        <li style="float: left; list-style: none">
          <img src="/images/typhoon/1.png" alt />
          热带低压
        </li>
        <li style="float: left; padding-left: 16px; list-style: none">
          <img src="/images/typhoon/2.png" alt />
          热带风暴
        </li>
        <li style="float: left; list-style: none">
          <img src="/images/typhoon/3.png" alt />
          强热带风暴
        </li>
        <li style="float: left; list-style: none">
          <img src="/images/typhoon/4.png" alt />
          台风
        </li>

        <li style="float: left; list-style: none">
          <img src="/images/typhoon/5.png" alt />
          强台风
        </li>

        <li style="float: left; padding-left: 29px; list-style: none">
          <img src="/images/typhoon/6.png" alt />
          超强台风
        </li>
      </ul>
    </div>
    <!-- <div class="colorL">
      <div style="color: white; clear: both; padding: 5px">预报台</div>
      <ul style="padding-inline-start: 0px">
        <li style="float: left; list-style: none">
          <img
            src="/images/typhoon/forecast-01.png"
            style="vertical-align: 4px"
            alt
          />
          中国
        </li>
        <li style="float: left; padding-left: 16px; list-style: none">
          <img
            src="/images/typhoon/forecast-02.png"
            style="vertical-align: 4px"
            alt
          />
          中国香港
        </li>
        <li style="float: left; list-style: none">
          <img
            src="/images/typhoon/forecast-03.png"
            style="vertical-align: 4px"
            alt
          />
          日本
        </li>
        <li style="float: left; padding-left: 16px; list-style: none">
          <img
            src="/images/typhoon/forecast-04.png"
            style="vertical-align: 4px"
            alt
          />
          中国台湾
        </li>
        <li style="float: left; list-style: none">
          <img
            src="/images/typhoon/forecast-05.png"
            style="vertical-align: 4px"
            alt
          />
          美国
        </li>
      </ul>
    </div> -->
  </div>

  <div id="tmCenter" class="tmCenter">
    {{ tmCenter }}
    <span
      style="padding-left: 30px; vertical-align: -3px; cursor: pointer"
      @click="openFaAnMenu"
    >
      <el-icon><Tickets /></el-icon>
    </span>
  </div>

  <!--方案选择-->
  <div class="famenu">
    <div id="FHMX">
      <span
        class="out"
        id="outFangan"
        @click="closeDislog('famenu')"
        style="position: absolute; right: 5px; top: 5px"
        >×</span
      >
    </div>
    <div class="famenuTitle">
      台风专题列表<span id="tfCount">(专题数量：{{ tfCount }})</span>
    </div>
    <div id="dataFHMX" style="">
      <ul class="famenuul">
        <li
          v-for="station in tfztData"
          :key="station.id"
          :id="station.status"
          :class="station.id === tfztid ? 'li-selected' : ''"
          @click="onOpenFang(station.id)"
        >
          {{ station.status }}{{ station.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import "@/assets/styles/style.css";
import { useStore } from "vuex";

import EchartYQFP from "@/components/menu/tfzt/EchartYQFP.vue";
import TableTFTJ from "@/components/menu/tfzt/TableTFTJ.vue";
import TaihuZS from "@/components/menu/sq/TaihuZS.vue";

import TableZSTJ from "@/components/menu/tfzt/TableZSTJ.vue";
import gongchengdd from "@/components/menu/tfzt/gongchengdd.vue";

import fxmeiguitu from "@/components/menu/tfzt/fxmeiguitu.vue";

import tabToggleZT from "@/components/tab/tabToggleZT.vue";
import { getGeojson } from "@/api/Common/api.js";

import {
  dyCenter,
  destroy,
  globallevel,
  globalalign,
  map,
  labels,
  setLayerToolTip,
  addAreaLineQS,
  removeEntityByName,
} from "@/utils/ArcGis/MapComm.js";
import apityphoon from "@/api/typhoon/index.js";

import {
  onMounted,
  ref,
  shallowRef,
  defineAsyncComponent,
  nextTick,
  inject,
  provide,
  reactive,
  onUnmounted,
  getCurrentInstance,
} from "vue";
// ElConfigProvider：时间选择框汉化
import {
  ElDatePicker,
  ElRadio,
  ElButton,
  ElConfigProvider,
  ElRadioGroup,
} from "element-plus";
import { SetNull, groupBy, GetJosns, sortObjectArray } from "@/api/ComUnit.js";
import apizonglan from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import * as PointMark from "@/utils/ArcGis/PointMark.js";
import $ from "jquery";
import { useRoute } from "vue-router";

import * as myTyphoonMark from "@/utils/ArcGis/myTyphoon.js";
import { convertToDate } from "@/api/dateUtil.js";

const route = useRoute();

// 获取当前主题
const _theme = localStorage.getItem("curTheme");

var CurrentLayerVal = ref("");
const strJsonData = ref({});
const tfztData = ref([]);
const datekeyAll = ref(null);

const tmCenter = ref("");
const tfCount = ref(0);
const tfztid = ref("");
onMounted(() => {
  $("#tabtf").addClass("swDivSelect swDiv");
  $("#m_shikZT").addClass("z-crtitem z-crt wow slideInUp link-item");

  $(".longzhaoceng").hide();
  CurrentLayerVal.value = localStorage.getItem("CurrentLayer");
  WQTab();
  window.curDataRefresh();
  myTyphoonMark.drawWarningLineLayer();
});

function drpRaderImg() {
  var colorList = [];
  colorList.push({ min: 0, max: 2.5, color: "217,249,209,255" });
  colorList.push({ min: 2.5, max: 5, color: "184,245,168,255" });
  colorList.push({ min: 5, max: 10, color: "116,216,108,255" });
  colorList.push({ min: 10, max: 25, color: "64,183,64,255" });
  colorList.push({ min: 25, max: 50, color: "98,183,252,255" });
  colorList.push({ min: 50, max: 100, color: "0,0,254,255" });
  colorList.push({ min: 100, max: 9999, color: "250,0,251,255" });
  var geoJsonUrl = "/json/20240813130000.geojson";
  // geoJsonUrl="/json/20240813131800.geojson";
  getGeojson(geoJsonUrl).then((res) => {
    var strJson = res.res.features;
    var listJson = [];
    if (strJson.length > 0) {
      for (var num = 0; num < strJson.length; num++) {
        var item = strJson[num];
        // listJson.push(item["geometry"]["x"]);
        // listJson.push(item["geometry"]["y"]);
        var strWhere = {};
        strWhere["lgtd"] = item["geometry"]["x"];
        strWhere["lttd"] = item["geometry"]["y"];
        strWhere["drp"] = item["attributes"]["drp"];
        var oneDrpList = colorList.filter(function (evt) {
          return (
            Number(strWhere["drp"]) >= evt["min"] &&
            Number(strWhere["drp"]) < evt["max"]
          );
        });

        if (oneDrpList.length > 0) {
          strWhere["color"] = oneDrpList[0]["color"];
        }
        listJson.push(strWhere);
      }
    }
    let heatData = [];
    if (listJson.length > 0) {
      heatData = listJson.map((item) => {
        return {
          x: item.lgtd,
          y: item.lttd,
          value: item.drp,
        };
      });
    }

    let colorRLTList = [];
    colorRLTList.push({ min: 0, max: 2, color: "#B9F4A9" });
    colorRLTList.push({ min: 2, max: 4, color: "#70DA6E" });
    colorRLTList.push({ min: 4, max: 6, color: "#3EB93F" });
    colorRLTList.push({ min: 6, max: 8, color: "#60B9FF" });
    colorRLTList.push({ min: 8, max: 10, color: "#0000FD" });
    colorRLTList.push({ min: 10, max: 9999, color: "#FF00FA" });
    let maxdrp = Math.max(...heatData.map((obj) => obj.value));
    maxdrp = maxdrp * 30;
  });
}
//自动刷新
var interValWQ;
window.curDataRefresh = function () {
  if (interValWQ != null) {
    clearInterval(interValWQ);
  }
  if ($("#DataRefresh").prop("checked") == true) {
    interValWQ = setInterval(function () {
      refreshData();
    }, 180000); //180000
  }
};

//刷新的方法
function refreshData() {
  var _curDataRefresh = localStorage.getItem("curDataRefresh");
  if (_curDataRefresh == true || _curDataRefresh == "true") {
    WQTab();
  } else {
    if (interValWQ != null && interValWQ != undefined) {
      clearInterval(interValWQ);
    }
  }
}
var tLt;
onUnmounted(() => {
  $(".longzhaoceng").show();
  $("#cesiumContainer_myMapImg").show();
  $(".light").parent().remove();
  if (interValWQ != null) {
    clearInterval(interValWQ);
  }
  if (tLt != null) {
    clearInterval(tLt);
  }

  try {
    var ImageCNNote = map.getLayer("ImageCNNote");
    ImageCNNote.setVisibility(false);
  } catch (error) {}
});

function WQTab() {
  $("#cesiumContainer_myMapImg").hide();
  try {
    var ImageCNNote = map.getLayer("ImageCNNote");
    ImageCNNote.setVisibility(true);
  } catch (error) {}
  clearALL();
  loadTFZT();
}
function clearALL() {
  removeEntityByName();
}

function loadTFZT() {
  var postParam = {
    TYPE: "台风",
    ddwj: "提供2023",
  };
  apityphoon.selectZhuanTiList(postParam).then((res) => {
    JosnSel(res, "TFSel");
  });
}

//******************************* */台风路径代码开始了
const tfbhValue = ref(null);
const tableLJData = ref([]);
const { proxy } = getCurrentInstance();
const iscomObj = ref("0");
const ListISCOMPLETED = ref({});
function GetTyphoonList() {
  var postParam = { tfbh: tfbhValue.value, isYB: "false" };
  apityphoon.GetTyphoonList(postParam).then((res) => {
    JosnSel(res, "TFLJSel");
  });
}
function JosnSel(data, typeID) {
  if (typeID == "TFLJSel") {
    var strJsonTM = [];
    if (data.data[0].points.length > 0) {
      for (var num = 0; num < data.data[0].points.length; num++) {
        var items = data.data[0].points[num];
        items["times"] = dayjs(convertToDate(items["RQSJ2"])).format(
          "MM-DD HH:mm",
        );
        strJsonTM.push(items);
      }
    }
    // tableLJData.value = data.data[0].points;
    tableLJData.value = sortObjectArray(strJsonTM, ["times"], "desc");
    $("#tftitle").html(
      "【<span style='font-weight:600;'>" +
        data.data[0].name +
        "</span>】实况路径",
    );
    // console.error("taifeng",data.data)
    var strJsonList = data.data;
    parentMethodPoint(strJsonList, true, iscomObj.value);
  }
  if (typeID == "TFSel") {
    var strJsonList = data.data;
    if (strJsonList.length > 0) {
      tfCount.value = strJsonList.length;
      tfztData.value = strJsonList;
      FangAnListHtml(tfztData.value[0]);
    }
  }
}
const parentMethodPoint = (res, isCancle, iscomObj) => {
  if (isCancle == true) {
    bindData(res, iscomObj);
  } else {
    myTyphoonMark.clearTaiFeng(isCancle);
  }
};

const LDSTime = ref([]);
const LDETime = ref([]);
const curTHBH = ref("");
const curTHBHBBJ = ref("202413");

var strHtml = "";
var strHtmlLabel = ref("");
var distanceTF = ref([]);
function bindData(data, iscomObj) {
  myTyphoonMark.GetTyphoonLSLJData(data, iscomObj);
  if (data[0].forecast != undefined) {
    //画（预报台）台风路线
    myTyphoonMark.GetResultTFLX_YBS(data[0].forecast);
  }
  // 获取第一条数据
  LDETime.value = data[0].points[0];
  // 获取最后一条数据
  LDSTime.value = data[0].points.slice(-1)[0];
  curTHBH.value = data[0].tfbh;

  LDETime.value.RQSJ2 = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  LDSTime.value.RQSJ2 = dayjs(
    dayjs(LDETime.value.RQSJ2).format("YYYY-MM-DD HH:mm:ss"),
  )
    .add(-2, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
  if (data[0].tfbh == curTHBHBBJ.value) {
    LDSTime.value.RQSJ2 = "2024-09-10 20:00:00";
    LDETime.value.RQSJ2 = "2024-09-11 08:00:00";
  }
  if ($("#QX_LT").hasClass("active")) {
    //雷达选中的情况
    stopCount(); //暂停播放
    var layerIdToRemove = "LDRaderPhoto";
    myTyphoonMark.removeImageryLayerById(layerIdToRemove);
    loadLDRader();
  }
}

function getDistance(lat1, lng1, lat2, lng2) {
  lat1 = lat1 || 0;
  lng1 = lng1 || 0;
  lat2 = lat2 || 0;
  lng2 = lng2 || 0;

  var rad1 = (lat1 * Math.PI) / 180.0;
  var rad2 = (lat2 * Math.PI) / 180.0;
  var a = rad1 - rad2;
  var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  var r = 6378137;
  var distance =
    r *
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );

  return distance;
}

//******************************* */台风路径代码结束了

function openFaAnMenu() {
  $(".u-medialog").hide();
  var famenuDisplay = $(".famenu").css("display");
  if (famenuDisplay == "none") {
    $(".famenu").css("display", "block");
  } else {
    $(".famenu").css("display", "none");
  }
}
//切换方案
function onOpenFang(str) {
  $(".amap-info").css("display", "none");
  tfztid.value = str;
  var faList = tfztData.value;
  var data = faList.filter(function (item) {
    return item.id == str;
  });
  FangAnListHtml(data[0]);
}
function FangAnListHtml(item) {
  strJsonData.value = item;
  tmCenter.value = item.title;
  tfztid.value = item.id;
  tfbhValue.value = item.status;
  GetTyphoonList();
  datekeyAll.value = new Date();
}
//关闭窗口
function closeDislog(type) {
  $("." + type).hide();
}
</script>

<style scoped>
.tuli {
  width: 185px;
  height: 200px;
  color: white;
  font-size: 12px;
  font-size: 0.15rem;
  padding: 0px 5px;
  cursor: pointer;
  position: absolute;
  border-radius: 8px;
  /* bottom: 150px; */
  bottom: 10px;
  height: auto !important;
  left: 24%;
  padding: 0px 10px !important;
  z-index: 2;
  font-size: 14px;
  background: var(--tuli-bg);
}
.famenu {
  width: 280px;
  height: calc(100% - 350px);
  background: url(/images/boxallback.png);
  border: 1px solid #39aacf;
  position: absolute;
  z-index: 999;
  left: calc(50%);
  top: 205px;
  display: none;
}
.famenu ul {
  height: 100%;
  list-style: none;
  overflow-y: auto;
  padding-inline-start: 0px;
}
.famenu ul li {
  height: 35px;
  line-height: 35px;
  color: white;
  font-size: 15px;
  /*text-align: center;*/
  cursor: pointer;
  padding-left: 10px;
}

.famenu ul li:hover {
  background: #081892;
}

.famenu ul li:first-child {
  /*text-align: center;
            font-size: 15px;
            height: 40px;
            background: #011253;*/
}
.famenuTitle {
  text-align: center;
  font-size: 15px;
  height: 40px;
  background: #011253;
  margin: 0px auto;
  width: 90%;
  line-height: 40px;
  margin-top: 5px;
  color: white;
}
#dataFHMX {
  width: 90%;
  margin-left: 5%;
  display: block;
  height: calc(100% - 90px);
}

/* 自定义滚动条样式 */
.famenuul::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.famenuul::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.famenuul::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--popContentHeadbg);
  z-index: 2;
}
.li-selected {
  background: #081892;
}

.out {
  float: right;
  display: block;
  font-size: 26px;
  height: 22px;
  cursor: pointer;
  font-weight: bold;
  margin-top: -5px;
  color: #199eff;
}
</style>
