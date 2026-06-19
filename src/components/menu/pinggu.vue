<template>
  <div class="qixiangmai">
    <!-- 左边降雨、预报河网水位趋势图 -->
    <div class="pinggu-left">
      <div class="pingtu-title">
        <!-- <div style="width:240px;display: inline-block;vertical-align: 2px;" class="div-swiper">
          <div class="swiper-slide" style="width: 40%;"
            :class="swiper == 'pinggu' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('pinggu')">
            历史方案
          </div>
          <div class="swiper-slide" style="width: 40%;"
            :class="swiper == 'pinggubaogao' && 'swiper-slide swiper-slide-thumb-active'"
            @click="GetType('pinggubaogao')">
            防御小结
          </div>
        </div> -->
        <div style="width:calc(100% - 300px);display: inline-block;text-align: left;">
          历史方案
          <span>
            <el-icon size="22px" style="position: absolute;right: 40px;top: 18px;cursor:pointer;" title="历史方案精度趋势线"
              @click="pingguqushixian()">
              <DataLine />
            </el-icon>
          </span>
        </div>
      </div>
      <div class="pinggu-leftMenu" style="height:calc(100% - 60px);">
        <el-table ref="myTable" :data="DD_DATA" style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;"
          row-key="dd_ID" @row-click="handleclick" :row-class-name="tableRowClassName">
          <el-table-column type="index" min-width="10%" label="序号">
            <!-- <template #default="scope">
              <el-radio v-model="radio" :label="scope.$index + 1"
                @change="handleRadioChange(scope.$index + 1, scope.row)"></el-radio> 
            </template>-->
          </el-table-column>
          <!-- <el-table-column label="序号" type="index" min-width="10%" align="center"></el-table-column> -->
          <el-table-column label="方案名" prop="dd_NAME" min-width="40%" align="center"
            :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="预报精度(%)" prop="dd_STATUS" min-width="25%" align="center"></el-table-column>
          <el-table-column label="降雨偏差(%)" prop="dd_DISTRIBY" min-width="25%" align="center">

            <template #default="scope">
              <span @click="toDetail(scope.row)">
                {{ scope.row.dd_DISTRIBY }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pinggu-leftMenu" style="height:calc(100% - 490px);padding-top:10px;display:none;">
        <div class="pinggu-lefttitle" style="color:var(--title2)">预报精度和降雨偏差趋势线</div>
        <div class="pinggu-leftContent">
          <Echarts :width="'100%'" :height="'100%'" :option="lineOptionYL" :key="datekeyYL" :id="dateidYL" />
        </div>
      </div>
    </div>

    <!-- 右边方案代表站趋势图 -->
    <div class="pinggu-right">
      <div class="pingtu-title" style="line-height: 74px;height:50px;">
        <!-- 代表站趋势图 -->
        {{ fanganTitle }}
        <!-- <span id="totalPinggu">(平均精度：86%)</span> -->
      </div>
      <!-- <div
        class="xiala"
        style="right: 65px;top: 22px;position: absolute;width:230px;line-height: 30px;"
      >
        <label
          id="hedaoTitle"
          @click="showItem('SWDBZLIST')"
          style="color: var(--def1ff);margin-top: 4px;margin-right: 5px;font-size: 14px;font-family: var(--calcite-font-family);"
        >{{DD_NAME}}</label>
        <img
          src="/images/icon_select.png"
          style="position:absolute;right:0px;margin-top: 4px;"
          @click="showItem('SWDBZLIST')"
        >
        <ul
          class="el-dropdown-menu"
          style="width:240px;height:120px;overflow-y:auto;margin-top:5px;font-family: var(--calcite-font-family);"
          id="SWDBZLIST"
        >
          <li
            v-for="(item, index) in DD_DATA"
            :key="index"
            :id="item.dd_ID"
            @click="menuClick(index)"
          >{{item.dd_NAME}}</li>
        </ul>
      </div>-->
      <div class="pinggu-rightPMenu">
        <div v-for="(item, index) in chartsData" class="pinggu-rightMenu">
          <div class="pinggu-rightMenuTitle" @click="danzhanTrendLine(item.stcd, item.stnm)">
            {{ item.stnm }}(确定性系数：{{ item.DC }}) </div>
          <div :key="index" :id="`chart-${index}`" class="pinggu-rightMenuChart">

          </div>
        </div>
      </div>
    </div>
  </div>

  <MyDialog :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <trendline />
  </MyDialog>
</template>
<script setup>
import '@/assets/styles/swiper.css'
import $ from "jquery";
import { onMounted, ref, provide, defineAsyncComponent, reactive, h, } from "vue";
import { useStore } from "vuex";
import { SetNull, groupBy, SumJson } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import api from "@/api/mode/index.js";
import apizonglan from "@/api/zonglan/index.js";

import * as echarts from "echarts";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";

import { DataLine, TrendCharts } from "@element-plus/icons-vue";
import { ElInput, ElTable, ElTableColumn, ElTree } from "element-plus";
import MyDialog from "@/components/ComDialog.vue";
import trendline from "@/components/danzhan/yb/trendline.vue";

import Dialog from "@/api/utils/Dialog.js";

const myTable = ref(null);
const swiper = ref("pinggu"); //默认历史方案
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
var DD_ID = ref(null); //调度方案编号
var DD_ARR = ref({}); //调度方案编号
var DD_NAME = ref(null); //调度方案编号
var DD_DATA = ref([]); //调度方案编号
var chartsData = ref(null);

const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("PingGuSWLine");

const datekeyYL = ref(null);
const lineOptionYL = ref({});
const dateidYL = ref("PingGuYLLine");

const fanganTitle = ref("");

// 传递弹开页面的标题名称
const titleName = ref();
const showDialog = ref(false);
const typeValue = ref('');

const titleNameDan = ref();
const showDialogDan = ref(false);
const typeValueDan = ref('');

onMounted(() => {
  $("#m_shikPG").addClass("z-crtitem z-crt wow slideInUp link-item");
  clearALL();
  loadFangList();
});
function clearALL() {  
  try {
    $(".MapTextNew").remove();
    RemoveLayerAll(viewer);
  } catch (ex) { }
}
//方案列表
function loadFangList() {
  var strParam = {};
  strParam["PageSize"] = 10;
  strParam["PageIndex"] = 0;
  api
    .loadFangList(strParam)
    .then(res => {
      JosnSel(res, "MODE_DD_SOLUTIONSel");
    })
    .catch(err => { });
}
function JosnSel(data, typeID) {
  if (typeID == "MODE_DD_SOLUTIONSel") {
    if (data.data.length > 0) {
      var item = data.data[0];
      var _length = data.data.length > 10 ? 10 : data.data.length;
      var dataResult = data.data;
      // for (var num = 0; num < _length; num++) {
      //   var item = data.data[num];
      //   dataResult.push(item);
      // }
      DD_DATA.value = dataResult;
      setTimeout(() => {
        // 默认勾选第一个
        handleRadioChange(1, DD_DATA.value[0]);
      }, 500);
      getYLQUSHI();
    }
  }
}
function loadSW() {
  var strParam = {
    startdate: DD_ARR.value.STIME,
    enddate: DD_ARR.value.ETIME,
    stcd: "1170181,1360481,1930183,1330183,1430383,2060181,1730483,1831983,1970381,1530283,1530383,1770181,1230483,1130283,1850281,1550181,2060881,1460581,1460281,1460381,1460481",
    type: "1",
    plan_n:DD_ARR.value.DD_ID,
  };
  api
    .loadModeYBSHUIWEI(strParam)
    .then(res => {
      //绘制图形
      JsonColumnChart(res);
    })
    .catch(err => { });
}
function JsonColumnChart(res) {
  var strJsonList = groupBy(res.data, "STCD");
  var dataResult = [];
  for (var num = 0; num < strJsonList.length; num++) {
    var strJson = strJsonList[num];
    var itemDC = getCertaintyCoefficient(strJson);
    var DC = itemDC.dc;
    const strNote = [];
    strNote.push({ name: "时间", codename: "TM", tableV: "0", isShow: true });
    strNote.push({ name: "预报", codename: "YBZ", tableV: "0", isShow: true });
    strNote.push({ name: "实时", codename: "UPZ", tableV: "0", isShow: true });
    var LineColor = [
      "#3E8BFF",
      "#1CB8B2",
      "#01DDFF",
      "#F9C823",
      "#0264FD",
      "#FE7923",
      "#8E30FF"
    ];
    const _Option = ChartJs.chartModeYBSW(
      "",
      itemDC.strJson,
      strNote,
      LineColor,
      "水位(m)",
      "Mouth",
      _theme,
      55,
      14,
      strJson[0]["STNM"].replaceAll(" ", ""),
      DC
    );
    dataResult.push({
      options: _Option,
      stcd: strJson[0]["STCD"],
      stnm: strJson[0]["STNM"],
      DC: DC
    });
  }
  chartsData.value = dataResult;
  setTimeout(function () {
    for (var index = 0; index < chartsData.value.length; index++) {
      var item = chartsData.value[index];
      var divChartName = document.getElementById("chart-" + index);
      const chart = echarts.init(divChartName);
      chart.setOption(item.options);


      // 监听图表的点击事件
      chart.on('click', function (params) {
        alert(params.componentType);
        // 检查点击的是否是标题
        if (params.componentType === 'title') {
          // 用户点击了标题
          console.log('Title clicked!');
          // 在这里添加你的逻辑
        }
      });


    }
  }, 500);
}
//计算确定性系数
function getCertaintyCoefficient(strJson) {
  var item = {};
  var totalUpz = SumJson(strJson, "UPZ");
  var avgUpz = Number(totalUpz / strJson.length); //实测值均值
  var dcCha = 0,
    ybzUpzTotal = 0,
    ybzAvgUpzTotal = 0;
  var upzybzCha = 0;
  var strJsonNew = [];
  //确定性系数公式：DC=1－{∑[Qc(i)-Qt(i)]／∑[Qc(i)-Qta ]};
  for (var num = 0; num < strJson.length; num++) {
    var obj = strJson[num];
    var ybz = Number(obj.YBZ); //预报水位
    if (obj.UPZ != undefined) {
      var upz = Number(obj.UPZ); //实测水位

      if (num == 0) {
        upzybzCha = upz - ybz; //初始时刻预报跟实测水位差
      }
      ybz = Number(ybz + upzybzCha);

      var ybzUpzCha = ybz - upz; //预报水位-实测水位
      var upzAvgUpzCha = upz - avgUpz; //实测水位-实测水位均值

      //console.error(num,"ybz-upz",ybz-upz,Math.pow(ybz-upz, 2),"upz-avgUpz",upz-avgUpz,Math.pow(upz-avgUpz, 2));

      ybzUpzTotal += Math.pow(ybzUpzCha, 2);
      ybzAvgUpzTotal += Math.pow(upzAvgUpzCha, 2);
    }
    obj.YBZ = Number(ybz).toFixed(2);
    strJsonNew.push(obj);
  }
  dcCha = ybzAvgUpzTotal > 0 ? ybzUpzTotal / ybzAvgUpzTotal : 1;
  var dc = 1 - dcCha < 0 ? 0 : (1 - dcCha).toFixed(2);
  item.dc = dc;
  item.strJson = strJsonNew;
  return item;
}
//雨量偏差趋势线
function getYLQUSHI() {
  var strNote = [];
  strNote.push({ name: "名称", codename: "dd_TM", tableV: "0", isShow: true });
  strNote.push({
    name: "预报精度",
    codename: "dd_STATUS",
    tableV: "0",
    isShow: true
  });
  strNote.push({
    name: "降雨偏差",
    codename: "dd_DISTRIBY",
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
    DD_DATA.value,
    strNote,
    LineColor,
    "偏差度(%)",
    "Mouth",
    _theme,
    55,
    14
  );

  lineOptionYL.value = _OptionYL;
  datekeyYL.value = Date.now();
}
function showItem(id) {
  var obj = $("#" + id);
  var dis = obj.css("display");
  if (dis == "block") {
    obj.css("display", "none");
  } else {
    obj.css("display", "block");
  }
}
function menuClick(index) {
  var item = DD_DATA.value[index];
  var STIME = item.dd_TM;
  var ETIME = item.dd_CHECKBY;
  var DD_STANA = Number(item.dd_STANA);
  var DD_CARRYBY = item.dd_CARRYBY;
  DD_ID.value = item.dd_ID;
  DD_NAME.value = item.dd_NAME;
  var itemDD = {
    gcTime: ETIME,
    DD_ID: item.dd_ID,
    ZU_ID: item.dd_MIND,
    STIME: STIME,
    ETIME: ETIME,
    DD_STANA: DD_STANA,
    DD_CARRYBY: DD_CARRYBY
  };
  DD_ARR.value = itemDD;
  loadSW();
  $("#SWDBZLIST").css("display", "none");
}
import { useRouter } from "vue-router";
const router = useRouter();
function GetType(obj) {
  // swiper.value = obj;
  router.push({ path: "/" + obj });
}
const radio = ref("");
const selectedPersons = ref("");
function handleRadioChange(index, item) {
  $(".el-table__body tr").removeClass("current-row");
  $(".el-table__body tr:nth(" + (index - 1) + ")").addClass("current-row");

  radio.value = index;
  selectedPersons.value = item;

  var STIME = item.dd_TM;
  var ETIME = item.dd_CHECKBY;
  var DD_STANA = Number(item.dd_STANA);
  var DD_CARRYBY = item.dd_CARRYBY;
  DD_ID.value = item.dd_ID;
  DD_NAME.value = item.dd_NAME;
  var itemDD = {
    gcTime: ETIME,
    DD_ID: item.dd_ID,
    ZU_ID: item.dd_MIND,
    STIME: STIME,
    ETIME: ETIME,
    DD_STANA: DD_STANA,
    DD_CARRYBY: DD_CARRYBY
  };
  DD_ARR.value = itemDD;
  fanganTitle.value = DD_NAME.value + "代表站实测和预报水位对比图";
  loadSW();
}
function handleclick(item) {
  const _rowindex = item.index;
  handleRadioChange(_rowindex, item);
}
function tableRowClassName(row, rowIndex) {
  row.row.index = row.rowIndex + 1;
}
function pingguqushixian() {
  showDialog.value = true;
  titleName.value = "预报精度和降雨偏差趋势线"
  typeValue.value = DD_DATA.value;
}
function danzhanTrendLine(stcd, stnm) {
  // alert(stcd+"::::"+stnm);
  // showDialogDan.value = true;
  // titleNameDan.value = stnm+"预报精度趋势线"
  // typeValueDan.value =DD_DATA.value;
  const props = {};
  props["stcd"] = stcd;
  props["stnm"] = stnm;
  props["fadata"] = DD_DATA.value;
  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/yb/trendlineDan.vue")
  );
  Dialog.open({ title: stnm + "预报精度趋势线", widh: 1400, heig: 700 }, h(ChildVue, props)).then(() => { })
}
function toDetail(row) {
  var dd_ID = row.dd_ID;
  var dd_NAME = row.dd_NAME;
  const props = {};
  props["dd_ID"] = dd_ID;
  props["dd_NAME"] = dd_NAME;
  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/yb/YBYQBar.vue")
  );
  Dialog.open({ title: "实际降雨和预报降雨对比分析", widh: 1400, heig: 700 }, h(ChildVue, props)).then(() => {

  })

}
provide("typeValue", typeValue);
provide("typeValueDan", typeValueDan);
</script>
<style src="@/assets/styles/style.css"></style>
<style src="@/assets/styles/qixiang.css"></style>
<style scoped>
.pinggu-left {
  width: 29%;
  top: 150px;
  position: absolute;
  height: calc(100% - 160px);
  background-image: var(--pingguLeftBack);
  background-size: 100% 100%;
}

