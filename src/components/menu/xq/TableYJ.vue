<template>
  <div class="m-box m-box-3" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p1" id="title2">预警信息</p>

      <div style="width:calc(100% - 180px);" class="div-swiper">
        <!-- <div class="swiper-slide" style="width: 25%;"
          :class="Drpswiper == '全部' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('全部')">全部</div> -->
        <div class="swiper-slide" style="width: 33%;"
          :class="Drpswiper == '河网水位' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('河网水位')">河网水位</div>
        <div class="swiper-slide" style="width: 33%;"
          :class="Drpswiper == '积水点' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('积水点')">积水点</div>
        <!-- <div class="swiper-slide" style="width: 25%;"
          :class="Drpswiper == '积水点' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('积水点')">积水点</div> -->
        <div class="swiper-slide" style="width: 33%;"
          :class="Drpswiper == '风险点' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('风险点')">风险点</div>
      </div>

      <div class="xiala" style="right: 50px;top: 0px;position: absolute;width:70px;line-height: 30px;display:none;">
        <label id="hedaoTitle" @click="showItem('SWDBZLIST')"
          style="margin-top: 4px;margin-right: 5px;font-size: 14px;font-family: var(--calcite-font-family);">全部</label>
        <img src="/images/icon_select.png" style="position:absolute;right:0px;margin-top: 4px;"
          @click="showItem('SWDBZLIST')">
        <ul class="el-dropdown-menu"
          style="width:70px;height:120px;overflow-y:auto;margin-top:5px;font-family: var(--calcite-font-family);"
          id="SWDBZLIST">
          <li id="全部">全部</li>
          <li id="河网水位">河网水位</li>
          <li id="风险点">风险点</li>
          <!-- <li id="圩区">圩区</li>
          <li id="积水点">积水点</li> -->
        </ul>
      </div>
      <el-icon size="22px" style="right: -10px;top:9px;position: absolute;width:70px;line-height: 30px;cursor: pointer;"
        @click="baogao">
        <Document />
      </el-icon>
    </div>
    <!-- <div class="txt">
            <el-table :data="tableData" @row-click="handleclick"
                style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;">
                <el-table-column type="index" label="序号" width="60" header-align="center" align="center" />
                <el-table-column label="名称" prop="name" style="width:40%" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="行政区划" prop="district" style="width:20%" align="center">
                </el-table-column>
            </el-table>
    </div>-->

    <div class="txt" style="height: calc(100vh - 30rem);">
      <div style="padding: 0px; margin: 10px;height:100%;overflow-y:auto;" id="YJXyTable">
        <div class="YJXyTablediv">
          <div class="ClassName">
            <span class="View2" style="width:20%;" v-for="(item, index) in  YJXyTableTh " :key="index">{{ item }}</span>
          </div>
        </div>


        <div v-for="(item, index) in  tableData " :key="index" class="YJXyTablediv">
          <div @click="handleclick(item.lgtd, item.lttd, index, item)" class="ClassName" :id="'YJXyTablediv' + index">
            <span class="View2" style="width:20%;">{{ index + 1 }}</span>
            <span class="View" style="width:60%;" :title="item.stnm">【{{ item.type }}】{{ item.stnm }}</span>
            <span class="View2" style="width:20%;">
              <img src="/images/ddzh2.png" style="width:20px;vertical-align: -5px;" alt="生成报告"
                @click.stop="getQuestion(item.stcd, item.type, item);">
            </span>
          </div>
        </div>

      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script setup>
import '@/assets/styles/Table.css';
import '@/assets/styles/swiper.css';
import { useStore } from "vuex";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, inject, defineProps, provide, watch, defineAsyncComponent, h } from "vue";
import Dialog from "@/api/utils/Dialog.js";
import { ElMessage, ElTable, ElTableColumn } from "element-plus";
import { Document } from "@element-plus/icons-vue";
import { groupBy, SetNull, UUID } from "@/api/ComUnit.js";
import apimode from "@/api/mode/index.js";

