// GeoJSON 数据改为函数内动态 import，避免打包入入口 chunk
// 原先在此处的静态 import 已移除：
//   SHBJArea → addSHOutRings / addSHAreaPolygonSZH 内动态加载
//   SHSLPBJArea → addSHAreaPolygonSZH 内动态加载
//   szhRiverData → queryCompleteSZH 内动态加载
//   Buffer50m → readJosnRiver 内动态加载
//   SHSLPArea → addSHAreaPolygon 内动态加载

import $ from 'jquery'
import { SetNull } from '@/api/ComUnit'
import { CreateLayer, setLayerToolTip } from "@/utils/ArcGis/MapComm.js";


var SHBJ = "121.301093,31.49873|121.301093,31.49873|121.247507,31.476785|121.241963,31.493117|121.174826,31.44922|121.143413,31.392021|121.113848,31.37465|121.130478,31.343987|121.142797,31.275472|121.090442,31.291838|121.060261,31.245289|121.076892,31.158267|121.018377,31.134194|120.930298,31.141365|120.881023,31.134706|120.859465,31.100379|120.890878,31.094229|120.901349,31.017327|120.901349,31.017327|120.940153,31.010146|120.949392,31.030148|120.989428,31.01425|121.000515,30.938309|120.993124,30.889532|121.020225,30.872069|120.991892,30.837133|121.038087,30.814007|121.060261,30.845354|121.097833,30.857171|121.13787,30.826342|121.123087,30.77905|121.174826,30.771851|121.21671,30.785734|121.232108,30.755909|121.272144,30.723504|121.274608,30.677191|121.362071,30.679764|121.426129,30.730192|121.517288,30.775451|121.601056,30.805269|121.681128,30.818633|121.904714,30.814007|121.943518,30.776993|121.970004,30.789333|121.954605,30.825828|121.994025,30.862823|121.990945,30.96859|121.977395,31.016301|121.946598,31.066039|121.809859,31.196669|121.722396,31.3036|121.599208,31.37465|121.520984,31.394575|121.404571,31.479337|121.343593,31.511996";

//边界线
function addPolyline(myMap) {
  if (SetNull(myMap) == "") {
    myMap = window.map;
  }
  var layerId = "xianaddPolyline";
  var SZBJLayerGraphicLayer = CreateLayer(myMap, layerId, 1); //创建图层
  if (SetNull(SZBJLayerGraphicLayer) != "") {
    try {
      // 图层清理优化
      SZBJLayerGraphicLayer.clear();
    } catch (error) {
      console.error("图层操作异常:", error);
      // 可根据需要添加更详细的错误处理
    }
  }
  require([
    "esri/geometry/Polyline",
    "esri/graphic",
    "esri/Color",
    "esri/symbols/SimpleLineSymbol",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleFillSymbol",
  ], function (Polyline, Graphic, Color, SimpleLineSymbol, Polygon, SimpleFillSymbol) {
    var features = sz_city_info.features;
    if (features.length > 0) {
      for (var num = 0; num < features.length; num++) {
        var rings = [];// [outRings];
        var paths = features[num].geometry.coordinates[0][0];

        rings.push(paths);
        var area = new Polygon(rings);
        var symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(
SimpleLineSymbol.STYLE_SOLID,
new Color([247, 201, 221, 0.6]), //rgb155, 153, 153
8
          ),
          new Color([4, 20, 54, 0]) //rgba
        );
        var gra = new Graphic(area, symbol);
        SZBJLayerGraphicLayer.add(gra);

        symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(
SimpleLineSymbol.STYLE_SOLID,
new Color([247, 173, 204, 0.7]), //rgb155, 153, 153
4
          ),
          new Color([4, 20, 54, 0]) //rgba
        );
        gra = new Graphic(area, symbol);
        SZBJLayerGraphicLayer.add(gra);

        symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(
SimpleLineSymbol.STYLE_SOLID,
new Color([207, 62, 242, 0.8]), //rgb155, 153, 153
1
          ),
          new Color([4, 20, 54, 0]) //rgba
        );
        gra = new Graphic(area, symbol);
        SZBJLayerGraphicLayer.add(gra);
      }
    }
  });
}

