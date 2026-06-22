import { CreateLayer, destroy, globallevel, globalalign, map, labels, setLayerToolTip,RemoveLayer, setMapZoom, mapZoomEnd} from "@/utils/ArcGis/MapComm.js";
import { groupBy, SetNull,validateAndClean } from "@/api/ComUnit.js";
import { ref, reactive, createVNode, defineAsyncComponent, h } from 'vue'
import Dialog from "@/api/utils/Dialog.js";
import dayjs from "dayjs";
import RiverLT from "@/assets/json/RiverLT2000.json";
import $ from "jquery";

import SHBJ from "@/assets/json/SHBJ.json";
import SHBJArea from "@/assets/json/SHBJArea.json";

import weiquURL from "@/assets/json/四片圩区2000.json"; //圩区 

import xingzhengArea from "@/assets/json/上海市2000.json";

var myData = [];

function onaddSWMark(evt) {
    var item = evt.graphic.attributes;
    // console.error("onaddSWMark", evt, item)
    if (SetNull(item) != "") {
        const ChildVue = defineAsyncComponent(() =>
            import("@/components/danzhan/sq/DanZHanSel.vue")
        );
        const props = {};
        props["stcd"] = item["stcd"]
        props["stime"] = dayjs(new Date(item["tm"])).add(-24, "hour").format("YYYY-MM-DD HH:mm:ss");
        props["etime"] = dayjs(dayjs(item["tm"]).format("YYYY-MM-DD HH:mm:ss"))
      .add(1, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
        props["mtype"] = item["mtype"]
        props["type"] = "水位过程"
        Dialog.open({ title: item["stnm"], widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
    }
    evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
}
function addSWMark(viw, strJson, stime, etime, switchChecked, layerId = "addSWMark",myClass) {
    // var layerId = "addSWMark" ;
    var WaterLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(WaterLayerGraphicLayer) != "") {
        WaterLayerGraphicLayer.clear(); //删除图层
        WaterLayerGraphicLayer.on("click", onaddSWMark);
        setLayerToolTip(WaterLayerGraphicLayer, "stnm", "upz,wrz,tmStr", "水位,警戒,时间");
    }
    setTimeout(function () {
        if (SetNull(strJson) == "")
            return;
        require(["esri/geometry/Point",
            "esri/graphic",
            "myJs/MapTextPagehome",
            "esri/symbols/PictureMarkerSymbol",
            "esri/InfoTemplate",
            "esri/dijit/InfoWindow",
            "esri/layers/GraphicsLayer",
            "esri/geometry/webMercatorUtils", "esri/symbols/TextSymbol", "dojo/domReady!"
        ], function (Point, Graphic, MapTextPagehome, PictureMarkerSymbol, InfoTemplate, InfoWindow, GraphicsLayer,
            webMercatorUtils,
            TextSymbol) {
            var breakSymbol;
            $(".amap-ui-district-cluster-marker").remove();
            $(".LabelPlotBeautiful-container").remove();
            // destroy();
            if (strJson.length > 0) {
                for (var num = 0; num < strJson.length; num++) {
                    var item = strJson[num];
                    // console.error("add=======-------------", item)
                    if (item.lgtd == undefined && item.lttd == undefined) {
                        continue;
                    }
                    item["divid"] = "SQ" + item["stcd"];
                    // var cls = " level_zc";
                    var cls = myClass==undefined?" level_all":" "+myClass;

                    breakSymbol = new PictureMarkerSymbol("/images/icon_51.png", 15, 30);
                    // if (item.wrz && Number(item.upz) >= Number(item.wrz)&&Number(item.wrz)>0) {
                    //     breakSymbol = new PictureMarkerSymbol("/images/hong.png", 15, 30);
                    //     cls = " level_wrz";
                    // }
                    // // 只有当 grz 存在，且 upz 大于等于 grz 时，才执行
                    // if (item.grz && Number(item.upz) >= Number(item.grz)&&Number(item.grz)>0) {
                    //     breakSymbol = new PictureMarkerSymbol("/images/hong.png", 15, 30);
                    //     cls = " level_grz";
                    // }
                    var point = new Point({
                        "x": item.lgtd,
                        "y": item.lttd,
                        "spatialReference": {
                            "wkid": 4326
                        }
                    });

                    var textStr = "";
                    if (item.stnm != undefined) {
                        textStr += item.stnm + "@";
                    }
                    item.upz = validateAndClean(item.upz);
                    item.dwz = validateAndClean(item.dwz);
                    item.grz = validateAndClean(item.grz);
                    item.wrz = validateAndClean(item.wrz);
                    item.tmStr=dayjs(item.tm).format("MM-DD HH:mm");

                    if (item.upz != "" && item.dwz != "") {
                        textStr += item.upz + "/" + item.dwz;
                    }
                    else if (item.upz != "") {
                        textStr +=item.upz;
                    }
                    else if (item.dwz != "") {
                        textStr += item.dwz;
                    }
                    var oneAlign = "top";
                    if (SetNull(item["dir"]) != "") {
                        oneAlign = item["dir"];
                    }
                    if (switchChecked) {
                        var label = new MapTextPagehome(map, point, item, textStr, globallevel, oneAlign, cls, 0);
                        labels.push(label);
                    }
                    var graphic = new Graphic(point, breakSymbol, item, null);
                    WaterLayerGraphicLayer.add(graphic);
                }
                // console.error(item.mapsize,"add=======-------------", map.getLevel())
                setMapZoom(WaterLayerGraphicLayer, map.getLevel(), "SQ", "stcd", switchChecked);
                mapZoomEnd(WaterLayerGraphicLayer, null, "SQ", "stcd", switchChecked);
            }
        })
    }, 100)

}
function onaddYLMark(evt) {
    var item = evt.graphic.attributes;
    // console.error("onaddSWMark", evt, item)
    if (SetNull(item) != "") {
        const ChildVue = defineAsyncComponent(() =>
            import("@/components/danzhan/sq/DanZHanSel.vue")
        );
        // console.error("单站过程", item);
        const props = {};
        props["stcd"] = item["stcd"]
        var nowTM = new Date();
        var tempStime = dayjs(nowTM).add(-3, "HOUR").format("YYYY-MM-DD HH:00:00");
        var tempEtime = dayjs(nowTM).add(1, "HOUR").format("YYYY-MM-DD HH:00:00");
        props["stime"] = tempStime;
        props["etime"] = tempEtime;
        props["mtype"] = item["mtype"]
        props["type"] = "降雨过程"
        //ChildVue为弹窗中嵌入的slot
        Dialog.open({ title: item["stnm"], widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })

    }
    evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
}
function addYLMark(viw, strJson, stime, etime, switchChecked) {
    var arr = strJson;
    var layerId = "addYLMark";
    var RainLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(RainLayerGraphicLayer) != "") {
        RainLayerGraphicLayer.clear(); //删除图层
        try {
            RainLayerGraphicLayer.off("click", onaddYLMark)
        } catch (error) {

        }
        RainLayerGraphicLayer.on("click", onaddYLMark);
        setLayerToolTip(RainLayerGraphicLayer, "stnm", "drp", "雨量");
    }
    setTimeout(function () {
        if (SetNull(strJson) == "")
            return;
        require(["esri/map", "esri/geometry/Point",
            "esri/graphic",
            "myJs/MapTextPagehome",
            "esri/symbols/PictureMarkerSymbol",
            "esri/InfoTemplate",
            "esri/dijit/InfoWindow", "esri/symbols/SimpleMarkerSymbol", "esri/Color",
            "esri/layers/GraphicsLayer", "esri/SpatialReference", "esri/geometry/webMercatorUtils", "dojo/domReady!"
        ], function (Map, Point, Graphic, MapTextPagehome, PictureMarkerSymbol, InfoTemplate, InfoWindow, SimpleMarkerSymbol, Color,
            GraphicsLayer, SpatialReference, webMercatorUtils) {
            $(".amap-ui-district-cluster-marker").remove();
            $(".rainText").remove();
            // destroy();
            if (arr.length > 0) {
                var breakSymbol;
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    var f = parseFloat(item.drp);
                    var cls = "rainText";
                    var pUrl = "/images/rain/";
                    var imgUrl = "";
                    if (f >= 200.0) {
                        if(item.atcunit=="上海水文总站"){
                          imgUrl = "d_black.png";
                        }
                        else{
                            imgUrl = "200.png";
                        }
                    }
                    else if (f >= 100.0) {
                        if(item.atcunit=="上海水文总站"){
                            imgUrl = "d_red.png";
                        }
                        else{
                            imgUrl = "100.png";
                        }
                    }
                    else if (f >= 50.0) {
                        if(item.atcunit=="上海水文总站"){
                            imgUrl = "d_yellow.png";
                        }
                        else{
                            imgUrl = "50.png";
                        }
                    }
                    else if (f >= 25.0) {
                        if(item.atcunit=="上海水文总站"){
                            imgUrl = "d_blue.png";
                        }
                        else{
                            imgUrl = "25.png";
                        }
                    }
                    else if (f >= 10.0) {
                        if(item.atcunit=="上海水文总站"){
                            imgUrl = "d_sky.png";
                        }
                        else{
                            imgUrl = "10.png";
                        }
                    }
                    else if (f > 0.0) {
                        if(item.atcunit=="上海水文总站"){
                            imgUrl = "d_grey.png";
                        }
                        else{
                            imgUrl = "5.png";
                        }
                    }
                    else {
                        if(item.atcunit=="上海水文总站"){
                            imgUrl = "d_white.png";
                        }
                        else{
                            imgUrl = "0.png";
                        }
                    }
                    var _width=14,_height=18;
                    if(item.atcunit=="上海水文总站"){
                        _width=14;
                        _height=18;
                    }
                    else{
                         _width=15;
                         _height=15;
                    }
                    breakSymbol = new PictureMarkerSymbol(pUrl + imgUrl, _width, _height);

                    if (breakSymbol == "") continue;
                    if (item.lgtd == undefined && item.lttd == undefined) {
                        continue;
                    } else {
                        var point = new Point(arr[i].lgtd, arr[i].lttd, new SpatialReference({
                            wkid: 4326
                        }));
                        var _align = "bottom";
                        if (SetNull(item["dir"]) != "") {
                            _align = item["dir"];
                        }
                        
                        var textStr =arr[i].stnm+"@" +Number(arr[i].drp).toFixed(1);
                        if (switchChecked) {
                            var label = new MapTextPagehome(map, point, arr[i], textStr, globallevel, _align, cls,
                                12);
                            labels.push(label);
                        }
                        var graphic = new Graphic(point, breakSymbol, arr[i], null);
                        RainLayerGraphicLayer.add(graphic);
                    }
                }
                // console.error(item.mapsize,"add=======-------------", map.getLevel())
                setMapZoom(RainLayerGraphicLayer, map.getLevel(), "YQ", "stcd", switchChecked);
                mapZoomEnd(RainLayerGraphicLayer, null, "YQ", "stcd", switchChecked);
            }

        });
    }, 100)
}
function onaddGQMark(evt) {
    var item = evt.graphic.attributes;
    if (SetNull(item) != "") {
        const ChildVue = defineAsyncComponent(() =>
            import("@/components/danzhan/gq/DanZHanSel.vue")
        );
        const props = {};
        props["stcd"] = item["stcd"];
        props["stnm"] = item["stnm"];
        props["stime"] =dayjs(new Date(item["tm"])).add(-24, "hour").format("YYYY-MM-DD HH:mm:ss");
        props["etime"] = item["tm"];
        props["item"] = item;
        //ChildVue为弹窗中嵌入的slot
        Dialog.open({ title: item["stnm"], widh: 1400, heig: 800 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })

    }
    evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
}
function addGQMark(strJson, switchChecked) {
    var layerId = "addGQMark";
    var pondLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(pondLayerGraphicLayer) != "") {
        pondLayerGraphicLayer.clear(); //删除图层
        // console.error("pondLayerGraphicLayer", pondLayerGraphicLayer)
        try {
            pondLayerGraphicLayer.off("click", onaddGQMark)
        } catch (error) {

        }
        pondLayerGraphicLayer.on("click", onaddGQMark);
        setLayerToolTip(pondLayerGraphicLayer, "stnm", "shikuang,tms", "实况,时间");
    }


    setTimeout(function () {
        if (SetNull(strJson) == "")
            return;
        require(["esri/geometry/Point",
            "esri/graphic",
            "myJs/MapTextNew",
            "esri/symbols/PictureMarkerSymbol",
            "esri/InfoTemplate",
            "esri/dijit/InfoWindow",
            "esri/layers/GraphicsLayer",
            "esri/geometry/webMercatorUtils", "esri/symbols/TextSymbol", "dojo/domReady!"
        ], function (Point, Graphic, MapTextNew, PictureMarkerSymbol, InfoTemplate, InfoWindow, GraphicsLayer,
            webMercatorUtils,
            TextSymbol) {
            var breakSymbol;
            $(".lightGQ").remove();

            destroy();
            if (strJson.length > 0) {
                for (var num = 0; num < strJson.length; num++) {
                    var item = strJson[num];
                    if (SetNull(item.lgtd) == "" && SetNull(item.lttd) == "") {
                        continue;
                    }
                    item.tms = dayjs(item.tm).format("YYYY-MM-DD HH:mm:ss");
                    var point = new Point({ "x": item.lgtd, "y": item.lttd, "spatialReference": { "wkid": 4326 } });
                    var imgUrl = "";
                    if (item.omcn == 1) {
                        imgUrl = "/images/gqgc/z_green_1.png";
                    }
                    else if (item.omcn == 0) {
                        imgUrl = "/images/gqgc/z_red_1.png";
                    }
                    else {
                        imgUrl = "/images/gqgc/z_blur_1.png";
                    }
                    breakSymbol = new PictureMarkerSymbol(imgUrl, 17, 10);
                    var objID = "gqColor" + item.stcd;
                    var cls = " lightGQ ' id='" + objID + "";
                    var _align = " bottom "
                    var strTitle2 = "";
                    if (SetNull(item.stnm) != "") {
                        strTitle2 += '<div class="textNameGQ">' + item.stnm + '</div>';
                    }
                    if (item.imageUrls.length > 0) {
                        for (var j = 0; j < item.imageUrls.length; j++) {
                            strTitle2 += '<img src="' + item.imageUrls[j] + '" style="height:20px;margin-left:5px; vertical-align:middle;display:inline-block;">'
                        }
                    }
                    if (switchChecked == true) {
                        var label2 = new MapTextNew(map, point, strJson[num], strTitle2, globallevel, _align, cls, 12);
                        labels.push(label2);
                    }

                    var graphic = new Graphic(point, breakSymbol, strJson[num], null);
                    pondLayerGraphicLayer.add(graphic);
                }
            }
        })
    }, 100)
}
function addSLMark(strJson, switchChecked) {
    var arr = strJson;
    var layerId = "addSLMark";
    var SLLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(SLLayerGraphicLayer) != "") {
        SLLayerGraphicLayer.clear(); //删除图层
        setLayerToolTip(SLLayerGraphicLayer, "stnm", "accpw,accdw", "入境水量(万m³),出境水量(万m³)");
    }
    setTimeout(function () {
        if (SetNull(strJson) == "")
            return;
        require(["esri/map", "esri/geometry/Point",
            "esri/graphic",
            "myJs/MapText",
            "esri/symbols/PictureMarkerSymbol",
            "esri/InfoTemplate",
            "esri/dijit/InfoWindow", "esri/symbols/SimpleMarkerSymbol", "esri/Color",
            "esri/layers/GraphicsLayer", "esri/SpatialReference", "esri/geometry/webMercatorUtils", "dojo/domReady!"
        ], function (Map, Point, Graphic, MapText, PictureMarkerSymbol, InfoTemplate, InfoWindow, SimpleMarkerSymbol, Color,
            GraphicsLayer, SpatialReference, webMercatorUtils) {
            $(".amap-ui-district-cluster-marker").remove();
            destroy();
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    if (SetNull(item.lgtd) == "" || SetNull(item.lttd) == "") {
                        continue;
                    }
                    item.lgtd = item.lgtd;
                    item.lttd = item.lttd;
                    var _LGTD = item.lgtd;
                    var _LTTD = item.lttd;
                    var cls = "waterText gcText";
                    var angle = 0, _angle = 0;
                    var _align = " bottom ";
                    if (item.stnm.indexOf('阳澄淀泖区') > -1) {
                        // _LGTD = _LGTD + 0.02;
                        _LTTD = _LTTD + 0.03;
                        _align = "left";
                        angle = 90;
                        _angle = -90;
                    }
                    else if (item.stnm.indexOf('太湖') > -1||item.stnm.indexOf('太北太南片') > -1) {
                        _LGTD = _LGTD - 0.02;
                        _LTTD = _LTTD + 0.030;
                        _align = "left";
                        angle = 45;
                        _angle = 225;//入境水量
                    }
                    else if (item.stnm.indexOf('长江') > -1) {
                        _LGTD = _LGTD - 0.02;
                        _LTTD = _LTTD + 0.030;
                        _align = "right";
                        angle = 45;
                        _angle = 225;//入境水量
                    }
                    else if (item.stnm.indexOf('浦东') > -1) {
                        _LGTD = _LGTD - 0.03;
                        _LTTD = _LTTD - 0.015;
                        _align = "right";
                        angle = 135;
                        _angle =315;
                    }
                    else if (item.stnm.indexOf('浏河') > -1) {
                        _LGTD = _LGTD - 0.03;
                        _LTTD = _LTTD - 0.015;
                        _align = "left";
                        angle = 135;
                        _angle =315;
                    }
                    var _slInfo = "<span style='color:#FFFFFF !important;opacity: 0.9 !important;line-height:18px;'>入境水量：" + item.accpw + "</span></br>";
                    // if (Number(item.accpw) <= 0) {
                    //     _slInfo = "";
                    // }
                    // if (Number(item.accdw) > 0) {
                        _slInfo += "<span style='color:#FFFFFF !important;opacity: 0.9 !important;line-height:18px;'>出境水量：" + item.accdw + "</span>";
                    // }
                    var point = new Point(arr[i].lgtd, arr[i].lttd, new SpatialReference({ wkid: 4326 }));
                    var _point = new Point({ "x": _LGTD, "y": _LTTD, "spatialReference": { "wkid": 4326 } });

                    var textStr1 = "<div style='padding: 4px 10px;'>";
                    textStr1 += "<div style='height: 20px;font-size: 15px;font-family: Microsoft YaHei, Microsoft YaHei-Regular;font-weight: 400;text-align: LEFT;color: #00a3ff;line-height: 20px;'>";
                    textStr1 += item.stnm;
                    textStr1 += "</div>"
                    textStr1 += "<div style='margin-top: 5px;opacity: 0.8;font-size: 14px;font-family: Microsoft YaHei, Microsoft YaHei-Regular;font-weight: 400;text-align: LEFT;color: rgba(255,255,255,0.90);'>";
                    textStr1 += _slInfo;
                    textStr1 += "</div>";
                    textStr1 += "</div>";
                    if (switchChecked == true) {
                        var label = new MapText(map, point, item, textStr1, globallevel, _align, cls, 12);
                        labels.push(label);
                    }

                    var breakSymbolOut = new PictureMarkerSymbol("/images/outInfo.png", 33, 87);
                    breakSymbolOut.angle = angle;
                    var graphic = new Graphic(point, breakSymbolOut, arr[i], null);
                    SLLayerGraphicLayer.add(graphic);

                    var breakSymbolIn = new PictureMarkerSymbol("/images/inInfo.png", 33, 87);
                    breakSymbolIn.angle = _angle;
                    var graphic = new Graphic(_point, breakSymbolIn, arr[i], null);
                    SLLayerGraphicLayer.add(graphic);
                }
            }

        });
    }, 100)
}
function onaddYBSWMark(evt) {
    var item = evt.graphic.attributes;
    if (SetNull(item) != "") {
        const ChildVue = defineAsyncComponent(() =>
            import("@/components/danzhan/yb/SQYBLine.vue")
        );
        const props = {};
        props["dd_id"] = item["dd_id"];
        props["stcd"] = item["stcd"]
        props["stime"] = item["stime"]
        props["etime"] = item["etime"]
        props["mtype"] ="1"
        console.error('item',item,'props',props);
        //ChildVue为弹窗中嵌入的slot
        Dialog.open({ title: item["stnm"] + "水位过程线", widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })

    }
    evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
}
function addYBSWMark(strJson, DD_ID, stime, etime, switchChecked) {
    var layerId = "addYBSWMark";
    var YBWaterLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(YBWaterLayerGraphicLayer) != "") {
        YBWaterLayerGraphicLayer.clear(); //删除图层
        try {
            YBWaterLayerGraphicLayer.off("click", onaddYBSWMark)
        } catch (error) { }
        YBWaterLayerGraphicLayer.on("click", onaddYBSWMark);
        setLayerToolTip(YBWaterLayerGraphicLayer, "stnm", "data,tm", "水位,时间");
    }
    setTimeout(function () {
        if (SetNull(strJson) == "")
            return;
        require(["esri/geometry/Point",
            "esri/graphic",
            "myJs/MapTextPagehome",
            "esri/symbols/PictureMarkerSymbol",
            "esri/InfoTemplate",
            "esri/dijit/InfoWindow",
            "esri/layers/GraphicsLayer",
            "esri/geometry/webMercatorUtils", "esri/symbols/TextSymbol", "dojo/domReady!"
        ], function (Point, Graphic, MapTextPagehome, PictureMarkerSymbol, InfoTemplate, InfoWindow, GraphicsLayer, webMercatorUtils, TextSymbol) {
            var breakSymbol;
            $(".amap-ui-district-cluster-marker").remove();
            destroy();
            if (strJson.length > 0) {
                // console.error('strJson',strJson);
                for (var num = 0; num < strJson.length; num++) {
                    var item = strJson[num];
                    if (item.lgtd == undefined && item.lttd == undefined) {
                        continue;
                    }
                    item.dd_id = DD_ID;
                    item.stime = stime;
                    item.etime = etime;
                    var cls = " level_zc";
                    breakSymbol = new PictureMarkerSymbol("/images/icon_51.png", 18, 38);
                    if (item.grz != undefined) {
                        if (Number(item.data) >= Number(item.grz)&&Number(item.grz)>0) {
                            breakSymbol = new PictureMarkerSymbol("/images/hong.png", 18, 38);
                            cls = " level_grz";
                        }
                    } else if (item.wrz != undefined) {
                        if (Number(item.data) >= Number(item.wrz)&&Number(item.wrz)>0) {
                            breakSymbol = new PictureMarkerSymbol("/images/cheng2.png", 18, 38);
                            cls = " level_wrz";
                        }
                    }
                    var point = new Point({
                        "x": item.lgtd,
                        "y": item.lttd,
                        "spatialReference": {
                            "wkid": 4326
                        }
                    });

                    var textStr = "";

                    if (item.stnm != undefined) {
                        textStr += item.stnm + "@";
                    }
                    if (SetNull(item.data) != "") {
                        if (Number(item.data) > 0) {
                        }
                        else {
                            item.data = "";
                        }
                    }
                    if (SetNull(item.dwz) != "") {
                        if (Number(item.dwz) > 0) {
                        }
                        else {
                            item.dwz = "";
                        }
                    }
                    if (SetNull(item.data) != "" && SetNull(item.dwz) != "") {
                        textStr += item.data + "/" + item.dwz;
                    }
                    else if (SetNull(item.data) != "") {
                        textStr += item.data;
                    }
                    else if (SetNull(item.dwz) != "") {
                        textStr += "—/" + item.dwz;
                    }
                    // console.error("addSWMa@@@@@@@@rk", textStr, item, point, globallevel)
                    var oneAlign = "top";
                    if (SetNull(item["dir"]) != "") {
                        oneAlign = item["dir"];
                    }

                    // console.error("oneAlign======", oneAlign,item.lgtd,item.lttd)
                    item.stime=stime;
                    item.etime=etime;
                    if (switchChecked == true) {
                        var label = new MapTextPagehome(map, point, item, textStr, globallevel, oneAlign, cls, 12);
                        labels.push(label);
                    }
                    var graphic = new Graphic(point, breakSymbol, item, null);
                    YBWaterLayerGraphicLayer.add(graphic);
                }
            }
        })
    }, 100)

}
function onaddLLMark(evt) { 
    var item = evt.graphic.attributes;
    if (SetNull(item) != "") {
        const ChildVue = defineAsyncComponent(() =>
            import("@/components/danzhan/sq/DanZHanSel.vue")
        );
        const props = {};
        props["stcd"] = item["stcd"]
        props["stime"] ="";
        props["etime"] = item["tm"]
        props["mtype"] = item["mtype"]
        props["type"] = "流量过程"
        Dialog.open({ title: item["stnm"], widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
    }
    evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
}
function addLLMark(strJson, switchChecked) {
    var arr = strJson;
    var layerId = "addLLMark";
    var LLLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(LLLayerGraphicLayer) != "") {
        LLLayerGraphicLayer.clear(); //删除图层
        try {
            LLLayerGraphicLayer.off("click", onaddLLMark)
        } catch (error) {

        }
        LLLayerGraphicLayer.on("click", onaddLLMark);
        setLayerToolTip(LLLayerGraphicLayer, "stnm", "q", "流量");
    }
    setTimeout(function () {
        if (SetNull(strJson) == "")
            return;
        require(["esri/geometry/Point",
            "esri/graphic",
            "myJs/MapText",
            "esri/symbols/PictureMarkerSymbol",
             "esri/SpatialReference","dojo/domReady!"
        ], function (Point, Graphic, MapText, PictureMarkerSymbol,SpatialReference) {
            $(".gcText").remove();
            // destroy();
            if (arr.length > 0) {
                var breakSymbol;
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    item.lgtd = item.lgtd;
                    item.lttd = item.lttd;
                    var angle = 0;
                    var _align = "bottom";
                    if(SetNull(item.dir)!=""){
                        _align=item.dir;
                    }

                    var cls = "gcText";
                    var q = SetNull(item["q"]) != "" ? Number(item["q"]).toFixed(3) : "—";
                    if (SetNull(item.rotate)!="") {
                        angle = parseInt(item.rotate);
                        if(q!="—"){
                            if( Number(q)<0){
                                angle=180+angle;
                            }
                        }
                        angle=angle+180;//图片箭头是向下的
                    }
                    var _width=10,_height=60;
                    let imgUrl = "/images/fl_y.gif";
                    if (SetNull(item.q) == "") {//没流量
                        angle=0;
                        imgUrl = "/images/tgtqtingzhi.svg";
                        _width=18;
                        _height=18;
                    }
                    if (SetNull(item.tm) == "") {//缺测
                        angle=0;
                        imgUrl = "/images/tgtqarrowtz.svg";
                        _width=18;
                        _height=18;
                    }
                    
                    breakSymbol = new PictureMarkerSymbol(imgUrl, _width, _height);
                    breakSymbol.angle = angle;

                    if (breakSymbol == "") continue;
                    if (item.lgtd == undefined && item.lttd == undefined) {
                        continue;
                    } else {
                        var point = new Point(arr[i].lgtd, arr[i].lttd, new SpatialReference({
                            wkid: 4326
                        }));
                        var textStr = item.stnm + "<br>";
                        textStr += "流量:" + q;
                        if (switchChecked) {
                            var label = new MapText(map, point, arr[i], textStr, globallevel, _align, cls,
                                12);
                            labels.push(label);
                        }
                        var graphic = new Graphic(point, breakSymbol, arr[i], null);
                        LLLayerGraphicLayer.add(graphic);
                    }
                }
            }

        });
    }, 100)
}
// 流态
function readJosn() {
    var layerId = "centerLineGraphicLayer";
    var centerLineGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(centerLineGraphicLayer) != "") {
        centerLineGraphicLayer.clear(); //删除图层
    }
    setTimeout(function () {
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
            var features = RiverLT.features;
            // console.error("features", features)
            var ListArr = [];
            features.forEach(function (feature) {
                var coordinates = feature.coordinates;
                if (coordinates.length > 0) {
                    for (var num = 0; num < coordinates.length; num++) {
                        if (coordinates[num].length > 3) {
                            for (var II = 0; II < coordinates[num].length; II++) {
                                coordinates[num][II][0] = Number(coordinates[num][II][0]);
                                coordinates[num][II][1] = Number(coordinates[num][II][1]);
                            }
                        } else {
                            coordinates[num][0] = Number(coordinates[num][0]);
                            coordinates[num][1] = Number(coordinates[num][1]);
                        }

                    }
                }

                var area = new Polyline(coordinates);
                var properties = feature.properties;
                var lineSymbol = new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([8,238,238, .6]), 3);
                var gra = new Graphic(area, lineSymbol);
                gra.attributes = properties;
                var ddID = "";
                centerLineGraphicLayer.add(gra);
            });
            $.data(myData, "ListArr", ListArr);
            loadSVG();
        });
    }, 100)
}
function loadSVG() {
    // console.error('loadSVG', 1);
    let paths = document.querySelectorAll('#centerLineGraphicLayer_layer path');
    paths = Array.prototype.slice.call(paths);
    let style = ``;
    var swData = [];
    if (swData == null) {
        return;
    }
    var _result = [], ListArr = [];
    var strSTCD = $.data(myData, "ListArr");
    // if (strSTCD.length > 0) {
    for (var numII = 0; numII < paths.length; numII++) {
        var _stnm = "";//strSTCD[numII];
        var FX = 1;
        var ENNM = "";
        if (paths.length > numII && paths.length > 0) {
            var path = paths[numII];
            path.setAttribute('id', 'path-' + numII);
            var pathName = _stnm;
            let length = path.getTotalLength();
            let speed = 30;//length / 50;
            let speed1 = length / 15;
            let CAR_SIZE = 15;
            if (length < 50) {
                speed = 5;
            } else {
                speed = (length / 50) * 1 + 5;
            }
            speed = (length / 50) * 2 + 5;

            var t1, t2;
            t1 = length;
            t2 = 0;
            if (FX < 0) {
                t1 = 0, t2 = length;
            }
            style += ` #path-${numII}{
                                stroke-dasharray: ${CAR_SIZE}, ${length / speed1};
                                stroke-dashoffset: ${length};
                                animation: dash_${ENNM} ${speed}s linear infinite;
                            }

                            @keyframes dash_${ENNM} {
                                from {
                                stroke-dashoffset:  ${t1};
                                }
                                to {
                                stroke-dashoffset: ${t2};
                                }
                            }
                            @keyframes dash {
                                to {
                                stroke-dashoffset: 0;
                                }
                            }`
            // var svgTemp = shuzidatingRiverSVG.filter(function (e) {
            //     return e.ENNM == pathName;
            // });
            // if (svgTemp.length > 0) {
            //     item = svgTemp[0];
            //     if (item != undefined) {
            //         ENNM = item.ENNM;
            //         if (ENNM.indexOf("吴淞江") > -1 || ENNM == "苏州河" || ENNM == "太浦河直流12" || ENNM == "太浦河直流13" || ENNM == "太浦河直流14" || ENNM == "太浦河直流15" || ENNM == "太浦河直流11" || ENNM == "太浦河直流10" || ENNM == "太浦河直流9"
            //             || ENNM == "太浦河直流8" || ENNM == "太浦河直流7" || ENNM == "太浦河直流6" || ENNM == "太浦河直流5" || ENNM == "太浦河直流4" || ENNM == "太浦河直流3" || ENNM == "太浦河直流2" || ENNM == "太浦河直流1"
            //             || ENNM == "杨林塘" || ENNM == "青阳港" || ENNM == "金鸡河" || ENNM == "浏河前" || ENNM == "娄江-浏河" || ENNM == "张家港" || ENNM == "长山河" || ENNM == "盐官下河" || ENNM == "冶长泾" || ENNM == "永昌泾" || ENNM == "京杭运河（嘉兴）") {
            //             continue;
            //         }
            //         if (item.ENNM != "太浦河" && item.ENNM != "黄浦江") {
            //             if (item.SSTCD != undefined) {
            //                 if (swData != null) {
            //                     var sz = 0, xz = 0;
            //                     var swDataTemp = swData.filter(function (e) {
            //                         return e.STCD == item.SSTCD;
            //                     });
            //                     if (swDataTemp.length > 0) {
            //                         sz = swDataTemp[0].Z != "" ? Number(swDataTemp[0].Z) : 0;
            //                     }
            //                     swDataTemp = swData.filter(function (e) {
            //                         return e.STCD == item.ESTCD;
            //                     });
            //                     if (swDataTemp.length > 0) {
            //                         xz = swDataTemp[0].Z != "" ? Number(swDataTemp[0].Z) : 0;
            //                     }
            //                     if (sz < xz) {
            //                         FX = -1;//下游水位高于上游水位，方向反
            //                     }

            //                 }
            //             }
            //         }
            //         else {
            //             FX = -1;

            //             if (ENNM == "东苕溪导流" || ENNM == "机坊港" || ENNM == "黄浦江") {
            //                 FX = 1;
            //             }
            //         }
            //         if (ENNM == "京杭运河" || ENNM == "京杭运河（老）" || ENNM == "京杭运河(" || ENNM == "京杭运河1" || ENNM == "太浦河" || ENNM == "太浦闸" || ENNM == "十一圩港" || ENNM == "望虞河" || ENNM == "" || ENNM == "金鸡河" || ENNM == "东苕溪导流" || ENNM == "太浦河直流16" || ENNM == "张家港" || ENNM == "杨林塘" || ENNM == "机坊港" || ENNM == "青阳港" || ENNM == "永昌泾" || ENNM == "冶长泾" || ENNM == "浏河前" || ENNM == "娄江-浏河" || ENNM == "新孟河4" || ENNM == "西苕溪" || ENNM == "旄儿港") {
            //             FX = -1;
            //         } else if (ENNM == "京杭运河（嘉兴）" || ENNM == "新孟河" || ENNM == "新孟河2" || ENNM == "黄浦江" || ENNM == "太滆运河" || ENNM == "漕桥河" || ENNM == "新孟河3") {
            //             FX = 1;
            //         }
            //         let length = path.getTotalLength();
            //         let speed = 30;//length / 50;
            //         let speed1 = length / 15;
            //         let CAR_SIZE = 15;
            //         if (length < 50) {
            //             speed = 5;
            //         } else {
            //             speed = (length / 50) * 1 + 5;
            //         }
            //         speed = (length / 50) * 2 + 5;

            //         var t1, t2;
            //         t1 = length;
            //         t2 = 0;
            //         if (FX < 0) {
            //             t1 = 0, t2 = length;
            //         }
            //         style += `.div_${ENNM} {
            //                 stroke-dasharray: ${CAR_SIZE}, ${length / speed1};
            //                 stroke-dashoffset: ${length};
            //                 animation: dash_${ENNM} ${speed}s linear infinite;
            //             }

            //             @keyframes dash_${ENNM} {
            //                 from {
            //                 stroke-dashoffset:  ${t1};
            //                 }
            //                 to {
            //                 stroke-dashoffset: ${t2};
            //                 }
            //             }
            //             @keyframes dash {
            //                 to {
            //                 stroke-dashoffset: 0;
            //                 }
            //             }`

            //     }
            // } else { }
        }
        // else {
        //     if (_stnm != "") {
        //         style += `  .div_${ENNM} {
        //                   stroke-dasharray: none !important; 
        //                 } `
        //     }

        // }
    }
    // }
    const sheet = document.createElement('style');
    sheet.id = "myStyleID";
    sheet.innerHTML = style;
    document.head.appendChild(sheet);
    // console.error("3", document.head);
}
function addDWMark(strJson, switchChecked, layerId = "addDWMark") {
    var zwdwLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(zwdwLayerGraphicLayer) != "") {
        zwdwLayerGraphicLayer.clear(); //删除图层
    }
    setTimeout(function () {
        if (SetNull(strJson) == "")
            return;
        require(["esri/geometry/Point",
            "esri/graphic",
            "myJs/MapTextPagehome",
            "esri/symbols/PictureMarkerSymbol", "dojo/domReady!"
        ], function (Point, Graphic, MapTextPagehome, PictureMarkerSymbol) {
            var breakSymbol;
            $(".amap-ui-district-cluster-marker").remove();
            destroy();
            if (strJson.length > 0) {
                for (var num = 0; num < strJson.length; num++) {
                    var item = strJson[num];
                    if (item.lgtd == undefined && item.lttd == undefined) {
                        continue;
                    }
                    var cls = "rainText";
                    breakSymbol = new PictureMarkerSymbol("/images/shuiwenunit.png", 30, 28);
                    var point = new Point({
                        "x": item.lgtd,
                        "y": item.lttd,
                        "spatialReference": {
                            "wkid": 4326
                        }
                    });

                    var textStr = "";
                    if (item.name != undefined) {
                        textStr += "@" + item.name;
                    }
                    var oneAlign = "bottom";
                    if (switchChecked) {
                        var label = new MapTextPagehome(map, point, item, textStr, globallevel, oneAlign, cls, -30);
                        labels.push(label);
                    }
                    var graphic = new Graphic(point, breakSymbol, item, null);
                    zwdwLayerGraphicLayer.add(graphic);

                }
            }
        })
    }, 100)
}
function addBJLLMark(strJson, switchChecked) {
    var arr = strJson;
    var layerId = "addBJLLMark";
    var BJLLLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(BJLLLayerGraphicLayer) != "") {
        BJLLLayerGraphicLayer.clear(); //删除图层
        try {
            BJLLLayerGraphicLayer.off("click", onaddLLMark)
        } catch (error) {

        }
        BJLLLayerGraphicLayer.on("click", onaddLLMark);
        setLayerToolTip(BJLLLayerGraphicLayer, "stnm", "q,sl", "流量@m³/s,水量@万方");
    }
    setTimeout(function () {
        if (SetNull(strJson) == "")
            return;
        require(["esri/map", "esri/geometry/Point",
            "esri/graphic",
            "myJs/MapTextPagehomeSWZZ",
            "esri/symbols/PictureMarkerSymbol",
            "esri/InfoTemplate",
            "esri/dijit/InfoWindow", "esri/symbols/SimpleMarkerSymbol", "esri/Color",
            "esri/layers/GraphicsLayer", "esri/SpatialReference", "esri/geometry/webMercatorUtils", "dojo/domReady!"
        ], function (Map, Point, Graphic, MapTextPagehomeSWZZ, PictureMarkerSymbol, InfoTemplate, InfoWindow, SimpleMarkerSymbol, Color,
            GraphicsLayer, SpatialReference, webMercatorUtils) {
            $(".amap-ui-district-cluster-marker").remove();
            // destroy();
            if (arr.length > 0) {
                var breakSymbol;
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    var angle = 0;
                    var _align = "bottom";

                    var cls = "level_ll";
                    var q = SetNull(item["q"]) != "" ? Number(item["q"]).toFixed(1) : "—";
                    var imgUrl = "/images/fl_p.gif";
                    if (q > 0) {
                        angle = -135;
                    }
                    if ("黄渡,东大盈水闸".indexOf(item.stnm) > -1) {
                        angle = -90;
                        imgUrl = "/images/fl_y.gif";
                    }
                    else if ("松浦大桥,蒋古渡".indexOf(item.stnm) > -1) {
                        angle = -135;
                    }
                    else if ("河祝".indexOf(item.stnm) > -1) {
                        angle = -45;
                        _align = "top";
                        imgUrl = "/images/fl_y.gif";
                    }
                    else if ("练塘,东团".indexOf(item.stnm) > -1) {
                        angle = -90;
                        _align = "right";
                        if (item.stnm == "东团") {
                            _align = "bottom";
                        }
                        imgUrl = "/images/fl_y.gif";
                    }
                    else if ("西大盈水闸,盐铁北闸,孙浜套闸,新泾套闸".indexOf(item.stnm) > -1) {
                        angle = -45;
                        imgUrl = "/images/fl_y.gif";
                    }
                    else if ("龙泉港水闸,南竹港出海闸,金汇港南闸,中港水闸".indexOf(item.stnm) > -1) {
                        angle = -45;
                    }
                    // console.error("graphic流量",item.stnm,_align);
                    breakSymbol = new PictureMarkerSymbol(imgUrl, 13, 65);
                    breakSymbol.angle = angle;

                    if (breakSymbol == "") continue;
                    if (item.lgtd == undefined && item.lttd == undefined) {
                        continue;
                    } else {
                        var point = new Point(arr[i].lgtd, arr[i].lttd, new SpatialReference({
                            wkid: 4326
                        }));
                        var textStr = item.stnm + "@水量：" + item.sl + "万方@流量：" + q + "m³/s";
                        if (switchChecked) {
                            var label = new MapTextPagehomeSWZZ(map, point, item, textStr, globallevel, _align, cls, 12);
                            labels.push(label);
                        }
                        var graphic = new Graphic(point, breakSymbol, item, null);
                        BJLLLayerGraphicLayer.add(graphic);
                        // console.error("graphic流量",graphic);
                    }
                }
            }

        });
    }, 100)
}
//改变黄浦江和苏州河的颜色
function chageHpjSzhBG(riverType) {
    require([
        "esri/Color",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
    ], function (Color, SimpleFillSymbol, SimpleLineSymbol) {
        var bjLayer = map.getLayer("bj");
        try {
            var bjLayergraphics = bjLayer.graphics;
            bjLayergraphics.map(u => {
                var attributes = u.attributes;
                if (attributes != undefined) {
                    var ENNM = attributes.OBJNAME;
                    if (SetNull(ENNM) != "") {
                        if (ENNM == "黄浦江" || ENNM == "吴淞江-苏州河") {
                            var riverColor = [7, 152, 201, 0.3];
                            if (riverType) {
                                riverColor = [98, 198, 222, 1];
                            }
                            // console.error('PointMark.map',u); 
                            var lineSymbol = new SimpleFillSymbol(
                                SimpleFillSymbol.STYLE_SOLID,
                                new SimpleLineSymbol(
                                    SimpleLineSymbol.STYLE_SOLID,
                                    new Color(riverColor), //rgb155, 153, 153
                                    1
                                ),
                                new Color(riverColor) //rgba
                            );
                            u.setSymbol(lineSymbol);
                        }
                    }
                }
            });

        } catch (error) { }
    });
}
//隐藏分区边界，重新画边界
function showhideShanghaiArea(riverType) {
    require([
        "esri/Color",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
    ], function (Color, SimpleFillSymbol, SimpleLineSymbol) {
        var bjLayer = map.getLayer("bj");
        try {
            var bjLayergraphics = bjLayer.graphics;
            bjLayergraphics.map(u => {
                if (u.id != undefined) {
                    if (u.id.indexOf("shanghaiarea") > -1) {
                        if (riverType) {
                            u.hide();
                        }
                        else {
                            u.show();
                        }
                    }

                }
            });

        } catch (error) { }
    });
}
//外边界：水资源
function addSHPolygonSZY() {
    var layerId = "addSHPolygonSZY";
    var layer = CreateLayer(layerId); //创建图层
    if (SetNull(layer) != "") {
        layer.clear(); //删除图层
    }
    require([
        "esri/geometry/Polyline",
        "esri/graphic",
        "esri/Color",
        "esri/symbols/SimpleLineSymbol", "esri/geometry/Polygon",
        "esri/symbols/SimpleFillSymbol",
    ], function (Polyline, Graphic, Color, SimpleLineSymbol, Polygon, SimpleFillSymbol) {
        var features = SHBJ.features;
        if (features.length > 0) {
            var polyline1 = [], polyline2 = [], polyline3 = [], polyline4 = [];
            for (var num = 0; num < features.length; num++) {
                var paths = features[num].geometry.coordinates;
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
                }
            }
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
function addSTLLSWMark(strJson, switchChecked) {
    var arr = strJson;
    var layerId = "addSTLLSWMark";
    var STLLSWLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(STLLSWLayerGraphicLayer) != "") {
        STLLSWLayerGraphicLayer.clear(); //删除图层
        try {
            STLLSWLayerGraphicLayer.off("click", onaddLLMark)
        } catch (error) {

        }
        STLLSWLayerGraphicLayer.on("click", onaddLLMark);
        setLayerToolTip(STLLSWLayerGraphicLayer, "stnm", "q,sl", "流量@m³/s,水量@万方");
    }
    setTimeout(function () {
        if (SetNull(strJson) == "")
            return;
        require(["esri/map", "esri/geometry/Point",
            "esri/graphic",
            "myJs/MapTextPagehomeSWZZ",
            "esri/symbols/PictureMarkerSymbol",
            "esri/InfoTemplate",
            "esri/dijit/InfoWindow", "esri/symbols/SimpleMarkerSymbol", "esri/Color",
            "esri/layers/GraphicsLayer", "esri/SpatialReference", "esri/geometry/webMercatorUtils", "dojo/domReady!"
        ], function (Map, Point, Graphic, MapTextPagehomeSWZZ, PictureMarkerSymbol, InfoTemplate, InfoWindow, SimpleMarkerSymbol, Color,
            GraphicsLayer, SpatialReference, webMercatorUtils) {
            $(".amap-ui-district-cluster-marker").remove();
            // destroy();
            if (arr.length > 0) {
                var breakSymbol;
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    var angle = 0;
                    var _align = "bottom";

                    var cls = "level_ll";
                    var q = SetNull(item["q"]) != "" ? Number(item["q"]).toFixed(1) : "—";
                    var imgUrl = "/images/shuiwenunit.png";
                    breakSymbol = new PictureMarkerSymbol(imgUrl, 33, 32);

                    if (breakSymbol == "") continue;
                    if (item.lgtd == undefined && item.lttd == undefined) {
                        continue;
                    } else {
                        var point = new Point(arr[i].lgtd, arr[i].lttd, new SpatialReference({
                            wkid: 4326
                        }));
                        var textStr = item.stnm;
                        if (q != "—") {
                            textStr += "@日净泄流量：" + q + "m³/s";
                        }
                        // if( SetNull(item["llz"]) != ""){
                        //     textStr+="@氯离子："+  item["llz"]+"mg/L";
                        // }
                        if (SetNull(item["minq"]) != "") {
                            textStr += "@本月最小流量：" + item["minq"] + "m³/s";
                        }
                        if (SetNull(item["stq"]) != "") {
                            textStr += "@生态流量指标：" + item["stq"] + "m³/s";
                        }

                        if (SetNull(item["upz"]) != "") {
                            textStr += "@日均水位：" + item["upz"] + "m";
                        }
                        if (SetNull(item.minupz) != "") {
                            textStr += "@本月最低水位：" + item["minupz"] + "m";
                        }
                        if (SetNull(item.stupz) != "") {
                            textStr += "@最低生态水位：" + item["stupz"] + "m";
                        }
                        // if(SetNull(item.days) != ""){
                        //     textStr+= "@未达标天数："+  item["days"]+"天";
                        // }
                        if (item.stnm == "千灯浦桥") {
                            _align = "top";
                        }
                        if (item.stnm == "淀浦河西闸（闸外）") {
                            _align = "right";
                        }
                        if (switchChecked) {
                            var label = new MapTextPagehomeSWZZ(map, point, item, textStr, globallevel, _align, cls, 12);
                            labels.push(label);
                        }
                        var graphic = new Graphic(point, breakSymbol, item, null);
                        STLLSWLayerGraphicLayer.add(graphic);
                        // console.error("graphic流量",graphic);
                    }
                }
            }

        });
    }, 100)
}
//地表水行政分区
function addSHAreaPolygonSZY(strJson) {
    var layerId = "addSHAreaPolygonSZY";
    var layer = CreateLayer(layerId); //创建图层
    if (SetNull(layer) != "") {
        layer.clear(); //删除图层
    }
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
        var features = SHBJArea.features;
        features.forEach(function (feature) {
            var allrings = feature.geometry.coordinates;
            var properties = feature.properties;
            var mc = properties["名称"];
            var areaname = mc;
            var colorStr = [6, 110, 140];
            if (colorStr != null && colorStr != "" && colorStr != undefined) {
                var fillColorStr = [0, 0, 0, 0];

                allrings.forEach(function (rings) {
                    var area = new Polygon(rings);
                    var symbol, g3;
                    // var symbol = new SimpleFillSymbol(
                    //     SimpleFillSymbol.STYLE_SOLID,
                    //     new SimpleLineSymbol(
                    //         SimpleLineSymbol.STYLE_SOLID,
                    //         new Color(colorStr),//rgb  边框色
                    //         10
                    //     ),
                    //     new Color(fillColorStr)//rgba  中间填充色
                    // );
                    // var g3 = new Graphic(area, symbol);
                    // layer.add(g3);

                    colorStr = [1, 242, 165];
                    symbol = new SimpleFillSymbol(
                        SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(
                            SimpleLineSymbol.STYLE_SOLID,
                            new Color(colorStr),//rgb  边框色
                            2
                        ),
                        new Color(fillColorStr)//rgba  中间填充色
                    );
                    g3 = new Graphic(area, symbol);
                    layer.add(g3);

                    // colorStr=[2, 216, 224];
                    // symbol = new SimpleFillSymbol(
                    //     SimpleFillSymbol.STYLE_SOLID,
                    //     new SimpleLineSymbol(
                    //         SimpleLineSymbol.STYLE_SOLID,
                    //         new Color(colorStr),//rgb  边框色
                    //         4
                    //     ),
                    //     new Color(fillColorStr)//rgba  中间填充色
                    // );
                    // g3 = new Graphic(area, symbol);
                    // layer.add(g3);

                    // colorStr=[147, 5, 182, 0.85];
                    //  symbol = new SimpleFillSymbol(
                    //     SimpleFillSymbol.STYLE_SOLID,
                    //     new SimpleLineSymbol(
                    //         SimpleLineSymbol.STYLE_SOLID,
                    //         new Color(colorStr),//rgb  边框色
                    //         2
                    //     ),
                    //     new Color(fillColorStr)//rgba  中间填充色
                    // );
                    // g3 = new Graphic(area, symbol);
                    // layer.add(g3);

                }, this);
            }
            if (properties.centroid != undefined) {
                var point = new Point({ "x": properties.centroid[0], "y": properties.centroid[1], "spatialReference": { "wkid": 4326 } });
                var font = new Font("16px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, "bold");
                var textSymbol = new TextSymbol(
                    areaname,
                    font,
                    new Color([0, 253, 255])
                ).setOffset(0, 10)
                    .setHaloColor(new Color([0, 0, 0, 0.8])).
                    setHaloSize(0.5);

                var labelPointGraphic = new Graphic(point, textSymbol);
                layer.add(labelPointGraphic);

                var strJsonTemp = strJson.filter(function (e) {
                    return e.name == areaname;
                });
                if (strJsonTemp.length > 0) {
                    textSymbol = new TextSymbol(
                        strJsonTemp[0].value + "万方",
                        font,
                        new Color([0, 253, 255])
                    ).setOffset(0, -10)
                        .setHaloColor(new Color([0, 0, 0, 0.8])).
                        setHaloSize(0.5);;
                    labelPointGraphic = new Graphic(point, textSymbol);
                    layer.add(labelPointGraphic);
                }
            }
            else {
                console.error("缺少中心点经纬度的区域", areaname);
            }
        }, this);
    });
}
function addXunjianPointMark(strJson, switchChecked) {
    var arr = strJson;
    var layerId = "addBJLLMark";
    var BJLLLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(BJLLLayerGraphicLayer) != "") {
        BJLLLayerGraphicLayer.clear(); //删除图层
        try {
            BJLLLayerGraphicLayer.off("click", onaddLLMark)
        } catch (error) {

        }
        BJLLLayerGraphicLayer.on("click", onaddLLMark);
        setLayerToolTip(BJLLLayerGraphicLayer, "stnm", "", "");
    }
    setTimeout(function () {
        if (SetNull(strJson) == "")
            return;
        require(["esri/map", "esri/geometry/Point",
            "esri/graphic",
            "myJs/MapTextPagehomeSWZZ",
            "esri/symbols/PictureMarkerSymbol",
            "esri/InfoTemplate",
            "esri/dijit/InfoWindow", "esri/symbols/SimpleMarkerSymbol", "esri/Color",
            "esri/layers/GraphicsLayer", "esri/SpatialReference", "esri/geometry/webMercatorUtils", "dojo/domReady!"
        ], function (Map, Point, Graphic, MapTextPagehomeSWZZ, PictureMarkerSymbol, InfoTemplate, InfoWindow, SimpleMarkerSymbol, Color,
            GraphicsLayer, SpatialReference, webMercatorUtils) {
            $(".amap-ui-district-cluster-marker").remove();
            // destroy();
            if (arr.length > 0) {
                var breakSymbol;
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    item.lgtd = item.longitude;
                    item.lttd = item.latitude;
                    item.stnm = item.name;
                    var angle = 0;
                    var _align = "bottom";

                    var cls = "level_ll";
                    var q = SetNull(item["q"]) != "" ? Number(item["q"]).toFixed(1) : "—";
                    var imgUrl = "/images/dataOnline.png";
                    var imgWidth = 16, imgheight = 16;
                    if (item.rtuType == "1") {
                        imgUrl = "/images/yj_0.gif";
                        imgWidth = 18, imgheight = 18;
                    }
                    breakSymbol = new PictureMarkerSymbol(imgUrl, imgWidth, imgheight);
                    if (breakSymbol == "") continue;
                    if (item.lgtd == undefined && item.lttd == undefined) {
                        continue;
                    } else {
                        var point = new Point(arr[i].lgtd, arr[i].lttd, new SpatialReference({
                            wkid: 4326
                        }));
                        var textStr = item.stnm;
                        if (switchChecked) {
                            var label = new MapTextPagehomeSWZZ(map, point, item, textStr, globallevel, _align, cls, 12);
                            labels.push(label);
                        }
                        var graphic = new Graphic(point, breakSymbol, item, null);
                        BJLLLayerGraphicLayer.add(graphic);
                        // console.error("graphic流量",graphic);
                    }
                }
            }

        });
    }, 100)
}
function onaddWQMark(evt) {
    var item = evt.graphic.attributes;
    // console.error("onaddSWMark", evt, item)
    if (SetNull(item) != "") {
        let ChildVue = defineAsyncComponent(() =>
            // import("@/components/danzhan/wq/WQAreaCapacityNewMode.vue")
            import("@/components/danzhan/wq/DanZhanWQSel.vue")
          );
          var wqid = item.wqid;
          var stnm = item.wqname;
          var stcd = item.stcd;
          const props = {};
          props["stcd"] = stcd;
          props["wqid"] = wqid;
          props["stnm"] = stnm;
          props["tableData"] = item.tableData;
          props["items"] = item;
          Dialog.open({ title: stnm, widh: 1700, heig: 800 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
    }
    evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
}
//圩区
function addWQMark(strJson, switchChecked) {
    $.data(myData, "resultDataWQ",strJson);
    var layerId="addWQMark";
    var wqLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(wqLayerGraphicLayer) != "") {
        wqLayerGraphicLayer.clear(); //删除图层
        wqLayerGraphicLayer.on("click", onaddWQMark);
        // setLayerToolTip(wqLayerGraphicLayer, "stnm", "upz,wrz,tm", "水位,警戒,时间");
    }    
    setTimeout(function () {
        var weiquData = weiquURL.features;
        for (let num = 0; num < weiquData.length; num++) {
            const itemList = weiquData[num];
            var strWhere = {};
            strWhere["properties"] = itemList.properties
            strWhere["path"] = itemList.geometry.coordinates[0];
            addAREALine(strWhere,wqLayerGraphicLayer);
        }
    }, 100);
}
function addAREALine(strJson, layer) {
    var path = strJson["path"];
    require(["esri/geometry/Polyline",
        "esri/geometry/Point",
        "esri/graphic",
        "esri/Color",
        "esri/SpatialReference",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/TextSymbol",
        "esri/geometry/Polygon", "esri/symbols/Font"
    ], function (Polyline, Point, Graphic, Color, SpatialReference, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Polygon, Font) {
        var taihujuXY = [path];
        if (taihujuXY[0].length > 0) {
            for (var num = 0; num < taihujuXY[0].length; num++) {
                if (taihujuXY[0][num].length > 3) {
                    for (var II = 0; II < taihujuXY[0][num].length; II++) {
                        taihujuXY[0][num][II][0] = Number(taihujuXY[0][num][II][0]) - 0.0009;// + 0.01034259795796 - 0.00446319580273 - 0.00083;
                        taihujuXY[0][num][II][1] = Number(taihujuXY[0][num][II][1]);// - 0.003148533251931 + 0.00089687886118;
                    }
                } else {
                    taihujuXY[0][num][0] = Number(taihujuXY[0][num][0]) - 0.0007;// + 0.01034259795796 - 0.00446319580273 - 0.00083;
                    taihujuXY[0][num][1] = Number(taihujuXY[0][num][1]);// - 0.003148533251931 + 0.00089687886118;
                }

            }
        }
		
		
        var line = new esri.geometry.Polyline({
            "paths": taihujuXY,
            "spatialReference": { "wkid": 4326 }
        });
        var color = [0, 176, 80, 0.4];
        var resultDataWQdata = $.data(myData, "resultDataWQ");
        var itemList = strJson["properties"];
        var stnm = itemList["圩区名"]
        var wqid = itemList.OBJECTID
        var v = resultDataWQdata.filter(function (res) {
            return res.wqid == wqid;
        })
		// if(stnm == "张西联圩"){
		// 	console.log("taihujuXY: " + JSON.stringify(taihujuXY));
		// }
        var capacity = -1;
        var FontCOLOR = "#000000";
        var flag = true;
        if(v.length==0){
            return;
        }
        var valWQWrz = 0;//控制水位
        if (SetNull(v[0]["maxupz"]) != "" && SetNull(v[0]["value"]) != "") {
            valWQWrz = v[0]["value"] - v[0]["maxupz"];
        }
        if (valWQWrz > 0) {//控制水位
            color = [ 255,192,0, 0.4];//橙色            
        }
        if(stnm=="北干山圩"||stnm=="跃进圩"||stnm=="新镇圩"||stnm=="中心港圩"){            
            color = [ 255,192,0, 0.4];//橙色    
        }
        // if (v.length > 0) {
        //     var wqgrz = v[0].wqgrz != undefined ? Number(v[0].wqgrz).toFixed(2) : "";
        //     var avgupz = v[0].avgupz != undefined ? Number(v[0].avgupz).toFixed(2) : "";
        //     if (wqgrz != "" && avgupz != "") {
        //         if (Number(wqgrz) <= Number(avgupz)) {
        //             var cha = Number(v[0]["upz"]) - Number(v[0]["upz"]);
        //             if (cha >= 0.20 && cha <= 0.40) {
        //                 color = [252, 106, 7, 0.7];//橙色
        //                 FontCOLOR = "#000000";
        //                 //flag = true;
        //             } else if (cha < 0.2) {
        //                 color = [218, 80, 83, 0.7];//红色
        //                 FontCOLOR = "#FFFFFF";
        //             }
        //             else {
        //                 FontCOLOR = "#000000";
        //             }
        //         }
        //     }
        // }
        // console.error("v圩区名称",v);
        var item = v[0];
        item["stnm"] = stnm
        item["stcd"] = wqid
        item["capacity"] = capacity > -1 ? capacity : "—";
        item["wqarea"] = item["wqarea"] > 0 ? Number(item["wqarea"] / 666.7).toFixed(0) : 0;
        item["wqcount"] = item["wqcount"] > 0 ? Number(item["wqcount"] / 666.7).toFixed(0) : 0;
        item["avgupz"] = undefined != item["avgupz"] ? Number(item["avgupz"]).toFixed(2) : "—";
        item["wqgrz"] = undefined != item["wqgrz"] ? Number(item["wqgrz"]).toFixed(2) : "—";
        item["upz"]=undefined != item["upz"] ? Number(item["upz"]).toFixed(2) : "—";

        var lineSymbol1 = new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([0,255,255]),
            1);
        var lineSymbol = new SimpleFillSymbol("solid", lineSymbol1, new dojo.Color(color));

        var polyline = new esri.Graphic(line, lineSymbol, item, null);
        polyline.attributes = item;
        layer.add(polyline);

        if (flag) {
            var stHDName = stnm;// + "\n"+"(" + capacity + ")";
            if (map.getLevel() <= 10) {
                stHDName = "";
            }
            if (SetNull(item["upz"]) != "") {
                stHDName += "\n" + item["upz"];
            }
            var textSymbol = new TextSymbol(stHDName).
                setColor(new dojo.Color([255, 255, 255])).
                setFont(new esri.symbol.Font("14px").setWeight(esri.symbol.Font.VARIANT_NORMAL)).
                setOffset(10, 0);
            // console.error(itemList,itemList.lgtd,itemList.lttd);
            var point = new Point({
                "x": itemList['x中心点'],
                "y": itemList['y中心站'],
                "spatialReference": {
                    "wkid": 4326
                }
            });
            var labelPointGraphic = new Graphic(point, textSymbol, item, null);
            layer.add(labelPointGraphic);

            // console.error(flag,"stHDName",stHDName,item.lgtd,item.lttd,FontCOLOR,labelPointGraphic);
        }

        var polygonSymbol = new esri.symbol.SimpleFillSymbol("solid",
            new esri.symbol.SimpleLineSymbol("solid", new dojo.Color(color), 0.5),
            new dojo.Color(color));
        //绘制一个多边形
        var polygon = new Polygon(new SpatialReference({
            wkid: 4326,
            "paths": taihujuXY
        }));
        // polygon.addRing(taihujuXY);
        var graphicQ = new Graphic(polygon, polygonSymbol);
        graphicQ.attributes = itemList;
        layer.add(graphicQ);

    });
}

