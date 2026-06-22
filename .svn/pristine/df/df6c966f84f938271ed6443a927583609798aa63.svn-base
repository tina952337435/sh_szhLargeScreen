<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">预测潮位过程</p>
      <div class="xiala" style="right: 5px;top: 0px;position: absolute;width:90px;line-height: 30px;cursor: pointer;">
        <label id="CWTitle" @click="showItem('SWCWZLIST')"
          style="margin-top: 4px;margin-right: 5px;font-size: 14px;font-family: var(--calcite-font-family);cursor: pointer;">
          {{ CWTitle }}
        </label>
        <img src="/images/icon_select.png" style="position:absolute;right:0px;margin-top: 4px;cursor: pointer;"
          @click="showItem('SWCWZLIST')">
        <ul class="el-dropdown-menu"
          style="width:90px;height:120px;overflow-y:auto;margin-top:5px;font-family: var(--calcite-font-family);cursor: pointer;"
          id="SWCWZLIST">
            <li v-for="(item, index) in props.ZhanDanCW" :id="item.stcd" :class="index==0?'liSelected':''" >
                  {{ item.name }}
             </li>    
        </ul>
      </div>
    </div>
    <div class="txt">
      <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <yubaoDanZhanLineChart :ZhanDanCW="ZhanDanCW" :DD_ARR="DD_ARR" :key="datekeyDialog" />
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
import { onMounted, ref, shallowRef, defineAsyncComponent, nextTick, provide, inject, watch } from "vue";
import { convertToDate } from "@/api/dateUtil.js";
// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();
const showDialog = ref(false);

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("yubaoCWLine");
const CWTitle = ref("");
const datekeyDialog = ref(null);
const props = defineProps({
  ZhanDanCW: {
    type: String,
    default: ""
  },
  DD_ARR: {
    type: String,
    default: ""
  }
});

var DD_ARR = props.DD_ARR; //调度方案编号
const stcd = ref("63201999");
watch(props.ZhanDanCW, () => {
  // Weacontent();
  loadZhan();
});
onMounted(() => {
  if (props.ZhanDanCW != undefined) {
    loadZhan();
  }
});
function loadZhan() {
  if (props.ZhanDanCW.length > 0) {
    var data = props.ZhanDanCW;
    var item=data[0];
    stcd.value = item["stcd"];
    CWTitle.value = item["name"];
    Weacontent();

    // $("#SWCWZLIST").html(strMsg);
    $("#SWCWZLIST li").click(function (res) {
      console.error(res.currentTarget, res.currentTarget.name)
      $("#SWCWZLIST li").removeClass("liSelected");
      $(this).addClass("liSelected");
      $("#SWCWZLIST").css("display", "none");
      var Temp = data.filter(function (e) {
        return e.stcd == res.currentTarget.id;
      });
      if (Temp.length > 0) {
        CWTitle.value = Temp[0].name;
        stcd.value = Temp[0].stcd;
        Weacontent();
      }
    });
  }
}

function Weacontent() {
  window.loadingShow();
  var strWhere = {};
  strWhere["startdate"] = props.DD_ARR.STIME;
  strWhere["enddate"] =props.DD_ARR.ETIME;
  strWhere["type"] = "1";
  strWhere["stcd"] = stcd.value;
  strWhere["plan_n"] = props.DD_ARR.DD_ID; 
  api.loadModeYBSHUIWEI(strWhere).then(res => {
  //绘制图形
    JsonColumnChart(res);
    window.loadingHide();
  }).catch(err => { });
}

function JsonColumnChart(res) {
  const strJson = res.data;
  if (strJson.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      var item = strJson[num];
      if (SetNull(item["UPZ"]) == "") {
        item["UPZ"] = null;
      }
    }
  }
  const strNote = [];
  strNote.push({ name: "时间", codename: "TM", tableV: "0", isShow: true });
  strNote.push({ name: "预测", codename: "YBZ", tableV: "0", isShow: true });
  strNote.push({ name: "实时", codename: "UPZ", tableV: "0", isShow: true });
  strNote.push({ name: "警戒", codename: "WRZ", tableV: "0", isShow: false });
  strNote.push({ name: "保证", codename: "GRZ", tableV: "0", isShow: false });
  var LineColor = ["#16FF8D", "#1CB8B2", "#01DDFF", "#F9C823", "#0264FD", "#FE7923", "#8E30FF",];
  const _Option = ChartJs.chartSW("", strJson, strNote, LineColor, "水位", "Mouth", _theme, 55, 14); 

  lineOption.value = _Option;
  datekey.value = Date.now();
}
function fangda() {
  datekeyDialog.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 90 });
  $(".g-lside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "yubaoCWLine1";
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