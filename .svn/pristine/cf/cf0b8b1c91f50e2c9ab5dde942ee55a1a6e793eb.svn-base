<template>
  <div style="width: 320px;float: left;height: 100%;">
    <div class="boxall" style="display: none;">
      <div class="alltitle">推荐调度</div>
      <div class="sycm">
        <ul class="clearfix">
          <li>
            <span>
              排水流量
              <br>（m³/s）
            </span>
            <h2 id="YBTJXXLL" style="color: #1b89f3;">—</h2>
          </li>
          <li>
            <span>
              排水时长
              <br>（h）
            </span>
            <h2 id="YBTJXXSC" style="display: none;">—</h2>
            <input id="YBTJXXSCinput" changeOnMousewheel="false" class="mini-spinner" increment="1" value="24" format="n0"
              minValue="0" maxValue="9999" style="width: 60px;">
          </li>
          <li>
            <span>
              排水量
              <br>（万m³）
            </span>
            <h2 id="YBTJXXSL" style="color: #1b89f3;">—</h2>
          </li>
        </ul>
      </div>
      <div class="boxfoot"></div>
    </div>
    <div class="boxall">
      <div class="alltitle">预报信息</div>
      <div class="sycm">
        <ul class="clearfix">
          <li>
            <span>
              当前水位
              <br>（m）
            </span>
            <input id="DQUPZ" name="username" class="textbox" style="width: 60px;height:30px;font-size: 22px;">
          </li>
          <li>
            <span>
              最高水位
              <br>（m）
            </span>
            <h2 id="YBMAXUPZ">—</h2>
          </li>

          <li>
            <span>
              预降水位
              <br>（m）
            </span>
            <h2 id="YBJSW">—</h2>
          </li>
        </ul>
        <div class="clearfixdivcolor"></div>
        <ul class="clearfix">
          <li style="display: none;">
            <span>发生时间</span>
            <h2 id="YBMAXTM">—</h2>
          </li>
          <li>
            <span>
              降雨径流
              <br>（万m³）
            </span>
            <h2 id="YBDRPSL">—</h2>
          </li>
          <li>
            <span>
              外排水量
              <br>（万m³）
            </span>
            <h2 id="YBBPSL">—</h2>
          </li>
          <li>
            <span>
              纳雨能力
              <br>（mm）
            </span>
            <h2 id="WQNYL">—</h2>
          </li>
        </ul>
        <!-- <div class="clearfixdivcolor"></div> -->

        <div class="boxfoot"></div>
      </div>
    </div>

    <div class="boxall">
      <div class="alltitle">圩区信息</div>
      <div class="sycm">
        <ul class="clearfix">
          <li>
            <span>
              控制水位
              <br>（m）
            </span>
            <h2 id="WQQPSW" class="fontsizeWhite">—</h2>
          </li>
          <li>
            <span>
              受淹水位
              <br>（m）
            </span>
            <h2 id="WQAPSW" class="fontsizeWhite">—</h2>
          </li>
          <li>
            <span>
              最低水位
              <br>（m）
            </span>
            <h2 id="WQ_TLOW" class="fontsizeWhite">—</h2>
          </li>
        </ul>
        <div class="clearfixdivcolor"></div>
        <ul class="clearfix">
          <li>
            <span>
              堤防高程
              <br>（m）
            </span>
            <h2 id="WQ_THEIGHT" class="fontsizeWhite">—</h2>
          </li>
          <li>
            <span>
              排涝模数
              <br>（亩-m³/s）
            </span>
            <h2 id="PLSJPUM" class="fontsizeWhite">—</h2>
          </li>
          <li>
            <span>
              总排流量
              <br>（m³/s）
            </span>
            <h2 id="PUMCAP" class="fontsizeWhite">—</h2>
          </li>
        </ul>
        <div class="clearfixdivcolor"></div>
        <ul class="clearfix">
          <li>
            <span>
              圩区面积
              <br>（k㎡）
            </span>
            <h2 id="WQWWMJ" class="fontsizeWhite">—</h2>
          </li>
          <li>
            <span>
              圩内水面积
              <br>（k㎡）
            </span>
            <h2 id="WQWNMJ" class="fontsizeWhite">—</h2>
          </li>
          <li>
            <span style="cursor: pointer;" onclick="JLXS()">
              径流系数
              <br>（%）
            </span>
            <input id="wqplength" name="wqplength" class="textbox" style="width: 65px;height:30px;font-size: 22px;">
          </li>
        </ul>
      </div>
      <div class="boxfoot"></div>
    </div>
  </div>
  <div style="width: calc(100% - 325px);float: left;margin-left: 5px;">
    <div class="boxall" style="background: none;">
      <div style="width: 99%;margin: 0 auto;">
        <div style="margin-top: 10px;">
          <div class="wrapper wrapper-content animated fadeInRight" style="display: none;">
            <div class="row" style="width: 100%;">
              <div class="col-sm-2">
                <div class="widget purple-bg p-lg">
                  <div class="m-b-md">
                    <!--<i class="fa fa-tint fa-1g"></i>-->
                    <span class="lttitle">
                      当前水位
                      <input type="hidden" id="WRZ">
                    </span>
                    <div class="leftVal">
                      <span id="avgupz" class="ltText"></span>
                      <span class="ltDanwei">m</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-2">
                <div class="widget title-bg p-lg">
                  <div class="m-b-md">
                    <!--<i class="fa fa-tint fa-1g"></i>-->
                    <span class="lttitle">
                      控制水位
                      <input type="hidden" id="qpupz">
                    </span>
                    <div class="leftVal">
                      <span id="wqwrz" class="ltText"></span>
                      <span class="ltDanwei">m</span>
                      <!--<input id="wqwrz" class="mini-textbox" value="0" vtype="float" onvaluechanged="onwqplengthValueChanged" />-->
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-2">
                <div class="widget yellow-bg p-lg">
                  <div class="m-b-md">
                    <!--<i class="fa fa-warning fa-1g"></i>-->
                    <span class="lttitle">警戒水位</span>
                    <div class="leftVal">
                      <span id="wqupz" class="ltText"></span>
                      <span class="ltDanwei">m</span>
                      <!--<input id="wqupz" class="mini-textbox" value="0" vtype="float" onvaluechanged="onwqplengthValueChanged" />-->
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-2" style="max-width: 22%;">
                <div class="widget purple-bg p-lg">
                  <div class="m-b-md">
                    <!--<i class="fa fa-umbrella fa-1g"></i>-->
                    <span class="lttitle">圩区/圩内水面积</span>
                    <div class="leftVal">
                      <span id="wqarea" class="ltText">—</span>/
                      <span id="wqcount" class="ltText">—</span>
                      <span class="ltDanwei">亩</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-2">
                <div class="widget blue-bg p-lg">
                  <div class="m-b-md">
                    <!--<i class="fa fa-institution fa-1g"></i>-->
                    <span class="lttitle">当前纳雨量</span>
                    <div class="leftVal">
                      <span class="ltText" id="wqdrp"></span>
                      <span class="ltDanwei">mm</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-2">
                <div class="widget p-lg">
                  <div class="m-b-md"></div>
                </div>
              </div>
            </div>
          </div>

          <div style="color: #FFFFFF;">
            <ul class="toolbarUl">
              <li>
                <span>模式：</span>
                <el-radio-group v-model="pathname">
                  <el-radio @click="TypeeChange('预报')" v-model="pathname" label="预报">预报</el-radio>
                  <el-radio @click="TypeeChange('校验')" v-model="pathname" label="校验">校验</el-radio>
                </el-radio-group>
              </li>

              <li>
                <span>预报时间：</span>
                <!-- <el-config-provider :locale="locale">
                  <el-date-picker class="datatime" v-model="stime" type="datetime" placeholder="选择日期"
                    format="YYYY-MM-DD HH" time-format="HH:mm" @change="EtimeeChange"></el-date-picker>
                </el-config-provider> -->
                <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm"
                  timeFormat="HH:mm" showTime="true" showOkButton="true" showClearButton="false" />
              </li>

              <li>
                <span>&nbsp;&nbsp;预报时长：</span>
                <el-select v-model="selectedValue" class="m-2" placeholder="Select" size="small" style="width:80px"
                  @change="TypeeChangeSel">
                  <el-option v-for="item in shichangoptions" :key="item.value" :value="item.value" :label="item.label" />
                </el-select>
              </li>

              <li>
                <span>&nbsp;&nbsp;预报步长：</span>
                <el-radio-group v-model="rbl">
                  <el-radio @click="TypeeChangerbl('MIN')" v-model="rbl" label="MIN">分钟</el-radio>
                  <el-radio @click="TypeeChangerbl('HOUR')" v-model="rbl" label="HOUR">小时</el-radio>
                </el-radio-group>
              </li>

              <li>
                <span>&nbsp;&nbsp;预报降雨量：</span>
                <span @click="OnBoot('预报降雨')" style="text-decoration: underline;cursor: pointer;">
                  <span id="YBDRP">—</span>&nbsp;mm
                </span>
              </li>

              <li>
                <span>&nbsp;&nbsp;调度流量：</span>
                <span @click="OnBoot('调度流量')" style="text-decoration: underline;cursor: pointer;">
                  <span id="sumps">—</span>&nbsp;m³/s
                </span>
                <div id="lbbtnll" style="position: absolute;top: 0px;display: none;">
                  <img src="/images/close.png" alt onclick="javascript:$('#lbbtnll').hide();"
                    style="width: 15px;position: relative;top: 50px;left: 115px; cursor: pointer;z-index: 999;">
                  <div class="line" id="l1" style="position: absolute;z-index: 999;top: 50px;">
                    <div class="btnPro" id="b1"></div>
                  </div>
                </div>
              </li>

              <li style="margin-left: 10px;">
                <el-button @click="diaodu('人工')">人工预报</el-button>
                <!-- <button type="button" class="el-button"
                  style="background: var(--buttonsearchbg); border: var(--buttonsearchbordercolor); color: #fff">人工预报</button> -->

                <!-- <button type="button" class="el-button"
                  style="background: var(--buttonsearchbg); border: var(--buttonsearchbordercolor); color: #fff"
                  @click="diaodu('智能')">智能调度</button> -->

                <el-button @click="diaodu('智能')">智能调度</el-button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        style="margin: 0 auto;text-align: center; width: calc(100% - 20px); margin: 10px auto;background:transparent;display: none;">
        <div class="layout_title px-2">
          <div data-v-62547c07 class="d1"></div>
          <div class="d2"></div>
          <p class="base-p" id="title1">
            调度流量设定
            <!--圩区工程外排流量（m³/s）-->
          </p>
        </div>
        <div class="main-container" id="mainContainer"
          style="height: 60px;line-height: 60px;margin-top:20px;position:relative;">
          <div id="div1">
            <div id="div2">0</div>
          </div>
          <div style="position: absolute;bottom: 25px;left:6%;font-size: 15px;height: 48px;">
            <!--<span style="color: #39A0FF;">调度流量：</span>-->
            <span style="color: #409eff;font-weight: 600;font-size: 20px;">0</span>
          </div>
          <div style="position: absolute;bottom: 25px;right: 4%;font-size: 20px;font-weight: 600;height: 48px;">
            <span style="color: #409eff;" id="divPUMCAP"></span>
          </div>
        </div>
      </div>
      <div class="Main">
        <div style="float:left;height:610px;width:50%;background: transparent;display: none;">
          <div class="layout_title px-2">
            <div data-v-62547c07 class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title1">预报降雨过程（mm）</p>
          </div>
          <div class="table-responsive" style=" overflow-x: auto;height:calc(100% - 55px);">
            <div id="divWQDRP1" style="width: 98%;height:100%;">数据加载中...</div>
          </div>
        </div>
        <div style="float:left;width:calc(100% - 10px);height:580px;background-color:transparent;margin-left:10px;">
          <div class="layout_title px-2">
            <div data-v-62547c07 class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title1">圩内水情预报</p>
            <div style="float:right; width:200px;text-align: right;padding-right: 10px;display: none;">
              <span class="bootstrap-switch-handle-off switch" onclick="OnBoot()" id="switch2">
                <i class="fa fa-table"></i>
              </span>
            </div>
          </div>
          <div id="Chart" style="width: 100%; height: calc(100% - 55px); text-align: center">
            <div id="divWQDRP" style="width: 100%;height:30%;">
              <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekeyChart" :id="dateid" />
            </div>
            <div id="divWQSW" style="width: 100%;height:70%;">
              <Echarts :width="'100%'" :height="'100%'" :option="lineOptionSW" :key="datekeyChartSW" :id="dateidSW" />
            </div>
            <div style="width: 100%;height:3%;color:var(--mtablecolor);margin-top:0px;font-size: 1.1rem;">
              受淹时长：<span style="color:var(--wqdanzhansycmsh2color);font-size: 1.4rem;" id="SWtm">0</span>&nbsp;小时
            </div>
          </div>
        </div>

        <div class="sfzcll_box"
          style="line-height: 57px;padding-bottom: 10px;background: none;border: 0px;display: none;">
          <div class="sfzcll_smallBk" style="margin-left: 16%;">
            <div class="ygl" style="line-height: 55px;">
              <label>推荐下泄水量</label>
              <span id="TJ_W" style="font-size: 30px;">0</span>
              万m³
            </div>
          </div>
          <div class="sfzcll_smallBk">
            <div class="ygh" style="line-height: 55px;">
              <label>推荐下泄流量</label>
              <span id="TJ_TGTQ" style="font-size: 30px;">0</span>
              m³/s
            </div>
          </div>
          <div class="sfzcll_smallBk" style="display: none;">
            <div class="ygl" style="line-height: 55px;">
              <label>预计下泄时长</label>
              <span id="TJ_SC" style="font-size: 30px;">3.00</span>
              小时
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div style="clear: both;"></div>
      </div>
      <div class="boxfoot"></div>
    </div>
  </div>

  <!-- 弹出框div -->
  <!--单站弹窗-->
  <div class="popModel" id="mypopModel">
    <div class="popupContent">
      <div class="head">
        <span></span>
        <img src="/images/close.png" alt="关闭" @click="cancel()" />
      </div>
      <component :is="currentComponent" @parentMethods="parentMethod"></component>
    </div>
  </div>
