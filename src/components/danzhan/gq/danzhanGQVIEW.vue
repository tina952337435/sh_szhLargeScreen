<template>
  <div
    style="
      width: calc(100% - 40px);
      float: left;
      margin-left: 20px;
      margin-top: 20px;
    "
    id="divGCJK"
  >
    <div style="width: 100%; margin: 0 auto; display: none" id="divOnlyTab">
      <ul class="onlytab">
        <li
          id="TitleLi0"
          onclick="OnClickTitle(this.id, 'omcnum')"
          class="onlyli start onlyliHover"
        >
          泵站
        </li>
        <li
          id="TitleLi2"
          onclick="OnClickTitle(this.id, 'gtopnum')"
          class="onlyli end"
        >
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
import "@/assets/styles/danzhanGQVIEWNew.css";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import { groupBy, SetNull } from "@/api/ComUnit.js";
import $ from "jquery";

import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");

const zmData = ref();
const bzData = ref();
const zmGQdata = ref();
const bzGQdata = ref();
const GQdata = ref();
const stime = inject("stime");
const etime = inject("etime");
const stcd = inject("stcd");
const itemData = inject("item");
const props = defineProps({
  stcd: {
    type: String,
    default: "",
  },
  stime: {
    type: String,
    default: "",
  },
  etime: {
    type: String,
    default: "",
  },
  item: {
    type: Object,
    default: {},
  },
});

