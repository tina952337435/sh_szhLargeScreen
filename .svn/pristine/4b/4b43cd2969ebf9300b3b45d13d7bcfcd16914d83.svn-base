<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">周边超警超保统计</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <EchartsList :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
    style="width: 70%; height: 700px">
    <EchartSQGJ />
  </ComZujian>
  <MyDialog :showDialog="showDialogSW" @close="showDialogSW = false" :title="titleNameSW" :typeValueSW="typeValueSW"
    style="width: 70%; height: 700px">
    <SQTJ />
  </MyDialog>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import EchartsList from "@/components/MyEcharts/echartsLine.vue";
import SQTJ from "@/components/danzhan/sq/SQTJ.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { groupBy, SetNull, sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ElMessage, ElTimePicker } from "element-plus";
import * as echarts from "echarts";

import { ref, onMounted, reactive, inject, provide } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const trendsTooltip = ref();

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showDialogSW = ref(false);
const dateid = ref("PieZBCJ");
const titleName = ref();
const titleNameSW = ref();
// 传递水位的类别：1:正常;2:超警;3:超保;4:缺测;
const typeValueSW = ref();
const pidSW = ref("2021082417454958998");
const stime = ref("2024-09-12 14:41:44");
const etime = ref("2024-09-12 17:41:44");
const zcNCount = ref(0);
const wrzNCount = ref(0);
const grzNCount = ref(0);
const nullNCount = ref(0);

function Weacontent() {
  var now=new Date();
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  if(Number(dayjs(now).format("HH"))>7){
    stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
  }
  else{
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  var strParam = {};
  strParam["pid"] = pidSW.value;
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  api
    .stPptnWater(strParam)
    .then((res) => {
      const data = groupBy(res.result, "stcd");
      // if (data.length > 0) {
      var strJson = [];
      var strWhere = {};
      var wrzcount = 0,
        nullcount = 0,
        totalcount = 0,
        zccount = 0,
        grzCount = 0;

      for (var num = 0; num < data.length; num++) {
        var item = data[num][0];
        if(SetNull(item["tm"])!=""){
          if(SetNull(item["upz"])!=""){
            let colorCss="";
            if(SetNull(item["wrz"])!=""){
               let chaWrz=Number(SetNull(item["upz"]))-Number(SetNull(item["wrz"]));
               if(chaWrz>0){
                  colorCss="#FF9E43";
               }
            }
            if(SetNull(item["grz"])!=""){
              let chaWrz=Number(SetNull(item["upz"]))-Number(SetNull(item["grz"]));
               if(chaWrz>0){
                  colorCss="#F70019";
               }
            }
            if(colorCss=="#FF9E43"){
              wrzcount++;
            }
            else if(colorCss=="#F70019"){
              grzCount++;
            }
            else{
              zccount++;
            }
            
          }
          else{
            zccount++;
          }
        }
        else{
          nullcount++;
        }
      }
      totalcount = data.length;
      strWhere["SQSTNM"] = "水情";
      strWhere["WRZCW"] = wrzcount;
      strWhere["GRZCW"] = grzCount;
      strWhere["QCCW"] = nullcount;
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

      var colorArr = ["#16FF8D", "#FF9E43", "#F70019","#C1C1C1"];
      var colorAlpha = ["#16FF8D", "#FF9E43","#F70019", "#C1C1C1"];
      var valuedata1 = [zccount, wrzcount,grzCount, nullcount];
      zcNCount.value = zccount;
      wrzNCount.value = wrzcount;
      grzNCount.value = wrzcount;
      nullNCount.value = nullcount;
      var percentdata = [
        ((zccount / totalcount) * 100).toFixed(2),
        ((wrzcount / totalcount) * 100).toFixed(2),
        ((grzCount / totalcount) * 100).toFixed(2),
        ((nullcount / totalcount) * 100).toFixed(2),
      ];
      const _Option = ChartJs.echartCJpei(
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
      myChart.on("click", eSLChage);
     
      // 动态显示tootip
      // 当前高亮图形所在下标
      let currentIndex = -1;

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

      // }
    })
    .catch((err) => {
      console.error(err);
    });
}
function eSLChage(param) {
  SQtable(param.name)
}
function SQtable(e) {
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  if (e == "正常") {
    if (zcNCount.value > 0) {
      showDialogSW.value = true;
      titleNameSW.value = "水位正常站点";
      typeValueSW.value = 1;
    } else {
      ElMessage.error("无数据");
    }
  }
  if (e == "超警") {
    if (wrzNCount.value > 0) {
      showDialogSW.value = true;
      titleNameSW.value = "水位超警戒站点";
      typeValueSW.value = 2;
    } else {
      ElMessage.error("无数据");
    }
  }
  if (e == "超保") {
    if (wrzNCount.value > 0) {
      showDialogSW.value = true;
      titleNameSW.value = "水位超保证站点";
      typeValueSW.value = 3;
    } else {
      ElMessage.error("无数据");
    }
  }
  if (e == "缺测") {
    if (nullNCount.value > 0) {
      titleNameSW.value = "水位缺测站点";
      typeValueSW.value = 4;
      showDialogSW.value = true;
    } else {
      ElMessage.error("无数据");
    }
  }
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "PieZBCJ1";
}
onMounted(() => {
  var now = new Date();
  if (dayjs(now).format("HH") < 8) {
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  } else {
    stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
  }
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
 

  Weacontent();
});
// 提供方法给子组件
provide("typeValueSW", typeValueSW);
provide("pidSW", pidSW);
provide("stime", stime);
provide("etime", etime);
</script>
