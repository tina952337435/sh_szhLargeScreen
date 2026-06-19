import { SetNull, Getmtype } from "@/api/ComUnit.js";

import $ from "jquery";

import { convertToDate } from "@/api/dateUtil.js";

import dayjs from "dayjs";

import { ref, reactive, createVNode, defineAsyncComponent, h } from 'vue';

import { CreateLayer, destroy, globallevel, globalalign, map, labels, setLayerToolTip,dyCenter,setZOOM,CreateImageLayer  } from "@/utils/ArcGis/MapComm.js";

var countyLayer1, TyphoonMarkerLayer,TyphoonLineLayer,ybjyLayer;
var myMapImageLayer,strImageLayer;
const _theme = localStorage.getItem("curTheme");
const backgroundColor = ref('#fff');//背景颜色
const fillColor = ref('#000');
const WQBack = ref('00a3ff');
if (_theme == "default") {
  backgroundColor.value = '#031426';//背景颜色
  fillColor.value = '#fff';
  WQBack.value = '#00a3ff';
} else if (_theme == "BlueTheme") {
  backgroundColor.value = '#fff';//背景颜色
  fillColor.value = '#000';
  WQBack.value = '2493f2';
} else if (_theme == "VioletTheme") {
  backgroundColor.value = '#fff';//背景颜色
  fillColor.value = '#000';
  WQBack.value = '#7e73e9';
}
//台风警戒线
function drawWarningLineLayer() {
  try {
    countyLayer1 = CreateLayer("Area_Layer1");
    ybjyLayer= CreateLayer("ybjyLayer1");
    var yelloLine24 = [[[105, 0], [113.0033, 4.4943], [119.0479, 10.8333], [119, 18], [127.0459, 21.9430], [127.0459, 33.9434]]];
    var blueLine48 = [[[105, 0], [120.0586, -0.0659], [132.0117, 14.9713], [132.0035, 34.0003]]];

    var textStyle = {
      hour24: { text: '24小时警戒线', color: 'yellow', offsetY: 0 },
      hour48: { text: '48小时警戒线', color: 'blue', offsetY: 24 }
    }
    var yellowPoint = [127.0459, 30.003];
    var bluePoint = [132.0035, 30.0003];
    addLabelMehods(countyLayer1,textStyle.hour24.text, yellowPoint, 0, textStyle.hour24.color, "typhoonWarnLabel");
    addLabelMehods(countyLayer1,textStyle.hour48.text, bluePoint, 0, textStyle.hour48.color, "typhoonWarnLabel");

    drawLine(countyLayer1, yelloLine24, textStyle.hour24.color, 2, false);
    drawLine(countyLayer1, blueLine48, textStyle.hour48.color, 2, false);

    shanghaiFanweiLine();
  } catch (e) {
    // console.error('drawWarningLineLayer', e);
  }
}
// 绘制线的方法
const lineAllEntity = [];
const drawLine = (layer, path, colorStr, lineWidth = 2, lineType = true,items) => {
  require([
    "esri/Color", "esri/symbols/SimpleLineSymbol"
  ], function (Color, SimpleLineSymbol) {
    var line = new esri.geometry.Polyline({
      "paths": path,
      "spatialReference": { "wkid": 4326 }
    });
    var lineSymbol;
    if (lineType) {
      lineSymbol = new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID,
        new Color(colorStr),
        lineWidth);
    } else {
      lineSymbol = new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_DASH,
        new Color(colorStr),
        lineWidth);
    }

    var polyline = new esri.Graphic(line, lineSymbol);
    polyline.attributes=items;
    layer.add(polyline);
  });
}
// 添加label
let labelEntitleAll = [];
const addLabelMehods = (layer,labelName, pointData, height, colorStr, nameClass) => {
  require(["esri/geometry/Point",
    "esri/graphic",
    "esri/Color",
    "esri/symbols/TextSymbol",
    "esri/symbols/Font",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleFillSymbol",
    "dojo/domReady!"
  ], function (Point, Graphic, Color, TextSymbol, Font,SimpleMarkerSymbol,SimpleLineSymbol,Polygon,SimpleFillSymbol) {
    var point = new Point({ "x": pointData[0], "y": pointData[1], "spatialReference": { "wkid": 4326 } });
    var font = new Font("14px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL,
      Font.WEIGHT_BOLDER);
    var textSymbol = new TextSymbol(
      labelName,
      font,
      new Color(colorStr)
    );
    if (nameClass == "typhoonLabelName") {
      textSymbol.setOffset(0, -20); // 向右偏移10像素，垂直方向不偏移
      // --------------------------
      // 创建矩形背景（可单独设置宽高）
      // --------------------------
      // 1. 定义背景尺寸（根据文本调整）
      var padding = 5; // 内边距
      var textLength = labelName.length;
      var bgWidth = textLength * 14 + padding * 2; // 宽度 = 文本宽度 + 左右内边距
      var bgHeight = 20 + padding * 2; // 高度 = 文本高度 + 上下内边距（14px字体建议20基础高度）

      // 2. 将像素尺寸转换为地图单位偏移量（处理不同缩放级别）
      var map = countyLayer1.getMap(); // 获取地图实例
      var resolution = map.getResolution(); // 获取当前分辨率（米/像素）
      var halfWidth = (bgWidth / 2) * resolution; // 半宽（地图单位）
      var halfHeight = (bgHeight / 2) * resolution; // 半高（地图单位）

      // 3. 创建矩形多边形（以点为中心）
      var rectangle = new Polygon(map.spatialReference);
      rectangle.addRing([
        [point.x - halfWidth, point.y - halfHeight], // 左上
        [point.x + halfWidth, point.y - halfHeight], // 右上
        [point.x + halfWidth, point.y + halfHeight], // 右下
        [point.x - halfWidth, point.y + halfHeight], // 左下
        [point.x - halfWidth, point.y - halfHeight]  // 闭合
      ]);

      // 4. 创建矩形填充符号（背景样式）
      var backgroundSymbol = new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([0, 0, 0, 0.5]), // 边框颜色
          1 // 边框宽度
        ),
        new Color([255, 255, 255, 0.8]) // 背景色（白色半透明）
      );

      // 5. 创建图形对象
      // 背景图形
      var backgroundGraphic = new Graphic(rectangle, backgroundSymbol);
      backgroundGraphic.attributes = { id: nameClass + "_bg" };

      // 文本图形
      var labelPointGraphic = new Graphic(point, textSymbol);
      labelPointGraphic.id = nameClass;
      labelPointGraphic.attributes = { id: nameClass };
      // 5. 添加到图层（先加背景，再加文本，确保文本在上方）
      layer.add(backgroundGraphic);
    }
    
    var labelPointGraphic = new Graphic(point, textSymbol);
    labelPointGraphic.id=nameClass;
    labelPointGraphic.attr("id",nameClass);
    layer.add(labelPointGraphic);
  });

}