function Weacontent() {
  var nowTM = new Date();
  var strJsonAll = [];
  var zmstrJsonAll = [],
    bzstrJsonAll = [];
  var strParam = {};
  strParam["stcd"] = stcd.value;
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;  
  strJsonAll =itemData;
  console.error('strJsonAll',strJsonAll);
  setTimeout(() => {
    GQload(strJsonAll);
  }, 1000);
}
function GQload(strJsonAll) {
  console.error(strJsonAll);
  var omcnum=SetNull( strJsonAll.grq)!=""?Number(strJsonAll.grq):0;
  var gtopnum=SetNull( strJsonAll.flpq)!=""?Number(strJsonAll.flpq):0;
  var omcnNum = omcnum+gtopnum;
  var tempTM = dayjs(new Date()).format("yyyy-MM-dd 00:00:00");
  var strMsg = "";
  var liWidth = 100 / omcnNum;
  strMsg = " <ul>";
  //GTOPNUM闸
  var zmdata = strJsonAll.gateList.filter(function (e) {
    return e.eqpno == 1;
  });
  // omcnum 泵
  var bzdata = strJsonAll.gateList.filter(function (e) {
    return e.eqpno == 2;
  });
  for (var num = 0; num < bzdata.length; num++) {
    var temp1 = bzdata.filter(function (e) {
      return (
        e.exkey == num + 1 &&
        ((Number(e.gtq) > 0 && e.eqptp == "泵站状态") ||
          (Number(e.gtq) > 0))
      );
    });
    var FLAG = false;
    var tempXX = "<span style='color:red;'>关泵</span>";
    if (temp1.length > 0) {
      tempXX = "<span style='color:#4CE242;'>开泵</span>";
      FLAG = true;
    }
    var p1 = bzdata.filter(function (e) {
      return (
        e.exkey == num + 1 &&
        dayjs(new Date(e.tm)) >= tempTM &&
        ((e.eqptp == "泵站电流" && Number(e.gtq) > 0) ||
          (e.eqptp == "A相电流" && Number(e.gtq) > 5))
      );
    });

    strMsg += '<li style="width:' + liWidth + '%">';
    strMsg += '   <div class="back"></div>';
    strMsg += '   <div class="div1">';
    if (FLAG == true) {
      strMsg +=
        ' <img src="/images/gqgc/pic3.png" width="10" height="16" alt="" style="margin-left: -6px;"> ';
    } else {
      strMsg +=
        ' <img src="/images/gqgc/pic31.png" width="10" height="16" alt=""  style="margin-left: -6px;"> ';
    }
    strMsg += " </div > ";
    strMsg += '  <div class="div2">';
    if (FLAG == true) {
      strMsg +=
        ' <img src="/images/gqgc/Beng.gif" width="30" height="30" alt="" style="margin-left: -6px;">';
    } else {
      strMsg +=
        ' <img src="/images/gqgc/img3.png" width="30" height="30" alt="" style="margin-left: -6px;">';
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
    var temp3 = temp1.filter(function (e) {
      return e.eqptp == "泵站流量" || e.eqptp == "泵站状态";
    });
    if (temp3.length > 0) {
      console.error("temp3,", temp3);
      strMsg += "    <tr>";
      strMsg += '          <td align="right">';
      strMsg += "流量：";
      strMsg += "       </td>";
      strMsg += '          <td align="left">';
      if (Number(temp3[0].gtq) > 0) {
        if (SetNull(temp3[0].insflow) != "") {
          strMsg +=
            '<span class="SpanColor">' +
            Number(temp3[0].insflow).toFixed(1) +
            "m³/s</span>";
        } else {
          strMsg += '<span class="SpanColor">—</span>';
        }
      } else {
        strMsg += '<span class="SpanColor">—</span>';
      }
      // if (temp3[0].gtq != undefined) {
      //   strMsg +=
      //     '<span class="SpanColor">' +
      //     Number(temp3[0].gtq).toFixed(1) +
      //     "m³/s</span>";
      // } else {
      //   strMsg += '<span class="SpanColor">—</span>';
      // }
      strMsg += "       </td>";
      strMsg += "    </tr>";
      strMsg += "    <tr>";
      strMsg += '          <td align="right">';
      strMsg += "时间：";
      strMsg += "       </td>";
      strMsg += '          <td align="left">';
      if (SetNull(temp3[0].tm) != "") {
        strMsg += "<span>" + dayjs(temp3[0].tm).format("MM-DD HH:mm");
        +"</span>";
      } else {
        var tempTM = bzdata.filter(function (e) {
          return (
            e.exkey == num + 1 &&
            (e.eqptp == "泵站状态" || e.eqptp == "泵站电流")
          );
        });
        console.error("时间。。。。", tempTM, temp3);
        if (tempTM.length > 0) {
          strMsg += "<span>" + dayjs(tempTM[0].tm).format("MM-DD HH:mm");
          +"</span>";
        } else {
          strMsg += '<span class="SpanColor">—</span>';
        }
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
      strMsg += "    <tr>";
      strMsg += '          <td align="right">';
      strMsg += "时间：";
      strMsg += "       </td>";
      strMsg += '          <td align="left">';
      var tempTM = bzdata.filter(function (e) {
        return (
          e.exkey == num + 1 && (e.eqptp == "泵站状态" || e.eqptp == "泵站电流")
        );
      });
      if (tempTM.length > 0) {
        if (SetNull(tempTM[0].tm) != "") {
          strMsg += "<span>" + dayjs(tempTM[0].tm).format("MM-DD HH:mm");
          +"</span>";
        } else {
          strMsg += '<span class="SpanColor">—</span>';
        }
      } else {
        strMsg += '<span class="SpanColor">—</span>';
      }
      strMsg += "       </td>";
      strMsg += "    </tr>";
    }
    strMsg += " </table>";
    strMsg += "  </div>";
    strMsg += " </li>  ";
  }
  for (var num = 0; num < zmdata.length; num++) {
    var tempTM = dayjs(new Date()).format("yyyy/MM/dd 00:00:00");
    var p1 = zmdata.filter(function (e) {
      return e.exkey == num + 1 && Number(e.gtq) >=0.1 && e.eqptp == "闸坝开度";
    });
    var FLAG = false;
    var tempGTQ = 4.5;
    var tempXX = "<span style='color:red;'>关闸</span>";
    if (p1.length > 0) {
      tempXX = "<span style='color:#4CE242;'>开闸</span>";
      FLAG = true;
    }
    strMsg += '<li style="width:' + liWidth + '%">';
    strMsg += '   <div class="back"></div>';
    strMsg += '   <div class="div1">';
    if (FLAG == true) {
      strMsg +=
        ' <img src="/images/gqgc/pic3.png" width="10" height="16" alt="" style="margin-left: -6px;" > ';
    } else {
      strMsg +=
        ' <img src="/images/gqgc/pic31.png" width="10" height="16" alt=""  style="margin-left: -6px;"> ';
    }
    strMsg += " </div > ";
    strMsg += '  <div class="div2">';
    if (FLAG == true) {
      strMsg +=
        ' <img src="/images/gqgc/icon_gate_run.gif" width="30" height="30" alt="" style="margin-left: -6px;">';
    } else {
      strMsg +=
        ' <img src="/images/gqgc/icon_gate.gif" width="30" height="30" alt="" style="margin-left: -6px;">';
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
    var p2 = p1.filter(function (e) {
      return e.eqptp == "闸坝开度";
    });
    if (p2.length > 0) {
      strMsg += "      <tr>";
      strMsg += '          <td align="right">';
      strMsg += "开度：";
      strMsg += "          </td>";
      strMsg += '          <td align="left">';
      if (p2[0].gtq != undefined) {
        strMsg +=
          '<span class="SpanColor">' +
          Number(p2[0].gtq).toFixed(2) +
          "m</span>";
      } else {
        strMsg += '<span class="SpanColor">—</span>';
      }
      strMsg += "          </td>";
      strMsg += "     </tr>";
      if (p2[0].gtq != undefined) {
        $("#yly_KD").html("开度：" + Number(p2[0].gtq).toFixed(2) + "m");
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
    var tempTM = zmdata.filter(function (e) {
      return e.exkey == num + 1 && e.eqptp == "闸坝开度";
    });
    strMsg += "    <tr>";
    strMsg += '          <td align="right">';
    strMsg += "时间：";
    strMsg += "       </td>";
    strMsg += '          <td align="left">';
    if (tempTM.length > 0) {
      if (SetNull(tempTM[0].tm) != "") {
        strMsg += "<span>" + dayjs(tempTM[0].tm).format("MM-DD HH:mm");
        +"</span>";
      } else {
        strMsg += '<span class="SpanColor">—</span>';
      }
    } else {
      strMsg += '<span class="SpanColor">—</span>';
    }
    strMsg += "       </td>";
    strMsg += "    </tr>";
    strMsg += " </table>";
    strMsg += "  </div>";
    strMsg += " </li>  ";
  }

  strMsg += " </ul>";
  strMsg += '<div style="clear:both;"></div>';
  $("#GCJK").html(strMsg);
  // } else {
  //   var strMsg = '<div style="font-size: 30px; text-align: center;margin-top: 200px;color: var(--mtablecolor);">无数据</div>';
  //   $("#divGCJK").html(strMsg);
  // }
}
onMounted(() => {
  if (SetNull(stime.value) == "") {
    stime.value = dayjs().add(-24, "hour").format("YYYY-MM-DD 00:00:00");
  }
  if (SetNull(etime.value) == "") {
    etime.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }
  Weacontent();
  $(".componentdiv").css({
    height: "calc(100% - 30px)",
    overflowY: "auto",
  });

  if (_theme == "BlueTheme" || _theme == "VioletTheme") {
    $(".popContent").css("background", "#031426");
    $(".content").css("background", "#031426e6");
  }
});
</script>

<style scoped>
.tableGQVoew tr td:nth-child(odd) {
  width: 170px;
}
</style>
