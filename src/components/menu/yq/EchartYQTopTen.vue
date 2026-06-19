<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()">短时强雨</p>
        <span class="spanTitle"></span>
      </div>
      <!-- <div style="width:calc(100% - 200px);" class="div-swiper">
        <div class="swiper-slide" style="width: 25%;"
          :class="Drpswiper == 'YL1' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL1')">
          10分钟
        </div>
        <div class="swiper-slide" style="width: 25%;"
          :class="Drpswiper == 'YL3' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL3')">
          15分钟</div>
        <div class="swiper-slide" style="width: 25%;"
          :class="Drpswiper == 'YL6' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL6')">
          30分钟</div>
        <div class="swiper-slide" style="width: 25%;"
          :class="Drpswiper == 'YL0' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL0')">
          60分钟</div>
      </div> -->
    </div>
    <div class="txt">
      <ul class="rcUl">
                            <li>
                                <div class="rcUlTitle">1h超30mm</div>
                                <div class="rcUlValue" id="yestodaytoday" onclick="bindRainData('昨日今日')">15</div>
                            </li>
                            <li>
                                <div class="rcUlTitle">1h超50mm</div>
                                <div class="rcUlValue" id="todaytomorrow" onclick="bindRainData('今日明日')">10</div>
                            </li>
                            <li>
                                <div class="rcUlTitle">1h超100mm</div>
                                <div class="rcUlValue" id="nexttwoday" onclick="bindRainData('未来两日')">0</div>
                            </li>
                            <li>
                                <div class="rcUlTitle">6h超200mm</div>
                                <div class="rcUlValue" id="todaytomorrow" onclick="bindRainData('今日明日')">8</div>
                            </li>
                            <li>
                                <div class="rcUlTitle">24h超250mm</div>
                                <div class="rcUlValue" id="nexttwoday" onclick="bindRainData('未来两日')">5</div>
                            </li>
                        </ul>
      <!-- <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table FirstTable" :border="0"
        :cellspacing="0" :cellpadding="0"/> -->
      <!-- <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" /> -->
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>

  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartYQTopTen :typenameRadio="props.typenameRadio" />
  </ComZujian>

  <MyDialog :showDialog="showDialogMOre" @close="showDialogMOre = false" :title="titleMOre" :typeValue="typeValueMOre"
    style="width: 1400px; height: 800px">
    <EchartYQTopTenMore :typenameRadio="props.typenameRadio" />
  </MyDialog>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import EchartYQTopTenMore from "@/components/menu/yq/EchartYQTopTenMore.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive, inject } from "vue";
import customTable from "@/components/Table/customTable.vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("daytopTen");
const Drpswiper = ref("YL1");
const stime = ref("");
const etime = ref("");
const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
});
const tableData = ref([]);
const tableHeaders = ref([
{ name: "grade", label: "级别" },
  { name: "num", label: "个数" }
]);
tableData.value.push({grade:"1小时超30.0毫米",num:15});
tableData.value.push({grade:"1小时超50.0毫米",num:10});
tableData.value.push({grade:"1小时超100.0毫米(",num:0});
tableData.value.push({grade:"6小时超200.0毫米",num:8});
tableData.value.push({grade:"24小时超250.0毫米",num:5});

const showDialogMOre = ref(false);
const titleMOre = ref("小时雨强排名前10");
const pathname = ref("60");
const typeValueMOre = props.typenameRadio;
function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = "20241030000002";
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  strParam["pathname"] = pathname.value;
  if (props.typenameRadio == 2) {
    strParam["datasource"] = "QX";
  }
  else if (props.typenameRadio == 3) {
    strParam["datasource"] = "BX";
  }
  else if (props.typenameRadio == 4) {
    strParam["datasource"] = "YC";
  }
  // api
  //   .QueryMAXDRPList(strParam)
  //   .then((res) => {
      var res={
        result:[
             {stnm:"月浦城区",drp:15},
             {stnm:"新海镇",drp:12.0},
             {stnm:"绿华建城",drp:9},
             {stnm:"堡镇",drp:6},
             {stnm:"港西团结",drp:2}
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
        _theme,
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
    //})
    // .catch((err) => {
    //   console.error(err);
    // });
}
function GetDrpTen(obj) {
  Drpswiper.value = obj;
  if (obj == "YLMOre") {
    $(".g-lside ").css({ "z-index": 90 });
    $(".g-rside ").css({ "z-index": 99 });
    showDialogMOre.value = true;
  } else {
    var now = new Date();
    var v = obj.replace("YL", "");
    if (v > 0) {
      etime.value = dayjs(now).format("YYYY-MM-DD HH:59:59");
      stime.value = dayjs(dayjs(now).format("YYYY-MM-DD  HH:00:00"))
        .add(-v, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
      pathname.value = "" + v * 60 + "";
    } else if (v == 0) {
      stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
      if (dayjs(now).format("HH") < 8) {
        stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
          .add(-24, "hour")
          .format("YYYY-MM-DD HH:mm:ss");
      } else {
        stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
      }
      etime.value = dayjs(now).format("YYYY-MM-DD HH:59:59");
      pathname.value = "60";
    }
    Weacontent();
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
  dateid.value = "daytopTen1";
}
onMounted(() => {
  // Weacontent();
  GetDrpTen("YL1")
});
</script> 

<style scoped>
.rcUl {
            margin: 0px auto;
            width: 100%;
        }

        .rcUl li {
            list-style: none;
            float: left;
            width: calc(33.33% - 22px);
            text-align: center;
            margin-right: 15px;
             margin-top: 15px;
        }

        .rcUl li:first-child,.rcUl li:nth-child(4) {
            /* margin-left: 15px; */
        }

        .rcUlTitle {
            /*font-size: 15px;*/
            border-radius: 10px 10px 0px 0px;
            /*background: #3AC082;*/
            background: linear-gradient(180deg, #3AC082 0, #073c24);
            background: linear-gradient(180deg, #0299f5 0, #132a61);
            background: linear-gradient(180deg, #064364 0, #092f42);
            height: 40px;
            line-height: 40px;
            color: white;
        }

        .rcUlValue {
            border-radius: 0px 0px 10px 10px;
            background: #F4F4F4;
            height: 40px;
            line-height: 40px;
            font-size: 26px;
            /* font-weight: 550; */
            margin: 0px;
            /*font-family: 'number';*/
            cursor: pointer;
            color: rgb(27, 137, 243);
            color: rgb(26 212 115);
            color: var(--titled1);
            background-color: #097bf733;
            background-color: #112f507d;
            cursor: pointer;
        }
</style>