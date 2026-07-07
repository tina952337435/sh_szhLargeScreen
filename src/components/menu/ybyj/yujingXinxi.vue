<template>
  <div class="m-box m-box-1">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p1" id="title2">预警信息</p>
    </div>
    <div class="txt" style="padding:0PX 10PX;">
      <div class="table-responsive">
                             <div style="height:90px;">
                                <div class="responsivekuai2"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                        <img src="/images/bao2.png" />
                                    </div>
                                    <div class="responsivetitle">暴雨预警</div>
                                    <div class="responsivecontent">
                                        <span id="rainWarning" class="responsivecontentvalue" :style="computedStyle('暴雨')">{{rainstorm}}</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div>

                            <div style="height:90px;">
                                <div  class="responsivekuai1"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                         <img src="/images/feng2.png" />
                                    </div>
                                    <div class="responsivetitle">雷电预警</div>
                                    <div class="responsivecontent">
                                        <span id="weatherWarning" class="responsivecontentvalue" :style="computedStyle('雷电')" >{{leidianWarning}}</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div>
                           
                            <div style="height:90px;">
                                <div  class="responsivekuai1"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                         <img src="/images/feng2.png" />
                                    </div>
                                    <div class="responsivetitle">大风预警</div>
                                    <div class="responsivecontent">
                                        <span id="weatherWarning" class="responsivecontentvalue" :style="computedStyle('大风')" >{{dafengWarning}}</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div>
                            <div style="height:90px;">
                                <div  class="responsivekuai1"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                        <img src="/images/qi2.png" />
                                    </div>
                                    <div class="responsivetitle">潮位预警</div>
                                    <div class="responsivecontent">
                                        <span id="weatherWarning" class="responsivecontentvalue" :style="computedStyle('潮位')" >{{chaoweiWarning}}</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div>

                            
                            <!-- <div style="height:90px;">
                                <div class="responsivekuai1"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                        <img src="/images/bao2.png" />
                                    </div>
                                    <div class="responsivetitle">圩区预警</div>
                                    <div class="responsivecontent">
                                        <span id="rainStorm" class="responsivecontentvalue" style ="color:yellow;" >3</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div>
                            <div style="height:90px;">
                                <div class="responsivekuai2"></div>
                                <div class="responsivekuai">
                                    <div class="imgdiv">
                                        <img src="/images/feng2.png" />
                                    </div>
                                    <div class="responsivetitle">堤防预警</div>
                                    <div class="responsivecontent">
                                        <span id="customsWarning" class="responsivecontentvalue" style ="color:#00ff39;" >0</span>
                                        <span style="font-size:14px;"></span>
                                    </div>
                                </div>
                            </div> -->
                        </div>



      <div style="width: 40%; height: 70%; float: left;margin-top: 3%;padding-left: 12%;display:none;">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionWQWrz" :key="datekey20" :id="dateidWQWrz" />
        <div style="text-align: center;font-size: 1.1rem;color: var(--mtablecolor);margin-top: 3%">圩区</div>
      </div>
      <div style="width:40%;height: 70%;margin-top:3%;float: left;padding-left: 12%;margin-left: 8%;display:none;">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionDike" :key="datekey50" :id="dateidDike" />
        <div style="text-align: center;font-size: 1.1rem;color: var(--mtablecolor);margin-top: 3%">堤防</div>
      </div>
      <!-- <div style="width:30%;height: 70%;margin-top:3%;float: left;margin-left: 3%">
        <Echarts :width="'100%'" :height="'100%'" :option="lineOptionGW" :key="datekey100" :id="dateidGW" />
        <div style="text-align: center;font-size: 1.1rem;color: var(--mtablecolor);margin-top: 3%">积水点</div>
      </div> -->
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
  <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <yujingXinxi :wqstrJson="wqstrJson" :key="datekeyDialog" />
  </ComZujian>
</template>

<script setup>
import ComZujian from "@/components/ComZujian.vue";
import { Postcard } from "@element-plus/icons-vue";
import MyDialog from "@/components/ComDialog.vue";
import yujingWQTJ from "@/components/danzhan/wq/yujingWQTJ.vue";
import Table from "@/components/Table/Table.vue";
import apiWxxsq from "@/api/topHead/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";

import $ from "jquery";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy, GetSZStateBy, GetSZState } from "@/api/ComUnit.js";

import * as echarts from "echarts";

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
const datekeyDialog = ref(null);


const _theme = localStorage.getItem("curTheme");

const rainstorm=ref("无");
const leidianWarning=ref("无");
const dafengWarning=ref("无");
const chaoweiWarning = ref("无");

onMounted(() => {
  Weacontent();
});
function Weacontent() {
   getBYYJInfo();
}