//蓄水量
function addXSLMark(strJson, switchChecked) {
    var layerId="addXSLMark";
    var xslLayerGraphicLayer = CreateLayer(layerId); //创建图层
    if (SetNull(xslLayerGraphicLayer) != "") {
        xslLayerGraphicLayer.clear(); //删除图层
        // wqLayerGraphicLayer.on("click", onaddWQMark);
    }  
    require(["esri/geometry/Polyline",
        "esri/geometry/Point",
        "esri/graphic",
        "esri/Color",
        "esri/SpatialReference",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/TextSymbol",
        "esri/geometry/Polygon", "esri/symbols/Font",
        "myJs/MapText",
    ], function (Polyline, Point, Graphic, Color, SpatialReference, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Polygon, Font,MapText) {
        for(var num=0;num<strJson.length;num++){
            var properties=strJson[num];
            if (properties.lgtd != undefined) {

                var point = new Point({ "x": properties.lgtd, "y": properties.lttd-0.012, "spatialReference": { "wkid": 4326 } });
                
                var textStr1= '<div class="region-label" style="top: 15%; left: 45%;background:url(/images/cockpit__bottommenu4.png) no-repeat;color:white;background-size:100% 100%;width:140px;height:140px;text-align:center;padding: 25px 10px;">';
                textStr1+='<div class="region-title">'+properties.MC+'</div>';
                textStr1+='<div class="data-row">当前水位：<span class="data-value">'+properties.z+'</span></div>';
                textStr1+='<div class="data-row">当前蓄量：<span class="data-value">'+properties.sl+'</span></div>';
                textStr1+='<div class="data-row">蓄量余量：<span class="data-value">'+properties.ssl+'</span></div>';
                // textStr1+='<div class="data-row">纳雨能力：<span class="data-value">'+properties.drp+'</span></div>';
                textStr1+='</div>';
                var _align="bottom";
                if(properties.MC=="嘉宝北片"){
                    _align="top";
                }
                if(properties.MC=="蕴南片"){
                    _align="right";
                }
                if(properties.MC=="青松片"||properties.MC=="淀北片"){
                    _align="left";
                }
                var cls="";
                var label = new MapText(map, point, properties, textStr1, globallevel, _align, cls, 12);
                labels.push(label);

                // console.error('textStr1',textStr1);

                // properties.lttd=properties.lttd + 0.003;
                // var areaname="当前水位："+properties.z;
                // var point = new Point({ "x": properties.lgtd, "y": properties.lttd-0.012, "spatialReference": { "wkid": 4326 } });
                // var font = new Font("15px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, "bold");
                // var textSymbol = new TextSymbol(
                // areaname,
                // font,
                // new Color([255, 255, 255])
                // );
                // var labelPointGraphic = new Graphic(point, textSymbol);
                // xslLayerGraphicLayer.add(labelPointGraphic);

                // areaname="当前蓄量："+properties.sl;
                // point = new Point({ "x": properties.lgtd, "y": properties.lttd-0.024, "spatialReference": { "wkid": 4326 } });
                // textSymbol = new TextSymbol(
                //     areaname,
                //     font,
                //     new Color([255, 255, 255])
                //     );
                // labelPointGraphic = new Graphic(point, textSymbol);
                // xslLayerGraphicLayer.add(labelPointGraphic);

                // areaname="蓄量余量："+properties.ssl;
                // point = new Point({ "x": properties.lgtd, "y": properties.lttd-0.036, "spatialReference": { "wkid": 4326 } });
                // textSymbol = new TextSymbol(
                //     areaname,
                //     font,
                //     new Color([255, 255, 255])
                //     );
                // labelPointGraphic = new Graphic(point, textSymbol);
                // xslLayerGraphicLayer.add(labelPointGraphic);

                // areaname="纳雨能力："+properties.drp;
                // point = new Point({ "x": properties.lgtd, "y": properties.lttd-0.048, "spatialReference": { "wkid": 4326 } });
                // textSymbol = new TextSymbol(
                //     areaname,
                //     font,
                //     new Color([255, 255, 255])
                //     );
                // labelPointGraphic = new Graphic(point, textSymbol);
                // xslLayerGraphicLayer.add(labelPointGraphic);
            }
            else {
                console.error("缺少中心点经纬度的区域", areaname);
            }
        }        
    });
}


