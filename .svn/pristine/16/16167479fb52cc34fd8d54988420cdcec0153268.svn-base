<template>
  <div class="m-box" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p" id="title2" @click="fangda()">下立交信息</p>
      <div style="width:calc(100% - 150px);" class="div-swiper">
        <div class="swiper-slide" style="width: 25%;" :class="swiper == 'all' && 'swiper-slide swiper-slide-thumb-active'"
          @click="GetType('all')">
          全部
        </div>
        <div class="swiper-slide" style="width: 25%;"
          :class="swiper == 'standard' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('standard')">不达标
        </div>
        <div class="swiper-slide" style="width: 25%;"
          :class="swiper == 'pond_reason' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('pond_reason')">
          历史积水
        </div>
        <div class="swiper-slide" style="width: 25%;"
          :class="swiper == 'problem' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('problem')">排涝隐患
        </div>
      </div>
    </div>
    <div class="txt">
      <el-table :data="tableData" @row-click="handleclick"
        style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;">
        <el-table-column type="index" label="序号" width="60" header-align="center" align="center" />
        <el-table-column label="名称" prop="stnm" min-width="100" align="center" :show-overflow-tooltip="true">
        </el-table-column>
          <el-table-column label="现状" prop="status" min-width="60" align="center">
          </el-table-column> 
        <el-table-column label="积水深度(m)" prop="deptval" min-width="100" align="center">
        </el-table-column>
        <el-table-column label="时间" prop="spt" min-width="100" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="行政区划" prop="ad_name" min-width="60" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column v-if="standardTrue" label="达标情况" prop="standard" min-width="80" align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
          <el-table-column label="重现期" prop="period" min-width="60" align="center">
        </el-table-column>
        <el-table-column v-if="reasonTrue" label="积水原因" prop="pond_reason" min-width="160" align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column v-if="problemTrue" label="排涝隐患" prop="problem" min-width="160" align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
    </div>
    <div class="bot"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <div class="m-box" style="position: relative">
      <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
        <div class="d1"></div>
        <div class="d2"></div>
        <p class="base-p" id="title2" @click="fangda()">下立交信息</p>
        <div style="width:calc(100% - 150px);" class="div-swiper">
          <div class="swiper-slide" style="width: 25%;"
            :class="swiper == 'all' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('all')">
            全部
          </div>
          <div class="swiper-slide" style="width: 25%;"
            :class="swiper == 'standard' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('standard')">不达标
          </div>
          <div class="swiper-slide" style="width: 25%;"
            :class="swiper == 'pond_reason' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('pond_reason')">
            历史积水
          </div>
          <div class="swiper-slide" style="width: 25%;"
            :class="swiper == 'problem' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('problem')">排涝隐患
          </div>
        </div>
      </div>
      <div class="txt">
        <el-table :data="tableData" @row-click="handleclick"
          style="width: 96%;height:calc(100% - 40px);--el-table-border-color:none;margin:auto;"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="20px" :indeterminate="true"></el-table-column>
          <el-table-column type="index" label="序号" width="60" header-align="center" align="center" />
          <el-table-column label="名称" prop="stnm" min-width="100" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="现状" prop="status" min-width="60" align="center">
          </el-table-column>
          <el-table-column label="积水深度(m)" prop="deptval" min-width="100" align="center">
          </el-table-column>
          <el-table-column label="时间" prop="spt" min-width="100" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="行政区划" prop="ad_name" min-width="60" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column v-if="standardTrue" label="达标情况" prop="standard" min-width="80" align="center"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="重现期" prop="period" min-width="60" align="center">
          </el-table-column>
          <el-table-column v-if="reasonTrue" label="积水原因" prop="pond_reason" min-width="160" align="center"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column v-if="problemTrue" label="排涝隐患" prop="problem" min-width="160" align="center"
            :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <div style="width: 100%;margin-top:5px;" id="messageXlj">
          <el-button type="primary" @click="MessageSearch()"
            style="text-align: center;margin-left: calc(50% - 50px);">一键发送短信</el-button>
        </div>
      </div>
      <div class="bot"></div>
    </div>
  </ComZujian>
</template>
<script setup>
import { useStore } from "vuex";
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElTable, ElTableColumn } from "element-plus";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const showDialog = ref(false);
const store = useStore();
const { viewer } = store.state;
const tableHeaders = [
  { name: "stnm", label: "名称" },
  { name: "deptval", label: "水深" },
  { name: "addvnm", label: "行政区划" },
  { name: "type", label: "类型" },
];
const tableData = ref([]);
const tableDataAll = ref([]);
const swiper = ref("all");
const swiperTrue = ref(false);
const standardTrue = ref(false);
const reasonTrue = ref(false);
const problemTrue = ref(false);

