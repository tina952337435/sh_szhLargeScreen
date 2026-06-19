<template>
  <!-- 右侧 -->
  <div class="g-rside">
    <div style="width: 100%">
      <TableTyphoon @parentMethods="parentMethod" @parentMethodPoints="parentMethodPoint"
        @parentMethodPointStarts="parentMethodPointStart" @parentMethodshowDynamicLayers="parentMethodshowDynamicLayer" />
    </div>
  </div>

  <!-- 图例 -->
  <div class="tuli">
    图例<img src="/images/close.png" alt="关闭" @click="closeTuli('hide')"
      style="width: 22px;height: 22px;object-fit: cover;cursor: pointer; float: right;">
    <div class="colorL">
      <div style="color:white;padding:5px;">台风等级</div>
      <ul style="padding-inline-start: 0px;">
        <li style="float:left;list-style: none;">
          <img src="/images/typhoon/1.png" alt>
          热带低压
        </li>
        <li style="float:left;padding-left: 16px;list-style: none;">
          <img src="/images/typhoon/2.png" alt>
          热带风暴
        </li>
        <li style="float:left;list-style: none;">
          <img src="/images/typhoon/3.png" alt>
          强热带风暴
        </li>
        <li style="float:left;list-style: none;">
          <img src="/images/typhoon/4.png" alt>
          台风
        </li>

        <li style="float:left;list-style: none;">
          <img src="/images/typhoon/5.png" alt>
          强台风
        </li>

        <li style="float:left;padding-left: 29px;list-style: none;">
          <img src="/images/typhoon/6.png" alt>
          超强台风
        </li>
      </ul>
    </div>
    <div class="colorL">
      <div style="color:white;clear:both;padding:5px;">预报台</div>
      <ul style="padding-inline-start: 0px;">
        <li style="float:left;list-style: none;">
          <img src="/images/typhoon/forecast-01.png" style="vertical-align: 4px;" alt>
          中国
        </li>
        <li style="float:left;padding-left: 16px;list-style: none;">
          <img src="/images/typhoon/forecast-02.png" style="vertical-align: 4px;" alt>
          中国香港
        </li>
        <li style="float:left;list-style: none;">
          <img src="/images/typhoon/forecast-03.png" style="vertical-align: 4px;" alt>
          日本
        </li>
        <li style="float:left;padding-left: 16px;list-style: none;">
          <img src="/images/typhoon/forecast-04.png" style="vertical-align: 4px;" alt>
          中国台湾
        </li>
        <li style="float:left;list-style: none;">
          <img src="/images/typhoon/forecast-05.png" style="vertical-align: 4px;" alt>
          美国
        </li>
      </ul>
    </div>
  </div>
  <div class="tuli-photo">
    <div class="tuli-photo-js">
      降水图例
      <ul>
        <li>0</li>
        <li style="padding-left: 13px;">10</li>
        <li style="padding-left: 13px;">25</li>
        <li style="padding-left: 13px;">50</li>
        <li style="padding-left: 7px;">100</li>
        <li style="padding-left: 7px;">250</li>
      </ul>
      <ul>
        <li><span class="colorSpan" style="background-color:#A6F28E"></span></li>
        <li><span class="colorSpan" style="background-color:#007B00"></span></li>
        <li><span class="colorSpan" style="background-color:#3DBCF9"></span></li>
        <li><span class="colorSpan" style="background-color:#0000F9"></span></li>
        <li><span class="colorSpan" style="background-color:#FB3DFA"></span></li>
        <li><span class="colorSpan" style="background-color:#7B0000"></span></li>
      </ul>
    </div>
    <div class="tuli-photo-ld">
      雷达图例
      <ul>
        <li style="padding-left: 20px;">5</li>
        <li style="padding-left: 3px;">10</li>
        <li style="padding-left: 3px;">15</li>
        <li style="padding-left: 3px;">20</li>
        <li style="padding-left: 3px;">25</li>
        <li style="padding-left: 3px;">30</li>
        <li style="padding-left: 3px;">35</li>
        <li style="padding-left: 3px;">40</li>
        <li style="padding-left: 3px;">45</li>
        <li style="padding-left: 3px;">50</li>
        <li style="padding-left: 3px;">55</li>
        <li style="padding-left: 3px;">60</li>
        <li style="padding-left: 3px;">65</li>
        <li style="padding-left: 3px;">70</li>
      </ul>
      <ul>
        <li><span class="colorSpanSmall" style="background-color:#419DF1"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#7BEAEE"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#6DFA3D"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#00D800"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#008C00"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#FFFF00"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#E7C000"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#FF9000"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#FF0000"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#D60000"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#C00000"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#FF00F0"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#9600B4"></span></li>
        <li><span class="colorSpanSmall" style="background-color:#AD90F0"></span></li>
      </ul>
    </div>
  </div>

  <div class="tuliTitleButton" @click="closeTuli('show')">
    图例
  </div>
  <!--头部显示台风的位置-->
  <div id="sqTopToggle" style="height:40px;position:absolute;top:150px;left:calc(50% - 180px);display:none;">
    <div class="shdswDiv" id="sswz">
      <div class="swDivTyhoon" v-for="(item, index) in ListISCOMPLETED" :key="index">{{ item.ZJ_TFBH + item.ZJ_TFM }}
      </div>
    </div>
  </div>

  <!--无台风的显示-->
  <div id="noTyphoonTip" style="height:40px;position:absolute;top:150px;left:calc(50% - 180px);width:360px;">
    <div class="noTyphoonTip">
      <div class="swDiv">当前西北太平洋无活跃台风</div>
    </div>
  </div>

  <div class="bm-dynamic-layer" id="one">
    <div class="line"></div>
    <div class="main"></div>
  </div>

  <!-- 右下角 -->

  <div class="typhoonMenu">
    <div class="typhoonMenuItem pointer" id="QX_TUCENG">
      <div class="img box-open"></div>
      <div class="name unactive-name">气象</div>
    </div>

    <div class="typhoonMenuBox">
      <!-- <div class="typhoonMenuItem pointer border" id="QX_SKJY">
        <div title="实况降雨" class="img" style="background-image: url('/images/weilaijiangyu.svg');"></div>
        <div class="name unactive-name">实况降雨</div>
      </div> -->

      <div class="typhoonMenuItem pointer border" id="QX_JY">
        <div title="降水预报" class="img" style="background-image: url('/images/weilaijiangyu.svg');"></div>
        <div class="name unactive-name">降水预报</div>
      </div>
      <div class="typhoonMenuItem pointer border" id="QX_LT">
        <div title="雷达" class="img" style="background-image: url('/images/ld.svg');"></div>
        <div class="name unactive-name">雷达</div>
      </div>
      <!-- <div class="typhoonMenuItem pointer border" id="QX_YT">
        <div title="云图" class="img" style="background-image: url('/images/yt.svg');"></div>
        <div class="name unactive-name">云图</div>
      </div> -->
      <div class="typhoonMenuItem pointer border" id="QX_FC">
        <div title="风场" class="img" style="background-image: url('/images/fc.svg');"></div>
        <div class="name unactive-name">风场</div>
      </div>
    </div>

    <div class="menu_rainFall_content">
      <div class="menu_rainFall_type">
        <el-radio-group v-model="rbl">
          <el-radio @click="TypeeChangerbl('24')" v-model="rbl" label="24">24小时</el-radio>
          <el-radio @click="TypeeChangerbl('48')" v-model="rbl" label="48">48小时</el-radio>
          <el-radio @click="TypeeChangerbl('72')" v-model="rbl" label="72">72小时</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>

  <!--进度播放条-->
  <div class="bofang" style="z-index: 9991;display:none;">
    <div class="wxyt_ft" style="left: calc(50% - 28rem);bottom:20px;background: rgb(49 59 64 / 60%) 60% !important;">
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


  <div class="leftBottom">
    <span id="tmRader"></span>
    <span id="tmRain"></span>
    <span id="tmWind"></span>
  </div>

  <!--最新台风距离苏州多远-->
  <div class="leftMenu">
    <div id="selectDataleftXS" style="color:white;">

    </div>
  </div>
