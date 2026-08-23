<template>
  <!-- 全屏按钮 -->
  <FullscreenBtn />

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
  <div class="shdswDiv">
    <div id="tabvideo" @click="changeTab('tabvideo')" class="swDiv">
      <div class="sel_wrap">
        <label>视频</label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, inject, nextTick } from "vue";
import $ from "jquery";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { addAreaLineQS } from "@/utils/ArcGis/MapComm.js";
import FullscreenBtn from "@/components/untils/FullscreenBtn.vue";

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
    tabvideo: "/videoMonitor",
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
@import url('@/assets/styles/tabCommon.css');
</style>
