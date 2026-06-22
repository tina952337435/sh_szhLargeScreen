<template>
  <div class="m-box" style="position: relative">
    <!-- <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius"
    >
      <span class="spanTitle"></span>
      <span>水位监测</span>
    </div> -->
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">圩区工程运行能力(单位:m³/s)</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt" style="overflow-y: auto">
      <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table" :border="0" :cellspacing="0"
        :cellpadding="0" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableGQWQGC />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Table from "@/components/Table/TableBar.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive } from "vue";
const datekey = ref(null);
const showDialog = ref(false);
const tableHeaders = [
  { name: "wqname", label: "圩区名称" },
  { name: "indexQ", label: "实时流量" },
  { name: "wqgrz", label: "安全水位" },
  { name: "paiBili", label: "运行情况" },
];
const tableData = ref();

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  api
    .stPptnGQGC(strParam)
    .then((res) => {
      var strJson = res.result;
      var result = [];
      for (var num = 0; num < strJson.length; num++) {
        var item = strJson[num];
        var wqgrz = item.wqgrz != undefined ? Number(item.wqgrz).toFixed(2) : "—";
        var totalQ = item.pumcap; //总流量
        var indexQ = item.capacity; //当前开机流量
        var value = indexQ > 0 ? (Number(indexQ) / totalQ) * 100 : indexQ;

        // result.push([item.wqname, indexQ, wqgrz, paiBili]);

        result.push({
          wqname: item.wqname,
          indexQ: indexQ,
          wqgrz: wqgrz,
          paiBili: value,
        });
        tableData.value = result;
      }
    })
    .catch((err) => { });
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
}
onMounted(() => {
  Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped> tr td:nth-child(1) {
   width: 16vh;
 }

 tr td:nth-child(2) {
   width: 10vh;
 }

 tr td:nth-child(3) {
   width: 10vh;
 }

 tr td:nth-child(4) {
   width: 10vh;
 }

 tr td:nth-child(5) {
   width: 12vh;
 }

 /* 自定义滚动条样式 */
 .txt::-webkit-scrollbar {
   width: 2px;
   /* 设置滚动条宽度 */
 }

 .txt::-webkit-scrollbar-track {
   /* 滚动条轨道 */
   /* background: rgb(49, 139, 167); */
 }

 .txt::-webkit-scrollbar-thumb {
   /* 滚动条手柄 */
   width: 10px;
   height: 10px;
   position: absolute;
   right: -4px;
   top: 0px;
   background: var(--mtabletrcolor);
   z-index: 2;
 }
</style>
