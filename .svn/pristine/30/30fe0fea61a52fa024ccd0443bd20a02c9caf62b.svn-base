
import { loadModules } from "esri-loader";
import { getCurrentInstance } from 'vue'


export default {
    CreateLayerID: (str, LayerID) => {
        var layer;
        loadModules([
            "esri/layers/GraphicsLayer",
        ]).then(([GraphicsLayer]) => {
            const { appContext } = getCurrentInstance()
            const globalMap = appContext.config.globalProperties.$globalMap
            if (this.$globalMap.getLayer(str)) {
                layer = this.$globalMap.getLayer(str);
            } else {
                layer = this.$globalMap.addLayer(new GraphicsLayer({
                    id: str
                }), LayerID);
            }
        }).catch((err) => {

        })
        return layer;
    }
}