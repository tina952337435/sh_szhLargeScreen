<template>
  <!-- 左侧tab切换 -->
  <!-- 侧边栏 -->
    <aside class="aside">
        <tabToggleSQ />
    </aside>

  <!-- 右侧 -->
  <div class="g-rside">
    <div style="width: 100%">
      <TableRiver :GCtableDataAll="GCtableDataAllTJ" :key="datekeyGCTJ"  ref="child" @passValue="getRiverType" />
    </div>
    <div style="width: 100%">
      <TableGQJC :GCtableDataAll="GCtableDataAll" :key="datekeyGC"
        @parentMethodshowDynamicLayers="parentMethodshowDynamicLayer" />
    </div>
  </div>
  <div class="tuli">
    <div>
      <el-switch class="switch-xs iconMarker" @click="SpanItem('riverMarker')" v-model="riverMarker" />
      <span style="vertical-align: -10px; margin-left: 50px"> 标注 </span>
    </div>
    <div>
      <el-switch class="switch-xs iconMarker" @click="SpanItem('szMarker')" v-model="szMarker" />
      <span style="vertical-align: -10px; margin-left: 50px"> 水闸 </span>
    </div>
    <div>
      <el-switch class="switch-xs iconMarker" @click="SpanItem('bzMarker')" v-model="bzMarker" />
      <span style="vertical-align: -10px; margin-left: 50px"> 雨水泵站 </span>
    </div>
    <div style="height: 24px; line-height: 24px; padding: 0px 5px">
      <input style="vertical-align: 7px" @click="SpanItem('GCMarker')" v-model="gc_kai" type="checkbox"
        checked="checked" />
      <img alt="" src="/images/gqgc/z_green_1.png"
        style="width: 24px; height: 14px;vertical-align: 6px;display: inline-block" />
      <span style="padding-left: 2px; color: white; vertical-align: 9px">
        开
      </span>
    </div>
    <div style="height: 24px; line-height: 24px; padding: 0px 5px">
      <input style="vertical-align: 7px" @click="SpanItem('GCMarker')" v-model="gc_guan" type="checkbox"
        checked="checked" />
      <img alt="" src="/images/gqgc/z_red_1.png"
        style="width: 24px; height: 14px;vertical-align: 6px;display: inline-block" />
      <span style="padding-left: 2px; color: white; vertical-align: 9px">
        关
      </span>
    </div>
    <div style="height: 24px; line-height: 24px; padding: 0px 5px">
      <input style="vertical-align: 7px" @click="SpanItem('GCMarker')" v-model="gc_qc" type="checkbox" />
      <img alt="" src="/images/gqgc/z_blur_1.png"
        style="width: 24px; height: 14px;vertical-align: 6px;display: inline-block" />
      <span style="padding-left: 2px; color: white; vertical-align: 9px">
        缺测
      </span>
    </div>
  </div>
  <div class="TJList">
   <div style="width: 220px;height: 210px;">
      <div  class="ListTitle">
        <span class="ysts-numorder">1</span>运行情况
      </div>
      <span class="Listspan">开泵台数：<span style="color: #42F700;">{{ gateTotalOpen }}</span> 台</span>
      <span class="Listspan">开泵流量：<span style="color: #42F700;">{{ gateTotalQ }} </span> m³/s</span>
      <span class="Listspan">开闸孔数：<span style="color: #42F700;">{{ zmTotalOpen }}</span> 孔</span>
      <!-- <span class="Listspan">当日排水量：<span style="color: #42F700;">67.43 </span> 万m³</span> -->
    </div>

    <div style="width: 220px;height: 210px;">
      <div class="ListTitle">
        <span class="ysts-numorder">2</span>基本情况
      </div>
      <span class="Listspan">工程总计：<span style="color: rgb(2 218 255);">{{ gateTotal }}</span> 座</span>
      <span class="Listspan">泵站总计：<span style="color: rgb(2 218 255);">{{ gateTotalBZ }} </span>台</span>
      <span class="Listspan">闸门总计：<span style="color: rgb(2 218 255);">{{ gateTotalZM }}</span> 孔</span>
    </div>      
  </div>

  <!-- <div class="tuli_real_gate">
        <div style="height:auto;color: white;display:block;" id="SLTuli" class="tuliTab">
            <div style="height:auto;color: white;padding:0px 5px;display:inline-block; border-radius: 0px; ">
                <div class="text-xiaolv-gate" style="width:200px;margin:8px 5px;font-weight: bold;">
                    <span style="padding-left:5px;text-decoration: underline;" id="realGateSL" @click="OnBoot('工程水量统计')">工程水量统计分析</span>
                </div>
            </div>
        </div>
        <div style="height:auto;color: white;display:block;" id="SWTuli" class="tuliTab">
            <div style="height:auto;color: white;padding:0px 5px;display:inline-block; border-radius: 0px; ">
                <div class="text-xiaolv-gate" style="width:200px;margin:8px 5px;font-weight: bold;">
                    <span style="padding-left:5px;text-decoration: underline;" id="realGate" @click="OnBoot('工程实时运行状态')">工程实时运行状态</span>
                </div>
            </div>
        </div>
    </div> -->


    <!--单站弹窗-->
  <div class="popModel" id="mypopModel">
    <div class="popupContent">
      <div class="head">
        <span></span>
        <img src="/images/close.png" alt="关闭" @click="cancel()">
      </div>
      <component :is="currentComponentTanchu" @parentMethods="parentMethod"></component>
    </div>
  </div>
  <Mapbiaozhu />