const GetTyphoonLSLJData = (taifengData, iscomObj) => {
  TyphoonLineLayer= CreateLayer("TyphoonLineLayer1");
  TyphoonMarkerLayer = CreateLayer("TyphoonMarkerLayer1");
  if (SetNull(TyphoonMarkerLayer) != "") {
    TyphoonMarkerLayer.on("click", onaddTFMark);
    setLayerToolTip(TyphoonMarkerLayer, "stnm", "strLngLat,FS,QY,MOVEFX,YDSD", "中心位置,最大风速@(米/秒),中心气压@(百帕),移动方向,移动速度@(公里/小时)");
  }
  //  pineAll = [];
  //  pointAll = [];
  selectAll = [];
  oldItem = [];
  num = 0;

  // 台风数据
  const data = taifengData[0].points.reverse();

  const typhoonName = taifengData[0].tfbh + taifengData[0].name;
  const result = [];
  if (data.length > 0) {
    var poinLine = [];
    for (let p = data.length - 1; p >= 0; p--) {
      var item = data[p];
      const d = {
        FID: data[p]['RQSJ2'],
        serial: p + 1,
        JD: Number(data[p].JD),
        WD: Number(data[p].WD),
      };
      result.push(d);
      selectAll.push(data[p]);
      item.tfbh = taifengData[0].tfbh;
      item.name = taifengData[0].name;
      // console.error('addTyphoonMarker',item);
      addTyphoonMarker(TyphoonMarkerLayer, item, p, item.ID,0.9);
      // handlerMovement('typhoonMarker');
      poinLine.push([Number(item.JD), Number(item.WD)]);
    }
    // console.error("poinLine", poinLine, taifengData[0].name);
    addLabelMehods(TyphoonMarkerLayer,typhoonName, [poinLine[0][0], poinLine[0][1]], 0, "#ffffff", "typhoonLabelName");
    drawLine(TyphoonLineLayer, [poinLine], "#218FD8", 2,true,taifengData[0]);

    

    const position = [poinLine[poinLine.length-1][0], poinLine[poinLine.length - 1][1]];
    setZOOM(8);
    dyCenter(position[0],position[1]);
    
    // addTyphoonCircle(TyphoonMarkerLayer,position, "300|200|250|200", taifengData[0].tfbh, "#00B00F");
    // addTyphoonCircle(TyphoonMarkerLayer,position,"100|100|70|70", taifengData[0].tfbh, "#ff0");
    // addTyphoonCircle(TyphoonMarkerLayer,position, "40|40|40|40", taifengData[0].tfbh, "#f00");

    addTyphoonCircle(TyphoonMarkerLayer,position, data[0].ZJ_RADIUS7, taifengData[0].tfbh, "#00B00F");
    addTyphoonCircle(TyphoonMarkerLayer,position,data[0].ZJ_RADIUS10, taifengData[0].tfbh, "#ff0");
    addTyphoonCircle(TyphoonMarkerLayer,position, data[0].ZJ_RADIUS12, taifengData[0].tfbh, "#f00");

    
    if (iscomObj == "1") {
      setTimeout(() => {
        //  oneShow(data[0],position,false);
      }, 500);
    }
  }
}


