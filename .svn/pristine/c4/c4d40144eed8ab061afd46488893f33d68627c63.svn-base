<template>
  <div class="topClass">
    <span style="margin-left: 20px">开始时间：</span>
    <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
      showTime="true" showOkButton="true" showClearButton="false" />
    <span style="margin-left: 20px">结束时间：</span>
    <input id="ETIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
      showTime="true" showOkButton="true" showClearButton="false" />

    <el-button type="primary" style="margin-left: 20px" @click="BtnSearch()">查询</el-button>
    <!-- <el-button type="primary" style="margin-left: 20px" @click="setTime()">今年以来</el-button> -->
     <ul class="toptabTop" style="margin-left: 20px;">
      <li :class="TMtype == 'week' && 'toptabToponlyliHover'" class="toptabToponlyli" @click="geTMtType('week')"
        style="border-right: 1px solid var(--swDivSelectcolor);">一周</li>
      <li :class="TMtype == 'month' && 'toptabToponlyliHover'" class="toptabToponlyli" @click="geTMtType('month')"
        style="border-right: 1px solid var(--swDivSelectcolor);">一月
      </li>
      <li :class="TMtype == 'year' && 'toptabToponlyliHover'" class="toptabToponlyli" @click="geTMtType('year')">今年以来</li>
    </ul>
    <el-button type="success" style="margin-left: 20px" @click="ExportData()">导出</el-button>
    <span style="
        position: absolute;
        right: 20px;
        width: 70px;
        height: 30px;
        margin: 5px 0px;
        background: rgb(238 238 238 / 60%);
        border-radius: 5px;
        display:none;
      ">
      <span class="switch" style="border-radius: 5px 0px 0px 5px" @click="OnBoot('fit1')"
        :class="tabName == 'fit1' && 'handleon'">
        <img :src="img1" />
      </span>
      <span class="switch" style="border-radius: 0px 5px 5px 0px; margin-left: 35px" @click="OnBoot('fit2')"
        :class="tabName == 'fit2' && 'handleon'">
        <img :src="img2" />
      </span>
    </span>
  </div>
  <div style="height: calc(100% - 60px); width: 100%; margin-top: 10px">
    <div class="content-echarts">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="SLLineSTCD" />
    </div>
    <div style="width: 100%;height: 50px;text-align: center;font-size: 20px;color: var(--popupContentTitleColor)"
      id="tableTitle">
      {{ tableTitle }}
    </div>
    <div class="content-table">
      <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="tableYQ tableYJSL" :border="0"
        :cellspacing="0" :cellpadding="0" />
    </div>
  </div>