//河道
async function readJosnRiver(layer) {
  const Buffer50m = (await import("@/assets/json/一级河流_Buffer50m.json")).default;
  require([
    "esri/graphic",
    "esri/Color",
    "esri/symbols/SimpleLineSymbol",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleFillSymbol",
  ], function (Graphic, Color,
    SimpleLineSymbol, Polygon, SimpleFillSymbol) {
    //市外的
    var features = Buffer50m.features;
    features.forEach(function (feature) {
      var geometry = feature.geometry;
      var coordinates = geometry.coordinates;
      var properties = feature.properties;
      var area = new Polygon(coordinates);
      var lineSymbol = new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([7, 152, 201, 0.3]), //rgb155, 153, 153
          1
        ),
        new Color([7, 152, 201, 0.3]) //rgba
      );
      var gra = new Graphic(area, lineSymbol);
      gra.name = properties.ENNM;
      gra.attr("name", properties.ENNM);
      gra.attributes = properties;
      layer.add(gra);
    });
  });
}


//上海市*********************************************************
async function addSHOutRings(layer,infoType) {
  var AllPath = [];
  if (infoType == "上海市") {
      const SHBJArea = (await import("@/assets/json/SHBJ2000.json")).default;
      require(["esri/geometry/Point",
          "esri/geometry/Polyline",
          "esri/geometry/Extent",
          "esri/graphic",
          "esri/Color",
          "esri/layers/GraphicsLayer",
          "esri/symbols/CartographicLineSymbol",
          "esri/symbols/SimpleLineSymbol",
          "esri/geometry/Polygon",
          "esri/symbols/SimpleFillSymbol",
      ], function (Point, Polyline, Extent, Graphic, Color, GraphicsLayer, CartographicLineSymbol,
          SimpleLineSymbol, Polygon, SimpleFillSymbol) {
          // map.setZoom(10);
          // dyCenter(121.394615, 31.088122);
          var features = SHBJArea.features;
          if (features.length > 0) {
              var polyline1 = [], polyline2 = [], polyline3 = [], polyline4 = [];
              for (var num = 0; num < features.length; num++) {
                  var str = SHBJ;
                  var arr = str.split("|");
                  // var layer = new GraphicsLayer();
                  // map.addLayer(layer, 0);
                  var outRings = [
                    [90, 10],
                    [150, 10],
                    [150, 40],
                    [90, 40],
                    [90, 10]
                  ]; //黑色部分
                  var rings = [];// [outRings];
                  var paths = features[num].geometry.coordinates;
                  //1200:121.0138::::30.8709 ----北部线
                  //4500:120.93250142893744::::30.40905001052652 -----东排线
                  //4850:120.43532336023243::::30.375046653468228
                  //arr.length-4350:120.70105838141707::::30.907804802474246
                  var strNP = [];
                  //for (var i = 0; i < arr.length; i++) {
                  //    //19
                  //    //19-39    i >=19&&i<39
                  //    //i >=39 && i < arr.length
                  //    var p = arr[i].split(",");
                  //    var tempP = Convert_BD09_To_GCJ02(p[1], p[0]);
                  //    var NumPs = tempP.split(":");
                  //    var points = [Number(NumPs[0]), Number(NumPs[1])];
                  //    paths.push(points);
                  //    strNP.push(points);

                  //    //console.error((p[0]) + "::::" + (p[1]));

                  //    if (i < 19) {
                  //        polyline1.push(points);
                  //    }
                  //    else if (i >= 19 && i <= 35) {
                  //        polyline4.push(points);
                  //    }
                  //    else if (i >= 35 && i <= 50) {
                  //        polyline2.push(points);
                  //    } else if (i >= 50 && i < arr.length) {
                  //        polyline3.push(points);
                  //    }
                  //}
                  // console.error(JSON.stringify(strNP));
                  var _name = features[num].properties["区县名称"];
                  if (_name == "金山区") {
          for (var i = 0; i < paths.length; i++) {
              var points = paths[i];
              if (i < 1400) {
                  polyline1.push(points);
              }
              else if (i >= 1400 && i <= 3400) {
                  polyline4.push(points);
              }
              else if (i >= 3400 && i <= 6800) {
                  polyline2.push(points);
              } else if (i >= 6800 && i < paths.length) {
                  polyline3.push(points);
              }
          }
          //console.error(polyline1);
                  }

                  rings.push(paths);
                  var area = new Polygon(rings);
                  var symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID,
              new Color([39, 115, 230, 1]), //rgb155, 153, 153
              2
          ),
          new Color([4, 20, 54, 0]) //rgba
                  );
                  var gra = new Graphic(area, symbol);
                  layer.add(gra);

              }

              //polyline1.push();
              var line = new Polyline({
                  "paths": [polyline1],
                  "spatialReference": { "wkid": 4326 }
              });
              var lineSymbol = new SimpleLineSymbol(
                  SimpleLineSymbol.STYLE_SOLID,
                  new Color([171, 233, 13]),
                  3);
              var polyline = new Graphic(line, lineSymbol);
              layer.add(polyline);


              line = new Polyline({
                  "paths": [polyline2],
                  "spatialReference": { "wkid": 4326 }
              });
              lineSymbol = new SimpleLineSymbol(
                  SimpleLineSymbol.STYLE_SOLID,
                  new Color([255, 217, 96]),
                  3);
              polyline = new Graphic(line, lineSymbol);
              layer.add(polyline);

              line = new Polyline({
                  "paths": [polyline3],
                  "spatialReference": { "wkid": 4326 }
              });
              lineSymbol = new SimpleLineSymbol(
                  SimpleLineSymbol.STYLE_SOLID,
                  new Color([38, 159, 219]),
                  3);
              polyline = new Graphic(line, lineSymbol);
              layer.add(polyline);


              line = new Polyline({
                  "paths": [polyline4],
                  "spatialReference": { "wkid": 4326 }
              });
              lineSymbol = new SimpleLineSymbol(
                  SimpleLineSymbol.STYLE_SOLID,
                  new Color([1, 242, 165]),
                  3);
              polyline = new Graphic(line, lineSymbol);
              layer.add(polyline);
          }
      });
  }
  else {
      $.get(
          "/Common/上海市行政分区.json",//json路径
          function (data, status) {
  if (status === "success") {
      var features = data.features;
      if (features.length > 0) {
          for (num = 0; num < features.length; num++) {
  var _name = features[num].properties.NAME;
  if (_name == infoType) {
      var treeID = "", LEFTTREEID = "";
      if (_name == "宝山区") {
          map.setZoom(12);
          dyCenter(121.404861, 31.392111);
          AllPath = features[num].geometry.coordinates;
          treeID = '202107192057159372';
          LEFTTREEID = '2021120815090047814';
      } else if (_name == "崇明区") {
          map.setZoom(11);
          dyCenter(121.568484, 31.635916);
          AllPath = features[num].geometry.coordinates;
          treeID = '2021071920573420901';
          LEFTTREEID = '2021120815095573746';
      } else if (_name == "奉贤区") {
          map.setZoom(12);
          dyCenter(121.458472, 30.912345);
          AllPath = features[num].geometry.coordinates;
          treeID = '2021071919594640338';
          LEFTTREEID = '2021120815105417163';
      } else if (_name == "嘉定区") {
          map.setZoom(11);
          dyCenter(121.250333, 31.383524);
          AllPath = features[num].geometry.coordinates;
          treeID = '2021071920581856197';
          LEFTTREEID = '202112081513059979';
      } else if (_name == "金山区") {
          map.setZoom(11);
          dyCenter(121.255144, 30.818932);
          AllPath = features[num].geometry.coordinates;
          treeID = '2021071920583494398';
          LEFTTREEID = '2021120815125836251';
      } else if (_name == "闵行区") {
          map.setZoom(12);
          dyCenter(121.418901, 31.087213);
          AllPath = features[num].geometry.coordinates;
          treeID = '2021071920585035071';
          LEFTTREEID = '2021120815111949288';
      } else if (_name == "浦东新区") {
          map.setZoom(11);
          dyCenter(121.742177, 31.083823);
          AllPath = features[num].geometry.coordinates;
          treeID = '2021071920585796245';
          LEFTTREEID = '2021120815124994986';
      } else if (_name == "青浦区") {
          map.setZoom(11);
          dyCenter(121.085191, 31.124693);
          AllPath = features[num].geometry.coordinates;
          treeID = '2021071920585796245';
          LEFTTREEID = '2021120815124994986';
      } else if (_name == "松江区") {
          map.setZoom(11);
          dyCenter(121.223543, 31.030470);
          AllPath = features[num].geometry.coordinates;
          treeID = '2021071920585796245';
          LEFTTREEID = '2021120815124994986';
      } else if (_name == "中心城区") {
          map.setZoom(11);
          dyCenter(121.450659, 31.270821);
          AllPath = features[num].geometry.coordinates;
          treeID = '2021071920585796245';
          LEFTTREEID = '2021120815124994986';
      }

      require(["esri/geometry/Point",
          "esri/geometry/Polyline",
          "esri/geometry/Extent",
          "esri/graphic",
          "esri/Color",
          "esri/layers/GraphicsLayer",
          "esri/symbols/CartographicLineSymbol",
          "esri/symbols/SimpleLineSymbol",
          "esri/geometry/Polygon",
          "esri/symbols/SimpleFillSymbol",
      ], function (Point, Polyline, Extent, Graphic, Color, GraphicsLayer, CartographicLineSymbol,
          SimpleLineSymbol, Polygon, SimpleFillSymbol) {
  var outRings = [
      [90, 10],
      [150, 10],
      [150, 40],
      [90, 40],
      [90, 10]
  ]; //黑色部分
  var rings = [];//; [outRings];
  var paths = [];
  paths = AllPath;
  console.error(AllPath);
  rings.push(paths);
  var area = new Polygon(rings);
  var symbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID,
      new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([72, 103, 136]), //rgb155, 153, 153
          5
      ),
      new Color([4, 20, 54, 0]) //rgba
  );
  var gra = new Graphic(area, symbol);
  layer.add(gra);
          });


      try {
          $.data(myData, "TREEID", LEFTTREEID);
          //$("#iframeRight")[0].contentWindow.CITYSWDataLED(LEFTTREEID);
      } catch (ex) { }
      try {
          $.data(myData, "LEFTTREEID", LEFTTREEID);
          //$("#iframeLeft")[0].contentWindow.CITYSWDataLED($.data(myData, "LEFTTREEID"));
      } catch (ex) { }
  }
          }
      }
  }
          },
          "json"
      );
  }
}
//上海市*********************************************************