</template>

<script setup>
import '@/assets/styles/style.css';
import TableRiver from "@/components/menu/gq/TableRiver.vue";
import TableGQJC from "@/components/menu/gq/TableGQJC.vue";
import Mapbiaozhu from "@/components/untils/Mapbiaozhu.vue";
import tabToggleSQ from "@/components/tab/tabToggleSQ.vue";
import { onMounted, ref, nextTick, reactive, provide, defineAsyncComponent, onUnmounted, h } from "vue";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import { useStore } from "vuex";
import * as PointMark from "@/utils/ArcGis/PointMark.js";
import apizonglan from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import Dialog from "@/api/utils/Dialog.js";
import { convertToDate } from "@/api/dateUtil.js";
import { destroy, removeEntityByName, dyCenter,addAreaLineQS,setZOOM,RemoveLayer} from "@/utils/ArcGis/MapComm.js";
const store = useStore();
const { viewer } = store.state;
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const popupCloseImg = ref("/images/missWhite.png");
const child = ref(null);
let lines = reactive([]);

const riverMarker = ref(false);
const szMarker = ref(true);
const bzMarker = ref(false);
const SWMarker = ref(true);
const gc_kai = ref(true), gc_guan = ref(true), gc_qc = ref(true);
const datekeyAll = ref(null);
const colorLWQ1 = ref(true), colorLWQ2 = ref(true), colorLWQ3 = ref(true);
const poldNum = ref(0);
const poldWarningNum = ref(0);
const gateTotal = ref(0);
const gateTotalOpen = ref(0);
const gateTotalQ = ref(0);
const gateTotalBZ = ref(0);
const gateTotalZM = ref(0);
const zmTotalOpen = ref(0);
const WQClickData = ref()
var myData = [];

const currentComponentTanchu = ref(null);