</template>



<script setup>
import {
  ref,
  onMounted,
  onUnmounted
} from "vue";
import dayjs from "dayjs";
import * as myTyphoonMark from "@/utils/ArcGis/myTyphoon.js";
import $ from "jquery";
import { VideoPlay, VideoPause } from "@element-plus/icons-vue";
import * as apiqixiang from "@/api/qixiang/qixiangapi.js";
import TableTyphoon from "@/components/menu/Typhoon/TableTyphoon.vue";
import { convertToDate } from "@/api/dateUtil.js";
import axios from "axios";
import { getGeojson } from "@/api/Common/api";
import { GetJosns, groupBy, SetNull, sortObjectArray } from "@/api/ComUnit";
import { dyCenter, destroy, globallevel, globalalign, map, labels, setLayerToolTip, addAreaLineQS, removeEntityByName } from "@/utils/ArcGis/MapComm.js";
import { useStore } from "vuex";
import { distance } from "@turf/turf";

const store = useStore();
const { viewer } = store.state;

var myData = [];
const ListISCOMPLETED = ref({});
function WQTab() {
  $("#cesiumContainer_myMapImg").hide();
  try {
    var ImageCNNote = map.getLayer("ImageCNNote");
    ImageCNNote.setVisibility(true);
  } catch (error) { }
  clearALL();
}
var nylColor = [
  { color: "#7B0100", max: 50, min: 0 },
  { color: "#FA3FF9", max: 100, min: 50 },
  { color: "#0000F9", max: 150, min: 100 },
  { color: "#3DBDF9", max: 250, min: 150 },
  { color: "#007E00", max: 500, min: 250 },
  { color: "#A5F38E", max: 99999, min: 500 }
];

defineProps({
  size: {
    type: String,
    default: "30px"
  },
  color: {
    type: String,
    default: "#fff"
  }
});

