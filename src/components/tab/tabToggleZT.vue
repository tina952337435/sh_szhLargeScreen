<template>
 <!-- 全屏按钮 -->
  <FullscreenBtn />

 <div class="shdswDiv">
    <div id="tabtf" @click="changeTab('tabtf')" class="swDiv">
      <div class="sel_wrap">
        <label>历史台风</label>
      </div>
    </div>
  </div>
  <div class="shdswDiv">
    <div id="tabcxl" @click="changeTab('tabcxl')" class="swDiv">
      <div class="sel_wrap">
        <label>槽蓄量</label>
      </div>
    </div>
  </div>
  <div class="shdswDiv">
    <div id="tabwq" @click="changeTab('tabwq')" class="swDiv">
      <div class="sel_wrap">
        <label>圩区</label>
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
    tabtf: "/shuzidatingTFZT",
    tabcxl: "/shuzidatingCXL",
    tabwq: "/shuzidatingWQ",
  };
  console.error('routeConfig',routeConfig);
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
onMounted(() => {
});
defineExpose({ tabName });
</script>
<style>
@import url('@/assets/styles/tabCommon.css');
</style>
