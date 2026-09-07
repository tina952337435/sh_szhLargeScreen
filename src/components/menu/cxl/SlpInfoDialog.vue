<template>
  <transition name="fade">
    <div v-if="visible" class="slp-info-overlay" @click.self="$emit('close')">
      <div class="slp-info-dialog">
        <div class="dialog-head">
          <span class="dialog-title">{{ data.slpName || '水利片区' }}</span>
          <img src="/images/close.png" class="dialog-close" @click="$emit('close')" alt="关闭" />
        </div>
        <div class="dialog-body">
          <div class="info-row" v-for="item in infoList" :key="item.label">
            <span class="info-label">{{ item.label }}</span>
            <span class="info-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  visible: { type: Boolean, default: false },
  data: { type: Object, default: () => ({}) },
});
defineEmits(["close"]);

function fmt(v, unit, decimals) {
  if (v == null || v === "") return "—";
  var n = Number(v);
  if (isNaN(n)) return String(v);
  var s = decimals != null ? n.toFixed(decimals) : String(n);
  return unit ? s + " " + unit : s;
}

const infoList = computed(() => {
  var d = props.data;
  return [
    { label: "面积", value: fmt(d.area, "km²", 2) },
    { label: "河湖面积", value: fmt(d.hhArea, "km²", 2) },
    { label: "代表站", value: d.stnmList || "—" },
    { label: "常水位", value: fmt(d.cSw, "m", 2) },
    { label: "警戒水位", value: fmt(d.xjjSw, "m", 2) },
    { label: "保证水位", value: fmt(d.bzSw, "m", 2) },
    { label: "警戒水位对应库容", value: fmt(d.xjjKr, "百万m³", 1) },
    { label: "保证水位对应库容", value: fmt(d.bzKr, "百万m³", 1) },
    { label: "排涝能力", value: fmt(d.plnl, "万m³", 1) },
    { label: "径流系数", value: fmt(d.jlxs2, null, 2) },
  ];
});
</script>

<style scoped>
.slp-info-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slp-info-dialog {
  width: 360px;
  background: linear-gradient(180deg, rgba(5, 28, 50, 0.98), rgba(2, 12, 25, 0.99));
  border: 1px solid rgba(0, 200, 220, 0.4);
  border-radius: 8px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}
.dialog-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(0, 200, 220, 0.2);
}
.dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #b2ebf2;
  font-family: 'Microsoft YaHei', sans-serif;
}
.dialog-close {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.dialog-body {
  padding: 8px 18px 16px;
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  border-bottom: 1px dashed rgba(0, 200, 220, 0.12);
}
.info-label {
  color: #8899aa;
  font-size: 14px;
  font-family: 'Microsoft YaHei', sans-serif;
}
.info-value {
  color: #e0f2f5;
  font-size: 14px;
  font-family: 'Consolas', 'Microsoft YaHei', sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
