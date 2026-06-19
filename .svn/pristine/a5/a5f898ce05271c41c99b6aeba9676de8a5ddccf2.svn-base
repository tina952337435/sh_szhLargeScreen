<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">水生态预警</p>
            </div>
            <div style="width:calc(100% - 160px);" class="div-swiper">
                <!-- <div class="swiper-slide" style="width: 50%;"
                    :class="YJswiper == 'hanzai' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('hanzai')">
                    洪旱预警</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="YJswiper == 'shengtai' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('shengtai')">
                    生态流量</div> -->
            </div>
            <!-- <div style="background: var(--portal);border-radius: 6px;border: var(--portalborder);padding: 0px 16px 0px 10px;">
                <div class="sel_wrap" style="position: relative;">
                    <label>当前</label>
                    <img src="/images/icon_select.png" onclick="showItem('FANGANLIST')"
                        style="position: absolute; right: -18px; margin-top: 2px; transform: rotate(90deg);">
                    <ul class="el-dropdown-menu" id="FANGANLIST"></ul>
                </div>
            </div> -->
        </div>
        <div class="txt" style="overflow-y: auto">
            <div class="hhyj-content flexDiv flexSB" style="">
                <div class="warnItem flexDivCol">
                    <div class="top flexDiv">
                        <div class="icon flexDiv flexC">
                            <img src="/images/hongshui.png" alt="">
                        </div>
                        <div class="detail">
                            <div class="name">太湖-五站平均</div>
                            <!-- <div style="display: inline-block;"><span>8</span>/79
                            </div> 站 -->
                        </div>
                    </div>
                    <img src="/images/bottom-line.png" alt="">
                    <div class="warnBox flexDivCol flexSA">
                        <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/hongshui-blue.png" alt="">
                                蓝色预警
                            </div>
                            <div class="warnNum">0</div>
                        </div>
                        <!-- <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/hongshui-yellow.png" alt="">
                                黄色预警
                            </div>
                            <div class="warnNum">1</div>
                        </div> -->
                        <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/hongshui-orange.png" alt="">
                                橙色预警
                            </div>
                            <div class="warnNum">0</div>
                        </div>
                        <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/hongshui-red.png" alt="">
                                红色预警
                            </div>
                            <div class="warnNum">0</div>
                        </div>
                    </div>
                </div>
                <div class="warnItem flexDivCol">
                    <div class="top flexDiv">
                        <div class="icon flexDiv flexC">
                            <img src="/images/sahnhong.png" alt="">
                        </div>
                        <div class="detail">
                            <div class="name">淀山湖、元荡</div>
                            <!-- <div style="display: inline-block;"><span>10</span>/69
                            </div> 县 -->
                        </div>
                    </div>
                    <img src="/images/bottom-line.png" alt="">
                    <div class="warnBox flexDivCol flexSA">
                        <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/sahnhong-blue.png" alt="">
                                蓝色预警
                            </div>
                            <div class="warnNum">0</div>
                        </div>
                        <!-- <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/sahnhong-yellow.png" alt="">
                                黄色预警
                            </div>
                            <div class="warnNum">2</div>
                        </div> -->
                        <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/sahnhong-orange.png" alt="">
                                橙色预警
                            </div>
                            <div class="warnNum">0</div>
                        </div>
                        <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/sahnhong-red.png" alt="">
                                红色预警
                            </div>
                            <div class="warnNum">0</div>
                        </div>
                    </div>
                </div>
                <div class="warnItem flexDivCol">
                    <div class="top flexDiv">
                        <div class="icon flexDiv flexC">
                            <img src="/images/ganhan.png" alt="">
                        </div>
                        <div class="detail">
                            <div class="name">黄浦江-松浦大桥</div>
                            <!-- <div style="display: inline-block;"><span>1</span>/90
                            </div> 县 -->
                        </div>
                    </div>
                    <img src="/images/bottom-line.png" alt="">
                    <div class="warnBox flexDivCol flexSA">
                        <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/ganhan-blue.png" alt="">
                                蓝色预警
                            </div>
                            <div class="warnNum">0</div>
                        </div>
                        <!-- <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/ganhan-yellow.png" alt="">
                                黄色预警
                            </div>
                            <div class="warnNum">0</div>
                        </div> -->
                        <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/ganhan-orange.png" alt="">
                                橙色预警
                            </div>
                            <div class="warnNum">0</div>
                        </div>
                        <div class="warnLine flexDiv flexSB">
                            <div class="warnType flexDiv">
                                <img src="/images/ganhan-red.png" alt="">
                                红色预警
                            </div>
                            <div class="warnNum">0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <EchartSSTYJ />
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
const YJswiper = ref('hanzai');
const datekey = ref(null);
const tableData = ref([
    {
        name: '湖西区',
        value: '30.5'
    },
    {
        name: '浙西区',
        value: '19.2'
    },
    {
        name: '太湖区',
        value: '19.2'
    },
    {
        name: '武澄锡虞区',
        value: '19.2'
    },
    {
        name: '杭嘉湖区',
        value: '19.2'
    },
    {
        name: '阳澄淀泖区',
        value: '19.2'
    },
    {
        name: '浦东浦西区',
        value: '19.2'
    },
]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
function Weacontent() {
}
function GetType(type) {
    YJswiper.value = type;
    Weacontent();
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
onMounted(() => {
    GetType(YJswiper.value);
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

.widget-ylTable-box {
    margin-top: 2px;
    width: 100%;
    height: 80px;
    font-size: 14px;
    float: left;
    overflow: hidden;
    color: var(--widgetcolor);
}

.widget-ylTable-box .liuyupjbg {
    width: 13.4%;
    display: inline-block;
    height: 100%;
    text-align: center;
    padding: 4% 0;
    margin: 0 0.4%;
    background: var(--liuyupjbg);
    background-size: 100% 100%;
    cursor: pointer;
}

.widget-ylTable-box .liuyupjbg p {
    height: 20px;
    font-size: 14px;
    font-weight: bold;
    /* 新增单行文本省略号样式 */
    white-space: nowrap;
    /* 禁止文本换行 */
    overflow: hidden;
    /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
}

.widget-ylTable-box .liuyupjbg h3 {
    font-size: 20px;
}

.hhyj-content {
    width: 98%;
    margin: 0 auto;
    height: 100%;
    overflow: hidden;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: start;
}

.hhyj-content .warnItem {
    width: 32%;
    height: 95%;
    background-image: url(/images/hhyj_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 8px;
    cursor: pointer;
}

.flexSB {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
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
    /* justify-content: space-between; */
}

.hhyj-content .warnItem>.top {
    width: 100%;
    height: 26.4%;
}

.icon {
    width: 48px;
    height: 48px;
    vertical-align: -5px;
    fill: currentColor;
    overflow: hidden;
}

.hhyj-content .warnItem>.top .detail {
    font-size: 14px;
    color: var(--mtablecolor);
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
}

.hhyj-content .warnItem>img {
    margin-top: 5px;
}


.hhyj-content .warnItem .warnBox {
    width: 100%;
    height: 73.6%;
    font-size: 14px;
    color: var(--mtablecolor);
    letter-spacing: 0;
    text-align: center;
    line-height: 35px;
    font-weight: 400;
    margin-top: 3px;
}

.hhyj-content .warnItem .warnBox .warnLine {
    width: 100%;
}

.hhyj-content .warnItem .warnBox .warnLine img {
    margin-right: 3px;
}

.hhyj-content .warnItem>.top .detail span,
.hhyj-content .warnItem .warnBox .warnLine .theNum {
    font-family: 'number';
    font-size: 20px;
    background: -webkit-gradient(linear, left top, left bottom, from(#ed9b42), to(#fef886));
    background: linear-gradient(180deg, #ed9b42, #fef886);
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: 0;
    font-weight: 800;
}
</style>