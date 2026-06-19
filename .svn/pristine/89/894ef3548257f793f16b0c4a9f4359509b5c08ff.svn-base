<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">水位预警统计</p>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <yujingTongji :DD_ARR="DD_ARR" :key="datekeyDialog" />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import { Postcard } from "@element-plus/icons-vue";

import Table from "@/components/Table/Table.vue";
import api from "@/api/mode/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";

import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy, GetSZStateBy, GetSZState } from "@/api/ComUnit.js";
import * as echarts from "echarts";

import {
  onMounted,
  ref,
  shallowRef, 
  defineAsyncComponent,
  nextTick,
  provide,
  inject,
  watch
} from "vue";

// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();
const showDialog = ref(false);
const datekeyDialog = ref(null);


const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("yujingTongjiDiv");

const _theme = localStorage.getItem("curTheme");

var myData = [];
const zcCount = ref(0);
const wrzCount = ref(0);
const nullCount = ref(0);

const trendsTooltip = ref();

const props = defineProps({
  DD_ARR: {
    type: String,
    default: ""
  },
  swstrJson:{
    type: String,
    default: ""
  },
});
var DD_ARR = props.DD_ARR; //调度方案编号
// alert(props.DD_ARR.DD_ID);
watch(props.DD_ARR, () => {
  Weacontent();
});

onMounted(() => {
  if (props.DD_ARR.DD_ID != undefined) {
    Weacontent();
  }
});

function Weacontent() {
  if(SetNull(props.swstrJson)!=""){    
    JsonColumnChart(props.swstrJson);
  }
}
function JsonColumnChart(res) {
  var data = res.filter(function (e) {
    return SetNull(e.lgtd) != "" && SetNull(e.lttd) != "";
  });
  var strWhere = {};
  var strJson = [];
  var wrzcount = 0,
    nullcount = 0,
    totalcount = 0,
    zccount = 0,
    grzCount = 0;
  // console.error("站点数量：",data);
  for (var num = 0; num < data.length; num++) {
    var item = data[num];
    if (SetNull(item["maxz"]) != "") {
      let colorCss = "";
      if (SetNull(item["wrz"]) != "") {
        let chaWrz = Number(SetNull(item["maxz"])) - Number(SetNull(item["wrz"]));
        if (chaWrz > 0) {
          colorCss = "#FF9E43";
        }
      }
      if(SetNull(item["grz"])!=""){
          let chaWrz=Number(SetNull(item["maxz"]))-Number(SetNull(item["grz"]));
          if(chaWrz>0){
            colorCss="#F70019";
          }
      }
      if (colorCss == "#FF9E43") {
        wrzcount++;
      }
      else if (colorCss == "#F70019") {
        grzCount++;
      }
      else {
        // console.error("正常站点：",item);
        zccount++;
      }
    }
    else {
      //  console.error("缺测站点：",item);
      nullcount++;
    }
  }
  totalcount = data.length;
  strWhere["SQSTNM"] = "水情";
  strWhere["WRZCW"] = wrzcount;
  strWhere["GRZCW"] = nullcount;
  strJson.push(strWhere);
  var strNote = [];
  strNote.push({
    name: "超警戒",
    codename: "wrz",
    tableV: "1",
    isShow: false,
    width: "20%",
    color: "#09FF09",
  });
  strNote.push({
    name: "超保证",
    codename: "grz",
    tableV: "1",
    isShow: false,
    width: "20%",
    color: "#00FFFF",
  });

  var colorArr = ["#16FF8D", "#FF9E43", "red"];
  var colorAlpha = ["#16FF8D", "#FF9E43", "red"];
  var valuedata1 = [zccount, wrzcount, grzCount];
  zcCount.value = zccount;
  wrzCount.value = wrzcount;
  nullCount.value = nullcount;
  var percentdata = [
    ((zccount / totalcount) * 100).toFixed(2),
    ((wrzcount / totalcount) * 100).toFixed(2),
    ((grzCount / totalcount) * 100).toFixed(2),
  ];
  const _Option = ChartJs.echartCJCBZCpei(
    dateid.value,
    data,
    valuedata1,
    percentdata,
    colorArr,
    colorAlpha,
    _theme
  );
  lineOption.value = _Option;
  let chartDom = document.getElementById(dateid.value);
  let myChart = echarts.init(chartDom);
  myChart.setOption(lineOption.value);
  // myChart.on("click", eSLChage);
  // 动态显示tootip
  // 当前高亮图形所在下标
  let currentIndex = -1;
  // 取消之前高亮的图形
  if (trendsTooltip.value != null) {
    clearInterval(trendsTooltip.value);
  }
  trendsTooltip.value = setInterval(function () {
    let dataLen = lineOption.value.series.data.length;
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    // 当前高亮图形
    currentIndex = (currentIndex + 1) % dataLen;
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    // 显示 tooltip
    // tootip每隔三秒依次显示
    myChart.dispatchAction({
      type: "showTip", // 根据 tooltip 的配置项显示提示框。
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    if (currentIndex >= lineOption.value.series.data.length) {
      currentIndex = 0;
    }
  }, 1500);

}

function fangda() {
  datekeyDialog.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 90 });
  $(".g-lside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "yubaoAreaDiv1";
}

const emit = defineEmits(['parentloadWQYBData']);

</script>
<style scoped></style>