const rbl = ref(null);
var CurrentLayerVal = ref("");
onMounted(() => {
  // var xdis = (getDistance(115.9035, 27.55755, 115.9035+0.03098, 27.55755)/1000).toFixed(1);
  // var ydis = (getDistance(115.9035, 27.55755, 115.9035, 27.55755+0.026963)/1000).toFixed(1);
  // alert('xdis:'+xdis+"，ydis:"+ydis);

  $("#tabTyphoon").addClass("swDivSelect swDiv");
  $("#m_shikZT").addClass("z-crtitem z-crt wow slideInUp link-item");
  CurrentLayerVal.value = localStorage.getItem("CurrentLayer");
  WQTab();
  window.curDataRefresh();
  myTyphoonMark.drawWarningLineLayer();

  $(".typhoonMenuItem").click(function (res) {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).find(".name").removeClass('active-name');
      $(this).find(".name").addClass('unactive-name');
      var imgUrl = $(this).find(".img").css('background-image').replace("_hover.svg", ".svg");
      $(this).find(".img").css('background-image', imgUrl);
      if ($(this).attr("id") == "QX_LT") {
        addleftBottomLabel("tmRader", "");
        // myTyphoonMark.clearRaderPhotoImage();
        // 假设你要移除的图层ID是'myCustomLayerId'
        $(".bofang").hide();
        stopCount();//暂停播放
        var layerIdToRemove = 'LDRaderPhoto';
        myTyphoonMark.removeImageryLayerById(layerIdToRemove);
        updateTuliObj(".tuli-photo-ld", "none");
      }
      else if ($(this).attr("id") == "QX_YT") {
        addleftBottomLabel("tmRader", "");
        // myTyphoonMark.clearRaderPhotoImage();
        var layerIdToRemove = 'addMapRaderPhoto';
        myTyphoonMark.removeImageryLayerById(layerIdToRemove)
      }
      else if ($(this).attr("id") == "QX_FC") {
        
        $("#windycanvas").remove();
      }
      else if ($(this).attr("id") == "QX_SKJY") {
        
      }
      else if ($(this).attr("id") == "QX_JY") {
        addleftBottomLabel("tmRain", tmRain);
        GetDrpTen("QX_JYHidden");
        myTyphoonMark.clearTaiFengPolygon();
        updateTuliObj(".tuli-photo-js", "none");
      }
      else if ($(this).attr("id") == "QX_TUCENG") {
        GetDrpTen("QX_JYHidden");
        if ($(".typhoonMenuBox").css("opacity") == 1) {
          $(".typhoonMenuBox")
            .stop()
            .show()
            .animate(
              {
                width: 0,
                opacity: 0
              },
              400
            );
        }
      }
    } else {
      $(this).addClass('active');
      $(this).find(".name").removeClass('unactive-name');
      $(this).find(".name").addClass('active-name');
      var imgUrl = $(this).find(".img").css('background-image').replace(".svg", "_hover.svg");
      $(this).find(".img").css('background-image', imgUrl);
      if ($(this).attr("id") != undefined) {
        GetDrpTen($(this).attr("id"));
      }
    }
  });

  $("#play_btn").off('click');
  $("#play_btn").click(function () {
    stopCount();
  });
  $("#play_btn1").off('click');
  $("#play_btn1").click(function () {
    var dis = $(this).css("display");
    if (dis == "none") {
      $(this).css("display", "block");
      $("#play_btn").css("display", "none");
    } else {
      $(this).css("display", "none");
      $("#play_btn").css("display", "block");
    }
    var total = $.data(myData, "LDData").length;
    if (ImgIndex >= total - 1
    ) {
      ImgIndex = 0;
    }
    startCount();
  });
});
function drpRaderImg() {
  var colorList = [];
  colorList.push({ "min": 0, "max": 2.5, "color": "217,249,209,255" });
  colorList.push({ "min": 2.5, "max": 5, "color": "184,245,168,255" });
  colorList.push({ "min": 5, "max": 10, "color": "116,216,108,255" });
  colorList.push({ "min": 10, "max": 25, "color": "64,183,64,255" });
  colorList.push({ "min": 25, "max": 50, "color": "98,183,252,255" });
  colorList.push({ "min": 50, "max": 100, "color": "0,0,254,255" });
  colorList.push({ "min": 100, "max": 9999, "color": "250,0,251,255" });
  var geoJsonUrl = "/json/20240813130000.geojson";
  // geoJsonUrl="/json/20240813131800.geojson";
  getGeojson(geoJsonUrl).then((res) => {
    var strJson = res.res.features;
    var listJson = [];
    if (strJson.length > 0) {
      for (var num = 0; num < strJson.length; num++) {
        var item = strJson[num];
        // listJson.push(item["geometry"]["x"]);
        // listJson.push(item["geometry"]["y"]);
        var strWhere = {};
        strWhere["lgtd"] = item["geometry"]["x"];
        strWhere["lttd"] = item["geometry"]["y"];
        strWhere["drp"] = item["attributes"]["drp"];
        var oneDrpList = colorList.filter(function (evt) {
          return Number(strWhere["drp"]) >= evt["min"] && Number(strWhere["drp"]) < evt["max"]
        })

        if (oneDrpList.length > 0) {
          strWhere["color"] = oneDrpList[0]["color"];
        }
        listJson.push(strWhere);
      }
    }
    let heatData = [];
    if (listJson.length > 0) {
      heatData = listJson.map((item) => {
        return {
          x: item.lgtd,
          y: item.lttd,
          value: item.drp
        };
      });
    }


    let colorRLTList = [];
    colorRLTList.push({ "min": 0, "max": 2, "color": "#B9F4A9" })
    colorRLTList.push({ "min": 2, "max": 4, "color": "#70DA6E" })
    colorRLTList.push({ "min": 4, "max": 6, "color": "#3EB93F" })
    colorRLTList.push({ "min": 6, "max": 8, "color": "#60B9FF" })
    colorRLTList.push({ "min": 8, "max": 10, "color": "#0000FD" })
    colorRLTList.push({ "min": 10, "max": 9999, "color": "#FF00FA" })
    let maxdrp = Math.max(...heatData.map(obj => obj.value));
    maxdrp = maxdrp * 30
    
  })
}
//自动刷新
var interValWQ;
window.curDataRefresh = function () {
  if (interValWQ != null) {
    clearInterval(interValWQ);
  }
  if ($("#DataRefresh").prop("checked") == true) {
    interValWQ = setInterval(function () {
      refreshData();
    }, 180000); //180000
  }
};

