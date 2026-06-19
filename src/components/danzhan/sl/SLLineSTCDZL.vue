<template>
  <div class="topClass">
    <span style="margin-left: 20px">开始时间：</span>
    <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
      showTime="true" showOkButton="true" showClearButton="false" />
    <span style="margin-left: 20px">结束时间：</span>
    <input id="ETIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
      showTime="true" showOkButton="true" showClearButton="false" />

    <el-button type="primary" style="margin-left: 20px" @click="BtnSearch()">查询</el-button>
    <el-button type="primary" style="margin-left: 20px" @click="setTime()">今年以来</el-button>
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
const tableHeaders = ref({})
const tableData = ref([]);
const tableTitle = ref("");
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
function setTime() {
  stime.value = dayjs(new Date()).format("YYYY-01-01 00:00:00");
  etime.value = dayjs(new Date()).format("YYYY-MM-DD 08:00:00");
  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:mm"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:mm"));
  Weacontent();
}
function Weacontent() {
  var strParam = {};
  strParam["datasource"] = pid.value;
  // strParam["pathname"] = "DAY";
  strParam["stime"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  strParam["etime"] = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  // .querySUMDAYPSL(strParam)
  api
    .getinoutwdpstatdayList(strParam)
    .then((res) => {
      var result = res.result; 
      SLload(result);
    })
    .catch((err) => { });
}
function SLload(strJson) {
  var listData=groupBy(strJson, "tm");
  var listResultData=[];
  if(listData.length>0){
     for(var num=0;num<listData.length;num++){
       var item=listData[num];
       var strWhere={};
       strWhere["tm"]=item[0].tm;
       strWhere["inqtotal"]=SumJson(item,"inq");
       strWhere["outqtotal"]=SumJson(item,"outq");
       strWhere["count"]=item.length;
       for(var i=0;i<item.length;i++){
         strWhere["inq"+i] =item[i].inq;
         strWhere["outq"+i] =item[i].outq;
         strWhere["stnm"+i] =item[i].stnm;
         strWhere["total"+i]=strWhere["inq"+i]+"/"+strWhere["outq"+i];
       }
       strWhere["total"]=strWhere["inqtotal"]+"/"+strWhere["outqtotal"];
       listResultData.push(strWhere);
     }
  }
  var columnsHeaders = []
  columnsHeaders.push({ name: "tm", label: "时间" });
  columnsHeaders.push({ name: "total", label: "累计（进/出）水量" });
  var ttResult=sortObjectArray(listResultData, ["tm"], "asc");;
  var tableResult=[];
  var tablePojo={};
  tablePojo["tm"]="累计";
  tablePojo["inqtotal"]=Number(SumJson(listResultData,"inqtotal")).toFixed(2);
  tablePojo["outqtotal"]=Number(SumJson(listResultData,"outqtotal")).toFixed(2);
  tablePojo["total"]=tablePojo["inqtotal"]+"/"+tablePojo["outqtotal"];
  tablePojo["colorCss"] = "color: yellow !important;"

  if(listResultData.length>0){
    for(var numII=0;numII<listResultData[0]["count"];numII++){
      columnsHeaders.push({ name: "total"+numII, label: listResultData[0]["stnm"+numII]+"（进/出）水量" });
      
      tablePojo["inq"+numII] =Number(SumJson(listResultData,"inq"+numII)).toFixed(2);
      tablePojo["outq"+numII] =Number(SumJson(listResultData,"outq"+numII)).toFixed(2);
      // tablePojo["stnm"+numII] =item[numII].stnm;
      tablePojo["total"+numII]=tablePojo["inq"+numII]+"/"+tablePojo["outq"+numII];
      
    }
  } 
  tableHeaders.value = columnsHeaders;
 
  tableResult.push(tablePojo);
if(listResultData.length>0){
  for(var numII=(listResultData.length-1);numII>=0;numII--){
    tableResult.push(listResultData[numII]);
  }
}
  tableData.value = tableResult;//sortObjectArray(listResultData, ["tm"], "desc");

  var accpwtotal = SumJson(tableData.value, 'outqtotal');
  var accdwtotal = SumJson(tableData.value, 'inqtotal');
  var strMsgTitle = "本次共<span style='color: red;'>" + listResultData.length + "</span>天，累计进水<span style='color: red;'>" + Number(accdwtotal).toFixed(0) + "</span>万方、日均水量<span style='color: red;'>" + Number(accdwtotal / listResultData.length).toFixed(0) + "</span>万方、日均流量<span style='color: red;'>" + Number(accdwtotal / listResultData.length / 8.64).toFixed(0) + "</span>m³/s";
    strMsgTitle += "；累计出水<span style='color: red;'>" + Number(accpwtotal).toFixed(0) + "</span>万方、日均水量<span style='color: red;'>" + Number(accpwtotal / listResultData.length).toFixed(0) + "</span>万方、日均流量<span style='color: red;'>" + Number(accpwtotal / listResultData.length / 8.64).toFixed(0) + "</span>m³/s。";
  $("#tableTitle").html(strMsgTitle);

  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  var LineColor = ["#30B90F", "#50CAE1"];
    strNote.push({ name: "进水量", codename: "inqtotal", tableV: "0", isShow: true });
  strNote.push({ name: "出水量", codename: "outqtotal", tableV: "0", isShow: true });
  
  const _Option = ChartJs.chartSL(
    "",
    ttResult,
    strNote,
    LineColor,
    "水量",
    "Day",
    _theme,
    true
  );

  if(_Option.series.length>0){
  for(var num=0;num<_Option.series.length;num++){
    _Option.series[num]["barWidth"]=15;
    if(listResultData.length <60){
       _Option.series[num]["label"]= {
          normal: {
              color:'#FFFFFF',
              show: true,
              position: 'top',
              formatter: function (params) {
                  var strVal="";
                  if(Number(params.value)>0){
                    strVal=params.value;
                  }
                  return strVal
              }
          }
      }
    }
    else{
      _Option.series[num]["label"]= {};
    }
  }
}
  lineOption.value = _Option;
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
        var itemList = data[i][filed];
        val1 = Number(val1) + Number(itemList);
      }
      resultfiled = Number(val1).toFixed(1);
    }
  }
  else {
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        if(SetNull(data[i][filed])!=""){
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
  var listcolumnname = [];
  if (tableHeaders.value.length > 0) {
    for (var i = 0; i < tableHeaders.value.length; i++) {
      var item = tableHeaders.value[i];
      listcolumnname.push({ "name": item["label"], "value": item["name"] });
    }
  }

  var strParam = {};
  strParam["title"] = "沿江各闸";
  strParam["pathname"] = "temp";
  strParam["columnname"] = listcolumnname;
  strParam["maplist"] = tableData.value;
  api.ExportExcel(strParam).then((res) => {
    var strJson = res.result;
    if (strJson.length > 0) {
      // window.open("/UploadDoc/" + strJson[0]["value"]);      
    downloadFile("/UploadDoc/" + strJson[0]["value"],  strParam["title"]);
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
      .add(-16, "day")
      .format("YYYY-MM-DD 08:00:00");;
    if (dayjs(nowTM).format("HH") < 8) {
      stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
        .add(-17, "day")
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
<style src="@/assets/styles/Table.css"></style>
<style scoped>
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

/* :deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
} */
</style>
