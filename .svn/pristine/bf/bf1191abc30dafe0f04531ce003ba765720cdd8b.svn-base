<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">气象预警信息</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <div class="outer">
                <div class="alert-box" v-for="(item, index) in strJsonData" :key="index"
                    @click="TransWarning(item.type)" :title="'查看' + item.type + '历史记录'">
                    <div class="alert-name">{{ item.type }}</div>
                    <div class="icon-box"><img :src=item.url></div>
                    <div class="alert-time">{{ item.tm }}</div>
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialogZJ" @close="showDialogZJ = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <Waining />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import dayjs from "dayjs";
import $ from "jquery";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import { onMounted, ref, inject, h } from "vue";
import Dialog from "@/api/utils/Dialog.js";
import api from "@/api/zonglan/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showDialogZJ = ref(false);
// 判断弹窗是否显示,默认隐藏
// 传递弹开页面的标题名称
const titleName = ref();
// 传递雨型的类别：1:(小~中雨);2:(中雨);3:(暴雨);4:(大暴雨);5:(特大暴雨);
const typeValue = ref();

const stime = ref({});
const etime = ref({});
const strJsonData = ref([{ "type": "暴雨", "title": "暴雨", "tm": "09-30 11:06", "url": "/images/warning/byyj_02.png" }, { "type": "强对流", "title": "强对流", "tm": "10-18 05:28", "url": "/images/warning/qdlyj_02.png" }, { "type": "台风", "title": "台风", "tm": "07-31 10:08", "url": "/images/warning/typhoon_blue.png" }, { "type": "高温", "title": "高温", "tm": "09-17 17:27", "url": "/images/warning/wave_yellow.png" }]);
function Weacontent() {
}
function groupByType(arr, key) {
    let result = [];
    arr.forEach(item => {
        let find = result.filter(d => d.groupName == item[key]);
        if (find.length > 0) {
            find[0].groupData.push(item);
        } else {
            let list = [];
            list.push(item);
            result.push({ groupName: item[key], groupData: list });
        }
    });
    return result;
}
function extractedContent(wd_name) {
    // 检查 wd_name 是否为字符串
    if (typeof wd_name !== 'string') {
        return "";
    }
    // 使用正则表达式匹配从第二个“-”到“.docx”之间的内容
    const regex = /-[^-]*-([^.]*)\.docx/;
    const match = wd_name.match(regex);
    return match ? match[1] : "";
}
function firstChar(text) {
    // 获取第一个字符
    return text ? text[0] : "";
}
function middleText(text) {
    // 获取中间的字符串（去掉第一个和最后一个字符）
    if (text && text.length > 2) {
        return text.slice(1, -1);
    }
    return "";
}
function lastChar(text) {
    // 获取最后一个字符
    return text ? text.slice(-1) : "";
}
const ToggleShowHide = inject("ToggleShowHide");
function fangda() {
    $(".shdswDiv .swDiv").removeClass("swDivSelect");
    $(".slideInUp").removeClass("z-crt");
    ToggleShowHide(true, "shuiqing");
    router.push({ path: "/yubaoyujing" });
    // var dialogClass = $(".dialog").css("display");
    // if (dialogClass == "block") {
    //     return false;
    // }
    // $(".g-rside ").css({ "z-index": 99 });
    // $(".g-lside ").css({ "z-index": 90 });
    // showDialogZJ.value = true;
}
function TransWarning(typeName) {
    // const ChildVue = defineAsyncComponent(() =>
    //     import("@/components/danzhan/sq/WarningHisView.vue")
    // );
    // const props = {};
    // props["pathname"] = "气象预警信息"
    // props["type"] = typeName
    // //ChildVue为弹窗中嵌入的slot
    // Dialog.open({ title: typeName + "气象预警历史记录", widh: 1400, heig: 850 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
}
onMounted(() => {
    var now = new Date();
    if (dayjs(now).format("HH") > 7) {
        stime.value = dayjs(now).format("YYYY-MM-DD 08:00:00");
    } else {
        stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00")).add(-24, "hour").format("YYYY-MM-DD HH:mm:ss");
    }
    etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
    Weacontent();
});
</script>

<style scoped>
.outer {
    display: grid;
    gap: 5px;
    margin-top: 5px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin: 5px auto;
    width: 90%;
}

.alert-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--popContentHeadbg);
    border-radius: 3px;
    font-family: "Microsoft YaHei", sans-serif;
    text-align: center;
    cursor: pointer;
    margin: 0px 1%;
}

.alert-name {
    font-size: 18px;
    font-weight: bold;
    color: var(--popupContentTitleColor);
    margin-bottom: 2px;
    height: 30px;
    line-height: 23px;
}

.icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 54px;
    width: 100%;
}

.icon-box img {
    width: 70px;
    object-fit: cover;
}

.alert-time {
    font-size: 14px;
    color: var(--mtablecolor);
    opacity: 0.7;
    height: 30px;
    line-height: 30px;
}

/* 放大开始 */
.dialog-content .widget-inline-box {
    font-size: 1rem !important;
}

.dialog-content .widget-inline-box p {
    padding-top: 50px;
}

.dialog-content .widget-inline-box h3 {
    padding-top: 60px;
    font-size: 50px;
}

.dialog-content .ztitemtit {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
}

.dialog-content .yjbigtxt {
    font-size: 36px;
}

/* 放大结束 */
</style>