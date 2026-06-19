<template>
    <div id="cesiumContainer">
        <div id="toolbar">
            <el-form style="width: 400px">
                <el-form-item>
                    <el-button type="primary" @click="drawExtent">绘制</el-button>
                    <el-button type="primary" @click="induationAnalysis">淹没分析</el-button>
                    <el-button type="primary" @click="clearAllEntities">清除</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import * as turf from '@turf/turf'; 
let viewer;

let activeShapePoints = [];
let floatingPoint = undefined;
let activeShape = undefined;
let handler = undefined;

let isDraw = false;
let maxWaterHeight = 2000;
let minWaterHeight = 0;
let warningWaterHeight = 0; // 预警高度
let waterHeight = 0;
let speed = "4.0";
let waterHeightTimmer = 0;
let tempEntities = [];
onMounted(()=>{
    

})
  

const drawExtent = () => {
}

const getAreaHeight = (positions) => {
}

const createPoint = (worldPosition) => {
}

const drawShape = (positionData, mat) => {
}

const drawPolyline = (positions) => {
    if (positions.length < 1) return;

    let startP = positions[0];
    let endP = positions[positions.length - 1];
    if (startP.x != endP.x && startP.y != endP.y && startP.z != endP.z) {
        positions.push(positions[0]);
    }
}

const induationAnalysis = () => {
}

const clearAllEntities = () => {
    if (waterHeightTimmer) {
        clearInterval(waterHeightTimmer);
    }
    const length = tempEntities.length;
    for (let i = 0; i < length; i++) {
        viewer.entities.remove(tempEntities[i]);
    }
    tempEntities = [];
    activeShapePoints = [];
    maxWaterHeight = 2000;
    minWaterHeight = 0;
    warningWaterHeight = 0;
    isDraw = !isDraw;
    floatingPoint = undefined;
    activeShape = undefined;
    if (handler) {
        handler.destroy();
        handler = undefined;
    }
}

onUnmounted(() => {
    clearAllEntities();
})

</script>

<style>
html,
body,
#app,
#cesiumContainer {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
#toolbar {
    background: rgba(42, 42, 42, 0.8);
    position: absolute;
    margin: 18px;
    padding: 18px;
    border-radius: 5px;
    z-index: 999;
    color: #fff;
}
</style>

