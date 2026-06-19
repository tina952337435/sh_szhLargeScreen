<template>
  <div class="topClass">
    <span style="margin-left: 20px">开始时间：</span>
    <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
      showTime="true" showOkButton="true" showClearButton="false" />
    <span style="margin-left: 20px">结束时间：</span>
    <input id="ETIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
      showTime="true" showOkButton="true" showClearButton="false" />
    <el-button type="primary" style="margin-left: 20px" @click="loadFangList()">查询</el-button>
  </div>

  <div style="height: calc(100% - 80px); width: 100%; margin-top: 10px">
    <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
  </div>
</template>

<script setup>
import $ from "jquery";
import { onMounted, ref, provide, defineAsyncComponent, reactive, inject } from "vue";
import { useStore } from "vuex";
import { SetNull, groupBy, SumJson, sortObjectArray } from "@/api/ComUnit.js";

import dayjs from "dayjs";
import api from "@/api/mode/index.js";
import apizonglan from "@/api/zonglan/index.js";

import * as echarts from "echarts";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";

// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElConfigProvider } from "element-plus";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("PingGuDanTrendline");
const props = defineProps({
  stcd: {
    type: String,
    default: "",
  },
  stnm: {
    type: String,
    default: "",
  },
  fadata: {
    type: Array,
    default: [],
  },
});

const stime = ref("");
const etime = ref("");
const dd_id = ref("");

onMounted(() => {
  mini.parse();
  var startTime = dayjs(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    .add(-180, "Day")
    .format("YYYY-MM-DD 08:00:00");
  var endTime = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  mini.get("STIME").setValue(dayjs(startTime).format("YYYY-MM-DD HH:00"));
  mini.get("ETIME").setValue(dayjs(endTime).format("YYYY-MM-DD HH:00"));
  stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  etime.value = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  loadFangList();
});


//方案列表
function loadFangList() {
  stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  etime.value = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  var strParam = {
    stime: stime.value,
    etime: etime.value
  };
  api
    .loadFangList(strParam)
    .then(res => {
      var result = res.result;
      var dd_IDStr = "111111111111111";
      for (var num = 0; num < result.length; num++) {
        dd_IDStr += result[num].dd_ID + ",";
      }
      dd_id.value = dd_IDStr;
      Weacontent();
    })
    .catch(err => { });
}

function Weacontent() {
  var strParam = {
    stcd: props.stcd,
    pid: dd_id.value
  };
  api
    .loadSlTongjiData(strParam)
    .then(res => {
      var dataResult = res.result;
      if (dataResult != [] && dataResult != null) {
        getYLQUSHI(dataResult);
      }
    })
    .catch(err => { });
}
function getYLQUSHI(data) {
  data = sortObjectArray(data, ["dd_CARRYTM"], "asc");
  var dataNew = [];
  for (var num = 0; num < props.fadata.length; num++) {
    var item = props.fadata[num];
    var dataTemp = data.filter(function (e) {
      return e.pid == item.dd_ID;
    });
    if (dataTemp.length > 0) {
      dataNew.push({ dd_STATUS: dataTemp[0].angle, dd_TM: item.dd_TM });
    }
  }
  var strNote = [];
  strNote.push({ name: "时间", codename: "dd_TM", tableV: "0", isShow: true });
  strNote.push({
    name: "预报精度",
    codename: "dd_STATUS",
    tableV: "0",
    isShow: true
  });
  var LineColor = [
    "#00FF00",
    "#00E4FF",
    "#01DDFF",
    "#F9C823",
    "#0264FD",
    "#FE7923",
    "#8E30FF"
  ];
  const _OptionYL = ChartJs.chartYBXS(
    "",
    dataNew,
    strNote,
    LineColor,
    "(%)",
    "Mouth",
    _theme,
    55,
    14
  );

  lineOption.value = _OptionYL;
  datekey.value = Date.now();
}

</script>


<style scoped>
.topClass {
  height: 45px;
  line-height: 40px;
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
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
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
</style>