onUnmounted(() => {
  $(".light").remove();
  if (interVal != null) {
    clearInterval(interVal);
  }
})
//自动刷新
var interVal;
window.curDataRefresh = function () {
  if (interVal != null) {
    clearInterval(interVal);
  }
  if (localStorage.getItem("curDataRefresh") == "true") {
    interVal = setInterval(function () {
      refreshData();
    }, 180000); // 180000
  }
}
//刷新的方法
function refreshData() {
  var _curDataRefresh = localStorage.getItem("curDataRefresh");
  if (_curDataRefresh == true || _curDataRefresh == 'true') {
    clearALL();
  } else {
    if (interVal != null && interVal != undefined) {
      clearInterval(interVal);
    }
  }
}
const ybdrplist = ref([]);
const WQtableDataAll = ref([]);
const GCtableDataAll = ref([]);
const GCtableDataAllTJ = ref([]);
const datekeyGC = ref(null);
const datekeyGCTJ=ref(null);
const pid=ref("2023060214563122171-1");
function loadGC() {
  apizonglan.stPptnGQTable({ "key": "1", "pid": pid.value}).then(res => { 
    GCtableDataAll.value = res.data;
    datekeyGC.value = new Date();
    $.data(myData, "GCData", res.data);
    $.data(myData, "GCList", res.data);
    addGCMarker();
  }).catch(err => { });
}
function loadGCTJ() {
  apizonglan.stPptnGQSLPTJ({ "key": "1", "pid": "2023060214563122171-2" }).then(res => { 
    GCtableDataAllTJ.value = res.data;
    datekeyGCTJ.value = new Date();
  }).catch(err => { });
}
function getRiverType(lx, id, zhen, rvnm) {
  var WQData = $.data(myData, "WQtableDataAll");
  var GCData = $.data(myData, "GCData");
  var RiverData = $.data(myData, "RiverData");
  if (SetNull(zhen) != "") {
    if (lx == "river") {
      if (SetNull(id) != "") {
        var riverWaterList = RiverData.filter(function (rv) {
          return rv.type == "1";
        });
        const arrWater = riverWaterList.map(item => item.stcd);
        const WaterSet = new Set(arrWater);
        $.data(myData, "WaterSet", WaterSet);
      }
      $.data(myData, "cityId", "2025071619110378487");
      $.data(myData, "rvnmName", rvnm);
      var riverGateList = RiverData.filter(function (rv) {
        return rv.riverid == id && rv.type == "3";
      });
      const arrGate = riverGateList.map(item => item.stcd);
      const stcdSet = new Set(arrGate);
      const GCList = GCData.filter(gc => stcdSet.has(gc.stcd));   //河道关联工程站点
      $.data(myData, "GCList", GCList);

      var riverPoldList = RiverData.filter(function (rv) {
        return rv.riverid == id && rv.type == "6";
      });
      const arrPold = riverPoldList.map(item => item.stcd);
      const plodSet = new Set(arrPold);
      if (Array.isArray(WQData)) {
        const filteredData = WQData.filter(s => SetNull(s.wqid) !== "" && plodSet.has(s.wqid));
        WQtableDataAll.value = filteredData;
        datekeyAll.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")).add(6, "hour").format("YYYY-MM-DD HH:mm:ss");
      }
    } else if (lx == "district") {
      $.data(myData, "cityId", id);
      $.data(myData, "WaterSet", "");
      if (Array.isArray(GCData)) {
        //行政关联工程
        const GCList = GCData.filter(s => SetNull(s.admauth) !== "" && s.admauth == zhen);
        $.data(myData, "GCList", GCList);
        // const wqnmSet = new Set(GCList.map(gc => gc.wqnm));
        if (Array.isArray(WQData)) {
          // 行政关联圩区				
          const filteredData = WQData.filter(s => SetNull(s.wq_zhen) !== "" && (s.wq_zhen).indexOf(zhen) > -1);
          WQtableDataAll.value = filteredData;
          datekeyAll.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")).add(6, "hour").format("YYYY-MM-DD HH:mm:ss");
        }
      }
    }
  } else {
    $.data(myData, "cityId", "2025071619110378487");
    $.data(myData, "WaterSet", "");
    $.data(myData, "rvnmName", "");
    var GCList = GCData;
    $.data(myData, "GCList", GCList);
    WQtableDataAll.value = WQData;
    datekeyAll.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")).add(6, "hour").format("YYYY-MM-DD HH:mm:ss");
  }
  // addGCMarker();
}

