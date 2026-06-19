<template>
<div class="m-box">
      <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()" style="width: 120px;">预测水位</p>
        
        <span class="spanTitle"></span>
      </div>
      <div class="txt">
        <!-- 滚动视口 -->
        <div 
        class="scroll-viewport"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
        @touchstart="isPaused = true"
        @touchend="isPaused = false"
        >
        <!-- 加载状态 -->
        <div v-if="isLoading" class="loading-state">
            <span class="spinner"></span> 更新中...
        </div>

        <!-- 滚动轨道 -->
        <div 
            v-else-if="processedData.length > 0"
            class="scroll-track"
            :class="{ 'paused': isPaused }"
            :style="trackStyle"
        >
            <!-- 双倍渲染实现无缝循环 -->
            <template v-for="group in [1, 2]" :key="group">
            <div 
                v-for="item in processedData" 
                :key="`${item.code}-${group}`"
                class="forecast-row"
                :class="getRiskClass(item)"
            >
                <!-- 1. 左侧：站点名 & 状态标 -->
                <div class="col-left">
                <span class="station-name" :title="item.name">{{ item.name }}</span>
                <span class="status-tag" :class="item.riskType">
                    {{ item.riskLabel }}
                </span>
                </div>

                <!-- 2. 中间：核心水位 (大号字体) -->
                <div class="col-center">
                <span class="water-level" :style="{ color: getRiskColor(item) }">
                    {{ item.maxLevel.toFixed(2) }}
                    <span class="unit">m</span>
                </span>
                <span class="sub-label">预测最高</span>
                </div>

                <!-- 3. 右侧：迷你趋势图 & 时间 -->
                <div class="col-right">
                <!-- 迷你 SVG 趋势 (压缩版) -->
                <div class="mini-sparkline">
                    <svg viewBox="0 0 60 20" preserveAspectRatio="none">
                    <polyline 
                        :points="getCompactPoints(item.trend)" 
                        fill="none" 
                        :stroke="getRiskColor(item)" 
                        stroke-width="2" 
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <!-- 峰值点 -->
                    <circle 
                        :cx="getPeakX(item.trend, 60)" 
                        :cy="getPeakY(item.trend, 20)" 
                        r="1.5" 
                        :fill="getRiskColor(item)" 
                    />
                    </svg>
                </div>
                <div class="time-box">
                    <span class="time-val">{{ item.peakTimeStr }}</span>
                    <span class="countdown" v-if="item.countdownHours >= 0">
                    {{ formatCountdown(item.countdownHours) }}
                    </span>
                </div>
                </div>
            </div>
            </template>
        </div>

        <div v-else-if="!isLoading" class="empty-state">暂无预报数据</div>
        </div>
      </div>
      <div class="bot leftBottom-radius"></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  height: { type: String, default: '300px' }, // 默认高度
  showHeader: { type: Boolean, default: true },
  apiUrl: { type: String, default: '' },
  autoRefresh: { type: Boolean, default: true },
  refreshInterval: { type: Number, default: 60000 }
});

const internalData = ref([]);
const isLoading = ref(true);
const isPaused = ref(false);
let timer = null;

