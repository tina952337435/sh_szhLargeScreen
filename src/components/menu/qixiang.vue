<template>
  <div class="qixiangmai">
    <!-- 左侧 -->
    <div class="g-lside g-lsideqixiang wow slideInLeft display_flex flex-direction_column justify-content_flex-justify"
      data-wow-delay=".2s">
      <div class="pic-list">
        <ul id="onlytabTab">
          <!-- <li class="zuo-tu" @click="changeqixiangTab('suzhouqixinag')"
            :class="tabName == 'suzhouqixinag' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/suzhouqixinag.png" alt>
            <div class="triangle-bottomright">
              <div id="suzhouqixinag">气象信息</div>
            </div>
          </li>
          <li class="zuo-tu" @click="changeqixiangTab('duanlinyubao')"
            :class="tabName == 'duanlinyubao' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/duanlinyubao.png" alt>
            <div class="triangle-bottomright">
              <div id="duanlinyubao">短临预报</div>
            </div>
          </li>
          <li class="zuo-tu" @click="changeqixiangTab('RainWord')" :class="tabName == 'RainWord' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/RainWord.png" alt>
            <div class="triangle-bottomright">
              <div id="RainWord" style=" left: -92px;">降雨分析简报</div>
            </div>
          </li> -->
          <li class="zuo-tu" @click="changeqixiangTab('rader')" :class="tabName == 'rader' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/卫星雷达图.png" alt>
            <div class="triangle-bottomright">
              <div id="rader">华东雷达图</div>
            </div>
          </li>
          <!-- <li class="zuo-tu" @click="changeqixiangTab('areaRain')" :class="tabName == 'areaRain' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/降雨预报图.jpg" alt>
            <div class="triangle-bottomright">
              <div id="areaRain" style=" left: -92px;">分区预报降雨</div>
            </div>
          </li> -->
          <li class="zuo-tu" @click="changeqixiangTab('raintu')" :class="tabName == 'raintu' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/降雨预报图.jpg" alt>
            <div class="triangle-bottomright">
              <div id="raintu">预报降雨图</div>
            </div>
          </li>

          <li class="zuo-tu" @click="changeqixiangTab('SixRain')" :class="tabName == 'SixRain' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/降雨预报图.jpg" alt>
            <div class="triangle-bottomright">
              <div id="SixRain" style="left: -85px;">6小时预报图</div>
            </div>
          </li>

          <!-- <li class="zuo-tu" @click="changeqixiangTab('windy')" :class="tabName == 'windy' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/windy.png" alt>
            <div class="triangle-bottomright">
              <div id="windy" style=" left: -45px;">windy</div>
            </div>
          </li> -->

          <li class="zuo-tu" @click="changeqixiangTab('typhoon')" :class="tabName == 'typhoon' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/台风路径2.jpg" alt>
            <div class="triangle-bottomright">
              <div id="typhoon" style=" left: -60px;">台风路径</div>
            </div>
          </li>
          <li class="zuo-tu" @click="changeqixiangTab('weixingtu')"
            :class="tabName == 'weixingtu' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/风云四号.jpg" alt>
            <div class="triangle-bottomright">
              <div id="weixingtu" style=" left: -60px;">卫星云图</div>
            </div>
          </li>
          <li class="zuo-tu" style="display: none;">
            <!-- <img class="img" src="/images/Qiwen.jpg" alt> -->
            <div class="triangle-bottomright">
              <div id="Qiwen" style="left: -60px;">气温预报</div>
            </div>
          </li>

          <li class="zuo-tu" style="display: none;">
            <!-- <img class="img" src="/images/dimiantianqi.jpg" alt> -->
            <div class="triangle-bottomright">
              <div id="dimiantianqitu" style="left: -75px;">地面天气图</div>
            </div>
          </li>

          <li class="zuo-tu" @click="changeqixiangTab('zhongqitianqi')"
            :class="tabName == 'zhongqitianqi' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/zhongqitianqi.jpg" alt>
            <div class="triangle-bottomright">
              <div id="zhongqitianqi" style="left: -95px;">中期天气预报</div>
            </div>
          </li>

          <li class="zuo-tu" @click="changeqixiangTab('taifenggongbao')"
            :class="tabName == 'taifenggongbao' && 'zuo-tu onlyliHover'">
            <img class="img" src="/images/taifenggongbao.jpg" alt>
            <div class="triangle-bottomright">
              <div id="taifenggongbao" style="left: -65px;">台风公报</div>
            </div>
          </li>
        </ul>
      </div>

      <a href="javascript:;" class="img1" hidefocus="true" id="left_img_btn" style="display:none;"></a>
      <a href="javascript:;" class="img2" hidefocus="true" id="right_img_btn" style="display:none;"></a>
    </div>

    <!-- 右侧 -->
    <div class="g-rside g-rsideqixiang wow slideInRight display_flex flex-direction_column justify-content_flex-justify"
      data-wow-delay=".2s">
      <!-- 图片轮播 -->
      <div class="swiper bjimg">
        <div class="sel_wrap" id="sel_wrap" style="right: 40px;top: 30px;position: absolute;width: 80px;z-index: 1;">
          <label @click="showItem('qxDANWEI')">动图</label>
          <img src="/images/icon_select.png" style="position:absolute;right:0px;margin-top: 4px;"
            @click="showItem('qxDANWEI')">
          <ul class="el-dropdown-menu"
            style="width: 60px; margin-left: 6px; height: 60px; overflow-y: auto; margin-top: 5px; padding: 0px; display: none;"
            id="qxDANWEI">
            <li id="dongtu">动图</li>
            <li id="juzhen">矩阵</li>
          </ul>
        </div>
        <div id="photoPC">
          <div id="#demorader" class="slideBox">
            <!-- src="/images/loadingNew.png"  -->
            <img id="YTImg" style="display: block; position: absolute; top: 0; left: 0; right: 0;
                        bottom: 0; margin: auto;margin-top:30px;" alt="双击关闭" @click="btnImg()">
          </div>
          <iframe id="tyhoonIframe" frameborder="0" scrolling="auto"
            style="margin:2rem;height: calc(100vh - 14.375rem);width:calc(100% - 4.375rem);"></iframe>


          <div id="qixiangareaRainDiv" style="margin:2rem;height: calc(100vh - 14.375rem);width:calc(100% - 4.375rem);"
            v-if="qixiangareadiv">
            <qixiangareaRain />
          </div>
          <div>
            <a href="javascript:;" class="img3" hidefocus="true" id="left_img_btn1"></a>
            <a href="javascript:;" class="img4" hidefocus="true" id="right_img_btn1"></a>
          </div>
        </div>

        <!--图片矩阵摆放-->
        <div id="photoPCJZ" style="position:absolute; left: 33px;
    top: 65px;
    width: 91rem;height: calc(100vh - 20.375rem);
    overflow-y: auto;" v-html="dynamicHtml"></div>
      </div>
    </div>
  </div>

  <!--进度播放条-->
  <div class="bofang" style="z-index: 9999991;display:none;">
    <div class="wxyt_ft" style="left: calc(50% - 120px);bottom:20px;background: rgb(49 59 64 / 60%) 60% !important;">
      <div class="op">
        <a class="a_play" href="javascript:void(0);" id="play_btn" title="播放" style="display: none;">
          <!-- <i class="fa fa-pause" aria-hidden="true" style="color:white;font-size:20px;"></i> -->
          <el-icon :size="size" :color="color" style="margin-top:-7px;">
            <!-- 使用时，将对应的图标名称作为组件标签 -->
            <VideoPause />
          </el-icon>
        </a>
        <a class="a_prev" href="javascript:void(0);" onclick="wxyt.prev();" title="上一帧" style="display: none;">
          <i class="fa fa-angle-left" aria-hidden="true" style="color:white;font-size:30px;"></i>
        </a>
        <a class="a_play1" href="javascript:void(0);" id="play_btn1" title="播放">
          <!-- <i class="fa fa-play" aria-hidden="true" style="color:white;font-size:20px;"></i> -->

          <el-icon :size="size" :color="color" style="margin-top:-7px;">
            <!-- 使用时，将对应的图标名称作为组件标签 -->
            <VideoPlay />
          </el-icon>
        </a>
        <a class="a_next" href="javascript:void(0);" onclick="wxyt.nextFrame();" title="下一帧" style="display: none;">
          <i class="fa fa-angle-right" aria-hidden="true" style="color:white;font-size:30px;"></i>
        </a>
      </div>
      <dl class="clearfix slitu" id="slitu">
        <dd class="slide_box">
          <p class="slide" id="sld">
            <span class="lt"></span>
            <span class="rt"></span>
          </p>
          <p class="slide_cur" id="slide_cur" style="width:0px;">
            <span class="lt"></span>
            <span class="rt"></span>
          </p>
          <span class="slide_btn" id="slide_btn">
            <!--<em id="slb">03/06 14:00</em>-->
          </span>
        </dd>
      </dl>
    </div>
  </div>

  <!--气象产品放大图-->
  <div class="mask">
    <img class="bigimg" style=" display: block;">
    <img class="closeImg" src="/images/close.png" alt>
  </div>
  <ul class="products flex flex-wrap" id="viewer">
    <li v-for="(item, index) in sceneData" :key="index"><img :src="item.url" /></li>
  </ul>
