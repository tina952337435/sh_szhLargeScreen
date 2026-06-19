<template>
	<div class="m-box">
		<div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
			style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
			<div style="line-height:30px;">
				<div class="d1"></div>
				<div class="d2"></div>
				<p class="base-p" id="title2" @click="fangda()">预测水位</p>
			</div>
		</div>
		<div class="txt">
			<div style="width: 100%;height: calc(100%);">
				<el-table :data="tableData" style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;"
					@row-click="handleclick">
					<el-table-column fixed label="名称" prop="stnm" width="80" header-align="center" align="center"
						:show-overflow-tooltip="true">
						<template #header>
							名称
						</template>
						<template #default="scope">
							<span style="cursor: pointer;" v-show="!scope.row.isEdit">{{ scope.row.stnm }}</span>
						</template>
					</el-table-column>
					<el-table-column label="预测最高" header-align="center" align="center">
						<template #default="scope">
							<span :style="computedStyle(scope.row.maxz, scope.row.wrz, scope.row.grz)">{{ scope.row.maxz
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="发生时间" header-align="center" align="center">
						<template #default="scope">
							<span>{{ scope.row.TMStr }}</span>
						</template>
					</el-table-column>
					<el-table-column label="历史最高" header-align="center" align="center">
						<template #default="scope">
							<span style="color:rgb(253 0 235);font-weight:600;">{{ scope.row.xzdz }}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="bot leftBottom-radius" style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
		</div>
	</div>
	<ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
		style="width: 70%; height: 700px">
		<zonglanyubao />
	</ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import EchartsList from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull,sortObjectArray } from "@/api/ComUnit";
import { ElMessage, ElTable, ElTableColumn } from "element-plus";
import { setZOOM, dyCenter } from "@/utils/ArcGis/MapComm.js";
import { useStore } from "vuex";
import Dialog from "@/api/utils/Dialog.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const store = useStore();
const { viewer } = store.state;
const Typeswiper = ref('day');
const datekey = ref(null);
const dateid = ref('yubaozhandian');
const lineOption = ref({});
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
function Weacontent() {
	const strParam={
		"data_TYPE": "1"
	}
	api.getMODELSINGRESULT(strParam)
	  .then((res) => {
	    const strJson = res.data; //sortObjectArray(res.result, ["drp"], "desc");	    
		var data =strJson;
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
			var STARTZ =item.startz != undefined ? Number(item.startz).toFixed(2) : "—"; //起始水位，用来计算涨幅
			var xzdz=SetNull(item.xzdz) != ""? Number(item.xzdz).toFixed(2) : "—";
			var groupCls = "color-zc";
			var groupClsMin = "color-zc";
			var itemCls = "";
			if (UPZ != "—") {
				var cls = "";
				if (WRZ != "—" && WRZ > 0 && Number(UPZ) >= Number(WRZ)) {
					cls = "tableWRZ";
					groupCls = "color-wrz";
					itemCls = "color-wrz";
				}
				if (GRZ != "-" && GRZ > 0 && Number(UPZ) >= Number(GRZ)) {
					// alert("grz");
					cls = "tableGRZ";
					groupCls = "color-grz";
					itemCls = "color-grz";
				}

				var clsM = "";
				if (WRZ != "—" && WRZ > 0 && Number(MINZ) >= Number(WRZ)) {
					clsM = "tableWRZ";
					groupClsMin = "color-wrz";
				}
				if (GRZ != "-" && GRZ > 0 && Number(MINZ) >= Number(GRZ)) {
					clsM = "tableGRZ";
					groupClsMin = "color-grz";
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
				item.index = num + 1;
				item.TMStr = TM;
				item.minTM = MTM;
				if (STARTZ != "—") {
					item.swzf = Number(UPZ - STARTZ).toFixed(2);
				}
				item.groupCls = "ysts-num font-agency " + groupCls;
				item.groupClsMin = "ysts-num font-agency " + groupClsMin;
				item.lgtd = item.lgtd84;
				item.lttd = item.lttd84;
				item.xzdz=xzdz;
				dataResult.push(item);
			}
		}
		// tableData.value = dataResult;
		// console.error(dataResult);
		tableData.value = sortObjectArray(dataResult, ["groupCls"], "asc");;  //超警幅度最大靠前
	  })
	  .catch((err) => {
	    console.error(err);
	  });
}
// 颜色
function computedStyle(upz, wrz, grz) {
	var Fontcolor = ""
	if (upz != "") {
		if (Number(upz) >= Number(grz)&&Number(grz)>0) {
			Fontcolor = "#ff0000"
		} else if (Number(upz) >= Number(wrz)&&Number(wrz)>0) {
			Fontcolor = "#f37804"
		}
	}
	return { color: Fontcolor };
}
function fangda() {
	var dialogClass = $(".dialog").css("display");
	if (dialogClass == "block") {
		return false;
	}
	$(".g-lside ").css({ "z-index": 90 });
	$(".g-rside ").css({ "z-index": 99 });
	showDialog.value = true;
}
onMounted(() => {
	Weacontent();
});

function handleclick(evt) {
  const item =evt;
  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/yb/SQYBLine.vue")
  );
  const props = {};
  props["stcd"] = item["stcd"]
  props["stnm"] = SetNull(item["stnm"]).replaceAll(" ", "");
  props["dd_id"] = item["solutionid"];
  props["stime"] = item["dd_TM"];
  props["etime"] = item["dd_CHECKBY"];
  Dialog.open({ title: item["stnm"] + "预报水位过程线", widh: 1400, heig: 800 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
}
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
.zfgzCon {
	width: 96%;
	margin: 0 auto;
	height: 100%;
}

.flexSB {
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
}

.zfgzCon .zfgzItem {
	width: 200px;
	height: 100%;
	margin-top: 10px;
}

.zfgzCon .zfgzItem .sjsh {
	width: 100%;
	height: 32px;
	background-image: url(/images/fw_zf.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	font-family: largeFont;
	font-size: 16px;
	color: #c4eafb;
	letter-spacing: 2px;
	font-weight: 400;
}

.flexC {
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
}

.flexDiv {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.zfgzCon .zfgzItem .yearMonth {
	width: 100%;
	height: 60px;
	line-height: 30px;
	background-image: url(/images/fuwu-shuju.png);
	background-size: 100% 50%;
	background-position: 0 40%;
	background-repeat: no-repeat;
	font-size: 14px;
	color: var(--mtablecolor);
	letter-spacing: 0;
	text-align: center;
	font-weight: 400;
}

.zfgzCon .zfgzItem .yearMonth .year,
.zfgzCon .zfgzItem .yearMonth .month {
	width: 120px;
	margin-left: 50px;
}

.zfgzCon .zfgzItem .yearMonth .year span {
	font-family: 'number';
	font-size: 16px;
	color: var(--titled1);
	letter-spacing: 0;
	text-align: right;
	font-weight: 800;
}

.zfgzCon .zfgzItem .yearMonth .month span {
	font-family: 'number';
	font-size: 16px;
	color: #00fd6d;
	letter-spacing: 0;
	text-align: right;
	font-weight: 800;
}

.top {
	width: 96%;
	height: 60px;
	margin: 6px auto;
}

.topItem {
	width: 136px;
	height: 100%;
	background-image: var(--zbbg);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	font-size: 14px;
	color: var(--mtablecolor);
	letter-spacing: 0;
	text-align: center;
	font-weight: 400;
}

.topItem .name {
	margin-top: 6px;
}

.topItem .num span {
	font-family: 'number';
	font-size: 20px;
	color: var(--titled1);
	letter-spacing: 0;
	font-weight: 400;
	margin-right: 5px;
}

.flexDiv {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.flexDivCol {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.flexC {
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
}

.proBox {
	width: 96%;
	margin: 0 auto;
	height: calc(100% - 60px);
}

.proBox .gcl {
	width: 60px;
	height: 100%;
	max-height: 160px;
	background-image: url(/images/projectType.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	font-size: 14px;
	color: #eff;
	letter-spacing: 0.6rem;
	line-height: 20px;
	font-weight: 600;
	-webkit-writing-mode: vertical-rl;
	-ms-writing-mode: tb-rl;
	writing-mode: vertical-rl;
	text-orientation: upright;
	padding-right: 10px;
}

.proBox .gc-item {
	width: 26%;
	margin-left: 3%;
	height: 100%;
	max-height: 160px;
	background-image: url(/images/projectBg.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.proBox .gc-item .name {
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #fff;
	letter-spacing: 0;
	text-align: center;
	font-weight: 400;
}

.proBox .gc-item .num {
	font-family: 'number';
	font-size: 16px;
	color: #86fcfd;
	letter-spacing: 0;
	text-align: center;
	font-weight: 400;
	margin-top: 6px;
}

:deep(.el-tabs--card>.el-tabs__header) {
	padding: 0px;
	margin: 0px;
}

:deep(.el-tabs--card>.el-tabs__header) {
	border-bottom: 0px;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
	border: 0px;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
	background: var(--swDivSelectcolor);
	border-radius: 6px;
	border: var(--portalborder);
	min-width: 80px;
	/* padding: 8px; */
	height: 34px;
	line-height: 34px;
	color: var(--widgetcolor);
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
	background: var(--portal);
	border-radius: 6px;
	min-width: 80px;
	border: var(--portalborder);
	/* padding: 8px; */
	height: 34px;
	line-height: 34px;
	color: white;
	margin: 0px 5px;
}

:deep(.demo-tabs > .el-tabs__content) {
	border: none;
	background: transparent;
}

:deep(.el-table),
:deep(.el-table tr),
:deep(.el-table:not(.el-table--border) .el-table__cell) {
	background: transparent;
	color: var(--mtablecolor);
	border: none;
	--el-table-border-color: none;
}

:deep(.el-table__header-wrapper:not(.el-table--border) .el-table__cell) {
	color: var(--mtablethcolor);
}

:deep(.el-table .cell) {
	padding: 0 8px;
	white-space: nowrap;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell) {
	background-color: transparent;
}

:deep(.el-input) {
	--el-input-border-color: var(--mtablecolor);
	width: 200px;
	border-radius: 6px;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
	box-shadow: 0 0 0 1px var(--mtablecolor) inset;
}

:deep(.el-input__inner) {
	color: var(--mtablecolor);
}

:deep(.el-table__body-wrapper .el-table__row:nth-child(even)) {
	background: var(--mtabletrcolor);
}
</style>