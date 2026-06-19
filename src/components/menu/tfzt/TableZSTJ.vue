<template>
  <div class="m-box m-box-3-2" style="position: relative">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">站点潮位统计信息</p>
    </div>
    <div class="txt">
      <div class="station-list">
        <div
          v-for="station in sortedData"
          :key="station.stnm"
          class="station-card"
          :class="{
            'is-max-alarm': station.maxz === maxLevel,
            'is-max-alarm': station.wrzcout === maxAlarm,
          }"
        >
          <div class="card-header">
            <span class="station-name">{{ station.stnm }}</span>
            <div v-if="station.wrzcout > 0" class="alarm-badge">
              <span class="pulse-dot"></span>
              <span>超警 {{ station.wrzcout }}次</span>
            </div>
            <span v-else class="status-normal">正常</span>
          </div>
          <div class="data-row">
            <span class="data-label">最高潮位</span>
            <span class="data-value level-val"
              >{{ station.maxz.toFixed(2) }}m</span
            >
          </div>
          <div class="data-row">
            <span class="data-label">最大增水</span>
            <span class="data-value">{{ station.maxzs.toFixed(2) }}m</span>
          </div>
          <div class="data-row">
            <span class="data-label">高潮增水</span>
            <span class="data-value"
              >{{ station.maxzzs.toFixed(2) }}m</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>

<script setup>
import { ref, computed,defineProps,onMounted  } from "vue";
import { sortObjectArray, groupBy, SumJson, SetNull } from "@/api/ComUnit.js";
import apityphoon from "@/api/typhoon/index.js";
const props = defineProps({
  strJsonData: {
    type: String,
    default: {},
  },
});
const stime = ref({});
const etime = ref({});
function Weacontent() {
  var strParam = {
    enddate:etime.value,
    startdate:stime.value,
    kwtxt: "2",
  };
  apityphoon
    .ZhuantiTideTJ(strParam)
    .then((res) => {
      tideData.value = res.data;
  })
  .catch((err) => {
    console.error(err);
  });
}

const tideData = ref([]);
const sortedData = computed(() => {
  return [...tideData.value].sort((a, b) => {
    if (b.wrzcout !== a.wrzcout) return b.wrzcout - a.wrzcout;
    return b.maxz - a.maxz;
  });
});

const maxLevel = computed(() =>
  Math.max(...tideData.value.map((d) => d.maxz), 0),
);
const maxAlarm = computed(() =>
  Math.max(...tideData.value.map((d) => d.wrzcout), 0),
);

onMounted(() => {
  if (SetNull(props.strJsonData)!="") {
    if (SetNull(props.strJsonData.stm)!=""){ 
      stime.value =props.strJsonData.stm;
      etime.value =props.strJsonData.etm;
      Weacontent();
    }
  }  
});
</script>

<style>
.dashboard-right {
  width: 400px;
  height: 500px;
  background: #0b1120;
  padding: 20px;
}

.station-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  padding:5px 10px;
}

.station-card {
  background: rgba(20, 40, 80, 0.5);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 8px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.station-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #38bdf8, transparent);
  opacity: 0.6;
}

.station-card.is-max-level {
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.15);
}

.station-card.is-max-level .level-val {
  color: #fbbf24;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.station-name {
  font-size: 15px;
  font-weight: bold;
  color: #38bdf8;
}

.alarm-badge {
  display: flex;
  align-items: center;
  gap: 0px;
  background: rgba(247, 188, 0, 0.2);
  border: 1px solid rgba(247, 188, 0, 0.4);
  color: #f7bc00;
  font-size: 11px;
  padding: 2px 2px;
  border-radius: 4px;
}

.pulse-dot {
  width: 5px;
  height: 5px;
  background: #f7bc00;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  70% {
    box-shadow: 0 0 0 5px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

.status-normal {
  font-size: 11px;
  color: #fff;
}

.data-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.data-label {
  color: #fff;
  width: 50px;
  flex-shrink: 0;
  font-size: 12px;
}

.data-value {
  color: #ffffff;
  font-family: "Consolas", monospace;
  font-weight: 600;
}
</style>
