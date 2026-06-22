<template>
  <div class="m-box" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">站网</p>
      <span style="position: absolute;right: 10px;padding-left: 0px;">综合站网密度<span
          style="color:#16ff8d;padding-left: 0px;">5.67</span>k㎡/个
      </span>
    </div>
    <div class="txt">
      <div class="centerBox">
        <div class="icon_sw icon3 flexDivCol flexC">
          <div class="name">水位</div>
          <div class="num">245</div>
        </div>
        <div class="icon_ll icon3 flexDivCol flexC">
          <div class="name">流量</div>
          <div class="num">126</div>
        </div>
        <div class="icon_yl icon2 flexDivCol flexC">
          <div class="name">雨量</div>
          <div class="num">369</div>
        </div>
        <div class="icon_cw icon3 flexDivCol flexC">
          <div class="name">潮位</div>
          <div class="num">67</div>
        </div>
        <div class="icon_dxs icon3 flexDivCol flexC">
          <div class="name">地下水</div>
          <div class="num">174</div>
        </div>
        <div class="icon_zf icon3 flexDivCol flexC">
          <div class="name">蒸发</div>
          <div class="num">138</div>
        </div>
        <div class="icon_swen icon3 flexDivCol flexC">
          <div class="name">工程</div>
          <div class="num">127</div>
        </div>
        <div class="icon_sq icon3 flexDivCol flexC">
          <div class="name">水质</div>
          <div class="num">86</div>
        </div>
        <div class="icon_cyld icon1 flexDivCol flexC">
          <div class="name">水文站</div>
          <div class="num">9</div>
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
  background-image: url(/images/ys_bg2.png);
  background-size: 90% 11.6rem;
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
  width: 4.4rem;
  height: 4.4rem;
  position: absolute;
  right: 10.26rem;
  bottom: 9.88rem;
}

.icon_ll {
  width: 4rem;
  height: 4rem;
  position: absolute;
  right: 3.6rem;
  bottom: 10.4rem;
}

.icon_yl {
  width: 4rem;
  height: 4rem;
  position: absolute;
  right: 7.8rem;
  bottom: 5.2rem;
}

.icon_cw {
  width: 4rem;
  height: 4rem;
  position: absolute;
  right: 0.28rem;
  bottom: 6.5rem;
}

.icon_dxs {
  width: 3.4rem;
  height: 3.4rem;
  position: absolute;
  left: 3.9rem;
  bottom: 4.8rem;
}

.icon_zf {
  width: 3.6rem;
  height: 3.6rem;
  position: absolute;
  left: 0.1rem;
  bottom: 6.875rem;
}

.icon_swen {
  width: 3.2rem;
  height: 3.2rem;
  position: absolute;
  left: 5.6rem;
  bottom: 8.6rem;
}

.icon_sq {
  width: 4rem;
  height: 4rem;
  position: absolute;
  left: 8.2rem;
  bottom: 11.5625rem;
}

.icon_cyld {
  width: 4rem;
  height: 4rem;
  position: absolute;
  left: 9.74rem;
  bottom: 6.28rem;
  background-image: url(/images/defense1.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50%;
}


.icon2 {
  background-image: url(/images/defense2.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50%;
}

.icon3 {
  background-image: url(/images/defense3.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50%;
}

.name {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #fff;
  letter-spacing: 0;
  font-weight: 400;
}

.num {
  font-family: PangMenZhengDao;
  font-size: 1.2rem;
  color: #fff;
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;
}
</style>
