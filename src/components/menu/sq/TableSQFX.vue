<template>
	<div class="m-box m-box-small2" style="position: relative">
		<div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
			<div class="d1"></div>
			<div class="d2"></div>
			<p class="base-p" id="title2" @click="fangda()">水情分析</p>
			<!-- <el-input v-model="searchKey" placeholder="请输入搜索站点" clearable @input="handleSearch"></el-input> -->
		</div>
		<div class="txt">
			<el-cascader style="max-width: 80px;margin: 10px 0px 0px 30px;" v-model="valueQY" :options="ListArea"
				@change="handleChangeArea" />
			<el-cascader style="width: 80px;margin: 10px 0px 0px 70px;" v-model="valueLX" :options="ListType"
				@change="handleChangeType" />
			<div>
				<div class="wqtitle" style="margin: 0px 0px 0px 10px;">
					<div class="titleDiv"></div>
					<div class="titleTxt">日期选择</div>
				</div>
				<div style="margin: 10px 0px 0px 20px;">
					<span style="color: var(--mtablecolor);">日期：</span>
					<input id="ETIME" class="mini-datepicker" style="width:110px;" format="yyyy-MM-dd" showTime="false"
						showOkButton="false" showClearButton="false" />
					<input id="Hour" name="Hour" class="mini-combobox" valuefield="id" textfield="text"
						style="width:60px;margin-left: 10px;" />
					&nbsp;&nbsp;<el-button type="primary" @click="BtnSearch()">查询</el-button>
				</div>
			</div>
			<div>
				<div class="wqtitle" style="margin: 0px 0px 0px 10px;">
					<div class="titleDiv"></div>
					<div class="titleTxt">代表站(单位：m)</div>
				</div>
				<div style="width:50%;height:180px;display: inline-block;">
					<customTable :headers="tableHeaders" :rows="tableDataLeft" class="m-table m-table-small" :border="0"
						:cellspacing="0" :cellpadding="0" @click="handleclick" style="width: 100%;" />
				</div>
				<div style="width:50%;height:180px;display: inline-block;">
					<customTable :headers="tableHeaders" :rows="tableDataRight" class="m-table m-table-small"
						:border="0" :cellspacing="0" :cellpadding="0" @click="handleclick" style="width: 100%;" />
				</div>
			</div>
			<div>
				<div class="wqtitle" style="margin: 0px 0px 0px 10px;">
					<div class="titleDiv"></div>
					<div class="titleTxt">水位信息(单位：m)</div>
					<el-radio-group style="margin-left: 130px">
						<el-radio @click="TypeeChange('CJ')" v-model="pathname" label="CJ">超警排序</el-radio>
						<el-radio @click="TypeeChange('SX')" v-model="pathname" label="SX">水系排序</el-radio>
					</el-radio-group>
				</div>
				<div style="width:100%;height:180px;overflow-y: auto;">
					<customTable :headers="tableHeadersSQ" :rows="tableDataSQ" class="m-table m-table-small" :border="0"
						:cellspacing="0" :cellpadding="0" @click="handleclick" style="width: 100%;" />
				</div>
			</div>
			<div>
				<div class="wqtitle" style="margin: 0px 0px 0px 10px;">
					<div class="titleDiv"></div>
					<div class="titleTxt">
						统计&nbsp;<span style="font-size: 12px;opacity: 0.8;">270个(超警/超汛限:0,其中超保/超设设计:0)</span></div>
				</div>
				<div style="width:100%;height:66px;overflow-y: auto;color: var(--mtablecolor);">
					<div>
						<el-radio-group
							style="margin: 0 auto;width: 360px;display: block;height: 29px;line-height: 30px;">
							<el-checkbox @click="handlerDraw('HD')" v-model="HDFalse" label="河道" size="large" />
							<el-checkbox @click="handlerDraw('SK')" v-model="SKFalse" label="水库" size="large" />
							<el-checkbox @click="handlerDraw('ZB')" v-model="ZBFalse" label="闸坝" size="large" />
							<el-checkbox @click="handlerDraw('CW')" v-model="CWFalse" label="潮位" size="large" />
							<el-checkbox @click="handlerDraw('BX')" v-model="BXFalse" label="病险" size="large" />
						</el-radio-group>
					</div>
					<div style="margin: 4px 0px 0px 40px;">
						站名：<el-input v-model="searchKey" placeholder="请输入搜索站点" clearable @input="handleSearch"
							style="width:200px;margin-left: 0px;"></el-input>
						&nbsp;&nbsp;<el-button type="primary" @click="BtnSearch()">搜索</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="bot leftBottom-radius"></div>
	</div>
	<ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
		style="width: 70%; height: 700px">
		<TableSWJC />
	</ComZujian>
