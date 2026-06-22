<template>
  <!-- 底图图层切换 -->
  <div id="pointMap"
    style="cursor: pointer;margin-left: 30px;width: 40px;  height: 40px; text-align: center; border-radius: 30%; background: rgb(28 177 195 / 40%);margin-top: 5px;"
    @click="reductionSystem" title="全屏">
    <el-icon style="font-size:25px;color:var(--sel_wraplabelcolor);padding-top:13px;"><FullScreen /></el-icon>
  </div>

 <div class="shdswDiv">
    <div id="tabzl" @click="changeTab('tabzl')" class="swDiv">
      <div class="sel_wrap">
        <label>总览</label>
      </div>
    </div>
  </div>
  <div class="shdswDiv">
    <div id="tabsq" @click="changeTab('tabsq')" class="swDiv">
      <div class="sel_wrap">
        <label>水情</label>
      </div>
    </div>
  </div>
  <div class="shdswDiv">
    <div id="tabyq" @click="changeTab('tabyq')" class="swDiv">
      <div class="sel_wrap">
        <label>雨情</label>
      </div>
    </div>
  </div>
  <div class="shdswDiv">
    <div id="tabll" @click="changeTab('tabll')" class="swDiv">
      <div class="sel_wrap">
        <label>流量</label>
      </div>
    </div>
  </div>
  <div class="shdswDiv">
    <div id="tabgq" @click="changeTab('tabgq')" class="swDiv">
      <div class="sel_wrap">
        <label>工情</label>
      </div>
    </div>
  </div>
  <div class="shdswDiv">
    <div id="tabqx" @click="changeTab('tabqx')" class="swDiv">
      <div class="sel_wrap">
        <label>气象</label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, inject, nextTick } from "vue";
import $ from "jquery";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { FullScreen } from "@element-plus/icons-vue";
import { addAreaLineQS } from "@/utils/ArcGis/MapComm.js";

const router = useRouter();
const store = useStore();
const { viewer } = store.state;
let tabName = ref("");
const FullScreen_Type = inject("FullScreen_Type");

// 定义跳转后要执行的方法
function afterRouteLoaded() {
  FullScreen_Type(localStorage.getItem("FullScreenType"));
}
function changeTab(m) {
  if ($("#" + m).hasClass("swDivSelect")) {
    return false;
  }
  $("#swDivMoreUL ul li").css("color", "var(--sel_wraplabelcolor)");
  $("#swDivMoreULSZY ul li").css("color", "var(--sel_wraplabelcolor)");
  $("#swDivMoreULZW ul li").css("color", "var(--sel_wraplabelcolor)");

  $(".swDiv").removeClass("swDivSelect");
  if (m.indexOf("tabszy") > -1 || m.indexOf("tabzw") > -1 || m.indexOf("tabfxyl") > -1) {
    if (m == "tabfxyl") {
      $("#tabMore").addClass("swDivSelect");
      window.open("http://31.16.4.39:8080/SWZZWebYanLian/zttz/RealTyphoon.html?OpenOtherLinks=true", "_blank");
    } else {
      if (m.indexOf("tabszy") > -1) {
        tabName.value = "tabszy";
        $("#tabszy").addClass("swDivSelect");
        $("#swDivMoreULSZY ul #" + m).css("color", "var(--swDivSelectcolor)");
      }
      else if (m.indexOf("tabzw") > -1) {
        tabName.value = "tabzwMore";
        $("#tabzwMore").addClass("swDivSelect");
        $("#swDivMoreULZW ul #" + m).css("color", "var(--swDivSelectcolor)");
      }
      else {
        $("#tabMore").addClass("swDivSelect");
        $("#swDivMoreUL ul #" + m).css("color", "var(--swDivSelectcolor)");
      }
    }
  }
  else {
    tabName.value = m;
    $("#" + m).addClass("swDivSelect");
  }

  const routeConfig = {
    tabzl:"/zonglan",
    tabsq: "/shuzidatingSQ",    
    tabyq: "/shuzidatingYQ",
    tabgq: "/shuzidatingGQ",
    tabll: "/shuzidatingLL",
    tabqx: "/qixiang",
  };

  if (routeConfig[m]) {
    router.push({
      path: routeConfig[m]
    }).then(() => {
      nextTick(() => {
        // 页面跳转完成后，在这里调用你的方法
        afterRouteLoaded();
        $("#swDivMore").attr("src", "/images/Morebottom.png");
        $("#swDivMore").css("transform", " rotate(90deg)");
        $("#swDivMoreUL").hide();
        $("#swDivMoreULSZY").hide();
        $("#swDivMoreULZW").hide();
      }, 500);
    })
  }

}
function changeTabMore() {
  tabName.value = "swDivMore";
  var imgSrc = $("#swDivMore").attr("src");
  if (imgSrc && imgSrc.lastIndexOf("bottom") > -1) {
    $("#swDivMore").attr("src", "/images/Moretop.png");
    $("#swDivMore").css("transform", " rotate(90deg)");
    $("#swDivMoreUL").show();
  }
  else {
    $("#swDivMore").attr("src", "/images/Morebottom.png");
    $("#swDivMore").css("transform", " rotate(90deg)");
    $("#swDivMoreUL").hide();
  }
  return;
}
function changeTabMoreSZY(disType) {
  $("#swDivMoreUL").hide();
  $("#swDivMoreULZW").hide();
  if (disType) {
    $("#swDivMoreULSZY").show();
  }
  else {
    $("#swDivMoreULSZY").hide();
  }
  return;
}
function changeTabMoreZW(disType) {
  $("#swDivMoreUL").hide();
  $("#swDivMoreULSZY").hide();
  if (disType) {
    $("#swDivMoreULZW").show();
  }
  else {
    $("#swDivMoreULZW").hide();
  }
  return;
}
//是否全屏
const FullScreenFalse = ref(false);
function reductionSystem() {
  FullScreenFalse.value = !FullScreenFalse.value;
  // addAreaLineQS();
  localStorage.setItem("FullScreenType", FullScreenFalse.value);
  FullScreen_Type(localStorage.getItem("FullScreenType"));
}
onMounted(() => {
  // @mouseover="changeTabMoreSZY(true)" @mouseout="changeTabMoreSZY(false)"
  // $("#tabszy").on('mouseover', function(params){
  //   changeTabMoreSZY(true);
  // })
  //     // 鼠标移出
  // $("#tabszy").on('mouseout', function(params) {
  //    changeTabMoreSZY(false)
  // })

});
defineExpose({ tabName });
</script>
<style>
.menuTop {
  left: calc(50% - 135px);
  width: 320px;
  /*top: 64rem;*/
  position: absolute;
  bottom: 10px;
}

