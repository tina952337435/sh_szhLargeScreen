<template>
  <div class="top-head g-hd">
    <div class="hreatitle title">
      <div class="titleText">
        <div
          style="
            float: left;
            text-align: center;
            width: 100%;
            font-weight: 600;
            letter-spacing: 6px;
          "
          id="titleTextName"
        >
          上海市水情综合应用
          <div
            style="
              font-size: 20px;
              color: #fff;
              padding: 0px;
              border-bottom: solid #44e951 1px;
              display: inline-block;
              line-height: normal;
              letter-spacing: 2px;
            "
          >
            【上海市】
            <div class="toubumenu" @mouseleave="handleLeave">
              <ul id="navul">
                <li title="上海市" @click="openMenu('上海市')">上海市</li>
                <li title="苏州河" @click="openMenu('苏州河')">苏州河</li>
                <li title="黄浦江" class="grayLi">黄浦江</li>
              </ul>
            </div>
          </div>
          <img
            src="/images/切换.png"
            @mousemove="handleMove"
            style="
              -moz-transform: rotate(-90deg);
              -webkit-transform: rotate(-90deg);
              width: 18px;
            "
          />
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="m-menu">
      <div class="zuo box-siz">
        <!-- 今天：<br>多云转晴 -->
        <div class="weather">
          <img
            :src="imageUrl"
            style="
              float: left;
              display: inline-block;
              width: 45px;
              padding-top: 4px;
            "
          />
          <div style="padding-left: 55px; padding-top: 5px">
            今天<br />{{ currentWeather }}
          </div>
        </div>
        <div class="totalbkind_div">
          <ul class="totalbkind_ul">
            <li class="totalbkind_li">
              <!-- <img src="/images/flood_blue.png" alt=""> -->
            </li>
            <li class="totalbkind_li">
              <!--<img src="/LargeScreen/img/flood_blue.png" style="cursor:pointer;width:86px;height:86px;"/>-->
            </li>
          </ul>

          <div id="warningInfo" class="warningTitle" @click="getWarningInfoAdd">
            <div
              style="
                margin-top: 10px;
                position: absolute;
                float: left;
                left: 160px;
                cursor: pointer;
                padding-top: 4px;
                font-size: 16px;
                top: 12px;
              "
            >
              <span
                >{{ WarningInfo
                }}<span
                  class="warningTitleSpan"
                  style="
                    color: rgb(185 182 182);
                    font-weight: bold;
                    font-size: 25px;
                    vertical-align: -3px;
                    padding-left: 6px;
                  "
                  >{{ WarningInfoNum }}</span
                ></span
              >
            </div>
          </div>
          <div
            style="
              position: absolute;
              float: left;
              left: 320px;
              margin-top: -6px;
            "
            id="rainstormImg"
          >
            <img :src="rainstormImg" alt="" style="width: 48px; height: 48px" />
          </div>
          <div
            style="
              position: absolute;
              float: left;
              left: 380px;
              margin-top: -6px;
            "
            id="rainstormImg"
          >
            <img :src="typhoonImg" alt="" style="width: 48px; height: 48px" />
          </div>
        </div>
      </div>
      <div
        class="you box-siz display_flex justify-content_flex-center"
        style="left: 74%"
      >
        <span>{{ currentTime }}</span
        >{{ currentWeek }}<i>{{ currentDay }}</i>
      </div>
    </div>
  </div>
  <!--管理系统-->
  <div
    style="
      height: 40px;
      position: absolute;
      top: 1rem;
      right: 36rem;
      z-index: 222;
    "
    title="进入工作人员后台"
    class="jinru"
  >
    <img
      src="/images/jinru.png"
      style="cursor: pointer; position: absolute; left: 190px; top: -5px"
      @click="tiaozhuan()"
      title="进入工作人员后台"
    />
  </div>
  <!-- 项目配置 -->
  <div
    @click="IStrue()"
    style="
      position: absolute;
      top: 42px;
      right: 6px;
      color: #ffffff;
      cursor: pointer;
      z-index: 99;
    "
  >
    <img :src="setupImg" alt="项目配置" style="width: 26px; height: 26px" />
  </div>
  <div
    :class="divClass"
    style="display: none"
    @mouseover="IStrue()"
    @mouseout="ISfalse()"
  >
    <div class="popupContentTitle">
      <div class="popupContentTitleText">
        <img
          src="/images/setup2.png"
          style="
            width: 22px;
            height: 22px;
            vertical-align: -6px;
            margin-right: 6px;
          "
        />项目配置
      </div>
      <div
        class="popupContentTitleClose"
        title="关闭窗口"
        @click="ISfalse()"
      ></div>
    </div>
    <div class="settingMap" style="margin: 30px 0px 0px 10px">
      <el-icon size="22px" style="vertical-align: -5px">
        <Orange />
      </el-icon>
      <span style="font-size: 16px">主题：</span>
      <div
        style="display: inline-block"
        @click="TypeeChange('default')"
        :class="ThemeName == 'default' && 'ThemeImg'"
      >
        <div
          style="
            display: inline-block;
            background: #031426bf;
            border: 1px solid #ccc;
            width: 26px;
            height: 20px;
            line-height: 20px;
            border-radius: 4px;
          "
        >
          <img style="padding: 4px 5px" :src="defaultImg" alt="" />
        </div>
        <span
          style="vertical-align: 0px"
          :class="ThemeName == 'default' && 'ThemeImgSapn'"
        >
          深色</span
        >
      </div>
      <div
        style="display: inline-block"
        @click="TypeeChange('BlueTheme')"
        :class="ThemeName == 'BlueTheme' && 'ThemeImg'"
      >
        <div
          style="
            display: inline-block;
            background: #63affc;
            margin-left: 20px;
            width: 26px;
            height: 20px;
            line-height: 20px;
            border-radius: 4px;
          "
        >
          <img style="padding: 4px 5px" :src="BlueThemeImg" alt="" />
        </div>
        <span :class="ThemeName == 'BlueTheme' && 'ThemeImgSapn'">蓝色</span>
      </div>

      <div
        style="display: inline-block"
        @click="TypeeChange('VioletTheme')"
        :class="ThemeName == 'VioletTheme' && 'ThemeImg'"
      >
        <div
          style="
            margin-left: 20px;
            display: inline-block;
            background: #7e73e9;
            width: 26px;
            height: 20px;
            line-height: 20px;
            border-radius: 4px;
          "
        >
          <img style="padding: 4px 5px" :src="VioletThemeImg" alt="" />
        </div>
        <span
          style="vertical-align: 0px"
          :class="ThemeName == 'VioletTheme' && 'ThemeImgSapn'"
        >
          紫色</span
        >
      </div>
    </div>

    <div class="divider">
      <span class="divider-horizontal"></span>
      <span class="divider-text">底图设置</span>
      <span class="divider-horizontal"></span>
    </div>
    <div class="settingMap">
      <!-- <el-icon size="22px" style="vertical-align: -5px">
        <Location />
      </el-icon>
      <span style="font-size: 16px">地图：</span> -->
      <!-- <div @click="reductionSystem()"
        style="border: solid 1px #05c7c7;width:70px;display: inline-flex;margin-right: 10px;font-size: 14px;border-radius: 5px;cursor:pointer;">
        <el-icon size="19px" style="vertical-align: -5px">
          <Refresh />
        </el-icon>
        全视角
      </div> -->
      <!-- <el-radio-group v-model="pathMap" style="height: 40px; line-height: 40px" id="sceneView">
        <el-radio @click="setMap('SCENE2D')" label="SCENE2D" name="sceneView">二维</el-radio>
        <el-radio @click="setMap('SCENE3D')" label="SCENE3D" name="sceneView">三维</el-radio>
      </el-radio-group>
      <br /> -->
      <el-icon size="22px" style="vertical-align: -5px">
        <Setting />
      </el-icon>
      <span style="font-size: 16px">工具：</span>
      <el-radio-group
        v-model="pathDraw"
        style="height: 40px; line-height: 40px"
      >
        <el-radio @click="DrawIcon('drawLine')" label="drawLine">测距</el-radio>
        <el-radio @click="DrawIcon('drawArea')" label="drawArea">测面</el-radio>
        <el-radio @click="DrawIcon('removemeasure')" label="removemeasure"
          >清除</el-radio
        >
      </el-radio-group>

      <el-radio-group>
        <span
          id="countdown"
          style="
            position: relative;
            left: 10px;
            font-size: 18px;
            top: -2px;
            color: #ff0000;
          "
          >05:00</span
        >
        <!-- <br /> -->
        <el-checkbox
          style="margin-left: 25px"
          @click="handlerDraw('DataRefresh')"
          id="DataRefresh"
          v-model="DataRefreshFalse"
          label="数据刷新"
          size="large"
        />

        <el-checkbox
          style="margin-left: 20px"
          @click="FullScreen()"
          id="FullScreen"
          v-model="FullScreenFalse"
          label="全屏"
          size="large"
        />
      </el-radio-group>
      <div class="settingMap-item">
        <div
          @click="setDtLayerKS('shsw_OneMapServerdark')"
          :class="mapName == 'shsw_OneMapServerdark' && 'switch-imgSelect'"
          class="switch-img"
        >
          <span class="settingMaptext-xs">深蓝色</span>
          <img src="/images/mapIcon/深蓝色.png" alt="深蓝色" />
        </div>
        <div
          @click="setDtLayerKS('shsw_OneMapServer')"
          :class="mapName == 'shsw_OneMapServer' && 'switch-imgSelect'"
          class="switch-img"
        >
          <span class="settingMaptext-xs">浅蓝色</span>
          <img src="/images/mapIcon/浅蓝色.png" alt="浅蓝色" />
        </div>
        <div
          @click="setDtLayerKS('shsw_OneMapServer_wxyx')"
          :class="mapName == 'shsw_OneMapServer_wxyx' && 'switch-imgSelect'"
          class="switch-img"
        >
          <span class="settingMaptext-xs">卫片图</span>
          <img src="/images/mapIcon/卫片图.png" alt="卫片图" />
        </div>
      </div>

      <!-- <div class="settingMap-item">
        <div @click="setDtLayerKS('gd_tdt')" :class="mapName == 'gd_tdt' && 'switch-imgSelect'" class="switch-img">
          <span class="settingMaptext-xs">极夜蓝</span>
          <img src="/images/mapIcon/gaode.png" alt="极夜蓝" />
        </div>
        <div @click="setDtLayerKS('vec_w')" :class="mapName == 'vec_w' && 'switch-imgSelect'" class="switch-img">
          <span class="settingMaptext-xs">矢量图</span>
          <img src="/images/mapIcon/dianzitu.png" alt="矢量图" />
        </div>
        <div @click="setDtLayerKS('img_w')" :class="mapName == 'img_w' && 'switch-imgSelect'" class="switch-img">
          <span class="settingMaptext-xs">影像图</span>
          <img src="/images/mapIcon/weixintu.png" alt="影像图" />
        </div>
      </div> -->
      <!-- <div class="settingMap-item">
        <div @click="setDtLayerKS('ter_w')" :class="mapName == 'ter_w' && 'switch-imgSelect'" class="switch-img">
          <span class="settingMaptext-xs">地形图</span>
          <img src="/images/mapIcon/shuixitu.png" alt="地形图" />
        </div>
        <div @click="setDtLayerKS('slyzt_map')" :class="mapName == 'slyzt_map' && 'switch-imgSelect'" class="switch-img">
          <span class="settingMaptext-xs">水利一张图</span>
          <img src="/images/mapIcon/水利一张图.png" alt="水利一张图" />
        </div>
        <div @click="setDtLayerKS('sz_hcdt')" :class="mapName == 'sz_hcdt' && 'switch-imgSelect'" class="switch-img">
          <span class="settingMaptext-xs">河道概化图</span>
          <img src="/images/mapIcon/suhcdt.png" alt="河道概化图" />
        </div>
      </div> -->
    </div>

    <div class="divider">
      <span class="divider-horizontal"></span>
      <span class="divider-text">效果设置</span>
      <span class="divider-horizontal"></span>
    </div>
    <div class="settingMap" style="margin: 0px 0px 0px 10px">
      <!-- <el-icon size="22px" style="vertical-align: -5px">
        <Opportunity />
      </el-icon> -->
      <!-- <span style="font-size: 16px">亮度：</span>
      <el-radio-group>
        <el-checkbox @click="handlerDraw('enableLighting')" v-model="EnableLightingFalse" label="夜视" size="large" />
        <el-checkbox @click="handlerDraw('enableblackAndWhite')" v-model="BlackAndWhiteFalse" label="黑白" size="large" />
      </el-radio-group>
      <br /> -->
      <!-- <el-icon size="22px" style="vertical-align: -5px">
        <Cloudy />
      </el-icon>
      <span style="font-size: 16px">天气：</span>
      <el-radio-group>
        <el-checkbox @click="handlerDraw('snow')" v-model="SnowFalse" label="雪" size="large" />
        <el-checkbox @click="handlerDraw('rain')" v-model="RainFalse" label="雨" size="large" />
        <el-checkbox @click="handlerDraw('fog')" v-model="FogFalse" label="雾" size="large" />
      </el-radio-group> -->
      <!-- <br />
      <el-icon size="22px" style="vertical-align: -5px">
        <Discount />
      </el-icon> 
      <span style="font-size: 16px">场景：</span>
      <el-radio-group>
        <el-checkbox @click="handlerDraw('CanvasWindy')" v-model="CanvasWindyFalse" label="风场" size="large" />
        <el-checkbox @click="handlerDraw('showFlowTool')" v-model="showFlowTool" label="淹没" size="large" />
        <el-checkbox @click="handlerDraw('getheatMapData')" v-model="HeatMapRoadFalse" label="热力图" size="large" />
        <el-checkbox @click="handlerDraw('reductionSystem')" v-model="reductionSystemFlase" label="全视角" size="large" />
      </el-radio-group> -->
      <!-- <el-radio-group style="margin-left: 70px;"> 
        <el-checkbox @click="handlerDraw('Windy')" v-model="WindySystemFlase" label="Windy" size="large" />
      </el-radio-group> -->
      <br />
      <el-icon size="22px" style="vertical-align: -5px">
        <MapLocation />
      </el-icon>
      <span style="font-size: 16px">图层：</span>

      <el-radio-group>
        <el-checkbox
          @click="handlerDraw('RiverRoad')"
          v-model="RiverRoadFalse"
          label="河道"
          size="large"
        />
        <el-checkbox
          @click="handlerDraw('Xingzheng')"
          v-model="XingzhengFalse"
          label="行政"
          size="large"
        />
        <!-- <el-checkbox id="Coverlayer" @click="handlerDraw('Coverlayer')" v-model="CoverlayerFalse" label="遮挡层"
          size="large" /> -->
      </el-radio-group>
      <!-- <el-radio-group style="margin-left: 70px;">
        <el-checkbox @click="handlerDraw('FengXian')" v-model="FengXianFalse" label="风险图" size="large" />
      </el-radio-group> -->
      <br />
      <el-icon size="22px" style="vertical-align: -5px">
        <MapLocation />
      </el-icon>
      <span style="font-size: 16px">智能：</span>

      <el-radio-group>
        <el-checkbox
          @click="handlerDraw('YUYIN')"
          v-model="YUYINFalse"
          label="AI"
          size="large"
        />
      </el-radio-group>
    </div>

    <!-- 退出系统 -->
    <div style="text-align: center; margin-top: 20px">
      <el-button @click="logout()" type="danger" plain size="small"
        >退出系统</el-button
      >
    </div>
  </div>

  <fog :value="FogFalse"></fog>
  <rain :value="RainFalse"></rain>
  <snow :value="SnowFalse"></snow>
  <nightVision :value="EnableLightingFalse"></nightVision>
  <blackAndWhite :value="BlackAndWhiteFalse"></blackAndWhite>

  <MyDialog
    :showDialog="showDialog"
    @close="showDialog = false"
    :title="titleName"
    :typeValue="typeValue"
    style="width: 1200px; height: 600px"
  >
    <WarningInfoList :closeLineDialog="closeLineDialog" ref="child" />
  </MyDialog>

  <MyDialog
    :showDialog="showDialogFX"
    @close="showDialogFX = false"
    :title="titleNameFX"
    :typeValue="typeValueFX"
    style="width: 1100px; height: 800px"
  >
    <fengxian />
  </MyDialog>
