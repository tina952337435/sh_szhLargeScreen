<template>
    <div style="text-align: center;height:100%;">
        <div class="form1" style=" float:left; width:100%;display: inline-block;overflow-y: auto;height: 100%;">
            <table cellspacing='0' cellpadding='0' border='0' class="table1 bztable">
                <tr>
                    <td colspan="4" align="center" class="CssTitle">
                        泵站基础信息
                    </td>
                </tr>
                <tr>
                    <td class="lie1" align="right">位置描述</td>
                    <td class="lie2 View">{{ bzGQdata.pust_loc }} </td>
                    <td class="lie1" align="right">所在河流 </td>
                    <td class="lie2 View">{{ bzGQdata.rv_code_cn }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right">泵站类型</td>
                    <td class="lie2 View"> {{ bzGQdata.pust_type }}</td>
                    <td class="lie1" align="right">工程等别</td>
                    <td class="lie2 View"> {{ bzGQdata.eng_grad }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right"> 装机流量(m³/s)</td>
                    <td class="lie2 View">{{ bzGQdata.ins_flow }} </td>
                    <td class="lie1" align="right"> 装机功率(KW)</td>
                    <td class="lie2 View"> {{ bzGQdata.ins_pow }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right">水泵数量(台) </td>
                    <td class="lie2 View">{{ bzGQdata.pump_num }}</td>
                    <td class="lie1" align="right"> 设计扬程(m)</td>
                    <td class="lie2 View"> {{ bzGQdata.des_head }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right">主要建筑物级别</td>
                    <td class="lie2 View">{{ bzGQdata.main_build_grad }}</td>
                    <td class="lie1" align="right">工程任务</td>
                    <td class="lie2 View">{{ bzGQdata.eng_task }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right">归口管理部门</td>
                    <td class="lie2 View">{{ bzGQdata.adm_dep }}</td>
                    <td class="lie1" align="right">管理单位</td>
                    <td class="lie2 View">{{ bzGQdata.data_source }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right">开工时间</td>
                    <td class="lie2 View">{{ bzGQdata.start_date }}</td>
                    <td class="lie1" align="right">建成时间</td>
                    <td class="lie2 View">{{ bzGQdata.comp_date }}</td>
                </tr>
            </table>
            <table cellspacing='0' cellpadding='0' border='0' class="table1 zmtable">
                <tr>
                    <td colspan="4" align="center" class="CssTitle">
                        闸站基础信息
                    </td>
                </tr>
                <tr>
                    <td class="lie1" align="right">位置描述</td>
                    <td class="lie2 View">{{ zmGQdata.waga_loc }} </td>
                    <td class="lie1" align="right">所在河流 </td>
                    <td class="lie2 View">{{ zmGQdata.rv_code_cn }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right">水闸类型</td>
                    <td class="lie2 View"> {{ zmGQdata.waga_type }}</td>
                    <td class="lie1" align="right">工程等别</td>
                    <td class="lie2 View"> {{ zmGQdata.waga_type }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right"> 闸孔数量</td>
                    <td class="lie2 View">{{ zmGQdata.gaor_num }} </td>
                    <td class="lie1" align="right">闸孔总净宽(m)</td>
                    <td class="lie2 View"> {{ zmGQdata.gaor_tot_net_wid }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right">最大过闸流量(m³/s) </td>
                    <td class="lie2 View">{{ zmGQdata.lock_disc }}</td>
                    <td class="lie1" align="right"> 主要建筑物级别</td>
                    <td class="lie2 View"> {{ zmGQdata.main_build_grad }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right">归口管理部门</td>
                    <td class="lie2 View">{{ zmGQdata.adm_dep }}</td>
                    <td class="lie1" align="right">管理单位</td>
                    <td class="lie2 View">{{ zmGQdata.data_source }}</td>
                </tr>
                <tr>
                    <td class="lie1" align="right">开工时间</td>
                    <td class="lie2 View">{{ zmGQdata.start_date }}</td>
                    <td class="lie1" align="right">建成时间</td>
                    <td class="lie2 View">{{ zmGQdata.comp_date }}</td>
                </tr>
            </table>

            <!-- <div>
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
                        <div class="ClassName">是否是枢纽：<span class="View">{{ tableData.is_hub }}</span></div>
                        <div class="ClassName">是否监测泵站工情：<span class="View">{{ tableData.is_moni_pust }}</span></div>
                        <div class="ClassName">工程规模：<span class="View">{{ tableData.eng_scal }}</span></div>
                        <div class="ClassName">工程建设情况：<span class="View">{{ tableData.eng_stat }}</span></div>
                    </li>
                    <li>
                        <div class="ClassName" style="width:49%;">所在河流：<span class="View">{{ tableData.rv_code_cn }}</span>
                        </div>
                        <div class="ClassName" style="width:49%;">地址：<span class="View">{{ tableData.pust_loc }}</span>
                        </div>
                    </li>
                </ul>
            </div> -->
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
    if (stcdbz.value != "") {
        $(".bztable").css({ display: "table" });
        $(".zmtable").css({ marginTop: "40px" });
        var strParam = {};
        strParam["stcd"] = stcdbz.value;
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
                bzGQdata.value = res.result[0]
            }
        }).catch((err) => { });
    }
    if (stcdzm.value != "") {
        $(".zmtable").css({ display: "table" });
        var strParam = {};
        strParam["stcd"] = stcdzm.value;
        api.stPptnGQWagaBase(strParam).then((res) => {
            if (res.result.length > 0) {
                res.result[0].stcd = stcd.value;
                var item = res.result[0];
                if (item.waga_type == "1") {
                    item.waga_type = "分（泄）洪闸"
                } else if (item.waga_type == "2") {
                    item.waga_type = "节制闸"
                } else if (item.waga_type == "3") {
                    item.waga_type = "排（退）水闸"
                } else if (item.waga_type == "4") {
                    item.waga_type = "引（进）水闸"
                } else if (item.waga_type == "5") {
                    item.waga_type = "当潮"
                } else if (item.waga_type == "6") {
                    item.waga_TYPE = "船闸"
                } else if (item.waga_type == "9") {
                    item.waga_type = "其他"
                }

                if (item.is_hub == "1") {
                    item.is_hub = "是"
                } else if (item.is_hub == "0") {
                    item.is_hub = "否"
                }

                if (item.is_moni_waga == "1") {
                    item.is_moni_waga = "是"
                } else if (item.is_moni_waga == "0") {
                    item.is_moni_waga = "否"
                }
                zmGQdata.value = res.result[0]
            }
        }).catch((err) => { });
    }
}

onMounted(() => {
    $(".componentdiv").css({
        height: "calc(100% - 30px)"
    });
    if (_theme == "BlueTheme") {
        $(".popContent").css("background", "#031426 !important");
        $(".content").css("background", "#031426e6 !important");
    }
    // if (_theme == "BlueTheme") {
    //     $(".popContent").css("background", "#ffffff");
    //     $(".content").css("background", "#ffffff");
    // }
    Weacontent();
});
</script>
<style scoped>
/* .lie2 {
    width: 80%;
}

.table1 tr td:nth-child(odd),
.table1 tr td:nth-child(even) {
border: none;
}

.table1 .trClass {
    background-color: #1571BF;
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
}

.View {
    color: aqua !important;
}

*/
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
