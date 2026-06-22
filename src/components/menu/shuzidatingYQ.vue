<template>
  <!-- 左侧tab切换 -->
  <!-- 侧边栏 -->
  <aside class="aside">
    <tabToggleSQ />
  </aside>
  <!-- 左侧 -->
  <div class="g-lside">
    <!-- 面雨量时段统计 -->
    <div style="width: 100%">
      <EchartYQAreaTJ :typenameRadio="typenameRadio" :key="datekeyAll" />
    </div>
    <!-- 片区最大降雨量 -->
    <div style="width: 100%">
      <EchartQZDrpTable :typenameRadio="typenameRadio" :key="datekeyAll" />
    </div>    
    <!-- 面雨量小时过程 -->
    <div style="width: 100%">
      <EchartQZDrpAreaGC :typenameRadio="typenameRadio" :key="datekeyAll" />
    </div>    
  </div>
  <!-- 右侧 -->
  <div class="g-rside">   
    <!-- 分区雨量 -->
    <div style="width: 100%">
      <EchartQZDrpArea :typenameRadio="typenameRadio" :key="datekeyAll" />
    </div>
    <!-- <div style="width: 100%">
      <EchartQZDrpAreaMonth :typenameRadio="typenameRadio" :key="datekeyAll" />
    </div>
    <div style="width: 100%">
      <DrpTablePX :typenameRadio="typenameRadio" :key="datekeyAll" />
    </div> -->
    <!-- 雨情分析 -->
    <div style="width: 100%">
      <TableYQJC :typenameRadio="typenameRadio" :key="datekeyAll" :strJsonData="strJsonData" :stime="stime" :etime="etime" @parentMethodshowDynamicLayers="parentMethodshowDynamicLayer"/>
    </div>
  </div>
  <!-- 图例 -->
  <div class="tuli">
    <div>
      <el-switch
        class="switch-xs iconMarker"
        @click="SpanItem('riverMarker')"
        v-model="riverMarker"
      />
      <span style="vertical-align: -10px; margin-left: 50px"> 标注</span>
    </div>
    <div>
      <el-switch
        class="switch-xs"
        @click="SpanItem('RainDZMMarker')"
        v-model="RainDZMMarker"
      />
      <span style="vertical-align: -10px; margin-left: 50px"> 等值面 </span>
    </div>
    <div style="padding: 8px 10px">
      <div style="color: var(--popupContentTitleColor);">-------站点类型-------</div>
      <div style="height: 25px; line-height: 25px">
        <!-- <input
          style=""
          @click="getTLObj('rainfall0')"
          v-model="rainfall0"
          type="checkbox"
          checked="checked"
        /> -->
        <img
          alt=""
          src="/images/rain/d_white.png"
          style="
            width: 14px;
            height: 18px;
            margin-top: 2px;
            display: inline-block;
          "
        />
        <span style="padding-left: 2px; color: var(--title2);vertical-align: 4px; ">
          防汛站(<span
            id="countFX"
            style="color: var(--popupContentTitleColor); font-size: 14px"
          ></span
          >)
        </span>
      </div>
      <div style="height: 25px; line-height: 25px">
        <!-- <input
          style="vertical-align:2px"
          @click="getTLObj('rainfall0')"
          v-model="rainfall0"
          type="checkbox"
          checked="checked"
        /> -->
        <img
          alt=""
          src="/images/rain/0.png"
          style="
            width: 13px;
            height: 13px;
            display: inline-block;
          "
        />
        <span style="padding-left: 2px; color: var(--title2); vertical-align:2px">
          共享站(<span
            id="countGX"
            style="color: var(--popupContentTitleColor); font-size: 14px"
          ></span
          >)
        </span>
      </div>
      <div style="padding:5px 0px;color: var(--popupContentTitleColor);">-------雨量等级-------</div>
      <div style="height: 25px; line-height: 25px">
        <input
          style=""
          @click="getTLObj('rainfall0')"
          v-model="rainfall0"
          type="checkbox"
          checked="checked"
        />
        <span class="colorSpan" style="background-color:#ffffff"></span>
        <!-- <img
          alt=""
          src="/images/rain/d_white.png"
          style="
            width: 14px;
            height: 18px;
            margin-top: 2px;
            display: inline-block;
          "
        /> -->
        <span style="padding-left: 2px; color: var(--title2); ">
          无雨(<span
            id="value0"
            style="color: var(--popupContentTitleColor); font-size: 14px"
          ></span
          >)
        </span>
      </div>
      <div style="height: 25px; line-height: 25px">
        <input
          style=""
          @click="getTLObj('rainfall0_10')"
          v-model="rainfall0_10"
          type="checkbox"
          checked="checked"
        />
        <span class="colorSpan" style="background-color:#A7F387"></span>
        <!-- <img
          alt=""
          src="/images/rain/d_grey.png"
          style="
            width: 14px;
            height: 18px;
            margin-top: 2px;
            display: inline-block;
          "
        /> -->
        <span style="padding-left: 2px; color: var(--title2); ">
          &lt;10(<span
            id="value0_10"
            style="color: var(--popupContentTitleColor); font-size: 14px"
          ></span
          >)
        </span>
      </div>
      <div style="height: 25px; line-height: 25px">
        <input
          style=""
          @click="getTLObj('rainfall10_25')"
          v-model="rainfall10_25"
          type="checkbox"
          checked="checked"
        />
        <span class="colorSpan" style="background-color:#00FFFF"></span>
        <!-- <img
          alt=""
          src="/images/rain/d_sky.png"
          style="
            width: 14px;
            height: 18px;
            margin-top: 2px;
            display: inline-block;
          "
        /> -->
        <span style="padding-left: 2px; color: var(--title2); ">
          10~25(<span
            id="value10_25"
            style="color: var(--popupContentTitleColor); font-size: 14px"
          ></span
          >)
        </span>
      </div>
      <div style="height: 25px; line-height: 25px">
        <input
          style=""
          @click="getTLObj('rainfall25_50')"
          v-model="rainfall25_50"
          type="checkbox"
          checked="checked"
        />
        <span class="colorSpan" style="background-color:#0000FF"></span>
        <!-- <img
          alt=""
          src="/images/rain/d_blue.png"
          style="
            width: 14px;
            height: 18px;
            margin-top: 2px;
            display: inline-block;
          "
        /> -->
        <span style="padding-left: 2px; color: var(--title2); ">
          25~50(<span
            id="value25_50"
            style="color: var(--popupContentTitleColor); font-size: 14px"
          ></span
          >)
        </span>
      </div>
      <div style="height: 25px; line-height: 25px">
        <input
          style=""
          @click="getTLObj('rainfall50_100')"
          v-model="rainfall50_100"
          type="checkbox"
          checked="checked"
        />
        <span class="colorSpan" style="background-color:#E7D220"></span>
        <!-- <img
          alt=""
          src="/images/rain/d_yellow.png"
          style="
            width: 14px;
            height: 18px;
            margin-top: 2px;
            display: inline-block;
          "
        /> -->
        <span style="padding-left: 2px; color: var(--title2); ">
          50~100(<span
            id="value50_100"
            style="color: var(--popupContentTitleColor); font-size: 14px"
          ></span
          >)
        </span>
      </div>
      <div style="height: 25px; line-height: 25px">
        <input
          style=""
          @click="getTLObj('rainfall100_250')"
          v-model="rainfall100_250"
          type="checkbox"
          checked="checked"
        />
        <span class="colorSpan" style="background-color:#FF0000"></span>
        <!-- <img
          alt=""
          src="/images/rain/d_red.png"
          style="
            width: 14px;
            height: 18px;
            margin-top: 2px;
            display: inline-block;
          "
        /> -->
        <span style="padding-left: 2px; color: var(--title2); ">
          100~200(<span
            id="value100_250"
            style="color: var(--popupContentTitleColor); font-size: 14px"
          ></span
          >)
        </span>
      </div>
      <div style="height: 25px; line-height: 25px">
        <input
          style=""
          @click="getTLObj('rainfall250')"
          v-model="rainfall250"
          type="checkbox"
          checked="checked"
        />
        <span class="colorSpan" style="background-color:#800140"></span>
        <!-- <img
          alt=""
          src="/images/rain/d_black.png"
          style="
            width: 14px;
            height: 18px;
            margin-top: 2px;
            display: inline-block;
          "
        /> -->
        <span style="padding-left: 2px; color: var(--title2); ">
          &gt;200(<span
            id="value250"
            style="color: var(--popupContentTitleColor); font-size: 14px"
          ></span
          >)
        </span>
      </div>
    </div>
  </div>
  <!--左下角搜索-->
  <div class="top-left-icon" @click="opencz()">
    <div class="opencz1" style="left: 0px" title="搜索更多">
      <img
        src="/images/search_Default.png"
        style="width: 24px; height: 24px; margin: 6px 0px"
        alt=""
      />
    </div>
  </div>
  <div class="top-left-icon-menu">
    <div style="width: 100%; height: 40px">
      &nbsp;&nbsp; 时间：&nbsp;
      <input
        id="STIME"
        class="mini-datepicker"
        style="width: 135px"
        format="yyyy-MM-dd HH:mm"
        timeFormat="HH:mm"
        showTime="true"
        showOkButton="true"
        showClearButton="false"
      />&nbsp;&nbsp; -&nbsp;
      <input
        id="ETIME"
        class="mini-datepicker"
        style="width: 135px"
        format="yyyy-MM-dd HH:mm"
        timeFormat="HH:mm"
        showTime="true"
        showOkButton="true"
        showClearButton="false"
      />&nbsp;&nbsp;
      <img
        :src="popupCloseImg"
        class="top-left-icon-menu-close"
        @click="closecz()"
        alt=""
      />
    </div>
    <div style="width: 100%; height: 40px; margin-left: 7px">
      <div class="shdswDiv">
        <div
          @click="changeDay('mapday1')"
          :class="pathName == 'mapday1' && 'swDivSelect'"
          class="swDiv"
        >
          <div class="sel_wrap">
            <label style="font-weight: normal"> 1小时 </label>
          </div>
        </div>
      </div>
      <div class="shdswDiv">
        <div
          @click="changeDay('mapday3')"
          :class="pathName == 'mapday3' && 'swDivSelect'"
          class="swDiv"
        >
          <div class="sel_wrap">
            <label style="font-weight: normal"> 3小时 </label>
          </div>
        </div>
      </div>
      <div class="shdswDiv">
        <div
          @click="changeDay('mapday6')"
          :class="pathName == 'mapday6' && 'swDivSelect'"
          class="swDiv"
        >
          <div class="sel_wrap">
            <label style="font-weight: normal"> 6小时 </label>
          </div>
        </div>
      </div>
      <div class="shdswDiv">
        <div
          @click="changeDay('mapday12')"
          :class="pathName == 'mapday12' && 'swDivSelect'"
          class="swDiv"
        >
          <div class="sel_wrap">
            <label style="font-weight: normal"> 12小时 </label>
          </div>
        </div>
      </div>
      <div class="shdswDiv">
        <div
          @click="changeDay('mapday24')"
          :class="pathName == 'mapday24' && 'swDivSelect'"
          class="swDiv"
        >
          <div class="sel_wrap">
            <label style="font-weight: normal"> 24小时 </label>
          </div>
        </div>
      </div>

      <div class="shdswDiv">
        <div
          @click="changeDay('mapday48')"
          :class="pathName == 'mapday48' && 'swDivSelect'"
          class="swDiv"
        >
          <div class="sel_wrap">
            <label style="font-weight: normal"> 48小时 </label>
          </div>
        </div>
      </div>
      <div class="shdswDiv">
        <div
          @click="changeDay('mapday72')"
          :class="pathName == 'mapday72' && 'swDivSelect'"
          class="swDiv"
        >
          <div class="sel_wrap">
            <label style="font-weight: normal"> 72小时 </label>
          </div>
        </div>
      </div>
      <!-- <div class="shdswDiv">
        <div @click="changeDay('mapday168')" :class="pathName == 'mapday168' && 'swDivSelect'" class="swDiv">
          <div class="sel_wrap">
            <label style="font-weight: normal"> 前7日 </label>
          </div>
        </div>
      </div> -->
    </div>
    <div style="width: 100%; height: 40px">
      &nbsp;&nbsp; 类型：&nbsp;
      <el-radio-group v-model="typenameRadio" @change="handleChange">
        <el-radio :value="1">全部</el-radio>
        <el-radio :value="5">代表站</el-radio>
        <el-radio :value="4">防汛站</el-radio>
        <el-radio :value="2">气象站</el-radio>
        <!-- <el-radio :value="3">报汛</el-radio>
        <el-radio :value="4">遥测</el-radio> -->
      </el-radio-group>
    </div>
    <div style="width: 100%; height: 120px" id="AreaTab">
      <ul class="divArea">
        <span>&nbsp;&nbsp; 行政：&nbsp;</span>
        <li
          v-for="(item, index) in xingzhengArea"
          @click="bjLayers(item.aname)"
          :class="AreaName == item.aname && 'areaSelect'"
          class="area"
          :style="
            (item.aname == '奉贤区' || item.aname == '浦东新区') &&
            'margin-left:54px'
          "
        >
          {{ item.aname }}
        </li>
      </ul>
    </div>
    <div style="width: 100%; height: 40px">
      &nbsp;&nbsp; 站点：&nbsp;
      <input
        id="textbox1"
        name="username"
        class="textbox"
        style="width: 150px"
        @input="stcdChanged"
      />
      <div id="zhandianbox">
        <ul>
          <li
            v-for="(item, index) in YQList"
            :key="index"
            @click="dingwei(item.stcd, item.lgtd, item.lttd)"
          >
            {{ item.stnm }}
          </li>
        </ul>
      </div>
    </div>
    <div style="width: 100%; height: 40px; text-align: center">
      <el-button type="primary" @click="BtnSearch()"> 查询 </el-button>
    </div>
  </div>
