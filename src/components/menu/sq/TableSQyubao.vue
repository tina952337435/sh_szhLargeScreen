<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
            style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">预报</p>
            </div>
        </div>
        <div class="txt">
            <!-- <div class="zfgzCon flexDiv flexSB">
                <div class="zfgzItem">
                    <div class="sjsh flexDiv flexC">预报次数</div>
                    <div class="yearMonth flexDivCol flexSA bg1">
                        <div class="year flexDiv flexSB">
                            <div>本年</div>
                            <div><span>560</span>次</div>
                        </div>
                        <div class="month flexDiv flexSB">
                            <div>去年</div>
                            <div><span>513</span>次</div>
                        </div>
                    </div>
                </div>
                <div class="zfgzItem">
                    <div class="sjsh flexDiv flexC">预报站数</div>
                    <div class="yearMonth flexDivCol flexSA bg2">
                        <div class="year flexDiv flexSB">
                            <div>本年</div>
                            <div><span>36</span>站</div>
                        </div>
                        <div class="month flexDiv flexSB">
                            <div>去年</div>
                            <div><span>33</span>站</div>
                        </div>
                    </div>
                </div>
            </div> -->

            <div class="top flexDiv flexSB">
                <div class="topItem flexDivCol flexC">
                    <div class="name">预报方案</div>
                    <div class="num"><span>516</span>期</div>
                </div>
                <div class="topItem flexDivCol flexC">
                    <div class="name">预报站数</div>
                    <div class="num"><span>36</span>个</div>
                </div>
                <div class="topItem flexDivCol flexC">
                    <div class="name">太湖水位预报精度</div>
                    <div class="num"><span>95</span>%(优)</div>
                </div>
            </div>
            <div style="width: 100%;height: calc(100% - 80px);">
                <EchartsList :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
                <!-- <div class="gcl flexDiv flexC">站点类型</div>
                <div class="gc-item flexDivCol flexC">
                    <img src="/images/ybsw-icon.png" alt="">
                    <div class="name">水位</div>
                    <div class="num">26</div>
                </div>
                <div class="gc-item flexDivCol flexC">
                    <img src="/images/ybzb-icon.png" alt="">
                    <div class="name">闸坝</div>
                    <div class="num">5</div>
                </div>
                <div class="gc-item flexDivCol flexC">
                    <img src="/images/ybsk-icon1.png" alt="">
                    <div class="name">水库</div>
                    <div class="num">3</div>
                </div> -->
            </div>
        </div>
        <div class="bot leftBottom-radius" style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
        </div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableSQyubao />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import EchartsList from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
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
const Typeswiper = ref('day');
const datekey = ref(null);
const dateid = ref('yubaozhandian');
const lineOption = ref({});
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
function Weacontent() {
    const strJson = [
        { stnm: "上海市", num: 10 },
        { stnm: "浙江省", num: 11 },
        { stnm: "江苏省", num: 8 },
        { stnm: "安徽省", num: 5 },
        { stnm: "福建省", num: 2 },
    ]
    const strNote = [];
    strNote.push({ name: "名称", codename: "stnm", tableV: "0", isShow: true });
    strNote.push({ name: "个数", codename: "num", tableV: "0", isShow: true });
    var LineColor = ["#3E8BFF", "#1CB8B2", "#01DDFF", "#F9C823", "#0264FD", "#FE7923", "#8E30FF",];
    const _Option = ChartJs.chartYL("", strJson, strNote, LineColor, "站点(个)", "true", _theme, "时间", "", 0);
    lineOption.value = _Option;
    _Option.grid.bottom = 10;
    datekey.value = Date.now();
}
function GetType(type) {
    Typeswiper.value = type;
    // localStorage.setItem("zonglanWord", type);
    Weacontent();
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
    dateid.value='yubaozhandian1'
}
onMounted(() => {
    GetType(Typeswiper.value);
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
.zfgzCon {
    width: 96%;
    margin: 0 auto;
    height: 100%;
}

.flexSB {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.zfgzCon .zfgzItem {
    width: 200px;
    height: 100%;
    margin-top: 10px;
}

.zfgzCon .zfgzItem .sjsh {
    width: 100%;
    height: 32px;
    background-image: url(/images/fw_zf.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-family: largeFont;
    font-size: 16px;
    color: #c4eafb;
    letter-spacing: 2px;
    font-weight: 400;
}

.flexC {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.flexDiv {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.zfgzCon .zfgzItem .yearMonth {
    width: 100%;
    height: 60px;
    line-height: 30px;
    background-image: url(/images/fuwu-shuju.png);
    background-size: 100% 50%;
    background-position: 0 40%;
    background-repeat: no-repeat;
    font-size: 14px;
    color: var(--mtablecolor);
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
}

.zfgzCon .zfgzItem .yearMonth .year,
.zfgzCon .zfgzItem .yearMonth .month {
    width: 120px;
    margin-left: 50px;
}

.zfgzCon .zfgzItem .yearMonth .year span {
    font-family: 'number';
    font-size: 16px;
    color: var(--titled1);
    letter-spacing: 0;
    text-align: right;
    font-weight: 800;
}

.zfgzCon .zfgzItem .yearMonth .month span {
    font-family: 'number';
    font-size: 16px;
    color: #00fd6d;
    letter-spacing: 0;
    text-align: right;
    font-weight: 800;
}

.top {
    width: 96%;
    height: 60px;
    margin: 6px auto;
}

.topItem {
    width: 136px;
    height: 100%;
    background-image: url(/images/zb_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 14px;
    color: var(--mtablecolor);
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
}

.topItem .name {
    margin-top: 6px;
}

.topItem .num span {
    font-family: 'number';
    font-size: 20px;
    color: var(--titled1);
    letter-spacing: 0;
    font-weight: 400;
    margin-right: 5px;
}

.flexDiv {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.flexDivCol {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.flexC {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.proBox {
    width: 96%;
    margin: 0 auto;
    height: calc(100% - 60px);
}

.proBox .gcl {
    width: 60px;
    height: 100%;
    max-height: 160px;
    background-image: url(/images/projectType.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 14px;
    color: #eff;
    letter-spacing: 0.6rem;
    line-height: 20px;
    font-weight: 600;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    text-orientation: upright;
    padding-right: 10px;
}

.proBox .gc-item {
    width: 26%;
    margin-left: 3%;
    height: 100%;
    max-height: 160px;
    background-image: url(/images/projectBg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.proBox .gc-item .name {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
}

.proBox .gc-item .num {
    font-family: 'number';
    font-size: 16px;
    color: #86fcfd;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    margin-top: 6px;
}
</style>