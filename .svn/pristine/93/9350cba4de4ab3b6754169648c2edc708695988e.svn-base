<template>
    <div class="m-box" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2"
            style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">值班安排</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt" style="height:calc(calc(100vh - 28.825rem)*(2/6));">
            <div class="table-responsive" style="height:100%;margin: 0 0 0 2%;">
                <tr>
                    <div class="widget yellow-bg p-lg"
                        style="margin-top: 10px;width: 48%;display: inline-block;height: 95%;">
                        <div class="m-b-md">
                            <div class="zhibanTitle">
                                <i class="fa fa-user fa-1g" style="font-size:28px;color:#00ffff;"></i>
                                今日
                            </div>
                            <div>
                                <span class="zhibanLeftTitle">带班：</span>
                                <span class="zhibanRightValue" id="RtodayDaiBan">姜桂花</span>
                            </div>
                            <div style="clear: both;"></div>
                            <div>
                                <span class="zhibanLeftTitle">白班：</span>
                                <span class="zhibanRightValue" id="RtodayZhiBan">季海萍</span>
                            </div>
                            <div style="clear: both;"></div>
                            <div>
                                <span class="zhibanLeftTitle">晚班：</span>
                                <span class="zhibanRightValue" id="RtodayZhiBanW">姜悦美</span>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </tr>
                <tr>
                    <div class="widget blue-bg p-lg"
                        style="margin-left:2%;margin-top: 10px;width: 48%;display: inline-block;height: 95%;">
                        <div class="m-b-md">
                            <div class="zhibanTitle">
                                <i class="fa fa-user fa-1g" style="font-size:28px;color:#00ffff;"></i>
                                明日
                            </div>
                            <div>
                                <span class="zhibanLeftTitle">带班：</span>
                                <span class="zhibanRightValue" id="RtomorrowDaiBan">姜桂花</span>
                            </div>
                            <div style="clear: both;"></div>
                            <div>
                                <span class="zhibanLeftTitle">白班：</span>
                                <span class="zhibanRightValue" id="RtomorrowZhiBan">季海萍</span>
                            </div>
                            <div style="clear: both;"></div>
                            <div>
                                <span class="zhibanLeftTitle">晚班：</span>
                                <span class="zhibanRightValue" id="RtomorrowZhiBanW">姜悦美</span>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </tr>
            </div>
        </div>
        <div class="bot leftBottom-radius" style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <Tablezhiban />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import customTable from "@/components/Table/customTable.vue";
import api from "@/api/zonglan/index.js";
import TableJs from "@/api/Table/TableJs.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, defineAsyncComponent, h } from "vue";
import { SetNull } from "@/api/ComUnit";
import { ElMessage } from "element-plus";
import Dialog from "@/api/utils/Dialog.js";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const tableHeaders = ref([
    { name: "name", label: "水文数据共享" },
    { name: "total", label: "报汛站数" },
    { name: "anum", label: "省发数据" },
    { name: "snum", label: "已发数据 " },
    { name: "fnum", label: "发送失败数据" },
    // { name: "paiBili", label: "网咯链接" },
]);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);

const Typeswiper = ref('yuntu');
function GetType(type) {
    Typeswiper.value = type;
}
function Weacontent() {
    var result = [
        { name: "水利部水文局", total: "26", anum: "0", snum: "2612", fnum: "0", },
        { name: "报汛代遥测(浙闽)", total: "8815", anum: "0", snum: "401115", fnum: "0", },
        { name: "上海市防汛信息中心", total: "79", anum: "0", snum: "12963", fnum: "0", },
        { name: "江苏省水文水资源勘测局", total: "84", anum: "0", snum: "14266", fnum: "0", },
        { name: "浙江省水文局", total: "11", anum: "0", snum: "1387", fnum: "0", },
        { name: "安徽省水文局", total: "1", anum: "0", snum: "592", fnum: "0", },
    ]
    var colorCss = "#00e4ff";
    if (_theme == "BlueTheme") {
        colorCss = "#5794ff";
    } else {
        if (_theme == "VioletTheme") {
            colorCss = "#6457de";
        }
    }
    // 计算合计值
    const totalObj = { name: "合计", total: "0", anum: "0", snum: "0", fnum: "0", colorCss: colorCss };

    // 遍历数组计算每个字段的总和
    result.forEach(item => {
        totalObj.total = (parseInt(totalObj.total) + parseInt(item.total)).toString();
        totalObj.anum = (parseInt(totalObj.anum) + parseInt(item.anum)).toString();
        totalObj.snum = (parseInt(totalObj.snum) + parseInt(item.snum)).toString();
        totalObj.fnum = (parseInt(totalObj.fnum) + parseInt(item.fnum)).toString();
    });

    // 将合计行插入到数组最前面
    result.unshift(totalObj);
    tableData.value = result;
}

