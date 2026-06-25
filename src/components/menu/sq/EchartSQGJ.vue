<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">超警超保统计</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <EchartsList :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
    style="width: 70%; height: 700px">
    <EchartSQGJ :strJsonData="props.strJsonData" />
  </ComZujian>

</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";

import EchartsList from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ElMessage, ElTimePicker } from "element-plus";
import * as echarts from "echarts";

import { ref, onMounted, reactive, inject, provide, defineProps, h, defineAsyncComponent } from "vue";
import Dialog from "@/api/utils/Dialog.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const trendsTooltip = ref();

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("PieCJ");
const titleName = ref();
// 传递水位的类别：1:正常;2:超警;3:超保;4:缺测;
const typeValueSW = ref();
const pidSW = ref("2026031114184492913-2");
const stime = ref("2024-09-12 14:41:44");
const etime = ref("2024-09-12 17:41:44");
const zcNCount = ref(0);
const wrzNCount = ref(0);
const grzNCount = ref(0);
const nullNCount = ref(0);
// 分类站点列表（用于弹窗查看详情）
const zcStationList = ref([]);  // 正常
const wrzStationList = ref([]); // 超警
const grzStationList = ref([]); // 超保
const qcStationList = ref([]);  // 缺测
const props = defineProps({
  strJsonData: {
    type: Object,
    default: []
  }
});
function Weacontent() {
  // var now = new Date();
  // etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  // stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
  //     .add(-3, "hour")
  //     .format("YYYY-MM-DD HH:mm:ss");

  // var strParam = {};
  // strParam["pid"] = pidSW.value;
  // strParam["stime"] = stime.value;
  // strParam["etime"] = etime.value;
  // api.stPptnWater(strParam)
  //   .then((res) => {  
    if(props.strJsonData==undefined||props.strJsonData.length==undefined){
      return;
    }
    // console.error('props.strJsonData',props.strJsonData,props.strJsonData.length);
    const data = groupBy(props.strJsonData, "stcd");
    if (data.length > 0) {
      var strJson = [];
      var strWhere = {};
      var wrzcount = 0,
        nullcount = 0,
        totalcount = 0,
        zccount = 0,
        grzCount = 0;

      // 清空分类数组
      zcStationList.value = [];
      wrzStationList.value = [];
      grzStationList.value = [];
      qcStationList.value = [];

      for (var num = 0; num < data.length; num++) {
        var item = data[num][0];
        if (SetNull(item["tm"]) != "") {
          if (SetNull(item["upz"]) != "") {
            let colorCss = "";
            if (SetNull(item["wrz"]) != "") {
              let chaWrz = Number(SetNull(item["upz"])) - Number(SetNull(item["wrz"]));
              if (chaWrz > 0) {
                colorCss = "#FF9E43";
              }
            }
            if (SetNull(item["grz"]) != "") {
              let chaWrz = Number(SetNull(item["upz"])) - Number(SetNull(item["grz"]));
              if (chaWrz > 0) {
                colorCss = "#F70019";
              }
            }
            if (colorCss == "#FF9E43") {
              wrzcount++;
              wrzStationList.value.push(item);
            }
            else if (colorCss == "#F70019") {
              grzCount++;
              grzStationList.value.push(item);
            }
            else {
              zccount++;
              zcStationList.value.push(item);
            }

          }
          else {
            zccount++;
            zcStationList.value.push(item);
          }
        }
        else {
          nullcount++;
          qcStationList.value.push(item);
        }
      }
      totalcount = data.length;
      strWhere["SQSTNM"] = "水情";
      strWhere["WRZCW"] = wrzcount;
      strWhere["GRZCW"] = grzCount;
      strWhere["QCCW"] = nullcount;
      strJson.push(strWhere);
      var strNote = [];
      strNote.push({
        name: "超警戒",
        codename: "wrz",
        tableV: "1",
        isShow: false,
        width: "20%",
        color: "#09FF09",
      });
      strNote.push({
        name: "超保证",
        codename: "grz",
        tableV: "1",
        isShow: false,
        width: "20%",
        color: "#00FFFF",
      });

      var colorArr = ["#16FF8D", "#FF9E43", "#F70019", "#C1C1C1"];
      var colorAlpha = ["#16FF8D", "#FF9E43", "#F70019", "#C1C1C1"];
      var valuedata1 = [zccount, wrzcount, grzCount, nullcount];

      zcNCount.value = zccount;
      wrzNCount.value = wrzcount;
      grzNCount.value = grzCount;
      nullNCount.value = nullcount;
      var percentdata = [
        ((zccount / totalcount) * 100).toFixed(2),
        ((wrzcount / totalcount) * 100).toFixed(2),
        ((grzCount / totalcount) * 100).toFixed(2),
        ((nullcount / totalcount) * 100).toFixed(2),
      ];
      const _Option = ChartJs.echartCJpei(
        dateid.value,
        data,
        valuedata1,
        percentdata,
        colorArr,
        colorAlpha,
        _theme
      );
      lineOption.value = _Option;
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
      myChart.on('mouseover', function (params) {
        // 百分比  
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        myChart.dispatchAction({
          type: "showTip", // 根据 tooltip 的配置项显示提示框。
          seriesIndex: 0,
          dataIndex: params.dataIndex
        });
        currentIndex = params.dataIndex
      })
      // 鼠标移出
      myChart.on('mouseout', function (params) {
        // 百分比  
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      })
      trendsTooltip.value = setInterval(function () {
        let dataLen = lineOption.value.series.data.length;
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // 当前高亮图形
        currentIndex = (currentIndex + 1) % dataLen;
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // 显示 tooltip
        // tootip每隔三秒依次显示
        myChart.dispatchAction({
          type: "showTip", // 根据 tooltip 的配置项显示提示框。
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        if (currentIndex >= lineOption.value.series.data.length) {
          currentIndex = 0;
        }
      }, 1500);
    
    }
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
}
function eSLChage(param) {
  const nameMap = {
    "正常": "zc",
    "超警": "cj",
    "超保": "cb",
    "缺测": "qc",
  };
  openStationList(nameMap[param.name] || "");
}
// 点击饼图扇区，弹窗查看站点清单
function openStationList(type) {
  const mapCfg = {
    zc: { list: zcStationList, title: "正常" },
    cj: { list: wrzStationList, title: "超警" },
    cb: { list: grzStationList, title: "超保" },
    qc: { list: qcStationList, title: "缺测" },
  };
  const cfg = mapCfg[type];
  if (!cfg || cfg.list.value.length === 0) {
    ElMessage.error("无数据");
    return;
  }
  const StationListDialog = defineAsyncComponent(() =>
    import("@/components/menu/sq/StationListDialog.vue")
  );
  Dialog.open(
    { title: `${cfg.title}站点清单（${cfg.list.value.length}个）`, widh: 1200, heig: 700 },
    h(StationListDialog, { stationList: cfg.list.value, type: type })
  );
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 90 });
  $(".g-rside ").css({ "z-index": 99 });
  showDialog.value = true;
  dateid.value = "PieCJ1";
}
onMounted(() => {
  var nowTM = new Date();
  etime.value = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  stime.value = dayjs(dayjs(etime.value).format("YYYY-MM-DD HH:mm:ss"))
    .add(-3, "hour")
    .format("YYYY-MM-DD HH:mm:ss");

  // stime.value = "2024-05-06 08:00:00";
  // etime.value = "2024-05-06 23:00:00";

  Weacontent();
});
// 提供方法给子组件
provide("typeValueSW", typeValueSW);
provide("pidSW", pidSW);
provide("stime", stime);
provide("etime", etime);
</script>