</template>

<script setup>
import EchartQZDrpAreaGC from "@/components/menu/yq/EchartQZDrpAreaGC.vue";
import EchartQZDrpAreaMonth from "@/components/menu/yq/EchartQZDrpAreaMonth.vue";
import DrpTablePX from "@/components/menu/yq/DrpTablePX.vue";
import EchartYQTopToady from "@/components/menu/yq/EchartYQTopToady.vue";
import EchartQZDrpArea from "@/components/menu/yq/EchartQZDrpArea.vue";
import EchartQZDrpTable from "@/components/menu/yq/EchartQZDrpTable.vue";
import TableYQJC from "@/components/menu/yq/TableYQJC.vue";

import tabToggleSQ from "@/components/tab/tabToggleSQ.vue";

import EchartYQAreaTJ from "@/components/menu/yq/EchartYQAreaTJ.vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
import { onMounted, ref, nextTick, reactive, onUnmounted } from "vue";
// ElConfigProvider：时间选择框汉化
import {
  ElDatePicker,
  ElRadio,
  ElButton,
  ElConfigProvider,
} from "element-plus";
import { useStore } from "vuex";

import apizonglan from "@/api/zonglan/index.js";
import * as apiqixiang from "@/api/qixiang/qixiangapi.js";
import apidzxm from "@/api/zonglan/dzxmindex.js";
import arcgisonIndex from "@/api/zonglan/arcgisonIndex.js";
import dayjs from "dayjs";
import * as PointMark from "@/utils/ArcGis/PointMark.js";