//刷新的方法
function refreshData() {
  var _curDataRefresh = localStorage.getItem("curDataRefresh");
  if (_curDataRefresh == true || _curDataRefresh == "true") {
    WQTab();
  } else {
    if (interValWQ != null && interValWQ != undefined) {
      clearInterval(interValWQ);
    }
  }
}
onUnmounted(() => {
  $(".light").parent().remove();
  if (interValWQ != null) {
    clearInterval(interValWQ);
  }
  if (tLt != null) {
    clearInterval(tLt);
  }
  
  try {
    var ImageCNNote = map.getLayer("ImageCNNote");
    ImageCNNote.setVisibility(false);
  } catch (error) { }

  addAreaLineQS();
});
const LDSTime = ref([]);
const LDETime = ref([]);
const curTHBH = ref("");
const curTHBHBBJ = ref("202413");

var strHtml = '';
var strHtmlLabel = ref("");
var distanceTF = ref([]);
function bindData(data, iscomObj) {
  myTyphoonMark.GetTyphoonLSLJData(data, iscomObj);
  if (data[0].forecast != undefined) {
    //画（预报台）台风路线
    myTyphoonMark.GetResultTFLX_YBS(data[0].forecast);
  }
  // 获取第一条数据
  LDETime.value = data[0].points[0];
  // 获取最后一条数据
  LDSTime.value = (data[0].points).slice(-1)[0];
  curTHBH.value = data[0].tfbh;

  LDETime.value.RQSJ2 = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  LDSTime.value.RQSJ2 = dayjs(dayjs(LDETime.value.RQSJ2).format("YYYY-MM-DD HH:mm:ss")).add(-2, "hour").format("YYYY-MM-DD HH:mm:ss");
  if (data[0].tfbh == curTHBHBBJ.value) {
    LDSTime.value.RQSJ2 = "2024-09-10 20:00:00";
    LDETime.value.RQSJ2 = "2024-09-11 08:00:00";
  }
  if ($('#QX_LT').hasClass('active')) {//雷达选中的情况
    stopCount();//暂停播放
    var layerIdToRemove = 'LDRaderPhoto';
    myTyphoonMark.removeImageryLayerById(layerIdToRemove);
    loadLDRader();
  }

  var tfListDataCom = ListISCOMPLETED.value.filter(function (res) {
    return data[0].tfbh == res.ZJ_TFBH;
  });
  if (tfListDataCom.length > 0) {
    if (distanceTF.value.indexOf(data[0].tfbh) > -1) {
      return;
    }
    //最新的台风路径点与苏州相差距离
    var wxLGTD = 120.81974, wxLTTD = 31.383959;
    var LGTD = data[0].points[0].JD, LTTD = data[0].points[0].WD;
    var dis = (getDistance(wxLGTD, wxLTTD, LGTD, LTTD) / 1000).toFixed(1);


    const from = [wxLGTD, wxLTTD]; // [经度, 纬度]
    const to = [LGTD, LTTD];

    dis = distance(from, to, { units: 'kilometers' }).toFixed(1);
    strHtmlLabel.value += "<div style='height: 40px;border: 1px solid #06f8fb;line-height: 40px;padding: 0px 10px;font-size: 16px;border-radius: 5px;margin-top: 15px;background: var(--tuli-bg);'>" + data[0].name + "现离苏州：<span style='color: #00fcff;font-weight:bold;'>" + dis + "</span> 公里</div>";

    $("#selectDataleftXS").html(strHtmlLabel.value);
    distanceTF.value.push(data[0].tfbh);
  }
}

function getDistance(lat1, lng1, lat2, lng2) {
  lat1 = lat1 || 0;
  lng1 = lng1 || 0;
  lat2 = lat2 || 0;
  lng2 = lng2 || 0;

  var rad1 = lat1 * Math.PI / 180.0;
  var rad2 = lat2 * Math.PI / 180.0;
  var a = rad1 - rad2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var r = 6378137;
  var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));

  return distance;
}

function clearALL() {
  removeEntityByName();
}
const parentMethod = res => {
  showTyhoonTip(res);
};

const parentMethodPoint = (res, isCancle, iscomObj) => {
  if (isCancle == true) {
    bindData(res, iscomObj);
  } else {
    myTyphoonMark.clearTaiFeng(isCancle);
  }
};

