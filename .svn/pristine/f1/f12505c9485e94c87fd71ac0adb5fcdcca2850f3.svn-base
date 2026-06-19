<template>
    <div id="mainTabs" class="tabs" activeIndex="0" style="width:100%;height:100%;">
        <div>
            <ul style="margin: 0px;padding: 0px;">
                <li v-for="(item, index) in List" :key="index" class="tab" style="cursor: pointer"
                    :class='index === isActive ? "tab-active" : "tab"' @click="getTab(index, item.title, item.url)">
                    <span class="tab-text">{{ item.title }}</span>
                </li>
            </ul>
        </div>
        <div style="height: clac(100% - 40px);">
            <component :is="currentComponent"> </component>
        </div>
    </div>
</template>
<script setup>
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import WQInformation from "@/components/danzhan/wq/WQInformation.vue";
import WQAreaCapacityNewModePic from "@/components/danzhan/wq/WQAreaCapacityNewModePic.vue";
import { ref, onMounted, defineAsyncComponent, provide, markRaw } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const List = ref({});
const isActive = ref(0);
const currentComponent = ref(null);

const props = defineProps({
    stcd: {
        type: String,
        default: ""
    },
    stnm: {
        type: String,
        default: ""
    },
    wqid: {
        type: String,
        default: ""
    },
    tableData: {
        type: Array,
        default: []
    },
    items: {
        type: Object,
        default: {}
    }
});
onMounted(() => { 
    Weacontent();
});
function Weacontent() {
    var strJson = [{ "title": "圩区信息", "url": "/src/components/danzhan/wq/WQInformation.vue", "showActive": true, "showCloseButton": false }];
    strJson.push({ "title": "圩区预报", "url": "/src/components/danzhan/wq/WQAreaCapacityNewModePic.vue", "showActive": false, "showCloseButton": false })
    strJson.push({ "title": "调度规则", "url": "/src/components/danzhan/wq/WQDiaodu.vue", "showActive": false, "showCloseButton": false })
    strJson.push({ "title": "圩区工程", "url": "/src/components/danzhan/wq/WQGC.vue", "showActive": false, "showCloseButton": false })
    if (props.wqid == "23010515") {
        strJson.push({ "title": "实时工情", "url": "/src/components/danzhan/wq/WQGQ.vue", "showActive": false, "showCloseButton": false })
    }

    List.value = strJson;
    if (strJson.length > 0) {
        for (var num = 0; num < strJson.length; num++) {
            var tab = strJson[num];
            if (tab.showActive == true) {
                getTab(num, tab.title, tab.url);
            }
        }
    }
}

function getTab(index, title, url) {
    isActive.value = index;
    // const customModal = defineAsyncComponent(() =>
    //     import(url)
    // );
    if (url == "/src/components/danzhan/wq/WQInformation.vue") {
        // currentComponent.value = markRaw(WQInformation);
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/wq/WQInformation.vue'),
            // 加载异步组件时使用的组件
            // loadingComponent: LoadingComponent,
            // 展示加载组件前的延迟时间，默认为 200ms
            delay: 200,
            // 加载失败后展示的组件
            // errorComponent: ErrorComponent,
            // 如果提供了一个 timeout 时间限制，并超时了
            // 也会显示这里配置的报错组件，默认值是：Infinity
            timeout: 3000
        })

        currentComponent.value = markRaw(customModal);
    }
    else if (url == "/src/components/danzhan/wq/WQAreaCapacityNewModePic.vue") {
        // currentComponent.value = markRaw(WQAreaCapacityNewModePic);
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/wq/WQAreaCapacityNewModePic.vue'),
            delay: 200,
            timeout: 3000
        })

        currentComponent.value = markRaw(customModal);
    }
    else if (url == "/src/components/danzhan/wq/WQDiaodu.vue") {
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/wq/WQDiaodu.vue'),
            delay: 200,
            timeout: 3000
        })

        currentComponent.value = markRaw(customModal);
    }
    else if (url == "/src/components/danzhan/wq/WQGC.vue") {
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/wq/WQGC.vue'),
            delay: 200,
            timeout: 3000
        })

        currentComponent.value = markRaw(customModal);
    } else if (url == "/src/components/danzhan/wq/WQGQ.vue") {
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/wq/WQGQ.vue'),
            delay: 200,
            timeout: 3000
        })

        currentComponent.value = markRaw(customModal);
    }

    // currentComponent.value = customModal;
}
provide("props", props);
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
     color: #fff;
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
</style>
  