/*台风画点*/
const addTyphoonMarker = (layer, item, num, tfbh,size=1) => {
  try {
    var id = "typhoonMarker" + tfbh + num;
    var name = "typhoonMarker" + tfbh;
    require([
    "esri/geometry/Point",
    "esri/graphic",
    "esri/symbols/PictureMarkerSymbol",
    "esri/SpatialReference","dojo/domReady!"
], function (Point, Graphic, PictureMarkerSymbol, SpatialReference,) {
      var point = new Point(item.JD, item.WD, new SpatialReference({
        wkid: 4326
      }));
      // console.error('point', point);
      var imgUrl = GetIcon(item['COLOR']);
      var breakSymbol = new PictureMarkerSymbol(imgUrl, 14 * size, 14 * size);
      item.stnm=item.name;
      if(item.RQSJ2!=undefined){
        var date = convertToDate(item.RQSJ2);
        date = dayjs(date).format("M月D日H时");
        item.stnm=item.stnm+"\t"+date;
      }
      var strLngLat = "东经" + item.JD + "° 北纬" + item.WD + "°";
      item.strLngLat=strLngLat;
      var graphic = new Graphic(point, breakSymbol, item, null);
      layer.add(graphic);
    });
  } catch (error) { }
}
/*台风画线*/
const addTyhoonLine = (dataLength, tfbh) => {
  try {
    var poinLine = [];
    if (dataLength > 0) {
      poinLine.push(Number(selectAll[dataLength - 1].JD));
      poinLine.push(Number(selectAll[dataLength - 1].WD));
      poinLine.push(Number(selectAll[dataLength].JD));
      poinLine.push(Number(selectAll[dataLength].WD));
      // console.error('poinLine',poinLine);
      drawLine(poinLine, false, "", "#218FD8", "typhoonLine" + tfbh);
    }
  } catch (error) {
    // console.error('addTyhoonLine错误',dataLength,selectAll);
  }
}

