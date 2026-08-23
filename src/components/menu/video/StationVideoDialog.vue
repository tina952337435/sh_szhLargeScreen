<template>
  <div class="station-video">
    <!-- 左侧：摄像头列表 -->
    <div class="sv-left">
      <div class="sv-title">摄像头列表（{{ cameras.length }}）</div>
      <ul class="sv-list">
        <li
          v-for="item in cameras"
          :key="item.id"
          :class="{ active: item.id === currentId }"
          @click="select(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <!-- 右侧：播放器 -->
    <div class="sv-right">
      <template v-if="currentId">
        <!-- <div class="sv-title">{{ current.name }}</div> -->
        <div class="sv-player">
          <VideoPlayer
            :key="currentId"
            :serial="current.serial"
            :code="current.channels"
            muted
            @error="onError"
          />
        </div>
      </template>
      <div v-else class="sv-empty">请选择摄像头</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VideoPlayer from "./VideoPlayer.vue";

const props = defineProps({
  cameras: { type: Array, default: () => [] },
});

const currentId = ref("");
const current = ref({});

function select(item) {
  currentId.value = item.id;
  current.value = item;
}

function onError(e) {
  console.error("播放出错：", e);
}

onMounted(() => {
  if (props.cameras.length) select(props.cameras[0]);
});
</script>

<style scoped>
.station-video {
  display: flex;
  height: 100%;
  min-height: 0;
  color: #cde;
}
.sv-left {
  width: 240px;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 10px 12px 0px 12px;
}
.sv-right {
  flex: 1;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.sv-title {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 10px;
  height: 24px;
  line-height: 24px;
  flex-shrink: 0;
}
.sv-list {
  flex: 1;
  overflow: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}
.sv-list li {
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 2px;
  font-size: 14px;
}
.sv-list li:hover {
  background: rgba(0, 228, 255, 0.15);
  color: #fff;
}
.sv-list li.active {
  background: #00e4ff;
  color: #003;
}
.sv-player {
  flex: 1;
  min-height: 0;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
}
.sv-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}
</style>