import Mapbiaozhu from "@/components/untils/Mapbiaozhu.vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const store = useStore();
const { viewer } = store.state;
const tableData = ref();
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
// 传递弹开页面的标题名称
const titleName = ref();
const typeValue = ref();
// 传递弹开页面的stcd
const typeStcd = ref();
const DDdata = inject("DDdata");
const loadPDF = inject("loadPDF");

const YJlgtd = ref(null);
const YJlttd = ref(null);
const strJsonAll = ref([]);
const props = defineProps({
  getDingwei: Function, //这里的cgetDingwei对应父页面中的 **:getDingwei**
  DDdata: {
    type: Array,
    default: () => []
  },
  baseDataNew: {
    type: Array,
    default: () => []
  }
});
var YJXyTableTh = ref(["序号", "预警名称", "措施"])
var Drpswiper = ref("河网水位");
// var DDdata = props.DDdata; //调度方案编号
const stime = ref("2024-11-13 00:00:00");
const etime = ref("2024-11-13 23:59:59");
function StimeeChange(value, dateString) {
  stime.value = dayjs(value).format("YYYY-MM-DD 00:00:00");
}
function EtimeeChange(value, dateString) {
  etime.value = dayjs(value).format("YYYY-MM-DD 23:59:59");
}
function BtnSearch() {
  if (etime.value < stime.value) {
    ElMessage.error("结束时间不得小于开始时间");
  } else {
    Weacontent();
    emit("stime", stime);
    emit("etime", etime);
  }
}
// 类型选择
function showItem(id) {
  var obj = $("#" + id);
  var dis = obj.css("display");
  if (dis == "block") {
    obj.css("display", "none");
  } else {
    obj.css("display", "block");
  }
}
const JSDdata = ref([])
const tableDataCLQ = ref([])
function Weacontent() {
  var now = new Date();
  // api.MyVideoSiteSelectListhydrops({
  //   "etime": dayjs(now).format("YYYY-MM-DD 23:59:59"), "stime": dayjs(dayjs(now).format("YYYY-MM-DD 00:00:00")).add(-3, "month").format("YYYY-MM-DD HH:mm:ss")
  // }).then(res => {
  //   // console.error(res.result)
  //   if (res.result.length > 0) {
  //     for (var num = 0; num < res.result.length; num++) {
  //       var item = res.result[num];
  //       if (item.state != "3" && Number(item.status) >= 0.9) {
  //         item["grade"] = "有积水";
  //         item["type"] = "积水点";
  //         JSDdata.value.push(item);
  //       }
  //     }
  //   }
  // }).catch(err => { });
  var strWhere = { "startdate": dayjs(dayjs(now).format("YYYY-MM-DD 00:00:00")).add(-3, "month").format("YYYY-MM-DD HH:mm:ss"), "enddate": dayjs(now).format("YYYY-MM-DD 23:59:59"), "USERID": "", "strExp": "{\"type\":\"\",\"city\":\"苏州市,虎丘区,吴中区,相城区,姑苏区,吴江区,苏州工业园区,常熟市,张家港市,昆山市,太仓市,\"}", "pattem": "积水事件" }
  api.DangerSelectList(strWhere).then(e => {
    console.error("积水点", e.result)
    if (e.result.length > 0) {
      for (var num = 0; num < e.result.length; num++) {
        var item = e.result[num];
        item["stnm"] = item.address;
        item["type"] = "积水点";
        JSDdata.value.push(item);
      }
    }
    console.error("JSDdata.valueJSDdata.value", JSDdata.value)
  }).catch(err => { });

  var strParam = {};
  strParam["pid"] = DDdata.value.dd_ID;
}
function GetType(type) {
  $("#YJXyTable .YJXyTablediv div").removeClass("ClassNameSelect");
  Drpswiper.value = type;
  tableData.value = strJsonAll.value.filter(function (e) {
    if (Drpswiper.value == "全部") {
      return e;
    } else {
      return e.type == Drpswiper.value;
    }
  });

  if (type == "风险点") {
    YJXyTableTh.value = ["序号", "点位", "场景指南"];
  } else {
    YJXyTableTh.value = ["序号", "预警名称", "措施"];
  }
}
const pointMapBZData = ref([]);
function handleclick(lgtd, lttd, index, evt) {
  if (evt.type == "积水点") {
    if (SetNull(evt.baseInfo) != "") {
      lgtd = evt.baseInfo[0]["lgtd"]
      lttd = evt.baseInfo[0]["latd"]
      evt.lgtd = lgtd;
      evt.lttd = lttd;
    }
  }
  if (SetNull(pointMapBZData.value) != "") {
    
  }
  pointMapBZData.value = evt;
  $("#YJXyTable .YJXyTablediv div").removeClass("ClassNameSelect");
  $("#YJXyTablediv" + index + "").addClass("ClassNameSelect ClassName");
  if (SetNull(lgtd) == "" || SetNull(lttd) == "") {
    ElMessage.error("缺少经纬度坐标");
  } else {
    YJlgtd.value = Number(lgtd);
    YJlttd.value = Number(lttd);
    props.getDingwei(evt.type);
    
    if (evt.type == "风险点") {
      
      return;
    } else if (evt.type == "积水点") {
      
      return;
    } else {
      
    }
  }
}
function getQuestion(stcd, type, item) {
  if (type == "风险点") {
    var ChildVue = '/pdf/' + item.pdf + "?times=" + UUID(18, 16);
    loadPDF(true, ChildVue, "撤离方案");
  } else if (type == "积水点") {
  } else {
    setTimeout(function () {
      props.DDdata.DRP = 64;
      JsonColumnChart({ "result": [] });
    }, 500);
    var pdfUrl = "/UploadDoc/temp/0531.pdf";
  }
}
const baogaoCurDrp = ref("");
function baogao() {
  props.DDdata.DRP = 64;
  Weacontentbaogao();
}

