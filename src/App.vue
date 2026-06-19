<template>
  <link rel="stylesheet" :href="themeHref" />
  <!-- 头部 -->
  <header class="header">
    <TopHead v-if="showComponent" />
    <TopTab v-if="showComponent" />
  </header>
  <!-- 侧边栏切换 -->
  <aside class="aside" id="ToggleComponent">
    <TabToggle v-if="ToggleComponent" />
  </aside>
  <div id="cesiumContainer">
  </div>
  <router-view></router-view>
</template>
<script setup>
import TopHead from "@/components/top/topHead.vue";
import TopTab from "@/components/top/topTab.vue";
import TabToggle from "@/components/tab/tabToggle.vue";
import { onMounted, ref, provide, onBeforeMount, computed, reactive } from "vue";

import store from "@/stores/store.js";
import { useRouter } from "vue-router";
import $ from "jquery";
import { SetNull } from "./api/ComUnit";
import { dayjs, ElLoading } from 'element-plus'
import { CreateLayer, destroy, globallevel, globalalign, map, labels, setLayerToolTip, ViewPimgage, CreateImageLayer, convertMercatorToWGS84 } from "@/utils/ArcGis/MapComm.js";
import { addSHAreaPolygon,addSHAreaPolygonSZH,readJosnRiver,queryCompleteSZH,addSHOutRings } from "@/utils/share/ShelterArea.js";

const themeHref = computed(() => `styles/${curTheme.value}.css`);
const showComponent = ref(false);
const ToggleComponent = ref(false);

const curTheme = ref("default");
const FullScreenType = ref("false");
const billboardLabelAll = reactive([]);
const BoundaryArea = ref(true);
var loadingCom = null;


var bjLayer;
function loadingShow() {
  loadingCom = ElLoading.service({
    lock: true,
    text: '数据加载中',
    background: 'rgba(0, 0, 0, 0.6)',
  })
}
function loadingHide() {
  try {
    loadingCom.close();
  } catch (error) {

  }
}

// 监听其他标签页的登出事件
window.addEventListener('storage', (e) => {
  if (e.key === 'forceLogout') {
    localStorage.clear();
    localStorage.removeItem('forceLogout');
    window.location.href = "/login";
  }
});

