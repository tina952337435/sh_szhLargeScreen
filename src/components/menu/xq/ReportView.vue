<template>
      <div class="m-box m-box-3" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p1" id="title2">响应情况</p>

      <div style="width:calc(100% - 250px);" class="div-swiper">
        <el-select v-model="TaskID" style="width:260px;" clearable placeholder="请选择"
        @change="handleChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
  
    </div> 

    <div class="txt" style="height: calc(100vh - 42.5rem);">
      <div style="padding: 0px; margin: 10px;height:250px;overflow-y:auto;" id="YJXyTable"  @mouseenter="stopScroll" @mouseleave="startScroll">
        <!-- <el-table ref="tableRef" :data="tableData" height="250px"> 
            <el-table-column label="序号" type="index" width="45" header-align="center" align="center"></el-table-column>
            <el-table-column label="日期" prop="updateTime"  width="100" header-align="center" align="center"></el-table-column>
            <el-table-column label="单位" prop="name" width="100" show-overflow-tooltip header-align="center" align="left"></el-table-column>
            <el-table-column label="上报内容" prop="content" show-overflow-tooltip header-align="center" align="left">
                <template #default="{row}">
                    <span :class="{ 'empty-value': SetNull(row.isstatus)=='1' }">
                        {{ row.content || '-' }}
                    </span>
                </template>
            </el-table-column>
        </el-table>  -->
        <div style="height: 250px;" class="scroll-container">
            <div ref="tableRef" class="scroll-text" v-if="tableData.length > 0">
                <div  class="ystsItem" v-for="(item, index) in tableData" :key="item.id">
                    <div :class="['ystsItemunit', { 'empty-value': SetNull(item.isstatus)=='1' }]">
                        <span class="ysts-numorder">{{ index + 1 }}</span> {{item["name"]}}（{{item["updateTime"]}}）
                    </div>
                    <div :class="['ystsItemcontent',{'ystsItemcontentright': SetNull(item.isstatus)=='1' }]">{{item["content"]}}</div>
                </div>
            </div>
             
            <!-- <div class="ystsItemnote" v-else>
                暂无数据
            </div> -->
        </div>
       
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElSelect,ElTable,ElTableColumn } from "element-plus";
import api from "@/api/zonglan/videoIndex.js";
import zonglan from "@/api/zonglan/index.js";
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { SetNull, sortObjectArray, SumJson } from '@/api/ComUnit';
import dayjs from 'dayjs';
let TaskID=ref("");
const table_interval=ref(null);
const options=ref([])
const tableRef = ref(null)
const timer = ref(null)
const scrollStep = 1 // 滚动步长
const tableData=ref([]); 
onMounted(() => {
    getFXFTTaskInfo();
    
})
function getFXFTTaskInfo(){
    var strParam = {};
    strParam={
            "strExp": "{}",
            "datasource": "http://172.17.50.55:8000/swcc/getFXFTTaskInfoLimit?apikey=98aqfKdGHimxAGBDaCg3aYnPxxzCdqxw&year=",
            "pid":"post",
            "stcd":"false"
        };
    api.postSel(strParam).then(res => { 
        if(res.data.list.length>0){
            TaskID.value=res.data.list[0].id;
            var strJson=[];
            for(var i=0;i<res.data.list.length;i++){
                var item=res.data.list[i];
                var strWhere={};
                    strWhere["label"]=item["content"];
                    strWhere["label"]=dayjs(item["startTM"]).format("YYYY-MM-DD")+"至"+dayjs(item["endTM"]).format("YYYY-MM-DD")
                    strWhere["value"]=item["id"];
                strJson.push(strWhere);
            }
            options.value=strJson; 
            currentIndex=0;
            getFXFTShowInfoNew();
        }
    })
}
function handleChange(evt){ 
    currentIndex=0;
    TaskID.value=evt; 
    getFXFTShowInfoNew();
}
function getFXFTShowInfoNew(){
    var strParam = {};
    strParam={
            "strExp": "{}",
            "datasource": "http://172.17.50.55:8000/swcc/getFXFTShowInfoNew?apikey=98aqfKdGHimxAGBDaCg3aYnPxxzCdqxw&timeInfo="+TaskID.value,
            "pid":"post",
            "stcd":"false"
        }
        api.postSel(strParam).then(res => {
            var listParamResult=[];
            var _params={};
            _params["stime"]=res.data[0]["startTM"];
            _params["etime"]=res.data[0]["endTM"];
            zonglan.getxcBaseList(_params).then(evt => {
                listParamResult=evt.result;
                var swjMsg=``,strTM='';
                if(listParamResult.length>0){
                    strTM=listParamResult[0]["tm"];
                    swjMsg=`各地前置应急队伍${SumJson(listParamResult,"dw_num")}支、
                    应急排涝队员${SumJson(listParamResult,"people_num")}人、
                    移动排涝设备${SumJson(listParamResult,"sb_num")}台；
                    出动养护巡查车辆${SumJson(listParamResult,"car_num")}台次、
                    巡查人员${SumJson(listParamResult,"car_people")}人次，
                    巡查低洼地、下穿立交等区域${SumJson(listParamResult,"xlj_num")}处，疏通边井${SumJson(listParamResult,"jing_num")}座`;
                    var js_num=SumJson(listParamResult,"js_num");
                    if(js_num>0){
                        swjMsg+=`，巡查发现积水${js_num}处`;
                    }
                    else{
                        swjMsg+=`，未发现积水`;
                    }
                }
                
                if(res.data.length>0){
                    var strJson=[];
                    for(var i=0;i<res.data.length;i++){
                        var item=res.data[i];
                        var strWhere={};
                            strWhere["rowindex"]=(i+1);
                            strWhere["startTM"]=item["startTM"];
                            strWhere["endTM"]=item["endTM"];
                            strWhere["name"]=item["name"];
                            if(item["name"]=="水务局"){
                                if(SetNull(item["content"])==""){
                                    item["content"]=swjMsg
                                    item["updateTime"]=strTM;
                                }
                            }
                            if(SetNull(item["content"])!=""){
                                strWhere["updateTime"]=dayjs(item["updateTime"]).format("MM-DD HH:mm"); 
                                if(item["content"].length-1==item["content"].lastIndexOf('；')){
                                    strWhere["content"]=item["content"].substr(0,item["content"].lastIndexOf('；')); 
                                }
                                else{
                                    strWhere["content"]=item["content"]; 
                                }
                                strWhere["isstatus"]="0"; 
                                strJson.push(strWhere);
                            }
                            else{
                                strWhere["updateTime"]=dayjs(item["endTM"]).format("MM-DD HH:mm");
                                strWhere["content"]="暂无上报内容"; 
                                strWhere["isstatus"]="1"; 
                            }
                        
                    }
                    tableData.value=sortObjectArray(strJson,["updateTime"],"desc");
                    console.error("tableData@@@@@@@@@value",tableData.value)
                    // setTimeout(function(){
                    //     startScroll();
                    // },500)
                }


            })
           
        })
}
var activeIndex=0;
var currentIndex=0;

