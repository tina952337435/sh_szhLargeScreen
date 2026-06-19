<template>
  <div class="m-box m-box-1">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p1" id="title2">预警信息</p>
    </div>
    <div class="txt" style="padding:0PX 10PX;">
      <div class="table-responsive">
                             <div style="height:90px;">
                                <div class="responsivekuai2"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                        <img src="/images/bao2.png" />
                                    </div>
                                    <div class="responsivetitle">降雨预报</div>
                                    <div class="responsivecontent">
                                        <span id="rainWarning" class="responsivecontentvalue" style ="color:red;"   >2小时超100mm</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div>

                            <div style="height:90px;">
                                <div  class="responsivekuai1"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                         <img src="/images/feng2.png" />
                                    </div>
                                    <div class="responsivetitle">台风预警</div>
                                    <div class="responsivecontent">
                                        <span id="weatherWarning" class="responsivecontentvalue" style ="color:red;" >6小时进入上海市影响范围线内</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div>
                           

                            <div style="height:90px;">
                                <div  class="responsivekuai1"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                        <img src="/images/qi2.png" />
                                    </div>
                                    <div class="responsivetitle">潮位增水预警</div>
                                    <div class="responsivecontent">
                                        <span id="weatherWarning" class="responsivecontentvalue" style ="color:red;" >I级</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div>

                            
                            <div style="height:90px;">
                                <div class="responsivekuai1"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                        <img src="/images/bao2.png" />
                                    </div>
                                    <div class="responsivetitle">圩区预警</div>
                                    <div class="responsivecontent">
                                        <span id="rainStorm" class="responsivecontentvalue" style ="color:yellow;" >3</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div>
                            <div style="height:90px;">
                                <div class="responsivekuai2"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                        <img src="/images/feng2.png" />
                                    </div>
                                    <div class="responsivetitle">堤防预警</div>
                                    <div class="responsivecontent">
                                        <span id="customsWarning" class="responsivecontentvalue" style ="color:#00ff39;" >0</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div>
                        </div>



      <div style="width: 40%; height: 70%; float: left;margin-top: 3%;padding-left: 12%;display:none;">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionWQWrz" :key="datekey20" :id="dateidWQWrz" />
        <div style="text-align: center;font-size: 1.1rem;color: var(--mtablecolor);margin-top: 3%">圩区</div>
      </div>
      <div style="width:40%;height: 70%;margin-top:3%;float: left;padding-left: 12%;margin-left: 8%;display:none;">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionDike" :key="datekey50" :id="dateidDike" />
        <div style="text-align: center;font-size: 1.1rem;color: var(--mtablecolor);margin-top: 3%">堤防</div>
      </div>
      <!-- <div style="width:30%;height: 70%;margin-top:3%;float: left;margin-left: 3%">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionGW" :key="datekey100" :id="dateidGW" />
        <div style="text-align: center;font-size: 1.1rem;color: var(--mtablecolor);margin-top: 3%">积水点</div>
      </div> -->
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <yubaoAreaChart :wqstrJson="wqstrJson" :key="datekeyDialog" />
  </ComZujian>

  <MyDialog :showDialog="showDialogWQ" @close="showDialogWQ = false" :title="titleNameWQ"
    style="width: 70%; height: 700px">
    <yujingWQTJ :emergencyList="emergencyList" :closeLineDialog="closeLineDialog" ref="child" />
  </MyDialog>
</template>

<script setup>
import ComZujian from "@/components/ComZujian.vue";
import { Postcard } from "@element-plus/icons-vue";
import MyDialog from "@/components/ComDialog.vue";
import yujingWQTJ from "@/components/danzhan/wq/yujingWQTJ.vue";
import Table from "@/components/Table/Table.vue";
import api from "@/api/mode/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";

import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy, GetSZStateBy, GetSZState } from "@/api/ComUnit.js";

import * as echarts from "echarts";

import {
  onMounted,
  ref,
  shallowRef,
  defineAsyncComponent,
  nextTick,
  provide,
  inject,
  watch
} from "vue";

// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();
const showDialog = ref(false);
const datekeyDialog = ref(null);


const _theme = localStorage.getItem("curTheme");
const lineOptionWQWrz = ref({});
const lineOptionDike = ref({});
const lineOptionGW = ref({});

const datekey20 = ref(null);
const datekey50 = ref(null);
const datekey100 = ref(null);

const dateidWQWrz = ref("dateidWQWrz");
const dateidDike = ref("dateidDike");
const dateidGW = ref("dateidGW");


// 判断弹窗是否显示,默认隐藏
const showDialogWQ = ref(false);
const titleNameWQ = ref('圩区预警统计');

const props = defineProps({
  DD_ARR: {
    type: String,
    default: ""
  },
  wqstrJson: {
    type: Array,
    default: []
  },
});
var wqstrJson = props.wqstrJson;
// watch(props.wqstrJson, () => {
//   Weacontent();
// });

onMounted(() => {
  // if (props.wqstrJson != null) {
  //   Weacontent();
  // }
  Weacontent();
});
const totalWQData = ref([]);
function Weacontent() {
  var totalWQWrz = 15;
  var totalDike = 45;
  var totalGW = 0;
  // for (var num = 0; num < wqstrJson.length; num++) {
  //   var item = wqstrJson[num];
  //   const wqgrz = SetNull(item.wq_flow) == "" ? "-" : Number(item.wq_flow).toFixed(2);//警戒水位
  //   const wqwrz = SetNull(item.wq_theight) == "" ? "-" : Number(item.wq_theight).toFixed(2);//最高控制水位

  //   const upz = SetNull(item.maxUpz) == "" ? "-" : Number(item.maxUpz).toFixed(2);;
  //   if (wqgrz != "-" && upz != "-") {
  //     if (Number(upz) >= Number(wqgrz)) {
  //       totalWQWrz++;
  //       totalWQData.value.push(item);
  //     }
  //   }
  //   if (wqwrz != "-" && upz != "-") {
  //     if (Number(upz) >= Number(wqwrz)) {
  //       totalWQWrz++;
  //       totalWQData.value.push(item);
  //     }
  //   }
  // }

  // console.error("totalWQData.valuetotalWQData.valuetotalWQData.value", totalWQData.value)
  var itemBg = getWarningDuoColor("黄色预警");
  var _Option = ChartJs.echartWaterPie(totalWQWrz, "", itemBg, _theme);
  lineOptionWQWrz.value = _Option;
  let chartDom = document.getElementById(dateidWQWrz.value);
  let myChart = echarts.init(chartDom);
  myChart.setOption(lineOptionWQWrz.value);
  myChart.on("click", WQeSLChage);

  var itemBgDike = getWarningDuoColor("黄色预警");
  var OptionDike = ChartJs.echartWaterPie(totalDike, "", itemBgDike, _theme);
  lineOptionDike.value = OptionDike;
  let chartDomDike = document.getElementById(dateidDike.value);
  let myChartDike = echarts.init(chartDomDike);
  myChartDike.setOption(lineOptionDike.value);

  // var itemBgGW = getWarningDuoColor("黄色预警");
  // var OptionGW = ChartJs.echartWaterPie(totalGW, "", itemBgGW, _theme);
  // lineOptionGW.value = OptionGW;
  // let chartDomGW = document.getElementById(dateidGW.value);
  // let myChartGW = echarts.init(chartDomGW);
  // myChartGW.setOption(lineOptionGW.value);
}

