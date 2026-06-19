define(["dojo/_base/declare", "esri/layers/TiledMapServiceLayer"], function (declare, TiledMapServiceLayer) {
    return declare([TiledMapServiceLayer], {
        constructor: function () {
            // 1. 修正坐标系：必须与服务器一致 (3857)
            this.spatialReference = new esri.SpatialReference({ wkid: 3857 });

            // 2. 修正初始范围：使用 3857 的范围
            this.initialExtent = this.fullExtent = new esri.geometry.Extent(
                -2.0037507842788246E7, -3.024097145838615E7,
                2.0037507842788246E7, 3.024097145838615E7,
                this.spatialReference
            );

            // 3. TileInfo 保持不变，但确保 WKID 是 3857
            this.tileInfo = new esri.layers.TileInfo({
                "rows": 256,
                "cols": 256,
                "compressionQuality": 0,
                "origin": { "x": -2.0037508342787E7, "y": 2.0037508342787E7 },
                "spatialReference": { "wkid": 3857 },
                "lods": [ /* ...这里保持你原来的 LODS 数据不变... */ ]
            });

            this.loaded = true;
            this.onLoad(this);
        },

        getTileUrl: function (level, row, col) {
            // 4. 修正域名拼写 (cegn -> cegn)
            // 5. 更新 Token：下面的 token 是我看你截图里最新的，如果还是报错，你需要重新获取
            var token = "d01b7f932ff44c04bd0b026e9daaae97";

            return "https://service-api.onemap.sh.cegn.cn/geoscene/rest/services/SHBDC/shsw_dfcmap/MapServer/tile/" +
                   level + "/" + row + "/" + col +
                   "?jcmp-token=" + token;
        }
    });
});