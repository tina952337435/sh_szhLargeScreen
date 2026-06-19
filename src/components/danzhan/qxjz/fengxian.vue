<template>
    <div style="text-align: center;height:100%;">
        <div class="form1" style=" float:left; width:100%;display: inline-block;overflow-y: auto;height: 100%;">
            <ul>
                <li v-for="(item, index) in tableData" :key="index">
                    <div>
                        <img :src="item.imgURL" @click="btnImg(index)">
                    </div>
                    <div style="color: var(--widgetcolor);">{{ item.name }}</div>
                </li>
            </ul>
        </div>
    </div>

    <ul class="products flex flex-wrap" id="viewer">
        <li v-for="(item, index) in tableData" :key="index"><img :src="item.imgURL" /></li>
    </ul>
</template>
<script setup>
import { ref, onMounted } from "vue";
import fengxiandata from "@/assets/json/shuzidatingQXJZ/fengxian.json"; //安置点
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import Viewer from 'viewerjs'

import 'viewerjs/dist/viewer.css'
const viewerjs = ref(null)


// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const props = defineProps({
    id: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
});
const tableData = ref([])
const ImgData = ref([])
function btnImg(index) {
    // $("#viewer").show();
    previewImage(index);
}
const previewImage = (index) => {
    const box = document.querySelector('#viewer');
    if (box) {
        const photoViewer = new Viewer(box, {
            inline: false, // 是否启用 inline 模式
            fullscreen: true, // 播放时是否全屏
            title: false, // 是否显示当前图片的标题
            toolbar: {  // 显示工具栏
                // 下面各种按钮1显示，0隐藏，可自定义按钮大小和点击事件
                zoomIn: 1, // 放大图片
                zoomOut: 1, //缩小图片
                oneToOne: 1, // 图片比例100%
                reset: 1, // 重置图片大小
                prev: 1, // 查看上一张图片
                play: 0, // 播放图片
                next: 1,// 查看下一张图片
                rotateLeft: 1,// 向左旋转图片
                rotateRight: 1,// 向右旋转图片
                flipHorizontal: 1,// 图片左右翻转
                flipVertical: 1, // 图片上下翻转
            },
            // 定义用于查看的图像的初始索引
            initialViewIndex: index,
            // 每次关闭查看时触发
            hide() {
                photoViewer.destroy();
            },
            // 每次关闭查看时触发，在hide之后
            hidden() {
                photoViewer.destroy();
            },
            // 每次查看时触发
            show() {
                photoViewer.full();
            },
        });
        photoViewer.show();
    }
};
onMounted(() => {
    $("#viewer").hide();
    tableData.value = fengxiandata;

    // if (strJson[0].fileinfo != undefined) {
    //     var imgList = strJson[0].fileinfo.split(",");
    //     if (imgList.length > 0) {
    //         $(".imgClass").show();
    //     } else {
    //         $(".imgClass").hide();
    //     }
    //     ImgData.value = imgList;
    // } else {
    //     $(".imgClass").hide();
    // }

    if (viewerjs.value) {
        viewerjs.value.destroy() // 销毁 viewer 实例
    }
});
</script>
<style src="@/assets/styles/qxjz.css"></style>
<style scoped>
ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
}

ul li {
    width: 48%;
    margin-top: 10px;
    display: inline-block;
    float: left;
}

ul li img {
    width: 100%;
}

ul li:nth-child(2n) {
    margin-left: 30px !important;
}
</style>