//台风预报路径*******************************************begin
const GetResultTFLX_YBS = (param, ybtype = "") => {
  var arrlist = []; //台风详细记录id号
  var arrlistIcon = []; //标注点颜色
  //装载地图 经度+纬度
  //var list = param.toString().split("+");
  $.each(param, function (n, value) {
    var flightPlanCoordinates_YB = [];
    var items = JSON.parse(value.point);  //预报路径 json
    var yb_color = "#" + value.COLOR; //预报台线路 颜色
    var yb_ftm = value.FTM;
    $.each(items, function (m, infoCol) {
      flightPlanCoordinates_YB.push([Number(infoCol.JD),Number(infoCol.WD)]);
      infoCol.tfbh = infoCol.TFBH;
      infoCol.name = infoCol.TFNM;
      infoCol.MOVEFX = infoCol.YDFX;
      addTyphoonMarker(TyphoonMarkerLayer, infoCol, m, infoCol.tfbh,0.6);
    });
    IsPolyline_YB(items[0].TFBH + ybtype, yb_color, [flightPlanCoordinates_YB],items[0]);
  });
}
function IsPolyline_YB(tfbh, color, flightPlanCoordinates_YB,items) {
  try {
    //画台风"预报"折线
    drawLine(TyphoonLineLayer,flightPlanCoordinates_YB, color,1.5,false,items);
  } catch (e) {

  }
}
//台风预报路径*******************************************end

/*************台风飞行*********** */
// 存储创建的实体  方便清除
let pineAll = [];
let pointAll = [];
let pointLabelAll = [];
let pointCircleAll = [];
let selectAll = [];
let polygonAll = [];
let RaderPhotoAll = [];

let oldItem = [];
let num = 0;

// 清除台风效果
const clearTaiFeng = (tfbh) => {
  // 如果未指定tfbh，清除整个图层
  if (tfbh === undefined || tfbh === null) {
    TyphoonMarkerLayer.clear();
    TyphoonLineLayer.clear();
    $("#one").css({ opacity: 0 });
    return;
  }

  // 否则，清除指定tfbh的图形
  const graphics = TyphoonMarkerLayer.graphics;
  const graphicsLine=TyphoonLineLayer.graphics;

  // 存储需要保留的图形
  const graphicsToKeep = [];
  const graphicsToKeepLine = [];

  // 遍历所有图形，筛选出不需要清除的
  graphics.forEach(graphic => {
    const attributes = graphic.attributes;
    if (!attributes) return; // 没有属性的图形保留

    // 尝试从属性中获取台风编号（兼容ID和tfbh两种属性名）
    const tfbhID = attributes.ID !== undefined ? attributes.ID : attributes.tfbh;

    // 如果编号不匹配当前要清除的tfbh，则保留该图形
    if (tfbhID !== tfbh) {
      graphicsToKeep.push(graphic);
    }
  });
  // 遍历所有图形，筛选出不需要清除的
  graphicsLine.forEach(graphic => {
    const attributes = graphic.attributes;
    if (!attributes) return; // 没有属性的图形保留

    // 尝试从属性中获取台风编号（兼容ID和tfbh两种属性名）
    const tfbhID = attributes.ID !== undefined ? attributes.ID : attributes.tfbh;

    // 如果编号不匹配当前要清除的tfbh，则保留该图形
    if (tfbhID !== tfbh) {
      graphicsToKeepLine.push(graphic);
    }
  });

  // 先清空图层，再添加需要保留的图形（实现删除指定图形的效果）
  TyphoonMarkerLayer.clear();
  TyphoonLineLayer.clear();
  graphicsToKeep.forEach(graphic => {
    TyphoonMarkerLayer.add(graphic);
  });
  graphicsToKeepLine.forEach(graphic => {
    TyphoonLineLayer.add(graphic);
  });
  console.log(`已清除 tfbh 为 ${tfbh} 的台风图形`);
};



const clearTaiFengPolygon = () => {
  if(ybjyLayer!=null){
    ybjyLayer.clear();
  }
}

function showDynamicLayerMethod(item) {
  dyCenter(item.JD,item.WD);
  setTimeout(function(){
    var graphic=[item.JD,item.WD];
    oneShow(item,graphic,false);
  },200);
}

