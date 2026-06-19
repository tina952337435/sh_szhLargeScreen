<template>
  <table :class="tableClass">
    <thead>
      <!-- 支持多层表头 -->
      <template v-for="(row, rowIndex) in headerRows" :key="rowIndex">
        <tr>
          <th v-for="(header, colIndex) in row" :key="colIndex" :colspan="header.colspan || 1"
            :rowspan="header.rowspan || 1" :style="getHeaderStyle(header)">
            {{ header.label }}
          </th>
        </tr>
      </template>
    </thead>
    <tbody>
      <!-- 判断 rows 长度 -->
      <template v-if="rows.length > 0">
        <tr v-for="(row, rowIndex) in rows" :key="row.id || rowIndex">
          <td v-for="(cell, cellIndex) in flatHeaders" :key="cellIndex"
            :style="{ color: '' + (SetNull(row.colorCss) == '' ? '' : row.colorCss) + '!important' }">
            <!-- 如果单元格是图像URL，则显示图像 -->
            <span v-if="cell['name'] === 'imageUrls'">
              <img v-for="(url, index) in row.imageUrls" :key="index" :src="url" alt="Image" />
            </span>
            <!-- 如果值为 NaN，则显示 - -->
            <span v-else-if="row[cell.name] === 'NaN'" title="-">-</span>
            <!-- 显示普通文本 -->
            <span v-else :style="'' + (SetNull(row.colorCss) == '' ? JSON.stringify(rowIndex) : row.colorCss) + ''"
              :title="row[cell['name']]">{{ row[cell["name"]] }}</span>
          </td>
        </tr>
      </template>
      <!-- rows 为空时显示提示 -->
      <tr v-else>
        <td :colspan="flatHeaders.length"
          style="text-align: center; color: var(--mtablecolor); font-size: 1.2rem;margin-top:16%;height:100%;">暂无数据</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { SetNull } from "@/api/ComUnit";
import { ref, computed, onMounted } from "vue";
const tableWidth = ref(0);
const tableHeight = ref(300); // 假设表格高度是300px
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  tableClass: {
    type: String,
    default: '',
  },
  // 支持直接传递表头样式
  headerStyle: {
    type: Object,
    default: () => ({})
  },
  // 是否自动合并相同的表头
  autoMergeSameHeaders: {
    type: Boolean,
    default: true
  }
});

// 计算表头行数
const headerRows = computed(() => {
  // 如果headers不是二维数组，则将其包装成二维数组
  if (props.headers && props.headers.length > 0 && !Array.isArray(props.headers[0])) {
    // 检查是否有嵌套的children属性，支持多层表头
    if (props.headers.some(h => h.children)) {
      return generateMultiLevelHeaders(props.headers);
    }
    return [props.headers];
  }
  return props.headers || [];
});

// 生成多层表头结构
function generateMultiLevelHeaders(headers) {
  const rows = [];
  let maxLevel = 1;

  // 计算最大层级
  function findMaxLevel(headers, level = 1) {
    maxLevel = Math.max(maxLevel, level);
    headers.forEach(h => {
      if (h.children && h.children.length > 0) {
        findMaxLevel(h.children, level + 1);
      }
    });
  }

  // 创建表头矩阵
  function createHeaderMatrix(headers, rows, rowIndex = 0, colIndex = 0) {
    let currentColIndex = colIndex;

    headers.forEach(header => {
      if (!rows[rowIndex]) rows[rowIndex] = [];

      // 初始化当前单元格
      rows[rowIndex][currentColIndex] = {
        ...header,
        colspan: header.children && header.children.length > 0 ? header.children.length : 1,
        rowspan: header.children && header.children.length > 0 ? 1 : maxLevel - rowIndex
      };

      // 处理子表头
      if (header.children && header.children.length > 0) {
        createHeaderMatrix(header.children, rows, rowIndex + 1, currentColIndex);
      }

      currentColIndex += rows[rowIndex][currentColIndex].colspan;
    });
  }

  findMaxLevel(headers);
  createHeaderMatrix(headers, rows);

  // 自动合并相同的表头
  if (props.autoMergeSameHeaders) {
    mergeSameHeaders(rows);
  }

  return rows;
}

// 合并相同的表头
function mergeSameHeaders(rows) {
  // 从最顶层表头开始处理
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    if (!row) continue;

    let currentCol = 0;
    while (currentCol < row.length) {
      const currentHeader = row[currentCol];
      if (!currentHeader) {
        currentCol++;
        continue;
      }

      // 查找连续相同的表头
      let mergeCount = 1;
      for (let nextCol = currentCol + 1; nextCol < row.length; nextCol++) {
        const nextHeader = row[nextCol];
        // 检查是否可以合并（相同标签且没有子表头或子表头结构相同）
        if (nextHeader && canMergeHeaders(currentHeader, nextHeader, rows, rowIndex, currentCol, nextCol)) {
          mergeCount++;
          // 标记为null，表示已合并
          row[nextCol] = null;
        } else {
          break;
        }
      }

      // 如果找到可合并的表头，更新colspan
      if (mergeCount > 1) {
        currentHeader.colspan = mergeCount;
        // 更新下层表头的rowspan，确保下层表头不与合并的表头冲突
        updateChildRowspan(rows, rowIndex, currentCol, mergeCount);
      }

      currentCol += mergeCount;
    }

    // 清理null值
    rows[rowIndex] = row.filter(h => h !== null);
  }
}

