<template>
    <div class="topClass">
        <span style="margin-left: 20px">开始时间：</span>
        <input id="STIME" class="mini-datepicker" style="width:100px;" format="yyyy-MM-dd" 
            showTime="false" showOkButton="true" showClearButton="false" />
        <span style="margin-left: 20px">结束时间：</span>
        <input id="ETIME" class="mini-datepicker" style="width:100px;" format="yyyy-MM-dd" 
            showTime="false" showOkButton="true" showClearButton="false" />
        <el-button type="primary" @click="BtnSearch()" style="margin-left: 20px">查询</el-button>
    </div>
    <div style="height:450px; width: 100%; margin-top: 10px">
       <div class="content-table">
            <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="tableYQ" :border="0" :cellspacing="0"
                :cellpadding="0" />
        </div>
    </div>
</template>
<script setup>
import Table from "@/components/Table/Table.vue";
import apiWxxsq from "@/api/topHead/index.js";
import { SetNull, sortObjectArray } from "@/api/ComUnit.js";
import { Postcard } from "@element-plus/icons-vue";
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElButton, ElConfigProvider, ElSelect, ElOption, ElMessage } from "element-plus";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted, provide, inject } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const stime = ref("");
const etime = ref("");
const tableHeaders = ref([
    { name: "num", label: "序号",width:"8%" },
    { name: "title", label: "标题",width:"30%" },    
    { name: "signal_LEVEL", label: "等级",width:"15%" },
    { name: "start_TIME", label: "时间" ,width:"15%"},
    { name: "content", label: "内容" },
]);
const tableData = ref();
function Weacontent() {
    window.loadingShow();
    var strParam = {};
    strParam["startdate"] = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD") + " 00:00:00";
    strParam["enddate"] = dayjs(mini.get("ETIME").getFormValue()).format("YYYY-MM-DD") + " 23:59:59";
    apiWxxsq
      .getgetSJYJXYList(strParam)
      .then((res) => {        
        const strJson = res.data;
        tableData.value = strJson.filter(function(item,_index) { 
            item.num = _index+1;
            return true;
         });
        window.loadingHide();
    })
    .catch((err) => { });
}
function BtnSearch() {
    Weacontent();
}
onMounted(() => {
    mini.parse();
    stime.value = dayjs().add(-365, "day").format("YYYY-MM-DD");
    etime.value = dayjs().format("YYYY-MM-DD");
    // 尝试获取组件实例
    mini.get("STIME").setValue(dayjs(stime.value).format("YYYY-MM-DD HH:00"));
    mini.get("ETIME").setValue(dayjs(etime.value).format("YYYY-MM-DD HH:00"));
    Weacontent();
});
</script>
<style scoped>
.topClass {
    height: 45px;
    line-height: 40px;
    color: var(--widgetcolor);
}

.toptabTop {
    list-style: none;
    color: #00feff;
    border-color: #00feff;
    width: auto !important;
    left: 0px;
    bottom: 0px;
    top: 5px;
    padding: 0px;
    display: inline-block;
    vertical-align: -12px;
    list-style: none
}

.toptabToponlyli {
    float: left;
    height: 32px;
    width: 40px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    background-color: var(--portal);
    border: 1px solid var(--portal);
    color: var(--sel_wraplabelcolor);
}

.toptabTop li:first-child {
    border-radius: 5px 0 0 5px;
}

.toptabTop li:last-child {
    border-radius: 0 5px 5px 0;
}

.toptabToponlyliHover {
    background-color: var(--swDivSelectcolor);
    border: 1px solid var(--swDivSelectcolor);
    color: var(--sel_wraplabelcolorSel);
}

.datatime {
    width: 180px !important;
    height: 36px !important;
}

.content-echarts {
    display: block;
    width: 100%;
    height: 100%;
}

.content-table {
    /*display: none;*/
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

/* 自定义滚动条样式 */
.content-table::-webkit-scrollbar {
    width: 4px;
    /* 设置滚动条宽度 */
}

.content-table::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    background: var(--mtabletrcolor);
    z-index: 2;
}

.tableYQ {
    width: 100%;
    /* table-layout: fixed; */
    margin-top: 0rem;
    margin: 0 auto;
    /* 表格里面显示省略号必须加fixed，td设置的宽度会失效，宽度限定写在th中*/
}

.tableYQ tr th {
    background: var(--mtabletrcolor);
    color: var(--mtablecolor);
}

.tableYQ tr {
    height: 38px;
    line-height: 38px;
}

.tableYQ tr th {
    font-size: 0.8rem;
    font-weight: bold;
    height: 2.1rem;
    text-align: center;
}

.tableYQ tr td {
    height: 1.6rem;
    font-size: 14px;
    text-align: center;
}

.tableYQ tr td {
    color: var(--widgetcolor);
}

.tableYQ .trSelect {
    background: rgba(0, 255, 255, 0.5) !important;
}

.tableYQ tbody tr td {
    width: 15vh !important;
}

.tableYQ tbody tr td:nth-child(1) {
    width: 80px !important;
}

.tableYQ tbody tr td:nth-child(2) {
    width: 20vh !important;
}

.switch {
    position: fixed;
    height: 30px;
    width: 35px;
    padding: 2px 8px;
    cursor: pointer;
}

.switch img {
    width: 22px;
    height: 22px;
}

.handleon {
    background-size: 100% 100%;
    background: var(--popContentHeadbg);
}

:deep(.el-radio) {
    margin-right: 20px;
    --el-radio-input-bg-color: #d5141400;
    min-width: 50px;
}

:deep(.el-radio__label) {
    color: var(--widgetcolor);
}