</template>
<script setup>
import {
  ElDatePicker,
  ElRadio,
  ElButton,
  ElSelect,
  ElOption,
  ElConfigProvider
} from "element-plus";
import {
  onMounted,
  ref,
  nextTick,
  reactive,
  provide,
  defineAsyncComponent,
  getCurrentInstance,
  h,
  inject
} from "vue";

import ChildVue from "@/components/danzhan/wq/setViewJson.vue";
import dayjs from "dayjs";
import $ from "jquery";
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import Dialog from "@/api/utils/Dialog.js";
import { formatDate } from "date-fns";

const currentComponent = ref(null);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekeyChart = ref(null);
const lineOption = ref({});

const datekeyChartSW = ref(null);
const lineOptionSW = ref({});
const propsdrplist = ref({});
const wqBaseList = ref({});

const dateid = ref("wqyubaojiangyuMode");
const dateidSW = ref("wqyubaojiangyuModeSW");


const shichangoptions = [
  { value: 24, label: "一天" },
  { value: 48, label: "二天" },
  { value: 72, label: "三天" },
  { value: 168, label: "一周" }
];

var systemCtm = dayjs(new Date()).format("YYYY-MM-DD HH:00:00");
const stime = ref(systemCtm);
const pathname = ref("预报");
const selectedValue = ref("一天");
const rbl = ref("HOUR");