const startScroll = () => {
    // if(SetNull(tableData.value)!=""){
    //     timer.value = setInterval(() => {
    //         const scrollDom = tableRef.value
    //         currentIndex = (currentIndex + 1) % tableData.value.length;
    //         scrollToItem(currentIndex);
    //     }, 1000) // 滚动间隔(ms)
    // }

}

function scrollToItem(index) {
    // if(tableData.value.length>0){
    //     activeIndex = index;
    //     const container = tableRef.value;
    //     const target = container.children[index];
    //     target.scrollIntoView({
    //         behavior: 'smooth',
    //         block: 'nearest'
    //     });
    // }
    
  }


const stopScroll = () => {
  clearInterval(timer.value)
}
onBeforeUnmount(() => {
  stopScroll()
})
  
</script>
<style scoped>
.empty-value {
  color: #F56C6C !important;
}
.emptycolor{
    color: #FFFFFF;
}
.ysts-numorder {
    width: 26px;
    height: 26px;
    border-radius: 20px;
    display: block;
    background: var(--mtabletrcolor);
    color: var(--mtablecolor) !important;
    line-height: 28px;
    text-align: center;
    float: left;
    margin-right: 10px;
    font-size: 0.9rem;
}
:deep(.el-select__placeholder){
    color: #EFEFEF;
}
.el-select-dropdown__item,.el-select__placeholder.is-transparent{
    color: #EFEFEF;
}
.el-select-dropdown__item.is-hovering {
    background-color: #012b4e;
}
:deep(.el-select__wrapper){
    box-shadow:none;
}
:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
    box-shadow: none;
}

#YJXyTable {
  height: calc(100% - 60px);
  width: 97%;
  overflow-y: auto;
}

/* 自定义滚动条样式 */
#YJXyTable::-webkit-scrollbar {
  width: 4px !important;
  /* 设置滚动条宽度 */
}

#YJXyTable::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: 4px;
  top: 0px;
  background: var(--mtabletrcolor) !important;
  border-radius: 0% !important;
  z-index: 2;
}
/* .ystsItem{
    padding: 10px;
} */
.ystsItemcontent{
    color: white;
    width: 100%;
    border-bottom: 1px solid #575757;
    text-align: left;
    padding: 10px;
    text-indent: 2em;
    font-size: 13px;
}
.ystsItemcontentright{ 
    text-align: right;
}
.ystsItemunit{
    width: 100%;
    text-align: left;
    color: rgb(0 236 238);
    font-size: 15px;
}
.ystsItemnote{
    font-size: 25px;
    text-align: center;
    color: #656869;
    margin-top: 50px;
}

.scroll-container {
  overflow: hidden; /* 隐藏溢出的内容 */
  position: relative; /* 定位容器 */
  width: 100%; /* 或者你需要的宽度 */
  height: 50px; /* 高度根据需要设置 */
}

.scroll-text {
  position: absolute;
  animation: scroll 50s linear infinite; /* 应用动画 */
}

 /* 鼠标悬停时暂停 */
.scroll-container:hover .scroll-text {
    animation-play-state: paused;
}
@keyframes scroll {
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-100%);
  }
} 

</style>