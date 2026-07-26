<template>
  <!-- 底图图层切换 -->
  <div id="pointMap"
    style="cursor: pointer;margin-left: 30px;width: 40px;  height: 40px; text-align: center; border-radius: 30%; background: rgb(28 177 195 / 40%);margin-top: 5px;"
    @click="reductionSystem">
    <!-- <img style="width: 20px;padding-top: 10px;" src="/images/globe.png" alt="全视角" /> -->
    <!-- <img style="width: 30px;padding-top: 8px;" src="/images/suzhoumapSmall.png" alt="全视角" /> -->
    <el-icon><MapLocation /></el-icon>
  </div>
  <!-- <div class="shdswDiv">
    <div id="tabzl" @click="changeTab('tabzl')" class="swDiv">
      <div class="sel_wrap">
        <label>总览</label>
      </div>
    </div>
  </div> -->
  <div class="shdswDiv">
    <div id="tabsq" @click="changeTab('tabsq')" class="swDiv">
      <div class="sel_wrap">
        <label>门户</label>
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
    <div id="tabsq" @click="changeTab('tabsq')" class="swDiv">
      <div class="sel_wrap">
        <label>水情</label>
      </div>
    </div>
  </div>
  <!-- <div class="shdswDiv">
    <div id="tabszy" class="swDiv">
      <div class="sel_wrap"  @click="changeTabMoreSZY(true)">
        <label>水资源</label>
      </div>

      <div id="swDivMoreULSZY" style="width: 155px;right: 165px;">
        <ul>
          <li id="tabszypingjia" @click="changeTab('tabszypingjia')">水资源评价</li>
          <li id="tabszystllsw" @click="changeTab('tabszystllsw')">生态流量（水位）</li>
        </ul>
      </div>
    </div>
  </div> -->
  <!-- <div class="shdswDiv">
    <div id="tabshj" @click="changeTab('tabshj')" class="swDiv">
      <div class="sel_wrap">
        <label>水环境</label>
      </div>
    </div>
  </div> -->
  <!-- <div class="shdswDiv">
    <div id="tabzwMore" class="swDiv">
      <div class="sel_wrap" @click="changeTabMoreZW(true)">
        <label>站网</label>
      </div>
      <div id="swDivMoreULZW" style="width: 155px;right: 165px;">
        <ul>
          <li id="tabzwbase" @click="changeTab('tabzwbase')">站网概况</li>
          <li id="tabzwxunjian" @click="changeTab('tabzwxunjian')">运维管理</li>
          <li id="tabzwzhyw" @click="changeTab('tabzwzhyw')">智慧运维</li>
        </ul>
      </div>
    </div>
  </div> -->
  <div class="shdswDiv">
    <div id="tabgq" @click="changeTab('tabgq')" class="swDiv">
      <div class="sel_wrap">
        <label>工情</label>
      </div>
    </div>
  </div>
  <!-- <div class="shdswDiv">
    <div id="tabsl" @click="changeTab('tabsl')" class="swDiv">
      <div class="sel_wrap">
        <label>水量</label>
      </div>
    </div>
  </div> -->
  <div class="shdswDiv">
    <div id="tabqx" @click="changeTab('tabqx')" class="swDiv">
      <div class="sel_wrap">
        <label>气象</label>
      </div>
    </div>
  </div>
  <div class="shdswDiv">
    <div id="tabTyphoon" @click="changeTab('tabTyphoon')" class="swDiv">
      <div class="sel_wrap">
        <label>台风</label>
      </div>
    </div>
  </div>

  <div class="shdswDiv">
    <div id="tabyubao" @click="changeTab('tabyubao')" class="swDiv">
      <div class="sel_wrap">
        <label>预报</label>
      </div>
    </div>
  </div>

  <div class="shdswDiv">
    <div id="tabyujing" @click="changeTab('tabyujing')" class="swDiv">
      <div class="sel_wrap">
        <label>预警</label>
      </div>
    </div>
  </div>

  <div class="shdswDiv">
    <div id="tabyuyan" @click="changeTab('tabyuyan')" class="swDiv">
      <div class="sel_wrap">
        <label>预演</label>
      </div>
    </div>
  </div>

  <div class="shdswDiv">
    <div id="tabpinggu" @click="changeTab('tabpinggu')" class="swDiv">
      <div class="sel_wrap">
        <label>评估</label>
      </div>
    </div>
  </div>
  <div class="shdswDiv shdswDivMore">
    <div id="tabMore" @click="changeTabMore('tabMore')" class="swDiv">
      <div class="sel_wrap">
        <label style="margin-left:0px;">
          <img id="swDivMore" src="/images/Morebottom.png"
            style="width:15px;height:15px;vertical-align: -2px;transform: rotate(90deg);" alt="更多" title="更多">
        </label>
      </div>
      <div id="swDivMoreUL">
        <ul>
          <li id="tabfxyl" @click="changeTab('tabfxyl')">防汛演练</li>
        </ul>
      </div>
    </div>
  </div>
</template> 
<script setup>
import { onMounted, ref, inject, nextTick } from "vue";
import $ from "jquery";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { MapLocation } from "@element-plus/icons-vue";

import { addAreaLineQS} from "@/utils/ArcGis/MapComm.js";

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
  if (m.indexOf("tabszy")>-1||m.indexOf("tabzw")>-1||m.indexOf("tabfxyl")>-1) {
    if(m=="tabfxyl"){
      $("#tabMore").addClass("swDivSelect");
      window.open("http://31.16.4.39:8080/SWZZWebYanLian/zttz/RealTyphoon.html?OpenOtherLinks=true", "_blank");
    } else{
      if(m.indexOf("tabszy")>-1){
        tabName.value = "tabszy";
        $("#tabszy").addClass("swDivSelect");        
        $("#swDivMoreULSZY ul #" + m).css("color", "var(--swDivSelectcolor)");
      }
      else if(m.indexOf("tabzw")>-1){
        tabName.value = "tabzwMore";
        $("#tabzwMore").addClass("swDivSelect");
        $("#swDivMoreULZW ul #" + m).css("color", "var(--swDivSelectcolor)");
      }
      else{
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
    tabzl: "/zonglan",
    tabmenhu: "/menhu",
    tabyq: "/shuzidatingYQ",
    tabsq: "/shuzidatingSQ",
    tabgq: "/shuzidatingGQ",
    tabsl: "/shuzidatingSL",
    tabqx:"/qixiang",
    // tabszy: "/shuzidatingSZY",
    tabzwbase: "/shuzidatingZW",
    tabfxxs: "/shuzidatingFXXS",
    tabcitynl: "/urbanwaterlogging",
    tabsz: "/WaterQualityScreen",
    tabvideo: "/shuzidatingSP",
    tabCar: "/shuzidatingCar",
    tabTyphoon: "/shuzidatingTyphoon",
    tabWater: "/shuzidatingWater",
    tabzwzhyw:"/dataWarehouseScreen",
    tabshj:"/shuzidatingSHJ",
    tabszyqs: "/shuzidatingSZYQS",
    tabszycrj: "/shuzidatingSZYCRJ",
    tabszystllsw: "/shuzidatingSZYSTLLSW",
    tabszypingjia:"/shuzidatingSZYPJ",
    tabzwxunjian:"shuzidatingXunjian",
    tabyubao:"/yubao",
    tabyujing:"/yubaoyujing",
    tabyuyan:"/yuyan",
    tabpinggu:"/pinggu"
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
function reductionSystem() {
  addAreaLineQS();
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
