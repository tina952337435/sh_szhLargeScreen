<template>
  <div class="m-box m-box-3" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
      style="height:0px;border-bottom:0px;">
    </div>
    <div class="txt" style="height: calc(calc(100vh + 1.375rem)*(5 / 6));">
      <div style="height: 240px; width: 96%; margin-bottom: 5px; width: 100%">
        <div>
          <div class="wqtitle title layout_title px-2  leftTop-radius" style="background: none;margin-top:0px;">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" style="vertical-align: 4px;">预报降雨</p>
            <div>
              <el-icon size="22px" style="position: absolute;right: 10px;top: 8px;" @click="OnBoot()">
                <Postcard />
              </el-icon>
            </div>
          </div>
          <div style="width: 100%; height: 200px" class="two-list" id="SSXQList">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekeyChart" :id="dateid" />
          </div>
        </div>
      </div>
      <div class="tableWQ" style="height: calc(100% - 250px); width: 98%;">
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
import { ElMessage } from "element-plus";


import { ref, onMounted, reactive, inject } from "vue";



import weiquURL from "@/assets/json/四片圩区2000.json"; //圩区 

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
    { name: "wq_beizhu", label: "片区" }
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
    // { name: "gdplpower", label: "排涝动力" },
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
    { name: "wq_beizhu", label: "片区" }
    // { name: "wq_theight", label: "设计" }
  ];
} else if (tabWQname.value == "ddDefault") {
  hideflag.value = true;
  tableHeaders.value = [
    { name: "wqname", label: "圩区名称" },
    { name: "maxUpz", label: "预报水位" },
    { name: "wrzcha", label: "控制" },
    { name: "grzcha", label: "警戒" },
    { name: "wq_beizhu", label: "片区" }
    // { name: "wq_theight", label: "设计" }

  ];
}

