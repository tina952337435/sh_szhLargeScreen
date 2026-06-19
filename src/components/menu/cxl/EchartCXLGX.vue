<template>
  <div class="m-box" style="position: relative">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">水位～面积～蓄量关系</p>

      <!-- <div
        class="xiala"
        style="
          right: 5px;
          top: 6px;
          position: absolute;
          width: 150px;
          line-height: 30px;
          cursor: pointer;
        "
      >
        <label
          @click="showItem('fangan')"
          id="labelName"
          style="
            position: absolute;
            right: 26px;
            font-size: 14px;
            font-family: var(--calcite-font-family);
            cursor: pointer;
            color: var(--mtablecolor);
          "
        >
          {{labelName}}
        </label>
        <img
          src="/images/icon_select.png"
          style="
            position: absolute;
            right: 0px;
            margin-top: 2px;
            cursor: pointer;
          "
          @click="showItem('fangan')"
        />
        <ul
          class="el-dropdown-menu"
          style="
            overflow-y: auto;
            margin-top: 5px;
            font-family: var(--calcite-font-family);
            cursor: pointer;right: 10px;    left: auto;
          "
          id="fangan"
        >
          <li @click="labelName = '嘉宝北片';Weacontent()">嘉宝北片</li>
          <li @click="labelName = '淀北片';Weacontent()">淀北片</li>
          <li @click="labelName = '蕰南片';Weacontent()">蕰南片</li>
          <li @click="labelName = '青松片';Weacontent()">青松片</li>
          <li @click="labelName = '苏州河';Weacontent()">苏州河</li>
        </ul>
      </div> -->
    </div>
    <div class="txt">
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
</template>
<script setup>
import { ref, onMounted } from "vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";

import apimode from "@/api/mode/index.js";
import { SetNull, sortObjectArray,getWindDirectionName,groupBy } from "@/api/ComUnit.js";

import * as echarts from "echarts";
import dayjs from "dayjs";
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("echartcxlswgx");

const gxData = ref([]);
const labelName = ref("");
const props = defineProps({
  strJsonData: { type: Array,default:()=>[] },
  sid: { type: String,default:"" },
});

const xslData = ref([]);

onMounted(() => {
 if(SetNull(props.sid) !=""){
   if( props.sid=="81650"){
      labelName.value = "苏州河";
   }else if(props.sid=="81651"){
      labelName.value = "淀北片";
   }else if(props.sid=="81652"){
      labelName.value = "蕰南片";
   }else if(props.sid=="81653"){
      labelName.value = "嘉宝北片";
   }else if(props.sid=="81654"){
      labelName.value = "青松片";
   }
   xslData.value=props.strJsonData.filter(function (item) {
    return item.id == props.sid;
   });
    Weacontent();
 }
});

function Weacontent() {
  var strParam = {
    kwtxt:labelName.value,
  };
  apimode
    .WATERSTORAGEfindResult(strParam)
    .then((res) => {
      gxData.value = res.data;
      loadChart(gxData.value);
    })
    .catch((err) => {
      console.error(err);
    });
}

function loadChart(data) {
  var dataX = [],
    dataXL = [],
    dataMJ = [];
  for (var num = 0; num < data.length; num++) {
    dataX.push(data[num].upz);
    dataXL.push(data[num].s);
    dataMJ.push(data[num].area);
  }

  lineOption.value = chartNHXNew(dataX, dataXL, dataMJ);
  datekey.value = Date.now();
}

function getCXL() {
  var keyValue = 2.85;
  var cxlValue = "";
  if (keyValue != "") {
    cxlValue = getStorageValue(keyValue);
    //$("#jisuanCXL").html(cxlValue + "百万方");
  }
  return cxlValue;
}
function getStorageValue(upz) {
  upz = parseFloat(upz);
  var dataTempMax = gxData.value.filter(function (res) {
    return res.upz >= upz;
  });
  var dataTempMin = gxData.value.filter(function (res) {
    return res.upz <= upz;
  });
  var minUpz = dataTempMin[dataTempMin.length - 1].upz;
  var maxUpz = dataTempMax[0].upz;
  var S = dataTempMax[0].s;
  if (minUpz != maxUpz) {
    var cha = Number(parseFloat(maxUpz - minUpz).toFixed(2)); //总差值
    var scha = Number(parseFloat(upz - minUpz).toFixed(2)); //距离上一个差值;
    var upzBili = scha / cha;

    var minS = dataTempMin[dataTempMin.length - 1].s;
    var maxS = dataTempMax[0].s;
    var chaS = maxS - minS; //蓄量总差值
    var sscha = chaS * upzBili;
    S = (minS + sscha).toFixed(2);
  }
  return S;
}

