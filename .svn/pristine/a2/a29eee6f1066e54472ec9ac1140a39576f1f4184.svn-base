<template>
  <div class="m-box" style="position: relative">
    <!-- <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius"
    >
      <span>工情监测</span>
    </div> -->

    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">工情监测</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt" style="overflow-y: auto">
      <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table" :border="0" :cellspacing="0"
        :cellpadding="0" @click="handleclick" />
      <!-- <customTable
        :headers="tableHeaders"
        :rows="tableData"
        :key="datekey"
        class="m-table"
        :border="0"
        :cellspacing="0"
        :cellpadding="0"
        @click="handleclick"
      /> -->
    </div>
    <div class="bot"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableGQJC />
  </ComZujian>
</template>
<script setup>
import { useStore } from "vuex";
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, reactive } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const showDialog = ref(false);
const store = useStore();
const { viewer } = store.state;
const tableHeaders = [
  { name: "stnm", label: "名称" },
  { name: "tm", label: "时间" },
  { name: "imageUrls", label: "闸门/泵站" },
];
const tableData = ref();
const images = ref();

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = "2020112416403127303";
  strParam["key"] = "1";
  api
    .stPptnGQTable(strParam)
    .then((res) => {
      var strJson = res.result;
      var result = [];
      for (var num = 0; num < strJson.length; num++) {
        var item = strJson[num];
        var gateListdata = item.gateList;
        if (gateListdata.length > 0) {
          var stateHtml = [],
            imgUrl = "";
          var tm = "—";
          var bzdata = gateListdata.filter(function (e) {
            return e.eqpno == 2;
          });
          var zmdata = gateListdata.filter(function (e) {
            return e.eqpno == 1;
          });
          if (gateListdata[0].tm || gateListdata[0].tm != null) {
            tm = dayjs(gateListdata[0].tm).format("MM-d HH:mm");
          }
          for (var i = 0; i < zmdata.length; i++) {
            if (Number(zmdata[i].gtq) > 0) {
              imgUrl = "/images/gqgc/sz_open.png";
              if (_theme == "BlueTheme") {
                imgUrl = "/images/gqgc/sz_green.png";
              }
            } else {
              imgUrl = "/images/gqgc/sz_close.png";
              if (_theme == "BlueTheme") {
                imgUrl = "/images/gqgc/sz_gray.png";
              }
            }
            stateHtml.push(imgUrl);
          }

          for (var i = 0; i < bzdata.length; i++) {
            if (Number(bzdata[i].gtq) > 0) {
              imgUrl = "/images/gqgc/bz_open.png";
              if (_theme == "BlueTheme") {
                imgUrl = "/images/gqgc/bz_green.png";
              }
            } else {
              imgUrl = "/images/gqgc/bz_close.png";
              if (_theme == "BlueTheme") {
                imgUrl = "/images/gqgc/bz_gray.png";
              }
            }
            stateHtml.push(imgUrl);
          }
        } else {
          var stateHtml = "",
            imgUrl = "";
          var tm = "—";
        }

        var _strParam = {};
        // _strParam["stnm"] = item.stnm;
        // _strParam["tm"] = tm;
        // _strParam["upz"] = upz;
        // _strParam["imageUrls"] = stateHtml;
        // _strParam["stcd"] = item.stcd;
        // _strParam["lgtd"] = item.lgtd;
        // _strParam["lttd"] = item.lttd;
        // result.push(_strParam);
        result.push({ stnm: item.stnm, tm: tm, imageUrls: stateHtml });
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
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialog.value = true;
}
function handleclick(evt) {
  const _rowindex = evt.target.className;
  const strJson = tableData.value[_rowindex];
  let _lgtd = strJson["lgtd"];
  let _lttd = strJson["lttd"];
}
onMounted(() => {
  Weacontent();
});
</script>
<style>
 tr td:nth-child(1) {
  width: 20vh;
}

:deep( tr td:nth-child(2)) {
  width: 10vh;
}

:deep( tr td:nth-child(3)) {
  width: 20vh !important;
}

 tr td img {
  width: 20px;
  height: 20px;
  vertical-align: -6px;
}

/* 自定义滚动条样式 */
.txt::-webkit-scrollbar {
  width: 1px;
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
  border-radius: 50%;
  z-index: 2;
}

.m-table tr:nth-child(even) {
  background: "";
}
</style>
