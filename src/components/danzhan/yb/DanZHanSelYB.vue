<template>
    <div id="mainTabs" class="tabs" activeIndex="0" style="width:100%;height:100%;">
        <div style="width: 98%; margin: 5px auto;">
            <ul style="margin: 0px;padding: 0px;">
                <li v-for="(item, index) in List" :key="index" class="tab" style="cursor: pointer"
                    :class='index === isActive ? "tab-active" : "tab"' @click="getTab(index, item.title, item.url)">
                    <span class="tab-text">{{ item.title }}</span>
                </li>
            </ul>
        </div>
        <div class="componentdiv">
            <component :is="currentComponent" :stcd="stcd" :dd_id="props.dd_id" :stime="stime" :etime="etime"> </component>
        </div>
    </div>
</template>
<script setup>
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray, GetJosns } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, defineAsyncComponent, provide, markRaw } from "vue";
import SQYBLine from "@/components/danzhan/yb/SQYBLine.vue";
import SQYBLineTM from "@/components/danzhan/yb/SQYBLineTM.vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const stime = ref("");
const etime = ref("");
const stcd = ref("");
const stnm = ref("");
const List = ref([]);
const isActive = ref(0);
const currentComponent = ref(null);
const typeValue = ref();
const props = defineProps({
  stcd: {
    type: String,
    default: ""
  },
  dd_id: {
    type: String,
    default: ""
  },
  stime: {
    type: String,
    default: ""
  },
  etime: {
    type: String,
    default: ""
  }
});
function Weacontent() {
    stcd.value = props.stcd;
    stnm.value = props.stnm;
    stime.value = props.stime;
    etime.value = props.etime;
    var strJson = [];
    strJson.push({ "title": "当前方案", "url": "SQYBLine", "showActive": true, "showCloseButton": false });
    strJson.push({ "title": "历史预报", "url": "SQYBLineTM", "showActive": false, "showCloseButton": false });

    if (strJson.length > 0) {
        for (var num = 0; num < strJson.length; num++) {
            var tab = strJson[num];
            if (tab.showActive == true) {
                getTab(num, tab.title, tab.url)
            }
        }
    }
    List.value = strJson;

}
function getTab(index, title, url) {
    isActive.value = index;
    if (url == "SQYBLine") {
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/yb/SQYBLine.vue'),
            delay: 200,
            timeout: 3000
        })

        currentComponent.value = markRaw(customModal);
    }
    else if (url == "SQYBLineTM") {
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/yb/SQYBLineTM.vue'),
            delay: 200,
            timeout: 3000
        })

        currentComponent.value = markRaw(customModal);
    }
}
onMounted(() => {
    if (_theme == "BlueTheme") {
        $(".popContent").css("background", "#031426 !important");
        $(".content").css("background", "#031426e6 !important");
    }
    $(".popContent .content").css("overflow-y", "hidden");
    Weacontent();
});

provide("dd_id", props.dd_id);
provide("stcd", stcd);
provide("stnm", stnm);
provide("stime", stime);
provide("etime", etime);
provide("item", props.item);
</script>
<style scoped> .tabs-bodys {
     background: transparent;
     zoom: 1;
 }

 .tabs-scrollCt {
     border: 0px;
 }

 .tabs-space {
     border: 0px;
 }

 .tab {
     background: var(--menuTop) no-repeat center;
     background-size: 100% 100%;
     color: var(--mtablecolor);
     border: 0px;
     display: inline-block;
     list-style: none;
     margin-right: 10px;
     height: 30px;
     line-height: 33px;

 }

 .tab-active {
     background: var(--menuTopSelected) no-repeat center;
     background-size: 100% 100%;
 }

 .tabs-header {
     background: rgb(3, 23, 31);
 }

 .tab-text {
     font-size: 14px;
     line-height: 16px;
     padding: 6px 10px 6px 10px;
 }

 .componentdiv {
     height: calc(100% - 40px);
     overflow: hidden;
 }

 /* 自定义滚动条样式 */
 .componentdiv::-webkit-scrollbar {
     width: 2px;
     /* 设置滚动条宽度 */
 }

 .componentdiv::-webkit-scrollbar-thumb {
     /* 滚动条手柄 */
     width: 10px;
     height: 10px;
     position: absolute;
     right: -4px;
     top: 0px;
     background: var(--mtabletrcolor);
     z-index: 2;
 }
</style>
