<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div style="line-height:30px;">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()">{{ titleText }}</p>
        <span class="spanTitle"></span>
      </div>
      <div style="width: calc(100% - 220px)" class="div-swiper">
        <div
          class="swiper-slide"
          style="width:50%"
          :class="currentMode == 'area' && 'swiper-slide swiper-slide-thumb-active'"
          @click="switchMode('area')"
        >
          面雨量
        </div>
        <div
          class="swiper-slide"
          style="width: 50%"
          :class="currentMode == 'station' && 'swiper-slide swiper-slide-thumb-active'"
          @click="switchMode('station')"
        >
          最大站点
        </div>
      </div>
    </div>
    <div class="txt">
      <ul class="rcUl">
        <li v-for="card in cardList" :key="card.label">
          <div class="rcUlTitle">{{ card.label }}</div>
          <div
            class="rcUlValue"
            :class="{ 'station-value': currentMode === 'station' }"
            :title="currentMode === 'area' ? card.tip : ''"
            @click="currentMode === 'station' ? openProcess(card) : undefined"
          >
            <template v-if="currentMode === 'area'">{{ card.value }}</template>
            <template v-else>
              <span class="sv-drp">{{ card.drp }}</span>
              <span class="sv-name" :title="card.fullName">{{ card.shortName }}</span>
            </template>
          </div>
        </li>
      </ul>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>

  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <EchartYQAreaTJ :typenameRadio="props.typenameRadio" />
  </ComZujian>

  <MyDialog :showDialog="showDialogMOre" @close="showDialogMOre = false" :title="titleMOre" :typeValue="typeValueMOre"
    style="width: 1400px; height: 800px">
    <EchartYQTopTenMore :typenameRadio="props.typenameRadio" />
  </MyDialog>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import EchartYQTopTenMore from "@/components/menu/yq/EchartYQTopTenMore.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive, inject, computed, h, defineAsyncComponent } from "vue";
import Dialog from "@/api/utils/Dialog.js";
import customTable from "@/components/Table/customTable.vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("daytopTen");
const Drpswiper = ref("YL1");
const stime = ref("");
const etime = ref("");
const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
});

const showDialogMOre = ref(false);
const titleMOre = ref("小时雨强排名前10");
const pathname = ref("60");
const typeValueMOre = props.typenameRadio;
const rain_event = ref(0.0);
const rain_24h = ref(0.0);
const rain_1h = ref(0.0);
const rain_12h = ref(0.0);
const rain_3h = ref(0.0);
const rain_6h = ref(0.0);

// ========== 切换模式 ==========
const currentMode = ref('area'); // 'area' | 'station'
const pid = ref("201901101419326076-1-1,201901101419326076-5");
const stationSummary = ref({
  max60min: null,
  max3h: null,
  max6h: null,
  max12h: null,
  max24h: null,
});

// 标题文字随模式切换
const titleText = computed(() => {
  return currentMode.value === 'area' ? '时段统计' : '时段统计';
});

// 格式化雨量值，保留1位小数
function fmtDrp(item) {
  if (!item || item.drp == null) return '--';
  return Number(item.drp).toFixed(1);
}

// 站名截断：超6字加省略号
function shortName(name) {
  if (!name) return '--';
  return name.length > 6 ? name.substring(0, 6) + '...' : name;
}

// 格式化站点卡片 tip（悬浮显示起止时间）
function formatStationTip(item) {
  if (!item || !item.stnm) return '';
  return item.stnm + ' ' + (item.stime || '') + ' ~ ' + (item.etime || '');
}

// 卡片数据列表
const cardList = computed(() => {
  if (currentMode.value === 'area') {
    return [
      { label: '1h', value: rain_1h.value != null ? Number(rain_1h.value).toFixed(1) : '--', tip: '' },
      { label: '3h', value: rain_3h.value != null ? Number(rain_3h.value).toFixed(1) : '--', tip: '' },
      { label: '6h', value: rain_6h.value != null ? Number(rain_6h.value).toFixed(1) : '--', tip: '' },
      { label: '12h', value: rain_12h.value != null ? Number(rain_12h.value).toFixed(1) : '--', tip: '' },
      { label: '24h', value: rain_24h.value != null ? Number(rain_24h.value).toFixed(1) : '--', tip: '' },
    ];
  } else {
    const s = stationSummary.value;
    return [
      { label: '最大60min', drp: fmtDrp(s.max60min), fullName: s.max60min?.stnm || '', shortName: shortName(s.max60min?.stnm), tip: formatStationTip(s.max60min), raw: s.max60min },
      { label: '最大3h',   drp: fmtDrp(s.max3h),   fullName: s.max3h?.stnm   || '', shortName: shortName(s.max3h?.stnm),   tip: formatStationTip(s.max3h),   raw: s.max3h },
      { label: '最大6h',   drp: fmtDrp(s.max6h),   fullName: s.max6h?.stnm   || '', shortName: shortName(s.max6h?.stnm),   tip: formatStationTip(s.max6h),   raw: s.max6h },
      { label: '最大12h',  drp: fmtDrp(s.max12h),  fullName: s.max12h?.stnm  || '', shortName: shortName(s.max12h?.stnm),  tip: formatStationTip(s.max12h),  raw: s.max12h },
      { label: '最大24h',  drp: fmtDrp(s.max24h),  fullName: s.max24h?.stnm  || '', shortName: shortName(s.max24h?.stnm),  tip: formatStationTip(s.max24h),  raw: s.max24h },
    ];
  }
});