</template>
<script setup>

import $ from "jquery";
import { ref, onMounted, onUnmounted, reactive, inject, provide } from "vue";
import dayjs from "dayjs";
import { VideoPlay, VideoPause } from "@element-plus/icons-vue";
import * as apiqixiang from "@/api/qixiang/qixiangapi.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import qixiangareaRain from "@/components/menu/qx/qixiangareaRain.vue";
import Viewer from 'viewerjs'

import 'viewerjs/dist/viewer.css'
const viewerjs = ref(null)
var dynamicHtml = ref("");

var qixiangareadiv = ref(false);
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const child = ref(null);
const showDialog = ref(true);
var tabName = ref("rader");
var picXingshi = "dongtu";
var myData = [];
let sceneData = reactive([]);
//自动刷新

window.curDataRefresh = function () {

}
onMounted(() => {
  $("#m_shik").addClass('z-crtitem z-crt wow slideInUp link-item')
  $("#photoPC").show();
  $("#photoPCJZ").hide();
  $("#sel_wrap").hide();
  $("#tyhoonIframe").hide();
  $("#qixiangareaRainDiv").hide();
  // loadRader();

  addObjClick();
  onZuoTab();
});
//自动刷新
var interVal = null;
// 离开页面时，销毁viewerjs插件：
onUnmounted(() => {
  if (viewerjs.value) {
    viewerjs.value.destroy() // 销毁 viewer 实例
  }
  if (interVal != null) {
    clearInterval(interVal);
  }
})
// function previewImg() {

