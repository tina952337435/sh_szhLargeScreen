<template>
<div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">实时槽蓄量监测</p>

                <div class="xiala" style="right: 5px;top: 0px;position: absolute;width:90px;line-height: 30px;cursor: pointer;">
                  <label id="XLTitle" @click="showItem('SWCWZLIST')"
                    style="margin-top: 4px;margin-right: 5px;font-size: 14px;font-family: var(--calcite-font-family);cursor: pointer;">
                    {{ XLTitle }}
                  </label>
                  <img src="/images/icon_select.png" style="position:absolute;right:0px;margin-top: 4px;cursor: pointer;"
                    @click="showItem('SWCWZLIST')">
                  <ul class="el-dropdown-menu"
                    style="width:90px;overflow-y:auto;margin-top:5px;font-family: var(--calcite-font-family);cursor: pointer;"
                    id="SWCWZLIST">
                      <li id="changci" class="">嘉宝北片</li>
                      <li id="1h" class="">蕰南片</li>
                      <li id="3h" class="">淀北片</li>
                      <li id="1h" class="">青松片</li>
                      <li id="3h" class="">中心城</li>
                  </ul>
              </div>
            </div>
        </div>
        <div class="txt">
            <div class="compact-tank-card">
                <!-- 标题栏 -->
                <!-- <div class="card-header">
                    <div class="title-box">
                        <div class="title-icon"></div>
                        <span class="title-text">实时槽蓄量监测</span>
                    </div>
                </div> -->

                <div class="card-body">
                <!-- 左侧：迷你图表 (占 60%) -->
                <div class="mini-chart-wrapper">
                    <div class="chart-bg-grid"></div>
                    
                    <!-- 警戒线 -->
                    <div class="threshold-line" :style="{ bottom: warningThreshold + '%' }">
                        <span class="t-label">警戒线 {{ warningThreshold }}%</span>
                    </div>

                    <!-- 水柱容器 -->
                    <div class="water-column" :style="{ height: displayHeight + '%' }">
                        <!-- 当前水量 -->
                        <div class="segment current" :style="{ height: currentPercent + '%' }">
                            <div class="wave-top"></div>
                        </div>
                        <!-- 预测增量 (正数) -->
                        <div v-if="predictValue >= 0" class="segment predict" :style="{ height: predictSegmentHeight + '%' }">
                            <div class="pattern-diagonal"></div>
                        </div>
                        <!-- 预测消落 (负数) -->
                        <div v-else class="segment predict-drop" :style="{ height: dropSegmentHeight + '%' }">
                            <span class="drop-text">↓</span>
                        </div>
                        <!-- 溢出 -->
                        <div v-if="isOverflow" class="segment overflow">
                            <span class="overflow-icon">!</span>
                        </div>
                    </div>

                    <!-- 中心数值标签 -->
                    <div class="center-value-tag" :style="{ bottom: displayHeight + '%' }">
                        <span class="cv-num">{{ totalFutureValue.toFixed(1) }}</span>
                        <span class="cv-unit">万m³</span>
                    </div>
                </div>

                <!-- 右侧：数据列表 (占 40%) -->
                <div class="data-list-wrapper">
                    <div class="data-item">
                        <div class="d-label">当前槽蓄量</div>
                        <div class="d-row">
                            <span class="d-icon-bar" style="background: #0ea5e9"></span>
                            <span class="d-value">{{ currentValue.toFixed(2) }}</span>
                            <div class="d-sub">{{ currentPercent.toFixed(1) }}% 占比</div>
                        </div>
                        
                    </div>

                    <div class="data-item">
                        <div class="d-label">预测增量</div>
                        <div class="d-row">
                            <span class="d-icon-bar" :style="{ background: predictValue >= 0 ? '#38bdf8' : '#2dd4bf' }"></span>
                            <span class="d-value">
                              {{ predictValue >= 0 ? '+' : '' }}{{ predictValue.toFixed(2) }}
                            </span>                            
                            <div class="d-sub">未来 24h</div>
                        </div>
                    </div>

                    <div class="data-item">
                        <div class="d-label">剩余库容</div>
                        <div class="d-row">
                            <span class="d-icon-bar" style="background:rgb(54 188 8);"></span>
                            <span class="d-value">
                              {{ shengyuFutureValue.toFixed(2) }}
                            </span>                            
                            <!-- <div class="d-sub">未来 24h</div> -->
                        </div>
                    </div>
                    
                    <!-- 状态指示器 (可选，模仿截图右侧的小图标) -->
                    <!-- <div class="status-indicator-box" :class="statusClass">
                        <span class="status-dot"></span>
                        <span class="status-text">{{ statusText }}</span>
                    </div> -->
                </div>
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
</div>
  
