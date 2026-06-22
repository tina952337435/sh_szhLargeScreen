<template>
  <div class="carousel-panel" :style="{ width: panelWidth }">
    <!-- 轮播容器 -->
    <div class="carousel-viewport" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
      <transition-group name="slide-fade" tag="div" class="cards-wrapper">
        
        <!-- 当前页的卡片 -->
        <div 
          v-for="station in currentItems" 
          :key="station.id" 
          class="station-card"
          :class="{ 
            'is-max-level': station.level === maxLevel, 
            'is-max-alarm': station.alarmCount === maxAlarm 
          }"
        >
          <!-- 卡片内容 -->
          <div class="card-header">
            <span class="station-name">{{ station.name }}</span>
            <div v-if="station.alarmCount > 0" class="alarm-badge">
              <span class="pulse-dot"></span>
              <span>超警 {{ station.alarmCount }}次</span>
            </div>
            <span v-else class="status-normal">正常</span>
          </div>

          <div class="data-row">
            <!-- <span class="icon-wrapper" v-html="icons.water"></span> -->
            <span class="data-label">最高潮位</span>
            <span class="data-value level-val">{{ station.level.toFixed(2) }}m</span>
            <!-- <span class="time-tag">{{ getTimePart(station.peakTime) }}</span> -->
          </div>

          <div class="data-row">
            <!-- <span class="icon-wrapper" v-html="icons.trend"></span> -->
            <span class="data-label">最大增水</span>
            <span class="data-value">{{ station.increase.toFixed(2) }}m</span>
            <!-- <span class="time-tag">{{ station.incTime }}</span> -->
          </div>

          <div class="data-row">
            <!-- <span class="icon-wrapper" v-html="icons.bar"></span> -->
            <span class="data-label">高潮增水</span>
            <span class="data-value">{{ station.highIncrease.toFixed(2) }}m</span>
          </div>
        </div>

      </transition-group>
    </div>

    <!-- 底部指示器 -->
    <div class="indicators">
      <span 
        v-for="(page, index) in totalPages" 
        :key="index"
        class="dot"
        :class="{ active: currentPage === index }"
        @click="goToPage(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

// --- Props ---
const props = defineProps({
  title: { type: String, default: '站点潮位实时监测' },
  data: { type: Array, required: true },
  width: { type: String, default: '100%' },
  itemsPerPage: { type: Number, default: 3 }, // 每屏显示几个
  autoPlayInterval: { type: Number, default: 5000 } // 轮播间隔 (ms)
});

