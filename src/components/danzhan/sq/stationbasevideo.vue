<template>
    <div id="template_Pic_div">
        <div class="pic_div_firstRow" style="margin-left: 2.5%;">
            <img class="right_img" src="/images/341529987419222016.png" alt="5、测验河段平面图.png" name="341529987419222016" onerror="nofind(this)">
            <div style="margin:2% 0 5% 5%;">
                <!-- <div style="margin-top:1%;">
                    <span class="picName" title="5、测验河段平面图.png">5、测验河段平面图.png</span>
                </div> -->
                <div style="margin-top:1%;">
                    <span class="photoType">测验河段平面图</span>
                    <span style="margin-left:15%">
                    </span>
                </div>
            </div>
    </div>
    <div class="pic_div_firstRow" style="margin-left: 2.5%;">
            <img class="right_img" src="/images/1.png" alt="5、测验河段平面图.png" name="341529987419222016" onerror="nofind(this)">
            <div style="margin:2% 0 5% 5%;">
                <!-- <div style="margin-top:1%;">
                    <span class="picName" title="5、测验河段平面图.png">5、测验河段平面图.png</span>
                </div>
                <div style="margin-top:1%;">
                    <span class="year_stcd">2000</span>
                </div> -->
                <div style="margin-top:1%;">
                    <span class="photoType">俯视图</span>
                    <span style="margin-left:15%">
                    </span>
                </div>
            </div>
    </div>
    <div class="pic_div_firstRow" style="margin-left: 2.5%;">
            <img class="right_img" src="/images/2.png" alt="5、测验河段平面图.png" name="341529987419222016" onerror="nofind(this)">
            <div style="margin:2% 0 5% 5%;">
                <!-- <div style="margin-top:1%;">
                    <span class="picName" title="5、测验河段平面图.png">5、测验河段平面图.png</span>
                </div>
                <div style="margin-top:1%;">
                    <span class="year_stcd">2000</span>
                </div> -->
                <div style="margin-top:1%;">
                    <span class="photoType">测亭</span>
                    <span style="margin-left:15%">
                    </span>
                </div>
            </div>
    </div>
    <div class="pic_div_firstRow" style="margin-left: 2.5%;">
            <img class="right_img" src="/images/3.png" alt="5、测验河段平面图.png" name="341529987419222016" onerror="nofind(this)">
            <div style="margin:2% 0 5% 5%;">
                <!-- <div style="margin-top:1%;">
                    <span class="picName" title="5、测验河段平面图.png">机房.png</span>
                </div>
                <div style="margin-top:1%;">
                    <span class="year_stcd">2000</span>
                </div> -->
                <div style="margin-top:1%;">
                    <span class="photoType">观测场</span>
                    <span style="margin-left:15%">
                    </span>
                </div>
            </div>
    </div>
</div>
</template>
<script setup>
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray, GetJosns } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, defineAsyncComponent, provide, markRaw } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const stime = ref("");
const etime = ref("");
const stcd = ref("");
const stnm = ref("");
const List = ref([]);
const isActive = ref(0);
const currentComponent = ref(null);
const typeValue = ref();
const props = defineProps({
    stcd: {
        type: String,
        default: "",
    },
    stnm: {
        type: String,
        default: "",
    },
    stime: {
        type: String,
        default: "",
    },
    etime: {
        type: String,
        default: "",
    },
});
onMounted(() => {
   
});
</script>
<style src="@/assets/styles/qxjz.css"></style>

<style scoped>
/*多媒体页面*/
.dmt_type span input {
    height: 18px;
    width: 18px;
    float: left;
    margin:0;
}

.pic_div_firstRow {
    float: left;
    /*width: 214px;*/
    width:17%;
    /*height: 237px;*/
    height: 37.5%;
    /*margin: 31px 0 16px 33px;*/
    margin:2.5% 0 2% 2.6%;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: 0 2px 4px 0 #D2D2D2;
}

.pic_div {
    float: left;
    /*width: 214px;*/
    width: 17%;
    /*height: 237px;*/
    height:37.5%;
    /*margin: 0 0 16px 35px;*/
    margin:0 0 2% 2.6%;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: 0 2px 4px 0 #D2D2D2;
}
.right_img {
    width: 100%;
    height: 70%;
}
</style>