function addGCMarker() {
  var GCJson = $.data(myData, "GCList");
  gateTotal.value = GCJson.length;
  var resList = [];
  var totalQ_New = 0, totalOpen = 0, totalGuan = 0, totalQc = 0, totalOpenzm = 0;
  var countBZ = 0, countZM = 0;
  if (GCJson.length > 0) {
    for (var num = 0; num < GCJson.length; num++) {
      var item = GCJson[num];
      var gateListdata = item.gateList;
      item.tm = "—";
      var gtopnum = SetNull(item.grq) != "" ? Number(item.grq) : 0;  //闸门个数
      var omcnum = SetNull(item.flpq) != "" ? Number(item.flpq) : 0;  //泵站个数
      
      var totalQ = 0;
      var NumCountKQ = 0, NumCountGQ = 0, NumCountQC = 0;
      var NumCountzm = 0;
      var stateHtml = [], imgUrl = "";
      if (SetNull(gateListdata)!="") {
        item.tm = SetNull(gateListdata[0].tm) != "" ? dayjs(convertToDate(gateListdata[0].tm)).format("YYYY-MM-DD HH:mm:ss") : "—";
        // if (item.tm > tempTM) {
        var bzdataALL = gateListdata.filter(function (e) {
          return Number(e.eqpno) == 2;
        })
        var zmdataALL = gateListdata.filter(function (e) {
          return Number(e.eqpno) == 1;
        });
        var gcOpen=false;
        if (bzdataALL.length > 0) {
          for (var i = 0; i < bzdataALL.length; i++) {
            if (Number(bzdataALL[i].gtq) > 0||Number(bzdataALL[i].gtophgt) > 0) {
              imgUrl = "/images/gqgc/bz_open.png";
              NumCountKQ += NumCountKQ + 1;
              totalQ += SetNull(bzdataALL[i].gtq)!=""?Number(bzdataALL[i].gtq):0;
              gcOpen=true;
            } else {
              NumCountGQ += NumCountGQ + 1;
              imgUrl = "/images/gqgc/bz_close.png";
            }
            stateHtml.push(imgUrl);
          }
        }
        if (zmdataALL.length > 0) {
          for (var i = 0; i < zmdataALL.length; i++) {
            if (Number(zmdataALL[i].gtophgt) >=0.1) {
              imgUrl = "/images/gqgc/sz_open.png";
              NumCountzm=NumCountzm + 1;         
              gcOpen=true;
            } else {
              imgUrl = "/images/gqgc/sz_close.png";
            }
            stateHtml.push(imgUrl);
          }
        }
        item.omcn=gcOpen?1:0;
      } 
      else {
        item.omcn = -1;
        if (omcnum > 0) {
          NumCountQC += omcnum;
          for (var i = 0; i < omcnum; i++) {
            imgUrl = "/images/gqgc/bz_close.png";
            stateHtml.push(imgUrl);
          }
        }
        if (gtopnum > 0) {
          for (var i = 0; i < gtopnum; i++) {
            imgUrl = "/images/gqgc/bz_close.png";
            stateHtml.push(imgUrl);
          }
        }
      }
      var shikuang="";
      if(omcnum==0&&gtopnum>0){
         shikuang="闸【" + NumCountzm + "/" + gtopnum + "】"
      }
      else if(omcnum>0&&gtopnum==0){
        shikuang="泵【" + NumCountKQ + "/" + omcnum + "】";
      }
      else{
        shikuang="泵【" + NumCountKQ + "/" + omcnum + "】，闸【" + NumCountzm + "/" + gtopnum + "】";
      }
      item.shikuang = shikuang;
      item.imageUrls = stateHtml;
      totalOpen += NumCountKQ;
      totalQ_New += totalQ;
      totalGuan += NumCountGQ;
      totalQc += NumCountQC;
      totalOpenzm += NumCountzm;
      countBZ += omcnum;
      countZM += gtopnum;

      resList.push(item);
      gateTotalOpen.value = totalOpen;
      zmTotalOpen.value = totalOpenzm;
      gateTotalQ.value = (Number(totalQ_New).toFixed(2));
      gateTotalBZ.value = countBZ;
      gateTotalZM.value = countZM;
    }
  } else {
    gateTotal.value = 0;
    gateTotalOpen.value = totalOpen;
    zmTotalOpen.value = totalOpenzm;
    gateTotalQ.value = (Number(totalQ_New).toFixed(2));
  }

  var strResult = [];//工程上图
  if (resList.length > 0) {
    for (var i = 0; i < resList.length; i++) {
      var item = resList[i];
      if (item.omcn == 1) {
        if (gc_kai.value == true) {
          strResult.push(item);
        }
      } else if (item.omcn == 0) {
        if (gc_guan.value == true) {
          strResult.push(item);
        }
      } else {
        if (gc_qc.value == true) {
          strResult.push(item);
        }
      }
    }
  }
  // console.error("泵站数据1", strResult)
  PointMark.addGQMark(strResult, riverMarker.value)
}
function SpanItem(obj) {
  if (obj == "GCMarker") {
    if (gc_guan.value) {

    }
    setTimeout(function () {
      addGCMarker();
    }, 100)
  }
  else if(obj == "riverMarker"){
    addGCMarker();
  }
  else if(obj == "szMarker"){
    if(szMarker.value){  
      if(bzMarker.value)      {
         bzMarker.value=false;
      }     
      pid.value="2023060214563122171-1";
      loadGC();
    }
    else{
      $(".lightGQ").remove();
      RemoveLayer("addGQMark");
    }
  }
  else if(obj == "bzMarker"){
    if(bzMarker.value){
      if(szMarker.value)      {
         szMarker.value=false;
      }      
      pid.value="2023060214563122171-3";
      loadGC();
    }
    else{
      $(".lightGQ").remove();
      RemoveLayer("addGQMark");
    }
  }
}
function clearALL() {
  try {
    removeEntityByName();
  } catch (ex) { }
}
onMounted(async () => {
  addAreaLineQS();
  clearALL();
  $("#tabgq").addClass('swDivSelect swDiv');
  $("#m_shi").addClass('z-crtitem z-crt wow slideInUp link-item');
  if (_theme == "default") {
    popupCloseImg.value = "/images/missWhite.png"
  } else {
    popupCloseImg.value = "/images/missBlack.png"
  }
  $.data(myData, "cityId", "2025071619110378487");
  $.data(myData, "WaterSet", "")
  loadGC();
  loadGCTJ();
});
function parentMethodshowDynamicLayer(item) {
  setZOOM(13);
  dyCenter(item[0], item[1]);
}
//传参
provide("WQtableDataAll", WQtableDataAll);