:deep(.el-date-editor.el-input),
:deep(.el-date-editor.el-input__wrapper) {
    width: 160px;
}

:deep(.el-input__prefix-inner) {
    margin-left: -9px;
}

:deep(.el-input__suffix) {
    margin-right: -9px;
}

:deep(.el-input__wrapper) {
    background-color: #d5141400;
    box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
    ;
}

:deep(.el-input__inner) {
    color: var(--widgetcolor);
}

:deep(.el-button) {
    /* background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg); */
    color: #fff;
}

:deep(.el-checkbox__input.is-checked+.el-checkbox__label),
:deep(.el-radio__input.is-checked+.el-radio__label) {
    color: var(--swDivSelectcolor);
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner),
:deep(.el-radio__input.is-checked .el-radio__inner) {
    background-color: var(--swDivSelectcolor);
    border-color: var(--swDivSelectcolor)
}

.echartsmaxmindata {
    width: 100%;
    font-size: 16px;
    margin: 0 auto;
    border: 1.5px solid var(--popContentHeadbg);
    height: auto;
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
    color: var(--mtablecolor);
    text-align: center;
}
</style>
<style lang="scss">
/* 站点选择 */
.el-cascader-node {
    padding: 0 0px 0 10px;
    width: 118px;
    color: var(--widgetcolor);
}

.el-cascader-menu {
    min-width: 20px;
}

.el-cascader-menu:last-child .el-cascader-node {
    padding-right: 0px;
}


.el-cascader-node__prefix {
    left: 0px !important;
}

.el-cascader-node__label {
    padding: 0 4px;
}

.el-input {
    height: 29px;
}

.el-input__suffix {
    color: var(--popContentHeadbg);
}

.el-cascader__dropdown.el-popper,
.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
    background: none;
}

.el-cascader__dropdown.el-popper {
    box-shadow: var(--popContentHeadbg);
}

.el-popper.is-light,
.el-popper.is-light .el-popper__arrow:before {
    border: 1px solid var(--popContentHeadbg);
    background: var(--boxtitlebg);
}

.el-cascader:not(.is-disabled):hover .el-input__wrapper,
.el-input__wrapper {
    box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
    cursor: pointer;
}

// 站点选择 - el-select 适配
.el-select {
    height: 29px;
    width: 120px;

    .el-select__wrapper {
        min-height: 29px;
        height: 29px;
        background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;

        &:hover {
            box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
        }
    }

    &.is-hovering {
        .el-select__wrapper {
            box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
        }
    }

    .el-select__selection {
        line-height: 27px;
    }

    .el-select__placeholder {
        color: var(--widgetcolor);
    }

    .el-select__input {
        color: var(--widgetcolor);
    }
}

.el-select-dropdown {
    max-height: 300px;
    overflow-y: auto;

    .el-select-dropdown__item {
        padding: 0 10px;
        width: 118px;
        color: var(--widgetcolor);

        &.hover,
        &:hover {
            background: var(--popContentHeadbg);
        }

        &.is-selected {
            color: var(--widgetcolor) !important;
            background: var(--popContentHeadbg) !important;
        }
    }
}

.el-popper.is-light.el-select-dropdown {
    border: 1px solid var(--popContentHeadbg);
    background: var(--boxtitlebg);
}

// 时间选择框
.el-date-picker,
.el-picker-panel__footer {
    // width: 174px;
    background: none;
    color: var(--widgetcolor);
}

.el-date-picker .el-picker-panel__content {
    // width: 160px;
}

.el-date-picker__header,
.el-picker-panel__content {
    // margin: 6px;
}

.el-date-table td {
    padding: 0;
}

.el-date-picker table {
    width: none !important;
}

.el-date-picker__time-header {
    background: var(--boxtitlebg);
    // display: block;
}

.el-picker-panel__icon-btn {
    // padding: 0;
    color: var(--widgetcolor);
}

.el-input--small .el-input__inner,
.el-date-table th,
.el-date-picker__header-label,
.el-button.is-text,
.el-button.is-plain {
    color: var(--widgetcolor);
}

.el-cascader .el-input.is-focus .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
}

.el-cascader-node.in-active-path,
.el-cascader-node.is-selectable.in-checked-path,
.el-year-table td .cell:hover,
.el-date-picker__header-label:hover {
    color: var(--swDivSelectcolor);
}

.el-date-table th {
    border-bottom: 1px solid var(--popContentHeadbg);
}

.el-picker-panel__footer {
    border-top: 1px solid var(--popContentHeadbg);
}

.el-button.is-plain,
.el-button.is-text:not(.is-disabled):hover,
.el-scrollbar__thumb {
    background-color: var(--popContentHeadbg);
    border-color: var(--popContentHeadbg);
    color: #fff;
}

.el-date-picker__editor-wrap:nth-child(1) .el-input--small .el-input__wrapper {
    width: 90px;
}

.el-date-picker__editor-wrap {
    width: 50%;
}

.el-year-table td {
    padding: 0px;
}

.el-cascader-node.is-active .el-cascader-node__label,
.el-cascader-node.is-active {
    font-size: 1rem;
    color: var(--swDivSelectcolor);
}

.el-date-table td.current:not(.disabled) .el-date-table-cell__text,
.el-year-table td.current:not(.disabled) .cell {
    background-color: var(--swDivSelectcolor);
    border-color: var(--swDivSelectcolor);
    color: #fff;
}

.el-date-table td.today .el-date-table-cell__text,
.el-date-table td.available:hover {
    color: var(--swDivSelectcolor);
}

.el-year-table td .cell,
.el-month-table td .cell {
    color: #fff;
}
</style>