const isZhiNeng = ref(false);

var ybdrplist = ref(null);
var tableData = ref(null);
var tableDataLL = ref(null);

const tabWQname = ref(null);
const tabWQnameType = ref(null);

// 选择结束时间
function EtimeeChange(value) {
  stime.value = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
}
function TypeeChange(value) {
  pathname.value = value;
}
function TypeeChangerbl(value) {
  rbl.value = value;
}
function TypeeChangeSel(value) {
  selectedValue.value = value;
  Weacontent();
}

onMounted(() => {
  mini.parse();
  mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:00"));
  // alert(props.tableData.length);
  ybdrplist = props.tableData;

  console.error("props",props)
  drpSearch(ybdrplist);
  Weacontent();
});
// const props = defineProps({
//   stcd: {
//     type: String,
//     default: ""
//   },
//   stnm: {
//     type: String,
//     default: ""
//   },
//   wqid: {
//     type: String,
//     default: ""
//   },
//   tableData: {
//     type: Array,
//     default: []
//   }
// });
var props = inject("props");

function drpSearch(data) {
  var result = [];
  var sumdrp = 0;
  for (var num = 0; num < data.length; num++) {
    var item = data[num];
    item.tmstr = dayjs(new Date(item.tm)).format("HH:mm");
    result.push(item);
    sumdrp += Number(item.drp);
  }
  $("#YBDRP").html(Number(sumdrp).toFixed(1));

  const strNote = [];
  strNote.push({ name: "时间", codename: "tmstr", tableV: "0", isShow: true });
  strNote.push({ name: "雨量", codename: "drp", tableV: "0", isShow: true });
  var LineColor = [
    "#3E8BFF",
    "#1CB8B2",
    "#01DDFF",
    "#F9C823",
    "#0264FD",
    "#FE7923",
    "#8E30FF"
  ];
  const _Option = ChartJs.chartYL(
    "",
    result,
    strNote,
    LineColor,
    "雨量",
    "false",
    _theme
  );
  lineOption.value = _Option;
  datekeyChart.value = Date.now();
}
function Weacontent() {
  stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  var strParam = {};
  var startDate = stime.value;
  var shichangoptionsT = shichangoptions.filter(res => {
    return res.label == selectedValue.value || res.value == selectedValue.value;
  });
  var hour = parseInt(shichangoptionsT[0].value);
  var endDate = dayjs(dayjs(startDate).format("YYYY-MM-DD HH:mm:ss")).add(hour, "hour").format("YYYY-MM-DD HH:mm:ss");

  strParam["wqplength"] = $("#wqplength").val() / 100;

  strParam["stime"] = startDate;
  strParam["etime"] = endDate;
  strParam["wqid"] = props.wqid;
  if (pathname.value == "预报") {
    if (SetNull($("#DQUPZ").val()) != "") {
      if (Number(SetNull($("#DQUPZ").val())) > 0) {
        strParam["upz"] = SetNull($("#DQUPZ").val());
      }
    }
    strParam["ybdrplist"] = JSON.stringify(ybdrplist);
  }
  else {
    strParam["xiaoyan"] = "FANYAN";
    if (tabWQnameType.value == "预报降雨") {
      strParam["ybdrplist"] = JSON.stringify(ybdrplist);
    }
  }
  if (tableDataLL.value != null || tableDataLL.length != undefined) {
    var tableDataLLNew = [];
    for (var num = 0; num < tableDataLL.length; num++) {
      var itemLL = { stcd: "63205150", gtq: tableDataLL[num].drp, tm: tableDataLL[num].tm };
      tableDataLLNew.push(itemLL);
    }
    strParam["gaterlist"] = JSON.stringify(tableDataLLNew);
  }
  strParam["dayhour"] = rbl.value;
  if (isZhiNeng.value) {
    strParam["znddsumps"] = "ZNDD";
    strParam["gaterlist"] =null;
  }
  api
    .stPptnWQTable(strParam)
    .then(res => {
      var strJson = res.result;
      if (strJson.length > 0) {
        wqBaseList.value=strJson[0];
        var waterList = strJson[0].waterList;
        console.error("waterList",waterList)
        var rainList = strJson[0].rainList.length > 0 ? strJson[0].rainList : waterList;
        tableData = rainList;
        if (SetNull($("#DQUPZ").val()) == "") {
          $("#DQUPZ").val(strJson[0].upz);
        }
        const waterListDesc = sortObjectArray(waterList, ["dwz"], "desc");
        $("#YBMAXUPZ").html(waterListDesc[0].dwz); //预报最高水位

        $("#WQUPZ").html(Number(strJson[0]["avgupz"]).toFixed(2));
        $("#WQQPSW").html(Number(strJson[0]["wqwrz"]).toFixed(2));//控制水位
        $("#WQAPSW").html(Number(strJson[0]["wqgrz"]).toFixed(2));//警戒水位
        $("#PUMCAP").html(Number(strJson[0]["pumcap"]).toFixed(1));
        $("#PLSJPUM").html(Number(strJson[0]["plsjpum"]).toFixed(1));
        $("#WQ_TLOW").html(Number(strJson[0]["wq_tlow"]).toFixed(1));
        $("#WQ_THEIGHT").html(Number(strJson[0]["wq_theight"]).toFixed(2));
        $("#WQWWMJ").html(Number(strJson[0]["wqarea"]).toFixed(2));
        $("#WQWNMJ").html(Number(strJson[0]["wqcount"]).toFixed(2));
        if (SetNull($("#wqplength").val()) == "") {
          $("#wqplength").val(Number(strJson[0]["wqplength"]) * 100);
        }

        //降水量
        var sumDRPSLNote =
          ((Number($("#YBDRP").html()) / 1000) *
            Number($("#WQWWMJ").html())*1000000 *
            (Number($("#wqplength").val())/100)) /10000;
        $("#YBDRPSL").html(sumDRPSLNote.toFixed(2));
        $("#YBJSW").html(Number(strJson[0]["ybjsw"]).toFixed(2));
        // $("#WQNYL").html(Number(strJson[0]["capacity"]).toFixed(1));
        if(SetNull(strJson[0]["wqTheightcapacity"])!=""){
          $("#WQNYL").html(Number(strJson[0]["wqTheightcapacity"]).toFixed(1));
        }

        var _bpsl = 0;
        if (waterList.length > 0) {
          for (var numII = 0; numII < waterList.length; numII++) {
            var item = waterList[numII];
            if (item["tgtq"] != undefined) {
              if (rbl.value == "HOUR") {
                _bpsl += Number(item["tgtq"]) * 3600;
              } else {
                _bpsl += Number(item["tgtq"]) * 300;
              }
            }
            // waterList[numII].tmstr=dayjs(waterList[numII].tm).format("MM-DD HH:mm");
          }
        }
        $("#YBBPSL").html((Number(_bpsl) / 10000).toFixed(2));

        const strNote = [];
        strNote.push({
          name: "时间",
          codename: "tm",
          tableV: "0",
          isShow: true
        });
        strNote.push({
          name: "预报水位",
          codename: "dwz",
          tableV: "0",
          isShow: true
        });
        strNote.push({
          name: "调度流量",
          codename: "tgtq",
          tableV: "0",
          isShow: true
        });
        strNote.push({
          name: "控制水位",
          codename: "aqsw",
          tableV: "0",
          isShow: true
        });
        strNote.push({
          name: "警戒水位",
          codename: "qpsw",
          tableV: "0",
          isShow: true
        });
        strNote.push({
          name: "实测水位",
          codename: "upz",
          tableV: "0",
          isShow: true
        });
        var LineColor = [
          "#FF0000",
          "#FBFB00",
          "#008C00",
          "#FFA500",
          "#1BB3F5",
          "#ca8622",
          "#bda29a",
          "#008000",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ];
        const tempResult = sortObjectArray(waterList, ["tm"], "asc");
        const _Option = ChartJs.chartSWLL(
          "",
          waterList,
          strNote,
          LineColor,
          "水位",
          "Mouth",
          _theme
        );

        lineOptionSW.value = _Option;
        datekeyChartSW.value = Date.now();

        // 统计受淹时长
        let floodDuration = 0;
        const alertWaterLevel = Number(strJson[0]["wqgrz"]); // 警戒水位
        for (let i = 0; i < tempResult.length - 1; i++) {
          const currentItem = tempResult[i];
          const nextItem = tempResult[i + 1];
          if (Number(currentItem.dwz) > alertWaterLevel) {
            const currentTime = dayjs(currentItem.tm);
            const nextTime = dayjs(nextItem.tm);
            const duration = nextTime.diff(currentTime, 'hour');
            floodDuration += duration;
          }
        }
        // 处理最后一个元素
        const lastItem = tempResult[tempResult.length - 1];
        if (Number(lastItem.dwz) > alertWaterLevel) {
          // 假设最后一个时间点到预报结束时间的间隔为 1 小时
          floodDuration += 1;
        }

        // 更新受淹时长到页面
        $("#SWtm").html(floodDuration.toFixed(1));
        if (pathname.value == "校验") {
          var seriesdata = [], xAxisdata = [];
          var seriesdataSum = 0;
          if (tempResult.length > 0) {
            for (var numI = 0; numI < tempResult.length; numI++) {
              var item = tempResult[numI];
              xAxisdata.push(dayjs(item.tm).format("HH:mm"));
              seriesdata.push(item.drp);
              seriesdataSum += Number(item.drp);
            }
          }
          $("#YBDRP").html(Number(seriesdataSum).toFixed(1));

          lineOption.value.series[0].data = seriesdata;
          lineOption.value.xAxis[0].data = xAxisdata;
          datekeyChart.value = Date.now();
        }

      }
    })
    .catch(err => { });
}
function diaodu(type) {
  isZhiNeng.value = false;
  if (type == "智能") {
    isZhiNeng.value = true;
  }
  Weacontent();
}
function OnBoot(type) {
  stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm") + ":00";
  tabWQnameType.value = type;
  if (type == "预报降雨") {
    tabWQname.value = tableData;
  } else if (type == "调度流量") {
    if (tableDataLL.length == undefined || tableDataLL.length == 0) {
      var shichangoptionsT = shichangoptions.filter(res => {
        return res.label == selectedValue.value || res.value == selectedValue.value;
      });
      var hour = parseInt(shichangoptionsT[0].value);
      var startDate = stime.value;
      var ddllArr = [];
      for (var num = 1; num < hour + 1; num++) {
        var endDate = dayjs(dayjs(startDate).format("YYYY-MM-DD HH:mm:ss")).add(num, "hour").format("YYYY-MM-DD HH:mm:ss");
        ddllArr.push({ tm: endDate, drp: 0 });
      }
      tableDataLL = ddllArr;
      tabWQname.value = tableDataLL;
    }
    else {
      tabWQname.value = tableDataLL;
    }
  }

  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/wq/setViewJson.vue")
  );
  const props = {
    tableData: tableData,
     tableDataLL: tableDataLL,
    wqBaseList:wqBaseList.value,
    childMethod: parentMethod
  };
  propsdrplist.value = props;
  currentComponent.value = ChildVue;
  $(".popupContent .head span").html(type);
  $(".popModel").show();
}
const parentMethod = (res) => {
  cancel();
  if (tabWQnameType.value == "调度流量") {
    var sumq = 0;
    for (var num = 0; num < res.length; num++) {
      var item = res[num];
      sumq += Number(item.drp);
    }
    var qavg = (sumq / res.length).toFixed(1);
    $("#sumps").html(qavg);
    tableDataLL = res;
  } else {
    ybdrplist = res;
    drpSearch(ybdrplist);
  }
  Weacontent();
};
const cancel = () => {
  // $(".popModel:last-child").hide();
  $(".popModel").each((i, res) => {
    var id = res.id;
    if (id == "mypopModel") {
      $(res).hide();
    }
  });
}
provide("tabWQnameArr", tabWQname);
provide("propsdrplist", propsdrplist);
provide("tabWQnameType", tabWQnameType);
</script>
<style src="@/assets/styles/style.css"></style>
<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
  background: #05161d;
}

