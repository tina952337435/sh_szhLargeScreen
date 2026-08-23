<template>
  <!-- 侧边栏菜单 -->
  <aside class="aside">
    <tabToggleSQ />
  </aside>

  <!-- 右侧站点树 -->
  <div class="g-rside">
    <div style="width: 100%">
      <div class="m-box m-box-3 m-box-right" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
          <div class="d1"></div>
          <div class="d2"></div>
          <p class="base-p1" id="title2">视频监控</p>
          <span class="spanTitle"></span>
        </div>

        <div class="txt">
          <div class="search-box">
            <!-- <span class="search-label">名称：</span> -->
            <input id="videoNameText" name="videoName" class="textbox" style="width: 200px;margin-left:22px;" placeholder="请输入站点/摄像头名称"
              @keyup.enter="BtnSearch()" />
            <el-button type="primary" style="margin-left: 20px" @click="BtnSearch()">查询</el-button>
          </div>
          <div class="tableWQ" style="height: calc(100% - 40px); width: 98%;">
            <div class="tableWQDIV" style="height: 100%; width: 100%; overflow-y: auto; padding: 10px 10px;">
              <el-tree
                :data="treeResult"
                :props="defaultProps"
                node-key="id"
                :default-expand-all="true"
                :expand-on-click-node="false"
                @node-click="handleTreeNodeClick"
              />
            </div>
          </div>
        </div>
        <div class="bot leftBottom-radius"></div>
      </div>
    </div>
  </div>

  <!-- 图例：标注开关 -->
  <div class="tuli">
    <div>
      <el-switch class="switch-xs" v-model="labelShow" @change="SpanItem" />
      <span style="vertical-align: -10px; margin-left: 50px">标注</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, defineAsyncComponent, h } from "vue";
import { ElMessage } from "element-plus";
import tabToggleSQ from "@/components/tab/tabToggleSQ.vue";
import api from "@/api/zonglan/index.js";
import { SetNull } from "@/api/ComUnit";
import Dialog from "@/api/utils/Dialog.js";
import {
  CreateLayer,
  setLayerToolTip,
  setZOOM,
  dyCenter,
  removeEntityByName,
  addAreaLineQS,
  map,
  labels,
  globallevel
} from "@/utils/ArcGis/MapComm.js";
import $ from "jquery";

// 视频播放器（懒加载）
const VideoPlayerAsync = defineAsyncComponent(() => import("@/components/menu/video/VideoPlayer.vue"));
// 单站横向关联弹窗（默认切到视频 tab）
const DanZHanSelAsync = defineAsyncComponent(() => import("@/components/danzhan/sq/DanZHanSel.vue"));

// el-tree 配置
const defaultProps = { children: "children", label: "name" };

// 站点树（站点 pid=-1 为父节点，子摄像头 pid=站点id 为子节点）
const treeResult = ref([]);
// 全部数据（原始平铺）
const videoListAll = reactive([]);
// 是否显示站点名称标注（默认不显示）
const labelShow = ref(false);

onMounted(() => {
  $("#tabvideo").addClass("swDivSelect swDiv");
  $("#m_shik").addClass("z-crtitem z-crt wow slideInUp link-item");
  addAreaLineQS();        // 回到初始地图视角
  clearALL();             // 清除其他界面遗留的图层和图标
  Weacontent();
});

onUnmounted(() => {
  clearALL();             // 切页面时清空绘制的图层
});

// 清除地图上其他界面遗留的图层和图标
function clearALL() {
  try {
    removeEntityByName();
  } catch (ex) { }
}

// 加载视频监控数据
function Weacontent() {
  api
    .myVideoFindResult({})
    .then((res) => {
      var list = res.data || [];
      videoListAll.length = 0;
      for (var i = 0; i < list.length; i++) {
        videoListAll.push(list[i]);
      }
      bindTree();
      addVideoMark(treeResult.value, labelShow.value);
    })
    .catch(() => {
      ElMessage.error("视频监控数据加载失败");
    });
}

// 站点分组：pid=-1 为站点，pid=站点id 为子摄像头
function buildStations(list) {
  var stations = [];
  var cameraMap = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    if (SetNull(item.pid) == "" || item.pid == "-1") {
      stations.push(item);
    } else {
      (cameraMap[item.pid] || (cameraMap[item.pid] = [])).push(item);
    }
  }
  for (var j = 0; j < stations.length; j++) {
    stations[j].children = cameraMap[stations[j].id] || [];
  }
  return stations;
}

