import { SetNull } from "@/api/ComUnit.js";

var layers = new Array();
var labels = new Array();
var map = window.myMap;
var globallevel = 7;//全局级别
var globalalign = "center";//全局级别

function setZOOM(objNum) {
    if (SetNull(map) == "") {
        map = window.myMap;
    }
    if (SetNull(map) != "") {
        // console.error('setZOOM',setZoom);
        map.setZoom(Number(objNum));
    }
}
function dyCenter(lgtd, lttd) {
    if (SetNull(map) != "") {
        require(["myJs/DyCenter", "dojo/domReady!"], function (DyCenter) {
            var dy = new DyCenter(map, lgtd, lttd);
            // setTimeout(function () {
            //     ViewPimgage();
            // }, 500);
        });
    }
}
function CreateLayer(str) {
    var layer;
    if (SetNull(map) == "") {
        map = window.myMap;
    }
    if (SetNull(map) != "") {
        if (map.getLayer(str)) {
            layer = map.getLayer(str);
            // console.error(str+"图层已经存在");
            // 正确清除图层内容的方式
            layer.graphics = [];  // 强制清空图形数组
            map.removeLayer(layer);  // 如需完全移除图层
        }
        layer = map.addLayer(new esri.layers.GraphicsLayer({ id: str }));
        layers.push(layer);
    }
    return layer;
}

function CreateImageLayer(str) {
    var layer;
    if (SetNull(map) == "") {
        map = window.myMap;
    }
    if (map.getLayer(str)) {
        layer = map.getLayer(str);
    }
    else {
        layer = map.addLayer(new esri.layers.MapImageLayer({ id: str }));
    }
    layers.push(layer);
    return layer;
}
//清理现有图层
function destroy() {
    // console.error('layers长度',layers);
    for (var j = 0; j < layers.length; j++) {
        try {
            layers[j].clear();
            // 正确清除图层内容的方式
            //layers[j].graphics = [];  // 强制清空图形数组
            // map.removeLayer(layers[j]);  // 如需完全移除图层
            //layers.remov(layers[j]);
            // console.error('clearclearclearclearclearclearclearclear',layers[j]);
        } catch (ex) {
        }
    }
    if ("undefined" != typeof labels && labels != null) {
        for (var i = 0; i < labels.length; i++) {
            try {
                labels[i].clear();
            } catch (ex) { }
        }
    }
    labels = new Array();

    // if (this.destroy != null) {
    //     if (typeof (destroy) == "function") {
    //         destroy();
    //     }
    // }
    if (info != null) {
        info.clear();
    }
}

