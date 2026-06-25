import * as echarts from 'echarts'
// 添加echarts-gl扩展导入
import 'echarts-gl'
import dayjs from "dayjs";
import $ from "jquery";
import { changeTwoDecimal, GetSZState, getPieces, getColor, DatType, SetNull, getPie3D } from "@/api/ComUnit.js";
import { center } from '@turf/turf';
var myData = [];
/* 过程线绘制 过程线 水位
* ChartName画图控件名称
* dataS数据对象，数据格式json
* strNote数据说明，数据类型数组，数据格式
* json 格式说明 name数据类型名称，codename数据表示，tableV 表格是否显示，isShow 是否显示过程线
* [
* {"name": "时间","codename": "TM","tableV":"1","isShow":true},
* {"name": "上游水位","codename": "UPZ","tableV":"1","isShow":true},
* {"name": "下游水位","codename": "DWZ","tableV":"1","isShow":true},
* {"name": "控制水位","codename": "WRZ","tableV":"0","isShow":false}
 
* ]
*/
// TimeType：表示X轴时间的根式类型【Mouth：05-05 08:00；Day:05-05；Hour：08；】；
// NameType：表示X轴文字旋转【rotate】的角度；
// theme：表示主题类型
// TimeName：表示X轴是时间还是名称
//showTpye：表示是否在柱状上显示数值
export default {
    // 水位过程线
    chartSW: (ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "水位(m)";
        }

        //echarts.init(document.getElementById('quxian'), 'macarons');
        var chartName = []; //控件元素名称
        var chartTM = []; //时间序列
        var chartValue = []; //时间序列
        var liststr = ""; //拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else if (TimeType == "Day") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        if (data.length == 0) {
            var titleShow = true
        } else {
            var titleShow = false
        }
        var option = {
            title: {
                show: titleShow, // 是否显示title
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'rgba(255,255,255,0.50)',
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            //backgroundColor: '#100E19',
            tooltip: {
                trigger: 'axis'
            },
            color: LineColor,
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
                icon: 'circle',
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: false
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: false,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: chartTM,
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
                    fontSize: 14,
                },
            }],
            yAxis: [{
                name: max_min_Name,
                nameTextStyle: {
                    padding: [0, 0, 0, -20]
                },
                type: 'value',
                boundaryGap: false,
                // splitNumeber:5,
                scale: true, //是否自动计算最大最小值。
                //min:max_min.min, //动态设置最大值最小值。
                //max:max_min.max,
                min: function (value) {
                    var jiange = (value.max - value.min).toFixed(2) * 100;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }

                    if ((jiangenew - jiange) % 2 == 0) {
                        // return value.min - (jiangenew - jiange) / 20;
                        if ((jiangenew - jiange) < 5) {
                            return value.min - (jiangenew - jiange) / 20 - 0.5;
                        } else {
                            return value.min - (jiangenew - jiange) / 20;
                        }

                    } else {
                        if ((jiangenew - jiange) < 5) {
                            return value.min - (jiangenew - jiange) / 20 - 0.5;
                        } else {
                            return value.min - (jiangenew - jiange) / 20;
                        }
                    }
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
                        if ((jiangenew - jiange) < 5) {
                            return value.max + (jiangenew - jiange) / 30 + 0.5;
                        } else {
                            return value.max + (jiangenew - jiange) / 30;
                        }
                    } else {
                        if ((jiangenew - jiange) < 5) {
                            return value.max + (jiangenew - jiange + 1) / 30 + 0.5;
                        } else {
                            return value.max + (jiangenew - jiange + 1) / 30;
                        }
                    }
                },
                axisLabel: {
                    formatter: function (v) {
                        return v.toFixed(2);
                    },
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                splitLine: {
                    show: true,
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
            }],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; //声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (isNaN(m[i][j]) == false) {
                            chartValue.push(m[i][j]); //循环价值
                        }
                        else {
                            chartValue.push(null);
                        }
                    }
                    if (chartName[j] == "实时" || chartName[j] == "上游水位") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                color: "rgba(25,163,223,1)",
                                //borderColor: "#646ace",
                                //borderWidth: 1

                            },
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#ffffff",
                                        fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            },
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
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "预报") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                // color: "rgba(22,255,141,1)",
                                normal: {
                                    lineStyle: {
                                        width: 2,
                                        type: 'dashed'  //'dotted'点型虚线 'solid'实线 'dashed'线性虚线
                                    }
                                },
                                textStyle: {
                                    color: "#000000",
                                },
                            },
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#000000",
                                        fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            },
                            markLine: {
                                symbol: ["none", "none"], //箭头 
                                silent: true,
                                data: [{ xAxis: '03-11 00:00' }],
                                itemStyle: {
                                    normal: {
                                        shadowColor: '#16FF8D',
                                        color: '#16FF8D',
                                        shadowBlur: 10,
                                    }
                                },
                                label: {
                                    normal: {
                                        formatter: 2.48,
                                        textStyle: {
                                            color: "#16FF8D", //color of value
                                            fontSize: 14
                                        }
                                    }
                                }
                            },
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "警戒") {
                        var item = {
                            name: '警戒',
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            showSymbol: false,//去掉数据点
                            endLabel: {
                                show: true,//只显示折线图最后一个数据
                                offset: [-30, -20],
                                fontSize: 14,
                                color: 'inherit',
                                formatter: function (params) {
                                    // params 是一个包含数据信息的对象
                                    return Number(params.value).toFixed(2); // 将数值保留两位小数
                                },
                            },
                            itemStyle: {
                                // borderWidth: 1,
                                normal: {
                                    show: true,
                                    color: '#FF9E43',
                                    lineStyle: {
                                        // 设置线的宽度
                                        width: 2,
                                        //'dotted'虚线 'solid'实线
                                        type: 'solid',
                                        // opacity: 0.8      // 设置透明度为 0.5 (即50%透明)
                                    }
                                },
                            },
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "保证") {
                        var item = {
                            name: '保证',
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            showSymbol: false,//去掉数据点
                            endLabel: {
                                show: true,//只显示折线图最后一个数据
                                offset: [-30, -20],
                                fontSize: 14,
                                color: 'inherit',
                                formatter: function (params) {
                                    // params 是一个包含数据信息的对象
                                    return Number(params.value).toFixed(2); // 将数值保留两位小数
                                },
                            },
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: '#EE585B',
                                    lineStyle: {
                                        // 设置线的宽度
                                        width: 2,
                                        //'dotted'虚线 'solid'实线
                                        type: 'solid'
                                    }
                                },
                            },
                        }
                        serie.push(item);
                    }
                    else if (chartName[j] == "历史最高") {
                        var item = {
                            name: '历史最高',
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            showSymbol: false,//去掉数据点
                            endLabel: {
                                show: true,//只显示折线图最后一个数据
                                offset: [-30, -20],
                                fontSize: 14,
                                color: 'inherit',
                                formatter: function (params) {
                                    // params 是一个包含数据信息的对象
                                    return Number(params.value).toFixed(2); // 将数值保留两位小数
                                },
                            },
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: '#E117D2',
                                    lineStyle: {
                                        // 设置线的宽度
                                        width: 2,
                                        //'dotted'虚线 'solid'实线
                                        type: 'solid'
                                    }
                                },
                            },
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                        };
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        // myChart.resize();
        // myChart.setOption(option);
        // window.addEventListener("resize", function () {
        //     myChart.resize();
        // }); 
        return option;

    },
    // 累计降雨量
    chartYL: (ChartName, data, strNote, LineColor, max_min_Name, NameType, theme, TimeName, TimeType, DecimalP = 1,labelShow=true,legendShow=false) => {
        var barWidthVal;
        if (data.length == 5) {
            barWidthVal = '18%';
        } else if (data.length == 4) {
            barWidthVal = '13%';
        } else if (data.length == 3) {
            barWidthVal = '8%';
        } else if (data.length == 2) {
            barWidthVal = '4%';
        } else if (data.length == 1) {
            barWidthVal = '1%';
        } else {
            barWidthVal = '26%';
        }
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        // var myChart = echarts.init(document.getElementById(ChartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();
        if (max_min_Name == "雨量") {
            max_min_Name = "雨量（mm）";
        }
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var liststr = ""; 	//拼装表格
        var m = new Array();
        var Drptotal = 0;
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Hour") {
                        chartTM.push((dayjs(value[item.codename]).format("HH"))); //加入时间集合
                    } else if (TimeType == "Day") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD"))); //加入时间集合
                    } else if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    }else if (TimeType == "Hours") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH"))); //加入时间集合
                    }
                     else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    // chartTM.push(value[item.codename]); //加入时间集合
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                    Drptotal += value[item.codename]
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        // var max_min = GetSort(chartValue);

        if (NameType == "true") {
            var rotate = 0
        } else {
            var rotate = 45
        }

        if (chartValue[0] === undefined) {
            var titleShow = true
            var Yoffset = '45%';
        } else if (Drptotal == 0) {
            var titleShow = true
            var Yoffset = '30%';
        } else {
            var titleShow = false
            var Yoffset = '30%';
        }
        var option = {
            title: {
                // 是否显示title
                show: titleShow,
                text: '无数据',
                x: 'center',
                y: Yoffset,
                textStyle: {
                    color: titleColor,
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    //type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 1,
                        opacity: 1
                    }
                },
                formatter: function (params) {
                    let res = params[0].axisValue + '<br/>';
                    params.forEach(function (item) {
                        res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(DecimalP) + '<br/>';
                    });
                    return res;
                }
            },
            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {
                        show: true, // 显示导出图片按钮
                        type: 'png', // 导出图片格式为 PNG
                        name: 'echart_image', // 导出图片文件名
                        pixelRatio: 2, // 图片清晰度，数值越大越清晰
                        // 设置图标颜色
                        iconStyle: {
                            normal: {
                                borderColor: toolboxColor, // 正常状态下边框颜色
                            },
                            emphasis: {
                                borderColor: axisLineColor, // 鼠标悬停时边框颜色
                            }
                        },
                        // 设置提示文字样式和位置
                        title: '导出图片',
                        textStyle: {
                            color: axisLabelColor, // 文字颜色
                            fontSize: 12 // 文字大小
                        },
                        // 调整提示文字位置
                        orient: 'vertical', // 垂直布局
                        itemGap: 10 // 图标与文字间距

                    }
                }
            },
            color: LineColor,
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
                show: legendShow
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: chartTM,
                    boundaryGap: true,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        rotate: rotate,
                        fontSize: 14,
                        textStyle: {
                            color: axisLabelColor
                        },
                        formatter: function (value) {
                            if (NameType == "true" && TimeName != "时间") {
                                var name = value.split("").join("\n")
                                if (Number(name.length) > 7) {
                                    return name.slice(0, 5) + "\n...";
                                } else {
                                    return name;
                                }
                            } else {
                                return value
                            }
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    boundaryGap: ['5%', '5%'],
                }
            ],
            yAxis: [
                {
                    name: max_min_Name,
                    nameTextStyle: {
                        padding: [0, 0, 0, 0]
                    },
                    type: 'value',
                    min: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        var minVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            minVal = value.min - (jiangenew - jiange) / 20;
                        } else {
                            minVal = value.min - (jiangenew - jiange - 1) / 20;
                        }
                        if (minVal <= 0) {
                            minVal = 0;
                        }
                        return Number(minVal).toFixed(DecimalP);
                    },
                    max: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        if (jiangenew < 5) jiangenew = 5;
                        var maxVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            maxVal = value.max + (jiangenew - jiange) / 30;
                        } else {
                            maxVal = value.max + (jiangenew - jiange + 1) / 30;
                        }
                        if (maxVal < 1) {
                            maxVal = 5;
                        }
                        return Number(maxVal).toFixed(DecimalP);
                    },
                    boundaryGap: false,
                    splitNumeber: 5,
                    axisTick: {
                        alignWithLabel: true,
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: splitLineColor
                        }
                    },
                    splitArea: {     // 网格区域
                        show: false   // 是否显示，默认为false
                    },
                    //scale: true, //是否自动计算最大最小值。
                    min: 0,
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(DecimalP);
                        },
                        fontSize: 14,
                    },
                }
            ],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (Number(m[i][j]) >= 0) {
                            chartValue.push(Number(m[i][j]).toFixed(DecimalP)); //循环价值
                        } else {
                            chartValue.push(null);
                        }
                    }
                    if (max_min_Name != "") {
                        var jycolor=new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#0099FF'
                        }, {
                            offset: 1,
                            color: '#00FFFF'
                        }]);
                        if(chartName[j] == "多年平均"){
                            jycolor= new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#FF0000'
                            }, {
                                offset: 1,
                                color: '#FF6D6D'
                            }]);
                            labelColor='#FF6D6D';
                        }
                        else if(chartName[j] == "预报"){
                            jycolor= new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#38DB00'
                            }, {
                                offset: 1,
                                color: '#A9FF8D'
                            }]);
                            labelColor='#A9FF8D';
                        }
                        var item = {
                            name: chartName[j],
                            type: 'bar',
                            data: chartValue,
                            barWidth: barWidthVal,
                            symbol: 'none',
                            label: {
                                normal: {
                                    show: labelShow,
                                    position: 'top',
                                    formatter: function (params) {
                                        if (params.value == 0) {
                                            return 0;
                                        }
                                        else{
                                            return params.value;
                                        }

                                    },
                                    textStyle: {
                                        color: labelColor, //color of value
                                        fontSize: 14
                                    }
                                }
                            },
                            // 相邻柱状之间的空隙
                            // barGap: '0%',
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: jycolor,
                                    borderWidth: 0,
                                    barBorderRadius: [15, 15, 0, 0],
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(105,123, 214, 0.7)'
                                }
                            },
                            smooth: true
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            smooth: true
                        }
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        // myChart.setOption(option);
        var tt = chartValue.filter(function (ex) {
            return ex != undefined && ex > 0;
        })
        return option;
    },
    // 水量过程
    chartSL: (chartName, data, strNote, LineColor, max_min_Name, TimeType, theme, showTpye, NameType, TimeName) => {
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, jinitemStyleColor, chuitemStyleColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            jinitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00fd6d'
            }, {
                offset: 1,
                color: '#00FFFF'
            }]);
            chuitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#0099FF'
            }, {
                offset: 1,
                color: '#00FFFF'
            }]);
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#074159";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            jinitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(15,226,82, 1)'
            }, {
                offset: 1,
                color: 'rgba(15,226,82, 0)'
            }]);
            chuitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(80,202,225, 1)'
            }, {
                offset: 1,
                color: 'rgba(80,202,225, 0)'
            }]);
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var barWidthVal;
        if (data.length == 5) {
            barWidthVal = '18%';
        } else if (data.length == 4) {
            barWidthVal = '13%';
        } else if (data.length == 3) {
            barWidthVal = '8%';
        } else if (data.length == 2) {
            barWidthVal = '4%';
        } else if (data.length == 1) {
            barWidthVal = '2%';
        } else {
            barWidthVal = '26%';
        }
        // var myChart = echarts.init(document.getElementById(ChartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();
        if (max_min_Name == "水量") {
            max_min_Name = "水量（万方）";
        }
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var liststr = ""; 	//拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });
        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Day") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        // var max_min = GetSort(chartValue);
        if (data.length > 0) {
            var titleShow = false
            var Yoffset = '45%';
        } else {
            var titleShow = true
            var Yoffset = '30%';
        }
        var option = {
            title: {
                // 是否显示title
                show: titleShow,
                text: '无数据',
                x: 'center',
                y: Yoffset,
                textStyle: {
                    color: titleColor,
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    //type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 1,
                        opacity: 1
                    }
                },
                formatter: function (params) {
                    let res = params[0].axisValue + '<br/>';
                    params.forEach(function (item) {
                        if (NameType == "true" && TimeName != "时间") {
                            res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(0) + '<br/>';
                        } else {
                            res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(1) + '<br/>';
                        }
                    });
                    return res;
                }
            },
            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {
                        show: true, // 显示导出图片按钮
                        type: 'png', // 导出图片格式为 PNG
                        name: 'echart_image', // 导出图片文件名
                        pixelRatio: 2, // 图片清晰度，数值越大越清晰
                        // 设置图标颜色
                        iconStyle: {
                            normal: {
                                borderColor: toolboxColor, // 正常状态下边框颜色
                            },
                            emphasis: {
                                borderColor: axisLineColor, // 鼠标悬停时边框颜色
                            }
                        },
                        // 设置提示文字样式和位置
                        title: '导出图片',
                        textStyle: {
                            color: axisLabelColor, // 文字颜色
                            fontSize: 12 // 文字大小
                        },
                        // 调整提示文字位置
                        orient: 'vertical', // 垂直布局
                        itemGap: 10 // 图标与文字间距

                    }
                }
            },
            color: LineColor,
            legend: {
                data: chartName,
                width: '90%',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: chartTM,
                    boundaryGap: true,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        // interval: 0,
                        fontSize: 14,
                        rotate: 0,
                        textStyle: {
                            color: axisLineColor
                        },
                        formatter: function (value) {
                            if (NameType == "true" && TimeName != "时间") {
                                var name = value.split("").join("\n")
                                if (Number(name.length) > 7) {
                                    return name.slice(0, 5) + "\n...";
                                } else {
                                    return name;
                                }
                            } else {
                                return value
                            }
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    boundaryGap: ['5%', '5%'],
                }
            ],
            yAxis: [
                {
                    name: max_min_Name,
                    nameTextStyle: {
                        padding: [0, 0, 0, 0]
                    },
                    type: 'value',
                    min: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        var minVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            minVal = value.min - (jiangenew - jiange) / 20;
                        } else {
                            minVal = value.min - (jiangenew - jiange - 1) / 20;
                        }
                        if (minVal <= 0) {
                            minVal = 0;
                        }
                        return Number(minVal).toFixed(1);
                    },
                    max: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        if (jiangenew < 5) jiangenew = 5;
                        var maxVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            maxVal = value.max + (jiangenew - jiange) / 30;
                        } else {
                            maxVal = value.max + (jiangenew - jiange + 1) / 30;
                        }
                        if (maxVal < 1) {
                            maxVal = 5;
                        }
                        return Number(maxVal).toFixed(1);
                    },
                    boundaryGap: false,
                    splitNumeber: 5,
                    axisTick: {
                        alignWithLabel: true,
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: splitLineColor
                        }
                    },
                    splitArea: {     // 网格区域
                        show: false   // 是否显示，默认为false
                    },
                    //scale: true, //是否自动计算最大最小值。
                    min: 0,
                    axisLabel: {
                        fontSize: 14,
                        formatter: function (v) {
                            return v.toFixed(0);
                        }
                    },
                }
            ],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (Number(m[i][j]) >= 0) {
                            chartValue.push(Number(m[i][j]).toFixed(1)); //循环价值
                        } else {
                            chartValue.push(null);
                        }
                    }
                    var item = {
                        name: chartName[j],
                        type: 'bar',
                        data: chartValue,
                        barWidth: barWidthVal,
                        smooth: true,
                        label: {
                            normal: {
                                show: showTpye,
                                position: 'top',
                                formatter: function (params) {
                                    if (NameType == "true" && TimeName != "时间") {
                                        return Math.abs(params.value).toFixed(0);
                                    } else {
                                        return Math.abs(params.value).toFixed(1);
                                    }
                                },
                                color: "#FFF",
                                fontSize: 14
                            },
                        },
                        itemStyle: {
                            normal: {
                                show: true,
                                borderWidth: 0,
                                barBorderRadius: [30, 30, 0, 0],
                            },
                            emphasis: {
                                shadowBlur: 10,
                            }
                        },
                    }
                    serie.push(item);
                };
                return serie;
            }()
        };
        // myChart.setOption(option);
        return option;
    },
    // 流量过程线
    chartLL: (ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "流量(m³/s)";
        }
        // var myChart = echarts.init(document.getElementById(ChartName)); //获得控件对象
        // myChart.clear();

        //echarts.init(document.getElementById('quxian'), 'macarons');
        var chartName = []; //控件元素名称
        var chartTM = []; //时间序列
        var chartValue = []; //时间序列
        var liststr = ""; //拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(Number(value[item.codename]).toFixed(2));
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        // 预报水位过程线
        var option = {
            title: {
                show: showed, // 是否显示title
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'rgba(255,255,255,0.50)',
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            color:LineColor,
            //backgroundColor: '#100E19',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: false
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: false,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: chartTM,
                axisLine: {
                    lineStyle: {
                        color: axisLineColor,
                        width: 1 //这里是为了突出显示加上的
                    },
                    textStyle: {
                        color: axisLineColor,
                        fontSize: '16'
                    }
                },
                axisLabel: {
                    fontSize: 14,
                }
            }],
            yAxis: [{
                name: '流量(m³/s)',
                nameTextStyle: {
                    padding: [0, 0, 0, -20]
                },
                type: 'value',
                boundaryGap: false,
                // splitNumeber:5,
                scale: true, //是否自动计算最大最小值。
                //min:max_min.min, //动态设置最大值最小值。
                //max:max_min.max,
                min: function (value) {
                    var jiange = (value.max - value.min).toFixed(2) * 100;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }

                    if ((jiangenew - jiange) % 2 == 0) {
                        return value.min - (jiangenew - jiange) / 20;
                    } else {
                        return value.min - (jiangenew - jiange - 1) / 20;
                    }


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
                    } else {
                        return value.max + (jiangenew - jiange + 1) / 30;
                    }

                },
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
                    show: true,
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
            }],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; //声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (isNaN(m[i][j]) == false) {
                            // 
                            if (SetNull(m[i][j]) != "") {
                                // chartValue.push(m[i][j]); //循环价值
                                chartValue.push(changeTwoDecimal(m[i][j], 2)); //循环价值
                            } else {
                                chartValue.push(null);
                            }

                        }
                    }
                    if (chartName[j] == "流量") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            itemStyle: {
                                normal: {
                                    color: '#000',
                                    label: {
                                        show: true,
                                        color: '#ffffff',//气泡中字体颜色
                                    }
                                }
                            },
                            markPoint: {
                                data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' },
                                ],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#000",
                                        fontSize: markSize,
                                    },
                                },
                            },
                            symbol: "none",
                            smooth: true,
                            itemStyle: {
                                //color: "rgba(20,253,129,1)",
                                //borderColor: "#646ace",
                                //borderWidth: 1
                            },
                            // areaStyle: { //区域填充样式
                            //     normal: {
                            //         //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: "rgba(20,253,129,.3)"
                            //         },
                            //         {
                            //             offset: 1,
                            //             color: "rgba(25,163,223, 0)"
                            //         }
                            //         ], false),
                            //         shadowColor: 'rgba(20,253,129, 0.5)', //阴影颜色
                            //         shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                            //     }
                            // },
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
        // myChart.resize();
        // myChart.setOption(option);
        // window.addEventListener("resize", function () {
        //     myChart.resize();
        // }); 
        return option;

    },
    chartGQ: (ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "流量(m³/s)";
        }
        // var myChart = echarts.init(document.getElementById(ChartName)); //获得控件对象
        // myChart.clear();

        //echarts.init(document.getElementById('quxian'), 'macarons');
        var chartName = []; //控件元素名称
        var chartTM = []; //时间序列
        var chartValue = []; //时间序列
        var liststr = ""; //拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                // else {
                //     chartValue.push(Number(Number(value[item.codename]).toFixed(2)));
                // }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        // 预报水位过程线
        var option = {
            title: {
                show: showed, // 是否显示title
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'rgba(255,255,255,0.50)',
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            color: LineColor,
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: false
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: false,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: chartTM,
                axisLine: {
                    lineStyle: {
                        color: axisLineColor,
                        width: 1 //这里是为了突出显示加上的
                    },
                    textStyle: {
                        color: axisLineColor,
                        fontSize: '16'
                    }
                },
                axisLabel: {
                    fontSize: 14,
                }
            }],
            yAxis: [{
                name: max_min_Name,
                nameTextStyle: {
                    padding: [0, 0, 0, -20]
                },
                type: 'value',
                boundaryGap: false,
                // splitNumeber:5,
                scale: true, //是否自动计算最大最小值。
                //min:max_min.min, //动态设置最大值最小值。
                //max:max_min.max,
                min: function (e) {
                    if (e < 0) {
                        return e;
                    } else {
                        return 0;
                    }
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
                    } else {
                        return value.max + (jiangenew - jiange + 1) / 30;
                    }

                },
                axisLabel: {
                    formatter: function (v) {
                        return v.toFixed(1);
                    },
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                splitLine: {
                    show: true,
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
            }],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        // if (m[i][j] != "" && m[i][j] != null) {
                        chartValue.push(m[i][j]); //循环价值
                        // }
                    }

                    if (max_min_Name != "") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            itemStyle: {
                                normal: {
                                    color: '#000',
                                    label: {
                                        show: true,
                                        color: '#ffffff',//气泡中字体颜色
                                    }
                                }
                            },

                            symbol: "none",
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        width: 2,
                                        type: 'solid'  //'dotted'虚线 'solid'实线
                                    }
                                }
                            },
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        width: 1,
                                        type: 'solid'  //'dotted'虚线 'solid'实线
                                    }
                                }
                            }
                        }
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        return option;

    },
    // 河道过程线
    chartHD: (chartName, data, strNote, theme,hengX=false) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, itemColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            itemColor = "#000";
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            itemColor = "#00FFFF";
        }
        // var myChart = echarts.init(document.getElementById(ChartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var chartValueWrz = [];
        var chartValueGrz = [];
        var m = new Array();

        strNote.forEach(value => {
            var _name = value.name;
            if (value.name.indexOf("（") > -1) {
                _name = value.name.substring(0, value.name.indexOf("（"));
                _name += "\n" + value.name.substring(value.name.indexOf("（"), value.name.length);
            }
            chartName.push(_name);   //Echarts绘制标注名称加入
            var tempData = data.filter(function (e) {
                return (e.stcd) == (value.codename)
            })
            if (tempData.length > 0) {
                if (tempData[0][value.codename] != "") {
                    chartValue.push(Number(tempData[0].upz).toFixed(2));
                    chartValueWrz.push(Number(tempData[0].wrz).toFixed(2));
                    chartValueGrz.push(Number(tempData[0].grz).toFixed(2));
                } else {
                    chartValue.push(tempData[0][value.codename]);
                    chartValueWrz.push(tempData[0][value.codename]);
                    chartValueGrz.push(tempData[0][value.codename]);
                }
            } else {
                chartValue.push("");
                chartValueWrz.push("");
                chartValueGrz.push("");
            }
        });
        var option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                //data: ["太浦河入口(2.8km)", "太浦闸(12.9km)", "平望(24.6km)", "金泽(13.6km)", "练塘(20.4km)", "米市渡"],
                data: chartName,
                axisLabel: {
                    interval: 0,//横轴信息全部显示
                    fontSize: 14,
                    //rotate: 30,//-30度角倾斜显示
                    position: [10, 10],
                    formatter: function (value) {
                        if(hengX){
                            var name = value.split("").join("\n");
                            return name;
                            // if (Number(name.length) > 7) {
                            //     return name.slice(0, 5) + "\n...";
                            // } else {
                            //     return name;
                            // }
                        }else{
                            return value;
                        }
                            
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: axisLineColor,
                        width: 1 //这里是为了突出显示加上的
                    },
                    textStyle: {
                        color: axisLineColor,
                        fontSize: '16'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            yAxis: {
                name: '水位(m)',
                type: 'value',
                min: 0,
                max: 6.5,
                axisLabel: {
                    formatter: function (v) {
                        return v.toFixed(2);
                    },
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                splitLine: {
                    show: true,
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
            series: [
                {
                    //data: jsonData,
                    data: chartValueWrz,
                    type: 'line',
                    connectNulls: true,
                    itemStyle: {
                        normal: {
                            show: true,
                            color: '#F7BC00',
                            shadowColor: 'rgba(25,163,223,.5)',
                            borderWidth: 0,
                            // label: {
                            //     show: true,  //开启显示
                            //     formatter: '{c}',  //显示数值
                            //     position: 'top',
                            //     textStyle: { //数值样式
                            //         fontSize: 14,
                            //         color: itemColor,
                            //     }
                            // }
                        },
                    }
                },
                {
                    //data: jsonData,
                    data: chartValueGrz,
                    type: 'line',
                    connectNulls: true,
                    itemStyle: {
                        normal: {
                            show: true,
                            color: '#F70019',
                            shadowColor: 'rgba(25,163,223,.5)',
                            borderWidth: 0,
                            // label: {
                            //     show: true,  //开启显示
                            //     formatter: '{c}',  //显示数值
                            //     position: 'top',
                            //     textStyle: { //数值样式
                            //         fontSize: 14,
                            //         color: itemColor,
                            //     }
                            // }
                        },
                    }
                },
                {
                    //data: jsonData,
                    data: chartValue,
                    type: 'line',
                    connectNulls: true,
                    itemStyle: {
                        normal: {
                            show: true,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#0099FF'
                            }, {
                                offset: 1,
                                color: 'rgba(25,163,223,.3)'
                            }]),
                            shadowColor: 'rgba(25,163,223,.5)',
                            borderWidth: 0,
                            label: {
                                show: true,  //开启显示
                                formatter: '{c}',  //显示数值
                                position: 'top',
                                textStyle: { //数值样式
                                    fontSize: 14,
                                    color: itemColor,
                                }
                            }
                        },
                    },
                    areaStyle: {},
                },
            ]
        };

        return option;
    },
    // 饼图：超警超保统计个数
    echartCJpei: (chartName, data, valuedata1, percentdata, colorArr, colorAlpha, theme) => {
        var legendColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            legendColor = "#000";
        } else if (theme == "default") {
            legendColor = "#fff";
        }
        // var myChart = echarts.init(document.getElementById(chartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();
        var seriesdata1 = [
            {
                name: '正常',
                value: valuedata1[0],
                percent: percentdata[0],
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        // shadowBlur: 20,
                        borderColor: colorAlpha[0],
                        // shadowColor: colorArr[0],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: colorArr[0],
                            },
                            {
                                offset: 1,
                                color: colorAlpha[0],
                            },
                        ]),
                    },
                },
            },
            {
                name: '超警',
                value: valuedata1[1],
                percent: percentdata[1],
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        shadowBlur: 20,
                        borderColor: colorAlpha[1],
                        // shadowColor: colorArr[1],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: colorArr[1],
                            },
                            {
                                offset: 1,
                                color: colorAlpha[1],
                            },
                        ]),
                    },
                },
            }, 
            {
                name: '超保',
                value: valuedata1[2],
                percent: percentdata[2],
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        shadowBlur: 20,
                        borderColor: colorAlpha[2],
                        // shadowColor: colorArr[1],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: colorArr[2],
                            },
                            {
                                offset: 1,
                                color: colorAlpha[2],
                            },
                        ]),
                    },
                },
            },
            {
                name: '缺测',
                value: valuedata1[3],
                percent: percentdata[3],
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        // shadowBlur: 20,
                        borderColor: colorAlpha[3],
                        // shadowColor: colorArr[2],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: colorArr[3],
                            },
                            {
                                offset: 1,
                                color: colorAlpha[3],
                            },
                        ]),
                    },
                },
            },
        ]

        function array2obj(seriesdata1, name) {
            var resObj = {};
            for (var i = 0; i < seriesdata1.length; i++) {
                resObj[seriesdata1[i][name]] = seriesdata1[i];
            }
            return resObj;
        }
        var objData = array2obj(seriesdata1, 'name');

        //将合计值转换为数组
        var totlenum = Number(valuedata1[0]) + Number(valuedata1[1]) + Number(valuedata1[2])+ Number(valuedata1[3])
        var h = '' + totlenum + '';
        var arr = h;
        var m = '';

        for (var i = 0; i < arr.length; i++) {
            m += '{a|' + arr[i] + '}';
            if (i != arr.length - 1) {
                m += '  ';
            }
        }

        var option = {
            grid: {
                x: '10%',
                y: '3',
                x2: '5%',
                y2: '5%',
                borderWidth: 1,
                borderColor: '#f0f0f0',
            },
            title: [
                {
                    show: true,
                    text: '{a|名称}{b|数量}{c|占比}',
                    top: '28%',
                    left: '58%',
                    textStyle: {
                        rich: {
                            a: {
                                align: 'center',
                                fontSize: 14,
                                color: legendColor,
                                width: 16,
                                padding: [0, 0, 0, 25],
                            },
                            b: {
                                align: 'center',
                                fontSize: 14,
                                color: legendColor,
                                width: 5,
                                padding: [0, 0, 0, 36],
                            },
                            c: {
                                align: 'center',
                                fontSize: 14,
                                color: legendColor,
                                width: 5,
                                padding: [0, 0, 0, 45],
                            },
                        },
                    },
                },
                {
                    text: '{b|站点总数：}' + m,
                    left: '77%',
                    top: '1%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '12',
                        color: legendColor,
                        textAlign: 'center',
                        rich: {
                            a: {
                                fontSize: '28',
                                backgroundColor: 'rgba(56,89,255,0.2)',
                                borderColor: 'rgba(56,211,255,1)',
                                borderWidth: 1,
                                padding: [12, 6, 6, 6],
                                shadowColor: 'rgba(56,211,255,1)',
                                shadowBlur: 3,
                                borderRadius: 3,
                                fontFamily: 'led',
                            },
                            b: {
                                fontSize: '16',
                                fontWeight: 'bold',
                                padding: [6, 6, 6, 6],
                                color: legendColor,
                            },
                        },
                    },
                },
            ],
            legend: {
                show: true,
                //icon: 'circle',
                orient: 'vertical',
                top: '40%',
                left: '58%',
                itemGap: 15,
                itemWidth: 15,
                itemHeight: 10,
                data: seriesdata1,
                formatter: function (name) {
                    return '{a|' + name + '}{b|' + objData[name].value.toFixed(0) + '}{c|' + objData[name].percent + '%}';
                },
                textStyle: {
                    rich: {
                        a: {
                            align: 'center',
                            fontSize: 14,
                            color: legendColor,
                            width: 26,
                            padding: [0, 0, 0, 0],
                        },
                        b: {
                            align: 'center',
                            fontSize: 14,
                            color: legendColor,
                            width: 5,
                            padding: [0, 0, 0, 30],
                        },
                        c: {
                            align: 'center',
                            fontSize: 14,
                            color: legendColor,
                            width: 5,
                            padding: [0, 0, 0, 50],
                        },
                    },
                },
            },
            series: {
                type: 'pie',
                center: ['30%', '55%'],
                radius: ['60%', '80%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    normal: {
                        borderColor: '#ccc',
                        borderWidth: 0,
                    }
                },
                label: {
                    show: true,
                    position: 'center',
                    show: false,
                    emphasis: {
                        show: true,
                        formatter: function (data) {
                            // return (
                            //     '{name|' +
                            //     data.name + ':' +
                            //     '}' +
                            //     ' {value|' +
                            //     data.percent.toFixed(2) +
                            //     '%}'
                            // );
                            return "{value|" + data.value.toFixed(0) + "}\n{name|" + data.name + "}";
                        },
                        textStyle: {
                            rich: {
                                name: {
                                    fontSize: 14,
                                    color: colorArr,
                                },
                                value: {
                                    lineHeight: 50,
                                    fontSize: 36,
                                    color: colorArr,
                                    fontFamily: 'led',
                                    padding: [20, 0, 0, 0],
                                },
                            },
                        }
                    }

                },
                labelLine: {
                    show: false,
                    normal: {
                        length: 10,
                        length2: 20,
                        align: 'right',
                        lineStyle: {
                            width: 1,
                        },
                    },
                },
                data: seriesdata1,
                seriesIndex: 0,
            },
        };

        return option;
    },
    // 圩区水位
    chartWQSW: (chartName, data, strNote, theme) => {
        var legendColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            legendColor = "#000";
        } else if (theme == "default") {
            legendColor = "#fff";
        }
        var mubiaoData = [];
        var jingjieData = [];
        var wanchengData = [];
        var chartValueName = [];

        //循环数据，加入有效数据。
        data.forEach(value => {
            var charthan = []; //时间序列
            strNote.forEach(value1 => {
                if (value1.name == "时间") {
                    chartTM.push(value[value1.codename]); //加入时间集合
                } else if (value1.codename == "wqwrz") {
                    if (value[value1.codename] != undefined) {
                        jingjieData.push(Number(value[value1.codename]).toFixed(2));
                    } else {
                        jingjieData.push('-');
                    }
                } else if (value1.codename == "wqgrz") {
                    if (value[value1.codename] != undefined) {
                        mubiaoData.push(Number(value[value1.codename]).toFixed(2));
                    } else {
                        mubiaoData.push('-');
                    }
                } else if (value1.codename == "upz") {
                    if (value[value1.codename] != undefined) {
                        wanchengData.push(Number(value[value1.codename]).toFixed(2));
                    } else {
                        wanchengData.push('-');
                    }
                } else if (value1.codename == "wqname") {
                    chartValueName.push(value[value1.codename]);
                }
            });
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        var option = {
            grid: {
                left: 0,
                top: 40,
                bottom: 35,
                right: 0,
            },
            legend: {
                data: ['受淹水位', '警戒水位', '圩区水位'],
                align: 'left',
                right: 10,
                textStyle: {
                    color: legendColor,
                    fontSize: 10,
                    fontWeight: 400
                },
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 10
            },
            tooltip: {
                trigger: "axis",
                padding: [8, 10],
                axisPointer: {
                    type: "shadow",
                    textStyle: {
                        color: "#fff"
                    }
                }
            },
            xAxis: [{
                type: 'category',
                data: chartValueName,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: legendColor,
                        fontSize: 14,
                        fontWeight: 400,
                    },
                    formatter: function (value) {
                        return value.split("联圩").join("\n") + "联圩";
                    }
                }

            }],
            yAxis: [{
                show: false
            }],
            series: [
                {
                    name: "受淹水位",
                    type: "bar",
                    barMaxWidth: 18,
                    z: 0,
                    itemStyle: {
                        normal: {
                            color: "#CD2818",
                            barBorderRadius: [8, 8, 0, 0],
                            label: {
                                show: true,
                                padding: [0, 0, 0, -2],
                                textStyle: {
                                    fontSize: 14,
                                    color: "#CD2818",
                                },
                                position: "top",
                                distance: 5
                            }
                        }
                    },
                    data: mubiaoData
                },
                {
                    name: "警戒水位",
                    type: "bar",
                    barMaxWidth: 18,
                    z: 0,
                    itemStyle: {
                        normal: {
                            color: "#FF9E43",
                            label: {
                                show: true,
                                textStyle: {
                                    fontSize: 14,
                                    color: "#FF9E43",
                                    padding: [0, 0, 0, 22],
                                },
                                position: "center",
                                distance: 5
                            }
                        }
                    },
                    data: jingjieData
                },
                {
                    name: "圩区水位",
                    type: "bar",
                    //silent: true,
                    barMaxWidth: 18,
                    barGap: '-100%',
                    z: 1,
                    itemStyle: {
                        normal: {
                            color: "#1BA6FF",
                            label: {
                                show: true,
                                position: 'center',
                                distance: 0,
                                color: '#1BA6FF',
                                fontSize: 14,
                                padding: [0, 0, 0, -30],
                                borderRadius: 100
                            }
                        }
                    },
                    data: wanchengData
                }]
        };

        return option;
    },
    // 饼图：边界水量
    echartSLpei: (chartName, data, LineColor, theme, legendShow = false, legendData = [], danwei = "万方", typenl = false, DecimalP = 1, titleText = false) => {
        var legendColor, peiColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            legendColor = "#333";
            peiColor = "#363f42";
            titleColor = "#7e73e9";
            if (theme == "BlueTheme") {
                titleColor = "#61acf9";
            }
        } else if (theme == "default") {
            legendColor = "#ccc";
            peiColor = "#a5cdde";
            titleColor = "#00ffff";
        }
        var radiuscenter = ['50%', '50%']
        if (legendShow) {
            radiuscenter = ['40%', '50%'];
        }
        var Radius = ['60%', '80%'];
        var legendLeft = '70%', legendY = 'top', legendOrient = 'vertical';
        if (typenl) {
            radiuscenter = ['35%', '45%'];
            Radius = ['50%', '65%'];
            legendLeft = '5%';
            legendY = 'bottom';
            legendOrient = 'horizontal';
        }
        var option = {
            title: { // 圆环中间内容
                text: danwei,
                bottom: 'center',
                left: '32%',
                show: titleText, // 是否显示
                textStyle: {
                    color: titleColor,
                    fontSize: 20,
                    align: "center"
                },
            },
            // color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
            tooltip: {
                position: ['40%', '50%'],
                trigger: 'item',
                formatter: '{b} : {c}' + danwei + ' ({d}%) '
                // formatter: '{b} : {c} ' + danwei + '({ d } %)'
            },
            color: LineColor,
            legend: {
                orient: legendOrient,
                x: 'right',      //可设定图例在左、右、居中
                y: legendY,     //可设定图例在上、下、居中
                left: legendLeft,
                show: legendShow,
                padding: [30, 0, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                textStyle: { //图例文字的样式
                    color: legendColor,
                    fontSize: 14
                },
                data: legendData,
                formatter: function (name) {
                    var index = 0;
                    var clientlabels = legendData;
                    var clientcounts = data;
                    var nameList = "";
                    clientlabels.forEach(function (value, i) {
                        if (value == name) {
                            index = i;
                        } else if (value.name == name) {
                            index = i;
                        }
                    });
                    return name + "(" + clientcounts[index].value + ")";
                }
            },
            series: [
                {
                    color: LineColor,
                    name: '个数',
                    type: 'pie',
                    center: radiuscenter,
                    radius: Radius,
                    avoidLabelOverlap: false,
                    itemStyle: {
                        normal: {
                            borderColor: '#ccc',
                            borderWidth: 0,
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        }
                    },
                    label: {
                        position: 'center',
                        show: false,
                        emphasis: {
                            show: true,
                            // formatter: "{S|{c}}{A|万方}\n{B|{b}}",
                            formatter: function (e) {
                                if (legendShow) {
                                    var value = Number(e.value).toFixed(0);
                                } else {
                                    var value = Number(e.value).toFixed(DecimalP);
                                }
                                var name = e.name;
                                return "{S|" + value + "}{A|" + danwei + "}\n{B|" + name + "}";
                            },
                            textStyle: {
                                fontWeight: 'bold',
                                rich: {
                                    B: {
                                        fontSize: 16,
                                        color: peiColor,
                                    },
                                    A: { color: peiColor, },
                                    S: {
                                        fontWeight: 'bolder',
                                        lineHeight: 40,
                                        fontSize: 18,
                                        color: peiColor,
                                    },
                                    L: {
                                        fontSize: 16,
                                        color: peiColor,
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
    },
    chartSWLL: (ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }

        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
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
                    if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[value1.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else {
                        chartTM.push(value[value1.codename]); //加入时间集合
                    }
                } else if (value1.name == "名称") {
                    chartTM.push(value[value1.codename]);
                }
                else {
                    chartValue.push(value[value1.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        const option = {
            tooltip: {
                trigger: 'axis',
                padding: [2, 10],
                // align: 'left', 
                textStyle: {
                    fontSize: 16,
                    align: 'left'
                },
            },
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14,
                    align: 'left'
                }
            },
            color: LineColor,
            calculable: true,
            grid: {
                left: '1%',
                right: '2%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                show: true,
                type: 'category',
                boundaryGap: false,
                splitLine: {
                    lineStyle: {
                        color: splitLineColor,
                    },
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: axisLineColor,
                        width: 1, //这里是为了突出显示加上的
                    },
                    textStyle: {
                        color: axisLineColor,
                        fontSize: '16'
                    }
                },
                axisTick: {
                    show: true,
                    alignWithLabel: true,
                    lineStyle: {
                        width: 2
                    }
                },
                axisLabel: {
                    rotate: 45,
                    textStyle: {
                        color: axisLabelColor
                    },
                },
                data: chartTM
            },
            yAxis: [
                {
                    type: 'value',
                    name: '水位(m)',
                    show: true,
                    // splitNumber: 10,
                    min: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        var valueyu = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            valueyu = value.min - (jiangenew - jiange) / 200;
                        }
                        else {
                            valueyu = value.min - (jiangenew - jiange - 1) / 200;
                        }
                        if (valueyu < 2) {
                            valueyu = value.min - 0.5;
                        } else {
                            valueyu -= 0.5;
                        }
                        if (valueyu < 0) {
                            valueyu = 0;
                        }
                        return valueyu;
                    },
                    max: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        if (jiangenew < 5) jiangenew = 5;
                        var valueyu = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            valueyu = value.max + (jiangenew - jiange) / 200;
                        }
                        else {
                            valueyu = value.max + (jiangenew - jiange + 1) / 200;
                        }
                        if (valueyu < 5) {
                        } else {
                            valueyu += 1.5;
                        }
                        return valueyu;
                    },
                    axisLine: {
                        lineStyle: {
                            color: axisLineColor,
                            width: 1,//这里是为了突出显示加上的
                            shadowBlur: 0,
                            shadowOffsetX: 0,
                        },
                        textStyle: {
                            color: axisLineColor,
                            fontSize: '16'
                        },
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: axisLineColor,
                        }
                    },
                    axisLabel: {
                        fontWeight: "bold",
                        formatter: function (v) {
                            return v.toFixed(2);
                        },
                        textStyle: {
                            color: axisLabelColor
                        },
                    }
                },
                {
                    type: 'value',
                    name: '流量(m³/s)',
                    min: 0,
                    show: true,
                    nameLocation: "end",
                    position: 'right',
                    offset: 1,
                    splitLine: {
                        show: false
                    },
                    max: function (e) {
                        var max = 0;
                        if (e.max < 10) {
                            max = e.max + 5;
                        } else if (e.max >= 10 && e.max < 100) {
                            max = e.max + 10;
                        } else {
                            max = e.max + 20;
                        }
                        return max;
                    },
                    axisLabel: {
                        fontWeight: "bold",
                        formatter: function (v) {
                            return v.toFixed(1);
                        },
                        textStyle: {
                            color: axisLabelColor
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: axisLineColor,
                            width: 1,//这里是为了突出显示加上的
                            shadowBlur: 0,
                            shadowOffsetX: 0,
                        },
                        textStyle: {
                            color: axisLineColor,
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
                    if (chartName[j] == "预报水位") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            show: false,
                            "connectNulls": true, //这个是重点，将断点连接
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        width: 2,
                                        type: 'dotted'  //'dotted'点型虚线 'solid'实线 'dashed'线性虚线
                                    }
                                }
                            },
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
                                , label: {
                                    normal: {
                                        formatter: function (datas) {
                                            return Number(datas.value).toFixed(2);
                                            //或者是下面这种，效果是一样的
                                            //return datas.value.toFixed(2);
                                        }
                                    }
                                }
                            },
                            connectNulls: true,
                            data: chartValue,
                            smooth: true
                        }
                        serie.push(item);
                    }
                    else if (chartName[j] == "调度流量") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            yAxisIndex: 1,
                            "connectNulls": true, //这个是重点，将断点连接
                            data: chartValue,
                            symbol: 'none',
                            smooth: true
                        }
                        serie.push(item);
                    }
                    else if (chartName[j] == "控制水位" || chartName[j] == "警戒水位") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            "connectNulls": true, //这个是重点，将断点连接
                            yAxisIndex: 0,
                            data: chartValue,
                            symbol: 'none',
                            smooth: true,
                            itemStyle: {
                                borderWidth: 1
                            },
                            showSymbol: false,//去掉数据点
                            // endLabel: {
                            //     show: true,//只显示折线图最后一个数据
                            //     // offset: [30, 20],
                            //     fontSize: 14,
                            //     color: 'inherit',
                            // },
                            markLine: {
                                symbol: ['none', 'arrow'], // none为标线两端的样式为无，可更改
                                data: [
                                    {
                                        silent: false,
                                        yAxis: chartValue[0],  // 警戒线位置，这个赋值为纵轴50
                                        label: {
                                            position: 'end', // 文字位置 
                                            padding: [-13, -20, 15, -125],
                                            formatter: chartName[j] + '：' + chartValue[0] + "m",  //文字
                                            color: axisLabelColor  // 文字颜色
                                        },
                                        // lineStyle: { type: 'solid', color: '#FFA500', width: 2 } // 样式： 线型、颜色、线宽
                                    }
                                ]
                            }

                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            "connectNulls": true, //这个是重点，将断点连接
                            yAxisIndex: 0,
                            data: chartValue,
                            // markPoint: {
                            //     data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
                            // 	,label: {
                            // 		normal: {
                            // 		   formatter: function (datas) {  
                            // 						return Number(datas.value).toFixed(2);
                            // 						//或者是下面这种，效果是一样的
                            // 						//return datas.value.toFixed(2);
                            // 					} 
                            // 		}
                            // 	}
                            // },
                            symbol: 'none',
                            smooth: true
                        }
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        return option;
    },

    //水图
    echartWaterPie: (datavalue, subtext, item, theme) => {
        const option = {
            //backgroundColor: '#124294',
            title: [{
                text: datavalue,
                textStyle: {
                    fontSize: 45,
                    color: item.fontColor,
                    // fontFamily: 'led',
                    fontWeight: '500'
                },
                // subtext: subtext,
                subtextStyle: {
                    color: "rgba(37,73,151,1)",
                    fontSize: 16
                },
                x: "center",
                y: "25%",
            },
            {
                text: subtext,
                x: "center",
                y: "45%",
                textStyle: {
                    fontSize: 18,
                    //   fontWeight: "100",
                    color: item.fontColor,
                    lineHeight: 16,
                    textAlign: "center",
                },
            },
            ],
            graphic: [
                {
                    type: "group",
                    left: "center",
                    top: "15%",
                    children: [
                        {
                            type: "text",
                            z: 100,
                            left: "50",
                            top: "middle",
                            padding: [0, 0, 0, 10],
                            style: {
                                font: "36px",
                                fontFamily: 'led',
                                fontSize: 24,
                            },
                        }
                    ],
                },
            ],
            series: [
                {
                    name: "水球图",
                    type: "liquidFill",
                    radius: "95%",
                    // center: ["50%", "55%"],
                    // waveAnimation: 5, // 动画时长
                    // amplitude: 10, // 振幅
                    data: [0.4, 0.35],
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
    },
    //进度条
    echartProgressBar: (datavalue, theme) => {
        var waiBarColor = "rgba(28,51,107,1)";
        var fontColor = "#00ffff";
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            waiBarColor = "rgba(244,248,255,1)";
            fontColor = "#000000";
        } else if (theme == "default") {
            waiBarColor = "rgba(28,51,107,1)";
            fontColor = "#00ffff";
        }

        /* 仪表盘所需数据*/
        var ydata = ["A2"]; //y轴
        var value = datavalue;
        var balckBar = [value]; //背景色
        var balckArr = [100];
        var rich = {
            white: {
                // backgroundColor: {
                //   image:
                //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAZCAYAAAB6v90+AAAA2klEQVRYhe2YMUoDQRhG32zAwsKkyRGCHmE9hE3uuSkNSqogaOEBcgzXDVg+i2xhEdKYn2GWefDX33vlDCjoCu3QHrXQ68eGFUpC74EPYME0+ALahHbAOrfNldkktAfucptcmWNCzW0RQZNbIIoaVho1rDRqWGnUsNKoYaUx6bDv3BIBHBtgl9sigNeEPgDvTOsF/dgAB6AFNsCQVel/DJwaWuDA+JkTcTfo9sLnS4fOwvYDw0Bv0f2ZqJcxPG47OAx0jn7+iXobg0N306kunCXwDPwAT0AfPfgLAvYRIEVmrDQAAAAASUVORK5CYII=",
                // },
                padding: [5, 0, 5, 5],
                align: "center",
                color: fontColor,
                fontSize: 20,
                // lineHeight:40
                // height:20
            },
        };
        var option = {
            //   backgroundColor: "rgba(0,0,0,1)",
            grid: {
                left: "10%",
                top: 10,
                bottom: 10,
            },
            tooltip: {
                show: false,
            },
            xAxis: {
                max: 100,
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: [
                {
                    type: "category",
                    inverse: false,
                    data: ydata,
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                },
            ],
            series: [
                {
                    //内
                    type: "bar",
                    barWidth: 30,
                    legendHoverLink: false,
                    silent: true,
                    itemStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(156,224,99,1)", // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "rgba(12,245,243,1)", // 100% 处的颜色
                                },
                            ],
                            globalCoord: false, // 缺省为 false
                        }, //底色
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: fontColor,
                                fontSize: 20,
                            },
                            position: "right",
                            formatter: function (data) {
                                return value + "%";//"{white|" + value + "%" + "}";
                            },
                            verticalAlign: "center",
                            // rich: rich,
                        },
                    },
                    data: [value],
                    z: 100,
                },
                {
                    //外
                    type: "bar",
                    barWidth: 31,
                    barGap: "-100%",
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    legendHoverLink: false,
                    silent: true,
                    data: [100],
                    itemStyle: {
                        color: waiBarColor,
                        //borderWidth: 1,
                        // borderColor: "#fff",
                    },
                    z: 98,
                },
                {
                    //分隔
                    type: "pictorialBar",
                    animationDuration: 0,
                    itemStyle: {
                        color: "rgba(0,0,0,0.7)",
                    },
                    symbolRepeat: "fixed",
                    symbolMargin: "8",
                    symbol: "rect",
                    symbolClip: true,
                    symbolSize: [4, 30],
                    symbolPosition: "start",
                    symbolOffset: [0, 0],
                    // "symbolBoundingData": 5000,
                    data: balckBar,
                    z: 101,
                },
            ],
        };
        return option;
    },
    //设计流量
    echartsjllPie: (datavalue, sjll, theme) => {
        const option = {
            series: [
                {
                    name: "刻度",
                    type: "gauge",
                    center: ["50%", "60%"],
                    radius: "80%",
                    min: 0, //最小刻度
                    max: sjll, //最大刻度
                    splitNumber: 10, //刻度数量
                    startAngle: 180,
                    endAngle: 0,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 1,
                            color: [[1, "rgba(0,0,0,0)"]],
                        },
                    }, //仪表盘轴线
                    axisLabel: {
                        show: true,
                        color: "#4b695e",
                        fontSize: 18,
                        distance: -40,
                        formatter: function (v) {
                            return v.toFixed(0);
                        },
                    }, //刻度标签。
                    axisTick: {
                        show: true,
                        splitNumber: 5,
                        lineStyle: {
                            color: "#263b35",
                            width: 1,
                            // length:10
                        },
                        length: -20,
                    }, //刻度样式
                    splitLine: {
                        show: true,
                        length: -20,
                        lineStyle: {
                            color: "#4aca96",
                            width: 2,
                        },
                    }, //分隔线样式
                },
                {
                    type: "gauge",
                    radius: "55%",
                    center: ["50%", "60%"],
                    splitNumber: 0, //刻度数量
                    startAngle: 180,
                    endAngle: 0,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 50,
                            color: [
                                [
                                    1,
                                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#fcfe92",
                                        },
                                        {
                                            offset: 1,
                                            color: "#4ccb96",
                                        },
                                    ]),
                                ],
                            ],
                        },
                    },
                    //分隔线样式。
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    pointer: {
                        show: true,
                        length: "80%",
                        width: "2%",
                    },
                    title: {
                        show: true,
                        offsetCenter: [0, "60%"], // x, y，单位px
                        textStyle: {
                            fontWeight: "bold",
                            color: "#0ab7ff",
                            fontSize: 25,
                        },
                    },
                    //仪表盘详情，用于显示数据。
                    detail: {
                        show: true,
                        offsetCenter: [0, "-50%"],
                        color: "#ffffff",
                        textStyle: {
                            fontSize: 30,
                            color: "#4aca96",
                        },
                    },
                    data: [
                        {
                            value: datavalue,
                        },
                    ],
                },
            ],
        };
        return option;
    },
    //设计流量饼图
    echartsjllPieNew: (datavalue, sjll, theme) => {
        var waiBarColor = "#1C336B";
        var colorSet = {
            color: "#468EFD",
        };
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            waiBarColor = "#F4F8FF";
            colorSet = {
                color: "#689AFF",
            };
        } else if (theme == "default") {
            waiBarColor = "#1C336B";
            colorSet = {
                color: "#468EFD",
            };
        }
        const option = {
            // backgroundColor: "#0E1327",
            tooltip: {
                formatter: "{a} : {c}m³/s",
            },
            series: [
                {
                    name: "流量",
                    type: "gauge",
                    startAngle: 180,
                    endAngle: 0,
                    min: 0,
                    max: sjll,
                    // center: ['20%', '50%'],
                    radius: "100%",
                    splitNumber: 10,
                    axisLine: {
                        lineStyle: {
                            color: [
                                [datavalue / sjll, colorSet.color],
                                [1, waiBarColor],
                            ],
                            width: 8,
                        },
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    itemStyle: {
                        show: false,
                    },
                    detail: {
                        formatter: function (value) {
                            var num = Math.round(value);
                            return "当前流量" + parseInt(num).toFixed(1) + "m³/s";
                        },
                        offsetCenter: [0, 42],
                        textStyle: {
                            padding: [0, 0, 0, 0],
                            fontSize: 18,
                            fontWeight: "700",
                            color: colorSet.color,
                        },
                    },
                    title: {
                        //标题
                        show: true,
                        offsetCenter: [0, 46], // x, y，单位px
                        textStyle: {
                            color: "#fff",
                            fontSize: 14, //表盘上的标题文字大小
                            fontWeight: 400,
                            fontFamily: "PingFangSC",
                        },
                    },
                    data: [
                        {
                            //   name: "流量",
                            value: datavalue,
                        },
                    ],
                    pointer: {
                        show: true,
                        length: "75%",
                        radius: "20%",
                        width: 8, //指针粗细
                    },
                    animationDuration: 2000,
                }
            ],
        };

        return option;
    },
    // 水质
    chartSZ: (ChartName, data, strNote, LineColor, max_min_Name, codenameName, theme,) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "水位(m)";
        }
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var m = new Array();
        //后期根据改为动态设置
        //var selectedstr={'PH' : false,'氨氮' : true,'总磷' : false,'溶解氧' : false,'高锰酸盐' : false};
        var LineSelect = "";
        $.each(strNote, function (index, value, item) {
            chartName.push(value.name);   //Echarts绘制标注名称加入
            LineSelect += "'" + value.name + "':" + value.isShow + ",";
        });
        if (LineSelect.length > 0) {
            LineSelect = LineSelect.substring(0, LineSelect.length - 1);
        }
        //循环数据，加入有效数据。
        $.each(data, function (index, value, item) {
            var charthan = []; 	//时间序列
            $.each(strNote, function (index1, value1, item1) {
                charthan.push(value[value1.codename]); //加入集合
                if (value1.name == "时间") {
                    chartTM.push((dayjs(value[value1.codename]).format("MM-DD HH:mm"))); //加入时间集合
                }
                else {
                    chartValue.push(value[value1.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        var option = {
            // title: {
            //     text: max_min_Name,
            //     textStyle: {
            //         fontSize: 14
            //     }
            // },
            tooltip: {
                trigger: 'axis',
                showDelay: 0,
                hideDelay: 50,
                transitionDuration: 0,
                backgroundColor: '#182937e8',
                borderColor: '#4040FB',
                borderRadius: 8,
                borderWidth: 2,
                padding: 10,
                textStyle: {
                    color: '#ffffff'
                },
                formatter: function (params) {
                    var s = "";
                    s += "<div>" + params[0].name + "</div>";
                    for (var i = 0; i < params.length; i++) {
                        var _temp = "", _color = "";
                        if (params[i].value != undefined && params[i].value != "-" && params[i].value != "") {
                            _temp = DatType(params[i].seriesName, Number(params[i].value));
                            _color = getColor(_temp);
                            if (_temp == "0") {
                                _color = "#000"
                            }
                            s += "<div style=\"text-align: left;color:" + _color + "\">" + params[i].seriesName + ":" + params[i].value + "(" + GetSZState(_temp) + ")</div>";
                        } else {
                            s += "<div style=\"text-align: left;color:" + _color + "\">" + params[i].seriesName + ":" + "(" + GetSZState(_temp) + ")</div>";
                        }
                    }
                    return s;
                }
            },
            calculable: true,
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: chartTM,
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
                    fontSize: 14,
                },
            },
            yAxis: {
                type: 'value',
                boundaryGap: false,
                name: max_min_Name,
                nameTextStyle: {
                    color: axisLineColor // 红色
                },
                splitNumeber: 5,
                min: function (value) {
                    var jiange = (value.max - value.min).toFixed(1) * 10;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 10).toFixed(0) * 5);

                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }
                    var min = 0;
                    if ((jiangenew - jiange) % 2 == 0) {
                        min = value.min - (jiangenew - jiange) / 20;
                    }
                    else {
                        min = value.min - (jiangenew - jiange - 1) / 20;
                    }
                    if (min < 0) {
                        min = 0;
                    }
                    return min.toFixed(1);
                },
                max: function (value) {
                    var jiange = (value.max - value.min).toFixed(1) * 10;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 10).toFixed(0) * 5)
                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }
                    if (jiangenew < 5) jiangenew = 5;

                    var max = 0;
                    if ((jiangenew - jiange) % 2 == 0) {
                        max = value.max + (jiangenew - jiange) / 20;
                    }
                    else {
                        max = value.max + (jiangenew - jiange + 1) / 20;
                    }
                    return max.toFixed(1);
                },
                axisLabel: {
                    formatter: function (v) {
                        return v.toFixed(2);
                    },
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                splitLine: {
                    show: true,
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
            visualMap: {
                show: false,
                top: 10,
                right: 10,
                pieces: getPieces(codenameName),
                align: "left",
                outOfRange: {
                    color: '#999'
                }
            },
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        chartValue.push(changeTwoDecimal(m[i][j], 2)); //循环价值
                    }
                    if (max_min_Name != "" & max_min_Name == chartName[j]) {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
                            },
                            //markPoint: {
                            //    data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
                            //},
                            smooth: true
                        }
                        serie.push(item);
                    }
                    else {
                        var _index = 0;
                        if (j == 1) {
                            _index = 5;
                        } else if (j == 2) {
                            _index = 10;
                        } else if (j == 3) {
                            _index = 20;
                        }
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            showSymbol: false,
                            connectNulls: true,
                            smooth: true,
                            markPoint: {
                                symbol: 'path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h-6 z',
                                symbolOffset: ['34%', '-50%'],
                                symbolKeepAspect: true,// 如果 symbol 是 path:// 的形式，是否在缩放时保持该图形的长宽比。
                                label: {
                                    position: "insideTop",
                                    distance: 7,
                                    formatter: chartName[j]
                                },
                                data: [{
                                    coord: [chartTM[j], changeTwoDecimal(data[j]["DATA_" + j], 2)]
                                }]
                            }
                        }
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        return option;

    },
    // 水质评价
    chartSZPJ: (ChartName, data, strNote, LineColor, max_min_Name, theme,) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var m = new Array();
        //后期根据改为动态设置
        //var selectedstr={'PH' : false,'氨氮' : true,'总磷' : false,'溶解氧' : false,'高锰酸盐' : false};
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });
        if (LineSelect.length > 0) {
            LineSelect = LineSelect.substring(0, LineSelect.length - 1);
        }
        //循环数据，加入有效数据。
        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合

                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        var option = {
            tooltip: {
                trigger: 'axis',
                showDelay: 0,
                hideDelay: 50,
                transitionDuration: 0,
                backgroundColor: '#182937e8',
                borderColor: '#4040FB',
                borderRadius: 8,
                borderWidth: 2,
                padding: 10,
                textStyle: {
                    color: '#ffffff'
                },
                formatter: function (params) {
                    var s = "";
                    s += "<div>" + params[0].name + "</div>";
                    for (var i = 0; i < params.length; i++) {
                        var temp = "";
                        if (params[i].value != undefined && params[i].value != "-" && params[i].value != "") {

                        }
                        if (temp != "") {
                            s += temp;
                        } else {
                            var ss = "";
                            if (params[i].value == 1) {
                                ss = "Ⅰ类";
                            } else if (params[i].value == 2) {
                                ss = "Ⅱ类";
                            } else if (params[i].value == 3) {
                                ss = "Ⅲ类";
                            } else if (params[i].value == 4) {
                                ss = "Ⅳ类";
                            } else if (params[i].value == 5) {
                                ss = "Ⅴ类";
                            } else if (params[i].value == 6) {
                                ss = "劣Ⅴ类";
                            }
                            s += "<div style=\"text-align: left;color:" + getColor(Number(params[i].value).toFixed(0)) + "\">" + params[i].seriesName + ":" + ss + "</div>";
                        }
                    }
                    return s;
                }
            },
            color: LineColor,
            legend: {
                data: chartName,
                selected: LineSelect,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
            },
            calculable: true,
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: chartTM,
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
                    fontSize: 14,
                },
            },
            yAxis: {
                type: 'value',
                name: max_min_Name,
                nameTextStyle: {
                    color: axisLineColor // 红色
                },
                axisTick: { show: false },
                axisLabel: {
                    formatter: function (v) {
                        var s = "";
                        if (v == 1) {
                            s = "Ⅰ类";
                        } else if (v == 2) {
                            s = "Ⅱ类";
                        } else if (v == 3) {
                            s = "Ⅲ类";
                        } else if (v == 4) {
                            s = "Ⅳ类";
                        } else if (v == 5) {
                            s = "Ⅴ类";
                        } else if (v == 6) {
                            s = "劣Ⅴ类";
                        }
                        return s;
                    },
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                splitLine: {
                    show: true,
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
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        chartValue.push(changeTwoDecimal(m[i][j], 2)); //循环价值
                    }
                    if (max_min_Name != "" & max_min_Name == chartName[j]) {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
                            },
                            connectNulls: true,
                            smooth: true,
                            symbol: 'none',
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            symbol: 'none',
                        }
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        return option;

    },
    ChartSZTYPE: (ChartName, data, strNote, LineColor, max_min_Name, theme) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, itemColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            itemColor = "#000";
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            itemColor = "#00FFFF";
        }
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var liststr = ""; 	//拼装表格
        var m = new Array();
        //后期根据改为动态设置
        //var selectedstr={'PH' : false,'氨氮' : true,'总磷' : false,'溶解氧' : false,'高锰酸盐' : false};
        var LineSelect = {};
        $.each(strNote, function (index, value, item) {
            chartName.push(value.name);   //Echarts绘制标注名称加入
            LineSelect[value.name] = value.isShow;
        });
        //循环数据，加入有效数据。
        $.each(data, function (index, value, item) {
            var charthan = []; 	//时间序列
            $.each(strNote, function (index1, value1, item1) {
                charthan.push(value[value1.codename]); //加入集合
                if (value1.name == "时间") {
                    chartTM.push((value[value1.codename])); //加入时间集合
                }
                else {
                    chartValue.push(value[value1.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        var option = {
            tooltip: {
                trigger: 'axis',
                showDelay: 0,
                hideDelay: 50,
                transitionDuration: 0,
                backgroundColor: '#182937e8',
                borderColor: '#4040FB',
                borderRadius: 8,
                borderWidth: 2,
                padding: 10,
                textStyle: {
                    color: '#ffffff'
                },
                formatter: function (params) {
                    var s = "";
                    s += params[0].name;
                    for (var i = 0; i < params.length; i++) {
                        var temp = "";
                        if (params[i].value != undefined && params[i].value != "-" && params[i].value != "") {

                        }
                        if (temp != "") {
                            s += temp;
                        } else {
                            var ss = "";
                            if (params[i].value == 1) {
                                ss = "Ⅰ类";
                            } else if (params[i].value == 2) {
                                ss = "Ⅱ类";
                            } else if (params[i].value == 3) {
                                ss = "Ⅲ类";
                            } else if (params[i].value == 4) {
                                ss = "Ⅳ类";
                            } else if (params[i].value == 5) {
                                ss = "Ⅴ类";
                            } else if (params[i].value == 6) {
                                ss = "劣Ⅴ类";
                            }
                            s += "<div style=\"text-align: left;color:" + getColor(Number(params[i].value).toFixed(0)) + "\">类别:" + ss + "</div>";

                        }
                    }
                    return s;
                }
            },
            color: LineColor,
            legend: {
                show: false,
                data: chartName,
                selected: LineSelect
            },
            grid: {
                left: '3%',
                right: '5%',
                bottom: '3%',
                top: '15%',
                containLabel: true
            },
            visualMap: {
                top: 10,
                right: 10,
                show: false,
                // formatter: function (value) {                 //标签的格式化工具。
                //         return value + '(Ⅰ类)';                    // 范围标签显示内容。
                //     },
                textStyle: {
                    color: '#ccc',
                },
                pieces: getPieces("state"),
                outOfRange: {
                    color: '#fff'
                }
            },
            xAxis: [
                {
                    //type: 'value',
                    type: 'category',
                    boundaryGap: false,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    data: chartTM,
                    axisLabel: {
                        show: true,
                        interval: 0,
                        textStyle: {
                            color: axisLineColor,
                        },
                        formatter: function (params) {
                            var ss = params;
                            if (params.length > 2) {
                                ss = params.substring(0, 2) + "\n" + params.substring(2, params.length)
                            }
                            return ss;
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor,
                            width: 1 //这里是为了突出显示加上的
                        },
                        textStyle: {
                            color: axisLineColor,
                            fontSize: 14,
                        }
                    },
                }
            ],
            yAxis: [
                {
                    name: "类别",
                    //type: 'category',
                    type: 'value',
                    min: 0, //动态设置最大值最小值。
                    max: 6,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: splitLineColor
                        }
                    },
                    axisLabel: {
                        formatter: function (v) {
                            var s = "";
                            if (v == 1) {
                                s = "Ⅰ";
                            } else if (v == 2) {
                                s = "Ⅱ";
                            } else if (v == 3) {
                                s = "Ⅲ";
                            } else if (v == 4) {
                                s = "Ⅳ";
                            } else if (v == 5) {
                                s = "Ⅴ";
                            } else if (v == 6) {
                                s = "劣Ⅴ类";
                            }
                            return s;
                        }
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
                    if (max_min_Name != "" & max_min_Name == chartName[j]) {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    formatter: function (params) {
                                        var ss = "";
                                        if (params.value == 1) {
                                            ss = "Ⅰ";
                                        } else if (params.value == 2) {
                                            ss = "Ⅱ";
                                        } else if (params.value == 3) {
                                            ss = "Ⅲ";
                                        } else if (params.value == 4) {
                                            ss = "Ⅳ";
                                        } else if (params.value == 5) {
                                            ss = "Ⅴ";
                                        } else if (params.value == 6) {
                                            ss = "劣Ⅴ类";
                                        }
                                        return ss;
                                    },
                                    textStyle: {
                                        //color: '#2D8DED', //color of value
                                        fontSize: 14
                                    }
                                }
                            },
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true
                        }
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        return option;
    },
    // 水位过程线---没横纵坐标
    chartSWNoXYAxis: (ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize, xAxisVal, formatterVal) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "水位(m)";
        }
        // var myChart = echarts.init(document.getElementById(ChartName)); //获得控件对象
        // myChart.clear();

        //echarts.init(document.getElementById('quxian'), 'macarons');
        var chartName = []; //控件元素名称
        var chartTM = []; //时间序列
        var chartValue = []; //时间序列
        var liststr = ""; //拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        if (data.length == 0) {
            var titleShow = true
        } else {
            var titleShow = false
        }
        var option = {
            title: {
                show: titleShow, // 是否显示title
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'rgba(255,255,255,0.50)',
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            //backgroundColor: '#100E19',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                show: false,
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: false
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: false,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: chartTM,
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
                    fontSize: 14,
                },
                show: false,
            }],
            yAxis: [{
                name: '水位(m)',
                nameTextStyle: {
                    padding: [0, 0, 0, -20]
                },
                type: 'value',
                boundaryGap: false,
                // splitNumeber:5,
                scale: true, //是否自动计算最大最小值。
                //min:max_min.min, //动态设置最大值最小值。
                //max:max_min.max,
                show: false,
                min: function (value) {
                    var jiange = (value.max - value.min).toFixed(2) * 100;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }

                    if ((jiangenew - jiange) % 2 == 0) {
                        return value.min - (jiangenew - jiange) / 20;
                    } else {
                        return value.min - (jiangenew - jiange - 1) / 20;
                    }


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
                    } else {
                        return value.max + (jiangenew - jiange + 1) / 30;
                    }

                },
                axisLabel: {
                    formatter: function (v) {
                        return v.toFixed(2);
                    },
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                splitLine: {
                    show: true,
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
            }],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; //声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (isNaN(m[i][j]) == false) {
                            // chartValue.push(changeTwoDecimal(m[i][j], 2)); //循环价值
                            chartValue.push(m[i][j]); //循环价值
                        }
                    }
                    if (chartName[j] == "实时" || chartName[j] == "上游水位") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                color: "rgba(25,163,223,1)",
                                //borderColor: "#646ace",
                                //borderWidth: 1

                            },
                            markPoint: {
                                // data: [{ type: 'max', name: '最大值' }],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#ffffff",
                                        fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            },
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
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "警戒") {
                        var item = {
                            name: '警戒',
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            showSymbol: false,//去掉数据点
                            endLabel: {
                                show: true,//只显示折线图最后一个数据
                                offset: [-30, -20],
                                fontSize: 14,
                                color: 'inherit',
                                formatter: function (params) {
                                    // params 是一个包含数据信息的对象
                                    return Number(params.value).toFixed(2); // 将数值保留两位小数
                                },
                            },
                            itemStyle: {
                                // borderWidth: 1,
                                normal: {
                                    show: true,
                                    color: '#FF9E43',
                                    lineStyle: {
                                        // 设置线的宽度
                                        width: 3,
                                        //'dotted'虚线 'solid'实线
                                        type: 'solid'
                                    }
                                },
                            },
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "保证") {
                        var item = {
                            name: '保证',
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            showSymbol: false,//去掉数据点
                            endLabel: {
                                show: true,//只显示折线图最后一个数据
                                offset: [-30, -20],
                                fontSize: 14,
                                color: 'inherit',
                                formatter: function (params) {
                                    // params 是一个包含数据信息的对象
                                    return Number(params.value).toFixed(2); // 将数值保留两位小数
                                },
                            },
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: '#EE585B',
                                    lineStyle: {
                                        // 设置线的宽度
                                        width: 2,
                                        //'dotted'虚线 'solid'实线
                                        type: 'solid'
                                    }
                                },
                            },
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                color: "rgba(20,253,129,1)",
                                textStyle: {
                                    color: "#000000",
                                },
                                //borderColor: "#646ace",
                                //borderWidth: 1
                            },
                            markLine: {
                                symbol: ["none", "none"], //箭头
                                data: [{
                                    xAxis: xAxisVal,
                                },
                                ],
                                label: {
                                    formatter: function () {
                                        return Number(formatterVal).toFixed(2); //最高水位
                                    },
                                    color: '#00ffff',
                                    distance: -2
                                },
                                lineStyle: {
                                    color: "#00ffff",
                                    width: 2,
                                },
                            },
                            markPoint: {
                                // data: [{ type: 'max', name: '最大值' }],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#000000",
                                        fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            },
                            // areaStyle: { //区域填充样式
                            //     normal: {
                            //         //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: "rgba(20,253,129,.6)"
                            //         },
                            //         {
                            //             offset: 1,
                            //             color: "rgba(20,253,129, 0.1)"
                            //         }
                            //         ], false),
                            //         shadowColor: 'rgba(20,253,129, 0.5)', //阴影颜色
                            //         shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                            //     }
                            // },
                        };
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        // myChart.resize();
        // myChart.setOption(option);
        // window.addEventListener("resize", function () {
        //     myChart.resize();
        // }); 
        return option;

    },
    //纳雨量
    echartProgressBarNYL: (ChartName, datax, datay, theme) => {
        var axisLabelColor = "#fff";
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
        } else if (theme == "default") {
            axisLabelColor = "#fff";
        }
        var option = {
            grid: {
                left: "5%",
                right: "5%",
                bottom: "5%",
                top: "10%",
                containLabel: true,
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "none",
                },
                formatter: function (params) {
                    return (
                        params[0].name +
                        "<br/>" +
                        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                        params[0].seriesName +
                        " : " +
                        params[0].value.toFixed(1) +
                        " mm<br/>"
                    );
                },
            },
            xAxis: {
                show: false,
                type: "value",
            },
            yAxis: [
                {
                    type: "category",
                    inverse: true,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: axisLabelColor,
                            fontSize: 16,
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    data: datax,
                },
                {
                    type: "category",
                    inverse: true,
                    axisTick: "none",
                    axisLine: "none",
                    show: true,
                    axisLabel: {
                        textStyle: {
                            color: axisLabelColor,
                            fontSize: 16,
                        },
                        formatter: function (value) {
                            return value + "mm";
                        },
                    },
                    data: datay,
                },
            ],
            series: [
                {
                    name: "纳雨量",
                    type: "bar",
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 30,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: "rgb(57,89,255,1)",
                                },
                                {
                                    offset: 1,
                                    color: "rgb(46,200,207,1)",
                                },
                            ]),
                        },
                    },
                    barWidth: 25,
                    data: datay,
                },
                {
                    show: false,
                    name: "背景",
                    type: "bar",
                    barWidth: 20,
                    barGap: "-100%",
                    data: datay,
                    itemStyle: {
                        normal: {
                            color: "rgba(24,31,68,0)",
                            barBorderRadius: 30,
                        },
                    },
                },
            ],
        };
        return option;
    },
    //饼图：水质类别统计
    echartSZPie: (ChartName, data, LineColor, theme, legendShow = false, legendData = [], danwei = "万方", typenl = false) => {
        var legendColor, peiColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            legendColor = "#000";
            peiColor = "#363f42";
        } else if (theme == "default") {
            legendColor = "#fff";
            peiColor = "#a5cdde";
        }
        var seriesdata1 = [];
        var totlenum = 0;
        for (var num = 0; num < data.length; num++) {
            var dataItem = {
                name: data[num].name,
                value: data[num].value,
                percent: data[num].percent,
                itemStyle: {
                    normal: {
                        // borderWidth: 1,
                        // shadowBlur: 20,
                        // borderColor: colorAlpha[0],
                        // shadowColor: LineColor[num],
                        color: LineColor[num],
                    },
                },
            };
            seriesdata1.push(dataItem);
            totlenum = totlenum + Number(data[num].value);
        }
        function array2obj(seriesdata1, name) {
            var resObj = {};
            for (var i = 0; i < seriesdata1.length; i++) {
                resObj[seriesdata1[i][name]] = seriesdata1[i];
            }
            return resObj;
        }
        var objData = array2obj(seriesdata1, 'name');
        //将合计值转换为数组
        var h = '' + totlenum + '';
        var arr = h;
        var m = '';

        for (var i = 0; i < arr.length; i++) {
            m += '{a|' + arr[i] + '}';
            if (i != arr.length - 1) {
                m += '  ';
            }
        }

        var option = {
            grid: {
                x: '10%',
                y: '3',
                x2: '5%',
                y2: '5%',
                borderWidth: 1,
                borderColor: '#f0f0f0',
            },
            title: [
                {
                    show: true,
                    text: '{a|名称}{b|数量}{c|占比}',
                    top: '4%',
                    left: '58%',
                    textStyle: {
                        rich: {
                            a: {
                                align: 'center',
                                fontSize: 14,
                                color: legendColor,
                                width: 16,
                                padding: [0, 0, 0, 30],
                            },
                            b: {
                                align: 'center',
                                fontSize: 14,
                                color: legendColor,
                                width: 5,
                                padding: [0, 0, 0, 42],
                            },
                            c: {
                                align: 'center',
                                fontSize: 14,
                                color: legendColor,
                                width: 5,
                                padding: [0, 0, 0, 50],
                            },
                        },
                    },
                },
                // {
                //     text: '{b|站点总数：}' + m,
                //     left: '77%',
                //     top: '1%',
                //     textAlign: 'center',
                //     textStyle: {
                //         fontWeight: 'normal',
                //         fontSize: '12',
                //         color: legendColor,
                //         textAlign: 'center',
                //         rich: {
                //             a: {
                //                 fontSize: '28',
                //                 backgroundColor: 'rgba(56,89,255,0.2)',
                //                 borderColor: 'rgba(56,211,255,1)',
                //                 borderWidth: 1,
                //                 padding: [12, 6, 6, 6],
                //                 shadowColor: 'rgba(56,211,255,1)',
                //                 shadowBlur: 3,
                //                 borderRadius: 3,
                //                 fontFamily: 'led',
                //             },
                //             b: {
                //                 fontSize: '16',
                //                 fontWeight: 'bold',
                //                 padding: [6, 6, 6, 6],
                //                 color: legendColor,
                //             },
                //         },
                //     },
                //},
            ],
            legend: {
                show: true,
                //icon: 'circle',
                orient: 'vertical',
                top: '15%',
                left: '58%',
                itemGap: 15,
                itemWidth: 15,
                itemHeight: 10,
                data: seriesdata1,
                formatter: function (name) {
                    return '{a|' + name + '}{b|' + objData[name].value.toFixed(0) + '}{c|' + objData[name].percent + '%}';
                },
                textStyle: {
                    rich: {
                        a: {
                            align: 'center',
                            fontSize: 14,
                            color: legendColor,
                            width: 38,
                            padding: [0, 0, 0, 0],
                        },
                        b: {
                            align: 'center',
                            fontSize: 14,
                            color: legendColor,
                            width: 5,
                            padding: [0, 0, 0, 30],
                        },
                        c: {
                            align: 'center',
                            fontSize: 14,
                            color: legendColor,
                            width: 5,
                            padding: [0, 0, 0, 50],
                        },
                    },
                },
            },
            series: {
                type: 'pie',
                center: ['35%', '50%'],
                radius: ['50%', '65%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    normal: {
                        borderColor: '#ccc',
                        borderWidth: 0,
                    }
                },
                label: {
                    show: true,
                    position: 'center',
                    show: false,
                    emphasis: {
                        show: true,
                        formatter: function (data) {
                            // return (
                            //     '{name|' +
                            //     data.name + ':' +
                            //     '}' +
                            //     ' {value|' +
                            //     data.percent.toFixed(2) +
                            //     '%}'
                            // );
                            return "{value|" + data.value.toFixed(0) + "}\n{name|" + data.name + "}";
                        },
                        textStyle: {
                            rich: {
                                name: {
                                    fontSize: 14,
                                    color: LineColor,
                                },
                                value: {
                                    lineHeight: 50,
                                    fontSize: 36,
                                    color: LineColor,
                                    fontFamily: 'led',
                                    padding: [20, 0, 0, 0],
                                },
                            },
                        }
                    }

                },
                labelLine: {
                    show: false,
                    normal: {
                        length: 10,
                        length2: 20,
                        align: 'right',
                        lineStyle: {
                            width: 1,
                        },
                    },
                },
                data: seriesdata1,
                seriesIndex: 0,
            },
        };

        return option;
    },
    // 抢险救灾
    chartTotalQX: (ChartName, chartTM, chartData, DRPtotal, max_min_Name, theme) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var option = {
            tooltip: {
                trigger: 'axis',
                // 鼠标移动到柱状图会显示内容 竖线变成阴影
                axisPointer: {
                    type: 'shadow'
                },

            },
            color: ['#00FFFF'],
            // //这里设置柱状图上面的方块，名称跟series里的name保持一致
            legend: {
                // orient: 'vertical',
                x: 'right',      //可设定图例在左、右、居中
                y: 'top',     //可设定图例在上、下、居中
                left: '48%',
                show: false,
                padding: [40, 0, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]

            },
            grid: {
                left: '4%',
                right: '4%',
                bottom: '0%',
                top: '10%',
                containLabel: true
            },

            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {}
                }
            },
            calculable: true,
            xAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: splitLineColor,
                        type: 'dashed'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: { //  改变x轴字体颜色和大小
                    textStyle: {
                        color: axisLineColor,
                        fontSize: 14
                    },
                },

                axisLabel: {
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                min: 0,
                max: function (value) {
                    var jiange = (value.max - value.min).toFixed(2) * 100;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }
                    if (jiangenew < 5) jiangenew = 5;
                    var maxVal = 0;
                    if ((jiangenew - jiange) % 2 == 0) {
                        maxVal = value.max + (jiangenew - jiange) / 30;
                    } else {
                        maxVal = value.max + (jiangenew - jiange + 1) / 30;
                    }
                    if (maxVal < 10) {
                        maxVal = 10;
                    } else {
                        maxVal = maxVal + 10;
                    }
                    return Number(maxVal).toFixed(0);
                },
            },
            yAxis: {
                type: 'category',
                data: chartTM,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: { //  改变y轴颜色
                    lineStyle: {
                        color: axisLineColor,
                        width: 1 //这里是为了突出显示加上的
                    }
                },
                axisLabel: {
                    show: true,
                    //formatter: '{value}',
                    textStyle: {
                        color: axisLabelColor,
                        fontSize: 12
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    name: "数量",
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, //开启显示
                                position: "insideRight", //在上方显示
                                textStyle: { //数值样式
                                    color: "#FFFFFF",
                                    fontSize: 13,
                                    fontWeight: 600
                                }
                            },
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: 'rgba(24,144,255,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,255,255,0)'
                            }]),
                            barBorderRadius: 1

                        }
                    },
                    data: chartData
                }
            ]
        };

        return option;
    },
    // 重点关注
    chartTotal: (ChartName, chartTM, chartDRP, DRPtotal, max_min_Name, theme) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var option = {
            tooltip: {
                trigger: 'axis',
                // 鼠标移动到柱状图会显示内容 竖线变成阴影
                axisPointer: {
                    type: 'shadow'
                },

            },
            color: ['#00FFFF',],
            // //这里设置柱状图上面的方块，名称跟series里的name保持一致
            legend: {
                // orient: 'vertical',
                x: 'right',      //可设定图例在左、右、居中
                y: 'top',     //可设定图例在上、下、居中
                left: '48%',
                show: false,
                padding: [40, 0, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]

            },
            grid: {
                left: '4%',
                right: '4%',
                bottom: '0%',
                top: '15%',
                containLabel: true
            },

            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {}
                }
            },
            calculable: true,
            xAxis: {
                type: 'category',
                // boundaryGap: true 表示x轴两边留白
                boundaryGap: true,
                axisTick: {
                    alignWithLabel: true,
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    // formatter: function (value) {
                    //     return value.split("").join("\n");
                    // },
                    formatter: function (value) {
                        var name = value.split("").join("\n")
                        if (Number(name.length) > 7) {
                            return name.slice(0, 5) + "\n...";
                        } else {
                            return name;
                        }

                    },
                    textStyle: {
                        color: axisLabelColor,
                        fontSize: 14
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: axisLabelColor
                    },
                    textStyle: {
                        color: axisLineColor,
                        fontSize: 14,
                    }
                },
                // boundaryGap: ['5%', '5%'],
                data: chartTM
            },
            yAxis: {
                name: max_min_Name,
                type: 'value',
                min: 0,
                max: function (value) {
                    var jiange = (value.max - value.min).toFixed(2) * 100;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }
                    if (jiangenew < 5) jiangenew = 5;
                    var maxVal = 0;
                    if ((jiangenew - jiange) % 2 == 0) {
                        maxVal = value.max + (jiangenew - jiange) / 30;
                    } else {
                        maxVal = value.max + (jiangenew - jiange + 1) / 30;
                    }
                    if (maxVal < 10) {
                        maxVal = 10;
                    } else {
                        maxVal = maxVal + 10;
                    }
                    return Number(maxVal).toFixed(0);
                },
                axisTick: {
                    alignWithLabel: true,
                    show: false
                },
                axisLabel: {
                    show: true,
                    //formatter: '{value}',
                    textStyle: {
                        color: axisLineColor,
                        fontSize: 14
                    },
                    formatter: function (value, index) {
                        return value.toFixed(0)
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: axisLineColor
                    }
                },
                // y轴刻度的颜色
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: splitLineColor
                    }
                },
                splitArea: {     // 网格区域
                    show: false   // 是否显示，默认为false
                }
            },
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    label: {
                        show: true,  //开启显示
                        formatter: function (params) {
                            return params.value
                        },  //显示数值
                        position: 'top',
                        textStyle: { //数值样式
                            fontSize: 13,
                            color: '#00FFFF'
                        }
                    },
                    barWidth: 16,
                    data: chartDRP,
                    itemStyle: {
                        normal: {
                            show: true,
                            color: function (e) {
                                if (e.name == "昆山市") {
                                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#FDB628'
                                    }, {
                                        offset: 1,
                                        color: '#FDB628'
                                    }]);
                                } else {
                                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#0099FF'
                                    }, {
                                        offset: 1,
                                        color: '#00FFFF'
                                    }]);
                                }
                            },
                            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //     offset: 0,
                            //     color: '#0099FF'
                            // }, {
                            //     offset: 1,
                            //     color: '#00FFFF'
                            // }]),
                            borderWidth: 0,
                            barBorderRadius: [15, 15, 0, 0],

                        },
                        emphasis: {
                            shadowBlur: 15,
                            shadowColor: 'rgba(105,123, 214, 0.7)'
                        }
                    },
                },
            ]
        };

        return option;
    },
    // 预报水位过程线
    chartModeYBSW: (ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize, stnm, DC) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#918F8F";
            axisLineColor = "#918F8F";// "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = '#00FFFF';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "水位(m)";
        }
        // var myChart = echarts.init(document.getElementById(ChartName)); //获得控件对象
        // myChart.clear();

        //echarts.init(document.getElementById('quxian'), 'macarons');
        var chartName = []; //控件元素名称
        var chartTM = []; //时间序列
        var chartValue = []; //时间序列
        var liststr = ""; //拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        var option = {
            title: {
                //text: stnm + "(确定性系数：" + DC + ")",
                //text: "确定性系数：" + DC + "",
                // subtext:"(确定性系数："+DC+")",
                subtextStyle: {
                    color: titleColor,
                    fontSize: 12,
                    fontWeight: 400
                },
                show: true,
                left: 'center',
                // top: 'center',
                textStyle: {
                    color: titleColor,
                    fontSize: 15,
                    fontWeight: 400
                }
            },
            //backgroundColor: '#100E19',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: chartName,
                //orient: 'vertical', // 设置图例竖排
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 13
                },
                selected: LineSelect,
                right: "5%",
                top: 10
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 35,
                containLabel: true
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: false
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: false,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: chartTM,
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
                    fontSize: 14,
                },
            }],
            yAxis: [{
                name: max_min_Name,
                nameTextStyle: {
                    padding: [0, 0, 0, -20]
                },
                type: 'value',
                boundaryGap: false,
                // splitNumeber:5,
                scale: true, //是否自动计算最大最小值。
                //min:max_min.min, //动态设置最大值最小值。
                //max:max_min.max,
                min: function (value) {
                    var jiange = (value.max - value.min).toFixed(2) * 100;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }

                    if ((jiangenew - jiange) % 2 == 0) {
                        return value.min - (jiangenew - jiange) / 20;
                    } else {
                        return value.min - (jiangenew - jiange - 1) / 20;
                    }


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
                    } else {
                        return value.max + (jiangenew - jiange + 1) / 30;
                    }

                },
                axisLabel: {
                    formatter: function (v) {
                        return v.toFixed(2);
                    },
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                splitLine: {
                    show: true,
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
            }],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; //声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        //if (isNaN(m[i][j]) == false) {
                        // chartValue.push(changeTwoDecimal(m[i][j], 2)); //循环价值
                        chartValue.push(m[i][j]); //循环价值
                        //}
                    }
                    if (chartName[j] == "实时" || chartName[j] == "上游水位") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                color: "rgba(25,163,223,1)",
                                //borderColor: "#646ace",
                                //borderWidth: 1

                            },
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#ffffff",
                                        fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            },
                            // areaStyle: { //区域填充样式
                            //     normal: {
                            //         //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: "rgba(25,163,223,.6)"
                            //         },
                            //         {
                            //             offset: 1,
                            //             color: "rgba(25,163,223, 0.1)"
                            //         }
                            //         ], false),
                            //         shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
                            //         shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                            //     }
                            // },
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "警戒") {
                        var item = {
                            name: '警戒',
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            showSymbol: false,//去掉数据点
                            endLabel: {
                                show: true,//只显示折线图最后一个数据
                                offset: [-30, -20],
                                fontSize: 14,
                                color: 'inherit',
                                formatter: function (params) {
                                    // params 是一个包含数据信息的对象
                                    return Number(params.value).toFixed(2); // 将数值保留两位小数
                                },
                            },
                            itemStyle: {
                                // borderWidth: 1,
                                normal: {
                                    show: true,
                                    color: '#FF9E43',
                                    lineStyle: {
                                        // 设置线的宽度
                                        width: 3,
                                        //'dotted'虚线 'solid'实线
                                        type: 'solid'
                                    }
                                },
                            },
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "保证") {
                        var item = {
                            name: '保证',
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            showSymbol: false,//去掉数据点
                            endLabel: {
                                show: true,//只显示折线图最后一个数据
                                offset: [-30, -20],
                                fontSize: 14,
                                color: 'inherit',
                                formatter: function (params) {
                                    // params 是一个包含数据信息的对象
                                    return Number(params.value).toFixed(2); // 将数值保留两位小数
                                },
                            },
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: '#EE585B',
                                    lineStyle: {
                                        // 设置线的宽度
                                        width: 2,
                                        //'dotted'虚线 'solid'实线
                                        type: 'solid'
                                    }
                                },
                            },
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                color: "rgba(20,253,129,1)",
                                textStyle: {
                                    color: "#000000",
                                },
                                //borderColor: "#646ace",
                                //borderWidth: 1

                            },
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#000000",
                                        fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            },
                            // areaStyle: { //区域填充样式
                            //     normal: {
                            //         //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: "rgba(20,253,129,.6)"
                            //         },
                            //         {
                            //             offset: 1,
                            //             color: "rgba(20,253,129, 0.1)"
                            //         }
                            //         ], false),
                            //         shadowColor: 'rgba(20,253,129, 0.5)', //阴影颜色
                            //         shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                            //     }
                            // },
                        };
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        // myChart.resize();
        // myChart.setOption(option);
        // window.addEventListener("resize", function () {
        //     myChart.resize();
        // }); 
        return option;

    },
    // 预报趋势
    chartYBXS: (ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "水位(m)";
        }
        // var myChart = echarts.init(document.getElementById(ChartName)); //获得控件对象
        // myChart.clear();

        //echarts.init(document.getElementById('quxian'), 'macarons');
        var chartName = []; //控件元素名称
        var chartTM = []; //时间序列
        var chartValue = []; //时间序列
        var liststr = ""; //拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        if (data.length == 0) {
            var titleShow = true
        } else {
            var titleShow = false
        }
        var option = {
            title: {
                show: titleShow, // 是否显示title
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'rgba(255,255,255,0.50)',
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            //backgroundColor: '#100E19',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: chartName,
                // show:false,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: false
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: false,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            calculable: true,
            color: LineColor,
            xAxis: [{
                type: 'category',
                // show: false,
                boundaryGap: false,
                data: chartTM,
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
                    fontSize: 14,
                },
            }],
            yAxis: [{
                name: max_min_Name,
                nameTextStyle: {
                    padding: [0, 0, 0, -20]
                },
                type: 'value',
                boundaryGap: false,
                // splitNumeber:5,
                scale: true, //是否自动计算最大最小值。
                //min:max_min.min, //动态设置最大值最小值。
                //max:max_min.max,
                min: 0,
                max: 100,
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
                    show: true,
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
            }],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; //声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (isNaN(m[i][j]) == false) {
                            // chartValue.push(changeTwoDecimal(m[i][j], 2)); //循环价值
                            chartValue.push(m[i][j]); //循环价值
                        }
                    }
                    var item = {
                        name: chartName[j],
                        type: 'line',
                        // 光滑的折线
                        smooth: true,
                        connectNulls: true,
                        symbol: 'none',
                        data: chartValue,
                        // itemStyle: {
                        //     color: "rgba(20,253,129,1)",
                        //     textStyle: {
                        //         color: "#000000",
                        //     },
                        //     //borderColor: "#646ace",
                        //     //borderWidth: 1

                        // },
                        markPoint: {
                            data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
                            symbolSize: symbolSize,
                            label: {
                                offset: [0, 0],
                                textStyle: {
                                    color: "#000000",
                                    fontSize: markSize,
                                },
                                formatter: function (e) {
                                    var value = Number(e.value).toFixed(0);
                                    return value;
                                }
                            },
                        },
                        // areaStyle: { //区域填充样式
                        //     normal: {
                        //         //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        //             offset: 0,
                        //             color: "rgba(20,253,129,.6)"
                        //         },
                        //         {
                        //             offset: 1,
                        //             color: "rgba(20,253,129, 0.1)"
                        //         }
                        //         ], false),
                        //         shadowColor: 'rgba(20,253,129, 0.5)', //阴影颜色
                        //         shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        //     }
                        // },
                    };
                    serie.push(item);
                };
                return serie;
            }()
        };
        // myChart.resize();
        // myChart.setOption(option);
        // window.addEventListener("resize", function () {
        //     myChart.resize();
        // }); 
        return option;

    },
    // 预报雨量过程
    chartYBYL: (chartName, data, strNote, LineColor, max_min_Name, TimeType, theme, showTpye) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, jinitemStyleColor, chuitemStyleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            jinitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00fd6d'
            }, {
                offset: 1,
                color: '#00FFFF'
            }]);
            chuitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#0099FF'
            }, {
                offset: 1,
                color: '#00FFFF'
            }]);
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            jinitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(15,226,82, 1)'
            }, {
                offset: 1,
                color: 'rgba(15,226,82, 0)'
            }]);
            chuitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(80,202,225, 1)'
            }, {
                offset: 1,
                color: 'rgba(80,202,225, 0)'
            }]);
        }
        // var myChart = echarts.init(document.getElementById(ChartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();
        if (max_min_Name == "水量") {
            max_min_Name = "水量（万方）";
        }
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var liststr = ""; 	//拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });
        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Day") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD"))); //加入时间集合
                    } if (TimeType == "mounth") {
                        chartTM.push((dayjs(value[item.codename]).format("M月D日 H时"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        // var max_min = GetSort(chartValue);

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    //type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 1,
                        opacity: 1
                    }
                },
                formatter: function (params) {
                    let res = params[0].axisValue + '<br/>';
                    params.forEach(function (item) {
                        res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(1) + '<br/>';
                    });
                    return res;
                }
            },
            color: LineColor,
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: chartTM,
                    boundaryGap: true,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        fontSize: 14,
                        rotate: 0,
                        textStyle: {
                            color: axisLabelColor
                        },
                        formatter: function (value) {
                            return value
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    boundaryGap: ['5%', '5%'],
                }
            ],
            yAxis: [
                {
                    name: max_min_Name,
                    nameTextStyle: {
                        padding: [0, 0, 0, 0]
                    },
                    type: 'value', min: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        var minVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            minVal = value.min - (jiangenew - jiange) / 20;
                        } else {
                            minVal = value.min - (jiangenew - jiange - 1) / 20;
                        }
                        if (minVal <= 0) {
                            minVal = 0;
                        }
                        return Number(minVal).toFixed(1);
                    },
                    max: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        if (jiangenew < 5) jiangenew = 5;
                        var maxVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            maxVal = value.max + (jiangenew - jiange) / 30;
                        } else {
                            maxVal = value.max + (jiangenew - jiange + 1) / 30;
                        }
                        if (maxVal < 1) {
                            maxVal = 5;
                        }
                        return Number(maxVal).toFixed(1);
                    },
                    boundaryGap: false,
                    splitNumeber: 5,
                    axisTick: {
                        alignWithLabel: true,
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: splitLineColor
                        }
                    },
                    splitArea: {     // 网格区域
                        show: false   // 是否显示，默认为false
                    },
                    //scale: true, //是否自动计算最大最小值。
                    min: 0,
                    axisLabel: {
                        fontSize: 14,
                        formatter: function (v) {
                            return v.toFixed(0);
                        }
                    },
                }
            ],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (Number(m[i][j]) >= 0) {
                            chartValue.push(Number(m[i][j]).toFixed(1)); //循环价值
                        } else {
                            chartValue.push(null);
                        }
                    }
                    var itemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#0099FF'
                    }, {
                        offset: 1,
                        color: '#00FFFF'
                    }]);
                    if (chartName[j] == "预报") {
                        itemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#0099FF'
                        }, {
                            offset: 1,
                            color: '#00FFFF'
                        }]);
                    }
                    else if (chartName[j] == "实测" || chartName[j] == "实际") {
                        itemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#009C00'
                        }, {
                            offset: 1,
                            color: '#00FF00'
                        }]);
                    }
                    var item = {
                        name: chartName[j],
                        type: 'bar',
                        barMaxWidth: 25,
                        data: chartValue,
                        smooth: true,
                        label: {
                            normal: {
                                show: showTpye,
                                position: 'top',
                                formatter: function (params) {
                                    return Math.abs(params.value).toFixed(1);
                                },
                                color: "#FFF",
                                fontSize: 14
                            },
                        },
                        itemStyle: {
                            normal: {
                                show: true,
                                borderWidth: 0,
                                barBorderRadius: [30, 30, 0, 0],
                                color: itemStyleColor,
                            },
                            emphasis: {
                                shadowBlur: 10,
                            }
                        },
                    }
                    serie.push(item);
                };
                return serie;
            }()
        };
        // myChart.setOption(option);
        return option;
    },
    // 饼图：超警、超保、正常统计个数
    echartCJCBZCpei: (chartName, data, valuedata1, percentdata, colorArr, colorAlpha, theme) => {
        var legendColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            legendColor = "#000";
        } else if (theme == "default") {
            legendColor = "#fff";
        }
        // var myChart = echarts.init(document.getElementById(chartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();
        var seriesdata1 = [
            {
                name: '正常',
                value: valuedata1[0],
                percent: percentdata[0],
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        // shadowBlur: 20,
                        borderColor: colorAlpha[0],
                        // shadowColor: colorArr[0],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: colorArr[0],
                            },
                            {
                                offset: 1,
                                color: colorAlpha[0],
                            },
                        ]),
                    },
                },
            },
            {
                name: '超警',
                value: valuedata1[1],
                percent: percentdata[1],
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        shadowBlur: 20,
                        borderColor: colorAlpha[1],
                        // shadowColor: colorArr[1],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: colorArr[1],
                            },
                            {
                                offset: 1,
                                color: colorAlpha[1],
                            },
                        ]),
                    },
                },
            },
            {
                name: '超保',
                value: valuedata1[2],
                percent: percentdata[2],
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        // shadowBlur: 20,
                        borderColor: colorAlpha[2],
                        // shadowColor: colorArr[2],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: colorArr[2],
                            },
                            {
                                offset: 1,
                                color: colorAlpha[2],
                            },
                        ]),
                    },
                },
            },
        ]

        function array2obj(seriesdata1, name) {
            var resObj = {};
            for (var i = 0; i < seriesdata1.length; i++) {
                resObj[seriesdata1[i][name]] = seriesdata1[i];
            }
            return resObj;
        }
        var objData = array2obj(seriesdata1, 'name');

        //将合计值转换为数组
        var totlenum = Number(valuedata1[0]) + Number(valuedata1[1]) + Number(valuedata1[2])
        var h = '' + totlenum + '';
        var arr = h;
        var m = '';

        for (var i = 0; i < arr.length; i++) {
            m += '{a|' + arr[i] + '}';
            if (i != arr.length - 1) {
                m += '  ';
            }
        }

        var option = {
            grid: {
                x: '10%',
                y: '3',
                x2: '5%',
                y2: '5%',
                borderWidth: 1,
                borderColor: '#f0f0f0',
            },
            title: [
                {
                    show: true,
                    text: '{a|名称}{b|数量}{c|占比}',
                    top: '35%',
                    left: '58%',
                    textStyle: {
                        rich: {
                            a: {
                                align: 'center',
                                fontSize: 14,
                                color: legendColor,
                                width: 16,
                                padding: [0, 0, 0, 25],
                            },
                            b: {
                                align: 'center',
                                fontSize: 14,
                                color: legendColor,
                                width: 5,
                                padding: [0, 0, 0, 36],
                            },
                            c: {
                                align: 'center',
                                fontSize: 14,
                                color: legendColor,
                                width: 5,
                                padding: [0, 0, 0, 45],
                            },
                        },
                    },
                },
                {
                    text: '{b|站点总数：}' + m,
                    left: '77%',
                    top: '1%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '12',
                        color: legendColor,
                        textAlign: 'center',
                        rich: {
                            a: {
                                fontSize: '28',
                                backgroundColor: 'rgba(56,89,255,0.2)',
                                borderColor: 'rgba(56,211,255,1)',
                                borderWidth: 1,
                                padding: [12, 6, 6, 6],
                                shadowColor: 'rgba(56,211,255,1)',
                                shadowBlur: 3,
                                borderRadius: 3,
                                fontFamily: 'led',
                            },
                            b: {
                                fontSize: '16',
                                fontWeight: 'bold',
                                padding: [6, 6, 6, 6],
                                color: legendColor,
                            },
                        },
                    },
                },
            ],
            legend: {
                show: true,
                //icon: 'circle',
                orient: 'vertical',
                top: '50%',
                left: '58%',
                itemGap: 15,
                itemWidth: 15,
                itemHeight: 10,
                data: seriesdata1,
                formatter: function (name) {
                    return '{a|' + name + '}{b|' + objData[name].value.toFixed(0) + '}{c|' + objData[name].percent + '%}';
                },
                textStyle: {
                    rich: {
                        a: {
                            align: 'center',
                            fontSize: 14,
                            color: legendColor,
                            width: 26,
                            padding: [0, 0, 0, 0],
                        },
                        b: {
                            align: 'center',
                            fontSize: 14,
                            color: legendColor,
                            width: 5,
                            padding: [0, 0, 0, 30],
                        },
                        c: {
                            align: 'center',
                            fontSize: 14,
                            color: legendColor,
                            width: 5,
                            padding: [0, 0, 0, 50],
                        },
                    },
                },
            },
            series: {
                type: 'pie',
                center: ['30%', '55%'],
                radius: ['60%', '80%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    normal: {
                        borderColor: '#ccc',
                        borderWidth: 0,
                    }
                },
                label: {
                    show: true,
                    position: 'center',
                    show: false,
                    emphasis: {
                        show: true,
                        formatter: function (data) {
                            // return (
                            //     '{name|' +
                            //     data.name + ':' +
                            //     '}' +
                            //     ' {value|' +
                            //     data.percent.toFixed(2) +
                            //     '%}'
                            // );
                            return "{value|" + data.value.toFixed(0) + "}\n{name|" + data.name + "}";
                        },
                        textStyle: {
                            rich: {
                                name: {
                                    fontSize: 14,
                                    color: colorArr,
                                },
                                value: {
                                    lineHeight: 50,
                                    fontSize: 36,
                                    color: colorArr,
                                    fontFamily: 'led',
                                    padding: [20, 0, 0, 0],
                                },
                            },
                        }
                    }

                },
                labelLine: {
                    show: false,
                    normal: {
                        length: 10,
                        length2: 20,
                        align: 'right',
                        lineStyle: {
                            width: 1,
                        },
                    },
                },
                data: seriesdata1,
                seriesIndex: 0,
            },
        };

        return option;
    },
    // BP预报水位
    chartSWYB: (ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "水位(m)";
        }
        // var myChart = echarts.init(document.getElementById(ChartName)); //获得控件对象
        // myChart.clear();

        //echarts.init(document.getElementById('quxian'), 'macarons');
        var chartName = []; //控件元素名称
        var chartTM = []; //时间序列
        var chartValue = []; //时间序列
        var liststr = ""; //拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        if (data.length == 0) {
            var titleShow = true
        } else {
            var titleShow = false
        }
        var option = {
            title: {
                show: titleShow, // 是否显示title
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'rgba(255,255,255,0.50)',
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            color: LineColor,
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: false
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: false,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: chartTM,
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
                    fontSize: 14,
                },
            }],
            yAxis: [
                {
                    name: max_min_Name,
                    nameTextStyle: {
                        padding: [0, 0, 0, -20]
                    },
                    type: 'value',
                    boundaryGap: false,
                    // splitNumeber:5,
                    scale: true, //是否自动计算最大最小值。
                    //min:max_min.min, //动态设置最大值最小值。
                    //max:max_min.max,
                    min: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }

                        if ((jiangenew - jiange) % 2 == 0) {
                            // return value.min - (jiangenew - jiange) / 20;
                            if ((jiangenew - jiange) < 5) {
                                return value.min - (jiangenew - jiange) / 20 - 0.5;
                            } else {
                                return value.min - (jiangenew - jiange) / 20;
                            }

                        } else {
                            if ((jiangenew - jiange) < 5) {
                                return value.min - (jiangenew - jiange) / 20 - 0.5;
                            } else {
                                return value.min - (jiangenew - jiange) / 20;
                            }
                        }
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
                            if ((jiangenew - jiange) < 5) {
                                return value.max + (jiangenew - jiange) / 30 + 0.5;
                            } else {
                                return value.max + (jiangenew - jiange) / 30;
                            }
                        } else {
                            if ((jiangenew - jiange) < 5) {
                                return value.max + (jiangenew - jiange + 1) / 30 + 0.5;
                            } else {
                                return value.max + (jiangenew - jiange + 1) / 30;
                            }
                        }
                    },
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(2);
                        },
                        textStyle: {
                            color: axisLabelColor
                        },
                        fontSize: 14,
                    },
                    splitLine: {
                        show: true,
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
                {
                    name: "雨量(mm)",
                    type: 'value',
                    boundaryGap: false,
                    interval: 0,
                    min: 0,
                    max: function (value) {
                        return Number((value.max - (value.max % 5)) / 5 + 1).toFixed(0) * 5;
                    },
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(1);
                        },
                        textStyle: {
                            color: axisLabelColor
                        },
                        fontSize: 14,
                    },
                    splitLine: {
                        show: true,
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
                }
            ],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; //声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (isNaN(m[i][j]) == false) {
                            // chartValue.push(changeTwoDecimal(m[i][j], 2)); //循环价值
                            chartValue.push(m[i][j]); //循环价值
                        }
                    }
                    if (chartName[j] == "实时" || chartName[j] == "实测" || chartName[j] == "上游水位") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                color: "rgba(25,163,223,1)",
                                //borderColor: "#646ace",
                                //borderWidth: 1

                            },
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#ffffff",
                                        fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            },
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
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "预报") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                // color: "rgba(22,255,141,1)",
                                normal: {
                                    lineStyle: {
                                        width: 2,
                                        type: 'dashed'  //'dotted'点型虚线 'solid'实线 'dashed'线性虚线
                                    }
                                },
                                textStyle: {
                                    color: "#000000",
                                },
                            },
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#000000",
                                        fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            }
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "警戒") {
                        var item = {
                            name: '警戒',
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            showSymbol: false,//去掉数据点
                            endLabel: {
                                show: true,//只显示折线图最后一个数据
                                offset: [-30, -20],
                                fontSize: 14,
                                color: 'inherit',
                                formatter: function (params) {
                                    // params 是一个包含数据信息的对象
                                    return Number(params.value).toFixed(2); // 将数值保留两位小数
                                },
                            },
                            itemStyle: {
                                // borderWidth: 1,
                                normal: {
                                    show: true,
                                    color: '#FF9E43',
                                    lineStyle: {
                                        // 设置线的宽度
                                        width: 3,
                                        //'dotted'虚线 'solid'实线
                                        type: 'solid'
                                    }
                                },
                            },
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "保证") {
                        var item = {
                            name: '保证',
                            type: 'line',
                            data: chartValue,
                            connectNulls: true,
                            smooth: true,
                            showSymbol: false,//去掉数据点
                            endLabel: {
                                show: true,//只显示折线图最后一个数据
                                offset: [-30, -20],
                                fontSize: 14,
                                color: 'inherit',
                                formatter: function (params) {
                                    // params 是一个包含数据信息的对象
                                    return Number(params.value).toFixed(2); // 将数值保留两位小数
                                },
                            },
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: '#EE585B',
                                    lineStyle: {
                                        // 设置线的宽度
                                        width: 2,
                                        //'dotted'虚线 'solid'实线
                                        type: 'solid'
                                    }
                                },
                            },
                        }
                        serie.push(item);
                    }
                    else if (chartName[j] == "雨量") {
                        var item = {
                            name: chartName[j],
                            type: 'bar',
                            yAxisIndex: 1,
                            data: chartValue,
                            barWidth: '40%',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    formatter: function (params) {
                                        return params.value;
                                    },
                                    textStyle: {
                                        color: labelColor, //color of value
                                        fontSize: 14
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    show: true,
                                    borderWidth: 0,
                                    barBorderRadius: [15, 15, 0, 0],
                                },
                            },
                            smooth: true
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                        };
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        // myChart.resize();
        // myChart.setOption(option);
        // window.addEventListener("resize", function () {
        //     myChart.resize();
        // }); 
        return option;

    },
    // 河道过程线动态
    chartHDDong: (chartName, timeDate, stnmData, theme, dataSW, dataName, dataResult0, dataResult1, dataResult2, dataResult3, dataResult4, dataResult5) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, itemColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            itemColor = "#000";
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            itemColor = "#00FFFF";
        }
        var option = {
            timeline: {
                data: timeDate,
                axisType: 'category',
                show: true,
                autoPlay: true,
                playInterval: 1000,
                checkpointStyle: {
                    color: '#04a5f1',
                    borderColor: 'rgba(4, 165, 261, .5)'
                },
                itemStyle: {
                    normal: {
                        color: '#04a5f1'
                    },
                    emphasis: {
                        color: '#04a5f1'
                    },
                    label: {
                        textStyle: { //数值样式
                            fontSize: 14,
                            color: itemColor,
                        }
                    }
                },
            },
            options: [{
                title: {
                    'text': dataName,
                    "textStyle": { "color": itemColor }
                },
                grid: {
                    left: 20,
                    right: 40,
                    bottom: 60,
                    top: 60,
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        interval: 0,//横轴信息全部显示
                        fontSize: 14,
                        position: [10, 10],
                    },
                    axisLine: {
                        lineStyle: {
                            color: axisLineColor,
                            width: 1 //这里是为了突出显示加上的
                        },
                        textStyle: {
                            color: axisLineColor,
                            fontSize: '16'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data: stnmData
                }],
                yAxis: [{
                    name: '水位(m)',
                    type: 'value',
                    min: 0,
                    max: 5,
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(2);
                        },
                        textStyle: {
                            color: axisLabelColor
                        },
                        fontSize: 14,
                    },
                    splitLine: {
                        show: true,
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
                }],
                series: [{
                    name: '水位',
                    type: 'line',
                    data: dataSW,
                    connectNulls: true,
                    itemStyle: {
                        normal: {
                            show: true,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#0099FF'
                            }, {
                                offset: 1,
                                color: 'rgba(25,163,223,.3)'
                            }]),
                            shadowColor: 'rgba(25,163,223,.5)',
                            borderWidth: 0,
                            label: {
                                show: true,  //开启显示
                                formatter: '{c}',  //显示数值
                                position: 'top',
                                textStyle: { //数值样式
                                    fontSize: 14,
                                    color: itemColor,
                                }
                            }
                        },
                    },
                    areaStyle: {},
                }]
            }, dataResult4, dataResult3, dataResult2, dataResult1, dataResult0,]
        };

        return option;
    },
    // 污水井
    chartWSJ: (ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;

        var chartName = []; //控件元素名称
        var chartTM = []; //时间序列
        var chartValue = []; //时间序列
        var liststr = ""; //拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        if (data.length == 0) {
            var titleShow = true
        } else {
            var titleShow = false
        }
        var option = {
            title: {
                show: titleShow, // 是否显示title
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'rgba(255,255,255,0.50)',
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            //backgroundColor: '#100E19',
            tooltip: {
                trigger: 'axis'
            },
            color: LineColor,
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: false
                    },
                    dataView: {
                        show: false,
                        readOnly: false
                    },
                    magicType: {
                        show: false,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: chartTM,
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
                    fontSize: 14,
                },
            }],
            yAxis: [
                {
                    name: "黄海液位",
                    nameTextStyle: {
                        padding: [0, 0, 0, -20]
                    },
                    type: 'value',
                    boundaryGap: false,
                    // splitNumeber:5,
                    scale: true, //是否自动计算最大最小值。
                    //min:max_min.min, //动态设置最大值最小值。
                    //max:max_min.max,
                    min: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }

                        if ((jiangenew - jiange) % 2 == 0) {
                            // return value.min - (jiangenew - jiange) / 20;
                            if ((jiangenew - jiange) < 5) {
                                return value.min - (jiangenew - jiange) / 20 - 0.5;
                            } else {
                                return value.min - (jiangenew - jiange) / 20;
                            }

                        } else {
                            if ((jiangenew - jiange) < 5) {
                                return value.min - (jiangenew - jiange) / 20 - 0.5;
                            } else {
                                return value.min - (jiangenew - jiange) / 20;
                            }
                        }
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
                            if ((jiangenew - jiange) < 5) {
                                return value.max + (jiangenew - jiange) / 30 + 0.5;
                            } else {
                                return value.max + (jiangenew - jiange) / 30;
                            }
                        } else {
                            if ((jiangenew - jiange) < 5) {
                                return value.max + (jiangenew - jiange + 1) / 30 + 0.5;
                            } else {
                                return value.max + (jiangenew - jiange + 1) / 30;
                            }
                        }
                    },
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(2);
                        },
                        textStyle: {
                            color: axisLabelColor
                        },
                        fontSize: 14,
                    },
                    splitLine: {
                        show: true,
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
                {
                    name: "相对水位",
                    nameTextStyle: {
                        padding: [0, 0, 0, -20]
                    },
                    type: 'value',
                    boundaryGap: false,
                    // splitNumeber:5,
                    scale: true, //是否自动计算最大最小值。
                    //min:max_min.min, //动态设置最大值最小值。
                    //max:max_min.max,
                    min: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }

                        if ((jiangenew - jiange) % 2 == 0) {
                            // return value.min - (jiangenew - jiange) / 20;
                            if ((jiangenew - jiange) < 5) {
                                return value.min - (jiangenew - jiange) / 20 - 0.5;
                            } else {
                                return value.min - (jiangenew - jiange) / 20;
                            }

                        } else {
                            if ((jiangenew - jiange) < 5) {
                                return value.min - (jiangenew - jiange) / 20 - 0.5;
                            } else {
                                return value.min - (jiangenew - jiange) / 20;
                            }
                        }
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
                            if ((jiangenew - jiange) < 5) {
                                return value.max + (jiangenew - jiange) / 30 + 0.5;
                            } else {
                                return value.max + (jiangenew - jiange) / 30;
                            }
                        } else {
                            if ((jiangenew - jiange) < 5) {
                                return value.max + (jiangenew - jiange + 1) / 30 + 0.5;
                            } else {
                                return value.max + (jiangenew - jiange + 1) / 30;
                            }
                        }
                    },
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(2);
                        },
                        textStyle: {
                            color: axisLabelColor
                        },
                        fontSize: 14,
                    },
                    splitLine: {
                        show: true,
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
                }

            ],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; //声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (isNaN(m[i][j]) == false) {
                            // chartValue.push(changeTwoDecimal(m[i][j], 2)); //循环价值
                            chartValue.push(m[i][j]); //循环价值
                        }
                    }
                    if (chartName[j] == "实时" || chartName[j] == "上游水位") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                color: "rgba(25,163,223,1)",
                                //borderColor: "#646ace",
                                //borderWidth: 1

                            },
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#ffffff",
                                        fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            },
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
                        };
                        serie.push(item);
                    }
                    else if (chartName[j] == "预报") {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                // color: "rgba(22,255,141,1)",
                                normal: {
                                    lineStyle: {
                                        width: 2,
                                        type: 'dashed'  //'dotted'点型虚线 'solid'实线 'dashed'线性虚线
                                    }
                                },
                                textStyle: {
                                    color: "#000000",
                                },
                            },
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }],
                                symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#000000",
                                        fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            }
                        };
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                        };
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        // myChart.resize();
        // myChart.setOption(option);
        // window.addEventListener("resize", function () {
        //     myChart.resize();
        // }); 
        return option;

    },
    // 超警统计
    chartAreaCJCC: (ChartName, chartTM, chartData, LineColor, max_min_Name, theme, DecimalP = 0) => {
        var barWidthVal;
        if (chartTM.length == 5) {
            barWidthVal = '18%';
        } else if (chartTM.length == 4) {
            barWidthVal = '13%';
        } else if (chartTM.length == 3) {
            barWidthVal = '8%';
        } else if (chartTM.length == 2) {
            barWidthVal = '4%';
        } else if (chartTM.length == 1) {
            barWidthVal = '1%';
        } else {
            barWidthVal = '26%';
        }
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        // var myChart = echarts.init(document.getElementById(ChartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();

        var tt = chartData.filter(function (ex) {
            return ex != undefined && ex > 0;
        })
        if (tt.length == 0) {
            var titleShow = true
        } else {
            var titleShow = false
        }
        var option = {
            title: {
                // 是否显示title
                show: titleShow,
                text: '无数据',
                x: 'center',
                y: 'center',
                textStyle: {
                    color: titleColor,
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    //type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 1,
                        opacity: 1
                    }
                },
                formatter: function (params) {
                    let res = params[0].axisValue + '<br/>';
                    params.forEach(function (item) {
                        res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(DecimalP) + '<br/>';
                    });
                    return res;
                }
            },
            color: LineColor,
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: chartTM,
                    boundaryGap: true,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        rotate: 0,
                        fontSize: 14,
                        textStyle: {
                            color: axisLabelColor
                        },
                        formatter: function (value) {
                            var name = value.split("").join("\n")
                            if (Number(name.length) > 7) {
                                return name.slice(0, 5) + "\n...";
                            } else {
                                return name;
                            }
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    boundaryGap: ['5%', '5%'],
                }
            ],
            yAxis: [
                {
                    name: max_min_Name,
                    nameTextStyle: {
                        padding: [0, 0, 0, 0]
                    },
                    type: 'value',
                    min: 0,
                    max: function (e) {
                        return e.max + 5;
                    },
                    boundaryGap: false,
                    splitNumeber: 5,
                    axisTick: {
                        alignWithLabel: true,
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: splitLineColor
                        }
                    },
                    splitArea: {     // 网格区域
                        show: false   // 是否显示，默认为false
                    },
                    //scale: true, //是否自动计算最大最小值。
                    min: 0,
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(DecimalP);
                        },
                        fontSize: 14,
                    },
                }
            ],
            series: [
                {
                    name: '时长',
                    type: 'bar',
                    label: {
                        show: false,
                        position: 'top',
                    },
                    // 相邻柱状之间的空隙
                    // barGap: '0%',
                    barWidth: 13,
                    data: chartData,
                    itemStyle: {
                        normal: {
                            show: true,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#0099FF'
                            }, {
                                offset: 1,
                                color: '#00FFFF'
                            }]),
                            borderWidth: 0,
                            barBorderRadius: [15, 15, 0, 0],
                            label: {
                                show: true,  //开启显示
                                formatter: '{c}',  //显示数值
                                position: 'top',
                                textStyle: { //数值样式
                                    color: labelColor, //color of value
                                    fontSize: 14
                                },
                                formatter: function (e) {
                                    var value = e.value;
                                    if (value == 0) {
                                        return "";
                                    } else {
                                        return Number(value).toFixed(0);
                                    }
                                }
                            }
                        },
                        emphasis: {
                            shadowBlur: 15,
                            shadowColor: 'rgba(105,123, 214, 0.7)'
                        }
                    },
                },
            ]
        };
        return option;
    },
    // 预报分区水量
    chartAreaSLZF: (ChartName, chartTM, chartData, LineColor, max_min_Name, theme) => {
        var barWidthVal;
        if (chartTM.length == 5) {
            barWidthVal = '18%';
        } else if (chartTM.length == 4) {
            barWidthVal = '13%';
        } else if (chartTM.length == 3) {
            barWidthVal = '8%';
        } else if (chartTM.length == 2) {
            barWidthVal = '4%';
        } else if (chartTM.length == 1) {
            barWidthVal = '1%';
        } else {
            barWidthVal = '26%';
        }
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        // var myChart = echarts.init(document.getElementById(ChartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();

        var tt = chartData.filter(function (ex) {
            return ex != undefined && ex > 0;
        })
        if (tt.length == 0) {
            var titleShow = true
        } else {
            var titleShow = false
        }
        var option = {
            title: {
                // 是否显示title
                show: false,
                text: '无数据',
                x: 'center',
                y: 'center',
                textStyle: {
                    color: titleColor,
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    //type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 1,
                        opacity: 1
                    }
                },
                formatter: function (params) {
                    let res = params[0].axisValue + '<br/>';
                    params.forEach(function (item) {
                        res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(1) + '<br/>';
                    });
                    return res;
                }
            },
            color: LineColor,
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: chartTM,
                    boundaryGap: true,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        rotate: 0,
                        fontSize: 14,
                        textStyle: {
                            color: axisLabelColor
                        },
                        // formatter: function (value) {
                        //     return value.replace("负", "").replace("正", "").split("").join("\n");
                        // }
                        formatter: function (value) {
                            var name = value.replace("负", "").replace("正", "").split("").join("\n");
                            if (Number(name.length) > 7) {
                                return name.slice(0, 5) + "\n...";
                            } else {
                                return name;
                            }
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    boundaryGap: ['5%', '5%'],
                }
            ],
            yAxis: [
                {
                    name: max_min_Name,
                    nameTextStyle: {
                        padding: [0, 0, 0, 0]
                    },
                    type: 'value',
                    min: 0,
                    max: function (e) {
                        return e.max + 100;
                    },
                    boundaryGap: false,
                    splitNumeber: 5,
                    axisTick: {
                        alignWithLabel: true,
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: splitLineColor
                        }
                    },
                    splitArea: {     // 网格区域
                        show: false   // 是否显示，默认为false
                    },
                    //scale: true, //是否自动计算最大最小值。
                    min: 0,
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(0);
                        },
                        fontSize: 14,
                    },
                }
            ],
            series: [
                {
                    name: '水量',
                    type: 'bar',
                    label: {
                        show: false,
                        position: 'top',
                        // textStyle: {
                        //     textDecoration: undeline,
                        // }
                    },
                    // 相邻柱状之间的空隙
                    // barGap: '0%',
                    barWidth: 15,
                    data: chartData,
                    itemStyle: {
                        normal: {
                            show: true,
                            color: function (e) {
                                if (e.name.indexOf("正") > -1) {
                                    return new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                                        {
                                            offset: 1,
                                            color: "rgba(48, 236, 166, 1)"
                                        },
                                        {
                                            offset: 0,
                                            color: "rgba(48, 236, 166, 0.5)"
                                        }
                                    ]);
                                } else {
                                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#0099FF'
                                    }, {
                                        offset: 1,
                                        color: '#00FFFF'
                                    }]);
                                }
                            },
                            borderWidth: 0,
                            barBorderRadius: [15, 15, 0, 0],
                            label: {
                                show: true,  //开启显示
                                //formatter: '{c}',  //显示数值
                                formatter: function (params) {
                                    if (Number(params.value) > 0) {
                                        return Number(params.value).toFixed(1);
                                    } else {
                                        return "";
                                    }
                                },
                                position: 'top',
                                textStyle: { //数值样式
                                    color: labelColor, //color of value
                                    fontSize: 14
                                }
                            }
                        },
                        emphasis: {
                            shadowBlur: 15,
                            shadowColor: 'rgba(105,123, 214, 0.7)'
                        }
                    },
                },
            ]
        };
        return option;
    },

    // 超警、超保统计
    chartCJCBTJ: (ChartName, data, strNote, LineColor, max_min_Name, theme) => {
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        // var myChart = echarts.init(document.getElementById(ChartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();
        if (max_min_Name == "雨量") {
            max_min_Name = "雨量（mm）";
        }
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var liststr = ""; 	//拼装表格
        var m = new Array();
        var Drptotal = 0;
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        //循环数据，加入有效数据。
        $.each(data, function (index, value, item) {
            var charthan = []; 	//时间序列
            $.each(strNote, function (index1, value1, item1) {
                charthan.push(value[value1.codename]); //加入集合
                if (value1.name == "时间") {
                    chartTM.push(value[value1.codename]); //加入时间集合
                } else if (value1.name == "方案") {
                    chartTM.push(value[value1.codename]);
                }
                else {
                    chartValue.push(value[value1.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        var option = {
            title: {
                // 是否显示title
                show: false,
                text: '无数据',
                x: 'center',
                y: '30%',
                textStyle: {
                    color: titleColor,
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    //type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 1,
                        opacity: 1
                    }
                },
            },
            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {
                        show: false, // 显示导出图片按钮
                        type: 'png', // 导出图片格式为 PNG
                        name: 'echart_image', // 导出图片文件名
                        pixelRatio: 2, // 图片清晰度，数值越大越清晰
                        // 设置图标颜色
                        iconStyle: {
                            normal: {
                                borderColor: toolboxColor, // 正常状态下边框颜色
                            },
                            emphasis: {
                                borderColor: axisLineColor, // 鼠标悬停时边框颜色
                            }
                        },
                        // 设置提示文字样式和位置
                        title: '导出图片',
                        textStyle: {
                            color: axisLabelColor, // 文字颜色
                            fontSize: 12 // 文字大小
                        },
                        // 调整提示文字位置
                        orient: 'vertical', // 垂直布局
                        itemGap: 10 // 图标与文字间距

                    }
                }
            },
            color: LineColor,
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
                show: true
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: chartTM,
                    boundaryGap: true,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        rotate: 0,
                        fontSize: 14,
                        textStyle: {
                            color: axisLabelColor
                        },
                        formatter: function (value) {
                            return value
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    boundaryGap: ['5%', '5%'],
                }
            ],
            yAxis: [
                {
                    name: max_min_Name,
                    nameTextStyle: {
                        padding: [0, 0, 0, 0]
                    },
                    type: 'value',
                    min: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        var minVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            minVal = value.min - (jiangenew - jiange) / 20;
                        } else {
                            minVal = value.min - (jiangenew - jiange - 1) / 20;
                        }
                        if (minVal <= 0) {
                            minVal = 0;
                        }
                        return Number(minVal).toFixed(0);
                    },
                    max: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        if (jiangenew < 5) jiangenew = 5;
                        var maxVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            maxVal = value.max + (jiangenew - jiange) / 30;
                        } else {
                            maxVal = value.max + (jiangenew - jiange + 1) / 30;
                        }
                        if (maxVal < 1) {
                            maxVal = 5;
                        }
                        return Number(maxVal).toFixed(0);
                    },
                    boundaryGap: false,
                    splitNumeber: 5,
                    axisTick: {
                        alignWithLabel: true,
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: splitLineColor
                        }
                    },
                    splitArea: {     // 网格区域
                        show: false   // 是否显示，默认为false
                    },
                    //scale: true, //是否自动计算最大最小值。
                    min: 0,
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(0);
                        },
                        fontSize: 14,
                    },
                }
            ],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "方案") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        chartValue.push(m[i][j]); //循环价值
                    }
                    if (chartName[j] == "超警个数" || chartName[j] == "超警戒(汛限)") {
                        var item = {
                            name: chartName[j],
                            type: 'bar',
                            data: chartValue,
                            barWidth: '15',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: "#F6903D", //color of value
                                        fontSize: 14
                                    }
                                },
                            },
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    areaStyle: { type: 'default' },
                                    //颜色渐变设置
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#FF8000'
                                    }, {
                                        offset: 1,

                                        color: '#FFAA00'
                                    }]),
                                    barBorderRadius: [15, 15, 0, 0],
                                }
                            }
                        }
                        serie.push(item);
                    }
                    else if (chartName[j] == "超保个数" || chartName[j] == "超保证(设计)") {
                        var item = {
                            name: chartName[j],
                            type: 'bar',
                            data: chartValue,
                            barWidth: '15',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: "#D95053", //color of value
                                        fontSize: 14
                                    }
                                },
                            },
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    areaStyle: { type: 'default' },
                                    //颜色渐变设置
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'red'
                                    }, {
                                        offset: 1,
                                        color: '#FF905F'
                                    }]),
                                    barBorderRadius: [15, 15, 0, 0],
                                }
                            }
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            smooth: true
                        }
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        return option;
    },
    // 青坎线    
    chartSWDM: (ChartName, data, strNote, LineColor, max_min_Name, theme, barImage, minGCImage) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
            labelColor = "#000000";
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#ffffff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "水位(m)";
        }

        //echarts.init(document.getElementById('quxian'), 'macarons');
        var chartName = []; //控件元素名称
        var chartTM = []; //时间序列
        var chartValue = []; //时间序列
        var liststr = ""; //拼装表格
        var m = new Array();
        var LineSelect = {};
        var chartNameSelect = [];
        $.each(strNote, function (index, value, item) {
            chartName.push(value.name); //Echarts绘制标注名称加入
            if (value["tableV"] == "1") {
                chartNameSelect.push(value.name);
                LineSelect[value.name] = value.isShow;
            }
        });
        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });

        var PatternImgA = new Image();
        PatternImgA.src = barImage;

        var PatternImgAGC = new Image();
        PatternImgAGC.src = minGCImage;
        if (data.length == 0) {
            chartTM = ['']
        }
        if (data.length == 0) {
            var titleShow = true
        } else {
            var titleShow = false
        }
        var option = {
            title: {
                show: titleShow, // 是否显示title
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'rgba(255,255,255,0.50)',
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis',
                // formatter: "{a} <br/>{b}: {c} ({d}%)"
                formatter: function (params) {
                    var rowResult = data[params[0]["dataIndex"]];
                    let str = `<div>
                            <span style="float:left;"> 距离太浦闸${Number(rowResult["DIS"]).toFixed(1)}km </span><br />
                          `
                    params.forEach(element => {
                        if (element["seriesName"] == "水位") {
                            str += `<span style='float:left;background:#19A3DF;width:10px;height:10px;border-radius: 50%;margin-top: 6px;margin-right: 5px;'> </span>`;
                        }
                        else if (element["seriesName"] == "堤顶高程") {
                            str += `<span style='float:left;background:#787F81;width:10px;height:10px;border-radius: 50%;margin-top: 6px;margin-right: 5px;'> </span>`;
                        }
                        else if (element["seriesName"] == "青坎") {
                            str += ` <span style='float:left;background:#F9F900;width:10px;height:10px;border-radius: 50%;margin-top: 6px;margin-right: 5px;'> </span>`;
                        }
                        var strVal = "-";
                        if (SetNull(element["value"]) != "") {
                            strVal = Number(element["value"]).toFixed(2);
                        }
                        str += `     <span style='float:left;'> ${element["seriesName"]}:${strVal}m</span><br /> `
                    });
                    // str+=`${rowResult["STTP"]}`;
                    str += `</div>`;
                    return str
                }
            },
            color: LineColor,
            legend: {
                data: chartNameSelect,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: chartTM,
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
                    fontSize: 14,
                },
            }],
            yAxis: [{
                name: max_min_Name,
                nameTextStyle: {
                    padding: [0, 0, 0, -20]
                },
                type: 'value',
                boundaryGap: false,
                // splitNumeber:5,
                scale: true, //是否自动计算最大最小值。
                //min:max_min.min, //动态设置最大值最小值。
                //max:max_min.max,
                min: function (value) {
                    var jiange = (value.max - value.min).toFixed(2) * 100;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }
                    return 0;
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
                    } else {
                        return value.max + (jiangenew - jiange + 1) / 30;
                    }

                },
                axisLabel: {
                    formatter: function (v) {
                        return v.toFixed(2);
                    },
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                splitLine: {
                    show: true,
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
            }],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; //声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (isNaN(m[i][j]) == false) {
                            chartValue.push(m[i][j])
                        }
                    }
                    if (chartName[j] == "水位") {
                        if (chartValue.length > 0) {
                            var item = {
                                name: '水位',
                                type: 'line',
                                // 光滑的折线
                                smooth: true,
                                symbol: 'none',
                                data: chartValue,
                                itemStyle: {
                                    color: "rgba(25,163,223,1)",
                                },
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
                            };
                            serie.push(item);
                        }
                    }
                    else if (chartName[j].lastIndexOf("m") > -1) {
                        var _xaxis = 0;
                        var tempName = chartName[j];
                        var labelxaxis = [0, 0, 0, 0];
                        if (chartName[j].lastIndexOf("太浦河口") > -1) {
                            _xaxis = 0;
                            labelxaxis = [-80, 0, 0, 0];
                        }
                        else if (chartName[j].lastIndexOf("太浦闸") > -1) {
                            _xaxis = 28;//28
                            labelxaxis = [0, 0, -50, 80];
                        }
                        else if (chartName[j].lastIndexOf("平望") > -1) {
                            _xaxis = 157;//15.7
                        }
                        else if (chartName[j].lastIndexOf("金泽") > -1) {
                            _xaxis = 403;//40.3
                        }
                        else if (chartName[j].lastIndexOf("练塘") > -1) {
                            _xaxis = 539;//53.9
                        }
                        $.data(myData, _xaxis.toString(), chartName[j].toString());

                        var item = {
                            type: 'line',
                            showAllSymbol: true,
                            symbolSize: [15, 15],
                            symbolOffset: ['0', '0'],
                            symbolRotate: 0,
                            color: '#0000ff',
                            name: chartName[j],
                            markLine: {
                                symbol: ["none", "none"], //箭头 
                                silent: true,
                                data: [{ xAxis: _xaxis }],
                                itemStyle: {
                                    normal: {
                                        shadowColor: '#FFFFFF',
                                        color: '#FC6A07',
                                        shadowBlur: 10,
                                    }
                                },
                                label: {
                                    normal: {
                                        padding: labelxaxis,
                                        formatter: function (datas) {
                                            var vals = $.data(myData, datas["value"].toString());//datas.value
                                            return vals;
                                        },
                                        textStyle: {
                                            color: labelColor, //color of value
                                            fontSize: 14
                                        }
                                    }
                                }
                            },
                            symbol: 'triangle',
                        }
                        serie.push(item);
                    }

                    else if (chartName[j] == "最低高程" || chartName[j] == "最高高程" || chartName[j] == "堤顶高程") {
                        var imageUrl = PatternImgA;
                        if (chartName[j] == "最低高程") {
                            imageUrl = PatternImgAGC;
                        }
                        var item = {
                            name: chartName[j],
                            smooth: true,
                            data: chartValue,
                            type: "line",
                            connectNulls: true,
                            symbolSize: 0,
                            itemStyle: {
                                color: {
                                    image: imageUrl,
                                    repeat: "repeat"
                                }
                            },
                            areaStyle: {
                                color: {
                                    image: imageUrl,
                                    repeat: "repeat",
                                    opacity: 0.8
                                }
                            },
                            symbol: "none",
                            z: 1
                        }
                        serie.push(item);
                    }

                    else if (chartName[j] == "当前水位") {
                        var tempVal = 0;
                        if (chartValue.length > 0) {
                            for (var numII = 0; numII < chartValue.length; numII++) {
                                if ((numII + 1) == disTance) {
                                    tempVal = chartName[j] + "：" + Number(chartValue[numII]).toFixed(2);
                                } else {
                                    chartValue[numII] = null;
                                }
                            }
                        }
                        var item = {
                            type: 'line',
                            showAllSymbol: true,
                            symbolSize: [15, 15],
                            symbolOffset: ['0', '0'],
                            symbolRotate: 0,
                            color: '#FFFFFF',
                            label: {
                                normal: {
                                    show: true, formatter: function (datas) {
                                        return "当前水位：" + Number(datas.value).toFixed(2) + "m";
                                    }
                                }
                            },
                            name: '',
                            tooltip: { show: true, trigger: 'item', formatter: tempVal + 'm' },
                            data: chartValue,
                            symbol: 'triangle',
                            yAxisIndex: 0,
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            symbol: 'none',
                            "connectNulls": true,
                            data: chartValue,

                        };
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        return option;
    },
    // 氯化物
    ChartLHW: (ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "水位(m)";
        }

        //echarts.init(document.getElementById('quxian'), 'macarons');
        var chartName = []; //控件元素名称
        var chartTM = []; //时间序列
        var chartValue = []; //时间序列
        var liststr = ""; //拼装表格
        var m = new Array();
        var LineSelect = {};

        var yAxisData = [];
        var countDay = 0;
        // $.each(strNote, function (index, value, item)
        strNote.forEach(value => {
            chartName.push(value.name);   //Echarts绘制标注名称加入
            if (value.tableV == "2") {
                max_min_Name += "," + value.name;
            }
            LineSelect[value.name] = value.isShow;
            if (value.name != "时间") {
                if (yAxisData.length == 0) {
                    yAxisData.push({
                        boundaryGap: false,
                        name: value.name,
                        type: 'value',
                        min: 0, //动态设置最大值最小值。
                        max: 6,
                        daySelect: countDay,
                        axisTick: { show: true },
                        splitLine: {
                            show: true,
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
                        },
                        min: 0,
                        max: function (value) {
                            var jiange = (value.max - value.min).toFixed(2) * 100;
                            var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                            jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                            if ((jiangenew - jiange - 1) == 0) {
                                jiangenew = jiangenew * 2;
                            }
                            if (jiangenew < 5) jiangenew = 5;
                            var maxValue;
                            if ((jiangenew - jiange) % 2 == 0) {
                                maxValue = value.max + (jiangenew - jiange) / 30;
                            }
                            else {
                                maxValue = value.max + (jiangenew - jiange + 1) / 30;
                            }
                            if (maxValue < yAxisValue) {
                                maxValue = yAxisValue + 50;
                            }
                            return maxValue;
                        },
                        axisLabel: {
                            formatter: function (v) {
                                return v.toFixed(2);
                            },
                            textStyle: {
                                color: axisLabelColor
                            },
                            fontSize: 14,
                        },
                    })
                } else {
                    var _flag = true;
                    if (value["isShow"] == false) {
                        _flag = false;
                    }
                    var _Location = "end";
                    yAxisData.push({
                        boundaryGap: true,
                        name: value.name,
                        nameLocation: _Location,
                        position: 'right',
                        offset: 50 * countDay,
                        show: _flag,
                        symbolSize: 0,
                        daySelect: countDay,
                        splitLine: {
                            show: true,
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
                        },
                        axisLabel: {
                            interval: '0',
                            formatter: '{value} ',
                            textStyle: {
                                color: axisLabelColor
                            },
                            fontSize: 14,
                        },
                        min: function (value) {
                            var jiange = (value.max - value.min).toFixed(2) * 100;
                            var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);
                            jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)

                            if ((jiangenew - jiange - 1) == 0) {
                                jiangenew = jiangenew * 2;
                            }
                            return 0;
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
                                return value.max + (jiangenew - jiange) / 50;
                            } else {
                                return value.max + (jiangenew - jiange + 1) / 50;
                            }

                        },
                        axisLabel: {
                            formatter: function (v) {
                                return v.toFixed(2);
                            },
                            textStyle: {
                                color: axisLabelColor
                            },
                            fontSize: 14,
                        },
                    });
                }

                countDay++;
            }
        });


        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        var yAxisValue = 250;
        var lhwLine = {
            type: 'line',
            markLine: {
                lineStyle: {
                    normal: {
                        color: '#F6A129'
                    }
                },
                data: [{
                    yAxis: yAxisValue
                }],
                label: {
                    normal: {
                        formatter: yAxisValue,
                        position: 'middle' // 或者具体坐标如 [50%, '50%']
                    }
                },
            },

        }

        if (data.length == 0) {
            chartTM = ['']
        }
        if (data.length == 0) {
            var titleShow = true
        } else {
            var titleShow = false
        }
        var option = {
            title: {
                show: titleShow, // 是否显示title
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'rgba(255,255,255,0.50)',
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            color: LineColor,
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: chartTM,
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
                    fontSize: 14,
                },
            }],
            yAxis: yAxisData,
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        chartValue.push(changeTwoDecimal(m[i][j], 2)); //循环价值
                    }
                    if (max_min_Name.lastIndexOf(chartName[j]) > -1) {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            yAxisIndex: 1,
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#000000",
                                        fontSize: 13,
                                    },
                                },
                            },
                            showSymbol: false,
                            connectNulls: true,
                            smooth: true
                        }
                        var _result = yAxisData.filter(function (evt) {
                            return evt["name"] == chartName[j];
                        })
                        if (_result.length > 0) {
                            console.warn("_result", _result[0])
                            item["yAxisIndex"] = _result[0]["daySelect"];
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            data: chartValue,
                            markPoint: {
                                symbolSize: symbolSize,
                                data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#ffffff",
                                        fontSize: markSize,
                                    },
                                },
                            },
                            showSymbol: false,
                            connectNulls: true,
                            smooth: true
                        }
                        var _result = yAxisData.filter(function (evt) {
                            return evt["name"] == chartName[j];
                        })
                        if (_result.length > 0) {
                            item["yAxisIndex"] = _result[0]["daySelect"];
                        }
                        serie.push(item);
                    }
                };
                serie.push(lhwLine);
                return serie;
            }()
        };
        return option;
    },
    chartBalloon: (theme) => {
        var option = {
            //backgroundColor: '#0d235e',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: 30,
                right: 10,
                left: 10,
                bottom: 30,
                //containLabel: true,
            },
            xAxis: [{
                type: 'category',
                data: ['水位', '雨量', '工情', '雨量预报', '水质'],
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.12)'
                    }
                },
                axisLabel: {
                    margin: 10,
                    color: '#e2e9ff',
                    textStyle: {
                        fontSize: 14
                    },
                },
            }],
            yAxis: [{
                show: false,
                axisLabel: {
                    formatter: '{value}',
                    color: '#e2e9ff',
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.12)'
                    }
                },
                max: 120,
            }],
            series: [{
                type: 'bar',
                data: [91.59, 86.5, 98.51, 100, 96.5],
                barWidth: '20px',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0,244,255,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(0,77,167,1)' // 100% 处的颜色
                        }], false),
                        barBorderRadius: [30, 30, 0, 0],
                        shadowColor: 'rgba(0,160,221,1)',
                        shadowBlur: 4,
                    }
                },
                label: {
                    normal: {
                        show: true,
                        lineHeight: 30,
                        width: 80,
                        height: 30,
                        backgroundColor: 'rgba(0,160,221,0.0)',
                        borderRadius: 200,
                        position: ['-20', '-30'],
                        distance: 1,
                        formatter: [
                            // '    {d|●}',
                            ' {a|{c}%}   \n',
                            '    {b|}'
                        ].join(','),
                        rich: {
                            d: {
                                color: '#3CDDCF',
                            },
                            a: {
                                color: '#2AA6D6',
                                align: 'center',
                            },
                            b: {
                                //width: 1,
                                //height: 30,
                                //borderWidth: 1,
                                //borderColor: '#234e6c',
                                //align: 'left'
                            },
                        }
                    }
                }
            }]
        };
        return option;
    },
    echartSLPieVideo: (data, theme, LineColor) => {
        var option = {
            // color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
            tooltip: {
                position: ['40%', '50%'],
                trigger: 'item',
                // formatter: ' {a} <br />{b} : {c} ({d}%) '
                formatter: '{b} : {c} ' + '万方'
            },
            color: LineColor,
            legend: {
                type: 'plain',
                orient: 'vertical',
                right: "20",
                y: "center",
                show: true,
                padding: [30, 0, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                textStyle: { //图例文字的样式
                    color: '#ccc',
                    fontSize: 13
                },
                data: ['在线', '离线'],
                formatter: function (name) {
                    var index = 0;
                    var clientlabels = ['在线', '离线'];
                    var clientcounts = data;
                    clientlabels.forEach(function (value, i) {
                        if (value == name) {
                            index = i;
                        }
                    });
                    return name + "(" + clientcounts[index].value + ")";
                }
            },
            series: [
                {
                    color: LineColor,
                    name: '个数',
                    type: 'pie',
                    center: ['35%', '50%'],
                    radius: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        normal: {
                            borderColor: '#ccc',
                            borderWidth: 0,
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        }
                    },
                    label: {
                        position: 'center',
                        show: false,
                        emphasis: {
                            show: true,
                            formatter: "{S|{c}}{A|个}\n{B|{b}}",
                            textStyle: {
                                fontWeight: 'bold',
                                rich: {
                                    B: {
                                        fontSize: 14,
                                    },
                                    S: {
                                        fontWeight: 'bolder',
                                        lineHeight: 40,
                                        fontSize: 18,
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
    },
    // 柱状图叠加
    chartBar: (ChartName, data, strNote, LineColor, max_min_Name, NameType, theme, TimeName, TimeType, DecimalP = 0,legendS=true,labelS=false) => {
        var barWidthVal;
        if (data.length == 5) {
            barWidthVal = '18%';
        } else if (data.length == 4) {
            barWidthVal = '13%';
        } else if (data.length == 3) {
            barWidthVal = '8%';
        } else if (data.length == 2) {
            barWidthVal = '4%';
        } else if (data.length == 1) {
            barWidthVal = '1%';
        } else {
            barWidthVal = '26%';
        }
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        // var myChart = echarts.init(document.getElementById(ChartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();
        if (max_min_Name == "雨量") {
            max_min_Name = "雨量（mm）";
        }
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var liststr = ""; 	//拼装表格
        var m = new Array();
        var Drptotal = 0;
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Hour") {
                        chartTM.push((dayjs(value[item.codename]).format("HH"))); //加入时间集合
                    } else if (TimeType == "Day") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD"))); //加入时间集合
                    } else if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    // chartTM.push(value[item.codename]); //加入时间集合
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                    Drptotal += value[item.codename]
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        // var max_min = GetSort(chartValue);

        if (NameType == "true") {
            var rotate = 0
        } else {
            var rotate = 45
        }

        if (chartValue[0] === undefined) {
            var titleShow = true
            var Yoffset = '45%';
        } else if (Drptotal == 0) {
            var titleShow = true
            var Yoffset = '30%';
        } else {
            var titleShow = false
            var Yoffset = '30%';
        }
        var option = {
            title: {
                // 是否显示title
                show: titleShow,
                text: '无数据',
                x: 'center',
                y: Yoffset,
                textStyle: {
                    color: titleColor,
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    //type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 1,
                        opacity: 1
                    }
                },
                formatter: function (params) {
                    let res = params[0].axisValue + '<br/>';
                    params.forEach(function (item) {
                        res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(DecimalP) + '<br/>';
                    });
                    return res;
                }
            },
            color: LineColor,
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
                show: legendS
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: chartTM,
                    boundaryGap: true,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        rotate: rotate,
                        fontSize: 14,
                        textStyle: {
                            color: axisLabelColor
                        },
                        formatter: function (value) {
                            if (NameType == "true" && TimeName != "时间") {
                                var name = value.split("").join("\n")
                                if (Number(name.length) > 7) {
                                    return name.slice(0, 5) + "\n...";
                                } else {
                                    return name;
                                }
                            } else {
                                return value
                            }
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    boundaryGap: ['5%', '5%'],
                }
            ],
            yAxis: [
                {
                    name: max_min_Name,
                    nameTextStyle: {
                        padding: [0, 0, 0, 0]
                    },
                    type: 'value',
                    min: 0,
                    max: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        if (jiangenew < 5) jiangenew = 5;
                        var maxVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            maxVal = value.max + (jiangenew - jiange) / 30;
                        } else {
                            maxVal = value.max + (jiangenew - jiange + 1) / 30;
                        }
                        if (maxVal < 1) {
                            maxVal = 5;
                        }
                        return Number(maxVal).toFixed(DecimalP);
                    },
                    boundaryGap: false,
                    splitNumeber: 3,
                    axisTick: {
                        alignWithLabel: true,
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: splitLineColor
                        }
                    },
                    splitArea: {     // 网格区域
                        show: false   // 是否显示，默认为false
                    },
                    //scale: true, //是否自动计算最大最小值。
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(DecimalP);
                        },
                        fontSize: 14,
                    },
                }
            ],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (Number(m[i][j]) >= 0) {
                            chartValue.push(Number(m[i][j]).toFixed(DecimalP)); //循环价值
                        } else {
                            chartValue.push(null);
                        }
                    }
                    var item = {
                        name: chartName[j],
                        type: 'bar',
                        data: chartValue,
                        barWidth: barWidthVal,
                        stack: 'a',
                        symbol: 'none',
                        label: {
                            normal: {
                                show: labelS,
                                position: 'top',
                                formatter: function (params) {
                                    //if (params.value > 0) {
                                    return params.value;
                                    //}

                                },
                                textStyle: {
                                    color: labelColor, //color of value
                                    fontSize: 14
                                }
                            }
                        },
                        smooth: true
                    }
                    serie.push(item);

                };
                return serie;
            }()
        };
        // myChart.setOption(option);
        var tt = chartValue.filter(function (ex) {
            return ex != undefined && ex > 0;
        })
        return option;
    },
    chartPie3D: (ChartName, data, strNote, LineColor, max_min_Name, theme) => {
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            titleColor = 'rgba(255,255,255,0.60)';
        }

        // 准备待返回的配置项，把准备好的series 传入。
        var option = {
            legend: {
                show: true,
                type: "scroll",
                right: 10,
                bottom: 10,
                orient: "vertical", // 纵向
                itemHeight: 12, // icon高度
                itemWidth: 16, // icon 宽度
                itemGap: 5, // 图例间隔
                textStyle: {
                    color: legendColor,
                    fontSize: 12,
                    fontWeight: "400"
                },
                formatter: function (name) {
                    var index = 0;
                    var clientcounts = data;
                    strNote.forEach(function (value, i) {
                        if (value == name) {
                            index = i;
                        }
                    });
                    return name + "(" + clientcounts[index].value + ")";
                }
            },
            color: LineColor,
            tooltip: {
                formatter: function (params) {
                    var clientcounts = data.filter(function (item) {
                        console.error(item.name, params.seriesName)
                        return item.name == params.seriesName;
                    });
                    let res = params.seriesName + '<br/>' + params.marker + clientcounts[0].value + '<br/>';
                    return res;
                }
            },
            xAxis3D: { min: -1, max: 1 },
            yAxis3D: { min: -1, max: 1 },
            zAxis3D: { min: -1, max: 1 },
            grid3D: {
                show: false,
                boxHeight: 20, // 修改立体饼图的高度
                top: "-10%",
                left: "-20%",
                viewControl: {
                    // 3d效果可以放大、旋转等，
                    alpha: 20, // 饼图翻转的程度
                    beta: 30,
                    rotateSensitivity: 1,
                    zoomSensitivity: 0,
                    panSensitivity: 0,
                    autoRotate: true, // 是否自动旋转
                    distance: 200 // 距离越小看到的饼图越大
                }
            },
            series: getPie3D(data, 0)
        };
        return option;
    },
    chartPie: (ChartName, data, strNote, LineColor, max_min_Name, theme) => {
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            titleColor = 'rgba(255,255,255,0.60)';
        }

        // 准备待返回的配置项，把准备好的series 传入。
        var option = {
            tooltip: {
                trigger: 'item',
                extraCssText:
                    'width:auto;height:auto;background-color:#303742;color:#fff;border:none',
                axisPointer: {
                    type: 'shadow'
                },
                textStyle: {
                    color: 'rgba(252, 249, 249, 1)'
                },
            },
            color: LineColor,
            legend: {
                data: strNote,
                orient: 'vertical',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                right: "60",
                bottom: "10",
            },
            series: [
                {
                    type: 'pie',
                    radius: ['80%', '60%'],
                    center: ['38%', '50%'],
                    padAngle: 5,
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        borderWidth: 8,
                        borderRadius: 4,
                    },
                    emphasis: {
                        scale: false
                    },
                    data: data,
                },
                {
                    type: 'pie',
                    radius: ['50%', '45%'],
                    center: ['38%', '50%'],
                    padAngle: 5,
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        borderWidth: 8,
                        borderRadius: 10,
                        opacity: 0.5,
                    },
                    emphasis: {
                        scale: false
                    },
                    data: data,
                },
            ],
        };
        return option;
    },
    chartBarRadius: (ChartName, value, point, color, title, theme) => {
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            titleColor = 'rgba(255,255,255,0.60)';
        }

        // 准备待返回的配置项，把准备好的series 传入。
        var option = {
            title: {
                text: value,
                left: 'center',
                top: '50%',
                itemGap: 10,
                textStyle: {
                    color: '#fff',
                    fontSize: '20',
                    fontWeight: 600
                },
            },
            angleAxis: {
                max: 100,
                // 隐藏刻度线
                show: false,
            },
            radiusAxis: {
                type: 'category',
                show: true,
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
            },
            polar: {
                radius: '150%', //图形大小
                center: ['45', '62%'],  // 修改垂直位置，减小值使圆离上方更远
            },
            series: [{
                type: 'bar',
                barWidth: 8,
                data: [point],
                showBackground: true,
                roundCap: true,
                backgroundStyle: {
                    color: '#404C4C',
                },
                coordinateSystem: 'polar',
                itemStyle: {
                    normal: {
                        color: color
                    }
                },
            }]
        }
        return option;
    },
    // 水质雷达图
    chartSZLD: (ChartName, data, strNote, LineColor, max_min_Name, codenameName, theme, type = "tm") => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var showed = data.length > 0 ? false : true;
        showed = false;
        if (max_min_Name == "") {
            max_min_Name = "水位(m)";
        }
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var m = new Array();
        //后期根据改为动态设置
        //var selectedstr={'PH' : false,'氨氮' : true,'总磷' : false,'溶解氧' : false,'高锰酸盐' : false};
        var LineSelect = "";
        $.each(strNote, function (index, value, item) {
            chartName.push(value.name);   //Echarts绘制标注名称加入
            LineSelect += "'" + value.name + "':" + value.isShow + ",";
        });
        if (LineSelect.length > 0) {
            LineSelect = LineSelect.substring(0, LineSelect.length - 1);
        }
        //循环数据，加入有效数据。
        $.each(data, function (index, value, item) {
            var charthan = []; 	//时间序列
            $.each(strNote, function (index1, value1, item1) {
                charthan.push(value[value1.codename]); //加入集合
                if (value1.name == "时间") {
                    chartTM.push((dayjs(value[value1.codename]).format("MM-DD HH:mm"))); //加入时间集合
                } else if (value1.name == "名称") {
                    chartTM.push(value[value1.codename]); //加入时间集合
                }
                else {
                    chartValue.push(value[value1.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        var max = 0, min = 0;
        var _seriesData = [1, 1, 1, 1, 1];
        for (var num = 0; num < _seriesData.length; num++) {
            if (_seriesData[num] > max) {
                max = _seriesData[num]
            }
        }
        var indicatorData = [{
            name: "高锰酸盐",
            max: max,
            min: min,
        }, {
            name: "溶解氧",
            max: max,
            min: min,
        }, {
            name: "总磷",
            max: max,
            min: min,
        }, {
            name: "氨氮",
            max: max,
            min: min,
        }]
        var option = {
            normal: {
                top: 200,
                left: 300,
                width: 500,
                height: 400,
                zIndex: 6,
                backgroundColor: ""
            },
            color: ["rgba(245, 166, 35, 1)", "rgba(19, 173, 255, 1)"],
            tooltip: {
                show: false,
                trigger: 'item',
                // backgroundColor: 'rgba(50,50,50,0.7)',
                textStyle: {
                    color: 'rgba(19, 173, 255, 1)',     // 文字的颜色
                    fontStyle: 'normal',    // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体）
                    fontWeight: 'normal',    // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
                    fontSize: '14',    // 文字字体大小
                    lineHeight: '20',    // 行高
                },
            },
            radar: {
                name: {
                    textStyle: {
                        color: '#05D5FF',
                        fontSize: 14,
                    },
                },
                shape: 'polygon',
                center: ['52%', '50%'],
                radius: '76%',
                startAngle: 90,
                splitNumber: 5,
                shape: 'circle',
                splitArea: {
                    areaStyle: {
                        color: ["transparent"]
                    }
                },
                // 轴的颜色及名称的颜色
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#00FFFF",
                    }
                },
                axisLabel: {
                    formatter: function (value, index) {
                        var texts = [];
                        if (value["value"] === 1) {
                            texts.push('Ⅰ');
                        }
                        if (value["value"] === 2) {
                            texts.push('Ⅱ');
                        }
                        if (value["value"] === 3) {
                            texts.push('Ⅲ');
                        }
                        if (value["value"] === 4) {
                            texts.push('Ⅳ');
                        }
                        if (value["value"] === 5) {
                            texts.push('Ⅴ');
                        }
                        if (value["value"] === 6) {
                            texts.push('劣Ⅴ');
                        }
                        return texts;
                    }
                },
                // 线圈
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(19, 173, 255, .7)"
                    }
                },
                indicator: indicatorData
            },
            series: [
                {
                    name: "水质类别：",
                    type: "radar",
                    symbol: "circle",
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: 'rgba(19, 173, 255, 1)',
                            borderColor: "rgba(19, 173, 255, 0.4)",
                            borderWidth: 10
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: "rgba(19, 173, 255, 0.5)"
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "rgba(19, 173, 255, 1)",
                            width: 2,
                            type: "dashed"
                        }
                    },
                    data: [
                        _seriesData
                    ],
                    label: {
                        normal: {
                            show: true,
                            color: '#E5E604',
                            formatter: function (value) {
                                var texts = [];
                                if (value["value"] == '1') {
                                    texts.push('Ⅰ');
                                }
                                if (value["value"] == '2') {
                                    texts.push('Ⅱ');
                                }
                                if (value["value"] == '3') {
                                    texts.push('Ⅲ');
                                }
                                if (value["value"] == '4') {
                                    texts.push('Ⅳ');
                                }
                                if (value["value"] == '5') {
                                    texts.push('Ⅴ');
                                }
                                if (value["value"] == '6') {
                                    texts.push('劣Ⅴ');
                                }
                                return texts;
                            },
                        },
                    },
                }]
        };
        return option;

    },
    //水生态达标率
    chartSSTPie:(ChartName, data, strNote, LineColor, max_min_Name, TimeType, theme, symbolSize, markSize) => {
      const colorStyle = [[1,new echarts.graphic.LinearGradient(
            0, 0, 1, 0, [
            {
               offset: 0,
               color: 'rgba(22, 148, 255, 0.1)',
            },
            {
               offset: 1,
               color:'rgba(63, 250, 250, 0.5)',
            }
            ]
      )]]
      const option = {
        // backgroundColor: "#0b3c66",
        series: [
        //最外的圆圈（外层刻度）
        {
        type: 'gauge',
        center: [
        '50%',
        '55%'
        ],
        radius: '90%',
        startAngle: 220,
        endAngle: -40,
        min: 0,
        max: 100,
        axisLine: {
            show: true,
            lineStyle: {
                width: 3,
                color:colorStyle
            }
        },
        axisLabel: {
        show: 0
        },
        axisTick: {
            lineStyle: {
                color:'rgba(63,250,250,0.7)',
                width: 1
            },
            length: 5
        },
        splitLine: {
            length: 8,
            lineStyle: {
                color:'rgba(63,250,250,0.8)',
                width: 3
            }
        },
        },
        // 外围刻度（第二层）
        {
        type: 'gauge',
        center: [
        '50%',
        '55%'
        ],
        radius: '82%', // 1行3个
        min: 0,
        max: 100,
        startAngle: 220,
        endAngle: -40,
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: colorStyle,
                fontSize: 20,
                width: 2,
                opacity: 1, //刻度背景宽度
            }
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        },
        },
        // 外围刻度（中间有背景颜色那块，包括里面的刻度）
        {
            type: 'gauge',
            center: [
            '50%',
            '55%'
            ],
            radius: '82%', // 1行3个
            splitNumber: 10,
            min: 0,
            max: 100,
            startAngle: 220,
            endAngle: -40,
            //分隔线样式
            axisTick: {
                lineStyle: {
                    color:'rgba(63,250,250,0)',
                    width: 1
                },
                length: 5
            },
            //刻度样式
            axisLine: {
                show: true,
                lineStyle: {
                    width: 15,
                    color: colorStyle
                }
            },
            //整数分隔线
            splitLine: {
                show: true,
                length: 7,
                lineStyle: {
                    color:'rgba(63, 250, 250, 0.8)',
                    width: 2
                }
            },
            //刻度数字
            axisLabel: {
                show: true,
                distance: 1,
                textStyle: {
                    color:'rgba(63, 250, 250, 0.8)',
                    fontSize: '0.85rem',
                    // fontWeight: 'bold'
                }
            },
        },
        //从外数第三条线
        {
            type: 'gauge',
            center: [
            '50%',
            '55%'
            ],
            radius: '65%', // 1行3个
            splitNumber: 10,
            min: 0,
            max: 100,
            startAngle: 220,
            endAngle: -40,
            axisLine: { // 坐标轴线
                lineStyle: { // 属性lineStyle控制线条样式
                    color: colorStyle,
                    fontSize: 20,
                    width: 2,
                    opacity: 1, //刻度背景宽度
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            pointer: {
                show: false
            },
            axisTick: {
                show: false
            },
            detail: {
                show: 0
            }
        },
        // 内侧指针、数值显示
        {
        name: '',
        center: [
        '50%',
        '50%'
        ],
        type: 'gauge',
        radius: '44%', // 1行3个
        splitNumber: 5,
        min: 0,
        max: 100,
        startAngle: 220,
        endAngle: -40,
        axisLine: {
        show: true,
        lineStyle: {
            width: 50,
            color: [
                [
                1,
                new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                    {
                        offset: 0,
                        color: 'rgba(0, 199, 187, 0)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 199, 187, 0)',
                    }
                    ]
                )
                ],
            ]
        }
        },
        axisTick: {
            show: 0,
        },
        splitLine: {
            show: 0,
        },
        axisLabel: {
            show: 0
        },
        pointer: {
            show: true,
            length: '102%',
            width: 8,
            itemStyle: {
                color:colorStyle
            }
        },
        data: [
        {
            value: 100,
            name: '达标率',
            title: {
                offsetCenter: ['0%', '100%'],
                fontSize: 15,
                color:'#4fe8d6'
            },
            detail: {
                offsetCenter: ['0%', '50%'],
                valueAnimation: true,
                fontSize: "1.15rem",
                color:'#4fe8d6'
            }
        }
        ]
        }
        ]
        };
        return option;
    },
    chartTotalCSL: (ChartName, chartTM, chartData,chartData2, DRPtotal, max_min_Name, theme) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } 
        else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var option = {
            tooltip: {
                trigger: 'axis',
                // 鼠标移动到柱状图会显示内容 竖线变成阴影
                axisPointer: {
                    type: 'shadow'
                },

            },
            color: ['#00FFFF'],
            // //这里设置柱状图上面的方块，名称跟series里的name保持一致
            legend: {
                // orient: 'vertical',
                x: 'right',      //可设定图例在左、右、居中
                y: 'top',     //可设定图例在上、下、居中
                left: '68%',
                show: true,
                padding: [5, 0, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                textStyle: {
                    color:legendColor,
                    fontSize: 12
                },
            },
            grid: {
                left: '4%',
                right: '4%',
                bottom: '0%',
                top: '15%',
                containLabel: true
            },

            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {}
                }
            },
            calculable: true,
            xAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: splitLineColor,
                        type: 'dashed'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: { //  改变x轴字体颜色和大小
                    textStyle: {
                        color: axisLineColor,
                        fontSize: 14
                    },
                },

                axisLabel: {
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                min: 0,
                max: function (value) {
                    var jiange = (value.max - value.min).toFixed(2) * 100;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }
                    if (jiangenew < 5) jiangenew = 5;
                    var maxVal = 0;
                    if ((jiangenew - jiange) % 2 == 0) {
                        maxVal = value.max + (jiangenew - jiange) / 30;
                    } else {
                        maxVal = value.max + (jiangenew - jiange + 1) / 30;
                    }
                    if (maxVal < 10) {
                        maxVal = 10;
                    } else {
                        maxVal = maxVal + 10;
                    }
                    return Number(maxVal).toFixed(0);
                },
            },
            yAxis: {
                type: 'category',
                data: chartTM,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: { //  改变y轴颜色
                    lineStyle: {
                        color: axisLineColor,
                        width: 1 //这里是为了突出显示加上的
                    }
                },
                axisLabel: {
                    show: true,
                    //formatter: '{value}',
                    textStyle: {
                        color: axisLabelColor,
                        fontSize: 12
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    name: "2025",
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, //开启显示
                                position: "right", //在上方显示
                                textStyle: { //数值样式
                                    color: "#FFFFFF",
                                    fontSize: 13,
                                    fontWeight: 500
                                }
                            },
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: 'rgba(52,203,16,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,255,255,0)'
                            }]),
                            barBorderRadius: 1

                        }
                    },
                    data: chartData
                },
                {
                    type: 'bar',
                    name: "历史同期",
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, //开启显示
                                position: "right", //在上方显示
                                textStyle: { //数值样式
                                    color: "#FFFFFF",
                                    fontSize: 13,
                                    fontWeight: 500
                                }
                            },
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: 'rgba(24,144,255,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,255,255,0)'
                            }]),
                            barBorderRadius: 1

                        }
                    },
                    data: chartData2
                }
            ]
        };
        return option;
    },
    chartTotalRSL: (ChartName, chartTM, chartData,chartData2, DRPtotal, max_min_Name, theme) => {
        var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            titleColor = 'rgba(0,0,0,0.70)';
        } 
        else if (theme == "default") {
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var option = {
            tooltip: {
                trigger: 'axis',
                // 鼠标移动到柱状图会显示内容 竖线变成阴影
                axisPointer: {
                    type: 'shadow'
                },

            },
            color: ['#00FFFF'],
            // //这里设置柱状图上面的方块，名称跟series里的name保持一致
            legend: {
                // orient: 'vertical',
                x: 'right',      //可设定图例在左、右、居中
                y: 'top',     //可设定图例在上、下、居中
                left: '68%',
                show: true,
                padding: [5, 0, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                textStyle: {
                    color: legendColor,
                    fontSize: 12
                },
            },
            grid: {
                left: '4%',
                right: '4%',
                bottom: '0%',
                top: '10%',
                containLabel: true
            },

            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {}
                }
            },
            calculable: true,
            xAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: splitLineColor,
                        type: 'dashed'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: { //  改变x轴字体颜色和大小
                    textStyle: {
                        color: axisLineColor,
                        fontSize: 14
                    },
                },

                axisLabel: {
                    textStyle: {
                        color: axisLabelColor
                    },
                    fontSize: 14,
                },
                min: 0,
                max: function (value) {
                    var jiange = (value.max - value.min).toFixed(2) * 100;
                    var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                    jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                    if ((jiangenew - jiange - 1) == 0) {
                        jiangenew = jiangenew * 2;
                    }
                    if (jiangenew < 5) jiangenew = 5;
                    var maxVal = 0;
                    if ((jiangenew - jiange) % 2 == 0) {
                        maxVal = value.max + (jiangenew - jiange) / 30;
                    } else {
                        maxVal = value.max + (jiangenew - jiange + 1) / 30;
                    }
                    if (maxVal < 10) {
                        maxVal = 10;
                    } else {
                        maxVal = maxVal + 10;
                    }
                    return Number(maxVal).toFixed(0);
                },
            },
            yAxis: {
                type: 'category',
                data: chartTM,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: { //  改变y轴颜色
                    lineStyle: {
                        color: axisLineColor,
                        width: 1 //这里是为了突出显示加上的
                    }
                },
                axisLabel: {
                    show: true,
                    //formatter: '{value}',
                    textStyle: {
                        color: axisLabelColor,
                        fontSize: 12
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    name: "2025",
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, //开启显示
                                position: "right", //在上方显示
                                textStyle: { //数值样式
                                    color: "#FFFFFF",
                                    fontSize: 13,
                                    fontWeight: 500
                                }
                            },
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: 'rgba(255,181,116,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,255,255,0)'
                            }]),
                            barBorderRadius: 1
                        }
                    },
                    data: chartData
                },
                {
                    type: 'bar',
                    name: "历史同期",
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, //开启显示
                                position: "right", //在上方显示
                                textStyle: { //数值样式
                                    color: "#FFFFFF",
                                    fontSize: 13,
                                    fontWeight: 500
                                }
                            },
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: 'rgba(79,232,214,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,255,255,0)'
                            }]),
                            barBorderRadius: 1
                        }
                    },
                    data: chartData2
                }
            ]
        };
        return option;
    },
    // 水量过程
    chartCRSL: (chartName, data, strNote, LineColor, max_min_Name, TimeType, theme, showTpye, NameType, TimeName) => {
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, jinitemStyleColor, chuitemStyleColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            jinitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00fd6d'
            }, {
                offset: 1,
                color: '#00FFFF'
            }]);
            chuitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#0099FF'
            }, {
                offset: 1,
                color: '#00FFFF'
            }]);
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#074159";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            jinitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(15,226,82, 1)'
            }, {
                offset: 1,
                color: 'rgba(15,226,82, 0)'
            }]);
            chuitemStyleColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(80,202,225, 1)'
            }, {
                offset: 1,
                color: 'rgba(80,202,225, 0)'
            }]);
            titleColor = 'rgba(255,255,255,0.60)';
        }
        var barWidthVal;
        if (data.length == 5||data.length == 4) {
            barWidthVal = '13%';
        } 
        else if(data.length == 6){
            barWidthVal = '20%';
        }
        // else if (data.length == 4) {
        //     barWidthVal = '13%';
        // } 
        else if (data.length == 3) {
            barWidthVal = '8%';
        } else if (data.length == 2) {
            barWidthVal = '4%';
        } else if (data.length == 1) {
            barWidthVal = '2%';
        } else {
            barWidthVal = '26%';
        }
        console.error("data.length",data.length,'barWidthVal',barWidthVal);
        // var myChart = echarts.init(document.getElementById(ChartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();
        if (max_min_Name == "水量") {
            max_min_Name = "水量（万方）";
        }
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var liststr = ""; 	//拼装表格
        var m = new Array();
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });
        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Day") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD"))); //加入时间集合
                    } else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        // var max_min = GetSort(chartValue);
        if (data.length > 0) {
            var titleShow = false
            var Yoffset = '45%';
        } else {
            var titleShow = true
            var Yoffset = '30%';
        }
        var option = {
            title: {
                // 是否显示title
                show: titleShow,
                text: '无数据',
                x: 'center',
                y: Yoffset,
                textStyle: {
                    color: titleColor,
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    //type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 1,
                        opacity: 1
                    }
                },
                formatter: function (params) {
                    let res = params[0].axisValue + '<br/>';
                    params.forEach(function (item) {
                        if (NameType == "true" && TimeName != "时间") {
                            res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(0) + '<br/>';
                        } else {
                            res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(1) + '<br/>';
                        }
                    });
                    return res;
                }
            },
            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {
                        show: true, // 显示导出图片按钮
                        type: 'png', // 导出图片格式为 PNG
                        name: 'echart_image', // 导出图片文件名
                        pixelRatio: 2, // 图片清晰度，数值越大越清晰
                        // 设置图标颜色
                        iconStyle: {
                            normal: {
                                borderColor: toolboxColor, // 正常状态下边框颜色
                            },
                            emphasis: {
                                borderColor: axisLineColor, // 鼠标悬停时边框颜色
                            }
                        },
                        // 设置提示文字样式和位置
                        title: '导出图片',
                        textStyle: {
                            color: axisLabelColor, // 文字颜色
                            fontSize: 12 // 文字大小
                        },
                        // 调整提示文字位置
                        orient: 'vertical', // 垂直布局
                        itemGap: 10 // 图标与文字间距

                    }
                }
            },
            color: LineColor,
            legend: {
                data: chartName,
                width: '90%',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 0,
                top: 40,
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: chartTM,
                    boundaryGap: true,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        fontSize: 14,
                        rotate: 0,
                        textStyle: {
                            color: axisLineColor
                        },
                        formatter: function (value) {
                            if (NameType == "true" && TimeName != "时间") {
                                var name = value.split("").join("\n")
                                if (Number(name.length) > 7) {
                                    return name.slice(0, 5) + "\n...";
                                } else {
                                    return name;
                                }
                            } else {
                                return value
                            }
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    boundaryGap: ['5%', '5%'],
                }
            ],
            yAxis: [
                {
                    name: max_min_Name,
                    nameTextStyle: {
                        padding: [0, 0, 0, 0]
                    },
                    type: 'value',
                    min: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        var minVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            minVal = value.min - (jiangenew - jiange) / 20;
                        } else {
                            minVal = value.min - (jiangenew - jiange - 1) / 20;
                        }
                        if (minVal <= 0) {
                            minVal = 0;
                        }
                        return Number(minVal).toFixed(1);
                    },
                    max: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }
                        if (jiangenew < 5) jiangenew = 5;
                        var maxVal = 0;
                        if ((jiangenew - jiange) % 2 == 0) {
                            maxVal = value.max + (jiangenew - jiange) / 30;
                        } else {
                            maxVal = value.max + (jiangenew - jiange + 1) / 30;
                        }
                        if (maxVal < 1) {
                            maxVal = 5;
                        }
                        return Number(maxVal).toFixed(1);
                    },
                    boundaryGap: false,
                    splitNumeber: 5,
                    axisTick: {
                        alignWithLabel: true,
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: splitLineColor
                        }
                    },
                    splitArea: {     // 网格区域
                        show: false   // 是否显示，默认为false
                    },
                    //scale: true, //是否自动计算最大最小值。
                    min: 0,
                    axisLabel: {
                        fontSize: 14,
                        formatter: function (v) {
                            return v.toFixed(0);
                        }
                    },
                }
            ],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (Number(m[i][j]) >= 0) {
                            chartValue.push(Number(m[i][j]).toFixed(1)); //循环价值
                        } else {
                            chartValue.push(null);
                        }
                    }
                    var item = {
                        name: chartName[j],
                        type: 'bar',
                        data: chartValue,
                        barWidth: barWidthVal,
                        smooth: true,
                        label: {
                            normal: {
                                show: showTpye,
                                position: 'top',
                                formatter: function (params) {
                                    if (NameType == "true" && TimeName != "时间") {
                                        return Math.abs(params.value).toFixed(0);
                                    } else {
                                        return Math.abs(params.value).toFixed(1);
                                    }
                                },
                                color: "#FFF",
                                fontSize: 14
                            },
                        },
                        itemStyle: {
                            normal: {
                                show: true,
                                borderWidth: 0,
                                barBorderRadius: [30, 30, 0, 0],
                            },
                            emphasis: {
                                shadowBlur: 10,
                            }
                        },
                    }
                    serie.push(item);
                };
                return serie;
            }()
        };
        // myChart.setOption(option);
        return option;
    },
    chartFX:(flfxdata, xData, LineColor, max_min_Name, TimeType, theme, showTpye, NameType, TimeName) =>  {
            var axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
            if (theme == "BlueTheme" || theme == "VioletTheme") {
                axisLabelColor = "#000";
                axisLineColor = "#000";
                splitLineColor = "#eee";
                legendColor = "#000";
                titleColor = 'rgba(0,0,0,0.70)';
            } else if (theme == "default") {
                axisLabelColor = "#00FFFF";
                axisLineColor = "#00FFFF";
                splitLineColor = "#074159";
                legendColor = "#fff";
                titleColor = 'rgba(255,255,255,0.60)';
            }
            var data = flfxdata;
            var seriesData = [], seriesDataFS = [], seriesDataFX = [];
            data.filter(item => {
                seriesData.push({
                    value: item.WindSpeed,
                    symbol: 'path://M31 16l-15-15v9h-26v12h26v9z',
                    symbolSize: [22, 10],
                    symbolRotate: -90 - item.WindDir,
                    msg: item.WindDir
                });
                seriesDataFS.push(item.WindSpeed);
                seriesDataFX.push(item.WindDir);
            });
            var option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        var str = params[0].axisValue + '<br/>';
                        for (var num = 0; num < params.length - 1; num++) {
                            var value = params[num].value;
                            if (params[num].seriesName == "风向") {
                                value += "(" + getDirName(value) + ")";
                            }
                            str += params[num].seriesName + '：' + value + '<br/>';
                        }
                        return str;
                    }
                },
                legend: {
                    data: ["风速"],
                    show: true,
                    itemWidth: 18,
                    itemHeight: 18,
                    textStyle: {
                        color: legendColor,
                        fontSize: 14,
                        padding:[30,0]
                    },
                    left: "center"
                },
                grid: {
                    left: 40,
                    right: 20,
                    bottom: 50,
                    top: 80,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    //boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    data: xData,
                    axisLabel: {
                        //formatter: function (date) {
                        //    console.error(date);
                        //    return echarts.format.formatTime("yyyy月MM月dd日 hh时", date)
                        //}
                        textStyle:{
                            color:axisLabelColor
                        },                        
                        show: true
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
                    //offset: 0,
                },
                yAxis: [{
                    name:"风速(m/s)",
                    type: 'value',
                    min: 0,
                    //max: 30,
                    axisLine: { show: true },
                    axisTick: { show: true },
                    axisLabel: {
                        show: true,
                        formatter: function (v) {
                            return v.toFixed(1);
                        },
                        textStyle:{
                            color:axisLabelColor
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color:splitLineColor,
                            // width: 1,
                            // type: 'dashed',
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
                }
                ],
                visualMap: {
                    name: "级别",
                    type: "piecewise",
                    orient: "horizontal",//horizontal水平 
                    left: "center",
                    //top: "bottom",
                    bottom: 10,
                    textStyle: {
                        color: legendColor,
                    },
                    pieces: [{
                        gte: 24.5,
                        color: "red",
                        label: "≥24.5"
                    },
                    {
                        lt: 24.5,
                        gte: 17.2,
                        color: "#FFAA00",
                        label: "17.2~24.5"
                    },
                    {
                        lt: 17.2,
                        gte: 13.9,
                        color: "#FFFF6B",
                        label: "13.9~17.2"
                    },
                    {
                        lt: 13.9,
                        color: "#0000FF",
                        label: "＜13.9"
                    }
                    ],
                    seriesIndex: 1,
                    // dimension: 1
                },
                color:LineColor,
                series: [
                    {
                        name: "风速",
                        data: seriesDataFS,
                        type: 'line',
                        symbol: 'none',
                        // color: "#FF0000",
                        lineStyle: {
                            normal: {
                                // width: 2
                            }
                        },
                    },
                    {
                        data: seriesData,
                        type: 'line',
                        //yAxisIndex: 1,
                        encode: {
                            x: 0,
                        },
                        lineStyle: {
                            normal: {
                                width: 0
                            }
                        },
                    }
                ]
            };
            return option;
    },
    chartFXMGTU:(title, seriesData, maxValue = 100,legendName,dataFXNM)=>{
        var option = {
            // title:{
            //     text:title,
            //     left: '15%',
            //     top:5,
            //     textStyle: {
            //         color: '#fff',
            //         fontSize: 14,
            //         color:'#00feff',
            //         fontWeight:500,
            //     }
            // },
            // ... (tooltip, color 等其他配置保持不变) ...
            tooltip: {
                trigger: "item",
                textStyle: {
                    //color: "#fff",
                },
            },
            color: [
            "#0001F7",
            "#00B8FE",
            "#00FFFF",
            "#00FF68",
            "#BEFE00",
            "#FFFF00",
            "#FFA800",
            "#E10100",
            ],

            angleAxis: {
            type: "category",
            data: dataFXNM,
            boundaryGap: false, //标签和数据点都会在两个刻度之间的带(band)中间
            axisTick: {
                show: false, //是否显示坐标轴刻度
            },
            splitLine: {
                show: true,
                lineStyle: {
                // color:"black"
                },
            },
            axisLabel: {
                show: true,
                interval: 0, //坐标轴刻度标签的显示间隔，在类目轴中有效
                textStyle: {
                color: "#ffffff",
                fontSize: 12,
                },
            },
            },

            radiusAxis: {
                min: 0,
                max: maxValue,
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
            },
            // 调整极坐标系位置和大小
            polar: {
                center: ["45%", "50%"], // 将极坐标系中心向左移动
                radius: "80%", // 保持原有半径大小
            },
            series: seriesData,

            // ... (legend 配置保持不变) ...
            legend: {
                show: true,
                data: legendName,
                orient: "vertical",
                right: "30%",
                top: "center",
                itemWidth: 15,
                itemHeight: 15,
                textStyle: {
                    color: "#ffffff",
                    fontSize: 12,
                },
            },
        };
        return option;
    },
    // 水位、雨量双图
    chartSWYL: (ChartName, data, strNote, LineColor, max_min_Name, NameType, theme, TimeName, TimeType, DecimalP = 1,labelShow=true,legendShow=false) => {
        var barWidthVal;
        if (data.length == 5) {
            barWidthVal = '18%';
        } else if (data.length == 4) {
            barWidthVal = '13%';
        } else if (data.length == 3) {
            barWidthVal = '8%';
        } else if (data.length == 2) {
            barWidthVal = '4%';
        } else if (data.length == 1) {
            barWidthVal = '1%';
        } else {
            barWidthVal = '26%';
        }
        var toolboxColor, axisLabelColor, axisLineColor, splitLineColor, legendColor, labelColor, titleColor;
        if (theme == "BlueTheme" || theme == "VioletTheme") {
            toolboxColor = "#ccc";
            axisLabelColor = "#000";
            axisLineColor = "#000";
            splitLineColor = "#eee";
            legendColor = "#000";
            labelColor = "#0099FF";
            titleColor = 'rgba(0,0,0,0.70)';
        } else if (theme == "default") {
            toolboxColor = "#074159";
            axisLabelColor = "#00FFFF";
            axisLineColor = "#00FFFF";
            splitLineColor = "#074159";
            legendColor = "#fff";
            labelColor = "#57CDF9";
            titleColor = 'rgba(255,255,255,0.60)';
        }
        // var myChart = echarts.init(document.getElementById(ChartName));  //获得控件对象
        // //清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // myChart.clear();
        if (max_min_Name == "雨量") {
            max_min_Name = "雨量（mm）";
        }
        var chartName = []; 	//控件元素名称
        var chartTM = []; 	//时间序列
        var chartValue = []; //时间序列
        var liststr = ""; 	//拼装表格
        var m = new Array();
        var Drptotal = 0;
        var LineSelect = {};
        strNote.forEach(item => {
            chartName.push(item.name);
            LineSelect[item.name] = item.isShow;
        });

        data.forEach(value => {
            var charthan = []; 	//时间序列
            strNote.forEach(item => {
                charthan.push(value[item.codename]); //加入集合
                if (item.name == "时间") {
                    if (TimeType == "Hour") {
                        chartTM.push((dayjs(value[item.codename]).format("HH"))); //加入时间集合
                    } else if (TimeType == "Day") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD"))); //加入时间集合
                    } else if (TimeType == "Mouth") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH:mm"))); //加入时间集合
                    }else if (TimeType == "Hours") {
                        chartTM.push((dayjs(value[item.codename]).format("MM-DD HH"))); //加入时间集合
                    }
                     else {
                        chartTM.push(value[item.codename]); //加入时间集合
                    }
                    // chartTM.push(value[item.codename]); //加入时间集合
                    //chartTM.push(IsSubDate(value[value1.codename], "MM-dd hh:mm", "4")); //加入时间集合
                } else if (item.name == "名称") {
                    chartTM.push(value[item.codename]);
                }
                else {
                    chartValue.push(value[item.codename]);
                    Drptotal += value[item.codename]
                }
            });
            m.push(charthan); //加入集合
        });
        if (data.length == 0) {
            chartTM = ['']
        }
        // var max_min = GetSort(chartValue);

        if (NameType == "true") {
            var rotate = 0
        } else {
            var rotate = 45
        }

        if (chartValue[0] === undefined) {
            var titleShow = true
            var Yoffset = '45%';
        } else if (Drptotal == 0) {
            var titleShow = true
            var Yoffset = '30%';
        } else {
            var titleShow = false
            var Yoffset = '30%';
        }
        var option = {
            title: {
                // 是否显示title
                show: titleShow,
                text: '无数据',
                x: 'center',
                y: Yoffset,
                textStyle: {
                    color: titleColor,
                    fontSize: 18,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    //type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 1,
                        opacity: 1
                    }
                },
                formatter: function (params) {
                    let res = params[0].axisValue + '<br/>';
                    params.forEach(function (item) {
                        res += item.marker + item.seriesName + ': ' + Number(item.value).toFixed(DecimalP) + '<br/>';
                    });
                    return res;
                }
            },
            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {
                        show: true, // 显示导出图片按钮
                        type: 'png', // 导出图片格式为 PNG
                        name: 'echart_image', // 导出图片文件名
                        pixelRatio: 2, // 图片清晰度，数值越大越清晰
                        // 设置图标颜色
                        iconStyle: {
                            normal: {
                                borderColor: toolboxColor, // 正常状态下边框颜色
                            },
                            emphasis: {
                                borderColor: axisLineColor, // 鼠标悬停时边框颜色
                            }
                        },
                        // 设置提示文字样式和位置
                        title: '导出图片',
                        textStyle: {
                            color: axisLabelColor, // 文字颜色
                            fontSize: 12 // 文字大小
                        },
                        // 调整提示文字位置
                        orient: 'vertical', // 垂直布局
                        itemGap: 10 // 图标与文字间距

                    }
                }
            },
            color: LineColor,
            legend: {
                data: chartName,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: legendColor,
                    fontSize: 14
                },
                selected: LineSelect,
                show: legendShow
            },
            grid: {
                left: 20,
                right: 20,
                bottom: 20,
                top: 40,
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: chartTM,
                    boundaryGap: false,
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        rotate: rotate,
                        fontSize: 14,
                        textStyle: {
                            color: axisLabelColor
                        },
                        formatter: function (value) {
                            if (NameType == "true" && TimeName != "时间") {
                                var name = value.split("").join("\n")
                                if (Number(name.length) > 7) {
                                    return name.slice(0, 5) + "\n...";
                                } else {
                                    return name;
                                }
                            } else {
                                return value
                            }
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    boundaryGap: ['5%', '5%'],
                }
            ],
            yAxis: [
                {
                    name: "水位",
                    nameTextStyle: {
                        padding: [0, 0, 0, -20]
                    },
                    type: 'value',
                    boundaryGap: false,
                    // splitNumeber:5,
                    scale: true, //是否自动计算最大最小值。
                    //min:max_min.min, //动态设置最大值最小值。
                    //max:max_min.max,
                    min: function (value) {
                        var jiange = (value.max - value.min).toFixed(2) * 100;
                        var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5);

                        if ((jiangenew - jiange - 1) == 0) {
                            jiangenew = jiangenew * 2;
                        }

                        if ((jiangenew - jiange) % 2 == 0) {
                            // return value.min - (jiangenew - jiange) / 20;
                            if ((jiangenew - jiange) < 5) {
                                return value.min - (jiangenew - jiange) / 20 - 0.5;
                            } else {
                                return value.min - (jiangenew - jiange) / 20;
                            }

                        } else {
                            if ((jiangenew - jiange) < 5) {
                                return value.min - (jiangenew - jiange) / 20 - 0.5;
                            } else {
                                return value.min - (jiangenew - jiange) / 20;
                            }
                        }
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
                            if ((jiangenew - jiange) < 5) {
                                return value.max + (jiangenew - jiange) / 30 + 0.5;
                            } else {
                                return value.max + (jiangenew - jiange) / 30;
                            }
                        } else {
                            if ((jiangenew - jiange) < 5) {
                                return value.max + (jiangenew - jiange + 1) / 30 + 0.5;
                            } else {
                                return value.max + (jiangenew - jiange + 1) / 30;
                            }
                        }
                    },
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(2);
                        },
                        textStyle: {
                            color: axisLabelColor
                        },
                        fontSize: 14,
                    },
                    splitLine: {
                        show: true,
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
                }                ,
                {
                    name: max_min_Name,
                    nameLocation: 'start',   
                    nameTextStyle: {
                        padding: [0, 0, 0, 0]
                    },
                    type: 'value',
                    max: function (value) {
                        // var jiange = (value.max - value.min).toFixed(2) * 100;
                        // var jiangenew = Number(Number((jiange - (jiange % 5)) / 5 + 1).toFixed(0) * 5);

                        // jiangenew = jiangenew + ((jiangenew / 100).toFixed(0) * 5)
                        // if ((jiangenew - jiange - 1) == 0) {
                        //     jiangenew = jiangenew * 2;
                        // }
                        // if (jiangenew < 5) jiangenew = 5;
                        var maxVal = value.max+8;
                        // if ((jiangenew - jiange) % 2 == 0) {
                        //     maxVal = value.max + (jiangenew - jiange) / 30;
                        // } else {
                        //     maxVal = value.max + (jiangenew - jiange + 1) / 30;
                        // }
                        // if (maxVal < 1) {
                        //     maxVal = 5;
                        // }
                        // else if (maxVal < 3) {
                        //     maxVal=10;
                        // }
                        return Number(maxVal).toFixed(DecimalP);
                    },
                    boundaryGap: false,
                    splitNumeber: 5,
                    axisTick: {
                        alignWithLabel: true,
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: axisLineColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: splitLineColor
                        }
                    },
                    splitArea: {     // 网格区域
                        show: false   // 是否显示，默认为false
                    },
                    //scale: true, //是否自动计算最大最小值。
                    min: 0,
                    axisLabel: {
                        formatter: function (v) {
                            return v.toFixed(DecimalP);
                        },
                        fontSize: 14,
                    },
                    inverse: true, 
                }
            ],
            series: function () {
                var serie = [];
                for (var j = 0; j < chartName.length; j++) {
                    if (chartName[j] == "时间" || chartName[j] == "名称") //调过时间字段
                    {
                        continue;
                    }
                    var chartValue = []; 	//声明过线value集合
                    for (var i = 0; i < m.length; i++) {
                        if (Number(m[i][j]) >= 0) {
                            chartValue.push(Number(m[i][j]).toFixed(DecimalP)); //循环价值
                        } else {
                            chartValue.push(null);
                        }
                    }
                    if (chartName[j]== "雨量") {
                        var jycolor=new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#0099FF'
                        }, {
                            offset: 1,
                            color: '#00FFFF'
                        }]);
                        var item = {
                            name: chartName[j],
                            type: 'bar',
                            data: chartValue,
                            barWidth: barWidthVal,
                            symbol: 'none',
                            // label: {
                            //     normal: {
                            //         show: labelShow,
                            //         position: 'top',
                            //         formatter: function (params) {
                            //             if (params.value == 0) {
                            //                 return "";
                            //             }
                            //             else{
                            //                 return params.value;
                            //             }

                            //         },
                            //         textStyle: {
                            //             color: labelColor, //color of value
                            //             fontSize: 14
                            //         }
                            //     }
                            // },
                            // 相邻柱状之间的空隙
                            // barGap: '0%',
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: jycolor,
                                    borderWidth: 0,
                                    barBorderRadius: [ 0, 0,15, 15],
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(105,123, 214, 0.7)'
                                }
                            },
                            smooth: true,
                            yAxisIndex:1,
                        }
                        serie.push(item);
                    }
                    else {
                        var item = {
                            name: chartName[j],
                            type: 'line',
                            // 光滑的折线
                            smooth: true,
                            connectNulls: true,
                            symbol: 'none',
                            data: chartValue,
                            itemStyle: {
                                color: "rgba(25,163,223,1)",
                                //borderColor: "#646ace",
                                //borderWidth: 1

                            },
                            markPoint: {
                                data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
                                // symbolSize: symbolSize,
                                label: {
                                    offset: [0, 0],
                                    textStyle: {
                                        color: "#ffffff",
                                        // fontSize: markSize,
                                    },
                                    formatter: function (e) {
                                        var value = Number(e.value).toFixed(2);
                                        return value;
                                    }
                                },
                            },
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
                        };
                        serie.push(item);
                    }
                };
                return serie;
            }()
        };
        // myChart.setOption(option);
        var tt = chartValue.filter(function (ex) {
            return ex != undefined && ex > 0;
        })
        return option;
    },
}
