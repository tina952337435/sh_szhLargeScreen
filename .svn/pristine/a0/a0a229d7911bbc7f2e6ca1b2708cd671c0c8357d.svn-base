<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()">引/排水量统计</p>
        <span class="spanTitle"></span>
      </div>
      <div style="width:calc(100% - 180px);" class="div-swiper">
        <div class="swiper-slide" style="width: 50%;"
          :class="SLswiper == 'YSL' && 'swiper-slide swiper-slide-thumb-active'" @click="GetSL('YSL')">
          引水
        </div>
        <div class="swiper-slide" style="width: 50%;"
          :class="SLswiper == 'PSL' && 'swiper-slide swiper-slide-thumb-active'" @click="GetSL('PSL')">
          排水
        </div>
      </div>
    </div>
    <div class="txt">
      <div style="width: 45%; height: 100%; float: left">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
      </div>
      <div style="height: 100%;">
        <div class="ysts-group" style="width: 55%;height:calc(100% - 50px)" v-html="ystsGroup"></div>
        <div class="text-xiaolv" style="margin: 7px 30px;font-size:14px;text-align:center;">
          <span id="SlName">0</span>
          <span id="Sltotal"
            style="font-size: 20px;font-family: 'number';color: var(--widgetcolor);vertical-align: -1px;">0</span>万方
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 90%; height: 800px">
    <EchartYPSL />
  </ComZujian>
  <MyDialog :showDialog="showDialogSL" @close="showDialogSL = false" :title="titleNameSL"
    style="width: 95%; height: 800px">
    <SLLineSTCD />
  </MyDialog>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import MyDialog from "@/components/ComDialog.vue";
import SLLineSTCD from "@/components/danzhan/sl/SLLineSTCD.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import * as echarts from "echarts";

