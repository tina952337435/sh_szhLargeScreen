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
            <component :is="currentComponent"> </component>
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
import H5Player from "@/components/danzhan/video/H5Player.vue";
import danzhanGQVIEW from "@/components/danzhan/gq/danzhanGQVIEW.vue";
import danzhanGQJC from "@/components/danzhan/gq/danzhanGQJC.vue";
import GQVIEW from "@/components/danzhan/gq/GQVIEW.vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const stime = ref("");
const etime = ref("");
const stcd = ref("");
const stnm = ref("");
const stcdzm = ref("");
const stcdbz = ref("");
const flpq = ref("");
const grq = ref("");
const List = ref({});
const isActive = ref(0);
const currentComponent = ref(null);
const typeValue = ref();
const props = defineProps({
    stcd: {
        type: String,
        default: "",
    },
    stnm: {
        type: String,
        default: "",
    },
    stcdzm: {
        type: String,
        default: "",
    },
    stcdbz: {
        type: String,
        default: "",
    },
    stime: {
        type: String,
        default: "",
    },
    etime: {
        type: String,
        default: "",
    },
    flpq: {
        type: String,
        default: "",
    },
    grq: {
        type: String,
        default: "",
    },
    channels: {
        type: String,
        default: "",
    },
});
var canshuArr = {
    stcd: props.stcd,
    stnm: props.stnm,
    channels: props.channels
}
function Weacontent() {
    stcd.value = props.stcd;
    stnm.value = props.stnm;
    stime.value = props.stime;
    etime.value = props.etime;
    flpq.value = props.flpq;
    grq.value = props.grq;
    var strJson = [{ "title": "工程运行情况", "url": "danzhanGQVIEW", "showActive": true, "showCloseButton": false }];
    // strJson.push({ "title": "基础信息", "url": "GQVIEW", "showActive": false, "showCloseButton": false })

    strJson.push({ "title": "工情监测", "url": "danzhanGQJC", "showActive": false, "showCloseButton": false });
    strJson.push({ "title": "基础信息", "url": "GQVIEW", "showActive": false, "showCloseButton": false });
    strJson.push({ "title": "调度指令", "url": "DIAODUVIEW", "showActive": false, "showCloseButton": false });

    if (props.stcdbz != "") {
        stcdbz.value = props.stcdbz;
        // strJson.push({ "title": "泵站基础信息", "url": "bzGQVIEW", "showActive": false, "showCloseButton": false })
    }
    if (props.stcdzm != "") {
        stcdzm.value = props.stcdzm;
        // strJson.push({ "title": "闸站基础信息", "url": "@/components/danzhan/gq/zmGQVIEW.vue", "showActive": false, "showCloseButton": false })
        // strJson.push({ "title": "闸站基础信息", "url": "zmGQVIEW", "showActive": false, "showCloseButton": false })
    }

    var params = {
        stcd: props.stcd
    };
    GetJosns("/Mapi/ST_GATEVIDEO_B/queryGateVideList", params, "", false, function (evt) {
        var result = evt.result;
        if (result.length > 0) {
            canshuArr.channels = result[0].channels;
            strJson.push({ "title": "视频", "url": "H5GCPlayer", "showActive": false, "showCloseButton": false })
        }
    });
    List.value = strJson;
    if (strJson.length > 0) {
        for (var num = 0; num < strJson.length; num++) {
            var tab = strJson[num];
            if (tab.showActive == true) {
                getTab(num, tab.title, tab.url)
            }
        }
    }


    var strParam = {};
    var nowTM = new Date();
    strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD 00:00:00")).add(-2, "month").format("YYYY-MM-DD 00:00:00");
    strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD 23:59:59");
    api.DDU_DIAODU(strParam).then(res => {
        var strJson = res.result.data;
        if (strJson.length > 0) {
            var Diaodu = strJson.filter(function (e) {
                return e.flag == "5";
            });
            if (Diaodu.length > 0) {
                typeValue.value = "/UploadDoc" + Diaodu[0].wordname;
                // console.error(typeValue.value)
            }
        }
    }).catch(err => { });
}
function getTab(index, title, url) {
    isActive.value = index;
    var myUrilCustom = './components/danzhan/gq/' + url + '.vue';
    if (url == "H5Player") {
        myUrilCustom = './components/danzhan/video/H5Player.vue';
    }
    // const customModal = defineAsyncComponent(() =>
    //     import(myUrilCustom)
    // );
    // const customModal = defineAsyncComponent({
    //     loader: () => import(myUrilCustom),
    //     delay: 200,
    //     timeout: 3000
    // }) 
    // const customModal = markRaw(danzhanGQVIEW);
    if (url == "H5Player") {
        // currentComponent.value = markRaw(H5Player);
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/video/H5Player.vue'),
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
    else if (url == "danzhanGQVIEW") {
        // const customModal = defineAsyncComponent(() => import(myUrilCustom));
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/gq/danzhanGQVIEW.vue'),
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
    else if (url == "danzhanGQJC") {
        // currentComponent.value=markRaw(danzhanGQJC);
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/gq/danzhanGQJC.vue'),
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
    else if (url == "GQVIEW") {
        // currentComponent.value=markRaw(GQVIEW);
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/danzhan/gq/GQVIEW.vue'),
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
    else if (url == "DIAODUVIEW") {
        const customModal = defineAsyncComponent({
            // 加载函数
            loader: () => import('@/components/top/pdf.vue'),
            delay: 200,
            timeout: 3000
        })

        currentComponent.value = markRaw(customModal);
    }
    else if (url == "H5GCPlayer") {
        
    }
    // currentComponent.value = customModal;
}
onMounted(() => {
    if (_theme == "BlueTheme") {
        $(".popContent").css("background", "#031426 !important");
        $(".content").css("background", "#031426e6 !important");
    }
    Weacontent();
});


provide("stcd", stcd);
provide("stnm", stnm);
provide("stcdzm", stcdzm);
provide("stcdbz", stcdbz);
provide("stime", stime);
provide("etime", etime);
provide("flpq", flpq);
provide("grq", grq);
provide("props", canshuArr);
provide("props", canshuArr);
provide("typeValuePDF", typeValue)
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
  