const XZpathname = inject("XZpathname");
const tableData = ref();
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
  startDate=dayjs(new Date()).format("YYYY-MM-DD HH:00:00");
  endDate=dayjs(startDate).add(24, "hour").format("YYYY-MM-DD HH:00:00");
  strParam["wqplength"] = "0.3";
  strParam["stime"] = startDate;
  strParam["etime"] = endDate;
  if (SetNull(RiverStcd) != "") {
    strParam["id"] = RiverStcd;
  }
  strParam["ybdrplist"] = JSON.stringify(ybdrplist);
  // if ($(".areaSelect").attr("id") == "KSS") {
  //   strParam["pathname"] = "嘉宝北片";
  // }
  // alert("TableWQ："+ybdrplist.length); 
  if (tabWQname.value == "ddDefault") {
    strParam["znddsumps"] = "ZNDD"; //智能调度
  }
  // api
  //   .stPptnWQTable(strParam)
  //   .then(res => {
  var res={
    "result":
     [
    {
        "wqdlength": null,
        "tgtq": 0,
        "pumcap": 37.787,
        "gatecount": 0,
        "wq_tbrake": 1,
        "ybylstnm": null,
        "rvcd": "2025041500007,2025041500074,2025041500033,2025041500033",
        "wqarea": 17.54,
        "wqdwidth": "3~5",
        "wq_people": null,
        "wqgrz": 5.5,
        "han": null,
        "wq_outslope": null,
        "wqname": "张西联圩",
        "lgtd": 120.936232,
        "drp": "0.0",
        "wq_jbrake": 0,
        "wq_power": null,
        "wqwrz": 4.02,
        "wq_qt_area": null,
        "wqdheight": "4.02~6.17",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.18,
        "rvnm": "吴淞江,支浦江,诸天浦,大直港-南塘江,大直港-南塘江",
        "ylstcd": null,
        "gdplcount": 11,
        "ybbpsl": 0,
        "upz": 3.18,
        "wqplength": 0.3,
        "wq_plength": 0.7,
        "wqid": "23010001",
        "isvisble": null,
        "wq_theight": 5.5,
        "nt": null,
        "wq_fbrake": 21,
        "lttd": 31.30016,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 432.08,
        "capacity": 432.08,
        "wq_zhen": "张浦",
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": null,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": "嘉宝北片",
        "wq_st_area": null,
        "wq_wns_area": null,
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63205150",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5,
                "z": 3.17
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.2,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5,
                "z": 3.2
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.22,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5,
                "z": 3.22
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5,
                "z": 3.24
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5,
                "z": 3.24
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5,
                "z": 3.17
            }
        ],
        "gdplpower": 38,
        "grz": "4.40",
        "wq_tlow": 4.02,
        "wq_pailaoz": 11,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 4.02,
        "wqcount": 0.98,
        "wrz": "3.90"
    },
    {
        "wqdlength": 2.5,
        "tgtq": 0,
        "pumcap": 87.9,
        "gatecount": 0,
        "wq_tbrake": 0,
        "ybylstnm": null,
        "rvcd": "2025041500007,2025041500025,2025041500020,2025041500080",
        "wqarea": 21.96,
        "wqdwidth": "4~18",
        "wq_people": null,
        "wqgrz": 3.94,
        "han": null,
        "wq_outslope": null,
        "wqname": "城南联圩",
        "lgtd": 120.963429,
        "drp": "0.0",
        "wq_jbrake": 1,
        "wq_power": null,
        "wqwrz": 2.6,
        "wq_qt_area": null,
        "wqdheight": "3.94~5.8",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.18,
        "rvnm": "吴淞江,青阳港,娄江,三船路港",
        "ylstcd": null,
        "gdplcount": 12,
        "ybbpsl": 0,
        "upz": 3.18,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010035",
        "isvisble": "1",
        "wq_theight": 5.87,
        "nt": null,
        "wq_fbrake": 7,
        "lttd": 31.353436,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 342.99,
        "capacity": 96.9,
        "wq_zhen": "高新区、开发区",
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 4.002,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": "嘉宝北片",
        "wq_st_area": null,
        "wq_wns_area": null,
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63205150",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 3.94,
                "z": 3.17
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 3.94,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 3.94,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.2,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 3.94,
                "z": 3.2
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 3.94,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 3.94,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.22,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 3.94,
                "z": 3.22
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 3.94,
                "z": 3.24
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 3.94,
                "z": 3.24
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 3.94,
                "z": 3.17
            }
        ],
        "gdplpower": 59,
        "grz": "4.40",
        "wq_tlow": 4,
        "wq_pailaoz": 12,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 4,
        "wqcount": 0.84,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.9,
        "tgtq": 0,
        "pumcap": 134.04,
        "gatecount": 0,
        "wq_tbrake": 0,
        "ybylstnm": null,
        "rvcd": "2025041500007,2025041500032,2025041500020,2025041500033,2025041500032,2025041500072",
        "wqarea": 52.75,
        "wqdwidth": "3.9",
        "wq_people": null,
        "wqgrz": 4.12,
        "han": null,
        "wq_outslope": null,
        "wqname": "吴淞联圩",
        "lgtd": 120.895654,
        "drp": "0.0",
        "wq_jbrake": 1,
        "wq_power": null,
        "wqwrz": 2.6,
        "wq_qt_area": null,
        "wqdheight": "38.464",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.18,
        "rvnm": "吴淞江,界浦港,娄江,大直港-南塘江,界浦港,东尤泾",
        "ylstcd": null,
        "gdplcount": 3,
        "ybbpsl": 0,
        "upz": 3.18,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010037",
        "isvisble": "1",
        "wq_theight": 5.87,
        "nt": null,
        "wq_fbrake": 33,
        "lttd": 31.347557,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 634.04,
        "capacity": 221.56,
        "wq_zhen": "高新区",
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 2.543,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": "嘉宝北片",
        "wq_st_area": null,
        "wq_wns_area": null,
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63205150",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.12,
                "z": 3.17
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.12,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.12,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.2,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.12,
                "z": 3.2
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.12,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.12,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.22,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.12,
                "z": 3.22
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.12,
                "z": 3.24
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.12,
                "z": 3.24
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.12,
                "z": 3.17
            }
        ],
        "gdplpower": 136,
        "grz": "4.40",
        "wq_tlow": 4,
        "wq_pailaoz": 25,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 4,
        "wqcount": 3.73,
        "wrz": "3.90"
    },
    {
        "wqdlength": null,
        "tgtq": 0,
        "pumcap": 15.2,
        "gatecount": 0,
        "wq_tbrake": 3,
        "ybylstnm": null,
        "rvcd": "2025041500019",
        "wqarea": 5.53,
        "wqdwidth": "1.5~7.5",
        "wq_people": null,
        "wqgrz": 5.5,
        "han": null,
        "wq_outslope": null,
        "wqname": "陆桥联圩",
        "lgtd": 120.963032,
        "drp": "0.0",
        "wq_jbrake": 0,
        "wq_power": null,
        "wqwrz": 4.02,
        "wq_qt_area": null,
        "wqdheight": "4.07~5.35",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "rvnm": "杨林塘",
        "ylstcd": null,
        "gdplcount": 6,
        "ybbpsl": 0,
        "upz": 3.18,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010051",
        "isvisble": null,
        "wq_theight": 5.5,
        "nt": null,
        "wq_fbrake": 4,
        "lttd": 31.478384,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 489.45,
        "capacity": 489.45,
        "wq_zhen": "周市",
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": null,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": "嘉宝北片",
        "wq_st_area": null,
        "wq_wns_area": null,
        "ybylstcd": null,
        "waterList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 5.5
            }
        ],
        "gdplpower": 15,
        "grz": "4.40",
        "wq_tlow": 4.02,
        "wq_pailaoz": 6,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 4.02,
        "wqcount": 0.35,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.8,
        "tgtq": 0,
        "pumcap": 182.1,
        "gatecount": 0,
        "wq_tbrake": 0,
        "ybylstnm": null,
        "rvcd": "2025041500021,2025041500025,2025041500007,2025041500073,2025041500020,2025041500021,2025041500021",
        "wqarea": 55.28,
        "wqdwidth": "5",
        "wq_people": null,
        "wqgrz": 4.02,
        "han": null,
        "wq_outslope": null,
        "wqname": "青阳联圩",
        "lgtd": 121.011616,
        "drp": "0.0",
        "wq_jbrake": 9,
        "wq_power": null,
        "wqwrz": 2.6,
        "wq_qt_area": null,
        "wqdheight": "3.01~6.43",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.18,
        "rvnm": "浏河,青阳港,吴淞江,夏驾河,娄江,浏河,浏河",
        "ylstcd": null,
        "gdplcount": 30,
        "ybbpsl": 0,
        "upz": 3.18,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010083",
        "isvisble": null,
        "wq_theight": 5.22,
        "nt": null,
        "wq_fbrake": 6,
        "lttd": 31.350649,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 306.3,
        "capacity": 126.12,
        "wq_zhen": "开发区、陆家",
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 3.295,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": "嘉宝北片",
        "wq_st_area": null,
        "wq_wns_area": null,
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63205150",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.02,
                "z": 3.17
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.02,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.02,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.2,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.02,
                "z": 3.2
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.02,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.02,
                "z": 3.18
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.22,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.02,
                "z": 3.22
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.02,
                "z": 3.24
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.02,
                "z": 3.24
            },
            {
                "stcd": "63205150",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 2.6,
                "qpsw": 4.02,
                "z": 3.17
            }
        ],
        "gdplpower": 182,
        "grz": "4.40",
        "wq_tlow": 4.07,
        "wq_pailaoz": 30,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 4.07,
        "wqcount": 2.49,
        "wrz": "3.90"
    },
    {
        "wqdlength": null,
        "tgtq": 0,
        "pumcap": 16.54,
        "gatecount": 0,
        "wq_tbrake": 0,
        "ybylstnm": null,
        "rvcd": "2025041500040,2025041500001,2025041500040,2025041500040,2025041500041,2025041500043",
        "wqarea": 5.266,
        "wqdwidth": "3～8",
        "wq_people": null,
        "wqgrz": 4.5,
        "han": null,
        "wq_outslope": null,
        "wqname": "镇北圩",
        "lgtd": 120.719837,
        "drp": "0.0",
        "wq_jbrake": 1,
        "wq_power": null,
        "wqwrz": 4.02,
        "wq_qt_area": null,
        "wqdheight": "4.5～9.2",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.18,
        "rvnm": "三干河,长江,三干河,三干河,四干河-新奚浦塘,北中心河",
        "ylstcd": null,
        "gdplcount": 11,
        "ybbpsl": 0,
        "upz": 3.17,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010116",
        "isvisble": null,
        "wq_theight": 5.87,
        "nt": null,
        "wq_fbrake": 10,
        "lttd": 31.955345,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 598.18,
        "capacity": 294.66,
        "wq_zhen": "锦丰镇、乐余镇",
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": null,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": "淀北片",
        "wq_st_area": null,
        "wq_wns_area": null,
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63203050",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 4.5,
                "z": 3.18
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 4.5,
                "z": 3.21
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 4.5,
                "z": 3.24
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.22,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 4.5,
                "z": 3.22
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 4.5,
                "z": 3.21
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.23,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 4.5,
                "z": 3.23
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.25,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 4.5,
                "z": 3.25
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.26,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 4.5,
                "z": 3.26
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 4.5,
                "z": 3.24
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.02,
                "qpsw": 4.5,
                "z": 3.21
            }
        ],
        "gdplpower": 17,
        "grz": "4.40",
        "wq_tlow": 4,
        "wq_pailaoz": 11,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 4,
        "wqcount": 0.35,
        "wrz": "3.90"
    },
    {
        "wqdlength": null,
        "tgtq": 0,
        "pumcap": 1,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": ",2025041500001",
        "wqarea": 10.93,
        "wqdwidth": "3~5",
        "wq_people": null,
        "wqgrz": 4.8,
        "han": null,
        "wq_outslope": null,
        "wqname": "长江圩",
        "lgtd": 120.79323,
        "drp": "0.0",
        "wq_jbrake": 1,
        "wq_power": null,
        "wqwrz": 4.2,
        "wq_qt_area": null,
        "wqdheight": "4.2~4.8",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.18,
        "rvnm": ",长江",
        "ylstcd": null,
        "gdplcount": 1,
        "ybbpsl": 0,
        "upz": 3.17,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010152",
        "isvisble": null,
        "wq_theight": 4.8,
        "nt": null,
        "wq_fbrake": 14,
        "lttd": 31.875895,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 0,
        "capacity": 0,
        "wq_zhen": "常阴沙现代农业示范园区",
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": null,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": "淀北片",
        "wq_st_area": null,
        "wq_wns_area": null,
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63203050",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.2,
                "qpsw": 4.8,
                "z": 3.18
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": "NaN",
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.2,
                "qpsw": 4.8,
                "z": 3.21
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": "NaN",
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.2,
                "qpsw": 4.8,
                "z": 3.24
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.22,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": "NaN",
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.2,
                "qpsw": 4.8,
                "z": 3.22
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": "NaN",
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.2,
                "qpsw": 4.8,
                "z": 3.21
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.23,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": "NaN",
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.2,
                "qpsw": 4.8,
                "z": 3.23
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.25,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": "NaN",
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.2,
                "qpsw": 4.8,
                "z": 3.25
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.26,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": "NaN",
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.2,
                "qpsw": 4.8,
                "z": 3.26
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": "NaN",
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.2,
                "qpsw": 4.8,
                "z": 3.24
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": "NaN",
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 4.2,
                "qpsw": 4.8,
                "z": 3.21
            }
        ],
        "gdplpower": 1,
        "grz": "4.40",
        "wq_tlow": 4.2,
        "wq_pailaoz": 1,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": "NaN",
        "wqcount": null,
        "wrz": "3.90"
    },
    {
        "wqdlength": null,
        "tgtq": 0,
        "pumcap": 74,
        "gatecount": 0,
        "wq_tbrake": 0,
        "ybylstnm": null,
        "rvcd": "2025041500003",
        "wqarea": 21.58,
        "wqdwidth": "6",
        "wq_people": null,
        "wqgrz": 5.5,
        "han": null,
        "wq_outslope": null,
        "wqname": "城南大包围",
        "lgtd": 120.628456,
        "drp": "0.0",
        "wq_jbrake": 0,
        "wq_power": null,
        "wqwrz": 3.8,
        "wq_qt_area": null,
        "wqdheight": "5.5~6.3",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.18,
        "rvnm": "苏南运河",
        "ylstcd": null,
        "gdplcount": 12,
        "ybbpsl": 0,
        "upz": 3.17,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010426",
        "isvisble": null,
        "wq_theight": 6,
        "nt": null,
        "wq_fbrake": 28,
        "lttd": 31.238556,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 537.67,
        "capacity": 442.68,
        "wq_zhen": "城南街道、长桥街道",
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": null,
        "ntguize": "提前预降  ",
        "comments": null,
        "wq_beizhu": "青松片",
        "wq_st_area": null,
        "wq_wns_area": null,
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63203050",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.8,
                "qpsw": 5.5,
                "z": 3.18
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.8,
                "qpsw": 5.5,
                "z": 3.21
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.8,
                "qpsw": 5.5,
                "z": 3.24
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.22,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.8,
                "qpsw": 5.5,
                "z": 3.22
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.8,
                "qpsw": 5.5,
                "z": 3.21
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.23,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.8,
                "qpsw": 5.5,
                "z": 3.23
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.25,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.8,
                "qpsw": 5.5,
                "z": 3.25
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.26,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.8,
                "qpsw": 5.5,
                "z": 3.26
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.8,
                "qpsw": 5.5,
                "z": 3.24
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.8,
                "qpsw": 5.5,
                "z": 3.21
            }
        ],
        "gdplpower": 74,
        "grz": "4.40",
        "wq_tlow": 3.6,
        "wq_pailaoz": 12,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 3.6,
        "wqcount": 1.23,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.4,
        "tgtq": 0,
        "pumcap": 292,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": "2025041500003,2025041500013,2025041500059,2025041500065,2025041500068,2025041500069",
        "wqarea": 74.1,
        "wqdwidth": null,
        "wq_people": null,
        "wqgrz": 3.2,
        "han": null,
        "wq_outslope": null,
        "wqname": "城市中心区大包围",
        "lgtd": 120.608852,
        "drp": "0.0",
        "wq_jbrake": null,
        "wq_power": null,
        "wqwrz": 3,
        "wq_qt_area": null,
        "wqdheight": "5.0~5.2",
        "wq_ht_area": null,
        "sumtgtq": 41.5,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 2.97,
        "rvnm": "苏南运河,元和塘,西塘河,胥江,苏州外城河,老运河",
        "ylstcd": null,
        "gdplcount": null,
        "ybbpsl": 0,
        "upz": 2.97,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010515",
        "isvisble": null,
        "wq_theight": 3.4,
        "nt": null,
        "wq_fbrake": 4,
        "lttd": 31.308484,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 90.91,
        "capacity": 48.63,
        "wq_zhen": null,
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 4,
        "ntguize": "开机排水  ",
        "comments": null,
        "wq_beizhu": "蕰南片",
        "wq_st_area": null,
        "wq_wns_area": "89",
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63203040",
                "tm": "2024-05-10 08:00:00",
                "upz": 2.97,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.97
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 09:00:00",
                "upz": 2.97,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.97
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 10:00:00",
                "upz": 2.95,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.95
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 11:00:00",
                "upz": 2.95,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.95
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 12:00:00",
                "upz": 2.95,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.95
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 13:00:00",
                "upz": 2.94,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.94
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 14:00:00",
                "upz": 2.93,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.93
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 15:00:00",
                "upz": 2.91,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.91
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 16:00:00",
                "upz": 2.9,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.9
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 17:00:00",
                "upz": 2.9,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.9
            }
        ],
        "gdplpower": null,
        "grz": "4.40",
        "wq_tlow": 2.8,
        "wq_pailaoz": 1,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 2.97,
        "wqcount": 4.7,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.5,
        "tgtq": 0,
        "pumcap": 48,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": "2025041500003,2025041500059,2025041500061",
        "wqarea": 13.7,
        "wqdwidth": "0.5~3",
        "wq_people": null,
        "wqgrz": 3.2,
        "han": null,
        "wq_outslope": null,
        "wqname": "金阊新城包围",
        "lgtd": 120.550349,
        "drp": "0.0",
        "wq_jbrake": null,
        "wq_power": null,
        "wqwrz": 3,
        "wq_qt_area": null,
        "wqdheight": "5.0~5.2",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 2.97,
        "rvnm": "苏南运河,西塘河,黄花泾-朝阳河",
        "ylstcd": null,
        "gdplcount": null,
        "ybbpsl": 0,
        "upz": 2.97,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010516",
        "isvisble": null,
        "wq_theight": 3.5,
        "nt": null,
        "wq_fbrake": null,
        "lttd": 31.355691,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 91.56,
        "capacity": 39.73,
        "wq_zhen": null,
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 2,
        "ntguize": "/",
        "comments": null,
        "wq_beizhu": "蕰南片",
        "wq_st_area": null,
        "wq_wns_area": null,
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63203040",
                "tm": "2024-05-10 08:00:00",
                "upz": 2.97,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.97
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 09:00:00",
                "upz": 2.97,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.97
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 10:00:00",
                "upz": 2.95,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.95
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 11:00:00",
                "upz": 2.95,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.95
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 12:00:00",
                "upz": 2.95,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.95
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 13:00:00",
                "upz": 2.94,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.94
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 14:00:00",
                "upz": 2.93,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.93
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 15:00:00",
                "upz": 2.91,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.91
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 16:00:00",
                "upz": 2.9,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.9
            },
            {
                "stcd": "63203040",
                "tm": "2024-05-10 17:00:00",
                "upz": 2.9,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 2.97,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3,
                "qpsw": 3.2,
                "z": 2.9
            }
        ],
        "gdplpower": null,
        "grz": "4.40",
        "wq_tlow": 3.1,
        "wq_pailaoz": null,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 3.1,
        "wqcount": 0.71,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.5,
        "tgtq": 0,
        "pumcap": 50,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": null,
        "wqarea": 512.37,
        "wqdwidth": null,
        "wq_people": null,
        "wqgrz": 3.7,
        "han": null,
        "wq_outslope": null,
        "wqname": "新沙区",
        "lgtd": 120.608852,
        "drp": "0.0",
        "wq_jbrake": null,
        "wq_power": null,
        "wqwrz": 3.7,
        "wq_qt_area": null,
        "wqdheight": "5.0~5.2",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.9,
        "rvnm": null,
        "ylstcd": null,
        "gdplcount": null,
        "ybbpsl": 0,
        "upz": 4.03,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010517",
        "isvisble": null,
        "wq_theight": 3.9,
        "nt": null,
        "wq_fbrake": 4,
        "lttd": 31.308484,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": -29.96,
        "capacity": -76.06,
        "wq_zhen": null,
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 4,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": null,
        "wq_st_area": null,
        "wq_wns_area": "89",
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63204200",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.65,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.9,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.65
            },
            {
                "stcd": "63204200",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.65,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.9,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.65
            },
            {
                "stcd": "63204200",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.49,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.9,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.49
            },
            {
                "stcd": "63204200",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.44,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.9,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.44
            },
            {
                "stcd": "63204200",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.4,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.9,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.4
            },
            {
                "stcd": "63204200",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.43,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.9,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.43
            },
            {
                "stcd": "63204200",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.68,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.9,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.68
            },
            {
                "stcd": "63204200",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.71,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.9,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.71
            },
            {
                "stcd": "63204200",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.71,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.9,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.71
            },
            {
                "stcd": "63204200",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.73,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.73,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.73
            }
        ],
        "gdplpower": null,
        "grz": "4.40",
        "wq_tlow": 3.1,
        "wq_pailaoz": 1,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 4.03,
        "wqcount": 35.43,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.5,
        "tgtq": 0,
        "pumcap": 50,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": null,
        "wqarea": 513.46,
        "wqdwidth": null,
        "wq_people": null,
        "wqgrz": 3.7,
        "han": null,
        "wq_outslope": null,
        "wqname": "虞西区",
        "lgtd": 120.608852,
        "drp": "0.0",
        "wq_jbrake": null,
        "wq_power": null,
        "wqwrz": 3.7,
        "wq_qt_area": null,
        "wqdheight": "5.0~5.2",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.51,
        "rvnm": null,
        "ylstcd": null,
        "gdplcount": null,
        "ybbpsl": 0,
        "upz": 3.51,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010518",
        "isvisble": null,
        "wq_theight": 3.9,
        "nt": null,
        "wq_fbrake": 4,
        "lttd": 31.308484,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 96.69,
        "capacity": 47.11,
        "wq_zhen": null,
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 4,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": null,
        "wq_st_area": null,
        "wq_wns_area": "89",
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63204011",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.48,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.51,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.48
            },
            {
                "stcd": "63204011",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.49,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.51,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.49
            },
            {
                "stcd": "63204011",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.46,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.51,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.46
            },
            {
                "stcd": "63204011",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.46,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.51,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.46
            },
            {
                "stcd": "63204011",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.45,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.51,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.45
            },
            {
                "stcd": "63204011",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.44,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.51,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.44
            },
            {
                "stcd": "63204011",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.4,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.51,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.4
            },
            {
                "stcd": "63204011",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.46,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.51,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.46
            },
            {
                "stcd": "63204011",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.52,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.51,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.52
            },
            {
                "stcd": "63204011",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.47,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.47,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.47
            }
        ],
        "gdplpower": null,
        "grz": "4.40",
        "wq_tlow": 3.1,
        "wq_pailaoz": 1,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 3.51,
        "wqcount": 38.19,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.5,
        "tgtq": 0,
        "pumcap": 50,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": null,
        "wqarea": 2610.3,
        "wqdwidth": null,
        "wq_people": null,
        "wqgrz": 3.7,
        "han": null,
        "wq_outslope": null,
        "wqname": "阳澄区",
        "lgtd": 120.608852,
        "drp": "0.0",
        "wq_jbrake": null,
        "wq_power": null,
        "wqwrz": 3.7,
        "wq_qt_area": null,
        "wqdheight": "5.0~5.2",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.24,
        "rvnm": null,
        "ylstcd": null,
        "gdplcount": null,
        "ybbpsl": 0,
        "upz": 3.24,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010519",
        "isvisble": null,
        "wq_theight": 3.9,
        "nt": null,
        "wq_fbrake": 4,
        "lttd": 31.308484,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 350.43,
        "capacity": 244.24,
        "wq_zhen": null,
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 4,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": null,
        "wq_st_area": null,
        "wq_wns_area": "89",
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63204650",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.24,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.24
            },
            {
                "stcd": "63204650",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.24,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.24
            },
            {
                "stcd": "63204650",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.24,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.24
            },
            {
                "stcd": "63204650",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.24,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.24
            },
            {
                "stcd": "63204650",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.25,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.24,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.25
            },
            {
                "stcd": "63204650",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.24,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.24
            },
            {
                "stcd": "63204650",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.24,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.24
            },
            {
                "stcd": "63204650",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.24,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.24
            },
            {
                "stcd": "63204650",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.25,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.24,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.25
            },
            {
                "stcd": "63204650",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.24,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.24
            }
        ],
        "gdplpower": null,
        "grz": "4.40",
        "wq_tlow": 3.1,
        "wq_pailaoz": 1,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 3.24,
        "wqcount": 415.79,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.5,
        "tgtq": 0,
        "pumcap": 50,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": null,
        "wqarea": 1522.71,
        "wqdwidth": null,
        "wq_people": null,
        "wqgrz": 3.7,
        "han": null,
        "wq_outslope": null,
        "wqname": "淀泖区",
        "lgtd": 120.608852,
        "drp": "0.0",
        "wq_jbrake": null,
        "wq_power": null,
        "wqwrz": 3.7,
        "wq_qt_area": null,
        "wqdheight": "5.0~5.2",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.17,
        "rvnm": null,
        "ylstcd": null,
        "gdplcount": null,
        "ybbpsl": 0,
        "upz": 3.17,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010520",
        "isvisble": null,
        "wq_theight": 3.9,
        "nt": null,
        "wq_fbrake": 4,
        "lttd": 31.308484,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 492.9,
        "capacity": 357.86,
        "wq_zhen": null,
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 4,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": null,
        "wq_st_area": null,
        "wq_wns_area": "89",
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63403500",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.17
            },
            {
                "stcd": "63403500",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.18
            },
            {
                "stcd": "63403500",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.17
            },
            {
                "stcd": "63403500",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.16,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.16
            },
            {
                "stcd": "63403500",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.15,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.15
            },
            {
                "stcd": "63403500",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.15,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.15
            },
            {
                "stcd": "63403500",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.15,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.15
            },
            {
                "stcd": "63403500",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.14,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.14
            },
            {
                "stcd": "63403500",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.13,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.13
            },
            {
                "stcd": "63403500",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.13,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.13
            }
        ],
        "gdplpower": null,
        "grz": "4.40",
        "wq_tlow": 3.1,
        "wq_pailaoz": 1,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 3.17,
        "wqcount": 308.44,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.5,
        "tgtq": 0,
        "pumcap": 172.4,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": null,
        "wqarea": 496,
        "wqdwidth": null,
        "wq_people": null,
        "wqgrz": 3.9,
        "han": null,
        "wq_outslope": null,
        "wqname": "滨湖区",
        "lgtd": 120.608852,
        "drp": "0.0",
        "wq_jbrake": null,
        "wq_power": null,
        "wqwrz": 3.2,
        "wq_qt_area": null,
        "wqdheight": "5.0~5.2",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.34,
        "rvnm": null,
        "ylstcd": null,
        "gdplcount": null,
        "ybbpsl": 0,
        "upz": 3.34,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010521",
        "isvisble": null,
        "wq_theight": 5,
        "nt": "11.057x^2+-6.8717x+4.7939",
        "wq_fbrake": 4,
        "lttd": 31.308484,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 416.12,
        "capacity": 140.38,
        "wq_zhen": null,
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 4,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": null,
        "wq_st_area": null,
        "wq_wns_area": "89",
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "6320G001",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.34,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.34,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.2,
                "qpsw": 3.9,
                "z": 3.34
            },
            {
                "stcd": "6320G001",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.34,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.34,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.2,
                "qpsw": 3.9,
                "z": 3.34
            },
            {
                "stcd": "6320G001",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.36,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.34,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.2,
                "qpsw": 3.9,
                "z": 3.36
            },
            {
                "stcd": "6320G001",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.37,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.34,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.2,
                "qpsw": 3.9,
                "z": 3.37
            },
            {
                "stcd": "6320G001",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.35,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.34,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.2,
                "qpsw": 3.9,
                "z": 3.35
            },
            {
                "stcd": "6320G001",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.36,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.34,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.2,
                "qpsw": 3.9,
                "z": 3.36
            },
            {
                "stcd": "6320G001",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.35,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.34,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.2,
                "qpsw": 3.9,
                "z": 3.35
            },
            {
                "stcd": "6320G001",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.36,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.34,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.2,
                "qpsw": 3.9,
                "z": 3.36
            },
            {
                "stcd": "6320G001",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.36,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.34,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.2,
                "qpsw": 3.9,
                "z": 3.36
            },
            {
                "stcd": "6320G001",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.36,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.34,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.2,
                "qpsw": 3.9,
                "z": 3.36
            }
        ],
        "gdplpower": null,
        "grz": "4.40",
        "wq_tlow": 3.1,
        "wq_pailaoz": 1,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 3.34,
        "wqcount": 37.3,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.5,
        "tgtq": 0,
        "pumcap": 50,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": null,
        "wqarea": 560.92,
        "wqdwidth": null,
        "wq_people": null,
        "wqgrz": 3.7,
        "han": null,
        "wq_outslope": null,
        "wqname": "浦南区",
        "lgtd": 120.608852,
        "drp": "0.0",
        "wq_jbrake": null,
        "wq_power": null,
        "wqwrz": 3.7,
        "wq_qt_area": null,
        "wqdheight": "5.0~5.2",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.18,
        "rvnm": null,
        "ylstcd": null,
        "gdplcount": null,
        "ybbpsl": 0,
        "upz": 3.17,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010522",
        "isvisble": null,
        "wq_theight": 3.9,
        "nt": null,
        "wq_fbrake": 4,
        "lttd": 31.308484,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 445,
        "capacity": 323.08,
        "wq_zhen": null,
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 4,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": null,
        "wq_st_area": null,
        "wq_wns_area": "89",
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63205350",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.18
            },
            {
                "stcd": "63205350",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.17
            },
            {
                "stcd": "63205350",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.18
            },
            {
                "stcd": "63205350",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.16,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.16
            },
            {
                "stcd": "63205350",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.17,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.17
            },
            {
                "stcd": "63205350",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.16,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.16
            },
            {
                "stcd": "63205350",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.15,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.15
            },
            {
                "stcd": "63205350",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.16,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.16
            },
            {
                "stcd": "63205350",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.14,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.14
            },
            {
                "stcd": "63205350",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.14,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.14
            }
        ],
        "gdplpower": null,
        "grz": "4.40",
        "wq_tlow": 3.1,
        "wq_pailaoz": 1,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 3.17,
        "wqcount": 102.58,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.5,
        "tgtq": 0,
        "pumcap": 50,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": ",2025041500020,2025041500069",
        "wqarea": 560.92,
        "wqdwidth": null,
        "wq_people": null,
        "wqgrz": 3.7,
        "han": null,
        "wq_outslope": null,
        "wqname": "工业园区",
        "lgtd": 120.608852,
        "drp": "0.0",
        "wq_jbrake": null,
        "wq_power": null,
        "wqwrz": 3.7,
        "wq_qt_area": null,
        "wqdheight": "5.0~5.2",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.18,
        "rvnm": ",娄江,老运河",
        "ylstcd": null,
        "gdplcount": null,
        "ybbpsl": 0,
        "upz": 3.17,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010523",
        "isvisble": null,
        "wq_theight": 3.9,
        "nt": null,
        "wq_fbrake": 4,
        "lttd": 31.308484,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 445,
        "capacity": 323.08,
        "wq_zhen": null,
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 4,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": null,
        "wq_st_area": null,
        "wq_wns_area": "89",
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63203050",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.18,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.18,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.18
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.21
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.24
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.22,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.22
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.21
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.23,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.23
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.25,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.25
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.26,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.26
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.24,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.24
            },
            {
                "stcd": "63203050",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.21,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.17,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.21
            }
        ],
        "gdplpower": null,
        "grz": "4.40",
        "wq_tlow": 3.1,
        "wq_pailaoz": 1,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 3.17,
        "wqcount": 102.58,
        "wrz": "3.90"
    },
    {
        "wqdlength": 3.5,
        "tgtq": 0,
        "pumcap": 50,
        "gatecount": 0,
        "wq_tbrake": null,
        "ybylstnm": null,
        "rvcd": ",2025041500006,2025041500009,2025041500013,2025041500014,2025041500047,2025041500048,2025041500049,2025041500055",
        "wqarea": 560.92,
        "wqdwidth": null,
        "wq_people": null,
        "wqgrz": 3.7,
        "han": null,
        "wq_outslope": null,
        "wqname": "常熟大包围",
        "lgtd": 120.608852,
        "drp": "0.0",
        "wq_jbrake": null,
        "wq_power": null,
        "wqwrz": 3.7,
        "wq_qt_area": null,
        "wqdheight": "5.0~5.2",
        "wq_ht_area": null,
        "sumtgtq": 0,
        "rainList": [
            {
                "tm": "2024-05-10 08:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 09:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 10:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 11:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 12:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 13:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 14:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 15:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 16:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 17:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 18:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 19:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 20:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 21:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 22:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-10 23:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 00:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 01:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 02:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 03:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 04:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 05:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 06:00:00",
                "drp": 0
            },
            {
                "tm": "2024-05-11 07:00:00",
                "drp": 0
            }
        ],
        "stcd": "63205350",
        "maxUpz": 3.33,
        "rvnm": ",望虞河,张家港河,元和塘,常浒河,南福山塘,海洋泾,青墩塘,辛安塘",
        "ylstcd": null,
        "gdplcount": null,
        "ybbpsl": 0,
        "upz": 3.33,
        "wqplength": 0.3,
        "wq_plength": null,
        "wqid": "23010524",
        "isvisble": null,
        "wq_theight": 3.9,
        "nt": null,
        "wq_fbrake": 4,
        "lttd": 31.308484,
        "wqtjtgtq": "关泵",
        "wqTheightcapacity": 347.47,
        "capacity": 225.55,
        "wq_zhen": null,
        "ylstnm": null,
        "ybdrpsl": 0,
        "wq_inslope": null,
        "stnm": "平望",
        "wq_length": null,
        "wq_gd_area": null,
        "plsjpum": 4,
        "ntguize": "",
        "comments": null,
        "wq_beizhu": null,
        "wq_st_area": null,
        "wq_wns_area": "89",
        "ybylstcd": null,
        "waterList": [
            {
                "stcd": "63204450",
                "tm": "2024-05-10 08:00:00",
                "upz": 3.33,
                "drp": 0,
                "time": "2024-05-10 08:00:00",
                "dwz": 3.33,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.33
            },
            {
                "stcd": "63204450",
                "tm": "2024-05-10 09:00:00",
                "upz": 3.33,
                "drp": 0,
                "time": "2024-05-10 09:00:00",
                "dwz": 3.33,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.33
            },
            {
                "stcd": "63204450",
                "tm": "2024-05-10 10:00:00",
                "upz": 3.3,
                "drp": 0,
                "time": "2024-05-10 10:00:00",
                "dwz": 3.33,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.3
            },
            {
                "stcd": "63204450",
                "tm": "2024-05-10 11:00:00",
                "upz": 3.33,
                "drp": 0,
                "time": "2024-05-10 11:00:00",
                "dwz": 3.33,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.33
            },
            {
                "stcd": "63204450",
                "tm": "2024-05-10 12:00:00",
                "upz": 3.3,
                "drp": 0,
                "time": "2024-05-10 12:00:00",
                "dwz": 3.33,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.3
            },
            {
                "stcd": "63204450",
                "tm": "2024-05-10 13:00:00",
                "upz": 3.3,
                "drp": 0,
                "time": "2024-05-10 13:00:00",
                "dwz": 3.33,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.3
            },
            {
                "stcd": "63204450",
                "tm": "2024-05-10 14:00:00",
                "upz": 3.3,
                "drp": 0,
                "time": "2024-05-10 14:00:00",
                "dwz": 3.33,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.3
            },
            {
                "stcd": "63204450",
                "tm": "2024-05-10 15:00:00",
                "upz": 3.3,
                "drp": 0,
                "time": "2024-05-10 15:00:00",
                "dwz": 3.33,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.3
            },
            {
                "stcd": "63204450",
                "tm": "2024-05-10 16:00:00",
                "upz": 3.33,
                "drp": 0,
                "time": "2024-05-10 16:00:00",
                "dwz": 3.33,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.33
            },
            {
                "stcd": "63204450",
                "tm": "2024-05-10 17:00:00",
                "upz": 3.33,
                "drp": 0,
                "time": "2024-05-10 17:00:00",
                "dwz": 3.33,
                "tgtq": 0,
                "xlxs": 0.3,
                "aqsw": 3.7,
                "qpsw": 3.7,
                "z": 3.33
            }
        ],
        "gdplpower": null,
        "grz": "4.40",
        "wq_tlow": 3.1,
        "wq_pailaoz": 1,
        "gatekaicount": 0,
        "zha": null,
        "gateList": [],
        "ybjsw": 3.33,
        "wqcount": 102.58,
        "wrz": "3.90"
    }
],
    "total": 461,
    "Message": "操作成功",
    "success": "true"
}
      var strJsonList = res.result;      
      if(strJsonList.length>0){
        for(var num=0;num<strJsonList.length;num++){
            var itemList=[];

            var properties=weiquURL.features[num].properties;
            res.result[num].wqname=properties["圩区名"];
            res.result[num].wqid=properties["OBJECTID"];


            if(SetNull(strJsonList[num]["waterList"])!=""){
              itemList=sortObjectArray(strJsonList[num]["waterList"],["dwz"],"desc");
              res.result[num]["maxUpz"]=itemList[0]["dwz"];
            }
        }
      }

      var strJsonListTemp=strJsonList.filter(function(e){return SetNull(e.wqwrz) != "" });
      // console.error('strJsonListTemp',JSON.stringify(strJsonListTemp));

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

          tableData.value = result;
        }
      } else {
        tableData.value = [];
      }


    // })
    // .catch(err => { });
  window.loadingHide();
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
    // if ($(".areaSelect").attr("id") == "KSS") {
    //   strParam["pathname"] = "嘉宝北片";
    // }
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
