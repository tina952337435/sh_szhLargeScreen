<template>
        <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()">生态流量(水位)预警</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <div  class="map-tabs">
                <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
            </div>
            <div  class="map-tabs">
                <Echarts :width="'100%'" :height="'100%'" :option="lineOptionDSH" :key="datekeyDSH" :id="dateidDSH" />
            </div>

            <div  class="map-tabs">
                <Echarts :width="'100%'" :height="'100%'" :option="lineOptionTH" :key="datekeyTH" :id="dateidTH" />
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValueSW="typeValueSW"
        style="width: 70%; height: 700px">
        <EchartQSJSL :strJsonLHW="props.strJsonLHW" />
    </ComZujian>
</template>

<script setup>
import ComZujian from "@/components/ComZujian.vue";
import MyDialog from "@/components/ComDialog.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import SQTJ from "@/components/danzhan/sq/SQTJ.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ElMessage, ElTimePicker } from "element-plus";
import * as echarts from "echarts";

import { ref, onMounted, reactive, inject, provide, watch } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
const trendsTooltip = ref();
const dateid = ref("mapTabs1");

const datekeyDSH = ref(null);
const lineOptionDSH = ref({});
const dateidDSH = ref("mapTabs2");

const datekeyTH = ref(null);
const lineOptionTH = ref({});
const dateidTH = ref("mapTabs3");

const Riverswiper=ref("year");