// 检查两个表头是否可以合并
function canMergeHeaders(header1, header2, rows, rowIndex, col1, col2) {
  // 标签必须相同
  if (header1.label !== header2.label) return false;

  // 如果没有下一行，或者当前是最后一行，则可以合并
  if (rowIndex >= rows.length - 1) return true;

  // 如果有下一行，需要检查下层表头是否也可以合并
  const nextRow = rows[rowIndex + 1];
  if (!nextRow) return true;

  // 检查下层对应的表头是否存在且结构相同
  // 这里简化处理，只检查是否都有或都没有子表头
  const hasChild1 = header1.children && header1.children.length > 0;
  const hasChild2 = header2.children && header2.children.length > 0;

  return hasChild1 === hasChild2;
}

// 更新合并表头后的子表头rowspan
function updateChildRowspan(rows, rowIndex, colIndex, mergeCount) {
  // 如果没有下一行，则不需要更新
  if (rowIndex >= rows.length - 1) return;

  const nextRow = rows[rowIndex + 1];
  if (!nextRow) return;

  // 对于合并的列，确保下一行对应的单元格只有一个有内容（通常是第一个）
  for (let i = 1; i < mergeCount; i++) {
    const targetCol = colIndex + i;
    if (targetCol < nextRow.length && nextRow[targetCol]) {
      nextRow[targetCol] = null;
    }
  }
}

// 获取扁平化的表头（用于数据行渲染）
const flatHeaders = computed(() => {
  // 如果是单层表头，直接返回
  if (props.headers && props.headers.length > 0 && !Array.isArray(props.headers[0])) {
    // 查找所有没有children的表头或最底层的children
    const result = [];
    function findLeafHeaders(headers) {
      headers.forEach(header => {
        if (header.children && header.children.length > 0) {
          findLeafHeaders(header.children);
        } else if (header.name) { // 确保有name属性的才作为数据列
          result.push(header);
        }
      });
    }

    // 如果有children属性，递归查找叶子节点
    if (props.headers.some(h => h.children)) {
      findLeafHeaders(props.headers);
      return result.length > 0 ? result : props.headers.filter(h => h.name);
    }

    return props.headers;
  }

  // 对于二维数组的表头，返回最后一行
  if (Array.isArray(props.headers) && props.headers.length > 0) {
    return props.headers[props.headers.length - 1] || [];
  }

  return [];
});

// 获取表头样式
function getHeaderStyle(header) {
  return { ...props.headerStyle, ...(header.style || {}) };
}

function isImageUrl(cell) {
  // 简单的检查，判断是否是图像URL
  return /\.(png|jpg|jpeg|gif|png|svg|img)$/i.test(cell);
}

onMounted(() => {
  // 初始化逻辑
});
</script>

<style scoped>
img {
  width: 20px;
  height: 20px;
  vertical-align: -6px;
}

table {
  flex-direction: column;
  height: 100%;
  position: relative;
  display: flex;
}

tbody {
  flex: 1;
  position: relative;
  overflow: auto;
}


/* 自定义滚动条样式 */
tbody::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

tbody::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

tbody::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: 0px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.tableYQ {
  flex-direction: column;
  height: 100%;
  position: relative;
  display: flex;
  width: 98%;
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
  font-size: 14px;
  text-align: center;
  flex: 1;
  color: var(--widgetcolor);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 为tableYQ类的表格第一行设置字体颜色 */
.tableYQSJ tr:first-child td span {
  font-weight: bold;
}

/* .tablesqsj tr th:nth-child(1),
.tablesqsj tr td:nth-child(1) {
  min-width: 150px;
} */

.tableYQ .trSelect {
  background: rgba(0, 255, 255, 0.5) !important;
}

.FirstTable th:nth-child(1),
.FirstTable td:nth-child(1) {
  min-width: 100px;
}

.wqgq-table tr,
.riverGC-table tr {
  height: 50px;
  line-height: 50px;
}

.wqgq-table tr th,
.wqgq-table tr td,
.riverGC-table tr th,
.riverGC-table tr td {
  font-size: 1rem;
}

.CLQTable tr td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wqgq-table tr td:nth-child(2) {
  text-decoration: underline;
}

.tableYJSL tr th:nth-child(3),
.tableYJSL tr td:nth-child(3) {
  min-width: 170px;
}

.tableGQJC tr td:nth-child(1) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}

.tableGQJC tr td:nth-child(3) {
  max-width: 100px;
}

.m-table-small tr {
  height: 30px;
  line-height: 30px;
}
</style>