</template>
<script setup>
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { ref, onMounted, reactive, inject } from "vue";
import { sortObjectArray, groupBy, SumJson, SetNull } from "@/api/ComUnit.js";
import { downloadFile } from "@/utils/share/downFile.js";
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElSelect, ElConfigProvider } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const SLdata = ref({});
const stime = ref("");
const etime = ref("");
const pid = ref("");
const tabName = ref("fit1");
const img1 = ref("/images/line-chart.png");
const img2 = ref("/images/line-table4.png");
const tableHeaders = ref({});
const tableData = ref([]);
const tableALLData = ref([]);
const tableTitle = ref("");
const listcolumnData = ref([]); //导出表头
const listtableData = ref([]); //导出表头
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const props = defineProps({
  pid: {
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
});
const TMtype=ref("week");
function setTime() {
  stime.value = dayjs(new Date()).format("YYYY-01-01 00:00:00");
  etime.value = dayjs(new Date()).format("YYYY-MM-DD HH:00:00");
  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:mm"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:mm"));
  Weacontent();
}
function geTMtType(obj){ 
  TMtype.value=obj;
  etime.value = dayjs(new Date()).format("YYYY-MM-DD HH:00:00");
  if(obj=="week"){
    stime.value =dayjs().subtract(1, 'week').format('YYYY-MM-DD 00:00:00'); 
  }
  else if(obj=="month"){
    stime.value =dayjs().subtract(1, 'month').format('YYYY-MM-DD 00:00:00');
  }
  else if(obj=="year"){
    stime.value =dayjs(etime.value).format("YYYY-01-01 00:00:00");
  }
  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:mm"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:mm"));
  setTimeout(function(){
    Weacontent();
  },100)
}
function Weacontent() {
  var strParam = {};
  strParam["pid"] = pid.value;
  strParam["stime"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  strParam["etime"] = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  // .querySUMDAYPSL(strParam)

  api
    .stPptnGQSL(strParam)
    .then((res) => {
      var result = res.result;
      var resultAll = [];
      // if(result.length>0){
      //   for(var i=0;i<result.length;i++){
      //     console.error("result[i]",result[i]);
      //     if(SetNull(result[i]["list"])!=""){
      //       var listItem=groupBy(result[i]["list"],"stcd");
      //       if(listItem.length>0){
      //         for(var numI=0;numI<listItem.length;numI++){
      //             var stcdList=groupBy(listItem[numI],"tm"); 
      //             if(stcdList.length>0){
      //               for(var nm=0;nm<stcdList.length;nm++){
      //                 var tttt=stcdList[nm];
      //                 var _Param={};
      //                     _Param["stcd"]=tttt[0].stcd;
      //                     _Param["stnm"]=tttt[0].stnm;
      //                     _Param["idtm"]=tttt[0].tm;
      //                     _Param["accpw"]=0;
      //                     _Param["accdw"]=0;
      //                     for(var n=0;n<tttt.length;n++){
      //                         if(tttt[n]["q"].lastIndexOf('-')>-1){
      //                           _Param["accpw"]=Math.abs(Number(tttt[n]["q"]));
      //                         }
      //                         else{
      //                           _Param["accdw"]=Number(tttt[n]["q"]);
      //                         }
      //                     }
      //                     resultAll.push(_Param);
      //               }
      //             }

      //         }
      //       }
      //     }

      //   }
      // }
      // console.error("resultAllresultAllresultAllresultAll",resultAll)

      resultAll = result.filter(function (e) {
        return dayjs(e.idtm).format("HH") == "08";
      })
      // console.error("stPptnGQSL", strParam, result, resultAll);
      var strJson = [];
      for (var num = 0; num < resultAll.length; num++) {
        var item = resultAll[num];
        var accdw = item.accdw != undefined ? Number(item.accdw) : 0;
        var accpw = item.accpw != undefined ? Number(item.accpw) : 0;
        strJson.push({ "accdw": accdw, "accpw": accpw, "idtm": item.idtm, "stcd": item.stcd, "stnm": item.stnm })
      }
      tableALLData.value = strJson;
      SLdata.value = groupBy(strJson, "idtm");
      SLload();
    })
    .catch((err) => { });
}
function SLload() {
  const strJson = SLdata.value;
  var result = [], resultJson = [];
  var listresult = [], listresultJson = [];
  var accdwtotal = 0, accpwtotal = 0;
  var accdwtotalWYH = 0, accpwtotalWYH = 0;

  var listcolumns = [];
  var columns = [];
  columns.push({ name: "tm", label: "时间" })
  listcolumns.push({ name: "tm", label: "时间" })
  if (pid.value == "202411100003") {
    columns.push({ name: "total", label: "累计排水量" });
    listcolumns.push({ name: "total", label: "累计排水量" })
  }
  else {
    columns.push({ name: "total", label: "累计引/排水量" });
    listcolumns.push({ name: "totalYSL", label: "累计引水量" })
    listcolumns.push({ name: "totalPSL", label: "累计排水量" })
  }
  if (pid.value == "202410230023") {
    columns.push({ name: "totalWYH", label: "累计引/排水量（不含望虞河）" })
    listcolumns.push({ name: "totalWYHYSL", label: "累计引水量（不含望虞河）" })
    listcolumns.push({ name: "totalWYHPSL", label: "累计排水量（不含望虞河）" })
  }


  if (strJson.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      var _strParam = {};
      var item = strJson[num];
      accdwtotal = item.reduce((accumulator, currentItem) => accumulator + currentItem.accdw, 0);
      accpwtotal = item.reduce((accumulator, currentItem) => accumulator + currentItem.accpw, 0);
      accdwtotalWYH = accdwtotalWYH = item.filter((currentItem) => currentItem.stcd !== "63204301")
        .reduce((accumulator, currentItem) => accumulator + currentItem.accdw, 0);
      accpwtotalWYH = item.filter((currentItem) => currentItem.stcd !== "63204301")
        .reduce((accumulator, currentItem) => accumulator + currentItem.accpw, 0);

      _strParam["accdw"] = Number(accdwtotal).toFixed(1);
      _strParam["accpw"] = Number(accpwtotal).toFixed(1);
      _strParam["accdwWYH"] = Number(accdwtotalWYH).toFixed(1);
      _strParam["accpwWYH"] = Number(accpwtotalWYH).toFixed(1);
      _strParam["tm"] = dayjs(strJson[num][0].idtm).format("MM-DD");
      result.push(_strParam);

      var _strJson = {}, _liststrJson = {};
      // _strJson["num"] = num + 1;
      _strJson["tm"] = dayjs(strJson[num][0].idtm).format("MM-DD");
      _liststrJson["tm"] = dayjs(strJson[num][0].idtm).format("MM-DD");
      if (pid.value == "202411100003") {
        _strJson["total"] = Number(accdwtotal).toFixed(1);
        _liststrJson["total"] = Number(accdwtotal).toFixed(1);
      }
      else {
        _strJson["total"] = Number(accpwtotal).toFixed(1) + "/" + Number(accdwtotal).toFixed(1);
        _liststrJson["totalYSL"] = Number(accpwtotal).toFixed(1);
        _liststrJson["totalPSL"] = Number(accdwtotal).toFixed(1);
      }
      _strJson["totalWYH"] = Number(accpwtotalWYH).toFixed(1) + "/" + Number(accdwtotalWYH).toFixed(1);
      _strJson["accpwtotal"] = Number(accpwtotal).toFixed(1);
      _strJson["accdwtotal"] = Number(accdwtotal).toFixed(1);

      _liststrJson["totalWYHYSL"] = Number(accpwtotalWYH).toFixed(1);
      _liststrJson["totalWYHPSL"] = Number(accdwtotalWYH).toFixed(1);
      for (var i = 0; i < item.length; i++) {
        if (pid.value == "202411100003") {
          _strJson["" + strJson[num][i].stcd + ""] = Number(strJson[num][i].accdw).toFixed(1);
          _liststrJson["" + strJson[num][i].stcd + "排水"] = Number(strJson[num][i].accdw).toFixed(1);
        }
        else {
          _strJson["" + strJson[num][i].stcd + ""] = Number(strJson[num][i].accpw).toFixed(1) + "/" + Number(strJson[num][i].accdw).toFixed(1);
          _liststrJson["" + strJson[num][i].stcd + "YSL"] = Number(strJson[num][i].accpw).toFixed(1);
          _liststrJson["" + strJson[num][i].stcd + "PSL"] = Number(strJson[num][i].accdw).toFixed(1);
        }
        if (num < 1) {
        }
      }
      resultJson.push(_strJson);
      listresultJson.push(_liststrJson);
    }
  }

  var stcdSTNMList = groupBy(tableALLData.value, "stcd");
  if (stcdSTNMList.length > 0) {
    for (var i = 0; i < stcdSTNMList.length; i++) {
      var _label = SetNull(stcdSTNMList[i][0].stnm).replaceAll(" ", "");
      if (SetNull(_label) != "") {
        columns.push({ name: stcdSTNMList[i][0].stcd, label: _label })
        listcolumns.push({ name: stcdSTNMList[i][0].stcd + "YSL", label: _label + "引水" })
        listcolumns.push({ name: stcdSTNMList[i][0].stcd + "PSL", label: _label + "排水" })

      }

    }
  }

  tableHeaders.value = columns;
  listcolumnData.value = listcolumns;

  var resultListSUM = {};
  resultListSUM["tm"] = "累计引排";
  if (pid.value == "202411100003") {
    resultListSUM["tm"] = "累计排水";
  }
  if (stcdSTNMList.length > 0) {
    for (var i = 0; i < stcdSTNMList.length; i++) {
      var _stcd = stcdSTNMList[i][0]["stcd"];
      resultListSUM["" + _stcd + ""] = GetSUMList(resultJson, "" + _stcd + "");
    }
  }
  resultListSUM["total"] = GetSUMList(resultJson, "total");
  resultListSUM["totalWYH"] = GetSUMList(resultJson, "totalWYH");
  resultListSUM["colorCss"] = "color: yellow !important;"
  resultJson.push(resultListSUM);
  tableData.value = sortObjectArray(resultJson, ["tm"], "desc");

  var _resultListSUM = {};
  _resultListSUM["tm"] = "累计引排";
  if (pid.value == "202411100003") {
    _resultListSUM["tm"] = "累计排水";
    _resultListSUM["total"] = GetSUMList(resultJson, "total");
  } else {
    _resultListSUM["totalYSL"] = (GetSUMList(resultJson, "total")).split("/")[0];
    _resultListSUM["totalPSL"] = (GetSUMList(resultJson, "total")).split("/")[1];
  }
  if (stcdSTNMList.length > 0) {
    for (var i = 0; i < stcdSTNMList.length; i++) {
      var _stcd = stcdSTNMList[i][0]["stcd"];
      _resultListSUM["" + _stcd + "YSL"] =  (GetSUMList(resultJson, "" + _stcd)).split("/")[0];
      _resultListSUM["" + _stcd + "PSL"] = (GetSUMList(resultJson, "" + _stcd)).split("/")[1];
    }
  }
  _resultListSUM["totalWYHYSL"] = GetSUMList(resultJson, "totalWYHYSL");
  _resultListSUM["totalWYHPSL"] = GetSUMList(resultJson, "totalWYHPSL");
  listresultJson.push(_resultListSUM);
  listtableData.value = sortObjectArray(listresultJson, ["tm"], "desc");

  var accpwtotal = SumJson(tableData.value, 'accpwtotal');
  var accdwtotal = SumJson(tableData.value, 'accdwtotal');
  var strMsgTitle = "本次共<span style='color: red;'>" + resultJson.length + "</span>天，累计排水<span style='color: red;'>" + Number(accdwtotal).toFixed(0) + "</span>万方、日均水量<span style='color: red;'>" + Number(accdwtotal / resultJson.length).toFixed(0) + "</span>万方、日均流量<span style='color: red;'>" + Number(accdwtotal / resultJson.length / 8.64).toFixed(0) + "</span>m³/s";
  if (pid.value != "202411100003") {
    strMsgTitle += "；累计引水<span style='color: red;'>" + Number(accpwtotal).toFixed(0) + "</span>万方、日均水量<span style='color: red;'>" + Number(accpwtotal / resultJson.length).toFixed(0) + "</span>万方、日均流量<span style='color: red;'>" + Number(accpwtotal / resultJson.length / 8.64).toFixed(0) + "</span>m³/s。";
  }
  else {
    strMsgTitle += "。";
  }
  $("#tableTitle").html(strMsgTitle);
  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  var LineColor = ["#30B90F", "#50CAE1"];
  if (pid.value != "202411100003") {
    strNote.push({ name: "引水量", codename: "accpw", tableV: "0", isShow: true });
    var LineColor = ["#50CAE1", "#30B90F"];
  }
  strNote.push({ name: "排水量", codename: "accdw", tableV: "0", isShow: true });
  // console.error("=====", result, strNote, lineOption.value);
  const _Option = ChartJs.chartSL(
    "",
    result,
    strNote,
    LineColor,
    "水量",
    "Day",
    _theme,
    true
  );
  lineOption.value = _Option;
  
  if(resultJson.length>30){
    if(lineOption.value.series.length>0){
      for(var num=0;num<lineOption.value.series.length;num++){
        lineOption.value.series[num].label.normal.show = false;
      }
    }
  }
  
  datekey.value = Date.now();


}
/**
 * 获取数组内字段值的总和，并以"总和1/总和2"的形式返回
 *
 * @param data 包含数据的数组
 * @param filed 需要求和的字段名
 * @returns 返回求和结果，格式为"总和1/总和2"
 */