/***设置图层的飞行提示***/
var info;
function setLayerToolTip(layer, title, field, fieldName) {
    require(["esri/layers/GraphicsLayer"], function (GraphicsLayer) {
        dojo.connect(layer, "onMouseOver", function (evt) {
            if (evt.graphic.attributes != undefined) {
                openinfo(evt, evt.graphic.attributes[title] == undefined ? "" : evt.graphic.attributes[title], field, fieldName);
            }
        });

        dojo.connect(layer, "onMouseOut", function (evt) {
            closeinfo();
        });
    });
}
function openinfo(evt, title, field, fieldname) {
    evt.currentTarget.style.cursor = "pointer";
    require(["myJs/ToolTip"], function (ToolTip) {
        if (info != null) {
            info.clear();
        }
        info = new ToolTip(map, evt.graphic, evt.screenPoint, title, field, fieldname);
    });

}
function closeinfo() {
    if (info != null) {
        info.clear();
    }
}
/***设置图层的飞行提示***/
var myImgLayer = true;
var myMapImg = null;
function ViewPimgage() {
    if (myImgLayer == true) {
        require([
            "esri/layers/MapImage",
        ], function (MapImage) {

            myMapImg = CreateImageLayer("myMapImg");

            var strID = UUID(8, 16);
            var strImg = "/images/bigBJNew.png?times=" + strID;
            var strImage = new MapImage({
                'extent': map.extent,
                'href': strImg
            });
            myMapImg.addImage(strImage);
            $("#cesiumContainer_myMapImg img").each(function () {
                var _strImg = $(this).attr("src");
                // console.error("old_strImg", _strImg);
                if (_strImg != strImg) {
                    $(this).remove();
                }
            })
            myMapImg.setVisibility(true);
            myMapImg.refresh();
            let center = map.extent.getCenter();
            map.resize(true);
            map.reposition();
            map.centerAt(center);
        });
        setTimeout(() => {
            $("#cesiumContainer_myMapImg img").not(":last").css("display", "none");
        }, 100);
        setTimeout(() => {
            $("#cesiumContainer_myMapImg img").not(":last").css("display", "none");
        }, 1000);
    }

}
//默认视角：type（上海市、苏州河）
function addAreaLineQS(lgtd,lttd,mapLevel,type="上海市") {
    if (SetNull(type) == "") {
        type='上海市';
    }
    if(type=="上海市"){
        if (SetNull(lgtd) == "") {
            lgtd=3747.490803126537;
        }
        if (SetNull(lttd) == "") {
            lttd=7980.5747690055;
        }
        if (SetNull(mapLevel) == "") {
            mapLevel=10;
        }
    }
    else if(type=="苏州河"){
        if (SetNull(lgtd) == "") {
            lgtd=-17097.79693518956;
        }
        if (SetNull(lttd) == "") {
            lttd=4463.8739384186265;
        }
        if (SetNull(mapLevel) == "") {
            mapLevel=11;
        }
    }

    setZOOM(mapLevel);
    setTimeout(() => {
        dyCenter(lgtd, lttd);
    }, 200);
}

function removeEntityByName(listEntiy) {
    if (listEntiy == null && listEntiy == undefined) {
        destroy();
        var myMapImageLayer = CreateImageLayer("MapImageLayer");
        if (myMapImageLayer != null) {
            myMapImageLayer.setVisibility(false);
        }
    }
    else {
        var listEntiyArr = listEntiy.split(',');
        listEntiyArr.map(u => {
            var layer = map.getLayer(u);
            if (layer != null) {
                layer.clear();
            }
        });
    }
}
//* 墨卡托转经纬度 object 传入：{merX:xxxx,merY:xxxx}
function convertMercatorToWGS84(object) {
    var merX = object.merX;
    var merY = object.merY;
    var con = merX / 20037508.34 * 180;
    var lat = merY / 20037508.34 * 180;
    lat = 180 / Math.PI
        * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
    return {
        x: con,
        y: lat
    }
}
// 【必须添加】用于在外部重建地图后更新内部引用的函数
function refreshMapInstance(newMap) {
    map = newMap;
    window.myMap = newMap;
    console.log("MapComm: 全局地图实例已刷新，新 WKID:", newMap.spatialReference.wkid);
}
function RemoveLayer(str) {
    if (SetNull(map) == "") {
        map = window.myMap;
    }
    if (myMap.getLayer(str)) {
        var layer = myMap.getLayer(str);
        layer.clear();
    }
}
function RemoveLayerAll(myMap) {
    if (SetNull(myMap) == "") {
        myMap = window.map;
    }
    myMap.graphicsLayerIds.forEach(item => {
        var layer = myMap.getLayer(item);
        layer.clear();
    })
    var LDRaderPhotoLayerID = myMap.getLayer("LDRaderPhoto");
    if (SetNull(LDRaderPhotoLayerID) != "") {
        if (LDRaderPhotoLayerID._mapImages.length > 0) {
            LDRaderPhotoLayerID._mapImages.forEach(function (item) {
                LDRaderPhotoLayerID.removeImage(item);
            })
        }
    }
    var krigingDZMID = myMap.getLayer("krigingDZM");
    if (SetNull(krigingDZMID) != "") {
        if (krigingDZMID._mapImages.length > 0) {
            krigingDZMID._mapImages.forEach(function (item) {
                krigingDZMID.removeImage(item);
            })
        }
    }
}

