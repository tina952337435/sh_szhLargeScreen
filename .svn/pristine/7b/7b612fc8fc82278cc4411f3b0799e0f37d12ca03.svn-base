<template>
  <div id="cesiumViewer"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
let handler, start, positionProperty, modelEntity = null;

let positionArr = [
  { x: 120.49618733976446, y: 31.01062569786287, z: 200 },
  { x: 120.5279311206126, y: 31.008768517405212, z: 500 },
  { x: 120.60367125492844, y: 31.001310295123492, z: 800 },
  { x: 120.64228154940933, y: 30.99677425258266, z: 300 },
  { x: 120.81789332761184, y: 31.01173478715959, z: 500 },
  { x: 120.8772820838665, y: 31.01965936205696, z: 200 },
];

onMounted(() => {
  initCesium(); //初始化
  setTime();  //设置模拟时间
  computeCirclularFlight(); //航线范围
  addModal(); // 加载模型
  // drawLine(); //画线
})

//初始化
const initCesium = () => {
  window.viewer._cesiumWidget._creditContainer.style.display = 'none' // 隐藏logo
  window.viewer.scene.globe.enableLighting = true;   //启用使用场景光源照亮地球
  window.viewer.scene.globe.depthTestAgainstTerrain = true;  //启用深度测试
}

// 画线
const drawLine = () => {
  
}

//设置模拟时间
const setTime = () => {
  
}

//每个位置对应相应的时间点
const computeCirclularFlight = () => {
  
}

//加载模型
const addModal = () => {
}

// 第三人称视角跟随
const setView = () => {
}

onBeforeUnmount(() => {
  window.viewer.scene.preUpdate.removeEventListener(setView);
})
</script>

<style lang="less" scoped></style>