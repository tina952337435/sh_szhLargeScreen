<template>
  <div style="width:100%;height:650px;background:var(--wqInformation-bg);">
    <ul class="wqInformation">
      <li>
        <div style="height:calc(100% - 150px);width:100%;background:var(--wqInformation-li-bg);">


          <div class="labelffield" style="padding:10px;padding: 10px 10px 0px 10px;">圩区水位</div>
          <div style="height:300px;width:100%;">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekeyChart" :id="dateid" />
          </div>
          <div style="height:80px;width:400px;margin:0px auto;padding-top: 35px ">
            <div class="labelf">
              <div class="labelfvalue labelfvalueKZ">
                <span id="WQQPSW"></span>
                <span class="conter-nayudanwei">m</span>
              </div>
              <div class="labelffield">控制水位</div>
            </div>
            <div class="labelf">
              <div class="labelfvalue labelfvalueWrz">
                <span id="WQAPSW"></span>
                <span class="conter-nayudanwei">m</span>
              </div>
              <div class="labelffield">受淹水位</div>
            </div>
            <div class="labelf">
              <div class="labelfvalue labelfvalueGrz">
                <span id="WQ_THEIGHT"></span>
                <span class="conter-nayudanwei">m</span>
              </div>
              <div class="labelffield">堤防高程</div>
            </div>
          </div>
        </div>


        <div style="height:130px;width:100%;background:var(--wqInformation-li-bg);margin-top: 20px;">
          <div class="labelffield" style="padding:10px;padding: 10px 10px 0px 10px;">推荐调度</div>
          <div :class="tableDataDDGZ.length == 0 && 'labelffield'" class="labelfvalue"
            style="text-align:center;font-size:18px;">
            {{ tableDataDDGZValue }}
          </div>
        </div>
      </li>
      <li>
        <div style="height:calc(50% - 10px);width:100%;background:var(--wqInformation-li-bg);">
          <div class="labelffield" style="padding:10px;padding: 10px 10px 0px 10px;">泵站开机情况</div>
          <Echarts :width="'100%'" :height="'60%'" :option="lineOptionDL" :key="datekeyChartDL" :id="dateidDL" />
          <div style="height:calc(40% - 40px);width:90%;margin:0px auto;">
            <div class="labelf" style="width:33.33333%;">
              <span class="labelffield">开泵数</span>
              <span id="gatekaicount" class="labelfvalue" style="padding-left:10px;">6</span>
              <span class="conter-nayudanwei">台</span>
            </div>
            <div class="labelf" style="width:33.33333%;">
              <span class="labelffield">泵总数</span>
              <span id="gatecount" class="labelfvalue labelfvalueMore" style="padding-left:10px;">12</span>
              <span class="conter-nayudanwei">台</span>
            </div>
            <div class="labelf" style="width:33.33333%;">
              <span class="labelffield">开机率</span>
              <span id="gatekaicountbili" class="labelfvalue labelfvalueMore" style="padding-left:10px;">50</span>
              <span class="conter-nayudanwei">%</span>
            </div>
          </div>
        </div>
        <div style="height:calc(50% - 10px);width:100%;background:var(--wqInformation-li-bg);margin-top:20px;">
          <div class="labelffield" style="padding:10px;padding: 10px 10px 0px 10px;">纳雨量</div>

          <div style="width:90%;height:calc(100% - 40px);margin:0px auto;">
            <Echarts :width="'100%'" :height="'80%'" :option="lineOptionNYL" :key="datekeyChartNYL" :id="dateidNYL" />
          </div>




          <!-- <div class="conter-nayu">
            <div style="position: absolute;bottom: 40px;">
              <span id="capacityDiv" class="conter-nayulabel"></span>
              <span class="conter-nayudanwei">mm</span>
            </div>
          </div> -->

          <div class="panelDiv">
            <div class="iconDiv" style="width:90px;">
              <div
                style="position: absolute; top: 18px; left: 0px; width: 100%; font-size: 16px; text-align: center; letter-spacing: 1px; padding: 0px; color: rgb(58, 165, 252);">
                <div class="tubiao tubiaoFirst" style="color:white;width:175px;">到警戒水位可纳雨量</div>
              </div>
            </div>
            <div class="dive" style="left:132px;"></div>
            <div class="dataClass dataDivTop" style="left:190px;">
              <strong id="capacityDivWRZ"></strong>
              <span class="conter-nayudanwei">mm</span>
            </div>
            <div class="dataClass dataDivBottom">
              <span id="allRiverPoGrade"></span>
            </div>
          </div>
          <div class="panelDiv">
            <div class="iconDiv" style="width:90px;">
              <div
                style="position: absolute; top: 18px; left: 0px; width: 100%; font-size: 16px; text-align: center; letter-spacing: 1px; padding: 0px; color: rgb(58, 165, 252);">
                <div class="tubiao tubiaoFirst" style="color:white;width:175px;">到设计水位可纳雨量</div>
              </div>
            </div>
            <div class="dive" style="left:132px;"></div>
            <div class="dataClass dataDivTop" style="left:190px;">
              <strong id="capacityDivGRZ"></strong>
              <span class="conter-nayudanwei">mm</span>
            </div>
            <div class="dataClass dataDivBottom">
              <span id="RiverPoOneBili"></span>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div style="height:calc(50% - 10px);width:100%;background:var(--wqInformation-li-bg);">
          <div class="labelffield" style="padding:10px;padding: 10px 10px 0px 10px;">圩区流量</div>
          <Echarts :width="'100%'" :height="'60%'" :option="lineOptionLL" :key="datekeyChartLL" :id="dateidLL" />
          <div style="height:calc(40% - 40px);width:90%;margin:0px auto;">
            <div class="labelf" style="width:50%;">
              <span class="labelffield">设计流量</span>
              <span id="pumcap" class="labelfvalue" style="padding-left:10px;"></span>
              <span class="conter-nayudanwei">m³/s</span>
            </div>
            <div class="labelf" style="width:50%;">
              <span class="labelffield">排涝模数</span>
              <span id="PLSJPUM" class="labelfvalue" style="padding-left:10px;">6</span>
              <span class="conter-nayudanwei">亩m³/s</span>
            </div>
          </div>
        </div>
        <div style="height:calc(50% - 10px);width:100%;background:var(--wqInformation-li-bg);margin-top:20px;">
          <div class="labelffield" style="padding:10px;padding: 10px 10px 0px 10px;">24小时预报水位过程</div>
          <Echarts :width="'80%'" :height="'60%'" :option="lineOptionSW" :key="datekeyChartSW" :id="dateidSW"
            style="margin:0px 10%;" />
          <div style="height:calc(40% - 40px);width:90%;margin:0px auto;">
            <div class="labelf" style="width:50%;">
              <span class="labelffield">最高水位</span>
              <span id="yubaomaxz" class="labelfvalue" style="padding-left:10px;"></span>
              <span class="conter-nayudanwei">m</span>
            </div>
            <div class="labelf" style="width:50%;">
              <span class="labelffield">出现时间</span>
              <span id="yubaomaxztm" class="labelfvalue labelfvalueMore" style="padding-left:10px;"></span>
            </div>
          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  ElDatePicker,
  ElRadio,
  ElButton,
  ElSelect,
  ElOption,
  ElConfigProvider
} from "element-plus";
import {
  onMounted,
  ref,
  inject
} from "vue";