// 切换模式
function switchMode(mode) {
  if (currentMode.value === mode) return;
  currentMode.value = mode;
  if (mode === 'station') {
    fetchStationData();
  }
}

// 获取站点最大滑动降雨量
function fetchStationData() {
  const params = {
    stime: stime.value,
    etime: etime.value,
    pid: pid.value,
  };
  api.queryMaxSlidingRainfall(params)
    .then((res) => {
      if (res.data && res.data && res.data.summary) {
        stationSummary.value = res.data.summary;
      }
    })
    .catch((err) => {
      console.error('查询站点最大滑动降雨量失败:', err);
    });
}

// 点击单站卡片弹出降雨过程
function openProcess(card) {
  if (!card.raw || !card.raw.stcd) return;
  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/sq/DanZHanSel.vue")
  );
  const strWhere = {};
  strWhere["stcd"] = card.raw.stcd;
  strWhere["stime"] = card.raw.stime || stime.value;
  strWhere["etime"] = card.raw.etime || etime.value;
  strWhere["mtype"] = card.raw.mtype || "";
  strWhere["type"] = "降雨过程";
  Dialog.open({ title: card.raw.stnm, widh: 1500, heig: 700 }, h(ChildVue, strWhere)).then(() => { console.log('弹窗关闭了') });
}

function Weacontent() {
  var strParam = {};
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  api
    .getRainDashboardr(strParam)
    .then((res) => {
      const jsondata = res.data;
      if (SetNull(jsondata) != "") {
        rain_event.value = jsondata.rain_event;
        rain_24h.value = jsondata.rain_24h;
        rain_1h.value = jsondata.rain_1h;
        rain_12h.value = jsondata.rain_12h;
        rain_3h.value = jsondata.rain_3h;
        rain_6h.value = jsondata.rain_6h;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
  dateid.value = "daytopTen1";
}
onMounted(() => {
  var nowTM = new Date();
  stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD  HH:00:00"))
    .add(-24, "hour")
    .format("YYYY-MM-DD HH:mm:ss");
  etime.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
  Weacontent();
});
</script>

<style scoped>
.rcUl {
  margin: 0px auto;
  width: 100%;
}

.rcUl li {
  list-style: none;
  float: left;
  width: calc(33.33% - 22px);
  text-align: center;
  margin-right: 15px;
  margin-top: 15px;
}

.rcUl li:first-child,
.rcUl li:nth-child(4) {
  /* margin-left: 15px; */
}

.rcUlTitle {
  /*font-size: 15px;*/
  border-radius: 10px 10px 0px 0px;
  /*background: #3AC082;*/
  background: var(--rcUlTitleBg);
  height: 40px;
  line-height: 40px;
  color: white;
  font-size: 15px;
}

.rcUlValue {
  border-radius: 0px 0px 10px 10px;
  background: #F4F4F4;
  height: 40px;
  line-height: 40px;
  font-size: 26px;
  /* font-weight: 550; */
  margin: 0px;
  /*font-family: 'number';*/
  cursor: pointer;
  color: rgb(27, 137, 243);
  color: rgb(26 212 115);
  color: var(--titled1);
  background-color: var(--rcUlValueBg);
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 4px;
}

/* ========== 站点卡片两行布局（自适应高度） ========== */
.rcUlValue.station-value {
  height: auto;
  line-height: normal;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 2px;
  overflow: visible;
}

.sv-drp {
  font-size: 22px;
  /* font-weight: bold; */
  line-height: 1.35;
  color: var(--titled1);
}

.sv-name {
  font-size: 12px;
  line-height: 1.35;
  color: var(--titled1);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