.textbox {
  background: none;
  border: var(--portalborder);
  padding-left: 6px;
  padding-right: 6px;
  height: 26px;
  border-radius: 4px;
  margin-left: -1px;
  color: #fff;
}

.textbox:fous-visible {
  background: var(--portal) !important;
  border: var(--portalborder) !important;
  color: var(--widgetcolor);
}

:deep(.el-date-editor.el-input) {
  width: 160px;
}

:deep(.el-select__wrapper) {
  /* background-color: var(--el-inputbg);
  box-shadow: 0 0 0 1.5px var(--el-inputbox-shadow); */

  background-color: #d5141400;
  box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
  ;
}

:deep(.el-select__placeholder) {
  /* color: var(--titlemenu) */
  color: var(--widgetcolor);
}

:deep(.el-input__wrapper) {
  background-color: #d5141400;
  box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
  ;
}

:deep(.el-input__inner) {
  color: var(--widgetcolor);
}

.toolbarUl {
  list-style: none;
}

.toolbarUl li {
  float: left;
  line-height: 35px;
}

.toolbarUl li span {
  color: var(--wqdanzhansycmspancolor);
}

.Main {
  width: 100%;
  height: calc(100% - 240px);
  width: calc(100% - 20px);
  margin: 10px auto;
}

.leftM {
  float: right;
  width: calc(69% - 10px);
  margin-left: 10px;
  height: 100%;
}

