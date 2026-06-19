<template>
  <div class="m-box m-box-1">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">工情监测</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt" style="overflow-y: auto">
      <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table tableGQJC" :border="0"
        :cellspacing="0" :cellpadding="0" @click="handleclick" />
    </div>
    <div class="bot"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableGQJC :GCtableDataAll="GCtableDataAll" />
  </ComZujian>
</template>
<script setup>
import { useStore } from "vuex";
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import { ElMessage } from "element-plus";
import { ref, onMounted, watch } from "vue";
import { convertToDate } from "@/api/dateUtil.js";
// import { addAreaPoint } from "@/utils/ArcGis/MapComm.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const showDialog = ref(false);
const store = useStore();
const { viewer } = store.state;
const tableHeaders = ref([
  { name: "stnm", label: "名称",width:"30%" },
  { name: "imageUrls", label: "闸门/泵站" },
  { name: "tm", label: "时间" ,width:"20%"},
]);
const tableData = ref([]);
const stime = ref(null);
const etime = ref(null);
const props = defineProps({
  GCtableDataAll: {
    type: Array,
    default: () => []
  },
});
watch(props.GCtableDataAll, () => {
  Weacontent();
});

function Weacontent() {
  var data = props.GCtableDataAll;
  var result = [];
  if (data.length > 0) {
    // console.error("data", data)
    for (var num = 0; num < data.length; num++) {
      var item = data[num];
      var gtopnum = SetNull(item.grq) != "" ? Number(item.grq) : 0;  //闸门个数
      var omcnum = SetNull(item.flpq) != "" ? Number(item.flpq) : 0;  //泵站个数
      var gateListdata = item.gateList;
      var tm = "—";
      var stateHtml = [], imgUrl = "";
      if (SetNull(gateListdata)!="") {
        tm = SetNull(gateListdata[0].tm) != "" ? dayjs(convertToDate(gateListdata[0].tm)).format("YYYY-MM-DD HH:mm") : "—";
        // if (tm > tempTM) {
          var bzdataALL = gateListdata.filter(function (e) {
            return Number(e.eqpno) == 2;
          })
          var zmdataALL = gateListdata.filter(function (e) {
            return Number(e.eqpno) == 1;
          })
          var gcOpen=false;
          if (bzdataALL.length > 0) {
            for (var i = 0; i < bzdataALL.length; i++) {
              if (Number(bzdataALL[i].gtq) > 0||Number(bzdataALL[i].gtophgt) > 0) {
                gcOpen=true;
                imgUrl = "/images/gqgc/bz_open.png";
                if (_theme == "BlueTheme") {
                  imgUrl = "/images/gqgc/bz_green.png";
                }
              } else {
                imgUrl = "/images/gqgc/bz_close.png";
              }
              stateHtml.push(imgUrl);
            }
          }
          if (zmdataALL.length > 0) {
            for (var i = 0; i < zmdataALL.length; i++) {
              if (Number(zmdataALL[i].gtophgt) >=0.1) {
                gcOpen=true;
                imgUrl = "/images/gqgc/z_green_1.png";
                if (_theme == "BlueTheme") {
                  imgUrl = "/images/gqgc/sz_green.png";
                }
              } else {
                imgUrl = "/images/gqgc/z_red_1.png";
              }
              stateHtml.push(imgUrl);
            }
          }
          item.omcn=gcOpen?1:0;
      } else {
        if (omcnum > 0) {
          for (var i = 0; i < gtopnum; i++) {
            imgUrl = "/images/gqgc/bz_close.png";
            if (_theme == "BlueTheme") {
              imgUrl = "/images/gqgc/bz_gray.png";
            }
            stateHtml.push(imgUrl);
          }
        }
        if (gtopnum > 0) {
          for (var i = 0; i < gtopnum; i++) {
            imgUrl = "/images/gqgc/z_blur_1.png";
            if (_theme == "BlueTheme") {
              imgUrl = "/images/gqgc/sz_gray.png";
            }
            stateHtml.push(imgUrl);
          }
        }
      }
      var _strParam = {};
      _strParam["stnm"] = item.stnm;
      _strParam["imageUrls"] = stateHtml;
      _strParam["tm"] =tm!="—"? dayjs(tm).format("MM-DD HH:mm"):tm;
      _strParam["stcd"] = item.stcd;
      _strParam["lgtd"] = item.lgtd;
      _strParam["lttd"] = item.lttd;
      result.push(_strParam);
      tableData.value = result;
    }
  };
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
function handleclick(evt) {
  const name = evt.target.innerText;
  const strJson = tableData.value.find(item => item.stnm === name);
  console.error(strJson)
  let _lgtd = SetNull(strJson["lgtd"]);
  let _lttd = SetNull(strJson["lttd"]);
  if (_lgtd == "" || _lttd == "") {
    ElMessage.error("缺少经纬度坐标");
  } else {
    var evt=[_lgtd,_lttd];
    emit("parentMethodshowDynamicLayers", evt);
  }
}
onMounted(() => {
  Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
.m-table tr td:nth-child(1) {
  width: 16vh;
}

.m-table tr td:nth-child(2) {
  width: 14vh;
}

.m-table tr td:nth-child(3) {
  width: 25vh;
}

tr td img {
  width: 20px;
  height: 20px;
  vertical-align: -6px;
}

/* 自定义滚动条样式 */
.txt::-webkit-scrollbar {
  width: 1px;
  /* 设置滚动条宽度 */
}

.txt::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.txt::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--popContentHeadbg);
  border-radius: 50%;
  z-index: 2;
}

.m-table tr:nth-child(even) {
  background: "";
}
</style>
