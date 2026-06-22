<template>
  <div class="chart-container">
    <!-- 调试用：如果这个字看不见，说明容器根本没渲染 -->
    <div v-if="!isLoaded" class="loading-tip">正在初始化 3D 引擎...</div>
    
    <!-- 关键修改：直接在内联样式中强制定义宽高 -->
    <div 
      ref="chartRef" 
      style="width: 100%; height: 600px; display: block;" 
      class="rainfall-3d-chart"
    ></div>
    
    <!-- 调试用：显示状态 -->
    <div v-if="debugMsg" class="debug-msg">{{ debugMsg }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
// 确保这里引入了 echarts-gl
import 'echarts-gl';

const chartRef = ref(null);
let myChart = null;
const isLoaded = ref(false);
const debugMsg = ref('');

// --- 数据 ---
const rawData = [
  [121.47, 31.23, 50], [121.50, 31.24, 80], [121.38, 31.22, 120],
  [121.25, 31.35, 160], [121.15, 31.40, 40], [121.60, 31.15, 90]
];

const getNeonColor = (value) => {
  if (value < 60) return '#00f3ff';
  if (value < 100) return '#00ff88';
  if (value < 140) return '#ffaa00';
  return '#ff0055';
};

// --- 简易地图数据 (上海范围) ---
const shanghaiGeoJson = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": { "name": "SH" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [120.85, 30.85], [121.05, 30.82], [121.30, 30.85], [121.60, 30.90],
        [121.85, 31.00], [122.10, 31.15], [122.15, 31.35], [122.05, 31.55],
        [121.85, 31.65], [121.55, 31.70], [121.25, 31.65], [121.00, 31.55],
        [120.85, 31.35], [120.80, 31.10], [120.85, 30.85]
      ]]
    }
  }]
};

const initChart = () => {
  debugMsg.value = '1. 开始获取 DOM...';
  
  // 1. 强力检查 DOM
  const dom = chartRef.value;
  if (!dom) {
    debugMsg.value = '❌ 错误：DOM 元素为 null! 检查 ref 绑定';
    console.error('❌ DOM is null');
    return;
  }
  
  // 2. 检查 DOM 尺寸 (关键！)
  const width = dom.clientWidth;
  const height = dom.clientHeight;
  debugMsg.value = `2. DOM 尺寸：${width}x${height}`;
  console.log(`DOM Size: ${width}x${height}`);
  
  if (width === 0 || height === 0) {
    debugMsg.value = '⚠️ 警告：DOM 尺寸为 0! 图表无法渲染。请检查父容器高度。';
    // 即使尺寸为 0，我们也尝试初始化，看看会不会报错
  }

  // 3. 清理旧实例
  if (myChart) myChart.dispose();

  // 4. 初始化
  debugMsg.value = '3. 初始化 ECharts...';
  try {
    myChart = echarts.init(dom, 'dark', { renderer: 'webgl' }); // 强制指定 webgl 渲染器
    console.log('✅ ECharts 实例创建成功', myChart);
  } catch (e) {
    debugMsg.value = `❌ 初始化失败：${e.message}`;
    console.error(e);
    return;
  }

  // 5. 注册地图
  echarts.registerMap('SH_SIMPLE', shanghaiGeoJson);
  
  const seriesData = rawData.map(item => ({
    name: '站点',
    value: [...item]
  }));

  // 6. 极简配置 (先跑通，再美化)
  const option = {
    backgroundColor: '#000000', // 纯黑背景，方便对比
    geo3D: {
      map: 'SH_SIMPLE',
      height: 0,
      itemStyle: {
        areaColor: '#333',
        borderColor: '#00f3ff',
        borderWidth: 1
      },
      viewControl: {
        autoRotate: true,
        distance: 100,
        alpha: 50,
        beta: 0
      },
      light: {
        main: { intensity: 1 },
        ambient: { intensity: 0.5 }
      }
      // ⚠️ 暂时关闭 postEffect，排除它导致黑屏的可能
    },
    series: [{
      type: 'bar3D',
      coordinateSystem: 'geo3D',
      data: seriesData,
      barSize: 5,
      shading: 'lambert',
      itemStyle: {
        color: (p) => getNeonColor(p.value[2])
      },
      label: { show: true, formatter: '{c}' }
    }]
  };

  debugMsg.value = '4. 设置 Option...';
  myChart.setOption(option);
  
  debugMsg.value = '✅ 渲染完成！如果还是黑的，请检查浏览器控制台 WebGL 报错';
  isLoaded.value = true;
  
  // 再次强制 resize，防止尺寸计算滞后
  setTimeout(() => {
    myChart.resize();
    console.log('Force Resize executed');
  }, 100);
};

onMounted(() => {
  // 双重保险：nextTick 和 setTimeout
  import('vue').then(({ nextTick }) => {
    nextTick(() => {
      setTimeout(initChart, 200);
    });
  });
  
  window.addEventListener('resize', () => myChart?.resize());
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => myChart?.resize());
  myChart?.dispose();
});
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  /* 关键：给容器一个最小高度，防止塌陷 */
  min-height: 600px; 
  background-color: #050505;
  border: 1px solid #333;
}

.loading-tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00f3ff;
  font-family: monospace;
  z-index: 10;
}

.debug-msg {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #ff0055;
  background: rgba(0,0,0,0.8);
  padding: 5px 10px;
  font-family: monospace;
  font-size: 12px;
  z-index: 20;
  pointer-events: none;
}

.rainfall-3d-chart {
  /* 不再依赖这里的 height，由内联样式控制 */
  display: block;
}
</style>