function OnBoot(type) {
  var ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/gq/EchartGCSK.vue")
  ); 
  if(type=="工程水量统计"){
      ChildVue = defineAsyncComponent(() =>
        import("@/components/danzhan/gq/EchartGCTJ.vue")
      );  
  }
  currentComponentTanchu.value = ChildVue;
  $(".popupContent .head span").html(type);
  $(".popModel").show();
}
const cancel = () => {
  $("#mypopModel").hide();
};
</script>

<style scoped>
.tuli {
  /* width: 100px; */
  height: 200px;
  color: white;
  font-size: 12px;
  font-size: 0.15rem;
  padding: 0px 10px;
  cursor: pointer;
  position: absolute;
  border-radius: 8px;
  bottom: 15px;
  height: auto !important;
  right: 28.6rem;
  padding: 0px 0px 10px 0px !important;
  z-index: 2;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.2);
}

.switch-xs {
  position: absolute;
  left: 6px;
  height: 40px;
  line-height: 40px;
}

.tuliLeft {
  width: 130px;
  height: 200px;
  float: left;
  color: white;
  font-size: 12px;
  /* margin-left: 6px; */
  margin-top: -18px;
  margin-right: 20px;
  font-size: 0.15rem;
  padding: 0px 5px;
  cursor: pointer;
  position: absolute;
  /* border: 1px solid #0566a3; */
  border-radius: 5px;
  top: 35rem;
  height: auto !important;
  left: 31rem;
  padding: 0px 0px 3px 0px !important;
  z-index: 99;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.2);
  /* opacity: 0.8; */
}

