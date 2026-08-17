<template>
  <div style="width:100%;height: 100%;padding: 0px 0px 20px 0px;margin: 0px; overflow: hidden;">
    <div style="width:100%;height: 100%;">
      <div class="topClass">
        <span>站点选择：</span>
        <el-select-v2
          v-model="selectedStations"
          :options="stationOptionsForSelect"
          multiple
          filterable
          collapse-tags
          placeholder="请选择站点"
          style="width: 320px;"
          @change="handleStationChange"
        />
        <span style="margin-left: 20px">开始时间：</span>
        <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH" timeFormat="HH"
          showTime="true" showOkButton="true" showClearButton="false" />
        <span style="margin-left: 20px">结束时间：</span>
        <input id="ETIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH" timeFormat="HH"
          showTime="true" showOkButton="true" showClearButton="false" />
        <!-- <span style="margin-left: 20px">类型：</span>
        <el-radio-group style="vertical-align: -2px;">
          <el-radio @click="TypeeChange('Minute')" v-model="pathname" label="Minute">分钟</el-radio>
          <el-radio @click="TypeeChange('HOUR')" v-model="pathname" label="HOUR">小时</el-radio>
          <el-radio @click="TypeeChange('DAY')" v-model="pathname" label="DAY">8时</el-radio>
        </el-radio-group> -->
        <el-button type="primary" @click="BtnSearch()"  style="margin-left: 20px">查询</el-button>
      </div>
      <div style="height: calc(100% - 180px); width: 100%; margin-top: 10px">
        <div class="content-echarts">
          <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="LLLineDuo" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { ElRadio, ElButton, ElSelectV2 } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted } from "vue";

const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const stime = ref("");
const etime = ref("");
const pathname = ref("HOUR");
const mtype = ref("BX");

var myData = [];

const selectedStations = ref([]);
const stationOptionsForSelect = ref([]);
// 默认选中的站点名称
const defaultStationNames = ["温州路", "黄渡", "北新泾"];
// 站点初始化完成标识
let isInitDone = false;

