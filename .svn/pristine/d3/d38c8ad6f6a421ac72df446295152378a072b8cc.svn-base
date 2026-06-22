<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
            style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">报表</p>
            </div>
            <div style="width:calc(100% - 220px);margin-left:30px;" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'nei' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('nei')">
                    流域内</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'wai' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('wai')">
                    流域片</div>
            </div>
            <div class="xiala"
                style="right: 5px;top: 6px;position: absolute;width:130px;line-height: 30px;cursor: pointer;">
                <label @click="showItem('SwiperType')" id="labelName"
                    style="position: absolute;right: 26px;font-size: 14px;font-family: var(--calcite-font-family);cursor: pointer;color:var(--mtablecolor);">
                    水雨情分析报告
                </label>
                <img src="/images/icon_select.png" style="position:absolute;right:0px;margin-top: 2px;cursor: pointer;"
                    @click="showItem('SwiperType')">
                <ul class="el-dropdown-menu"
                    style="width:122px;height:212px;overflow-y:auto;margin-top:5px;font-family: var(--calcite-font-family);cursor: pointer;"
                    id="SwiperType">
                    <li v-for="item in SwiperData">{{ item.title }}</li>
                    <!-- <li>水雨情分析报告</li>
                    <li>汛情快报</li>
                    <li>汛期水位预报</li>
                    <li>专题预报</li>
                    <li>周预报</li>
                    <li>月预报</li>
                    <li>警响应单/取消单</li>
                    <li>编号洪水</li> -->
                </ul>
            </div>
            <!-- <div style="width:calc(100% - 110px);margin-left:30px;" class="div-swiper">
                <div class="swiper-slide" style="width: 25%;"
                    :class="Typeswiper == 'day' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('day')">
                    水雨情分析</div>
                <div class="swiper-slide" style="width: 25%;"
                    :class="Typeswiper == 'word' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('word')">
                    汛情快报</div>
                <div class="swiper-slide" style="width: 25%;"
                    :class="Typeswiper == 'yubao' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('yubao')">
                    汛期预报</div>
                <div class="swiper-slide" style="width: 25%;" id="swiperName"
                    :class="Typeswiper == 'more' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('more')">
                    更多</div>
            </div>
            <ul id="swiperUl">
                <li id="专题预报">专题预报</li>
                <li id="周预报">周预报</li>
                <li id="月预报">月预报</li>
                <li id="预警响应单">预警响应单</li>
                <li id="预警取消单">预警取消单</li>
                <li id="编号洪水">编号洪水</li>
            </ul> -->
        </div>
        <div class="txt" style="overflow-y: auto;height:calc(calc(100vh - 28.825rem)*(2/6));">
            <div v-for="(item, index) in tableData" :key="index" class="item-word">
                <img :src="item.img" alt="">
                <div class="title-word" @click="getPDF(item.title, item.wd_file)">{{ item.title }}</div>
                <div class="time-word">{{ item.tm }}</div>
            </div>
        </div>
        <div class="bot leftBottom-radius" style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
        </div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableSQday />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElButton, ElMessage, ElTable, ElTableColumn } from "element-plus";
