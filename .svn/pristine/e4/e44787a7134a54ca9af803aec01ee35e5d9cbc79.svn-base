<template>
  <div id="mainGis">
    <div id="arcgisMap"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loadModules } from "esri-loader";
// import boundaryData from '@/assets/json/boundary.json';
import sz_city_info from "@/assets/json/sz_city_info.json";
import dayjs from "dayjs";
import api from "@/api/Facts/Swindex.js";

// import { useMapStore } from '@/stores/mapStore.js'
// const globaMap = useMapStore()
import { ElMessage } from "element-plus";
import { readLAYERLayer } from "@/api/MapGis/readCityLineLayer";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const props = defineProps({
  menuCur: String,
});

const myMap = ref(null);

function addCityAREA(layer) {
  loadModules([
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/graphic",
    "esri/Color",
  ])
    .then(([Polyline, Polygon, SimpleFillSymbol, SimpleLineSymbol, Graphic, Color]) => {
      if (layer != null) {
        layer.clear();
      }
      var features = sz_city_info.features;
      features.forEach(function (feature) {
        var geometry = feature.geometry;
        var allrings = geometry.coordinates[0];
        var outRings = [
          [90, 10],
          [150, 10],
          [150, 40],
          [90, 40],
          [90, 10],
        ]; //黑色部分（遮盖层）
        var rings = [outRings];
        rings.push(allrings[0]);
        const polygon = new Polygon(rings);
        // symbolColor:地图遮盖层颜色
        if (_theme == "BlueTheme") {
          var symbolColor = new Color([4, 20, 54, 0.25]);
        } else if (_theme == "default") {
          var symbolColor = new Color([4, 20, 54, 0.65]);
        }
        const symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([3, 199, 144]), // 3, 199, 144
            3
          ),
          symbolColor //rgba
        );
        const gra = new Graphic(polygon, symbol);
        layer.add(gra);

        const taihujuXY = allrings;
        const line = new Polyline({
          paths: taihujuXY,
          spatialReference: { wkid: 4326 },
        });
        const lineSymbol = new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([6, 110, 140]), // 38,128,138
          10
        );
        const polyline = new Graphic(line, lineSymbol);
        layer.add(polyline);

        const lineSymbol2 = new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([3, 165, 183]),
          7
        );
        const polyline2 = new Graphic(line, lineSymbol2);
        layer.add(polyline2);

        const lineSymbol3 = new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([2, 216, 224]),
          4
        );
        const polyline3 = new Graphic(line, lineSymbol3);
        layer.add(polyline3);

        const lineSymbol4 = new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([147, 5, 182, 0.85]), //38,126,156
          2
        );
        const polyline4 = new Graphic(line, lineSymbol4);
        layer.add(polyline4);
      });
    })
    .catch((err) => {
      ElMessage.error("地图背景失败，" + err);
    });
}
function addLineLayer(str, layer) {
  if (layer != null) {
    layer.clear();
  }
  const strJson = str;
  const path = new Array();
  for (var num = 0; num < strJson.length; num++) {
    let item = strJson[num];
    let strParam = [Number(item["LGTD"]), Number(item["LTTD"])];
    path.push(strParam);
  }
  loadModules([
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/geometry/Extent",
    "esri/graphic",
    "esri/Color",
    "esri/layers/GraphicsLayer",
    "esri/symbols/CartographicLineSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
  ])
    .then(
      ([
        Point,
        Polyline,
        Polygon,
        Extent,
        Graphic,
        Color,
        GraphicsLayer,
        CartographicLineSymbol,
        SimpleLineSymbol,
        SimpleFillSymbol,
      ]) => {
        const outRings = [
          [90, 10],
          [150, 10],
          [150, 40],
          [90, 40],
          [90, 10],
        ]; //黑色部分（遮盖层）
        const rings = [outRings];
        rings.push(path);
        const polygon = new Polygon(rings);
        const symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([3, 199, 144]), // 3, 199, 144
            3
          ),
          new Color([4, 20, 54, 0.65]) //rgba
        );
        const gra = new Graphic(polygon, symbol);
        layer.add(gra);

        const taihujuXY = [path];
        const line = new Polyline({
          paths: taihujuXY,
          spatialReference: { wkid: 4326 },
        });
        const lineSymbol = new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([6, 110, 140]), // 38,128,138
          10
        );
        const polyline = new Graphic(line, lineSymbol);
        layer.add(polyline);
        const lineSymbol2 = new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([3, 165, 183]),
          7
        );
        const polyline2 = new Graphic(line, lineSymbol2);
        layer.add(polyline2);

        const lineSymbol3 = new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([2, 216, 224]),
          4
        );
        const polyline3 = new Graphic(line, lineSymbol3);
        layer.add(polyline3);

        const lineSymbol4 = new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([147, 5, 182, 0.85]), //38,126,156
          2
        );
        const polyline4 = new Graphic(line, lineSymbol4);
        layer.add(polyline4);

        // this.map.addLayer(layer);

        // this.addAREALineLayer(str, layer);
      }
    )
    .catch((err) => {
      ElMessage.error("地图背景失败，" + err);
    });
}
function _createMapView() {
  loadModules(
    [
      "esri/map",
      "myJs/GDVecLayer",
      "myJs/TDTImgLayer",
      "myJs/TDTNoteLayer",
      "esri/layers/GraphicsLayer",
      "esri/layers/ArcGISDynamicMapServiceLayer",
      "esri/layers/FeatureLayer",
      "esri/layers/ArcGISTiledMapServiceLayer",
      "dojo/domReady!",
    ]
    // ,option
  )
    .then(
      ([
        Map,
        GDVecLayer,
        TDTImgLayer,
        TDTNoteLayer,
        GraphicsLayer,
        ArcGISDynamicMapServiceLayer,
        FeatureLayer,
        ArcGISTiledMapServiceLayer,
      ]) => {
        // 实例化map
        let map = new Map("arcgisMap", {
          logo: false,
          slider: false, //放大缩小按钮
          //isDoubleClickZoom:false;
          zoom: 8,
          maxZoom: 18,
          // isScrollWheel:false,
          showLabels: true,
          center: [120.647711, 31.456948],
          // basemap: "satellite",
          //,basemap: "dark-gray"
          //basemap: "hybrid"
        });
        let url = "";
        //地形图
        let tdtimg = new TDTImgLayer("img", { visible: true });
        let tdtnote = new TDTNoteLayer("vec_img_note", { visible: true });
        map.addLayer(tdtimg, 1);
        map.addLayer(tdtnote, 1);
        //高德
        // let gdvec = new GDVecLayer();
        // map.addLayer(gdvec, 99);
        // // var tdtnote = new TDTNoteLayer("vec_img_note", { visible: false });
        // let tdt = new TDTLayer("vec", { visible: false });
        const bjLayer = new GraphicsLayer({ id: "bj" });
        map.addLayer(bjLayer);
        addCityAREA(bjLayer);

        const myUril =
          "http://116.228.78.60:16080/arcgis/rest/services/kunshanGis20240115/MapServer";
        // var tiledMapServiceLayer = new FeatureLayer(myUril, { id: "sz", visible: false });
        // map.addLayer(tiledMapServiceLayer, 100);
        // const szhlLayer = new FeatureLayer(myUril,  { id: "szhl", visible:true });
        // szhlLayer.setOpacity(0.6);

        const szhlLayer = new ArcGISTiledMapServiceLayer(myUril, {
          id: "szhl",
          visible: true,
        });
        // szhlLayer.setOpacity(0.6);
        // szhlLayer.setVisibleLayers([13, 14]);
        map.addLayer(szhlLayer);
        readLAYERLayer([3, 4], map);

        // this.$globalMap=map;
        myMap.value = map;
        // globaMap.updateMap(map);
        // this.$globalMap.addLayer(new GraphicsLayer({id: "WaterLayer"}));
      }
    )
    .catch((err) => {
      ElMessage.error("地图创建失败，" + err);
    });
}
function getMap() {
  return myMap.value;
}
function MapRead() {
  var AggLayer = [3, 4];
  readCityLineLayer(AggLayer);
}

onMounted(() => {
  _createMapView();
});

defineExpose({
  getMap,
  myMap,
});
</script>

<style>
#mainGis,
#arcgisMap {
  width: 100%;
  height: 100%;
}
</style>
