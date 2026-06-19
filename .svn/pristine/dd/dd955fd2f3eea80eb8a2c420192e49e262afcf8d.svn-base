<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">预测最高水位</p>
    </div>
    <div class="txt">
      <!-- <div class="m-list4 box-siz" id="tableSW">
        <div class="ysts-group" style="width:98%; display: flex;margin: 0px auto;" id="ysts-group-daibiao">
         <div v-for="(item, index) in  resultData " :key="index" class="ysts-item"
            @click="loc(item.lgtd, item.lttd, item.stcd, item.stnm)">
            <div class="ysts-name"><span class="ysts-numorder">{{ index + 1 }}</span> {{ item.stnm }}</div>
            <div class="ysts-value">
              最高：<span :class="item.groupCls">{{ item.maxz }}</span>
              <span class="ysts-unit">({{ item.TMStr }})</span><span style="padding-left: 90px;"></span>
              涨幅：<span class="ysts-num font-agency color-min">{{ item.swzf }}</span>
            </div>
          </div>
        </div>
      </div> -->
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
					<el-table-column label="最高水位" header-align="center" align="center">
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
							<span>{{ scope.row.xzdz }}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <yubaoMaxTable :DD_ARR="DD_ARR" :key="datekeyDialog" />
  </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";

import api from "@/api/mode/index.js";
import dayjs from "dayjs";

import Dialog from "@/api/utils/Dialog.js";
import $ from "jquery";
import { SetNull, groupBy, GetSZStateBy, GetSZState, sortObjectArray } from "@/api/ComUnit.js";
import { ElMessage } from "element-plus";

import {
  onMounted,
  ref,
  shallowRef,
  defineAsyncComponent,
  nextTick,
  provide,
  inject,
  watch,h
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

const tableData = ref([]);

const _theme = localStorage.getItem("curTheme");

const props = defineProps({
  DD_ARR: {
    DD_ID: String,
    default: ""
  },
  rainListSW: {
    type: String,
    default: ""
  },
});
var DD_ARR = props.DD_ARR; //调度方案编号
const resultData = ref([])

watch(props.DD_ARR, () => {
  Weacontent();
});

onMounted(() => {
  if (props.DD_ARR.DD_ID != undefined) {
    Weacontent();
  }
});

function Weacontent() { 
  var result=[];
  props.rainListSW.map(item=>{
    var TM = dayjs(new Date(item.maxtm)).format("M-D HH:mm");
		var	MTM = dayjs(new Date(item.mintm)).format("M-D HH:mm");
    if (SetNull(item.maxz) != "") {
				item.maxz = Number(item.maxz).toFixed(2);
		}
    var xzdz=SetNull(item.xzdz) != ""? Number(item.xzdz).toFixed(2) : "—";
		// item.index = num + 1;
		item.TMStr = TM;
    item.xzdz = xzdz;
    result.push(item);
  });

  tableData.value=result;  
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
const emit = defineEmits(['parentMethodshowDynamicLayers']);
function loc(lgtd, lttd, stcd, stnm) {
  if (SetNull(lgtd) == "" && SetNull(lttd) == "") {
    ElMessage.error("缺少经纬度坐标");
  } else {
    let _lgtd = Number(lgtd);
    let _lttd = Number(lttd);
    var evt=[_lgtd,_lttd];
		emit("parentMethodshowDynamicLayers", evt);
  }
};
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
  border-bottom: 0.12rem solid;
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
  /* background: #09469d82; */
  background: var(--mtabletrcolor);
  color: var(--mtablecolor) !important;
  line-height: 28px;
  text-align: center;
  float: left;
  margin-right: 10px;
  font-size: 0.9rem;
  z-index: 99;
}

.font-agency {
  font-family: AGENCYB, "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
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