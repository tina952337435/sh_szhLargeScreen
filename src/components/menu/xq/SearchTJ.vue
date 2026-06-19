<template>
  <div class="m-box m-box-3-1">
    <!-- <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p base-p1" id="title2">搜索范围</p>
      <span class="spanTitle"></span>
    </div> -->
    <div style="height:86px;">
      <div style="width:100%;margin:10px 0px;" id="AreaTab">
        <a @click="getLayers('0')" :class="LayersName == '0' && 'areaSelect'" class="area">全部</a>
        <a @click="getLayers('2.5')" :class="LayersName == '2.5' && 'areaSelect'" class="area">5公里</a>
        <a @click="getLayers('5')" :class="LayersName == '5' && 'areaSelect'" class="area">10公里</a>
        <a @click="getLayers('7.5')" :class="LayersName == '7.5' && 'areaSelect'" class="area">15公里</a>
        <a @click="getLayers('10')" :class="LayersName == '10' && 'areaSelect'" class="area">20公里</a>
        <a @click="getLayers('15')" :class="LayersName == '15' && 'areaSelect'" class="area">30公里</a>
        <a @click="getLayers('20')" :class="LayersName == '20' && 'areaSelect'" class="area">40公里</a>
        <a @click="getLayers('25')" :class="LayersName == '25' && 'areaSelect'" class="area">50公里</a>
      </div>
    </div>
  </div>
</template>
<script setup>
import api from "@/api/zonglan/index.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("daytopTen");
const Drpswiper = ref("YL1");
const stime = ref("");
const etime = ref("");
const LayersName = ref("0");

function getLayers(e) {
  LayersName.value = e;
}
onMounted(() => {
});
// 用于在 <script setup> 语法下显式暴露组件的公共属性和方法，处理子组件时，允许父组件访问子组件的特定属性或方法
defineExpose({ LayersName });
</script>
<style scoped>
.area {
  background: var(--portal);
  border: var(--portalborder);
  width: 90px;
  height: 32px;
  line-height: 32px;
  margin-bottom: 10px;
  margin-right: 8px;
  font-size: 13px;
  list-style: none;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  padding: 0px;
  margin: 0px 0px 10px 18px;
  cursor: pointer;
  color: var(--sel_wraplabelcolor);
}

.areaSelect {
  background: var(--swDivSelectcolor);
  color: var(--sel_wraplabelcolorSel);
  width: 90px;
  height: 32px;
  line-height: 32px;
  margin-bottom: 10px;
  margin-right: 8px;
  font-size: 13px;
  list-style: none;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  padding: 0px;
  margin: 0px 0px 10px 18px;
  cursor: pointer;
}
</style>
  