onBeforeMount(() => {
  //主题
  //storage.getLocalObject是我封装的读取本地存储的方法 网上很多你们自己封装一个就好了这里不表
  let _theme = localStorage.getItem("curTheme");
  // console.log("当前主题类型为", _theme);
  if (_theme) {
    // 删除类名 theme_one 并添加类名 theme_two
    curTheme.value = _theme;
  }
  setTimeout(
    function () {
      initMapArcGis("cesiumContainer");
    }, 500
  )
  //alert("onBeforeMount");
  // if (window.location.pathname == "/") {
  //   window.location.href = "/zonglan";
  // }
});
onMounted(() => {
  // 检查是否被其他标签页登出（通过 forceLogout 标记）
  const forceLogout = localStorage.getItem("forceLogout");
  if (forceLogout) {
    localStorage.removeItem("forceLogout");
    window.location.href = "/login";
    return;
  }

  if(!localStorage.getItem("loginFalse")) {
    // 清除所有存储
    localStorage.clear();
  }

  if(!fetchData()){//没有登录
    return;
  }

  const router = useRouter();
  router.beforeEach((to, from) => {
    //  alert("router1");
  });
  window.loadingShow = loadingShow;
  window.loadingHide = loadingHide;
    if ("/,/login,login".lastIndexOf("," + window.location.pathname) > -1) {
        showComponent.value = false;
        ToggleComponent.value = false;
    }
    else {
      showComponent.value = true;
      ToggleComponent.value = false;
    }
    
    // initMapArcGis("cesiumContainer")
    if ((window.location.href).lastIndexOf("Iframeanme") > -1) {
      // console.error(window.location.href)
      localStorage.setItem("curTheme", "BlueTheme");  //将主题设置为蓝色
      // localStorage.setItem("htmlIframe", (window.location.href).split("=")[1]); //html嵌入shuzidatingWQ页面，修改样式
    }
  

  
  localStorage.setItem("FullScreen", false);
});
const mapType=ref( "上海市");//地图的默认显示范围
function initMapArcGis(container) {
  // arcgis CSS 按需加载，登录页不阻塞
  import("@arcgis/core/assets/esri/themes/dark/main.css");
  require(["esri/config", "esri/tasks/GeometryService"], function (esriConfig, GeometryService) {
    //esriConfig.defaults.geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer");
    //esriConfig.defaults.io.alwaysUseProxy = true;
  });
  require([
    "esri/map",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Point", "esri/SpatialReference",
    "myJs/shswOneMapj02_basemap_dark",
    "myJs/shswOneMapServer",
    "myJs/shswOneMapServer_wxyx",
    "myJs/shsw_dfcmapMapServer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/request",
    "dojo/domReady!"
  ], function (Map, GraphicsLayer, Point, SpatialReference, shswOneMapj02_basemap_dark,shswOneMapServer,shswOneMapServer_wxyx,shsw_dfcmapMapServer,ArcGISTiledMapServiceLayer,
  ArcGISDynamicMapServiceLayer,FeatureLayer,esriRequest) {
    var map = new Map(container, {
      logo: false,
      slider: false, //放大缩小按钮
      //isDoubleClickZoom:false;
      // zoom: 11,//苏州河视角
      zoom: 10,
      maxZoom: 17,
      showLabels: true,
      // center:[-17097.79693518956,4463.8739384186265],//苏州河视角
      center: [3747.490803126537,7980.5747690055],//上海市视角
      spatialReference: { "wkid": 3857 }
    });
    var shswOneMapServerLayer_dark=new shswOneMapj02_basemap_dark("shsw_OneMapServerdark", { visible: false });
    map.addLayer(shswOneMapServerLayer_dark);

    var shswOneMapServerLayer=new shswOneMapServer("shsw_OneMapServer", { visible: false });
    map.addLayer(shswOneMapServerLayer);


    var shswOneMapServer_wxyxLayer=new shswOneMapServer_wxyx("shsw_OneMapServer_wxyx", { visible: false });
    map.addLayer(shswOneMapServer_wxyxLayer);


    //切换主题默认不同的地图
    if(curTheme.value=="default"){
      shswOneMapServerLayer_dark.setVisibility(true);
      shswOneMapServerLayer.setVisibility(false);
    }
    else if(curTheme.value=="BlueTheme"||curTheme.value=="VioletTheme"){
      shswOneMapServerLayer_dark.setVisibility(false);
      shswOneMapServerLayer.setVisibility(true);
    }

    map.on("mouse-move", Location);

    function Location(evt) {
      var mp = evt.mapPoint;
      //try {
      var merPoint = { merX: mp.x.toFixed(6), merY: mp.y.toFixed(6) };
      var temMapoint = convertMercatorToWGS84(merPoint);
      // console.log("坐标：",temMapoint.x.toFixed(6) + "," + temMapoint.y.toFixed(6))
      $("#locationSpan").html(temMapoint.x.toFixed(6) + "," + temMapoint.y.toFixed(6));
      // var centerPoint=map.extent.getCenter();;
      // console.error("中心点经度:", centerPoint.x);
      // console.error("中心点纬度:", centerPoint.y);
      // console.error("空间参考:", centerPoint.spatialReference.wkid); // 例如 4326 或 3857
      //} catch (ex) {
      // $("#locationSpan").html(mp.x.toFixed(6) + "," + mp.y.toFixed(6));
      // console.log("坐标：",mp.x.toFixed(6) + "," + mp.y.toFixed(6))
      //}
    };
    //鼠标点击显示图层信息 

    window.myMap = map;

    bjLayer = new esri.layers.GraphicsLayer({ id: "bj" });
    map.addLayer(bjLayer);

    readJosnRiver(bjLayer);
    if(mapType.value=="上海市"){
      // addSHAreaPolygonSZH(bjLayer,mapType.value);
      addSHOutRings(bjLayer,mapType.value);
    }
    else if(mapType.value=="苏州河"){
      addSHAreaPolygon(bjLayer);
      addSHAreaPolygonSZH(bjLayer,mapType.value);
      queryCompleteSZH(bjLayer);
    }
  });
}

