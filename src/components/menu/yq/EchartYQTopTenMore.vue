<template>
  <div class="topClass">
    <div style="width:calc(100% - 20px);" class="div-swiper">
      <div class="swiper-slide" style="width: 10%;"
        :class="Drpswiper == 'YL10' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL10')">
        10分钟
      </div>
      <div class="swiper-slide" style="width: 10%;"
        :class="Drpswiper == 'YL15' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL15')">
        15分钟
      </div>
      <div class="swiper-slide" style="width: 10%;"
        :class="Drpswiper == 'YL30' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL30')">
        30分钟
      </div>
      <div class="swiper-slide" style="width: 10%;"
        :class="Drpswiper == 'YL60' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL60')">
        1小时
      </div>
      <div class="swiper-slide" style="width: 10%;"
        :class="Drpswiper == 'YL180' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL180')">
        3小时</div>
      <div class="swiper-slide" style="width: 10%;"
        :class="Drpswiper == 'YL360' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL360')">
        6小时</div>
      <div class="swiper-slide" style="width: 10%;"
        :class="Drpswiper == 'YL720' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL720')">
        12小时</div>
      <div class="swiper-slide" style="width: 10%;"
        :class="Drpswiper == 'YL1440' && 'swiper-slide swiper-slide-thumb-active'" @click="GetDrpTen('YL1440')">
        24小时</div>
    </div>
    <span style="margin-left: 20px">开始时间：</span>
    <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
      showTime="true" showOkButton="true" showClearButton="false" />
    <span style="margin-left: 20px">结束时间：</span>
    <input id="ETIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
      showTime="true" showOkButton="true" showClearButton="false" />
    <el-button type="primary" style="margin-left: 20px" @click="BtnSearch()">查询</el-button>
    <el-button type="success" style="margin-left: 20px" @click="ExportData()">导出</el-button>
  </div>
  <div style="height: calc(100% - 80px); width: 100%; margin-top: 10px">
    <div class="content-echarts">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="YLLineMOre" />
    </div>
    <!-- <div style="width: 100%;height: 50px;text-align: center;font-size: 20px;color: var(--popupContentTitleColor)"
      id="tableTitle">
      {{ tableTitle }}
    </div> -->
    <div class="content-table">
      <customTable :headers="tableHeaders" :rows="tableData" class="tableYQ tableYJSL" :border="0" :cellspacing="0"
        :cellpadding="0" />
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
const Drpswiper = ref("YL30");
const lineOption = ref({});
const SLdata = ref({});
const stime = ref("");
const etime = ref("");
const pid = ref("");
const pathname = ref("30");
const tabName = ref("fit1");
const img1 = ref("/images/line-chart.png");
const img2 = ref("/images/line-table4.png");
// const tableHeaders = ref({ "num": "序号", "tm": "时间", "stnm": "名称", "drp": "雨量" });
const tableHeaders = ref([
  { name: "num", label: "序号" },
  { name: "tm", label: "时间" },
  { name: "stnm", label: "名称" },
  { name: "drp", label: "雨量" },
]);
const tableData = ref([]);
const tableTitle = ref("");
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);

const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
});
function Weacontent() {
  window.loadingShow();
  var strParam = {};
  strParam["pid"] = "20241030000002";
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  strParam["pathname"] = pathname.value;
  if (props.typenameRadio == 2) {
    strParam["datasource"] = "QX";
  }
  else if (props.typenameRadio == 3) {
    strParam["datasource"] = "BX";
  }
  else if (props.typenameRadio == 4) {
    strParam["datasource"] = "YC";
  }
  api
    .QueryMAXDRPList(strParam)
    .then((res) => {
      const jsondata = res.result; //sortObjectArray(res.result, ["drp"], "desc");
      var strJson = jsondata.sort(function (a, b) {
        return b.drp - a.drp;
      });
      const result = [];
      // if (strJson.length > 0) {
      for (let num = 0; num < strJson.length; num++) {
        if (num < 10) {
          const item = strJson[num];
          // if (item["drp"] > 0) {
          let strParam = {};
          var drp = item["drp"] != undefined ? Number(item["drp"]).toFixed(1) : 0;
          strParam["num"] = num + 1;
          strParam["stnm"] = item["stnm"];
          strParam["tm"] = item["tm"];
          strParam["drp"] = drp;
          result.push(strParam);
          // }
        }
      }
      const strNote = [];
      strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
      strNote.push({ name: "雨量", codename: "drp", tableV: "0", isShow: true });
      var LineColor = [
        "#3E8BFF",
        "#1CB8B2",
        "#01DDFF",
        "#F9C823",
        "#0264FD",
        "#FE7923",
        "#8E30FF",
      ];
      const _Option = ChartJs.chartYL(
        "",
        result,
        strNote,
        LineColor,
        "雨量",
        "true",
        _theme,
      );
      tableData.value = result;
      _Option.tooltip.formatter = function (params) {
        let res = params[0].axisValue + '<br/>';
        params.forEach(function (item) {
          var TM = result.filter(function (e) {
            return e.stnm == item.name;
          });
          if (TM.length > 0) {
            res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(1) + '<br/>' + TM[0].tm;
          } else {
            res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(1) + '<br/>';
          }
        });
        return res;
      }
      lineOption.value = _Option;
      datekey.value = Date.now();
    })
    .catch((err) => {
      console.error(err);
    });
  window.loadingHide();
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
  strParam["title"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00" + "至" + dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00" + "小时雨强排名前10";
  strParam["pathname"] = "temp";
  strParam["columnname"] = listcolumnname;
  strParam["maplist"] = tableData.value;
  api.ExportExcel(strParam).then((res) => {
    var strJson = res.result;
    if (strJson.length > 0) {
      // window.open("/UploadDoc/" + strJson[0]["value"], strParam["title"]);      
    downloadFile("/UploadDoc/" + strJson[0]["value"],  strParam["title"]);
    }
  })
}
function BtnSearch() {
  stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  etime.value = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  Weacontent();
}

function GetDrpTen(obj) {
  Drpswiper.value = obj;
  var now = new Date();
  var v = obj.replace("YL", "");
  stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  etime.value = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  if (v > 0) {
    if (SetNull(etime.value) == "") {
      etime.value = dayjs(now).format("YYYY-MM-DD HH:59:59");
    }
    if (SetNull(stime.value) == "") {
      stime.value = dayjs(dayjs(now).format("YYYY-MM-DD  HH:00:00"))
        .add(-v, "miunute")
        .format("YYYY-MM-DD HH:mm:ss");
    }
  }
  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:00"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:00"));
  pathname.value = v;
  Weacontent();
}
onMounted(() => {
  mini.parse();
  var now = new Date();
  var endTime = dayjs(now).format("YYYY-MM-DD HH:59:59");
  var startTime = dayjs(dayjs(now).format("YYYY-MM-DD  HH:00:00"))
    .add(-30, "miunute")
    .format("YYYY-MM-DD HH:mm:ss");
  if (Number(dayjs(now).format("HH")) < 8) {
    startTime = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  mini.get("STIME").setValue(dayjs(startTime).format("YYYY-MM-DD HH:00"));
  mini.get("ETIME").setValue(dayjs(endTime).format("YYYY-MM-DD HH:00"));
  stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  etime.value = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  GetDrpTen("YL30")
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
.topClass {
  height: 70px;
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
  height: calc(100% - 310px);
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