function Weacontentbaogao() {
  var strParam = {
    pid: props.DDdata.id,
    pathname: "1"
  };
  apimode
    .loadMODELSINGRESULT(strParam)
    .then(res => {

      JsonColumnChart(res);
    })
    .catch(err => { });
}
function JsonColumnChart(res) {
  var _CURDRP = "", _CURDRPLIST = [];
  var _CURPROTECT = "", _CURPROTECTLIST = [];
  var _CURQIANXIANG = "", _CURQIANXIANGLIST = [];
  var data = res.result;
  var strJson = groupBy(tableData.value, "type");
  _CURDRP = "据气象部门预测，" + dayjs(props.DDdata.dd_TM).format("M月D日H时") + "—" + dayjs(props.DDdata.dd_CHECKBY).format("M月D日H时") + "，苏州地区面雨量" + props.DDdata.DRP + "毫米。 ";
  if (strJson.length > 0) {
    var rowindex = 0;
    for (var numII = 0; numII < strJson.length; numII++) {
      var item = strJson[numII];
      if (item.length > 0) {
        for (var i = 0; i < item.length; i++) {
          rowindex++;
          var strWhereList = {};
          strWhereList["ROWINDEX"] = rowindex;
          strWhereList["STNM"] = item[i]["stnm"];
          strWhereList["PATHNAME"] = item[i]["type"];
          strWhereList["MAXZ"] = item[i]["upz"];
          if (strWhereList["MAXZ"] > item[i]["grz"]) {
            strWhereList["WRZ"] = item[i]["grz"];
            strWhereList["NOTE"] = "超保";
          } else {
            strWhereList["WRZ"] = item[i]["wrz"];
            strWhereList["NOTE"] = "超警";
          }
          strWhereList["WRZCHA"] = Number(strWhereList["MAXZ"] - strWhereList["WRZ"]).toFixed(2);
          _CURDRPLIST.push(strWhereList);
        }
      }
      if (item[0]["type"] == "河网水位") {
        _CURDRP += "代表站超警水位" + item.length + "个。";
      }
      else {
        _CURDRP += item[0]["type"] + "超警" + item.length + "个。";
      }
    }
  }

  var listPathName = [];
  listPathName.push("安置点");
  listPathName.push("仓库");
  listPathName.push("队伍");
  listPathName.push("抢险泵车");
  var strResult = props.baseDataNew.filter(function (evt) {
    return listPathName.includes(evt["showTypeName"]);
  })

  var strResultSHOW = groupBy(strResult, "showTypeName");

  _CURPROTECT = "抢险措施能力共计" + strResultSHOW.length + "类。主要包括";
  if (strResultSHOW.length > 0) {
    var rowindex = 0;
    for (var i = 0; i < strResultSHOW.length; i++) {
      var _itemList = strResultSHOW[i];

      if (i == 0) {
        _CURPROTECT += "" + _itemList[0]["showTypeName"] + _itemList.length + "处";
      }
      else {
        _CURPROTECT += "，" + _itemList[0]["showTypeName"] + _itemList.length + "处";
      }
      if (_itemList.length > 0) {
        for (var m = 0; m < _itemList.length; m++) {
          rowindex++;
          var _strWhereList = {};
          _strWhereList["ROWINDEX"] = rowindex;
          _strWhereList["STNM"] = strResultSHOW[i][m]["name"];
          _strWhereList["PATHNAME"] = strResultSHOW[i][m]["showTypeName"];
          if (SetNull(strResultSHOW[i][m]["owen"]) != "") {
            _strWhereList["OWER"] = strResultSHOW[i][m]["owen"];
          } else {
            _strWhereList["OWER"] = "/";
          }
          _CURPROTECTLIST.push(_strWhereList)
        }
      }

    }
  }

  var strResultFlag = props.baseDataNew.filter(function (evt) {
    return !listPathName.includes(evt["showTypeName"]);
  })


  var strResultFlagSHOW = groupBy(strResultFlag, "showTypeName");

  _CURQIANXIANG = "抢险措施能力共计" + strResultFlagSHOW.length + "类。主要包括";
  if (strResultFlagSHOW.length > 0) {
    var rowindex = 0;
    for (var i = 0; i < strResultFlagSHOW.length; i++) {
      var _itemList = strResultFlagSHOW[i];

      if (i == 0) {
        _CURQIANXIANG += "" + _itemList[0]["showTypeName"] + _itemList.length + "处";
      }
      else {
        _CURQIANXIANG += "，" + _itemList[0]["showTypeName"] + _itemList.length + "处";
      }

      if (_itemList.length > 0) {
        for (var m = 0; m < _itemList.length; m++) {
          rowindex++;
          var _strWhereList = {};
          _strWhereList["ROWINDEX"] = rowindex;
          _strWhereList["STNM"] = strResultFlagSHOW[i][m]["name"];
          _strWhereList["PATHNAME"] = strResultFlagSHOW[i][m]["showTypeName"];
          if (SetNull(strResultFlagSHOW[i][m]["owen"]) != "") {
            _strWhereList["OWER"] = strResultFlagSHOW[i][m]["owen"];
          } else {
            _strWhereList["OWER"] = "/";
          }
          _CURQIANXIANGLIST.push(_strWhereList)
        }
      }

    }
  }


  var listParam = [];
  listParam.push({ "name": "CURDRP", "value": _CURDRP })
  listParam.push({ "name": "CURPROTECT", "value": _CURPROTECT })
  listParam.push({ "name": "CURQIANXIANG", "value": _CURQIANXIANG })
  listParam.push({ "name": "CURDRPLIST", "value": JSON.stringify(_CURDRPLIST) })
  listParam.push({ "name": "CURPROTECTLIST", "value": JSON.stringify(_CURPROTECTLIST) })
  listParam.push({ "name": "CURQIANXIANGLIST", "value": JSON.stringify(_CURQIANXIANGLIST) })
  var strParam = {};
  strParam["pathname"] = "temp";
  strParam["datasource"] = "SZXYBG.docx";
  strParam["strExp"] = JSON.stringify(listParam);
  api.WarningBaoGao(strParam).then((res) => {
    // res["result"][0]["pdfname"] = "0a6d8b6f-8d27-41aa-a17b-352a49185d44.pdf";
    var ChildVue = "/UploadDoc/" + strParam["pathname"] + "/" + res["result"][0]["pdfname"] + "?times=" + UUID(18, 16);
    // ChildVue="/UploadDoc/temp/0531.pdf"+"?times="+UUID(18,16);
    //  window.open(ChildVue);
    loadPDF(true, ChildVue);

  }, (error) => {
    const ChildVue = "/UploadDoc/temp/0531.pdf" + "?times=" + UUID(18, 16);
    //  window.open(ChildVue);
    loadPDF(true, ChildVue);
  })



}

