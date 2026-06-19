<template>
  <div class="m-box m-box-2">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">巡查前置情况</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>


  <ComZujian :showDialog="showDialogZJ" @close="showDialogZJ = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartXC />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { groupBy } from "@/api/ComUnit.js";
import * as echarts from "echarts";
import dayjs from "dayjs";
import api from "@/api/zonglan/index.js";

import {
  onMounted,
  ref,
  provide,
} from "vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");

// 判断弹窗是否显示,默认隐藏
const showDialogZJ = ref(false);
// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();

// 判断弹窗是否显示,默认隐藏
const showDialogJSD = ref(false);


const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("xuncha");


var JSDdata = ref({});
const jsdname = ref(null);

function Weacontent() {
  var nowTM = new Date();
  var strParam = {}
  // strParam["stime"] = dayjs(nowTM).format("YYYY-MM-01 00:00:00");
  strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  strParam["pathname"] = "NEW";
  api.getXCBase(strParam).then(res => {
    var strJson = res.result;
    if (strJson.length > 0) {
      JSDdata.value = strJson;
      var LineColor = ["#E10724", "#FD5B30", "#E0CF22", "#229FE0", "#27E022", "#8BEAC3",];
      var strNote = [
        { "name": "名称", "codename": "district", "tableV": "1", "isShow": true, "width": "40%" },
        { "name": "排涝队伍", "codename": "dw_num", "tableV": "1", "isShow": true, "width": "40%" }
      ];
      strNote.push({ "name": "排涝队员", "codename": "people_num", "tableV": "1", "isShow": false, "width": "40%" });
      strNote.push({ "name": "排涝设备", "codename": "sb_num", "tableV": "1", "isShow": false, "width": "40%" });
      strNote.push({ "name": "巡查车次", "codename": "car_num", "tableV": "1", "isShow": false, "width": "40%" });
      strNote.push({ "name": "巡查人次", "codename": "car_people", "tableV": "1", "isShow": false, "width": "40%" });
      strNote.push({ "name": "设施数量", "codename": "xlj_num", "tableV": "1", "isShow": false, "width": "40%" });
      strNote.push({ "name": "发现隐患", "codename": "found_num", "tableV": "1", "isShow": false, "width": "40%" });
      strNote.push({ "name": "消除隐惠", "codename": "delete_num", "tableV": "1", "isShow": false, "width": "40%" });
      strNote.push({ "name": "疏通边井", "codename": "jing_num", "tableV": "1", "isShow": false, "width": "40%" });
      strNote.push({ "name": "发现积水", "codename": "js_num", "tableV": "1", "isShow": false, "width": "40%" });
      const _Option = ChartJs.chartSL(
        "",
        JSDdata.value,
        strNote,
        LineColor,
        "数量",
        " ",
        _theme,
        "",
        "true",
        ""
      );
      // 修改 legend 配置，使其靠右显示
      _Option.legend = {
        ..._Option.legend,
        right: 0 // 距离右侧 10px，可按需调整
      };
      lineOption.value = _Option;


      let chartDom = document.getElementById(dateid.value);
      let myChart = echarts.init(chartDom);
      myChart.setOption(lineOption.value);
      myChart.on("click", eSLChage);
    }
  }).catch(err => { });
}
const closeLineDialog = () => {
  showDialogJSD.value = false;
};
//饼图点击事件
function eSLChage(e) {
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialogJSD.value = true;
  jsdname.value = e.name;
}
onMounted(() => {
  Weacontent();
});

function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialogZJ.value = true;
  dateid.value = "xuncha1";
}

provide("JSDdata", JSDdata);
provide("jsdname", jsdname);
</script>

