<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2">昨日水情统计</p>
    </div>
    <div class="txt">
      <div class="m-list4 box-siz" style="width: 94%; margin: 0px auto">
        <div class="widget-inline-box text-center fl">
          <p>&lt;25<br />(小~中雨)</p>
          <h3 class="def1ff" ref="Color25" style="height: 50px; line-height: 26px" @click="YQtable('count25')">
            {{ count25 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>25~50<br />(大雨)</p>
          <h3 class="def1ff" ref="Color50" style="height: 50px; line-height: 26px" @click="YQtable('count50')">
            {{ count50 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>50~100<br />(暴雨)</p>
          <h3 class="def1ff" ref="Color100" style="height: 50px; line-height: 26px" @click="YQtable('count100')">
            {{ count100 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>100~250<br />(大暴雨)</p>
          <h3 class="def1ff" ref="Color250" style="height: 50px; line-height: 26px" @click="YQtable('count250')">
            {{ count250 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>&gt;250<br />(特大暴雨)</p>
          <h3 class="def1ff" ref="ColorBig" style="height: 50px; line-height: 26px" @click="YQtable('countBig')">
            {{ countBig }}
          </h3>
        </div>
        <div v-html="ylTable" class="widget-ylTable-box"></div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <MyDialog :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px" v-if="shuju == 'YQ'">
    <YQTJ />
  </MyDialog>
</template>
<script setup>
import MyDialog from "@/components/ComDialog.vue";
import YQTJ from "@/components/danzhan/yq/YQTJ.vue";
import SQTJ from "@/components/danzhan/sq/SQTJ.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";

import {
  onMounted,
  ref,
  shallowRef, 
  defineAsyncComponent,
  nextTick,
  provide,
} from "vue";
const props = defineProps({
  ylTable: String,
});
const ylTable = ref();
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showDialogSW = ref(false);
const shuju = ref();
// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameSW = ref();
// 传递雨型的类别：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const typeValue = ref();
// 传递水位的类别：1:正常;2:超警;3:超保;4:缺测;
const typeValueSW = ref();

const count25 = ref(0),
  count50 = ref(0),
  count100 = ref(0),
  count250 = ref(0),
  countBig = ref(0),
  zcCount = ref(0),
  wrzCount = ref(0),
  grzCount = ref(0),
  nullCount = ref(0);
// 判断颜色变化
const Color25 = ref(),
  Color50 = ref(),
  Color100 = ref(),
  Color250 = ref(),
  ColorBig = ref(),
  WRZColor = ref(),
  ZCColor = ref(),
  nullColor = ref();

const pid = ref("201901101419326076");
const pidSW = ref("2021081401172758047");
const stime = ref("2024-08-07 08:00:00");
const etime = ref("2024-08-08 08:00:00");
function Weacontent() {
  // 8时雨情
  var strWhere = {};
  strWhere["pid"] = pid.value;
  strWhere["stime"] = stime.value;
  strWhere["etime"] = etime.value;
  strWhere["pathname"] = "SUM";

  api
    .stPptnRain(strWhere)
    .then((res) => {
      var data = res.result;
      var dataT = data.filter(function (res) {
        return Number(res.drp) > 0 && Number(res.drp) < 25;
      });
      count25.value = dataT.length;
      dataT = data.filter(function (res) {
        return Number(res.drp) >= 25 && Number(res.drp) < 50;
      });
      count50.value = dataT.length;
      dataT = data.filter(function (res) {
        return Number(res.drp) >= 50 && Number(res.drp) < 100;
      });
      count100.value = dataT.length;
      dataT = data.filter(function (res) {
        return Number(res.drp) >= 100 && Number(res.drp) < 250;
      });
      count250.value = dataT.length;

      dataT = data.filter(function (res) {
        return Number(res.drp) >= 250;
      });
      countBig.value = dataT.length;
      count25.value = 10;
      if (count25.value > 0) {
        Color25.value.style.color = "#39BC39";
      }
      if (count50.value > 0) {
        Color50.value.style.color = "#39BC39";
      }
      if (count100.value > 0) {
        Color100.value.style.color = "#62B7FE";
      }
      if (count250.value > 0) {
        Color250.value.style.color = "#0004F6";
      }
      if (countBig.value > 0) {
        ColorBig.value.style.color = "#F801FA";
      }
      var strHtml = "";
      strHtml += '<div class="liuyupjbg" >';
      strHtml +=
        '<p style="color:#00ffe2;font-weight:bold;font-size: 12px;height: 100%;line-height: 2;">最大<br/>雨量<br/>(mm)</p>';
      strHtml += "  </div>";

      if (data.length > 0) {
        for (var num = 0; num < data.length; num++) {
          var drp = data[num]["drp"] != undefined ? data[num]["drp"] : 0;
          var stnm = data[num]["stnm"];
          if (stnm.length > 3) {
            stnm = stnm.slice(0, 3) + "...";
          }
          // strHtml +=
          //   '<div style="" title=" + data[num]["stnm"] + ' class="liuyupjbg" onclick="TransYQ()">';
          strHtml +=
            '<div  style="cursor: pointer;" title="' +
            data[num]["stnm"] +
            '" class="liuyupjbg" onclick="TransYQ()">';
          strHtml +=
            '<p style="height: 30px;font-size:14px;font-weight:bold;">' + stnm + "</p>";
          strHtml += '<h3 class="c24c9ff">' + Number(drp).toFixed(1) + "</h3>";
          strHtml += "</div>";
        }
      }
      ylTable.value = strHtml;
    })
    .catch((err) => { });
}
function YQtable(e) {
  shuju.value = "YQ";
  if (count25.value > 0 && e == "count25") {
    showDialog.value = true;
    titleName.value = "雨情统计（< 25）";
    typeValue.value = 1;
  } else if (count50.value > 0 && e == "count50") {
    showDialog.value = true;
    titleName.value = "雨情统计（25~50）";
    typeValue.value = 2;
  } else if (count100.value > 0 && e == "count100") {
    showDialog.value = true;
    titleName.value = "雨情统计（50~100）";
    typeValue.value = 3;
  } else if (count250.value > 0 && e == "count250") {
    showDialog.value = true;
    titleName.value = "雨情统计（100~250）";
    typeValue.value = 4;
  } else if (countBig.value > 0 && e == "countBig") {
    showDialog.value = true;
    titleName.value = "雨情统计（> 250）";
    typeValue.value = 5;
  }
}
onMounted(() => {
  var now = new Date();
  if (dayjs(now).format("HH") > 7) {
    // stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-1, "day")
      .format("YYYY-MM-DD HH:mm:ss");
  } else {
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
      .add(-2, "day")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  Weacontent();
});
// 提供方法给子组件
provide("typeValue", typeValue);
provide("pid", pid);
provide("stime", stime);
provide("etime", etime);

provide("typeValueSW", typeValueSW);
provide("pidSW", pidSW);
</script>

<style scoped>
.widget-inline-box {
  text-align: center;
  color: var(--widgetcolor);
  width: 50%;
  padding: 10% 0;
  text-align: center;
  font-size: 14px;
  float: left;
  overflow: hidden;
  width: 19.2%;
  margin: 0 0.4%;
  background: var(--widgetColor);
  padding: 1% 0;
  height: 100px;
}

.def1ff {
  color: var(--def1ff);
  cursor: pointer;
  font-size: 26px;
}

.ztitem1ps {
  width: 32%;
  height: 40%;
}

.ztitemtit {
  height: 2rem;
  line-height: 2rem;
  font-weight: bold;
  color: #ddd;
  text-align: center;
  font-size: 12px;
}

.justify-content_flex-justify {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}

.yjtxtcon {
  text-align: center;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  vertical-align: bottom;
}

.yjbigtxt {
  font-size: 1.2rem;
  font-family: shufont1;
  font-weight: bold;
}

.display_flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.flex-direction_column {
  -webkit-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  -moz-flex-direction: column;
  -o-flex-direction: column;
}

.ztitemtit1 {
  background: var(--ztitemtit1);
}

.maiweid {
  width: 100%;
  box-sizing: border-box;
}

.ztitemtit {
  font-size: 14px;
}

.widget-ylTable-box {
  margin-top: 2px;
  width: 100%;
  height: calc(100% - 105px);
  font-size: 14px;
  float: left;
  overflow: hidden;
  color: var(--widgetcolor);
}

:deep(.liuyupjbg) {
  width: 19.2%;
  display: inline-block;
  height: 100%;
  text-align: center;
  padding: 4% 0;
  margin: 0 0.4%;
  background: var(--liuyupjbg);
  /* background: var(--widgetColor); */
  background-size: 100% 100%;
}
</style>
