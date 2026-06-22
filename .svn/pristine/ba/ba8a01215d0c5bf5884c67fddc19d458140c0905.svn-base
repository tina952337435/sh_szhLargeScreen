<template>
  <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="tableYQ" :border="0" :cellspacing="0"
    :cellpadding="0" />
</template>
<script setup>
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive, inject } from "vue";
import { groupBy, SetNull, Getmtype } from "@/api/ComUnit";
const datekey = ref(null);
const tableHeaders = [
  { name: "num", label: "序号" },
  { name: "stnm", label: "站名" },
  { name: "upz", label: "水位(m)" },
  { name: "wrz", label: "警戒水位(m)" },
  { name: "grz", label: "保证水位(m)" },
  // { name: "hnnm", label: "水系" },
  // { name: "rvnm", label: "所在河流" },
  // { name: "mtype", label: "类型" },
];
const tableData = ref();
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const typeValue = inject("typeValueSW");
const pid = inject("pidSW");
const stime = inject("stime");
const etime = inject("etime");

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = pid.value;
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  // api
  //   .stPptnWater(strParam)
  //   .then((res) => {
    var res = {
    "total": 66,
    "result": [
      {
        lttd84: 31.046686,
        stcd: "63403120",
        stnm: "莲盛",
        lgtd84: 120.981703,
        zstcd: "1330883",
        lgtd: -46341.8,
        tm: "2025-07-30 16:00:00",
        lttd: -20829.8,
        upz: "2.58",
        wrz: 3.2,
        grz: null
      },
      {
        lttd84: 31.051915,
        stcd: "63403100",
        stnm: "泖甸",
        lgtd84: 121.046772,
        zstcd: "1360481",
        lgtd: -40127.6,
        tm: "2025-07-30 16:00:00",
        lttd: -20273.1,
        upz: "3.67",
        wrz: 3.5,
        grz: null
      },
      {
        lttd84: 31.082763,
        stcd: "63402950",
        stnm: "河祝",
        lgtd84: 120.992969,
        zstcd: "1360581",
        lgtd: -45249.6,
        tm: "2025-07-30 16:00:00",
        lttd: -16834.0,
        upz: "3.5",
        wrz: 3.5,
        grz: 4.0
      },
      {
        lttd84: 30.961471,
        stcd: "63402910",
        stnm: "东团",
        lgtd84: 121.034834,
        zstcd: "1360681",
        lgtd: -41303.7,
        tm: "2025-07-30 16:00:00",
        lttd: -30295.0,
        upz: "3.72",
        wrz: 3.5,
        grz: 4.1
      },
      {
        lttd84: 30.97239,
        stcd: "63402700",
        stnm: "夏字圩",
        lgtd84: 121.153999,
        zstcd: "1460481",
        lgtd: -29914.7,
        tm: "2025-07-30 16:00:00",
        lttd: -29125.8,
        upz: "3.89",
        wrz: null,
        grz: null
      },
      {
        lttd84: 30.935274,
        stcd: "63402620",
        stnm: "茹塘",
        lgtd84: 121.102246,
        zstcd: "1430783",
        lgtd: -34871.8,
        tm: "2025-07-30 16:00:00",
        lttd: -33225.6,
        upz: "3.89",
        wrz: 3.7,
        grz: null
      },
      {
        lttd84: 30.963507,
        stcd: "63402600",
        stnm: "三角渡",
        lgtd84: 121.144747,
        zstcd: "1460381",
        lgtd: -30801.1,
        tm: "2025-07-30 16:00:00",
        lttd: -30107.3,
        upz: "3.88",
        wrz: null,
        grz: null
      },
      {
        lttd84: 30.902706,
        stcd: "63402500",
        stnm: "枫围",
        lgtd84: 121.003014,
        zstcd: "1960181",
        lgtd: -44373.5,
        tm: "2025-07-30 16:00:00",
        lttd: -36801.8,
        upz: "3.57",
        wrz: 3.5,
        grz: null
      },
      {
        lttd84: 30.897467,
        stcd: "63402300",
        stnm: "洙泾",
        lgtd84: 121.175508,
        zstcd: "1970381",
        lgtd: -27880.7,
        tm: "2025-07-30 16:00:00",
        lttd: -37436.8,
        upz: "3.97",
        wrz: 3.65,
        grz: 4.2
      },
      {
        lttd84: 30.929141,
        stcd: "63402200",
        stnm: "泖港",
        lgtd84: 121.211942,
        zstcd: "1460581",
        lgtd: -24391.2,
        tm: "2025-07-30 16:00:00",
        lttd: -33933.3,
        upz: "4.07",
        wrz: null,
        grz: null
      },
      {
        lttd84: 30.77905,
        stcd: "63401900",
        stnm: "张堰（二）",
        lgtd84: 121.295958,
        zstcd: "1930183",
        lgtd: -16386.5,
        tm: "2025-07-30 16:00:00",
        lttd: -50589.0,
        upz: "3.38",
        wrz: 3.3,
        grz: 3.9
      },
      {
        lttd84: 31.382194,
        stcd: "63401750",
        stnm: "吴淞口",
        lgtd84: 121.499195,
        zstcd: "1170181",
        lgtd: 3047.8,
        tm: "2025-07-30 16:00:00",
        lttd: 16271.1,
        upz: "4.45",
        wrz: 4.8,
        grz: 6.27
      },
      {
        lttd84: 31.243194,
        stcd: "63401500",
        stnm: "黄浦公园",
        lgtd84: 121.486748,
        zstcd: "2060881",
        lgtd: 1866.7,
        tm: "2025-07-30 16:00:00",
        lttd: 858.9,
        upz: "4.58",
        wrz: 4.55,
        grz: 5.86
      },
      {
        lttd84: 30.964471,
        stcd: "63401100",
        stnm: "米市渡",
        lgtd84: 121.236527,
        zstcd: "1460281",
        lgtd: -22033.8,
        tm: "2025-07-30 16:00:00",
        lttd: -30020.4,
        upz: "4.11",
        wrz: 3.8,
        grz: 4.3
      },
      {
        lttd84: 31.635434,
        stcd: "62724645",
        stnm: "崇明新城",
        lgtd84: 121.419878,
        zstcd: "1031583",
        lgtd: -4485.6,
        tm: "2025-07-30 16:00:00",
        lttd: 44350.2,
        upz: "2.416",
        wrz: 3.2,
        grz: null
      },
      {
        lttd84: 31.612958,
        stcd: "62724635",
        stnm: "崇明南门",
        lgtd84: 121.407021,
        zstcd: "1050481",
        lgtd: -5706.5,
        tm: "2025-07-30 16:00:00",
        lttd: 41858.5,
        upz: "4.47",
        wrz: 4.95,
        grz: 6.1
      },
      {
        lttd84: 31.384713,
        stcd: "62701710",
        stnm: "高桥（二）",
        lgtd84: 121.550729,
        zstcd: "1680281",
        lgtd: 7949.3,
        tm: "2025-07-30 16:00:00",
        lttd: 16552.4,
        upz: "4.408",
        wrz: 4.9,
        grz: 5.98
      },
      {
        lttd84: 31.339872,
        stcd: "62701620",
        stnm: "横沙新民",
        lgtd84: 121.837978,
        zstcd: "1032383",
        lgtd: 35290.0,
        tm: "2025-07-30 16:00:00",
        lttd: 11638.7,
        upz: "2.164",
        wrz: 2.4,
        grz: null
      },
      {
        lttd84: 31.373722,
        stcd: "62701600",
        stnm: "横沙民星",
        lgtd84: 121.829799,
        zstcd: "1030783",
        lgtd: 34497.8,
        tm: "2025-07-30 16:00:00",
        lttd: 15389.6,
        upz: "2.03",
        wrz: 2.4,
        grz: null
      },
      {
        lttd84: 31.358668,
        stcd: "62701560",
        stnm: "长兴跃进港",
        lgtd84: 121.759749,
        zstcd: "1032583",
        lgtd: 27837.5,
        tm: "2025-07-30 16:00:00",
        lttd: 13699.7,
        upz: "2.014",
        wrz: 2.4,
        grz: null
      },
      {
        lttd84: 31.523929,
        stcd: "62701500",
        stnm: "堡镇",
        lgtd84: 121.608215,
        zstcd: "1050181",
        lgtd: 13397.9,
        tm: "2025-07-30 16:00:00",
        lttd: 31994.0,
        upz: "4.3",
        wrz: 4.7,
        grz: 5.65
      },
      {
        lttd84: 31.011597,
        stcd: "13350",
        stnm: "朱枫闸",
        lgtd84: 121.050965,
        zstcd: "1335083",
        lgtd: -39740.4,
        tm: "2025-07-30 16:00:00",
        lttd: -24744.8,
        upz: "2.62",
        wrz: 3.2,
        grz: null
      },
      {
        lttd84: 31.181271,
        stcd: "12200083",
        stnm: "陈墓",
        lgtd84: 120.892236,
        zstcd: "12200083",
        lgtd: -50219.1899,
        tm: "2025-07-30 16:00:00",
        lttd: -2879.4499,
        upz: "3.25",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.379209,
        stcd: "12190083",
        stnm: "昆山",
        lgtd84: 120.96098,
        zstcd: "12190083",
        lgtd: -51292.13,
        tm: "2025-07-30 16:00:00",
        lttd: 15955.1999,
        upz: "3.24",
        wrz: null,
        grz: null
      },
      {
        lttd84: 30.75559,
        stcd: "11500083",
        stnm: "嘉兴",
        lgtd84: 120.700421,
        zstcd: "63301183",
        lgtd: -70448.1299,
        tm: "2025-07-30 16:00:00",
        lttd: -78176.42,
        upz: "3.72",
        wrz: null,
        grz: null
      },
      {
        lttd84: 30.99739,
        stcd: "11150083",
        stnm: "平望",
        lgtd84: 120.635474,
        zstcd: "11150083",
        lgtd: -78314.2401,
        tm: "2025-07-30 16:00:00",
        lttd: -28879.85,
        upz: "3.49",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.119701,
        stcd: "63425700",
        stnm: "祝桥",
        lgtd84: 121.74763,
        zstcd: "1831983",
        lgtd: 26752.3,
        tm: "2025-07-30 16:00:00",
        lttd: -12798.2,
        upz: "2.925",
        wrz: 3.4,
        grz: 3.9
      },
      {
        lttd84: 31.047992,
        stcd: "63425120",
        stnm: "北桥",
        lgtd84: 121.420814,
        zstcd: "1530283",
        lgtd: -4422.5,
        tm: "2025-07-30 16:00:00",
        lttd: -20782.7,
        upz: "3.24",
        wrz: 3.2,
        grz: 3.6
      },
      {
        lttd84: 30.729878,
        stcd: "63405900",
        stnm: "金山嘴",
        lgtd84: 121.367461,
        zstcd: "1970281",
        lgtd: -9546.5,
        tm: "2025-07-30 16:00:00",
        lttd: -56048.8,
        upz: "4.42",
        wrz: 5.4,
        grz: 6.2
      },
      {
        lttd84: 30.861809,
        stcd: "63405800",
        stnm: "芦潮港",
        lgtd84: 121.909317,
        zstcd: "1850281",
        lgtd: 42290.9,
        tm: "2025-07-30 16:00:00",
        lttd: -41339.4,
        upz: "3.62",
        wrz: 4.8,
        grz: 5.4
      },
      {
        lttd84: 31.282336,
        stcd: "63405510",
        stnm: "蕴藻浜西闸",
        lgtd84: 121.18114,
        zstcd: "1250283",
        lgtd: -27235.3,
        tm: "2025-07-30 16:00:00",
        lttd: 5233.8,
        upz: "3.19",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.376229,
        stcd: "63405480",
        stnm: "嘉定南门",
        lgtd84: 121.246201,
        zstcd: "1230483",
        lgtd: -21019.6,
        tm: "2025-07-30 16:00:00",
        lttd: 15630.5,
        upz: "3.092",
        wrz: 3.2,
        grz: 3.87
      },
      {
        lttd84: 31.416836,
        stcd: "63405460",
        stnm: "罗店",
        lgtd84: 121.333731,
        zstcd: "1130283",
        lgtd: -12686.4,
        tm: "2025-07-30 16:00:00",
        lttd: 20118.9,
        upz: "3.068",
        wrz: 3.1,
        grz: 3.87
      },
      {
        lttd84: 31.351473,
        stcd: "63405300",
        stnm: "望新",
        lgtd84: 121.141555,
        zstcd: "1230383",
        lgtd: -30979.7,
        tm: "2025-07-30 16:00:00",
        lttd: 12908.8,
        upz: "3.125",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.24459,
        stcd: "63405290",
        stnm: "苏州河闸桥（外）",
        lgtd84: 121.486498,
        zstcd: "2050181",
        lgtd: 1842.9,
        tm: "2025-07-30 16:00:00",
        lttd: 1013.7,
        upz: "4.58",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.228414,
        stcd: "63405200",
        stnm: "曹家渡",
        lgtd84: 121.417,
        zstcd: "2060481",
        lgtd: -4777.9,
        tm: "2025-07-30 16:00:00",
        lttd: -778.9,
        upz: "4.62",
        wrz: 3.7,
        grz: null
      },
      {
        lttd84: 31.222475,
        stcd: "63405150",
        stnm: "北新泾",
        lgtd84: 121.372071,
        zstcd: "2060181",
        lgtd: -9059.5,
        tm: "2025-07-30 16:00:00",
        lttd: -1434.2,
        upz: "4.55",
        wrz: 3.7,
        grz: 4.25
      },
      {
        lttd84: 31.264804,
        stcd: "63405100",
        stnm: "黄渡",
        lgtd84: 121.229029,
        zstcd: "1230283",
        lgtd: -22677.7,
        tm: "2025-07-30 16:00:00",
        lttd: 3279.1,
        upz: "4.318",
        wrz: 3.6,
        grz: 4.1
      },
      {
        lttd84: 31.269464,
        stcd: "63405000",
        stnm: "赵屯",
        lgtd84: 121.063278,
        zstcd: "1330383",
        lgtd: -38464.0,
        tm: "2025-07-30 16:00:00",
        lttd: 3839.9,
        upz: "3.878",
        wrz: 3.5,
        grz: 4.0
      },
      {
        lttd84: 31.295719,
        stcd: "63404970",
        stnm: "赵桥",
        lgtd84: 121.631244,
        zstcd: "1630783",
        lgtd: 15622.6,
        tm: "2025-07-30 16:00:00",
        lttd: 6694.4,
        upz: "3.09",
        wrz: 3.2,
        grz: null
      },
      {
        lttd84: 30.920179,
        stcd: "63404902",
        stnm: "奉城",
        lgtd84: 121.637903,
        zstcd: "1730983",
        lgtd: 16322.0,
        tm: "2025-07-30 16:00:00",
        lttd: -34940.9,
        upz: "2.75",
        wrz: 3.3,
        grz: null
      },
      {
        lttd84: 30.934044,
        stcd: "63404830",
        stnm: "书院",
        lgtd84: 121.855367,
        zstcd: "1831283",
        lgtd: 37103.4,
        tm: "2025-07-30 16:00:00",
        lttd: -33349.6,
        upz: "2.72",
        wrz: 3.3,
        grz: null
      },
      {
        lttd84: 31.298359,
        stcd: "63404770",
        stnm: "江湾",
        lgtd84: 121.47482,
        zstcd: "2060581",
        lgtd: 730.0,
        tm: "2025-07-30 16:00:00",
        lttd: 6975.1,
        upz: "3.75",
        wrz: 3.5,
        grz: 4.44
      },
      {
        lttd84: 31.216593,
        stcd: "63404750",
        stnm: "新泾闸",
        lgtd84: 121.370207,
        zstcd: "2030783",
        lgtd: -9237.6,
        tm: "2025-07-30 16:00:00",
        lttd: -2086.5,
        upz: "3.17",
        wrz: 3.15,
        grz: null
      },
      {
        lttd84: 31.282758,
        stcd: "63404740",
        stnm: "抚顺路桥",
        lgtd84: 121.510714,
        zstcd: "2060781",
        lgtd: 4148.1,
        tm: "2025-07-30 16:00:00",
        lttd: 5246.4,
        upz: "3.426",
        wrz: 3.3,
        grz: null
      },
      {
        lttd84: 31.167666,
        stcd: "63404730",
        stnm: "三江路桥",
        lgtd84: 121.435637,
        zstcd: "2030583",
        lgtd: -3004.4,
        tm: "2025-07-30 16:00:00",
        lttd: -7514.9,
        upz: "3.08",
        wrz: 3.2,
        grz: null
      },
      {
        lttd84: 31.278608,
        stcd: "63404710",
        stnm: "志丹泵站",
        lgtd84: 121.433893,
        zstcd: "2030283",
        lgtd: -3167.3,
        tm: "2025-07-30 16:00:00",
        lttd: 4785.6,
        upz: "3.86",
        wrz: 3.5,
        grz: null
      },
      {
        lttd84: 31.171306,
        stcd: "63404700",
        stnm: "虹桥",
        lgtd84: 121.37704,
        zstcd: "1530383",
        lgtd: -8590.1,
        tm: "2025-07-30 16:00:00",
        lttd: -7108.2,
        upz: "3.33",
        wrz: 3.2,
        grz: null
      },
      {
        lttd84: 30.860881,
        stcd: "63404650",
        stnm: "中港闸",
        lgtd84: 121.731604,
        zstcd: "1740183",
        lgtd: 25293.8,
        tm: "2025-07-30 16:00:00",
        lttd: -41496.6,
        upz: "2.69",
        wrz: null,
        grz: null
      },
      {
        lttd84: 30.981465,
        stcd: "63404600",
        stnm: "大团闸",
        lgtd84: 121.739455,
        zstcd: "1832383",
        lgtd: 26013.7,
        tm: "2025-07-30 15:55:00",
        lttd: -28126.8,
        upz: "2.77",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.114203,
        stcd: "63404595",
        stnm: "周浦",
        lgtd84: 121.569723,
        zstcd: "1831583",
        lgtd: 9784.3,
        tm: "2025-07-30 16:00:00",
        lttd: -13438.1,
        upz: "2.98",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.163968,
        stcd: "63404582",
        stnm: "杨思闸",
        lgtd84: 121.472512,
        zstcd: "1670281",
        lgtd: 511.3,
        tm: "2025-07-30 16:00:00",
        lttd: -7925.3,
        upz: "4.53",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.229812,
        stcd: "63404572",
        stnm: "三甲港闸",
        lgtd84: 121.771098,
        zstcd: "1680181",
        lgtd: 28957.0,
        tm: "2025-07-30 16:00:00",
        lttd: -585.1,
        upz: "4.13",
        wrz: 4.9,
        grz: null
      },
      {
        lttd84: 31.068461,
        stcd: "63404565",
        stnm: "杜行",
        lgtd84: 121.533867,
        zstcd: "1530483",
        lgtd: 6367.8,
        tm: "2025-07-30 16:00:00",
        lttd: -18512.4,
        upz: "2.95",
        wrz: 3.3,
        grz: null
      },
      {
        lttd84: 31.020656,
        stcd: "63404560",
        stnm: "大治河西闸",
        lgtd84: 121.495159,
        zstcd: "1550181",
        lgtd: 2674.8,
        tm: "2025-07-30 16:00:00",
        lttd: -23814.1,
        upz: "4.45",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.015652,
        stcd: "63404554",
        stnm: "新场",
        lgtd84: 121.641124,
        zstcd: "1840383",
        lgtd: 16613.0,
        tm: "2025-07-30 15:50:00",
        lttd: -24356.2,
        upz: "2.799",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.006855,
        stcd: "63404540",
        stnm: "大治河东闸",
        lgtd84: 121.883516,
        zstcd: "1840283",
        lgtd: 39761.6,
        tm: "2025-07-30 15:55:00",
        lttd: -25269.9,
        upz: "2.71",
        wrz: null,
        grz: null
      },
      {
        lttd84: 30.82897,
        stcd: "63404530",
        stnm: "金汇港南闸",
        lgtd84: 121.524556,
        zstcd: "1730283",
        lgtd: 5493.4,
        tm: "2025-07-30 16:00:00",
        lttd: -45065.0,
        upz: "2.81",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.008151,
        stcd: "63404510",
        stnm: "金汇港北闸",
        lgtd84: 121.486194,
        zstcd: "1750181",
        lgtd: 1819.1,
        tm: "2025-07-30 16:00:00",
        lttd: -25200.8,
        upz: "4.43",
        wrz: null,
        grz: null
      },
      {
        lttd84: 30.915412,
        stcd: "63404500",
        stnm: "南桥",
        lgtd84: 121.444784,
        zstcd: "1730483",
        lgtd: -2137.2,
        tm: "2025-07-30 16:00:00",
        lttd: -35482.6,
        upz: "3",
        wrz: 3.3,
        grz: null
      },
      {
        lttd84: 30.988504,
        stcd: "63404400",
        stnm: "沙港（二）",
        lgtd84: 121.390251,
        zstcd: "1770181",
        lgtd: -7344.7,
        tm: "2025-07-30 16:00:00",
        lttd: -27376.9,
        upz: "4.25",
        wrz: 4.3,
        grz: 4.75
      },
      {
        lttd84: 31.108209,
        stcd: "63404251",
        stnm: "淀浦河西闸",
        lgtd84: 121.008901,
        zstcd: "1360581",
        lgtd: -43714.5,
        tm: "2025-07-30 16:00:00",
        lttd: -14019.0,
        upz: "3.5",
        wrz: null,
        grz: null
      },
      {
        lttd84: 31.09391,
        stcd: "63404100",
        stnm: "陈坊桥",
        lgtd84: 121.178993,
        zstcd: "1430383",
        lgtd: -27492.9,
        tm: "2025-07-30 16:00:00",
        lttd: -15657.6,
        upz: "3.21",
        wrz: 3.2,
        grz: 3.6
      },
      {
        lttd84: 31.117438,
        stcd: "63404000",
        stnm: "青浦南门",
        lgtd84: 121.118352,
        zstcd: "1330183",
        lgtd: -33271.8,
        tm: "2025-07-30 16:00:00",
        lttd: -13032.6,
        upz: "3.11",
        wrz: 3.3,
        grz: 3.75
      },
      {
        lttd84: 31.116349,
        stcd: "63403800",
        stnm: "商榻",
        lgtd84: 120.917189,
        zstcd: "1330483",
        lgtd: -52460.8,
        tm: "2025-07-30 16:00:00",
        lttd: -13076.7,
        upz: "3.26",
        wrz: 3.4,
        grz: 3.5
      },
      {
        lttd84: 31.020453,
        stcd: "63403200",
        stnm: "金泽",
        lgtd84: 120.896868,
        zstcd: "1360181",
        lgtd: -54452.5,
        tm: "2025-07-30 16:00:00",
        lttd: -23697.8,
        upz: "3.39",
        wrz: 3.55,
        grz: null
      }
    ],
    "dataSize": 0,
    "pageSize": 0,
    "message": "操作成功",
    "isSuccess": true,
    "pageTotal": 0,
    "pageIndex": 0,
    "elapseTime": 64,
    "expand": null
  }
      var strJson = groupBy(res.result, 'stcd');
      const resultList = [];
      if (strJson.length > 0) {
        for (let num = 0; num < strJson.length; num++) {
          let itemList = strJson[num][0];
          if (typeValue.value == 1) {
            if (SetNull(itemList["tm"]) !== "") {
              itemList["colorCss"] = "";
              let one_flag = true;
              if (SetNull(itemList["wrz"]) !== "") {
                let chaWrz = Number(itemList["upz"]) - Number(itemList["wrz"]);
                if (chaWrz > 0) {
                  itemList["colorCss"] = "#F9C33D";
                  one_flag = false;
                }
              }

              if (SetNull(itemList["grz"]) !== "") {
                let chaGrz = Number(itemList["upz"]) - Number(itemList["grz"]);
                if (chaGrz > 0) {
                  itemList["colorCss"] = "#F70019";
                  one_flag = false;
                }
              }
              if (one_flag == true) {
                resultList.push(itemList);
              }
            }
          }
          else if (typeValue.value == 2) {
            if (SetNull(itemList["tm"]) !== "") {
              if (SetNull(itemList["wrz"]) !== "") {
                let chaWrz = Number(itemList["upz"]) - Number(itemList["wrz"]);
                if (chaWrz > 0) {
                  itemList["colorCss"] = "#F9C33D";
                  resultList.push(itemList);
                }
              }

              // if (SetNull(itemList["grz"]) !== "") {
              //   let chaGrz = Number(itemList["upz"]) - Number(itemList["grz"]);
              //   if (chaGrz > 0) {
              //     itemList["colorCss"] = "#F70019";
              //     resultList.push(itemList);
              //   }
              // }

            }
          }
             else if (typeValue.value == 3) {
            if (SetNull(itemList["tm"]) !== "") {
              // if (SetNull(itemList["wrz"]) !== "") {
              //   let chaWrz = Number(itemList["upz"]) - Number(itemList["wrz"]);
              //   if (chaWrz > 0) {
              //     itemList["colorCss"] = "#F9C33D";
              //     resultList.push(itemList);
              //   }
              // }

              if (SetNull(itemList["grz"]) !== "") {
                let chaGrz = Number(itemList["upz"]) - Number(itemList["grz"]);
                if (chaGrz > 0) {
                  itemList["colorCss"] = "#F70019";
                  resultList.push(itemList);
                }
              }

            }
          }
          else if (typeValue.value == 4) {
            if (SetNull(itemList["tm"]) === "") {
              itemList["colorCss"] = "#FFFFFF";
              resultList.push(itemList);
            }
          }
        }
      }

      var result = [];
      for (var num = 0; num < resultList.length; num++) {
        var item = resultList[num];
        var wrz = item.wrz != undefined ? Number(item.wrz).toFixed(2) : "—";
        var grz = item.grz != undefined ? Number(item.grz).toFixed(2) : "—";
        var upz = item.upz != undefined ? Number(item.upz).toFixed(2) : "—";
        let strParam = {
          num: num + 1,
          stnm: item.stnm,
          colorCss: item.colorCss,
          upz: upz,
          wrz: wrz,
          grz: grz,
          hnnm: item.hnnm,
          rvnm: item.rvnm,
          mtype: Getmtype(item.mtype),
        }
        result.push(strParam);
        tableData.value = result;
      }
    // })
    // .catch((err) => { });
}
onMounted(() => {
  Weacontent();
});
</script>
<style scoped>
.tableYQ {
  width: 100%;
  /* table-layout: fixed; */
  margin-top: 0rem;
  margin: 0 auto;
  /* 表格里面显示省略号必须加fixed，td设置的宽度会失效，宽度限定写在th中*/
}

.tableYQ tr {
  height: 38px;
  line-height: 38px;
}

.tableYQ tr th {
  font-size: 0.8rem;
  color: var(--popupContentTitleColor);
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
</style>