const GetIconFQ = function (color) {
  var strIcon = "";
  if (color == "0062FE") {
    strIcon = "images/typhoon/tf2.gif";
  } else if (color == "FDFA00") {
    strIcon = "images/typhoon/tf3.gif";
  } else if (color == "FDAC03") {
    strIcon = "images/typhoon/tf4.gif";
  } else if (color == "F072F6") {
    strIcon = "images/typhoon/tf5.gif";
  } else if (color == "FD0002") {
    strIcon = "images/typhoon/tf6.gif";
  } else {
    strIcon = "images/typhoon/tf1.gif";
  }
  return strIcon;
}

const GetIcon = function (color) {
  var strIcon = "";
  if (color == "0062FE") {
    strIcon = "images/typhoon/2.png";
  } else if (color == "FDFA00") {
    strIcon = "images/typhoon/3.png";
  } else if (color == "FDAC03") {
    strIcon = "images/typhoon/4.png";
  } else if (color == "F072F6") {
    strIcon = "images/typhoon/5.png";
  } else if (color == "FD0002") {
    strIcon = "images/typhoon/6.png";
  } else {
    strIcon = "images/typhoon/1.png";
  }
  return strIcon;
}

const GetIconResult = function (color) {
  var strIconResult = "";
  if (color == "0062FE") {
    strIconResult = "8-9 级(热带风暴)";
  } else if (color == "FDFA00") {
    strIconResult = "10-11 级(强热带风暴)";
  } else if (color == "FDAC03") {
    strIconResult = "12-13 级(台风)";
  } else if (color == "F072F6") {
    strIconResult = "14-15 级(强台风)";
  } else if (color == "FD0002") {
    strIconResult = "16级以上(超强台风)";
  } else {
    strIconResult = "6-7级(热带低压)";
  }
  return strIconResult;
}

const GetIconResultType = function (color) {
  var strIconResult = "";
  if (color == "0062FE") {
    strIconResult = "热带风暴";
  } else if (color == "FDFA00") {
    strIconResult = "强热带风暴";
  } else if (color == "FDAC03") {
    strIconResult = "台风";
  } else if (color == "F072F6") {
    strIconResult = "强台风";
  } else if (color == "FD0002") {
    strIconResult = "超强台风";
  } else {
    strIconResult = "热带低压";
  }
  return strIconResult;
}

const GetIconResultFL = function (color) {
  var strIconResult = "";
  if (color == "0062FE") {
    strIconResult = "8-9 级";
  } else if (color == "FDFA00") {
    strIconResult = "10-11";
  } else if (color == "FDAC03") {
    strIconResult = "12-13";
  } else if (color == "F072F6") {
    strIconResult = "14-15";
  } else if (color == "FD0002") {
    strIconResult = "16级以上";
  } else {
    strIconResult = "6-7级"
  }
  return strIconResult;
}


/**
 * 解析颜色字符串并设置透明度（兼容处理）
 * @param {String} colorStr - CSS颜色字符串
 * @param {Number} alpha - 透明度 0-1
 * @returns {esri.Color} 处理后的颜色对象
 */
function getColorWithAlpha(colorStr, alpha) {
  try {
      // 方法1: 尝试直接解析并设置透明度
      var color = new esri.Color(colorStr);
      color.a = alpha; // 直接设置alpha属性（比setAlpha更可靠）
      return color;
  } catch (e) {
      console.warn("颜色解析失败，使用默认红色", e);
      // 方法2: 手动创建颜色对象（备用方案）
      return new esri.Color([255, 0, 0, alpha]);
  }
}

