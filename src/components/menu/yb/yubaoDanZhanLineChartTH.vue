<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">太湖预报水位过程线</p>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
   <ComZujian :showDialog="showDialog"  @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <yubaoDanZhanLineChartTH :DD_ARR="DD_ARR" :key="datekeyDialog"/>
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import { Postcard } from "@element-plus/icons-vue";

import Table from "@/components/Table/Table.vue";
import api from "@/api/mode/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";

import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy, GetSZStateBy, GetSZState } from "@/api/ComUnit.js";

import {
  onMounted,
  ref,
  shallowRef, 
  defineAsyncComponent,
  nextTick,
  provide,
  inject,
  watch
} from "vue";

// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();
const showDialog = ref(false);

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("yubaoTHSWLine");

const datekeyDialog = ref(null);

const props = defineProps({
  DD_ARR: {
    type: String,
    default: ""
  }
});

var DD_ARR = props.DD_ARR; //调度方案编号
const stcd=ref("63201999");
watch(props.DD_ARR, () => {
  Weacontent();
});
onMounted(() => {
  if (props.DD_ARR.DD_ID != undefined) {
    Weacontent();
  }
});

function Weacontent() {
  var strParam = {
    pid: props.DD_ARR.DD_ID,
    etime: props.DD_ARR.ETIME,
    stime: props.DD_ARR.STIME,
    stcd: stcd.value,
    pathname: "1"
  };
  api
    .loadModeYBSHUIWEI(strParam)
    .then(res => {
        //绘制图形
        JsonColumnChart(res);
    })
    .catch(err => {});
}

function JsonColumnChart(res){
  const strJson = res.result;
      // if (strJson.length > 0) {
      const strNote = [];
      strNote.push({ name: "时间", codename: "TM", tableV: "0", isShow: true });
      strNote.push({ name: "预报", codename: "YBZ", tableV: "0", isShow: true });
      strNote.push({ name: "实时", codename: "UPZ", tableV: "0", isShow: true });
      strNote.push({ name: "警戒", codename: "WRZ", tableV: "0", isShow: false });
      strNote.push({ name: "保证", codename: "GRZ", tableV: "0", isShow: false });
      var LineColor = [
        "#16FF8D",
        "#1FF2FF",
        "#01DDFF",
        "#F9C823",
        "#0264FD",
        "#FE7923",
        "#8E30FF",
      ];
      const _Option = ChartJs.chartSW(
        "",
        strJson,
        strNote,
        LineColor,
        "水位",
        "Mouth",
        _theme, 55, 14
      );
console.error("_Option",_Option);
      lineOption.value = _Option;
      datekey.value = Date.now();
}
function fangda() {
  console.error("DD_ARR",DD_ARR);
  datekeyDialog.value=dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 90 });
  $(".g-lside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "yubaoSWLine1";
}

function showItem(id) {
  var obj = $("#" + id);
  var dis = obj.css("display");
  if (dis == "block") {
    obj.css("display", "none");
  } else {
    obj.css("display", "block");
  }
}
</script>
<style scoped>
/* 自定义滚动条样式 */
.el-dropdown-menu::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.el-dropdown-menu::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.el-dropdown-menu::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: 0px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}
</style>