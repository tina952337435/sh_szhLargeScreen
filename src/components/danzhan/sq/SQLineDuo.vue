<template>
  <div style="width:100%;height: 100%;padding: 0px 0px 20px 0px;margin: 0px; overflow: hidden;">
    <div style="width:20%;height: 100%;overflow-y: auto;border: 1px solid var(--portal);margin-right: 10px;" class="tree">
      <el-tree ref="treeRef" :data="Phomedata" show-checkbox node-key="stcd"
        :default-expanded-keys="['2021082417454958999-1']" :default-checked-keys="['2021082417454958999-1']"
        :props="defaultProps" @check="handleNodeClick" />
    </div>
    <div style="width:76%;height: 100%;position: absolute;top: 83px;left: 22%;">
      <div class="topClass">
        <span>站点选择：</span>
        <el-select-v2
          v-model="selectedStations"
          :options="stationOptionsForSelect"
          multiple
          filterable
          collapse-tags
          placeholder="请选择站点"
          style="width: 200px;"
          @change="handleStationChange"
        />
        <span style="margin-left: 20px">开始时间：</span>
        <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
          showTime="true" showOkButton="true" showClearButton="false" />
        <span style="margin-left: 20px">结束时间：</span>
        <input id="ETIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm" timeFormat="HH:mm"
          showTime="true" showOkButton="true" showClearButton="false" />
        <span style="margin-left: 20px">类型：</span>
        <el-radio-group style="vertical-align: -2px;">
          <el-radio @click="TypeeChange('Minute')" v-model="pathname" label="Minute">分钟</el-radio>
          <el-radio @click="TypeeChange('HOUR')" v-model="pathname" label="HOUR">小时</el-radio>
          <el-radio @click="TypeeChange('DAY')" v-model="pathname" label="DAY">8时</el-radio>
        </el-radio-group>
        <!-- <span>数据来源：</span>
        <el-radio-group style="vertical-align: -2px;">
          <el-radio @click="getType('YC')" v-model="mtype" label="YC">遥测</el-radio>
          <el-radio @click="getType('BX')" v-model="mtype" label="BX">报汛</el-radio>
        </el-radio-group> -->
        <el-button type="primary" @click="BtnSearch()">查询</el-button>
      </div>
      <div style="height: calc(100% - 180px); width: 100%; margin-top: 10px">
        <div class="content-echarts">
          <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" id="SQLineDuo" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, sortObjectArray, groupBy } from "@/api/ComUnit.js";
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElConfigProvider, ElCascader, ElTree, ElSelectV2 } from "element-plus";
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
const pathname = ref("HOUR");
const mtype = ref("BX");
const tabName = ref("fit1");
const img1 = ref("/images/line-chart.png");
const img2 = ref("/images/line-table4.png");
const Liststnm = ref([]);
const value = ref([]);
var myData = [];

const Phomedata = ref([]);
const defaultchecked = ref(['2021082417454958999-1']);
const defaultProps = {
  children: 'children',
  label: 'stnm',
}
const treeRef = ref(null);
const selectedStations = ref([]);
const stationOptions = ref([]);
const stationOptionsForSelect = ref([]);

// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
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
function transData(jsonArr, idStr, pidStr, childrenStr) {
  // 存放的最终结果树数组
  const result = [];
  const id = idStr;
  const pid = pidStr;
  const children = childrenStr;
  const len = jsonArr.length;

  // 遍历得到以id为键名的对象(建立整棵树的索引)
  const hash = {};
  jsonArr.forEach(item => {
    hash[item[id]] = item;
  });
  for (let j = 0; j < len; j++) {
    const jsonArrItem = jsonArr[j];
    const hashItem = hash[jsonArrItem[pid]];
    if (hashItem) {
      const childrenItem = jsonArr.filter(function (e) {
        return e["pid"] == hashItem["stcd"];
      });
      hashItem["children"] = childrenItem;
      result.push(hashItem)
    }
  }
  // 去除 result 中的重复数据
  const uniqueResult = [];
  const seenIds = new Set();
  result.forEach(item => {
    if (!seenIds.has(item[id])) {
      seenIds.add(item[id]);
      uniqueResult.push(item);
    }
  });
  return uniqueResult;
};
function handleNodeClick() {
  // 在这里处理点击事件
  var strID = "";
  var tempNode = [];
  const checkedNodes = treeRef.value.getCheckedNodes();
  if (checkedNodes.length > 0) {
    var data = checkedNodes.filter(function (e) {
      return e.pid != "-1";
    });
    console.error(data)
    if (data.length > 0) {
      for (var num = 0; num < data.length; num++) {
        strID += "," + data[num]["stcd"];
        tempNode.push(data[num]);
      }
    }
  }
  $.data(myData, "WD_XUHAO", strID);
  $.data(myData, "NODE", tempNode);
  Weacontent();
};
// 将树形数据转换为扁平选项
function convertToStationOptions(treeData, parentLabel = '') {
  const options = [];
  treeData.forEach(item => {
    const label = parentLabel ? `${parentLabel}-${item.stnm}` : item.stnm;
    if (item.children && item.children.length > 0) {
      // 有子节点，继续递归（父节点不加入选项）
      options.push(...convertToStationOptions(item.children, label));
    } else {
      //叶子节点，加入选项
      options.push({
        value: item.stcd,
        label: label
      });
    }
  });
  return options;
}
// 处理下拉框选择变化
function handleStationChange(selectedValues) {
  selectedStations.value = selectedValues;
  // 同步更新树的选中状态
  if (treeRef.value && selectedValues.length > 0) {
    const checkedKeys = selectedValues.map(v => {
      const option = stationOptions.value.find(opt => opt.value === v);
      return v;
    });
    treeRef.value.setCheckedKeys(checkedKeys);
  }
  // 更新 myData
  var strID = "";
  var tempNode = [];
  if (selectedValues.length > 0) {
    selectedValues.forEach(stcd => {
      strID += "," + stcd;
      // 查找对应的节点信息
      const option = stationOptions.value.find(opt => opt.value === stcd);
      if (option) {
        tempNode.push({ stcd: stcd, stnm: option.label.split('-').pop() });
      }
    });
  }
  $.data(myData, "WD_XUHAO", strID);
  $.data(myData, "NODE", tempNode);
  Weacontent();
}
function Weacontent() {
  window.loadingShow();
  var strParam = {};
  strParam["pathname"] = pathname.value;
  strParam["stime"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  strParam["etime"] = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  strParam["datasource"] = mtype.value;
  strParam["stcd"] = $.data(myData, "WD_XUHAO");

  api.DuoSel(strParam)
    .then((res) => {
      JosnSel(res, "GETWATERVIEWNEWSel");
    }).catch((err) => { });
}
function getType(obj) {
  mtype.value = obj;
  Weacontent();
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
  stime.value = dayjs(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    .add(-3, "Day")
    .format("YYYY-MM-DD 08:00:00");
  etime.value = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:00"));
  mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:00"));
  api.hdBaseBRiverResult({})
    .then((res) => {
      $.data(myData, "hdBaseB", res.data);
      api.QuSel({})
        .then((res) => {
          JosnSel(res, "WATER_WX_ST_STBPRP_BSel");
        })
    })
    .catch((err) => { });
  // 加载站点选择数据
  api.QuSelDuo({ "pid": "2026031114184492913-2,2026031114184492913-7,2026031114184492913-8" })
    .then((res) => {
      if (res.data && res.data.length > 0) {
        stationOptionsForSelect.value = res.data.map(item => ({
          value: item.stcd,
          label: item.stnm
        }));
      }
    })
    .catch((err) => { });
});
function JosnSel(data, typeID) {
  if (typeID == "WATER_WX_ST_STBPRP_BSel") {
    var dt = [];
    var strID = "";
    var hdBaseB = $.data(myData, "hdBaseB");
    for (var num = 0; num < hdBaseB.length; num++) {
      var strWhere = {};
      strWhere["pid"] = "-1";
      strWhere["stcd"] = hdBaseB[num].swpid;
      strWhere["stnm"] = hdBaseB[num].rvnm;
      if (num == 0) {
        strWhere["checked"] = "checked";
      }
      if (SetNull(strWhere["stcd"]) != "") {
        dt.push(strWhere);
      }
      var temp = data.data;
      var tempNode = [];
      if (temp.length > 0) {
        for (var I = 0; I < temp.length; I++) {
          if (temp[I]["pid"] == strWhere["stcd"]) {
            dt.push(temp[I]);
            if (num == 0) {
              temp[I]["checked"] = "checked";
              strID += "," + temp[I]["stcd"].replaceAll(" ", "");
              tempNode.push(temp[I]);
              $.data(myData, "NODE", tempNode);
            }
          }
        }
      }
    }
    const mergedData = transData(dt, "stcd", "pid");
    Phomedata.value = mergedData;
    //转换树形数据为扁平选项用于下拉框
    stationOptions.value = convertToStationOptions(mergedData);
    $.data(myData, "WD_XUHAO", strID);
    // 默认选中树的第一个河系的第一个站点
    if (strID) {
      const defaultStcds = strID.split(',').filter(s => s.trim());
      selectedStations.value = defaultStcds;
    }
    Weacontent();
  } else if (typeID == "GETWATERVIEWNEWSel") {
    var strNote = [];
    var _column = {};
    _column["name"] = "时间";
    _column["codename"] = "tm";
    _column["tableV"] = "1";
    _column["isShow"] = true;
    strNote.push(_column);
    var ColoumnsName = {};
    ColoumnsName["indexcolumn"] = "序号";
    ColoumnsName["tm"] = "时间";
    var tempData = data.data.list;
    var dt = tempData;
    var tempNode = $.data(myData, "NODE");
    if (tempNode.length > 0) {
      for (var o = 0; o < tempNode.length; o++) {
        var strWhere = {};
        var stcd = tempNode[o]["stcd"].replaceAll(" ", "");
        _column = {};
        _column["name"] = tempNode[o]["stnm"];
        _column["codename"] = stcd + "upz";
        _column["tableV"] = "1";
        _column["isShow"] = true;
        strNote.push(_column);
      }
    }
    // console.error(dt, strNote)
    var LineColor = ['#6A5ACD', '#E9967A', "#FF3030", "#EE00EE", "#8B0000", "#8B008B", "#008B8B", "#90EE90", "#FFA500", "#9400D3", "#FFDAB9", "#6959CD", "#FF3030", "#E066FF", "#FF34B3", "#FF1493", "#FF4500", "#F4A460",
      "#EEAD0E", "#53868B", "#79CDCD", "#66CDAA", "#43CD80", "#00FF00", "#FFFF00", "#8B658B",];

    const _Option = ChartJs.chartSW("", dt, strNote, LineColor, "水位", "Mouth", _theme, 80, 20);

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

:deep(.el-tree-node__label) {
  color: var(--mtablecolor);
}

:deep(.el-tree-node__content) {
  height: auto;
}

:deep(.el-tree-node) {
  outline: none;
  white-space: normal;
  height: auto;
}

:deep(.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content) {
  background-color: transparent;
}

:deep(.el-tree .el-tree-node .el-tree-node__content:hover) {
  background-color: transparent;
}

:deep(.el-tree-node:focus>.el-tree-node__content) {
  background-color: transparent;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: var(--popupContentTitlebg);
  border-color: var(--popupContentTitlebg);
}

.tree::-webkit-scrollbar {
  width: 6px;
  /* 设置滚动条宽度 */
}

.tree::-webkit-scrollbar-thumb::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  border: 30%;
  background: var(--mtabletrcolor);
  z-index: 2;
}
</style>

<style lang="scss">
.el-select-v2 .el-select-v2__wrapper {
  min-height: 29px;
  height: 29px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}
.el-select-v2 .el-select-v2__selection {
  line-height: 27px;
}
.el-select-v2 .el-select-v2__placeholder {
  color: var(--widgetcolor);
}
.el-select-v2 .el-select-v2__input {
  color: var(--widgetcolor);
}
.el-select-v2-dropdown {
  max-height: 300px;
  overflow-y: auto;
  background: var(--boxtitlebg);
  border: 1px solid var(--popContentHeadbg);
}
.el-select-v2-dropdown .el-select-v2-option {
  padding: 0 10px;
  color: var(--widgetcolor);
}
.el-select-v2-dropdown .el-select-v2-option.is-hovering {
  background: var(--popContentHeadbg);
}
.el-select-v2-dropdown .el-select-v2-option.is-selected {
  background: var(--popContentHeadbg);
  color: var(--widgetcolor);
}
</style>