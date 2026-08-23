<template>
  <div class="video-tab">
    <StationVideoDialog v-if="cameras.length" :cameras="cameras" />
    <div v-else-if="loading" class="empty">加载中…</div>
    <div v-else class="empty">该站点暂无视频</div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import StationVideoDialog from "@/components/menu/video/StationVideoDialog.vue";
import api from "@/api/zonglan/index.js";
import { SetNull } from "@/api/ComUnit";

// 站点编码（由 DanZHanSel 通过 provide("stcd") 注入）
const stcd = inject("stcd", ref(""));

const cameras = ref([]);
const loading = ref(false);

onMounted(async () => {
  const code = stcd.value;
  if (SetNull(code) == "") return;

  loading.value = true;
  try {
    const res = await api.myVideoFindResult({ stcd: code });
    const list = res.data || [];

    // 站点：pid=-1；摄像头：pid=站点id
    const station = list.find((x) => SetNull(x.pid) == "" || x.pid == "-1");
    let cams = station ? list.filter((x) => x.pid == station.id) : [];

    // 找不到子类就是自己：站点自身就是那个摄像头
    if (!cams.length && station && SetNull(station.channels) != "" && SetNull(station.serial) != "") {
      cams = [station];
    }

    cameras.value = cams;
  } catch (e) {
    console.error("加载视频失败", e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.video-tab {
  height: 100%;
  min-height: 0;
}
.empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}
</style>