.rightM {
  float: left;
  width: 30%;
  height: 100%;
}

.p-lg {
  padding: 30px;
}

.title-bg {
  /* background-color: #5ED624; */
  background-color: rgba(94, 214, 36, 0.8);
  /*color: #ffffff;*/
  background-image: linear-gradient(90deg,
      rgba(94, 214, 36, 0.3) 100%,
      rgba(26, 44, 83, 0) 100%);
  /* border-left: 4px solid rgb(94, 214, 36);
            border-right: 4px solid rgb(94, 214, 36); */
}

.yellow-bg {
  /* background-color: #f8ac59; */
  background-color: rgba(248, 172, 89, 0.8);
  /* color: #ffffff; */
  background-image: linear-gradient(90deg,
      rgba(248, 172, 89, 0.3) 100%,
      rgba(26, 44, 83, 0) 100%);
  /* border-left: 4px solid rgb(248, 172, 89);
            border-right: 4px solid rgb(248, 172, 89); */
}

.lazur-bg {
  /* background-color: #23c6c8; */
  background-color: rgba(35, 198, 200, 0.8);
  /* color: #ffffff; */
  background-image: linear-gradient(90deg,
      rgba(35, 198, 200, 0.3) 100%,
      rgba(26, 44, 83, 0) 100%);
  /* border-left: 4px solid rgb(35, 198, 200);
            border-right: 4px solid rgb(35, 198, 200); */
}

