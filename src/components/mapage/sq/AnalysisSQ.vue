<template>
  <div class="m-box" style="width: 100%; height: 100%">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius"
    >
      <span>告警统计</span>
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
        id="line"
      />
    </div>
    <div class="bot"></div>
  </div>
</template>
<script setup>
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import {sortObjectArray} from "@/api/ComUnit.js";
import dayjs from "dayjs";

import { ref, onMounted, reactive } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["TREEID"] = "2021062714171915450";
  strParam["STIME"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss"))
    .add(-3, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
  strParam["ETIME"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  api
    .stPptnRainsumtable(strParam)
    .then((res) => {
      const strJson = sortObjectArray(res.data, ["DRP"], "desc");
      const result = [];
      if (strJson.length > 0) {
        let numDay = 10;
        if (strJson.length < numDay) {
          numDay = strJson.length;
        }
        for (let num = 0; num < numDay; num++) {
          const item = strJson[num];
          let strParam = {};
          strParam["STNM"] = item["STNM"]
            .replaceAll("【水文】", "")
            .replaceAll("【气象】", "");
          strParam["DRP"] = item["DRP"];
          result.push(strParam);
        }
        const strNote = [];
        strNote.push({ name: "名称", codename: "STNM", tableV: "0", isShow: true });
        strNote.push({ name: "雨量", codename: "DRP", tableV: "0", isShow: true });
        var LineColor = [
          "#3E8BFF",
          "#1CB8B2",
          "#01DDFF",
          "#F9C823",
          "#0264FD",
          "#FE7923",
          "#8E30FF",
        ];
        const _Option = ChartJs.chartYL("", result, strNote, LineColor, "雨量");
        lineOption.value = _Option;
        datekey.value = Date.now();
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
onMounted(() => {
  Weacontent();
});
</script>
