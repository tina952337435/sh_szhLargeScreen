//Dialog.vue
<template>
  <Teleport to="body">
    <div class="popModel" :style="{ backgroundColor: bg }">
      <div class="popContent" ref="el" :style="{
        width: props.widh + 'px',
        height: heig + 'px',
      }">
        <div class="head">
          <span>{{ title }}</span>
          <img src="/images/close.png" alt="关闭" @click="cancel()" />
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useDraggable } from "@vueuse/core"; //使用vueuse的拖拽

const props = defineProps<{
  title: string; //弹窗标题
  bg?: string; //蒙层背景
  x?: number; //弹窗初始left位置，未设置默认为窗口中间
  y?: number; //弹窗初top始位置，未设置默认为窗口中间
  widh?: number;
  heig?: number;
  cancel: Function; //关闭弹窗的回调
}>();

const el = ref<HTMLElement | null>(null);

// const { x, y, style } = useDraggable(el, {
//   initialValue: { x: document.body.clientWidth / 2, y: document.body.clientHeight / 2 },
// });

onMounted(() => {
  if (el.value) {
    // x.value = props.x ?? x.value - el.value.offsetWidth / 2; //设置弹窗初始居中
    // y.value = props.y ?? y.value - el.value.offsetHeight / 2; //设置弹窗初始居中
    setTimeout(() => {
      el.value.style.transition = "unset"; //为了使得弹窗出现时有动画，而拖拽时取消动画
    });
  }
});
</script>

<style scoped>
.popModel {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background: rgba(21, 40, 65, 0.6);
}

.popContent {
  background: linear-gradient(to right, rgba(21, 40, 65, 0.9) 60%, rgba(21, 40, 65, 0.6));
  background: var(--dialogColor);
  position: fixed;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  transition: all 0.2s ease-in;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.popContent .content {
  min-width: 0px;
  height: 90%;
  /* overflow-y: auto; */
}

/* 自定义滚动条样式 */
.popContent .content::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.popContent .content::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.popContent>.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  background: var(--popContentHeadbg);
  height: 56px;
  margin: 0px 0px 15px 0px;
}

.popContent>.head span {
  font-weight: bold;
  font-size: 18px;
  /* color: #21a6ff;
  background: linear-gradient(90deg, #3be1f6 0%, #21a6ff 100%); */
  width: 100%;
  background: #ffffff;
  text-align: center;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.popContent>.head img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  cursor: pointer;
  margin-right: 10px;
}
</style>