// viewerjs.value = new Viewer(document.getElementById('viewer'), {
//   inline: false, // 内联模式
//   button: true, // 是否显示关闭按钮
//   loading: true, // 图片加载状态
//   zIndex: 9999, // 设置层级

// })
// viewerjs.value.show()

// }
const previewImage = (index) => {
  const box = document.querySelector('#viewer');
  if (box) {
    const photoViewer = new Viewer(box, {
      inline: false, // 是否启用 inline 模式
      fullscreen: true, // 播放时是否全屏
      title: false, // 是否显示当前图片的标题
      toolbar: {  // 显示工具栏
        // 下面各种按钮1显示，0隐藏，可自定义按钮大小和点击事件
        zoomIn: 1, // 放大图片
        zoomOut: 1, //缩小图片
        oneToOne: 1, // 图片比例100%
        reset: 1, // 重置图片大小
        prev: 1, // 查看上一张图片
        play: 0, // 播放图片
        next: 1,// 查看下一张图片
        rotateLeft: 1,// 向左旋转图片
        rotateRight: 1,// 向右旋转图片
        flipHorizontal: 1,// 图片左右翻转
        flipVertical: 1, // 图片上下翻转
      },
      // 定义用于查看的图像的初始索引
      initialViewIndex: index,
      // 每次关闭查看时触发
      hide() {
        photoViewer.destroy();
      },
      // 每次关闭查看时触发，在hide之后
      hidden() {
        photoViewer.destroy();
      },
      // 每次查看时触发
      show() {
        photoViewer.full();
      },
    });
    photoViewer.show();
  }
};
function ImgData() {
  const strJson = $.data(myData, "YTData");
  if (strJson.length > 0) {
    // sceneData= reactive([]);//reactive([]);
    sceneData.length = 0;
    // var resultList=[];
    for (let num = 0; num < strJson.length; num++) {
      let item = strJson[num];
      var strParam = {};
      strParam["id"] = item["ZJ_ID"];
      if ($.data(myData, "YTDataName") == "雷达图") {
        strParam["url"] = PicUrl + "LDTP/" + item["ZJ_PIC"];
      } else if (
        $.data(myData, "YTDataName") == "预报降雨图" ||
        $.data(myData, "YTDataName") == "6小时预报图"
      ) {
        strParam["url"] = PicUrl + item["ZJ_PIC"].substring(0, 8) + "/" + item["ZJ_PIC"];
      } else if ($.data(myData, "YTDataName") == "卫星云图") {
        strParam["url"] = PicUrl + "YTTP/" + item["ZJ_PIC"];
      } else if ($.data(myData, "YTDataName") == "6小时预报图") {
        strParam["url"] = PicUrl + $.data(myData, "YTDataURL") + "/" + item["ZJ_PIC"];
      }
      sceneData.push(strParam);
    }
    // sceneData.value=ref(resultList);
  }
}
function btnImg() {
  // setTimeout(function(){
  previewImage(ImgIndex);
  // },500)
}

// const result=reactive([]);
// var strParam={};
// strParam["id"]="1";
// strParam["url"]="/images/6Rain.jpg";
// result.push(strParam);
// strParam={};
// strParam["id"]="2";
// strParam["url"]="/images/dimiantianqi.jpg";
// result.push(strParam);
// sceneData.push(result);
// previewImg();
//设置icon的大小和颜色
defineProps({
  size: {
    type: String,
    default: "30px",
  },
  color: {
    type: String,
    default: "#fff",
  },
});