import { setZOOM, dyCenter } from "@/utils/ArcGis/MapComm.js";
import { useStore } from "vuex";
import Dialog from "@/api/utils/Dialog.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const store = useStore();
const { viewer } = store.state;
const Typeswiper = ref('nei');
const datekey = ref(null);
const tableData = ref([]);
const SwiperData = ref([
    { title: "水雨情分析报告", id: "water" },
    { title: "汛情快报", id: "flood" },
    { title: "汛期水位预报", id: "waterlevel" },
    { title: "专题预报", id: "topic" },
    { title: "周预报", id: "week" },
    { title: "月预报", id: "month" },
    { title: "警响应单/取消单", id: "warning" },
    { title: "编号洪水", id: "hongshui" },
]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
function Weacontent() {
    if (Typeswiper.value == 'nei') {
        var imgUrl = "/images/word/word1.png";
        if (_theme == "BlueTheme") {
            imgUrl = "/images/word/word2.png";
        } else {
            if (_theme == "VioletTheme") {
                imgUrl = "/images/word/word3.png";
            }
        }
        tableData.value = [
            { title: "每日汛情第235期.pdf", wd_file: "/wd_file/太湖水文简报第5期.pdf", tm: "2025-11-13", img: imgUrl },
            { title: "每日汛情第234期.pdf", wd_file: "/wd_file/太湖水文简报第4期.pdf", tm: "2025-11-12", img: imgUrl },
            { title: "每日汛情第232期.doc", wd_file: "/wd_file/太湖水文简报第3期.pdf", tm: "2025-11-11", img: imgUrl },
            { title: "每日汛情第231期.pdf", wd_file: "/wd_file/太湖水文简报第2期.pdf", tm: "2025-11-10", img: imgUrl },
            { title: "每日汛情第230期.pdf", wd_file: "/wd_file/太湖水文简报第1期.pdf", tm: "2025-11-09", img: imgUrl },
            { title: "每日汛情第229期.pdf", wd_file: "/wd_file/太湖水文简报第1期.pdf", tm: "2025-11-09", img: imgUrl },
            { title: "每日汛情第228期.pdf", wd_file: "/wd_file/太湖水文简报第1期.pdf", tm: "2025-11-09", img: imgUrl },
            { title: "每日汛情第227期.pdf", wd_file: "/wd_file/太湖水文简报第1期.pdf", tm: "2025-11-09", img: imgUrl },
            { title: "每日汛情第226期.pdf", wd_file: "/wd_file/太湖水文简报第1期.pdf", tm: "2025-11-09", img: imgUrl },
            { title: "每日汛情第225期.pdf", wd_file: "/wd_file/太湖水文简报第1期.pdf", tm: "2025-11-09", img: imgUrl },
        ];
    } else if (Typeswiper.value == 'wai') {
        var imgUrl = "/images/word/work1.png";
        if (_theme == "BlueTheme") {
            imgUrl = "/images/word/work2.png";
        } else {
            if (_theme == "VioletTheme") {
                imgUrl = "/images/word/work3.png";
            }
        }
        tableData.value = [
            { title: "太湖流域水文水资源监测中心组织召开示范区水文水生态协同监测工作会暨跨界水体健康评估交流会", wd_file: "/wd_file/太湖水文简报第5期.pdf", tm: "2025-11-14", img: imgUrl },
            { title: "回眸“十四五”之统一管理篇丨全面推进生态清洁小流域建设 开启“两山”转化新篇章", wd_file: "/wd_file/太湖水文简报第4期.pdf", tm: "2025-11-12", img: imgUrl },
            { title: "太湖流域管理局开展（第二期）青年互访活动", wd_file: "/wd_file/太湖水文简报第3期.pdf", tm: "2025-11-11", img: imgUrl },
            { title: "太湖流域片节水工作座谈会在常州召开", wd_file: "/wd_file/太湖水文简报第2期.pdf", tm: "2025-11-10", img: imgUrl },
            { title: "回眸“十四五”之统一管理篇丨强化流域河湖长制统筹协调：深耕制度创新，守护碧水安澜", wd_file: "/wd_file/太湖水文简报第1期.pdf", tm: "2025-11-09", img: imgUrl },
        ];
    }
}
function GetType(type) {
    Typeswiper.value = type;
    // localStorage.setItem("zonglanWord", type);
    if (type == 'nei') {
        SwiperData.value = [
            { title: "水雨情分析报告", id: "water" },
            { title: "汛情快报", id: "flood" },
            { title: "汛期水位预报", id: "waterlevel" },
            { title: "专题预报", id: "topic" },
            { title: "周预报", id: "week" },
            { title: "月预报", id: "month" },
            { title: "警响应单/取消单", id: "warning" },
            { title: "编号洪水", id: "hongshui" },
        ]
        $(".xiala").css({ "width": "130px" });
        $("#SwiperType").css({ "height": "212px", "width": "122px" });
    } else {
        SwiperData.value = [
            { title: "海浪预警", id: "ocean" },
            { title: "风暴潮预警", id: "tide" },
            { title: "蓝藻解析", id: "blue" },
            { title: "蓝藻预报", id: "blueforecast" },
        ]
        $(".xiala").css({ "width": "96px" });
        $("#SwiperType").css({ "height": "112px", "width": "90px" });
    }
    $("#labelName").html(SwiperData.value[0].title);
    $("#SwiperType li").click(function (res) {
        $("#SwiperType").css("display", "none");
        var html = $(this).html();
        $("#SwiperType").parent().find("label").html(html);
    });
    Weacontent();
}
function showItem(id) {
    var obj = $("#" + id);
    var dis = obj.css("display");
    if (dis == "block") {
        obj.css("display", "none");
    } else {
        obj.css("display", "block");
    }
}
function getPDF(title, wd_file) {
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 90 });
    $(".g-rside ").css({ "z-index": 99 });
    showDialog.value = true;
}
onMounted(() => {
    GetType(Typeswiper.value);
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
/* 自定义滚动条样式 */
.txt::-webkit-scrollbar {
    width: 2px;
    /* 设置滚动条宽度 */
}

.txt::-webkit-scrollbar-track {
    /* 滚动条轨道 */
    /* background: rgb(49, 139, 167); */
}

.txt::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    background: var(--popContentHeadbg);
    z-index: 2;
}

.item-word {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    background: var(--mtabletrcolor);
    color: var(--mtablecolor);
    border-radius: 6px;
    width: 94%;
    margin: 10px auto 10px;
    position: relative;
}

.item-word img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.item-word .title-word {
    font-size: 14px;
    /* font-weight: bold; */
    width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.item-word .time-word {
    position: absolute;
    right: 10px;
    font-size: 14px;
    opacity: 0.8;
}

.dialog-content .item-word {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    background: var(--mtabletrcolor);
    color: var(--mtablecolor);
    border-radius: 6px;
    width: 100%;
    margin: 10px auto 10px;
    position: relative;
}

.dialog-content .item-word img {
    width: 30px;
    height: 30px;
    margin-right: 20px;
}

.dialog-content .item-word .title-word {
    font-size: 20px;
    font-weight: bold;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.dialog-content .item-word .time-word {
    position: absolute;
    right: 10px;
    font-size: 16px;
    opacity: 0.8;
}

#swiperUl {
    position: absolute;
    top: 40px;
    right: 15px;
    list-style: none;
    width: 90px;
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

/* 自定义滚动条样式 */
.el-dropdown-menu::-webkit-scrollbar {
    width: 2px;
    /* 设置滚动条宽度 */
}

.el-dropdown-menu::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    background: var(--popContentHeadbg);
    z-index: 2;
}
</style>