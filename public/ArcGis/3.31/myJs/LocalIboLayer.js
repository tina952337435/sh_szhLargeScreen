define(["dojo/_base/declare", "esri/layers/tiled"], function (declare) {
    return declare(esri.layers.TiledMapServiceLayer, {
        constructor: function (str) {
            this.id = str;
            this.spatialReference = new esri.SpatialReference({ wkid: 4326 });
            this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, new esri.SpatialReference({ wkid: 3857 })));

            this.tileInfo = new esri.layers.TileInfo({
                "rows": 256,
                "cols": 256,
                "compressionQuality": 0,
                "origin": {
                    "x": -2.0037508342787E7,
                    "y": 2.0037508342787E7
                },
                "spatialReference": {
                    "wkid": 3857
                },
                "lods": [
                    { "level": 0, "resolution": 156543.03392800014, "scale": 5.91657527591555E8 },
                    { "level": 1, "resolution": 78271.51696399994, "scale": 2.95828763795777E8 },
                    { "level": 2, "resolution": 39135.75848200009, "scale": 1.47914381897889E8 },
                    { "level": 3, "resolution": 19567.87924099992, "scale": 7.3957190948944E7 },
                    { "level": 4, "resolution": 9783.93962049996, "scale": 3.6978595474472E7 },
                    { "level": 5, "resolution": 4891.96981024998, "scale": 1.8489297737236E7 },
                    { "level": 6, "resolution": 2445.98490512499, "scale": 9244648.868618 },
                    { "level": 7, "resolution": 1222.992452562495, "scale": 4622324.434309 },
                    { "level": 8, "resolution": 611.4962262813797, "scale": 2311162.217155 },
                    { "level": 9, "resolution": 305.74811314055756, "scale": 1155581.108577 },
                    { "level": 10, "resolution": 152.87405657041106, "scale": 577790.554289 },
                    { "level": 11, "resolution": 76.43702828507324, "scale": 288895.277144 },
                    { "level": 12, "resolution": 38.21851414253662, "scale": 144447.638572 },
                    { "level": 13, "resolution": 19.10925707126831, "scale": 72223.819286 },
                    { "level": 14, "resolution": 9.554628535634155, "scale": 36111.909643 },
                    { "level": 15, "resolution": 4.77731426794937, "scale": 18055.954822 },
                    { "level": 16, "resolution": 2.388657133974685, "scale": 9027.977411 },
                    { "level": 17, "resolution": 1.1943285668550503, "scale": 4513.988705 },
                    { "level": 18, "resolution": 0.5971642835598172, "scale": 2256.994353 }
                ]
            });

            this.loaded = true;
            this.onLoad(this);
        },

        _logCount: 0,
        getTileUrl: function (level, row, col) {
            // 使用与 LocalImgLayer 相同的全局可调偏移参数
            var baseCol = window._TILE_DCOL !== undefined ? window._TILE_DCOL : 345;
            var baseRow = window._TILE_DROW !== undefined ? window._TILE_DROW : -93;
            var dcol = Math.round(baseCol * Math.pow(2, level - 10));
            var drow = Math.round(baseRow * Math.pow(2, level - 10));
            var stdCol = col + dcol;
            var stdRow = row + drow;

            var layerUrl = "http://10.91.7.102:8093/tdt_tile/ibo_w/" + level + "/" + stdRow + "/" + stdCol + ".png?jcmp-token=d01b7f932ff44c04bd0b026e9daaae97&_v=" + (window._TILE_VER || 0);
            if (this._logCount < 5) {
                this._logCount++;
                console.log("LocalIboLayer[" + this._logCount + "]: z=" + level + " API(" + row + "," + col + ") → fix(" + stdRow + "," + stdCol + ")");
            }
            return layerUrl;
        }
    });
});