</template>

<script setup>
import { computed,ref } from 'vue';
const XLTitle = ref("嘉宝北片");

const props = defineProps({
  totalCapacity: { type: Number, default: 0},
  currentValue: { type: Number, default: 0 },
  predictValue: { type: Number, default: 0 },
  warningThreshold: { type: Number, default: 85 }
});

// --- 计算逻辑 ---
const totalFutureValue = computed(() => props.currentValue + props.predictValue);
const safeFutureValue = computed(() => Math.max(0, totalFutureValue.value));
const shengyuFutureValue = props.totalCapacity-totalFutureValue.value;//剩余库容
const currentPercent = computed(() => (props.currentValue / props.totalCapacity) * 100);
const futurePercent = computed(() => (safeFutureValue.value / props.totalCapacity) * 100);
const totalPercentRaw = computed(() => (totalFutureValue.value / props.totalCapacity) * 100);

// 上涨模式
const displayHeight = computed(() => Math.min(totalPercentRaw.value, 100));
const predictSegmentHeight = computed(() => {
  if (props.predictValue < 0) return 0;
  if (totalPercentRaw.value <= 100) return (props.predictValue / props.totalCapacity) * 100;
  return 100 - currentPercent.value;
});

// 下降模式
const dropSegmentHeight = computed(() => {
  if (props.predictValue >= 0) return 0;
  return currentPercent.value - futurePercent.value;
});

const isOverflow = computed(() => totalPercentRaw.value > 100);
const isWarning = computed(() => !isOverflow.value && futurePercent.value > props.warningThreshold);

const statusText = computed(() => {
  if (isOverflow.value) return '超限';
  if (isWarning.value) return '警戒';
  if (props.predictValue < 0) return '预泄';
  return '正常';
});

const statusClass = computed(() => {
  if (isOverflow.value) return 'st-critical';
  if (isWarning.value) return 'st-warning';
  return 'st-safe';
});

function showItem(id) {
  var obj = $("#" + id);
  var dis = obj.css("display");
  if (dis == "block") {
    obj.css("display", "none");
  } else {
    obj.css("display", "block");
  }
}
</script>

<style scoped>
/* --- 容器：适应侧边栏 --- */
.compact-tank-card {
  width: 100%;
  /* 关键：根据截图比例，高度设为固定或 aspect-ratio，这里设为自动适应内容，但限制最大宽度 */
  /* max-width: 400px;  */
  /*background: rgba(13, 22, 35, 0.9);  深空蓝背景 */
  /* border: 1px solid rgba(56, 189, 248, 0.15); */
  /*border-radius: 4px;  小圆角 */
  padding: 12px;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* --- 标题 --- */
.card-header {
  margin-bottom: 10px;
  border-left: 3px solid #0ea5e9; /* 左侧亮蓝条 */
  padding-left: 8px;
}
.title-box {
  display: flex;
  align-items: center;
  gap: 6px;
}
.title-icon {
  width: 12px;
  height: 12px;
  background: #0ea5e9;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%); /* 小箭头形状 */
}
.title-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e2e8f0;
  letter-spacing: 1px;
}

/* --- 主体布局 --- */
.card-body {
  display: flex;
  gap: 10px;
  /*height: 160px;  固定高度，确保紧凑 */
}

/* === 左侧图表区 === */
.mini-chart-wrapper {
  flex: 1.2; /* 略宽一点给图表 */
  position: relative;
  /* background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2px; */
  overflow: hidden;
}

.chart-bg-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 100% 25%, 33% 100%; /* 4 格横线 */
  z-index: 0;
}

.threshold-line {
  position: absolute;
  left: 0; right: 0;
  border-bottom: 1px dashed #ef4444;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  line-height:normal;
}
.t-label {
  background: #ef4444;
  color: white;
  font-size: 0.76rem;
  padding: 1px 4px;
  border-radius: 1px;
  margin-right: 2px;
  /* font-weight: bold; */
}

.water-column {
  position: absolute;
  bottom: 0;
  left: 15%;
  width: 70%;
  transition: height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 5;
  display: flex;
  flex-direction: column-reverse;
}

