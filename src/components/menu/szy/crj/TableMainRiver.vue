<template>
        <div class="m-box m-box-1">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">主要边界河流净泄水量</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <div class="m-list4 box-siz" id="tableSW">
        <div class="ysts-group" style="width:98%; display: flex;margin: 0px auto;" id="ysts-group-daibiao">
         <div v-for="(item, index) in  resultData " :key="index" class="ysts-item"
            @click="loc(item.lgtd, item.lttd, item.stcd, item.rvnm)">
            <div class="ysts-name"><span class="ysts-numorder">{{ index + 1 }}</span> {{ item.rvnm }}</div>
            <div class="ysts-value">
              净泄水量：<span class="ysts-num font-agency color-zc">{{ item.sl }}</span>
              <span class="ysts-unit"></span><span style="padding-left: 90px;"></span>
              平均流量：<span class="ysts-num font-agency color-min">{{ item.q }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <TableMainRiver :strJsonLHW="props.strJsonLHW" />
    </ComZujian>
</template>

<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import SQTJ from "@/components/danzhan/sq/SQTJ.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ElMessage, ElTimePicker } from "element-plus";
import * as echarts from "echarts";

import { ref, onMounted, reactive, inject, provide, watch } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
var  resultData=ref([]);
const props = defineProps({
    strJsonLHW: {
        type: Array,
        default: () => []
    }
});
onMounted(() => {
    Weacontent();
});
function Weacontent() {
    resultData.value=[
        {rvnm:"黄浦江",stnm:"松浦大桥",sl:15206.4,q:1760.0},
        {rvnm:"苏州河",stnm:"黄渡",sl:242.8,q:28.1},
        {rvnm:"太浦河",stnm:"练塘",sl:1563.8,q:181},
        {rvnm:"拦路港",stnm:"河祝",sl:1045.4,q:121},
        {rvnm:"大蒸塘",stnm:"",sl:425.1,q:49.2},
        {rvnm:"胥浦塘",stnm:"",sl:254,q:29.4}
    ];
}
</script>

<style scoped>
.ysts-group {
  overflow-y: auto;
  overflow-x: hidden;
}

/* 自定义滚动条样式 */
.ysts-group::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.ysts-group::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: 0px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.ysts-item {
  flex: 0 0 100%;
  margin: 5px 10px;
  /* padding: 0px 10px; */
  cursor: pointer;
  border-bottom: 0.12rem solid var(--portal);
  /* border-image: linear-gradient(90deg, #0e5892, #07111d) 20 20; */
  /* background: rgba(0, 255, 255, .2); */
  float: left;
  width: 100%;
}

.ysts-line {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  /*border-bottom: .02rem solid;
                border-image: linear-gradient(90deg,#0784e7,#103bb3) 20 20;*/
  border-bottom: 0.12rem solid;
  border-image: linear-gradient(90deg, #0e5892, #07111d) 20 20;
}

.ysts-name {
  font-size: 15px;
  /* color: #fff; */
  color: var(--sel_wraplabelcolor);
  /* font-family: '汉仪菱心体简'; */
  font-weight: 550;
  text-align: left;
  height: 28px;
  line-height: 28px;
}

.ysts-value {
  color: var(--ystsVvalue);
  padding: 5px 0px 5px 33px;
  font-size: 14px;
}

.ysts-value:before {
  left: 1.5vh;
  background: none;
}

.ysts-unit {
  font-size: 0.9rem;
}

.ysts-numorder {
  width: 26px;
  height: 26px;
  border-radius: 20px;
  display: block;
  /* background: #09469d82; */
  background: var(--mtabletrcolor);
  color: var(--mtablecolor) !important;
  line-height: 28px;
  text-align: center;
  float: left;
  margin-right: 10px;
  font-size: 0.9rem;
  z-index: 99;
}

.font-agency {
  font-family: AGENCYB, "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
}
</style>