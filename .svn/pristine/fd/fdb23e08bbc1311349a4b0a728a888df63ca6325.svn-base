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
    <div style="width: 100%;height: 30px;" id="tableTitle">
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
import { sortObjectArray, SetNull, groupBy } from "@/api/ComUnit.js";
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
const stcd = ref("");
const tabName = ref("fit1");
const img1 = ref("/images/line-chart.png");
const img2 = ref("/images/line-table4.png");
const tableHeaders = ref({})
const tableData = ref([]);
const tableTitle = ref("");
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
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
});
function setTime() {
  stime.value = dayjs(new Date()).format("YYYY-01-01 00:00:00");
  etime.value = dayjs(new Date()).format("YYYY-MM-DD HH:00:00");
  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:mm"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:mm"));
  Weacontent();
}
function Weacontent() {
  var strParam = {};
  strParam["pid"] = "2025042720004123967";
  strParam["stime"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  strParam["etime"] = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  api
    .SelectWdpstatRBXList(strParam)
    .then((res) => {
      SLdata.value = groupBy(res.result, "idtm");
      SLload();
    })
    .catch((err) => { });
}
function SLload() {
  const strJson = SLdata.value;
  var result = [], resultJson = [];
  var accdwtotal = 0, accpwtotal = 0;

  var columns = []
  //{ name: "num", label: "序号" },
  columns.push(
    { name: "tm", label: "时间" },
    { name: "total", label: "累计引水/排水" },)

  if (strJson.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      var _strParam = {};
      var item = strJson[num];
      accdwtotal = item.reduce((accumulator, currentItem) => {
        const accdw = currentItem.accdw;
        return SetNull(accdw) !== "" ? accumulator + accdw : accumulator;
      }, 0);
      accpwtotal = item.reduce((accumulator, currentItem) => {
        const accpw = currentItem.accpw;
        return SetNull(accpw) !== "" ? accumulator + accpw : accumulator;
      }, 0);
      // accpwtotal = item.reduce((accumulator, currentItem) => accumulator + currentItem.accpw, 0);
      _strParam["accdw"] = Number(accdwtotal).toFixed(1);
      _strParam["accpw"] = Number(accpwtotal).toFixed(1);
      _strParam["tm"] = strJson[num][0].idtm;
      result.push(_strParam);

      var _strJson = {};
      // _strJson["num"] = num + 1;
      _strJson["tm"] = dayjs(strJson[num][0].idtm).format("YYYY-MM-DD ");
      _strJson["total"] = Number(accpwtotal).toFixed(1) + "/" + Number(accdwtotal).toFixed(1);

      var accpw = 0, accdw = 0;
      for (var i = 0; i < item.length; i++) {
        if (SetNull(strJson[num][i].accpw) != "") {
          accpw = Number(strJson[num][i].accpw).toFixed(1);
        }
        if (SetNull(strJson[num][i].accdw) != "") {
          accdw = Number(strJson[num][i].accdw).toFixed(1);
        }
        _strJson["" + strJson[num][i].stcd + ""] = Number(accpw).toFixed(1) + "/" + Number(accdw).toFixed(1);
        if (num < 1) {
          columns.push({ name: strJson[num][i].stcd, label: (strJson[num][i].stnm).replaceAll(" ", "") })
        }
      }
      resultJson.push(_strJson);
    }
  }
  tableHeaders.value = columns;

  // var resultJsonTable = [];
  // for (var num = 0; num < resultJson.length; num++) {
  //   resultJson.reverse()[num]["num"] = num + 1;
  //   resultJsonTable.push(resultJson[num]);
  // }

  tableData.value = sortObjectArray(resultJson, ["tm"], "desc");
  tableTitle.value = "沿江各闸";

  const strNote = [];
  strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
  strNote.push({ name: "引水量", codename: "accpw", tableV: "0", isShow: true });
  strNote.push({ name: "排水量", codename: "accdw", tableV: "0", isShow: true });
  var LineColor = ["#30B90F", "#50CAE1"];
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
  datekey.value = Date.now();


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
      window.open("/UploadDoc/" + strJson[0]["value"]);
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
  if (props.stcd != "") {
    stcd.value = props.stcd;
  } else {
    stcd.value = inject("stcd").value;
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
<style scoped>
@import '@/assets/styles/Table.css';
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
  height: calc(100% - 300px);
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
