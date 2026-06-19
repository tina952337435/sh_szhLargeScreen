<template>
  <div class="m-box m-box-3" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
      style="height:0px;border-bottom:0px;">
      <!-- <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p1" id="title2">圩区信息</p>
      <span class="spanTitle"></span> -->
    </div>
    <div class="txt" style="height: calc(calc(100vh + 1.375rem)*(5 / 6));">
      <div style="height: 340px; width: 96%; margin-bottom: 5px; width: 100%">
        <div v-show="hideflag">
          <div class="wqtitle">
            预报降雨
            <div>
              <el-icon size="22px" style="position: absolute;right: 10px;top: 8px;" @click="OnBoot()">
                <Postcard />
              </el-icon>
            </div>
          </div>
          <div style="width: 100%; height: 300px" class="two-list" id="SSXQList">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekeyChart" :id="dateid" />
          </div>
        </div>
        <div v-show="!hideflag">
          <div class="wqtitle title layout_title px-2  leftTop-radius" style="background: none;margin-top:0px;">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" style="vertical-align: 4px;">83条骨干河道</p>
            <el-input v-model="searchKey" placeholder="请输入搜索内容" clearable @input="handleSearch"></el-input>
          </div>
          <div style="width: 100%; height: 300px" class="two-list" id="SSXQList">
            <!-- <div style="color:white">
  经度:
          <input type="text" id="lgtd" placeholder="请输入搜索内容" />
          <br/>
          纬度
          <input type="text" id="lttd" placeholder="请输入搜索内容" />
          <br/>
          高度
          <input type="text" id="heightid" placeholder="请输入搜索内容" />
          <input type="button" value="搜索" @click="handleClickSearch" />
</div> -->


            <Table :headers="RivertableHeaders" :rows="RivertableData" :key="datekeyRiver" class="m-table river-table"
              :border="0" :cellspacing="0" :cellpadding="0" @click="handleclickRiver" />
            <!-- <el-table :data="RivertableData" style="width: 100%;height:100%" class="tableHeight"
              @row-click="handleclickRiver" ref="tableRef" @selection-change="handleSelectionChange">
             
              <el-table-column type="index" label="序号" width="60" header-align="center" align="center"></el-table-column>
              <el-table-column label="河道名称" prop="rvnm" min-width="120" align="center" :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="级别" prop="typeid" width="120" align="center">
              </el-table-column>
            </el-table> -->
          </div>
        </div>


      </div>
      <div class="tableWQ" style="height: calc(100% - 350px); width: 98%;">
        <!-- <div class="wqtitle">圩区信息</div> -->
        <div class="wqtitle title layout_title px-2  leftTop-radius" style="background: none;margin-top:0px;">
          <div class="d1"></div>
          <div class="d2"></div>
          <p class="base-p1" id="title2">圩区信息</p>
        </div>
        <div class="tableWQDIV" style="height: calc(100% - 40px); width: 100%; overflow-y: auto">
          <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table wq-table" :border="0"
            :cellspacing="0" :cellpadding="0" @click="handleclick" />
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script setup>
import '@/assets/styles/Table.css';

import { Postcard } from "@element-plus/icons-vue";

import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, sortObjectArray, groupBy } from "@/api/ComUnit.js";
import { ElMessage, ElTable, ElTableColumn } from "element-plus";







import { ref, onMounted, reactive, inject, nextTick } from "vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
// const _htmlIframe = localStorage.getItem("htmlIframe");
const datekeyChart = ref(null);
const lineOption = ref({});
const dateid = ref("wqyubaojiangyu");

