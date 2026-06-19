<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()" style="width: 100px;">进出水量</p>
        <span class="spanTitle"></span>
      </div>
      <div style="width:calc(100% - 100px);" class="div-swiper">
        <div class="swiper-slide" style="width: 50%;"
          :class="SLswiper == 'YSL' && 'swiper-slide swiper-slide-thumb-active'" @click="GetSL('YSL')">
          进水
        </div>
        <div class="swiper-slide" style="width: 50%;"
          :class="SLswiper == 'PSL' && 'swiper-slide swiper-slide-thumb-active'" @click="GetSL('PSL')">
          出水</div>
      </div>
      <div style="height: 28px;line-height: 28px;">
        <el-select v-model="treeValue" style="width:120px;" clearable placeholder="请选择" @change="handleChange">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="txt">
      <echartsLine :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <SLjinchu />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import SLjinchu from "@/components/menu/sl/SLjinchu.vue";
import echartsLine from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { groupBy, SetNull, sortObjectArray, SumJson } from "@/api/ComUnit.js";
import { ElSelect } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";
import * as echarts from "echarts";
import Dialog from "@/api/utils/Dialog.js";

import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
var ResultList = reactive([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("DaySLLine");
const SLswiper = ref("YSL");
const options = ref([]);
const treeValue = ref("");

var myData = [];
function Weacontent1() {
  ResultList = reactive([]);

  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = "202411100001";
  strParam["pathname"] = "DAY";
  strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD 00:00:00")).add(-7, "day").format("YYYY-MM-DD HH:mm:ss");
  strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  api.stPptnGQSLAll(strParam).then((res) => {
    let strJson = groupBy(res.result, "TM");
    if (strJson.length > 0) {
      for (let num = 0; num < strJson.length; num++) {
        let itemList = strJson[num];
        if (itemList.length > 0) {
          let strWhere = {};
          strWhere["tm"] = itemList[0]["TM"];
          strWhere["num"] = itemList.length;
          for (let i = 0; i < itemList.length; i++) {
            strWhere["stnm" + i] = itemList[i]["STNM"];
            strWhere["accdw" + i] = itemList[i]["accdw"];
            strWhere["accpw" + i] = itemList[i]["accpw"];
          }
          ResultList.push(strWhere);
        }

      }
    }
    setTimeout(function () {
      GetPSLEcharts(ResultList);
    }, 500)
  });

}
function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  // strParam["pid"] = "202505251605374003";
  // strParam["pid"]=treeValue.value;
  // strParam["pathname"] = "DAY";
  strParam["pathname"] = treeValue.value;
  strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
    .add(-3, "day")
    .format("YYYY-MM-DD HH:mm:ss");
  strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  // api.querySUMPSLDan(strParam).then((res) => {
  //   ResultList=res.result; 
  //   GetEcharts(ResultList);

  // })
  //api.getinoutwdpstatdayList(strParam).then((res) => {
    var res={
    "result": [
        {
            "outq": 2907.44,
            "pathname": "流域性河道",
            "inq": 0.0,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "望虞河",
            "stcd": "63204301",
            "stnm": "常熟"
        },
        {
            "outq": 0.0,
            "pathname": "流域性河道",
            "inq": 1359.56,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "吴淞江",
            "stcd": "Y320507007A1-004",
            "stnm": "吴淞江（上）"
        },
        {
            "outq": 0.0,
            "pathname": "流域性河道",
            "inq": 291.29,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "太浦河",
            "stcd": "63205311",
            "stnm": "太浦闸"
        },
        {
            "outq": 0.0,
            "pathname": "流域性河道",
            "inq": 1304.64,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "京杭运河",
            "stcd": "63203000",
            "stnm": "枫桥"
        },
        {
            "outq": 450.7,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204401",
            "stnm": "浒浦"
        },
        {
            "outq": 651.1,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204600",
            "stnm": "白茆"
        },
        {
            "outq": 171.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204850",
            "stnm": "七浦塘"
        },
        {
            "outq": 674.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204950",
            "stnm": "杨林"
        },
        {
            "outq": 1226.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63205050",
            "stnm": "浏河"
        },
        {
            "outq": 0.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63203860",
            "stnm": "琳桥"
        },
        {
            "outq": 9.59,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63204210",
            "stnm": "永昌泾"
        },
        {
            "outq": 0.0,
            "pathname": "阳澄区",
            "inq": 69.65,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63204220",
            "stnm": "冶长泾"
        },
        {
            "outq": 828.18,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-30 08:00:00",
            "rvnm": "通娄江-浏河河道",
            "stcd": "Y320506005A1-004",
            "stnm": "青阳港"
        },
        {
            "outq": 4676.79,
            "pathname": "流域性河道",
            "inq": 0.0,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "望虞河",
            "stcd": "63204301",
            "stnm": "常熟"
        },
        {
            "outq": 0.0,
            "pathname": "流域性河道",
            "inq": 160.24,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "吴淞江",
            "stcd": "Y320507007A1-004",
            "stnm": "吴淞江（上）"
        },
        {
            "outq": 0.0,
            "pathname": "流域性河道",
            "inq": 0.0,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "太浦河",
            "stcd": "63205311",
            "stnm": "太浦闸"
        },
        {
            "outq": 0.0,
            "pathname": "流域性河道",
            "inq": 360.29,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "京杭运河",
            "stcd": "63203000",
            "stnm": "枫桥"
        },
        {
            "outq": 697.2,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204401",
            "stnm": "浒浦"
        },
        {
            "outq": 1012.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204600",
            "stnm": "白茆"
        },
        {
            "outq": 334.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204850",
            "stnm": "七浦塘"
        },
        {
            "outq": 1214.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204950",
            "stnm": "杨林"
        },
        {
            "outq": 2332.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63205050",
            "stnm": "浏河"
        },
        {
            "outq": 7.67,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63203860",
            "stnm": "琳桥"
        },
        {
            "outq": 8.3,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63204210",
            "stnm": "永昌泾"
        },
        {
            "outq": 0.0,
            "pathname": "阳澄区",
            "inq": 70.45,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63204220",
            "stnm": "冶长泾"
        },
        {
            "outq": 803.85,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-07-31 08:00:00",
            "rvnm": "通娄江-浏河河道",
            "stcd": "Y320506005A1-004",
            "stnm": "青阳港"
        },
        {
            "outq": 3468.37,
            "pathname": "流域性河道",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "望虞河",
            "stcd": "63204301",
            "stnm": "常熟"
        },
        {
            "outq": 384.14,
            "pathname": "流域性河道",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "吴淞江",
            "stcd": "Y320507007A1-004",
            "stnm": "吴淞江（上）"
        },
        {
            "outq": 0.0,
            "pathname": "流域性河道",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "太浦河",
            "stcd": "63205311",
            "stnm": "太浦闸"
        },
        {
            "outq": 0.0,
            "pathname": "流域性河道",
            "inq": 152.06,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "京杭运河",
            "stcd": "63203000",
            "stnm": "枫桥"
        },
        {
            "outq": 622.1,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204401",
            "stnm": "浒浦"
        },
        {
            "outq": 979.6,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204600",
            "stnm": "白茆"
        },
        {
            "outq": 266.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204850",
            "stnm": "七浦塘"
        },
        {
            "outq": 802.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204950",
            "stnm": "杨林"
        },
        {
            "outq": 2056.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63205050",
            "stnm": "浏河"
        },
        {
            "outq": 1.01,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63203860",
            "stnm": "琳桥"
        },
        {
            "outq": 2.14,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63204210",
            "stnm": "永昌泾"
        },
        {
            "outq": 0.0,
            "pathname": "阳澄区",
            "inq": 62.12,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63204220",
            "stnm": "冶长泾"
        },
        {
            "outq": 707.1,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-01 08:00:00",
            "rvnm": "通娄江-浏河河道",
            "stcd": "Y320506005A1-004",
            "stnm": "青阳港"
        },
        {
            "outq": 4106.59,
            "pathname": "流域性河道",
            "inq": 0.0,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "望虞河",
            "stcd": "63204301",
            "stnm": "常熟"
        },
        {
            "outq": 399.45,
            "pathname": "流域性河道",
            "inq": 0.0,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "吴淞江",
            "stcd": "Y320507007A1-004",
            "stnm": "吴淞江（上）"
        },
        {
            "outq": 0.0,
            "pathname": "流域性河道",
            "inq": 485.78,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "太浦河",
            "stcd": "63205311",
            "stnm": "太浦闸"
        },
        {
            "outq": 0.0,
            "pathname": "流域性河道",
            "inq": 271.3,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "京杭运河",
            "stcd": "63203000",
            "stnm": "枫桥"
        },
        {
            "outq": 1010.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204401",
            "stnm": "浒浦"
        },
        {
            "outq": 1214.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204600",
            "stnm": "白茆"
        },
        {
            "outq": 285.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204850",
            "stnm": "七浦塘"
        },
        {
            "outq": 1123.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63204950",
            "stnm": "杨林"
        },
        {
            "outq": 2460.0,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "通长江河道",
            "stcd": "63205050",
            "stnm": "浏河"
        },
        {
            "outq": 6.06,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63203860",
            "stnm": "琳桥"
        },
        {
            "outq": 119.87,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63204210",
            "stnm": "永昌泾"
        },
        {
            "outq": 0.0,
            "pathname": "阳澄区",
            "inq": 77.34,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "通望虞河河道",
            "stcd": "63204220",
            "stnm": "冶长泾"
        },
        {
            "outq": 418.57,
            "pathname": "阳澄区",
            "inq": 0.0,
            "tm": "2025-08-02 08:00:00",
            "rvnm": "通娄江-浏河河道",
            "stcd": "Y320506005A1-004",
            "stnm": "青阳港"
        }
    ],
    "total": 52,
    "Message": "操作成功",
    "success": "true"
}
    ResultList = res.result;
    GetEcharts(res.result)
  //})
}
function GetPSLEcharts(strJson) {
  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  if (strJson.length > 0) {
    for (let num = 0; num < strJson[0]["num"]; num++) {
      if (SLswiper.value == "YSL") {
        if (strJson[0]["stnm" + num] == "太浦河") {
          // strNote.push({ name: strJson[0]["stnm" + num] + "引水量", codename: "accpw" + num, tableV: "0", isShow: true });
        }
        else {
          strNote.push({ name: strJson[0]["stnm" + num] + "", codename: "accpw" + num, tableV: "0", isShow: true });
        }
      }
      else {
        if(strJson[0]["stnm" + num] =="太浦河"){
          strNote.push({ name: strJson[0]["stnm" + num] + "", codename: "accdw" + num, tableV: "0", isShow: true });
        }
      }
    }
  }
  var LineColor = ["#30B90F", "#50CAE1", "#0186AE"];
  const _Option = ChartJs.chartSL(
    dateid.value,
    strJson,
    strNote,
    LineColor,
    "水量",
    "Day",
    _theme,
    false
  );
  if (_Option.series.length > 0) {
    for (var num = 0; num < _Option.series.length; num++) {
      _Option.series[num]["label"] = {
        normal: {
          color: '#FFFFFF',
          show: true,
          position: 'top'
        }
      }
    }
  }
  lineOption.value = _Option;
  datekey.value = Date.now();
  // setTimeout(function(){
  //   let myCharts=echarts.init("DaySLLine");
  //       myCharts.clear();
  //       myCharts.setOption(lineOption.value);
  // },500)

}
function GetEcharts(strJson) {
  var _Xdata = [];
  var listData = groupBy(strJson, "tm");
  if (listData.length > 0) {
    for (var num = 0; num < listData.length; num++) {
      var itemList = groupBy(listData[num], "rvnm");
      if (itemList.length > 0) {
        var strWhere = {};
        strWhere["tm"] = itemList[0][0]["tm"];
        strWhere["num"] = itemList.length;
        for (var i = 0; i < itemList.length; i++) {
          strWhere["rvnm" + i] = itemList[i][0]["rvnm"];
          strWhere["inq" + i] = SumJson(itemList[i], "inq");
          strWhere["outq" + i] = SumJson(itemList[i], "outq");
        }
        _Xdata.push(strWhere);
      }
    }
  }
  let strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  if (_Xdata.length > 0) {
    var item = _Xdata[0];
    for (var i = 0; i < _Xdata[0]["num"]; i++) {
      if (SLswiper.value == "YSL") {
        if(item["rvnm" + i]=="太浦河"){
          strNote.push({ name: item["rvnm" + i] + "", codename: "inq" + i, tableV: "0", isShow: true });
        }
      }
      else {
        if(item["rvnm" + i]=="太浦河"){
          strNote.push({ name: item["rvnm" + i] + "", codename: "outq" + i, tableV: "0", isShow: true });
        }
      }
    }
  }
  var LineColor = ["#30B90F", "#50CAE1", "#0186AE", "#FF6F61", "#FFB6C1", "#FFFFF0", "#D3D3D3", "#FF7F50", "#FFA500", "#FF4500", "#FF0000", "#FF1493", "#8B008B"];
  $.data(myData, "GetEcharts", strJson);
  const _Option = ChartJs.chartSL(
    dateid.value,
    _Xdata,
    strNote,
    LineColor,
    "水量",
    "Day",
    _theme,
    false
  );
  if (_Option.series.length > 0) {
    for (var num = 0; num < _Option.series.length; num++) {
      _Option.series[num]["barWidth"] = 15;
      _Option.series[num]["label"] = {

        normal: {
          color: '#FFFFFF',
          show: true,
          position: 'top',
          formatter: function (params) {
            var strVal = "";
            if (Number(params.value) > 0) {
              strVal = params.value;
            }
            return strVal
          }
        }
      }
    }
  }
  // lineOption.value = _Option;
  var chartDom = document.getElementById(dateid.value);
  let myChart = echarts.init(chartDom);
  myChart.clear();
  myChart.setOption(_Option);
  myChart.on("click", GWeSLChage);

  // datekey.value = Date.now();
}
function GWeSLChage(e) {
         

  var strJson = [];
  if (SetNull($.data(myData, "GetEcharts")) != "") {
    strJson = $.data(myData, "GetEcharts").filter(function (evt) {
      return evt["rvnm"] == e["seriesName"];
    });
  }
  if (strJson.length > 0) {
    var nowTM = new Date();
    var tempStime = dayjs(nowTM).add(-7, "DAY").format("YYYY-MM-DD 08:00:00");
    var tempEtime = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
    const ChildVue = defineAsyncComponent(() =>
      import("@/components/danzhan/sl/SLLineSTCDZL.vue")
    );
    const props = {};
    props["pid"] = strJson[0]["rvnm"];
    // props["pathname"]="DAY";
    props["stime"] = tempStime;
    props["etime"] = tempEtime;
    //ChildVue为弹窗中嵌入的slot
    Dialog.open({ title: strJson[0]["rvnm"], widh: 1800, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
  } 
 e.preventDefault(); // 阻止默认的点击行为（如果有的话）  
}

function GetSL(e) {
  SLswiper.value = e;
  GetEcharts(ResultList)
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "DaySLLine1";
}
onMounted(() => {
  // options.value.push({ label: '24小时', value: '24小时' });
  treeSel();

});
function treeSel() {
  // var strParam = {
  //   "pid": "202505251605374003"
  // }
  // strParam["flag"] = "进出水量";
  // api.
  //   getFzTypeList(strParam).then((res) => {
  //     var strJson = groupBy(res.result, "mentid");
  //     var listResult = [];
  //     if (strJson.length > 0) {
  //       for (var i = 0; i < strJson.length; i++) {
  //         var item = strJson[i][0];
  //         listResult.push({ label: item["mentid"], value: item["mentid"] });
  //         if (i == 0) {
  //           treeValue.value = item["mentid"];
  //         }
  //       }
  //       options.value = listResult;
        Weacontent();
    //   }
    // })
}
function handleChange(evt) {
  treeValue.value = evt;
  Weacontent();
}
</script> 
<style scoped>
.el-select-dropdown__item {
  color: var(--mtablecolor);
}

.el-select-dropdown__item.is-hovering {
  color: var(--sel_wraplabelcolorSel) !important;
  background-color: var(--popupContentTitleColor);
}

:deep(.el-input) {
  --el-input-border-color: var(--mtablecolor);
  width: 200px;
  border-radius: 6px;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--mtablecolor) inset;
}

:deep(.el-input__inner) {
  color: var(--mtablecolor);
}

:deep(.el-table__body-wrapper .el-table__row:nth-child(even)) {
  background: none;
}

:deep(.el-select__wrapper) {
  box-shadow: none;
}

:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: none
}
</style>
