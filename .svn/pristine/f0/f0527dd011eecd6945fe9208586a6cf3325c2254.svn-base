<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">{{ Riverstnm }}水位分析</p>

      <div style="width:calc(100% - 150px);" class="div-swiper">
          <div class="swiper-slide" style="width: 25%;"
            :class="Riverswiper == '63401500' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('63401500')">
            黄浦公园
          </div>
          <div class="swiper-slide" style="width: 25%;"
            :class="Riverswiper == '63401750' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('63401750')">
            吴淞口
          </div>
          <div class="swiper-slide" style="width: 25%;"
            :class="Riverswiper == '63401100' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('63401100')">
            米市渡</div>
          <div class="swiper-slide" style="width:25%;"
            :class="Riverswiper == '63405800' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('63405800')">
            芦潮港
          </div>
      </div>
    </div>
    <div class="txt">
      <!-- <div class="flex_1 width95 maiweid display_flex mhpad1 flex-wrap justify-content_flex-justify"
        style="width: 94%; margin: 0 auto; margin-top: 10px">
        <div class="widget-inline-box text-center fl" style="height: 100%; padding: 2% 0">
          <p style="font-size: 12px">
            <span style="font-size: 14px">水位</span><br />(m)
          </p>
          <h3 class="c24c9ff">{{ KSSW }}</h3>
        </div>
        <div class="widget-inline-box text-center fl" style="height: 100%; padding: 2% 0">
          <p style="font-size: 12px">
            <span style="font-size: 14px">比昨日</span><br />(m)
          </p>
          <h3 class="ceeb1fd">{{ KSSWZUO }}</h3>
        </div>
        <div class="widget-inline-box text-center fl" style="height: 100%; padding: 2% 0" :title="ivhztmWAVG">
          <p style="font-size: 12px">
            <span style="font-size: 14px">历史最高</span><br />(m)
          </p>
          <h3 class="cffff00">{{ KSSWAVG }}</h3>
        </div>
        <div class="widget-inline-box text-center fl" style="height: 100%; padding: 2% 0">
          <p style="font-size: 12px">
            <span style="font-size: 14px">比警戒</span><br />(m)
          </p>
          <h3 class="ceeb1fd">{{ KSSWWRZ }}</h3>
        </div>
        <div class="widget-inline-box text-center fl" style="height: 100%; padding: 2% 0">
          <p style="font-size: 12px">
            <span style="font-size: 14px">比保证</span><br />(m)
          </p>
          <h3 class="c11e2dd">{{ KSSWGRZ }}</h3>
        </div>
      </div> -->

       <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EChartSQTJ />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import { SetNull,sortObjectArray } from "@/api/ComUnit.js";

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("EchartSQSW");
const Riverswiper = ref("63401500");
const Riverstnm = ref("");//黄浦公园
import {
  onMounted,
  ref,
} from "vue";
// 水位统计信息
const KSSW = ref("—"),
  KSSWZUO = ref("—"),
  KSSWAVG = ref("—"),
  KSSWWRZ = ref("—"),
  KSSWGRZ = ref("—");
const ivhztmWAVG = ref("");
const KSSWZUOTM = ref({}),
  Minute = ref({});
const SWdata = ref({})
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});