onMounted(() => {
  var now = new Date();
  stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 00:00:00"))
    .add(-1, "month")
    .format("YYYY-MM-DD HH:mm:ss");
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  Weacontent();
});
// 提供方法给子组件
provide("typeStcd", typeStcd);
provide("stime", stime);
provide("etime", etime);

//这里需要暴露出去不然父组件调用不到这个方法
defineExpose({ YJlgtd, YJlttd });
</script>

<style scoped>
/* 自定义滚动条样式 */
#YJXyTable::-webkit-scrollbar {
  width: 1px;
  /* 设置滚动条宽度 */
}

#YJXyTable::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  border-radius: 50%;
  z-index: 2;
}

#SWDBZLIST::-webkit-scrollbar {
  width: 1px;
  /* 设置滚动条宽度 */
}

s #SWDBZLIST::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  border-radius: 50%;
  z-index: 2;
}

#YJXyTable div {
  list-style: none;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  margin-bottom: 15px;
}

.ClassName {
  background: var(--ClassNameBcak);
  font-weight: normal;
  color: #ccc;
  font-size: 14px;
  width: 100%;
  display: inline-block;
  width: 100%;
  /* padding: 0px 20px; */
}

.ClassNameSelect {
  background: var(--ClassNameBcakSelect);
}

