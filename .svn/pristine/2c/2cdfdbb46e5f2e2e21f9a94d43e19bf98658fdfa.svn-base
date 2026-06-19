<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">服务</p>
            </div>
        </div>
        <div class="txt">
            <div class="zfgz">
                <div class="zfzgTit"><img src="/images/fuwu-icon.png" alt=""><span>政府/公众</span></div>
                <div class="zfgzCon flexDiv flexSB">
                    <div class="zfgzItem">
                        <div class="sjsh flexDiv flexC">数据发布</div>
                        <div class="yearMonth flexDivCol flexSA bg1">
                            <div class="year flexDiv flexSB">
                                <div>本年</div>
                                <div><span>208403</span>万条</div>
                            </div>
                            <div class="month flexDiv flexSB">
                                <div>本月</div>
                                <div><span>10804</span>万条</div>
                            </div>
                        </div>
                    </div>
                    <div class="zfgzItem">
                        <div class="sjsh flexDiv flexC">社会服务</div>
                        <div class="yearMonth flexDivCol flexSA bg2">
                            <div class="year flexDiv flexSB">
                                <div>本年</div>
                                <div><span>534.76</span>万条</div>
                            </div>
                            <div class="month flexDiv flexSB">
                                <div>上月</div>
                                <div><span>60.9</span>万条</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="yearBox">
                <div class="yearTab flexDiv">
                    <img src="/images/fuwu-icon.png" alt="">
                    <div style="margin: 0;width: 140px;" class="div-swiper">
                        <div class="swiper-slide" style="width: 50%;"
                            :class="Yearswiper == 'qunian' && 'swiper-slide swiper-slide-thumb-active'"
                            @click="GetYear('qunian')">
                            去年</div>
                        <div class="swiper-slide" style="width: 50%;"
                            :class="Yearswiper == 'jinnian' && 'swiper-slide swiper-slide-thumb-active'"
                            @click="GetYear('jinnian')">
                            今年以来</div>
                    </div>
                </div>
                <div class="typeBox flexDiv flexSB">
                    <div class="fwTypeItem flexDivCol flexC"><img src="/images/fuwu1.png" alt="">
                        <div>水文简报</div>
                        <div><span>248</span>期</div>
                    </div>
                    <div class="fwTypeItem flexDivCol flexC"><img src="/images/fuwu2.png" alt="">
                        <div>洪水预报</div>
                        <div><span>2.1</span>万站次</div>
                    </div>
                    <div class="fwTypeItem flexDivCol flexC"><img src="/images/fuwu3.png" alt="">
                        <div>洪水预警</div>
                        <div><span>296</span>站次</div>
                    </div>
                    <div class="fwTypeItem flexDivCol flexC"><img src="/images/fuwu4.png" alt="">
                        <div>山洪预警</div>
                        <div><span>698</span>县次</div>
                    </div>
                    <div class="fwTypeItem flexDivCol flexC yxBg"><img src="/images/fuwu5.png" alt="">
                        <div>干旱预警</div>
                        <div><span>71</span>县次</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TableFuwu />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElButton, ElMessage, ElTable, ElTableColumn } from "element-plus";
import { setZOOM, dyCenter } from "@/utils/ArcGis/MapComm.js";
import { useStore } from "vuex";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const store = useStore();
const { viewer } = store.state;
const Yearswiper = ref('qunian');
const datekey = ref(null);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
function Weacontent() {
}
function GetYear(year) {
    Yearswiper.value = year;
    Weacontent();
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 90 });
    $(".g-rside ").css({ "z-index": 90 });
    $(".g-bside ").css({ "z-index": 0 });
    showDialog.value = true;
}
onMounted(() => {
    GetYear(Yearswiper.value);
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

.zfgz {
    width: 96%;
    height: 100px;
    margin: 0 auto;
}

.zfgz .zfzgTit {
    width: 100%;
    height: 20px;
    margin-top: 6px;
    font-family: largeFont;
    font-size: 16px;
    color: var(--title2);
    letter-spacing: 2px;
    font-weight: 400;
}

.zfgz .zfzgTit span {
    vertical-align: 4px;
}

.zfgz .zfgzCon {
    width: 100%;
    height: calc(100% - 40px);
}

.flexSB {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.zfgz .zfgzCon .zfgzItem {
    width: 200px;
    height: 100%;
    margin-top: 10px;
}

.zfgz .zfgzCon .zfgzItem .sjsh {
    width: 100%;
    height: 28px;
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

.zfgz .zfgzCon .zfgzItem .yearMonth {
    width: 100%;
    height: 50px;
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

.zfgz .zfgzCon .zfgzItem .yearMonth .year,
.zfgz .zfgzCon .zfgzItem .yearMonth .month {
    width: 130px;
    margin-left: 30px;
}

.zfgz .zfgzCon .zfgzItem .yearMonth .year span {
    font-family: 'number';
    font-size: 16px;
    color: var(--titled1);
    letter-spacing: 0;
    text-align: right;
    font-weight: 800;
}

.zfgz .zfgzCon .zfgzItem .yearMonth .month span {
    font-family: 'number';
    font-size: 16px;
    color: #00fd6d;
    letter-spacing: 0;
    text-align: right;
    font-weight: 800;
}

.yearBox {
    width: 96%;
    height: calc(100% - 112px);
    margin: 5px auto 0px;
}

.yearBox .yearTab {
    font-family: largeFont;
    font-size: 16px;
    color: #c4eafb;
    letter-spacing: 2px;
    font-weight: 400;
}

.yearBox .typeBox {
    width: 98%;
    height: calc(100% - 40px);
    margin: 6px auto 0px;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.flexSB {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.yearBox .typeBox .fwTypeItem {
    font-size: 14px;
    color: var(--mtablecolor);
    letter-spacing: 0;
    text-align: center;
    line-height: 18px;
    font-weight: 400;
    width: 80px;
    height: 100%;
    background-image: url(/images/projectBg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
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
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.yearBox .typeBox .fwTypeItem img {
    margin-bottom: 8px;
    border-style: none;
}

.yearBox .typeBox .fwTypeItem span {
    font-family: 'number';
    font-size: 18px;
    color: var(--titled1);
    letter-spacing: 0;
    font-weight: 800;
    margin-top: 4px;
}
</style>