function chartNHXNew(dataX, dataXL, dataMJ) {
  var titleText = "嘉宝北片水位～面积～蓄量关系曲线";
  // echarts.registerTransform(ecStat.transform.regression);

  var xAxisVal = 0,
    formatterVal = 0;
  formatterVal = getCXL();
  if (formatterVal != "") {
    var startUpz = Number(gxData.value[0].upz);
    var endUpz = gxData.value[gxData.value.length - 1].upz;
    var curUpz = xslData.value[xslData.value.length-1].upz;//Number(2.85);
    xAxisVal = (curUpz - startUpz) * 10;
  }
  var option = {
    title: {
      // text: titleText,
      textStyle: {
        color: "#fff",
      },
      // subtext: subtext,
      subtextStyle: {
        color: "#497DBB",
        fontSize: 14,
        fontWeight: "normal",
      },
      left: "center",
      top: 0,
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "12%",
      top: "20%",
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["水面面积", "蓄量"],
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      x: "center",
      y: 10,
    },
    xAxis: {
      name: "水位(m)",
      nameLocation: "center",
      boundaryGap: false,
      nameTextStyle: {
        padding: [15, 0],
        fontSize: 13,
        color: "#00FFFF",
      },
      data: dataX,
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
      axisLabel: {
        formatter: function (v) {
          return Number(v).toFixed(1);
        },
        color: "#00FFFF",
      },
    },
    yAxis: [
      {
        name: "面积(平方公里)",
        min: function (value) {
          return value.min - 1;
        },
        max: function (value) {
          return value.max + 1;
        },
        // 坐标刻度线
        axisTick: {
          show: true,
          lineStyle: {
            type: "solid", //y轴分割线类型
            color: "#00FFFF",
            // width: 2.5,
          },
        },
        // 坐标 轴线
        axisLine: {
          show: true,
          lineStyle: {
            type: "solid",
            // color: 'rgba(66, 192, 255, .3)',
            color: "#00FFFF",
            // width: 2.5
            // color: 'red'
          },
        },
        splitLine: {
          lineStyle: {
            // type: 'dashed',
            color: "#074159",
          },
        },
        axisLabel: {
          formatter: function (v) {
            return v.toFixed(0);
          },
        },
      },
      {
        name: "蓄量(百万方)",
        // min: 70,
        // max: 220,
        // 坐标刻度线
        axisTick: {
          show: true,
          lineStyle: {
            type: "solid", //y轴分割线类型
            color: "#00FFFF",
            // width: 2.5,
          },
        },
        // 坐标 轴线
        axisLine: {
          show: true,
          lineStyle: {
            type: "solid",
            // color: 'rgba(66, 192, 255, .3)',
            color: "#00FFFF",
            // width: 2.5
            // color: 'red'
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: "dashed",
          },
        },
        axisLabel: {
          formatter: function (v) {
            return v.toFixed(0);
          },
        },
      },
    ],
    series: [
      {
        name: "水面面积",
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        symbol: "circle",
        color: "#5B9BD5", //#497DBB
        lineStyle: {
          //type: 'dashed'
        },
        data: dataMJ,
        label: {
          show: false,
          fontSize: 16,
        },
      },
      {
        name: "蓄量",
        type: "line",
        markLine: {
          symbol: ["none", "none"], //箭头
          data: [
            {
              xAxis: xAxisVal,
            },
          ],
          label: {
            formatter: function () {
              return formatterVal; //"当前蓄量："+formatterVal;
            },
            color: "red",
            distance: -2,
          },
          lineStyle: {
            color: "red",
            width: 2,
          },
        },
        yAxisIndex: 1,
        smooth: true,
        symbol: "circle",
        color: "red", //#497DBB
        lineStyle: {
          //type: 'dashed'
        },
        data: dataXL,
        label: {
          show: false,
          fontSize: 16,
        },
      },
    ],
  };
  return option;
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
