<template>
	<div class="m-box">
		<div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
			<div class="d1"></div>
			<div class="d2"></div>
			<p class="base-p" id="title2" @click="fangda()">中央气象台预报降雨</p>
			<span style="font-size:13px;color: #00feff;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;padding-left: 80px;">
				{{props.fbtime}}
			</span>
		</div>
		<div class="txt">
			<Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey"/>
		</div>
		<div class="bot leftBottom-radius"></div>
	</div>
	<ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
		style="width: 70%; height: 700px">
		<zonglanAreaChartZY :strJsonData="props.strJsonData" :fbtime="props.fbtime"/>
	</ComZujian>
</template>

<script setup>
import ComZujian from "@/components/ComZujian.vue";
import * as apiqixiang from "@/api/qixiang/qixiangapi.js";
import dayjs from "dayjs";
import Dialog from "@/api/utils/Dialog.js";
import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy, GetSZStateBy, GetSZState,SumJson } from "@/api/ComUnit.js";
import { onMounted, ref, shallowRef, defineAsyncComponent, h, nextTick, provide, inject, watch,defineProps } from "vue";

// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const showDialog = ref(false);
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("zonglanAreaChartZY");
const _theme = localStorage.getItem("curTheme");
var myData = [];
const props = defineProps({
  strJsonData: {
    type: String,
    default: ""
  },
  fbtime: {
    type: String,
    default: ""
  }
});
onMounted(() => {
	if(SetNull(props.strJsonData)!=""){		
		Weacontent();
	}
});

function Weacontent() {
	ylHtml(props.strJsonData);
}
//日雨量柱状图
function ylHtml(result) {
	const strNote = [];
      strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
      strNote.push({ name: "雨量", codename: "drp", tableV: "0", isShow: true });
      var LineColor = [
        "#3E8BFF",
        "#1CB8B2",
        "#01DDFF",
        "#F9C823",
        "#0264FD",
        "#FE7923",
        "#8E30FF",
      ];
      const _Option = ChartJs.chartYL(
        "",
        result,
        strNote,
        LineColor,
        "雨量",
        "true",
        _theme
      );
      lineOption.value = _Option;
	  datekey.value = Date.now();	  
	// console.error('_Option111111111111111',_Option);
}
function fangda() {
	var dialogClass = $(".dialog").css("display");
	if (dialogClass == "block") {
		return false;
	}	
	$(".g-rside ").css({ "z-index": 90});
	$(".g-lside ").css({ "z-index": 99 });
	showDialog.value = true;
	dateid.value = "zonglanAreaChartZY1";
}
</script>
<style scoped>
.jytuli {
	padding-inline-start: 0px;
}

.jytuli li {
	list-style: none;
}
.qxTitleCon {
    height: 60px;
    position: absolute;
    font-size: 20px;
    color: #00feff;
    top: 60px;
    right:10px;
    text-align: center;
}
</style>