define(["dojo/_base/declare", "esri/layers/tiled"], function (declare) {
    return declare(esri.layers.TiledMapServiceLayer, {
        _layerId: "img_w",
        constructor: function (id, type) {
            this.id = id;
            this.spatialReference = new esri.SpatialReference({ wkid: 3857 });
            this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892, this.spatialReference));

            if (type == "ImageBaseMap")//获取影像地图（底图）
            {
                this._layerId = "img_w";
            }
            else if (type == "ImageCNNote")//获取影像地图（中文注记）
            {
                this._layerId = "cia_w";
            }
            else if (type == "ImageENNote")//获取影像地图（英文注记）
            {
                this._layerId = "eia_w";
            }
            else if (type == "TerrainBaseMap")//获取地形图（底图）
            {
                this._layerId = "ter_w";
            }
            else if (type == "TerrainCNNote")//获取地形图（中文注记）
            {
                this._layerId = "cta_w";
            }
            else if (type == "TerrainENNote")//获取地形图（英文注记）
            {
                //暂无
            }
            else if (type == "VectorBaseMap")//获取矢量图（底图）
            {
                this._layerId = "vec_w";
            }
            else if (type == "VectorCNNote")//获取矢量图（中文注记）
            {
                this._layerId = "cva_w";
            }
            else if (type == "VectorENNote")//获取矢量图（英文注记）
            {
                this._layerId = "eva_w";
            }
            this.tileInfo = new esri.layers.TileInfo({
				"dpi": 90.71428571427429,
                "rows": 256,
                "cols": 256,
                "compressionQuality": 0,
                "origin": {
					//经纬度
                    // "x": -20037508.3427892 + 259717,
                    // "y": 20037508.3427892 - 126784
					
                    // "x": -20037508.3427892 + 258717,
                    // "y": 20037508.3427892 - 126184
					//墨卡托
					
					"x": -20037508.342787-90,
					"y": 20037508.342787-10
                },
                "spatialReference": {
                    "wkid": 102100
                },
                "lods": [
               { level: 1, resolution: 78271.51696402048, scale: 2.958293554545656e8 },
                          { level: 2, resolution: 39135.75848201024, scale: 1.479146777272828e8 },
                          { level: 3, resolution: 19567.87924100512, scale: 7.39573388636414e7 },
                          { level: 4, resolution: 9783.93962050256, scale: 3.69786694318207e7 },
                          { level: 5, resolution: 4891.96981025128, scale: 1.848933471591035e7 },
                          { level: 6, resolution: 2445.98490512564, scale: 9244667.357955175 },
                          { level: 7, resolution: 1222.99245256282, scale: 4622333.678977588 },
                          { level: 8, resolution: 611.49622628141, scale: 2311166.839488794 },
                          { level: 9, resolution: 305.748113140705, scale: 1155583.419744397 },
                          { level: 10, resolution: 152.8740565703525, scale: 577791.7098721985 },
                          { level: 11, resolution: 76.43702828517625, scale: 288895.85493609926 },
                          { level: 12, resolution: 38.21851414258813, scale: 144447.92746804963 },
                          { level: 13, resolution: 19.109257071294063, scale: 72223.96373402482 },
                          { level: 14, resolution: 9.554628535647032, scale: 36111.98186701241 },
                          { level: 15, resolution: 4.777314267823516, scale: 18055.990933506204 },
                          { level: 16, resolution: 2.388657133911758, scale: 9027.995466753102 },
                          { level: 17, resolution: 1.194328566955879, scale: 4513.997733376551 },
                          { level: 18, resolution: 0.5971642834779395, scale: 2256.998866688275 }
            ]
            });

            this.loaded = true;
            this.onLoad(this);
        },
        getTileUrl: function (level, row, col) {
            var urlRequest = "https://t0.tianditu.gov.cn/DataServer?T=" + this._layerId + "&x=" + col + "&y=" + row + "&l=" + level +"&tk=cdfddb6dd546957382d0ea51a65acf19";
            return urlRequest;
        }
    });
});