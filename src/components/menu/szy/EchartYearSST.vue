<template>
<div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">水生态达标率</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <div style="width:55%;height:100%;float:left;">
                 <EchartsList :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
            </div>
            <div style="width:45%;height:100%;float:left;padding:50px 20px 50px 0px;">
               <div class="mapRightBox flexDivCol flexSB">
                  <div class="urlItem">
                     <span> 太湖-五站平均 </span>
                     <span class="text-xl"> 100 </span>
                     <span> % </span>
                  </div>
                  <div class="urlItem">
                    淀山湖、元荡
                    <span class="text-xl"> 100 </span>
                     <span> % </span>
                  </div>
                  <div class="urlItem">
                    黄浦江-松浦大桥
                    <span class="text-xl"> 100 </span>
                     <span> % </span>
                 </div>
               </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>

    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <EchartYearSST/>
    </ComZujian>
</template>

<script setup>
    import ComZujian from "@/components/ComZujian.vue";
    import EchartsList from "@/components/MyEcharts/echartsLine.vue";
    import * as echarts from "echarts";
    import ChartJs from "@/api/MyEcharts/ChartJs.js";
    import { ref, onMounted, reactive, inject, provide, watch } from "vue";
    const showDialog=ref(false);
        // 获取当前主题
    const _theme = localStorage.getItem("curTheme");
    const datekey = ref(null);
    const lineOption = ref({});
    const trendsTooltip = ref();
    const dateid = ref("SSTPie");

    const props = defineProps({
        strJsonLHW: {
            type: Array,
            default: () => []
        }
    });
    onMounted(() => {
        Weacontent();
    });
    watch(props.strJsonSST, () => {
        Weacontent();

    });

    function Weacontent() {
        var data = props.strJsonSST;
        var strJson=data;
        var LineColor = ['#00D0D0', '#0000FE', '#90ED7D', '#F7A35C', "#F7A35C", "#8B0000", "#8B008B", "#008B8B", "#90EE90"];

        //绘制数据说明
        var strNote = [];
        strNote.push({ "name": "时间", "codename": "DT", "tableV": "1", "isShow": true, "width": "40%" });
        strNote.push({ "name": "氯化物浓度", "codename": "CL", "tableV": "1", "isShow": true, "width": "30%" });

        const _Option = ChartJs.chartSSTPie("", strJson, strNote, LineColor, "mg/l", "Mouth", _theme, 80, 20);
        console.error('_Option',_Option);
        lineOption.value = _Option;
        datekey.value = new Date();

    }
    function fangda() {
        var dialogClass = $(".dialog").css("display");
        if (dialogClass == "block") {
            return false;
        }
        $(".g-lside ").css({ "z-index": 99 });
        $(".g-rside ").css({ "z-index": 90 });
        showDialog.value = true;
        dateid.value="SSTPie1";
    }
</script>
<style scoped>
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
    align-items: center
}
.flexSB {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between
}
.mapRightBox{
    /* position: absolute; */
    width:100%;
     height:100%;
    /* top: 1.875rem;
    right: 15.9375rem;
    z-index: 500; */
}
.urlItem {
    width: 100%;
    height:28%;
    line-height:100%;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-size:0.85rem;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    margin-top: 0.0625rem;
    border: 0.03125rem solid rgba(134, 252, 253, .28);
    border-radius: 50px;
    /* display: flex; */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
</style>