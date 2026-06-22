<template>
	<div class="m-box m-box-1">
		<div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
			<div class="d1"></div>
			<div class="d2"></div>
			<p class="base-p" id="title2" @click="fangda()">最高水位(超警幅度)</p>
		</div>
		<div class="txt">
			<div class="m-list4 box-siz" id="tableSW">
				<div class="ysts-group" style="width:98%; display: flex;margin: 0px auto;" id="ysts-group-daibiaoYJ">

					<div v-for="(item, index) in  resultData " :key="index" class="ysts-item"
						@click="loc(item.lgtd, item.lttd, item.stcd, item.stnm)">
						<div class="ysts-name"><span class="ysts-numorder">{{ index + 1 }}</span> {{ item.stnm }}</div>
						<div class="ysts-value">
							最高：<span :class="item.groupCls">{{ item.maxz }}</span>
							<span class="ysts-unit">({{ item.TMStr }})</span><span style="padding-left: 68px;"></span>
							超警幅度：<span class="ysts-num font-agency color-min">{{ item.wrzCha }}</span>
						</div>
					</div>


				</div>
			</div>
		</div>
		<div class="bot leftBottom-radius"></div>
	</div>
	<ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
		style="width: 70%; height: 700px">
		<yujingMaxTable :DD_ARR="DD_ARR" :key="datekeyDialog" />
	</ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import { Postcard } from "@element-plus/icons-vue";

import Table from "@/components/Table/Table.vue";
import api from "@/api/mode/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";

import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy, GetSZStateBy, GetSZState, sortObjectArray } from "@/api/ComUnit.js";
import { ElMessage } from 'element-plus';


import {
	onMounted,
	ref,
	shallowRef,
	defineAsyncComponent,
	nextTick,
	provide,
	inject,
	watch
} from "vue";

// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
const titleNameLine = ref();
const showDialog = ref(false);

const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("yubaoMaxTable");
const datekeyDialog = ref(null);

const _theme = localStorage.getItem("curTheme");

var myData = [];
const resultData = ref([])

const props = defineProps({
	DD_ARR: {
		type: String,
		default: ""
	},
    swstrJson:{
        type: String,
        default: ""
    },
});
var DD_ARR = props.DD_ARR; //调度方案编号

watch(props.DD_ARR, () => {
	Weacontent();
});

onMounted(() => {
	if (props.DD_ARR.DD_ID != undefined) {
		Weacontent();
	}
});
const emit = defineEmits(['reviceProgessTimeParent']);
function Weacontent() {
	if(SetNull(props.swstrJson)!=""){    
        JsonColumnChart(props.swstrJson);
    }
}
function JsonColumnChart(res) {
	var data = res;
	var groupHtml = "";
	var haveNum = 0;
	var dataResult = [];
	for (var num = 0; num < data.length; num++) {
		var item = data[num];
		if (SetNull(item.maxz) != "") {
			item.maxz = Number(item.maxz).toFixed(2);
		}
		var WRZ = item.wrz != undefined ? Number(item.wrz).toFixed(2) : "—";
		var GRZ = item.grz != undefined ? Number(item.grz).toFixed(2) : "—";
		var UPZ = item.maxz != undefined ? Number(item.maxz).toFixed(2) : "—";
		var MINZ = item.minz != undefined ? Number(item.minz).toFixed(2) : "—";
		var STARTZ =
			item.startz != undefined ? Number(item.startz).toFixed(2) : "—"; //起始水位，用来计算涨幅
		var groupCls = "color-zc";
		var itemCls = "";

		if (UPZ != "—") {
			var wrzCha = WRZ != "—" ? Number(UPZ) - Number(WRZ) : "—";
            var wrzChaA=0;
			var cls = "";
			if (WRZ != "—" && WRZ > 0 && Number(UPZ) >= Number(WRZ)) {
				cls = "tableWRZ";
				groupCls = "color-wrz";
				itemCls = "color-wrz";
                wrzChaA=Number(UPZ) - Number(WRZ);
			}
			if (GRZ != "-" && GRZ > 0 && Number(UPZ) >= Number(GRZ)) {
				cls = "tableGRZ";
				groupCls = "color-grz";
				itemCls = "color-grz";
			}

			var clsM = "";
			if (WRZ != "—" && WRZ > 0 && Number(MINZ) >= Number(WRZ)) {
				clsM = "tableWRZ";
			}
			if (GRZ != "-" && GRZ > 0 && Number(MINZ) >= Number(GRZ)) {
				clsM = "tableGRZ";
			}

			var TM = "-",
				MTM = "-";
			if (item.maxtm != undefined) {
				TM = dayjs(new Date(item.maxtm)).format("M-D H:mm");
			}
			if (item.mintm != undefined) {
				MTM = dayjs(new Date(item.mintm)).format("M-D H:mm");
			}
			TM = dayjs(new Date(item.maxtm)).format("M-D HH:mm");
			MTM = dayjs(new Date(item.mintm)).format("M-D HH:mm");
			item.TMStr = TM;
			item.wrzCha = wrzCha != "—" ? wrzCha.toFixed(2) : wrzCha;
            item.wrzChaA =wrzChaA;
			item.groupCls = "ysts-num font-agency " + groupCls;
			item.data = item.maxz;
			dataResult.push(item);
		}
	}
	resultData.value = sortObjectArray(dataResult, ["wrzChaA"], "desc");;  //超警幅度最大靠前
	emit("reviceProgessTimeParent", { result: dataResult });
}
function loc(lgtd, lttd, stcd, stnm) {
	if (SetNull(lgtd) == "" && SetNull(lttd) == "") {
		ElMessage.error("缺少经纬度坐标");
	}
	else {
		let _lgtd = Number(lgtd);
		let _lttd = Number(lttd);
		var evt=[_lgtd,_lttd];
		emit("parentMethodshowDynamicLayers", evt);
	}
}
function fangda() {
	var dialogClass = $(".dialog").css("display");
	if (dialogClass == "block") {
		return false;
	}
	$(".g-lside ").css({ "z-index": 99 });
	$(".g-rside ").css({ "z-index": 90 });
	showDialog.value = true;
}
</script>
<style scoped>
.ysts-group {
	overflow-y: auto;
	overflow-x: hidden;
}