.blue-bg {
  /* background-color: #1c84c6; */
  background-color: rgba(28, 132, 198, 0.8);
  /* color: #ffffff; */
  background-image: linear-gradient(90deg,
      rgba(28, 132, 198, 0.3) 100%,
      rgba(26, 44, 83, 0) 100%);
  /* border-left: 4px solid rgb(28, 132, 198);
            border-right: 4px solid rgb(28, 132, 198);*/
}

.purple-bg {
  background-color: rgba(109, 146, 252, 0.8);
  /*color: #ffffff;*/
  background-image: linear-gradient(90deg,
      rgba(109, 146, 252, 0.3) 100%,
      rgba(26, 44, 83, 0) 100%);
  /* border-left: 4px solid rgba(109, 146, 252, 0.7);
            border-right: 4px solid rgba(109, 146, 252, 0.7); */
}

.widget {
  border-radius: 5px;
  padding: 10px 10px;
  /*margin-bottom: 10px;*/
  width: 180px;
  text-align: center;
}

.fa-1g {
  font-size: 1.2em;
}

.wrapper-content {
  padding: 5px;
}

.fadeInRight {
  animation-name: fadeInRight;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
  z-index: 100;
}

.row {
  margin-right: -15px;
  margin-left: -15px;
  width: 1300px;
  margin: auto auto;
}

.col-sm-2 {
  width: auto;
  flex: none;
  max-width: none;
}

.col-sm-3 {
  width: 20%;
  max-width: 20%;
}

.col-sm-1,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9 {
  float: left;
}

.col-lg-1,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-md-1,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-sm-1,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-xs-1,
.col-xs-10,
.col-xs-11,
.col-xs-12,
.col-xs-2,
.col-xs-3,
.col-xs-4,
.col-xs-5,
.col-xs-6,
.col-xs-7,
.col-xs-8,
.col-xs-9 {
  position: relative;
  min-height: 1px;
  padding-right: 10px;
  padding-left: 10px;
}

.row::after,
.row::before {
  display: table;
  content: " ";
}

small,
.small {
  font-size: 100%;
}

.cursor {
  cursor: pointer;
}

.label {
  font-size: 20px;
}
</style>
<style scoped>
#div1,
#div3 {
  /* background: #cccccc; */
  background: rgba(8, 82, 134, 0.3);
  width: 80%;
  height: 30px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

#div2 {
  height: 30px;
  width: 50px;
  /* background: red; */
  background: #00ffff;
  position: absolute;
  left: 0;
  top: 0px;
  color: red;
  line-height: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
}

#div2:before {
  border: solid transparent;
  content: " ";
  height: 0;
  /*top: 100%;*/
  position: absolute;
  width: 0;
  border-width: 8px;
  border-right-color: #00ffff;
  left: 50px;
  top: 7px;
  transform: rotate(180deg);
}