function riverPoint(evt){
    var graphic=evt.graphic;
    if(graphic!=undefined){
        var item=graphic.attributes;
        // console.error("riverPoint", evt, item);
        // if (SetNull(item) != "") {
        //     const ChildVue = defineAsyncComponent(() =>
        //         import("@/components/danzhan/sq/DanZHanSel.vue")
        //     );
        //     const props = {};
        //     props["stcd"] = item["hd_id"];
        //     props["dm"] = item["dm"];
        //     props["stime"] = item["stime"];
        //     props["stime"] = item["stime"];
        //     Dialog.open({ title: item["hd_name"], widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
        // }
        // evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
        //     console.error('riverPoint',evt);
    }
}
//查询结果换颜色
function queryCompleteSWLL(results,features,type,stime,etime) {
    var LayerID = "ModerRiverLayer";
    var ModerRiverLayerGraphicLayer = CreateLayer(LayerID, 1); //创建图层
    if (ModerRiverLayerGraphicLayer != null) {
        ModerRiverLayerGraphicLayer.clear();
        ModerRiverLayerGraphicLayer.on("click", riverPoint);
    }
    var colors = ["#C1F1FF", "#82E2FF", "#2FCFFF", "#00B8EF", "#0098C6", "#9797FF", "#6363FF","#4444FF", "#2424FF", "#0000D0", "#0000D0", "#000087","#000049", "#EF0088", "#EF0004"];
    var colors2 = ["#C1F1FF", "#82E2FF", "#2FCFFF", "#00B8EF", "#0098C6", "#9797FF", "#6363FF","#4444FF", "#2424FF", "#0000D0", "#0000D0", "#000087","#000049", "#EF0088", "#EF0004"];;
    if(type=="流量"){
        colors = ["#C1F1FF", "#82E2FF", "#2FCFFF", "#00B8EF", "#0098C6", "#9797FF", "#6363FF", "#2424FF", "#0000D0", "#0000D0", "#000087", "#EF0088", "#EF0004"];
        colors2 = ["#C1F1FF", "#82E2FF", "#2FCFFF", "#00B8EF", "#0098C6", "#9797FF", "#6363FF", "#2424FF", "#0000D0", "#0000D0", "#000087", "#EF0088", "#EF0004"];        
    }
    require(["esri/geometry/Point",
        "esri/graphic",
        "myJs/MapText",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "esri/InfoTemplate",
        "esri/dijit/InfoWindow",
        "esri/layers/GraphicsLayer",
        "esri/geometry/webMercatorUtils", "esri/symbols/TextSymbol",
        "dojo/_base/lang",
        "esri/geometry/Polygon",
        "dojo/domReady!"
    ], function (Point, Graphic, MapText, PictureMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol, Color,
        InfoTemplate, InfoWindow, GraphicsLayer, webMercatorUtils, TextSymbol, lang, Polygon) {
            // console.error('features',features);
            features.forEach(function (feature) {                
                var allrings = feature.geometry.coordinates;                
                var polygon = new Polygon(allrings);
                var properties = feature.properties;
                var hd_id = properties.ID;                
                var dm = properties["起始断面序"];
                var hd_name=properties["名称"];
                if(results==undefined){
                    return;
                }
                var riverResult=results[hd_id];
                var sections=riverResult.sections;
                // console.error('河道'+hd_id+'结果riverResult',riverResult);
                if (sections.length > 0) {
                    sections[dm].dm=dm;
                    sections[dm].hd_id=hd_id;
                    sections[dm].hd_name=hd_name;
                    sections[dm].stime=stime;
                    sections[dm].etime=etime;
                    var dataValue=sections[dm].Z;
                    if(type=="流量"){
                        dataValue=sections[dm].Qin;
                    }
                    var color =getRiverSZColor(type,dataValue);
                    var colorStr = colors[color];
                    var fillColorStr = colors2[color];
                    var fs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                            new Color(colorStr), 2), new Color(fillColorStr)
                    );
                    var g3 = new Graphic(polygon, fs);
                    g3.attributes =sections[dm];
                    ModerRiverLayerGraphicLayer.add(g3);
                }
            }, this);
    });
}
function getRiverSZColor(str,sw){
    var valueStr1 = "0,2,2.2,2.4,2.6,2.8,3.0,3.2,3.4,3.6,3.8,4,100000";
    var valueStr9 = "0.0,5.0,10.0,20.0,30.0,40.0,60.0,80,100,150,200,300,100000";
    var strValue = "";
    switch (str)
    {
        case "水位": strValue = valueStr1; break;//0.3-4
        case "流量": strValue = valueStr9; break;//0-0.1
    }
    var strArr = strValue.split(',');
    var color = 0;
    var iscolor = true;
    for (var i = 0; i < strArr.length; i++)
     {
        var a1 =parseFloat(strArr[i]);
        if (sw <a1)
        {
            color = i;
            iscolor = false;
            break;
        }
    }
    if (iscolor)
    {
        color = 10;
    }
    return color;
}
function getAreaColor(zValue, type) {
    var color = "#ffffff";
    var colorTM = [255, 255, 255, 0];
    var colors = ["#A6F28E", "#007B00", "#3DBCF9", "#0000F9", "#FB3DFA", "#7B0000"];
    var colorsTM = [
        [166, 242, 142, 0.45],
        [0, 123, 0, 0.45],
        [61, 188, 249, 0.45],
        [0, 0, 249, 0.45],
        [251, 61, 250, 0.45],
        [123, 0, 0, 0.45]
    ];
    if (zValue > 0 && zValue <= 10) {
        color = colors[0];
        colorTM = colorsTM[0];
    }
    else if (zValue > 10 && zValue <= 25) {
        color = colors[1];
        colorTM = colorsTM[1];
    }
    else if (zValue > 25 && zValue <= 50) {
        color = colors[2];
        colorTM = colorsTM[2];
    }
    else if (zValue > 50 && zValue <= 100) {
        color = colors[3];
        colorTM = colorsTM[3];
    }
    else if (zValue > 100 && zValue <= 200) {
        color = colors[4];
        colorTM = colorsTM[4];
    }
    else if (zValue > 200) {
        color = colors[5];
        colorTM = colorsTM[5];
    }
    if (type == "fill") {
        return colorTM;
    } else {
        return color;
    }
}
function MapRainfallArea(result) {
    var LayerID = "MapRainfallAreaLayer";
    var countyLayer1 = CreateLayer(LayerID, 1); //创建图层
    if (countyLayer1 != null) {
        countyLayer1.clear();
        // countyLayer1.on("click", riverPoint);
    }
    require(["esri/geometry/Point",
        "esri/graphic",
        "myJs/MapText",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "esri/InfoTemplate",
        "esri/dijit/InfoWindow",
        "esri/layers/GraphicsLayer",
        "esri/geometry/webMercatorUtils", "esri/symbols/TextSymbol", "esri/symbols/Font",
        "dojo/_base/lang",
        "esri/geometry/Polygon",
        "dojo/domReady!"
    ], function (Point, Graphic, MapText, PictureMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol, Color, InfoTemplate, InfoWindow,
        GraphicsLayer, webMercatorUtils, TextSymbol, Font, lang,Polygon) {
        var features = xingzhengArea.features;
        features.forEach(function (feature) {
                        var allrings = feature.geometry.coordinates;
                        var properties = feature.properties;
                        var mc = properties.name;
                        var areaname = mc;
                        var str = "区";
                        if (mc == "浦东新区") {
                            str = "新区";
                        }
                        var strCenter = "黄浦区,长宁区,静安区,普陀区,虹口区,杨浦区";//这几个区域用徐汇区代替
                        if (strCenter.indexOf(mc) > -1) {
                            mc = "徐汇区";
                        }
                        var arr = result.filter(function (item) {
                            return item.stnm + str == mc;
                        });
                        if (arr.length > 0) {
                            var cls = "  waterText";
                            var textStr = "";//arr[0].NAME + ":" +
                            textStr += parseFloat(arr[0].drp).toFixed(1) + "mm";
                            var point = new Point({
                                "x": properties.centroid[0],
                                "y": properties.centroid[1],
                                "spatialReference": {
                                    "wkid": 4326
                                }
                            });
                            //cls += " slText ";
                            var _align = "bottom";
                            if (textStr == "") {
                                textStr = "—";
                            }
                            if (strCenter.indexOf(areaname) == -1) {
                                var label = new MapText(map, point, arr[0], textStr, globallevel, _align, cls, 12);
                                labels.push(label);
                            }
                            var colorStr = getAreaColor(arr[0].drp, "");
                            if (colorStr != null && colorStr != "" && colorStr != undefined) {
                                 var fillColorStr = getAreaColor(arr[0].drp, "fill");

                                allrings.forEach(function (rings) {
                                    var area = new Polygon(rings);
                                    var symbol = new SimpleFillSymbol(
                                        SimpleFillSymbol.STYLE_SOLID,
                                        new SimpleLineSymbol(
                                            SimpleLineSymbol.STYLE_SOLID,
                                            new Color(colorStr),//rgb  边框色
                                            1
                                        ),
                                        new Color(fillColorStr)//rgba  中间填充色
                                    );
                                    var g3 = new Graphic(area, symbol);
                                    g3.attributes = arr[0];
                                    countyLayer1.add(g3);
                                }, this);
                            }

                            var point = new Point({ "x": properties.centroid[0], "y": properties.centroid[1], "spatialReference": { "wkid": 4326 } });
                            var font = new Font("14px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL,
                                Font.WEIGHT_BOLDER);
                            var textSymbol = new TextSymbol(
                                areaname,
                                font,
                                new Color("white")
                            );
                            var labelPointGraphic = new Graphic(point, textSymbol);
                            countyLayer1.add(labelPointGraphic);
                        }
        }, this);
    });
}
//雨量等值面
function MapRainfall(result) {
    var LayerID = "DZMRainLayer";
    var DZMRainLayerGraphicLayer = CreateLayer(LayerID, 101); //创建图层
    if (DZMRainLayerGraphicLayer != null) {
        DZMRainLayerGraphicLayer.setVisibility(true);
        DZMRainLayerGraphicLayer.clear();
        DZMRainLayerGraphicLayer.setOpacity(0.6);
    }
    if (result == null)
        return;
    require(["esri/geometry/Point",
        "esri/graphic",
        "esri/symbols/SimpleLineSymbol",
        "esri/geometry/Polygon",
        "esri/symbols/SimpleFillSymbol",
        "esri/Color",
        "dojo/domReady!"
    ], function (Point, Graphic, SimpleLineSymbol, Polygon, SimpleFillSymbol, Color) {
        var strline = result;
        if (strline.length > 0) {
            for (var k = 0; k < strline.length; k++) {
                var myMapFill1 = strline[k].coordinates;
                var myPolygon = new Polygon(myMapFill1);
                var Filldzm;
                var FilldzmT = 1;//0.6;
                var drplevel = parseInt(strline[k].level);
                if (drplevel == 5) {
                    Filldzm = [166, 242, 142, FilldzmT];
                }
                if (drplevel == 10) {
                    Filldzm = [0, 123, 0, FilldzmT];
                }
                if (drplevel == 25) {
                    Filldzm = [61, 188, 249, FilldzmT];
                }
                if (drplevel == 50) {
                    Filldzm = [0, 0, 249, FilldzmT];
                }
                if (drplevel == 100) {
                    Filldzm = [250, 63, 249, FilldzmT];
                }
                if (drplevel == 250) {
                    Filldzm = [123, 1, 0, FilldzmT];
                }
                var lineSymbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color(Filldzm), //rgb155, 153, 153
                        1
                    ),
                    new Color(Filldzm) //rgba
                );
                var gra = new Graphic(myPolygon, lineSymbol);
                //gra.attr("name","Polygon"+drplevel+","+strFill[2])
                gra.attr("name", "Polygon" + k);
                gra.attr('id', "Polygon" + k);
                var attributes = { id: k, drplevel: drplevel };
                gra.attributes = attributes;
                DZMRainLayerGraphicLayer.add(gra);
            }
        }
    });
}
function MapRainfallSing(myMapFill1,Filldzm) {
    var LayerID = "DZMRainLayer";
    var DZMRainLayerGraphicLayer =map.getLayer(LayerID);
    // console.error('DZMRainLayerGraphicLayer',DZMRainLayerGraphicLayer);
    if (DZMRainLayerGraphicLayer == null) {
        DZMRainLayerGraphicLayer = CreateLayer(LayerID, 101); //创建图层
        DZMRainLayerGraphicLayer.clear();
        DZMRainLayerGraphicLayer.setOpacity(0.6);
    }
    DZMRainLayerGraphicLayer.setVisibility(true);
    require(["esri/geometry/Point",
        "esri/graphic",
        "esri/symbols/SimpleLineSymbol",
        "esri/geometry/Polygon",
        "esri/symbols/SimpleFillSymbol",
        "esri/Color",
        "dojo/domReady!"
    ], function (Point, Graphic, SimpleLineSymbol, Polygon, SimpleFillSymbol, Color) {
                var myPolygon = new Polygon(myMapFill1);
                // var Filldzm;                
                var lineSymbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color(Filldzm), //rgb155, 153, 153
                        1
                    ),
                    new Color(Filldzm) //rgba
                );
                var gra = new Graphic(myPolygon, lineSymbol);
                DZMRainLayerGraphicLayer.add(gra);
    });
}
export {
    addSWMark,
    addYLMark,
    addGQMark,
    addSLMark,
    addYBSWMark,
    addLLMark,
    readJosn,
    addDWMark,
    chageHpjSzhBG,
    addBJLLMark,
    showhideShanghaiArea,
    addSHPolygonSZY,
    addSTLLSWMark,
    addSHAreaPolygonSZY,
    addXunjianPointMark,
    addWQMark,
    addXSLMark,
    queryCompleteSWLL,
    MapRainfallArea,
    MapRainfall,
    MapRainfallSing
}