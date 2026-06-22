<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" @click="fangda()">一周访问量统计</p>
            </div>
            <div style="width:calc(100% - 220px);margin-left:30px;" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'tongji' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('tongji')">
                    系统访问频次</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'daobaolu' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('daobaolu')">
                    部署系统清单</div>
            </div>
        </div>
        <div class="txt">
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName"
        style="width: 70%; height: 700px">
        <datatoReportRate :rainListSW="rainListSW" />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import EchartZLYQDay from "@/components/menu/yq/EchartZLYQDay.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import * as echarts from "echarts";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, inject, watch } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const Typeswiper = ref("tongji");
const dateid = ref("datatoReportRate");

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showClick = ref(true);
const Drpswiper = ref("YL3");
const stime = ref({});
const etime = ref({});
const props = defineProps({
    rainListSW: {
        type: String,
        default: ""
    },
});
watch(props.rainListSW, () => {
    Weacontent();
});

onMounted(() => {
    if (props.rainListSW != undefined) {
        Weacontent();
    }
});
function Weacontent() {
    lineOption.value = echartsCZTJ(_theme);
    datekey.value = Date.now();

}
function GetType(type) {
    Typeswiper.value = type;
}
function echartsCZTJ(theme) {
    var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor, backgroundStyle;
    if (theme == "BlueTheme" || theme == "VioletTheme") {
        axisLabelColor = "#000";
        axisLineColor = "#000";
        splitLineColor = "#eee";
        legendColor = "#000";
        titleColor = 'rgba(0,0,0,0.70)';
        backgroundStyle = "#fff";
    } else if (theme == "default") {
        axisLabelColor = "#00FFFF";
        axisLineColor = "#00FFFF";
        splitLineColor = "#074159";
        legendColor = "#fff";
        titleColor = 'rgba(255,255,255,0.60)';
        backgroundStyle = "#031426bf";
    }
    const payload = {
        id: '',
        data: {
            title: ['生态指数'],
            unit: ['%'],
            x: ['四预', '水情', '视频监控', 'OA', '站网', '水资源'],
            data1: [184, 241, 129, 101, 121, 251,],
        },
    };

    const unit = payload.data.unit || [];
    const x = payload.data.x || [];
    const data1 = payload.data.data1 || [];
    const title = payload.data.title || [];

    var option = {
        grid: {
            top: 35,
            left: 15,
            right: 15,
            bottom: 10,
            // 是否包含文本
            containLabel: true,
        },
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: 'axis',
            backgroundColor: 'rgba(9, 30, 60, 0.6)',
            extraCssText: 'box-shadow: 0 0 8px rgba(0, 128, 255, 0.27) inset;',
            borderWidth: 0,
            confine: false,
            appendToBody: true,
            textStyle: {
                color: legendColor,
                fontSize: 10,
            },
            // 轴触发提示才有效
            axisPointer: {
                type: 'shadow',
            },
            shadowStyle: {
                color: 'rgba(157, 168, 245, 0.1)',
            },

            formatter: (data) => {
                var tip = '<h5 class="echarts-tip-h5">' + data[0].name + '</h5>';
                data.forEach((item) => {
                    let unit = '';
                    if (item.seriesType === 'bar') {
                        tip += '<div class="echarts-tip-div">';
                        tip += '<div class="left">' + item.marker + item.seriesName + '：</div>';
                        tip += '<div class="right">' + item.value + unit + '</div>';
                        tip += '</div>';
                    }
                });
                return tip;
            },
        },
        xAxis: {
            type: 'category',
            data: x,
            axisLine: {
                lineStyle: {
                    color: axisLineColor,
                    width: 1 //这里是为了突出显示加上的
                },
                textStyle: {
                    color: axisLineColor,
                    fontSize: 14,
                }
            },
            axisLabel: {
                interval: 0,//横轴信息全部显示
                show: true,
                fontSize: 14,
                textStyle: {
                    color: axisLabelColor
                },
                formatter: function (value) {
                    return value
                },
            },
        },
        yAxis: [
            {
                name: '(次数)',
                nameTextStyle: {
                    padding: [0, 0, 0, -30],
                    //     align: 'left',
                    //     fontSize: 14,
                },
                type: 'value',
                axisLabel: {
                    formatter: function (v) {
                        return v.toFixed(0);
                    },
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: splitLineColor
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: axisLineColor,
                        width: 1, //这里是为了突出显示加上的
                        shadowBlur: 0,
                        shadowOffsetX: 0
                    },
                    textStyle: {
                        color: axisLineColor,
                        fontSize: '16'
                    }
                }
            },
        ],
        series: [
            {
                name: title[0],
                type: 'bar',
                barWidth: 26,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(21,136,209,0)',
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        // {
                        //     offset: 0,
                        //     color: '#00e4ff', //渐变1
                        // },
                        // {
                        //     offset: 0.8,
                        //     color: '#f3a134', //渐变2
                        // },
                        // {
                        //     offset: 1,
                        //     color: '#e28282', //渐变2
                        // },
                        {
                            offset: 0,
                            color: '#1893FE', //渐变1
                        },
                        {
                            offset: 1,
                            color: '#1EE3E8', //渐变2
                        },
                    ]),
                },
                data: data1,
                z: 0,
                zlevel: 0,
            },
            {
                type: 'pictorialBar',
                barWidth: 26,
                itemStyle: {
                    color: backgroundStyle, //数据的间隔颜色
                },
                symbolRepeat: 'true',
                symbolMargin: 3,
                symbol: 'rect',
                symbolSize: [30, 4],
                data: data1,
                z: 1,
                zlevel: 0,
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 16,
                    color: axisLabelColor, //柱状顶部文字颜色
                    formatter: function (params) {
                        return params.data;
                    },
                }
            },
        ],
    };
    return option;
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateid.value = "datatoReportRate1";
}
</script>
<style scoped></style>