<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2">河道过程线</p>
                <span class="spanTitle"></span>
            </div>
            <div style="width:calc(100% - 120px);" class="div-swiper">
                <div class="swiper-slide" style="width: 25%;"
                    :class="Riverswiper == 'SNYH' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('SNYH')">
                    苏南运河
                </div>
                <div class="swiper-slide" style="width: 25%;"
                    :class="Riverswiper == 'WYH' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('WYH')">
                    望虞河</div>
                <div class="swiper-slide" style="width: 25%;"
                    :class="Riverswiper == 'WSJ' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('WSJ')">
                    吴淞江</div>
                <div class="swiper-slide" style="width: 25%;"
                    :class="Riverswiper == 'TPH' && 'swiper-slide swiper-slide-thumb-active'" @click="GetRiver('TPH')">
                    太浦河</div>
            </div>
        </div>
        <div class="txt">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import * as echarts from "echarts";

import { ref, onMounted, reactive, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("danzhanhourDong");
const Riverswiper = ref("SNYH");
const pid = ref("2024103110190061872");
var myData = [];

function Weacontent() {
    var nowTM = new Date();
    var endDate = dayjs(nowTM).format("YYYY-MM-DD HH:00:00");
    var startDate = dayjs(dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")).add(-8, "hour").format("YYYY-MM-DD HH:00:00");
    var strParam = {};
    strParam["stcd"] = $.data(myData, "STCD");
    strParam["stime"] = startDate;
    strParam["etime"] = endDate;
    strParam["pathname"] = "HOUR";
    strParam["datasource"] = "BX";
    api.DuoSel(strParam).then((data) => {
        var dataResult0 = {}, dataResult1 = {}, dataResult2 = {}, dataResult2 = {}, dataResult3 = {}, dataResult4 = {}, dataResult5 = {}, itemColor, dataSW = [], dataName = "";
        var timeDate = [], dataSeries = [];

        var tempData = sortObjectArray(data.result.list, ["tm"], "desc");;
        if (_theme == "BlueTheme" || _theme == "VioletTheme") {
            itemColor = "#000";
        } else if (_theme == "default") {
            itemColor = "#00FFFF";
        }
        if (tempData.length > 0) {
            for (var num = 0; num < 6; num++) {
                var strDate = dayjs(new Date(tempData[num].tm)).format("D日H时");
                timeDate.push(strDate);
                // 去除 tm 字段
                const { tm, ...dataWithoutTm } = tempData[num];

                // 按照 codenameData 顺序获取对应的值
                var orderedData = $.data(myData, "codenameData").map(codename => {
                    let value = dataWithoutTm[codename];
                    if (SetNull(value) !== "") {
                        value = Number(value).toFixed(2);
                    }
                    return value;
                });

                dataSeries.push(orderedData);
                // 确保 dataSeries[num] 存在
                if (num == 0) {
                    dataResult0 = { "title": { "text": strDate, "textStyle": { "color": itemColor } }, "series": { "data": dataSeries[num] } }
                } else if (num == 1) {
                    dataResult1 = { "title": { "text": strDate, "textStyle": { "color": itemColor } }, "series": { "data": dataSeries[num] } }
                } else if (num == 2) {
                    dataResult2 = { "title": { "text": strDate, "textStyle": { "color": itemColor } }, "series": { "data": dataSeries[num] } }
                } else if (num == 3) {
                    dataResult3 = { "title": { "text": strDate, "textStyle": { "color": itemColor } }, "series": { "data": dataSeries[num] } }
                } else if (num == 4) {
                    dataResult4 = { "title": { "text": strDate, "textStyle": { "color": itemColor } }, "series": { "data": dataSeries[num] } }
                } else if (num == 5) {
                    dataSW = dataSeries[num];
                    dataName = strDate;
                    dataResult5 = { "title": { "text": strDate, "textStyle": { "color": itemColor } }, "series": { "data": dataSeries[num] } }
                }
            }
        }
        const _Option = ChartJs.chartHDDong("", timeDate.reverse(), $.data(myData, "stnmData"), _theme, dataSW, dataName, dataResult0, dataResult1, dataResult2, dataResult3, dataResult4, dataResult5);
        lineOption.value = _Option;
        datekey.value = Date.now();
    }).catch((err) => {
        console.error(err);
    });
}
function GetRiver(obj) {
    Riverswiper.value = obj;
    if (obj == "SNYH") {
        pid.value = "2024103110190061872"
    } else if (obj == "WYH") {
        pid.value = "2025061316382445954"
    } else if (obj == "WSJ") {
        pid.value = "2023061517201546817"
    } else if (obj == "TPH") {
        pid.value = "2025061316472291178"
    }
    var nowTM = new Date();
    var endDate = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
    var startDate = dayjs(dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")).add(-3, "hour").format("YYYY-MM-DD HH:mm:ss");
    var strParam = {};
    strParam["pid"] = pid.value;
    strParam["stime"] = startDate;
    strParam["etime"] = endDate;
    api.stPptnSQRiver(strParam).then((res) => {
        const strJson = res.result;
        var strID = "", strNote = [], codenameData = [], stnmData = [];
        var _column = {};
        _column["name"] = "时间";
        _column["codename"] = "tm";
        _column["tableV"] = "1";
        _column["isShow"] = true;
        strNote.push(_column);
        if (strJson.length > 0) {
            for (var I = 0; I < strJson.length; I++) {
                var stcd = strJson[I]["stcd"].replaceAll(" ", "");
                strID += stcd + ",";

                _column = {};
                _column["name"] = strJson[I]["stnm"];
                _column["codename"] = stcd + "upz";
                _column["tableV"] = "1";
                _column["isShow"] = true;
                strNote.push(_column);
                stnmData.push(strJson[I]["stnm"])
                codenameData.push(stcd + "upz")
            }
            // 去除 SMSTXT 字符串最后一个,
            if (strID.endsWith(",")) {
                strID = strID.slice(0, -1);
            }
        }
        $.data(myData, "stnmData", stnmData);
        $.data(myData, "codenameData", codenameData);
        $.data(myData, "STCD", strID);
        Weacontent();
    }).catch((err) => { });
}
onMounted(() => {
    // Weacontent();
    GetRiver(Riverswiper.value);
});
</script> 
  