</template>
<script setup>
import '@/assets/styles/Table.css';
import ComZujian from "@/components/ComZujian.vue";
import TableSWJC from "@/components/menu/sq/TableSWJC.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import { setZOOM, dyCenter } from "@/utils/ArcGis/MapComm.js";
import dayjs from "dayjs";
import $ from "jquery";
import { useStore } from 'vuex'
import { ref, onMounted, reactive, watch, defineAsyncComponent, h } from "vue";
import { SetNull, sortObjectArray } from "@/api/ComUnit";
import { ElMessage, ElButton, ElInput, ElCascader } from "element-plus";
const store = useStore();
const { viewer } = store.state;
const datekey = ref(null);
const valueQY = ref(["tba"]);
const ListArea = ref([
	{
		label: "太湖流域",
		value: "tba",
		children: []
	}]
);
const valueLX = ref(["类型1"]);
const ListType = ref([{
	label: "",
	value: "类型1",
	children: []
}]);
const tableHeaders = ref([
	{
		name: "stnm",
		label: "名称"
	},
	{
		name: "upz",
		label: "水位(m)"
	},
	{
		name: "wrz",
		label: "警戒(m)"
	},
]);
const tableDataLeft = ref([
	{
		stnm: "太湖水位",
		upz: "3.44",
		wrz: "3.80",
	},
	{
		stnm: "常州(三)",
		upz: "3.82",
		wrz: "4.30",
	},
	{
		stnm: "嘉兴",
		upz: "3.20",
		wrz: "3.60",
	},
	{
		stnm: "平望",
		upz: "3.26",
		wrz: "3.70",
	},
	{
		stnm: "苏州(枫桥)",
		upz: "3.41",
		wrz: "4.10",
	},
]);
const tableDataRight = ref([
	{
		stnm: "琳桥",
		upz: "3.71",
		wrz: "3.80",
	},
	{
		stnm: "无锡(大)",
		upz: "3.68",
		wrz: "4.20",
	},
	{
		stnm: "甘露",
		upz: "3.70",
		wrz: "3.80",
	},
	{
		stnm: "杭长桥",
		upz: "3.37",
		wrz: "4.50",
	},
]);
const pathname = ref("CJ");
const tableHeadersSQ = ref([
	{
		name: "stnm",
		label: "名称"
	},
	{
		name: "upz",
		label: "水位(m)"
	},
	{
		name: "wrz",
		label: "警戒/汛限"
	},
	{
		name: "grz",
		label: "保证/设计"
	},
	{
		name: "cha",
		label: "超警(保)幅度"
	},
	{
		name: "rvnm",
		label: "分区水系"
	},
]);
const tableDataSQ = ref([
	{
		stnm: "犊山闸",
		upz: "3.38",
		wrz: "",
		grz: "",
		cha: "",
		rvnm: "太湖区",
	},
	{
		stnm: "余杭",
		upz: "2.22",
		wrz: "9.00",
		grz: "10.50",
		cha: "",
		rvnm: "杭嘉湖区",
	},
	{
		stnm: "嘉兴",
		upz: "3.31",
		wrz: "7.50",
		grz: "8.50",
		cha: "",
		rvnm: "浙西区",
	},
	{
		stnm: "太浦闸",
		upz: "3.40",
		wrz: "3.80",
		grz: "4.66",
		cha: "",
		rvnm: "太湖区",
	},
	{
		stnm: "德清大桥",
		upz: "3.31",
		wrz: "",
		grz: "",
		cha: "",
		rvnm: "浙西区",
	},
	{
		stnm: "北湖分洪闸上",
		upz: "4.39",
		wrz: "",
		grz: "",
		cha: "",
		rvnm: "浙西区",
	},
	{
		stnm: "洛舍闸",
		upz: "3.32",
		wrz: "4.90",
		grz: "5.90",
		cha: "",
		rvnm: "浙西区",
	},
]);
const HDFalse = ref(true);
const SKFalse = ref(true);
const ZBFalse = ref(true);
const CWFalse = ref(true);
const BXFalse = ref(false);
const tableDataAll = ref([]);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const stime = ref({});
const etime = ref({});
const emit = defineEmits(['passValue']);
const SWswiper = ref("2021081401172758047");

