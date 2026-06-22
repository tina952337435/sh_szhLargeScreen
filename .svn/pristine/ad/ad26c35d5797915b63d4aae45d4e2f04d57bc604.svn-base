<template>
  <div style="width: 318px; float: left; height: 500px; padding-right: 5px">
    <div style="width: 100%; display: none" id="GQDivView1">
      <div style="
          color: white;
          text-align: center;
          font-size: 20px;
          position: absolute;
          top: 10px;
          left: 140px;
          color: #fcff04;
        ">
        剖面图
      </div>
      <div style="height: 200px">&nbsp;</div>
      <div id="DivFixed" class="wave wave3" style="
          position: fixed;
          width: 310px;
          height: 5px;
          bottom: calc(100% - 190px);
          z-index: -1;
          position: absolute;
          color: red;
          text-align: center;
          font-size: 26px;
          border-top: dashed 1px #83e7e5;
        ">
        &nbsp;
      </div>
      <div id="DivWRZ" style="
          position: fixed;
          width: 310px;
          height: 5px;
          bottom: calc(100% - 190px);
          z-index: -1;
          position: absolute;
          color: red;
          text-align: right;
          font-size: 20px;
          border-top: dashed 1px red;
          padding-right: 25px;
        ">
        &nbsp;
      </div>
      <div id="DivLEFT" style="
          position: fixed;
          width: 38px;
          height: 5px;
          bottom: calc(100% - 190px);
          z-index: -1;
          position: absolute;
          color: red;
          text-align: right;
          font-size: 20px;
          border-top: solid 2px red;
        ">
        &nbsp;
      </div>
      <div id="DivRIGHT" style="
          position: fixed;
          width: 38px;
          height: 5px;
          bottom: calc(100% - 190px);
          left: 280px;
          z-index: -1;
          position: absolute;
          color: red;
          text-align: left;
          font-size: 20px;
          border-top: solid 2px red;
        ">
        &nbsp;
      </div>
    </div>
    <div style="width: 100%" id="GQDivView2">
      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; height: 200px">
        <tr>
          <td style="color: var(--popupContentTitleColor); font-size: 16px; text-align: center; line-height: 50px" colspan="3">
            工程内外水位示意图
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <div style="
                border-right: 19px solid #9e9d9e;
                border-left: 19px solid #9e9d9e;
                border-bottom: 0px solid #9e9d9e;
                border-top: 0px;
                width: 10%;
                text-align: center;
                margin: 0 auto;
                height: 8px;
              ">
              &nbsp;
            </div>
          </td>
        </tr>
        <tr id="div1">
          <td valign="bottom" style="width: 150px" align="center">
            <!--opacity: 0.7;border-top: 2px solid #fcff04;-->
            <div id="divSW1" class="wave wave3 waveGQViewdivSW1">
              <span id="spanSW1" style="color: white">—</span>
              &nbsp;
            </div>
          </td>
          <td style="width: 10px" align="center">
            <div id="divSW2" class="waveGQViewdivSW2">
              <span id="spanSW2" style="color: white" class="none">—</span>
              &nbsp;
            </div>
          </td>
          <td valign="bottom" style="width: 150px" align="center">
            <div id="divSW3" class="wave wave3 waveGQViewdivSW3">
              <span id="spanSW3" :title="spanSW3Title" style="color: white"></span>
              &nbsp;
            </div>
          </td>
        </tr>
      </table>
      <div id="divGq" class="waveGQViewdivGq">
        <div style="width: 100%" id="divFont"></div>
        <div style="border-top: dashed 1px red; width: 100%">&nbsp;</div>
      </div>
    </div>
    <div style="width: 100%; display: none" id="GQDivView3">
      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; height: 200px">
        <tr>
          <td style="color: var(--popupContentTitleColor); font-size: 16px; text-align: center">
            工程内外水位示意图
          </td>
        </tr>
        <tr style="height: 230px; background-size: 100% 100%">
          <td style="animation: moveLeft 35s linear infinite">
            <span style="position: relative; left: 10px; top: -76px; color: yellow" id="yly_WH">
              内河水位：—
            </span>
            <span style="position: relative; left: -23px; top: 48px; color: yellow" id="yly_KD">
              开度：—
            </span>
            <span style="position: relative; left: 0px; top: -40px; color: yellow" id="yly_NH">
              外江潮位：—
            </span>
            <span style="
                position: relative;
                left: -4px;
                top: -14px;
                color: yellow;
                display: none;
              " id="yly_LS">
              流速：—
            </span>
          </td>
        </tr>
      </table>
    </div>
    <table cellspacing="0" cellpadding="0" border="1" class="table1 tableGQVoew" id="GridView1">
      <tr>
        <td colspan="2" style="background: rgba(33, 58, 68, 0.5); color: var(--popupContentTitleColor); font-size: 16px">
          工程信息
        </td>
      </tr>
      <tr>
        <td>采集时间</td>
        <td id="TM">—</td>
      </tr>
      <tr style="background: #1d2d32">
        <td>内河水位(m)</td>
        <td class="View" id="DWZ">—</td>
      </tr>
      <tr>
        <td>外河水位(m)</td>
        <td class="View" id="UPZ">—</td>
      </tr>
      <tr style="background: #1d2d32">
        <td>开机台数</td>
        <td class="View" id="TS">—</td>
      </tr>
      <tr>
        <td>闸门启闭</td>
        <td class="View" id="KB">—</td>
      </tr>
    </table>
  </div>
  <div style="width: calc(100% - 340px); float: left; margin-left: 20px">
    <div style="
        width: 100%;
        text-align: center;
        line-height: 50px;
        color: var(--popupContentTitleColor);
        font-size: 16px;
      ">
      <span id="divTITLE">&nbsp;</span>运行图
    </div>
    <div style="width: 100%; margin: 0 auto; display: none" id="divOnlyTab">
      <ul class="onlytab">
        <li id="TitleLi0" onclick="OnClickTitle(this.id,'OMCNUM')" class="onlyli start onlyliHover">
          泵站
        </li>
        <li id="TitleLi2" onclick="OnClickTitle(this.id,'GTOPNUM')" class="onlyli end">
          闸站
        </li>
      </ul>
    </div>

    <div class="gcJk" id="GCJK">
      <div style="clear: both"></div>
    </div>
  </div>
