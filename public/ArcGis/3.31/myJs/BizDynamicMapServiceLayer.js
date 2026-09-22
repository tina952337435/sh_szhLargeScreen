define([
  "dojo/_base/declare",
  "esri/layers/ArcGISDynamicMapServiceLayer"
], function (declare, ArcGISDynamicMapServiceLayer) {
  return declare([ArcGISDynamicMapServiceLayer], {
    declaredClass: "esri.layers.BizDynamicMapServiceLayer",

    // 说明：
    // 地图运行时的 spatialReference 实际是 4326（被底图图层覆盖），
    // 而业务服务的真实坐标系是 102100（本地投影、上海在原点附近，标成墨卡托）。
    // 若直接用地图的 4326 作为 bboxSR，服务会按“经纬度”误解 bbox，导致叠加错位。
    // 这里强制 bboxSR/imageSR 用 102100，与服务数据坐标系保持一致。
    getImageUrl: function (extent, width, height, callback) {
      var parent = ArcGISDynamicMapServiceLayer.prototype.getImageUrl;
      var saved = extent.spatialReference;
      if (saved && saved.wkid !== 102100) {
        extent.spatialReference = { wkid: 102100 };
        try {
          return parent.call(this, extent, width, height, callback);
        } finally {
          extent.spatialReference = saved;
        }
      }
      return parent.call(this, extent, width, height, callback);
    }
  });
});