//地图放大缩小调用事件**************************************************************
function mapZoomEnd(myLayer, mapLevel, stType, field, switchChecked) {
    if (mapLevel == null || mapLevel == undefined) {
        mapLevel = globallevel; //无特殊指定
    }
    if (SetNull(map) == "") {
        map = window.map;
    }
    map.on("zoom-end", function (zoom) {
        mapLevel = zoom.level;
        setMapZoom(myLayer, mapLevel, stType, field, switchChecked);
        // console.error("===================================", mapLevel)
    });
}

function setMapZoom(myLayer, mapLevel, stType, field, switchChecked) {
    for (var num = 0; num < myLayer.graphics.length; num++) {
        var item = myLayer.graphics[num];
        if (item.attributes != undefined) {
            var MAPSIZE = item.attributes.mapsize;
            // console.error(item.attributes.stnm, 'mapLevel=' + mapLevel, 'MAPSIZE=' + MAPSIZE, stType, item)
            if (MAPSIZE != undefined) {
                // MAPSIZE =parseInt(MAPSIZE) + 1;
                // console.error(item.attributes.stnm, stType + item.attributes[field])
                if (mapLevel < globallevel) {
                    addClassParam(stType + item.attributes[field], "none");
                } else if (globallevel == MAPSIZE) { //当站点层级等于默认地图层级时，一直要显示
                    //11级以下，隐藏 lable信息
                    if (switchChecked == true) {
                        removeClassParam(stType + item.attributes[field], "none");
                    } else {
                        addClassParam(stType + item.attributes[field], "none");
                    }
                } else {                    
                    // console.error(item.attributes.stnm, 'mapLevel=' + mapLevel, 'MAPSIZE=' + MAPSIZE, stType, item)
                    if (mapLevel >= MAPSIZE) {
                        item.show();
                        if (switchChecked == true) {
                            removeClassParam(stType + item.attributes[field], "none");
                        } else {
                            addClassParam(stType + item.attributes[field], "none");
                        }
                    } else {
                        item.hide();
                        addClassParam(stType + item.attributes[field], "none");
                    }
                }
            } else {
                if (mapLevel < globallevel) {
                    addClassParam(stType + item.attributes[field], "none");
                } else {
                    if (mapLevel > globallevel) {
                        if ($("#riverMarker").hasClass("checked") == true) {
                            removeClassParam(stType + item.attributes[field], "none");
                        } else {
                            addClassParam(stType + item.attributes[field], "none");
                        }
                    } else if (mapLevel == globallevel) {
                        if ($("#riverMarker").hasClass("checked") == true) {
                            removeClassParam(stType + item.attributes[field], "none");
                        } else {
                            addClassParam(stType + item.attributes[field], "none");
                        }
                    } else {
                        addClassParam(stType + item.attributes[field], "none");
                    }
                }
            }

        }
    }
}

function removeClassParam(objID, objClass) {
    // console.error('removeClassParam',objID, objClass)
    $("#" + objID).removeClass(objClass);
    $("#" + objID + "Arrow").removeClass(objClass);
}

function addClassParam(objID, objClass) {
    // console.error('addClassParam',objID, objClass)
    $("#" + objID).addClass(objClass);
    $("#" + objID + "Arrow").addClass(objClass);
}

//地图放大缩小调用事件**************************************************************
export {
    setZOOM,
    dyCenter,
    CreateLayer,
    CreateImageLayer,
    setLayerToolTip,
    destroy,
    globallevel,
    globalalign,
    map,
    layers,
    labels,
    ViewPimgage,
    addAreaLineQS,
    removeEntityByName,
    convertMercatorToWGS84,
    refreshMapInstance,
    RemoveLayer,
    mapZoomEnd,
    setMapZoom,
    RemoveLayerAll
}