</template>
<script setup>
import "@/assets/styles/ledcss.css";
import MyDialog from "@/components/ComDialog.vue";
import WarningInfoList from "@/components/top/WarningInfoList.vue";
import fengxian from "@/components/danzhan/qxjz/fengxian.vue";

import "@/assets/styles/style.css";
import "@/assets/styles/fangda.css";
import "@/assets/styles/seeting.css";
import {
  ElRadio,
  ElMessage,
  ElCheckbox,
  ElRadioGroup,
  ElIcon,
  ElButton,
} from "element-plus";
import $ from "jquery";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import {
  inject,
  onMounted,
  onBeforeUnmount,
  onBeforeMount,
  ref,
  defineAsyncComponent,
  provide,
  nextTick,
} from "vue";
import { BaseMap } from "@/utils/ArcGis/SwitchMap.js";
import Data_Promise from "@/assets/json/gfsjson.json";

import th_city_info from "@/assets/json/th_city_info.json";
import apiWxxsq from "@/api/topHead/index.js";
import { groupBy, SetNull, sortObjectArray } from "@/api/ComUnit.js";
import api from "@/api/utils/index";
import indexapi from "@/api/zonglan/index.js";
import modeapi from "@/api/mode/index.js";
import dayjs from "dayjs";

import { addAreaLineQS, CreateLayer,map } from "@/utils/ArcGis/MapComm.js";
import { setMeasureTool } from "@/utils/ArcGis/CommonTool.js";

