<template>
    <div class="m-box">
        <!-- <div
        class="title display_flex justify-content_flex-start align-items_center leftTop-radius"
      >
        <span class="spanTitle"></span>
        <span>米市渡</span>
      </div> -->
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
            <div class="d1"></div>
            <div class="d2"></div>
            <p class="base-p" id="title2" @click="fangda()" style="width: 120px;">太湖水位</p>
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
        <TaihuSW />
    </ComZujian>
</template>
<script setup>
import ComZujian from "@/components/ComZujian.vue";
import Echarts from "@/components/MyEcharts/echartsLine.vue";
import api from "@/api/zonglan/index.js";
import ChartJs from "@/api/MyEcharts/ChartJs.js";
import { sortObjectArray } from "@/api/ComUnit.js";
import dayjs from "dayjs";
import $ from "jquery";

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
const stcdList = ref("1170181");
const onetitleName = ref("吴淞口");
const Drpswiper = ref("1170181");
const props = defineProps({
    stcd: {
        type: String,
        default: "",
    },
});
function qiehuan(stcd) {
    stcdList.value = stcd;
    Drpswiper.value = stcd;
    var stnm = "";
    if (stcd == "1170181") {
        stnm = "吴淞口";
    } else if (stcd == "2060881") {
        stnm = "黄浦公园";
    } else if (stcd == "1460281") {
        stnm = "米市渡";
    }
    onetitleName.value = stnm;

    Weacontent();
}
function Weacontent() {
    var nowTM = new Date();
    var strParam = {};
    strParam["stcd"] = stcdList.value;
    strParam["pathname"] = "Hour";
    strParam["stime"] = stime.value;
    strParam["datasource"] = "BX";
    strParam["etime"] = etime.value;
    // strParam["stime"] = dayjs(dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss"))
    //   .add(-3, "hour")
    //   .format("YYYY-MM-DD HH:mm:ss");
    // strParam["etime"] = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
    // api
    //   .stPptnWaterLine(strParam)
    //   .then((res) => {
    var swresult = [
        {
            "ymdhm": null,
            "dyrn": null,
            "dyrn2": null,
            "stcd": null,
            "mstm": null,
            "ptno": null,
            "rz": null,
            "z": null,
            "w": 59.62,
            "wsfa": null,
            "moditime": null,
            "tm": "2025-10-30",
            "rg": null,
            "upz": "3.45",
            "wrz": "3.80",
            "grz": "4.65",
            "dn": "3.28",
            "dn2": "3.33",
            "dn3": "3.24",
            "fh": "3.6",
            "ys": "3.3",
            "by": "3.1",
            "max": "4.11",
            "lypj": "8.9"
        },
        {
            "ymdhm": null,
            "dyrn": null,
            "dyrn2": null,
            "stcd": null,
            "mstm": null,
            "ptno": null,
            "rz": null,
            "z": null,
            "w": 59.85,
            "wsfa": null,
            "moditime": null,
            "tm": "2025-10-31",
            "rg": null,
            "upz": "3.46",
            "wrz": "3.80",
            "grz": "4.65",
            "dn": "3.28",
            "dn2": "3.33",
            "dn3": "3.23",
            "fh": "3.6",
            "ys": "3.3",
            "by": "2.9",
            "max": "4.1",
            "lypj": "0.1"
        },
        {
            "ymdhm": null,
            "dyrn": null,
            "dyrn2": null,
            "stcd": null,
            "mstm": null,
            "ptno": null,
            "rz": null,
            "z": null,
            "w": 59.62,
            "wsfa": null,
            "moditime": null,
            "tm": "2025-11-01",
            "rg": null,
            "upz": "3.45",
            "wrz": "3.80",
            "grz": "4.65",
            "dn": "3.28",
            "dn2": "3.33",
            "dn3": "3.23",
            "fh": "3.6",
            "ys": "3.3",
            "by": "2.9",
            "max": "4.09",
            "lypj": "0"
        },
        {
            "ymdhm": null,
            "dyrn": null,
            "dyrn2": null,
            "stcd": null,
            "mstm": null,
            "ptno": null,
            "rz": null,
            "z": null,
            "w": 59.62,
            "wsfa": null,
            "moditime": null,
            "tm": "2025-11-02",
            "rg": null,
            "upz": "3.45",
            "wrz": "3.80",
            "grz": "4.65",
            "dn": "3.27",
            "dn2": "3.32",
            "dn3": "3.22",
            "fh": "3.6",
            "ys": "3.3",
            "by": "2.9",
            "max": "4.06",
            "lypj": "0"
        },
        {
            "ymdhm": null,
            "dyrn": null,
            "dyrn2": null,
            "stcd": null,
            "mstm": null,
            "ptno": null,
            "rz": null,
            "z": null,
            "w": 59.62,
            "wsfa": null,
            "moditime": null,
            "tm": "2025-11-03",
            "rg": null,
            "upz": "3.45",
            "wrz": "3.80",
            "grz": "4.65",
            "dn": "3.26",
            "dn2": "3.31",
            "dn3": "3.22",
            "fh": "3.59",
            "ys": "3.29",
            "by": "2.9",
            "max": "4.03",
            "lypj": "0"
        },
        {
            "ymdhm": null,
            "dyrn": null,
            "dyrn2": null,
            "stcd": null,
            "mstm": null,
            "ptno": null,
            "rz": null,
            "z": null,
            "w": 59.38,
            "wsfa": null,
            "moditime": null,
            "tm": "2025-11-04",
            "rg": null,
            "upz": "3.44",
            "wrz": "3.80",
            "grz": "4.65",
            "dn": "3.25",
            "dn2": "3.3",
            "dn3": "3.21",
            "fh": "3.59",
            "ys": "3.29",
            "by": "2.9",
            "max": "4.01",
            "lypj": "0"
        },
        {
            "ymdhm": null,
            "dyrn": null,
            "dyrn2": null,
            "stcd": null,
            "mstm": null,
            "ptno": null,
            "rz": null,
            "z": null,
            "w": 59.15,
            "wsfa": null,
            "moditime": null,
            "tm": "2025-11-05",
            "rg": null,
            "upz": "3.43",
            "wrz": "3.80",
            "grz": "4.65",
            "dn": "3.25",
            "dn2": "3.29",
            "dn3": "3.2",
            "fh": "3.58",
            "ys": "3.29",
            "by": "2.9",
            "max": "3.97",
            "lypj": "0.1"
        },
        {
            "ymdhm": null,
            "dyrn": null,
            "dyrn2": null,
            "stcd": null,
            "mstm": null,
            "ptno": null,
            "rz": null,
            "z": null,
            "w": 59.38,
            "wsfa": null,
            "moditime": null,
            "tm": "2025-11-06",
            "rg": null,
            "upz": "3.44",
            "wrz": "3.80",
            "grz": "4.65",
            "dn": "3.24",
            "dn2": "3.29",
            "dn3": "3.2",
            "fh": "3.58",
            "ys": "3.28",
            "by": "2.9",
            "max": "3.94",
            "lypj": "14.8"
        },
        {
            "ymdhm": null,
            "dyrn": null,
            "dyrn2": null,
            "stcd": null,
            "mstm": null,
            "ptno": null,
            "rz": null,
            "z": null,
            "w": 59.62,
            "wsfa": null,
            "moditime": null,
            "tm": "2025-11-07",
            "rg": null,
            "upz": "3.45",
            "wrz": "3.80",
            "grz": "4.65",
            "dn": "3.24",
            "dn2": "3.28",
            "dn3": "3.2",
            "fh": "3.57",
            "ys": "3.28",
            "by": "2.9",
            "max": "3.92",
            "lypj": null
        }
    ]
    if (swresult.length > 0) {
        for (var num = 0; num < swresult.length; num++) {
            if (swresult[num].tm < "2025-11-05") {
                swresult[num].ssupz = swresult[num].upz;
                swresult[num].ybupz = "-";
            } else if (swresult[num].tm == "2025-11-05") {
                swresult[num].ssupz =swresult[num].upz;
                swresult[num].ybupz = swresult[num].upz;
            }else {
                swresult[num].ssupz = "-";
                swresult[num].ybupz = swresult[num].upz;
            }
        }
    }
    const strJson = sortObjectArray(swresult, ["tm"], "desc").reverse();
    // if (strJson.length > 0) {
    const strNote = [];
    strNote.push({ name: "时间", codename: "tm", tableV: "0", isShow: true });
    strNote.push({ name: "实时", codename: "ssupz", tableV: "0", isShow: true });
    strNote.push({ name: "预报", codename: "ybupz", tableV: "0", isShow: true });
    strNote.push({ name: "警戒", codename: "wrz", tableV: "0", isShow: false });
    strNote.push({ name: "保证", codename: "grz", tableV: "0", isShow: false });
    var LineColor = ["#16FF8D", "#1CB8B2", "#01DDFF", "#F9C823", "#0264FD", "#FE7923", "#8E30FF",];
    const _Option = ChartJs.chartSW(
        "",
        strJson,
        strNote,
        LineColor,
        "水位",
        "Day",
        _theme, 55, 14
    );

    lineOption.value = _Option;
    datekey.value = Date.now();
    // }
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
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
    // stime.value = "2024-08-07 00:00:00";
    // etime.value = "2024-08-08 23:59:59";

    Weacontent();
});
</script>