/* 自定义滚动条样式 */
.ysts-group::-webkit-scrollbar {
	width: 2px;
	/* 设置滚动条宽度 */
}

.ysts-group::-webkit-scrollbar-track {
	/* 滚动条轨道 */
	/* background: rgb(49, 139, 167); */
}

.ysts-group::-webkit-scrollbar-thumb {
	/* 滚动条手柄 */
	width: 10px;
	height: 10px;
	position: absolute;
	right: 0px;
	top: 0px;
	background: var(--mtabletrcolor);
	z-index: 2;
}

.ysts-item {
	flex: 0 0 100%;
	margin: 5px 10px;
	/* padding: 0px 10px; */
	cursor: pointer;
	border-bottom: 0.12rem solid var(--portal);
	/* border-image: linear-gradient(90deg, #0e5892, #07111d) 20 20; */
	/* background: rgba(0, 255, 255, .2); */
	float: left;
	width: 100%;
}

.ysts-line {
	width: 100%;
	flex-wrap: wrap;
	display: flex;
	/*border-bottom: .02rem solid;
                border-image: linear-gradient(90deg,#0784e7,#103bb3) 20 20;*/
	border-bottom: .12rem solid;
	border-image: linear-gradient(90deg, #0e5892, #07111d) 20 20;
}

.ysts-name {
	font-size: 15px;
	/* color: #fff; */
	color: var(--sel_wraplabelcolor);
	/* font-family: '汉仪菱心体简'; */
	font-weight: 550;
	text-align: left;
	height: 28px;
	line-height: 28px;
}

.ysts-num {
	/*font-family: 'number';*/
}

.ysts-value {
	color: var(--ystsVvalue);
	padding: 5px 0px 5px 33px;
	font-size: 14px;
}

.ysts-value:before {
	left: 1.5vh;
	background: none;
}

.ysts-unit {
	font-size: 0.9rem;
}

.ysts-numorder {
	width: 26px;
	height: 26px;
	border-radius: 20px;
	display: block;
	background: var(--mtabletrcolor);
	color: var(--mtablecolor) !important;
	line-height: 28px;
	text-align: center;
	float: left;
	margin-right: 10px;
	font-size: 0.9rem;
}

.font-agency {
	font-family: AGENCYB, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
}

.color-hh1 {
	color: #00cfff;
}

.ysts-value1.color-hh1:before {
	background-color: #00cfff;
}


.color-hh2 {
	color: #00fd6d;
}

.ysts-value1.color-hh2:before {
	background-color: #00fd6d;
}


.color-hh3 {
	color: #efc30a;
}

.ysts-value1.color-hh3:before {
	background-color: #efc30a;
}

.color-hh4 {
	color: #ffef00;
}

.ysts-value1.color-hh4:before {
	background-color: #ffef00;
}

.color-hh5 {
	color: #00AEFD;
}

.ysts-value1.color-hh5:before {
	background-color: #00AEFD;
}

.color-hh6 {
	color: #6374FD;
}

.ysts-value1.color-hh6:before {
	background-color: #6374FD;
}

.color-hh7 {
	color: #ECAEFD;
}

.ysts-value1.color-hh7:before {
	background-color: #ECAEFD;
}


.color-hh8 {
	color: #EC30FD;
}

.ysts-value1.color-hh8:before {
	background-color: #EC30FD;
}

.color-hh9 {
	color: #EC3032;
}

.ysts-value1.color-hh9:before {
	background-color: #EC3032;
}


.color-cj1 {
	color: #3E8BFF;
}

.ysts-value1.color-cj1:before {
	background-color: #3E8BFF;
}

.color-cj2 {
	color: #1CB8B2;
}

.ysts-value1.color-cj2:before {
	background-color: #1CB8B2;
}

.color-cj3 {
	color: #01DDFF;
}

.ysts-value1.color-cj3:before {
	background-color: #01DDFF;
}

.color-cj4 {
	color: #F9C823;
}

.ysts-value1.color-cj4:before {
	background-color: #F9C823;
}

.color-cj5 {
	color: #0264FD;
}

.ysts-value1.color-cj5:before {
	background-color: #0264FD;
}

.color-cj6 {
	color: #FE7923;
}

.ysts-value.color-cj6:before {
	background-color: #FE7923;
}

.color-cj6 {
	color: #8E30FF;
}

.ysts-value1.color-cj6:before {
	background-color: #8E30FF;
}


.color-zc {
	color: #07EF7D;
}

.color-zc:before {
	background-color: #07EF7D;
}

.color-min {
	color: #00cfff;
}

.color-min:before {
	background-color: #00cfff;
}

.color-wrz {
	color: #F7BC00;
}

.color-wrz:before {
	background-color: #F7BC00;
}

.color-grz {
	color: red;
}

.color-grz:before {
	background-color: red;
}
</style>