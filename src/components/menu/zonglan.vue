<template>
  <!-- 左侧tab切换 -->
  <!-- 侧边栏 -->
  <aside class="aside">
    <tabToggleSQ />
  </aside>

  <!-- 左侧 -->
  <div class="g-lside">
    <div style="wistrresulth: 100%">
      <EchartShanghai />
    </div>
    <div style="wistrresulth: 100%">
      <hourSQTJ
        :strJsonData="strJsonDataYL"
        :stime="ylStime"
        :etime="ylEtime"
        :key="datekeyAllYL"
      />
    </div>
    <div style="wistrresulth: 100%">
      <TableSWJC
        :strJsonData="strJsonData"
        :key="datekeyAll"
        @parentMethodshowDynamicLayers="parentMethodshowDynamicLayer"
      />
    </div>
  </div>
  <!-- 右侧 -->
  <div class="g-rside">
    <div style="width: 100%">
      <TaihuSW />
    </div>
    <div style="width: 100%">
      <TableWind :key="datekeyAll" />
    </div>
    <div style="width: 100%">
      <zonglanyubao />
    </div>
  </div>

  <div class="tuli">
    <div>
      <el-switch
        class="switch-xs iconMarker"
        @click="SpanItem('riverMarker')"
        v-model="riverMarker"
      />
      <span style="vertical-align: -10px; margin-left: 50px"> 标注 </span>
    </div>
    <div>
      <el-switch
        class="switch-xs"
        @click="SpanItem('riverLX')"
        v-model="riverLX"
      />
      <span style="vertical-align: -10px; margin-left: 50px">流态 </span>
    </div>
    <div>
      <el-switch
        class="switch-xs iconMarker"
        @click="SpanItem('riverSWMarker')"
        v-model="riverSWMarker"
      />
      <span style="vertical-align: -10px; margin-left: 50px">水位</span>
    </div>
    <div>
      <el-switch
        class="switch-xs iconMarker"
        @click="SpanItem('riverLLMarker')"
        v-model="riverLLMarker"
      />
      <span style="vertical-align: -10px; margin-left: 50px">流量</span>
    </div>
    <div>
      <el-switch
        class="switch-xs iconMarker"
        @click="SpanItem('yldzmMarker')"
        v-model="yldzmMarker"
      />
      <span style="vertical-align: -10px; margin-left: 50px">等值面</span>
    </div>

    <!-- <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <input style="vertical-align: 15px" @click="getTLObj('cb_waterZC')" v-model="cb_waterZC" type="checkbox"
        checked="checked" />
      <img alt="" src="/images/icon_51.png"
        style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block" />
      <span style="padding-left: 2px; color: white; vertical-align: 15px; margin-left: 2px">
        正常
        (<span id="waterZC" style="color: rgb(6 255 255); font-size: 14px">{{ waterZCCount }}</span>)
      </span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <input style="vertical-align: 15px" @click="getTLObj('cb_waterCJ')" v-model="cb_waterCJ" type="checkbox"
        checked="checked" />
      <img alt="" src="/images/cheng2.png"
        style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block" />
      <span style="padding-left: 2px; color: white; vertical-align: 15px">
        超警
        (<span id="waterCJ" style="color: rgb(6 255 255); font-size: 14px">{{ waterCJCount }}</span>)
      </span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <input style="vertical-align: 15px" @click="getTLObj('cb_waterCB')" v-model="cb_waterCB" type="checkbox"
        checked="checked" />
      <img alt="" src="/images/hong.png"
        style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block" />
      <span style="padding-left: 2px; color: white; vertical-align: 15px">
        超保
        (<span id="waterCB" style="color: rgb(6 255 255); font-size: 14px">{{ waterCBCount }}</span>)
      </span>
    </div>
    <div style="height: 30px; line-height: 30px; padding: 8px 10px">
      <input style="vertical-align: 15px" @click="getTLObj('cb_waterQC')" v-model="cb_waterQC" type="checkbox"
        checked="checked" />
      <img alt="" src="/images/water_qc.png"
        style="wistrresulth: 15px; height: 30px; margin-top: 2px; display: inline-block" />
      <span style="padding-left: 2px; color: white; vertical-align: 15px">
        缺测
        (<span id="waterQC" style="color: rgb(6 255 255); font-size: 14px">{{ waterQCCount }}</span>)
      </span>
    </div> -->
  </div>
  <div class="top-warning">
    <div class="text-xiaolv" id="waterNum">
      <span style="margin-right: 14px">
        <span class="warning-title">共计：</span>
        <span class="numCJ" style="color: #26f233">{{
          strJsonData.length
        }}</span>
        <span class="warning-danwei">个</span>
      </span>
      <span style="margin-right: 14px">
        <span class="warning-title">
          <img
            alt=""
            src="/images/cheng2.png"
            style="wistrresulth: 15px; height: 30px; vertical-align: -13px"
          />
          超警：
        </span>
        <span class="numCJ">{{ waterCJCount }}</span>
        <span class="warning-danwei">个</span>
      </span>
      <span style="margin-right: 14px">
        <span class="warning-title">
          <img
            alt=""
            src="/images/hong.png"
            style="wistrresulth: 15px; height: 30px; vertical-align: -13px"
          />
          超保：
        </span>
        <span class="numCB">{{ waterCBCount }}</span>
        <span class="warning-danwei">个</span>
      </span>
    </div>
  </div>
  <Mapbiaozhu />
