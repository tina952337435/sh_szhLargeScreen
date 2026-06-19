<template>
  <div :id="id" :dir="dir" class="light lightGQ box">
    <div class="content" v-html="htmlContent"></div>
  </div>
  <div style="width: 2px;height:20px;"></div>
  <div class="after"></div>
</template>
<script setup>
import {  onMounted, ref } from "vue";
import $ from "jquery";
const className = ref("light");
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  dir: {
    type: String,
    required: true,
  },
  htmlContent: {
    type: String,
    required: true,
  },
});
onMounted(() => {
  setTimeout(function () {
    // $(".textarea").css({ backgroundImage: "linear-gradient(to left, #4cdef9, #4cdef96b)", borderRadius: "30px 0px 0px 0px" });
    $(".textNameGQ").css({ color: "#00ffff", fontSize: "18px" });
    $(".textValueGQ").css({
      margin: "5px 5px 0 5px;height:22px;", fontSize: "14px", color: "#fff", marginTop: "14px"
    });
    // if (props.id.includes("LL")) {
    //   $(".textValue").css({ background: "#0174B8" });
    //   $(".lightGQ").css({ bottom: "-80px" });
    // }
  }, 1);
});
</script>
<style lang="scss" scoped>
.light{
  background: none;
}
.lightGQ {
  width: auto;
  position: relative;
  bottom: -90px;
  right: 0px;
  // padding: 5px;
  color: #ffffff;
  text-transform: uppercase;
  transition: 0.5s;
  cursor: pointer;
  overflow: hidden;
  white-space: break-spaces;
  transform: translateY(-60px);
  box-shadow: 0px 5px 10px #888686;
  background: rgba(15, 33, 43, 0.8);
  border: 0px solid #ddd;
  text-align: left;
  line-height: 14px;
  font-size: 14px;
  pointer-events: none;
}

.content {
  padding: 10px;
  background: none;
}

.after {
  position: absolute;
  display: none;
  content: "";
  // width: 2px;
  left: 50%;
  margin-top: 5px;
  // background-color: #0009;
  border: 2px dashed #03e9f4;
  height: 60px;
  pointer-events: none;
  z-index: auto;
  transform: translateY(-60px);
}
</style>