function Weacontent() {
  var AllSiteDealList=[];
  api.getAllSiteDealMessage({}).then(res=>{
    // console.error("res",res);
    AllSiteDealList=res.data;
  })
  setTimeout(function(){

 
    api.XLJBASESelectList({}).then(res => {
    console.error("=====",AllSiteDealList,res)
    if (res.result.length > 0) {
      var strJson = res.result.filter(function (evt) {
        if (SetNull(evt["deptval"]) == "") {
          evt["deptval"] = '-'
        } else {
          evt["deptval"] = Number(evt["deptval"]).toFixed(2);
        }
        if (SetNull(evt["spt"]) == "") {
          evt["spt"] = '-'
        } else {
          evt["spt"] = dayjs(evt["spt"]).format("MM-DD HH:mm");
        }
        if (SetNull(evt["standard"]) == "") {
          evt["standard"] = '达标';
        } else if (SetNull(evt.standard) == "重现期不达标" || SetNull(evt.standard) == "客水汇入") {
          evt["standard"] = '不达标';
        }
        evt["status"]="无积水";
        if(SetNull(evt["videolist"])!=""){
            var listVideoSTNM=[];
            var videolistView=JSON.parse(evt["videolist"]);
            if(videolistView.length>0){
                for (var i = 0; i < videolistView.length; i++) {
                  listVideoSTNM.push(videolistView[i]["name"]);
                }
            }
            // console.error("listVideoSTNM!!!!!!!!!!!!!!",listVideoSTNM,videolistView)
            var oneDealList=AllSiteDealList.filter(function(e){
              return listVideoSTNM.contains(e.stName)==true&&SetNull(e.status)=='有积水';
            })
            // console.error("oneDealList",evt["stnm"],oneDealList,evt["videolist"])
            
            if(oneDealList.length>0){
              evt["status"]=oneDealList[0].status;
            }
        }
        
        return evt;
      });
      console.error("strJson",strJson)

      tableData.value = sortObjectArray(strJson, ["deptval"], "desc");
      tableDataAll.value = sortObjectArray(strJson, ["deptval"], "desc");
    }
  }).catch(err => { });

   },100)
}
function GetType(type) {
  problemTrue.value = false;
  reasonTrue.value = false;
  standardTrue.value = false;
  swiper.value = type;
  var strJson = tableDataAll.value;
  if (type == 'problem') {
    problemTrue.value = true;
    strJson = strJson.filter(function (e) { return SetNull(e["problem"]) != "" });
  } else if (type == 'pond_reason') {
    reasonTrue.value = true;
    strJson = strJson.filter(function (e) { return SetNull(e["pond_reason"]) != "" });
  } else if (type == 'standard') {
    standardTrue.value = true;
    strJson = strJson.filter(function (e) { return SetNull(e["standard"]) == "不达标" });
  }
  tableData.value = strJson;
}
function fangda() {
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  swiperTrue.value = true;
  $(".g-lside ").css({ "z-index": 99 });
  $(".g-rside ").css({ "z-index": 90 });
  showDialog.value = true;
}
const ALLmyPHONE = ref([]);
function handleSelectionChange(val) {
  ALLmyPHONE.value = val;
}
function MessageSearch() {
  var val = ALLmyPHONE.value
  if (val.length > 0) {
    if (val.length > 0) {
      for (var i = 0; i < val.length; i++) {
        var strExp = "（积水处置模拟）" + SetNull(val[i].ad_name) + SetNull(val[i].stnm) + "出现积水，请及时派出移动排涝力量，前往处置，尽快排除积水。"
        var datasource = "";
        if (SetNull(val[i].contact_phone) != "" && SetNull(val[i].responsible) != "") {
          if ((val[i].contact_phone).length == 11) {
            datasource = val[i].responsible + ":" + val[i].contact_phone;
          } else if (val[i].contact_phone.indexOf('/') > -1) {
            if ((val[i].contact_phone).split('/')[0].length == 11) {
              datasource = (val[i].responsible).split('/')[0] + ":" + (val[i].contact_phone).split('/')[0];
            }
            if ((val[i].contact_phone).split('/')[1].length == 11) {
              datasource += "," + (val[i].responsible).split('/')[1] + ":" + (val[i].contact_phone).split('/')[1];
            }
          }
          // datasource = "";
          // datasource = "测试:18470367571";
          if (datasource != "") {
            var strParam = {};
            strParam["pathname"] = "短信通知";
            strParam["key"] = "管理员";
            strParam["strExp"] = strExp;
            strParam["datasource"] = datasource;
            api.MessageSMSSend(strParam).then((res) => {
              ElMessage.success("短信发送成功");
            }).catch((err) => { });
          } else {
            ElMessage.error("发送人员号码为空");
          }
        }
      }
    }
  } else {
    ElMessage.error("请选择人员");
    return false;
  }
}
function handleclick(evt) {
  var strJson = [];
  let _lgtd = SetNull(evt["lgtd"]);
  let _lttd = SetNull(evt["lttd"]);
  if (_lgtd == "" || _lttd == "") {
    ElMessage.error("缺少经纬度坐标");
  } else {
  }
}
onMounted(() => {
  Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
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

:deep(.el-table .cell) {
  padding: 0 8px;
  white-space: nowrap;
  cursor: pointer;
}
</style>