const emergencyList = ref([]);
function WQeSLChage() {
  let uniqueArray = totalWQData.value.filter((value, index, self) =>
    index === self.findIndex((t) => (t.wqid === value.wqid))
  )
  console.error(uniqueArray)


  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });

  emergencyList.value = uniqueArray
  showDialogWQ.value = true;
}
const closeLineDialog = () => {
  showDialogWQ.value = false;
};
function getWarningDuoColor(name) {
  //gcolor圆圈颜色
  //fontColor文本字体颜色
  //color 水波颜色
  var item = {};
  var color = [
    {
      offset: 1,
      color: ["rgba(7,222,119,0.4)"], // 0% 处的颜色
    },
    {
      offset: 0,
      color: ["rgba(5,151,81,0.8)"], // 100% 处的颜色
    },
  ];
  var bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
    {
      offset: 1,
      color: "rgba(111,234,140,0.3)",
    },
    {
      offset: 0.95,
      color: "rgba(111,234,140, 0.5)",
    },
    {
      offset: 0.8,
      color: "rgba(111,234,140, 0.3)",
    },
    {
      offset: 0.4,
      color: "rgba(30,209,73, 0.01)",
    },
  ]);
  var fontColor = "#00ffff";// "#46F604";
  var gcolor = [
    {
      offset: 1,
      color: "rgba(30,209,73, 0.01)",
    },
    {
      offset: 0,
      color: "rgba(111,234,140, 0.6)",
    },
  ];
  if (name == "黄色预警") {
    gcolor = [
      {
        offset: 1,
        color: "rgba(248,189,1, 1)",
      },
      {
        offset: 0,
        color: "rgba(248,189,1, 1)",
      },
    ];
    color = [
      {
        offset: 0,
        color: 'rgba(248,189,1, 1)',
      },
      {
        offset: 0.75,
        color: 'rgba(248,189,1, 1)',
      },
      {
        offset: 1,
        color: 'rgba(248,189,1, 1)',
      },
    ];
    // fontColor = "#F8BD01";
  }
  if (name == "红色预警") {
    gcolor = [
      {
        offset: 1,
        color: "rgba(205,40,24, 0.01)",
      },
      {
        offset: 0,
        color: "rgba(231,76,60, 0.6)",
      },
    ];
    color = [
      {
        offset: 1,
        color: ["rgba(231,76,60,0.4)"], // 0% 处的颜色
      },
      {
        offset: 0,
        color: ["rgba(234,92,78,0.8)"], // 100% 处的颜色
      },
    ];
    bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
      {
        offset: 1,
        color: "rgba(231,76,60,0.3)",
      },
      {
        offset: 0.95,
        color: "rgba(231,76,60, 0.5)",
      },
      {
        offset: 0.8,
        color: "rgba(231,76,60, 0.3)",
      },
      {
        offset: 0.4,
        color: "rgba(205,40,24, 0.01)",
      },
    ]);
  }
  item.color = color;
  item.bgcolor = bgcolor;
  item.gcolor = gcolor;
  item.fontColor = fontColor;
  return item;
}

function fangda() {
  datekeyDialog.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  // dateid.value = "yubaoAreaDiv1";
}
</script>

<style scoped>
.table-responsive{
 overflow: hidden;height:100%;width:80%;margin:15px auto;text-align:center;
}
.table-responsive .responsivekuai
{
  height:80px;background-image: linear-gradient(90deg, rgba(14, 141, 246, 0.3) 0%, rgba(26, 44, 83, 0) 100%);padding-left:20px;position:relative;
}
.table-responsive .responsivekuai1{
  height:80px;width:3px;position: relative;background-image: initial;background-position: initial;background-repeat: initial;background-attachment: initial;background-origin: initial;background-clip: initial;background-color: rgb(74, 144, 226);border-radius: 5px;opacity: 1;float:left;
}
.table-responsive .responsivekuai2{
  height:80px;width:3px;position: relative;background-image: initial;background-position: initial;background-repeat: initial;background-attachment: initial;background-origin: initial;background-clip: initial;background-color: rgb(136, 193, 54);border-radius: 5px;opacity: 1;float:left;
}
.table-responsive .responsivetitle{
 font-size:14px;height:25px;line-height:35px;color:var(--title2);
  padding-left:30px;
}
.table-responsive .responsivecontent{
 font-size:26px;height:40px;line-height:40px;
}
.table-responsive .responsivecontentvalue{
  font-size:18px;font-family: 'number';font-weight: 600;color: rgb(27, 137, 243);
  padding-left:30px;
}
.table-responsive .imgdiv{
  position:absolute;
  top:10px;
}
</style>