function GetSUMList(data, filed) {
  var resultfiled = "0/0";
  var val1 = 0, val2 = 0;
  if (pid.value == "202411100003") {
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        if (SetNull(data[i][filed]) != "") {
          var itemList = data[i][filed];
          val1 = Number(val1) + Number(itemList);
        }

      }
      resultfiled = Number(val1).toFixed(1);
    }
  }
  else {
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        if (SetNull(data[i][filed]) != "") {
          var itemList = data[i][filed].split("/");
          val1 = Number(val1) + Number(itemList[0]);
          val2 = Number(val2) + Number(itemList[1]);
        }

      }
      resultfiled = Number(val1).toFixed(1) + "/" + Number(val2).toFixed(1);
    }
  }

  return resultfiled;
}
function ExportData() {
  // console.error(tableData.value)
  console.error(listtableData.value)
  console.error(listcolumnData.value)
  var listcolumnname = [];
  if (listcolumnData.value.length > 0) {
    for (var i = 0; i < listcolumnData.value.length; i++) {
      var item = listcolumnData.value[i];
      listcolumnname.push({ "name": item["label"], "value": item["name"] });
    }
  }
  var strParam = {};
  strParam["title"] = "沿江各闸";
  strParam["pathname"] = "temp";
  strParam["columnname"] = listcolumnname;
  strParam["maplist"] = listtableData.value;
  api.ExportExcel(strParam).then((res) => {
    var strJson = res.result;
    if (strJson.length > 0) {
      // window.open("/UploadDoc/" + strJson[0]["value"]);      
      downloadFile("/UploadDoc/" + strJson[0]["value"], strParam["title"]);
    }
  })
}
function BtnSearch() {
  Weacontent();
}
function OnBoot(e) {
  tabName.value = e;
  SLload();
  if (e == "fit1") {
    $(".content-echarts").css({ display: "block" });
    $(".content-table").css({ display: "none" });

    img1.value = "/images/line-chart.png";
    img2.value = "/images/line-table4.png";
  } else if (e == "fit2") {
    $(".content-echarts").css({ display: "none" });
    $(".content-table").css({ display: "block" });

    img1.value = "/images/line-chart1.png";
    img2.value = "/images/line-table3.png";
  }
}
onMounted(() => {
  mini.parse();
  var nowTM = new Date();
  if (props.pid != "") {
    pid.value = props.pid;
  } else {
    pid.value = inject("pid").value;
  }
  if (props.stime != "") {
    stime.value = props.stime
  } else if (inject("stime") != undefined) {
    stime.value = inject("stime").value;
  } else {
    stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-7, "day")
      .format("YYYY-MM-DD 08:00:00");;
    if (dayjs(nowTM).format("HH") < 8) {
      stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
        .add(-8, "day")
        .format("YYYY-MM-DD 08:00:00");
    }
  }
  if (props.etime != "") {
    etime.value = props.etime
  } else if (inject("etime") != undefined) {
    etime.value = inject("etime").value;
  } else {
    etime.value = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  }

  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:00"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:00"));
  Weacontent();
});
</script> 
<style scoped>
@import url("@/assets/styles/Table.css");
.topClass {
  height: 45px;
  line-height: 40px;
  color: var(--widgetcolor);
}