.leftVal {
  font-size: 1.4em;
  text-align: center;
  width: 100%;
  /*padding-left: 20px;*/
  padding-top: 5px;
}

.mini-buttonedit-button {
  border-color: #36c5c8;
}

.mini-buttonedit-border {
  background: rgba(0, 0, 0, 0);
  border-color: rgb(27, 137, 243);
  border-radius: 4px;
  text-align: center;
  /*height: 35px;*/
  padding: 0px;
}

#wqwrz span {
  background-color: #5ed624;
  border: 0px;
  height: 35px;
  font-size: 1.2em;
}

#wqwrz input {
  height: 35px;
  line-height: 35px;
  font-size: 1.1em;
  color: white;
  text-align: center;
}

#wqupz span {
  background-color: #f8ac59;
  border: 0px;
  height: 35px;
  font-size: 1.2em;
}

#wqupz input {
  height: 35px;
  line-height: 35px;
  font-size: 1.1em;
  color: white;
  text-align: center;
}

.main-container {
  width: 100% !important;
  box-shadow: none;
}

.layout_title {
  position: relative;
  padding: 5px;
  text-align: left;
}

.px-2 {
  padding-right: 10px !important;
}

.pl-2,
.px-2 {
  padding-left: 10px !important;
}

.layout_title .d1,
.layout_title .d2 {
  width: 14px;
  height: 14px;
  background: var(--titled1);
  border-radius: 2px;
  position: absolute;
  left: 4px;
  top: 15px;
  margin: 0px 10px;
}

.layout_title .d2 {
  background: var(--titled2);
  left: 11px;
  top: 9px;
}

.layout_title .base-p {
  color: var(--title2);
  font-size: 16px;
  line-height: 0px;
  margin-left: 40px;
  font-weight: 800 !important;
  display: inline-block;
  padding-top: 12px;
  text-align: left;
}

.bootstrap-switch-handle-off {
  background: none;
  color: #3291f9;
  font-size: 16px !important;
}

.lttitle {
  font-size: 15px;
  padding-bottom: 10px;
}

.ltDanwei {
  font-size: 14px;
}

.ltText {
  font-weight: 700;
  /* color: rgb(27, 137, 243); */
  color: #00ffff;
  font-size: 22px;
  /*cursor: pointer;*/
}

.mini-calendar-menu-month {
  color: black;
}

.mini-calendar-title {
  color: #fff;
}

.mini-calendar-menu-year {
  color: black;
}

html body .mini-grid .mini-grid-cell-selected {
  background: #12262f !important;
}
</style>
<style scoped>
.sfzcll_box {
  width: 100%;
  height: calc(33% - 15px);
  line-height: 5;
  background: rgba(15, 47, 72, 0.8);
  border: 1px solid #1380bd;
  position: relative;
  margin-bottom: 15px;
  position: absolute;
  bottom: 0px;
  top: 650px;
  height: 55px;
}

.sfzcll_box:last-of-type {
  margin: 0;
}

.sfzcll_box .sfzcll_bkJk {
  position: absolute;
}

.sfzcll_box .sfzcll_bkJk:first-of-type {
  top: -2px;
  left: -2px;
}

.sfzcll_box .sfzcll_bkJk:nth-child(2) {
  top: -2px;
  right: -2px;
}

.sfzcll_box .sfzcll_bkJk:nth-child(3) {
  bottom: -2px;
  right: -2px;
}

.sfzcll_box .sfzcll_bkJk:nth-child(4) {
  bottom: -2px;
  left: -2px;
}

.sfzcll_box label {
  width: 33%;
  color: #fff;
  text-align: center;
  float: left;
  font-size: 18px;
}

.sfzcll_box label img {
  width: 23px;
  height: 23px;
  margin-right: 5px;
  margin-top: -2px;
}

.sfzcll_box .sfzcll_smallBk {
  width: 33%;
  height: 100%;
  float: left;
  padding: 2px 5px;
  height: 55px;
}

.sfzcll_box .sfzcll_smallBk>div {
  height: 100%;
  background: url(/images/ksh38.png) no-repeat;
  background-size: 100% 100%;
  text-align: center;
  line-height: 1.5em;
}

.sfzcll_box .sfzcll_smallBk .ygl {
  color: #00ffc6;
}

.sfzcll_box .sfzcll_smallBk .ygh {
  color: #ffe400;
}

.sfzcll {
  position: relative;
}

.sfzcll a {
  width: 32%;
  text-align: center;
  line-height: 25px;
  color: #fff;
  display: inline-block;
  font-size: 22px;
  margin-top: 30px;
}

.sfzcll .sfzcll_pos_box {
  width: 100%;
  height: calc(100% - 30px);
}

.sfzcll .sfzcll_box {
  width: 100%;
  height: 70px;
  line-height: 5;
  background: rgba(15, 47, 72, 0.8);
  border: 1px solid #1380bd;
  position: relative;
  margin-bottom: 15px;
}

.sfzcll .sfzcll_box:last-of-type {
  margin: 0;
}

.sfzcll .sfzcll_box .sfzcll_bkJk {
  position: absolute;
}

.sfzcll .sfzcll_box .sfzcll_bkJk:first-of-type {
  top: -2px;
  left: -2px;
}

.sfzcll .sfzcll_box .sfzcll_bkJk:nth-child(2) {
  top: -2px;
  right: -2px;
}

.sfzcll .sfzcll_box .sfzcll_bkJk:nth-child(3) {
  bottom: -2px;
  right: -2px;
}

.sfzcll .sfzcll_box .sfzcll_bkJk:nth-child(4) {
  bottom: -2px;
  left: -2px;
}