//暴雨预警
function getBYYJInfo() {
  apiWxxsq.getSwptToken({}).then((obj) => {    
    var stime = dayjs(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    .add(-30, "Day")
    .format("YYYY-MM-DD 00:00:00");
    var etime = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

    var strParam = { 
      access_token:obj.access_token,
      STARTTIME:stime,
      ENDTIME:etime
    };
    apiWxxsq
      .getSwptQXYJ(strParam)
      .then((res) => {
        if(res.length > 0){
          var resT= res.filter((item) => item.ST_STATE == "current"&&item.ST_FBTYPE == "发布");//当前预警且不是解除的
          var resRain=resT.filter((item) => item.ST_NAME.indexOf("暴雨") > -1);//预警类型为暴雨
          rainstorm.value="无";
          if(resRain.length > 0){
            var st_name= resRain[0].ST_NAME;
            if(st_name.indexOf("蓝色") > -1){
              rainstorm.value = "蓝色";
            }
            else if(st_name.indexOf("黄色") > -1){
              rainstorm.value = "黄色";         
            }
            else if(st_name.indexOf("橙色") > -1){
               rainstorm.value = "橙色";        
            } 
            else if(st_name.indexOf("红色") > -1){
               rainstorm.value = "红色";        
            }            
          }

          leidianWarning.value="无";
          var resLei=resT.filter((item) => item.ST_NAME.indexOf("雷电") > -1);//预警类型为雷电         
          if(resLei.length > 0){
            var st_name= resLei[0].ST_NAME;
            if(st_name.indexOf("蓝色") > -1){
              leidianWarning.value = "蓝色";
            }
            else if(st_name.indexOf("黄色") > -1){
              leidianWarning.value = "黄色";         
            }
            else if(st_name.indexOf("橙色") > -1){
               leidianWarning.value = "橙色";        
            } 
            else if(st_name.indexOf("红色") > -1){
               leidianWarning.value = "红色";        
            }            
          }

          dafengWarning.value="无";
          var resDafeng=resT.filter((item) => item.ST_NAME.indexOf("大风") > -1);//预警类型为雷电         
          if(resDafeng.length > 0){
            var st_name= resDafeng[0].ST_NAME;
            if(st_name.indexOf("蓝色") > -1){
              dafengWarning.value = "蓝色";
            }
            else if(st_name.indexOf("黄色") > -1){
              dafengWarning.value = "黄色";         
            }
            else if(st_name.indexOf("橙色") > -1){
               dafengWarning.value = "橙色";        
            } 
            else if(st_name.indexOf("红色") > -1){
               dafengWarning.value = "红色";        
            }            
          }
        }
      })
      .catch((err) => {});
  })
}

// 颜色
function computedStyle(type) {  
  var fontColor="rgb(185, 182, 182)";
  if(type == "暴雨"){
    if(rainstorm.value == "蓝色"){
      fontColor="rgb(22, 164, 243)";
    }
    else if(rainstorm.value == "黄色"){
      fontColor="rgb(255, 255, 0)";
    }
    else if(rainstorm.value == "橙色"){
      fontColor="rgb(255, 165, 0)";
    }
    else if(rainstorm.value == "红色"){
      fontColor="rgb(255, 0, 0)";
    }
  }
  else if(type == "雷电"){
    if(leidianWarning.value == "蓝色"){
      fontColor="rgb(22, 164, 243)";
    }
    else if(leidianWarning.value == "黄色"){
      fontColor="rgb(255, 255, 0)";
    }
    else if(leidianWarning.value == "橙色"){
      fontColor="rgb(255, 165, 0)";
    }
    else if(leidianWarning.value == "红色"){
      fontColor="rgb(255, 0, 0)";
    }
  }
  else if(type == "大风"){
    if(dafengWarning.value == "蓝色"){
      fontColor="rgb(22, 164, 243)";
    }
    else if(dafengWarning.value == "黄色"){
      fontColor="rgb(255, 255, 0)";
    }
    else if(dafengWarning.value == "橙色"){
      fontColor="rgb(255, 165, 0)";
    }
    else if(dafengWarning.value == "红色"){
      fontColor="rgb(255, 0, 0)";
    }
  }
  return { color: fontColor};
}

function fangda() {
  datekeyDialog.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
  var dialogClass = $(".dialog").css("display");
  if (dialogClass == "block") {
    return false;
  }
  $(".g-rside ").css({ "z-index": 99 });
  $(".g-lside ").css({ "z-index": 90 });
  showDialog.value = true;
  // dateid.value = "yubaoAreaDiv1";
}
</script>

<style scoped>
.table-responsive{
 overflow: hidden;height:100%;width:80%;margin:15px auto;text-align:center;
}
.table-responsive .responsivekuai
{
  height:80px;background-image: linear-gradient(90deg, rgba(14, 141, 246, 0.3) 0%, rgba(26, 44, 83, 0) 100%);padding-left:20px;position:relative;
}
.table-responsive .responsivekuai1{
  height:80px;width:3px;position: relative;background-image: initial;background-position: initial;background-repeat: initial;background-attachment: initial;background-origin: initial;background-clip: initial;background-color: rgb(74, 144, 226);border-radius: 5px;opacity: 1;float:left;
}
.table-responsive .responsivekuai2{
  height:80px;width:3px;position: relative;background-image: initial;background-position: initial;background-repeat: initial;background-attachment: initial;background-origin: initial;background-clip: initial;background-color: rgb(136, 193, 54);border-radius: 5px;opacity: 1;float:left;
}
.table-responsive .responsivetitle{
 font-size:14px;height:25px;line-height:35px;color:var(--title2);
  padding-left:30px;
}
.table-responsive .responsivecontent{
 font-size:26px;height:40px;line-height:40px;
}
.table-responsive .responsivecontentvalue{
  font-size:18px;font-family: 'number';font-weight: 600;color: rgb(27, 137, 243);
  padding-left:30px;
}
.table-responsive .imgdiv{
  position:absolute;
  top:10px;
}
</style>
