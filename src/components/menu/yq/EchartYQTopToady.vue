<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">崇西闸降雨过程</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>

  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartYQTopToady :typenameRadio="props.typenameRadio" />
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
const dateid = ref("daytopToday");
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
  strParam["pathname"] = "SUM";
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
  //   .stPptnRain(strParam)
  //   .then((res) => {
      const res={
    "total": 25,
    "result": [
        {
            drp: 7.5,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 08:00:00"
        },
        {
            drp: 0.5,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 09:00:00"
        },
        {
            drp: 15.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 10:00:00"
        },
        {
            drp: 17.5,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 11:00:00"
        },
        {
            drp: 1.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 12:00:00"
        },
        {
            drp: 3.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 13:00:00"
        },
        {
            drp: 4.5,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 14:00:00"
        },
        {
            drp: 4.5,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 15:00:00"
        },
        {
            drp: 35.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 16:00:00"
        },
        {
            drp: 22.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 17:00:00"
        },
        {
            drp: 10.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 18:00:00"
        },
        {
            drp: 0.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 19:00:00"
        },
        {
            drp: 10.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 20:00:00"
        },
        {
            drp: 16.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 21:00:00"
        },
        {
            drp: 11.5,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 22:00:00"
        },
        {
            drp: 0.5,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-30 23:00:00"
        },
        {
            drp: 0.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-31 00:00:00"
        },
        {
            drp: 0.5,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-31 01:00:00"
        },
        {
            drp: 2.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-31 02:00:00"
        },
        {
            drp: 2.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-31 03:00:00"
        },
        {
            drp: 1.5,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-31 04:00:00"
        },
        {
            drp: 0.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-31 05:00:00"
        },
        {
            drp: 0.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-31 06:00:00"
        },
        {
            drp: 0.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-31 07:00:00"
        },
        {
            drp: 0.0,
            stcd: [
                "62701402"
            ],
            tm: "2025-07-31 08:00:00"
        }
    ],
    "dataSize": 0,
    "pageSize": 0,
    "message": "操作成功",
    "isSuccess": true,
    "pageTotal": 0,
    "pageIndex": 0,
    "elapseTime": 9,
    "expand": null
}
      const jsondata = res.result; //sortObjectArray(res.result, ["drp"], "desc");
      var strJson = jsondata.sort(function (a, b) {
        return b.drp - a.drp;
      });
      const result = [];
      // if (strJson.length > 0) {
      for (let num = 0; num < strJson.length; num++) {
        //if (num < 10) {
          const item = strJson[num];
          // if (item["drp"] > 0) {
          let strParam = {};
          var drp = item["drp"] != undefined ? Number(item["drp"]).toFixed(1) : 0;
          strParam["tm"] =item["tm"];//dayjs(item["tm"]).format("yyyy-MM-dd HH:mm:ss");
          strParam["drp"] = drp;
          result.push(strParam);
          // }
        //}
      }
      const strNote = [];
      strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
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
        _theme,
        "时间",
        "Mouth"
      );
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
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "daytopToday1";
}
onMounted(() => {
  var now = new Date();
  stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
  if (dayjs(now).format("HH") < 8) {
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-1, "day")
      .format("YYYY-MM-DD HH:mm:ss");
  } else {
    stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
  }
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");

  // stime.value = "2024-05-06 08:00:00";
  // etime.value = "2024-05-06 23:00:00";

  Weacontent();
});
</script>