.pinggu-lefttitle {
  margin: 0px 10px;
  color: #ffffff;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-bottom: 1px solid var(--wqtitleline);
  position: relative;
}

.pinggu-leftContent {
  width: 100%;
  height: calc(100% - 40px);
  padding: 10px 0px 10px 0px;
}

.pinggu-leftMenu {
  padding: 0px 20px 0px 20px;
}

.pinggu-right {
  width: 69%;
  top: 150px;
  position: absolute;
  left: 30%;
  height: calc(100% - 160px);
  background-image: var(--pingguRightBack);
  background-size: 100% 100%;
}

/* 自定义滚动条样式 */
.pinggu-rightPMenu::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.pinggu-rightPMenu::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.pingtu-title {
  height: 45px;
  line-height: 60px;
  color: #ffffff;
  text-align: center;
  font-size: 1.3rem;
  font-family: largeFont;
}

.pinggu-right .pinggu-rightPMenu {
  height: calc(100% - 80px);
  width: 98%;
  overflow: hidden;
  overflow-y: auto;
  padding-top: 20px;
}

.pinggu-right .pinggu-rightMenu {
  float: left;
  width: 32%;
  margin-left: 1.3%;
  height: 300px;
  border: solid 0px #413f3f;
  border-radius: 6px;
  margin-bottom: 20px;
}

.pinggu-rightMenuTitle {
  margin: 0px 20px;
  color: var(--title2);
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* border-bottom: 1px solid var(--wqtitleline); */
  position: relative;
  font-weight: 600;
}

.pinggu-right .pinggu-rightMenu .pinggu-rightMenuChart {
  width: 100%;
  height: calc(100% - 30px);
}

/* 自定义滚动条样式 */
.el-dropdown-menu::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.el-dropdown-menu::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.el-dropdown-menu::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: 0px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}
</style>
<style scoped>
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
  padding: 5px 8px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 16px;
}

:deep(.el-radio) {
  margin-right: 20px;
  --el-radio-input-bg-color: #d5141400;
}

:deep(.el-radio__label) {
  color: var(--widgetcolor);
}

:deep(.is-leaf .el-checkbox) {
  display: none;
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

:deep(.current-row) {
  background-color: var(--pingguSelectFangAn) !important;
}
:deep(.swiper-slide){
  cursor: pointer;
}
/* :deep(.swiper-slide-thumb-active){ 
  border-color: var(--swDivSelectcolor);
  border-bottom: var(--swDivSelectcolor) 1px solid;
  margin-top: 13px;
  line-height: 35px;
} */
</style>