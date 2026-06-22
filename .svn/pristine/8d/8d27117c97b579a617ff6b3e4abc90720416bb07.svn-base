<template>
    <div style="text-align: center;height:100%;">
        <div class="form1" style=" float:left; width:100%;display: inline-block;overflow-y: auto;height: 100%;">
            <div>
                <ul>
                    <li>
                        <div class="ClassName">站码：<span class="View">{{ tableData.stcd }}</span></div>
                        <div class="ClassName">站名：<span class="View">{{ tableData.pust_name }}</span></div>
                        <div class="ClassName">经度：<span class="View">{{ tableData.pust_long }}</span></div>
                        <div class="ClassName">纬度：<span class="View">{{ tableData.pust_lat }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName">泵站类型：<span class="View">{{ tableData.pust_type }}</span></div>
                        <div class="ClassName">工程等别：<span class="View">{{ tableData.eng_grad }}</span></div>
                        <div class="ClassName">装机流量（m³/s）：<span class="View">{{ tableData.ins_flow }}</span></div>
                        <div class="ClassName">装机功率（KW）：<span class="View">{{ tableData.ins_pow }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName">水泵数量（台）：<span class="View">{{ tableData.pump_num }}</span></div>
                        <div class="ClassName">设计扬程（m）：<span class="View">{{ tableData.des_head }}</span></div>
                        <div class="ClassName">主要建筑物级别：<span class="View">{{ tableData.main_build_grad }}</span></div>
                        <div class="ClassName">工程任务：<span class="View">{{ tableData.eng_task }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName">归口管理部门：<span class="View">{{ tableData.adm_dep }}</span></div>
                        <div class="ClassName">管理单位：<span class="View">{{ tableData.data_source }}</span></div>
                        <div class="ClassName">开工时间：<span class="View">{{ tableData.start_date }}</span></div>
                        <div class="ClassName">建成时间：<span class="View">{{ tableData.comp_date }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName">是否是枢纽：<span class="View">{{ tableData.is_HUB }}</span></div>
                        <div class="ClassName">是否监测泵站工情：<span class="View">{{ tableData.is_moni_pust }}</span></div>
                        <div class="ClassName">工程规模：<span class="View">{{ tableData.eng_SCAL }}</span></div>
                        <div class="ClassName">工程建设情况：<span class="View">{{ tableData.eng_stat }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName" style="width:49%;">所在河流：<span class="View">{{ tableData.rv_code_cn }}</span></div>
                        <div class="ClassName" style="width:49%;">地址：<span class="View">{{ tableData.pust_loc }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div style=" float:left; width:59%;display: inline-block;margin-left: 1%;">
            <table cellspacing='0' cellpadding='0' border='0' class="GridView" id='GridView1'
                style=' width: 98%; border-collapse: collapse;'>
                <tr>
                    <td>
                        <iframe id="IframeRight" scrolling="no" frameborder="0" src=""
                            style="width:100%;height:630px;margin-top: 20px;"></iframe>
                    </td>
                </tr>
            </table>
        </div> -->
    </div>
</template>
<script setup>
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, defineAsyncComponent, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const stcd = inject("stcdbz")
const tableData = ref([])

function Weacontent() {
    var strParam = {};
    strParam["stcd"] = stcd.value;
    api.stPptnGQAttPustBase(strParam).then((res) => {
        if (res.result.length > 0) {
            res.result[0].stcd = stcd.value;
            var item = res.result[0];

            if (item.is_hub == "1") {
                item.is_hub = "是"
            } else if (item.is_hub == "0") {
                item.is_hub = "否"
            }

            if (item.is_moni_pust == "1") {
                item.is_moni_pust = "是"
            } else if (item.is_moni_pust == "0") {
                item.is_moni_pust = "否"
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