.sfzcll .sfzcll_box label {
  width: 33%;
  color: #fff;
  text-align: center;
  float: left;
}

.sfzcll .sfzcll_box label img {
  width: 23px;
  height: 23px;
  margin-right: 5px;
  margin-top: -2px;
}

.sfzcll .sfzcll_box .sfzcll_smallBk {
  width: 33%;
  height: 100%;
  float: left;
  padding: 2px 5px;
}

.sfzcll .sfzcll_box .sfzcll_smallBk>div {
  height: 100%;
  background: url(/images/ksh38.png) no-repeat;
  background-size: 100% 100%;
  text-align: center;
  line-height: 1.5em;
}

.sfzcll .sfzcll_box .sfzcll_smallBk .ygl {
  color: #00ffc6;
}

.sfzcll .sfzcll_box .sfzcll_smallBk .ygh {
  color: #ffe400;
}

.mini-datepicker .mini-buttonedit-buttons {
  display: block;
}
</style>
<style scoped>
.boxall {
  border: 1px solid var(--popContentHeadbg);
  padding: 0 0.3rem 0.3rem 0.3rem;
  background: var(--wqdanzhanboxallbg);
  background-size: 100% auto;
  position: relative;
  margin-bottom: 0.3rem;
  z-index: 10;
  margin-top: 10px;
}

.alltitle {
  /* font-size: .24rem; */
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 2.5rem;
  border-bottom: 1px solid var(--wqdanzhanalltitlebordercolor);
}

.sycm ul {
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding: 0.16rem 0;
}

.sycm ul {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.5rem 0;
  /* padding-bottom: 0px;  */
  margin-bottom: 12px;
}

.clearfix:after,
.clearfix:before {
  display: table;
  content: " ";
}

.clearfixdivcolor {
  border-bottom: 1px solid var(--wqdanzhanclearfixbordercolor);
}

.sycm li {
  float: left;
  width: 33.33%;
  text-align: center;
  position: relative;
  list-style-type: none;
}

.sycm li:before {
  position: absolute;
  content: "";
  height: 30%;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
  right: 0;
  top: 15%;
}

.sycm li h2 {
  font-size: 0.3rem;
  font-size: 16px;
  font-size: 25px;
  color: var(--wqdanzhansycmsh2color);
  line-height: 1.33;
}

.sycm li span {
  /* font-size: .18rem; */
  font-size: 14px;
  color: var(--wqdanzhansycmspancolor);
  opacity: var(--wqdanzhansycmspancoloropacity);
}

.clearfix:after {
  clear: both;
}

.boxfoot {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}

.boxfoot:before,
.boxfoot:after {
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  content: "";
  border-bottom: 2px solid var(--popContentHeadbg);
  bottom: 0;
}

.boxall:before,
.boxfoot:before {
  border-left: 2px solid var(--popContentHeadbg);
  left: 0;
}

.boxall:after,
.boxfoot:after {
  border-right: 2px solid var(--popContentHeadbg);
  right: 0;
}

.boxall:before,
.boxall:after {
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  content: "";
  border-top: 2px solid var(--popContentHeadbg);
  top: 0;
}

#DQUPZ,
#YBTJXXSCinput,
#wqplength {
  opacity: 1;
  color: var(--wqdanzhansycmsh2color);
}

#DQUPZ .mini-buttonedit-input,
#DQUPZ .mini-buttonedit-border,
#YBTJXXSCinput .mini-buttonedit-input,
#YBTJXXSCinput .mini-buttonedit-border,
#wqplength .mini-buttonedit-input,
#wqplength .mini-buttonedit-border {
  opacity: 1;
  color: cyan;
  text-align: center;
  font-size: 20px;
}

#YBTJXXSCinput .mini-buttonedit-input {
  color: #1b89f3;
}

.fontsizeWhite {
  color: var(--wqdanzhansycmsh2colorfontsizeWhite);
}

#combo1 .mini-buttonedit-border {
  background: #05161d;
}

#combo1 .mini-buttonedit-input {
  text-align: center;
}

.minProgressBar,
.maxProgressBar {
  color: #ffffff !important;
  top: -30px !important;
}

.btnPro {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  height: 25px !important;
}

.line {
  top: 60px !important;
  position: absolute !important;
  margin-left: -50px;
}

.mini-listbox-item-hover td {
  background: #18282f;
  color: #ffffff;
}

.mini-listbox-item-hover {
  background: #18282f;
}

.mini-checkboxlist table label,
.mini-radiobuttonlist table label {
  padding-top: 7px;
}

.mini-popup {
  background: white;
  border: 1px solid #8b8b8b;
  overflow: auto;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 9pt;
  font-family: Tahoma, Verdana, 宋体;
}

.mini-calendar .mini-buttonedit-input {
  color: #000;
}

.mini-calendar-title {
  color: #000;
}

.mini-buttonedit-input {
  color: #ffffff;
}

.popModel {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  /* opacity: 0.5; */
  transition: all 1s;
  display: none;
  z-index: 999;
}

.popupContent {
  width: 900px;
  height: 700px;
  overflow-y: hidden;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* border: 10px solid #fff; */
  background: var(--el-table-bg-colornew);
}

.popupContent>.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  background: var(--popContentHeadbg);
  height: 56px;
  margin: 0px 0px 15px 0px;
}

.popupContent>.head span {
  font-weight: bold;
  font-size: 18px;
  /* color: #21a6ff;
  background: linear-gradient(90deg, #3be1f6 0%, #21a6ff 100%); */
  width: 100%;
  background: #ffffff;
  text-align: center;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.popupContent>.head img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  cursor: pointer;
  margin-right: 10px;
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




