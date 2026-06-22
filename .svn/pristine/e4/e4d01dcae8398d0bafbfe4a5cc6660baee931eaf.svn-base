<template>
  <div v-if="showDialog" class="dialog">
    <div class="popupContentTitle">
      <div class="popupContentTitleText">{{ title }}</div>
      <div class="popupContentTitleClose" title="关闭窗口" @click="closeDialog"></div>
    </div>
    <div class="dialog-content">
      <slot></slot>
      <!-- 用于插入内容的插槽 -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  showDialog: Boolean,
  title: Boolean,
  STCD: String,
});

const emit = defineEmits(["close"]);

const closeDialog = () => {
  emit("close");
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  /* background: rgba(0, 0, 0, 0.8); */
  background: var(--dialogColor);
  transition: all 1s;
  z-index: 999;
}

.dialog-content {
  height: calc(100% - 60px);
  width: 100%;
  overflow-y: auto;
}

/* 自定义滚动条样式 */
.dialog-content::-webkit-scrollbar {
  width: 4px !important;
  /* 设置滚动条宽度 */
}

.dialog-content::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor) !important;
  border-radius: 0% !important;
  z-index: 2;
}

.popupContentTitle {
  position: relative;
  background: var(--popupContentTitlebg);
  height: 56px;
  margin: 0px 0px 10px 0px;
}

.popupContentTitleText {
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  line-height: 56px;
  font-weight: 600;
}

.popupContentTitleClose {
  background: url(/images/popupClose.png) no-repeat;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

/* 自定义滚动条样式 */
.dialog-content::-webkit-scrollbar {
  width: 1px;
  /* 设置滚动条宽度 */
}

.dialog-content::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.dialog-content::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  border-radius: 50%;
  z-index: 2;
}
</style>