import domain from "@/assets/json/domain.json";

const route = useRoute();
const router = useRouter();
const store = useStore();
const { viewer } = store.state;
const curTheme = inject("curTheme");
const CurrentLayer = localStorage.getItem("CurrentLayer");
const divClass = ref({ setup: false });
// 判断地图模式（图层切换）
const mapName = ref("shsw_OneMapServerdark");
const itemName = ref("default");
const gd_tdt = ref(false);
const vec_w = ref(false);
const img_w = ref(false);
const ter_w = ref(false);
const slyzt_map = ref(false);
const sz_hcdt = ref(false);

const shsw_OneMapServerdark = ref(true);
const shsw_OneMapServer = ref(false);

const WarningInfo = ref("应急响应:");
const WarningInfoNum = ref("无");

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
// 传递弹开页面的标题名称
const titleName = ref();
// 传递雨型的类别：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const typeValue = ref();
const child = ref();
const rainstormImg = ref("/images/warning/byyj_none.png");
const typhoonImg = ref("/images/warning/typhoon_none.png");

const showDialogFX = ref(false);
const titleNameFX = ref("风险图成果");
const typeValueFX = ref();

// 最新调度方案ID
const DD_ID = ref();
// 应急响应新增
/**
 * 获取警告信息并添加响应
 * 显示应急响应设置对话框，设置标题，并发送水位警告消息
 * @description 当枫桥水位超过警戒值时触发该函数，提示用户开启应急响应
 */
