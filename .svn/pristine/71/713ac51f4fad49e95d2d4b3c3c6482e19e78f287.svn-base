<template>
    <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="tableYQ tableYQText" :border="0" :cellspacing="0"
        :cellpadding="0" @click="handleclick" />


    <!-- <div id="divEchartsData" class="echartsmaxmindata">
        超警时长：<span style="color:var(--wqdanzhansycmsh2color);font-size: 1.4rem;" id="SWwrz">0</span>&nbsp;小时
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        超保时长：<span style="color:var(--wqdanzhansycmsh2color);font-size: 1.4rem;" id="SWgrz">0</span>&nbsp;小时
    </div> -->
</template>
<script setup>
import Table from "@/components/Table/Table.vue";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, inject } from "vue";
import { groupBy, SetNull, sortObjectArray } from "@/api/ComUnit";
import { ElMessage } from "element-plus";
import api from "@/api/zonglan/index.js";

const datekey = ref(null);
const tableHeaders = ref([]);
const tableData = ref();
const titleName = inject("titleName")

const props = defineProps({
    emergencyList: {
        type: Array,
        default: () => []
    },
    closeLineDialog: Function  //这里的closeLineDialog对应父页面中的 **:closeLineDialog**
});

function Weacontent() {
    var data = props.emergencyList;
    tableHeaders.value = [
        { name: "num", label: "序号" },
        { name: "wqname", label: "圩区名称" },
        { name: "wq_zhen", label: "街镇" },
        { name: "maxUpz", label: "水位(m)" },
        { name: "wqgrz", label: "警戒水位(m)" },
        { name: "wqarea", label: "受淹面积(k㎡)" },
        { name: "swtm", label: "淹没时长(h)" },
        { name: "swwrz", label: "淹没水深(m)" },]

    var dataResult = [];
    for (var num = 0; num < data.length; num++) {
        var item = data[num];
        item["num"] = num + 1;
        if (SetNull(item.maxUpz) != "") {
            item["maxUpz"] = Number(item.maxUpz).toFixed(2);
        }
        if (SetNull(item.wqgrz) != "") {
            item["wqgrz"] = Number(item.wqgrz).toFixed(2);
        }
        var swwrz = 0;
        if (SetNull(item.maxUpz) != "" && SetNull(item.wqgrz) != "") {
            swwrz = Number(Number(item.maxUpz) - Number(item.wqgrz)).toFixed(2);
        }
        item["swwrz"] = swwrz;
        // 统计受淹时长
        let floodDuration = 0;
        const alertWaterLevel = item["wqgrz"]; // 警戒水位
        const tempResult = sortObjectArray(item.waterList, ["tm"], "asc");
        for (let i = 0; i < tempResult.length - 1; i++) {
            const currentItem = tempResult[i];
            const nextItem = tempResult[i + 1];
            if (SetNull(alertWaterLevel != "" && SetNull(currentItem.dwz) != "")) {
                if (Number(currentItem.dwz) > Number(alertWaterLevel)) {
                    const currentTime = dayjs(currentItem.tm);
                    const nextTime = dayjs(nextItem.tm);
                    const duration = nextTime.diff(currentTime, 'hour');
                    floodDuration += duration;
                }
            }
        }
        // 处理最后一个元素
        const lastItem = tempResult[tempResult.length - 1];
        if (SetNull(alertWaterLevel != "" && SetNull(lastItem.dwz) != "")) {
            if (Number(lastItem.dwz) > Number(alertWaterLevel)) {
                // 假设最后一个时间点到预报结束时间的间隔为 1 小时
                floodDuration += 1;
            }
        }
        item["swtm"] = floodDuration;
        dataResult.push(item);
        tableData.value = dataResult;
    }
    // let _index = 0;
    // tableData.value = data.filter(function (e) {
    //     _index = _index + 1;
    //     e.num = _index;
    //     return e;
    // });
    console.error(tableData.value)
}
function handleclick(evt) {
    const _rowindex = evt.target.className;
    const strJson = tableData.value[_rowindex];
    if (SetNull(strJson["lgtd"]) == "" && SetNull(strJson["lttd"]) == "") {
        ElMessage.error("缺少经纬度坐标");
    }
    else {
        //  请关闭弹框
        props.closeLineDialog();
        let _lgtd = Number(strJson["lgtd"]);
        let _lttd = Number(strJson["lttd"]);

    }
}
onMounted(() => {
    Weacontent();
});
</script>
<style scoped>
.tableYQ {
    flex-direction: column;
    height: 100%;
    position: relative;
    display: flex;
    width: 100%;
    /* table-layout: fixed; */
    margin-top: 0rem;
    margin: 0 auto;
    /* 表格里面显示省略号必须加fixed，td设置的宽度会失效，宽度限定写在th中*/
}

.tableYQ tbody {
    flex: 1;
    position: relative;
    overflow: auto;
}

.tableYQ tr {
    height: 38px;
    line-height: 38px;
    display: flex;
}

.tableYQ tr th {
    font-size: 0.8rem;
    color: var(--popupContentTitleColor);
    font-weight: bold;
    height: 2.1rem;
    text-align: center;
    flex: 1;
}

.tableYQ tr td {
    height: 1.6rem;
    font-size: 14px;
    text-align: center;
    flex: 1;
    color: var(--widgetcolor);
}

.tableYQ .trSelect {
    background: rgba(0, 255, 255, 0.5) !important;
}
</style>
  