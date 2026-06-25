<template>
    <div class="m-box">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()" style="width: 120px;">{{ onetitleName }}</p>
            <span class="spanTitle"></span>
        </div>
        <div class="txt">
            <!-- <div style="height: 100%;color: white;width: 100%;text-align: center; height: 22vh;">
                水情报表
            </div> -->
            <Echarts :width="'100%'" :height="'100%'" :option="lineOption" :key="datekey" :id="dateid" />
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
    <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 70%; height: 700px">
        <TaihuSWZB />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray,SetNull } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";
import { convertToDate } from "@/api/dateUtil.js";
import { ref, onMounted, reactive } from "vue";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const lineOption = ref({});
// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
const dateid = ref("TbaSW");
const stime = ref({});
const etime = ref({});
const stcdList = ref("63205350,63301150,63205150,63403500");
const onetitleName = ref("上游水情");
const props = defineProps({
    stcd: {
        type: String,
        default: "",
    },
});
function Weacontent() {
    var nowTM = new Date();
    var strParam = {};
    strParam["stcd"] = stcdList.value;
    strParam["pathname"] = "HOUR";
    strParam["stime"] = stime.value;
    strParam["datasource"] = "BX";
    strParam["etime"] = etime.value;
    // strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss"))
    //   .add(-3, "hour")
    //   .format("YYYY-MM-DD HH:mm:ss");
    // strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
    api.DuoSel(strParam)
      .then((res) => {
        const listSTCD=res.data.listSTCD;
        const strJson =res.data.list;
        const strNote = [];
        strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
        listSTCD.map(u=>{
            //63205150:昆山
            const stcd=u.split(":")[0];
            const stnm=u.split(":")[1];            
            strNote.push({ name: stnm, codename: stcd+"upz", tableV: "0", isShow: true });
        });
        // console.error('strNote',strNote,'strJson',strJson);
        if (strJson.length > 0) {
            var LineColor = ['#49CDFF', "#1EDC46", "#76dbd1", "#F5E965", "#FFE000", "#FFA572", "#FF5E9E", "#FF6038", "#E910F4", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
            const _Option = chartSW(strJson, strNote, LineColor, "水位","Mouth");
            lineOption.value = _Option;
            datekey.value = Date.now();
        }
    })
    .catch((err) => {
      console.error(err);
    });
}
function fangda() {
    var dialogClass = $(".dialog").css("display");
    if (dialogClass == "block") {
        return false;
    }
    $(".g-rside ").css({ "z-index": 99 });
    $(".g-lside ").css({ "z-index": 90 });
    showDialog.value = true;
    dateid.value = "TbaSW1";
}
onMounted(() => {
    var now = new Date();
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD 08:00:00"))
        .add(-1, "day")
        .format("YYYY-MM-DD HH:mm:ss");
    etime.value = dayjs(now).format("YYYY-MM-DD HH:mm:ss");

    Weacontent();
});

function chartSW(data, strNote, LineColor, max_min_Name) {
           
            //echarts.init(document.getElementById('quxian'), 'macarons');
            var chartName = []; 	//控件元素名称
            var chartTM = []; 	//时间序列
            var chartValue = []; //时间序列
            var liststr = ""; 	//拼装表格
            var ShowSelected = {};
            var m = new Array();
            $.each(strNote, function (index, value, item) {
                chartName.push(value.name);   //Echarts绘制标注名称加入
                ShowSelected[value.name] = value.isShow;
            });
            //循环数据，加入有效数据。
            $.each(data, function (index, value, item) {
                var charthan = []; 	//时间序列
                $.each(strNote, function (index1, value1, item1) {
                    charthan.push(value[value1.codename]); //加入集合
                    if (value1.name == "时间") {
                        //chartTM.push(new Date(value[value1.codename].replaceAll("-","/")).format("MM-dd HH:mm")); //加入时间集合
                        chartTM.push(value[value1.codename]); //加入时间集合
                    }
                    else {
                        chartValue.push(value[value1.codename]);
                    }
                });
                m.push(charthan); //加入集合
            });
            //获得最大值最小值
            //var max_min=GetSort(chartValue);
            var option = {
                //backgroundColor: '#100E19',
                noDataLoadingOption: {
                    text: '暂无数据',
                    effect: 'bubble',
                    effectOption: {
                        effect: {
                            n: 0 //气泡个数为0
                        }
                    },
                    textStyle: {
                        fontSize: 30,
                        fontWeight: 'bold'
                    }
                },
                tooltip: {
                    //showDelay: 0,
                    //hideDelay: 50,
                    //transitionDuration: 0,
                    //backgroundColor: 'rgba(255,255,255,0.9)',
                    //borderColor: '#4040FB',
                    //borderRadius: 8,
                    //borderWidth: 2,
                    //padding: 10,
                    //textStyle: {
                    //    color: '#000000'
                    //},
                    trigger: 'axis'
                },
                color: LineColor,
                legend: {
                    data: chartName,
                    itemWidth: 8,
                    itemHeight: 8,
                    textStyle: {
                        color: '#cbcccc',
                        fontSize: 12
                    },
                    selected: ShowSelected
                    //selected: {
                    //    '警戒水位': false
                    //}

                }, grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '3%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: chartTM,
                        axisLine: {
                            lineStyle: {
                                color: '#00FFFF',
                                width: 1, //这里是为了突出显示加上的
                            },
                            textStyle: {
                                color: '#00FFFF',
                                fontSize: '16'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        name: "水位(m)",
                        type: 'value',
                        boundaryGap: false,
                        splitNumeber: 5,
                        scale: true, //是否自动计算最大最小值。
                        splitLine: {
                            show: true,
                            lineStyle: {
								color: 'rgba(0,255,255,.2)',
                            }
                        },
                        min: function (value) {
                            var jiange = (value.max - value.min).toFixed(2) * 100;
                            var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                            jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)

                            if ((jiangenew - jiange - 1) == 0) {
                                jiangenew = jiangenew * 2;
                            }
                            var minValue;
                            if ((jiangenew - jiange) % 2 == 0) {
                                minValue = value.min - (jiangenew - jiange) / 20;
                            }
                            else {
                                minValue = value.min - (jiangenew - jiange - 1) / 20;
                            }
                            //if (minValue < 0) {
                            //    minValue = 0;
                            //}
                            return minValue;
                        },
                        max: function (value) {
                            var jiange = (value.max - value.min).toFixed(2) * 100;
                            var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                            jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                            if ((jiangenew - jiange - 1) == 0) {
                                jiangenew = jiangenew * 2;
                            }
                            if (jiangenew < 5) jiangenew = 5;

                            if ((jiangenew - jiange) % 2 == 0) {
                                return value.max + (jiangenew - jiange) / 30;
                            }
                            else {
                                return value.max + (jiangenew - jiange + 1) / 30;
                            }
                            // return 3.10;

                        },
                        axisLabel: {
                            formatter: function (v) {
                                return v.toFixed(2);
                            },
							textStyle: {
								color: '#00FFFF'
							}
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#00FFFF',
                                width: 1,//这里是为了突出显示加上的
                                shadowBlur: 0,
                                shadowOffsetX: 0,
                            },
                            textStyle: {
                                color: '#00FFFF',
                                fontSize: '16'
                            },
                        }
                    }
                ],
                series: function () {
                    var serie = [];
                    for (var j = 0; j < chartName.length; j++) {
                        if (chartName[j] == "时间") //调过时间字段
                        {
                            continue;
                        }
                        var chartValue = []; 	//声明过线value集合
                        for (var i = 0; i < m.length; i++) {
                            chartValue.push(m[i][j]); //循环价值
                        }
                        if (chartName[j] == "水位") {
                            var item = {
                                name: chartName[j],
                                type: 'line',
                                data: chartValue,
                                connectNulls: false,
                                itemStyle: {
									color: "rgba(25,163,223,1)",
                                },
                                markPoint: {
									offset: [0, 0],
									textStyle: {
										color: "#ffffff",
										fontSize: 13,
									},
									formatter: function (e) {
										var value = Number(e.value).toFixed(2);
										return value;
									}
                                },
                                symbol: "none",
                                smooth: true,
                                areaStyle: { //区域填充样式
                                    normal: {
                                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
											color: "rgba(25,163,223,.6)"
                                        },
                                        {
                                            offset: 1,
											color: "rgba(25,163,223, 0.1)"
                                        }
                                        ], false),
										shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
                                        shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                                    }
                                },
                            }
                            serie.push(item);
                        } else {
                            var item = {
                                name: chartName[j],
                                type: 'line',
                                data: chartValue,
                                connectNulls: true,
                                //markPoint: {
                                //    data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
                                //},
                                symbol: "none",
                                smooth: true,
                                itemStyle: {
                                    borderWidth: 1

                                },
                            }
                            serie.push(item);
                        }
                    };
                    return serie;
                }()
            };
            return option;
        }
</script>