function getWarningInfoAdd() {
  showDialog.value = true;
  titleName.value = "历史应急响应";
}
function closeLineDialog() {
  showDialog.value = false;
}
// 应急响应查询
function getWarningInfo() {
  var strParam = { };
  apiWxxsq
    .getUsePremission(strParam)
    .then((res) => {
      var strJson = res.data;
      // console.error("-------------------",strJson)
      if (strJson.length > 0) {
        var color0 = "#def1ff";
        var color1 = "#ED493F";
        var color2 = "#F79715";
        var color3 = "#F8E757";
        var color4 = "#16a4f3";
        if (strJson[0].SIGNAL_LEVEL == "Ⅰ") {
          $(".warningTitleSpan").css("color", color1);
          WarningInfoNum.value = strJson[0].SIGNAL_LEVEL;
        } else if (strJson[0].SIGNAL_LEVEL == "Ⅱ") {
          $(".warningTitleSpan").css("color", color2);
          WarningInfoNum.value = strJson[0].SIGNAL_LEVEL;
        } else if (strJson[0].SIGNAL_LEVEL == "Ⅲ") {
          $(".warningTitleSpan").css("color", color3);
          WarningInfoNum.value = strJson[0].SIGNAL_LEVEL;
        } else if (strJson[0].SIGNAL_LEVEL == "Ⅳ") {
          $(".warningTitleSpan").css("color", color4);   
          WarningInfoNum.value = strJson[0].SIGNAL_LEVEL;
        } 
        else if (strJson[0].SIGNAL_LEVEL == "0") {
          WarningInfoNum.value = strJson[0].SIGNAL_LEVEL;
          $(".warningTitleSpan").css("color", color0);
        }
        console.error("当前应急响应情况======", WarningInfo.value);
      }
      else{
          WarningInfoNum.value ="无";
          $(".warningTitle").css("color", color0);
      }
    })
    .catch((err) => {});
}
//语音
const YUYINFalse = ref(false);
const voiceFlae = ref(false);

