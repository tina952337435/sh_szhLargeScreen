<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()">面雨量时段统计</p>
        <span class="spanTitle"></span>
      </div>
    </div>
    <div class="txt">
      <ul class="rcUl">
        <li>
            <div class="rcUlTitle">1h</div>
            <div class="rcUlValue" id="yestodaytoday" onclick="bindRainData('昨日今日')">{{rain_1h}}</div>
        </li>
        <li>
            <div class="rcUlTitle">3h</div>
            <div class="rcUlValue" id="todaytomorrow" onclick="bindRainData('今日明日')">{{rain_3h}}</div>
        </li>
        <li>
            <div class="rcUlTitle">6h</div>
            <div class="rcUlValue" id="nexttwoday" onclick="bindRainData('未来两日')">{{rain_6h}}</div>
        </li>
        <li>
            <div class="rcUlTitle">12h</div>
            <div class="rcUlValue" id="todaytomorrow" onclick="bindRainData('今日明日')">{{rain_12h}}</div>
        </li>
        <li>
            <div class="rcUlTitle">24h</div>
            <div class="rcUlValue" id="nexttwoday" onclick="bindRainData('未来两日')">{{rain_24h}}</div>
        </li>        
        <!-- <li>
            <div class="rcUlTitle">场次雨量</div>
            <div class="rcUlValue" id="nexttwoday" onclick="bindRainData('未来两日')">{{rain_event}}</div>
        </li> -->
      </ul>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>

  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartYQAreaTJ :typenameRadio="props.typenameRadio" />
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

const showDialogMOre = ref(false);
const titleMOre = ref("小时雨强排名前10");
const pathname = ref("60");
const typeValueMOre = props.typenameRadio;
const rain_event=ref(0.0);
const rain_24h=ref(0.0);
const rain_1h=ref(0.0);
const rain_12h=ref(0.0);
const rain_3h=ref(0.0);
const rain_6h=ref(0.0);
function Weacontent() {
  var strParam = {};
  strParam["stime"] =stime.value;
  strParam["etime"] =stime.value;
  api
    .getRainDashboardr(strParam)
    .then((res) => {
      const jsondata = res.data;  
      if(SetNull(jsondata)!=""){        
        rain_event.value=jsondata.rain_event;
        rain_24h.value=jsondata.rain_24h;
        rain_1h.value=jsondata.rain_1h;
        rain_12h.value=jsondata.rain_12h;
        rain_3h.value=jsondata.rain_3h;
        rain_6h.value=jsondata.rain_6h;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "daytopTen1";
}
onMounted(() => {  
  var nowTM = new Date();
  stime.value=dayjs(dayjs(nowTM).format("YYYY-MM-DD  HH:00:00"))
        .add(-24, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
  etime.value=dayjs().format("YYYY-MM-DD HH:mm:ss");
  Weacontent();
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