import * as myTyphoonMark from "@/utils/ArcGis/myTyphoon.js";
import { SetNull, groupBy, sortObjectArray } from "@/api/ComUnit.js";
import $ from "jquery";
import domain from "@/assets/json/domain.json";
const popupCloseImg = ref("/images/missWhite.png");
import {
  CreateImageLayer,
  removeEntityByName,
  addAreaLineQS,map,RemoveLayer,setZOOM,dyCenter
} from "@/utils/ArcGis/MapComm.js";

// 开始时间、结束时间
const stime = ref({});
const etime = ref({});
const pid = ref("201901101419326076-1-1,201901101419326076-5");
// 默认选择当日
let pathName = ref("mapday0");
// 默认选择全市
const AreaName = ref("");
const strJsonData = ref({});
const YLDATA = ref({});
const YQList = ref({});
let lines = reactive([]);
const tmCenter = ref(null);
const store = useStore();
const { viewer } = store.state;
const riverLX = ref(true);
const riverMarker = ref(false);
const RainDZMMarker = ref(false);
const rainfall0 = ref(false),
  rainfall0_10 = ref(true),
  rainfall10_25 = ref(true),
  rainfall25_50 = ref(true),
  rainfall50_100 = ref(true),
  rainfall100_250 = ref(true),
  rainfall250 = ref(true);
