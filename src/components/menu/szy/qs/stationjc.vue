<template>
  <div class="m-box m-box-1" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">水文测站实时数据</p>
    </div>
    <div class="txt" style="overflow-y: auto">
      <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table FirstTable" :border="0"
        :cellspacing="0" :cellpadding="0" @click="handleclick" />
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
  { name: "tm", label: "时间" }
]);
const tableData = ref([]);
const tableDataAll = ref([]);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const stime = ref({});
const etime = ref({});

function Weacontent() {
  var nowTM = new Date();
  var strParam = {};
  strParam["pid"] = "20241025000002";
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  // api.stPptnWater(strParam).then((res) => {
    var res={
    "total": 66,
    "result": [
        {
            lttd84: 31.046686,
            stcd: "63403120",
            stnm: "八百亩",
            lgtd84: 120.981703,
            zstcd: "1330883",
            lgtd: -46341.8,
            tm: "2025-07-30 16:00:00",
            lttd: -20829.8,
            upz: "2.58",
            wrz: 3.2,
            grz: null,
            q:400.544
        },
        {
            lttd84: 31.051915,
            stcd: "63403100",
           stnm: "三和",
            lgtd84: 121.046772,
            zstcd: "1360481",
            lgtd: -40127.6,
            tm: "2025-07-30 16:00:00",
            lttd: -20273.1,
            upz: "3.67",
            wrz: 3.5,
            grz: null,
            q:190.767
        },
        {
            lttd84: 31.082763,
            stcd: "63402950",
           stnm: "练塘",
            lgtd84: 120.992969,
            zstcd: "1360581",
            lgtd: -45249.6,
            tm: "2025-07-30 16:00:00",
            lttd: -16834.0,
            upz: "3.5",
            wrz: 3.5,
            grz: 4.0,
            q:383.885
        },
        {
            lttd84: 30.961471,
            stcd: "63402910",
           stnm: "河祝",
            lgtd84: 121.034834,
            zstcd: "1360681",
            lgtd: -41303.7,
            tm: "2025-07-30 16:00:00",
            lttd: -30295.0,
            upz: "3.72",
            wrz: 3.5,
            grz: 4.1,
            q:343.543
        },
        {
            lttd84: 30.97239,
            stcd: "63402700",
           stnm: "蒋古渡",
            lgtd84: 121.153999,
            zstcd: "1460481",
            lgtd: -29914.7,
            tm: "2025-07-30 16:00:00",
            lttd: -29125.8,
            upz: "3.89",
            wrz: null,
            grz: null,
            q:170.888
        },
        {
            lttd84: 30.935274,
            stcd: "63402620",
           stnm: "金泽",
            lgtd84: 121.102246,
            zstcd: "1430783",
            lgtd: -34871.8,
            tm: "2025-07-30 16:00:00",
            lttd: -33225.6,
            upz: "3.89",
            wrz: 3.7,
            grz: null,
            q:362.412,
        },
        {
            lttd84: 30.963507,
            stcd: "63402600",
           stnm: "松浦大桥",
            lgtd84: 121.144747,
            zstcd: "1460381",
            lgtd: -30801.1,
            tm: "2025-07-30 16:00:00",
            lttd: -30107.3,
            upz: "3.88",
            wrz: null,
            grz: null,
            q:1790.000,
        },
        {
            lttd84: 30.902706,
            stcd: "63402500",
           stnm: "夏字圩",
            lgtd84: 121.003014,
            zstcd: "1960181",
            lgtd: -44373.5,
            tm: "2025-07-30 16:00:00",
            lttd: -36801.8,
            upz: "3.57",
            wrz: 3.5,
            grz: null,
            q:996.611
        },
        {
            lttd84: 30.897467,
            stcd: "63402300",
           stnm: "三角渡",
            lgtd84: 121.175508,
            zstcd: "1970381",
            lgtd: -27880.7,
            tm: "2025-07-30 16:00:00",
            lttd: -37436.8,
            upz: "3.97",
            wrz: 3.65,
            grz: 4.2,
            q:517.027
        },
        {
            lttd84: 30.929141,
            stcd: "63402200",
           stnm: "东团",
            lgtd84: 121.211942,
            zstcd: "1460581",
            lgtd: -24391.2,
            tm: "2025-07-30 16:00:00",
            lttd: -33933.3,
            upz: "4.07",
            wrz: null,
            grz: null,
            q:215.154
        },
        {
            lttd84: 30.77905,
            stcd: "63401900",
           stnm: "廊下",
            lgtd84: 121.295958,
            zstcd: "1930183",
            lgtd: -16386.5,
            tm: "2025-07-30 16:00:00",
            lttd: -50589.0,
            upz: "3.38",
            wrz: 3.3,
            grz: 3.9,
            q:8.641
        },
        {
            lttd84: 31.382194,
            stcd: "63401750",
           stnm: "商榻",
            lgtd84: 121.499195,
            zstcd: "1170181",
            lgtd: 3047.8,
            tm: "2025-07-30 16:00:00",
            lttd: 16271.1,
            upz: "4.45",
            wrz: 4.8,
            grz: 6.27,
            q:22.337
        },
        {
            lttd84: 31.243194,
            stcd: "63401500",
           stnm: "新义",
            lgtd84: 121.486748,
            zstcd: "2060881",
            lgtd: 1866.7,
            tm: "2025-07-30 16:00:00",
            lttd: 858.9,
            upz: "4.58",
            wrz: 4.55,
            grz: 5.86,
            q:6.541
        },
        {
            lttd84: 30.964471,
            stcd: "63401100",
           stnm: "枫泾工业区",
            lgtd84: 121.236527,
            zstcd: "1460281",
            lgtd: -22033.8,
            tm: "2025-07-30 16:00:00",
            lttd: -30020.4,
            upz: "4.11",
            wrz: 3.8,
            grz: 4.3,
            q:11.146,
        },
        {
            lttd84: 31.635434,
            stcd: "62724645",
           stnm: "枫泾",
            lgtd84: 121.419878,
            zstcd: "1031583",
            lgtd: -4485.6,
            tm: "2025-07-30 16:00:00",
            lttd: 44350.2,
            upz: "2.416",
            wrz: 3.2,
            grz: null,
            q:7.584
        },
        {
            lttd84: 31.612958,
            stcd: "62724635",
            stnm: "中洪",
            lgtd84: 121.407021,
            zstcd: "1050481",
            lgtd: -5706.5,
            tm: "2025-07-30 16:00:00",
            lttd: 41858.5,
            upz: "4.47",
            wrz: 4.95,
            grz: 6.1,
            q:33.212
        },
    ],
    "dataSize": 0,
    "pageSize": 0,
    "message": "操作成功",
    "isSuccess": true,
    "pageTotal": 0,
    "pageIndex": 0,
    "elapseTime": 64,
    "expand": null
}
    var strJson = res.result;
    var result = [];
    for (var num = 0; num < strJson.length; num++) {
      var item = strJson[num];
      var wrz = item.wrz != undefined ? Number(item.wrz).toFixed(2) : "—";
      var grz = item.grz != undefined ? Number(item.grz).toFixed(2) : "—";
      var upz = item.upz != undefined ? Number(item.upz).toFixed(2) : "—";
      var wrzCha = "—";
      var colorCss = "";
    //   if (wrz != "—" && upz != "—") {
    //     wrzCha = Number(Number(upz) - Number(wrz)).toFixed(2);
    //     if (Number(wrzCha) > 0) {
    //       colorCss = "#F9C33D";
    //     }
    //   }

    //   if (grz != "—" && upz != "—") {
    //     if (Number(Number(upz) - Number(grz)).toFixed(2) > 0) {
    //       colorCss = "#F70019";
    //     }
    //   }

      var tm = "—";
      if (item.tm != undefined) {
        tm = dayjs(item.tm).format("MM-DD HH:mm");
      }
      var _strParam = {};
      _strParam["num"] = num+1;
      _strParam["stnm"] = SetNull(item["stnm"]).replaceAll(" ", "");
      _strParam["upz"] = upz;
      _strParam["wrz"] = wrz;
      _strParam["grz"] = grz;
      _strParam["wrzCha"] = wrzCha;
      _strParam["tm"] = tm;
      _strParam["stcd"] = item.stcd;
      _strParam["lgtd"] = item.lgtd84;
      _strParam["lttd"] = item.lttd84;
      _strParam["colorCss"] = colorCss;
      _strParam["mtype"] = item.mtype;
      _strParam["q"] = item.q;
      _strParam["dwz"] = item.dwz;
      _strParam["BZtm"] = item.tm;
      result.push(_strParam);
      // result.push([item.stnm, upz, grz, wrzCha, tm]);
      tableData.value = result;
      tableDataAll.value = result;
    }
  // }).catch((err) => { });
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
  background: var(--mtabletrcolor);
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
