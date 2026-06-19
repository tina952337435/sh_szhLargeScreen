<template>
    <div style="text-align: center;height:100%;">
        <div class="form1" style=" float:left; width:100%;display: inline-block;overflow-y: auto;height: 100%;">
            <div>
                <ul>
                    <li>
                        <div class="ClassName">站码：<span class="View">{{ tableData.stcd }}</span></div>
                        <div class="ClassName">站名：<span class="View">{{ tableData.waga_NAME }}</span></div>
                        <div class="ClassName">经度：<span class="View">{{ tableData.start_LONG }}</span></div>
                        <div class="ClassName">纬度：<span class="View">{{ tableData.start_LAT }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName">水闸类型：<span class="View">{{ tableData.waga_TYPE }}</span></div>
                        <div class="ClassName">工程等别：<span class="View">{{ tableData.eng_GRAD }}</span></div>
                        <div class="ClassName">闸孔数量：<span class="View">{{ tableData.gaor_NUM }}</span></div>
                        <div class="ClassName">闸孔总净宽：<span class="View">{{ tableData.gaor_TOT_NET_WID }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName">最大过闸流量(m3/s)：<span class="View">{{ tableData.lock_DISC }}</span></div>
                        <div class="ClassName">主要建筑物级别：<span class="View">{{ tableData.main_BUILD_GRAD }}</span></div>
                        <div class="ClassName">归口管理部门：<span class="View">{{ tableData.adm_DEP }}</span></div>
                        <div class="ClassName">管理单位：<span class="View">{{ tableData.data_SOURCE }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName">开工时间：<span class="View">{{ tableData.start_DATE }}</span></div>
                        <div class="ClassName">建成时间：<span class="View">{{ tableData.comp_DATE }}</span></div>
                        <div class="ClassName">是否是枢纽：<span class="View">{{ tableData.is_HUB }}</span></div>
                        <div class="ClassName">是否监测水闸工情：<span class="View">{{ tableData.is_MONI_WAGA }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName">工程建设情况：<span class="View">{{ tableData.eng_STAT }}</span></div>
                        <div class="ClassName">工程规模：<span class="View">{{ tableData.eng_SCAL }}</span></div>
                        <div class="ClassName">所在河流：<span class="View">{{ tableData.rv_CODE_CN }}</span></div>
                        <div class="ClassName">所在村落：<span class="View">{{ tableData.waga_VLG }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName" style="width:98%">地址：<span class="View">{{ tableData.waga_LOC }}</span></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, defineAsyncComponent, inject } from "vue";
import { isTomorrow } from "date-fns";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const stcd = inject("stcdzm")
const tableData = ref([])

function Weacontent() {
    var strParam = {};
    strParam["stcd"] = stcd.value;
    api.stPptnGQWagaBase(strParam).then((res) => {
        if (res.result.length > 0) {
            res.result[0].stcd = stcd.value;
            var item = res.result[0];
            if (item.waga_TYPE == "1") {
                item.waga_TYPE = "分（泄）洪闸"
            } else if (item.waga_TYPE == "2") {
                item.waga_TYPE = "节制闸"
            } else if (item.waga_TYPE == "3") {
                item.waga_TYPE = "排（退）水闸"
            } else if (item.waga_TYPE == "4") {
                item.waga_TYPE = "引（进）水闸"
            } else if (item.waga_TYPE == "5") {
                item.waga_TYPE = "当潮"
            } else if (item.waga_TYPE == "6") {
                item.waga_TYPE = "船闸"
            } else if (item.waga_TYPE == "9") {
                item.waga_TYPE = "其他"
            }

            if (item.is_HUB == "1") {
                item.is_HUB = "是"
            } else if (item.is_HUB == "0") {
                item.is_HUB = "否"
            }

            if (item.is_MONI_WAGA == "1") {
                item.is_MONI_WAGA = "是"
            } else if (item.is_MONI_WAGA == "0") {
                item.is_MONI_WAGA = "否"
            }
            tableData.value = res.result[0]
        }
    }).catch((err) => { });
}

onMounted(() => {
    $(".componentdiv").css({
        height: "calc(100% - 30px)"
    });
    Weacontent();
});
</script>
<style scoped>
.lie2 {
    width: 80%;
}

.CssTitle {
    color: white;
}

.table1 tr td:nth-child(odd),
.table1 tr td:nth-child(even) {
    /* border: 1px solid #767d83; */
    border: none;
}

.table1 .trClass {
    background-color: cadetblue;
}

.lie1 {
    opacity: .8;
    background: none;
    text-align: center;
    color: #ccc;
}

.lie2 {
    color: #fff;
}

ul {
    padding: 0px;
    margin: 20px 0px 0px 0px;
}

ul li {
    list-style: none;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    margin-bottom: 15px;
}

ul li div {
    display: inline-block;
    width: 24.5%;
}

.ClassName {
    background: linear-gradient(to right, #022e53 0%, #012849 20%, #011933 65%, #02131B 100%);
    font-weight: normal;
    color: #ccc;
    font-size: 14px;
    text-align: left;
    padding-left: 30px;
}

.ClassName span {
    font-weight: bold;
    color: #fff;
}

.classID {
    background: linear-gradient(to right, #023864 0%, #011933 90%);
    /* margin-left: 1%; */
}

.View {
    color: aqua !important;
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