let resultPptnRain = reactive([]);
const datekeyAll = ref(null);
const datekeyAllname = ref(false);

const xingzhengArea = ref([
  {
    aid: "201901101419326076-1-1,201901101419326076-5",
    aname: "全市",
    atype: "全市",
    area: "",
    lgtd: "3747.490803126537",
    lttd: "7980.5747690055",
    ordernum: "0",
    lgtd84: "",
    lttd84: "",
  },
  {
    aid: "201901101419326076-1-2",
    aname: "市水文总站",
    atype: "行政分区",
    area: "288.9825068480",
    lgtd: "3747.490803126537",
    lttd: "7980.5747690055",
    ordernum: "10",
    lgtd84: "121.450659",
    lttd84: "31.270821",
  },
  {
    aid: "201901101419326076-1-3",
    aname: "宝山区",
    atype: "行政分区",
    area: "1458.0371410000",
    lgtd: "-5983.641246",
    lttd: "17364.092657",
    ordernum: "1",
    lgtd84: "121.568484",
    lttd84: "31.635916",
  },
  {
    aid: "201901101419326076-1-4",
    aname: "崇明区",
    atype: "行政分区",
    area: "301.9536720800",
    lgtd: "9553.627791",
    lttd: "44399.339835",
    ordernum: "2",
    lgtd84: "121.404861",
    lttd84: "31.392111",
  },
  {
    aid: "201901101419326076-1-5",
    aname: "奉贤区",
    atype: "行政分区",
    area: "463.1789474840",
    lgtd: "-888.843300",
    lttd: "-35829.761550",
    ordernum: "3",
    lgtd84: "121.250333",
    lttd84: "31.383524",
  },
  {
    aid: "201901101419326076-1-6",
    aname: "嘉定区",
    atype: "行政分区",
    area: "668.4158604760",
    lgtd: "-20682.766689",
    lttd: "16430.650934",
    ordernum: "4",
    lgtd84: "121.085191",
    lttd84: "31.124693",
  },
  {
    aid: "201901101419326076-1-7",
    aname: "金山区",
    atype: "行政分区",
    area: "604.8310019970",
    lgtd: "-20344.792165",
    lttd: "-46166.912116",
    ordernum: "5",
    lgtd84: "121.223543",
    lttd84: "31.030470",
  },
  {
    aid: "201901101419326076-1-8",
    aname: "闵行区",
    atype: "行政分区",
    area: "714.6973941410",
    lgtd: "-4663.054510",
    lttd: "-16441.435649",
    ordernum: "6",
    lgtd84: "121.458472",
    lttd84: "30.912345",
  },
  {
    aid: "201901101419326076-1-9",
    aname: "浦东新区",
    atype: "行政分区",
    area: "607.3284661878",
    lgtd: "26183.76720965306",
    lttd: "-16785.76760895364",
    ordernum: "7",
    lgtd84: "121.255144",
    lttd84: "30.818932",
  },
  {
    aid: "201901101419326076-1-10",
    aname: "青浦区",
    atype: "行政分区",
    area: "1409.3031802100",
    lgtd: "-36490.287030",
    lttd: "-12224.245954",
    ordernum: "8",
    lgtd84: "121.742177",
    lttd84: "31.083823",
  },
  {
    aid: "201901101419326076-1-11",
    aname: "松江区",
    atype: "行政分区",
    area: "373.4348500410",
    lgtd: "-23317.250602",
    lttd: "-22708.018690",
    ordernum: "9",
    lgtd84: "121.418901",
    lttd84: "31.087213",
  },
]);

