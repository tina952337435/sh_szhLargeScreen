<template>
  <div class="m-box m-box-1" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">生态流量(水位)预警规则</p>
    </div>
    <div class="txt" style="overflow-y: auto">
      <div class="m-list5 box-siz" id="gcshiyiImg" > 
          <div class="item  align-items_center new">
                <div class="itemnum">
                  <div style="display:inline-block;margin-right:4px;color: #059bc7;font-size: 20px;">1</div>
                  黄浦江
                </div>
                <div class="note" style="cursor: pointer;">
                  当松浦大桥断面氯离子浓度连续8小时高于200毫克/升、250毫克/升、300毫克/升，或日净泄流量连续五天小于等于120立方米每秒、90立方米每秒、0立方米每秒时,视情况分别启动蓝色、橙色和红色预警应急响应。
                </div>
            </div>

            <div class="item  align-items_center new">
                <div class="itemnum">
                  <div style="display:inline-block;margin-right:4px;color: #059bc7;font-size: 20px;">2</div>
                  淀山湖、元荡
                </div>
                <div class="note" style="cursor: pointer;">
                  当淀山湖、元荡日均水位(商榻、千灯浦桥、淀浦河西闸（闸外）三站)连续三天、五天、七天小于等于2.52米，且预报将继续下降时，视情况启动蓝色、橙色和红色生态水位预警应急响应。
                </div>
            </div>

            <div class="item  align-items_center new">
                <div class="itemnum">
                  <div style="display:inline-block;margin-right:4px;color: #059bc7;font-size: 20px;">3</div>
                  太湖
                </div>
                <div class="note" style="cursor: pointer;">
                  当太湖水位小于等于 2.80 米，且预报将继续下降时，太 湖局视情况启动蓝色预警应急响应； 当太湖水位小于等于 2.65 米，且预报将继续下降时，太 湖局视情况启动橙色预警应急响应； 当太湖水位小于等于 2.55 米，且预报将继续下降时，视情况启动红色预警应急响应。
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
import dayjs from "dayjs";
import $ from "jquery";
import { useStore } from 'vuex'
import Dialog from "@/api/utils/Dialog.js";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";

const store = useStore();
const { viewer } = store.state;
const datekey = ref(null);
const tableHeaders = ref([
  { name: "num", label: "序号" },
  { name: "stnm", label: "名称" },
  { name: "q", label: "流量(m³/s)" },
  { name: "sl", label: "昨日净水量(万方)" }
]);
const tableData = ref([]);
const tableDataAll = ref([]);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const stime = ref({});
const etime = ref({});

function Weacontent() {
}
const emit = defineEmits(['parentMethodshowDynamicLayers']);
function handleclick(evt) {
  const name = evt.target.innerText;
  const strJson = tableData.value.find(item => item.stnm === name);
  if (SetNull(strJson["lgtd"]) == "" && SetNull(strJson["lttd"]) == "") {
    ElMessage.error("缺少经纬度坐标");
  }
  else {
    let _lgtd = Number(strJson["lgtd"]);
    let _lttd = Number(strJson["lttd"]);
    var evt=[_lgtd,_lttd];
    emit("parentMethodshowDynamicLayers", evt);
  }
  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/sq/SQLine.vue")
  );
  const props = {};
  props["stcd"] = strJson["stcd"];
  props["stime"] = stime.value;
  props["etime"] = etime.value;
  props["mtype"] = strJson["mtype"];
  //ChildVue为弹窗中嵌入的slot
  Dialog.open({ title: strJson["stnm"] + "水位过程线", widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
}
const searchKey = ref('')
function handleSearch(evt) {
  searchKey.value = evt;
  tableData.value = tableDataAll.value.filter(function (e) {
    return (e.stnm).includes(evt) == true;
  })
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
onMounted(() => {
  var nowTM = new Date();
  etime.value = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  if (Number(dayjs(nowTM).format("HH")) > 7) {
    stime.value = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  }
  else {
    stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  Weacontent();
});
</script> 
<style scoped>
          #gcshiyiImg .new {
            margin: 0px 10px 10px 0px;
            cursor: pointer;
        }

        #gcshiyiImg .new h2 {
            /* background: url(img/index_11.png) no-repeat left center; */
            background: url(/images/index_12.jpg) no-repeat left 15px;
            padding-left: 4.25rem;
            font-size: 12px;
        }

        #gcshiyiImg .new .note {
            border: solid #20253A 1px;
            border-radius: 4px;
            margin-left: 26px;
            padding: 0px 8px;
            line-height: 28px;
            font-size: 14px;
            background: #20253A;
            color: #3FDEF7;
            /*#3FDEF7;  #D5D5D5;*/
            display: inline-block;
        }

        #gcshiyiImg .item .itemnum {
            /* max-width: 32.625rem; */
            /* font-size: 1rem; */
            /* color: #878787; */
            color: #ddd;
            font-weight: normal;
            background-size: 0.4rem 0.4rem;
            /* padding-left: 12px; */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 100%;
            line-height: 2rem;
            /* width: 100%; */
            text-align: left;
        }

        #gcshiyiImg .item .itemnum div {
            border-radius: 50%;
            width: 24px;
            padding: 0px;
            height: 24px;
            text-align: center;
            background: #082B64;
            background: #ffffff;
            line-height: 24px;
            color: #ffffff;
        }
</style>