</template>
<script setup>
import EchartShanghai from "@/components/menu/yq/EchartShanghai.vue";
import hourSQTJ from "@/components/menu/yq/hourSQTJ.vue";
import TableSWJC from "@/components/menu/sq/TableSWJC.vue";
import zonglanyubao from "@/components/menu/yb/zonglanyubao.vue";
import TaihuSW from "@/components/menu/sq/TaihuSW.vue";
import Mapbiaozhu from "@/components/untils/Mapbiaozhu.vue";
import TableWind from "@/components/menu/zonglan/TableWind.vue";
import { onMounted, ref, nextTick, onUnmounted, provide, reactive } from "vue";
import api from "@/api/zonglan/index.js";
import apidzxm from "@/api/zonglan/dzxmIndex.js";
import dayjs from "dayjs";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import $ from "jquery";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import {
  CreateImageLayer,
  removeEntityByName,
  dyCenter,
  addAreaLineQS,
  setZOOM,
  RemoveLayer,
  map,
} from "@/utils/ArcGis/MapComm.js";
import * as PointMark from "@/utils/ArcGis/PointMark.js";

import szhStationData from "@/assets/json/szhStation.json";

import tabToggleSQ from "@/components/tab/tabToggleSQ.vue";

const route = useRoute();
const store = useStore();
const { viewer } = store.state;
const riverLX = ref(true);
const riverMarker = ref(true);
const riverSWMarker = ref(true);
const riverLLMarker = ref(false);
const yldzmMarker = ref(false);

const stime = ref({});
const etime = ref({});
const strJsonDataNew = ref([]);
const strJsonData = ref([]);
const strJsonDataLL = ref([]);
const strJsonDataYL = ref([]);
const datekeyAll = ref(null);
const datekeyAllYL = ref(null);
const cb_waterZC = ref(true),
  cb_waterCJ = ref(true),
  cb_waterCB = ref(true),
  cb_waterQC = ref(false);
const waterZCCount = ref(0),
  waterCJCount = ref(0),
  waterCBCount = ref(0),
  waterQCCount = ref(0);

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const btnName = ref("water");

const currentWater = ref(125.89);
const predictedIncrease = ref(-12.3);
const totalCapacity = ref(154.47);
onMounted(() => {
  $(".light").parent().remove();
  $("#tabzl").addClass("swDivSelect swDiv");
  $("#m_shik").addClass("z-crtitem z-crt wow slideInUp link-item");
  var now = new Date();
  etime.value = dayjs(now).add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
  stime.value = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
    .add(-2, "hour")
    .format("YYYY-MM-DD HH:mm:ss");

  setTimeout(function () {
    clearALL();
    addAreaLineQS();

    Weacontent();
    WeacontentYL();
    window.curDataRefresh();
  }, 800);
});