function setDtLayerKS(layerID) {
  mapName.value = layerID;
  var myMap = SetNull(map) == "" ? window.map : map;
  try {
    //隐藏图层
    var layerListID = [
      "gaodeLayer",
      "vec_w",
      "vec_wNote",
      "img_w",
      "jiangsu",
      "img_wNote",
      "ter_w",
      "ter_wNote",
      "sz_hcdt",
      "shsw_OneMapServerdark",
      "shsw_OneMapServer",
      "shsw_OneMapServer_wxyx"
    ];
    if (layerListID.length > 0) {
      for (var num = 0; num < layerListID.length; num++) {
        var itemLayer = myMap.getLayer(layerListID[num]);
        if (SetNull(itemLayer) != "") {
          console.error("itemLayer", itemLayer);
          itemLayer.setVisibility(false);
        }
      }
    }

    var itemLayerCur = myMap.getLayer(layerID);
    itemLayerCur.setVisibility(true);
  } catch (error) {
    console.error("setDtLayerKS-error", error);
  }
}
//地图
const pathMap = ref("SCENE2D");
function setMap(layerID) {
  pathMap.value = layerID;
  if (layerID == "SCENE3D") {
    onChange2D3DClick(viewer, 1);
  } else {
    onChange2D3DClick(viewer, 2);
  }
}
function reductionSystem() {
  addAreaLineQS(viewer);
}
//工具
const iconName = ref(null);
const pathDraw = ref({});
function DrawIcon(evt) {
  // iconName.value = evt;
  // let drawLine = evt;
  // if (drawLine == "drawLine") {
  //   Draw.measureLine(viewer);
  // } else if (drawLine == "drawArea") {
  //   Draw.measurePolygn(viewer);
  // } else if (drawLine == "removemeasure") {
  //   Draw.removemeasure(viewer);
  // }
  iconName.value = evt;
  let drawLine = evt;
  if (drawLine == "drawLine") {
    setMeasureTool("distance");
  } else if (drawLine == "drawArea") {
    setMeasureTool("area");
  } else if (drawLine == "removemeasure") {
    setMeasureTool("clear");
  }
}
//主题
const BlueThemeImg = ref("");
const defaultImg = ref("/images/Setyes.png");
const VioletThemeImg = ref("");
const ThemeName = ref("default");
const switch_theme = inject("switch_theme");
const FullScreen_Type = inject("FullScreen_Type");
const switch_datarefresh = inject("switch_datarefresh");
const switch_BoundaryArea = inject("switch_BoundaryArea");
const setupImg = ref("/images/setup1.png");
const pathTheme = ref("BlueTheme");
function TypeeChange(e) {
  ThemeName.value = e;
  if (e == "BlueTheme") {
    BlueThemeImg.value = "/images/Setyes.png";
    setupImg.value = "/images/setup2.png";
    defaultImg.value = "";
    VioletThemeImg.value = "";
    CoverlayerFalse.value = false;
    try {
      localStorage.setItem("BoundaryArea", false);
    } catch (error) {}
  } else if (e == "default") {
    defaultImg.value = "/images/Setyes.png";
    setupImg.value = "/images/setup1.png";
    BlueThemeImg.value = "";
    VioletThemeImg.value = "";
    CoverlayerFalse.value = false;
    try {
      localStorage.setItem("BoundaryArea", false);
    } catch (error) {}
  } else if (e == "VioletTheme") {
    VioletThemeImg.value = "/images/Setyes.png";
    setupImg.value = "/images/setup2.png";
    BlueThemeImg.value = "";
    defaultImg.value = "";
    CoverlayerFalse.value = false;
    try {
      localStorage.setItem("BoundaryArea", false);
    } catch (error) {}
  }
  pathTheme.value = e;
  switch_theme(e);

  if (route.path != "/") {
    // window.location.reload();
    // router.push({ path: route.path });
    router.go(0);
  }
}

