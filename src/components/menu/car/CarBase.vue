<template>
    <div class="m-box m-box-3" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2">泵车信息</p>
            <div style="width:calc(100% - 120px);" class="div-swiper">
                <div class="swiper-slide" style="width: 25%;"
                    :class="swiper == '全部' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('全部')">
                    全部</div>
                <div class="swiper-slide" style="width: 25%;"
                    :class="swiper == '市级' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('市级')">
                    市级</div>
                <div class="swiper-slide" style="width: 25%;" id="swiperName"
                    :class="swiper == '县区级' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('县区级')">
                    县区级
                </div>
                <div class="swiper-slide" style="width:25%;"
                    :class="swiper == '街道' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('街道')">
                    街道
                </div>
            </div>

            <ul id="swiperUl">
                <li id="区县级">区县级</li>
                <li id="吴江区">吴江区</li>
                <li id="相城区">相城区</li>
                <li id="姑苏区">姑苏区</li>
                <li id="苏州工业园区">苏州工业园区</li>
                <li id="高新区">高新区</li>
            </ul>
        </div>
        <div class="txt">
            <el-table :data="tableData" @row-click="handleclick"
                style="width: 96%;height:100%;--el-table-border-color:none;margin:auto;">
                <el-table-column type="index" label="序号" width="50" header-align="center" align="center" />
                <el-table-column label="行政区划" prop="district" width="80" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="排涝动力(m³/h)" prop="remark" width="80" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="联系人/电话" prop="column_2" width="80" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="设备类型" prop="car_type" width="80" align="center" :show-overflow-tooltip="true">
                </el-table-column> 
                <el-table-column label="时间" prop="spt" width="80" align="center" :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
        </div>
        <div class="bot"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <CarBase />
    </ComZujian>
</template>
<script setup>
import { useStore } from "vuex";
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted } from "vue";
import { ElMessage, ElTable, ElTableColumn } from "element-plus";
import { groupBy, SetNull,sortObjectArray } from "@/api/ComUnit.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const showDialog = ref(false);
const store = useStore();
const { viewer } = store.state;
const swiper = ref("市级");
const emit = defineEmits(['passValue']);
const tableHeaders = [
    { name: "stnm", label: "名称" },
    { name: "dept", label: "水深" },
    { name: "addvnm", label: "行政区划" },
    { name: "type", label: "类型" },
];
const tableData = ref([]);
const tableDataALL = ref([]);

function Weacontent() {
    api.CarBASESelectList({}).then(res => {
        var strJson = res.result;
        tableDataALL.value = strJson;
        if (strJson.length > 0) {
            var swiperList = groupBy(strJson.filter(item => item.beizhu == "县区级"), "district")
            var strHtml = "";
            strHtml += "<li id='县区级'>县区级</li>";
            if (swiperList.length > 0) {
                for (var i = 0; i < swiperList.length; i++) {
                    var item = swiperList[i][0];
                    strHtml += "<li id='" + item.district + "'>" + item.district + "</li>";
                }
            }
            $("#swiperUl").html(strHtml);
            $("#swiperUl li").click(function () {
                $("#swiperUl li").removeClass("liSelected");
                $(this).addClass("liSelected");
                var objID = $(this).attr("id");
                swiperQX.value = objID;
                // emit('passValue', swiper.value, swiperQX.value);
                GetType("县区级");
                $("#swiperName").html(objID);
                $("#swiperUl").hide();
            });
        }
        GetType("市级");
    }).catch(err => { });
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
function handleclick(evt) {
    let _lgtd = SetNull(evt["lgtd"]);
    let _lttd = SetNull(evt["lttd"]);
    if (_lgtd == "" || _lttd == "") {
        ElMessage.error("缺少经纬度坐标");
    } else {
    }
}
const swiperQX = ref("");
onMounted(() => {
    Weacontent();
});
function GetType(obj) {
    swiper.value = obj;
    if (obj == "县区级") {
        $("#swiperUl").show();
    } else {
        $("#swiperUl").hide();
    }
    loadCar(swiper.value);
}
function loadCar(obj) {
    var strJson = sortObjectArray(tableDataALL.value, ['column_4'], 'desc');;
    if(strJson.length>0){
        for(var num=0;num<strJson.length;num++){
            if(SetNull(strJson[num]["column_4"])==""){
                strJson[num]["spt"]="—";
            }
            else{
                strJson[num]["spt"]=dayjs(SetNull(strJson[num]["column_4"])).format("MM-DD HH:mm");
            }
        }
    }
    var result = [];
    if (strJson.length > 0) {
        if (obj == "市级") {
            result = strJson.filter(item => item.beizhu == "市级" || (item.beizhu).includes("公司") == true);
        } else if (obj == "县区级") {
            if (SetNull(swiperQX.value) != "" && SetNull(swiperQX.value) != "县区级") {
                result = strJson.filter(item => item.beizhu == "县区级" && item.district == swiperQX.value);
            } else {
                result = strJson.filter(item => item.beizhu == "县区级");
            }
        } else if (obj == "街道") {
            if (SetNull(swiperQX.value) != "" && SetNull(swiperQX.value) != "县区级") {
                result = strJson.filter(item => ((item.beizhu).includes("街道") == true || (item.beizhu).includes("新城") == true) && item.district == swiperQX.value);
            } else {
                result = strJson.filter(item => (item.beizhu).includes("街道") == true || (item.beizhu).includes("新城") == true);
            }
        } else if (obj == "全部") {
            result = strJson;
        }
        tableData.value = result;

    }

    emit('passValue', swiper.value, swiperQX.value);
}
</script> 
<style scoped>
@import url('@/assets/styles/Table.css');
@import url('@/assets/styles/swiper.css'); 
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

#swiperUl {
    position: absolute;
    top: 40px;
    right: 60px;
    list-style: none;
    width: 100px;
    font-size: 14px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: var(--boxtitlebg);
    border: var(--portalborder);
    color: var(--sel_wraplabelcolor);
    padding: 0px 0px 0px 0px;
    line-height: 24px;
    display: none;
}

:deep(#swiperUl li) {
    cursor: pointer;
    padding: 0px 0px 0px 6px;
}

:deep(.liSelected) {
    color: var(--sel_wraplabelcolorSel) !important;
    background: var(--popupContentTitleColor);
}
</style>
  