.segment {
  width: 100%;
  transition: height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

/* 当前水 */
.segment.current {
  background: linear-gradient(180deg, #0284c7 0%, #0369a1 100%);
  box-shadow: 0 0 10px rgba(2, 132, 199, 0.5);
}
.wave-top {
  position: absolute;
  top: -4px; left: 0; right: 0;
  height: 8px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 120 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 10 Q 30 20 60 10 T 120 10 V 20 H 0 Z" fill="%2338bdf8" opacity="0.9"/></svg>');
  background-size: 200% 100%;
  animation: waveMove 3s linear infinite;
}

/* 预测增 */
.segment.predict {
  background: repeating-linear-gradient(45deg, rgba(56, 189, 248, 0.4), rgba(56, 189, 248, 0.4) 4px, rgba(56, 189, 248, 0.1) 4px, rgba(56, 189, 248, 0.1) 8px);
  border-top: 1px solid rgba(255,255,255,0.3);
}
.pattern-diagonal {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1));
  animation: shimmer 2s infinite;
}

/* 预测降 */
.segment.predict-drop {
  background: rgba(45, 212, 191, 0.1);
  border-top: 1px dashed #2dd4bf;
  border-left: 1px dashed rgba(45, 212, 191, 0.3);
  border-right: 1px dashed rgba(45, 212, 191, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2dd4bf;
  font-weight: bold;
}
.drop-text { font-size: 1.7rem; }

/* 溢出 */
.segment.overflow {
  background: #ef4444;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-top: 1px solid #fff;
  animation: shake 0.5s infinite;
}
.overflow-icon { font-size: 0.8rem; }

/* 中心数值标签 - 修复版 */
.center-value-tag {
  position: absolute;
  left: 50%;
  /* 【关键修改 1】只保留水平居中，去掉垂直偏移 translateY(-100%) */
  transform: translateX(-50%); 
  
  /* 【关键修改 2】使用 margin-top 来控制“浮在水面上方”的距离，而不是用 margin-bottom */
  /* 当 bottom: 0% 时，它会紧贴底部；当 bottom: 50% 时，它会浮在 50% 刻度线上方 4px 处 */
  margin-top: -4px; 
  
  background: rgba(13, 22, 35, 0.95);
  border: 1px solid #0ea5e9;
  padding: 4px 8px;
  border-radius: 2px;
  text-align: center;
  z-index: 20;
  
  /* 过渡效果 */
  transition: bottom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 10px rgba(14, 165, 233, 0.3);
  min-width: 60px;
  
  /* 确保内部内容正常排列 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 可选：如果你希望标签完全“坐”在水面上（一半在水里），可以把 margin-top 改为 0 */
/* 如果你希望标签完全浮在水面上方，保持 -4px 或者改为 -100% (即标签高度) */

.cv-num { 
  display: block; 
  font-size: 0.9rem; 
  font-weight: 800; 
  color: #fff; 
  line-height: 1; 
}
.cv-unit { 
  display: block; 
  font-size: 0.55rem; 
  color: #94a3b8; 
  margin-top: 2px; 
}

/* === 右侧数据区 === */
.data-list-wrapper {
  flex: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  padding-left: 5px;
}

.data-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 2px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.d-label {
  font-size: 0.875rem;
  color: #ffffff;
  margin-bottom: 4px;
}
.d-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.d-icon-bar {
  width: 3px;
  height: 20px;
  border-radius: 1px;
}
.d-value {
  font-size: 22px;
  /* font-weight: 700;
  font-family: 'Courier New', monospace; */
  color: var(--titled1);
}
.text-up { color: var(--titled1); }
.text-down { color: #2dd4bf; }

.d-sub {
  font-size: 0.75rem;
  color: #fff;
  margin-top: 2px;
  text-align: right;
}

/* 状态盒 */
.status-indicator-box {
  margin-top: auto;
  padding: 6px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: bold;
  border: 1px solid transparent;
}
.st-safe { background: rgba(34, 197, 94, 0.1); color: #4ade80; border-color: rgba(34, 197, 94, 0.2); }
.st-warning { background: rgba(245, 158, 11, 0.1); color: #fbbf24; border-color: rgba(245, 158, 11, 0.2); }
.st-critical { background: rgba(239, 68, 68, 0.15); color: #f87171; border-color: rgba(239, 68, 68, 0.3); animation: pulse 1.5s infinite; }

.status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 5px currentColor;
}

/* 动画 */
@keyframes waveMove { 0% { background-position: 0 0; } 100% { background-position: -200% 0; } }
@keyframes shimmer { 0% { opacity: 0.3; } 50% { opacity: 0.8; } 100% { opacity: 0.3; } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-2px); } 75% { transform: translateX(2px); } }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
</style>