import { useStore } from "vuex";
const store = useStore();
const { viewer } = store.state;
const datekey = ref(null);
const tabWQname = inject("tabWQname");
var ybdrplist = inject("ybdrplist").value;
const hideflag = ref(false);
const tableHeaders = ref(null);
const datekeyRiver = ref(null);
const RivertableData = ref([]);
const RivertableDataAll = ref([]);
const RivertableHeaders = ref([
  { name: "rowindex", label: "序号" },
  { name: "rvnm", label: "河道名称" },
  // { name: "shapeleng", label: "长度(km)" },
  { name: "typeid", label: "类别" },
  // { name: "cityname", label: "涉及行政区" }
]);
if (tabWQname.value == "windDefault") {
  hideflag.value = false;
  tableHeaders.value = [
    { name: "wqname", label: "圩区名称" },
    { name: "upz", label: "水位" },
    // { name: "kzcha", label: "控制(幅度)" },
    // { name: "wrzcha", label: "警戒(幅度)" },
    // { name: "grzcha", label: "设计(幅度)" }
    { name: "wrzcha", label: "控制" },
    { name: "grzcha", label: "警戒" },
    { name: "wq_beizhu", label: "行政" }
    // { name: "wq_theight", label: "设计" }
  ];
} else if (tabWQname.value == "rainDefault") {
  hideflag.value = false;
  tableHeaders.value = [
    { name: "wqname", label: "圩区名称" },
    { name: "capacity", label: "纳雨能力" },
    { name: "wqcount", label: "圩区水面积" },
    { name: "wqarea", label: "圩区面积" },
    { name: "wqplength", label: "径流系数" }
  ];
} else if (tabWQname.value == "tempDefault") {
  hideflag.value = true;
  tableHeaders.value = [
    { name: "wqname", label: "圩区名称" },
    { name: "pumcap", label: "设计流量" },
    { name: "wqarea", label: "圩区面积" },
    { name: "WaterSurfaceRate", label: "水面率(%)" },
    { name: "plsjpum", label: "排涝模数" }
  ];
} else if (tabWQname.value == "radarDefault") {
  hideflag.value = true;
  tableHeaders.value = [
    { name: "wqname", label: "圩区名称" },
    { name: "maxUpz", label: "预报水位" },
    { name: "wrzcha", label: "控制" },
    { name: "grzcha", label: "警戒" },
    { name: "wq_beizhu", label: "行政" }
    // { name: "wq_theight", label: "设计" }
  ];
} else if (tabWQname.value == "ddDefault") {
  hideflag.value = true;
  tableHeaders.value = [
    { name: "wqname", label: "圩区名称" },
    { name: "maxUpz", label: "预报水位" },
    { name: "wrzcha", label: "控制" },
    { name: "grzcha", label: "警戒" },
    { name: "wq_beizhu", label: "行政" }
    // { name: "wq_theight", label: "设计" }
  ];
}
const XZpathname = inject("XZpathname");
const tableData = ref();

