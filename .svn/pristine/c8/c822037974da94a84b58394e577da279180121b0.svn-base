<template>
  <div class="m-box" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">水利分区预报水位极值</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <div class="tableWQ" style="height:100%; width: 98%;">
        <div class="tableWQDIV" style="height:100%; width: 100%; overflow-y: auto">
          <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table wqtable" :border="0"
            :cellspacing="0" :cellpadding="0" />
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <yubaoWQTableSLPQ :wqstrJson="wqstrJson" :key="datekeyDialog" />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import $ from "jquery";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import api from "@/api/zonglan/index.js";
import Dialog from "@/api/utils/Dialog.js";
import dayjs from "dayjs";

const titleName = ref();
const typeValue = ref();
const showDialog = ref(false);
const datekey = ref(null);
const datekeyDialog = ref(null);

import { onMounted, ref, defineAsyncComponent, nextTick, provide, inject, watch, h } from "vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");

const tableHeaders = ref(null);
tableHeaders.value = [
  { name: "wqname", label: "分区名称" },
  { name: "maxUpz", label: "最高水位(m)" },
  { name: "wrz", label: "控制水位(m)" },
  { name: "grz", label: "警戒水位(m)" }
];

const tableData = ref([]);
const props = defineProps({
  rainListAll: {
    type: Array,
    default: () => []
  },
  resultWQDATA: {
    type: Array,
    default: () => []
  },
  DD_ARRWQ: {
    type: Array,
    default: () => { }
  },
});

// watch(props, () => {
//   Weacontent();
// });
onMounted(() => {
  if (props.resultWQDATA.length > 0) {
    Weacontent();
  }
});
function Weacontent() {
  var wqstrJson = props.resultWQDATA;
  // console.error("weiqushuju",wqstrJson)
  var dataResult = [];
  if (wqstrJson.length > 0) {
    for (var num = 0; num < wqstrJson.length; num++) {
      var colorCss = "";
      var item = wqstrJson[num];
      var stcdList = "23010517,23010518"
      if (stcdList.includes(item.wqid) == false) {
        item.maxUpz = Number(item.maxUpz).toFixed(2);
        item.wrz = SetNull(item.wrz) != "" ? Number(item.wrz).toFixed(2) : "-";
        item.grz = SetNull(item.grz) != "" ? Number(item.grz).toFixed(2) : "-";
        if (SetNull(item.wrz) != "—" && SetNull(item.maxUpz) != "—") {
          if (item.maxUpz > item.wrz) {
            colorCss = "#F9C33D";
          }
        }

        if (SetNull(item.grz) != "—" && SetNull(item.maxUpz) != "—") {
          if (item.maxUpz > item.grz) {
            colorCss = "#F70019";
          }
        }
        item.colorCss = colorCss;
        dataResult.push(item);
      }
    }
  }
  tableData.value = sortObjectArray(dataResult, ['colorCss'], "desc");
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialog.value = true;
}
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
tr td:nth-child(1) {
  width: 20vh;
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
.tableWQ::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.tableWQ::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.tableWQ::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.tableWQDIV::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.tableWQDIV::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.two-list .two-item {
  padding: 0 10px;
}

.two-list .two-item .two-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-bottom: var(--titleborder);
}

.area {
  background: var(--wqbotton);
  border: 1px solid #016aa4;
  width: 96px;
  height: 30px;
  line-height: 26px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #ffffff;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-radius: 4px;
}

.areaSelect {
  background: var(--swDivSelectcolor);
  color: var(--sel_wraplabelcolorSel);
  border: 1px solid #016aa4;
  width: 96px;
  height: 30px;
  line-height: 26px;
  margin-right: 10px;
  margin-bottom: 10px;
  /* color: #ffffff; */
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-radius: 4px;
}

.spanTitleName {
  width: 40px !important;
  position: absolute;
  left: 10px;
  width: 100%;
  height: 30px;
  background: url(/images/titleImg.png) no-repeat left center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.wqtitle {
  /* display: flex; */
  margin: 0px 10px;
  color: var(--title2);
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-bottom: 1px solid var(--wqtitleline);
  position: relative;
}

:deep(.wqtable tr td:nth-child(2)) {
  /* color: var(--mtablecolorIm) !important; */
  /* color: #07EF7D !important; */
}
</style>
