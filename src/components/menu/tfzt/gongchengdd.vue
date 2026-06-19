<template>
    <div class="m-box m-box-3-2-2">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">工程调度</p>
            </div>
            <div style="width:calc(100% - 250px);margin-left:120px;" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'district' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('district')">
                    水利片区</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'river' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('river')">
                    骨干河道</div>
            </div>
        </div>
        <div class="txt" style="overflow-y: auto">
            <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table river-table" :border="0"
                :cellspacing="0" :cellpadding="0" @click="handleclick" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableRiver />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, watch } from "vue";
import { SetNull, groupBy } from "@/api/ComUnit";
import { convertToDate } from "@/api/dateUtil.js";
const Typeswiper = ref('district')
const datekey = ref(null);
const emit = defineEmits(['passValue']);
const tableHeaders = ref([
    {
        name: "num",
        label: "序号"
    },
    {
        name: "hd_name",
        label: "河道名称"
    },
    {
        name: "hd_index",
        label: "类别"
    },
]);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
var res = {
    "result": [
      {
        "stcd": "101000",
        "stnm": "三林套闸",
        "lgtd": 136.500000,
        "lttd": -10986.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "101000",
            "tm": "\/Date(1740986400000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "3.000"
          },
          {
            "stcd": "101000",
            "tm": "\/Date(1740986400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.060"
          }
        ],
        "lgtd84": 121.468579,
        "lttd84": 31.136361,
        "district": "蕰南片",
      },
      {
        "stcd": "102000",
        "stnm": "杨思枢纽",
        "lgtd": 758.500000,
        "lttd": -7858.000000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "102000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "2.000"
          },
          {
            "stcd": "102000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "102000",
            "tm": "\/Date(1754550900000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "102000",
            "tm": "\/Date(1754550900000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.475105,
        "lttd84": 31.164575,
        "district": "蕰南片",
      },
      {
        "stcd": "103000",
        "stnm": "白莲泾套闸",
        "lgtd": 26977.300000,
        "lttd": 27356.300000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "103000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "103000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "1.100"
          }
        ],
        "lgtd84": 121.751083,
        "lttd84": 31.481861
      },
      {
        "stcd": "104000",
        "stnm": "张家浜水闸",
        "lgtd": 4219.100000,
        "lttd": -2034.400000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "104000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "104000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.240"
          }
        ],
        "lgtd84": 121.511427,
        "lttd84": 31.217090,
        "district": "蕰南片",
      },
      {
        "stcd": "105000",
        "stnm": "张家浜东闸",
        "lgtd": 25938.200000,
        "lttd": 3101.100000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "105000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "105000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "105000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "105000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.739494,
        "lttd84": 31.263142,
        "district": "蕰南片",
      },
      {
        "stcd": "106000",
        "stnm": "洋泾水闸",
        "lgtd": 7456.300000,
        "lttd": 1302.200000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "106000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "106000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.545426,
        "lttd84": 31.247169,
        "district": "蕰南片",
      },
      {
        "stcd": "107000",
        "stnm": "西沟水闸",
        "lgtd": -37668.800000,
        "lttd": 3261.900000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "107000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "107000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.071622,
        "lttd84": 31.264260
      },
      {
        "stcd": "108000",
        "stnm": "东沟水闸",
        "lgtd": 10343.700000,
        "lttd": 5942.200000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "108000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "108000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.575787,
        "lttd84": 31.288993,
        "district": "蕰南片",
      },
      {
        "stcd": "109000",
        "stnm": "高桥套闸",
        "lgtd": 9470.600000,
        "lttd": 10798.400000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "109000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "109000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.790"
          }
        ],
        "lgtd84": 121.566665,
        "lttd84": 31.332801,
        "district": "蕰南片",
      },
      {
        "stcd": "110001",
        "stnm": "五好沟水闸",
        "lgtd": 20199.800000,
        "lttd": 9166.200000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "110001",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "110001",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.679362,
        "lttd84": 31.317935,
        "district": "蕰南片",
      },
      {
        "stcd": "111000",
        "stnm": "三甲港水闸",
        "lgtd": 27951.300000,
        "lttd": -1810.300000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "111000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "111000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "111000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "111000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.760496,
        "lttd84": 31.218797,
        "district": "蕰南片",
      },
      {
        "stcd": "112000",
        "stnm": "外高桥泵闸",
        "lgtd": 11192.500000,
        "lttd": 14836.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "112000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "112000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.140"
          }
        ],
        "lgtd84": 121.584801,
        "lttd84": 31.369203,
        "district": "蕰南片",
      },
      {
        "stcd": "201000",
        "stnm": "朱泖河水闸",
        "lgtd": -38405.300000,
        "lttd": -20375.200000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "201000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.064806,
        "lttd84": 31.051056
      },
      {
        "stcd": "202000",
        "stnm": "小莲湖水闸",
        "lgtd": -43990.600000,
        "lttd": -16852.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "202000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.006136,
        "lttd84": 31.082673
      },
      {
        "stcd": "204000",
        "stnm": "西大盈水闸",
        "lgtd": -37668.800000,
        "lttd": 3261.900000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "204000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.830"
          }
        ],
        "lgtd84": 121.071622,
        "lttd84": 31.264260
      },
      {
        "stcd": "205000",
        "stnm": "东大盈水闸",
        "lgtd": -30260.200000,
        "lttd": 4331.600000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "205000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "205000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.310"
          }
        ],
        "lgtd84": 121.149398,
        "lttd84": 31.274122
      },
      {
        "stcd": "206000",
        "stnm": "华新水闸",
        "lgtd": -24087.000000,
        "lttd": 2104.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "206000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.920"
          }
        ],
        "lgtd84": 121.214281,
        "lttd84": 31.254177
      },
      {
        "stcd": "251000",
        "stnm": "新江湾泵闸",
        "lgtd": 5285.500000,
        "lttd": 11716.800000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "251000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "251000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.522694,
        "lttd84": 31.341111,
        "district": "淀北片",
      },
      {
        "stcd": "252000",
        "stnm": "虬江泵闸",
        "lgtd": 8102.700000,
        "lttd": 7763.400000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "252000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "252000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.050"
          }
        ],
        "lgtd84": 121.552262,
        "lttd84": 31.305437,
        "district": "淀北片",
      },
      {
        "stcd": "253000",
        "stnm": "杨树浦泵闸",
        "lgtd": 6150.600000,
        "lttd": 2212.800000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "253000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.531722,
        "lttd84": 31.255389,
        "district": "淀北片",
      },
      {
        "stcd": "301000",
        "stnm": "华田泾枢纽",
        "lgtd": -35266.100000,
        "lttd": -23248.800000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "301000",
            "tm": "\/Date(1749245100000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "301000",
            "tm": "\/Date(1749245100000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "301000",
            "tm": "\/Date(1749245100000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.097806,
        "lttd84": 31.025244
      },
      {
        "stcd": "302000",
        "stnm": "小斜塘水闸",
        "lgtd": -33129.300000,
        "lttd": -24938.200000,
        "sfq": 0,
        "gtopnum": 2,
        "omcnum": 0,
        "st_gate_r": [],
        "lgtd84": 121.120240,
        "lttd84": 31.010061
      },
      {
        "stcd": "304000",
        "stnm": "油墩港枢纽",
        "lgtd": -28140.800000,
        "lttd": -29868.200000,
        "sfq": 0,
        "gtopnum": 5,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "304000",
            "tm": "\/Date(1755764100000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.090"
          },
          {
            "stcd": "304000",
            "tm": "\/Date(1755764100000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.050"
          },
          {
            "stcd": "304000",
            "tm": "\/Date(1755764100000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "304000",
            "tm": "\/Date(1755764100000-0000)\/",
            "exkey": "4",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "304000",
            "tm": "\/Date(1755764100000-0000)\/",
            "exkey": "5",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.172607,
        "lttd84": 30.965720
      },
      {
        "stcd": "305000",
        "stnm": "毛竹港水闸",
        "lgtd": -23794.900000,
        "lttd": -29863.000000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "305000",
            "tm": "\/Date(1755764100000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.400"
          }
        ],
        "lgtd84": 121.218080,
        "lttd84": 30.965876
      },
      {
        "stcd": "306000",
        "stnm": "大涨泾泵闸",
        "lgtd": -22194.700000,
        "lttd": -29147.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "306000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.234823,
        "lttd84": 30.972350
      },
      {
        "stcd": "307000",
        "stnm": "洞泾套闸",
        "lgtd": -20150.400000,
        "lttd": -29774.300000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "307000",
            "tm": "\/Date(1755765300000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.400"
          }
        ],
        "lgtd84": 121.256238,
        "lttd84": 30.966732
      },
      {
        "stcd": "308000",
        "stnm": "泖泾水闸",
        "lgtd": -16666.100000,
        "lttd": -29405.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "308000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.292686,
        "lttd84": 30.970112
      },
      {
        "stcd": "309000",
        "stnm": "得胜水闸",
        "lgtd": -14708.400000,
        "lttd": -28331.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "309000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "1.610"
          }
        ],
        "lgtd84": 121.313167,
        "lttd84": 30.979833
      },
      {
        "stcd": "310000",
        "stnm": "六磊塘水闸",
        "lgtd": -13123.100000,
        "lttd": -19427.200000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "310000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.329657,
        "lttd84": 31.060155
      },
      {
        "stcd": "313000",
        "stnm": "祝家港水闸",
        "lgtd": -16617.500000,
        "lttd": -30515.300000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "313000",
            "tm": "\/Date(1755764100000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.330"
          }
        ],
        "lgtd84": 121.293222,
        "lttd84": 30.960111
      },
      {
        "stcd": "314000",
        "stnm": "紫石泾水闸",
        "lgtd": -19160.700000,
        "lttd": -30833.100000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "314000",
            "tm": "\/Date(1755765300000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "314000",
            "tm": "\/Date(1755765300000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "314000",
            "tm": "\/Date(1755765300000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.266611,
        "lttd84": 30.957194
      },
      {
        "stcd": "390000",
        "stnm": "苏州河河口闸",
        "lgtd": 1849.300000,
        "lttd": 1067.200000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "390000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.410"
          }
        ],
        "lgtd84": 121.486565,
        "lttd84": 31.245073,
        "district": "淀北片",
      },
      {
        "stcd": "400000",
        "stnm": "彭越浦泵闸",
        "lgtd": -2138.200000,
        "lttd": 1993.800000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "400000",
            "tm": "\/Date(1690505400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.444704,
        "lttd84": 31.253429,
        "district": "淀北片",
      },
      {
        "stcd": "401000",
        "stnm": "蕴西枢纽",
        "lgtd": -27365.100000,
        "lttd": 4995.200000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "401000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "401000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "401000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "401000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.179774,
        "lttd84": 31.280177,
        "district": "青松片",
      },
      {
        "stcd": "405000",
        "stnm": "封浜套闸",
        "lgtd": -16349.100000,
        "lttd": -43.400000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "405000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "405000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.295550,
        "lttd84": 31.234951,
        "district": "青松片",
      },
      {
        "stcd": "406000",
        "stnm": "新槎浦套闸",
        "lgtd": -11844.700000,
        "lttd": 1612.800000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "406000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "406000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.342796,
        "lttd84": 31.249936,
        "district": "青松片",
      },
      {
        "stcd": "408000",
        "stnm": "墅沟节制闸",
        "lgtd": 0.000000,
        "lttd": 0.000000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "408000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "408000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "408000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "408000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.300173,
        "lttd84": 31.514681,
        "district": "嘉宝北片",
      },
      {
        "stcd": "409000",
        "stnm": "新泾套闸",
        "lgtd": -20017.500000,
        "lttd": 27116.200000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "409000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "409000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.256512,
        "lttd84": 31.479842,
        "district": "青松片",
      },
      {
        "stcd": "410000",
        "stnm": "木渎港泵闸",
        "lgtd": -8877.400000,
        "lttd": -1396.900000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "410000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "410000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.373976,
        "lttd84": 31.222819,
        "district": "嘉宝北片",
      },
      {
        "stcd": "411000",
        "stnm": "孙浜套闸",
        "lgtd": -28897.400000,
        "lttd": 23831.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "411000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "411000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.163142,
        "lttd84": 31.450050,
        "district": "青松片",
      },
      {
        "stcd": "412000",
        "stnm": "盐铁北闸",
        "lgtd": -30210.100000,
        "lttd": 17685.100000,
        "sfq": 0,
        "gtopnum": 0,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "412000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.149517,
        "lttd84": 31.394549,
        "district": "青松片",
      },
      {
        "stcd": "412797",
        "stnm": "虬泾",
        "lgtd": -14568.700000,
        "lttd": -28722.200000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "412797",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.314631,
        "lttd84": 30.976300
      },
      {
        "stcd": "413000",
        "stnm": "横沥泵闸",
        "lgtd": -16748.700000,
        "lttd": 8746.400000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "413000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.650"
          },
          {
            "stcd": "413000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.291205,
        "lttd84": 31.314227,
        "district": "青松片",
      },
      {
        "stcd": "420000",
        "stnm": "淀东闸",
        "lgtd": -10323.300000,
        "lttd": -12444.000000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "420000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.410"
          }
        ],
        "lgtd84": 121.358917,
        "lttd84": 31.123167
      },
      {
        "stcd": "430000",
        "stnm": "张家塘泵闸",
        "lgtd": -3041.700000,
        "lttd": -9473.400000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "430000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.435250,
        "lttd84": 31.150000
      },
      {
        "stcd": "440000",
        "stnm": "龙华港水闸",
        "lgtd": -1114.700000,
        "lttd": -6175.000000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "440000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.455456,
        "lttd84": 31.179754
      },
      {
        "stcd": "450000",
        "stnm": "蕴藻浜东闸",
        "lgtd": -7897.700000,
        "lttd": 11076.900000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "450000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.070"
          },
          {
            "stcd": "450000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.070"
          },
          {
            "stcd": "450000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.070"
          }
        ],
        "lgtd84": 121.384167,
        "lttd84": 31.335333,
        "district": "嘉宝北片",
      },
      {
        "stcd": "460000",
        "stnm": "桃浦水闸",
        "lgtd": -6971.900000,
        "lttd": 11310.700000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "460000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.393889,
        "lttd84": 31.337444,
        "district": "嘉宝北片",
      },
      {
        "stcd": "468080",
        "stnm": "斜江",
        "lgtd": -24111.700000,
        "lttd": -30724.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "468080",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.214796,
        "lttd84": 30.958084
      },
      {
        "stcd": "468081",
        "stnm": "金鸡浜",
        "lgtd": -23102.500000,
        "lttd": -29905.700000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "468081",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.225340,
        "lttd84": 30.965489
      },
      {
        "stcd": "470000",
        "stnm": "东茭泾泵闸",
        "lgtd": -4186.000000,
        "lttd": 11442.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "470000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.423167,
        "lttd84": 31.338639,
        "district": "嘉宝北片",
      },
      {
        "stcd": "480000",
        "stnm": "西泗塘套闸",
        "lgtd": 10180.200000,
        "lttd": 3366.400000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "480000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.574043,
        "lttd84": 31.265759,
        "district": "蕰南片",
      },
      {
        "stcd": "490000",
        "stnm": "郝桥港水闸",
        "lgtd": 1895.700000,
        "lttd": 12740.900000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "490000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "490000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.487077,
        "lttd84": 31.350361,
        "district": "淀北片",
      },
      {
        "stcd": "500000",
        "stnm": "大治河西闸",
        "lgtd": 2908.900000,
        "lttd": -23877.600000,
        "sfq": 0,
        "gtopnum": 6,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "500000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "500000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "500000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "500000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "4",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "500000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "5",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "500000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "6",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.497611,
        "lttd84": 31.020083,
        "district": "苏州河",
      },
      {
        "stcd": "501000",
        "stnm": "荻泾套闸",
        "lgtd": -6551.000000,
        "lttd": 12202.300000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "501000",
            "tm": "\/Date(1755765300000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.398309,
        "lttd84": 31.345486,
        "district": "嘉宝北片",
      },
      {
        "stcd": "503000",
        "stnm": "北泗塘水闸",
        "lgtd": 276.100000,
        "lttd": 17877.000000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "503000",
            "tm": "\/Date(1755765300000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.200"
          }
        ],
        "lgtd84": 121.470059,
        "lttd84": 31.396684,
        "district": "嘉宝北片",
      },
      {
        "stcd": "505000",
        "stnm": "新川沙水闸",
        "lgtd": -10399.800000,
        "lttd": 27831.300000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "505000",
            "tm": "\/Date(1751427600000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.357708,
        "lttd84": 31.486419,
        "district": "嘉宝北片",
      },
      {
        "stcd": "506000",
        "stnm": "黄泥塘水闸",
        "lgtd": -580.200000,
        "lttd": 13945.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "506000",
            "tm": "\/Date(1755765300000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.461056,
        "lttd84": 31.361222,
        "district": "嘉宝北片",
      },
      {
        "stcd": "507000",
        "stnm": "练祁水闸",
        "lgtd": -2992.800000,
        "lttd": 23679.900000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "507000",
            "tm": "\/Date(1755765900000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "507000",
            "tm": "\/Date(1755765300000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "507000",
            "tm": "\/Date(1755765300000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.435671,
        "lttd84": 31.449019
      },
      {
        "stcd": "510000",
        "stnm": "叶榭塘水闸",
        "lgtd": -14304.800000,
        "lttd": -30019.400000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "510000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "510000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "510000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.317419,
        "lttd84": 30.964604
      },
      {
        "stcd": "520000",
        "stnm": "龙泉港水闸",
        "lgtd": -8447.800000,
        "lttd": -54456.200000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "520000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "520000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "520000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.378920,
        "lttd84": 30.744250
      },
      {
        "stcd": "550000",
        "stnm": "老封浜水闸",
        "lgtd": -32672.100000,
        "lttd": -25288.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "550000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.125013,
        "lttd84": 31.006917
      },
      {
        "stcd": "560000",
        "stnm": "黄樵港水闸",
        "lgtd": -19637.100000,
        "lttd": 2684.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "560000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.260972,
        "lttd84": 31.259500,
        "district": "嘉宝北片",
      },
      {
        "stcd": "590000",
        "stnm": "太浦河泵站",
        "lgtd": 0.000000,
        "lttd": 0.000000,
        "sfq": 0,
        "gtopnum": 0,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "590000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 120.496188,
        "lttd84": 31.008163
      },
      {
        "stcd": "601000",
        "stnm": "中横沥北闸",
        "lgtd": -9590.300000,
        "lttd": -12099.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "601000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.320"
          }
        ],
        "lgtd84": 121.366600,
        "lttd84": 31.126286
      },
      {
        "stcd": "603000",
        "stnm": "华漕水闸",
        "lgtd": -14089.700000,
        "lttd": -674.000000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "603000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.319267,
        "lttd84": 31.229279
      },
      {
        "stcd": "604000",
        "stnm": "北横沥水闸",
        "lgtd": -15625.700000,
        "lttd": -597.600000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "604000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.303139,
        "lttd84": 31.229956
      },
      {
        "stcd": "605000",
        "stnm": "纪王水闸",
        "lgtd": -18431.300000,
        "lttd": 1545.600000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "605000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.273665,
        "lttd84": 31.249253
      },
      {
        "stcd": "607000",
        "stnm": "周浦塘水闸",
        "lgtd": 1004.500000,
        "lttd": -16307.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "607000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.477674,
        "lttd84": 31.088365,
        "district": "苏州河",
      },
      {
        "stcd": "608000",
        "stnm": "友谊河水闸",
        "lgtd": 1081.100000,
        "lttd": -17539.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "608000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.478475,
        "lttd84": 31.077252,
        "district": "苏州河",
      },
      {
        "stcd": "609000",
        "stnm": "沈庄塘水闸",
        "lgtd": 1411.000000,
        "lttd": -18508.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "609000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.481930,
        "lttd84": 31.068517,
        "district": "苏州河",
      },
      {
        "stcd": "610001",
        "stnm": "盐铁塘水闸",
        "lgtd": 2094.200000,
        "lttd": -22175.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "610001",
            "tm": "\/Date(1755765600000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.489081,
        "lttd84": 31.035439,
        "district": "苏州河",
      },
      {
        "stcd": "611000",
        "stnm": "姚家浜水闸",
        "lgtd": 1615.900000,
        "lttd": -20042.000000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "611000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.484075,
        "lttd84": 31.054682,
        "district": "苏州河",
      },
      {
        "stcd": "621000",
        "stnm": "春申塘水闸",
        "lgtd": -2240.000000,
        "lttd": -13715.800000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "621000",
            "tm": "\/Date(1755765600000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.070"
          }
        ],
        "lgtd84": 121.443666,
        "lttd84": 31.111740
      },
      {
        "stcd": "623000",
        "stnm": "南横沥水闸",
        "lgtd": -4109.200000,
        "lttd": -25346.800000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "623000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.424116,
        "lttd84": 31.006827
      },
      {
        "stcd": "624000",
        "stnm": "女儿泾水闸",
        "lgtd": -13903.300000,
        "lttd": -27547.000000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "624000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "624000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "624000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.321583,
        "lttd84": 30.986917
      },
      {
        "stcd": "625000",
        "stnm": "北沙港水闸",
        "lgtd": -8991.500000,
        "lttd": -23680.800000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "625000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.372972,
        "lttd84": 31.021833
      },
      {
        "stcd": "626000",
        "stnm": "俞塘水闸",
        "lgtd": -1260.000000,
        "lttd": -19005.700000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "626000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.453944,
        "lttd84": 31.064028
      },
      {
        "stcd": "701000",
        "stnm": "南竹港出海闸",
        "lgtd": 1423.200000,
        "lttd": -46738.200000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "701000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.482012,
        "lttd84": 30.813890
      },
      {
        "stcd": "702000",
        "stnm": "金汇港南闸",
        "lgtd": 5589.700000,
        "lttd": -45216.300000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "702000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "702000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.290"
          },
          {
            "stcd": "702000",
            "tm": "\/Date(1755764400000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.525563,
        "lttd84": 30.827604
      },
      {
        "stcd": "703000",
        "stnm": "白庙水闸",
        "lgtd": 4755.400000,
        "lttd": -4556.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "703000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.517045,
        "lttd84": 31.194346,
        "district": "蕰南片",
      },
      {
        "stcd": "704000",
        "stnm": "金汇港北闸",
        "lgtd": 1869.500000,
        "lttd": -25391.900000,
        "sfq": 0,
        "gtopnum": 4,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "704000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "704000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "1.770"
          },
          {
            "stcd": "704000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "704000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "4",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.486722,
        "lttd84": 31.006427
      },
      {
        "stcd": "706000",
        "stnm": "南横泾套闸",
        "lgtd": -3635.200000,
        "lttd": -26689.900000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "706000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.429083,
        "lttd84": 30.994717
      },
      {
        "stcd": "707000",
        "stnm": "南竹港闸",
        "lgtd": -5655.100000,
        "lttd": -27754.000000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "707000",
            "tm": "\/Date(1698800100000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.407938,
        "lttd84": 30.985111
      },
      {
        "stcd": "708000",
        "stnm": "南沙港水闸",
        "lgtd": -7369.900000,
        "lttd": -27835.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "708000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.389987,
        "lttd84": 30.984364
      },
      {
        "stcd": "709000",
        "stnm": "浦南运河西闸",
        "lgtd": -10482.700000,
        "lttd": -36374.700000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "709000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.357486,
        "lttd84": 30.907324
      },
      {
        "stcd": "710000",
        "stnm": "巨潮水闸",
        "lgtd": -18012.200000,
        "lttd": 1737.500000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "710000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.278056,
        "lttd84": 31.250972,
        "district": "嘉宝北片",
      },
      {
        "stcd": "711000",
        "stnm": "中港水闸",
        "lgtd": 25218.100000,
        "lttd": -41802.400000,
        "sfq": 0,
        "gtopnum": 3,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "711000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "711000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "2",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          },
          {
            "stcd": "711000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "3",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.730791,
        "lttd84": 30.858137
      },
      {
        "stcd": "746952",
        "stnm": "新强",
        "lgtd": -28653.200000,
        "lttd": -28848.800000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "746952",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.167210,
        "lttd84": 30.974921
      },
      {
        "stcd": "794770",
        "stnm": "鱼家村",
        "lgtd": -23099.400000,
        "lttd": -30346.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "794770",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.225373,
        "lttd84": 30.961506
      },
      {
        "stcd": "794910",
        "stnm": "永丰河",
        "lgtd": -25374.000000,
        "lttd": -30887.600000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "794910",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.201580,
        "lttd84": 30.956587
      },
      {
        "stcd": "794970",
        "stnm": "团结河",
        "lgtd": -23858.200000,
        "lttd": -32198.900000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "794970",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.180"
          }
        ],
        "lgtd84": 121.217473,
        "lttd84": 30.944808
      },
      {
        "stcd": "804000",
        "stnm": "北新泾泵闸",
        "lgtd": -9216.100000,
        "lttd": -2053.100000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "804000",
            "tm": "\/Date(1755765000000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.370433,
        "lttd84": 31.216894
      },
      {
        "stcd": "808000",
        "stnm": "虹口港泵闸",
        "lgtd": 2229.500000,
        "lttd": 1441.800000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "808000",
            "tm": "\/Date(1656060900000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ],
        "lgtd84": 121.490556,
        "lttd84": 31.248450,
        "district": "淀北片",
      },
      {
        "stcd": "902000",
        "stnm": "大治河东闸",
        "lgtd": 0.000000,
        "lttd": 0.000000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 1,
        "st_gate_r": [
          {
            "stcd": "902000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "泵站状态",
            "eqpno": "2",
            "gtq": "0.000"
          },
          {
            "stcd": "902000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ]
      },
      {
        "stcd": "913000",
        "stnm": "金山区张泾河水利枢纽",
        "lgtd": 0.000000,
        "lttd": 0.000000,
        "sfq": 0,
        "gtopnum": 1,
        "omcnum": 0,
        "st_gate_r": [
          {
            "stcd": "913000",
            "tm": "\/Date(1755764700000-0000)\/",
            "exkey": "1",
            "eqptp": "闸坝开度",
            "eqpno": "1",
            "gtq": "0.000"
          }
        ]
      }
    ],
    "pagetotal": 0,
    "pagesize": 0,
    "pageindex": 0,
    "total": 96,
    "issuccess": true,
    "message": "操作成功",
    "elapsetime": 3831
  }