function handleClickSearch() {
  var lgtd = $("#lgtd").val()
  var lttd = $("#lttd").val()
  var ht = $("#heightid").val()
  

}
function Weacontent(RiverStcd) {
  window.loadingShow();
  var nowTM = new Date();
  var strParam = {};
  var endDate = "2024-05-10 18:00:00"; //new Date().format("yyyy-MM-dd HH:mm:ss");
  var startDate = (startDate = dayjs(
    dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")
  )
    .add(-8, "hour")
    .format("YYYY-MM-DD 08:00:00"));

  // startDate = "2024-10-20 17:00:00";
  // endDate = "2024-10-21 16:00:00";
  strParam["wqplength"] = "0.3";
  strParam["stime"] = startDate;
  strParam["etime"] = endDate;
  if (SetNull(RiverStcd) != "") {
    strParam["id"] = RiverStcd;
  }
  strParam["ybdrplist"] = JSON.stringify(ybdrplist);
  // if ($(".areaSelect").attr("id") == "KSS") {
  //   strParam["pathname"] = "昆山市";
  // }
  // alert("TableWQ："+ybdrplist.length);
  if (tabWQname.value == "ddDefault") {
    strParam["znddsumps"] = "ZNDD"; //智能调度
  }
  api
    .stPptnWQTable(strParam)
    .then(res => {
      if (SetNull(XZpathname.value) != "") {
        var WQstrJson = res.result.filter(function (e) {
          return e.wq_beizhu == XZpathname.value;
        });
        if (tabWQname.value == "windDefault") {
          var strJson = sortObjectArray(WQstrJson, ["upz"], "desc");
        } else if (tabWQname.value == "radarDefault" || tabWQname.value == "ddDefault") {
          var strJson = sortObjectArray(WQstrJson, ["maxUpz"], "desc");
        } else if (tabWQname.value == "tempDefault") {
          var strJson = sortObjectArray(WQstrJson, ["plsjpum"], "desc");
        } else if (tabWQname.value == "rainDefault") {
          var strJson = sortObjectArray(WQstrJson, ["capacity"], "desc");
        }
      } else {
        if (tabWQname.value == "windDefault") {
          var strJson = sortObjectArray(res.result, ["upz"], "desc");
        } else if (tabWQname.value == "radarDefault" || tabWQname.value == "ddDefault") {
          var strJson = sortObjectArray(res.result, ["maxUpz"], "desc");
        } else if (tabWQname.value == "tempDefault") {
          var strJson = sortObjectArray(res.result, ["plsjpum"], "desc");
        } else if (tabWQname.value == "rainDefault") {
          var strJson = sortObjectArray(res.result, ["capacity"], "desc");
        }
      }
      // var strJson = sortObjectArray(res.result, ["capacity"], "desc");
      if (strJson.length > 0) {
        var result = [];
        for (var numII = 0; numII < strJson.length; numII++) {
          var item = strJson[numII];
          var wrz = SetNull(item.wrz) != "" ? Number(item.wrz).toFixed(2) : "-";
          var grz = SetNull(item.grz) != "" ? Number(item.grz).toFixed(2) : "-";
          var wqwrz = SetNull(item.wqwrz) != "" ? Number(item.wqwrz).toFixed(2) : "-";
          var wqgrz = SetNull(item.wqgrz) != "" ? Number(item.wqgrz).toFixed(2) : "-";
          var kzcha = SetNull(item.upz) != "" && wqwrz != "-" ? Number(item.upz - item.wqwrz).toFixed(2) : "-";
          var wrzcha = SetNull(item.upz) != "" && wrz != "-" ? Number(item.upz - item.wrz).toFixed(2) : "-";
          var grzcha = SetNull(item.upz) != "" && grz != "-" ? Number(item.upz - item.grz).toFixed(2) : "-";
          var wqitem = {};
          if (tabWQname.value == "windDefault") {
            wqitem = {
              wqid: item.wqid,
              wqname: item.wqname,
              upz: SetNull(item.upz) != "" ? Number(item.upz).toFixed(2) : "-",
              // kzupz: wqwrz + "(" + kzcha + ")",
              // wrzcha: wrz + "(" + wrzcha + ")",
              // grzcha: grz + "(" + grzcha + ")"
              wrzcha: wqwrz,
              grzcha: wqgrz,
              wq_theight: SetNull(item.wq_theight) != "" ? Number(item.wq_theight).toFixed(2) : "-",
              lgtd: item.lgtd,
              lttd: item.lttd,
              wq_beizhu: SetNull(item.wq_beizhu) != "" ? item.wq_beizhu : "-",
            };
          } else if (tabWQname.value == "rainDefault") {
            var capacity = 0;
            if (Number(item.capacity) > 0) {
              capacity = Number(item.capacity).toFixed(0);
            }
            wqitem = {
              wqid: item.wqid,
              wqname: item.wqname,
              capacity: capacity,
              wqcount: (Number(item.wqcount) / 1).toFixed(0),
              wqarea: (Number(item.wqarea) / 1).toFixed(0),
              wqplength: item.wqplength,
              lgtd: item.lgtd,
              lttd: item.lttd,
            };
          } else if (tabWQname.value == "tempDefault") {
            var wqcount = Number(item.wqcount) / 1;
            var wqarea = Number(item.wqarea) / 1;

            var WaterSurfaceRate = (wqcount / wqarea) * 100;//水面率
            wqitem = {
              wqid: item.wqid,
              wqname: item.wqname,
              pumcap: item.pumcap,
              wqarea: wqarea.toFixed(0),
              WaterSurfaceRate: WaterSurfaceRate.toFixed(0),
              plsjpum: SetNull(item.plsjpum) != "" ? Number(item.plsjpum).toFixed(2) : "-",
              lgtd: item.lgtd,
              lttd: item.lttd,
              // wqplength: item.gdplpower
            };
          } else if (tabWQname.value == "radarDefault") {
            wqitem = {
              wqid: item.wqid,
              wqname: item.wqname,
              maxUpz: SetNull(item.maxUpz) != "" ? Number(item.maxUpz).toFixed(2) : "-",
              wrzcha: wqwrz,
              grzcha: wqgrz,
              wq_theight: SetNull(item.wq_theight) != "" ? Number(item.wq_theight).toFixed(2) : "-",
              wq_beizhu: SetNull(item.wq_beizhu) != "" ? item.wq_beizhu : "-",
              lgtd: item.lgtd,
              lttd: item.lttd,
            };
          } else if (tabWQname.value == "ddDefault") {
            wqitem = {
              wqid: item.wqid,
              wqname: item.wqname,
              maxUpz: SetNull(item.maxUpz) != "" ? Number(item.maxUpz).toFixed(2) : "-",
              wrzcha: wqwrz,
              grzcha: wqgrz,
              wq_theight: SetNull(item.wq_theight) != "" ? Number(item.wq_theight).toFixed(2) : "-",
              wq_beizhu: SetNull(item.wq_beizhu) != "" ? item.wq_beizhu : "-",
              lgtd: item.lgtd,
              lttd: item.lttd,
            };
          }
          wqitem["cityname"] = item.wq_beizhu;

          result.push(wqitem);

          // console.error("tableData.valuetableData.value", result);
          tableData.value = result;
        }
      } else {
        tableData.value = [];
      }
      // console.error("结果", tableData.value);


    })
    .catch(err => { });
  window.loadingHide();
}