function changeqixiangTab(m) {
  tabName.value = m;
  onZuoTab();
}
//调用右边组件的方法
function onZuoTab() {
  var leftTitle = tabName.value;
  stopCount();
  $("#photoPC").show();
  $("#photoPCJZ").hide();
  $("#sel_wrap").show();
  $("#tyhoonIframe").hide();
  $(".slideBox").show();
  $(".img3").show();
  $(".img4").show();
  $(".a_play").show();
  $(".a_play1").hide();
  $(".bofang").show();
  $("#qixiangareaRainDiv").hide();
  qixiangareadiv.value = false;
  if (leftTitle == "rader") {
    loadRader();
  } else if (leftTitle == "raintu") {
    loadRain();
  } else if (leftTitle == "weixingtu") {
    weixing();
  } else if (leftTitle == "Qiwen") {
    loadQiwen();
  } else if (leftTitle == "dimiantianqitu") {
    loadDimiantianqitu();
  } else if (leftTitle == "suzhouqixinag") {
    $("#sel_wrap").hide();
    $(".img3").hide();
    $(".img4").hide();
    $(".slideBox").hide();
    $("#tyhoonIframe").show();
    $("#tyhoonIframe").attr("src", "");
    setTimeout(function () {
      $("#tyhoonIframe").attr("src", "http://172.17.50.30:7998/index.html#components/atfxx/amap.html?times=" + Math.floor(Math.random() * 1000));
    }, 500)

    $(".slideBox").hide();
    $("#tyhoonIframe").show();
    $(".bofang").hide();
  } else if (leftTitle == "duanlinyubao") {
    $("#sel_wrap").hide();
    $(".img3").hide();
    $(".img4").hide();
    $(".slideBox").hide();
    $("#tyhoonIframe").attr("src", "");
    setTimeout(function () {
      $("#tyhoonIframe").attr("src", "http://172.17.50.30:7998/index.html#components/wltq/area.html?times=" + Math.floor(Math.random() * 100));
    }, 500);

    $("#tyhoonIframe").show();
    $(".slideBox").hide();
    $("#tyhoonIframe").show();
    $(".bofang").hide();
  } else if (leftTitle == "RainWord") {
    $("#sel_wrap").hide();
    $(".img3").hide();
    $(".img4").hide();
    $(".slideBox").hide();
    $("#tyhoonIframe").attr("src", "");
    setTimeout(function () {
      $("#tyhoonIframe").attr("src", "http://172.17.50.30:7998/index.html#components/report/nbrpt.html?times=" + Math.floor(Math.random() * 100)
      );
    }, 500);

    $("#tyhoonIframe").show();
    $(".slideBox").hide();
    $("#tyhoonIframe").show();
    $(".bofang").hide();
  } else if (leftTitle == "zhongqitianqi") {
    $("#sel_wrap").hide();
    $(".img3").hide();
    $(".img4").hide();
    $(".slideBox").hide();
    $(".bofang").hide();
    $("#tyhoonIframe").show();
    $("#tyhoonIframe").attr("src", "http://www.nmc.cn/publish/bulletin/mid-range.htm"
    );
  } else if (leftTitle == "taifenggongbao") {
    $("#sel_wrap").hide();
    $(".img3").hide();
    $(".img4").hide();
    $(".slideBox").hide();
    $(".bofang").hide();
    $("#tyhoonIframe").show();
    $("#tyhoonIframe").attr("src", "http://www.nmc.cn/publish/typhoon/warning.html");
  } else if (leftTitle == "SixRain") {
    loadSixRain();
  } else if (leftTitle == "areaRain") {
    $("#sel_wrap").hide();
    $(".img3").hide();
    $(".img4").hide();
    $("#qixiangareaRainDiv").show();
    $(".slideBox").hide();
    $("#tyhoonIframe").hide();
    $(".bofang").hide();
    qixiangareadiv.value = true;
    // loadFQYL();
  } else if (leftTitle == "typhoon") {
    $("#sel_wrap").hide();
    $(".img3").hide();
    $(".img4").hide();
    $("#tyhoonIframe").attr("src", "http://www.readearth.com/publictyphoon/?showIframeStr=true");
    $(".slideBox").hide();
    $("#tyhoonIframe").show();
    $(".bofang").hide();
  } else if (leftTitle == "windy") {
    $("#tyhoonIframe").show();
    var windyUrl = "https://embed.windy.com/embed2.html?lat=31.28&lon=121.21&detailLat=28.488&detailLon=123.354&width=650&height=450&zoom=9&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=m%2Fs&metricTemp=%C2%B0C&radarRange=-1";
    $("#tyhoonIframe").attr("src", windyUrl);

    $("#sel_wrap").hide();
    $(".img3").hide();
    $(".img4").hide();
    $(".slideBox").hide();
    $(".bofang").hide();
    return;
  }
  if (picXingshi == "dongtu") {
    if (
      "areaRain,typhoon,zhongqitianqi,taifenggongbao,suzhouqixinag,duanlinyubao,RainWord".indexOf(leftTitle) == -1
    ) {
      $(".bofang").show();
      $("#left_img_btn1").show();
      $("#right_img_btn1").show();
      $("#photoPC").show();
      $("#photoPCJZ").hide();
    } else {
      $("#photoPC").show();
      $("#photoPCJZ").hide();
    }
  } else if (picXingshi == "juzhen") {
    if (
      "areaRain,typhoon,zhongqitianqi,taifenggongbao,suzhouqixinag,duanlinyubao,RainWord".indexOf(leftTitle) == -1
    ) {
      stopCount();
      $(".bofang").hide();
      $("#left_img_btn1").hide();
      $("#right_img_btn1").hide();
      $("#photoPC").hide();
      $("#photoPCJZ").show();
    } else {
      $("#photoPC").show();
      $("#photoPCJZ").hide();
    }
  }
}