const parentMethodPointStart = res => {
};
function showTyhoonTip(data) {
  //只要当前无台风信息出现过，就一直显示无台风,主要是防止切年份时再次更新内容
  var ZJ_ISCOMPLETED = 0;
  var tfbhStr = "";
  var tfname = "";
  var tfListData = data.filter(function (res) {
    var tfbh = res.ZJ_TFBH;
    var tfnm = res.ZJ_TFM;
    var tfnme = res.ZJ_TFME;
    var iscom = res.ZJ_ISCOMPLETED;
    if (iscom == 1 || iscom == "1") {
      ZJ_ISCOMPLETED = iscom;
      tfbhStr += tfbh + ",";
      tfname += '<div class="swDivTyhoon">' + tfbh + tfnm + "</div>";
    }
    return iscom == 1 || iscom == "1";
  });
  ListISCOMPLETED.value = tfListData;
  var noTyphoonTipShow = $("#noTyphoonTip").css("display");
  //if (noTyphoonTipShow == "none") {
  if (ZJ_ISCOMPLETED == 0) {
    var sqTopToggleShow = $("#sqTopToggle").css("display");
    if (sqTopToggleShow == "none") {
      $("#noTyphoonTip").show();
    }
  } else {
    $("#noTyphoonTip").hide();
    $.data(myData, "TFBH", tfListData[0].ZJ_TFBH);
    $("#sqTopToggle").show();
    var tfbhStrArr = tfbhStr.split(",");
    var leftWidth = (tfbhStrArr.length * 220 + tfbhStrArr.length * 10) / 2;
    $("#sqTopToggle").css("left", "calc(50% - " + leftWidth + "px)");
    $(".leftHeadMenu").show();
    // $("#sqTopToggle .shdswDiv").html(tfname);
  }
  //}
}
var tLt;
var ImgHour = 200; //播放频率
function startCount() {
  tLt = setInterval(function () { TimeShowYT(); }, ImgHour);
}
function stopCount() {
  $("#play_btn").hide();
  $("#play_btn1").show();
  if (tLt) {
    clearInterval(tLt);
  }
}
function TimeShowYT() {
  var total = $.data(myData, "LDData").length;
  ImgIndex = ImgIndex + 1;
  if (ImgIndex >= total - 1) {
    ImgIndex = 0;
    stopCount();
  } else {
    selectRowLD(ImgIndex);
  }
}
var PicUrl = "/xishanyuntu/weather/";//
// PicUrl = "http://172.17.50.19:8141/yuntu/weather/";
var slide_btn_len = 540;
var ImgIndex = 0;
function fetchDataParent(type, obj) {
  if (type == "QX_JY") {
    fetchData(obj);
  } else if (type == "QX_YT") {
    // //云图
    $.data(myData, "YTData", obj);
    // // $(".bofang").show();
    // $("#sld").html("");
    // var strHtml = "<ul>";
    // for (var num = 0; num < obj.length; num++) {
    //   strHtml +=
    //     "<li id='img" +
    //     (num + 1) +
    //     "' style='width:" +
    //     100 / obj.length +
    //     "%;'>&nbsp;</li>";
    // }
    // strHtml += "</ul>";
    // $("#sld").html(strHtml);
    ImgIndex = obj.length - 1; //图片播放的当前数量
    selectRow(ImgIndex);
  }
}
function selectRow(index) {
  var data = $.data(myData, "YTData").reverse();
  var total = data.length - 1; //grid.data.length;
  var oneLen = slide_btn_len / total;
  $("#slide_btn").css("left", index * oneLen);
  $("#slide_cur").css("width", index * oneLen);
  var ZJ_DATE = convertToDate(data[index].ZJ_DATE);
  ZJ_DATE = dayjs(ZJ_DATE).format("D日H时m分");
  addleftBottomLabel("tmRader", "雷达图：" + ZJ_DATE);
  var ZJ_PIC = data[index].ZJ_PIC;
  var Rainfall = PicUrl + "LDTP/" + ZJ_PIC;
  var Points = {
    xmin: 73.505453,
    ymin: 11.005334,
    xmax: 135.047328,
    ymax: 55.948068
  };
  // myTyphoonMark.fetchImageAsBase64(Points, Rainfall);
  myTyphoonMark.addMapRaderPhoto(Points, Rainfall);
}
function fetchData(hour) {
  myTyphoonMark.clearTaiFengPolygon();
  var newDateStr = Number(dayjs(new Date()).format("YYYYMMDDHHmmss"));
  axios
    .get(
      "http://typhoon.nmc.cn/weatherservice/diamond14/rainfall/" +
      hour +
      ".json?t=" +
      newDateStr +
      "&callback=diamond14_rainfall_" +
      hour +
      "_json",
      {
        responseType: "JSONP"
      }
    )
    .then(response => {
      // this.data = response.data;
      const data = response.data;
      const regex = /\((.*?)\)/g;
      data.replace(regex, (match, content) => {
        const contentJsn = JSON.parse(content);
        var tmRain = contentJsn.date.dayOfMonth + "日" + contentJsn.date.hour + "时发布";
        tmRain = hour + "小时降水预报: " + tmRain;
        addleftBottomLabel("tmRain", tmRain);
        const contours = contentJsn.contours;
        if (contours.length > 0) {
          myTyphoonMark.addZYQXTJYYB(contours);
        }
      });
    })
    .catch(error => {
      // this.error = error;
      console.error(error);
    });
}