.View {
  font-weight: bold;
  color: #fff;
  width: 60%;
  display: inline-block;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.View2 {
  font-weight: bold;
  color: #fff;
  width: 20%;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.el-tabs--card > .el-tabs__header) {
  padding: 0px;
  margin: 0px;
}

:deep(.el-tabs--card > .el-tabs__header) {
  border-bottom: 0px;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  border: 0px;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  background: var(--swDivSelectcolor);
  border-radius: 6px;
  border: var(--portalborder);
  min-width: 80px;
  /* padding: 8px; */
  height: 34px;
  line-height: 34px;
  color: var(--widgetcolor);
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  background: var(--portal);
  border-radius: 6px;
  min-width: 80px;
  border: var(--portalborder);
  /* padding: 8px; */
  height: 34px;
  line-height: 34px;
  color: white;
  margin: 0px 5px;
}

:deep(.demo-tabs > .el-tabs__content) {
  border: none;
  background: transparent;
}

:deep(.el-table),
:deep(.el-table tr),
:deep(.el-table:not(.el-table--border) .el-table__cell) {
  background: transparent;
  color: var(--mtablecolor);
  border: none;
  --el-table-border-color: none;
}

:deep(.el-table__header-wrapper:not(.el-table--border) .el-table__cell) {
  color: var(--mtablethcolor);
}

:deep(.el-table .cell) {
  padding: 0 8px;
  white-space: nowrap;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: transparent;
}

:deep(.el-input) {
  --el-input-border-color: var(--mtablecolor);
  width: 200px;
  border-radius: 6px;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--mtablecolor) inset;
}

:deep(.el-input__inner) {
  color: var(--mtablecolor);
}

:deep(.el-table__body-wrapper .el-table__row:nth-child(even)) {
  background: var(--mtabletrcolor);
}

:deep(.el-table .cell) {
  padding: 0 8px;
  white-space: nowrap;
  cursor: pointer;
}

.el-checkbox.el-checkbox--large {
  color: var(--widgetcolor);
  min-width: 30px;
  padding: 0px;
  margin: 0px;
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
  width: 118px;
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

.View2:nth-child(2) {
  width: 60% !important;
}
</style>
  