// --- 数据获取 (保持原有逻辑，复用您的模拟数据) ---
const fetchData = async () => {
  isLoading.value = true;
  try {
    let data = [];
    if (props.apiUrl) {
      const res = await fetch(props.apiUrl);
      if (!res.ok) throw new Error('Network error');
      data = await res.json();
    } else {
      // 复用您提供的优质模拟数据
      await new Promise(r => setTimeout(r, 800));
      data = getMockData(); 
    }
    internalData.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const getMockData = () => {
  const nowBase = new Date('2026-03-16 18:27:00');
  return [
    { code: 'SPDQ', name: '松浦大桥', warningLevel: 4.50, forecastSeries: [2.7, 2.9, 3.2, 3.8, 4.2, 4.55, 4.4, 4.1, 3.8], peakTimeRaw: '2026-03-17 02:30:00' },
    { code: 'WSK', name: '吴淞口', warningLevel: 5.00, forecastSeries: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.5, 3.4, 3.3], peakTimeRaw: '2026-03-17 00:00:00' },
    { code: 'DF', name: '淀峰', warningLevel: 3.50, forecastSeries: [2.2, 2.3, 2.4, 2.45, 2.4, 2.3, 2.2, 2.1, 2.0], peakTimeRaw: '2026-03-16 21:00:00' },
    { code: 'HPGY', name: '黄浦公园', warningLevel: 4.80, forecastSeries: [3.0, 3.1, 3.3, 3.5, 3.8, 4.1, 4.3, 4.2, 4.0], peakTimeRaw: '2026-03-17 01:00:00' },
    { code: 'LJZ', name: '陆家嘴', warningLevel: 4.60, forecastSeries: [2.8, 2.9, 3.0, 3.2, 3.4, 3.5, 3.4, 3.3, 3.1], peakTimeRaw: '2026-03-16 23:30:00' },
  ].map(item => {
    const maxLevel = Math.max(...item.forecastSeries);
    const isWarning = maxLevel >= item.warningLevel;
    const isDanger = maxLevel >= (item.warningLevel * 0.9);
    
    const dateObj = new Date(item.peakTimeRaw);
    const peakTimeStr = `${dateObj.getMonth()+1}/${dateObj.getDate()} ${String(dateObj.getHours()).padStart(2,'0')}:${String(dateObj.getMinutes()).padStart(2,'0')}`;
    
    const now = new Date('2026-03-16 18:27:00'); 
    const countdownHours = (dateObj - now) / (1000 * 60 * 60);

    // 生成趋势坐标 (归一化到 0-60, 0-20)
    const minVal = Math.min(...item.forecastSeries) * 0.95;
    const range = Math.max(...item.forecastSeries) - minVal || 1;
    const trend = item.forecastSeries.map((val, idx) => {
      const x = (idx / (item.forecastSeries.length - 1)) * 60;
      const y = 20 - ((val - minVal) / range) * 20;
      return [x, y];
    });

    return {
      ...item,
      maxLevel,
      isWarning,
      isDanger,
      peakTimeStr,
      countdownHours,
      trend,
      riskType: isWarning ? 'warning' : (isDanger ? 'danger' : 'normal'),
      riskLabel: isWarning ? '超警' : (isDanger ? '警戒' : '正常')
    };
  });
};

const processedData = computed(() => {
  // 排序：超警 > 警戒 > 正常，同级别按水位高低
  return [...internalData.value].sort((a, b) => {
    const score = (i) => i.isWarning ? 3 : (i.isDanger ? 2 : 1);
    if (score(a) !== score(b)) return score(b) - score(a);
    return b.maxLevel - a.maxLevel;
  });
});

const trackStyle = computed(() => {
  const count = processedData.value.length;
  if (count === 0) return {};
  // 每行高度约 48px，计算滚动速度
  const duration = Math.max(15, count * 3); 
  return { '--scroll-duration': `${duration}s` };
});

// --- 辅助函数 ---
const getRiskClass = (item) => `row-${item.riskType}`;
const getRiskColor = (item) => {
  if (item.riskType === 'warning') return '#F7BC00';
  if (item.riskType === 'danger') return '#faad14';
  return '#1890ff';
};
const getCompactPoints = (points) => points.map(p => `${p[0]},${p[1]}`).join(' ');
const getPeakX = (points, width) => {
  let minY = 20, x = 0;
  points.forEach(([px, py]) => { if (py < minY) { minY = py; x = px; } });
  return x;
};
const getPeakY = (points) => {
  let minY = 20;
  points.forEach(([_, py]) => { if (py < minY) minY = py; });
  return minY;
};
const formatCountdown = (h) => h < 1 ? `${Math.round(h*60)}分` : `${Math.round(h)}时`;

onMounted(() => {
  fetchData();
//   if (props.autoRefresh) timer = setInterval(fetchData, props.refreshInterval);
});
onBeforeUnmount(() => clearInterval(timer));
</script>

<style scoped>
/* 容器 */
.compact-forecast-wrapper {
  width: 100%;
  background: rgba(10, 25, 45, 0.6); /* 半透明深色背景 */
  border-radius: 8px;
  border: 1px solid rgba(30, 60, 100, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Segoe UI', Roboto, 'Microsoft YaHei', sans-serif;
  color: #e0e6ed;
  backdrop-filter: blur(8px);
}

/* 头部 */
.list-header {
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
}
.header-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #666;
}
.header-dot.blink {
  background: #52c41a;
  box-shadow: 0 0 6px #52c41a;
  animation: blink 1.5s infinite;
}

/* 滚动区 */
.scroll-viewport {
  flex: 1;
  overflow: hidden;
  position: relative;
}
.loading-state, .empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666;
  font-size: 14px;
}
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.1);
  border-top-color: #1890ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
}

.scroll-track {
  display: flex;
  flex-direction: column;
  animation: scroll-up var(--scroll-duration, 30s) linear infinite;
  will-change: transform;
}
.scroll-track.paused { animation-play-state: paused; }

/* 单行样式 (核心改造) */
.forecast-row {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 1.2fr; /* 左：名字，中：水位，右：图表+时间 */
  align-items: center;
  height: 48px; /* 固定行高，紧凑 */
  padding: 0 12px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  font-size: 13px;
  transition: background 0.2s;
  background: rgba(255,255,255,0.01);
}
.forecast-row:hover {
  background: rgba(255,255,255,0.05);
}

/* 左侧：名字 + 标签 */
.col-left {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
}
.station-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  color: #fff;
}
.status-tag {
  font-size: 14px;
  padding: 1px 6px;
  border-radius: 3px;
  font-weight: bold;
  white-space: nowrap;
}
.row-warning .status-tag { background: rgba(247,188,0, 0.15); color: #F7BC00; border: 1px solid rgba(247,188,0, 0.3); }
.row-danger .status-tag { background: rgba(250, 173, 20, 0.15); color: #faad14; border: 1px solid rgba(250, 173, 20, 0.3); }
.row-normal .status-tag { background: rgba(24, 144, 255, 0.15); color: #1890ff; border: 1px solid rgba(24, 144, 255, 0.3); }

/* 中间：水位 */
.col-center {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 8px;
}
.water-level {
  font-size: 18px;
  font-weight: 800;
  font-family: 'DIN Alternate', 'Arial Black', monospace;
  line-height: 1;
}
.unit { font-size: 12px; font-weight: normal; color: #aab8c9; margin-left: 2px; }
.sub-label { font-size: 11px; color: #bebbbb; margin-top: 2px; }

/* 右侧：图表 + 时间 */
.col-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}
.mini-sparkline {
  width: 60px;
  height: 20px;
  opacity: 0.8;
}
.time-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 13px;
  line-height: 1.2;
}
.time-val { color: #aab8c9; font-family: monospace; }
.countdown { color: rgb(24, 144, 255); font-weight: bold; font-size: 13px; }
.row-warning .countdown { color: #ffd700; }

/* 动画 */
@keyframes scroll-up {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes spin { to { transform: rotate(360deg); } }
</style>