// --- Icons ---
const icons = {
  water: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  trend: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  bar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/></svg>`
};

// --- Data Processing ---
const processedData = computed(() => {
  return props.data.map((item, index) => ({
    id: item.id || `station-${index}`,
    name: item.name,
    level: parseFloat(item.level),
    peakTime: item.time,
    increase: parseFloat(item.increase),
    incTime: item.incTime,
    highIncrease: parseFloat(item.highIncrease),
    alarmCount: parseInt(item.alarmCount || 0)
  })).sort((a, b) => {
    // 排序：超警多的在前，其次潮位高的在前
    if (b.alarmCount !== a.alarmCount) return b.alarmCount - a.alarmCount;
    return b.level - a.level;
  });
});

const maxLevel = computed(() => Math.max(...processedData.value.map(d => d.level), 0));
const maxAlarm = computed(() => Math.max(...processedData.value.map(d => d.alarmCount), 0));

// --- Pagination Logic ---
const totalPages = computed(() => Math.ceil(processedData.value.length / props.itemsPerPage));
const currentPage = ref(0);
const timer = ref(null);
const isPaused = ref(false);

const currentItems = computed(() => {
  const start = currentPage.value * props.itemsPerPage;
  const end = start + props.itemsPerPage;
  return processedData.value.slice(start, end);
});

// --- Actions ---
const nextSlide = () => {
  if (totalPages.value <= 1) return;
  currentPage.value = (currentPage.value + 1) % totalPages.value;
};

const prevSlide = () => {
  if (totalPages.value <= 1) return;
  currentPage.value = (currentPage.value - 1 + totalPages.value) % totalPages.value;
};

const goToPage = (index) => {
  currentPage.value = index;
  resetTimer();
};

// --- Auto Play ---
const startAutoPlay = () => {
  if (timer.value) clearInterval(timer.value);
  timer.value = setInterval(() => {
    if (!isPaused.value) {
      nextSlide();
    }
  }, props.autoPlayInterval);
};

const pauseAutoPlay = () => {
  isPaused.value = true;
};

const resumeAutoPlay = () => {
  isPaused.value = false;
};

const resetTimer = () => {
  if (timer.value) clearInterval(timer.value);
  startAutoPlay();
};

// --- Lifecycle ---
onMounted(() => {
  if (totalPages.value > 1) {
    startAutoPlay();
  }
});

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value);
});

// Utils
const getTimePart = (fullTime) => {
  if (!fullTime) return '';
  const parts = fullTime.split(' ');
  return parts.length > 1 ? parts[1] : parts[0];
};
</script>

<style scoped>
/* --- 变量 --- */
.carousel-panel {
  --cp-bg: rgba(11, 23, 50, 0.6);
  --cp-card-bg: rgba(20, 40, 80, 0.5);
  --cp-border: rgba(56, 189, 248, 0.25);
  --cp-text-main: #ffffff;
  --cp-text-sub: #fff;
  --cp-accent: #38bdf8;
  --cp-danger: #F7BC00;
  --cp-warning: #fbbf24;

  /* background: var(--cp-bg); */
  border-radius: 12px;
  padding:15px;
  font-family: 'Microsoft YaHei', sans-serif;
  color: var(--cp-text-main);
  box-sizing: border-box;
  backdrop-filter: blur(12px);
  /* border: 1px solid rgba(255,255,255,0.08); */
  display: flex;
  flex-direction: column;
}

/* 标题栏 */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-left: 4px solid var(--cp-accent);
  padding-left: 12px;
  height: 40px;
}

.title-icon {
  width: 20px;
  height: 20px;
  color: var(--cp-accent);
  filter: drop-shadow(0 0 5px var(--cp-accent));
  display: flex;
}

.panel-title {
  margin: 0 0 0 10px;
  font-size: 18px;
  font-weight: 600;
  flex-grow: 1;
  text-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
}

.controls {
  display: flex;
  gap: 8px;
}

.ctrl-btn {
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid var(--cp-accent);
  color: var(--cp-accent);
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.ctrl-btn:hover {
  background: var(--cp-accent);
  color: #000;
}

/* 轮播视口 */
.carousel-viewport {
  position: relative;
  min-height: 180px; /* 根据卡片高度调整，防止跳动 */
  overflow: hidden;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
}

.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* 自适应列宽 */
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* 自适应列宽 */
  gap: 10px;
  width: 100%;
  height: 100%;
}

/* 卡片样式 (复用之前的逻辑) */
.station-card {
  background: var(--cp-card-bg);
  border: 1px solid var(--cp-border);
  border-radius: 8px;
  padding:15px 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  overflow: hidden;
  height: 100%; /* 填满网格高度 */
  box-sizing: border-box;
}

.station-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 2px;
  background: linear-gradient(90deg, transparent, var(--cp-accent), transparent);
  opacity: 0.6;
}

.station-card.is-max-level {
  /* border-color: rgba(251, 191, 36, 0.6); */
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.15);
}
.station-card.is-max-level .level-val {
  color: var(--cp-warning);
  font-weight: bold;
  text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
}

.station-card.is-max-alarm {
  /* border-color: rgba(239, 68, 68, 0.6); */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.station-name {
  font-size: 15px;
  font-weight: bold;
  color: var(--cp-accent);
}

.alarm-badge {
  display: flex;
  align-items: center;
  gap:0px;
  background: rgba(247,188,0, 0.2);
  border: 1px solid rgba(247,188,0, 0.4);
  color: var(--cp-danger);
  font-size: 11px;
  padding: 2px 2px;
  border-radius: 4px;
}

.pulse-dot {
  width: 5px;
  height: 5px;
  background: var(--cp-danger);
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { box-shadow: 0 0 0 5px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

.status-normal {
  font-size: 11px;
  color: #475569;
}

.data-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.sub-row {
  opacity: 0.7;
  font-size: 12px;
  margin-top: auto; /* 推到底部 */
}

.icon-wrapper {
  width: 14px;
  height: 14px;
  color: var(--cp-text-sub);
  display: flex;
}
.icon-wrapper :deep(svg) { width: 100%; height: 100%; }

.data-label {
  color: var(--cp-text-sub);
  width: 50px;
  flex-shrink: 0;
  font-size: 12px;
}

.data-value {
  color: var(--cp-text-main);
  font-family: 'Consolas', monospace;
  font-weight: 600;
}

.time-tag {
  margin-left: auto;
  font-size: 10px;
  color: #64748b;
  font-family: 'Consolas', monospace;
}

/* 指示器 */
.indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
  height: 10px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--cp-accent);
  box-shadow: 0 0 8px var(--cp-accent);
  transform: scale(1.2);
}

/* 切换动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>