</template>
<script setup>
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElConfigProvider } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");

const tableData = ref();
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const props = defineProps({
  stcd: {
    type: String,
    default: "",
  },
});
const GateType = ref(null);
const GTOPNUM = ref({});
const OMCNUM = ref({});
const spanSW3Title = ref({});

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["stcd"] = props.stcd;
  api
    .stPptnGQTable(strParam)
    .then((ResultData) => {
      var strMsg = "";
      var o = ResultData.result[0];
      // o.upz = 5;
      // o.dwz = 4;
      if (ResultData.total > 0) {
        var tempTM = "—";
        if (o.tm != undefined) {
          tempTM = dayjs(new Date(o.tm)).format("YYYY-MM-DD HH:mm:ss");
        }
        $("#TM").html(tempTM);

        var tempMAXZ = 20;
        var tempNUM = 7;
        var chaUPZ = 2.0;
        if (o.dwz != undefined) {
          $("#divSW4").html(o.dwz);
          $("#spanSW1").html("内河水位：" + Number(o.dwz).toFixed(2));
          $("#spanSW1").attr("title", "内河水位：" + Number(o.dwz).toFixed(2));
          $("#divSW1").attr("title", "内河水位：" + Number(o.dwz).toFixed(2));
          $("#DWZ").html(Number(o.dwz).toFixed(2));
          var tempH = (chaUPZ + o.dwz) * tempMAXZ;
          if (o.dwz == 0) {
            tempH = tempMAXZ;
          }
          if (tempH > 160) {
            tempH = 160;
          }
          $("#divSW1").css("height", tempH + "px");
        } else {
          var tempH = 1 * tempMAXZ;
          $("#divSW1").css("height", tempH + "px");
        }
        if (o.upz != undefined) {
          var height = (o.upz / 5) * 1.75 * 100;
          $("#DivFixed").css("height", height);
          var tempH = (chaUPZ + o.upz) * tempMAXZ;
          if (o.upz == 0) {
            tempH = tempMAXZ;
          }
          if (tempH > 160) {
            tempH = 160;
          }
          $("#spanSW3").html("外河水位：" + Number(o.upz).toFixed(2));
          $("#spanSW3").attr("title", "外河水位：" + Number(o.upz).toFixed(2));
          $("#divSW3").attr("title", "外河水位：" + Number(o.upz).toFixed(2));
          $("#divSW3").css("height", tempH + "px");

          $("#UPZ").html(Number(o.upz).toFixed(2));
          $("#yly_NH").html("外河水位：" + Number(o.upz).toFixed(2) + "m");
        }
        if (o.wrz != undefined) {
          height = (Number(o.wrz) / 5) * 1.75 * 100;
          $("#DivWRZ").css("height", height);
          $("#DivWRZ").html("" + ResultData.result[0].WRZ + "m");
        }

        $("#divTITLE").html(ResultData.result[0].stnm);
        var tempMAXZ = 24;
        if (o.WRZ != undefined) {
          tempH = o.WRZ * tempMAXZ;
          $("#divGq").css("height", tempH + "px");
          $("#divFont").html("" + Number(o.WRZ).toFixed(2));
        }

        //GTOPNUM闸
        GTOPNUM.value = ResultData.result[0].grq;
        //OMCNUM 泵
        OMCNUM.value = ResultData.result[0].flpq;
        var NumZS = 0;
        if (GTOPNUM.value > 0 && OMCNUM.value > 0) {
          if (GateType.value == null) {
            GateType.value = "OMCNUM";
            NumZS = OMCNUM.value;
          }
        } else if (OMCNUM.value > 0) {
          if (GateType.value == null) {
            GateType.value = "OMCNUM";
            NumZS = OMCNUM.value;
          }
        } else if (GTOPNUM.value > 0) {
          $("#divOnlyTab").css("display", "none");
          if (GateType.value == null) {
            GateType.value = "GTOPNUM";
            NumZS = GTOPNUM.value;
          }
        }
        var NumTS = 0;
        var NumKB = 0;
        var strJson = ResultData.result[0].gateList;

        var liWidth = 100 / (OMCNUM.value + GTOPNUM.value);
        strMsg = " <ul>";
        if (GateType.value == "OMCNUM") {
          //泵站
          var tempTM = dayjs(new Date()).format("yyyy-MM-dd 00:00:00");
          for (var num = 0; num < OMCNUM.value; num++) {
            var temp1 = strJson.filter(function (e) {
              return (
                e.exkey == num + 1 &&
                ((Number(e.gtq) > 0 && e.eqptp == "泵站状态") ||
                  (e.eqptp == "泵站电流" && Number(e.gtq) > 10)) &&
                dayjs(new Date(e.tm)) >= tempTM
              );
            });
            var FLAG = false;
            var tempXX = "<span style='color:red;'>关泵</span>";
            if (temp1.length > 0) {
              NumTS++;
              tempXX = "<span style='color:#4CE242;'>开泵</span>";
              FLAG = true;
            }
            var p1 = strJson.filter(function (e) {
              return (
                e.exkey == num + 1 &&
                dayjs(new Date(e.tm)) >= tempTM &&
                ((e.eqptp == "泵站流量" && Number(e.gtq) > 0) ||
                  (e.eqptp == "A相电流" && Number(e.gtq) > 5))
              );
            });

            strMsg += '<li style="width:' + liWidth + '%">';
            strMsg += '   <div class="div1">';
            if (FLAG == true) {
              strMsg +=
                ' <img src="/images/gqgc/pic3.png" width="10" height="16" alt="" > ';
            } else {
              strMsg +=
                ' <img src="/images/gqgc/pic31.png" width="10" height="16" alt="" > ';
            }
            strMsg += " </div > ";
            strMsg += '  <div class="div2">';
            if (FLAG == true) {
              strMsg +=
                ' <img src="/images/gqgc/Beng.gif" width="30" height="30" alt="">';
            } else {
              strMsg +=
                ' <img src="/images/gqgc/img3.png" width="30" height="30" alt="">';
            }
            strMsg += "  </div>";
            strMsg += ' <div class="YCTable">';
            strMsg +=
              '   <table cellpadding="0" cellspacing="0" border="0" width="100%" class="JKtable">';
            strMsg += "      <tr>";
            strMsg += '          <td align="right" style="width:50%">';
            strMsg += "编号：";
            strMsg += "          </td>";
            strMsg += '          <td align="left"  style="width:50%">';
            strMsg += num + 1 + "#泵";
            strMsg += "          </td>";
            strMsg += "     </tr>";
            strMsg += "      <tr>";
            strMsg += '          <td align="right">';
            strMsg += "状态：";
            strMsg += "          </td>";
            strMsg += '          <td align="left">';
            strMsg += tempXX;
            strMsg += "          </td>";
            strMsg += "     </tr>";
            var temp1 = p1.filter(function (e) {
              return e.eqptp == "A相电流";
            });
            if (temp1.length > 0) {
              strMsg += "      <tr>";
              strMsg += '          <td align="right">';
              strMsg += "电流：";
              strMsg += "          </td>";
              strMsg += '          <td align="left">';
              if (temp1[0].gtq != undefined) {
                strMsg +=
                  '<span class="SpanColor">' +
                  Number(temp1[0].gtq).toFixed(1) +
                  "A</span>";
              } else {
                strMsg += '<span class="SpanColor">—</span>';
              }

              strMsg += "          </td>";
              strMsg += "     </tr>";
            } else {
              strMsg += "      <tr>";
              strMsg += '          <td align="right">';
              strMsg += "电流：";
              strMsg += "          </td>";
              strMsg += '          <td align="left">';
              strMsg += "—";
              strMsg += "          </td>";
              strMsg += "     </tr>";
            }
            var temp2 = p1.filter(function (e) {
              return e.eqptp == "泵站流量";
            });
            if (temp2.length > 0) {
              strMsg += "    <tr>";
              strMsg += '          <td align="right">';
              strMsg += "流量：";
              strMsg += "       </td>";
              strMsg += '          <td align="left">';
              if (SetNull(temp2[0].gtq) != "") {
                strMsg +=
                  '<span class="SpanColor">' +
                  Number(temp2[0].gtq).toFixed(1) +
                  "m³/s</span>";
              } else {
                strMsg += '<span class="SpanColor">—</span>';
              }
              strMsg += "       </td>";
              strMsg += "    </tr>";
            } else {
              strMsg += "    <tr>";
              strMsg += '          <td align="right">';
              strMsg += "流量：";
              strMsg += "       </td>";
              strMsg += '          <td align="left">';
              strMsg += "—";
              strMsg += "       </td>";
              strMsg += "    </tr>";
            }

            strMsg += " </table>";
            strMsg += "  </div>";
            strMsg += " </li>  ";
          }
        }
        if (GTOPNUM.value > 0) {
          var tempTM = dayjs(new Date()).format("yyyy/MM/dd 00:00:00");
          for (num = 0; num < GTOPNUM.value; num++) {
            var p1 = strJson.filter(function (e) {
              return (
                e.exkey == num + 1 &&
                Number(e.gtq) > 0.1 &&
                new Date(e.tm) >= tempTM &&
                e.eqptp == "闸坝开度"
              );
            });
            var FLAG = false;
            var tempGTQ = 4.5;
            if (p1.length > 0) {
              tempGTQ = Number(p1[0].gtq).toFixed(2);
            }
            var tempXX = "<span style='color:red;'>关闸</span>";
            if (tempGTQ == 4.5) {
              tempXX = "<span style='color:red;'>关闸</span>";
              //FLAG = true;
              //NumKB++;
            } else if (tempGTQ == 0) {
              tempXX = "<span style='color:#4CE242;'>开闸</span>";
              FLAG = true;
              NumKB++;
            } else {
              tempXX = "<span style='color:#4CE242;'>开闸</span>";
              FLAG = true;
              NumKB++;
            }
            strMsg += '<li style="width:' + liWidth + '%">';
            strMsg += '   <div class="div1">';
            if (FLAG == true) {
              strMsg +=
                ' <img src="/images/gqgc/pic3.png" width="10" height="16" alt="" > ';
            } else {
              strMsg +=
                ' <img src="/images/gqgc/pic31.png" width="10" height="16" alt="" > ';
            }
            strMsg += " </div > ";
            strMsg += '  <div class="div2">';
            if (FLAG == true) {
              strMsg +=
                ' <img src="/images/gqgc/icon_gate_run.gif" width="30" height="30" alt="">';
            } else {
              strMsg +=
                ' <img src="/images/gqgc/icon_gate.gif" width="30" height="30" alt="">';
            }
            strMsg += "  </div>";
            strMsg += ' <div class="YCTable">';
            strMsg +=
              '   <table cellpadding="0" cellspacing="0" border="0" width="100%" class="JKtable">';
            strMsg += "      <tr>";
            strMsg += '          <td align="right" style="width:50%">';
            strMsg += "编号：";
            strMsg += "          </td>";
            strMsg += '          <td align="left"  style="width:50%">';
            strMsg += num + 1 + "#闸";
            strMsg += "          </td>";
            strMsg += "     </tr>";
            strMsg += "      <tr>";
            strMsg += '          <td align="right">';
            strMsg += "状态：";
            strMsg += "          </td>";
            strMsg += '          <td align="left">';
            strMsg += tempXX;
            strMsg += "          </td>";
            strMsg += "     </tr>";
            var temp1 = p1.filter(function (e) {
              return e.eqptp == "闸坝开度";
            });
            if (temp1.length > 0) {
              strMsg += "      <tr>";
              strMsg += '          <td align="right">';
              strMsg += "开度：";
              strMsg += "          </td>";
              strMsg += '          <td align="left">';
              if (temp1[0].gtq != undefined) {
                strMsg +=
                  '<span class="SpanColor">' +
                  Number(temp1[0].gtq).toFixed(2) +
                  "m</span>";
              } else {
                strMsg += '<span class="SpanColor">—</span>';
              }
              strMsg += "          </td>";
              strMsg += "     </tr>";
              if (temp1[0].gtq != undefined) {
                $("#yly_KD").html("开度：" + Number(temp1[0].gtq).toFixed(2) + "m");
              } else {
                $("#yly_KD").html("开度：—");
              }
            } else {
              strMsg += "      <tr>";
              strMsg += '          <td align="right">';
              strMsg += "开度：";
              strMsg += "          </td>";
              strMsg += '          <td align="left">';
              strMsg += "—";
              strMsg += "          </td>";
              strMsg += "     </tr>";
            }
            var temp3 = strJson.filter(function (e) {
              return e.eqptp == "闸坝流量" && e.EQPNO == num + 1;
            });
            if (temp3.length) {
              strMsg += "    <tr>";
              strMsg += '          <td align="right">';
              strMsg += "流量：";
              strMsg += "       </td>";
              strMsg += '          <td align="left">';
              if (temp3[0].gtq != undefined) {
                strMsg +=
                  '<span class="SpanColor">' +
                  Number(temp3[0].gtq).toFixed(1) +
                  "m³/s</span>";
              } else {
                strMsg += '<span class="SpanColor">—</span>';
              }
              strMsg += "       </td>";
              strMsg += "    </tr>";
              if (temp3[0].gtq != undefined) {
                $("#yly_LS").html("流量：" + Number(temp3[0].gtq).toFixed(2) + "m³/s");
              } else {
                $("#yly_LS").html("流量：—");
              }
            } else {
              strMsg += "    <tr>";
              strMsg += '          <td align="right">';
              strMsg += "流量：";
              strMsg += "       </td>";
              strMsg += '          <td align="left">';
              strMsg += "—";
              strMsg += "       </td>";
              strMsg += "    </tr>";
            }
            strMsg += " </table>";
            strMsg += "  </div>";
            strMsg += " </li>  ";
          }
        }
        strMsg += " </ul>";

        strMsg += '<div style="clear:both;"></div>';
      }
      $("#GCJK").html(strMsg);
      $("#TS").html(NumTS + "/" + OMCNUM.value);
      $("#KB").html(NumKB + "/" + GTOPNUM.value);
    })
    .catch((err) => { });
}
onMounted(() => {
  Weacontent();
  if (_theme == "BlueTheme") {
    $(".popContent").css("background", "#031426");
    $(".content").css("background", "#031426e6");
  }
});
</script>

<style src="@/assets/styles/danzhanGQVIEWNew.css"></style>
<style scoped>
.tableGQVoew tr td:nth-child(odd) {
  width: 170px;
}
</style>
