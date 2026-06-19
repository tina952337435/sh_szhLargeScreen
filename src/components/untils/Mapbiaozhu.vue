<template>
    <!-- <div class="biaozhu-layerBZ" id="biaozhu">
        <div class="line"></div>
        <div class="main">
        </div>
    </div> -->
    <div class="biaozhu-layerBZ" id="biaozhu">
        <div class="line"></div>
        <div class="box">
            <img id="Mapclose" :src="popupCloseImg"
                style="position: absolute; right: 0px; top: 0px; width: 18px;z-index: 999;cursor: pointer; margin-top: 5px;margin-right: 5px;" />
            <div class="main">
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import $ from "jquery";
import dayjs from "dayjs";
import api from "@/api/zonglan/index.js";
import { useStore } from "vuex";
import { groupBy, SetNull, sortObjectArray } from "@/api/ComUnit.js";
const store = useStore();
const { viewer } = store.state;
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const popupCloseImg = ref("/images/missWhite.png");

const props = defineProps({
    addType: {
        type: String,
        default: "",
    },
});
onMounted(() => {
    if (_theme == "default") {
        popupCloseImg.value = "/images/missWhite.png"
    } else {
        popupCloseImg.value = "/images/missBlack.png"
    }
    if (props.addType == "addQXJZMark") {
        $(".biaozhu-layerBZ .line").css({ bottom: "0px" });
    }
    close();
});
function close() {
}
</script>
<style lang="scss">
.biaozhu-layerBZ {
    /*重要*/
    display: none;
    user-select: none;
    /*禁止选中*/
    //pointer-events: none;
    /*鼠标穿透*/
    /*重要*/
    position: fixed;
    top: 0;
    left: 0;
    // min-width: 150px;
    max-width: 450px;
    min-height: 250px;
    z-index: 9;
}

.biaozhu-layerBZ .line {
    position: absolute;
    left: 0;
    width: 0;
    height: 100px;
    bottom: 30px;
    background: url("/images/line.png");
    border: 0px;
}

.biaozhu-layerBZ .box {
    position: relative;
    left: 0;
    width: 0;
    height: 100px;
    bottom: 30px;
    border: 0px;
}

.biaozhu-layerBZ .box {
    font-size: 14px;
    position: relative;
    top: 0;
    left: 50px;
    right: 0;
    bottom: 100px;
    background: url("/images/layer_borderShen.png") no-repeat;
    background-size: 100% 100%;
    color: white;
    // padding: 10px 5px 5px 15px;
    height: auto;
    width: auto;
}

.biaozhu-layerBZ .main {
    font-size: 14px;
    display: none;
    position: relative;
    top: 0;
    // left: 50px;
    // right: 0;
    // bottom: 100px;
    // background: url("/images/layer_border.png") no-repeat;
    // background-size: 100% 100%;
    // color: white;
    padding: 10px 5px 5px 15px;
    // height: auto;
    width: auto;
    margin: 8px;
    margin-left: 4px;
}

.biaozhu-layerBZ .light {
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 100%;
}
</style>
  