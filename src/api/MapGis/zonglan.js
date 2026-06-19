import api from "@/api/Facts/Swindex.js";
import dayjs from "dayjs";
import { ElMessage } from 'element-plus';
import { loadModules } from "esri-loader";

export function updateZonglanMap() {
    function zonglanUpdate(map) {
        var nowTM = new Date();
        var strParam = {};
        strParam["TREEID"] = "2023102310595065413";
        strParam["STIME"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss"))
            .add(-3, "hour")
            .format("YYYY-MM-DD HH:mm:ss");
        strParam["ETIME"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
        api
            .stWasRnew(strParam)
            .then((res) => {
                const strJson = res.data;
                loadModules([
                    "esri/geometry/Point",
                    "esri/graphic",
                    "myJs/MapTextPagehome",
                    "esri/symbols/PictureMarkerSymbol",
                    "esri/InfoTemplate",
                    "esri/dijit/InfoWindow",
                    "esri/layers/GraphicsLayer",
                    "esri/geometry/webMercatorUtils",
                    "esri/symbols/TextSymbol",
                    "dojo/domReady!"
                ]).then(([
                    Point,
                    Graphic,
                    MapTextPagehome,
                    PictureMarkerSymbol,
                    InfoTemplate,
                    InfoWindow,
                    GraphicsLayer,
                    webMercatorUtils,
                    TextSymbol
                ]) => {
                    // let RainLayerGraphicLayer=mapJs.CreateLayerID("RainLayer",9);
                    // let map=globaMap.globaMap
                    let LayerID = 9;
                    let RainLayerGraphicLayer = map.addLayer(new GraphicsLayer({
                        id: "RainLayer"
                    }), LayerID);
                    if (strJson.length > 0) {
                        for (let num = 0; num < strJson.length; num++) {
                            const item = strJson[num];

                            let _width = 15,
                                _height = 30;
                            let cls = "level_zc_New";
                            let breakSymbol = new PictureMarkerSymbol("images/icon_51.png", _width, _height);
                            var point = new Point({
                                "x": item.LGTD,
                                "y": item.LTTD,
                                "spatialReference": {
                                    "wkid": 4326
                                }
                            });

                            var textStr = "";
                            if (item.STNM != undefined) {
                                textStr += item.STNM + "@";
                            }
                            // var label = new MapTextPagehome(map, point, item, textStr, 8, _align, cls, 12);
                            // labels.push(label);
                            var graphic = new Graphic(point, breakSymbol, item, null);
                            RainLayerGraphicLayer.add(graphic);
                        }
                    }
                }).catch((err) => {

                })
            })
            .catch((err) => {
                console.error(err);
            });
    };
    function yuqingUpdate(map) {
        var nowTM = new Date();
        var strParam = {};
        strParam["pid"] = "201901101419326076";

        StartDate = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
        if (dayjs(nowTM.format("HH")) < 8) {
            StartDate = strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
                .add(-24, "hour")
                .format("YYYY-MM-DD HH:mm:ss");
        }
        EndDate = dayjs(nowTM).format("YYYY-MM-DD HH:00:00");
        api
            .stPptnRain(strParam)
            .then((res) => {
                const strJson = res.data;
                loadModules([
                    "esri/geometry/Point",
                    "esri/graphic",
                    "myJs/MapTextPagehome",
                    "esri/symbols/PictureMarkerSymbol",
                    "esri/InfoTemplate",
                    "esri/dijit/InfoWindow",
                    "esri/layers/GraphicsLayer",
                    "esri/geometry/webMercatorUtils",
                    "esri/symbols/TextSymbol",
                    "dojo/domReady!"
                ]).then(([
                    Point,
                    Graphic,
                    MapTextPagehome,
                    PictureMarkerSymbol,
                    InfoTemplate,
                    InfoWindow,
                    GraphicsLayer,
                    webMercatorUtils,
                    TextSymbol
                ]) => {
                    let LayerID = 9;
                    let RainLayerGraphicLayer = map.addLayer(new GraphicsLayer({
                        id: "RainLayer"
                    }), LayerID);
                    if (strJson.length > 0) {
                        for (let num = 0; num < strJson.length; num++) {
                            const item = strJson[num];

                            let _width = 15,
                                _height = 30;
                            let cls = "level_zc_New";
                            let breakSymbol = new PictureMarkerSymbol("images/icon_51.png", _width, _height);
                            var point = new Point({
                                "x": item.LGTD,
                                "y": item.LTTD,
                                "spatialReference": {
                                    "wkid": 4326
                                }
                            });

                            var textStr = "";
                            if (item.STNM != undefined) {
                                textStr += item.STNM + "@";
                            }
                            // var label = new MapTextPagehome(map, point, item, textStr, 8, _align, cls, 12);
                            // labels.push(label);
                            var graphic = new Graphic(point, breakSymbol, item, null);
                            RainLayerGraphicLayer.add(graphic);
                        }
                    }
                }).catch((err) => {

                })
            })
            .catch((err) => {
                console.error(err);
            });
    }
    return { zonglanUpdate, yuqingUpdate }
}