<template>
  <div class="m-box">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">雨情统计(24h)</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt">
      <div class="m-list4 box-siz" style="width: 94%; margin: 0px auto">
        <div class="widget-inline-box text-center fl">
          <p>&lt;25<br />(小~中雨)</p>
          <h3
            class="def1ff"
            ref="Color25"
            style="height: 50px; line-height: 26px"
            @click="YQtable('count25')"
          >
            {{ count25 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>25~50<br />(大雨)</p>
          <h3
            class="def1ff"
            ref="Color50"
            style="height: 50px; line-height: 26px"
            @click="YQtable('count50')"
          >
            {{ count50 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>50~100<br />(暴雨)</p>
          <h3
            class="def1ff"
            ref="Color100"
            style="height: 50px; line-height: 26px"
            @click="YQtable('count100')"
          >
            {{ count100 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>100~200<br />(大暴雨)</p>
          <h3
            class="def1ff"
            ref="Color250"
            style="height: 50px; line-height: 26px"
            @click="YQtable('count250')"
          >
            {{ count250 }}
          </h3>
        </div>
        <div class="widget-inline-box text-center fl">
          <p>&gt;200<br />(特大暴雨)</p>
          <h3
            class="def1ff"
            ref="ColorBig"
            style="height: 50px; line-height: 26px"
            @click="YQtable('countBig')"
          >
            {{ countBig }}
          </h3>
        </div>
        <div class="widget-ylTable-box">
          <div class="liuyupjbg1">
            <p
              style="
                color: var(--mtablecolor);
                font-weight: bold;
                font-size: 12px;
                height: 100%;
                line-height: 2;
              "
            >
              最大<br />雨量<br />(mm)
            </p>
          </div>
          <div
            v-for="(item, index) in drpList"
            :key="index"
            style="cursor: pointer"
            :title="item.stnm"
            class="liuyupjbg"
            @click="YQline(item.stcd, item.stnm, item.mtype)"
          >
            <p style="height: 30px; font-size: 14px; font-weight: bold">
              {{ item.stnmName }}
            </p>
            <h3 class="c24c9ff;font-size:20px;">{{ item.drp.toFixed(1) }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <MyDialog
    :showDialog="showDialog"
    @close="showDialog = false"
    :title="titleName"
    :typeValue="typeValue"
    style="width: 70%; height: 700px"
    v-if="shuju === 'YQ'"
  >
    <YQTJ :typenameRadio="props.typenameRadio" :strJsonData="props.strJsonData"/>
  </MyDialog>
  <MyDialog
    :showDialog="showDialogLine"
    @close="showDialogLine = false"
    :title="titleNameLine"
    style="width: 70%; height: 700px"
    v-else="shuju === 'Line'"
  >
    <DanZHanSel
      :stcd="stcdValue"
      :mtype="mtypeValue"      
      :stime="props.stime"
      :etime="props.etime"
      :type="typeName"
    />
  </MyDialog>

  <ComZujian
    :showDialog="showDialogZJ"
    @close="showDialogZJ = false"
    :title="titleName"
    :typeValue="typeValue"
    :stime="props.stime"
    :etime="props.etime"
    style="width: 70%; height: 700px"
  >
    <hourSQTJ
      :strJsonData="props.strJsonData"
      :typenameRadio="props.typenameRadio"
    />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import YQTJ from "@/components/danzhan/yq/YQTJ.vue";
import DanZHanSel from "@/components/danzhan/sq/DanZHanSel.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ElMessage } from "element-plus";
import { sortObjectArray, SetNull, groupBy, Getmtype } from "@/api/ComUnit.js";

import {
  onMounted,
  ref,
  shallowRef,
  defineAsyncComponent,
  nextTick,
  provide,
  defineProps,
} from "vue";
const drpList = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showDialogLine = ref(false);
const showDialogZJ = ref(false);
const shuju = ref();
// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();
// 传递雨型的类别：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const typeValue = ref();
const stcdValue = ref();
const mtypeValue = ref();
const stcdstime = ref();
const stcdetime = ref();
const typeName=ref("降雨过程");

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

const pid = ref("20241030000002");
const stime = ref({});
const etime = ref({});
const props = defineProps({
  typenameRadio: {
    type: String,
    default: "",
  },
  strJsonData: {
    type: String,
    default: "",
  },
  stime: {
    type: String,
    default: "",
  },
  etime: {
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
  YLload(resultDrp);
}
function YLload(data) {
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
    return Number(res.drp) >= 100 && Number(res.drp) < 200;
  });
  count250.value = dataT.length;

  dataT = data.filter(function (res) {
    return Number(res.drp) >= 200;
  });
  countBig.value = dataT.length;
  var result = [];
  if (data.length > 0) {
    for (var num = 0; num < data.length; num++) {
      // data[num].drp = 10;
      // if (data[num].stcd == 63404900) {
      //   data[num].drp = 5;
      // }
      let items = data[num];
      var stnmName = items["stnm"];
      // console.error("stnm",stnmName,items.drp);
      if (stnmName.length > 4) {
        stnmName = stnmName.slice(0, 4) + "...";
      }
      // if (data[num].drp > 0) {

      var drp = items.drp != undefined ? Number(items.drp).toFixed(1) : 0;
      result.push({
        index: items,
        drp: Number(drp),
        stcd: items.stcd,
        stnm: items.stnm,
        stnmName: stnmName,
        lgtd: items.lgtd,
        lttd: items.lttd,
        admauth: items.admauth,
        mtype: items.mtype,
      });
      drpList.value = sortObjectArray(result, ["drp"], "desc");
      // }
    }
  }
}
function YQtable(e) {
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  shuju.value = "YQ";
  if (e == "count25") {
    if (count25.value > 0) {
      showDialog.value = true;
      titleName.value = "雨情统计（< 25）";
      typeValue.value = 1;
    } else {
      ElMessage.error("无数据");
    }
  } else if (e == "count50") {
    if (count50.value > 0) {
      showDialog.value = true;
      titleName.value = "雨情统计（25~50）";
      typeValue.value = 2;
    } else {
      ElMessage.error("无数据");
    }
  } else if (e == "count100") {
    if (count100.value > 0) {
      showDialog.value = true;
      titleName.value = "雨情统计（50~100）";
      typeValue.value = 3;
    } else {
      ElMessage.error("无数据");
    }
  } else if (e == "count250") {
    if (count250.value > 0) {
      showDialog.value = true;
      titleName.value = "雨情统计（100~250）";
      typeValue.value = 4;
    } else {
      ElMessage.error("无数据");
    }
  } else if (e == "countBig") {
    if (countBig.value > 0) {
      showDialog.value = true;
      titleName.value = "雨情统计（> 250）";
      typeValue.value = 5;
    } else {
      ElMessage.error("无数据");
    }
  }
}
function YQline(stcd, stnm, mtype) {
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  shuju.value = "Line";
  showDialogLine.value = true;
  titleNameLine.value = stnm;// + "降雨过程";
  stcdValue.value = stcd;
  mtypeValue.value = mtype;

}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialogZJ.value = true;
}
onMounted(() => {
  if (props.strJsonData != undefined) {
    Weacontent();
  }
});
// 提供方法给子组件
provide("typeValue", typeValue);
provide("pid", pid);
provide("stime", stime);
provide("etime", etime);
provide("stcd", stcdValue);
provide("mtype", mtypeValue);
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
  height: 50%;
}

.def1ff {
  color: var(--titled1);
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
  height: 48%;
}

:deep(.liuyupjbg1) {
  width: 19.2%;
  display: inline-block;
  height: 100%;
  text-align: center;
  padding: 4% 0;
  margin: 0 0.4%;
  background: var(--liuyupjbg) no-repeat;
  /* background: var(--widgetColor); */
  background-size: 100% 100%;
}

:deep(.liuyupjbg) {
  width: 19.2%;
  display: inline-block;
  height: 100%;
  text-align: center;
  padding: 4% 0;
  margin: 0 0.4%;
  background: var(--liuyupjbg) no-repeat;
  /* background: var(--widgetColor); */
  background-size: 100% 100%;
}

.dialog-content .widget-inline-box {
  font-size: 1rem !important;
}

.dialog-content .widget-inline-box p {
  padding-top: 50px;
}

.dialog-content .widget-inline-box h3 {
  padding-top: 60px;
  font-size: 50px;
}

:deep(.dialog-content .liuyupjbg1 p) {
  font-size: 1rem !important;
  padding-top: 83px;
}

:deep(.dialog-content .liuyupjbg p) {
  font-size: 1rem !important;
  padding-top: 16px;
}

:deep(.dialog-content .liuyupjbg h3) {
  padding-top: 60px;
  font-size: 50px;
}
</style>