const props = defineProps({
    strJsonLHW: {
        type: Array,
        default: () => []
    }
});
onMounted(() => {
    Weacontent();
});
function Weacontent() {
    var lanYJ=false,chengYJ=false,hongYJ=false;
  var slevel = "无预警";
                if (lanYJ) {
                    slevel = "蓝色预警";
                }
                if (chengYJ) {
                    slevel = "橙色预警";
                }
                if (hongYJ) {
                    slevel = "红色预警";
                }
                var item = getWarningDuoColor(slevel);
               const _Option =  echartWaterPie("黄浦江", slevel, item);
  lineOption.value = _Option;
  datekey.value = Date.now();

   lineOptionDSH.value=echartWaterPie("淀山湖、元荡", slevel, item);
   datekeyDSH.value = Date.now();

   lineOptionTH.value=echartWaterPie("长江", slevel, item);
   datekeyTH.value = Date.now();

}
function echartWaterPie(cityname, grade, item) {
            var option = {
                //backgroundColor: '#124294',
                title: {
                    text: cityname,
                    textStyle: {
                        fontSize: 14,
                        color: "rgba(255, 255, 255, 0.7)",
                        rich: {
                            a: {
                                fontSize: 36,
                            },
                        },
                    },
                    x: "center",
                    y: "30%",
                },
                graphic: [
                    {
                        type: "group",
                        left: "center",
                        top: "60%",
                        children: [
                            {
                                info: cityname,
                                name: cityname,
                                type: "text",
                                z: 100,
                                left: "10",
                                top: "middle",
                                style: {
                                    fill: "#ffffff",
                                    text: grade,
                                    font: "36px",
                                    //fontFamily: "FZHZGBJW",
                                },
                            }
                        ],
                    },
                ],
                series: [
                    {
                        name: cityname, //"水球图",
                        type: "liquidFill",
                        radius: "95%",
                        // center: ["50%", "55%"],
                        // waveAnimation: 5, // 动画时长
                        // amplitude: 10, // 振幅
                        data: [0.5],
                        color: [
                            {
                                type: "linear",
                                x: 0,
                                y: 1,
                                x2: 0,
                                y2: 0,
                                colorStops: item.color,
                                global: false, // 缺省为 false
                            },
                        ],
                        label: {
                            formatter: "",
                        },
                        outline: {
                            show: true,
                            borderDistance: 0,
                            itemStyle: {
                                borderColor: new echarts.graphic.LinearGradient(
                                    0,
                                    1,
                                    0,
                                    0,
                                    item.gcolor
                                ),
                                borderWidth: 3,
                            },
                        },
                        backgroundStyle: {
                            color: item.bgcolor,
                        },
                    },
                ],
            };
            return option;
        }

        function getWarningDuoColor(name) {
            var item = {};
            var color = [
                {
                    offset: 1,
                    color: ["rgba(7,222,119,0.4)"], // 0% 处的颜色
                },
                {
                    offset: 0,
                    color: ["rgba(5,151,81,0.8)"], // 100% 处的颜色
                },
            ];
            var bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                {
                    offset: 1,
                    color: "rgba(111,234,140,0.3)",
                },
                {
                    offset: 0.95,
                    color: "rgba(111,234,140, 0.5)",
                },
                {
                    offset: 0.8,
                    color: "rgba(111,234,140, 0.3)",
                },
                {
                    offset: 0.4,
                    color: "rgba(30,209,73, 0.01)",
                },
            ]);
            var gcolor = [
                {
                    offset: 1,
                    color: "rgba(30,209,73, 0.01)",
                },
                {
                    offset: 0,
                    color: "rgba(111,234,140, 0.6)",
                },
            ];
            if (name == "橙色预警") {
                color = [
                    {
                        offset: 0.5,
                        color: 'rgba(249,190,0, .4)',
                    },
                    {
                        offset: 0,
                        color: 'rgba(219,167,0, .8)',
                    },
                ];
                bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                    {
                        offset: 1,
                        color: "rgba(249,190,0,0.3)",
                    },
                    {
                        offset: 0.95,
                        color: "rgba(249,190,0, 0.5)",
                    },
                    {
                        offset: 0.8,
                        color: "rgba(249,190,0, 0.3)",
                    },
                    {
                        offset: 0.4,
                        color: "rgba(225,149,4, 0.01)",
                    },
                ]);
                gcolor = [
                    {
                        offset: 1,
                        color: "rgba(225,149,4, 0.01)",
                    },
                    {
                        offset: 0,
                        color: "rgba(252,193,81, 0.6)",
                    },
                ];
            }
            if (name == "黄色预警") {
                color = [
                    {
                        offset: 1,
                        color: ["rgba(255,223,120,0.4)"], // 0% 处的颜色
                    },
                    {
                        offset: 0,
                        color: ["rgba(255,218,99,0.8)"], // 100% 处的颜色
                    },
                ];
                bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                    {
                        offset: 1,
                        color: "rgba(255,209,51,0.3)",
                    },
                    {
                        offset: 0.95,
                        color: "rgba(255,209,51, 0.5)",
                    },
                    {
                        offset: 0.8,
                        color: "rgba(255,209,51, 0.3)",
                    },
                    {
                        offset: 0.4,
                        color: "rgba(255,208,47, 0.01)",
                    },
                ]);
                gcolor = [
                    {
                        offset: 1,
                        color: "rgba(255,208,47, 0.01)",
                    },
                    {
                        offset: 0,
                        color: "rgba(255,209,51, 0.6)",
                    },
                ];
            }
            if (name == "红色预警") {
                color = [
                    {
                        offset: 1,
                        color: ["rgba(231,76,60,0.4)"], // 0% 处的颜色
                    },
                    {
                        offset: 0,
                        color: ["rgba(234,92,78,0.8)"], // 100% 处的颜色
                    },
                ];
                bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                    {
                        offset: 1,
                        color: "rgba(231,76,60,0.3)",
                    },
                    {
                        offset: 0.95,
                        color: "rgba(231,76,60, 0.5)",
                    },
                    {
                        offset: 0.8,
                        color: "rgba(231,76,60, 0.3)",
                    },
                    {
                        offset: 0.4,
                        color: "rgba(205,40,24, 0.01)",
                    },
                ]);
                gcolor = [
                    {
                        offset: 1,
                        color: "rgba(205,40,24, 0.01)",
                    },
                    {
                        offset: 0,
                        color: "rgba(231,76,60, 0.6)",
                    },
                ];
            }
            if (name == "蓝色预警") {
                color = [
                    {
                        offset: 1,
                        color: ["rgba(2,144,255,0.4)"], // 0% 处的颜色
                    },
                    {
                        offset: 0,
                        color: ["rgba(45,175,230,0.8)"], // 100% 处的颜色
                    },
                ];
                bgcolor = new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                    {
                        offset: 1,
                        color: "rgba(15, 115, 238,0.3)",
                    },
                    {
                        offset: 0.95,
                        color: "rgba(15, 115, 238, 0.5)",
                    },
                    {
                        offset: 0.8,
                        color: "rgba(15, 115, 238, 0.3)",
                    },
                    {
                        offset: 0.4,
                        color: "rgba(21, 80, 161, 0.01)",
                    },
                ]);
                gcolor = [
                    {
                        offset: 1,
                        color: "rgba(21, 80, 161, 0.01)",
                    },
                    {
                        offset: 0,
                        color: "rgba(15, 115, 238, 0.6)",
                    },
                ];
            }
            item.color = color;
            item.bgcolor = bgcolor;
            item.gcolor = gcolor;
            return item;
        }

</script>
<style scoped>
.map-tabs {
    flex-wrap: wrap;
    display: flex;
    width: 30%;
    height: 98%;
    margin-bottom: 1%;
    margin-left:2%;
    float: left;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
}
</style>