.menuTop .selected {
  background-color: rgba(0, 163, 255, 0.7);
  background-size: 100% 100%;
}

.menuTop ul li {
  background: url(/images/menuTopSelected.png) no-repeat center;
  background-size: 100% 100%;
  width: 80px;
  height: 32px;
  color: #fff;
  list-style: none;
  float: left;
  margin-right: 10px;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
}

.shdswDiv .swDiv {
  margin: 5px auto;
  width: 80px;
  height: 30px;
  line-height: 30px;
  background: var(--portal);
  border-radius: 6px;
  border: var(--portalborder);
  background-size: 100% 100%;
  color: white;
  font-size: 15px;
  font-weight: bold;
  float: left;
  margin-left: 10px;
  cursor: pointer;
}

.swDivSelect {
  background: var(--swDivSelectcolor) !important;
  color: var(--swDivSelectFontcolor);
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

.sel_wrap {
  height: 25px;
  color: #1cd0d1;
  font-size: 16px;
  font-size: 0.165rem;
  cursor: pointer;
  position: relative;
}

.sel_wrap label {
  width: 100%;
  /* padding-left: 10px; */
  font-size: 14px;
  z-index: 2;
  color: var(--sel_wraplabelcolor);
  line-height: 30px;
  height: 25px;
  display: block;
  text-align: center;
  float: left;
  cursor: pointer;
}

.swDivSelect .sel_wrap label {
  color: var(--sel_wraplabelcolorSel);
}


.el-dropdown-menu {
  /*max-height: 12.75rem !important;*/
  /*overflow-y: auto !important;*/
  background-color: var(--boxtitlebg);
  border: 1px solid #afcfcf;
  list-style: none;
  position: absolute;
  top: 25px;
  z-index: 2005;
  border-radius: 5px;
  display: none;
}

.el-dropdown-menu li {
  line-height: 25px;
  padding: 0 5px;
  font-size: 0.9rem;
  color: var(--qixianglefttitlebglabel);
}

.el-dropdown-menu li:hover {
  color: var(--sel_wraplabelcolorSel) !important;
  background: var(--popupContentTitleColor);
}

#swDivMoreUL,
#swDivMoreULSZY,
#swDivMoreULZW {
  position: relative;
  right: 130px;
  top: -27px;
  border: 2px solid var(--popContentHeadbg);
  padding: 0px 15px;
  width: 120px;
  text-align: center;
  background: var(--portal);
  display: none;
}

#swDivMoreUL ul,
#swDivMoreULSZY ul,
#swDivMoreULZW ul {
  padding: 0;
  margin: 0;
}

#swDivMoreUL ul li,
#swDivMoreULSZY ul li,
#swDivMoreULZW ul li {
  list-style: none;
  text-align: center;
  border-bottom: 1px solid var(--popContentHeadbg);
  line-height: 30px;
  color: var(--sel_wraplabelcolor);
}

#swDivMoreUL ul li:hover {
  color: var(--swDivSelectcolor) !important;
}

#swDivMoreULSZY ul li:hover {
  color: var(--swDivSelectcolor) !important;
}

#swDivMoreULZW ul li:hover {
  color: var(--swDivSelectcolor) !important;
}
</style>
