<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p1" id="title2">出入水量</p>
        <span class="spanTitle"></span>
      </div>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'90%'" :option="lineOptionRu" :key="datekey" :id="dateidRu" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 800px">
    <EchartJCSL />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import MyDialog from "@/components/ComDialog.vue";
import SLLineSTCD from "@/components/danzhan/sl/SLLineSTCD.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import * as echarts from "echarts";

import { ref, onMounted, provide,reactive } from "vue";
import { SetNull,groupBy,SumJson} from '@/api/ComUnit';
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOptionRu = ref({});
const lineOptionChu = ref({});
const trendsTooltipRu = ref();
const trendsTooltipChu = ref();
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
// 判断弹窗是否显示,默认隐藏
const showDialogSL = ref(false);
const titleNameSL = ref();
const pid = ref("");
const stime = ref("");
const etime = ref("");
const dateidRu = ref("JRusl");
const dateidChu = ref("JChusl");
const SLswiper = ref("YSL");
const SLDATA = ref({});
const props = defineProps({
  stcdVal: {
    type: String,
    default: "",
  },
  resultDataSL: {
    type: String,
    default: [],
  },
});
var myData = [];
const options = ref([]);
var ResultList = reactive([]);
function Weacontent() {
  var xData=[];
  var arrYSL=[];
  var arrPSL=[];

  var nowTM = new Date();
  var strParam = {};
  strParam["pathname"] = options.value.join(",");
  strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
    .add(-3, "day")
    .format("YYYY-MM-DD HH:mm:ss");
  strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  api.getinoutwdpstatdayList(strParam).then((res) => {
    ResultList = res.data;

    var listData = groupBy(ResultList, "pathname");
    if (listData.length > 0) {
        for (var num = 0; num < listData.length; num++) {
            var strWhere = {};
            strWhere["num"] = listData[num].length;
            strWhere["rvnm"] = listData[num][0]["pathname"];
            strWhere["inq"] = Number(SumJson(listData[num], "inq")).toFixed(1);
            strWhere["outq"]= Number(SumJson(listData[num], "outq")).toFixed(1);
            // _Xdata.push(strWhere);
            const jsl=Number(SumJson(listData[num], "inq"))-Number(SumJson(listData[num], "outq"))
            if(jsl>0){
                arrYSL.push(jsl.toFixed(1));
            }
            else if(jsl<0){
                arrPSL.push(jsl.toFixed(1));
            }
            else{
                arrYSL.push(0);
                arrPSL.push(0);
            }
            xData.push(listData[num][0]["pathname"]);
        }
    }    
    lineOptionRu.value=chartSixiangSL(xData,arrYSL,arrPSL);  
    datekey.value = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  })
}
function eSLChage(e) {
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateidRu.value = "Rusl1";
  dateidChu.value = "Chusl1";
}
onMounted(() => {
  treeSel();
});
function treeSel() {
  var strParam = {
    "pid": "202505251605374003"
  }
  api.treeSel(strParam).then((res) => {
      var strJson =res.data;
      var listResult = [];
      if (strJson.length > 0) {
        for (var i = 0; i < strJson.length; i++) {
          var item = strJson[i];
          listResult.push(item.id);
        }
        options.value = listResult;
        Weacontent();
      }
    })
}

provide("pid", pid);

function chartSixiangSL(xData, arrYSL, arrPSL) {
    var legend = ['入水量',
        '出水量'];
    var option = {
        legend: {
            //icon: "circle",
            itemWidth: 12,  // 设置宽度class
            itemHeight: 12, // 设置高度im
            //orient: 'vertical',
            top: '8%',
            // 调整进出数量的图例
            right: 20,
            textStyle: {
                align: 'left',
                verticalAlign: 'top',
                color: "#fff"
            },
            data: legend
        },
        "tooltip": {
            "trigger": "axis",
            "axisPointer": {
                "type": "shadow",
                textStyle: {
                    color: "#fff"
                }

            },
            formatter: function (datas) {
                var res = datas[0].name + '<br/>'
                for (var i = 0, length = datas.length; i < length; i++) { 
                    if(datas[i].value!=null&&Math.abs(datas[i].value)!=0){
                        res += datas[i].seriesName + '：' 
                        + Math.abs(datas[i].value) + '<br/>'
                    }
                  
                 }
                 return res
               } 
        },
        "grid": {
            "borderWidth": 0,
            "top": 35,
            "bottom": 30,
            "left": 60,
            textStyle: {
                color: "#fff"
            }
        },
        "calculable": true,
        "xAxis": [{
            "type": "category",
            "axisLine": {
                lineStyle: {
                    color: '#00FFFF'
                }
            },
            "splitLine": {
                "show": false
            },
            "axisTick": {
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "axisLabel": {
                "interval": 0,
                color: '#00FFFF',
                fontSize: 11
            },
            "data": xData,
        }],
        "yAxis": [{
            name: "水量(万方)",
            "type": "value",
            "min": function (e) {
                return Number(e.min - 100).toFixed(0);
            },
            "max": function (e) {
                return Math.abs(e.max) + 100;
            },

            "splitLine": {
                "show": true,
                lineStyle: {
                    color: 'rgba(0,255,255,.2)'
                },
            },
            "axisLine": {
                "show": true,
                lineStyle: {
                    color: '#00FFFF'
                }
            },
            "axisTick": {
                "show": false
            },
            //"axisLabel": {
            //    "interval": 0,
            //    color: '#00FFFF',
            //    fontSize: 11,
            //    formatter: function (e) { 
            //        return Math.abs(e.toFixed(0));
            //    },
            //},
            "splitArea": {
                "show": false
            },

        }],
        "series": [
            {
                "name": "入水量",
                "type": "bar",
                "stack": "总量",
                "barMaxWidth": 15,
                "barGap": "10%",
                "itemStyle": {
                    "normal": {
                        "color":
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(80,202,225, 1)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(31,156,224, 1)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                },
                "data": arrYSL
            },
            {
                "name": "出水量",
                "type": "bar",
                "stack": "总量",
                "itemStyle": {
                    "normal": {
                        "color": {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(52,54,212, 1)' // 100% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(21,102,217, 1)' // 0% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        "barBorderRadius": 0
                    }
                },
                "data": arrPSL
            },
        ]
    }
    return option;
}
</script> 
<style scoped>
.text-xiaolv {
  height: 40px;
  width: auto;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--titled1);
  box-shadow: 0 0 10px var(--titled1), inset 0 0 10px var(--titled1);
  padding: 4px 10px;
  /* margin: 0px auto; */
  margin-top: 13px;
  line-height: 30px;
  color: var(--textXiaolv);
  float: left;
  margin-right: 10px;
}

.icontitle {
  margin-left: 50px;
  margin-top: 10px;
  color: var(--mtablecolor) !important;
}
</style>

