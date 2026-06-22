<template>
    <iframe id="yujing" src="/pdf/太湖水位周预报-2025年第49期1215.pdf" style="height:100%;width: 100%;"></iframe>
</template>
<script setup>
// ElConfigProvider：时间选择框汉化
import { ref, onMounted, inject } from "vue";
import $ from "jquery";
import { SetNull } from "@/api/ComUnit.js";


const typeValue = inject('typeValue');
const typeValuePDF = inject('typeValuePDF');


onMounted(() => {
    if (SetNull(typeValue) != "") {
        if (typeValue.value == "FT") {
            $("#yujing").attr('src', '/pdf/防台风应急预案.pdf');
        } else if (typeValue.value == "FX") {
            $("#yujing").attr('src', '/pdf/防汛防旱应急预案.pdf');
        }
    }
    if (SetNull(typeValuePDF) != "") {
        $("#yujing").attr('src', typeValuePDF.value);
    }
});
</script>
