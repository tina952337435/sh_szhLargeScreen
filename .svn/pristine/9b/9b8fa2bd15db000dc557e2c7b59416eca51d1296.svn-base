<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">昨日小时雨强排名前5</p>
      <span class="spanTitle"></span>

      <label style="margin-left:175px;">
          <img id="swDivMore" src="/images/Moretop.png"
            style="width:15px;height:15px;vertical-align:4px;transform: rotate(90deg);" alt="更多" title="更多">
      </label>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>

  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartYQHourTop :typenameRadio="props.typenameRadio" />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("dayHourTop");
const pid = ref("20241030000002");
const stime = ref({});
const etime = ref({});
const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
});
function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = pid.value;
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  // strParam["datasource"] = "遥测";
  // strParam["pathname"] = "HOUR";
  if (props.typenameRadio == '2') {
    strParam["datasource"] = "QX";
  }
  else if (props.typenameRadio == '3') {
    strParam["datasource"] = "BX";
  }
  else if (props.typenameRadio == '4') {
    strParam["datasource"] = "YC";
  }

  // api
  //   .stPptnYQHourTop(strParam)
  //   .then((res) => {
    var res={
        result:[
             {stnm:"月浦城区",drp:64},
             {stnm:"新海镇",drp:40.0},
             {stnm:"绿华建城",drp:37},
             {stnm:"堡镇",drp:32},
             {stnm:"港西团结",drp:23}
        ]
      };
      const jsondata = res.result; //sortObjectArray(res.result, ["drp"], "desc");
      var strJson = jsondata.sort(function (a, b) {
        return b.drp - a.drp;
      });
      const result = [];
      // if (strJson.length > 0) {
      for (let num = 0; num < strJson.length; num++) {
        if (num < 10) {
          const item = strJson[num];
          // if (item["drp"] > 0) {
          let strParam = {};
          var drp = item["drp"] != undefined ? Number(item["drp"]).toFixed(1) : 0;
          strParam["stnm"] = item["stnm"];
          strParam["tm"] = item["tm"];
          strParam["drp"] = drp;
          result.push(strParam);
          // }
        }
      }
      const strNote = [];
      strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
      strNote.push({ name: "雨量", codename: "drp", tableV: "0", isShow: true });
      var LineColor = [
        "#3E8BFF",
        "#1CB8B2",
        "#01DDFF",
        "#F9C823",
        "#0264FD",
        "#FE7923",
        "#8E30FF",
      ];
      const _Option = ChartJs.chartYL(
        "",
        result,
        strNote,
        LineColor,
        "雨量",
        "true",
        _theme
      );
      _Option.tooltip.formatter = function (params) {
        let res = params[0].axisValue + '<br/>';
        params.forEach(function (item) {
          var TM = result.filter(function (e) {
            return e.stnm == item.name;
          });
          if (TM.length > 0) {
            res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(1) + '<br/>' + TM[0].tm;
          } else {
            res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(1) + '<br/>';
          }
        });
        return res;
      }
      lineOption.value = _Option;
      datekey.value = Date.now();
      // }
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "dayHourTop1";
}
onMounted(() => {
  var now = new Date();
  stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
  if (dayjs(now).format("HH") < 8) {
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-2, "day")
      .format("YYYY-MM-DD 08:00:00");
    etime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-1, "day")
      .format("YYYY-MM-DD 08:00:00");
  } else {
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-1, "day")
      .format("YYYY-MM-DD 08:00:00");
    etime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
  }

  // stime.value = "2024-05-06 08:00:00";
  // etime.value = "2024-05-06 23:00:00";
  Weacontent();
});
</script>