import dayjs from "dayjs";
import $ from "jquery";
import api from "@/api/zonglan/index.js";
import * as echarts from 'echarts'
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, sortObjectArray, groupBy } from "@/api/ComUnit.js";
import Dialog from "@/api/utils/Dialog.js";

const _theme = localStorage.getItem("curTheme");

const props = inject("props");
const datekeyChart = ref(null);
const lineOption = ref({});
const dateid = ref("wqwaterpieDiv");

const datekeyChartDL = ref(null);
const lineOptionDL = ref({});
const dateidDL = ref("wqwaterpieDLDiv");

const datekeyChartLL = ref(null);
const lineOptionLL = ref({});
const dateidLL = ref("wqSJLLDiv");

const datekeyChartNYL = ref(null);
const lineOptionNYL = ref({});
const dateidNYL = ref("NYLDiv");

const datekeyChartSW = ref(null);
const lineOptionSW = ref({});
const dateidSW = ref("ybswDiv");

onMounted(() => {
  const wqwrz =
    SetNull(props.items.wqwrz) == "" ? "-" : Number(props.items.wqwrz).toFixed(2);
  const wqgrz =
    SetNull(props.items.wqgrz) == "" ? "-" : Number(props.items.wqgrz).toFixed(2);
  const wq_theight =
    SetNull(props.items.wq_theight) == "" ? "-" : Number(props.items.wq_theight).toFixed(2);
  const capacity =
    SetNull(props.items.capacity) == ""
      ? "-"
      : Number(props.items.capacity).toFixed(1);
  const wqTheightcapacity =
    SetNull(props.items.wqTheightcapacity) == ""
      ? "-"
      : Number(props.items.wqTheightcapacity).toFixed(1);

  $("#WQQPSW").html(wqwrz);
  $("#WQAPSW").html(wqgrz);
  $("#WQ_THEIGHT").html(wq_theight);
  $("#capacityDivWRZ").html(capacity);
  $("#capacityDivGRZ").html(wqTheightcapacity);



  var waterList = props.items.waterList;
  if (SetNull(props.items.waterList) != "") {
    var waterListDesc = sortObjectArray(waterList, ["dwz"], "desc");
  } else {
    var waterListDesc = []
  }

  var maxupz = props.items.maxUpz == null ? "-" : Number(props.items.maxUpz).toFixed(2);
  $("#yubaomaxz").html(maxupz);//预报最高水位
  if (waterListDesc.length > 0) {
    const maxztm = dayjs(waterListDesc[0].tm).format("MM-DD HH:mm");
    $("#yubaomaxztm").html(maxztm);//预报最低水位
  } else {
    $("#yubaomaxztm").html("-");//预报最低水位
  }

  waterPie();
  if (props.wqid == "23010515") {
    WQgcload();
  } else {
    const gatekaicount = props.items.gatekaicount;
    const gatecount = props.items.gatecount;
    const gatekaicountbili = gatecount != 0 ? (gatekaicount / gatecount * 100).toFixed(0) : 0;

    $("#gatekaicount").html(gatekaicount);
    $("#gatecount").html(gatecount);
    $("#gatekaicountbili").html(gatekaicountbili);
    ProgressBar(gatekaicountbili);


    const tgtq = SetNull(props.items.tgtq) == "" ? 0 : props.items.tgtq;
    const pumcap = SetNull(props.items["pumcap"]) == "" ? "-" : Number(props.items["pumcap"]).toFixed(1);
    $("#pumcap").html(pumcap);

    const plsjpum = SetNull(props.items["pumcap"]) == "" ? "-" : Number(props.items["plsjpum"]).toFixed(1);
    $("#PLSJPUM").html(plsjpum);

    sjllPie(tgtq, pumcap);
  }
  chartYBSW();

  nylProgressBar(capacity, wqTheightcapacity);

  Weacontentddgz();
});
function WQgcload() {
  var nowTM = new Date();
  var etime = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  var stime = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  if (Number(dayjs(nowTM).format("HH")) > 7) {
    stime = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  }
  else {
    stime = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  var strWhere = {};
  strWhere["pathname"] = "NEW";
  strWhere["pid"] = "2025041114281595968";
  strWhere["stime"] = stime;
  strWhere["etime"] = etime;
  api
    .stPptnGQTable(strWhere)
    .then((res) => {
      var gatekaicount = 0, gatecount = 0, gatekaicountbili = 0;//泵站开机情况
      var pumcap = 0, tgtq = 0; //圩区流量
      var strJson = groupBy(res.result, "stnm");
      var result = [];
      for (var num = 0; num < strJson.length; num++) {
        var item = strJson[num];
        var stnm = item[0].stnm;
        var gtqTotal = 0;
        var stcdzm = "", stcdbz = "", mtype = "", flpqNum = 0, grqNum = 0;
        var flow = SetNull(item[0].flow) == "" ? "-" : Number(item[0].flow).toFixed(2);
        if (SetNull(item[0].flow) != "") {
          pumcap += Number(item[0].flow);
        }

        if (item[0].stGateR != undefined) {
          var tm = dayjs(item[0].stGateR[0].tm).format('MM-DD HH:mm')
        } else {
          var tm = "—"
        }
        for (var i = 0; i < item.length; i++) {
          var stateHtml = [], imgUrl = "";
          var bzdataALL = item.filter(function (e) {
            return e.mtype == "泵站";
          });
          flpqNum = bzdataALL.length;
          var zmdataALL = item.filter(function (e) {
            return e.mtype == "闸站";
          });
          grqNum = zmdataALL.length;
          if (bzdataALL.length > 0) {
            var bzdataNUM = bzdataALL[0].num; //泵站个数
            if (bzdataALL[0].stGateR != undefined) {
              bzdataNUM = bzdataALL[0].stGateR.length;
            }
            var bengNoIndex = 0;
            gatecount += Number(bzdataNUM);
            for (var i = 0; i < bzdataNUM; i++) {
              if (bzdataALL[0].stGateR != undefined) {
                var bzdata = bzdataALL[0].stGateR;
                if (bzdata[i] != undefined) {
                  stcdbz = bzdata[0].stcd;
                  if (Number(bzdata[i].gtq) > 0) {
                    bengNoIndex = bengNoIndex + 1;
                    imgUrl = "/images/gqgc/bz_open.png";
                    if (_theme == "BlueTheme") {
                      imgUrl = "/images/gqgc/bz_green.png";
                    }

                    if (bzdataALL[0].stcd = "320508000001") {
                      bzdata[i].insflow = 5
                    } else if (bzdataALL[0].stcd = "320508000005") {
                      bzdata[i].insflow = 1
                    }
                    if (SetNull(bzdata[i].insflow) != "") {
                      gtqTotal += Number(bzdata[i].insflow);
                    }
                  } else {
                    imgUrl = "/images/gqgc/bz_close.png";
                    if (_theme == "BlueTheme") {
                      imgUrl = "/images/gqgc/bz_gray.png";
                    }
                  }
                }
              } else {
                imgUrl = "/images/gqgc/bz_close.png";
                if (_theme == "BlueTheme") {
                  imgUrl = "/images/gqgc/bz_gray.png";
                }
              }
              stateHtml.push(imgUrl);
            }
            gatekaicount += Number(bengNoIndex);
          }
          if (zmdataALL.length > 0) {
            var zmdataBUM = zmdataALL[0].num;
            if (zmdataALL[0].stGateR != undefined) {
              zmdataBUM = zmdataALL[0].stGateR.length;
            }
            for (var i = 0; i < zmdataBUM; i++) {
              if (zmdataALL[0].stGateR != undefined) {
                var zmdata = zmdataALL[0].stGateR;
                if (zmdata[i] != undefined) {
                  stcdzm = zmdata[0].stcd;
                  if (Number(zmdata[i].gtq) > 0) {
                    imgUrl = "/images/gqgc/sz_open.png";
                    if (_theme == "BlueTheme") {
                      imgUrl = "/images/gqgc/sz_green.png";
                    }
                  } else {
                    imgUrl = "/images/gqgc/sz_close.png";
                    if (_theme == "BlueTheme") {
                      imgUrl = "/images/gqgc/sz_gray.png";
                    }
                  }
                }
              } else {
                imgUrl = "/images/gqgc/sz_close.png";
                if (_theme == "BlueTheme") {
                  imgUrl = "/images/gqgc/sz_gray.png";
                }
              }
              stateHtml.push(imgUrl);
            }

          }
        }
        if (stateHtml.length == 0) {
          stateHtml = "—"
        }


        var _strParam = {};
        _strParam["index"] = num + 1;
        _strParam["stnm"] = stnm;
        _strParam["imageUrls"] = stateHtml;
        _strParam["tm"] = tm;
        _strParam["plsjpum"] = flow;
        _strParam["q"] = gtqTotal;
        _strParam["stime"] = stime;
        _strParam["etime"] = etime;
        _strParam["stcdbz"] = stcdbz;
        _strParam["stcdzm"] = stcdzm;
        _strParam["flpq"] = flpqNum;
        _strParam["grq"] = grqNum;
        _strParam["stcd"] = item[0].stcd;
        _strParam["lgtd"] = item[0].lgtd;
        _strParam["lttd"] = item[0].lttd;
        result.push(_strParam);
        tgtq += gtqTotal;
      }
      $("#pumcap").html(pumcap);
      // console.error(tgtq, pumcap)
      sjllPie(tgtq, pumcap);
      gatekaicountbili = gatecount != 0 ? (gatekaicount / gatecount * 100).toFixed(0) : 0;

      $("#gatekaicount").html(gatekaicount);
      $("#gatecount").html(gatecount);
      $("#gatekaicountbili").html(gatekaicountbili);
      ProgressBar(gatekaicountbili);
    })
    .catch((err) => { });
}
const tableDataDDGZ = ref([]);
const tableDataDDGZValue = ref("缺少基础资料，暂无法推荐");
function Weacontentddgz() {
  var strParam = { "pathname": props.items.wqid, "datasource": "SC", "strExp": "true" };
  api.wqbaseddgz(strParam).then(res => {
    tableDataDDGZ.value = res.result;
    if (tableDataDDGZ.value.length > 0) {
      tableDataDDGZValue.value = tableDataDDGZ.value[0].nt;
    }
    else {
      tableDataDDGZValue.value = "缺少基础资料，暂无法推荐";
    }
  })
}
function waterPie() {
  var data = props.items;
  var subtextStr = "正常";
  var fromColor = "#42F700";
  const upz =
    props.items.upz == null ? "-" : Number(props.items.upz).toFixed(2);
  var valWQWrz = data["upz"] - data["wqgrz"];
  var valGrz = data["upz"] - data["wq_theight"];
  if (valGrz > 0 && data["wq_theight"] != null && data["wq_theight"] != undefined) {
    fromColor = "#FF0000";
    subtextStr = "超设计";
  }
  else if (valWQWrz > 0 && data["wqwrz"] != null && data["wqwrz"] != undefined) {
    fromColor = "#FFD54E";
    subtextStr = "超警戒";
  }
  else {
    fromColor = "#42F700";
    subtextStr = "正常";
  }
  var itemBg = getWarningDuoColor(subtextStr);
  subtextStr = "当前水位";
  var _Option = ChartJs.echartWaterPie(upz, subtextStr, itemBg, _theme);
  lineOption.value = _Option;
  datekeyChart.value = Date.now();

}
function ProgressBar(value) {
  // value=50;
  const _Option = ChartJs.echartProgressBar(value, _theme);
  lineOptionDL.value = _Option;
  datekeyChartDL.value = Date.now();
}
function sjllPie(value, pumcap) {
  // console.error("value", value, props)
  // const data = props.items;
  // const pumcap = Number(data["pumcap"]);
  const _Option = ChartJs.echartsjllPieNew(value, pumcap, _theme);
  lineOptionLL.value = _Option;
  datekeyChartLL.value = Date.now();
}

function nylProgressBar(capacity, wqTheightcapacity) {
  var datax = ["到设计水位可纳雨量", "到警戒水位可纳雨量"];
  var datay = [wqTheightcapacity, capacity];
  const _Option = ChartJs.echartProgressBarNYL("", datax, datay, _theme);
  lineOptionNYL.value = _Option;
  datekeyChartNYL.value = Date.now();
}

function chartYBSW() {
  var yubaomaxz = Number($("#yubaomaxz").html());
  var yubaomaxztm = $("#yubaomaxztm").html();

  var strJson = [];
  if (SetNull(props.items.waterList) != "") {
    strJson = sortObjectArray(props.items.waterList, ["tm"], "asc");
  }
  var LineColor = [
    "#3E8BFF",
    "#1CB8B2",
    "#01DDFF",
    "#F9C823",
    "#0264FD",
    "#FE7923",
    "#8E30FF",
  ];
  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "水位", codename: "dwz", tableV: "0", isShow: true });
  const _Option = ChartJs.chartSWNoXYAxis(
    "",
    strJson,
    strNote,
    LineColor,
    "水位",
    "Mouth",
    _theme,
    80,
    20,
    yubaomaxztm,
    yubaomaxz
  );
  lineOptionSW.value = _Option;
  datekeyChartSW.value = Date.now();
}
function getWarningDuoColor(name) {
  //gcolor圆圈颜色
  //fontColor文本字体颜色
  //color 水波颜色
  var item = {};
  // var color = [
  //     {
  //         offset: 0,
  //         color: 'rgba(21,149,234, 1)',
  //     },
  //     {
  //         offset: 0.75,
  //         color: 'rgba(21,149,234, 1)',
  //     },
  //     {
  //         offset: 1,
  //         color: 'rgba(21,149,234, 1)',
  //     },
  // ];
  var color = [
    {
      offset: 0,
      color: 'rgba(80,243,13, 1)',
    },
    {
      offset: 0.75,
      color: 'rgba(80,243,13, 1)',
    },
    {
      offset: 1,
      color: 'rgba(80,243,13, 1)',
    },
  ];
  var bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
    {
      offset: 1,
      color: "rgba(255,255,255,0)",
    },
    {
      offset: 0.95,
      color: "rgba(255,255,255, 0.0)",
    },
    {
      offset: 0.8,
      color: "rgba(255,255,255, 0.0)",
    },
    {
      offset: 0.4,
      color: "rgba(255,255,255, 0.0)",
    },
  ]);
  var fontColor = "#00ffff";// "#46F604";
  var gcolor = [
    {
      offset: 0,
      color: 'rgba(80,243,13, 1)',
    },
    {
      offset: 0.5,
      color: 'rgba(80,243,13, 1)',
    },
    {
      offset: 1,
      color: 'rgba(80,243,13, 1)',
    },
  ];
  if (name == "超警戒") {
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
  if (name == "超保证" || name == "超设计") {
    gcolor = [
      {
        offset: 1,
        color: "rgba(205,40,24,1)",
      },
      {
        offset: 0,
        color: "rgba(205,40,24,1)",
      },
    ];
    // fontColor = "#CD2818";
    color = [
      {
        offset: 0,
        color: 'rgba(205,40,24, 1)',
      },
      {
        offset: 0.75,
        color: 'rgba(205,40,24, 1)',
      },
      {
        offset: 1,
        color: 'rgba(205,40,24,1)',
      },
    ];
  }
  item.color = color;
  item.bgcolor = bgcolor;
  item.gcolor = gcolor;
  item.fontColor = fontColor;
  return item;
}
</script>

