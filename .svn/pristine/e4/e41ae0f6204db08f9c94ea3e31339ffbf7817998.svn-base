<template>
  <div class="m-box" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">数据到报率</p>
      <div style="width:calc(100% - 200px);margin-left:50px;" class="div-swiper">
        <div class="swiper-slide" style="width: 50%;"
          :class="Typeswiper == 'baoxun' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('baoxun')">
          报汛</div>
        <div class="swiper-slide" style="width: 50%;"
          :class="Typeswiper == 'yaoce' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('yaoce')">
          遥测</div>
      </div>
      <!-- <div style="background: var(--portal);border-radius: 6px;border: var(--portalborder);padding: 0px 16px 0px 10px;">
        <div class="sel_wrap" style="position: relative;">
          <label>太湖局</label>
          <img src="/images/icon_select.png" onclick="showItem('FANGANLIST')"
            style="position: absolute; right: -18px; margin-top: 2px; transform: rotate(90deg);">
          <ul class="el-dropdown-menu" id="FANGANLIST"></ul>
        </div>
      </div> -->
    </div>
    <div class="txt">
      <div class="centerBox">
        <div class="icon_sw icon2 flexDivCol flexC">
          <div class="name">水位</div>
          <div><span class="num" style="color: #00fd6d;">100</span>%</div>
        </div>
        <div class="icon_yl icon2 flexDivCol flexC">
          <div class="name">雨量</div>
          <div><span class="num" style="color: #FFD700;">97</span>%</div>
        </div>
        <div class="icon_gc icon2 flexDivCol flexC">
          <div class="name">工程</div>
          <div><span class="num" style="color: #ed9b42;">92</span>%</div>
        </div>
        <div class="icon_ll icon2 flexDivCol flexC">
          <div class="name">流量</div>
          <div><span class="num" style="color: #FFD700;">95</span>%</div>
        </div>
        <div class="icon_yb icon2 flexDivCol flexC">
          <div class="name">预报</div>
          <div><span class="num" style="color: #ed9b42;">91</span>%</div>
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <zonglanTableSYQ />
  </ComZujian>
</template>
<script setup>
import '@/assets/styles/Table.css';
import ComZujian from "@/components/ComZujian.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import dayjs from "dayjs";
import $ from "jquery";
import { useStore } from 'vuex'
import Dialog from "@/api/utils/Dialog.js";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { sortObjectArray, SumJson } from "@/api/ComUnit.js";
import { ElMessage } from "element-plus";

import { useRouter } from "vue-router";
const router = useRouter();
const _theme = localStorage.getItem("curTheme");
const lineOption = ref({});
const store = useStore();
const { viewer } = store.state;
const datekey = ref(null);
const Typeswiper = ref('baoxun');
const tableHeaders = ref([
  { name: "sortnum", label: "序号" },
  { name: "name", label: "区域" },
  { name: "maxstnm", label: "站名" },
  { name: "maxdrp", label: "最大雨量(mm)" },
]);
const tableData = ref([]);
const tableDataAll = ref([]);
const Timeswiper = ref('30');

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const stime = ref({});
const etime = ref({});
function Weacontent() {
  var areaData = ['宝山', '崇明', '奉贤', '嘉定', '金山', '闵行', '浦东', '青浦', '松江'];

}
function GetType(type) {
  Typeswiper.value = type;
}
function fangda() {
  $(".shdswDiv .swDiv").removeClass("swDivSelect");
  $(".slideInUp").removeClass("z-crt");
  router.push({ path: "/shuzidatingZW" });
  // var dialogClass = $(".dialog").css("display");
  // if (dialogClass == "block") {
  //   return false;
  // }
  // $(".g-lside ").css({ "z-index": 99 });
  // $(".g-rside ").css({ "z-index": 90 });
  // showDialog.value = true;
}
onMounted(() => {
  var nowTM = new Date();
  etime.value = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  if (Number(dayjs(nowTM).format("HH")) > 7) {
    stime.value = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  }
  else {
    stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  Weacontent();
});
</script>
<style scoped>
.centerBox {
  background-image: url(/images/back3.png);
  background-size: 90% 13rem;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100%;
  position: relative;
}

.flexDivCol {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
}

.icon_sw {
  width: 6rem;
  height: 6rem;
  position: absolute;
  right: 11rem;
  bottom: 9rem;
}

.icon_yl {
  width: 6rem;
  height: 6rem;
  position: absolute;
  right: 6rem;
  bottom: 0rem;
}

.icon_ll {
  width: 6rem;
  height: 6rem;
  position: absolute;
  left: 6rem;
  bottom: 0rem;
}

.icon_gc {
  width: 6rem;
  height: 6rem;
  position: absolute;
  left: 1rem;
  bottom: 6rem;
}


.icon_yb {
  width: 6rem;
  height: 6rem;
  position: absolute;
  right: 1rem;
  bottom: 6rem;
}


.icon2 {
  background-image: url(/images/back-circle.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50%;
  color: var(--mtablecolor);
}

.name {
  font-size: 14px;
  color: var(--mtablecolor);
  letter-spacing: 0;
  font-weight: 400;
}

.num {
  font-family: 'number';
  font-size: 1.2rem;
  color: var(--mtablecolor);
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;
}
</style>