function switch_theme(_theme) {
  curTheme.value = _theme;
  localStorage.setItem("curTheme", _theme);
}
function FullScreen_Type(_type) {
  if (_type == true || _type == "true") {
    $(".aside ").css("right", "1rem");
    $(".tuli ").css("right", "0rem");
    $('.g-lside').animate({ width: 'toggle' }, 500);
    $('.g-rside').animate({ width: 'toggle' }, 500);
    $('.g-bside').animate({ height: 'toggle' }, 500);
  } else if (_type == false || _type == "false") {
    $(".g-lside ").css("display", "block");
    $(".g-rside ").css("display", "block");
    $(".g-bside ").css("display", "flex");
    $(".aside ").css("right", "30rem");
    $(".tuli ").css("right", "29rem");
    router.push({ path: window.location.pathname });
  }
}
function addbillboardLabel(param, mtype) {
  if (mtype == "add") {
    if (param != "") {
      billboardLabelAll.push(param);
    }
  }
  else if (mtype == "del") {
    if (billboardLabelAll.length > 0) {
      for (var num = billboardLabelAll.length - 1; num >= 0; num--) {
        billboardLabelAll[num].destroy();
        billboardLabelAll[num].remove();
      }
    }
  }
  else if (mtype == "get") {
    return billboardLabelAll;
  }

}
var interVal = null;
var totalSeconds = 300; // 5分钟 = 300秒
function switch_datarefresh(_curDataRefresh) {
  localStorage.setItem("curDataRefresh", _curDataRefresh);
  if (_curDataRefresh == true) {

    interVal = setInterval(function () {
      totalSeconds--; // 减少1秒

      var minutes = Math.floor(totalSeconds / 60); // 计算分钟数
      var seconds = totalSeconds % 60; // 计算剩余秒数
      // 格式化时间为 MM:SS
      var formattedTime = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
      // 更新页面上的显示时间
      $('#countdown').text(formattedTime);
      if (totalSeconds <= 0) {
        totalSeconds = 300;
        // try {
        window.curDataRefresh();
        // } catch (ex) { }
      }

    }, 1000)
  }
  else {
    if (interVal !== null) {
      clearInterval(interVal)
    }
  }

}

function switch_BoundaryArea(_BoundaryArea) {
  BoundaryArea.value = _BoundaryArea;
  localStorage.setItem("BoundaryArea", _BoundaryArea);
}

function fetchData() {
  var isLogin=false;
  const router = useRouter();
  const accessToken = localStorage.getItem("token");
  if (accessToken == null) {
    router.push({ path: "/login" });
  } else {
    isLogin=true;
  }
  return isLogin;
}
function ToggleShowHide(val) {
  ToggleComponent.value = val;
  // 设置 ToggleComponent 的值为传入的 val
  ToggleComponent.value = val;
}
// 提供方法给子组件
provide("switch_theme", switch_theme);
provide("FullScreen_Type", FullScreen_Type);
provide("addbillboardLabel", addbillboardLabel);
// 侧边栏
provide("ToggleShowHide", ToggleShowHide);
// 主题
provide("curTheme", curTheme);
provide("switch_datarefresh", switch_datarefresh);
// 遮盖层
provide("switch_BoundaryArea", switch_BoundaryArea);

</script>
<style>
.cesium-viewer-toolbar {
  display: block;
  position: absolute;
  top: 100px;
  right: 475px;
  z-index: 99;
}

.boxwrap {
  position: absolute;
  left: 21%;
  top: 0;
  width: 100%;
  height: 163px;
  border-radius: 50px;
  border: 1px solid #38e1ff;
  background-color: #38e1ff4a;
  box-shadow: 0 0 10px 2px #29baf1;
  animation: slide-af7a2c87 2s;
}

/* 版权信息 */
.cesium-widget-credits {
  display: none !important;
}

/* 小部件 */
.cesium-viewer-toolbar,
/*右上角小部件按钮组*/
.cesium-viewer-animationContainer,
/*左下角动画组件*/
.cesium-viewer-timelineContainer,
/*时间线组件*/
.cesium-viewer-fullscreenContainer,
/*全屏组件*/
.cesium-viewer-bottom {
  display: none !important;
  visibility: hide !important;
}

