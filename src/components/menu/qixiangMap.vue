<template>
  <!-- 左侧tab切换 -->
  <!-- 侧边栏 -->
    <aside class="aside">
        <tabToggleSQ />
    </aside>

  <!-- 左侧 -->
  <div class="g-lside">      
    <div style="width: 100%">
      <zonglanAreaChart :resultDataSL="resultDataSL" :key="datekeyAll" />
    </div>
    <div style="width: 100%">
      <zonglanAreaChartZY :strJsonData="strJsonData" :fbtime="fbtime" :key="datekeyAllYL"/>
    </div>
    <div style="width: 100%">
      <wendai/>
    </div>   

  </div>
  <!-- 右侧 -->
  <div class="g-rside">        
    <div style="width: 100%">
      <taifeng/>
    </div> 
    <div style="width: 100%">   
      <haichao />
    </div>
    <div style="width: 100%">   
      <windyweater />
    </div>
  </div>

  <div id="tmCenter" class="tmCenter">{{ tmCenter }}</div>

<div id="SSTTL" style="background: rgba(0,0,0,0.2) 30%;position:absolute;right:29rem;bottom:10px;
    width: 75px;-moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;display:block;">
      <div id="swTuli" class="colorL">
              <p><span class="colorSpan" style="background-color:#7B0000"></span><span class="colorSpanValue">200</span></p>
              <p><span class="colorSpan" style="background-color:#FB3DFA"></span><span class="colorSpanValue">100</span></p>
              <p><span class="colorSpan" style="background-color:#0000F9"></span><span class="colorSpanValue">50</span></p>
              <p><span class="colorSpan" style="background-color:#3DBCF9"></span><span class="colorSpanValue">25</span></p>
              <p><span class="colorSpan" style="background-color:#007B00"></span><span class="colorSpanValue">10</span></p>    
              <p><span class="colorSpan" style="background-color:#A6F28E"></span><span class="colorSpanValue">0</span></p>
      </div>
    </div>
</template>

<script setup>
import tabToggleSQ from "@/components/tab/tabToggleSQ.vue";

import zonglanAreaChart from "@/components/menu/yb/zonglanAreaChart.vue";
import zonglanAreaChartZY from "@/components/menu/yb/zonglanAreaChartZY.vue";
import wendai from "@/components/menu/qx/wendai.vue";
import taifeng from "@/components/menu/qx/taifeng.vue";
import haichao from "@/components/menu/qx/haichao.vue";
import windyweater from "@/components/menu/qx/windyweater.vue";
import { onMounted, ref, nextTick, onUnmounted, provide,reactive } from "vue";

import {CreateImageLayer,removeEntityByName,dyCenter,addAreaLineQS,setZOOM,RemoveLayer} from "@/utils/ArcGis/MapComm.js";
import * as apiqixiang from "@/api/qixiang/qixiangapi.js";
import { SetNull, groupBy, GetSZStateBy, GetSZState,SumJson } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import * as PointMark from "@/utils/ArcGis/PointMark.js";

const tmCenter = ref(null);
const strJsonData=ref(null);
const fbtime=ref("");
const datekeyAllYL=ref("");

onMounted(() => {
  $(".light").parent().remove();
  $("#tabqx").addClass('swDivSelect swDiv');
  $("#m_shik").addClass('z-crtitem z-crt wow slideInUp link-item');
  setTimeout(function () {
    clearALL();
    addAreaLineQS();
    loadAreaYL();
  }, 800);
});
function clearALL(obj) {
  try {
    removeEntityByName(obj);
  } catch (ex) { }
}
function loadAreaYL() {
    window.loadingShow(); 
	var strParam = {
	};
	apiqixiang
	  .QXSJRFFLTM(strParam)
	  .then((res) => {
		  if(res.data!=undefined){
			const ybtm = res.data.ybtm;
      fbtime.value=dayjs(ybtm).format("M月D日H时m分")+"发布";
      tmCenter.value="中央气象台未来7天降雨预报";
			loadYLData(ybtm);
		  }
	  })
	  .catch((err) => {
	    console.error(err);
	  });
}
function loadYLData(ybtm){
    var strParam = {startdate:ybtm}
	apiqixiang
	  .STRNFLFDay(strParam)
	  .then((res) => {
		  if(res.data!=undefined){
        var strJsonList = groupBy(res.data, "NAME");
        var result=[];
        strJsonList.map(item=>{
          var drp=Number( SumJson(item,'DRP')).toFixed(1);
          result.push({stnm:item[0].NAME,drp:drp});		
        })
			  strJsonData.value=result;
      }
      PointMark.MapRainfallArea(strJsonData.value);
      datekeyAllYL.value=Date.now();
      window.loadingHide();
	  })
	  .catch((err) => {
	    console.error(err);
	  });
}
</script>

<style scoped>
.colorSpan{
    display: inline-block;
    width:15px;
    height: 25px;
    margin: 0px;
    margin-right: 5px;
}
.colorL{
  padding: 10px;
}
.colorL p {
  line-height: 16px;
  margin-bottom: -4px;
}

.colorSpanValue {
    /* margin-top: 7px; */
    font-size: 13px;
    color: white;
}
</style>