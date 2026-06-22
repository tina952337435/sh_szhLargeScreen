<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p1" id="title2" @click="fangda()">在线整编完成率</p>
            <div style="width:calc(100% - 250px);margin-left:70px;" class="div-swiper">
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'other' && 'swiper-slide swiper-slide-thumb-active'"
                    @click="GetType('other')">
                    监测中心</div>
                <div class="swiper-slide" style="width: 50%;"
                    :class="Typeswiper == 'all' && 'swiper-slide swiper-slide-thumb-active'" @click="GetType('all')">
                    浙闽皖</div>
            </div>
        </div>
        <div class="txt"  style="overflow-y: auto;height:calc(calc(100vh - 28.825rem)*(2/6));">
            <div style="width:50%;height:100%;float:left;">
                <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
                
            </div>
            <div style="width:50%;height:100%;float:left;">
                <Echarts :width="'100%'" :height="'100%'" :option="lineOption1" :key="datekey1" :id="dateid1" />
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { SetNull, groupBy, GetSZStateBy, GetSZState, getSZColor } from "@/api/ComUnit.js";
import { ref, onMounted, reactive, inject, watch, defineAsyncComponent, onUnmounted, h } from "vue";
import { ElInput, ElTable, ElTableColumn, ElMessage } from "element-plus";
import Dialog from "@/api/utils/Dialog.js";
import * as echarts from "echarts";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import ChartJs from "@/api/MyEcharts/ChartJs.js";

const datekey = ref(null);
const lineOption = ref({});
const dateid = ref("echartzhengbianlvleft");

const datekey1 = ref(null);
const lineOption1 = ref({});
const dateid1 = ref("echartzhengbianlvright");

const Typeswiper = ref('other');

onMounted(() => {
    Weacontent();
    Weacontent2();
});
function Weacontent() {
    // 配置项
    const value = 95;
    const color = '#00E5F1';
    const _Option = {
        // backgroundColor: '#0F224C', //背景色
        title: [
            {
            text: `{a|${value}%}`,
            x: 'center',
            y: '30%',
            textStyle: {
                rich: {
                    a: {
                        fontSize: 28,
                        color: '#A3CBDB',
                    }
                },
            },
        },
        {
                text: '站数：800',
                left: '48%',
                top: "50%",
                textAlign: 'center',
                textStyle: {
                    fontSize: '15',
                    fontWeight: '400',
                    color: '#A3CBDB',
                    textAlign: 'center',
                },
            },
        {
                text: '国家基本站',
                left: '48%',
                top: "65%",
                textAlign: 'center',
                textStyle: {
                    fontSize: '15',
                    fontWeight: '400',
                    color: '#A3CBDB',
                    textAlign: 'center',
                },
            },
        ],
        series: [
            {
                name: 'outside_circle',
                type: 'gauge',
                splitNumber: 35,
                radius: '115%',
                center: ['50%', '50%'],
                startAngle: 90,
                endAngle: -269.9999,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: [
                            [0, '#8ACFFF'],
                            [1, '#8ACFFF'],
                        ],
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    length: 3,
                    lineStyle: {
                        color: 'auto',
                        width: 3,
                    },
                },
                axisLabel: {
                    show: false,
                },
                detail: {
                    show: false,
                },
            },
            {
                name: 'cover_circle',
                type: 'pie',
                radius: ['70%', '78%'],
                center: ['50%', '50%'],
                z: 2,
                avoidLabelOverlap: true,
                hoverAnimation: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        show: false,
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                splitLine: {
                    show: false,

                },
                data: [
                    {
                        value: value,
                        itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: `rgba(138,207,255)`
                            }, {
                                offset: 1,
                                color: `rgba(14,53,255)`
                            }]),
                        },
                        },
                    },
                    {
                        value: 100 - value,
                        itemStyle: {
                            normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: `rgba(138,207,255,.2)`
                            }, {
                                offset: 1,
                                color: `rgba(14,53,255,.2)`
                            }]),
                        },
                        },
                    },
                ],
            },
        ],
    };
    lineOption.value = _Option;
    datekey.value = new Date();
}
function Weacontent2() {
    // 配置项
    const value = 80;
    const color = '#00E5F1';
    const _Option = {
        // backgroundColor: '#0F224C', //背景色
        title: [
            {
            text: `{a|${value}%}`,
            x: 'center',
            y: '30%',
            textStyle: {
                rich: {
                    a: {
                        fontSize: 28,
                        color: '#A3CBDB',
                    }
                },
            },
        },
        {
                text: '站数：600',
                left: '48%',
                top: "50%",
                textAlign: 'center',
                textStyle: {
                    fontSize: '15',
                    fontWeight: '400',
                    color: '#A3CBDB',
                    textAlign: 'center',
                },
            },
        {
                text: '专用站',
                left: '48%',
                top: "65%",
                textAlign: 'center',
                textStyle: {
                    fontSize: '15',
                    fontWeight: '400',
                    color: '#A3CBDB',
                    textAlign: 'center',
                },
            },
        ],
        series: [
            {
                name: 'outside_circle',
                type: 'gauge',
                splitNumber: 35,
                radius: '115%',
                center: ['50%', '50%'],
                startAngle: 90,
                endAngle: -269.9999,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: [
                            [0, '#8ACFFF'],
                            [1, '#8ACFFF'],
                        ],
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    length: 3,
                    lineStyle: {
                        color: 'auto',
                        width: 3,
                    },
                },
                axisLabel: {
                    show: false,
                },
                detail: {
                    show: false,
                },
            },
            {
                name: 'cover_circle',
                type: 'pie',
                radius: ['70%', '78%'],
                center: ['50%', '50%'],
                z: 2,
                avoidLabelOverlap: true,
                hoverAnimation: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        show: false,
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                splitLine: {
                    show: false,

                },
                data: [
                    {
                        value: value,
                        itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: `rgba(138,207,255)`
                            }, {
                                offset: 1,
                                color: `rgba(14,53,255)`
                            }]),
                        },
                        },
                    },
                    {
                        value: 100 - value,
                        itemStyle: {
                            normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: `rgba(138,207,255,.2)`
                            }, {
                                offset: 1,
                                color: `rgba(14,53,255,.2)`
                            }]),
                        },
                        },
                    },
                ],
            },
        ],
    };
    lineOption1.value = _Option;
    datekey1.value = new Date();
}
</script>
