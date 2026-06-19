<template>
  <div class="topClass">
    <span style="margin-left: 20px">开始时间：</span>
    <input id="STIME" class="mini-datepicker" style="width:110px;" format="yyyy-MM-dd" showTime="true" showOkButton="true"
      showClearButton="false" />
    &nbsp;&nbsp; <input id="DAY" name="DAY" class="mini-combobox" valuefield="id" textfield="text" style="width:60px;" />
    <el-radio-group style="margin-left: 20px">
      <el-radio @click="TypeeChange('YB')" v-model="pathname" label="YB">预报</el-radio>
      <el-radio @click="TypeeChange('SC')" v-model="pathname" label="SC">实测</el-radio>
    </el-radio-group>
    <el-button type="primary" @click="BtnSearch()">查询</el-button>
    <span
      style="position: absolute;right: 20px;width: 70px;height: 30px;margin: 5px 0px;background: rgb(238 238 238 / 60%);          border-radius: 5px;        ">
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
  <div style="height: calc(100% - 100px); width: 100%; margin-top: 10px">
    <div class="content-echarts">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="SQLineYB" />
    </div>
    <div class="content-table">
      <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="tableYQ" :border="0" :cellspacing="0"
        :cellpadding="0" />
    </div>
  </div>
  <MyDialog :showDialog="showDialog" @close="showDialog = false" :title="title" :typeValue="typeValue"
    style="width: 1400px; height: 800px">
    <SQLineDuo />
  </MyDialog>

  <MyDialog :showDialog="showDialogYB" @close="showDialogYB = false" :title="titleYB" :typeValue="typeValueYB"
    style="width: 1400px; height: 800px">
    <SQLineYB />
  </MyDialog>
</template>
<script setup>
import Table from "@/components/Table/Table.vue";
import MyDialog from "@/components/ComDialog.vue";
import SQLineDuo from "@/components/danzhan/sq/SQLineDuo.vue";
import SQLineYB from "@/components/danzhan/sq/SQLineYB.vue";
import api from "@/api/zonglan/index.js";
import * as qixiangapi from "@/api/qixiang/qixiangapi.js";
import videoapi from "@/api/zonglan/videoIndex.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, sortObjectArray, groupBy } from "@/api/ComUnit.js";
import { convertToDate } from "@/api/dateUtil.js";
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElConfigProvider, ElCascader } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const SQdata = ref({});
const stime = ref("");
const etime = ref("");
const stcd = ref("");
const pathname = ref("YB");
const mtype = ref("");
const tabName = ref("fit1");
const img1 = ref("/images/line-chart.png");
const img2 = ref("/images/line-table4.png");
const Liststnm = ref([]);
const value = ref([])
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const title = ref("");
const typeValue = ref("");
const showDialogYB = ref(false);
const titleYB = ref("");
const typeValueYB = ref(false);
const tableHeaders = ref([
  { name: "num", label: "序号" },
  { name: "时间", label: "时间" },
  { name: "雨量", label: "雨量(mm)" },
  { name: "预报", label: "预报水位(m)" },
  { name: "实测", label: "实测水位(m)" },
]);
const tableData = ref();
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const props = defineProps({
  typestcd: {
    type: String,
    default: "",
  },
});

var myData = [];

