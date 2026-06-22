<template>
        <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">分区地下水资源量统计</p>
            <span class="spanTitle"></span>

            <div style="width:calc(100% - 250px);" class="div-swiper">
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
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <EchartAreagroundWater :strJsonLHW="props.strJsonLHW" />
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
const dateid = ref("AreagroundWater");
const Riverswiper=ref("yestotay");

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
        {name:"浦东新区",value:4098},
        {name:"崇明区",value:3717},
        {name:"闵行区",value:2557},
        {name:"宝山区",value:2772},
        {name:"嘉定区",value:3610},
        {name:"金山区",value:3029},
        {name:"松江区",value:3921},
        {name:"青浦区",value:3523},
        {name:"奉贤区",value:3089},
        {name:"中心城区",value:2935}
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
  // myChart.on("click", eSLChage);
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
}
</script>