//显示侧栏
function IStrue() {
  divClass.value.setup = true;
}
//隐藏侧栏
function ISfalse() {
  divClass.value.setup = false;
}
// 定义定时器引用
const timer = ref(null);
onMounted(() => {
  localStorage.setItem("BoundaryArea", true);
  // FullScreen();
  // FullScreenFalse.value = localStorage.getItem("FullScreenType");
  // localStorage.setItem("FullScreenType", FullScreenFalse.value);
  updateTime();
  interval.value = setInterval(updateTime, 1000);
  Weacontent();
  TypeeChange(curTheme.value);
  getVue();
  getWarningInfo();
  // FullScreen();
});
/******气象****/
function Weacontent() {
  var strParam = {};
  strParam["TBA_INFOTYPE"] = "上海市天气信息";
  strParam["PageIndex"] = 0;
  strParam["PageSize"] = 1;
  apiWxxsq.Weacontent(strParam).then((res) => {
    const strJson = JSON.parse(res["data"][0]["TBA_NOTE"]);
    const strMsg = ``;
    if (strJson["data"].length > 0) {
      var wea = strJson["data"][0]["wea"];
      var wea_img = "";
      if (wea.indexOf("小雨") > -1) {
        wea_img = "xiaoyu";
      } else if (wea.indexOf("多云") > -1) {
        wea_img = "yun";
      } else if (wea.indexOf("雾") > -1) {
        wea_img = "wu";
      } else if (wea.indexOf("雷") > -1) {
        wea_img = "lei";
      } else if (wea.indexOf("沙尘") > -1) {
        wea_img = "shachen";
      } else if (wea.indexOf("雨") > -1) {
        wea_img = "yu";
      } else if (wea.indexOf("暴雨") > -1) {
        wea_img = "baoyu";
      } else if (wea.indexOf("雨夹雪") > -1) {
        wea_img = "yujiaxue";
      } else if (wea.indexOf("雪") > -1) {
        wea_img = "xue";
      } else if (wea.indexOf("云") > -1) {
        wea_img = "yun";
      } else if (wea.indexOf("阴") > -1) {
        wea_img = "yin";
      } else {
        wea_img = "qing";
      }
      imageUrl.value = "/images/cloud/" + wea_img + ".png";
      currentWeather.value = wea;
    }
  });
}
//时间
const currentTime = ref("");
const currentDay = ref("");
const currentWeek = ref("");
const currentWeather = ref("");
const imageUrl = ref("");
const interval = ref(1000);
function updateTime() {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString();
  currentDay.value = dayjs(now).format("YYYY.MM.DD");
  let days = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  currentWeek.value = days[now.getDay()];
}

/*****效果设置********/
//亮度
const EnableLightingFalse = ref(false);
const BlackAndWhiteFalse = ref(false); //黑白

//天气
const SnowFalse = ref(false);
const RainFalse = ref(false);
const FogFalse = ref(null);
var fog = null,
  rain = null,
  snow = null,
  nightVision = null,
  blackAndWhite = null;
function getVue() {}
//风场
const CanvasWindyFalse = ref(false); //风场
var CanvasWindyUtil = null;

//热力图
const HeatMapRoadFalse = ref(false);

//河道与行政
const RiverRoadFalse = ref(true);
const XingzhengFalse = ref(true);
const JISHUIDIANFalse = ref(false);
// 83条主干河流
const WQRiverRoadFalse = ref(false);
//风险图
const FengXianFalse = ref(false);

//淹没
const showFlowTool = ref(false);

//全视角
const reductionSystemFlase = ref(false);
//windy
const WindySystemFlase = ref(false);

//遮挡层
const CoverlayerFalse = ref(false);
//无人机倾斜摄影
const LDOSGBFalse = ref(false);
const DEMOFalse = ref(false);
//数据刷新
const DataRefreshFalse = ref(false);
//是否全屏
const FullScreenFalse = ref(false);
//漫游
const MANYOUFalse = ref(false);
//雷达
const LDFalse = ref(false);
function tiaozhuan() {
  window.open("swzzWeb");
}
function isEdge() {
  return /Edg/.test(window.navigator.userAgent);
}