//一河四片*********************************************************
//行政分区边界
async function addSHAreaPolygon(layer) {
  const SHSLPArea = (await import("@/assets/json/四片2000.json")).default;
  require(["esri/geometry/Point",
    "esri/graphic",
    "myJs/MapText",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color", "esri/symbols/TextSymbol", "esri/symbols/Font",
    "dojo/_base/lang",
    "esri/geometry/Polygon",
    "dojo/domReady!"
  ], function (Point, Graphic, MapText, PictureMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol, Color
    , TextSymbol, Font, lang, Polygon) {
    var features = SHSLPArea.features;
    features.forEach(function (feature) {
      var allrings = feature.geometry.coordinates;
      var properties = feature.properties;
      var mc = properties["MC"];
      var areaname = mc;
      var colorStr = [22, 255, 141];
      if (colorStr != null && colorStr != "" && colorStr != undefined) {
        var fillColorStr = [0,176,80, 0.3];

        var op=0.15;
        fillColorStr=[0,251,255,op];
        // fillColorStr = [193, 235, 93, op];
        // if(mc=="嘉宝北片"){
        //     fillColorStr=[233,214,32,op];
        // }
        // else if(mc=="蕴南片"){
        //     fillColorStr=[193,235,93,op];
        // }
        // else if(mc=="淀北片"){
        //     fillColorStr=[172,245,122,op];
        // }
        // else if(mc=="青松片"){
        //     fillColorStr=[132,243,160,op];
        // }
        // else if(mc=="中心城"){
        //     fillColorStr=[153,255,153,op];
        // }

        allrings.forEach(function (rings) {
          var area = new Polygon(rings);
          var symbol = new SimpleFillSymbol(
SimpleFillSymbol.STYLE_SOLID,
new SimpleLineSymbol(
  SimpleLineSymbol.STYLE_SOLID,
  new Color(colorStr),//rgb  边框色
  2
),
new Color(fillColorStr)//rgba  中间填充色
          );
          var g3 = new Graphic(area, symbol);
          layer.add(g3);

          // colorStr = [3, 165, 183];
          // symbol = new SimpleFillSymbol(
          //   SimpleFillSymbol.STYLE_SOLID,
          //   new SimpleLineSymbol(
          //     SimpleLineSymbol.STYLE_SOLID,
          //     new Color(colorStr),//rgb  边框色
          //     7
          //   ),
          //   new Color(fillColorStr)//rgba  中间填充色
          // );
          // g3 = new Graphic(area, symbol);
          // layer.add(g3);

        }, this);
      }
      if (properties.lgtd != undefined) {
        var point = new Point({ "x": properties.lgtd, "y": properties.lttd, "spatialReference": { "wkid": 4326 } });
        var font = new Font("15px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, "bold");
        var textSymbol = new TextSymbol(
          areaname,
          font,
          new Color([255, 255, 255])
        );

        textSymbol = new TextSymbol(areaname).//动态设置文本值 
setColor(new dojo.Color([39,115,230])).//setColor设置文本颜色 
setFont(new esri.symbol.Font("16px")//setFont设置文本大小 
    //.setWeight(esri.symbol.Font.WEIGHT_BOLD)//setWeight设置文本粗体
).
setOffset(0, 10).
setHaloColor(new Color([255, 255, 255])).
setHaloSize(1.2);
        var labelPointGraphic = new Graphic(point, textSymbol);
        layer.add(labelPointGraphic);


        
      }
      else {
        console.error("缺少中心点经纬度的区域", areaname);
      }
    }, this);
  });
}
//一河四片
async function addSHAreaPolygonSZH(layer,mapType="上海市") {
  const SHBJArea = (await import("@/assets/json/SHBJ2000.json")).default;
  const SHSLPBJArea = (await import("@/assets/json/四片边界2000.json")).default;
  require(["esri/geometry/Point",
    "esri/graphic",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color", "esri/symbols/TextSymbol", "esri/symbols/Font",
    "esri/geometry/Polygon",
    "dojo/domReady!"
  ], function (Point, Graphic, SimpleFillSymbol, SimpleLineSymbol, Color
    , TextSymbol, Font, Polygon) {
    var features = {};
    if(mapType=="上海市"){
      features=SHBJArea.features;
    }
    else if(mapType=="苏州河"){
      features=SHSLPBJArea.features;
    }
    features.forEach(function (feature) {
      var allrings = feature.geometry.coordinates;
      var properties = feature.properties;
      var mc = properties["NAME"];
      // if("嘉宝北片,蕴南片,青松片,淀北片,中心城".indexOf(mc)==-1){
      //   return;
      // }
      var areaname = mc;
      var colorStr = [6, 110, 140];
      if (colorStr != null && colorStr != "" && colorStr != undefined) {
        var fillColorStr = [4, 20, 54, 0.7];
        allrings.forEach(function (ring,index) {
          // if(index==0){
          //   return ;
          // }
          // var outRings = [
          //     [90, 10],
          //     [150, 10],
          //     [150, 40],
          //     [90, 40],
          //     [90, 10]
          // ]; //黑色部分
          var outRings = [
  [-3626061.2384930467,-2163883.458985268],
  [3257779.7373615103,-2200869.829524833],
  [ 2450759.66837913,1383329.9875715086],
  [-2705242.8447628375,1477823.2144608274],
  [-3626061.2384930467,-2163883.458985268]
          ]; //黑色部分

          var rings = [outRings];
          rings.push(ring);
          var area = new Polygon(rings);
var symbol = new SimpleFillSymbol(
  SimpleFillSymbol.STYLE_SOLID,
  new SimpleLineSymbol(
    SimpleLineSymbol.STYLE_SOLID,
    new Color(colorStr),//rgb  边框色
    7
  ),
  new Color(fillColorStr)//rgba  中间填充色
);
var g3 = new Graphic(area, symbol);
g3.attr("class","longzhaoceng");
layer.add(g3);

colorStr = [3, 165, 183];
symbol = new SimpleFillSymbol(
  SimpleFillSymbol.STYLE_SOLID,
  new SimpleLineSymbol(
    SimpleLineSymbol.STYLE_SOLID,
    new Color(colorStr),//rgb  边框色
    4
  ),
  new Color([0,0,0,0])//rgba  中间填充色
);
g3 = new Graphic(area, symbol);
g3.attr("class","longzhaoceng");
layer.add(g3);

colorStr = [2, 216, 224];
symbol = new SimpleFillSymbol(
  SimpleFillSymbol.STYLE_SOLID,
  new SimpleLineSymbol(
    SimpleLineSymbol.STYLE_SOLID,
    new Color(colorStr),//rgb  边框色
    3
  ),
  new Color([0,0,0,0])//rgba  中间填充色
);
g3 = new Graphic(area, symbol);
g3.attr("class","longzhaoceng");
layer.add(g3);

colorStr = [147, 5, 182, 0.85];
symbol = new SimpleFillSymbol(
  SimpleFillSymbol.STYLE_SOLID,
  new SimpleLineSymbol(
    SimpleLineSymbol.STYLE_SOLID,
    new Color(colorStr),//rgb  边框色
    2
  ),
  new Color([0,0,0,0])//rgba  中间填充色
);
g3 = new Graphic(area, symbol);
g3.attr("class","longzhaoceng");
layer.add(g3);
         }, this);
      }
      if (properties.centroid != undefined) {
        var point = new Point({ "x": properties.centroid[0], "y": properties.centroid[1], "spatialReference": { "wkid": 4326 } });
        var font = new Font("15px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, "bold");
        var textSymbol = new TextSymbol(
          areaname,
          font,
          new Color([16, 56, 151])
        );
        var labelPointGraphic = new Graphic(point, textSymbol);
        layer.add(labelPointGraphic);
      }
      else {
        console.error("缺少中心点经纬度的区域", areaname);
      }
    }, this);
  });
}
//查询结果换颜色
async function queryCompleteSZH(layer) {
    const szhRiverData = (await import("@/assets/json/苏州河.json")).default;
    require(["esri/geometry/Point",
    "esri/graphic",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/geometry/Polygon",
    "dojo/domReady!"
    ], function (Point, Graphic,  SimpleFillSymbol, SimpleLineSymbol, Color, Polygon) {
    //读取json文件
    var features = szhRiverData.features;
    features.forEach(function (feature) {
      var allrings = feature.geometry.coordinates;
      var type = feature.geometry.type;
      allrings.map(allring => {
          var polygon = new Polygon(allring);
          var properties = feature.properties;
          var color = 1;
          var colorStr = [7, 152, 201, 0.6];
          var fillColorStr = [7, 152, 201, 0.6];
          // console.error("type::::::" + type);

          var fs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
  new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
      new Color(colorStr), 5), new Color(fillColorStr)
          );
          var g3 = new Graphic(polygon, fs);
          g3.attributes = properties;
          layer.add(g3);
      })
    }, this);
  });
}      
//一河四片*********************************************************

export {
  addPolyline,
  addSHAreaPolygon,
  addSHAreaPolygonSZH,
  readJosnRiver,
  queryCompleteSZH,
  addSHOutRings
}