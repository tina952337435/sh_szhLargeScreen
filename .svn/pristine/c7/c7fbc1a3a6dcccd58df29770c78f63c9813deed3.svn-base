
<template>
  <div class="year-slider-container">
    <div class="control-panel">
      <el-button-group>
        <el-button @click="playPause">
          <el-icon :size="20">
            <VideoPlay v-if="!isPlaying" />
            <VideoPause v-else />
          </el-icon>
        </el-button>
        <!-- <el-button @click="prevYear">
          <el-icon :size="20"><ArrowLeft /></el-icon>
        </el-button>
        <el-button @click="nextYear">
          <el-icon :size="20"><ArrowRight /></el-icon>
        </el-button> -->
      </el-button-group>
      <!-- <span class="current-year">{{ currentYear }}</span> -->
    </div>

    <el-slider
      v-model="currentYear"
      :min="minYear"
      :max="maxYear"
      :step="1"
      :marks="yearMarks"
      @change="handleYearChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  VideoPlay,
  VideoPause,
  ArrowLeft,
  ArrowRight
} from '@element-plus/icons-vue'

const props = defineProps({
  minYear: { type: Number, default: 2000 },
  maxYear: { type: Number, default: new Date().getFullYear() },
  defaultYear: { type: Number, default: new Date().getFullYear() },
  interval: { type: Number, default: 1000 }
})

const emit = defineEmits(['year-change'])

const currentYear = ref(props.defaultYear)
const isPlaying = ref(false)
let playInterval = null

const yearMarks = computed(() => {
  const marks = {}
  for (let year = props.minYear; year <= props.maxYear; year += 5) {
    marks[year] = {
      style: { color: '#666' },
      label: year.toString()
    }
  }
  return marks
})

const playPause = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    playInterval = setInterval(() => {
      if (currentYear.value >= props.maxYear) {
        currentYear.value = props.minYear
      } else {
        currentYear.value++
      }
      emit('year-change', currentYear.value)
    }, props.interval)
  } else {
    clearInterval(playInterval)
  }
}

const prevYear = () => {
  if (currentYear.value > props.minYear) {
    currentYear.value--
    emit('year-change', currentYear.value)
  }
}

const nextYear = () => {
  if (currentYear.value < props.maxYear) {
    currentYear.value++
    emit('year-change', currentYear.value)
  }
}

const handleYearChange = (val) => {
  emit('year-change', val)
}

onBeforeUnmount(() => {
  if (playInterval) clearInterval(playInterval)
})
</script>

<style scoped>
.year-slider-container {
  padding:15px;
  width: 100%;
  margin: 0 auto;
  background:rgba(0, 17, 33, 0.4) 30% !important;
  height:80px;
}

.control-panel {
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  /* gap: 20px; */
  /* margin-bottom: 20px; */
  margin-top:8px;
  float:left;
}

.current-year {
  font-size: 24px;
  font-weight: bold;
  min-width: 80px;
  text-align: center;
}

.el-slider{
    margin-left:20px;
    width:calc(100% - 80px);
    float:left;
}
:deep(.el-slider__marks-text){
    color:var(--title2) !important;
}
</style>