import { polygon } from "@turf/turf";
async function queryArcGisLayer(layerUrl, whereClause) {
  const queryUrl = `${layerUrl}/query?where=${encodeURIComponent(whereClause)}&outFields=*&returnGeometry=false&f=json`;
  const response = await fetch(queryUrl);
  const data = await response.json();
  // return data.features; // 返回查询结果
  return data; // 返回查询结果
}
function handlerDraw(evt) {
  if (evt == "fog") {
    //雾
    FogFalse.value != FogFalse.value;
  } else if (evt == "rain") {
    //下雨
    RainFalse.value != RainFalse.value;
  } else if (evt == "snow") {
    //下雪
    SnowFalse.value != SnowFalse.value;
  } else if (evt == "enableblackAndWhite") {
    //黑白
    BlackAndWhiteFalse.value != BlackAndWhiteFalse.value;
  } else if (evt == "enableLighting") {
    //夜视
    EnableLightingFalse.value != EnableLightingFalse.value;
  } else if (evt == "CanvasWindy") {
    // 风场
    let layerId = "windycanvas";
    if (CanvasWindyFalse.value == false) {
      var reqPath = "/json/gfsjson.json";
      // reqPath="/json/wind/202101.json"
      var settings = {
        url: reqPath,
        method: "POST",
        data: {},
      };
      $.ajax(settings).done(function (response) {
        if (CanvasWindyUtil == null) {
          CanvasWindyUtil = new windyUtil(viewer, layerId);
          CanvasWindyUtil.createWindLayer(response);
        }
        setTimeout(function () {
          CanvasWindyUtil.showWindy();
        }, 500);
      });
    } else {
      CanvasWindyUtil.hideWindy();
    }
    CanvasWindyFalse.value != CanvasWindyFalse.value;
  } else if (evt == "Windy") {
    // 风场
    let layerId = "windycanvasall";
    if (WindySystemFlase.value == false) {
      if (CanvasWindyUtil == null) {
        var myUril = "/json/wind/202112.json";
        api.postParams(myUril, strParam).then((res) => {
          CanvasWindyUtil = new windyUtil(viewer, layerId);
          CanvasWindyUtil.createWindLayer(res);
          CanvasWindyUtil.showWindy();
        });
      }
    } else {
      // $("#windycanvas").remove();
      CanvasWindyUtil.hideWindy();
    }
    WindySystemFlase.value != WindySystemFlase.value;
  } else if (evt == "JISHUIDIAN") {
    console.error("evt", evt);
  } else if (evt == "showFlowTool") {
    // 淹没
    if (showFlowTool.value == false) {
      set3Dtitle3(viewer);
    } else {
      onshowFlowToolClear(viewer);
    }
    showFlowTool.value != showFlowTool.value;
  } else if (evt == "getheatMapData") {
    // 热力图
    if (HeatMapRoadFalse.value == false) {
      getheatMapData();
    } else {
      onHeatMapClear();
    }
    HeatMapRoadFalse.value != HeatMapRoadFalse.value;
  } else if (evt == "RiverRoad") {
    // 河道
    RiverRoadFalse.value != RiverRoadFalse.value;
    if (RiverRoadFalse.value == true) {
      onClearRiverJson(viewer, ["RiverRoad"]);
    } else {
      if (window.location.pathname == "/shuzidatingTH") {
        RiverShp(viewer, "tba");
      } else {
        RiverShp(viewer);
      }
    }
  } else if (evt == "WQRiverRoad") {
    // 83条主干河流
    WQRiverRoadFalse.value != WQRiverRoadFalse.value;
    if (WQRiverRoadFalse.value == true) {
    } else {
    }
  } else if (evt == "FengXian") {
    // 83条主干河流
    FengXianFalse.value != FengXianFalse.value;
    if (FengXianFalse.value == true) {
      showDialogFX.value = false;
    } else {
      showDialogFX.value = true;
    }
  } else if (evt == "Xingzheng") {
    // 行政
    XingzhengFalse.value != XingzhengFalse.value;
    if (XingzhengFalse.value == true) {
    } else {
      if (window.location.pathname == "/shuzidatingTH") {
        const strJsonAll = th_city_info;
      } else {
      }
    }
  } else if (evt == "YUYIN") {
    YUYINFalse.value != YUYINFalse.value;
    if (YUYINFalse.value == true) {
      voiceFlae.value = false;
    } else {
      if (isEdge()) {
        voiceFlae.value = true;
      } else {
        ElMessage.error("浏览器不支持语音识别");
        YUYINFalse.value = false;
        voiceFlae.value = false;
      }
    }
    // voiceFlae.value!=YUYINFalse.value;
  } else if (evt == "DEMO") {
  } else if (evt == "LD") {
    LDFalse.value != LDFalse.value;
    var strParam = {};
    var myUril = "/json/20240703100600.json";
    api.postParams(myUril, strParam).then((res) => {
      var strJson = res.features;
      var strResult = [];
      if (strJson.length > 0) {
        for (var num = 0; num < strJson.length; num++) {
          var item = strJson[num];
          // if (SetNull(strResult) == "") {
          //   strResult += item["geometry"]["x"].toString() + "," + item["geometry"]["y"].toString() + "," + item["attributes"]["drp"].toString();
          // }
          // else {
          //   strResult += "|" + item["geometry"]["x"].toString() + "," + item["geometry"]["y"].toString() + "," + item["attributes"]["drp"].toString();
          // }
          var strWhere = {};
          strWhere = {
            attributes: {
              id: 1,
              name: "Beijing US Embassy",
              x: item["geometry"]["x"],
              y: item["geometry"]["y"],
              z: item["attributes"]["drp"],
            },
            geometry: {
              x: item["geometry"]["x"],
              y: item["geometry"]["y"],
            },
          };
          strResult.push(strWhere);
        }
      }
      var colors = [
        { min: 0, max: 5, color: "#C1CCD6" },
        { min: 5, max: 10, color: "#419DF1" },
        { min: 10, max: 15, color: "#64E7EB" },
        { min: 15, max: 20, color: "#6DFA3D" },
        { min: 20, max: 25, color: "#00D800" },
        { min: 25, max: 30, color: "#019000" },
        { min: 30, max: 35, color: "#FFFF00" },
        { min: 35, max: 40, color: "#E7C000" },
        { min: 40, max: 45, color: "#FF9000" },
        { min: 45, max: 50, color: "#FF0000" },
        { min: 50, max: 55, color: "#D60000" },
        { min: 55, max: 60, color: "#C00000" },
        { min: 60, max: 65, color: "#FF00F0" },
        { min: 65, max: 70, color: "#9600B4" },
        { min: 70, max: 9999, color: "#AD90F0" },
      ];
      colors = [
        { min: 100, max: 9999, color: "#FF0000" },
        { min: 95, max: 100, color: "#FF4100" },
        { min: 90, max: 95, color: "#FF8100" },
        { min: 85, max: 90, color: "#FFC200" },
        { min: 80, max: 85, color: "#FDFF00" },
        { min: 75, max: 80, color: "#CFFF00" },
        { min: 70, max: 75, color: "#A1FF00" },
        { min: 65, max: 70, color: "#73FF00" },
        { min: 60, max: 65, color: "#46FF00" },
        { min: 55, max: 60, color: "#18FF00" },
        { min: 50, max: 55, color: "#00FF17" },
        { min: 45, max: 50, color: "#00FF49" },
        { min: 40, max: 45, color: "#00FF7A" },
        { min: 35, max: 40, color: "#00FFAB" },
        { min: 30, max: 35, color: "#00FFDD" },
        { min: 25, max: 30, color: "#00F0FF" },
        { min: 20, max: 25, color: "#00C0FF" },
        { min: 15, max: 20, color: "#0090FF" },
        { min: 10, max: 15, color: "#0060FF" },
        { min: 5, max: 10, color: "#0030FF" },
        { min: 0, max: 5, color: "#0000FF" },
      ];
      krigingPic(viewer, strResult, colors, domain);
    });
  } else if (evt == "MANYOU") {
    MANYOUFalse.value != MANYOUFalse.value;
    if (MANYOUFalse.value == false) {
    }
  } else if (evt == "LDOSGB") {
    if (LDOSGBFalse.value == false) {
    } else {
    }
    LDOSGBFalse.value != LDOSGBFalse.value;
  } else if (evt == "reductionSystem") {
    //全视角
    //  reductionSystemFlase.value=true;
    reductionSystemFlase.value != reductionSystemFlase.value;
    reductionSystem();
  } else if (evt == "Coverlayer") {
    CoverlayerFalse.value != CoverlayerFalse.value;
    switch_BoundaryArea(!CoverlayerFalse.value);
  } else if (evt == "DataRefresh") {
    // DataRefreshFalse.value != DataRefreshFalse.value;
    switch_datarefresh(!DataRefreshFalse.value);
  }
}

