<template>
  <div class="m-box  m-box-1" style="position: relative">

    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">流量信息</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt" style="overflow-y: auto">
      <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table" :border="0" :cellspacing="0"
        :cellpadding="0" @click="handleclick" />
    </div>
    <div class="bot"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableLLjc />
  </ComZujian>
</template>
<script setup>
import { useStore } from "vuex";
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const showDialog = ref(false);
const store = useStore();
const { viewer } = store.state;
const tableHeaders = ref([
  { name: "stnm", label: "名称" },
  { name: "q", label: "流量(m³/s)" },
  { name: "tm", label: "时间" },
]);
const tableData = ref([]);

function Weacontent() {
  var nowTM = new Date();
  var startDate = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  var endDate = dayjs(nowTM).add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
  if (dayjs(nowTM).format("HH") < 8) {
    startDate = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-1, "day")
      .format("YYYY-MM-DD 08:00:00");
  }
  var strParam = {};
  strParam["pathname"] = "NEW";
  strParam["pid"] = "2025052020025359400";
  strParam["stime"] = startDate;
  strParam["etime"] = endDate;
  api
    .stPptnGQLL(strParam)
    .then((res) => {
      var strJson = res.result;
      var result = [];
      for (var num = 0; num < strJson.length; num++) {
        var item = strJson[num];
        var q = item.q != undefined ? Number(item.q).toFixed(2) : "—";
        var tm = "—";
        if (item.tm != undefined) {
          tm = dayjs(item.tm).format("MM-DD HH:mm");
        }

        var _strParam = {};
        _strParam["stnm"] = item.stnm;
        _strParam["q"] = q;
        _strParam["tm"] = tm;
        _strParam["stcd"] = item.stcd;
        _strParam["lgtd"] = item.lgtd;
        _strParam["lttd"] = item.lttd;
        result.push(_strParam);

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
function handleclick(evt) {
  const _rowindex = evt.target.className;
  const strJson = tableData.value[_rowindex];
  let _lgtd = SetNull(strJson["lgtd"]);
  let _lttd = SetNull(strJson["lttd"]);
  if (_lgtd == "" || _lttd == "") {
    ElMessage.error("缺少经纬度坐标");
  } else {
  }
}
onMounted(() => {
  Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
tr td:nth-child(1) {
  width: 20vh;
}

:deep(tr td:nth-child(2)) {
  width: 10vh;
}

:deep(tr td:nth-child(3)) {
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
