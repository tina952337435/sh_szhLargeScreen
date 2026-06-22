<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">昨日雨情统计</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <div class="m-list4 box-siz" style="width: 94%; margin: 0px auto">
        <div class="widget-inline-box text-center fl">
          <p>&lt;25<br />(小~中雨)</p>
          <h3 class="def1ff" ref="Color25" style="height: 50px; line-height: 26px" @click="YQtable('count25')">
            {{ count25 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>25~50<br />(大雨)</p>
          <h3 class="def1ff" ref="Color50" style="height: 50px; line-height: 26px" @click="YQtable('count50')">
            {{ count50 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>50~100<br />(暴雨)</p>
          <h3 class="def1ff" ref="Color100" style="height: 50px; line-height: 26px" @click="YQtable('count100')">
            {{ count100 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>100~250<br />(大暴雨)</p>
          <h3 class="def1ff" ref="Color250" style="height: 50px; line-height: 26px" @click="YQtable('count250')">
            {{ count250 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>&gt;250<br />(特大暴雨)</p>
          <h3 class="def1ff" ref="ColorBig" style="height: 50px; line-height: 26px" @click="YQtable('countBig')">
            {{ countBig }}
          </h3>
        </div>
        <div class="widget-ylTable-box">
          <div class="liuyupjbg1">
            <p style="
                color: var(--mtablecolor);
                font-weight: bold;
                font-size: 12px;
                height: 100%;
                line-height: 2;
              ">
              最大<br />雨量<br />(mm)
            </p>
          </div>
          <div v-for="(item, index) in drpList" :key="index" style="cursor: pointer" :title="item.stnm" class="liuyupjbg"
            @click="YQline(item.stcd, item.stnm, item.mtype)">
            <p style="height: 30px; font-size: 14px; font-weight: bold">
              {{ item.stnmName }}
            </p>
            <h3 class="c24c9ff;font-size:20px;">{{ item.drp.toFixed(1) }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <MyDialog :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px" v-if="shuju === 'YQ'">
    <YQTJ :typenameRadio="props.typenameRadio" />
  </MyDialog>
  <MyDialog :showDialog="showDialogLine" @close="showDialogLine = false" :title="titleNameLine"
    style="width: 70%; height: 700px" v-else="shuju === 'Line'">
    <YQLine :stcd="stcdValue" :mtype="mtypeValue" :stime="stime" :etime="etime" />
  </MyDialog>
  <ComZujian :showDialog="showDialogZJ" @close="showDialogZJ = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <YesterdayYQTJ :typenameRadio="props.typenameRadio" />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import YQTJ from "@/components/danzhan/yq/YQTJ.vue";
import YQLine from "@/components/danzhan/yq/YQLine.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ElMessage } from "element-plus";
import { sortObjectArray, SetNull, groupBy, Getmtype } from "@/api/ComUnit.js";

import {
  onMounted,
  ref,
  shallowRef,
  defineAsyncComponent,
  nextTick,
  provide,
} from "vue";
const drpList = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showDialogLine = ref(false);
const showDialogZJ = ref(false);
const shuju = ref();
// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();
// 传递雨型的类别：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const typeValue = ref();
const stcdValue = ref();
const mtypeValue = ref();
const stcdstime = ref();
const stcdetime = ref();

const count25 = ref(0),
  count50 = ref(0),
  count100 = ref(0),
  count250 = ref(0),
  countBig = ref(0),
  zcCount = ref(0),
  wrzCount = ref(0),
  grzCount = ref(0),
  nullCount = ref(0);
// 判断颜色变化
const Color25 = ref(),
  Color50 = ref(),
  Color100 = ref(),
  Color250 = ref(),
  ColorBig = ref(),
  WRZColor = ref(),
  ZCColor = ref(),
  nullColor = ref();

const pid = ref("20241030000002");
const stime = ref({});
const etime = ref({});
const strJsonData = ref({});
const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
});
function Weacontent() {
  // 8时雨情
  var strWhere = {};
  strWhere["pid"] = pid.value;
  strWhere["stime"] = stime.value;
  strWhere["etime"] = etime.value;
  strWhere["pathname"] = "SUM";
  if (props.typenameRadio == '2') {
    strWhere["datasource"] = "QX";
  }
  else if (props.typenameRadio == '3') {
    strWhere["datasource"] = "BX";
  }
  else if (props.typenameRadio == '4') {
    strWhere["datasource"] = "YC";
  }
  //
  // api
  //   .stPptnRain(strWhere)
  //   .then((res) => {
     var res={
    "total": 366,
    "result": [
        {
            drp: "100.0",
            stcd: "63422480",
            stnm: "兴塔",
            lgtd: -36341.5,
            lttd: -41940.1
        },
        {
            drp: "99.5",
            stcd: "63403180",
            stnm: "东风港闸（外）",
            lgtd: -21844.3,
            lttd: 2725.8
        },
        {
            drp: "91.5",
            stcd: "63403170",
            stnm: "东大盈闸",
            lgtd: -30373.8,
            lttd: 4270.9
        },
        {
            drp: "89.0",
            stcd: "63403160",
            stnm: "油墩港闸",
            lgtd: -28133.1,
            lttd: -29674.4
        },
        {
            drp: "119.0",
            stcd: "63403140",
            stnm: "华田泾闸",
            lgtd: -35277.2,
            lttd: -23558.7
        },
        {
            drp: "139.0",
            stcd: "63403120",
            stnm: "莲盛",
            lgtd: -46341.8,
            lttd: -20829.8
        },
        {
            drp: "128.0",
            stcd: "63403100",
            stnm: "泖甸",
            lgtd: -40127.6,
            lttd: -20273.1
        },
        {
            drp: "143.5",
            stcd: "63402950",
            stnm: "河祝",
            lgtd: -45249.6,
            lttd: -16834.0
        },
        {
            drp: "132.8",
            stcd: "63402920",
            stnm: "蒸淀",
            lgtd: -42197.4,
            lttd: -28484.2
        },
        {
            drp: "134.0",
            stcd: "63402910",
            stnm: "东团",
            lgtd: -41303.7,
            lttd: -30295.0
        },
        {
            drp: "86.0",
            stcd: "63402700",
            stnm: "夏字圩",
            lgtd: -29914.7,
            lttd: -29125.8
        },
        {
            drp: "48.0",
            stcd: "63402620",
            stnm: "茹塘",
            lgtd: -34871.8,
            lttd: -33225.6
        },
        {
            drp: "75.0",
            stcd: "63402600",
            stnm: "三角渡",
            lgtd: -30801.1,
            lttd: -30107.3
        },
        {
            drp: "146.0",
            stcd: "63402500",
            stnm: "枫围",
            lgtd: -44373.5,
            lttd: -36801.8
        },
        {
            drp: "128.0",
            stcd: "63402480",
            stnm: "南庄",
            lgtd: -41471.6,
            lttd: -32054.2
        },
        {
            drp: "90.0",
            stcd: "63402450",
            stnm: "蒋古渡",
            lgtd: -30774.8,
            lttd: -42655.8
        },
        {
            drp: "102.5",
            stcd: "63402390",
            stnm: "马家宅",
            lgtd: -32187.6,
            lttd: -49497.1
        },
        {
            drp: "101.0",
            stcd: "63402300",
            stnm: "洙泾",
            lgtd: -27880.7,
            lttd: -37436.8
        },
        {
            drp: "103.5",
            stcd: "63402200",
            stnm: "泖港",
            lgtd: -24391.2,
            lttd: -33933.3
        },
        {
            drp: "91.5",
            stcd: "63401900",
            stnm: "张堰（二）",
            lgtd: -16386.5,
            lttd: -50589.0
        },
        {
            drp: "98.0",
            stcd: "63401850",
            stnm: "紫石泾闸",
            lgtd: -19165.2,
            lttd: -31087.2
        },
        {
            drp: "46.5",
            stcd: "63401750",
            stnm: "吴淞口",
            lgtd: 3047.8,
            lttd: 16271.1
        },
        {
            drp: "73.0",
            stcd: "63401500",
            stnm: "黄浦公园",
            lgtd: 1866.7,
            lttd: 858.9
        },
        {
            drp: "91.0",
            stcd: "63401120",
            stnm: "松浦大桥",
            lgtd: -15362.8,
            lttd: -29465.6
        },
        {
            drp: "100.5",
            stcd: "63401100",
            stnm: "米市渡",
            lgtd: -22033.8,
            lttd: -30020.4
        },
        {
            drp: "120.0",
            stcd: "62724660",
            stnm: "陈家镇新城",
            lgtd: 34957.2,
            lttd: 31773.2
        },
        {
            drp: "127.5",
            stcd: "62724655",
            stnm: "建设浜西",
            lgtd: 908.1,
            lttd: 44901.8
        },
        {
            drp: "140.5",
            stcd: "62724650",
            stnm: "庙镇庙中",
            lgtd: -11569.3,
            lttd: 53839.7
        },
        {
            drp: "132.0",
            stcd: "62724645",
            stnm: "崇明新城",
            lgtd: -4485.6,
            lttd: 44350.2
        },
        {
            drp: "130.0",
            stcd: "62724641",
            stnm: "向化万龙",
            lgtd: 24516.6,
            lttd: 32486.5
        },
        {
            drp: "118.5",
            stcd: "62724635",
            stnm: "崇明南门",
            lgtd: -5706.5,
            lttd: 41858.5
        },
        {
            drp: "152.0",
            stcd: "62724625",
            stnm: "牛棚港",
            lgtd: -22905.3,
            lttd: 66352.3
        },
        {
            drp: "109.0",
            stcd: "62724610",
            stnm: "堡镇港北闸",
            lgtd: 20329.3,
            lttd: 44113.5
        },
        {
            drp: "105.5",
            stcd: "62701710",
            stnm: "高桥（二）",
            lgtd: 7949.3,
            lttd: 16552.4
        },
        {
            drp: "65.5",
            stcd: "62701650",
            stnm: "九段沙",
            lgtd: 40763.1,
            lttd: -3271.1
        },
        {
            drp: "120.0",
            stcd: "62701640",
            stnm: "横沙兴隆",
            lgtd: 35901.5,
            lttd: 8492.0
        },
        {
            drp: "105.5",
            stcd: "62701635",
            stnm: "横沙东海",
            lgtd: 37790.0,
            lttd: 11423.4
        },
        {
            drp: "119.5",
            stcd: "62701620",
            stnm: "横沙新民",
            lgtd: 35290.0,
            lttd: 11638.7
        },
        {
            drp: "101.0",
            stcd: "62701600",
            stnm: "横沙民星",
            lgtd: 34497.8,
            lttd: 15389.6
        },
        {
            drp: "128.0",
            stcd: "62701560",
            stnm: "长兴跃进港",
            lgtd: 27837.5,
            lttd: 13699.7
        },
        {
            drp: "117.0",
            stcd: "62701550",
            stnm: "马家港",
            lgtd: 20511.1,
            lttd: 16178.7
        },
        {
            drp: "135.0",
            stcd: "62701540",
            stnm: "长兴十年圩",
            lgtd: 20243.3,
            lttd: 20658.3
        },
        {
            drp: "108.5",
            stcd: "62701530",
            stnm: "长兴西小洪",
            lgtd: 17739.0,
            lttd: 20707.1
        },
        {
            drp: "117.5",
            stcd: "62701520",
            stnm: "长兴创建北",
            lgtd: 13853.6,
            lttd: 23172.0
        },
        {
            drp: "159.5",
            stcd: "62701500",
            stnm: "堡镇",
            lgtd: 13397.9,
            lttd: 31994.0
        },
        {
            drp: "138.0",
            stcd: "62701460",
            stnm: "陈家镇朝阳",
            lgtd: 31329.6,
            lttd: 27508.8
        },
        {
            drp: "99.0",
            stcd: "62701455",
            stnm: "农业园区",
            lgtd: 31543.0,
            lttd: 39250.0
        },
        {
            drp: "123.0",
            stcd: "62701450",
            stnm: "光明桥",
            lgtd: 15190.9,
            lttd: 34790.4
        },
        {
            drp: "128.0",
            stcd: "62701445",
            stnm: "大新镇",
            lgtd: 11523.0,
            lttd: 42232.5
        },
        {
            drp: "99.5",
            stcd: "62701440",
            stnm: "东平",
            lgtd: 8005.4,
            lttd: 51613.4
        },
        {
            drp: "120.5",
            stcd: "62701435",
            stnm: "新河金桥",
            lgtd: 4931.7,
            lttd: 40110.5
        },
        {
            drp: "154.0",
            stcd: "62701430",
            stnm: "港西团结",
            lgtd: -5804.8,
            lttd: 47928.0
        },
        {
            drp: "128.5",
            stcd: "62701425",
            stnm: "北鸽龙",
            lgtd: 0.0,
            lttd: 0.0
        },
        {
            drp: "150.0",
            stcd: "62701420",
            stnm: "南鸽龙",
            lgtd: -11752.3,
            lttd: 49429.2
        },
        {
            drp: "140.5",
            stcd: "62701415",
            stnm: "草棚镇",
            lgtd: -16832.9,
            lttd: 56261.4
        },
        {
            drp: "153.0",
            stcd: "62701410",
            stnm: "新海水厂",
            lgtd: -16749.1,
            lttd: 66009.3
        },
        {
            drp: "143.0",
            stcd: "62701405",
            stnm: "永隆沙",
            lgtd: 0.0,
            lttd: 0.0
        },
        {
            drp: "164.5",
            stcd: "62701402",
            stnm: "崇西闸",
            lgtd: -25903.8,
            lttd: 58282.9
        },
        {
            drp: "130.0",
            stcd: "62701400",
            stnm: "新建",
            lgtd: -24257.5,
            lttd: 56316.0
        },
        {
            drp: "109.0",
            stcd: "20320",
            stnm: "淞发路桥",
            lgtd: 2262.9,
            lttd: 12085.5
        },
        {
            drp: "117.0",
            stcd: "20310",
            stnm: "国和泵站",
            lgtd: 6355.8,
            lttd: 8453.5
        },
        {
            drp: "92.0",
            stcd: "20309",
            stnm: "虎林公园",
            lgtd: -1528.9,
            lttd: 12236.1
        },
        {
            drp: "117.0",
            stcd: "20308",
            stnm: "凉城新村",
            lgtd: -810.0,
            lttd: 6799.3
        },
        {
            drp: "121.0",
            stcd: "20136",
            stnm: "四平路街道",
            lgtd: 3575.8,
            lttd: 4949.0
        },
        {
            drp: "108.0",
            stcd: "20135",
            stnm: "江浦路街道",
            lgtd: 4370.6,
            lttd: 3637.7
        },
        {
            drp: "100.5",
            stcd: "20134",
            stnm: "平凉路街道",
            lgtd: 5571.7,
            lttd: 3155.6
        },
        {
            drp: "131.5",
            stcd: "20133",
            stnm: "石泉路街道",
            lgtd: -4226.9,
            lttd: 1957.4
        },
        {
            drp: "116.5",
            stcd: "20132",
            stnm: "临汾路街道",
            lgtd: -1104.0,
            lttd: 8512.3
        },
        {
            drp: "99.0",
            stcd: "20131",
            stnm: "大宁路街道",
            lgtd: -1395.2,
            lttd: 5679.1
        },
        {
            drp: "115.5",
            stcd: "20130",
            stnm: "芷江西路街道",
            lgtd: -700.3,
            lttd: 2733.1
        },
        {
            drp: "107.0",
            stcd: "20129",
            stnm: "宝山路街道",
            lgtd: 82.8,
            lttd: 2961.1
        },
        {
            drp: "105.0",
            stcd: "20128",
            stnm: "曹家渡街道",
            lgtd: -3715.7,
            lttd: -668.7
        },
        {
            drp: "119.5",
            stcd: "20127",
            stnm: "南京西路街道",
            lgtd: -1828.5,
            lttd: -1196.1
        },
        {
            drp: "100.0",
            stcd: "20126",
            stnm: "江宁路街道",
            lgtd: -2282.8,
            lttd: 702.0
        },
        {
            drp: "115.0",
            stcd: "20125",
            stnm: "仙霞路街道",
            lgtd: -7319.9,
            lttd: -3260.5
        },
        {
            drp: "107.0",
            stcd: "20124",
            stnm: "新华路街道",
            lgtd: -4353.9,
            lttd: -3152.3
        },
        {
            drp: "87.5",
            stcd: "20123",
            stnm: "枫林路街道",
            lgtd: -868.5,
            lttd: -4816.1
        },
        {
            drp: "113.5",
            stcd: "20122",
            stnm: "豫园街道",
            lgtd: 2203.8,
            lttd: -1034.9
        },
        {
            drp: "111.0",
            stcd: "20121",
            stnm: "老西门街道",
            lgtd: 1347.4,
            lttd: -2016.0
        },
        {
            drp: "103.0",
            stcd: "20120",
            stnm: "打浦桥街道",
            lgtd: 172.0,
            lttd: -3287.4
        },
        {
            drp: "113.0",
            stcd: "20119",
            stnm: "南浦大桥",
            lgtd: 3002.9,
            lttd: -2918.5
        },
        {
            drp: "115.0",
            stcd: "20118",
            stnm: "上海南站",
            lgtd: -2938.4,
            lttd: -9092.7
        },
        {
            drp: "69.0",
            stcd: "19114",
            stnm: "金山新城",
            lgtd: -11759.6,
            lttd: -54236.3
        },
        {
            drp: "95.5",
            stcd: "19113",
            stnm: "廊下",
            lgtd: -26718.3,
            lttd: -49038.1
        },
        {
            drp: "101.5",
            stcd: "19112",
            stnm: "皓光",
            lgtd: -20585.0,
            lttd: -40403.3
        },
        {
            drp: "96.0",
            stcd: "19111",
            stnm: "新农",
            lgtd: -23363.0,
            lttd: -34019.6
        },
        {
            drp: "141.0",
            stcd: "19110",
            stnm: "前卫村",
            lgtd: 3816.7,
            lttd: 54469.0
        },
        {
            drp: "92.5",
            stcd: "19109",
            stnm: "张堰城区",
            lgtd: -16628.9,
            lttd: -47912.8
        },
        {
            drp: "91.5",
            stcd: "19108",
            stnm: "松隐",
            lgtd: -26226.3,
            lttd: -37820.2
        },
        {
            drp: "17.0",
            stcd: "18802",
            stnm: "芦潮引河闸",
            lgtd: 42290.9,
            lttd: -41339.4
        },
        {
            drp: "38.5",
            stcd: "18334",
            stnm: "商飞总装",
            lgtd: 36931.3,
            lttd: -14217.3
        },
        {
            drp: "40.5",
            stcd: "18333",
            stnm: "三门闸",
            lgtd: 40549.3,
            lttd: -17952.1
        },
        {
            drp: "39.0",
            stcd: "18328",
            stnm: "万亩良田",
            lgtd: 41120.1,
            lttd: -22225.7
        },
        {
            drp: "28.5",
            stcd: "18102",
            stnm: "东滩",
            lgtd: 41759.6,
            lttd: -30694.6
        },
        {
            drp: "48.0",
            stcd: "18101",
            stnm: "盐仓",
            lgtd: 29226.4,
            lttd: -16208.4
        },
        {
            drp: "79.5",
            stcd: "17208",
            stnm: "奉浦",
            lgtd: -1128.8,
            lttd: -32800.9
        },
        {
            drp: "56.0",
            stcd: "17114",
            stnm: "南桥新城",
            lgtd: 2475.0,
            lttd: -34330.0
        },
        {
            drp: "48.0",
            stcd: "17113",
            stnm: "头桥",
            lgtd: 16231.2,
            lttd: -31613.2
        },
        {
            drp: "57.5",
            stcd: "17112",
            stnm: "金汇",
            lgtd: 3011.6,
            lttd: -27295.5
        },
        {
            drp: "33.5",
            stcd: "17111",
            stnm: "齐贤",
            lgtd: 3620.8,
            lttd: -30891.7
        },
        {
            drp: "24.5",
            stcd: "17110",
            stnm: "平安",
            lgtd: 24910.5,
            lttd: -37635.0
        },
        {
            drp: "25.5",
            stcd: "17109",
            stnm: "邵厂",
            lgtd: 27755.5,
            lttd: -36426.3
        },
        {
            drp: "26.5",
            stcd: "17108",
            stnm: "洪庙",
            lgtd: -8590.1,
            lttd: -7108.2
        },
        {
            drp: "30.5",
            stcd: "17107",
            stnm: "塘外",
            lgtd: 14204.3,
            lttd: -36658.5
        },
        {
            drp: "26.0",
            stcd: "17106",
            stnm: "星火",
            lgtd: 9178.3,
            lttd: -41194.3
        },
        {
            drp: "58.0",
            stcd: "17104",
            stnm: "胡桥",
            lgtd: -3961.6,
            lttd: -44445.7
        },
        {
            drp: "62.0",
            stcd: "17102",
            stnm: "新寺",
            lgtd: -1050.6,
            lttd: -40668.7
        },
        {
            drp: "109.0",
            stcd: "16859",
            stnm: "上钢新村",
            lgtd: 1619.3,
            lttd: -6558.6
        },
        {
            drp: "121.0",
            stcd: "16858",
            stnm: "潍坊新村",
            lgtd: 5571.4,
            lttd: -461.6
        },
        {
            drp: "121.5",
            stcd: "16857",
            stnm: "金杨新村",
            lgtd: 9749.8,
            lttd: 2552.4
        },
        {
            drp: "58.0",
            stcd: "16207",
            stnm: "迪士尼",
            lgtd: 19624.7,
            lttd: -8738.7
        },
        {
            drp: "103.5",
            stcd: "16206",
            stnm: "周家渡",
            lgtd: 5760.9,
            lttd: -6215.8
        },
        {
            drp: "114.5",
            stcd: "16107",
            stnm: "塘桥",
            lgtd: 3838.0,
            lttd: -2257.2
        },
        {
            drp: "113.0",
            stcd: "16106",
            stnm: "高行",
            lgtd: 12559.8,
            lttd: 8951.6
        },
        {
            drp: "108.5",
            stcd: "15506",
            stnm: "纪王闸",
            lgtd: 0.0,
            lttd: 0.0
        },
        {
            drp: "72.5",
            stcd: "15308",
            stnm: "周浦塘闸",
            lgtd: 1245.7,
            lttd: -16249.4
        },
        {
            drp: "87.5",
            stcd: "15307",
            stnm: "北沙港闸",
            lgtd: -9084.8,
            lttd: -23511.7
        },
        {
            drp: "89.5",
            stcd: "14117",
            stnm: "颐亭花园",
            lgtd: -16490.2,
            lttd: -9265.6
        },
        {
            drp: "102.5",
            stcd: "14116",
            stnm: "泗泾大居",
            lgtd: -22020.6,
            lttd: -13455.5
        },
        {
            drp: "84.5",
            stcd: "14115",
            stnm: "任其浜闸",
            lgtd: -24555.3,
            lttd: -17644.5
        },
        {
            drp: "72.0",
            stcd: "14114",
            stnm: "叶榭污水厂",
            lgtd: -16449.2,
            lttd: -33655.1
        },
        {
            drp: "107.5",
            stcd: "14113",
            stnm: "泖亭路泵站",
            lgtd: -16062.6,
            lttd: -26279.5
        },
        {
            drp: "83.5",
            stcd: "14112",
            stnm: "四号河闸",
            lgtd: -31229.3,
            lttd: -25443.8
        },
        {
            drp: "111.0",
            stcd: "14111",
            stnm: "泗马塘闸",
            lgtd: -12901.5,
            lttd: -16829.2
        },
        {
            drp: "114.5",
            stcd: "14110",
            stnm: "北干山",
            lgtd: -26240.9,
            lttd: -10652.1
        },
        {
            drp: "116.0",
            stcd: "14109",
            stnm: "天马赛车场",
            lgtd: -33496.7,
            lttd: -16972.7
        },
        {
            drp: "124.5",
            stcd: "13801",
            stnm: "双桥",
            lgtd: -36143.1,
            lttd: -10893.6
        },
        {
            drp: "112.0",
            stcd: "13388",
            stnm: "国家会展中心",
            lgtd: -15400.0,
            lttd: -5350.9
        },
        {
            drp: "115.0",
            stcd: "13350",
            stnm: "朱枫闸",
            lgtd: -39740.4,
            lttd: -24744.8
        },
        {
            drp: "127.0",
            stcd: "13349",
            stnm: "庙泾闸",
            lgtd: -27813.7,
            lttd: -3341.3
        },
        {
            drp: "107.5",
            stcd: "13348",
            stnm: "徐泾闸",
            lgtd: -18202.4,
            lttd: -6897.4
        },
        {
            drp: "101.5",
            stcd: "13347",
            stnm: "西北圩（盈浦）",
            lgtd: -36347.0,
            lttd: -8723.1
        },
        {
            drp: "105.5",
            stcd: "13342",
            stnm: "加工区圩",
            lgtd: -30490.2,
            lttd: -4289.7
        },
        {
            drp: "108.5",
            stcd: "13341",
            stnm: "河东北圩",
            lgtd: -35167.0,
            lttd: -2872.3
        },
        {
            drp: "124.5",
            stcd: "13340",
            stnm: "胜利圩",
            lgtd: -35656.8,
            lttd: -6388.5
        },
        {
            drp: "134.0",
            stcd: "13335",
            stnm: "里浜圩",
            lgtd: -31727.5,
            lttd: -8152.5
        },
        {
            drp: "128.0",
            stcd: "13334",
            stnm: "小汶港闸",
            lgtd: -53233.8,
            lttd: -19311.7
        },
        {
            drp: "129.5",
            stcd: "13332",
            stnm: "东北圩",
            lgtd: -44736.5,
            lttd: -18594.4
        },
        {
            drp: "125.0",
            stcd: "13331",
            stnm: "港南圩",
            lgtd: -54357.0,
            lttd: -13309.7
        },
        {
            drp: "141.5",
            stcd: "13328",
            stnm: "太北片圩",
            lgtd: -41668.6,
            lttd: -21798.7
        },
        {
            drp: "99.0",
            stcd: "13327",
            stnm: "太南片圩",
            lgtd: -38775.5,
            lttd: -24390.4
        },
        {
            drp: "106.5",
            stcd: "13325",
            stnm: "朱泖河闸",
            lgtd: -38346.0,
            lttd: -20376.0
        },
        {
            drp: "91.5",
            stcd: "13322",
            stnm: "葑沃圩",
            lgtd: -34097.4,
            lttd: -18041.1
        },
        {
            drp: "114.0",
            stcd: "13321",
            stnm: "天心圩",
            lgtd: -36641.5,
            lttd: -17412.2
        },
        {
            drp: "103.0",
            stcd: "13320",
            stnm: "江平圩",
            lgtd: -38559.8,
            lttd: -979.6
        },
        {
            drp: "120.5",
            stcd: "13319",
            stnm: "重联圩",
            lgtd: -26864.7,
            lttd: -4014.5
        },
        {
            drp: "116.0",
            stcd: "13318",
            stnm: "叙中圩",
            lgtd: -23698.9,
            lttd: -2411.0
        },
        {
            drp: "111.0",
            stcd: "13317",
            stnm: "集镇圩",
            lgtd: -22898.7,
            lttd: 1645.9
        },
        {
            drp: "55.0",
            stcd: "13315",
            stnm: "钱桥社区",
            lgtd: 6833.5,
            lttd: -40029.7
        },
        {
            drp: "120.5",
            stcd: "13313",
            stnm: "赵谢圩",
            lgtd: -26730.8,
            lttd: -8864.8
        },
        {
            drp: "84.0",
            stcd: "12310",
            stnm: "华亭水库",
            lgtd: -16091.0,
            lttd: 28609.6
        },
        {
            drp: "130.5",
            stcd: "12309",
            stnm: "月华江泵闸",
            lgtd: -16236.8,
            lttd: 1338.9
        },
        {
            drp: "110.5",
            stcd: "12307",
            stnm: "横沥泵闸",
            lgtd: -16611.7,
            lttd: 8467.2
        },
        {
            drp: "0.0",
            stcd: "12113",
            stnm: "曹丰",
            lgtd: -10567.6,
            lttd: 715.5
        },
        {
            drp: "0.0",
            stcd: "12112",
            stnm: "真新街道",
            lgtd: -10921.6,
            lttd: 2096.3
        },
        {
            drp: "0.0",
            stcd: "12111",
            stnm: "新成路街道",
            lgtd: -19222.5,
            lttd: 16966.1
        },
        {
            drp: "119.0",
            stcd: "11305",
            stnm: "杨盛河闸",
            lgtd: -2428.6,
            lttd: 13215.6
        },
        {
            drp: "82.5",
            stcd: "11204",
            stnm: "东茭泾闸",
            lgtd: -4144.4,
            lttd: 11236.2
        },
        {
            drp: "79.5",
            stcd: "11114",
            stnm: "城市工业园",
            lgtd: -11532.2,
            lttd: 8589.3
        },
        {
            drp: "91.0",
            stcd: "11113",
            stnm: "东浅弄闸",
            lgtd: 617.6,
            lttd: 16464.9
        },
        {
            drp: "112.0",
            stcd: "11112",
            stnm: "菊泉泵闸",
            lgtd: -8792.3,
            lttd: 13330.7
        },
        {
            drp: "0.0",
            stcd: "11111",
            stnm: "美兰湖",
            lgtd: -10730.9,
            lttd: 18944.6
        },
        {
            drp: "124.5",
            stcd: "11110",
            stnm: "宝山工业园",
            lgtd: -12089.9,
            lttd: 25265.6
        },
        {
            drp: "112.5",
            stcd: "10508",
            stnm: "新村沙",
            lgtd: 0.0,
            lttd: 0.0
        },
        {
            drp: "138.0",
            stcd: "10505",
            stnm: "东风西沙水库",
            lgtd: -21677.5,
            lttd: 53188.9
        },
        {
            drp: "164.0",
            stcd: "10349",
            stnm: "绿华建城",
            lgtd: -23317.4,
            lttd: 60696.7
        },
        {
            drp: "130.5",
            stcd: "10348",
            stnm: "新村新跃",
            lgtd: -13073.9,
            lttd: 67207.6
        },
        {
            drp: "164.5",
            stcd: "10347",
            stnm: "新海镇",
            lgtd: -17141.8,
            lttd: 64710.9
        },
        {
            drp: "140.5",
            stcd: "10346",
            stnm: "三星育德",
            lgtd: -19574.5,
            lttd: 58374.4
        },
        {
            drp: "147.0",
            stcd: "10345",
            stnm: "庙镇保民",
            lgtd: -9773.0,
            lttd: 58345.3
        },
        {
            drp: "154.0",
            stcd: "10344",
            stnm: "庙镇爱民",
            lgtd: -14188.6,
            lttd: 52186.0
        },
        {
            drp: "144.0",
            stcd: "10343",
            stnm: "城北镇",
            lgtd: -4320.2,
            lttd: 48446.2
        },
        {
            drp: "131.5",
            stcd: "10342",
            stnm: "城桥候南",
            lgtd: -851.4,
            lttd: 42149.4
        },
        {
            drp: "132.0",
            stcd: "10340",
            stnm: "崇明机场",
            lgtd: 3423.7,
            lttd: 48258.8
        },
        {
            drp: "133.5",
            stcd: "10339",
            stnm: "百狮桥",
            lgtd: 6389.1,
            lttd: 49343.4
        },
        {
            drp: "135.0",
            stcd: "10338",
            stnm: "新河利农",
            lgtd: 7330.0,
            lttd: 39762.1
        },
        {
            drp: "125.5",
            stcd: "10337",
            stnm: "竖新跃进",
            lgtd: 12770.6,
            lttd: 40650.2
        },
        {
            drp: "134.5",
            stcd: "10336",
            stnm: "堡镇财贸",
            lgtd: 12413.6,
            lttd: 35028.0
        },
        {
            drp: "141.5",
            stcd: "10332",
            stnm: "中兴兴东",
            lgtd: 27035.5,
            lttd: 31404.3
        },
        {
            drp: "92.5",
            stcd: "10330",
            stnm: "团旺河北",
            lgtd: 42042.6,
            lttd: 36036.5
        },
        {
            drp: "108.5",
            stcd: "10320",
            stnm: "港沿镇",
            lgtd: 17557.7,
            lttd: 39384.7
        },
        {
            drp: "116.5",
            stcd: "10319",
            stnm: "圆沙泵闸",
            lgtd: 30324.4,
            lttd: 11817.2
        },
        {
            drp: "111.5",
            stcd: "10318",
            stnm: "创建水闸",
            lgtd: 13259.7,
            lttd: 21723.6
        },
        {
            drp: "140.0",
            stcd: "10317",
            stnm: "港西中学",
            lgtd: -5283.6,
            lttd: 50797.1
        },
        {
            drp: "132.0",
            stcd: "10314",
            stnm: "建设虹桥",
            lgtd: -1466.9,
            lttd: 47962.3
        },
        {
            drp: "113.5",
            stcd: "10114",
            stnm: "崇明东滩",
            lgtd: 41940.8,
            lttd: 31861.8
        },
        {
            drp: "91.5",
            stcd: "10113",
            stnm: "团结沙",
            lgtd: 39194.2,
            lttd: 25677.0
        },
        {
            drp: "120.0",
            stcd: "10112",
            stnm: "中兴永南",
            lgtd: 31135.8,
            lttd: 33677.8
        },
        {
            drp: "115.0",
            stcd: "10111",
            stnm: "港沿鲁玙",
            lgtd: 21731.3,
            lttd: 37154.1
        },
        {
            drp: "126.0",
            stcd: "10110",
            stnm: "新河卫东",
            lgtd: 5563.6,
            lttd: 43922.6
        },
        {
            drp: "99.5",
            stcd: "10109",
            stnm: "钱圩",
            lgtd: -20433.4,
            lttd: -49953.1
        },
        {
            drp: "145.5",
            stcd: "10108",
            stnm: "庙镇永乐",
            lgtd: -8084.6,
            lttd: 57114.6
        },
        {
            drp: "143.0",
            stcd: "10107",
            stnm: "三星海桥",
            lgtd: -14764.8,
            lttd: 60867.4
        },
        {
            drp: "46.5",
            stcd: "63425951",
            stnm: "新石洞闸",
            lgtd: 236.9,
            lttd: 20231.2
        },
        {
            drp: "154.0",
            stcd: "63425940",
            stnm: "月浦城区",
            lgtd: -4977.7,
            lttd: 20524.4
        },
        {
            drp: "129.0",
            stcd: "63425938",
            stnm: "杨行杨北",
            lgtd: -5505.0,
            lttd: 17586.7
        },
        {
            drp: "107.0",
            stcd: "63425935",
            stnm: "杨行城区",
            lgtd: -2610.2,
            lttd: 15002.4
        },
        {
            drp: "121.5",
            stcd: "63425930",
            stnm: "淞南四村",
            lgtd: 1861.7,
            lttd: 12664.9
        },
        {
            drp: "120.0",
            stcd: "63425928",
            stnm: "大华",
            lgtd: -5892.0,
            lttd: 4524.5
        },
        {
            drp: "0.0",
            stcd: "63425925",
            stnm: "泗塘新村",
            lgtd: -776.7,
            lttd: 10594.9
        },
        {
            drp: "131.0",
            stcd: "63425920",
            stnm: "陈行",
            lgtd: -12846.8,
            lttd: 27006.2
        },
        {
            drp: "126.0",
            stcd: "63425910",
            stnm: "高境二村",
            lgtd: 455.9,
            lttd: 9750.0
        },
        {
            drp: "0.0",
            stcd: "63425905",
            stnm: "丰明",
            lgtd: -8096.3,
            lttd: 9428.9
        },
        {
            drp: "57.0",
            stcd: "63425700",
            stnm: "祝桥",
            lgtd: 26752.3,
            lttd: -12798.2
        },
        {
            drp: "126.0",
            stcd: "63425315",
            stnm: "桃浦工业区",
            lgtd: -8242.1,
            lttd: 6149.3
        },
        {
            drp: "123.5",
            stcd: "63425310",
            stnm: "人民广场",
            lgtd: 251.2,
            lttd: -195.3
        },
        {
            drp: "84.5",
            stcd: "63425290",
            stnm: "徐浦大桥",
            lgtd: -494.7,
            lttd: -11987.7
        },
        {
            drp: "101.5",
            stcd: "63425285",
            stnm: "上海动物园",
            lgtd: -10202.6,
            lttd: -3771.7
        },
        {
            drp: "86.0",
            stcd: "63425280",
            stnm: "龙华",
            lgtd: -2319.2,
            lttd: -6698.8
        },
        {
            drp: "72.5",
            stcd: "63425275",
            stnm: "江苏路",
            lgtd: -3779.8,
            lttd: -1679.0
        },
        {
            drp: "115.5",
            stcd: "63425270",
            stnm: "北虹路地道",
            lgtd: -7934.0,
            lttd: -4270.8
        },
        {
            drp: "123.5",
            stcd: "63425260",
            stnm: "复兴公园",
            lgtd: -94.6,
            lttd: -1710.3
        },
        {
            drp: "105.5",
            stcd: "63425255",
            stnm: "中山公园",
            lgtd: -4575.1,
            lttd: -1497.8
        },
        {
            drp: "81.0",
            stcd: "63425251",
            stnm: "徐家汇",
            lgtd: -3370.1,
            lttd: -4938.0
        },
        {
            drp: "0.0",
            stcd: "63425245",
            stnm: "和平公园",
            lgtd: 3073.6,
            lttd: 3514.8
        },
        {
            drp: "104.5",
            stcd: "63425235",
            stnm: "上海火车站",
            lgtd: -1154.6,
            lttd: 1543.3
        },
        {
            drp: "98.0",
            stcd: "63425230",
            stnm: "杨树浦泵闸",
            lgtd: 6153.4,
            lttd: 2227.2
        },
        {
            drp: "125.5",
            stcd: "63425225",
            stnm: "上海西站",
            lgtd: -7250.7,
            lttd: 4080.5
        },
        {
            drp: "116.0",
            stcd: "63425220",
            stnm: "黄浦",
            lgtd: 1193.2,
            lttd: -184.7
        },
        {
            drp: "66.0",
            stcd: "63425120",
            stnm: "北桥",
            lgtd: -4422.5,
            lttd: -20782.7
        },
        {
            drp: "87.0",
            stcd: "63425000",
            stnm: "横沥闸",
            lgtd: -26296.9,
            lttd: 25330.4
        },
        {
            drp: "75.0",
            stcd: "63424902",
            stnm: "浦东机场",
            lgtd: 30412.4,
            lttd: -4357.9
        },
        {
            drp: "0.0",
            stcd: "63424750",
            stnm: "嘉定新城",
            lgtd: -21092.5,
            lttd: 11658.1
        },
        {
            drp: "94.0",
            stcd: "63424741",
            stnm: "华亭",
            lgtd: -17717.6,
            lttd: 24558.9
        },
        {
            drp: "98.5",
            stcd: "63424720",
            stnm: "南翔",
            lgtd: -16546.1,
            lttd: 5806.7
        },
        {
            drp: "137.5",
            stcd: "63424660",
            stnm: "新槎浦闸",
            lgtd: -11903.1,
            lttd: 1843.2
        },
        {
            drp: "101.0",
            stcd: "63424650",
            stnm: "盐铁北闸",
            lgtd: -30102.2,
            lttd: 17509.2
        },
        {
            drp: "133.5",
            stcd: "63424640",
            stnm: "大裕",
            lgtd: -14510.0,
            lttd: 16030.6
        },
        {
            drp: "133.0",
            stcd: "63424630",
            stnm: "曹王",
            lgtd: -15719.7,
            lttd: 22070.4
        },
        {
            drp: "0.0",
            stcd: "63424620",
            stnm: "方泰",
            lgtd: -24131.0,
            lttd: 9172.6
        },
        {
            drp: "112.5",
            stcd: "63424610",
            stnm: "泾河",
            lgtd: -22676.1,
            lttd: 18282.8
        },
        {
            drp: "102.5",
            stcd: "63424250",
            stnm: "世博园区",
            lgtd: 3157.1,
            lttd: -5125.6
        },
        {
            drp: "124.5",
            stcd: "63424230",
            stnm: "浦兴",
            lgtd: 11127.7,
            lttd: 3707.0
        },
        {
            drp: "115.5",
            stcd: "63424220",
            stnm: "陆家嘴",
            lgtd: 2752.2,
            lttd: 952.2
        },
        {
            drp: "112.0",
            stcd: "63424210",
            stnm: "曹路",
            lgtd: 19514.5,
            lttd: 3799.1
        },
        {
            drp: "111.5",
            stcd: "63424200",
            stnm: "洋泾闸",
            lgtd: 7755.1,
            lttd: 906.0
        },
        {
            drp: "63.0",
            stcd: "63423640",
            stnm: "泰日社区",
            lgtd: 8899.9,
            lttd: -28188.8
        },
        {
            drp: "48.0",
            stcd: "63423600",
            stnm: "青村",
            lgtd: 9600.7,
            lttd: -31580.3
        },
        {
            drp: "112.0",
            stcd: "63423570",
            stnm: "前明圩",
            lgtd: -20238.5,
            lttd: -8405.8
        },
        {
            drp: "65.5",
            stcd: "63423565",
            stnm: "浦锦",
            lgtd: 2917.3,
            lttd: -18539.6
        },
        {
            drp: "69.0",
            stcd: "63423480",
            stnm: "江川",
            lgtd: -4092.7,
            lttd: -25363.8
        },
        {
            drp: "92.0",
            stcd: "63423475",
            stnm: "六磊塘水闸",
            lgtd: -2449.6,
            lttd: -17006.4
        },
        {
            drp: "66.5",
            stcd: "63423470",
            stnm: "宝秀路泵站",
            lgtd: -798.6,
            lttd: -20892.4
        },
        {
            drp: "102.5",
            stcd: "63423460",
            stnm: "老北翟路泵站",
            lgtd: -16358.8,
            lttd: -2840.3
        },
        {
            drp: "94.5",
            stcd: "63423450",
            stnm: "古美",
            lgtd: -8081.6,
            lttd: -9218.6
        },
        {
            drp: "126.0",
            stcd: "63423440",
            stnm: "新虹",
            lgtd: -13407.7,
            lttd: -1780.0
        },
        {
            drp: "100.5",
            stcd: "63423430",
            stnm: "七宝",
            lgtd: -11703.3,
            lttd: -7865.4
        },
        {
            drp: "102.0",
            stcd: "63423420",
            stnm: "行南",
            lgtd: -4250.8,
            lttd: -13211.7
        },
        {
            drp: "111.5",
            stcd: "63403185",
            stnm: "凤溪",
            lgtd: -23247.8,
            lttd: -3154.1
        },
        {
            drp: "85.0",
            stcd: "63422460",
            stnm: "朱行工业区",
            lgtd: -12049.6,
            lttd: -43303.3
        },
        {
            drp: "84.0",
            stcd: "63422440",
            stnm: "干巷",
            lgtd: -21965.7,
            lttd: -45097.4
        },
        {
            drp: "65.0",
            stcd: "63422420",
            stnm: "山阳",
            lgtd: -9577.9,
            lttd: -51564.8
        },
        {
            drp: "73.0",
            stcd: "63422380",
            stnm: "金山卫",
            lgtd: -14393.2,
            lttd: -56381.1
        },
        {
            drp: "60.0",
            stcd: "63422360",
            stnm: "漕泾",
            lgtd: -6602.7,
            lttd: -48637.0
        },
        {
            drp: "79.5",
            stcd: "63422320",
            stnm: "亭林",
            lgtd: -16615.8,
            lttd: -39306.5
        },
        {
            drp: "0.0",
            stcd: "63422135",
            stnm: "高梁泾泵闸",
            lgtd: -25339.7,
            lttd: -16419.6
        },
        {
            drp: "77.5",
            stcd: "63422090",
            stnm: "西部工业区",
            lgtd: -30094.4,
            lttd: -19468.4
        },
        {
            drp: "81.0",
            stcd: "63422085",
            stnm: "洞泾工业区",
            lgtd: -20200.1,
            lttd: -17081.8
        },
        {
            drp: "110.5",
            stcd: "63422080",
            stnm: "新浜工业区",
            lgtd: -37554.9,
            lttd: -32821.0
        },
        {
            drp: "93.5",
            stcd: "63422075",
            stnm: "永丰",
            lgtd: -26016.4,
            lttd: -26298.3
        },
        {
            drp: "105.5",
            stcd: "63422070",
            stnm: "岳阳",
            lgtd: -22131.8,
            lttd: -25538.4
        },
        {
            drp: "0.0",
            stcd: "63422065",
            stnm: "大学城",
            lgtd: -26361.3,
            lttd: -20299.7
        },
        {
            drp: "99.5",
            stcd: "63422060",
            stnm: "东部工业区",
            lgtd: -18606.8,
            lttd: -21137.5
        },
        {
            drp: "94.0",
            stcd: "63422055",
            stnm: "久富工业区",
            lgtd: -14408.7,
            lttd: -12156.2
        },
        {
            drp: "60.0",
            stcd: "63405900",
            stnm: "金山嘴",
            lgtd: -9546.5,
            lttd: -56048.8
        },
        {
            drp: "19.5",
            stcd: "63405800",
            stnm: "芦潮港",
            lgtd: 42290.9,
            lttd: -41339.4
        },
        {
            drp: "104.0",
            stcd: "63405700",
            stnm: "吴淞（蕴）",
            lgtd: 1816.6,
            lttd: 14703.1
        },
        {
            drp: "108.5",
            stcd: "63405505",
            stnm: "蕴藻浜西闸",
            lgtd: -27591.9,
            lttd: 4843.0
        },
        {
            drp: "104.0",
            stcd: "63405490",
            stnm: "蕴藻浜东闸",
            lgtd: -8157.2,
            lttd: 10970.0
        },
        {
            drp: "141.5",
            stcd: "63405480",
            stnm: "嘉定南门",
            lgtd: -21019.6,
            lttd: 15630.5
        },
        {
            drp: "61.5",
            stcd: "63405471",
            stnm: "墅沟闸",
            lgtd: 0.0,
            lttd: 0.0
        },
        {
            drp: "147.0",
            stcd: "63405460",
            stnm: "罗店",
            lgtd: -12686.4,
            lttd: 20118.9
        },
        {
            drp: "138.0",
            stcd: "63405450",
            stnm: "练祁河闸",
            lgtd: -3053.3,
            lttd: 23598.6
        },
        {
            drp: "100.5",
            stcd: "63405370",
            stnm: "嘉北水厂",
            lgtd: -23612.6,
            lttd: 21963.1
        },
        {
            drp: "121.5",
            stcd: "63405300",
            stnm: "望新",
            lgtd: -30979.7,
            lttd: 12908.8
        },
        {
            drp: "134.0",
            stcd: "63405279",
            stnm: "温州路",
            lgtd: -215.5,
            lttd: 612.8
        },
        {
            drp: "112.5",
            stcd: "63405260",
            stnm: "梦清园",
            lgtd: -3153.4,
            lttd: 1753.3
        },
        {
            drp: "116.5",
            stcd: "63405200",
            stnm: "曹家渡",
            lgtd: -4777.9,
            lttd: -778.9
        },
        {
            drp: "113.5",
            stcd: "63405150",
            stnm: "北新泾",
            lgtd: -9059.5,
            lttd: -1434.2
        },
        {
            drp: "107.5",
            stcd: "63405100",
            stnm: "黄渡",
            lgtd: -22677.7,
            lttd: 3279.1
        },
        {
            drp: "108.5",
            stcd: "63405000",
            stnm: "赵屯",
            lgtd: -38464.0,
            lttd: 3839.9
        },
        {
            drp: "109.5",
            stcd: "63404990",
            stnm: "凌桥",
            lgtd: 6140.3,
            lttd: 13521.9
        },
        {
            drp: "110.0",
            stcd: "63404985",
            stnm: "高桥公园",
            lgtd: 9548.8,
            lttd: 12357.7
        },
        {
            drp: "116.0",
            stcd: "63404975",
            stnm: "东沟",
            lgtd: 10755.3,
            lttd: 5922.4
        },
        {
            drp: "118.0",
            stcd: "63404972",
            stnm: "高东",
            lgtd: 14097.0,
            lttd: 10249.5
        },
        {
            drp: "83.5",
            stcd: "63404970",
            stnm: "赵桥",
            lgtd: 15622.6,
            lttd: 6694.4
        },
        {
            drp: "119.0",
            stcd: "63404966",
            stnm: "金桥",
            lgtd: 12789.2,
            lttd: 3727.3
        },
        {
            drp: "112.0",
            stcd: "63404963",
            stnm: "世纪公园",
            lgtd: 8442.3,
            lttd: -1515.9
        },
        {
            drp: "93.5",
            stcd: "63404960",
            stnm: "唐镇北",
            lgtd: 16240.9,
            lttd: 468.1
        },
        {
            drp: "106.5",
            stcd: "63404955",
            stnm: "大湾",
            lgtd: 20298.0,
            lttd: 1565.5
        },
        {
            drp: "91.0",
            stcd: "63404950",
            stnm: "张家浜东闸",
            lgtd: 25779.5,
            lttd: 2944.2
        },
        {
            drp: "100.5",
            stcd: "63404935",
            stnm: "白莲泾泵闸",
            lgtd: 2865.1,
            lttd: -4352.5
        },
        {
            drp: "0.0",
            stcd: "63404930",
            stnm: "白莲泾套闸",
            lgtd: 4832.8,
            lttd: -4468.2
        },
        {
            drp: "103.0",
            stcd: "63404925",
            stnm: "北蔡",
            lgtd: 7319.8,
            lttd: -4768.2
        },
        {
            drp: "93.5",
            stcd: "63404920",
            stnm: "三林港闸",
            lgtd: 869.7,
            lttd: -10825.2
        },
        {
            drp: "98.5",
            stcd: "63404915",
            stnm: "三林",
            lgtd: 2891.9,
            lttd: -9567.8
        },
        {
            drp: "66.5",
            stcd: "63404910",
            stnm: "沔北",
            lgtd: 15619.3,
            lttd: -7319.5
        },
        {
            drp: "43.5",
            stcd: "63404908",
            stnm: "东新市",
            lgtd: 16820.7,
            lttd: -27173.6
        },
        {
            drp: "81.0",
            stcd: "63404905",
            stnm: "川沙城厢",
            lgtd: 22417.0,
            lttd: -4079.8
        },
        {
            drp: "17.5",
            stcd: "63404902",
            stnm: "奉城",
            lgtd: 16322.0,
            lttd: -34940.9
        },
        {
            drp: "74.0",
            stcd: "63404898",
            stnm: "康桥",
            lgtd: 13986.3,
            lttd: -10094.9
        },
        {
            drp: "62.5",
            stcd: "63404895",
            stnm: "周浦医药园区",
            lgtd: 14977.6,
            lttd: -14498.0
        },
        {
            drp: "58.0",
            stcd: "63404890",
            stnm: "六灶",
            lgtd: 22475.4,
            lttd: -13456.3
        },
        {
            drp: "78.5",
            stcd: "63404880",
            stnm: "下沙",
            lgtd: 10476.9,
            lttd: -19333.2
        },
        {
            drp: "0.0",
            stcd: "63404875",
            stnm: "坦直",
            lgtd: 15697.1,
            lttd: -19419.9
        },
        {
            drp: "54.0",
            stcd: "63404870",
            stnm: "三灶",
            lgtd: 22898.7,
            lttd: -18384.8
        },
        {
            drp: "43.0",
            stcd: "63404865",
            stnm: "朝阳农场",
            lgtd: 34442.3,
            lttd: -14929.1
        },
        {
            drp: "35.5",
            stcd: "63404855",
            stnm: "惠南",
            lgtd: 29300.8,
            lttd: -19100.5
        },
        {
            drp: "43.0",
            stcd: "63404850",
            stnm: "老港",
            lgtd: 33806.4,
            lttd: -21772.2
        },
        {
            drp: "31.5",
            stcd: "63404845",
            stnm: "万祥",
            lgtd: 34169.9,
            lttd: -29346.3
        },
        {
            drp: "33.5",
            stcd: "63404840",
            stnm: "棉场",
            lgtd: 38179.9,
            lttd: -28393.9
        },
        {
            drp: "26.0",
            stcd: "63404835",
            stnm: "彭镇",
            lgtd: 30337.9,
            lttd: -34358.3
        },
        {
            drp: "26.0",
            stcd: "63404830",
            stnm: "书院",
            lgtd: 37103.4,
            lttd: -33349.6
        },
        {
            drp: "27.5",
            stcd: "63404825",
            stnm: "泥城",
            lgtd: 34646.0,
            lttd: -36944.9
        },
        {
            drp: "29.5",
            stcd: "63404820",
            stnm: "申港",
            lgtd: 42156.4,
            lttd: -37075.8
        },
        {
            drp: "21.0",
            stcd: "63404815",
            stnm: "五七农场",
            lgtd: 32401.8,
            lttd: -40906.2
        },
        {
            drp: "14.0",
            stcd: "63404810",
            stnm: "芦潮港闸",
            lgtd: 2752.2,
            lttd: 952.2
        },
        {
            drp: "10.5",
            stcd: "63404805",
            stnm: "滴水湖闸",
            lgtd: 47114.4,
            lttd: -39310.7
        },
        {
            drp: "125.0",
            stcd: "63404770",
            stnm: "江湾",
            lgtd: 730.0,
            lttd: 6975.1
        },
        {
            drp: "80.0",
            stcd: "63404760",
            stnm: "大武川泵站",
            lgtd: 1722.6,
            lttd: 8533.8
        },
        {
            drp: "128.0",
            stcd: "63404750",
            stnm: "新泾闸",
            lgtd: -9237.6,
            lttd: -2086.5
        },
        {
            drp: "94.0",
            stcd: "63404740",
            stnm: "抚顺路桥",
            lgtd: 4148.1,
            lttd: 5246.4
        },
        {
            drp: "107.5",
            stcd: "63404730",
            stnm: "三江路桥",
            lgtd: -3004.4,
            lttd: -7514.9
        },
        {
            drp: "119.0",
            stcd: "63404720",
            stnm: "长白泵站",
            lgtd: 6495.7,
            lttd: 6908.1
        },
        {
            drp: "115.0",
            stcd: "63404710",
            stnm: "志丹泵站",
            lgtd: -3167.3,
            lttd: 4785.6
        },
        {
            drp: "108.5",
            stcd: "63404700",
            stnm: "虹桥",
            lgtd: -8590.1,
            lttd: -7108.2
        },
        {
            drp: "24.0",
            stcd: "63404650",
            stnm: "中港闸",
            lgtd: 25293.8,
            lttd: -41496.6
        },
        {
            drp: "25.5",
            stcd: "63404630",
            stnm: "四团",
            lgtd: 24088.3,
            lttd: -32530.0
        },
        {
            drp: "33.0",
            stcd: "63404600",
            stnm: "大团闸",
            lgtd: 26013.7,
            lttd: -28126.8
        },
        {
            drp: "70.0",
            stcd: "63404595",
            stnm: "周浦",
            lgtd: 9784.3,
            lttd: -13438.1
        },
        {
            drp: "111.5",
            stcd: "63404590",
            stnm: "五号沟闸",
            lgtd: 20147.2,
            lttd: 9057.7
        },
        {
            drp: "108.0",
            stcd: "63404582",
            stnm: "杨思闸",
            lgtd: 511.3,
            lttd: -7925.3
        },
        {
            drp: "97.0",
            stcd: "63404575",
            stnm: "张江水厂",
            lgtd: 15162.4,
            lttd: -4615.5
        },
        {
            drp: "85.5",
            stcd: "63404570",
            stnm: "三甲港闸",
            lgtd: 27894.4,
            lttd: -1797.5
        },
        {
            drp: "81.5",
            stcd: "63404565",
            stnm: "杜行",
            lgtd: 6367.8,
            lttd: -18512.4
        },
        {
            drp: "72.5",
            stcd: "63404562",
            stnm: "大治河西闸",
            lgtd: 3111.1,
            lttd: -23816.5
        },
        {
            drp: "59.0",
            stcd: "63404557",
            stnm: "航头",
            lgtd: 10969.1,
            lttd: -24229.2
        },
        {
            drp: "53.0",
            stcd: "63404554",
            stnm: "新场",
            lgtd: 16613.0,
            lttd: -24356.2
        },
        {
            drp: "46.0",
            stcd: "63404550",
            stnm: "邬家路桥",
            lgtd: 29268.3,
            lttd: -24854.1
        },
        {
            drp: "38.0",
            stcd: "63404540",
            stnm: "大治河东闸",
            lgtd: 39761.6,
            lttd: -25269.9
        },
        {
            drp: "28.0",
            stcd: "63404530",
            stnm: "金汇港南闸",
            lgtd: 5493.4,
            lttd: -45065.0
        },
        {
            drp: "73.0",
            stcd: "63404520",
            stnm: "金汇港北闸",
            lgtd: 1896.3,
            lttd: -25609.6
        },
        {
            drp: "67.0",
            stcd: "63404500",
            stnm: "南桥",
            lgtd: -2137.2,
            lttd: -35482.6
        },
        {
            drp: "72.0",
            stcd: "63404480",
            stnm: "南横泾闸",
            lgtd: -3590.4,
            lttd: -26837.8
        },
        {
            drp: "71.5",
            stcd: "63404470",
            stnm: "庄行",
            lgtd: -10153.1,
            lttd: -36301.1
        },
        {
            drp: "52.0",
            stcd: "63404460",
            stnm: "柘林",
            lgtd: 491.4,
            lttd: -44900.5
        },
        {
            drp: "81.0",
            stcd: "63404450",
            stnm: "邬桥社区",
            lgtd: -6642.5,
            lttd: -29626.6
        },
        {
            drp: "60.5",
            stcd: "63404400",
            stnm: "沙港（二）",
            lgtd: -7344.7,
            lttd: -27376.9
        },
        {
            drp: "87.5",
            stcd: "63404360",
            stnm: "九亭北",
            lgtd: -13182.4,
            lttd: -9677.3
        },
        {
            drp: "104.0",
            stcd: "63404300",
            stnm: "淀浦河东闸",
            lgtd: -9615.3,
            lttd: -12254.3
        },
        {
            drp: "101.0",
            stcd: "63404280",
            stnm: "旗忠",
            lgtd: -12439.7,
            lttd: -19585.4
        },
        {
            drp: "97.0",
            stcd: "63404270",
            stnm: "女儿泾闸",
            lgtd: -13885.6,
            lttd: -27522.2
        },
        {
            drp: "120.5",
            stcd: "63404251",
            stnm: "淀浦河西闸",
            lgtd: -43714.5,
            lttd: -14019.0
        },
        {
            drp: "105.0",
            stcd: "63404240",
            stnm: "洞泾港闸(闸内)",
            lgtd: -20311.3,
            lttd: -29637.6
        },
        {
            drp: "94.0",
            stcd: "63404220",
            stnm: "茸平路泵站",
            lgtd: -21967.1,
            lttd: -21824.2
        },
        {
            drp: "75.5",
            stcd: "63404200",
            stnm: "泗泾（二）",
            lgtd: -17392.0,
            lttd: -13352.7
        },
        {
            drp: "102.0",
            stcd: "63404120",
            stnm: "南蟠龙港闸",
            lgtd: -16807.1,
            lttd: -8695.8
        },
        {
            drp: "112.5",
            stcd: "63404100",
            stnm: "陈坊桥",
            lgtd: -27492.9,
            lttd: -15657.6
        },
        {
            drp: "136.5",
            stcd: "63404050",
            stnm: "朱家角",
            lgtd: -39720.8,
            lttd: -13085.5
        },
        {
            drp: "123.0",
            stcd: "63404030",
            stnm: "夏阳湖",
            lgtd: -31581.2,
            lttd: -9508.4
        },
        {
            drp: "100.5",
            stcd: "63404020",
            stnm: "大盈",
            lgtd: -38235.7,
            lttd: -4040.6
        },
        {
            drp: "90.0",
            stcd: "63404010",
            stnm: "镇南圩",
            lgtd: -23212.4,
            lttd: -10271.8
        },
        {
            drp: "124.5",
            stcd: "63404000",
            stnm: "青浦南门",
            lgtd: -33271.8,
            lttd: -13032.6
        },
        {
            drp: "127.5",
            stcd: "63403800",
            stnm: "商榻",
            lgtd: -52460.8,
            lttd: -13076.7
        },
        {
            drp: "132.0",
            stcd: "63403200",
            stnm: "金泽",
            lgtd: -54452.5,
            lttd: -23697.8
        },
        {
            drp: "128.0",
            stcd: "63403190",
            stnm: "练塘",
            lgtd: -41314.0,
            lttd: -23343.1
        }
    ],
    "dataSize": 0,
    "pageSize": 0,
    "message": "操作成功",
    "isSuccess": true,
    "pageTotal": 0,
    "pageIndex": 0,
    "elapseTime": 749,
    "expand": null
}
      const strJson = groupBy(res.result, "stcd");
      let resultDrp = [];
      if (strJson.length > 0) {
        for (let num = 0; num < strJson.length; num++) {
          let itemList = strJson[num][0];
          resultDrp.push(itemList);
        }
      }
      strJsonData.value = resultDrp;
      YLload();

    // })
    // .catch((err) => { });
}
function YLload() {
  var data = strJsonData.value;
  var dataT = data.filter(function (res) {
    return Number(res.drp) > 0 && Number(res.drp) < 25;
  });
  count25.value = dataT.length;
  dataT = data.filter(function (res) {
    return Number(res.drp) >= 25 && Number(res.drp) < 50;
  });
  count50.value = dataT.length;
  dataT = data.filter(function (res) {
    return Number(res.drp) >= 50 && Number(res.drp) < 100;
  });
  count100.value = dataT.length;
  dataT = data.filter(function (res) {
    return Number(res.drp) >= 100 && Number(res.drp) < 250;
  });
  count250.value = dataT.length;

  dataT = data.filter(function (res) {
    return Number(res.drp) >= 250;
  });
  countBig.value = dataT.length;
//   if (count25.value > 0) {
    // Color25.value.style.color = "#39BC39";
//   }
//   if (count50.value > 0) {
    // Color50.value.style.color = "#39BC39";
//   }
//   if (count100.value > 0) {
    // Color100.value.style.color = "#62B7FE";
    // Color100.value.style.color = "#39BC39";
//   }
//   if (count250.value > 0) {
    // Color250.value.style.color = "#0004F6";
    // Color250.value.style.color = "#39BC39";
//   }
//   if (countBig.value > 0) {
    // ColorBig.value.style.color = "#F801FA";
    // ColorBig.value.style.color = "#39BC39";
//   }
  var result = [];
  if (data.length > 0) {
    for (var num = 0; num < data.length; num++) {
      // data[num].drp = 10;
      // if (data[num].stcd == 63404900) {
      //   data[num].drp = 5;
      // }
      let items = data[num];
      var stnmName = items["stnm"];
      // console.error("stnm",stnmName,items.drp);
      if (stnmName.length > 4) {
        stnmName = stnmName.slice(0, 4) + "...";
      }
      // if (data[num].drp > 0) {

      var drp = items.drp != undefined ? Number(items.drp).toFixed(1) : 0;
      result.push({
        index: items,
        drp:Number(drp),
        stcd: items.stcd,
        stnm: items.stnm,
        stnmName: stnmName,
        lgtd: items.lgtd,
        lttd: items.lttd,
        admauth: items.admauth,
        mtype: items.mtype,
      });
      drpList.value = sortObjectArray(result, ["drp"], "desc");
      // }
    }
  }
}
function YQtable(e) {
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  shuju.value = "YQ";
  if (e == "count25") {
    if (count25.value > 0) {
      showDialog.value = true;
      titleName.value = "雨情统计（< 25）";
      typeValue.value = 1;
    } else {
      ElMessage.error("无数据");
    }
  } else if (e == "count50") {
    if (count50.value > 0) {
      showDialog.value = true;
      titleName.value = "雨情统计（25~50）";
      typeValue.value = 2;
    } else {
      ElMessage.error("无数据");
    }
  } else if (e == "count100") {
    if (count100.value > 0) {
      showDialog.value = true;
      titleName.value = "雨情统计（50~100）";
      typeValue.value = 3;
    } else {
      ElMessage.error("无数据");
    }
  } else if (e == "count250") {
    if (count250.value > 0) {
      showDialog.value = true;
      titleName.value = "雨情统计（100~250）";
      typeValue.value = 4;
    } else {
      ElMessage.error("无数据");
    }
  } else if (e == "countBig") {
    if (countBig.value > 0) {
      showDialog.value = true;
      titleName.value = "雨情统计（> 250）";
      typeValue.value = 5;
    } else {
      ElMessage.error("无数据");
    }
  }
}
function YQline(stcd, stnm, mtype) {
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  shuju.value = "Line";
  showDialogLine.value = true;
  titleNameLine.value = stnm +"降雨过程";
  stcdValue.value = stcd;
  mtypeValue.value = mtype;
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialogZJ.value = true;
}
onMounted(() => {
  var nowTM = new Date();
  etime.value = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  if (Number(dayjs(nowTM).format("HH")) > 7) {
    stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  else {
    stime.value = dayjs(etime.value)
      .add(-48, "hour")
      .format("YYYY-MM-DD 08:00:00");
    etime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  Weacontent();
});
// 提供方法给子组件
provide("typeValue", typeValue);
provide("pid", pid);
provide("stime", stime);
provide("etime", etime);
provide("stcd", stcdValue);
provide("mtype", mtypeValue);
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
  width: 19.2%;
  margin: 0 0.4%;
  background: var(--widgetColor);
  padding: 1% 0;
  height: 50%;
}

.def1ff {
  color: var(--titled1);
  cursor: pointer;
  font-size: 26px;
}

.ztitem1ps {
  width: 32%;
  height: 40%;
}

.ztitemtit {
  height: 2rem;
  line-height: 2rem;
  font-weight: bold;
  color: #ddd;
  text-align: center;
  font-size: 12px;
}

.justify-content_flex-justify {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}

.yjtxtcon {
  text-align: center;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  vertical-align: bottom;
}

.yjbigtxt {
  font-size: 1.2rem;
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

.ztitemtit {
  font-size: 14px;
}

.widget-ylTable-box {
  margin-top: 2px;
  width: 100%;
  height: calc(100% - 105px);
  font-size: 14px;
  float: left;
  overflow: hidden;
  color: var(--widgetcolor);
  height: 48%;
}

:deep(.liuyupjbg1) {
  width: 19.2%;
  display: inline-block;
  height: 100%;
  text-align: center;
  padding: 4% 0;
  margin: 0 0.4%;
  background: var(--liuyupjbg) no-repeat;
  /* background: var(--widgetColor); */
  background-size: 100% 100%;
}

:deep(.liuyupjbg) {
  width: 19.2%;
  display: inline-block;
  height: 100%;
  text-align: center;
  padding: 4% 0;
  margin: 0 0.4%;
  background: var(--liuyupjbg) no-repeat;
  /* background: var(--widgetColor); */
  background-size: 100% 100%;
}

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

:deep(.dialog-content .liuyupjbg1 p) {
  font-size: 1rem !important;
  padding-top: 83px;
}

:deep(.dialog-content .liuyupjbg p) {
  font-size: 1rem !important;
  padding-top: 16px;
}

:deep(.dialog-content .liuyupjbg h3) {
  padding-top: 60px;
  font-size: 50px;
}
</style>
