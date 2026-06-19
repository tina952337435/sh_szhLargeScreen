<template >
    <div :id="id" :style="{ width: width, height: height }">
    </div>
</template>
<script setup>
import * as echarts from 'echarts'
import * as echartsliquidfill from 'echarts-liquidfill'
import { onMounted ,watch } from 'vue'
const props = defineProps({
    id: {
        type: String,
        default: 'myChart'
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '100%'
    },
    option: {
        type: Object,
        default: () => { }
    }
})
let myChart = null;
watch(props.option, () => {
    drawEcharts();
})
onMounted(() => {
    drawEcharts();
});
function drawEcharts() {
    myChart = echarts.init(document.getElementById(props.id));
    let option = props.option;
    option && myChart.setOption(option);
     // 监听窗口大小变化，自动调整图表大小
     window.addEventListener('resize', () => myChart.resize());
}

</script>
<style></style>
