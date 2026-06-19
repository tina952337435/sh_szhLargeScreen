<template>
  <div class="m-box" style="position: relative">
    <div
      class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
    >
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">总蓄量</p>

      <div style="width: calc(100% - 110px)" class="div-swiper">
        <div
          class="swiper-slide"
          style="width: 20%"
          :class="
            Drpswiper == '81653' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('81653')"
        >
          嘉宝北片
        </div>
        <div
          class="swiper-slide"
          style="width: 20%"
          :class="
            Drpswiper == '81651' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('81651')"
        >
          淀北片
        </div>
        <div
          class="swiper-slide"
          style="width: 20%"
          :class="
            Drpswiper == '81652' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('81652')"
        >
          蕰南片
        </div>
        <div
          class="swiper-slide"
          style="width: 20%"
          :class="
            Drpswiper == '81654' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('81654')"
        >
          青松片
        </div>
        <div
          class="swiper-slide"
          style="width: 20%"
          :class="
            Drpswiper == '81650' && 'swiper-slide swiper-slide-thumb-active'
          "
          @click="qiehuan('81650')"
        >
          苏州河
        </div>
      </div>
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
import { ref, onMounted } from "vue";
import EchartZXSLZI from "@/components/menu/cxl/EchartZXSLZI.vue";
import apimode from "@/api/mode/index.js";
import dayjs from "dayjs";
const Drpswiper = ref("81653");
const xslData = ref([]);
const currentValue = ref(0.0);
const totalCapacity = ref(0.0);
const yesterdayValue = ref(0.0);

const wrzValue=ref(0.0);//警戒水位对应的库容
const grzValue=ref(0.0);//保证水位对应的库容

const props = defineProps({
  strJsonData: { type: Array,default:()=>[] },
});
const datekeyAll = ref(null);
onMounted(() => {
   if(props.strJsonData.length>0){    
        Weacontent();
   }
});

function Weacontent() {
  xslData.value =props.strJsonData.filter(function (item) {
    return item.id == Drpswiper.value;
  });
  console.error("xslData.value",xslData.value);
  currentValue.value = xslData.value[xslData.value.length - 1].xsl;
  totalCapacity.value = xslData.value[xslData.value.length - 1].grzxsl;
  yesterdayValue.value = xslData.value[0].xsl
  wrzValue.value = xslData.value[xslData.value.length - 1].jxsl;
  grzValue.value = xslData.value[xslData.value.length - 1].bxsl;
  datekeyAll.value = new Date();
}
const emit = defineEmits(["parentMethodshowDynamicLayers"]);
function qiehuan(stcd) {
  Drpswiper.value = stcd; 
  Weacontent();
  emit("parentMethodshowDynamicLayers", stcd);
}
</script>