function addObjClick() {
  // $(".zuo-tu").off('click');
  // $(".zuo-tu").click(function (res) {
  //   $(".zuo-tu").removeClass("onlyliHover");
  //   $(this).addClass("onlyliHover");
  //   var leftTitle = $(this).find(".triangle-bottomright").find("div").attr("id").replace(" ", "");
  //   $.data(myData, "leftTitle", leftTitle);
  //   onZuoTab();

  // });
  $(".onlytabTab li").off('click');

  $(".onlytabTab li").click(function () {
    $(".onlytabTop").removeClass("onlytabToponlyliHover");
    $(this).addClass("onlytabToponlyliHover");
    var leftTitle = $(this).html().replace(" ", "");
    // if (leftTitle == "水文") {
    //   var url = "yubao.html";
    //   if (GetCookie("SystemMoshi") == "yinjiangjitai") {
    //     url = "yubaoYJJT.html";
    //   }
    //   window.location.href = url;
    // }
  });
  $("#left_img_btn").off('click');
  $("#left_img_btn").click(function (e) {
    if (F > 0) {
      F--;
      huadong("Prev");
    }
  });
  $("#right_img_btn").off('click');
  $("#right_img_btn").click(function (e) {
    if (F < imgNum) {
      F++;
      huadong("Next");
    }
  });
  $("#left_img_btn1").off('click');
  $("#left_img_btn1").click(function (e) {
    stopCount();
    if (ImgIndex > 0) {
      ImgIndex--;
      selectRow(ImgIndex);
    }
    else {
      ImgIndex = $.data(myData, "YTData").length - 1;
      selectRow(ImgIndex);
    }
  });
  $("#right_img_btn1").off('click');
  $("#right_img_btn1").click(function (e) {
    stopCount();

    if ($.data(myData, "YTData") != null) {
      if (ImgIndex < $.data(myData, "YTData").length - 1) {
        ImgIndex++;
        selectRow(ImgIndex);
      }
      else {
        ImgIndex = 0;
        selectRow(ImgIndex);
      }
    }
  });
  $("#play_btn").off('click');
  $("#play_btn").click(function () {
    //var dis = $("#play_btn").css("display");
    //if (dis == "none") {
    //    $("#play_btn").css("display", "block");
    //    $("#play_btn1").css("display", "none");
    //} else {
    //    $("#play_btn").css("display", "none");
    //    $("#play_btn1").css("display", "block");
    //}
    stopCount();
  });
  $("#play_btn1").off('click');
  $("#play_btn1").click(function () {
    startCount();
    var dis = $(this).css("display");
    if (dis == "none") {
      $(this).css("display", "block");
      $("#play_btn").css("display", "none");
    } else {
      $(this).css("display", "none");
      $("#play_btn").css("display", "block");
    }
  });
  $("#qxDANWEI li").off('click');
  $("#qxDANWEI li").click(function (res) {
    $("#qxDANWEI").css("display", "none");
    var html = $(this).html();
    $("#qxDANWEI").parent().find("label").html(html);
    var id = $(this).attr("id");
    $.data(myData, "picXingshi", id);
    picXingshi = id;
    if (id == "dongtu") {
      startCount();
      $(".bofang").show();
      $("#left_img_btn1").show();
      $("#right_img_btn1").show();
      $("#photoPC").show();
      $("#photoPCJZ").hide();
    } else if (id == "juzhen") {
      stopCount();
      $(".bofang").hide();
      $("#left_img_btn1").hide();
      $("#right_img_btn1").hide();
      $("#photoPC").hide();
      $("#photoPCJZ").show();
    }
  });
}

var curDate;
function loadAreaRainNew() {
  var hour = new Date().getHours();
  var StartDate = "";
  if (hour >= 9) {
    StartDate = new Date().format("yyyy-MM-dd 08");
    curDate = new Date().format("yyyy-MM-dd 08:00:00");
  } else {
    StartDate = new Date(
      addDayDate(new Date().format("yyyy-MM-dd HH:mm:ss"), -1)
    ).format("yyyy-MM-dd 20");
    curDate = new Date(
      addDayDate(new Date().format("yyyy-MM-dd HH:mm:ss"), -1)
    ).format("yyyy-MM-dd 20:00:00");
  }
  StartDate = new Date(
    addDayDate(new Date().format("yyyy-MM-dd HH:mm:ss"), -1)
  ).format("yyyy-MM-dd 20");
  var strWhere = {
    StartDate: StartDate,
    Where: 4 //上海
  };
  GetJosns("Tba_JyYb_Dt", strWhere, "Tba_JyYb_DtNew");
}

var t;
var ImgIndex = 0; //图片播放的当前数量
var ImgHour = 1000; //播放频率
function startCount() {
  t = setInterval(function () { TimeShowYT(); }, ImgHour);
}
function stopCount() {
  $("#play_btn").hide();
  $("#play_btn1").show();
  if (t) {
    clearInterval(t);
  }
}
function TimeShowYT() {
  //var row = grid.getSelected();
  //var index = ImgIndex; //grid.indexOf(row);
  var total = $.data(myData, "YTData").length; //grid.data.length;
  ImgIndex = ImgIndex + 1;
  if (ImgIndex >= total) {
    ImgIndex = 0;
  }
  selectRow(ImgIndex);
}
var slide_btn_len = 540;
var PicUrl = "http://36.156.144.126:8020/weather/";
function selectRow(index) {
  var data = $.data(myData, "YTData");
  var total = data.length - 1; //grid.data.length;
  var oneLen = slide_btn_len / total;
  $("#slide_btn").css("left", index * oneLen);
  $("#slide_cur").css("width", index * oneLen);
  var ZJ_PIC = data[index].ZJ_PIC;
  if ($.data(myData, "YTDataName") == "雷达图") {
    $("#YTImg").attr("src", PicUrl + "LDTP/" + ZJ_PIC);
  } else if (
    $.data(myData, "YTDataName") == "预报降雨图" ||
    $.data(myData, "YTDataName") == "6小时预报图"
  ) {
    $("#YTImg").attr(
      "src",
      PicUrl + "" + data[index].ZJ_PIC.substring(0, 8) + "/" + ZJ_PIC
    );
  } else if ($.data(myData, "YTDataName") == "卫星云图") {
    $("#YTImg").attr("src", PicUrl + "YTTP/" + ZJ_PIC);
  } else if ($.data(myData, "YTDataName") == "6小时预报图") {
    $("#YTImg").attr(
      "src",
      "http://36.156.144.126:8020/weather/" +
      $.data(myData, "YTDataURL") +
      "/" +
      ZJ_PIC
    );
  }
}
function loadFQYL() {
  var YLSTIME = "",
    YLETIME = "";
  if (
    $.data(myData, "YLSTIME") == undefined ||
    $.data(myData, "YLETIME") == undefined
  ) {
    YLSTIME = stime = AddHourDate(new Date().format("yyyy-MM-dd HH:mm:ss"), -1);
    YLETIME = new Date().format("yyyy-MM-dd HH:mm:ss");
  } else {
    YLSTIME = $.data(myData, "YLSTIME");
    YLETIME = $.data(myData, "YLETIME");
  }
  var strwhere = {
    stime: YLSTIME,
    etime: YLETIME,
    pid: "2023052903053732314"
  };
  app.post("/ST_PPTN_R/selectListByXZ", strwhere, function (res) {
    JosnSel(res, "YLSel");
  });
}

