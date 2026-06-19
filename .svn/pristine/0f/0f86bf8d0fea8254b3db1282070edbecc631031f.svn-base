<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">共享交换</p>
            </div>
            <div style="width:calc(100% - 130px);" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'share' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('share')">
                    共享</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'return' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('return')">
                    交换</div>
            </div>
        </div>
        <div class="txt">
            <div class="hl-content">
                <div class="process flexDiv flexSB">
                    <div class="sjcj flexDiv">
                        <img src="/images/chuanshu.png" alt="">
                        数据采集
                    </div>
                    <!-- <img src="/images/jiantou.png" alt="" class="jt">
                    <div class="sjcj flexDiv"><img src="/images/pingtai.png" alt="">
                        监测中心
                    </div> -->
                    <img src="/images/jiantou.png" alt="" class="jt">
                    <div class="sjcj flexDiv"><img src="/images/huiliu.png" alt="">
                        太湖水文
                    </div>
                </div>
                <div class="detail flexDiv flexSB">
                    <div class="cs-left flexDivCol flexSA">
                        <div class="yczd" style="height: 50px;">
                            <img src="/images/zhongduan.png" alt="">
                            <div>遥测终端</div>
                            <div class="num"><span>20612</span>套</div>
                        </div>
                        <div class="bdtx" style="height: 60px;">
                            <div>省市共享</div>
                            <div class="num"><span>6448</span>套</div>
                        </div>
                    </div>
                    <img src="/images/jt1.png" alt="" class="jt1">
                    <div class="cs-center flexDivCol flexSB">
                        <div class="top">
                            <div>设备畅通率</div>
                            <div style="cursor: pointer;"><span>99.26</span>%</div>
                        </div>
                        <div class="middle">
                            <div class="centerTit">水文数据中心</div>
                            <div class="centerDesc">(一主二备)</div>
                        </div>
                        <div class="bottom">
                            <div>今年以来</div>
                            <div style="cursor: pointer;"><span>138264.09</span>万条</div>
                        </div>
                    </div>
                    <img src="/images/jt2.png" alt="" class="jt2">
                    <div class="cs-right flexDivCol flexSB">
                        <div class="flexDiv flexSB">
                            <div>省市</div>
                            <div class="num">204</div>
                        </div>
                        <div class="flexDiv flexSB">
                            <div>分中心</div>
                            <div class="num">202</div>
                        </div>
                        <div class="flexDiv flexSB">
                            <div>其他</div>
                            <div class="num">17</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div v-else class="gx-content">
                <div class="process flexDiv flexSB">
                    <div class="sjcj flexDiv">
                        <img src="/images/share-icon.png" alt="">
                        本省部门
                    </div>
                    <div class="sjcj flexDiv">
                        <img src="/images/share-icon.png" alt="">
                        省外部门
                    </div>
                    <div class="sjcj flexDiv">
                        <img src="/images/share-icon.png" alt="">
                        上级部门
                    </div>
                </div>
                <div class="detail flexDiv flexSB">
                    <div class="cs-left flexDivCol flexSA">
                        <div class="yczd">
                            <div class="tit">省水文</div>
                            <div class="num"><span>193760</span><span class="unit">w</span></div>
                        </div>
                        <div class="bdtx">
                            <div class="tit">省气象</div>
                            <div class="num"><span>3110</span><span class="unit">w</span></div>
                        </div>
                        <div class="bdtx">
                            <div class="tit">省外部门
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAABYWlDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokWNgYFJJLCjIYWFgYMjNKykKcndSiIiMUmB/yMAOhLwMYgwKicnFBY4BAT5AJQwwGhV8u8bACKIv64LMOiU1tUm1XsDXYqbw1YuvRJsw1aMArpTU4mQg/QeIU5MLikoYGBhTgGzl8pICELsDyBYpAjoKyJ4DYqdD2BtA7CQI+whYTUiQM5B9A8hWSM5IBJrB+API1klCEk9HYkPtBQFul8zigpzESoUAYwKuJQOUpFaUgGjn/ILKosz0jBIFR2AopSp45iXr6SgYGRiaMzCAwhyi+nMgOCwZxc4gxJrvMzDY7v////9uhJjXfgaGjUCdXDsRYhoWDAyC3AwMJ3YWJBYlgoWYgZgpLY2B4dNyBgbeSAYG4QtAPdHFacZGYHlGHicGBtZ7//9/VmNgYJ/MwPB3wv//vxf9//93MVDzHQaGA3kAFSFl7jXH0fsAAAA4ZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAKgAgAEAAAAAQAAABSgAwAEAAAAAQAAABQAAAAAkRXSxwAABC1JREFUOBFNVF1sVEUU/mb2dqm7XSy6YmWxhRCCQhoeiCElSm0frIQYopU+8IChERJ5MZggxqi58YkYE6IJiemD+CTWlm4M1ijWEAiWNLVFQmqr5c9kade60u529/Zy994Zz5nbXTqb7JyZ+c53fu8BaA06+jjvgoV0Npj9Nx+5LfjmtWvazi2wRKt/XndL+46uHciiUf7l4r3cfVLip59KgX2ecK4n4bh02UvY0QIaH4fCBkvCVwyjNeDolh8W9YcXtbb4LH5e0vZgAUbNcRVSNTJtZYjDWUIJAXpUIOsnCjhkjRYUOhIyXnBx7FwO2N8AWM9F5cTZDLa5pOF6wBtNwjYuaa3lkIuPFFmeoYdJ4i7SvlZKNFmYOPSU6BPsTVyjY5CoGegRQEGanV3ms+eTm+zyuzPBEXb5zH/65RO39KNGvqdt3nm9P6FtwXFdzKgP7jph0IaRmYiFZcPqY974yFonbuvt03m8uhLgE+Bym/iM36tAZi44OFgDpMoB3BJw5cBqcZVBvAww7fhdMR3ZShYxXlT4hwoi6bA5qnC0QX4shFCi39E7Exp7pjyFaYciVisiJj99cvLb5ogtGZSlwzQF8xCkTDCK7n1fovN3vY0tYKwoL2iBMxyIBE6VPXkz8FGqrZMnOWr3AdolJ/nzlBg+vU783RJT6Nkk8rvX4MdkBCNfbRTu3iTu+2UkxPm8tr/LKeytZ9NAX1ZhX5K6i9jvFCmgOurbWfxheQHdKcT65jgQTrTE2Zkw2Xy+QvdHd+Oc7HxMfBKlSA2oUgmut1Gi3cdwlxBBNeGd1/TbgcIabqsqCOi93ComqwlnobI4r+RWq9CI8R0Rmz+zs8gCW9Nw8gqXupNihCGVVbWcdnRXncBWo0CvXINJV6LIeaTk+vRA7hIhhcO/5bBq6XVzDNePPy3STGq68cES3ql4NEWh3KIPgRXYFd6ZjBrOrMo5fCcEGfQJo5Wab16Qp8VAye+OI9LIVi9RGYpGcdkjJiMFSV8Y74aMPSZbocx7SMjWtMINqxaRFN1hzJHZk0+KL0I/gMM39S7qppcsyFM9G0We74/QR1fw5TH4uPBNsxiuYF/5Tb9ZLmN9EGCLxZ+GpRGf89Bw+K7elWrC+IYsNsVr8KLUwJ8lvE5E/TseQc0qhf2rqFSlAK3euL73/BOYi3hoq7ewnoLA97Moia8LuiURoOMXmm8UsQntWcp0Y1SiQOH9uhB25VqaZztWhwUaocGYoS+LR9wLSYV6GoHTNORGF9FnqvxlTu9cKmPPVTN4lotBnWsqa4rDo6KSQ85bGCynk2WuftRC7xD1YrVteOR9msG+sQK2c0U52Q/bhVuFvQ+J+InJ+Ezmh9vbMWTTcODXKmEIDf9tGj83rmOLV8YzpLiOCBIqoCoKLFLiZ6goU2+1YYo/oZV6LP8PRxh/CFWFuooAAAAASUVORK5CYII="
                                    alt="" class="el-tooltip" raw-content="true" aria-describedby="el-tooltip-1654"
                                    tabindex="0">
                            </div>
                            <div class="num"><span>244</span><span class="unit">w</span></div>
                        </div>
                    </div>
                    <div class="cs-center flexDivCol flexSB">
                        <div class="top">
                            <div>省水文数据仓</div>
                            <div class="topNum"><span><span class="number-grow-warp"><span data-time="2"
                                            data-value="197115" class="number-grow">197115</span></span></span>万条</div>
                        </div>
                    </div>
                    <div class="cs-right flexDivCol flexSB">
                        <div class="flexDiv flexSB">
                            <div class="tit">省水利仓</div>
                            <div class="num">193760<span>w</span></div>
                        </div>
                        <div class="flexDiv flexSB">
                            <div class="tit">水利部</div>
                            <div class="num">6970<span>w</span></div>
                        </div>
                        <div class="flexDiv flexSB">
                            <div class="tit">太湖局</div>
                            <div class="num">6970<span>w</span></div>
                        </div>
                        <div class="flexDiv flexSB">
                            <div class="tit">省气象</div>
                            <div class="num">6347<span>w</span></div>
                        </div>
                        <div class="flexDiv flexSB">
                            <div class="tit">省外部门
                                <img src="data:image/png;base64,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"
                                    alt="" class="el-tooltip item" raw-content="true" aria-describedby="el-tooltip-9927"
                                    tabindex="0">
                            </div>
                            <div class="num">160<span>w</span></div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <chuanshu />
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
const Typeswiper = ref('share');
const datekey = ref(null);
const tableData = ref([]);
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
function Weacontent() {

}
function GetType(type) {
    Typeswiper.value = type;
    Weacontent();
}
function getPDF(title, wd_file) {
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    $(".g-bside ").css({ "z-index": 90 });
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

.process {
    width: 96%;
    margin: 0 auto;
    height: 42px;
    background-image: url(/images/csBg1.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 14px;
    color: var(--mtablecolor);
    letter-spacing: 0;
    font-weight: 500;
    padding: 20px;
}

.flexSB {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.flexC,
.flexDiv {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.hl-content .process div img {
    margin-right: .0625rem;
    border-style: none;
}

.process .jt {
    width: 40px;
}

.hl-content .detail {
    width: 96%;
    margin: 0 auto;
    height: 200px;
    background-image: url(/images/detail.png);
    background-size: 100% auto;
    background-position: 50%;
    background-repeat: no-repeat;
    padding: 0px;
    position: relative;
}

.hl-content .detail .cs-left {
    width: 80px;
    height: 186px;
    font-size: 14px;
    color: var(--mtablecolor);
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    padding-bottom: 10px;
}

.hl-content .detail .cs-center {
    height: 100%;
    color: var(--mtablecolor);
    font-size: 14px;
    text-align: center;
}

.hl-content .detail .cs-right {
    height: 186px;
    font-size: 14px;
    color: #def1ff;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    padding-bottom: 26px;
    width: 110px;
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
    justify-content: space-around;
}

.detail .cs-center .middle .centerTit {
    font-family: largeFont;
    font-size: 20px;
    margin-left: 6px;
}

.detail .cs-center .top span,
.detail .cs-center .bottom span {
    font-family: "number";
    font-size: 18px;
    letter-spacing: 0;
    font-weight: 800;
    background: -webkit-gradient(linear, left top, left bottom, from(#ed9b42), to(#fef886));
    background: linear-gradient(180deg, #ed9b42, #fef886);
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: 1px;
}

.detail .jt1 {
    margin-left: 20px;
    margin-top: -15px;
}


.detail .jt2 {
    margin-left: 18px;
    margin-top: -15px;
}

.detail .cs-left .yczd img {
    margin-bottom: .21875rem;
    border-style: none;
}

.detail .cs-left .yczd,
.detail .cs-left .bdtx,
.detail .cs-center .middle {
    color: #def1ff;
}

.detail .cs-left .num {
    margin-top: .125rem;
}

/* 共享 */
.gx-content .detail {
    width: 100%;
    height: 200px;
    position: relative;
    background-image: url(/images/sslsjc.png), url(/images/share.png);
    background-size: 6.25rem 8.6rem, 48% auto;
    background-repeat: no-repeat;
    background-position: 40% 65%, 36% 50%;
    font-size: 14px;
    color: var(--mtablecolor);

}

.gx-content .process .sjcj {
    width: 33.3%;
    height: 28px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-left: 12px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-image: url(/images/bumen.png);
    background-repeat: no-repeat;
}

.gx-content .process .sjcj img {
    width: 14px;
    margin-right: 4px;
    border-style: none;
}
</style>