const typenameRadio = ref(1);
function handleChange(val) {
  AreaName.value="";
  $(".LabelPlotBeautifulDRP").remove();
  if (val == 1) {
    pid.value = "201901101419326076-1-1,201901101419326076-5"; //所有站
  } else if (val == 5) {
    pid.value = "201901101419326076-3"; //35个代表站
  }
  else if (val == 2) {
    pid.value = "201901101419326076-5"; //236个气象站
  }
  else if(val == 4) {
    pid.value = "201901101419326076-1-1"; //354个防汛站
  }
  Weacontent();
}
//自动刷新
var interVal;
window.curDataRefresh = function () {
  if (interVal != null) {
    clearInterval(interVal);
  }
  if (localStorage.getItem("curDataRefresh") == "true") {
    interVal = setInterval(function () {
      refreshData();
    }, 180000); //180000
  }
};
//刷新的方法
function refreshData() {
  var _curDataRefresh = localStorage.getItem("curDataRefresh");
  if (_curDataRefresh == true || _curDataRefresh == "true") {
    Weacontent();
  } else {
    if (interVal != null && interVal != undefined) {
      clearInterval(interVal);
    }
  }
}
onUnmounted(() => {
  $(".LabelPlotBeautifulDRP").remove();
  if (interVal != null) {
    clearInterval(interVal);
  }
});
function Weacontent() {
  var strParam = {};
  strParam["pid"] = pid.value;
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  strParam["pathname"] = "SUM";
  var TYPEname = "(全部)";
  //   strParam["datasource"] = "BX";

  tmCenter.value =
    dayjs("2025-07-30 08:00:00").format("M月D日 H时") +
    "至" +
    dayjs("2025-07-31 08:00:00").format("M月D日 H时");
  apizonglan.stPptnRain(strParam).then((res) => {
    strJsonData.value = res.data;
    // if (datekeyAllname.value == true) {
      datekeyAll.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"))
        .add(6, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    // }
    YLload();
  });
}
var PicUrl = "/xishanyuntu/weather/";
function SpanItem(obj) {
  if (obj == "riverMarker") {
    if(riverMarker.value){
      PointMark.addYLMark(
        viewer,
        YLDATA.value,
        stime.value,
        etime.value,
        riverMarker.value,
      );
    }
    else{
      $(".rainText").remove();
    }
  } else if (obj == "RainDZMMarker") {
    if(RainDZMMarker.value){      
      MapRainfall();
    }
    else{
      var LayerID = "DZMRainLayer";
      var DZMRainLayerGraphicLayer =map.getLayer(LayerID);
      if (DZMRainLayerGraphicLayer != null) {
        DZMRainLayerGraphicLayer.clear();
      }
    }
  }
}
var RainfallStr = [];
function YLload() {
  RainfallStr = [];
  var count0 = 0,
    count0_10 = 0,
    count10_25 = 0,
    count25_50 = 0,
    count50_100 = 0,
    count100_250 = 0,
    count250 = 0;
  var countFX=0,countGX=0;//防汛站，共享站（气象站）
  var strJson = strJsonData.value;

  resultPptnRain = reactive([]);
  if (strJson.length > 0) {
    for (var i = 0; i < strJson.length; i++) {
      var item = strJson[i];
      if (item.drp == undefined) {
        item.drp = 0.0;
      }
      var f = Number(item.drp);
      if (f >= 200.0) {
        count250++;
        if (rainfall250.value) {
          resultPptnRain.push(item);
        }
      } else if (f >= 100.0) {
        count100_250++;
        if (rainfall100_250.value) {
          resultPptnRain.push(item);
        }
      } else if (f >= 50.0) {
        count50_100++;
        if (rainfall50_100.value) {
          resultPptnRain.push(item);
        }
      } else if (f >= 25.0) {
        count25_50++;
        if (rainfall25_50.value) {
          resultPptnRain.push(item);
        }
      } else if (f >= 10.0) {
        count10_25++;
        if (rainfall10_25.value) {
          resultPptnRain.push(item);
        }
      } else if (f > 0) {
        count0_10++;
        if (rainfall0_10.value) {
          resultPptnRain.push(item);
        }
      } else {
        count0++;
        if (rainfall0.value) {
          resultPptnRain.push(item);
        }
      }

      if(item.atcunit=="上海水文总站"){
        countFX++;
      }
      else{
        countGX++;
      }

      if (f > 0) {
        if (SetNull(item.lgtd) != "" && SetNull(item.lttd) != "") {
          RainfallStr.push({ lon: item.lgtd, lat: item.lttd, value: f });
        }
      }
    }
  }
  YLDATA.value = resultPptnRain;
  $("#value0").html("" + count0 + "");
  $("#value0_10").html("" + count0_10 + "");
  $("#value10_25").html("" + count10_25 + "");
  $("#value25_50").html("" + count25_50 + "");
  $("#value50_100").html("" + count50_100 + "");
  $("#value100_250").html("" + count100_250 + "");
  $("#value250").html("" + count250 + "");

  $("#countFX").html("" + countFX + "");
  $("#countGX").html("" + countGX + "");

  PointMark.addYLMark(
    viewer,
    resultPptnRain,
    stime.value,
    etime.value,
    riverMarker.value,
  );
  SpanItem("RainDZMMarker");
}
var colors = ["#A6F28E", "#007B00", "#3DBCF9", "#0000F9", "#FB3DFA", "#7B0000"];
var levels = [0.1,10,25,50,100,200];
function MapRainfall() {
  var strParam = {
    interpolation_method: "trigonometric",
    levels:levels,
    resolution: 1000,//0.01,
    stations:RainfallStr,
    boundary:false,
  };
  apidzxm.rainfallMultiIsosurfaces(strParam).then((res) => {
    MapRainfallData(res);
  });
}

async function MapRainfallData(res) {
  if (!res.success) {
    return;
  }
  var flatIsosurfaces = [];

  if (res.success && res.data) {
    Object.keys(res.data).forEach(function (regionId) {
      var regionData = res.data[regionId];
      if (regionData && regionData.isosurfaces) {
        regionData.isosurfaces.forEach(function (iso) {
          flatIsosurfaces.push(iso);
        });
      }
    });
  }
  var isolines = flatIsosurfaces;
  for (const u of isolines) {
    var level = u.level;
    var levelIndex = levels.findIndex(function (l) {
      return l >= level;
    });
    if (levelIndex < 0) levelIndex = 0;
    var color = colors[levelIndex] || colors[colors.length - 1] || "#98D8C8";
    var polygons = u.polygons;
    // console.error("color", color);
    for (const coords of polygons) {
      try {
        PointMark.MapRainfallSing(coords, color);
      } catch (err) {
        console.error("请求失败:", err);
      }
    }
  }
}

function getTLObj() {
  $(".rainText").remove();
  setTimeout(function () {
    YLload();
  }, 100);
}
function opencz() {
  $(".top-left-icon-menu").show();
  $(".top-left-icon").hide();
}
function closecz() {
  $(".top-left-icon").show();
  $(".top-left-icon-menu").hide();
}

function changeDay(e) {
  pathName.value = e;
  var day = e.replace("mapday", "");
  var now = new Date();

  etime.value = dayjs(now).format("YYYY-MM-DD HH:00:00");
  var hour = Number(day);
  stime.value = dayjs(dayjs(etime.value).format("YYYY-MM-DD HH:00:00"))
    .add(-hour, "hour")
    .format("YYYY-MM-DD HH:00:00");

  datekeyAllname.value = false;

  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:00"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:00"));
  Weacontent();
}
// 行政分区
function bjLayers(obj) {
  AreaName.value = obj;
  typenameRadio.value="";
  lines = reactive([]);

  var xingzhengAreaT = xingzhengArea.value.filter(function (e) {
    return e.aname == AreaName.value;
  });
  pid.value = xingzhengAreaT.length > 0 ? xingzhengAreaT[0].aid : "";
  if (xingzhengAreaT.length > 0) {
    var lgtd = xingzhengAreaT[0].lgtd;
    var lttd = xingzhengAreaT[0].lttd;
    addAreaLineQS(lgtd, lttd, 11, "上海市");
  }
  $(".LabelPlotBeautifulDRP").remove();
  datekeyAllname.value = false;
  Weacontent();
}
// 查询
function BtnSearch() {
  stime.value =
    dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  etime.value =
    dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
    // alert(stime.value);
  Weacontent();
}
// 站点
function stcdChanged(e) {
  var value = e.target.value;
  if (value != "") {
    var strJson = YLDATA.value.filter(function (evt) {
      var flag = false;
      if (evt.stcd.includes(value) == true) {
        flag = true;
      }
      if (evt.stnm.includes(value) == true) {
        flag = true;
      }
      return flag;
    });
    var strMsg = "";
    YQList.value = strJson;
    // if (strJson.length > 0) {
    //   strMsg += "<ul>";
    //   for (var num = 0; num < strJson.length; num++) {
    //     // strMsg +=
    //     //   "<li onclick=\"dingwei("+strJson[num]["stcd"]+",'" +
    //     //   strJson[num]["lgtd"] +
    //     //   "','" +
    //     //   strJson[num]["lttd"] +
    //     //   "')\">" +
    //     //   strJson[num]["stnm"] +
    //     //   "</li>";
    //     strMsg +=
    //       '<li @click="dingwei(' +
    //       strJson[num]["stcd"] +
    //       "," +
    //       strJson[num]["lgtd"] +
    //       "," +
    //       strJson[num]["lttd"] +
    //       ')">' +
    //       strJson[num]["stnm"] +
    //       "</li>";
    //   }
    //   strMsg += "</ul>";
    // }
    $("#zhandianbox").show();
    // $("#zhandianbox").html(strMsg);
  }
}
// 定位
function dingwei(_stcd, _lgtd, _lttd) {
  $(".top-left-icon").show();
  $(".top-left-icon-menu").hide();
  $("#zhandianbox").hide();
}
function clearALL() {
  try {
    removeEntityByName();
  } catch (ex) {}
}
onMounted(() => {
  $("#tabyq").addClass("swDivSelect swDiv");
  $("#m_shik").addClass("z-crtitem z-crt wow slideInUp link-item");
  if (_theme == "default") {
    popupCloseImg.value = "/images/missWhite.png";
  } else {
    popupCloseImg.value = "/images/missBlack.png";
  }
  mini.parse();
  var now = new Date();
  var endTime = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  var startTime = dayjs(now).format("YYYY-MM-DD 08:00:00");
  if (Number(dayjs(now).format("HH")) < 8) {
    startTime = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  mini.get("STIME").setValue(dayjs(startTime).format("YYYY-MM-DD HH:00"));
  mini.get("ETIME").setValue(dayjs(endTime).format("YYYY-MM-DD HH:00"));
  stime.value =
    dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  etime.value =
    dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  setTimeout(function () {
    clearALL();
    addAreaLineQS();
    nextTick(() => {
      //地图标注
      // Weacontent();
      changeDay("mapday3");
      window.curDataRefresh();
      $(".light").css({ bottom: "-100px" });
    });
  }, 500);
});
function parentMethodshowDynamicLayer(item) { 
  setZOOM(13);
  dyCenter (item[0],item[1]);
}
</script>
<style src="@/assets/styles/style.css"></style>

<style scoped>
.tuli {
  width: auto;
  height: 200px;
  color: var(--title2);
  font-size: 12px;
  font-size: 0.15rem;
  padding: 0px 5px;
  cursor: pointer;
  position: absolute;
  border-radius: 8px;
  bottom: 15px;
  height: auto !important;
  right: 24%;
  padding: 0px 0px 20px 0px !important;
  z-index: 2;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.2);
  padding: 0px !important;
}

