import './assets/main.css'
import '@/assets/styles/tooltip.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入 Element-Plus 依赖
import ElementPlus from 'element-plus'
// 引入全局 CSS 样式
import 'element-plus/dist/index.css'
// 统一导入el-icon图标
// import * as ElIconModules from '@element-plus/icons'
// import * as ElIconModules from '@element-plus/icons-vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 引入全局字体样式
import '@/assets/styles/fonts.css';
// arcgis CSS 改为在 App.vue 的 initMapArcGis 中按需加载
import store from "./stores/store.js";
import App from './App.vue'
import router from './router'
import Particles from "vue3-particles"


 import { loadScript, loadCss } from 'esri-loader' 

loadCss("/ArcGis/3.31/esri/css/esri.css");  

loadScript({
  dojoConfig: {
    //用于定义dojo核心示范异步加载,true：异步，false：同步
    async: true,
    //如果为true则立即加载deps数组中所有的依赖JS，如果为false则忽略deps数组
    parseOnLoad: false,
    tlmSiblingOfDojo: false,
    has: {
      'extend-esri': 1
    },
    packages: [{
        name: "myJs", 
        location: "/ArcGis/myJs/Class"
    }]
  },
  url: '/ArcGis/3.31/init.js'
}); 

// import MapGisZonglan from "@/components/mapage/MapGis/zonglan.vue";
const app = createApp(App)

for (let i in ElementPlusIconsVue) {
  app.component(i, ElementPlusIconsVue[i])
}

// 动态加载 MiniUI 的 CSS 文件
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/miniui/themes/default/miniui.css';
document.head.appendChild(link); 
// 统一注册el-icon图标
// for(let iconName in ElIconModules){
//     app.component(iconName,ElIconModules[iconName])
//   }
//   Object.keys(ElIconModules).forEach(function (key) {
//     app.component(ElIconModules[key].name, ElIconModules[key])
//   })
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
//   }

app.use(createPinia())
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(store);
// app.use(store, key)
app.use(router);
app.use(Particles);
app.config.globalProperties.$globalMap = null
app.mount('#app')

// 要加载的 JavaScript 文件列表（在挂载后异步加载，不阻塞首屏渲染）
const scriptUrls = [
  '/miniui/jquery-3.7.1.min.js',
  '/miniui/miniui.js'
];
// 递归加载脚本的函数
function loadScripts(index) {
  if (index >= scriptUrls.length) {
    // 所有脚本加载完成
    return;
  }

  const script = document.createElement('script');
  script.src = scriptUrls[index];
  script.onload = () => {
    // 当前脚本加载完成，继续加载下一个
    loadScripts(index + 1);
  };
  script.onerror = () => {
    console.error(`Failed to load script: ${scriptUrls[index]}`);
  };
  document.body.appendChild(script);
}

// 开始加载（不阻塞 Vue 应用）
loadScripts(0);