const stcdVal = ref("");
const stnmVal = ref("");
const resultDataSL = ref([]);
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
};
//刷新的方法
function refreshData() {
  var _curDataRefresh = localStorage.getItem("curDataRefresh");
  if (_curDataRefresh == true || _curDataRefresh == "true") {
    Weacontent();
  } else {
    if (interVal != null && interVal != undefined) {
      clearInterval(interVal);
    }
  }
}

function Weacontent() {
  $(".light").parent().remove();
  var now = new Date();
  etime.value = dayjs(now).add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
  stime.value = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
    .add(-2, "hour")
    .format("YYYY-MM-DD HH:mm:ss");

  window.loadingShow();
  var strParam = {};
  strParam["pid"] = "2026031114184492913-3";
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  api.stPptnWater(strParam).then((res) => {
    strJsonData.value = res.data;
    datekeyAll.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"))
      .add(6, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
    SWload();
    setTimeout(function () {
      if (riverLX.value) {
        PointMark.readJosn(viewer);
      }
    }, 100);
    window.loadingHide();
  });
}
function SWload() {
  var zcCount = 0,
    cjCount = 0,
    cbCount = 0,
    qcCount = 0;
  const strJson = [];
  var strResult = strJsonData.value;
  if (strJson.length > 0) {
    for (var i = 0; i < strJson.length; i++) {
      var item = strJson[i];
      var z = "";
      if (SetNull(item.upz) != "") {
        z = Number(item.upz).toFixed(2);
      }
      var wrz =
        Number(item.wrz) == 0.0 || item.wrz == "—"
          ? 99
          : Number(item.wrz).toFixed(2);
      var grz =
        Number(item.grz) == 0.0 || item.grz == "—"
          ? 99
          : Number(item.grz).toFixed(2);
      item.upz = z;

      if (z == null || z == "") {
        qcCount++;
        if (cb_waterQC.value == true) {
          strResult.push(item);
        }
      } else if (z >= grz) {
        cbCount++;
        if (cb_waterCB.value == true) {
          strResult.push(item);
        }
      } else if (z >= wrz) {
        cjCount++;
        if (cb_waterCJ.value == true) {
          strResult.push(item);
        }
      } else {
        zcCount++;
        if (cb_waterZC.value == true) {
          strResult.push(item);
        }
      }
    }
  }
  waterZCCount.value = zcCount;
  waterCJCount.value = cjCount;
  waterCBCount.value = cbCount;
  waterQCCount.value = qcCount;
  PointMark.addSWMark(
    viewer,
    strResult,
    stime.value,
    etime.value,
    riverMarker.value,
  );
}
function getTLObj(obj) {
  setTimeout(function () {
    SWload();
  }, 100);
}
function SpanItem(obj) {
  if (obj == "riverMarker") {
    if (riverMarker.value) {
      SWload();
      if (riverLLMarker.value) {
        PointMark.addLLMark(strJsonDataLL.value, riverMarker.value);
      }
    } else {
      $(".LabelPlotBeautiful-container").remove();
      $(".gcText").remove();
    }
  } else if (obj == "riverLX") {
    if (riverLX.value == true) {
      PointMark.readJosn(viewer);
    } else {
      // PointMark.removePrimitiveByName(viewer, obj)
      clearALL("centerLineGraphicLayer");
    }
  } else if (obj == "riverSWMarker") {
    if (riverSWMarker.value) {
      SWload();
    } else {
      $(".LabelPlotBeautiful-container").remove();
      RemoveLayer("addSWMark");
    }
  } else if (obj == "riverLLMarker") {
    if (riverLLMarker.value) {
      WeacontentLL();
    } else {
      $(".gcText").remove();
      RemoveLayer("addLLMark");
    }
  } else if (obj == "yldzmMarker") {
    if (yldzmMarker.value) {
      MapRainfall();
    } else {
      var LayerID = "DZMRainLayer";
      var DZMRainLayerGraphicLayer = map.getLayer(LayerID);
      if (DZMRainLayerGraphicLayer != null) {
        DZMRainLayerGraphicLayer.clear();
      }
    }
  }
}
function WeacontentLL() {
  window.loadingShow();
  var strParam = {};
  strParam["pid"] = "2026031114184492913-4";
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  api.stFlowJC(strParam).then((res) => {
    strJsonDataLL.value = res.data;
    PointMark.addLLMark(strJsonDataLL.value, riverMarker.value);
    window.loadingHide();
  });
}
const ylEtime = ref(""),
  ylStime = ref("");
function WeacontentYL() {
  window.loadingShow();
  var now = new Date();
  ylEtime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  ylStime.value = dayjs(now).add(-24, "hour").format("YYYY-MM-DD HH:mm:ss");
  var strParam = {
    pid: "201901101419326076-1-1,201901101419326076-5",
    stime: ylStime.value,
    etime: ylEtime.value,
    pathname: "SUM",
  };
  api.stPptnRain(strParam).then((res) => {
    strJsonDataYL.value = res.data;
    datekeyAllYL.value = new Date();
    YLload();
  });
}
var RainfallStr = [];
function YLload() {
  RainfallStr = [];
  var strJson = strJsonDataYL.value;
  if (strJson.length > 0) {
    for (var i = 0; i < strJson.length; i++) {
      var item = strJson[i];
      if (item.drp == undefined) {
        item.drp = 0.0;
      }
      var f = Number(item.drp);
      if (f > 0) {
        if (SetNull(item.lgtd) != "" && SetNull(item.lttd) != "") {
          RainfallStr.push({ lon: item.lgtd, lat: item.lttd, value: f });
        }
      }
    }
    // console.error('RainfallStr',JSON.stringify(RainfallStr));
    SpanItem("yldzmMarker");
  }
}
var colors = ["#A6F28E", "#007B00", "#3DBCF9", "#0000F9", "#FB3DFA", "#7B0000"];
var levels = [0.1,10,25,50,100,200];
function MapRainfall() {
  var strParam = {
    interpolation_method: "trigonometric",
    levels: levels,
    resolution: 1000, //0.01,
    stations: RainfallStr,
    boundary: false,
  };
  apidzxm.rainfallMultiIsosurfaces(strParam).then((res) => {
    MapRainfallData(res);
  });
}

async function MapRainfallData(res) {
  if (!res.success) {
    return;
  }
  var flatIsosurfaces = [];

  if (res.success && res.data) {
    Object.keys(res.data).forEach(function (regionId) {
      var regionData = res.data[regionId];
      if (regionData && regionData.isosurfaces) {
        regionData.isosurfaces.forEach(function (iso) {
          flatIsosurfaces.push(iso);
        });
      }
    });
  }
  var isolines = flatIsosurfaces;
  for (const u of isolines) {
    var level = u.level;
    var levelIndex = levels.findIndex(function (l) {
      return l >= level;
    });
    if (levelIndex < 0) levelIndex = 0;
    var color = colors[levelIndex] || colors[colors.length - 1] || "#98D8C8";
    var polygons = u.polygons;
    // console.error("color", color);
    for (const coords of polygons) {
      try {
        PointMark.MapRainfallSing(coords, color);
      } catch (err) {
        console.error("请求失败:", err);
      }
    }
  }
}
function clearALL(obj) {
  try {
    removeEntityByName(obj);
  } catch (ex) {}
}
onUnmounted(() => {
  clearALL();
  $(".light").parent().remove();
  if (interVal != null) {
    clearInterval(interVal);
  }
});
function parentMethodshowDynamicLayer(item) {
  setZOOM(13);
  dyCenter(item[0], item[1]);
}
//传参
provide("strJsonDataNew", strJsonData);
</script>
<style scoped>
@import "@/assets/styles/ledcss.css";

.tuli {
  width: auto;
  height: 200px;
  color: white;
  font-size: 12px;
  font-size: 0.15rem;
  padding: 0px 5px;
  cursor: pointer;
  position: absolute;
  border-radius: 8px;
  /* bottom: calc(calc(100vh - 4.225rem) * (2 / 6)); */
  bottom: 10px;
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

.MapTextNew {
  width: auto;
  position: relative;
  bottom: -60px;
  right: 0;
  padding: 5px;
  color: #fff;
  text-transform: uppercase;
  transition: 0.5s;
  cursor: pointer;
  overflow: hidden;
  white-space: break-spaces;
  text-align: left;
  transform: translateY(-60px);
}

.amap-ui-district-cluster-marker-title {
  width: 100%;
  height: 100%;
}

.markerClass {
  padding: 0 8px;
  background: #40fc00;
  text-align: center;
  border-radius: 5px;
  line-height: 28px;
  font-size: 16px;
  font-weight: 700;
  color: #000;
}

/* 水雨情侧边切换 */
.monitorSwitch_container {
  width: 160px;
  height: 300px;
  position: absolute;
  left: 29rem;
  top: 150px;
  z-index: 10;
}

.monitorSwitch_container .menu_btn:hover {
  background-color: #132236c4;
  color: #949aa2;
}

.monitorSwitch_container .menu_btn {
  width: 100%;
  height: 50px;
  background-image: url(/images/mapLeftMenuO.png);
  background-size: 50px;
  background-repeat: no-repeat;
  position: relative;
  margin-bottom: 20px;
  border-radius: 25px;
  color: rgba(157, 161, 165, 0);
  cursor: pointer;
  /* background-position: 70px 0px; */
}

.monitorSwitch_container .menu_btn_click {
  width: 100%;
  height: 50px;
  background-image: url(/images/mapLeftMenu.png);
  background-size: 159px;
  position: relative;
  margin-bottom: 20px;
  color: rgb(157, 161, 165);
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: 0px;
  border-radius: 25px;
}

.monitorSwitch_container .Icon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 15px;
  top: 15px;
}

.monitorSwitch_container .menu_btn_click .imgZhuandong {
  -webkit-animation: turn 3s linear infinite;
  animation: turn 3s linear infinite;
  width: 60px;
  height: 60px;
  position: absolute;
  background-size: 100% 100%;
  top: -20px;
  left: -20px;
}

.monitorSwitch_container .menu_btn_click .imgZhuandong .item-tg-top {
  width: 0;
  height: 0;
  border-width: 0 0.3125rem 0.3125rem;
  border-style: solid;
  border-color: transparent transparent #00ffff;
  position: absolute;
  top: 0.625rem;
  left: 50%;
  margin-right: -0.3125rem;
}

.monitorSwitch_container .menu_btn_click .imgZhuandong .item-tg-btm {
  width: 0;
  height: 0;
  border-width: 0 0.3125rem 0.3125rem;
  border-style: solid;
  border-color: transparent transparent #00ffff;
  position: absolute;
  bottom: 0.625rem;
  left: 50%;
  margin-right: -0.3125rem;
  transform: rotate(180deg);
}

@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1turn);
  }
}

.monitorSwitch_container .menu_btn .text {
  width: 60px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  left: 53px;
  top: 8px;
  font-size: 16px;
  text-align: center;
  color: #def1ff;
}

.monitorSwitch_container .menu_btn_click .text {
  width: 60px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  left: 53px;
  top: 8px;
  font-size: 16px;
  text-align: center;
  color: #00e4ff;
  /* color: var(--popupContentTitleColor); */
}

.g-bside {
  position: fixed;
  left: 29rem;
  bottom: 1rem;
  width: calc(100% - 58rem);
  height: auto;
  display: flex;
}

.monitorSwitch_container .text-num {
  background-color: #c52821;
  width: 20px;
  height: 20px;
  line-height: 18px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  position: absolute;
  right: 95px;
}
</style>