const props = defineProps({
  stcd: {
    type: String,
    default: "",
  },
  mtype: {
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

function handleStationChange(selectedValues) {
  selectedStations.value = selectedValues;
  var strID = "";
  var tempNode = [];
  if (selectedValues.length > 0) {
    selectedValues.forEach(stcd => {
      strID += "," + stcd;
      const option = stationOptionsForSelect.value.find(opt => opt.value === stcd);
      if (option) {
        tempNode.push({ stcd: stcd, stnm: option.label });
      }
    });
    strID = strID.substring(1); // 去掉开头的逗号
  }
  $.data(myData, "WD_XUHAO", strID);
  $.data(myData, "NODE", tempNode);
  // 初始化阶段不触发查询，等 onMounted 统一触发
  if (isInitDone) {
    Weacontent();
  }
}

function Weacontent() {
  window.loadingShow();
  var strParam = {};
  strParam["pathname"] = pathname.value;
  strParam["stime"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH") + ":00:00";
  strParam["etime"] = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH") + ":59:59";
  strParam["datasource"] = mtype.value;
  strParam["stcd"] = $.data(myData, "WD_XUHAO");

  api.DuoSelFlow(strParam)
    .then((res) => {
      JosnSel(res, "GETFLOWVIEWNEWSel");
    }).catch((err) => { });
}

function TypeeChange(e) {
  pathname.value = e;
  Weacontent();
}

function BtnSearch() {
  Weacontent();
}

onMounted(() => {
  mini.parse();
  // 优先使用父组件传入的时间，否则取默认值
  if (props.stime) {
    stime.value = props.stime;
  } else {
    stime.value = dayjs(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"))
      .add(-3, "Day")
      .format("YYYY-MM-DD 08:00:00");
  }
  if (props.etime) {
    etime.value = props.etime;
  } else {
    etime.value = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  }

  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH"));

  // 加载流量站点选择数据
  api.QuSelDuo({ "pid": "2026031114184492913-4,2019011015353464106" })
    .then((res) => {
      if (res.data && res.data.length > 0) {
        stationOptionsForSelect.value = res.data.map(item => ({
          value: item.stcd,
          label: item.stnm
        }));
        // 默认选中温州路、黄渡、北新泾
        defaultSelectStations();
      }
    })
    .catch((err) => { });
});

// 根据站点名称默认选中
function defaultSelectStations() {
  var strID = "";
  var tempNode = [];
  var defaultValues = [];

  defaultStationNames.forEach(name => {
    const option = stationOptionsForSelect.value.find(opt => opt.label === name);
    if (option) {
      defaultValues.push(option.value);
      strID += "," + option.value;
      tempNode.push({ stcd: option.value, stnm: option.label });
    }
  });

  if (defaultValues.length > 0) {
    strID = strID.substring(1); // 去掉开头的逗号
    selectedStations.value = defaultValues;
    $.data(myData, "WD_XUHAO", strID);
    $.data(myData, "NODE", tempNode);
    isInitDone = true;
    Weacontent();
  }
}

function JosnSel(data, typeID) {
  if (typeID == "GETFLOWVIEWNEWSel") {
    var strNote = [];
    var _column = {};
    _column["name"] = "时间";
    _column["codename"] = "tm";
    _column["tableV"] = "1";
    _column["isShow"] = true;
    strNote.push(_column);
    var tempData = data.data.list;
    var dt = tempData;
    var tempNode = $.data(myData, "NODE");
    if (tempNode.length > 0) {
      for (var o = 0; o < tempNode.length; o++) {
        var stcd = tempNode[o]["stcd"].replaceAll(" ", "");
        _column = {};
        _column["name"] = tempNode[o]["stnm"];
        _column["codename"] = stcd + "q";
        _column["tableV"] = "1";
        _column["isShow"] = true;
        strNote.push(_column);
      }
    }
    var LineColor = [
      "#E85D5D", "#5DB8B8", "#E8A85D", "#5D7BE8", "#A8E85D",
      "#C85DE8", "#5DE8C8", "#E8D35D", "#E85DA8", "#8BE85D",
      "#5D8BE8", "#A05DE8", "#5DE885", "#E85D7B", "#D3E85D",
      "#6B5DE8", "#5DE8A8", "#E87B5D", "#5DA0E8", "#C8E85D",
      "#A85DE8", "#E85DC8", "#5DE8E8", "#E8C85D", "#5D5DE8",
      "#E85D8B",
    ];

    const _Option = ChartJs.chartSWZoom("", dt, strNote, LineColor, "流量(m³/s)", "Mouth", _theme, 80, 20);

    lineOption.value = _Option;
    datekey.value = Date.now();
    window.loadingHide();
  }
}
</script>
<style scoped>
.topClass {
  height: 45px;
  line-height: 40px;
  color: var(--widgetcolor);
}

.content-echarts {
  display: block;
  width: 100%;
  height: 100%;
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
  width: 130px !important;
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
  border-color: var(--swDivSelectcolor);
}
</style>

<style lang="scss">
.el-select__wrapper {
  min-height: 29px;
  height: 29px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}
.el-select__selection {
  line-height: 27px;
}
.el-select__placeholder {
  color: var(--widgetcolor);
}
.el-select__input {
  color: var(--widgetcolor);
}
.el-select .el-tag {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: var(--widgetcolor);
}
.el-select .el-tag .el-tag__close {
  color: var(--widgetcolor);
}
.el-select .el-tag .el-tag__close:hover {
  background-color: var(--swDivSelectcolor);
  color: #fff;
}
.el-select-dropdown {
  background: var(--boxtitlebg);
  border: 1px solid var(--popContentHeadbg);
  overflow: hidden !important;
}
.el-select-dropdown .el-select-dropdown__item {
  padding: 0 10px;
  color: var(--widgetcolor);
  background: var(--boxtitlebg) !important;
}
.el-select-dropdown .el-select-dropdown__item.is-hovering {
  background: var(--popContentHeadbg) !important;
}
.el-select-dropdown .el-select-dropdown__item.is-selected {
  background: var(--popContentHeadbg) !important;
  color: var(--widgetcolor);
}
</style>
