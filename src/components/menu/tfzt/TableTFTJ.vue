<template>
  <div class="m-box" style="position: relative">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div style="line-height: 30px">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()">台风特征信息统计</p>
        <span class="spanTitle"></span>
      </div>
    </div>
    <div class="txt">
      <div style="width: 100%; height: 180px" class="two-list" id="SSXQList">
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
            <div class="text-sm text-purple-300">代表站超警<br />个数</div>
            <div class="text-xl" @click="bootJY('jy')">
              <span style="color: orange">{{ WarnNumStr }}</span
              >/{{ TotalNumStr }}
              <!-- <span class="danwei"> 百万方 </span> -->
              <!-- <span class="text-orange-400">-13.15%</span> -->
            </div>
          </div>
          <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
            <div class="text-sm text-purple-300">吴淞口最高潮位(m)</div>
            <div class="text-xl" @click="bootJY('csl')">
              {{ wskZ }}
              <!-- <span class="danwei"> 百万方 </span> -->
            </div>
          </div>
          <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
            <div class="text-sm text-purple-300">米市渡最高潮位(m)</div>
            <div class="text-xl">
              {{ msdZ }}
              <!-- <span class="danwei"> m </span> -->
            </div>
          </div>
          <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
            <div class="text-sm text-purple-300">面降雨量<br />(mm)</div>
            <div class="text-xl">
              {{avgDrpStr}}
              <!-- <span class="danwei"> m </span> -->
              <!-- <span class="text-green-400">+128.07%</span> -->
            </div>
          </div>
          <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
            <div class="text-sm text-purple-300">最大站降雨量(mm)</div>
            <div class="text-xl">
              {{maxDrpStr}}
              <!-- <span class="danwei"> m </span> -->
              <!-- <span class="text-green-400">+128.07%</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  provide,
  inject,
  defineAsyncComponent,
  onUnmounted,
  h,
  defineProps,
} from "vue";
import { sortObjectArray, groupBy, SumJson, SetNull } from "@/api/ComUnit.js";
import apityphoon from "@/api/typhoon/index.js";
const props = defineProps({
  strJsonData: {
    type: String,
    default: {},
  },
});
const wskZ = ref("");
const msdZ = ref("");
const WarnNumStr = ref("");
const TotalNumStr = ref("");
const maxDrpStr = ref("");
const avgDrpStr=ref("");
onMounted(() => {
  if (SetNull(props.strJsonData)!="") {
    if (SetNull(props.strJsonData.stm)!=""){   
      bindData();
      loadSQWarn();
    }
  }
});
function bindData() {
  var postParam = {
    ztid: props.strJsonData.id,
  };
  apityphoon.ZhuantifindResultName(postParam).then((res) => {
    if (res.data.length > 0) {
      var dataResult = res.data;
      var dataResultTemp = dataResult.filter(function (e) {
        return e.stcd == "1170181" && e.type == "1"; //吴淞口
      });
      if (dataResultTemp.length > 0) {
        var maxValue =
          dataResultTemp[0].maxvalue != undefined
            ? Number(dataResultTemp[0].maxvalue).toFixed(2)
            : "";
        wskZ.value = maxValue;
      }
      dataResultTemp = dataResult.filter(function (e) {
        return e.stcd == "1460281" && e.type == "1"; //米市渡
      });
      if (dataResultTemp.length > 0) {
        var miUPZ =
          dataResultTemp[0].maxvalue != undefined
            ? Number(dataResultTemp[0].maxvalue).toFixed(2)
            : "";
        msdZ.value = miUPZ;
      }

      dataResultTemp = dataResult.filter(function (e) {
        return e.type == "2"; //降雨量站
      });
      var maxDRP = 0;
      for (var num = 0; num < dataResultTemp.length; num++) {
        var drp = dataResultTemp[num].maxvalue;
        if (drp > maxDRP) {
          maxDRP = drp;
        }        
      }
      maxDrpStr.value=maxDRP.toFixed(1);

      dataResultTemp = dataResult.filter(function (e) {
        return e.type == "3"&&e.stcd=="310000"; //面雨量
      });
      var avgDrp= 0;
      avgDrp=dataResultTemp.length > 0?dataResultTemp[0].maxvalue.toFixed(1):0;
      avgDrpStr.value=avgDrp;
    }
  });
}
//超警统计
function loadSQWarn(item) {
  var postParam = {
    ztid: props.strJsonData.id,
    pattem: "1",
  };
  apityphoon.ZhuantifindResultWrz(postParam).then((res) => {
    var warnNum = 0;
    var dataResult = res.data.filter(function (e) {
      if (e.maxz >= e.wrz) {
        warnNum++;
      }
      return e.wrz != undefined;
    });
    WarnNumStr.value = warnNum;
    TotalNumStr.value = dataResult.length;
  });
}
</script>
<style scoped>
.grid {
  display: grid;
  padding: 15px 25px;
}
.grid-cols-2 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.gap-4 {
  gap: 0.85rem;
  text-align: center;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.bg-blue-900 {
  --tw-bg-opacity: 1;
  background-color: rgba(30, 58, 138, var(--tw-bg-opacity));
}
.bg-opacity-30 {
  --tw-bg-opacity: 0.3;
}
.p-3 {
  padding: 0.6rem 0.75rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.1rem;
}
.text-blue-300 {
  --tw-text-opacity: 1;
  color: rgba(147, 197, 253, var(--tw-text-opacity));
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
  /* color:white; */
  color: var(--titled1);
  cursor: pointer;
}
.font-bold {
  font-weight: 700;
}
.mt-1 {
  margin-top: 0.25rem;
}
.text-xs {
  font-size: 0.8rem;
  line-height: 1rem;
  color: white;
}
.text-green-400 {
  font-size: 0.8rem;
  line-height: 1rem;
  color: #77f10a;
  padding-left: 10px;
}
.text-orange-400 {
  font-size: 0.8rem;
  line-height: 1rem;
  color: #ffa200;
  padding-left: 10px;
}
.bg-green-900 {
  background-color: rgba(6, 78, 59, 0.3);
}
.bg-yellow-900 {
  background-color: rgba(120, 53, 15, 0.3);
}
.bg-purple-900 {
  background-color: rgba(76, 29, 149, 0);
  background-image: url(/images/zb_bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.text-green-300 {
  color: rgba(110, 231, 183, 1);
}
.text-yellow-300 {
  --tw-text-opacity: 1;
  color: rgba(252, 211, 77, var(--tw-text-opacity));
}
.text-purple-300 {
  --tw-text-opacity: 1;
  /* color: rgba(196, 181, 253, var(--tw-text-opacity)); */
  color: var(--mtablecolor);
}
.danwei {
  color: var(--mtablecolor);
  font-size: 0.875rem;
}
</style>