//河道名称
function Rivercontent() {
  var strParam = {};
  api.hdBaseBRiverResult(strParam)
    .then(res => {
      var strJson = res.result;
      var listResult = [];
      if (strJson.length > 0) {
        for (var num = 0; num < strJson.length; num++) {
          var item = strJson[num];
          item["rowindex"] = listResult.length + 1;
          listResult.push(item);
        }
        RivertableData.value = listResult;
        RivertableDataAll.value = listResult;

        // 等待 Rivercontent 异步操作完成，再调用 handleclickRiver
        setTimeout(() => {
          if (RivertableData.value.length > 1) { // 确保至少有两条数据
            // 获取第二条 tr 元素
            const secondTr = document.querySelectorAll('.river-table tr')[1];
            if (secondTr) {
              // 创建一个模拟事件对象
              const mockEvent = {
                target: {
                  closest: () => secondTr
                }
              };
              // 调用 handleclickRiver 并传入模拟事件
              handleclickRiver(mockEvent);
            }
          }
        }, 1000);
      }
    })
}

let lines = reactive([]);
var River = [];
function danzhanRivercontent(hdid) {
  var strParam = {};
  strParam["stcd"] = hdid;
  api.hdBaseBRiverPathResult(strParam)
    .then(res => {
      var strJson = res.result;
      var shapepath = JSON.parse(strJson[0]["shapepath"]);
      // console.error("shapepath", shapepath, strJson[0].rvnm)
      if (shapepath.length > 0) {
        for (var i = 0; i < shapepath.length; i++) {
          lines = reactive([]);
          let strJsonList = shapepath[i];
          if (strJsonList.length > 0) {
            for (let num = 0; num < strJsonList.length; num++) {
              let items = strJsonList[num];
              lines.push(items[0]);
              lines.push(items[1]);
            }
            
          }
        }
      }
    })
}

const RiverbindData = inject('RiverbindData');
function bindDataWQ(riverId, riverName, lgtd, lttd, pidSW, pidLL, pidGQ, pidWSJ, expid) {
  if (RiverbindData) {
    RiverbindData(riverId, riverName, lgtd, lttd, pidSW, pidLL, pidGQ, pidWSJ, expid);
  }
}

const bindData = inject('bindData');
const lastClickedRow = ref(null); // 新增：用于记录当前选中的河道行

function handleclickRiver(evt) {
  // 如果是模拟事件，直接处理第一条数据
  let _rowindex;
  if (evt.isMockEvent) {
    _rowindex = 1;
  } else {
    // 找到点击的 tr 元素
    let targetTr = evt.target.closest('tr');
    if (!targetTr) return;

    // 移除所有 tr 元素的 active 类名
    const allTrs = document.querySelectorAll('.river-table tr');
    allTrs.forEach(tr => {
      tr.classList.remove('liSelected');
    });

    // 获取行索引
    _rowindex = Array.from(allTrs).indexOf(targetTr) - 1;
  }

  const currentRow = RivertableData.value[_rowindex];


  lines = reactive([]);
  if (lastClickedRow.value && lastClickedRow.value.id === currentRow.id) {
    // 再次点击同一行，取消点击事件
    Weacontent();
    $("#SWtuli").hide();
    $("#GQtuli").hide();
    $("#LLtuli").hide();
    $("#GCtuli").hide();
    $("#WSJtuli").hide();
    lastClickedRow.value = null;
    if (RiverbindData) {
      RiverbindData("", "全部")
    }
    return;
  }

  // 找到点击的 tr 元素
  let targetTr = evt.target.closest('tr');
  if (targetTr) {
    // 给当前点击的 tr 元素添加 active 类名
    targetTr.classList.add('liSelected');
  }
  lastClickedRow.value = currentRow;

  if (RivertableData.value.length > 0) {
    const strJson = RivertableData.value[_rowindex];
    console.error("sasdasasdasdasdas", strJson)

    setTimeout(() => {
      if (SetNull(strJson) != "") {
        $("#lgtd").val(strJson["lgtd"]);
        $("#lttd").val(strJson["lttd"]);
        $("#heightid").val(strJson["expid"]);
        Weacontent(strJson["id"]);
        bindDataWQ(strJson["id"], strJson["rvnm"], strJson["lgtd"], strJson["lttd"], strJson["swpid"], strJson["tgtqpid"], strJson["gqpid"], strJson["wsjpid"], strJson["expid"]);


        danzhanRivercontent(strJson["id"]);
      }
    }, 500);
  }
}
const searchKey = ref('')
// 搜索河道
function handleSearch(evt) {
  searchKey.value = evt;
  RivertableData.value = RivertableDataAll.value.filter(function (e) {
    return (e.rvnm).includes(evt) == true;
  })
}