const GCtableDataAll = ref([]);
  GCtableDataAll.value = res.result;
watch(GCtableDataAll, () => {
    GetType("district");
});
function WeacontentRiver() {
    var strParam = {};
    strParam["state"] = "1";
    var res = {
        "result": [
            {
                "hd_base_id": "2025071501955",
                "hd_base_bianma": "1955",
                "hd_name": "黄浦江",
                "hd_zhen": "高新区、千灯镇、张浦镇、陆家镇、开发区、花桥镇",
                "hd_startpoint": "北界浦港",
                "hd_endpoint": "花桥泗港口",
                "hd_length": 80465.032,
                "hd_area": 5223481.254,
                "hd_width": "0",
                "hd_waterarea": 7199.96,
                "hd_index": "流域性河道",
                "lgtd": "120.97963",
                "lttd": "31.308391",
                "isvisble": "1",
                "sort": 10
            },
            {
                "hd_base_id": "2025071501955",
                "hd_base_bianma": "1955",
                "hd_name": "太浦河",
                "hd_zhen": "高新区、千灯镇、张浦镇、陆家镇、开发区、花桥镇",
                "hd_startpoint": "北界浦港",
                "hd_endpoint": "花桥泗港口",
                "hd_length": 80465.032,
                "hd_area": 5223481.254,
                "hd_width": "0",
                "hd_waterarea": 7199.96,
                "hd_index": "流域性河道",
                "lgtd": "120.97963",
                "lttd": "31.308391",
                "isvisble": "1",
                "sort": 10
            }, ,
            {
                "hd_base_id": "2025071501955",
                "hd_base_bianma": "1955",
                "hd_name": "吴淞江",
                "hd_zhen": "高新区、千灯镇、张浦镇、陆家镇、开发区、花桥镇",
                "hd_startpoint": "北界浦港",
                "hd_endpoint": "花桥泗港口",
                "hd_length": 80465.032,
                "hd_area": 5223481.254,
                "hd_width": "0",
                "hd_waterarea": 7199.96,
                "hd_index": "流域性河道",
                "lgtd": "120.97963",
                "lttd": "31.308391",
                "isvisble": "1",
                "sort": 10
            }, ,
            {
                "hd_base_id": "2025071501955",
                "hd_base_bianma": "1955",
                "hd_name": "蕰藻浜",
                "hd_zhen": "高新区、千灯镇、张浦镇、陆家镇、开发区、花桥镇",
                "hd_startpoint": "北界浦港",
                "hd_endpoint": "花桥泗港口",
                "hd_length": 80465.032,
                "hd_area": 5223481.254,
                "hd_width": "0",
                "hd_waterarea": 7199.96,
                "hd_index": "流域性河道",
                "lgtd": "120.97963",
                "lttd": "31.308391",
                "isvisble": "1",
                "sort": 10
            }, ,
            {
                "hd_base_id": "2025071501955",
                "hd_base_bianma": "1955",
                "hd_name": "苏州河",
                "hd_zhen": "高新区、千灯镇、张浦镇、陆家镇、开发区、花桥镇",
                "hd_startpoint": "北界浦港",
                "hd_endpoint": "花桥泗港口",
                "hd_length": 80465.032,
                "hd_area": 5223481.254,
                "hd_width": "0",
                "hd_waterarea": 7199.96,
                "hd_index": "流域性河道",
                "lgtd": "120.97963",
                "lttd": "31.308391",
                "isvisble": "1",
                "sort": 10
            },
        ],
        "total": 10,
        "Message": "操作成功",
        "success": "true"
    }
    // api.HdbaseSel(strParam).then((res) => {
    var strJson = res.result;
    let _index = 0;
    var result = strJson.filter(res => {
        _index = _index + 1;
        res.num = _index;
        res.id = res.hd_base_id;
        return res;
    });
    tableData.value = result;
    // }).catch((err) => { });
}
function WeacontentDistrict() {
    var strParam = {};
    strParam["pid"] = "2023081314031642213";
    // api.SelectMenu(strParam).then((res) => {
    var res = {
        "result": [
            {
                "id": "2024051914420157904",
                "title": "嘉宝北片",
                "pid": "2023081314031642213",
                "tm": "2024-05-19 14:42:01",
                "pathname": "站点关联配置",
                "orderbyid": 2.0
            },
            {
                "id": "2024051914433174810",
                "title": "蕰南片",
                "pid": "2023081314031642213",
                "tm": "2024-05-19 14:43:31",
                "pathname": "站点关联配置",
                "orderbyid": 15.0
            },
            {
                "id": "2024051914425822618",
                "title": "淀北片",
                "pid": "2023081314031642213",
                "tm": "2024-05-19 14:42:58",
                "pathname": "站点关联配置",
                "orderbyid": 8.0
            },
            {
                "id": "2024051914433174810",
                "title": "青松片",
                "pid": "2023081314031642213",
                "tm": "2024-05-19 14:43:31",
                "pathname": "站点关联配置",
                "orderbyid": 12.0
            },
            {
                "id": "2024051914433174810",
                "title": "中心城",
                "pid": "2023081314031642213",
                "tm": "2024-05-19 14:43:31",
                "pathname": "站点关联配置",
                "orderbyid": 12.0
            }
            ],
        "total": 12,
        "Message": "操作成功",
        "success": "true"
    }
    var strJson = res.result
    if (GCtableDataAll.value.length > 0) {
        var data = GCtableDataAll.value;
        for (var num = 0; num < data.length; num++) {
            var item = data[num];
            var gtopnum = SetNull(item.gtopnum) != "" ? Number(item.gtopnum) : 0;  //闸门个数
            var omcnum = SetNull(item.omcnum) != "" ? Number(item.gtopnum) : 0;  //泵站个数
            var gateListdata = item.st_gate_r;
            var tempTM = dayjs(new Date()).format("YYYY-MM-DD 00:00:00");
            var tm = "—";
            var total = gtopnum + omcnum; //闸、泵总数
            var count = 0;//当前闸、泵开启个数
            if (gateListdata.length > 0) {
                tm = SetNull(gateListdata[0].tm) != "" ? dayjs(convertToDate(gateListdata[0].tm)).format("YYYY-MM-DD HH:mm") : "—";
                // if (tm > tempTM) {
                    var bzdataALL = gateListdata.filter(function (e) {
                        return Number(e.eqpno) == 2;
                    })
                    var zmdataALL = gateListdata.filter(function (e) {
                        return Number(e.eqpno) == 1;
                    })

                    if (bzdataALL.length > 0) {
                        for (var i = 0; i < bzdataALL.length; i++) {
                            if (Number(bzdataALL[i].gtq) > 0) {
                                count = count + 1;
                            }
                        }
                    }
                    if (zmdataALL.length > 0) {
                        for (var i = 0; i < zmdataALL.length; i++) {
                            if (Number(zmdataALL[i].gtq) > 0) {
                                count = count + 1;
                            }
                        }
                    }
                // }
            }
            item.countNum = count;
            item.totalNum = total;
        };
        // console.error(data)

        var result = [];
        for (var i = 0; i < strJson.length; i++) {
            var _index = i + 1;
            var Temp = data.filter(function (e) {
                return e.district == strJson[i].title;
            })
            var total = 0, count = 0;
            if (Temp.length > 0) {
                // console.error(Temp)
                Temp.forEach(element => {
                    // console.error(element.stnm, element.totalNum, element.countNum)
                    total += element.totalNum;
                    count += element.countNum;
                });
                // console.error(total, count)
            }
            var value = count > 0 ? (Number(count) / Number(total) * 100) : count;
            result.push({
                num: _index,
                title: strJson[i].title,
                paiBili: value,
                psl:count*856
            })

        }
        // var result = strJson.filter(res => {
        //     if (SetNull(res.title) != "全部") {
        //         _index = _index + 1;
        //         res.num = _index;
        //         return res;
        //     }
        // });
        tableData.value = result;
    }
    // }).catch((err) => { });
}
function GetType(obj) {
    Typeswiper.value = obj;
    if (obj == "river") {
        tableHeaders.value = [
            {
                name: "num",
                label: "序号"
            },
            {
                name: "hd_name",
                label: "河道名称"
            },
            {
                name: "hd_index",
                label: "类别"
            },
        ];
        WeacontentRiver();
    } else if (obj == "district") {
        tableHeaders.value = [
            {
                name: "num",
                label: "序号"
            },
            {
                name: "title",
                label: "片区名称"
            },
            {
                name: "psl",
                label: "排水量(万方)"
            },
        ];
        WeacontentDistrict();
    }
    emit('passValue', Typeswiper.value, "", "");
}
const lastClickedRow = ref(null); // 新增：用于记录当前选中的河道行
function handleclick(evt) {
    // 找到点击的 tr 元素
    let targetTr = evt.target.closest('tr');
    console.log("targetTr", targetTr)
    if (!targetTr) return;

    // 移除所有 tr 元素的 active 类名
    const allTrs = document.querySelectorAll('.river-table tr');
    allTrs.forEach(tr => {
        tr.classList.remove('liSelected');
    });

    // 获取行索引
    var _rowindex = Array.from(allTrs).indexOf(targetTr) - 1;
    const currentRow = tableData.value[_rowindex];
    if (lastClickedRow.value && lastClickedRow.value.id === currentRow.id) {
        // 再次点击同一行，取消点击事件
        lastClickedRow.value = null;
        emit('passValue', Typeswiper.value, "", "", "");
    } else {
        if (targetTr) {
            // 给当前点击的 tr 元素添加 active 类名
            targetTr.classList.add('liSelected');

            // console.error("sasdasasdasdasdas", currentRow, Typeswiper.value)
            if (Typeswiper.value == "river") {
                emit('passValue', Typeswiper.value, currentRow.hd_base_id, currentRow.hd_zhen, currentRow.hd_name);
            } else if (Typeswiper.value == "district") {
                if (currentRow.title == "花桥经济开发区") {
                    currentRow.title = "花桥镇"
                }
                emit('passValue', Typeswiper.value, currentRow.id, currentRow.title);
            }
        }
    }
    lastClickedRow.value = currentRow;
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({
        "z-index": 99
    });
    $(".g-rside ").css({
        "z-index": 90
    });
    showDialog.value = true;
}
onMounted(() => {
    // WeacontentDistrict();
    GetType("district");
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
:deep(tr td:nth-child(1)) {
    width: 20vh !important;
}

tr td:nth-child(2) {
    width: 15vh;
}

tr td:nth-child(3) {
    width: 15vh;
}

tr td:nth-child(4) {
    width: 10vh;
}

tr td:nth-child(5) {
    width: 12vh;
}

/* 自定义滚动条样式 */
.txt::-webkit-scrollbar {
    width: 2px;
    /* 设置滚动条宽度 */
}

.txt::-webkit-scrollbar-track {
    /* 滚动条轨道 */
    /* background: rgb(49, 139, 167); */
}

.txt::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    background: var(--popContentHeadbg);
    z-index: 2;
}

:deep(.liSelected) {
    color: var(--sel_wraplabelcolorSel) !important;
    background: var(--swDivSelectcolor) !important;
}

:deep(.liSelected td span) {
    color: var(--sel_wraplabelcolorSel) !important;
}
</style>