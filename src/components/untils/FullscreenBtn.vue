<template>
  <div class="fullscreen-btn" :class="{ 'is-fullscreen': !fullscreen }" @click="toggle" :title="fullscreen ? '退出全屏' : '全屏'">
    <div class="fs-particles">
      <span class="fs-dot fs-dot-top"></span>
      <span class="fs-dot fs-dot-right"></span>
      <span class="fs-dot fs-dot-bottom"></span>
      <span class="fs-dot fs-dot-left"></span>
    </div>
    <div class="fs-core">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 3 21 3 21 9"/>
        <polyline points="9 21 3 21 3 15"/>
        <polyline points="21 3 14 10"/>
        <polyline points="3 21 10 14"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

const FullScreen_Type = inject("FullScreen_Type");
const fullscreen = ref(false);

function toggle() {
  fullscreen.value = !fullscreen.value;
  localStorage.setItem("FullScreenType", fullscreen.value);
  FullScreen_Type(fullscreen.value);
}

defineExpose({ fullscreen });
</script>

<style scoped>
.fullscreen-btn {
  position: relative;
  width: 40px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; user-select: none;
  margin-left: 30px;
  margin-top: 3px;
}
.fs-particles { position: absolute; inset: 0; pointer-events: none; z-index: 3; opacity: 0; transition: opacity 0.4s ease; }
.fullscreen-btn:hover .fs-particles,
.fullscreen-btn.is-fullscreen .fs-particles { opacity: 1; }
.fs-dot { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #00e5ff; box-shadow: 0 0 5px 2px rgba(0,229,255,0.8), 0 0 10px 3px rgba(0,229,255,0.35); }
.fs-dot-top    { top: -2px; left: -2px; animation: ft 3s linear infinite; }
.fs-dot-right  { top: -2px; right: -2px; animation: fr 3s linear infinite; }
.fs-dot-bottom { bottom: -2px; right: -2px; animation: fb 3s linear infinite; }
.fs-dot-left   { bottom: -2px; left: -2px; animation: fl 3s linear infinite; }
@keyframes ft { 0%{top:-2px;left:-2px;opacity:0}5%{opacity:1}25%{top:-2px;left:calc(100% - 2px);opacity:1}30%{opacity:0}100%{top:-2px;left:-2px;opacity:0} }
@keyframes fr { 25%{top:-2px;right:-2px;opacity:0}30%{opacity:1}50%{top:calc(100% - 2px);right:-2px;opacity:1}55%{opacity:0}100%{top:-2px;right:-2px;opacity:0} }
@keyframes fb { 50%{bottom:-2px;right:-2px;opacity:0}55%{opacity:1}75%{bottom:-2px;right:calc(100% - 2px);opacity:1}80%{opacity:0}100%{bottom:-2px;right:-2px;opacity:0} }
@keyframes fl { 75%{bottom:-2px;left:-2px;opacity:0}80%{opacity:1}100%{bottom:calc(100% - 2px);left:-2px;opacity:1} }
.fs-core {
  width: 36px; height: 30px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(6,18,32,0.95);
  border: 1px solid rgba(28,177,195,0.3);
  clip-path: polygon(5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px), 0 5px);
  transition: all 0.3s ease;
  position: relative; z-index: 1;
}
.fs-core svg { width: 18px; height: 18px; color: rgba(28,177,195,0.7); transition: all 0.3s ease; }
.fullscreen-btn:hover .fs-core { border-color: rgba(28,177,195,0.55); box-shadow: 0 0 10px rgba(28,177,195,0.25); }
.fullscreen-btn:hover .fs-core svg { color: #00e5ff; filter: drop-shadow(0 0 5px rgba(0,229,255,0.6)); }
.fullscreen-btn:active .fs-core { transform: scale(0.93); }
.fullscreen-btn.is-fullscreen .fs-core { background: rgba(28,177,195,0.1); border-color: rgba(28,177,195,0.6); box-shadow: 0 0 12px rgba(28,177,195,0.3); }
.fullscreen-btn.is-fullscreen .fs-core svg { color: #00e5ff; filter: drop-shadow(0 0 6px rgba(0,229,255,0.7)); }
</style>