function GetDrpTen(obj) {
  if (obj == "QX_FC") {
    var reqPath = "/typhoon/atfxx/getCountryJSON";
    // reqPath="http://www.81typhoon.com/atfxx/getCountryJSON";
    var settings = {
      "url": reqPath,
      "method": "POST",
      "data": {
        "ybjg": "GFS",
        "forecastType": "W",
        "startTime": dayjs(new Date()).format("YYYY-MM-DD HH:00")
      }
    };
    $.ajax(settings).done(function (response) {
      if (SetNull(response["ret"]) != "") {
        var result = JSON.parse(response["ret"]);
        
      }


    })

  }
  else if (obj == "QX_SKJY") {
    drpRaderImg();
  }
  else if (obj == "QX_LT") {
    updateTuliObj(".tuli-photo-ld", "block");
    loadLDRader();
  }
  else if (obj == "QX_YT") {
    loadRader();
  } else if (obj == "QX_TUCENG") {
    if ($(".typhoonMenuBox").css("opacity") == 0) {
      $(".typhoonMenuBox")
        .stop()
        .show()
        .animate(
          {
            width: 195,
            opacity: 1
          },
          400
        );
    }
  } else if (obj == "QX_JY") {
    if ($(".menu_rainFall_content").css("opacity") == 0) {
      $(".menu_rainFall_content")
        .stop()
        .show()
        .animate(
          {
            width: 240,
            opacity: 1,
            right: 20
          },
          400
        );
    }
  } else if (obj == "QX_JYHidden") {
    if ($(".menu_rainFall_content").css("opacity") == 1) {
      $(".menu_rainFall_content")
        .stop()
        .show()
        .animate(
          {
            width: 0,
            opacity: 0
          },
          400
        );
    }
  }
}
function TypeeChangerbl(value) {
  updateTuliObj(".tuli-photo-js", "block");
  rbl.value = value;
  fetchDataParent("QX_JY", rbl.value);
}
function loadLDRader() {
  var STIME = dayjs(convertToDate(LDSTime.value.RQSJ2)).format("YYYY-MM-DD HH:mm:ss");
  var ETIME = dayjs(convertToDate(LDETime.value.RQSJ2)).format("YYYY-MM-DD HH:mm:ss")
  if (LDSTime.value.RQSJ2 == undefined) {
    ETIME = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    STIME = dayjs(dayjs(ETIME).format("YYYY-MM-DD HH:mm:ss")).add(-2, "hour").format("YYYY-MM-DD HH:mm:ss");
  }
  var postParam = {
    "STIME": STIME,
    "ETIME": ETIME,
    "ZJ_TYPE": "雷达叠加图",
    "ZJ_CITY": "全国" //ZJ_CITY： 青浦、南通、湖州、泰州
  }
  if (curTHBH.value == curTHBHBBJ.value) {
    postParam["ZJ_CITY"] = "南通";
  }
  apiqixiang.TFPICWeacontent(postParam).then(res => {
    JosnSel(res, "WATER_WX_ZJ_TFPICSel");
  });
}
function JosnSel(data, typeID) {
  if (typeID == "WATER_WX_ZJ_TFPICSel") { //雷达 
    if (data.data.length > 0) {
      var obj = sortObjectArray(data.data, ["ZJ_DATE"], "asc");
      $.data(myData, "LDData", obj);


      var total = obj.length - 1; //grid.data.length;
      var oneLen = slide_btn_len / total;
      $("#slide_btn").css("left", (obj.length - 1) * oneLen);
      $("#slide_cur").css("width", (obj.length - 1) * oneLen);


      $(".bofang").show();
      $("#sld").html("");
      var strHtml = "<ul>";
      for (var num = 0; num < obj.length; num++) {
        var ZJ_DATE = convertToDate(obj[num].ZJ_DATE);
        ZJ_DATE = dayjs(ZJ_DATE).format("D日H时m分");
        strHtml +=
          "<li id='img" +
          (num + 1) +
          "' style='width:" +
          100 / obj.length +
          "%;' onclick='ImgBtn(" + (num) + ")'>&nbsp;</li>";

        var ZJ_PIC = obj[num].ZJ_PIC;
        var Rainfall = PicUrl + "LDTP/" + ZJ_PIC;
        if (curTHBH.value == curTHBHBBJ.value) {
          Rainfall = "/UploadDoc/LDTP/" + ZJ_PIC;
        }
        var Points = { xmin: 115.970693, ymin: 28.035787, xmax: 125.929799, ymax: 36.287081 };
        if (curTHBH.value != curTHBHBBJ.value) {
          Points = { xmin: 73.505453, ymin: 11.005334, xmax: 135.047328, ymax: 55.948068 };//全国雷达图
        }
        var imgAlpha = 0.0;
        if (num == obj.length - 1) {
          imgAlpha = 0.6;
          addleftBottomLabel("tmRader", "雷达图：" + ZJ_DATE);
        }
        myTyphoonMark.addMapRaderPhoto(Points, Rainfall, imgAlpha, num);
      }
      strHtml += "</ul>";
      $("#sld").html(strHtml);
      ImgIndex = obj.length - 1; //图片播放的当前数量
      // selectRowLD(ImgIndex);
    }
  }
}
window.ImgBtn = function (index) {
  selectRowLD(index - 1);
}
function selectRowLD(index) {
  index = index + 1;
  var data = $.data(myData, "LDData");//.reverse();
  var total = data.length - 1; //grid.data.length;
  var oneLen = slide_btn_len / total;
  $("#slide_btn").css("left", index * oneLen);
  $("#slide_cur").css("width", index * oneLen);
  var ZJ_DATE = convertToDate(data[index].ZJ_DATE);
  ZJ_DATE = dayjs(ZJ_DATE).format("D日H时m分");
  addleftBottomLabel("tmRader", "雷达图：" + ZJ_DATE);
  // const imageryLayers = viewer.imageryLayers;
  // if (index > 1) {
  //   imageryLayers.get(index - 1).alpha = 0;
  // }
  // else {
  //   if (index == 1) {
  //     imageryLayers.get(data.length).alpha = 0;
  //   }
  // }
  // imageryLayers.get(index).alpha = 1;
  var Points = { xmin: 115.970693, ymin: 28.035787, xmax: 125.929799, ymax: 36.287081 };
  if (curTHBH.value != curTHBHBBJ.value) {
    Points = { xmin: 73.505453, ymin: 11.005334, xmax: 135.047328, ymax: 55.948068 };//全国雷达图
  }
  var ZJ_PIC = data[index].ZJ_PIC;
  var Rainfall = PicUrl + "LDTP/" + ZJ_PIC;
  myTyphoonMark.addMapRaderPhoto(Points, Rainfall, 0.6, index);
}
function loadRader() {
  // var now = new Date();
  // var StartDate = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
  //   .add(-3, "hour")
  //   .format("YYYY-MM-DD HH:mm:ss");
  // var EndDate = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  // var postParam = {
  //   STIME: StartDate, //new Date(addDayDate(new Date().format('yyyy-MM-dd'), -1)).format('yyyy-MM-dd'),
  //   ETIME: EndDate,
  //   ZJ_TYPE: "雷达叠加图",
  //   ZJ_CITY: "全国"
  // };
  // apiqixiang.TFPICWeacontent(postParam).then(res => {
  //     // console.error('loadRader',res);
  //     fetchDataParent("QX_YT", res.data);
  // });
  // GetJosns("http://www.81typhoon.com/atfxx/getRadar",{},"",true,function(res){
  //   console.error("res",res)
  // })
}
function parentMethodshowDynamicLayer(item) {
  myTyphoonMark.showDynamicLayerMethod(item);
}
function closeTuli(type) {
  if (type == "hide") {
    $(".tuli").hide();
    // $(".tuli-photo").hide();
    // $(".tuliTitleButton").show();
  }
  else {
    $(".tuli").show();
    // $(".tuli-photo").show();
    // $(".tuliTitleButton").hide();
  }
}
function addleftBottomLabel(obj, htmllabel) {
  $("#" + obj).html(htmllabel);
  if ($(".leftBottom").text() == "") {
    $(".leftBottom").hide();
  } else {
    if ($(".leftBottom").css("display") == "none") {
      $(".leftBottom").show();
    }
  }
}
function updateTuliObj(obj, dis) {
  $(obj).css("display", dis);
  var tuliHeight = Number($(".tuli-photo").css("height").replace("px", ""));
  $(".tuli").css("bottom", tuliHeight + 20 + "px");
}
</script> 
<style scoped>
@import "@/assets/styles/style.css";
@import '@/assets/styles/radar_pt_index.css';
@import '@/assets/styles/qixiang.css';

