<template>
  <div class="m-box" style="position: relative">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">{{ props.areaName }}总蓄量</p>
    </div>
    <div class="txt">
      <EchartZXSLZI
        title="站点潮位监测 (轮播)"
        :data="xslData"
        :items-per-page="3"
        :auto-play-interval="4000"
        :currentValue="currentValue"
        :totalCapacity="totalCapacity"
        :yesterdayValue="yesterdayValue"
        :key="datekeyAll"
        :wrzValue="wrzValue"
        :grzValue="grzValue"
        width="100%"
      />
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import EchartZXSLZI from "@/components/menu/cxl/EchartZXSLZI.vue";
import apimode from "@/api/mode/index.js";
import dayjs from "dayjs";
import { normalizeSlpName } from "@/api/ComUnit.js";

const xslData = ref([]);
const currentValue = ref(0.0);
const totalCapacity = ref(0.0);
const yesterdayValue = ref(0.0);

const wrzValue=ref(0.0);//警戒水位对应的库容
const grzValue=ref(0.0);//保证水位对应的库容

const props = defineProps({
  strJsonData: { type: Array,default:()=>[] },
  sid: { type: String, default: "81653" },
  areaName: { type: String, default: "" },
});
const datekeyAll = ref(null);

onMounted(() => {
   if(props.strJsonData.length>0){
        Weacontent();
   }
});

watch(function(){ return props.areaName; }, function() {
    if(props.strJsonData.length>0){
        Weacontent();
    }
});

function Weacontent() {
  xslData.value = props.strJsonData.filter(function (item) {
    return normalizeSlpName(item.slpName) == normalizeSlpName(props.areaName);
  });
  var cur = xslData.value[0];
  if (!cur) return;
  currentValue.value = cur.xsl;
  totalCapacity.value = cur.bzKr;
  yesterdayValue.value = cur.xslYest;
  wrzValue.value = cur.jxsl;
  grzValue.value = cur.bxsl;
  datekeyAll.value = new Date();
}
</script>
