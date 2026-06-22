<template>
  <div :id="id" class="lightGQ box">
    <!-- <div class="face front"></div>
    <div class="face back"></div>
    <div class="face left"></div>
    <div class="face right"></div>
    <div class="face top"></div>
    <div class="face bottom"></div> -->
    <div class="content" v-html="htmlContent"></div>
  </div>
  <div class="after"></div>
</template>
<script setup>
import { defineProps, onMounted, ref } from "vue";
import $ from "jquery";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const props = defineProps({
  id: {
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
    $(".textarea").css({ backgroundImage: "linear-gradient(to left, #4cdef9, #4cdef96b)", borderRadius: "30px 0px 0px 0px" });
    $(".textName").css({ color: "#ffffff", fontSize: "18px", textShadow: "1px 1px 5px #002520d2" });
    // $(".textValue").css({ padding: "0px 8px", background: "#40FC00", textAlign: "center", borderRadius: "5px", lineHeight: "28px", fontSize: "16px", fontWeight: "bold", color: "#000" });
    // if (props.id.includes("LL")) {
    //   $(".textValue").css({ background: "#0174B8" });
    //   $(".lightGQ").css({ bottom: "-80px" });
    // }
  }, 1);
});
</script>
<style lang="scss" scoped>
.lightGQ {
  width: auto;
  position: relative;
  bottom: -70px;
  right: 0px;
  padding: 5px;
  // color: #03e9f4;
  color: #ffffff;
  // font-size: 24px;
  text-transform: uppercase;
  transition: 0.5s;
  // letter-spacing: 4px;
  cursor: pointer;
  overflow: hidden;
  white-space: break-spaces;
  text-align: left;
  transform: translateY(-60px);
  // background: url(/images/cockpit_tipright.png);
  border-radius: 50px 0px 50px 0px;
  border: 1px solid #38e1ff;
  background-color: #38e1ff4a;
  box-shadow: 0 0 10px 2px #29baf1;
  animation: slide-af7a2c87 2s;
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