<style scoped>
.wqInformation {
  list-style: none;
  padding-inline-start: 0px;
  height: calc(100% - 20px);
}

.wqInformation li {
  width: calc(33.3333% - 20px);
  height: 100%;
  margin: 10px;
  float: left;
}

.labelf {
  float: left;
  width: 33.333333%;
  text-align: center;
}

.labelfvalue {
  font-size: 28px;
  color: var(--wqdanzhansycmsh2color);
}

.labelfvalueMore {
  color: var(--wqdanzhansycmspancolor);
}

.labelfvalueKZ {
  color: #46F604;
}

.labelfvalueWrz {
  color: rgb(255, 213, 78);
}

.labelfvalueGrz {
  color: red;
}

.labelfvalueNone {
  color: var(--wqdanzhansycmsh2color);
}

.labelffield {
  color: var(--wqdanzhansycmspancolor);
  opacity: var(--wqdanzhansycmspancoloropacity);
  opacity: 0.8;
  font-size: 18px;
  padding-top: 10px;
}

.conter-nayu {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: var(--conter-nayuimg);
  background-size: 100% 100%;
  width: 40%;
  margin: 0 auto;
  color: #fff;
  height: 70%;
  position: relative;
}

.conter-nayulabel {
  font-size: 25px;
  color: var(--conter-nayulabel);
  font-weight: 600;
}

