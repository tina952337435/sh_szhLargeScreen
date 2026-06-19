import { RemoveLayer, RemoveLayerAll } from "@/utils/ArcGis/MapComm.js";

function removeAll(viewer) {
    if (SetNull(viewer) == "") {
        viewer = window.map;
    }
    if (SetNull(viewer) != "") {
        RemoveLayerAll(viewer)
    } 
}
function BaseMap(myMap, options) {
  if (SetNull(myMap) == "") {
    myMap = window.map;
  }
  var str = options.type;
  var dtlayers = ["gd_tdt", "vec_w", "img_w", "ter_w", "sz_hcdt", "img_wNote", "vec_wNote", "ter_wNote"];
  for (var i = 0; i < dtlayers.length; i++) {
    var lysStr = dtlayers[i];
    try {
      //临时加
      if ((lysStr).indexOf(str) > -1) {
        myMap.getLayer(lysStr).setVisibility(true);
      }
      else {
        myMap.getLayer(lysStr).setVisibility(false);
      }
      if (lysStr == "sz_hcdt") {
        myMap.getLayer("img_w").setVisibility(true);
        myMap.getLayer("img_wNote").setVisibility(true);
      }
    } catch (ex) { }
  }
}

export { 
    removeAll, 
    BaseMap 
}