function loadRader() {
  var now = new Date();
  var StartDate = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
    .add(-2, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
  var EndDate = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  var postParam = {
    STIME: StartDate, //new Date(addDayDate(new Date().format('yyyy-MM-dd'), -1)).format('yyyy-MM-dd'),
    ETIME: EndDate,
    ZJ_TYPE: "雷达",
    ZJ_CITY: "华东"
  };
  apiqixiang.TFPICWeacontent(postParam).then(res => {
    JosnSel(res, "WATER_WX_ZJ_TFPICSel");
  });
}
function loadQiwen() {
  var hours = new Date().getHours();
  var StartDate = new Date().format("yyyy-MM-dd");
  EndDate = new Date().format("yyyy-MM-dd");
  if (hours < 8) {
    StartDate = new Date(addDayDate(EndDate, -1)).format("yyyy-MM-dd");
  }
  EndDate = new Date(addDayDate(EndDate, 1)).format("yyyy-MM-dd");
  var strWhere = {
    StartDate: StartDate, //new Date(addDayDate(new Date().format('yyyy-MM-dd'), -1)).format('yyyy-MM-dd'),
    EndDate: EndDate,
    TBA_INFOTYPE: "1-7天气温预报"
  };
  GetJosns("Cx_Tba_QiXiang_Dt", strWhere, "SelSixRain");
}
function loadDimiantianqitu() {
  var hours = new Date().getHours();
  var StartDate = new Date().format("yyyy-MM-dd");
  EndDate = new Date().format("yyyy-MM-dd");
  if (hours < 8) {
    StartDate = new Date(addDayDate(EndDate, -1)).format("yyyy-MM-dd");
  }
  EndDate = new Date(addDayDate(EndDate, 1)).format("yyyy-MM-dd");
  var strWhere = {
    StartDate: StartDate,
    EndDate: EndDate,
    TBA_INFOTYPE: "地面天气图"
  };
  GetJosns("Cx_Tba_QiXiang_Dt", strWhere, "SelRader");
}
function loadSixRain() {
  var now = new Date();
  var StartDate = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
    .add(-1, "day")
    .format("YYYY-MM-DD HH:mm:ss");
  var EndDate = dayjs(now).format("YYYY-MM-DD 23:59:59");
  var postParam = {
    STIME: StartDate, //new Date(addDayDate(new Date().format('yyyy-MM-dd'), -1)).format('yyyy-MM-dd'),
    ETIME: EndDate,
    ZJ_TYPE: "6小时雨量预报"
  };
  apiqixiang.TFPICWeacontent(postParam).then(res => {
    JosnSel(res, "SelSixRain");
  });
}
function loadRain() {
  var now = new Date();
  var StartDate = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
    .add(-1, "day")
    .format("YYYY-MM-DD HH:mm:ss");
  var EndDate = dayjs(now).format("YYYY-MM-DD 23:59:59");
  var postParam = {
    STIME: StartDate,
    ETIME: EndDate,
    ZJ_TYPE: "全国雨量预报"
  };
  apiqixiang.TFPICWeacontent(postParam).then(res => {
    JosnSel(res, "SelRader");
  });
}
function weixing() {
  var now = new Date();
  var StartDate = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
    .add(-12, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
  var EndDate = dayjs(now).format("YYYY-MM-DD HH:mm:ss");

  var postParam = {
    STIME: StartDate, //new Date(addDayDate(new Date().format('yyyy-MM-dd'), -1)).format('yyyy-MM-dd'),
    ETIME: EndDate,
    ZJ_TYPE: "云图图片"
  };
  apiqixiang.TFPICWeacontent(postParam).then(res => {
    JosnSel(res, "weixing");
  });
}

function drag() {
  var odrag = document.getElementById("slide_btn");
  // odrag.onmousedown = function(ev) {
  //   var oevent = ev || event;
  //   var distanceX = oevent.clientX - odrag.offsetLeft;
  //   var distanceY = oevent.clientY - odrag.offsetTop;
  //   var old_x = oevent.clientX;
  //   var old_y = oevent.clientY;
  //   var _count = 0;
  //   document.onmousemove = function(ev) {
  //     var oevent = ev || event;
  //     var _x, _y;
  //     _x = oevent.clientX - distanceX;
  //     _y = oevent.clientY - distanceY;
  //     if (_x < 0) _x = 0;
  //     if (_y < 0) _y = 0;
  //     if (_x > document.body.clientWidth - odrag.offsetWidth)
  //       _x = document.body.clientWidth - odrag.offsetWidth;
  //     if (_y > document.body.clientHeight - odrag.offsetHeight)
  //       _y = document.body.clientHeight - odrag.offsetHeight;
  //     if (_x > slide_btn_len) {
  //       _x = slide_btn_len;
  //     }
  //     odrag.style.left = _x + "px";
  //     _count++;
  //     // odrag.style.top = _y + 'px';
  //   };
  //   document.onmouseup = function(ev) {
  //     var oevent = ev || event;
  //     var _x = oevent.clientX - distanceX;
  //     var _y = oevent.clientY - distanceY;
  //     var leftindex = (_x / $("body").width()).toFixed(2);
  //     var topindex = (_y / $("body").height()).toFixed(2);
  //     //存储位置区域比列或者具体数据
  //     document.onmousemove = null;
  //     document.onmouseup = null;

  //     var data = $.data(myData, "YTData");
  //     var total = data.length;
  //     // var _index = parseInt( _x / total);
  //     var oneLen = slide_btn_len / total;
  //     var _index = parseInt(_x / oneLen);
  //     selectRow(_index);
  //   };
  // };
}

function JosnSel(data, typeID) {
  if (typeID == "WATER_WX_ZJ_TFPICSel") {
    var dataResult = data.data;
    dataResult = sortObjectArray(dataResult, ["ZJ_DATE"], "asc");
    $.data(myData, "YTData", dataResult);
    $.data(myData, "YTDataName", "雷达图");
    $("#YTImg").css("height", "100%");

    var strHtml = "<ul>";
    var juzhengHtml = "<ul class='photo-pcul'>";
    for (var num = 0; num < dataResult.length; num++) {
      strHtml +=
        "<li id='img" +
        (num + 1) +
        "' style='width:" +
        100 / dataResult.length +
        "%;'>&nbsp;</li>";

      juzhengHtml +=
        '<li  style="width:33.33%;height:50%;"><img style="width:100%;height:100%;padding: 10px;" onclick="ImgBtn(' + num + ')" src=\"' +
        'http://36.156.144.126:8020/weather/LDTP/' +
        dataResult[num].ZJ_PIC + '\"/></li>';
    }
    strHtml += "</ul>";
    $("#sld").html(strHtml);

    juzhengHtml += "</ul>";
    $("#photoPCJZ").html(juzhengHtml);
    ImgData();

  } else if (typeID == "SelRader") {
    var dataResult = data.data;
    $.data(myData, "YTDataName", "预报降雨图");
    $("#YTImg").css("height", "100%");

    var strHtml = "<ul>";
    var juzhengHtml = "<ul class='photo-pcul'>";
    var ss = {
      "24": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 24 },
      "48": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 48 },
      "72": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 72 },
      "96": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 96 },
      "120": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 120 },
      "144": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 144 },
      "168": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 168 }
    };
    var strRep = "00.JPG";
    var jsonDataNew = [];
    for (var key in ss) {
      $(dataResult).each(function (index, item) {
        if (ss[key].DAYS == Number(item.ZJ_PIC.slice(12).replace(strRep, ""))) {
          jsonDataNew.push(item);
          return false;
        }
      });
    }
    dataResult = jsonDataNew;
    $.data(myData, "YTData", dataResult);

    var strURL = PicUrl + "/";
    $(jsonDataNew).each(function (index, item) {
      item.strURL = strURL + item.ZJ_PIC.substring(0, 8) + "/";
      strHtml +=
        "<li id='img" +
        (index + 1) +
        "' style='width:" +
        100 / dataResult.length +
        "%;'>&nbsp;</li>";
      juzhengHtml += '<li  style="width:33.33%;height:50%;"><img style="width:100%;height:100%;padding: 10px;"  onclick= \'ImgBtn(' + index + ')\' src=\'' + item.strURL + item.ZJ_PIC + '\'/></li>';
    });

    strHtml += "</ul>";
    $("#sld").html(strHtml);
    juzhengHtml += "</ul>";
    $("#photoPCJZ").html(juzhengHtml);
    ImgData();


  } else if (typeID == "weixing") {
    var dataResult = data.data;
    $.data(myData, "YTData", dataResult);
    $.data(myData, "YTDataName", "卫星云图");
    $("#YTImg").css("height", "100%");

    var strHtml = "<ul>";
    var juzhengHtml = "<ul class='photo-pcul'>";
    for (var num = 0; num < dataResult.length; num++) {
      strHtml +=
        "<li id='img" +
        (num + 1) +
        "' style='width:" +
        100 / dataResult.length +
        "%;'>&nbsp;</li>";
      juzhengHtml +=
        '<li  style="width:33.33%;height:50%;"><img style="width:100%;height:100%;padding: 10px;"  onclick= \'ImgBtn(' + num + ')\' src=\'' +
        "http://36.156.144.126:8020/weather/YTTP/" +
        dataResult[num].ZJ_PIC + '\'/></li>';
    }
    strHtml += "</ul>";
    $("#sld").html(strHtml);

    juzhengHtml += "</ul>";
    $("#photoPCJZ").html(juzhengHtml);

    ImgData();

  } else if (typeID == "SelSixRain") {
    var dataResult = data.data;
    $.data(myData, "YTDataName", "6小时预报图");

    var strHtml = "<ul>";
    var juzhengHtml = "<ul class='photo-pcul'>";
    var ss = {
      "6": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 6 },
      "12": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 12 },
      "18": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 18 },
      "24": { TM: "", ZJ_HOUR: "", ZJ_PIC: "", DAYS: 24 }
    };
    var strRep = "06.JPG";
    var jsonDataNew = [];
    for (var key in ss) {
      $(dataResult).each(function (index, item) {
        if (ss[key].DAYS == Number(item.ZJ_PIC.slice(12).replace(strRep, ""))) {
          jsonDataNew.push(item);
          return false;
        }
      });
    }
    dataResult = jsonDataNew;
    $.data(myData, "YTData", dataResult);

    var strURL = PicUrl + "/";
    $(jsonDataNew).each(function (index, item) {
      item.strURL = strURL + item.ZJ_PIC.substring(0, 8) + "/";
      strHtml +=
        "<li id='img" +
        (index + 1) +
        "' style='width:" +
        100 / dataResult.length +
        "%;'>&nbsp;</li>";
      juzhengHtml +=
        '<li  style=\'width:33.33%;height:50%;\'><img style=\'width:100%;height:100%;padding: 10px;\'  onclick= \'ImgBtn(' + num + ')\' src=\'' + item.strURL + item.ZJ_PIC + '\'/></li>';
    });

    strHtml += "</ul>";
    $("#sld").html(strHtml);
    juzhengHtml += "</ul>";
    $("#photoPCJZ").html(juzhengHtml);
    $("#YTImg").css("height", "100%");

    var strHtml = "<ul>";
    var juzhengHtml = "<ul class='photo-pcul'>";
    for (var num = 0; num < dataResult.length; num++) {
      strHtml +=
        "<li id='img" +
        (num + 1) +
        "' style='width:" +
        100 / dataResult.length +
        "%;'>&nbsp;</li>";

      $.data(myData, "YTDataURL", dataResult[0].ZJ_PIC.substring(0, 8));
      juzhengHtml +=
        '<li  style=\'width:33.33%;height:50%;\'><img style=\'width:100%;height:100%;padding: 10px;\' onclick=\'ImgBtn(' + num + ')\' src=\'' +
        "http://36.156.144.126:8020/weather/" +
        dataResult[0].ZJ_PIC.substring(0, 8) +
        "/" +
        dataResult[num].ZJ_PIC +
        '\'/></li>';
    }
    strHtml += "</ul>";
    $("#sld").html(strHtml);

    juzhengHtml += "</ul>";
    $("#photoPCJZ").html(juzhengHtml);

    ImgData();

  }
  $("#sld ul li").click(function (e) {
    var html = Number(
      $(this)
        .attr("id")
        .replace("img", "")
    );
    stopCount();
    ImgIndex = html;
    selectRow(ImgIndex);
  });

  $("#slide_cur").click(function (e) {
    var data = $.data(myData, "YTData");
    var total = data.length;

    var objTop = getOffsetTop(document.getElementById("slide_cur")); //对象x位置
    var objLeft = getOffsetLeft(document.getElementById("slide_cur")); //对象y位置

    var mouseX = event.clientX + document.body.scrollLeft; //鼠标x位置
    var mouseY = event.clientY + document.body.scrollTop; //鼠标y位置
    //计算点击的相对位置
    var objX = mouseX - objLeft;
    var objY = mouseY - objTop;

    var _index = parseInt(objX / total);
    //var clickObjPosition = objX + "," + objY;
    //alert(_index);
    selectRow(_index);
  });
  drag();
  function getOffsetTop(obj) {
    var tmp = obj.offsetTop;
    var val = obj.offsetParent;
    while (val != null) {
      tmp += val.offsetTop;
      val = val.offsetParent;
    }
    return tmp;
  }
  function getOffsetLeft(obj) {
    var tmp = obj.offsetLeft;
    var val = obj.offsetParent;
    while (val != null) {
      tmp += val.offsetLeft;
      val = val.offsetParent;
    }
    return tmp;
  }

  stopCount();
  $("#play_btn").hide();
  $("#play_btn1").show();
  setTimeout(function () {
    ImgIndex = $.data(myData, "YTData").length - 1; //图片播放的当前数量
    var lastIndex = $.data(myData, "YTData").length - 1;
    selectRow(lastIndex); //默认放最新一张
  }, 200);
}

var F = 0;
var D = 99;
var s = D * 2;
function huadong(I) {
  var ulTop = 0;
  if (I == "Prev") {
    if (F > 0) {
      ulTop = ulTop - D;
    }
  } else {
    if (I == "Next") {
      ulTop = F * D;
      if (ulTop >= s) {
        ulTop = s;
      }
      ulTop = 0 - ulTop;
    }
  }
  onlytab.animate({
    top: ulTop + "%"
  });
}
window.ImgBtn = function (index, imgUrl) {
  previewImage(index);
}

function showItem(id) {
  var obj = $("#" + id);
  var dis = obj.css("display");
  if (dis == "block") {
    obj.css("display", "none");
  } else {
    obj.css("display", "block");
  }
}
</script>
<style scoped>
@import '@/assets/styles/radar_pt_index.css';
@import '@/assets/styles/qixiang.css';
</style>