.conter-nayudanwei {
  font-size: 18px;
  color: var(--wqdanzhansycmspancolor);
  padding-left: 5px;
}

.panelDiv {
  /* float: left; */
  margin-right: 15%;
  margin-left: 15%;
  margin-top: 15px;
  width: 70%;
  height: 80px;
  background: var(--wqInformation-bg);
  position: relative;
  display: none;
}

.iconDiv {
  width: 60px;
  height: 100%;
  position: absolute;
  left: 0px;
}

.dive {
  width: 2px;
  height: 50px;
  position: absolute;
  left: 82px;
  top: 15px;
  /* background: rgb(168, 216, 255); */
}

.dataClass {
  position: absolute;
  left: 82px;
  width: calc(100% - 62px);
  text-align: left;
  font-family: 微软雅黑;
}

.dataDivTop {
  height: 80px;
  padding: 10px 0px 0px 10px;
  font-size: 18px;
  line-height: 60px;
}

.dataDivTop strong {
  color: var(--wqdanzhansycmsh2color);
  font-size: 25px;
}

.dataDivBottom {
  top: 45px;
  text-align: left;
  padding: 0px 0px 0px 10px;
  font-size: 14px;
}

.ltDanwei {
  font-size: 14px;
  color: var(--wqdanzhansycmspancolor);
  opacity: var(--wqdanzhansycmspancoloropacity);
}

.tubiao {
  margin: 8px 10px 0px 20px;
  float: left;
  width: 50px;
  height: 30px;
  background-color: rgb(22, 132, 226);
  line-height: 30px;
  border-radius: 5px;
  font-size: 18px;
  opacity: 0.8;
}

.tubiaoFirst {
  /* background-image: linear-gradient(to right, rgb(15 147 144), rgb(14, 154, 207)); */
  background: none;
}

.tubiaoTwo {
  background-image: linear-gradient(to right,
      rgb(119, 80, 252),
      rgb(163, 201, 253));
}

.tubiaoThree {
  background-image: linear-gradient(to right,
      rgb(97 228 171),
      rgb(15, 207, 123));
}

.tubiaoFour {
  background-image: linear-gradient(to right,
      rgb(147, 113, 254),
      rgb(254, 91, 159));
}

.tubiaoFive {
  background-image: linear-gradient(to right,
      rgb(245, 206, 139),
      rgb(238, 92, 101));
}
</style>