function GetRiver(stcd) {
  Riverswiper.value = stcd;
  Weacontent();
}
function Weacontent() {
  var nowTM = new Date();

  // var endDate = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  // var startDate = dayjs(dayjs(endDate).format("YYYY-MM-DD HH:mm:ss"))
  //   .add(-2, "day")
  //   .format("YYYY-MM-DD HH:mm:ss");
  // startDate = "2024-05-16 00:00:00";
  // endDate = "2024-05-18 00:00:00";

  var startDate = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  if (dayjs(nowTM).format("HH") < 8) {
    startDate = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-2, "day")
      .format("YYYY-MM-DD HH:mm:ss");
  } else {
    startDate = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-1, "day")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  var endDate = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");

  // 8时雨情
  var strWhere = {};
  strWhere["datasource"] = "BX";
  strWhere["pathname"] ="1";// "HOUR";
  strWhere["stime"] = startDate;
  strWhere["etime"] = endDate;
  strWhere["stcd"] =Riverswiper.value;
  api
    .stPptnWaterLineAndYB(strWhere)
    .then((res) => {      
      var strJson = res.data;
      var jsondata = strJson.reverse();      
      SWdata.value = jsondata;//.reverse();
      setTimeout(function(){
        SWloaad();
      },500)
    })
    .catch((err) => { });
}
function SWloaad() {
  var strJson = SWdata.value;
  strJson=sortObjectArray(strJson, ["tm"], "desc").reverse();
  var oneJson=strJson.filter(function(res){
    return res.tm==dayjs(new Date()).format("YYYY-MM-DD 08:00:00")
  })
  var zuoJson=strJson.filter(function(res){
    return res.tm==dayjs(new Date()).add(-1,"day").format("YYYY-MM-DD 08:00:00")
  })

  if(oneJson.length>0){
    var item=oneJson[0];
    var upz=0;
    if(SetNull(oneJson[0]["upz"])!=""){
      KSSW.value = Number(item["upz"]).toFixed(2);
      upz = Number(item["upz"]);
    }
    var ivhz = item.ivhz != undefined ? Number(item.ivhz).toFixed(2) : "—";
      KSSWAVG.value = ivhz;
      
      var cj = item.cj != undefined ? Number(item.cj).toFixed(2) : "—";
      if (undefined != item.wrz && upz != "—") {
        cj = Number(Number(upz) - Number(item.wrz)).toFixed(2);
      }
      KSSWWRZ.value = cj;

      var cb = item.cb != undefined ? Number(item.cb).toFixed(2) : "—";
      if (undefined != item.grz && upz != "—") {
        cb = Number(Number(upz) - Number(item.grz)).toFixed(2);
      }
      KSSWGRZ.value = cb;

      KSSWZUOTM.value = item.tm;
      Minute.value = dayjs(new Date(item.tm)).format(" HH:mm:ss"); 
  }
  if(zuoJson.length>0){
    var ZUO = undefined != zuoJson[0].upz ? zuoJson[0].upz : 0;
      if (ZUO > 0) {
        var zuocha = Number(KSSW.value) - Number(ZUO);
        KSSWZUO.value = Number(zuocha).toFixed(2);
      }
  }

  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "实时", codename: "upz", tableV: "0", isShow: true });
  strNote.push({ name: "预报", codename: "ybz", tableV: "0", isShow: true });
  strNote.push({ name: "警戒", codename: "wrz", tableV: "0", isShow: true });
  // strNote.push({ name: "保证", codename: "grz", tableV: "0", isShow: true });
  strNote.push({ name: "历史最高", codename: "ivhz", tableV: "0", isShow: true });
  var LineColor = [
    "#40FC00",
    "#FF0000",
    "#01DDFF",
    "#F9C823",
    "#0264FD",
    "#FE7923",
    "#8E30FF",
  ];
  const _Option = ChartJs.chartSW(
    "",
    strJson,
    strNote,
    LineColor,
    "水位",
    "Mouth",
    _theme,
    55,
    14
  );

  lineOption.value = _Option;
  datekey.value = Date.now();
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "EchartSQSW1";
}
onMounted(() => {
  Weacontent();
});
</script>

<style scoped>
.widget-inline-box {
  text-align: center;
  color: var(--widgetcolor);
  width: 50%;
  padding: 10% 0;
  text-align: center;
  font-size: 14px;
  float: left;
  overflow: hidden;
  width: 19.2%;
  margin: 0 0.4%;
  background: var(--widgetColor);
  padding: 1% 0;
  height: 100px;
}

.def1ff {
  color: var(--def1ff);
  cursor: pointer;
  font-size: 26px;
}

.ztitem1ps {
  width: 32%;
  height: 40%;
}

.ztitemtit {
  height: 2rem;
  line-height: 2rem;
  font-weight: bold;
  color: #ddd;
  text-align: center;
  font-size: 12px;
}

.justify-content_flex-justify {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}

.yjtxtcon {
  text-align: center;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  vertical-align: bottom;
}

.yjbigtxt {
  font-size: 1.2rem;
  font-family: shufont1;
  font-weight: bold;
}

.display_flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.flex-direction_column {
  -webkit-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  -moz-flex-direction: column;
  -o-flex-direction: column;
}

.ztitemtit1 {
  background: var(--ztitemtit1);
}

.maiweid {
  width: 100%;
  box-sizing: border-box;
}

.ztitemtit {
  font-size: 14px;
}

.widget-ylTable-box {
  margin-top: 2px;
  width: 100%;
  height: calc(100% - 105px);
  font-size: 14px;
  float: left;
  overflow: hidden;
  color: var(--widgetcolor);
}

/* .c24c9ff {
  color: #24c9ff;
}
.ceeb1fd {
  color: #eeb1fd;
}
.cffff00 {
  color: #ffff00;
}
.c11e2dd {
  color: #11e2dd;
}
.ceeb1fd {
  color: #eeb1fd;
} */
h3 {
  font-size: 16px;
}
</style>