.colorSpan {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  line-height: 12px;
  vertical-align: middle;
}

/* 搜索开始 */
.top-left-icon {
  width: 5vh;
  height: 5vh;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  position: fixed;
  left: 28rem;
  bottom: 0.8rem;
  color: white;
}

.opencz1 {
  width: 46px;
  height: 36px;
  margin-left: 10px;
  float: right;
  background: #fff;
  cursor: pointer;
  border: 1px #c5d1ff solid;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  float: right;
  height: 36px;
  width: 100px;
  left: -380px;
  line-height: 36px;
  color: #42ecef !important;
  border-style: solid;
  border-width: 2px;
  border-image-source: linear-gradient(0deg, #11a8ff, #134dea 49%, #11a8ff);
  border-image-slice: 1;
  box-shadow: inset 0 0 0 1px transparent;
  background-color: rgba(76, 152, 176, 0.2);
  text-align: center;
}

.top-left-icon-menu {
  width: 450px;
  height: 240px;
  z-index: 99;
  margin-left: 10px;
  cursor: pointer;
  position: fixed;
  left: 28rem;
  bottom: 1rem;
  color: var(--sel_wraplabelcolor);
  padding: 10px;
  box-shadow: inset 0 0 0 1px transparent;
  /* background-color: rgba(2, 24, 31, 0.8); */
  background-color: var(--boxtitlebg);
  border: var(--portalborder);
  /* border-image-source: linear-gradient(0deg, #11a8ff, #134dea 49%, #11a8ff); */
  display: none;
  border-radius: 8px;
}

.top-left-icon-menu-close {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 22px;
  padding: 3px;
}

.shdswDiv .swDiv {
  margin: 0px;
  width: 50px;
  font-size: 14px;
  margin-left: 6px;
}

.divArea {
  /* width: 100%; */
  height: 100px;
  margin: 0px;
  padding: 0px 0px 0px 0px;
}

.area {
  background: var(--portal);
  border: var(--portalborder);
  width: 110px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  margin-right: 8px;
  font-size: 13px;
  list-style: none;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  padding: 0px;
  margin: 0px 10px 5px 0px;
  color: var(--sel_wraplabelcolor);
}

.areaSelect {
  background: var(--swDivSelectcolor);
  color: var(--sel_wraplabelcolorSel);
  width: 110px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  margin-right: 8px;
  font-size: 13px;
  list-style: none;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  padding: 0px;
  margin: 0px 10px 5px 0px;
}

.divArea li:nth-child(5),
.divArea li:nth-child(8),
.divArea li:nth-child(11) {
  margin-left: 52px;
}

.textbox {
  background: none;
  border: var(--portalborder);
  padding-left: 6px;
  padding-right: 6px;
  height: 26px;
  border-radius: 4px;
  margin-left: -1px;
  color: #fff;
  /* color: var(--widgetcolor); */
}

.textbox:fous-visible {
  background: var(--portal) !important;
  border: var(--portalborder) !important;
  color: var(--widgetcolor);
}

#zhandianbox {
  width: 150px;
  height: auto;
  display: table;
  position: absolute;
  background: var(--boxtitlebg);
  left: 67px;
  bottom: 80px;
  z-index: 99;
  margin-left: 8px;
  border-radius: 4px;
  color: var(--widgetcolor);
}

