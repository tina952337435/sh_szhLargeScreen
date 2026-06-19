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
import { sortObjectArray, GetJosns,SetNull } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, defineAsyncComponent, provide, markRaw } from "vue";
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
        default: ""
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
    type: {
        type: String,
        default: "",
    },
});
var canshuArr = {
    stcd: props.stcd,
    stnm: props.stnm,
    channels: props.channels
}
     
var strJson=[];
function Weacontent() {
    stcd.value = props.stcd;
    stnm.value = props.stnm;
    stime.value = props.stime;
    etime.value = props.etime;
    flpq.value = props.flpq;
    grq.value = props.grq;
    var strParam={
        stcd:stcd.value
    }
    api.getGLSTCD(strParam).then((res) => {   
        res.data.map(item=>{
            var showActive=false;
            if(SetNull(props.type)!=''){
                if(props.type==item.name){
                    showActive=true;
                }
            }
            strJson.push({ "title": item.name, "url": item.url, "showActive": showActive, "showCloseButton": false });
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
        window.loadingHide();
    });
}
// function getTab(index, title, url) { 
//   isActive.value = index;   
//   // 从映射中获取组件路径，若不存在则使用默认路径
//   const componentPath = strJson[index].url;  
//   // 动态加载组件
//   const customModal = defineAsyncComponent({ 
//     loader: () => import(componentPath), 
//     delay: 200, 
//     timeout: 3000 
//   });   
//   currentComponent.value = markRaw(customModal); 
// }

// 1. 扫描当前文件所在目录下的 components 文件夹
// 假设你的 Vue 文件在 src/views 或 src 下，且 components 是同级或上级目录
// 如果报错找不到，请尝试改成 '../components' 或 '/src/components'
// 修改 glob 路径，使用 /src 开头
const modules = import.meta.glob('/src/components/**/*.vue', { eager: false });

function getTab(index, title, url) { 
  isActive.value = index; 
  
  // 2. 拼接路径
  const componentPath = `/src/components/${strJson[index].url}`;
  
  const loader = modules[componentPath];

  if (loader) {
    const customModal = defineAsyncComponent({ 
      loader: loader, 
      delay: 200, 
      timeout: 3000 
    });   
    currentComponent.value = markRaw(customModal); 
  } else {
    console.error(`❌ 找不到组件: ${componentPath}`);
    console.error('🔍 请检查路径是否匹配，可用的组件列表:', Object.keys(modules));
  }
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
  