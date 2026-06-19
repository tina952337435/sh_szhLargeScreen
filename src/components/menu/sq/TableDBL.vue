<template>
  <div class="m-box" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">数据到报率(今日8时)</p>
    </div>
    <div class="txt" style="height: calc(calc(100vh - 44.225rem) * (2 / 6));">
      <div class="flex_1 maiweid display_flex mhpad1 flex-wrap justify-content_flex-justify"
        style="width: 94%; margin: 0.6rem auto 0px">
        <div class="ztitem ztitem1ps display_flex flex-direction_column">
          <div class="ztitemtit ztitemtit1 maiweid display_flex justify-content_flex-center align-items_center">
            雨量
          </div>
          <div
            class="flex_1 maiweid display_flex flex-direction_column justify-content_flex-center align-items_center hand">
            <div class="yjtxtcon">
              <span class="yjbigtxt def1ff" ref="WRZColor" @click="SQtable('SWwrzCount')"
                style="color: #0cdc0c;">100</span>%
            </div>
          </div>
        </div>
        <div class="ztitem ztitem1ps display_flex flex-direction_column">
          <div class="ztitemtit ztitemtit1 maiweid display_flex justify-content_flex-center align-items_center">
            水位
          </div>
          <div
            class="flex_1 maiweid display_flex flex-direction_column justify-content_flex-center align-items_center hand">
            <div class="yjtxtcon">
              <span class="yjbigtxt def1ff" ref="nullColor" @click="SQtable('SWgrzCount')" style="color: #0cdc0c;">
                100</span>%
            </div>
          </div>
        </div>
        <div class="ztitem ztitem1ps display_flex flex-direction_column">
          <div class="ztitemtit ztitemtit1 maiweid display_flex justify-content_flex-center align-items_center">
            工程
          </div>
          <div
            class="flex_1 maiweid display_flex flex-direction_column justify-content_flex-center align-items_center hand">
            <div class="yjtxtcon">
              <span class="yjbigtxt def1ff" ref="WRZColor" @click="SQtable('zcCount')"
                style="color: #0cdc0c;">100</span>%
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableDBL />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/Table.css';
import ComZujian from "@/components/ComZujian.vue";
import TableSWJC from "@/components/menu/sq/TableSWJC.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { useStore } from 'vuex'
import Dialog from "@/api/utils/Dialog.js";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";