// 根据名称过滤并生成站点树
function bindTree() {
  var keyvalue = $("#videoNameText").val();
  var stations = buildStations(videoListAll);
  if (SetNull(keyvalue) != "") {
    stations = stations.filter(function (station) {
      if (String(station.name).indexOf(keyvalue) > -1) return true;
      var children = station.children || [];
      for (var c = 0; c < children.length; c++) {
        if (String(children[c].name).indexOf(keyvalue) > -1) return true;
      }
      return false;
    });
  }
  treeResult.value = stations;
}

// 查询按钮
function BtnSearch() {
  bindTree();
  addVideoMark(treeResult.value, labelShow.value);
}

// 站点图标（立杆球机 + 数量角标，主色 #00e4ff）
function buildVideoIconUrl(count) {
  var badge = "";
  if (Number(count) > 1) {
    badge =
      '<circle cx="34" cy="9" r="8" fill="#ff4d4f"/>' +
      '<circle cx="34" cy="9" r="8" fill="none" stroke="#fff" stroke-opacity="0.85" stroke-width="1"/>' +
      '<text x="34" y="12" font-size="10" font-weight="bold" fill="#fff" text-anchor="middle">' + count + '</text>';
  }
  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="48" viewBox="0 0 44 48">' +
    '<defs>' +
    '<linearGradient id="pole" x1="0" y1="0" x2="1" y2="0">' +
    '<stop offset="0%" stop-color="#d3faff"/><stop offset="45%" stop-color="#00c8e0"/><stop offset="100%" stop-color="#005e6a"/>' +
    '</linearGradient>' +
    '<radialGradient id="ball" cx="36%" cy="30%" r="72%">' +
    '<stop offset="0%" stop-color="#d9fbff"/><stop offset="42%" stop-color="#00e4ff"/><stop offset="100%" stop-color="#00606e"/>' +
    '</radialGradient>' +
    '<radialGradient id="lens" cx="38%" cy="35%" r="65%">' +
    '<stop offset="0%" stop-color="#16323c"/><stop offset="100%" stop-color="#000000"/>' +
    '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="19" cy="44" rx="12" ry="3" fill="#000" opacity="0.38"/>' +
    '<rect x="17" y="22" width="4" height="21" rx="2" fill="url(#pole)"/>' +
    '<ellipse cx="19" cy="43" rx="5.5" ry="2.2" fill="#005e6a"/>' +
    '<circle cx="19" cy="14" r="11" fill="url(#ball)"/>' +
    '<ellipse cx="15" cy="10" rx="4" ry="2.5" fill="#fff" opacity="0.55" transform="rotate(-28 15 10)"/>' +
    '<circle cx="19" cy="15" r="5.2" fill="url(#lens)"/>' +
    '<circle cx="17.8" cy="13.8" r="1.6" fill="#58e4ff" opacity="0.85"/>' +
    '<rect x="14" y="22" width="10" height="4" rx="2" fill="#008496"/>' +
    badge +
    '</svg>';
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// 在地图上绘制站点点位（每个站点一个图标，带摄像头数量角标 + 可选站名标注）
function addVideoMark(stations, showLabel) {
  var layerId = "addVideoMark";
  var videoLayer = CreateLayer(layerId);
  if (SetNull(videoLayer) != "") {
    videoLayer.clear();
    try {
      videoLayer.off("click", onVideoMarkClick);
    } catch (error) { }
    videoLayer.on("click", onVideoMarkClick);
    setLayerToolTip(videoLayer, "name", "", "");
  }
  // 清除旧站名标注（DOM 标注，参考 shuzidatingLL）
  $(".gcText").remove();

  setTimeout(function () {
    if (SetNull(stations) == "" || stations.length == 0) return;
    require([
      "esri/geometry/Point",
      "esri/graphic",
      "myJs/MapTextPagehome",
      "esri/symbols/PictureMarkerSymbol",
      "esri/layers/GraphicsLayer",
      "esri/SpatialReference",
      "dojo/domReady!"
    ], function (Point, Graphic, MapTextPagehome, PictureMarkerSymbol, GraphicsLayer, SpatialReference) {
      for (var i = 0; i < stations.length; i++) {
        var station = stations[i];
        var cameras = station.children || [];
        // 坐标：站点自身优先，否则取第一个子摄像头
        var lgtd = station.lgtd;
        var lttd = station.lttd;
        if ((SetNull(lgtd) == "" || SetNull(lttd) == "") && cameras.length) {
          lgtd = cameras[0].lgtd;
          lttd = cameras[0].lttd;
        }
        if (SetNull(lgtd) == "" || SetNull(lttd) == "") continue;

        // 图标底部锚到点位
        var symbol = new PictureMarkerSymbol(buildVideoIconUrl(cameras.length), 34, 37).setOffset(0, -18);
        var attrs = { name: station.name, station: station };
        var point = new Point({
          "x": lgtd,
          "y": lttd,
          "spatialReference": { "wkid": 4326 }
        });
        var graphic = new Graphic(point, symbol, attrs, null);
        videoLayer.add(graphic);

        // 标注：显示所有站名（参考 shuzidatingLL 的 MapTextPagehome）
        if (showLabel && SetNull(station.name) != "") {
          station.divid = "video" + station.id;
          var textStr = station.name + "@";
          var label = new MapTextPagehome(map, point, station, textStr, globallevel, "bottom", "gcText", 12);
          labels.push(label);
        }
      }
    });
  }, 100);
}

// 地图站点点击：弹窗（左侧摄像头列表 + 右侧播放器）
function onVideoMarkClick(evt) {
  var attrs = evt.graphic.attributes;
  if (SetNull(attrs) == "") return;
  openStation(attrs.station);
}

// 树节点点击：站点 -> 定位+弹窗；摄像头 -> 定位+直接播放
function handleTreeNodeClick(data) {
  if (data.children !== undefined) {
    locateNode(data);
    openStation(data);
  } else {
    locateNode(data);
    openPlayer(data);
  }
}

// 取节点坐标（站点自身优先，否则取第一个子摄像头）
function getNodeCoord(node) {
  var lgtd = node.lgtd;
  var lttd = node.lttd;
  if ((SetNull(lgtd) == "" || SetNull(lttd) == "") && node.children && node.children.length) {
    lgtd = node.children[0].lgtd;
    lttd = node.children[0].lttd;
  }
  return { lgtd: lgtd, lttd: lttd };
}

// 定位到节点
function locateNode(node) {
  var coord = getNodeCoord(node);
  if (SetNull(coord.lgtd) != "" && SetNull(coord.lttd) != "") {
    setZOOM(13);
    dyCenter(coord.lgtd, coord.lttd);
  }
}

// 标注开关切换
function SpanItem() {
  addVideoMark(treeResult.value, labelShow.value);
}

// 打开站点弹窗（横向关联 DanZHanSel，默认视频 tab）
function openStation(station) {
  Dialog.open(
    { title: station.name || "视频监控", widh: 1500, heig: 700 },
    h(DanZHanSelAsync, { stcd: station.id, stnm: station.name, type: "视频监控" })
  ).then(() => {});
}

// 直接播放单个摄像头
function openPlayer(camera) {
  if (SetNull(camera.serial) == "" || SetNull(camera.channels) == "") {
    ElMessage.warning("该摄像头缺少视频编码，无法播放");
    return;
  }
  Dialog.open(
    { title: camera.name || "视频监控", widh: 1100, heig: 700 },
    h(VideoPlayerAsync, { serial: camera.serial, code: camera.channels, muted: true })
  ).then(() => {});
}
</script>

<style src="@/assets/styles/Table.css"></style>
<style scoped>
.search-box {
  height: 40px;
  line-height: 40px;
  width: 100%;
  color: var(--mtablecolor) !important;
  padding-left: 10px;
}

.search-label {
  color: var(--mtablecolor) !important;
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

:deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}

.tableWQDIV::-webkit-scrollbar {
  width: 2px;
}

.tableWQDIV::-webkit-scrollbar-thumb {
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

/* el-tree 深色主题 */
.el-tree {
  background: none;
  color: var(--mtablecolor);
}
:deep(.el-tree-node__content) {
  height: 32px;
  background: none;
}
:deep(.el-tree-node__content:hover) {
  background: rgba(0, 228, 255, 0.12);
}
:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background: none;
}
:deep(.el-tree-node__expand-icon) {
  color: var(--mtablecolor);
}
:deep(.el-tree-node__label) {
  color: var(--mtablecolor);
}

/* 标注开关 */
.tuli {
  width: 115px;
  color: white;
  font-size: 14px;
  padding: 0px 5px;
  cursor: pointer;
  position: absolute;
  border-radius: 8px;
  bottom: 15px;
  right: 29rem;
  padding: 10px 0px 20px 0px !important;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
}

.switch-xs {
  position: absolute;
  left: 6px;
  height: 40px;
  line-height: 40px;
}
.m-box-right{
  box-shadow:none;
}
</style>