function handleclick(evt) {
  const _rowindex = evt.target.className;
  const strJson = tableData.value[_rowindex];
  if (SetNull(strJson["lgtd"]) == "" && SetNull(strJson["lttd"]) == "") {
    ElMessage.error("缺少经纬度坐标");
  }
  else {
    let _lgtd = Number(strJson["lgtd"]);
    let _lttd = Number(strJson["lttd"]);
    
    


    var strParam = {};
    strParam["pathname"] = "";
    if ($(".areaSelect").attr("id") == "KSS") {
      strParam["pathname"] = "昆山市";
    }
    strParam["pid"] = strJson.wqname;
    api.WQFindResult(strParam).then(res => {
      var result = [];
      if (res.result.length > 0) {
        for (var num = 0; num < res.result.length; num++) {
          var item = res.result[num];
          result.push(item);
        }
      }
      
    })
  }
}
function drpSearch() {
  var result = [];
  for (var num = 0; num < ybdrplist.length; num++) {
    var item = ybdrplist[num];
    item.tmstr = dayjs(new Date(item.tm)).format("HH:mm");
    result.push(item);
  }

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
onMounted(() => {
  var _htmlIframe = (window.location.href).split("=")[1];
  if (_htmlIframe == "htmlIframeWQ") {
    $(".m-box-3 .txt").css({ "z-index": 999, "height": "calc(calc(100vh - -4.375rem)*(5 / 6))" });
  }
  Rivercontent();
  drpSearch();
  Weacontent();
});

function OnBoot() {
  emit("opencurrentComponentTanchu");
}
const emit = defineEmits(['opencurrentComponentTanchu', 'parentMethods']);
</script> 
<style scoped>
tr td:nth-child(1) {
  width: 20vh;
}

tr td:nth-child(2) {
  width: 10vh;
}

tr td:nth-child(3) {
  width: 10vh;
}

tr td:nth-child(4) {
  width: 10vh;
}

tr td:nth-child(5) {
  width: 12vh;
}

/* 自定义滚动条样式 */
.tableWQ::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.tableWQ::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.tableWQ::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.tableWQDIV::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.tableWQDIV::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.two-list .two-item {
  padding: 0 10px;
}

.two-list .two-item .two-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-bottom: var(--titleborder);
}

.area {
  background: var(--wqbotton);
  border: 1px solid #016aa4;
  width: 96px;
  height: 30px;
  line-height: 26px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #ffffff;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-radius: 4px;
}

.areaSelect {
  background: var(--swDivSelectcolor);
  color: var(--sel_wraplabelcolorSel);
  border: 1px solid #016aa4;
  width: 96px;
  height: 30px;
  line-height: 26px;
  margin-right: 10px;
  margin-bottom: 10px;
  /* color: #ffffff; */
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-radius: 4px;
}

.spanTitleName {
  width: 40px !important;
  position: absolute;
  left: 10px;
  width: 100%;
  height: 30px;
  background: url(/images/titleImg.png) no-repeat left center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.wqtitle {
  /* display: flex; */
  margin: 0px 10px;
  color: var(--title2);
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

.wq-table tr td:nth-child(2) {
  color: var(--mtablecolorIm) !important;
}

:deep(.liSelected) {
  color: var(--sel_wraplabelcolorSel) !important;
  background: var(--swDivSelectcolor) !important;
  ;
}

:deep(.liSelected td span) {
  color: var(--sel_wraplabelcolorSel) !important;
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
  color: var(--popupContentTitleColor);
}

:deep(.el-table .cell) {
  padding: 0 8px;
  white-space: nowrap;
  cursor: pointer;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell) {
  background-color: transparent;
}

:deep(.el-input) {
  --el-input-border-color: var(--popContentHeadbg) !important;
  width: 160px;
  border-radius: 6px;
  margin-left: 50px;
  height: 26px;
  vertical-align: 6px;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}

:deep(.el-input__inner) {
  color: var(--mtablecolor);
}

:deep(.el-table__body-wrapper) {
  overflow: auto;
}

:deep(.el-table__body-wrapper .el-table__row:nth-child(even)) {
  background: var(--mtabletrcolor);
}
</style>
