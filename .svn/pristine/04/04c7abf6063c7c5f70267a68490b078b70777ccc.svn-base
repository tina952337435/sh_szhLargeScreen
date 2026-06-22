<template>
  <div class="m-box m-box-1" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">预警统计</p>

      <div style="width:calc(100% - 150px);" class="div-swiper">
          <div class="swiper-slide" style="width: 33%;"
            :class="Drpswiper == '1170181' && 'swiper-slide swiper-slide-thumb-active'" @click="qiehuan('1170181')">
            松浦大桥</div>
          <div class="swiper-slide" style="width: 33%;"
            :class="Drpswiper == '2060881' && 'swiper-slide swiper-slide-thumb-active'" @click="qiehuan('2060881')">
            淀山湖、元档
          </div>
          <div class="swiper-slide" style="width:33%;"
            :class="Drpswiper == '1460281' && 'swiper-slide swiper-slide-thumb-active'" @click="qiehuan('1460281')">
            长江
          </div>
        </div>
    </div>
    <div class="txt" style="overflow-y:hidden;" id="YJXyTable">
        <div v-for="(item, index) in  tableData " :key="index" class="YJXyTablediv">
          <div @click="handleclick(item.lgtd, item.lttd, index, item)" class="ClassName" :id="'YJXyTablediv' + index">
            <span class="View" style="width:45%;" :title="item.name">{{ item.name }}</span>
            <span class="View" >{{ item.value }}</span>
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
const stcdList = ref("1170181");
const onetitleName = ref("松浦大桥");
const Drpswiper = ref("1170181");
const store = useStore();
const { viewer } = store.state;
const datekey = ref(null);
const tableHeaders = ref([
  { name: "num", label: "序号" },
  { name: "stnm", label: "名称" },
  { name: "q", label: "流量(m3/s)" },
  { name: "sl", label: "昨日净水量(万方)" }
]);
const tableData = ref([]);
const tableDataAll = ref([]);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const stime = ref({});
const etime = ref({});

function Weacontent() {
  tableData.value=[
    {
      name:"日净泄流量(m³/s)",
      value:"350.35(2025-09-14)",
      type:"松浦大桥"
    },
    {
      name:"控制目标",
      value:"90",
      type:"松浦大桥"
    },
    {
      name:"今年最小流量",
      value:"151.2",
      type:"松浦大桥"
    },
    {
      name:"今年最大流量",
      value:"1465.33",
      type:"松浦大桥"
    },
    {
      name:"今年平均流量",
      value:"606.38",
      type:"松浦大桥"
    },
    {
      name:"未达标天数",
      value:"0",
      type:"松浦大桥"
    },
    {
      name:"保证率(%)",
      value:"100",
      type:"松浦大桥"
    },
    
    // {
    //   name:"",
    //   value:"",
    //   type:"松浦大桥"
    // },
    
    {
      name:"预警发布次数",
      value:"蓝色(0)，橙色(0)，红色(0)",
      type:"松浦大桥"
    },
  ];
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
#YJXyTable div {
    list-style: none;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    margin-bottom: 15px;
}
        .ClassName {
  background: var(--ClassNameBcak);
  font-weight: normal;
  color: #ccc;
  font-size: 14px;
  width: 100%;
  display: inline-block;
  width: 100%;
  /* padding: 0px 20px; */
}
.View{
  font-size:16px;
  color: var(--mtablecolor);
  padding:0px 15px;

  
  display: inline-block;
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}
.YJXyTablediv{
  padding:5px 15px;
}

</style>
