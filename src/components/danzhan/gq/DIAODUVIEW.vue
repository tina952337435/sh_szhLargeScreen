<template></template>
<script setup>
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, defineAsyncComponent, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const zmGQdata = ref([])
const bzGQdata = ref([])
const stcd = inject("stcd");
const stcdzm = inject("stcdzm");
const stcdbz = inject("stcdbz");
const flpq = inject("flpq");
const grq = inject("grq");
const tableData = ref([])

function Weacontent() {
    var strParam = {};
    var nowTM = new Date();
    strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD 00:00:00")).add(-2, "month").format("YYYY-MM-DD 00:00:00");
    strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD 23:59:59");
    api.DDU_DIAODU(strParam).then(res => {
        var strJson = res.result.data;
        if (strJson.length > 0) {
            var Diaodu = strJson.filter(function (e) {
                return e.flag == "5";
            });
            if (Diaodu.length > 0) {
                
            }
        }
        console.error("strJsonstrJsonstrJson", strJson)
    }).catch(err => { });
}

onMounted(() => {
    $(".componentdiv").css({
        height: "calc(100% - 30px)"
    });
    if (_theme == "BlueTheme") {
        $(".popContent").css("background", "#031426 !important");
        $(".content").css("background", "#031426e6 !important");
    }
    Weacontent();
});
</script>
<style scoped>
.table1 {
    width: 98%;
}

.zmtable,
.bztable {
    display: none;
}

.table1 tr td:nth-child(odd) {
    border: 1px solid #3b4b59;
    /* line-height: 44px; */
    height: 44px;
    width: 15%;
    color: rgba(255, 255, 255, 0.7);
}

.table1 tr td:nth-child(even) {
    border: 1px solid #3b4b59;
    /* line-height: 44px; */
    height: 44px;
    width: 35%;
    color: rgba(255, 255, 255, 0.7);
}

.CssTitle {
    font-size: 16px;
    font-weight: 600;
    height: 60px;
    text-align: center;
    width: 100%;
    color: #fff;
}

.lie1 {
    background: rgb(4 64 103);
    text-align: center;
    color: #fff;
}

.lie2 {
    text-align: left;
    font-size: 14px;
    padding: 10px;
    width: 35%;
    color: #fff;
}

/* 自定义滚动条样式 */
.form1::-webkit-scrollbar {
    width: 1px;
    /* 设置滚动条宽度 */
}

.form1::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    background: var(--mtabletrcolor);
    border-radius: 50%;
    z-index: 2;
}
</style>