import { ref, onMounted, provide } from "vue";
import { SetNull } from '@/api/ComUnit';
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const trendsTooltip = ref();
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
// 判断弹窗是否显示,默认隐藏
const showDialogSL = ref(false);
const titleNameSL = ref();
const pid = ref("");
const stime = ref("");
const etime = ref("");
const dateid = ref("YPSL");
const SLswiper = ref("YSL");
const SLDATA = ref({});
const props = defineProps({
  ystsGroup: String,
});
const ystsGroup = ref();
var myData=[];
function Weacontent() {
  var nowTM = new Date();
  var startDate = dayjs(nowTM).add(-1, "day")
  .format("YYYY-MM-DD 08:00:00");
  var endDate = dayjs(nowTM).add(-1, "day").format("YYYY-MM-DD 08:00:00");
  if (dayjs(nowTM).format("HH") > 8) {
    startDate = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .format("YYYY-MM-DD 08:00:00");
      endDate = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  }
  var strParam = {};
  strParam["pathname"] = "SUM";
  strParam["pid"] = "202411100001";
  // strParam["pid"] = "202505251605374003";
  strParam["stime"] = startDate;
  strParam["etime"] = endDate; 
  //.querySUMPSL(strParam)
  api
    .stPptnGQSLAll(strParam)
    .then((res) => {
      var strJson = [];
      // if(res.result.length>0){
      //   $.data(myData,"querySUMPSL",res.result);
      //   for(var num=0;num<res.result.length;num++){
      //     var strWhere = {};
      //     strWhere["ID"] = res.result[num].stcd;
      //     strWhere["STCD"] = res.result[num].stcd;
      //     strWhere["STNM"] = res.result[num].stnm;
      //     strWhere["accpw"] = Number(Math.abs(res.result[num].laz)).toFixed(1);
      //     strWhere["accdw"] = Number(res.result[num].ivhz).toFixed(1);
      //     strWhere["ORDERBYID"] = num;
      //     strJson.push(strWhere); 
      //   }
      // }
      // console.error("strJson", strJson);
      strJson=res.result;
      SLDATA.value = strJson 
      GetSL(SLswiper.value)
      // if (strJson.length > 0) {

    })
    .catch((err) => {
      console.error(err);
    });
}
function GetSL(obj) {
  SLswiper.value = obj;
  var strJson = SLDATA.value;

  var pieArr = [],
    SLtotal = 0,
    pieArrNew = [];
  for (var num = 0; num < strJson.length; num++) {
    var strWhere = {};

    if (obj == "YSL") {
      var value = Number(strJson[num].accpw).toFixed(1);
    } else if (obj == "PSL") {
      var value = Number(strJson[num].accdw).toFixed(1);
    }
    strWhere["value"] = value;
    strWhere["name"] = strJson[num].STNM;
    SLtotal += Number(value); 
    if(obj=="YSL"&&strWhere["name"]!="太浦河"){
      pieArr.push(strWhere);
      var strWhereNew = {};
      strWhereNew["value"] = Number(value).toFixed(1);
      strWhereNew["name"] = strJson[num].STNM;
      pieArrNew.push(strWhereNew);
    }
    else if(obj=="PSL"){
      pieArr.push(strWhere);
      var strWhereNew = {};
      strWhereNew["value"] = Number(value).toFixed(1);
      strWhereNew["name"] = strJson[num].STNM;
      pieArrNew.push(strWhereNew);
    }

    
  }
  
  var LineColor = [
    "#efc30a",
    "#00fd6d",
    "#B5F320",
    "#00CCFB",
  ];
console.error("dateid.value",dateid.value,lineOption.value,pieArr,LineColor)

  const _Option = ChartJs.echartSLpei(dateid.value, pieArr, LineColor, _theme);
  lineOption.value = _Option;
  let chartDom = document.getElementById(dateid.value);
  let myChart = echarts.init(chartDom);
  myChart.setOption(lineOption.value);
  myChart.on("click", eSLChage);
  // 动态显示tootip
  // 当前高亮图形所在下标
  let currentIndex = -1;
  // 取消之前高亮的图形
  if (trendsTooltip.value != null) {
    clearInterval(trendsTooltip.value);
  }
   myChart.on('mouseover', function(params){
        // 百分比  
         myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
           myChart.dispatchAction({
              type: "showTip", // 根据 tooltip 的配置项显示提示框。
              seriesIndex: 0,
              dataIndex: params.dataIndex
            });
           currentIndex =params.dataIndex
      })
      // 鼠标移出
      myChart.on('mouseout', function(params) {
        // 百分比  
        myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
      })
  trendsTooltip.value = setInterval(function () {
    let dataLen = lineOption.value.series[0].data.length;
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    // 当前高亮图形
    currentIndex = (currentIndex + 3) % dataLen;
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    if (currentIndex >= lineOption.value.series[0].data.length) {
      currentIndex = 0;
    }
  }, 1000);
  if (obj == "YSL") {
    $('#SlName').html("累计引水量:");
    $('#Sltotal').html(Number(SLtotal).toFixed(1));
    // pieArr.push({ value: SLtotal, name: "累计引水量" });
  } 
  else if (obj == "PSL") { 
    $('#SlName').html("累计排水量:")
    $('#Sltotal').html(Number(SLtotal).toFixed(1));
    // $('.text-xiaolv').html("累计排水量:" + SLtotal + "万方")
    // pieArr.push({ value: SLtotal, name: "累计排水量" });
  }

  var strHtml = "";
  for (var num = 0; num < pieArr.length; num++) {
    //入湖水量
    var sl = Number(pieArr[num].value).toFixed(1);
    var cls = "color-hh" + (num + 1);
    strHtml += '<div class="ysts-item">';
    strHtml += '<div class="ysts-name" >' + pieArr[num].name + "</div>";
    strHtml += '<div class="ysts-value ' + cls + '">';
    strHtml += '<span class="ysts-num font-agency">' + sl + "</span>";
    strHtml += '<span class="ysts-unit">万方</span>';
    strHtml += "</div>";
    strHtml += "</div>";
  }

  ystsGroup.value = strHtml;
}
function eSLChage(e) {
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialogSL.value = true;
  titleNameSL.value = e.name;
  var result = [];
  if(SetNull($.data(myData,"querySUMPSL"))!=""){
    result=$.data(myData,"querySUMPSL").filter(function(evt){
      return evt.stnm==titleNameSL.value;
    })
  } 
  if (e.name == "防洪大包围枢纽") {
    pid.value = "202410230022";
  } 
  else if (e.name == "沿江各闸") {
    pid.value = "202410230023";
  }
   else if (e.name == "城区水量") {
    pid.value = "202410230024";
  } else if (e.name == "阳澄湖水量") {
    pid.value = "202410230025";
  }
  else if (e.name == "太浦河") {
    pid.value = "202411100003";
  }
  else if (e.name == "望虞河") {
    pid.value = "202505060001";
  }
  else{
    // if(result.length>0){
    //   pid.value=result[0].stcd;
    // } 
  }
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "YPSL1";
}
onMounted(() => {
  var nowTM = new Date();
  stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
    .add(-1, "day")
    .format("YYYY-MM-DD 08:00:00");;
  etime.value = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  if (dayjs(nowTM).format("HH") < 8) {
    stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-2, "day")
      .format("YYYY-MM-DD 08:00:00");
  }
  Weacontent();
});
provide("pid", pid);
</script> 
<style scoped>
.text-xiaolv {
  height: 40px;
  width: auto;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--titled1);
  box-shadow: 0 0 10px var(--titled1), inset 0 0 10px var(--titled1);
  padding: 4px 10px;
  /* margin: 0px auto; */
  margin-top: 13px;
  line-height: 30px;
  color: var(--textXiaolv);
  float: left;
  margin-right: 10px;
}
</style>

