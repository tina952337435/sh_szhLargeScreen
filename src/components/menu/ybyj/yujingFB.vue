<template>
  <div class="m-box">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p1" id="title2" @click="fangda()">预警发布</p>
      <a class="menua area">
        <el-icon size="22px" style="position: absolute;right: 10px;top: 8px;cursor:pointer;z-index: 10;" title="预警发布"
          @click="yujingFBSMSLIST()">
          <Tickets />
        </el-icon>
      </a>
      <!-- <el-button type="primary" @click="Tianbao()" style="position: absolute;right: 0px;background:none;" class="age-btn">填报信息</el-button> -->
    </div>
    <div class="txt">
      <div class="m-list5 box-siz" id="FBtable" style="text-indent:2em;line-height: 25px;margin: 20px;color:var(--title2); !important;width:93%;">
        <div v-if="yujingfabuStr==''">
          <span class="NoYujing">无预警</span>           
        </div>
        <div v-else>
            {{ FBtableNOTE }}
        </div>      
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <MyDialog :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <message />
  </MyDialog>
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
import { SetNull, groupBy, GetSZStateBy, GetSZState } from "@/api/ComUnit.js";
import { ElMessage, ElButton } from "element-plus";
import { Tickets } from "@element-plus/icons-vue";


import MyDialog from "@/components/ComDialog.vue";
import message from "@/components/danzhan/qxjz/message.vue";
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
const typeValue = ref('');


// 判断弹窗是否显示,默认隐藏
const showDialogM = ref(false);
const titleNameM = ref('');
const typeValueM = ref('');



const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("yubaoMaxTable");
const datekeyDialog = ref(null);

const _theme = localStorage.getItem("curTheme");

var myData = [];

var FBtableNOTE = ref("");

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
  if (props.DD_ARR != undefined) {
    Weacontent();
  }
});

function Weacontent() {  
  JsonColumnChart(props.swstrJson);
}
const yujingfabuStr=ref("");
function JsonColumnChart(res) {
  var data = res;
  var haveNum = 0;
  var wrzCount = 0;
  for (var num = 0; num < data.length; num++) {
    var item = data[num];
    var wrz = item.wrz != undefined ? Number(item.wrz).toFixed(2) : "—";
    var grz = item.grz != undefined ? Number(item.grz).toFixed(2) : "—";
    var UPZ = item.maxz != undefined ? Number(item.maxz).toFixed(2) : "—";
    var minz = item.minz != undefined ? Number(item.minz).toFixed(2) : "—";
    var groupCls = "color-zc";
    var itemCls = "";

    if (UPZ != "—") {
      var wrzCha = wrz != "—" ? Number(UPZ) - Number(wrz) : "—";
      if (wrzCha != "—") {
        if (Number(wrzCha) >= 0) {
          wrzCount++;
          yujingfabuStr.value +=
            item.stnm +
            "预报最高水位" +
            UPZ +
            "，超警戒水位" +
            wrzCha.toFixed(2) +
            "m；";
        }
      }
    }
  }

  if (yujingfabuStr.value != "") {
    yujingfabuStr.value = yujingfabuStr.value.substring(0, yujingfabuStr.value.length - 1) + "。";
    var stimeStr = dayjs(props.DD_ARR.STIME).format("M月D日H时");
    var etimeStr = dayjs(props.DD_ARR.ETIME).format("M月D日H时");
    yujingfabuStr.value = "据气象部门预测，" + stimeStr + "—" + etimeStr + "，上海市面雨量57.1毫米。 代表站超警水位" + wrzCount + "个，" 
    + yujingfabuStr.value;
    $(".area").show();
  } else {
    $(".area").hide();    
  }
  FBtableNOTE.value = yujingfabuStr;
}
function yujingFBSMSLIST() {
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  titleName.value = "预警发布"
  typeValue.value = { head: "", note: $("#FBtable").html() };
}
function Tianbao() {
  window.open("http://172.17.50.33/#/office/xqtb", "_blank");
}
provide("typeValue", typeValue);
</script>
<style scoped>
:deep(.el-button--primary span) {
  padding-left: 0px;
}
.NoYujing{
  letter-spacing:-2px;
  position: absolute;
  top: 45%;
  font-size: 22px;
  left: 35%;color:#7b7b7b;  
  -webkit-transform: rotate(-25deg);
  -moz-transform: rotate(-25deg);
  -ms-transform: rotate(-25deg);
  -o-transform: rotate(-25deg);
}
</style>

