<template>
  <div class="m-box m-box-2">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">积水点分类统计</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>


  <ComZujian :showDialog="showDialogZJ" @close="showDialogZJ = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartJSD />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { groupBy,SetNull } from "@/api/ComUnit.js"; 
import * as echarts from "echarts";
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
const titleNameJSD = ref("");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("Jsd");
var JSDdata = ref({});
const jsdname = ref(null);

function Weacontent() {
  api.PSBASESelectList({ pathname: "积水点" }).then(res => {
    var strJson = res.result;
    if (strJson.length > 0) {
      var result = strJson.filter(res => {
        res.name = res.stnm; 
        if(SetNull(res["lttd"])==""){
          res["lttd"]=res["latd"];
        } 
        return res._use == true;
      });
      var data = groupBy(result, "district");
      JSDdata.value = result;
      var pieArrNew = [];
      for (var num = 0; num < data.length; num++) {
        var strWhereNew = {};
        strWhereNew["value"] = data[num].length;
        strWhereNew["name"] = data[num][0].district;
        pieArrNew.push(strWhereNew);
      }

      var LineColor = ["#E10724", "#FD5B30", "#E0CF22", "#229FE0", "#27E022", "#8BEAC3",];
      var strNote = [
        { "name": "名称", "codename": "name", "tableV": "1", "isShow": true, "width": "40%" },
        { "name": "站点个数", "codename": "value", "tableV": "1", "isShow": true, "width": "40%" }
      ];
      const _Option = ChartJs.chartYL(
        "",
        pieArrNew,
        strNote,
        LineColor,
        "(个)",
        "true",
        _theme,
        "",
        "",
        0
      );
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
  titleNameJSD.value = e.name + "积水点";
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
  dateid.value = "Jsd1";
}

provide("JSDdata", JSDdata);
provide("jsdname", jsdname);
</script>

