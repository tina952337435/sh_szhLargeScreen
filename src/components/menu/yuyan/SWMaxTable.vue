<template>
	<div class="m-box m-box-1">
		<div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
			<div style="line-height:30px;">
				<div class="d1"></div>
				<div class="d2"></div>
				<p class="base-p" id="title2" @click="fangda()">预测最高水位</p>
			</div>
			<!-- <div style="width:calc(100% - 150px);" class="div-swiper">
				<div class="swiper-slide" style="width: 50%;"
					:class="YuYanswiper == 'SW' && 'swiper-slide swiper-slide-thumb-active'" @click="GetSW('SW')">
					水位
				</div>
				<div class="swiper-slide" style="width: 50%;"
					:class="YuYanswiper == 'SL' && 'swiper-slide swiper-slide-thumb-active'" @click="GetSW('SL')">
					水量</div>
			</div> -->
		</div>
		<div class="txt" style="overflow-y: auto">
			<customTable :headers="tableHeaders" :rows="tableData" class="m-table FirstTable" :border="0" :cellspacing="0"
				:cellpadding="0" @click="handleclick" />
		</div>
		<div class="bot leftBottom-radius"></div>
	</div>
	<ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
		style="width: 70%; height: 700px">
		<TableSWJC :SWData="props.SWData" />

	</ComZujian>
</template>
<script setup>
import '@/assets/styles/Table.css';
import ComZujian from "@/components/ComZujian.vue";
import TableSWJC from "@/components/menu/sq/TableSWJC.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { useStore } from 'vuex'
import { ref, onMounted, reactive, watch, defineAsyncComponent, h } from "vue";
import Dialog from "@/api/utils/Dialog.js";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";
const store = useStore();
const { viewer } = store.state;
const datekey = ref(null);
const tableHeaders = ref([]);
const tableData = ref([]);
const tableDataAll = ref([]);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const stime = ref({});
const etime = ref({});
const YuYanswiper = ref("SW");
const props = defineProps({
	SWData: {
		type: Array,
		default: []
	},
	SWHeader: {
		type: String,
		default: ""
	},
});
var strJson = props.SWData;
var strJsonHeader = props.SWHeader;
watch(props.SWData, () => {
	Weacontent();
});
function Weacontent() {
	tableHeaders.value = strJsonHeader;
	tableData.value = strJson;
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

function GetSW(obj) {
	
}

onMounted(() => {
	if (props.SWData != null) {
		Weacontent();
	}
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

:deep(.el-input) {
	--el-input-border-color: var(--popContentHeadbg) !important;
	width: 160px;
	border-radius: 6px;
	margin-left: 50px;
	height: 1.8rem;
	vertical-align: 0.8rem;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus) {
	box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}

:deep(.el-input__inner) {
	color: var(--mtablecolor);
}
</style>