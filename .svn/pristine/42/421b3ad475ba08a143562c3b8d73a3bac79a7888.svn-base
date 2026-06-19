import {toRefs} from "vue";
import {loadModules} from "esri-loader";
import{ElMessage} from 'element-plus' 
// import myDataStore from '@/stores/mapStore.js'
// const globaData = toRefs(myDataStore())

export function readLAYERLayer(list, map) {
    loadModules([
        "esri/layers/FeatureLayer",
    ]).then(([
        FeatureLayer
    ])=>{
        if (list.length > 0) {
            for (let numII = 0; numII < list.length; numII++) {
                var url = "http://116.228.78.60:16080/arcgis/rest/services/kunshanGis20240115/MapServer";
                var layerUrl = url + "/" + list[numII];
                var temMsg = "${*}";
                var layer = new FeatureLayer(layerUrl, {
                    id: "CityTipLayer" + list[numII]
                }); 
                map.addLayer(layer, 1);
            }
            // $.data(BinData, "ToolCount", list.length);
            // globaData.updateData("ToolCount", list.length);
            // globaData.$patch("ToolCount", list.length)
        } 0
        //地图放大、缩小【放大11级之后，清除湖泊、河道图层】
        map.on("zoom-end", function (zoom) {
            for (let num = 0; num < list.length; num++) {
                var gisLayerid = "CityTipLayer" + list[num];
                if (zoom.level > 11) {
                    // 获取 GIS 图层对象
                    var gisLayer = map.getLayer(gisLayerid);
                    if (gisLayer != undefined) {
                        // 删除图层
                        map.removeLayer(gisLayer);
                        // 清除图层绘制
                        map.graphics.clear();
                    }
                } else {
                    // 重新添加图层
                    var url = "http://116.228.78.60:16080/arcgis/rest/services/kunshanGis20240115/MapServer";
                    var layerUrl = url + "/" + list[num];
                    var layer = new FeatureLayer(layerUrl, {
                        id: "CityTipLayer" + list[num]
                    });
                    map.addLayer(layer, 1);
                }
            }
        });
    }).catch((err)=>{
        ElMessage.error("地图创建失败，" + err)
    }) 
}