function TypeeChange(e) {
  pathname.value = e;
  Weacontent();
}
function BtnSearch() {
  var Startime = mini.get("STIME").getFormValue();
  var Endtime = dayjs(dayjs(Startime).format("YYYY-MM-DD")).add(+1, "day").format("YYYY-MM-DD");
  var EndHour = mini.get("DAY").getValue();
  if (EndHour < 10) {
    EndHour = "0" + EndHour;
  }
  Startime = Startime + " " + EndHour + ":00:00";
  Endtime = Endtime + " " + EndHour + ":00:00";
  $.data(myData, "Startime", Startime)
  $.data(myData, "Endtime", Endtime)
  if (Startime >= dayjs(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")).add(+1, "hour").format("YYYY-MM-DD HH:00:00")) {
    mini.alert("请确认开始日期是否正确（开始日期不得超过当前时间）！");
    return false;
  }
  SWload();
}
function SWload() {
  // window.loadingShow();
  var start = dayjs(dayjs($.data(myData, "Startime")).format("YYYY-MM-DD HH:mm:ss")).add(-1, "hour").format("YYYY-MM-DD HH:mm:ss");
  var strWhere = { "stime": start, "etime": $.data(myData, "Endtime"), "stcd": stcd.value, "datasource": "BX", "pathname": "HOUR" };
  api.DuoSel(strWhere).then(res => {
    JosnSel(res, "SWSel")
  })
}
function GetDataSel() {
  var strJson = $.data(myData, "YBTMdata");
  console.error("YBTM", $.data(myData, "YBTM"))
  var result = strJson.filter(function (item) {
    return dayjs(convertToDate(item["YBTM"])).format("YYYY-MM-DD HH:mm:ss") == $.data(myData, "YBTM");
  })
  console.error("预报雨量数据", result)
  var resultData = [];
  var _ybEtime = dayjs(dayjs($.data(myData, "YBTM")).format("YYYY-MM-DD HH:mm:ss")).add(+ 28, "hour").format("YYYY-MM-DD HH:mm:ss");
  console.error("预报结束时间", _ybEtime)
  if (result.length > 0) {
    for (var num = 0; num < result.length; num++) {
      var item = {};
      var strParam = {};
      var TM = dayjs(convertToDate(result[num].TM)).format("YYYY-MM-DD HH:mm:ss");
      var DRP = result[num]["DRP"] != undefined ? Number(result[num]["DRP"]).toFixed(1) : 0;
      console.error("TM", TM)
      if (TM <= _ybEtime) {
        item["TM"] = TM;
        item["DRP"] = DRP;
        resultData.push(item);
      }
    }
  }
  var DRPdata = sortObjectArray(resultData, ["TM"], "asc")
  $.data(myData, "DRPdata", splitThreeHourToOneHour(resultData))


  var strJson = $.data(myData, "DRPdata");
  if (strJson.length > 0) {
  } else {
    var DRPdata = [];
    for (var num = 0; num < 24; num++) {
      var strParam = {};
      var TM = dayjs(dayjs($.data(myData, "Startime")).format("YYYY-MM-DD HH:mm:ss")).add(+ 28, "hour").format("YYYY-MM-DD HH:mm:ss")
      strParam["时间"] = TM;
      strParam["雨量"] = 0;
      DRPdata.push(strParam)
    }
    strJson = DRPdata;
    console.error("DRPdata", DRPdata)
  }
  var YLTM = new Date(strJson[0]["时间"]).getHours();
  var nowTM = mini.get("DAY").getValue();
  var Chatm = YLTM - nowTM;

  var dataJson = strJson;
  if (Chatm > 0) {
    for (var i = 0; i < Math.abs(Chatm); i++) {
      var strParam = {};
      strParam["时间"] = dayjs(dayjs(dataJson[0]["时间"]).format("YYYY-MM-DD HH:mm:ss")).add(-i - 1, "hour").format("YYYY-MM-DD HH:mm:ss")
      strParam["雨量"] = 0;
      dataJson.push(strParam);
    }
  } else {
    dataJson = dataJson.slice(Math.abs(Chatm))
  }
  var dataJsonnew = dataJson.filter(function (item) {
    return dayjs(new Date(item["时间"])).format("YYYY-MM-DD HH:mm:ss") >= $.data(myData, "Startime");
  })
  $.data(myData, "dataJson", dataJsonnew)
  search();
}
function search() {
  var strJsonAll = sortObjectArray($.data(myData, "dataJson"), ["时间"], "asc")
  strJsonAll[0]["昆山站水位"] = $.data(myData, "SWDataStart");
  strJsonAll[0]["陈墓站水位"] = $.data(myData, "SWDataStart");
  strJsonAll[0]["湘城站水位"] = $.data(myData, "SWDataStart");
  strJsonAll[0]["苏州（枫桥）站水位"] = $.data(myData, "SWDataStart");
  strJsonAll[0]["苏州（二）站水位"] = $.data(myData, "SWDataStart");
  setTimeout(function () {
    var strData = {
      "data": strJsonAll
    }
    var strWhere = {
      "datasource": "http://172.17.50.19:8141/model/predict_json",
      "strExp": JSON.stringify(strData)
    }
    videoapi.postQuery(strWhere).then(res => {
      JosnSel(res, "Sel")
    })
  }, 100)
}
function JosnSel(data, typeID) {
  if (typeID == "SWSel") {
    if (data.result.list.length > 0) {
      var SWData = sortObjectArray(data.result.list, ["TM"], "asc")
      console.error("SWData", SWData)
      for (var num = 0; num < SWData.length; num++) {
        if (SWData.length > 2) {
          if (SWData[num].tm == $.data(myData, "Startime")) {
            $.data(myData, "SWDataStart", SWData[num][stcd.value + "upz"])
          }
        } else {
          $.data(myData, "SWDataStart", SWData[num][stcd.value + "upz"])
        }
      }
      $.data(myData, "SWData", data.result.list)
    } else {
      var strWhere = { "stime": dayjs(dayjs($.data(myData, "Startime")).format("YYYY-MM-DD HH:mm:ss")).add(-1, "hour").format("YYYY-MM-DD HH:mm:ss"), "etime": $.data(myData, "Endtime"), "stcd": stcd.value, "datasource": "BX", "pathname": "HOUR" };
      api.DuoSel(strWhere).then(res => {
        if (res.result.list.length > 0) {
          $.data(myData, "SWDataStart", data.result.list[0][stcd.value + "upz"])
          $.data(myData, "SWData", res.result.list)
        }
      })
    }
    if (pathname.value == "YB") {
      var TM = mini.get("STIME").getFormValue();
      var startDate = TM + " 00:00:00";
      var endDate = TM + " 23:59:59";
      startDate = dayjs(dayjs(startDate).format("YYYY-MM-DD HH:mm:ss")).add(-10, "hour").format("YYYY-MM-DD HH:mm:ss")
      qixiangapi.RainWeacontent({ "YBSTIME": startDate, "YBETIME": endDate, "STCD": "32058300" }).then(res => {
        JosnSel(res, "YBTM")
      })
    } else if (pathname.value == "SC") {
      var strWhere = {
        "datasource": "BX",
        "pathname": "HOUR",
        "stime": $.data(myData, "Startime"),
        "etime": $.data(myData, "Endtime"),
        "stcd": "63205150",
      };
      api.queryDRPDANZHANList(strWhere).then(res => {
        JosnSel(res, "YBTM")
      })
    }
  } else if (typeID == "YBTM") {
    if (pathname.value == "YB") {
      var dataResult = groupBy(data.data, 'YBTM');
      $.data(myData, "YBTMdata", data.data);
      if (dataResult.length > 0) {
        for (var num = 0; num < dataResult.length; num++) {
          var YBTMtimes = dayjs(convertToDate(dataResult[num][0]["YBTM"])).format("YYYY-MM-DD HH:mm:ss");
          $.data(myData, dayjs(YBTMtimes).format("yyyyMMddHHmmss"), dataResult[num]);
          if (num == 0) {
            $.data(myData, "YBTM", dayjs(YBTMtimes).format("YYYY-MM-DD HH:mm:ss"));
          }
        }
      }
      GetDataSel();
    } else if (pathname.value == "SC") {
      $.data(myData, "YBTM", $.data(myData, "Startime"))
      var DRPdata = [];
      for (var num = 0; num < 24; num++) {
        var strParam = {};
        var TM = dayjs(dayjs($.data(myData, "YBTM")).format("YYYY-MM-DD HH:mm:ss")).add(+num, "hour").format("YYYY-MM-DD HH:mm:ss")
        var Tempdata = data.result.filter(function (e) {
          return TM == e["tm"];
        });
        strParam["时间"] = TM;
        if (Tempdata.length > 0) {
          strParam["雨量"] = Tempdata[0].drp != undefined ? Number(Tempdata[0].drp).toFixed(1) : 0;
        } else {
          strParam["雨量"] = 0;
        }
        DRPdata.push(strParam)
      }
      $.data(myData, "dataJson", DRPdata)
      search();
    }
  }
  else if (typeID == "Sel") {
    var strJson = [];
    if (data.data.length > 0) {
      for (var i = 0; i < data.data.length; i++) {
        if (i < 24) {
          var item = data.data[i];
          var SWData = $.data(myData, "SWData").filter(function (e) {
            return item["时间"] == e["tm"];
          });
          if (SWData.length > 0) {
            item["实测"] = SWData[0][stcd.value + "upz"] != undefined ? Number(SWData[0][stcd.value + "upz"]).toFixed(2) : '-';
          } else {
            item["实测"] = '-';
          }
          item["num"] = i + 1;
          item["雨量"] = item["雨量"] != undefined ? Number(item["雨量"]).toFixed(1) : 0;
          if (stcd.value == "63203050") {
            item["预报"] = item["苏州（二）站预测水位"] != undefined ? Number(item["苏州（二）站预测水位"]).toFixed(2) : 0;
          } else if (stcd.value == "63205150") {
            item["预报"] = item["昆山站预测水位"] != undefined ? Number(item["昆山站预测水位"]).toFixed(2) : 0;
          } else if (stcd.value == "63403500") {
            item["预报"] = item["陈墓站预测水位"] != undefined ? Number(item["陈墓站预测水位"]).toFixed(2) : 0;
          } else if (stcd.value == "63203000") {
            item["预报"] = item["苏州（枫桥）站预测水位"] != undefined ? Number(item["苏州（枫桥）站预测水位"]).toFixed(2) : 0;

          } else if (stcd.value == "63204650") {
            item["预报"] = item["湘城站预测水位"] != undefined ? Number(item["湘城站预测水位"]).toFixed(2) : 0;
          }

          if (i == 0) {
            item["num"] = i + 1;
            item["雨量"] = item["雨量"] != undefined ? Number(item["雨量"]).toFixed(1) : 0;
            item["苏州（二）"] = $.data(myData, "SWDataStart");
            item["昆山"] = $.data(myData, "SWDataStart");
            item["陈墓"] = $.data(myData, "SWDataStart");
            item["苏州（枫桥）"] = $.data(myData, "SWDataStart");
            item["湘城"] = $.data(myData, "SWDataStart");
            item["实测"] = $.data(myData, "SWDataStart");
          }
          strJson.push(item);
        }
      }
    }

    dataResult = strJson;
    tableData.value = strJson;

    var strNote = [];
    strNote.push({ "name": "时间", "codename": "时间", "tableV": "1", "isShow": true, "width": "40%" });
    strNote.push({ "name": "雨量", "codename": "雨量", "tableV": "1", "isShow": true, "width": "40%" });
    strNote.push({ "name": "预报", "codename": "预报", "tableV": "1", "isShow": true, "width": "40%" });
    strNote.push({ "name": "实测", "codename": "实测", "tableV": "1", "isShow": true, "width": "40%" });
    var LineColor = ["#00ACFF", '#EE585B', "#01DDFF", "#A969C6", "#FFDC60", "#5C7BD9", "#40B27D"];
    const _Option = ChartJs.chartSWYB(
      "",
      strJson,
      strNote,
      LineColor,
      "水位",
      "Mouth",
      _theme,
      80,
      20
    );

    lineOption.value = _Option;
    datekey.value = Date.now();
  }

}
function splitThreeHourToOneHour(data) {
  const oneHourData = [];
  for (let i = 0; i < data.length; i++) {
    const currentItem = data[i];
    const oneHourValue = currentItem.DRP / 3; // 平均分配值
    let currentTime = dayjs(dayjs(currentItem.TM).format("YYYY-MM-DD HH:mm:ss")).add(+6, "hour").format("YYYY-MM-DD HH:mm:ss")

    for (let j = 0; j < 3; j++) {
      var strParam = {};
      strParam["时间"] = dayjs(currentTime).format("YYYY-MM-DD HH:mm:ss");;
      strParam["雨量"] = oneHourValue;
      oneHourData.push(strParam);
      // currentTime.setHours(new Date(currentTime).getHours() + 1); // 时间加 1 小时
      currentTime = dayjs(dayjs(currentTime).format("YYYY-MM-DD HH:mm:ss")).add(+1, "hour").format("YYYY-MM-DD HH:mm:ss");
    }
  }
  return oneHourData;
}
function OnBoot(e) {
  tabName.value = e;
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
  BtnSearch();
}
onMounted(() => {
  mini.parse();
  if (SetNull(props.stcd) != "") {
    stcd.value = props.typestcd;
  } else {
    stcd.value = inject("typestcd").value;
  }
  console.error("props", inject("typestcd").value, stcd.value)
  mini.get("STIME").setValue(dayjs(new Date()).format("YYYY-MM-DD"));
  mini.get("DAY").setValue(new Date().getHours());

  var dataResult = [];
  for (var i = 0; i < 24; i++) {
    var obj = {};
    obj["id"] = i;
    obj["text"] = i;
    dataResult.push(obj);
  }
  mini.get("DAY").setData(dataResult);
  // loadZhan();
  // Weacontent();
  BtnSearch();
});
</script>
<style scoped>
.topClass {
  height: 45px;
  line-height: 40px;
  color: var(--widgetcolor);
}

.toptabTop {
  list-style: none;
  color: #00feff;
  border-color: #00feff;
  width: 500px !important;
  display: inline;
  position: relative;
  left: 0px;
  bottom: 0px;
  top: 5px;
  padding: 0px;
}

.toptabToponlyli {
  float: left;
  height: 32px;
  width: 40px;
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

.datatime {
  width: 180px !important;
  height: 36px !important;
}

.content-echarts {
  display: block;
  width: 100%;
  height: 100%;
}

.content-table {
  display: none;
  width: 100%;
  height: 100%;
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

.tableYQ {
  width: 100%;
  /* table-layout: fixed; */
  margin-top: 0rem;
  margin: 0 auto;
  /* 表格里面显示省略号必须加fixed，td设置的宽度会失效，宽度限定写在th中*/
}

.tableYQ tr th {
  background: var(--mtabletrcolor);
  color: var(--mtablecolor);
}

.tableYQ tr {
  height: 38px;
  line-height: 38px;
}

.tableYQ tr th {
  font-size: 0.8rem;
  font-weight: bold;
  height: 2.1rem;
  text-align: center;
}

.tableYQ tr td {
  height: 1.6rem;
  font-size: 14px;
  text-align: center;
}

.tableYQ tr td {
  color: var(--widgetcolor);
}

.tableYQ .trSelect {
  background: rgba(0, 255, 255, 0.5) !important;
}

.tableYQ tbody tr td {
  width: 15vh !important;
}

.tableYQ tbody tr td:nth-child(1) {
  width: 80px !important;
}

.tableYQ tbody tr td:nth-child(2) {
  width: 20vh !important;
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
  background: var(--popContentHeadbg);
}

:deep(.el-radio) {
  margin-right: 20px;
  --el-radio-input-bg-color: #d5141400;
  min-width: 50px;
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

:deep(.el-button) {
  /* background-color: var(--popContentHeadbg);
    border-color: var(--popContentHeadbg); */
  color: #fff;
}

:deep(.el-checkbox__input.is-checked+.el-checkbox__label),
:deep(.el-radio__input.is-checked+.el-radio__label) {
  color: var(--swDivSelectcolor);
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner),
:deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: var(--swDivSelectcolor);
  border-color: var(--swDivSelectcolor)
}

.echartsmaxmindata {
  width: 100%;
  font-size: 16px;
  margin: 0 auto;
  border: 1.5px solid var(--popContentHeadbg);
  height: auto;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
  color: var(--mtablecolor);
  text-align: center;
}
</style>
<style lang="scss">
/* 站点选择 */
.el-cascader-node {
  padding: 0 0px 0 10px;
  width: 118px;
  color: var(--widgetcolor);
}

.el-cascader-menu {
  min-width: 20px;
}

.el-cascader-menu:last-child .el-cascader-node {
  padding-right: 0px;
}


.el-cascader-node__prefix {
  left: 0px !important;
}

.el-cascader-node__label {
  padding: 0 4px;
}

.el-input {
  height: 29px;
}

.el-input__suffix {
  color: var(--popContentHeadbg);
}

.el-cascader__dropdown.el-popper,
.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
  background: none;
}

.el-cascader__dropdown.el-popper {
  box-shadow: var(--popContentHeadbg);
}

.el-popper.is-light,
.el-popper.is-light .el-popper__arrow:before {
  border: 1px solid var(--popContentHeadbg);
  background: var(--boxtitlebg);
}

.el-cascader:not(.is-disabled):hover .el-input__wrapper,
.el-input__wrapper {
  box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
  cursor: pointer;
}

// 时间选择框
.el-date-picker,
.el-picker-panel__footer {
  // width: 174px;
  background: none;
  color: var(--widgetcolor);
}

.el-date-picker .el-picker-panel__content {
  // width: 160px;
}

.el-date-picker__header,
.el-picker-panel__content {
  // margin: 6px;
}

.el-date-table td {
  padding: 0;
}

.el-date-picker table {
  width: none !important;
}

.el-date-picker__time-header {
  background: var(--boxtitlebg);
  // display: block;
}

.el-picker-panel__icon-btn {
  // padding: 0;
  color: var(--widgetcolor);
}

.el-input--small .el-input__inner,
.el-date-table th,
.el-date-picker__header-label,
.el-button.is-text,
.el-button.is-plain {
  color: var(--widgetcolor);
}

.el-cascader .el-input.is-focus .el-input__wrapper {
  box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}

.el-cascader-node.in-active-path,
.el-cascader-node.is-selectable.in-checked-path,
.el-year-table td .cell:hover,
.el-date-picker__header-label:hover {
  color: var(--swDivSelectcolor);
}

.el-date-table th {
  border-bottom: 1px solid var(--popContentHeadbg);
}

.el-picker-panel__footer {
  border-top: 1px solid var(--popContentHeadbg);
}

.el-button.is-plain,
.el-button.is-text:not(.is-disabled):hover,
.el-scrollbar__thumb {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}

.el-date-picker__editor-wrap:nth-child(1) .el-input--small .el-input__wrapper {
  width: 90px;
}

.el-date-picker__editor-wrap {
  width: 50%;
}

.el-year-table td {
  padding: 0px;
}

.el-cascader-node.is-active .el-cascader-node__label,
.el-cascader-node.is-active {
  font-size: 1rem;
  color: var(--swDivSelectcolor);
}

.el-date-table td.current:not(.disabled) .el-date-table-cell__text,
.el-year-table td.current:not(.disabled) .cell {
  background-color: var(--swDivSelectcolor);
  border-color: var(--swDivSelectcolor);
  color: #fff;
}

.el-date-table td.today .el-date-table-cell__text,
.el-date-table td.available:hover {
  color: var(--swDivSelectcolor);
}

.el-year-table td .cell,
.el-month-table td .cell {
  color: #fff;
}
</style>