<template>
  <ul class="btnList">
    <li data-type="防洪形势分析" @click="WQTab('windDefault')" :class="tabWQname == 'windDefault' && 'curSelect'" class="cur">
      <i class="caseBtn_wind"></i>
      <span class="Listspan">防洪形势分析</span>
    </li>
    <li data-type="纳雨能力分析" @click="WQTab('rainDefault')" :class="tabWQname == 'rainDefault' && 'curSelect'" class="cur">
      <i class="caseBtn_rain"></i>
      <span class="Listspan">纳雨能力分析</span>
    </li>
    <!-- <li data-type="圩区水位预测" @click="WQTab('radarDefault')" :class="tabWQname == 'radarDefault' && 'curSelect'" class="cur">
      <i class="caseBtn_radar"></i>
      <span class="Listspan" style="margin-left: 13px">圩区水位预测</span>
    </li> -->
    <li data-type="工程推荐调度" @click="WQTab('ddDefault')" :class="tabWQname == 'ddDefault' && 'curSelect'" class="cur">
      <i class="caseBtn_DD"></i>
      <span class="Listspan" style="margin-left: 13px">工程推荐调度</span>
    </li>
    <!-- <li data-type="圩区排涝能力" @click="WQTab('tempDefault')" :class="tabWQname == 'tempDefault' && 'curSelect'" class="cur">
      <i class="caseBtn_temp"></i>
      <span class="Listspan">圩区排涝能力</span>
    </li> -->
  </ul>
</template>

<script setup>
// import { loadModules } from 'esri-loader'
import { ref, onMounted, provide, inject } from "vue";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
const mapRef = ref(null);
const tabWQname = ref("windDefault");

function WQTab(e) {
  tabWQname.value = e;
}
defineExpose({ tabWQname });
</script>
<style src="@/assets/styles/style.css"></style>
<style scoped>
.btnList {
  position: absolute;
  /* top: 10.3rem; */
  top: calc(6rem + 50px);
  left: 1rem;
  width: 200px;
  padding: 0px;
}

.btnList li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  float: left;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;
  color: var(--btnListlicolor);
  list-style: none;
}

.btnList .curSelect {
  color: var(--btnListlicolorSeleted);
}

.btnList li i {
  background-size: 100% 100% !important;
  display: block;
  float: left;
  height: 40px;
  left: -6px;
  position: relative;
  top: -1px;
  width: 40px;
}

.btnList li span {
  margin-left: 0px;
  margin-top: 0px;
}

.btnList li i.caseBtn_radar {
  background: var(--caseBtnWater) no-repeat center center;
  height: 26px;
  width: 26px;
  left: 1px;
  top: 2px;
}

.btnList li:hover i.caseBtn_radar {
  background: var(--caseBtnWaterCur) no-repeat center center;
  color: var(--btnListlicolorSeleted);
  height: 26px;
  width: 26px;
  left: 1px;
  top: 2px;
}

.btnList .curSelect i.caseBtn_radar {
  background: var(--caseBtnWaterCur) no-repeat center center;
  height: 26px;
  width: 26px;
  left: 1px;
  top: 2px;
}

.btnList li i.caseBtn_wind {
  background: var(--caseBtnWind) no-repeat center center;
}

.btnList .curSelect i.caseBtn_wind {
  background: var(--caseBtnWindCur) no-repeat center center;
  color: var(--btnListlicolorSeleted);
}

.btnList li:hover i.caseBtn_wind {
  background: var(--caseBtnWindCur) no-repeat center center;
  color: var(--btnListlicolorSeleted);
}

.btnList li i.caseBtn_rain {
  background: var(--caseBtnRain) no-repeat center center;
  color: var(--btnListlicolorSeleted);
}

.btnList .curSelect i.caseBtn_rain {
  background: var(--caseBtnRainCur) no-repeat center center;
}

.btnList li:hover i.caseBtn_rain {
  background: var(--caseBtnRainCur) no-repeat center center;
  color: var(--btnListlicolorSeleted);
}

.btnList li i.caseBtn_DD {
  background: var(--caseBtnDD) no-repeat center center;
  height: 26px;
  width: 26px;
  left: 1px;
  top: 3px;
}

.btnList .curSelect i.caseBtn_DD {
  background: var(--caseBtnDDCur) no-repeat center center;
  height: 26px;
  width: 26px;
  left: 1px;
  top: 3px;
}

.btnList li:hover i.caseBtn_DD {
  background: var(--caseBtnDDCur) no-repeat center center;
  height: 26px;
  width: 26px;
  left: 1px;
  top: 3px;
}

.btnList li i.caseBtn_temp {
  background: var(--caseBtnTemp) no-repeat center center;
}

.btnList .curSelect i.caseBtn_temp {
  background: var(--caseBtnTempCur) no-repeat center center;
}

.btnList li:hover i.caseBtn_temp {
  background: var(--caseBtnTempCur) no-repeat center center;
  color: var(--btnListlicolorSeleted);
}

.btnList .cur .Listspan {
  display: block;
  width: 150px;
  height: 100%;
  float: left;
  font-size: 18px;
  text-align: center;
  border-radius: 35px;
  background: var(--btnListcurListspan)
}

.btnList li:hover .Listspan {
  background: var(--popContentHeadbg);
}

.btnList .curSelect .Listspan {
  background: var(--popContentHeadbg);
  display: block;
  width: 150px;
  height: 100%;
  float: left;
  font-size: 18px;
  text-align: center;
  border-radius: 35px;
  margin-top: 2px;
}

.colorSpan {
  display: inline-block;
  width: 20px;
  height: 50px;
  margin-right: 5px;
  margin-top: 4px;
}

.colorSpanValue {
  margin-top: 7px;
  font-size: 13px;
  vertical-align: 4px;
}
</style>
