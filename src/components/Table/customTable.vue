<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :style="{ flex: header.width ? '0 0 ' + header.width : '1' }" :key="header">{{ header.label }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- 判断 rows 长度 -->
      <template v-if="rows.length > 0">
        <tr v-for="(row, rowIndex) in rows" :key="row.id">
          <td v-for="(cell, cellIndex) in headers" :key="cellIndex"
            :style="{ color: '' + (SetNull(row.colorCss) == '' ? '' : row.colorCss) + '!important',flex: cell.width ? '0 0 ' + cell.width : '1' }">
            <!-- 如果单元格是图像URL，则显示图像 -->
            <span v-if="cell['name'] === 'imageUrls'">
              <img v-for="(url, index) in row.imageUrls" :key="index" :src="url" alt="Image" :style="{height:url.indexOf('bz_')>-1 ? '16px' : '12px',width:url.indexOf('bz_')>-1 ? '20px' : '22px'}" />
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
        <td :colspan="headers.length"
          style="text-align: center; color: var(--mtablecolor); font-size: 1.2rem;margin-top:16%;height:100%;">暂无数据</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { SetNull } from "@/api/ComUnit";
import { ref, onMounted } from "vue";
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
});

function isImageUrl(cell) {
  // 简单的检查，判断是否是图像URL
  return /\.(png|jpg|jpeg|gif|png|svg|img)$/i.test(cell);
}
onMounted(() => {
  isImageUrl();
});
</script>

<style scoped>
img {
  width: 22px;
  height: 12px;
  vertical-align: -6px;
}

table {
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}
tr {
  display: flex;
  width: 100%;
  flex-direction: row;
}
th, td {
  text-align: left;
  /* padding: 8px; */
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
.jcllTable tr td:nth-child(1),.jcllTable tr th:nth-child(1){
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 60px;
  min-width:auto !important;
}
.jcllTable tr td:nth-child(2),.jcllTable tr th:nth-child(2){
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width:170px !important;
}
</style>