function FullScreen() {
  localStorage.setItem("FullScreenType", !FullScreenFalse.value);
  // FullScreenFalse.value = !localStorage.getItem("FullScreenType");
  FullScreen_Type(localStorage.getItem("FullScreenType"));
}
function handleMove() {
  $(".toubumenu").show();
}
function handleLeave() {
  $(".toubumenu").hide();
}
function openMenu(type) {
  if (type == "上海市") {
    window.open("http://localhost:4014/");
  } else if (type == "苏州河") {
    window.open("http://localhost:4012/");
  }
}
provide("DataRefreshFalse", DataRefreshFalse);

// 退出系统
function logout() {
  localStorage.clear();
  window.location.href = "/login";
}
</script>
<style scoped>
.top-head {
  background: var(--tophead);
  background-blend-mode: color-dodge;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background-size: auto 5rem;
  overflow: hidden;
}

:deep(#myIframe .top-head) {
  display: none !important;
  /* 修改文本颜色 */
}

.hreatitle {
  width: 40rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0rem;
  height: 100%;
}

.weather {
  padding-left: 1.5rem;
  float: left;
  padding-top: 8px;
  padding-left: 1rem !important;
}

.m-menu {
  margin-top: 0.5rem;
}

.m-menu .you span {
  font-size: 2rem;
  margin-right: 1rem;
  line-height: 1;
  font-family: number;
}

.m-menu .you i {
  margin-left: 1rem;
  line-height: 28px;
}

.totalbkind_div {
  margin-left: 190px;
}

.totalbkind_ul {
  list-style: none;
}

.totalbkind_li {
  display: inline-block;
  width: 58px;
}

.totalbkind_li img {
  width: 50px;
  height: 50px;
  padding-top: 18px;
}

.box-siz {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  /* background: rgba(0, 0, 0, 0.8); */
  background: var(--dialogColor);
  transition: all 1s;
  z-index: 100;
}

.dialog-content {
  height: calc(100% - 80px);
  width: 100%;
  overflow-y: auto;
}

/* 自定义滚动条样式 */
.dialog-content::-webkit-scrollbar {
  width: 4px !important;
  /* 设置滚动条宽度 */
}

.dialog-content::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor) !important;
  border-radius: 0% !important;
  z-index: 2;
}

.popupContentTitle {
  position: relative;
  background: var(--popContentHeadbg);
  height: 56px;
  margin: 0px 0px 10px 0px;
}

.popupContentTitleText {
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  line-height: 56px;
  font-weight: 600;
}

.popupContentTitleClose {
  background: url(/images/popupClose.png) no-repeat;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

:deep(.el-radio) {
  margin-right: 16px;
  --el-radio-input-bg-color: #d5141400;
}

:deep(.el-checkbox__label) {
  padding-left: 5px;
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

.toubumenu {
  background: #0d263d8c;
  height: 100px;
  /* height: 80px; */
  position: fixed;
  top: 60px;
  width: 125px;
  z-index: 999;
  display: none;
  border: 1px #5196e9 solid;
}
.toubumenu ul {
  padding-inline-start: 0px;
}
.toubumenu ul li {
  width: 100%;
  -webkit-text-fill-color: white;
  padding: 6px;
  font-size: 18px;
  line-height: 14px;
  cursor: pointer;
  list-style: none;
}
.grayLi {
  color: #a19d9d !important;
  -webkit-text-fill-color: #a19d9d !important;
}
</style>