#zhandianbox ul {
  padding: 0px 5px;
}

#zhandianbox ul li {
  cursor: pointer;
  line-height: 30px;
  height: 30px;
  list-style: none;
  color: var(--sel_wraplabelcolor);
}

#zhandianbox ul li:hover {
  color: var(--popupContentTitleColor);
}


:deep(.el-radio) {
  /* margin-right: 20px; */
  --el-radio-input-bg-color: #d5141400;
}

:deep(.el-radio__label) {
  color: var(--widgetcolor);
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
  width: 160px;
}

:deep(.el-input__prefix-inner) {
  margin-left: -9px;
}

:deep(.el-input__suffix) {
  margin-right: -9px;
}

:deep(.el-input__wrapper) {
  background-color: #d5141400;
  box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
  ;
}

:deep(.el-input__inner) {
  color: var(--widgetcolor);
}

.FHClick {
  width: 60px;
  height: 35px;
  position: absolute;
  left: 460px;
  top: 100px;
  background-color: var(--portal);
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  padding-top: 7px;
  display: none;
  color: var(--sel_wraplabelcolor);
  cursor: pointer;
}

/* 搜索结束 */

.waterTextNorth {
  background: url(/images/icon_10.png);
  background-size: 100% 100%;
  width: 235px;
  height: 80px;
  color: #03F0A4;
}

.waterTextTitle {
  padding-left: 60px;
  font-size: 19px;
  padding-top: 17px;
  font-weight: 500;
}

.waterTextContent {
  color: #fff;
  padding-left: 110px;
  position: absolute;
  top: 15px;
  font-size: 0.9rem;
}

.colorL p {
  margin: 5px 0px;
}

.colorSpan {
  margin: 0px 8px 0px 4px;
  vertical-align: -2px;
}

.TJList {
  position: absolute;
  top: 7.575rem;
  left: 1rem;
  list-style: none;
  padding-inline-start: 0px;
}

.TJList div {
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;
  color: #ffffff;
  list-style: none;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 8px;
}

.TJList .Listspan {
  display: block;
  height: 36px;
  line-height: 36px;
  float: left;
  font-size: 18px;
  text-align: center;
  font-family: "number";
}
.ListTitle{
  font-size: 19px !important;
  font-family: "number";
}
.ListTitle .ysts-numorder{
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
.text-xiaolv-gate {
            height: 45px;
            width: 200px;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid #5ee9ff;
            box-shadow: 0 0 10px #5ee9ff, inset 0 0 10px #5ee9ff;
            padding: 5px;
            line-height: 35px;
            color: #ABF8FF;
            text-align: center;
            font-weight: bold;
            /* text-decoration: underline; */
        }
.tuli_real_gate {
            width: 200px;
            height: 135px;
            color: white;
            padding: 0px 15px;
            cursor: pointer;
            position: absolute;
            /* display: flex; */
            border-radius: 10px;
            bottom: 35px;
            left: 1rem;
            padding: 0px 0px 3px 0px !important;
            z-index: 99999;
            font-size: 16px;
            /* background: rgba(0, 0, 0, 0.4); */
            /* opacity: 0.8; */
        }

.popModel {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  /* opacity: 0.5; */
  transition: all 1s;
  display: none;
  z-index: 999;
}

.popupContent {
  width: 1400px;
  height: 800px;
  overflow-y: hidden;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* border: 10px solid #fff; */
  background: var(--el-table-bg-colornew);
}

.popupContent>.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  background: var(--popContentHeadbg);
  height: 56px;
  margin: 0px 0px 15px 0px;
}

.popupContent>.head span {
  font-weight: bold;
  font-size: 18px;
  /* color: #21a6ff;
  background: linear-gradient(90deg, #3be1f6 0%, #21a6ff 100%); */
  width: 100%;
  background: #ffffff;
  text-align: center;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.popupContent>.head img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  cursor: pointer;
  margin-right: 10px;
}
</style>