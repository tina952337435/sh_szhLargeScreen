<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">站点潮位统计信息</p>
        </div>
        <div class="txt" style="overflow-y: auto;">
            <!-- 卡片网格 -->
            <div class="cards-grid" :style="gridStyle">
                <div 
                    v-for="station in sortedStations" 
                    :key="station.id" 
                    class="station-card"
                    :class="{ 'is-max-level': station.level === maxLevel, 'is-max-alarm': station.alarmCount === maxAlarm }"
                >
                    <!-- 卡片顶部：站点名 + 警报徽章 -->
                    <div class="card-header">
                    <span class="station-name">{{ station.name }}</span>
                    
                    <div v-if="station.alarmCount > 0" class="alarm-badge">
                        <span class="pulse-dot"></span>
                        <span>超警 {{ station.alarmCount }}次</span>
                    </div>
                    <span v-else class="status-normal">正常</span>
                    </div>

                    <!-- 数据行 1: 最高潮位 -->
                    <div class="data-row">
                    <span class="icon-wrapper" v-html="icons.water"></span>
                    <span class="data-label">最高潮位</span>
                    <span class="data-value level-val">{{ station.level.toFixed(2) }}m</span>
                    <span class="time-tag">{{ getTimePart(station.peakTime) }}</span>
                    </div>

                    <!-- 数据行 2: 最大增水 -->
                    <div class="data-row">
                    <span class="icon-wrapper" v-html="icons.trend"></span>
                    <span class="data-label">最大增水</span>
                    <span class="data-value">+{{ station.increase.toFixed(2) }}m</span>
                    <span class="time-tag">{{ station.incTime }}</span>
                    </div>

                    <!-- 数据行 3: 高潮增水 (次要信息，透明度略低) -->
                    <div class="data-row sub-row">
                    <span class="icon-wrapper" v-html="icons.bar"></span>
                    <span class="data-label">高潮增水</span>
                    <span class="data-value">{{ station.highIncrease.toFixed(2) }}m</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableGX />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import * as echarts from "echarts";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";
import Dialog from "@/api/utils/Dialog.js";
const Typeswiper = ref('other');
const datekey = ref(null);
const dateid = ref('shujugx');
const lineOption = ref({});
const trendsTooltip = ref();
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const tableHeaders = ref([
    { name: "type", label: "数据类型" },
    // { name: "pl", label: "频率" },
    { name: "fasong", label: "已收数据量(条)" },
    { name: "jieshou", label: "应收数据量(条)" },
    { name: "dbl", label: "到报率 " },
    { name: "num", label: "调用次数" },
]);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const container =ref("");