const store = useStore();
const { viewer } = store.state;
const datekey = ref(null);
const tableHeaders = ref([
  { name: "stnm", label: "名称" },
  { name: "upz", label: "水位(m)" },
  { name: "wrz", label: "警戒(m)" },
  { name: "wrzCha", label: "超警(m)" },
  { name: "tm", label: "时间" },
]);
const tableData = ref([]);
const tableDataAll = ref([]);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const stime = ref({});
const etime = ref({});

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = "20241025000002";
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  // api.stPptnWater(strParam).then((res) => {
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
  var strJson = res.result;
  var result = [];
  for (var num = 0; num < strJson.length; num++) {
    var item = strJson[num];
    var wrz = item.wrz != undefined ? Number(item.wrz).toFixed(2) : "—";
    var grz = item.grz != undefined ? Number(item.grz).toFixed(2) : "—";
    var upz = item.upz != undefined ? Number(item.upz).toFixed(2) : "—";
    var wrzCha = "—";
    var colorCss = "";
    if (wrz != "—" && upz != "—") {
      wrzCha = Number(Number(upz) - Number(wrz)).toFixed(2);
      if (Number(wrzCha) > 0) {
        colorCss = "#F9C33D";
      }
    }

    if (grz != "—" && upz != "—") {
      if (Number(Number(upz) - Number(grz)).toFixed(2) > 0) {
        colorCss = "#F70019";
      }
    }

    var tm = "—";
    if (item.tm != undefined) {
      tm = dayjs(item.tm).format("HH:mm");
    }
    var _strParam = {};
    _strParam["stnm"] = SetNull(item["stnm"]).replaceAll(" ", "");
    _strParam["upz"] = upz;
    _strParam["wrz"] = wrz;
    _strParam["grz"] = grz;
    _strParam["wrzCha"] = wrzCha;
    _strParam["tm"] = tm;
    _strParam["stcd"] = item.stcd;
    _strParam["lgtd"] = item.lgtd84;
    _strParam["lttd"] = item.lttd84;
    _strParam["colorCss"] = colorCss;
    _strParam["mtype"] = item.mtype;
    _strParam["q"] = item.q;
    _strParam["dwz"] = item.dwz;
    _strParam["BZtm"] = item.tm;
    result.push(_strParam);
    // result.push([item.stnm, upz, grz, wrzCha, tm]);
    tableData.value = result;
    tableDataAll.value = result;
  }
  // }).catch((err) => { });
}
const emit = defineEmits(['parentMethodshowDynamicLayers']);
function handleclick(evt) {
  const name = evt.target.innerText;
  const strJson = tableData.value.find(item => item.stnm === name);
  if (SetNull(strJson["lgtd"]) == "" && SetNull(strJson["lttd"]) == "") {
    ElMessage.error("缺少经纬度坐标");
  }
  else {
    let _lgtd = Number(strJson["lgtd"]);
    let _lttd = Number(strJson["lttd"]);
    var evt = [_lgtd, _lttd];
    emit("parentMethodshowDynamicLayers", evt);
  }
  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/sq/SQLine.vue")
  );
  const props = {};
  props["stcd"] = strJson["stcd"];
  props["stime"] = stime.value;
  props["etime"] = etime.value;
  props["mtype"] = strJson["mtype"];
  //ChildVue为弹窗中嵌入的slot
  Dialog.open({ title: strJson["stnm"] + "水位过程线", widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
}
const searchKey = ref('')
function handleSearch(evt) {
  searchKey.value = evt;
  tableData.value = tableDataAll.value.filter(function (e) {
    return (e.stnm).includes(evt) == true;
  })
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
}
onMounted(() => {
  var nowTM = new Date();
  etime.value = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  if (Number(dayjs(nowTM).format("HH")) > 7) {
    stime.value = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  }
  else {
    stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  Weacontent();
});
</script>
<style scoped>
.widget-inline-box {
  text-align: center;
  color: var(--widgetcolor);
  width: 50%;
  padding: 10% 0;
  text-align: center;
  font-size: 14px;
  float: left;
  overflow: hidden;
  width: 23.5%;
  margin: 0 0.4%;
  background: rgba(1, 202, 217, 0.2);
  padding: 1% 0;
  height: 50%;
}

.def1ff {
  color: var(--def1ff);
  cursor: pointer;
  font-size: 26px;
}

.ztitem1ps {
  width: 32%;
  height: 40%;
}

.ztitemtit {
  height: 2.2rem;
  line-height: 2.2rem;
  font-weight: bold;
  color: #ddd;
  text-align: center;
  font-size: 14px;
}

.justify-content_flex-justify {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}

.yjtxtcon {
  text-align: center;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  vertical-align: bottom;
  color: var(--def1ff);
  font-size: 1.2rem;
}

.yjbigtxt {
  font-size: 1.8rem;
  font-family: shufont1;
  font-weight: bold;
}

.display_flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.flex-direction_column {
  -webkit-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  -moz-flex-direction: column;
  -o-flex-direction: column;
}

.ztitemtit1 {
  background: var(--ztitemtit1);
}

.maiweid {
  width: 100%;
  box-sizing: border-box;
}

.liuyupjbg {
  height: 100%;
  background: var(--liuyupjbg);
  background-size: 100% 100%;
}

.liuyupjbg p {
  margin-top: 8px;
}

/* 放大开始 */
.dialog-content .widget-inline-box {
  font-size: 1rem !important;
}

.dialog-content .widget-inline-box p {
  padding-top: 50px;
}

.dialog-content .widget-inline-box h3 {
  padding-top: 60px;
  font-size: 50px;
}

.dialog-content .ztitemtit {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
}

.dialog-content .yjbigtxt {
  font-size: 36px;
}

/* 放大结束 */
</style>
