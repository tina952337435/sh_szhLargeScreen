<template>
        <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">出入境水资源量</p>
            <span class="spanTitle"></span>

            <div style="width:calc(100% - 200px);" class="div-swiper">
        <div class="swiper-slide" style="width:33.33%;"
          :class="Riverswiper == 'yestotay' && 'swiper-slide swiper-slide-thumb-active'"
          @click="GetRiver('yestotay')">
          昨日</div>
        <div class="swiper-slide" style="width: 33.33%;"
          :class="Riverswiper == 'month' && 'swiper-slide swiper-slide-thumb-active'"
          @click="GetRiver('month')">
          当月
        </div>
        <div class="swiper-slide" style="width: 33.33%;"
          :class="Riverswiper == 'year' && 'swiper-slide swiper-slide-thumb-active'"
          @click="GetRiver('year')">
          今年
        </div>
      </div>
        </div>
        <div class="txt">
            <div style="width: 45%; height: 100%; float: left">
                <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
            </div>
            <div class="ysts-group" style="width: 55%" v-html="ystsGroup"></div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <EchartAreasurfaceWater :strJsonLHW="props.strJsonLHW" />
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
const datekey = ref(null);
const lineOption = ref({});
const trendsTooltip = ref();
const dateid = ref("AreasurfaceWater");
const Riverswiper=ref("yestotay");
const ystsGroup = ref();
// 判断弹窗是否显示,默认隐藏
const showDialogSL = ref(false);

const titleNameSL = ref();

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
    var dataSL=[
        {name:"沪苏",value:4098},
        {name:"沪浙",value:3717},
        {name:"长江",value:2557},
        {name:"杭州湾",value:2772}
    ];
    var LineColor = [
    "#01F3FF",
    "#efc30a",
    "#00fd6d",
    "#4498FF",
    "#9C34FF",
    "#B5F320",
    "#FFDC26",
    "#00CCFB",
    "#FF8526",
  ];
  const _Option = ChartJs.echartSLpei(dateid.value, dataSL, LineColor, _theme);
  lineOption.value = _Option;
  console.error('_Option',_Option);
  let chartDom = document.getElementById(dateid.value);
  let myChart = echarts.init(chartDom);
  myChart.setOption(lineOption.value);
  myChart.on("click", eSLChage);
  // 动态显示tootip
  // 当前高亮图形所在下标
  let currentIndex = -1;
  // 取消之前高亮的图形
  if (trendsTooltip.value != null) {
    clearInterval(trendsTooltip.value);
  }
  trendsTooltip.value = setInterval(function () {
    let dataLen = lineOption.value.series[0].data.length;
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    // 当前高亮图形
    currentIndex = (currentIndex + 3) % dataLen;
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    if (currentIndex >= lineOption.value.series[0].data.length) {
      currentIndex = 0;
    }
  }, 1000);

  var strHtml = "";
      for (var num = 0; num < dataSL.length; num++) {
        //入湖水量
        var sl = Number(dataSL[num].value).toFixed(0);
        var cls = "color-hh" + (num + 1);
        strHtml += '<div class="ysts-item">';
        strHtml += '<div class="ysts-name" >' + dataSL[num].name + "</div>";
        strHtml += '<div class="ysts-value ' + cls + '">';
        strHtml += '<span class="ysts-num font-agency" style="color:'+LineColor[num]+';">' + sl + "</span>";
        strHtml += '<span class="ysts-unit">万方</span>';
        strHtml += "</div>";
        strHtml += "</div>";
      }

      ystsGroup.value = strHtml;
}
function eSLChage(e) {
  $(".g-rside ").css({ "z-index": 90 });
  $(".g-lside ").css({ "z-index": 99 });
  showDialogSL.value = true;
  titleNameSL.value = e.name+"出入水量";
}
</script>
<style>
.ysts-value:before{
    content: "";
    position: absolute;
    left: -1.5vh;
    top: 0.5vh;
    width: 1.3vh;
    height: 1.3vh;
}
.ysts-value.color-hh1:before{
  background-color: #01F3FF;
}
.ysts-value.color-hh1:before{
  background-color: #efc30a;
}
.ysts-value.color-hh1:before{
  background-color: #00fd6d;
}
.ysts-value.color-hh1:before{
  background-color: #4498FF;
}
</style>