.tuli {
  width: 185px;
  height: 200px;
  color: white;
  font-size: 12px;
  font-size: 0.15rem;
  padding: 0px 5px;
  cursor: pointer;
  position: absolute;
  border-radius: 8px;
  /* bottom: 150px; */
  bottom: 10px;
  height: auto !important;
  left: 10px;
  padding: 0px 10px !important;
  z-index: 2;
  font-size: 14px;
  background: var(--tuli-bg);
}

.tuli-photo {
  width: auto;
  height: auto;
  color: white;
  font-size: 12px;
  font-size: 0.15rem;
  padding: 0px 5px;
  cursor: pointer;
  position: absolute;
  border-radius: 8px;
  bottom: 10px;
  height: auto !important;
  left: 10px;
  padding: 0px 10px !important;
  z-index: 2;
  font-size: 14px;
  background: var(--tuli-bg);
}

.tuli-photo ul {
  clear: both;
}

.tuli-photo ul li {
  list-style: none;
  float: left;
}

.tuli-photo-ld,
.tuli-photo-js {
  clear: both;
  display: none;
}

.colorSpan {
  display: inline-block;
  width: 27px;
  height: 14px;
  /* margin: 0px 5px; */
  line-height: 12px;
  vertical-align: -2px;
}

.colorSpanSmall {
  display: inline-block;
  width: 20px;
  height: 14px;
  /* margin: 0px 5px; */
  line-height: 12px;
  vertical-align: -2px;
}

.colorL p {
  line-height: 16px;
  margin-bottom: 5px;
}

.colorSpanValue {
  margin-top: 7px;
  font-size: 13px;
  vertical-align: 2px;
}

.popModel {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  /* opacity: 0.5; */
  transition: all 1s;
  display: none;
  z-index: 999;
}

.popupContent {
  width: 900px;
  height: 700px;
  overflow-y: hidden;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* border: 10px solid #fff; */
  background: var(--el-table-bg-colornew);
}

.popupContent>.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  background: var(--popContentHeadbg);
  height: 56px;
  margin: 0px 0px 15px 0px;
}

.popupContent>.head span {
  font-weight: bold;
  font-size: 18px;
  /* color: #21a6ff;
  background: linear-gradient(90deg, #3be1f6 0%, #21a6ff 100%); */
  width: 100%;
  background: #ffffff;
  text-align: center;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.popupContent>.head img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  cursor: pointer;
  margin-right: 10px;
}

.shdswDiv {
  margin: 0px auto;
}

.swDivTyhoon {
  text-align: center;
  margin: 0px auto;
  width: 220px !important;
  height: 45px;
  line-height: 45px;
  /*margin-top: 10px;
    margin-right: 10px;*/
  /*float: left;*/
  background: url(/images/wxz_portal.png) no-repeat left center;
  background-size: 100%;
  /*background-color: #0995cc;*/
  color: white;
  font-size: 20px;
  font-weight: bold;
  float: left;
  margin-left: 10px;
}

.swDiv2 {
  text-align: center;
  width: 257px;
  height: 45px;
  line-height: 45px;
  /*margin-top: 10px;
    margin-right: 10px;*/
  /*float: left;*/
  background: url(/images/wxz_portal.png) no-repeat left center;
  background-size: 100%;
  /*background-color: #0995cc;*/
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 150px !important;
  height: 90px !important;
  margin-top: 10px;
  margin-right: 15px;
  float: left;
  background: url(/images/title_kuang.png) no-repeat left center !important;
  background-size: 100% 100% !important;
  font-size: 15px !important;
  line-height: 35px !important;
  font-weight: normal !important;
}

