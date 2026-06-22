<template>
  <Table
    :headers="tableHeaders"
    :rows="tableData"
    :key="datekey"
    class="tableYQ"
    :border="0"
    :cellspacing="0"
    :cellpadding="0"
  />
</template>
<script setup>
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import { SetNull, groupBy, Getmtype, sortObjectArray } from "@/api/ComUnit.js";

import { ref, onMounted, reactive, inject } from "vue";
const datekey = ref(null);
const tableHeaders = [
  { name: "num", label: "序号" },
  // { name: "bsnm", label: "流域分区" },
  { name: "stnm", label: "站名" },
  { name: "drp", label: "降雨(mm)" },
  // { name: "hnnm", label: "水系" },
  // { name: "rvnm", label: "所在河流" },
  // { name: "mtype", label: "类型" },
];
const tableData = ref();
// 获取雨型的类型：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const typeValue = inject("typeValue");
const pid = inject("pid");
const strJsonData = ref({});
const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
  strJsonData: {
    type: String,
    default: "",
  },
});
function Weacontent() {
  const strJson = groupBy(props.strJsonData, "stcd");
  let resultDrp = [];
  if (strJson.length > 0) {
    for (let num = 0; num < strJson.length; num++) {
      let itemList = strJson[num][0];
      resultDrp.push(itemList);
    }
  }
  strJsonData.value = sortObjectArray(resultDrp, ["drp"], "desc");
  YLload();
}
function YLload() {
  var strJson = strJsonData.value;
  if (typeValue.value == 1) {
    strJson = strJson.filter(function (res) {
      return Number(res.drp) > 0 && Number(res.drp) < 25;
    });
  } else if (typeValue.value == 2) {
    strJson = strJson.filter(function (res) {
      return Number(res.drp) >= 25 && Number(res.drp) < 50;
    });
  } else if (typeValue.value == 3) {
    strJson = strJson.filter(function (res) {
      return Number(res.drp) >= 50 && Number(res.drp) < 100;
    });
  } else if (typeValue.value == 4) {
    strJson = strJson.filter(function (res) {
      return Number(res.drp) >= 100 && Number(res.drp) < 250;
    });
  } else if (typeValue.value == 5) {
    strJson = strJson.filter(function (res) {
      return Number(res.drp) >= 250;
    });
  }
  var result = [];
  for (var num = 0; num < strJson.length; num++) {
    var item = strJson[num];
    var drp = item.drp != undefined ? Number(item.drp).toFixed(1) : "—";

    result.push({
      num: num + 1,
      bsnm: item.bsnm,
      stnm: item.stnm,
      drp: drp,
      hnnm: item.hnnm,
      rvnm: item.rvnm,
      mtype: Getmtype(item.mtype),
    });
    tableData.value = result;
  }
}
onMounted(() => {
  if (props.strJsonData != undefined) {
    Weacontent();
  }
});
</script>
<style>
.tableYQ {
  width: 100%;
  /* table-layout: fixed; */
  margin-top: 0rem;
  margin: 0 auto;
  /* 表格里面显示省略号必须加fixed，td设置的宽度会失效，宽度限定写在th中*/
}

.tableYQ tr {
  height: 38px;
  line-height: 38px;
}

.tableYQ tr th {
  font-size: 0.8rem;
  color: var(--popupContentTitleColor);
  font-weight: bold;
  height: 2.1rem;
  text-align: center;
}

.tableYQ tr td {
  height: 1.6rem;
  font-size: 14px;
  text-align: center;
}

.tableYQ tr td {
  color: var(--widgetcolor);
}

.tableYQ .trSelect {
  background: rgba(0, 255, 255, 0.5) !important;
}
</style>