/**
* 添加台风圈
* @param {Array} position - 中心点经纬度 [lon, lat]
* @param {String} radius - 四个方向的半径字符串，格式如"100|200|150|180"
* @param {String} tfbh - 台风编号
* @param {String} colorStr - CSS颜色字符串，如"#ff0000"
*/
const addTyphoonCircle = function (layer,position, radius, tfbh, colorStr) {
  
  // 验证半径参数
  if (!radius || radius === "" || radius === null) {
      return;
  }
  
  var radiusArr = radius.split('|');
  // 验证半径数组格式
  if (radiusArr.length !== 4) {
      console.error("半径格式错误，应为四个值用|分隔");
      return;
  }
  
  points_radius = [];
  
  // 计算四个方向的点
  getPoints(position, parseFloat(radiusArr[0]), 0);    // 东北方向
  getPoints(position, parseFloat(radiusArr[1]), 90);   // 西北方向
  getPoints(position, parseFloat(radiusArr[2]), 180);  // 西南方向
  getPoints(position, parseFloat(radiusArr[3]), 270);  // 东南方向

  // console.error('points_radius************2',points_radius);
  
  // 闭合多边形（回到第一个点）
  if (points_radius.length >= 2) {
      points_radius.push(points_radius[0]);
      points_radius.push(points_radius[1]);
  }
  
  if (points_radius.length > 0) {
      // 创建多边形几何对象
      var polygon = new esri.geometry.Polygon(new esri.SpatialReference({ wkid: 4326 }));
      polygon.addRing(points_radius);
      
      // 修复：使用兼容方式处理颜色透明度
      var outlineColor = getColorWithAlpha(colorStr, 1);    // 轮廓不透明
      var fillColor = getColorWithAlpha(colorStr, 0.3);     // 填充半透明
      
      // 创建填充符号
      var fillSymbol = new esri.symbol.SimpleFillSymbol(
          esri.symbol.SimpleFillSymbol.STYLE_SOLID,
          new esri.symbol.SimpleLineSymbol(
              esri.symbol.SimpleLineSymbol.STYLE_SOLID,
              outlineColor,  // 轮廓颜色
              2  // 轮廓宽度
          ),
          fillColor  // 填充颜色
      );
      
      // 创建图形对象
      var graphic = new esri.Graphic(polygon, fillSymbol, {
          name: "typhoonCircle" + tfbh,
          tfbh: tfbh
      });
      
      // 添加到图层
      layer.add(graphic);
  }
};


let points_radius = new Array();
// 根据经纬度 直径 以及方向计算方法
function getPoints(center, cradius, startAngle) {
  let radius = cradius / 100;
  let pointNum = 90;
  let endAngle = startAngle + 90;
  let sin, cos, x, y, angle;
  for (let i = 0; i <= pointNum; i++) {
    angle = startAngle + (endAngle - startAngle) * i / pointNum;
    sin = Math.sin(angle * Math.PI / 180);
    cos = Math.cos(angle * Math.PI / 180);
    x = center[0] + radius * sin;
    y = center[1] + radius * cos;
    points_radius.push([x, y]);
  }
  // console.error('points_radius************1',points_radius);
}


//中央气象台预报降雨
function addZYQXTJYYB(contours) {
  if(ybjyLayer!=null){
    ybjyLayer.clear();
  }
  require(["esri/geometry/Point",
    "esri/graphic",
    "esri/Color",
    "esri/symbols/TextSymbol",
    "esri/symbols/Font",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleFillSymbol",
    "dojo/domReady!"
  ], function (Point, Graphic, Color, TextSymbol, Font,SimpleMarkerSymbol,SimpleLineSymbol,Polygon,SimpleFillSymbol) {
    if (contours.length > 0) {
      contours.forEach(function (res) {
        var latAndLong = [];
        res.latAndLong.forEach(function (item) {
          latAndLong.push([item[1],item[0]]);
        });
        var colorArr = res.color.split(",");
        // 替换最后一项为 0.3（透明度 30%）
        colorArr[colorArr.length - 1] = "0.3";
        // console.error(contours, colorArr);
        var rings = [latAndLong];
        var area = new Polygon(rings);
        var symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color(colorArr), //rgb155, 153, 153
            2
          ),
          new Color(colorArr) //rgba
        );
        var gra = new Graphic(area, symbol);
        ybjyLayer.add(gra);
      });
    }
  });
}