function Weacontent() {

}

function handleChangeArea(val) {
}
function handleChangeType(val) {
}
function TypeeChange(val) {
	pathname.value = val;
}
function fangda() {
	var dialogClass = $(".dialog").css("display");
	if (dialogClass == "block") {
		return false;
	}
	$(".g-lside ").css({
		"z-index": 99
	});
	$(".g-rside ").css({
		"z-index": 90
	});
	showDialog.value = true;
}
onMounted(() => {
	mini.parse();
	var nowTM = new Date();
	etime.value = dayjs(nowTM).format("YYYY-MM-DD");
	if (Number(dayjs(nowTM).format("HH")) > 7) {
		stime.value = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
	} else {
		stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00")).add(-24, "hour").format(
			"YYYY-MM-DD HH:mm:ss");
	}
	mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD"));
	mini.get("Hour").setValue("8");
	var dataResult = [];
	for (var i = 0; i < 24; i++) {
		var obj = {};
		obj["id"] = i;
		obj["text"] = i;
		dataResult.push(obj);
	}
	mini.get("Hour").setData(dataResult);
	Weacontent();
});
</script>
<style scoped>
.m-table tr th:nth-child(1),
.m-table tr td:nth-child(1) {
	width: 100px;
}

.m-table tr td:nth-child(2) {
	width: 80px;
}

tr td:nth-child(3) {
	width: 10vh;
}

tr td:nth-child(4) {
	width: 10vh;
}

tr td:nth-child(5) {
	width: 12vh;
}

/* 自定义滚动条样式 */
.txt::-webkit-scrollbar {
	width: 2px;
}

.txt::-webkit-scrollbar-thumb {
	/* 滚动条手柄 */
	width: 10px;
	height: 10px;
	position: absolute;
	right: -4px;
	top: 0px;
	background: var(--popContentHeadbg);
	z-index: 2;
}

.wqtitle {
	margin: 0px 10px;
	color: var(--title2);
	justify-content: space-between;
	align-items: center;
	padding: 0px 0px;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	border-bottom: 1px solid var(--wqtitleline);
	position: relative;
	font-size: 14px;
	height: 28px;
}

:deep(.el-input) {
	--el-input-border-color: var(--popContentHeadbg) !important;
	width: 130px;
	border-radius: 6px;
	margin-left: 50px;
	height: 30px;
	/* vertical-align: 0.8rem; */
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
	box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}

:deep(.el-input__inner) {
	color: var(--mtablecolor);
}

:deep(.el-radio__label) {
	font-size: 12px;
}

:deep(.el-radio__inner) {
	width: 12px;
	height: 12px;
}

:deep(.el-button) {
	height: 28px;
}

:deep(.mini-buttonedit) {
	height: 30px;
}

:deep(.mini-buttonedit-border),
:deep(.mini-buttonedit .mini-buttonedit-input) {
	height: 26px;
}

:deep(.el-checkbox.el-checkbox--large) {
	height: 32px;
}

.titleDiv {
	width: 6px;
	height: 24px;
	line-height: 24px;
	display: inline-block;
	background: var(--popContentDiv);
}

.titleTxt {
	height: 24px;
	line-height: 24px;
	display: inline-block;
	vertical-align: 6px;
	margin-left: 4px;
	color: var(--popContentDiv);
}
</style>