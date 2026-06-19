import { CreateLayer, destroy, globallevel, globalalign, labels, setLayerToolTip, setZOOM, dyCenter, map } from "@/utils/ArcGis/MapComm.js";

var measureGraphicsLayer = null;
var measurePoints = [];
var measurePolylines = [];
var currentTool = null;
var mapClickHandler = null;
var doubleClickHandler = null;
var mouseMoveHandler = null;
var measurelabel = null;
var tempGraphic = null; // 鼠标移动时的临时线

function initMeasure(str) {
    if (map == undefined || map == null) {
        map = window.map;
        alert("地图未初始化");
        return;
    }
    require([
        "esri/map",
        "esri/layers/GraphicsLayer",
        "esri/graphic",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "esri/geometry/Point",
        "esri/geometry/Polyline",
        "esri/geometry/Polygon",
        "esri/geometry/webMercatorUtils",
        "esri/geometry/geodesicUtils",
        "esri/units",
        "myJs/InfoText",
        "dojo/domReady!"
    ], function (Map, GraphicsLayer, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, Color, Point, Polyline, Polygon, webMercatorUtils, geodesicUtils, Units, InfoText) {

        // 创建或复用测量专用图层
        if (!measureGraphicsLayer) {
            measureGraphicsLayer = new GraphicsLayer({ id: "measureGraphicsLayer" });
            map.addLayer(measureGraphicsLayer);
        }

        // 先清空之前的绘图
        measureGraphicsLayer.clear();
        measurePoints = [];
        measurePolylines = [];
        currentTool = str;

        // 样式 - 使用图片标记替代十字
        var markerSymbol = new esri.symbol.PictureMarkerSymbol({
            url: "/images/esriGreenPin16x26.png",
            width: 10,
            height: 16,
            xoffset: 0,
            yoffset: 10
        });

        var lineSymbol = new SimpleLineSymbol({
            color: new Color("#ff0000"),
            width: 3,
            type: "esriSLS",
            style: "esriSLSSolid"
        });

        var tempLineSymbol = new SimpleLineSymbol({
            color: new Color("#ff9900"),
            width: 2,
            type: "esriSLS",
            style: "esriSLSDash"
        });

        var polygonFillSymbol = new esri.symbol.SimpleFillSymbol({
            color: new Color("#ff660033"),
            outline: new SimpleLineSymbol({
                color: new Color("#ff0000"),
                width: 3,
                style: "esriSLSSolid"
            }),
            style: "esriSFSSolid"
        });

        // 清理之前的监听
        if (mapClickHandler) { mapClickHandler.remove(); mapClickHandler = null; }
        if (doubleClickHandler) { doubleClickHandler.remove(); doubleClickHandler = null; }
        if (mouseMoveHandler) { mouseMoveHandler.remove(); mouseMoveHandler = null; }
        if (measurelabel) { measurelabel.clear(); measurelabel = null; }

        // 单击：添加测量点
        mapClickHandler = map.on("click", function (evt) {
            if (currentTool !== "distance" && currentTool !== "area") return;

            var mapPoint = evt.mapPoint;
            // evt.mapPoint 已经是地图坐标系(3857)的坐标，直接使用
            measurePoints.push(mapPoint);

            // 绘制点
            measureGraphicsLayer.add(new Graphic(mapPoint, markerSymbol));

            // 绘制连线
            if (measurePoints.length > 1) {
                var polyline = new Polyline(map.spatialReference);
                polyline.addPath([measurePoints[measurePoints.length - 2], mapPoint]);
                measurePolylines.push(polyline);
                measureGraphicsLayer.add(new Graphic(polyline, lineSymbol));
            }
        });

        // 双击：结束测量，显示结果
        doubleClickHandler = map.on("dbl-click", function (evt) {
            if (currentTool !== "distance" && currentTool !== "area") return;
            if (measurePoints.length < 2) return;

            var mapPoint = evt.mapPoint;

            // 双击也会触发一次click，所以要防止重复添加最后一点
            var lastPt = measurePoints[measurePoints.length - 1];
            var dx = mapPoint.x - lastPt.x;
            var dy = mapPoint.y - lastPt.y;
            if (Math.sqrt(dx * dx + dy * dy) > 1) {
                measurePoints.push(mapPoint);
                measureGraphicsLayer.add(new Graphic(mapPoint, markerSymbol));
                var polyline = new Polyline(map.spatialReference);
                polyline.addPath([measurePoints[measurePoints.length - 2], mapPoint]);
                measurePolylines.push(polyline);
                measureGraphicsLayer.add(new Graphic(polyline, lineSymbol));
            }

            if (currentTool === "distance") {
                calculateTotalLength(measurePoints, function (totalLength) {
                    var lastPoint = measurePoints[measurePoints.length - 1];
                    var text = "总距离: " + totalLength.toFixed(2) + " km";
                    measurelabel = new InfoText(map, lastPoint, null, text, 0, "bottom-right", true);
                    measurelabel.addEvent("click", clearInfoText);
                });
            }

            if (currentTool === "area" && measurePoints.length >= 3) {
                // 绘制闭合多边形（将最后一点连回第一点）
                var polygon = new Polygon(map.spatialReference);
                var ring = measurePoints.map(function (p) { return [p.x, p.y]; });
                ring.push(ring[0]); // 闭合多边形
                polygon.addRing(ring);
                measureGraphicsLayer.add(new Graphic(polygon, polygonFillSymbol));

                calculateArea(measurePoints, function (area) {
                    var center = getPolygonCenter(measurePoints);
                    var text = "面积: " + area.toFixed(2) + " km²";
                    measurelabel = new InfoText(map, center, null, text, 0, "bottom-right", true);
                    measurelabel.addEvent("click", clearInfoText);
                });
            }

            // 结束测量，清除监听
            if (mapClickHandler) { mapClickHandler.remove(); mapClickHandler = null; }
            if (mouseMoveHandler) { mouseMoveHandler.remove(); mouseMoveHandler = null; }
        });

        // 鼠标移动：绘制临时线
        mouseMoveHandler = map.on("mouse-move", function (evt) {
            if (currentTool !== "distance" && currentTool !== "area") return;
            if (measurePoints.length === 0) return;

            var mapPoint = evt.mapPoint;

            // 移除上一次的临时线
            if (tempGraphic) {
                measureGraphicsLayer.remove(tempGraphic);
                tempGraphic = null;
            }

            // 绘制临时线
            var tempPolyline = new Polyline(map.spatialReference);
            tempPolyline.addPath([measurePoints[measurePoints.length - 1], mapPoint]);
            tempGraphic = new Graphic(tempPolyline, tempLineSymbol);
            measureGraphicsLayer.add(tempGraphic);
        });

        // ========== 计算总距离 ==========
        function calculateTotalLength(points, callback) {
            require(["esri/geometry/geodesicUtils", "esri/units"], function (geodesicUtils, Units) {
                // 将3857坐标转为4326经纬度
                var geoPoints = points.map(function (p) {
                    return webMercatorUtils.webMercatorToGeographic(p);
                });

                // 使用geodesicUtils直接在本地计算大地线长度
                var polyline = new Polyline();
                polyline.addPath(geoPoints);
                var lengths = geodesicUtils.geodesicLengths([polyline], Units.KILOMETERS);
                callback(lengths[0] || 0);
            });
        }

        // ========== 计算面积 ==========
        function calculateArea(points, callback) {
            require(["esri/geometry/geodesicUtils", "esri/units"], function (geodesicUtils, Units) {
                // 将3857坐标转为4326经纬度
                var geoPoints = points.map(function (p) {
                    return webMercatorUtils.webMercatorToGeographic(p);
                });

                //构造闭合多边形
                var polygon = new Polygon();
                var ring = geoPoints.map(function (p) { return [p.x, p.y]; });
                ring.push(ring[0]);
                polygon.addRing(ring);

                // 使用geodesicUtils直接在本地计算大地面积
                var areas = geodesicUtils.geodesicAreas([polygon], Units.SQUARE_KILOMETERS);
                callback(Math.abs(areas[0]) || 0);
            });
        }

        function getPolygonCenter(points) {
            var sumX = 0, sumY = 0;
            points.forEach(function (p) { sumX += p.x; sumY += p.y; });
            return new Point(sumX / points.length, sumY / points.length, map.spatialReference);
        }

        function clearInfoText() {
            setMeasureTool("clear");
        }
    });
}

function setMeasureTool(str) {
    if (str === "clear") {
        if (measureGraphicsLayer) {
            measureGraphicsLayer.clear();
        }
        measurePoints = [];
        measurePolylines = [];
        if (measurelabel) {
            measurelabel.clear();
            measurelabel = null;
        }
        if (mapClickHandler) { mapClickHandler.remove(); mapClickHandler = null; }
        if (doubleClickHandler) { doubleClickHandler.remove(); doubleClickHandler = null; }
        if (mouseMoveHandler) { mouseMoveHandler.remove(); mouseMoveHandler = null; }
        currentTool = null;
        return;
    }

    // 切换工具时先清空
    if (measureGraphicsLayer) {
        measureGraphicsLayer.clear();
    }
    measurePoints = [];
    measurePolylines = [];
    if (measurelabel) {
        measurelabel.clear();
        measurelabel = null;
    }
    if (mapClickHandler) { mapClickHandler.remove(); mapClickHandler = null; }
    if (doubleClickHandler) { doubleClickHandler.remove(); doubleClickHandler = null; }
    if (mouseMoveHandler) { mouseMoveHandler.remove(); mouseMoveHandler = null; }

    currentTool = str;
    initMeasure(str);
}

export {
    setMeasureTool,
};