const sortedStations=ref(
[
  { name: "高桥 (二)", level: 5.47, time: "07-26 01:10", increase: 1.69, incTime: "22:20", highIncrease: 1.05, alarmCount: 3 },
  { name: "米市渡", level: 4.79, time: "07-26 03:30", increase: 1.47, incTime: "00:50", highIncrease: 1.05, alarmCount: 4 },
  { name: "黄浦公园", level: 5.49, time: "07-26 01:50", increase: 1.69, incTime: "23:10", highIncrease: 1.18, alarmCount: 4 },
  { name: "吴淞口", level: 5.55, time: "07-26 01:15", increase: 1.73, incTime: "22:25", highIncrease: 1.10, alarmCount: 4 },
  { name: "芦潮港", level: 5.57, time: "07-26 00:30", increase: 1.43, incTime: "18:40", highIncrease: 0.91, alarmCount: 5 },
  { name: "金山嘴", level: 6.33, time: "07-26 00:55", increase: 1.74, incTime: "20:00", highIncrease: 1.26, alarmCount: 5 }
]
);
// --- 图标 SVG 字符串 (免依赖) ---
const icons = {
  water: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  trend: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  bar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/></svg>`
};
// 辅助函数：提取时间部分 (HH:mm)
const getTimePart = (fullTime) => {
  if (!fullTime) return '';
  const parts = fullTime.split(' ');
  return parts.length > 1 ? parts[1] : parts[0];
};
function Weacontent() {
    // 原始数据
        const stationData = [
            { name: "高桥 (二)", level: 5.47, time: "07-26 01:10", increase: 1.69, incTime: "22:20", highIncrease: 1.05, alarmCount: 3 },
            { name: "米市渡", level: 4.79, time: "07-26 03:30", increase: 1.47, incTime: "00:50", highIncrease: 1.05, alarmCount: 4 },
            { name: "黄浦公园", level: 5.49, time: "07-26 01:50", increase: 1.69, incTime: "23:10", highIncrease: 1.18, alarmCount: 4 },
            { name: "吴淞口", level: 5.55, time: "07-26 01:15", increase: 1.73, incTime: "22:25", highIncrease: 1.10, alarmCount: 4 },
            { name: "芦潮港", level: 5.57, time: "07-26 00:30", increase: 1.43, incTime: "18:40", highIncrease: 0.91, alarmCount: 5 },
            { name: "金山嘴", level: 6.33, time: "07-26 00:55", increase: 1.74, incTime: "20:00", highIncrease: 1.26, alarmCount: 5 }
        ];

        // 找出最大值用于高亮逻辑
        const maxLevel = Math.max(...stationData.map(d => d.level));
        const maxAlarm = Math.max(...stationData.map(d => d.alarmCount));

        // SVG 图标定义 (复用字符串)
        const icons = {
            water: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
            clock: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
            trend: `<svg class="icon" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
            alert: `<svg class="icon" viewBox="0 0 24 24" style="fill:#ef4444"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
        };

        

        stationData.forEach(item => {
            // 判断高亮样式
            const levelClass = item.level >= maxLevel - 0.1 ? 'highlight-high' : ''; // 接近最大值的标黄
            const showAlarm = item.alarmCount >= 3;
            const alarmClass = item.alarmCount === maxAlarm ? 'highlight-critical' : '';

            const cardHTML = `
                <div class="station-card">
                    <div class="card-header">
                        <span class="station-name">${item.name}</span>
                        ${showAlarm ? `
                            <div class="alarm-badge">
                                <div class="pulse-dot"></div>
                                <span>超警 ${item.alarmCount} 次</span>
                            </div>
                        ` : '<span style="font-size:12px; color:#475569">正常</span>'}
                    </div>

                    <!-- 最高潮位 -->
                    <div class="data-row">
                        ${icons.water}
                        <span class="data-label">最高潮位</span>
                        <span class="data-value ${levelClass}">${item.level.toFixed(2)}m</span>
                        <span class="time-text">${item.time.split(' ')[1]}</span>
                    </div>

                    <!-- 最大增水 -->
                    <div class="data-row">
                        ${icons.trend}
                        <span class="data-label">最大增水</span>
                        <span class="data-value">+${item.increase.toFixed(2)}m</span>
                        <span class="time-text">${item.incTime}</span>
                    </div>

                    <!-- 高潮增水 (可选，如果空间不够可以隐藏) -->
                    <div class="data-row" style="opacity: 0.8">
                        <svg class="icon" viewBox="0 0 24 24"><path d="M12 20V10M12 20V4" stroke="#38bdf8" stroke-width="2"/></svg>
                        <span class="data-label">高潮增水</span>
                        <span class="data-value">${item.highIncrease.toFixed(2)}m</span>
                    </div>
                </div>
            `;
            container.value += cardHTML;
        });
}

function handleclick(evt) {
    const name = evt.target.innerText;
    const strJson = tableData.value.find(item => item.stnm === name);
    const ChildVue = defineAsyncComponent(() =>
        import("@/components/danzhan/sq/SQLine.vue")
    );
    const props = {};
    props["stcd"] = strJson["stcd"];
    props["stime"] = dayjs(new Date()).add(-24, "hour").format("YYYY-MM-DD HH:mm:ss");
    props["etime"] = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    props["mtype"] = strJson["mtype"];
    //ChildVue为弹窗中嵌入的slot
    Dialog.open({ title: strJson["stnm"] + "水位过程线", widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
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
    // Weacontent();
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
    background: var(--mtabletrcolor);
    z-index: 2;
}

.text-xiaolv {
    height: 40px;
    width: 60px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--titled1);
    box-shadow: 0 0 10px var(--titled1), inset 0 0 10px var(--titled1);
    padding: 4px 10px;
    /* margin: 0px auto; */
    margin-top: 13px;
    line-height: 30px;
    color: var(--titled1);
    float: left;
    margin-right: 10px;
}

.text-22 {
    font-size: 22px;
}

.text-white {
    --text-opacity: 1;
    color: var(--mtablecolor);
}

.gradient-text {
    font-family: "number";
    background: linear-gradient(180deg, #ed9b42, #fef886);
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: 0;
    font-weight: 800;
}
/* --- 变量定义 (可覆盖) --- */
.tide-panel {
  --tp-bg: rgba(11, 23, 50, 0.5);
  --tp-card-bg: rgba(20, 40, 80, 0.4);
  --tp-border: rgba(56, 189, 248, 0.2);
  --tp-text-main: #ffffff;
  --tp-text-sub: #94a3b8;
  --tp-accent: #38bdf8;
  --tp-danger: #ef4444;
  --tp-warning: #fbbf24;
  
  background: rgba(11, 23, 50, 0.5);
  border-radius: 12px;
  padding: 20px;
  font-family: 'Microsoft YaHei', sans-serif;
  color: #ffffff;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.05);
}

/* 标题栏 */
.panel-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  border-left: 4px solid  #38bdf8;
  padding-left: 12px;
}

.title-icon {
  width: 20px;
  height: 20px;
  color:  #38bdf8;
  filter: drop-shadow(0 0 5px  #38bdf8);
}

.panel-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  text-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
}

/* 网格布局 */
.cards-grid {
  display: grid;
  gap: 15px;
  /* grid-template-columns 由 JS 动态控制 */
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* 自适应列宽 */

}

/* 卡片主体 */
.station-card {
  background: rgba(20, 40, 80, 0.4);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 卡片顶部光条 */
.station-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent,  #38bdf8, transparent);
  opacity: 0.6;
}

.station-card:hover {
  transform: translateY(-3px);
  border-color:  #38bdf8;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* 特殊高亮状态 */
.station-card.is-max-level {
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.1);
}
.station-card.is-max-level .level-val {
  color:  #fbbf24;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
}

.station-card.is-max-alarm {
  border-color: rgba(239, 68, 68, 0.5);
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.station-name {
  font-size: 16px;
  font-weight: bold;
  color:  #38bdf8;
}

.alarm-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-normal {
  font-size: 12px;
  color: #475569;
}

/* 呼吸灯动画 */
.pulse-dot {
  width: 6px;
  height: 6px;
  background-color: #ef4444;
  border-radius: 50%;
  animation: pulse-animation 1.5s infinite;
}

@keyframes pulse-animation {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

/* 数据行 */
.data-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.sub-row {
  opacity: 0.7;
  font-size: 12px;
}

.icon-wrapper {
  width: 16px;
  height: 16px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-wrapper :deep(svg) {
  width: 100%;
  height: 100%;
}

.data-label {
  color: #94a3b8;
  width: 55px; /* 固定宽度对齐 */
  flex-shrink: 0;
}

.data-value {
  color: #ffffff;
  font-family: 'Consolas', 'Monaco', monospace; /* 数字等宽 */
  font-weight: 500;
}

.time-tag {
  margin-left: auto;
  font-size: 11px;
  color: #64748b;
  font-family: 'Consolas', monospace;
}
</style>