.switch-xs {
  position: absolute;
  left: 6px;
  height: 40px;
  line-height: 40px;
}

/* 搜索开始 */
.top-left-icon {
  width: 46px;
  height: 46px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 10px; */
  cursor: pointer;
  position: fixed;
  /* left: calc(calc(50% - 220px) + 320px);
  top: 150px; */
  color: var(--title2);
  /* display:none; */
  left: 28rem;
  bottom: 0.8rem;
}

.opencz1 {
  width: 46px;
  height: 36px;
  margin-left: 10px;
  float: right;
  background: #fff;
  cursor: pointer;
  border: 1px #c5d1ff solid;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  float: right;
  height: 36px;
  width: 100px;
  left: -380px;
  line-height: 36px;
  color: #42ecef !important;
  border-style: solid;
  border-width: 2px;
  border-image-source: linear-gradient(0deg, #11a8ff, #134dea 49%, #11a8ff);
  border-image-slice: 1;
  box-shadow: inset 0 0 0 1px transparent;
  background-color: rgba(76, 152, 176, 0.2);
  text-align: center;
}

.top-left-icon-menu {
  width: 455px;
  height: 340px;
  z-index: 10;
  margin-left: 10px;
  cursor: pointer;
  position: fixed;
  /* left: 28rem;
  bottom: 1rem; */
  /* left: calc(50% - 270px);
  top: 200px; */
  color: var(--sel_wraplabelcolor);
  padding: 10px;
  box-shadow: inset 0 0 0 1px transparent;
  /* background-color: rgba(2, 24, 31, 0.8); */
  background-color: var(--boxtitlebg);
  border: var(--portalborder);
  /* border-image-source: linear-gradient(0deg, #11a8ff, #134dea 49%, #11a8ff); */
  display: none;
  border-radius: 8px;

  left: 28rem;
  bottom: 0.8rem;
}

.top-left-icon-menu-close {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 22px;
  height: 22px;
  padding: 3px;
}

.shdswDiv .swDiv {
  margin: 0px;
  width: 50px;
  font-size: 14px;
  margin-left: 6px;
  color: #fff;
}

.divArea {
  /* width: 100%; */
  height: 100px;
  margin: 0px;
  padding: 0px 0px 0px 0px;
}

.area {
  background: var(--portal);
  border: var(--portalborder);
  width: 80px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  margin-right: 8px;
  font-size: 13px;
  list-style: none;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  color: var(--sel_wraplabelcolor);
}

.areaSelect {
  background: var(--swDivSelectcolor);
  color: var(--sel_wraplabelcolorSel);
  width: 80px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  margin-right: 8px;
  font-size: 13px;
  list-style: none;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
}

.textbox {
  background: none;
  border: var(--portalborder);
  padding-left: 6px;
  padding-right: 6px;
  height: 26px;
  border-radius: 4px;
  margin-left: -1px;
  color: #fff;
  /* color: var(--widgetcolor); */
}

.textbox:fous-visible {
  background: var(--portal) !important;
  border: var(--portalborder) !important;
  color: var(--widgetcolor);
}

#zhandianbox {
  width: 150px;
  height: auto;
  display: table;
  position: absolute;
  background: var(--boxtitlebg);
  left: 67px;
  bottom: 80px;
  z-index: 99;
  margin-left: 8px;
  border-radius: 4px;
  color: var(--widgetcolor);
}

