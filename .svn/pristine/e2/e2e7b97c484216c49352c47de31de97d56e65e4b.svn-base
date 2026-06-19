<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div style="line-height:30px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p" id="title2" v-if="showClick" @click="fangda()">重点站超警统计</p>
                <span class="spanTitle"></span>
            </div>
        </div>
        <div class="txt">
            <div class="m-list5 box-siz">
                    <div style="width:55%;height:100%;float:left;" id="slTable_nei">
                        <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
                    </div>
                    <div class="chart_legend chart_legend_led" id="CJtable">
                        <div class="legend_item">
                            <p> 超警戒水位总数</p>
                            <p class="legend_label" style="color: orange;" id="legend_labelwrz">
                                {{wrzCount}}
                            </p>
                        </div>
                        <div class="legend_item">
                            <p> 超保证水位总数</p>
                            <p class="legend_label" style="color: red;" id="legend_labelgrz">
                               {{grzCount}}
                            </p>
                        </div>
                        <div class="legend_item">
                            <p> 未超警戒水位总数</p>
                            <p class="legend_label" style="color: #6FEA8C;" id="legend_labelzc">
                                {{zcCount}}
                            </p>
                        </div>
                    </div>
            </div>
            
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" style="width: 70%; height: 700px">
        <yubaoCJTJ :rainListSW="rainListSW" />
    </ComZujian>
</template>
<script setup>
import '@/assets/styles/swiper.css';
import ComZujian from "@/components/ComZujian.vue";
import EchartZLYQDay from "@/components/menu/yq/EchartZLYQDay.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray,SetNull } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, inject, watch } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const showClick = ref(true)
const dateid = ref("yubaoCJTJ");
const Drpswiper = ref("YL3");
const stime = ref({});
const etime = ref({});
const props = defineProps({
    rainListSW: {
        type: String,
        default: ""
    },
});

const grzCount=ref(0),wrzCount=ref(0),zcCount=ref(0);
watch(props.rainListSW, () => {
    Weacontent();
});

onMounted(() => {
    if (props.rainListSW != undefined) {
        Weacontent();
    }
});
function Weacontent() {    
    var chartTM = [], chartData = [];
    if (props.rainListSW.length > 0) {
        for (var num = 0; num < props.rainListSW.length; num++) {
            var stnm = props.rainListSW[num]["stnm"].trim();
            // chartTM.push(stnm);
            // if (stnm == "三角渡" || stnm == "泖港") {
            //     continue;
            // }
            //五分钟数据出力为小时
            // var durw = props.rainListSW[num].durw;
            // chartData.push(durw);
            var item=props.rainListSW[num];
            let colorCss="";
            if(SetNull(item["wrz"])!=""){
               let chaWrz=Number(SetNull(item["maxz"]))-Number(SetNull(item["wrz"]));
               if(chaWrz>0){
                  colorCss="#FF9E43";
               }
            }
            if(SetNull(item["grz"])!=""){
              let chaWrz=Number(SetNull(item["maxz"]))-Number(SetNull(item["grz"]));
               if(chaWrz>0){
                  colorCss="#F70019";
               }
            }

            if(colorCss=="#FF9E43"){
              wrzcount.value++;
            }
            else if(colorCss=="#F70019"){
              grzCount.value++;
            }
            else{
              zcCount.value++;
            }
        }
    }
    var pieArr = [
        { value: grzCount, name: '超保' },
        { value: wrzCount, name: '超警' },
        { value: zcCount, name: '正常' },
    ];
    lineOption.value = echartCJ(pieArr, props.rainListSW.length);
    // console.error('chartData',props.rainListSW);
    // var LineColor = ["#3E8BFF", "#1CB8B2", "#01DDFF", "#F9C823", "#0264FD", "#FE7923", "#8E30FF",];
    // const _Option = ChartJs.chartAreaCJCC("", chartTM, chartData, LineColor, "时长(H)", _theme,);
    // lineOption.value = _Option;
    datekey.value = Date.now();
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-lside ").css({ "z-index": 99 });
    $(".g-rside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateid.value = "yubaoCJTJ1";
}
function echartCJ(data, Length, max_min_Name) {
    var zhanTotal = Length;//站点总数
    if (max_min_Name != undefined) {
        var titleValue = [
            {
                text: '站点总数',
                x: '40%',
                y: '60%',
                textStyle: {
                    color: '#ffffff',
                    fontSize: 28,
                    //fontFamily:'led'
                    //fontWeight: '100',
                },
            },
            {
                text: zhanTotal,
                x: '45%',
                y: '30%',
                textStyle: {
                    fontSize: 80,
                    color: '#ffffff',
                    fontFamily: 'led',
                    //fontFamily: 'DINAlternate-Bold, DINAlternate',
                    //foontWeight: '600',
                },
            },
        ]
    } else {
        var titleValue = [
            {
                text: '站点总数',
                x: '35%',
                top: '58%',
                textStyle: {
                    color: '#ffffff',
                    fontSize: 14,
                    //fontFamily:'led'
                    //fontWeight: '100',
                },
            },
            {
                text: zhanTotal,
                x: '42%',
                y: '30%',
                textStyle: {
                    fontSize: 30,
                    color: '#ffffff',
                    fontFamily: 'led',
                    //fontFamily: 'DINAlternate-Bold, DINAlternate',
                    //foontWeight: '600',
                },
            },
        ]
    }
    var option = {
        title: titleValue,
        tooltip: {
            trigger: 'item',
            // formatter: ' {a} <br />{b} : {c} ({d}%) '
            formatter: '{b} : {c} ' + '个' + '({d}%) '
        },
        legend: {
            x: 'right',      //可设定图例在左、右、居中
            y: 'top',     //可设定图例在上、下、居中
            left: '75%',
            show: false,
            padding: [30, 0, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
            textStyle: { //图例文字的样式
                color: '#ccc',
                fontSize: 12
            },
            data: ['超保', '超警', '正常'],
            formatter: function (name) {
                var index = 0;
                var clientlabels = ['超保', '超警', '正常'];
                var clientcounts = data;
                clientlabels.forEach(function (value, i) {
                    if (value == name) {
                        index = i;
                    }
                });
                return name + "(" + clientcounts[index].value + "/" + zhanTotal + ")";
            }
        },
        series: [
            {
                color: ['#EE585B', '#FFAB48', '#65D580'],
                name: '个数',
                type: 'pie',
                center: ['50%', '52%'],
                radius: ['65%', '80%'],
                label: {
                    position: 'center',
                    show: false,
                    emphasis: {
                        show: false,
                        formatter: "{S|{c}}\n{B|{b}}",
                        textStyle: {
                            fontWeight: 'bold',
                            rich: {
                                B: {
                                    fontSize: 14,

                                },
                                S: {
                                    fontSize: 20,
                                    fontWeight: 'bolder',
                                    lineHeight: 40,
                                },
                                L: {
                                    fontSize: 16,
                                }
                            }
                        }
                    },
                },
                data: data
            }
        ]
    }
    return option;
}
</script> 
<style scoped>
.chart_legend {
    flex-direction: column;
}

.chart_legend_led {
    -webkit-box-pack: space-around;
    -moz-justify-content: space-around;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    padding: 1.125rem 0;
    margin-left: 4.5rem;
    padding-left: 2rem;
}

.chart_legend_led .legend_item p {
    color: #fff;
}

.chart_legend_led .legend_label {
    font-size: 20px;
    font-family: led;
    line-height: 2.5rem;
}
.legend_item p{
    margin-bottom: 2px;
}
</style>