function handleclick(evt) {
    const name = evt.target.innerText;
    const strJson = tableData.value.find(item => item.stnm === name);
    const ChildVue = defineAsyncComponent(() =>
        import("@/components/danzhan/sq/SQLine.vue")
    );
    const props = {};
    props["stcd"] = strJson["stcd"];
    props["stime"] = dayjs(new Date()).add(-24, "hour").format("YYYY-MM-DD HH:mm:ss");
    props["etime"] = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    props["mtype"] = strJson["mtype"];
    //ChildVue为弹窗中嵌入的slot
    Dialog.open({ title: strJson["stnm"] + "水位过程线", widh: 1500, heig: 700 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 0 });
    $(".g-rside ").css({ "z-index": 0 });
    showDialog.value = true;
}
onMounted(() => {
    Weacontent();
});
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
:deep(tr td:nth-child(1)) {
    width: 20vh !important;
}

tr td:nth-child(2) {
    width: 15vh;
}

tr td:nth-child(3) {
    width: 15vh;
}

tr td:nth-child(4) {
    width: 10vh;
}

tr td:nth-child(5) {
    width: 12vh;
}

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
    background: var(--mtabletrcolor);
    z-index: 2;
}

.p-lg {
    padding: 30px;
}

.yellow-bg {
    /* background-color: #f8ac59; */
    color: #ffffff;
}

.lazur-bg {
    background-color: #23c6c8;
    color: #ffffff;
}

.blue-bg {
    /* background-color: #1c84c6; */
    color: #ffffff;
}

.purple-bg {
    background-color: #6D92FC;
    color: #ffffff;
}

.red-bg {
    background-color: #ff0e29;
    color: #ffffff;
}

.widget {
    border-radius: 5px;
    padding: 5px 15px;
    margin-bottom: 10px;
}

.yellow-bg,
.blue-bg {
    /* background: linear-gradient(to right, var(--mtabletrcolor) 0%, #012849 20%, var(--titled2) 65%, #02131B 100%); */
    background: linear-gradient(to right, #022e53 0%, #012849 20%, #011933 65%, #02131B 100%);
    color: var(--mtablecolor);
}

.zhibanTitle {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-family: 'largeFont';
    font-weight: 800;
    color: var(--titled1);
}

.zhibanLeftTitle {
    font-size: 14px;
    float: left;
    width: 50px;
    text-align: left;
    /*padding: 3px 0px;*/
    height: 2.5rem;
    line-height: 2.5rem;
}

.zhibanRightValue {
    float: left;
    width: 113px;
    text-align: left;
    font-weight: 700;
    color: var(--titled1);
    font-size: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
}


#mainlistechartright3 .zhibanTitle {
    height: 100px;
    line-height: 100px;
    font-size: 26px;
}

#mainlistechartright3 .zhibanLeftTitle {
    font-size: 22px;
    float: left;
    width: 100px;
    text-align: left;
    /*padding: 3px 0px;*/
    height: 100px;
    line-height: 100px;
}

#mainlistechartright3 .zhibanRightValue {
    float: left;
    width: 260px;
    text-align: left;
    font-weight: 700;
    color: var(--titled1);
    font-size: 30px;
    height: 100px;
    line-height: 100px;
}
</style>