.cesium-label {
  pointer-events: none;
  /* 防止标签阻止鼠标事件到达下面的div */
  z-index: 1001;
  /* 确保标签的z-index高于div */
}
</style>

<style lang="scss">
/* 站点选择 */
.el-cascader-node {
  padding: 0 0px 0 10px;
  width: 118px;
  color: var(--widgetcolor);
}

.el-cascader-menu {
  min-width: 20px;
}

.el-cascader-menu:last-child .el-cascader-node {
  padding-right: 0px;
}


.el-cascader-node__prefix {
  left: 0px !important;
}

.el-cascader-node__label {
  padding: 0 4px;
}

.el-input__suffix {
  color: var(--popContentHeadbg);
}

.el-cascader__dropdown.el-popper,
.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover,
.el-time-spinner__item:hover:not(.is-disabled):not(.is-active) {
  background: none;
}

.el-cascader__dropdown.el-popper {
  box-shadow: var(--popContentHeadbg);
}

.el-popper.is-light,
.el-popper.is-light .el-popper__arrow:before,
.el-date-picker .el-time-panel {
  border: 1px solid var(--popContentHeadbg);
  background: var(--boxtitlebg);
}

.el-cascader:not(.is-disabled):hover .el-input__wrapper,
.el-input__wrapper {
  box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
  cursor: pointer;
}

// 时间选择框
.el-date-picker,
.el-picker-panel__footer {
  background: none;
  color: var(--widgetcolor);
}

.el-date-picker .el-picker-panel__content {
  // width: 160px;
}

.el-date-picker__header,
.el-picker-panel__content {
  // margin: 6px;
}

.el-date-table td {
  padding: 0;
}

.el-date-picker table {
  width: none !important;
}

.el-date-picker__time-header {
  background: var(--boxtitlebg);
  //display: none;
}

.el-picker-panel__icon-btn,
.el-time-panel__btn {
  // padding: 0;
  color: var(--widgetcolor);
}

.el-input--small .el-input__inner,
.el-date-table th,
.el-date-picker__header-label,
.el-button.is-text,
.el-button.is-plain,
.el-time-spinner__item {
  color: var(--widgetcolor);
}

.el-cascader .el-input.is-focus .el-input__wrapper {
  box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}

.el-time-panel__content:before {
  border-bottom: 1px solid var(--popContentHeadbg);
  border-top: 1px solid var(--popContentHeadbg);
}

.el-cascader-node.in-active-path,
.el-cascader-node.is-selectable.in-checked-path,
.el-year-table td .cell:hover,
.el-date-picker__header-label:hover,
.el-time-spinner__item.is-active:not(.is-disabled) {
  color: var(--swDivSelectcolor);
}

.el-date-table th,
.el-date-picker__time-header {
  border-bottom: 1px solid var(--popContentHeadbg);
}

.el-picker-panel__footer,
.el-time-panel__footer {
  border-top: 1px solid var(--popContentHeadbg);
}

.el-button.is-plain,
.el-button.is-text:not(.is-disabled):hover,
.el-scrollbar__thumb {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}

.el-date-picker__editor-wrap:nth-child(1) .el-input--small .el-input__wrapper {
  width: 90px;
}

.el-date-picker__editor-wrap {
  width: 50%;
}

.el-year-table td {
  padding: 0px;
}

.el-cascader-node.is-active .el-cascader-node__label,
.el-cascader-node.is-active {
  font-size: 1rem;
  color: var(--swDivSelectcolor);
}

.el-date-table td.current:not(.disabled) .el-date-table-cell__text,
.el-year-table td.current:not(.disabled) .cell {
  background-color: var(--swDivSelectcolor);
  border-color: var(--swDivSelectcolor);
  color: #fff;
}

.el-date-table td.today .el-date-table-cell__text,
.el-date-table td.available:hover {
  color: var(--swDivSelectcolor);
}

.mini-buttonedit-border {
  background: var(--swDivSelectcolor);
}
</style>

<style lang="scss">
:deep(.el-select-dropdown__item) {
  color: var(--widgetcolor);
}

:deep(.el-select-dropdown__item.is-hovering) {
  background-color: var(--swDivSelectcolor);
  color: var(--sel_wraplabelcolorSel);
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell) {
  background-color: transparent !important;
}
</style>