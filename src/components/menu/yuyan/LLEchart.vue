<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">预测流量过程</p>
            <div class="xiala" style="right: 5px;top: 0px;position: absolute;width:90px;line-height: 30px;cursor: pointer;">
                <label @click="showItem('LLDBZLIST')"
                style="margin-top: 4px;margin-right: 5px;font-size: 14px;font-family: var(--calcite-font-family);cursor: pointer;">
                    {{ hedaoTitle }}
                </label>
                <img src="/images/icon_select.png" style="position:absolute;right:0px;margin-top: 4px;cursor: pointer;"
                @click="showItem('LLDBZLIST')">
                <ul class="el-dropdown-menu"
                style="width:90px;height:120px;overflow-y:auto;margin-top:5px;font-family: var(--calcite-font-family);cursor: pointer;"
                id="LLDBZLIST">
                    <li v-for="(item, index) in props.ZhanDanLL" :id="item.stcd" :class="index==0?'liSelected':''">
                        {{ item.name }}
                    </li>             
                </ul>
            </div>
        </div>
        <div class="txt">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" style="width: 70%; height: 700px">
        <SWEchart :selectData="props.selectData" />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, watch, } from "vue";
import api from "@/api/mode/index.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("LLyuyan");
const hedaoTitle=ref("");
const stcd=ref("");

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const props = defineProps({
    selectData: {
        type: Array,
        default: []
    },
    SWData: {
        type: Array,
        default: []
    },
    ZhanDanLL: {
        type: Array,
        default: []
    },
});
watch(props.selectData, () => {
    Weacontent();
});
function Weacontent() {
    hedaoTitle.value=props.ZhanDanLL.length>0?props.ZhanDanLL[0].name:"";

    var SOLUTIONIDList = props.selectData.map(item => item.DD_ID);
    var SOLUTIONIDNAMEList = props.selectData.map(item => item.DD_NAME);
    if (SOLUTIONIDList.length > 0) {
        const SOLUTIONID = SOLUTIONIDList.join(",");
        const SOLUTIONIDNAME = SOLUTIONIDNAMEList.join(",");
        $.data(myData, "DD_NAMES", SOLUTIONIDNAME);$.data(myData, "DD_IDS", SOLUTIONID);
        stcd.value =props.ZhanDanLL.length>0?props.ZhanDanLL[0].stcd:"";
        GetFangAnData(SOLUTIONID, stcd.value);
    }

    $("#LLDBZLIST li").click(function (res) {
    //   console.error(res.currentTarget, res.currentTarget.name)
      $("#LLDBZLIST li").removeClass("liSelected");
      $(this).addClass("liSelected");
      $("#LLDBZLIST").css("display", "none");
      var Temp = props.ZhanDanLL.filter(function (e) {
        return e.stcd == res.currentTarget.id;
      });
      if (Temp.length > 0) {
        hedaoTitle.value = Temp[0].name;
        stcd.value = Temp[0].stcd;
        GetFangAnData($.data(myData, "DD_IDS"),stcd.value );
      }
    });
}
var myData = [];
function GetFangAnData(DD_ID, STCD) {
    var strParam = {
        "dd_id": DD_ID,
        "stcd": STCD,
        "data_TYPE": "8"
    }
    api.loadGetFangAnDataDuo(strParam).then(data => {
    // console.error("data", data.data)
    if (data.data != null) {
        var aggList = data.data.split('@');
        var jsonarray = JSON.parse(aggList[0]);
        var jsonData = {};
        // console.error("aggList", aggList)
        if (aggList[1] != "") {
            jsonData = JSON.parse(aggList[1]);
        }
        $.data(myData, "gridColumn", jsonarray);
        $.data(myData, "gridData", jsonData);
        // console.error("gridColumn", jsonarray, jsonData)
        gridLoad();
    }
    }).catch(err => { });
}
function gridLoad() {
    var jsonarray = $.data(myData, "gridColumn");
    var jsonData = $.data(myData, "gridData");
    // console.error("水位预测过程", jsonData)
    var strNote = [];
    var dataResult = [];
    if (jsonData.data != undefined) {
        var stcdList = $.data(myData, "DD_NAMES").split(',');
        strNote.push({ name: "时间", codename: "TM", tableV: "0", isShow: true })
        if (jsonarray.length > 0) {
            var _index = 1;
            for (var num = 0; num < jsonarray.length; num++) {
                if (jsonarray[num].STCD.indexOf("DRP") == -1 && jsonarray[num].STCD.indexOf("VALUE") == -1) {
                    var nameStr = stcdList[_index - 1]
                    if (nameStr != undefined) {
                        strNote.push({ name: nameStr, codename: jsonarray[num].STCD, tableV: "0", isShow: true })
                    }
                    _index++;
                }
            }
        }
        //绘制过程线颜色设置
        var LineColor = ['#39C9F5', '#AAFD4F', '#F9F822', '#1698E6', '#5FDAA8', '#667A9E', '#FFA500', '#FF0000', "#6959CD", "#E066FF", "#FF34B3", "#F4A460",
                    "#EEAD0E", "#53868B", "#79CDCD", "#66CDAA", "#43CD80", "#00FF00", "#FFFF00", , "#FF00FF", "#8B0000", "#8B008B", "#008B8B", "#90EE90"];
        //绘制图形
        dataResult = jsonData.data;
    }
    const _Option = ChartJs.chartSW("", dataResult, strNote, LineColor, "流量", "Mouth", _theme, 55, 14);
    lineOption.value = _Option;
    datekey.value = Date.now();
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateid.value = "SWyuyan1";
}


onMounted(() => {
    if (props.selectData != null) {
        Weacontent();
    }
});

function showItem(id) {
  var obj = $("#" + id);
  var dis = obj.css("display");
  if (dis == "block") {
    obj.css("display", "none");
  } else {
    obj.css("display", "block");
  }
}
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
/* 自定义滚动条样式 */
.el-dropdown-menu::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.el-dropdown-menu::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.el-dropdown-menu::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: 0px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}
</style>