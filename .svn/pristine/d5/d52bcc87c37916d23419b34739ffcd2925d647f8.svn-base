<template>
  <div class="m-box">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">{{ onetitleName }}</p>
      <div style="width: calc(100% - 250px)" class="div-swiper">
        <div
          class="swiper-slide"
          style="width: 50%"
          :class="
            Drpswiper == '63405800' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('63405800')"
        >
          芦潮港
        </div>
        <div
          class="swiper-slide"
          style="width: 50%"
          :class="
            Drpswiper == '63401750' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('63401750')"
        >
          吴淞口
        </div>
      </div>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <!-- <div style="height: 100%;color: white;width: 100%;text-align: center; height: 22vh;">
                  水情报表
              </div> -->
      <Echarts
        :width="'100%'"
        :height="'100%'"
        :option="lineOption"
        :key="datekey"
        :id="dateid"
      />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian
    :showDialog="showDialog"
    @close="showDialog = false"
    :title="titleName"
    :typeValue="typeValue"
    style="width: 70%; height: 700px"
  >
    <windyweater />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import * as apiqixiang from "@/api/qixiang/qixiangapi.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray, groupBy } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive } from "vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("windyweaterZS");
const stime = ref({});
const etime = ref({});
const stcdList = ref("63405800");
const onetitleName = ref("windy风向玫瑰图");
const Drpswiper = ref("63405800");
const props = defineProps({
  stcd: {
    type: String,
    default: "",
  },
});
function qiehuan(stcd) {
  stcdList.value = stcd;
  Drpswiper.value = stcd;
  var stnm = "";
  if (stcd == "63405800") {
    stnm = "芦潮港";
  } else if (stcd == "63401750") {
    stnm = "吴淞口";
  }
  Weacontent();
}
function Weacontent() {
  window.loadingShow();
  var nowTM = new Date();
  var strParam = {
    stcd: stcdList.value,
  };
  strParam["pageindex"] = 1;
  strParam["pagesize"] = 1;
  apiqixiang
    .windyweaterData(strParam)
    .then((res) => {
      if (res.data != undefined) {
        strParam = {
          startdate: res.data[0].ybtm,
          enddate: res.data[0].ybtm,
          stcd: stcdList.value,
        };
        apiqixiang
          .windyweaterData(strParam)
          .then((resZI) => {
            loadChart(resZI.data);
            window.loadingHide();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
var dataFXNM = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"];
var dataFX = ["N", "NE", "E", "SE", "S", , "SW", "W", "NW"];
var jibieArr = [
  [0, 5],
  [5.0, 10.0],
  [10.0, 15.0],
  [15.0, 20.0],
  [20.0, 25.0],
  [25.0, 30.0],
  [30.0, 100000],
];
var legendName = [];
function loadChart(swresult) {
  swresult=sortObjectArray(swresult,["tm"],"asc");
  var fxflData = [];
  swresult.map((item) => {
    var winddir = item.winddir;
    var dirName = getDirName(winddir);
    var dirYName = getDirYName(winddir);
    fxflData.push({
      dirName: dirName,
      dirYName: dirYName,
      wind: item.wind,
      winddir: winddir,
    });
  });
  jibieArr.map((u) => {
    if (u[1] < 100000) {
      legendName.push(u[0] + "-" + u[1] + " m/s");
    } else {
      legendName.push(">" + u[0] + " m/s");
    }
  });
  var fxflDataTemp = fxflData;
  var seriesData = [];
  var maxValue = 0;
  var fxflDataTempG = groupBy(fxflDataTemp, "dirYName");
  fxflDataTempG.map((u) => {
    const sum = u.length;
    if (maxValue < sum) {
      maxValue = sum;
    }
  });

  // console.error("fxflDataTempG",fxflDataTempG);
  // --- 修改 Weacontent 函数中的 series 构建部分 ---
  for (var i = 0; i < jibieArr.length; i++) {
    var fxflDataTempTemp = fxflDataTemp.filter(function (e) {
      var fs = parseFloat(e["wind"]);
      // console.error('fs',fs);
      return fs > jibieArr[i][0] && fs <= jibieArr[i][1];
    });
    var dataZui = [];
    dataFX.map((u) => {
      var fxflDataTempTempTemp = fxflDataTempTemp.filter(function (e) {
        // 确保这里的解析逻辑能正确提取到 "N", "NNE" 等
        var fx = e["dirYName"];
        return fx == u;
      });
      dataZui.push(fxflDataTempTempTemp.length);
    });

    var seriesItem = {
      type: "bar",
      data: dataZui,
      coordinateSystem: "polar",
      name: legendName[i],
      stack: "a",
      barWidth: "100%", // 【修复】填满扇区
      roundCap: false, // 【修复】直角边缘，利于闭合
      itemStyle: {
        borderWidth: 0, // 【修复】无边框
      },
    };
    seriesData.push(seriesItem);
  }
  var startDate= dayjs(swresult[0].tm).format("M月D日H时");
  var endDate= dayjs(swresult[swresult.length-1].tm).format("M月D日H时");
  var title=startDate+"至"+endDate;
  var optionTide = loadEcharts(title, seriesData, maxValue + 20);
  lineOption.value = optionTide;
  datekey.value = new Date();
}
function getDirName(degrees) {
  var directArrOne = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"];
  var dirname = "";
  var index = 0;
  if (337.5 <= degrees && degrees <= 360) {
    index = 0;
  } else if (0 <= degrees && degrees <= 22.5) {
    index = 0;
  } else if (degrees >= 22.5 && degrees <= 67.5) {
    index = 1;
  } else if (degrees >= 67.5 && degrees <= 112.5) {
    index = 2;
  } else if (degrees >= 112.5 && degrees <= 157.5) {
    index = 3;
  } else if (degrees >= 157.5 && degrees <= 202.5) {
    index = 4;
  } else if (degrees >= 202.5 && degrees <= 247.5) {
    index = 5;
  } else if (degrees >= 247.5 && degrees <= 292.5) {
    index = 6;
  } else if (degrees >= 292.5 && degrees <= 337.5) {
    index = 7;
  }
  dirname = directArrOne[index];
  return dirname;
}
function getDirYName(degrees) {
  var directArrOne = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  var dirname = "";
  var index = 0;
  if (337.5 <= degrees && degrees <= 360) {
    index = 0;
  } else if (0 <= degrees && degrees <= 22.5) {
    index = 0;
  } else if (degrees >= 22.5 && degrees <= 67.5) {
    index = 1;
  } else if (degrees >= 67.5 && degrees <= 112.5) {
    index = 2;
  } else if (degrees >= 112.5 && degrees <= 157.5) {
    index = 3;
  } else if (degrees >= 157.5 && degrees <= 202.5) {
    index = 4;
  } else if (degrees >= 202.5 && degrees <= 247.5) {
    index = 5;
  } else if (degrees >= 247.5 && degrees <= 292.5) {
    index = 6;
  } else if (degrees >= 292.5 && degrees <= 337.5) {
    index = 7;
  }
  dirname = directArrOne[index];
  return dirname;
}
// --- 修改 loadEcharts 函数中的 option 配置 ---
function loadEcharts(title, seriesData, maxValue = 100) {
  var option = {
    title:{
        text:title,
        left: '15%',
        top:5,
        textStyle: {
            color: '#fff',
            fontSize: 14,
            color:'#00feff',
            fontWeight:500,
        }
    },
    // ... (tooltip, color 等其他配置保持不变) ...
    tooltip: {
      trigger: "item",
      textStyle: {
        color: "#fff",
      },
    },
    color: [
      "#0001F7",
      "#00B8FE",
      "#00FFFF",
      "#00FF68",
      "#BEFE00",
      "#FFFF00",
      "#FFA800",
      "#E10100",
    ],

    angleAxis: {
      type: "category",
      data: dataFXNM,
      boundaryGap: false, //标签和数据点都会在两个刻度之间的带(band)中间
      axisTick: {
        show: false, //是否显示坐标轴刻度
      },
      splitLine: {
        show: true,
        lineStyle: {
          // color:"black"
        },
      },
      axisLabel: {
        show: true,
        interval: 0, //坐标轴刻度标签的显示间隔，在类目轴中有效
        textStyle: {
          color: "#ffffff",
          fontSize: 12,
        },
      },
    },

    radiusAxis: {
      min: 0,
      max: maxValue,
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    // 调整极坐标系位置和大小
    polar: {
      center: ["35%", "60%"], // 将极坐标系中心向左移动
      radius: "70%", // 保持原有半径大小
    },
    series: seriesData,

    // ... (legend 配置保持不变) ...
    legend: {
      show: true,
      data: legendName,
      orient: "vertical",
      right: "10%",
      top: "center",
      itemWidth: 15,
      itemHeight: 15,
      textStyle: {
        color: "#ffffff",
        fontSize: 12,
      },
    },
  };
  return option;
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "windyweaterZS1";
}
onMounted(() => {
  Weacontent();
});
</script>