//叠加图片
function addMapRaderPhoto(Points, url, imgAlpha = 1.0, _index = 0,flag=true) {
  //图片图层
  myMapImageLayer = CreateImageLayer("MapImageLayer");
  require([
    "esri/layers/MapImage",
  ], function (MapImage) {
    if (flag == true) {
      if (strImageLayer != undefined) {
        myMapImageLayer.removeImage(strImageLayer);
      }
      console.error("url",url);
      var strImg = url;
      strImageLayer = new MapImage({
        'extent': {
          'xmin': Points.xmin,
          'ymin': Points.ymin,
          'xmax': Points.xmax,
          'ymax': Points.ymax,
          'spatialReference': {
            'wkid': 4326
          }
        },
        'href': strImg
      });
      myMapImageLayer.addImage(strImageLayer);
      myMapImageLayer.setOpacity(imgAlpha);
      myMapImageLayer.setVisibility(true);
    } else {
      myMapImageLayer.setVisibility(false);
    }
  }
  );
}
// 移除特定ID的影像图层的函数
function removeImageryLayerById(layerId) {
  if(layerId=="LDRaderPhoto"){//雷达图
    if(myMapImageLayer!=null){
      myMapImageLayer.removeImage(strImageLayer);
      myMapImageLayer.setVisibility(false);
    }
  }
  else if(layerId=="addMapRaderPhoto"){

  }
}
function onaddTFMark(evt) {
  var item = evt.graphic.attributes;
  oneShow(item,evt.graphic,true);
}
function oneShow(item,graphic,isG){
  require([
    "esri/geometry/Point",
    "esri/graphic",
  ], function (Point, Graphic) {
    if (!isG) {
      var point = new Point({ "x": graphic[0], "y": graphic[1], "spatialReference": { "wkid": 4326 } });
      var PointGraphic = new Graphic(point, null, null, null);
      graphic = PointGraphic;
      console.error('PointGraphic',PointGraphic);
    }
    var date = convertToDate(item.RQSJ2);
    date = dayjs(date).format("M月D日H时");
    var strLngLat = "东经" + item.JD + "° 北纬" + item.WD + "°";
    var typhoonHtml = "<span style='font-size:16px;font-weight:600;padding-left:10px;'>" + item.name + date + "</span>" + "<br/>";
    typhoonHtml += "中心位置：" + strLngLat + "<br/>";
    typhoonHtml += "风速风力：" + item.FS + "米/秒;" + GetIconResult(item.COLOR) + "<br/>";
    typhoonHtml += "中心气压：" + item.QY + "百帕<br/>";
    typhoonHtml += "移动方向：" + item.MOVEFX + "<br/>";
    $("#one").find(".main").html(typhoonHtml);
    $("#one").css({ opacity: 1 });
    var targetDiv = document.getElementById("one");
    var screenPoint = map.toScreen(graphic.geometry); // 转换为屏幕坐标

    // 4. 计算div的位置（图形右侧，可根据需要调整偏移）
    var offsetX = 10; // 右侧偏移量（像素）
    var offsetY = -targetDiv.offsetHeight / 2; // 垂直居中对齐
    // 5. 设置div位置
    targetDiv.style.left = (screenPoint.x + offsetX) - 20 + "px";
    targetDiv.style.top = (screenPoint.y + offsetY) - 100 + "px";

    $("#one").show();
    $("#one").find(".main").show();
  });
  
}
//上海台风相似范围
function shanghaiFanweiLine() {
  var minX = 118.3, maxX = 127.0, minY = 25.2, maxY = 33.1;
  var arr = [];
  arr.push([minX, minY]);
  arr.push([minX, maxY]);
  arr.push([maxX, maxY]);
  arr.push([maxX, minY]);
  arr.push([minX, minY]);

  drawLine(countyLayer1, [arr], "#61CF7D", 2, false);
}
export {
  drawWarningLineLayer,
  GetTyphoonLSLJData,
  clearTaiFeng,
  addZYQXTJYYB,
  clearTaiFengPolygon,
  addMapRaderPhoto,
  showDynamicLayerMethod,
  removeImageryLayerById,
  RaderPhotoAll,
  GetResultTFLX_YBS
}