.datatime {
  width: 180px !important;
  height: 36px !important;
}

.content-echarts {
  display: block;
  width: 100%;
  height: 300px;
}

.content-table {
  display: block;
  width: 100%;
  height: calc(100% - 350px);
  overflow-y: auto;
}

/* 自定义滚动条样式 */
.content-table::-webkit-scrollbar {
  width: 4px;
  /* 设置滚动条宽度 */
}

.content-table::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.switch {
  position: fixed;
  height: 30px;
  width: 35px;
  padding: 2px 8px;
  cursor: pointer;
}

.switch img {
  width: 22px;
  height: 22px;
}

.handleon {
  background-size: 100% 100%;
  background: #66c8ff;
}

:deep(.el-radio) {
  margin-right: 20px;
  --el-radio-input-bg-color: #d5141400;
}

:deep(.el-radio__label) {
  color: var(--widgetcolor);
}

:deep(.el-date-editor.el-input),
:deep(.el-date-editor.el-input__wrapper) {
  width: 160px;
}

:deep(.el-input__prefix-inner) {
  margin-left: -9px;
}

:deep(.el-input__suffix) {
  margin-right: -9px;
}

:deep(.el-input__wrapper) {
  background-color: #d5141400;
  box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
  ;
}

:deep(.el-input__inner) {
  color: var(--widgetcolor);
}

.toptabTop {
  list-style: none;
  color: #00feff;
  border-color: #00feff;
  width: auto !important;
  /* display: inline; */
  /* position: relative; */
  left: 0px;
  bottom: 0px;
  top: 5px;
  padding: 0px;
  display: inline-block;
  vertical-align: -12px;
}

.toptabToponlyli {
  float: left;
  height: 32px;
  width: 70px;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
  background-color: var(--portal);
  border: 1px solid var(--portal);
  color: var(--sel_wraplabelcolor);
}

.toptabTop li:first-child {
  border-radius: 5px 0 0 5px;
}

.toptabTop li:last-child {
  border-radius: 0 5px 5px 0;
}

.toptabToponlyliHover {
  background-color: var(--swDivSelectcolor);
  border: 1px solid var(--swDivSelectcolor);
  color: var(--sel_wraplabelcolorSel);
}

/* :deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
} */
</style>