.swDiv2>p>span {
  font-family: electronicFont;
  font-size: 40px;
  /*font-weight: bold;*/
}

.noTyphoonTip .swDiv {
  text-align: center;
  width: 257px;
  height: 45px;
  line-height: 45px;
  /*margin-top: 10px;
    margin-right: 10px;*/
  /*float: left;*/
  background: url(/images/wxz_portal.png) no-repeat left center;
  background-size: 100%;
  /*background-color: #0995cc;*/
  color: white;
  font-size: 20px;
  font-weight: bold;
  background: none !important;
  font-size: 1.875rem;
  text-shadow: rgb(237, 234, 234) 1px 0px 0px, rgb(237, 234, 234) 0px 1px 0px,
    rgb(237, 234, 234) -1px 0px 0px, rgb(237, 234, 234) 0px -1px 0px;
  color: rgb(186, 62, 83);
  width: 360px;
  font-weight: 500;
}

.bm-dynamic-layer {
  /*重要*/
  display: none;
  user-select: none;
  /*禁止选中*/
  pointer-events: none;
  /*鼠标穿透*/
  /*重要*/
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  min-height: 250px;
  z-index: 9999;
}

.bm-dynamic-layer .line {
  position: absolute;
  left: 0;
  width: 50px;
  height: 100px;
  bottom: 0;
  background: url("/images/line.png");
  border: 0px;
}

.bm-dynamic-layer .main {
  font-size: 14px;
  display: none;
  position: absolute;
  top: 0;
  left: 50px;
  right: 0;
  bottom: 100px;
  background: url("/images/layer_border.png") no-repeat;
  background-size: 100% 100%;
  color: white;
  padding: 20px 5px 5px 10px;
  height: calc(100% - 80px);
  width: auto;
}

.bm-dynamic-layer .light {
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
}

.bmgl-widget-credits {
  display: none;
}

.typhoonMenu {
  position: absolute;
  right: 28.5rem;
  bottom: 10px;
  /* height: 40px; */
  padding-top: 10px;
  /* display: none; */
}

.typhoonMenuItem {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-width: 65px;
  height: 65px;
  background-color: var(--typhoonMenuItem-bg);
  border: 1px solid rgba(0, 255, 246, 0.15);
  border-radius: 5px;
  float: left;
}

.typhoonMenuItem .img {
  width: 26px;
  height: 26px;
  background-size: 100%;
  background-repeat: no-repeat;
}

.box-open {
  background-image: url(/images/close.svg);
}

.typhoonMenuItem .unactive-name {
  color: #00fff6;
}

.typhoonMenuItem .active-name {
  color: #ffe04f;
}

.typhoonMenuBox {
  position: absolute;
  left: 0;
  top: 10px;
  -webkit-transform: translate(-100%);
  transform: translate(-100%);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  -webkit-box-shadow: 0 0 5px 0 #00fff6;
  box-shadow: 0 0 5px 0 #00fff6;
  overflow: hidden;
  opacity: 1;
}

.typhoonMenuBox .border {
  border-right: 1px solid rgba(0, 255, 246, 0.4);
}

.pointer {
  cursor: pointer;
}

.active {
  color: #ffe04f;
}

.menu_rainFall_content {
  display: none;
  position: absolute;
  width: 240px;
  top: -42px;
  right: 20px;
  font-family: "微软雅黑";
  padding: 10px 5px 10px 5px;
  z-index: 99;
  background: var(--portal);
  opacity: 0;
  border-radius: 5px;
}

.menu_rainFall_type {
  /* padding-top:5px; */
}

.leftBottom {
  position: absolute;
  left: 315px;
  bottom: 10px;
  background: rgba(0, 0, 0, 0.2);
  color: #00fff6;
  display: none;
}

.leftBottom span {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
}

.tuliTitleButton {
  width: 50px;
  height: 25px;
  cursor: pointer;
  border-radius: 3px;
  color: white;
  line-height: 25px;
  text-align: center;
  display: none;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 10px;
  bottom: 10px;
  border: 1px solid #2582a2;
  cursor: pointer;
}

.leftMenu {
  position: absolute;
  top: 110px;
  left: 5px;
  /*width: 175px;*/
  height: auto;
  z-index: 9999;
  /*background: rgba(3,76,106, 0.65);*/
  /*background: url(../images/boxallback.png);*/
  /* opacity: 0.6; */
  border-radius: 5px;
  padding: 5px 0px 10px 0px;
}

.leftMenu .leftMenuMain {
  width: 82%;
  height: 92%;
  /*background: rgba(3,76,106, 0.85);*/
  color: white;
  font-size: 16px;
  margin: 3% 9%;
  border-radius: 5px;
}

.leftMenu .leftMenuMain ul li {
  background: white;
  height: 30px;
  width: 140px;
  border-radius: 100px;
  margin-top: 10px;
  cursor: pointer;
}

.leftMenu .leftMenuMain .active {
  background: #FFF3CF;
  display: block;
  color: black;
}

.leftMenu .leftMenuMain .active span {
  color: black;
}

.leftMenu .leftMenuMain ul li span {
  padding-left: 10px;
  color: gray;
  vertical-align: 5px;
}

.leftMenu .leftMenuMain ul li img {
  padding-left: 10px;
  padding-top: 5px;
}

.juliDiv {
  height: 40px;
  border: 1px solid #06f8fb;
  line-height: 40px;
  padding: 0px 10px;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 15px;
}

.juliDiv span {
  color: #00fcff;
  font-weight: bold;
}

#typhoonLabelName {
  background: black;
}
</style> 