#zhandianbox ul {
  padding: 0px 5px;
}

#zhandianbox ul li {
  cursor: pointer;
  line-height: 30px;
  height: 30px;
  list-style: none;
  color: var(--sel_wraplabelcolor);
}

#zhandianbox ul li:hover {
  color: var(--popupContentTitleColor);
}

:deep(.el-radio) {
  /* margin-right: 20px; */
  --el-radio-input-bg-color: #d5141400;
}

:deep(.el-radio__label) {
  color: var(--widgetcolor);
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
  width: 160px;
}

:deep(.el-input__prefix-inner) {
  margin-left: -9px;
}

:deep(.el-input__suffix) {
  margin-right: -9px;
}

:deep(.el-input__wrapper) {
  background-color: #d5141400;
  box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
}

:deep(.el-input__inner) {
  color: var(--widgetcolor);
  /* color: #fff; */
}

/* 搜索结束 */
:deep(.el-button) {
  /* background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg); */
  color: #fff;
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label),
:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: var(--swDivSelectcolor);
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner),
:deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: var(--swDivSelectcolor);
  border-color: var(--swDivSelectcolor);
}

.colorSpan{
    display: inline-block;
    width: 15px;
    height:13px;
    /* margin-right: 5px; */
    margin-left:5px;
}
.colorL{
  padding: 10px;
}
.colorL p {
  line-height: 16px;
  margin-bottom: -4px;
}
</style>
