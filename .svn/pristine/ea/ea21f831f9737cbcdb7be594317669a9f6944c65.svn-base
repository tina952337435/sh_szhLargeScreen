<template>
  <div class="zhong box-siz display_flex justify-content_flex-start align-items_center">
    <div id="m_shik"  class="item wow slideInUp link-item z-crt" data-wow-delay="0s" @click="changeTab('m_shik')">
      <div class="iconleft">
        <img src="/images/imgZhuandong.png" class="link-bg" />
        <el-icon :size="size" :color="color">
          <house />
        </el-icon>
      </div>
      <div class="nameright">实况</div>
    </div>
    <div id="m_yubao" class="item wow slideInUp link-item" data-wow-delay="0s" @click="changeTab('m_yubao')"
      :class="tabName == 'm_yubao' && 'z-crtitem z-crt wow slideInUp link-item'">
      <div class="iconleft">
        <img src="/images/imgZhuandong.png" class="link-bg" />
        <el-icon :size="size" :color="color">
          <Orange />
        </el-icon>
      </div>
      <div class="nameright">预测</div>
    </div>
    <div id="m_yujing" class="item wow slideInUp link-item" data-wow-delay="0s" @click="changeTab('m_yujing')"
      :class="tabName == 'm_yujing' && 'z-crtitem z-crt wow slideInUp link-item'">
      <div class="iconleft">
        <img src="/images/imgZhuandong.png" class="link-bg" />
        <el-icon :size="size" :color="color">
          <Warning />
        </el-icon>
      </div>
      <div class="nameright">预警</div>
    </div>
    <div id="m_yuyan" class="item wow slideInUp link-item" data-wow-delay="0s" @click="changeTab('m_yuyan')"
      :class="tabName == 'm_yuyan' && 'z-crtitem z-crt wow slideInUp link-item'">
      <div class="iconleft">
        <img src="/images/imgZhuandong.png" class="link-bg" />
        <el-icon :size="size" :color="color">
          <DataAnalysis />
        </el-icon>
      </div>
      <div class="nameright">预演</div>
    </div>
    <!-- <div id="m_shikPG" class="item wow slideInUp link-item" data-wow-delay="0s" @click="changeTab('m_shikPG')"
      :class="tabName == 'm_shikPG' && 'z-crtitem z-crt wow slideInUp link-item'">
      <div class="iconleft">
        <img src="/images/imgZhuandong.png" class="link-bg" />
        <el-icon :size="size" :color="color">
          <monitor />
        </el-icon>
      </div>
      <div class="nameright">评估</div>
    </div> -->
    <div id="m_shikZT" class="item wow slideInUp link-item" data-wow-delay="0s" @click="changeTab('m_shikZT')"
      :class="tabName == 'm_shikZT' && 'z-crtitem z-crt wow slideInUp link-item'">
      <div class="iconleft">
        <img src="/images/imgZhuandong.png" class="link-bg" />
        <el-icon :size="size" :color="color">
          <Sunset />
        </el-icon>
      </div>
      <div class="nameright">专题</div>
    </div>
  </div>
</template>
<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from "vue";
import { Pouring, House, Orange, Sunset, Monitor,Warning,DataAnalysis } from "@element-plus/icons-vue";
import { format } from "date-fns";
import apiWxxsq from "@/api/topHead/index.js";
import { useRouter } from "vue-router";
import $ from "jquery";
const tabName = ref({});
const Yubao = ref(false);
const YubaoImg = ref();
const YubaoTitle = ref();
const QXWater = ref();
const router = useRouter();
const ToggleShowHide = inject("ToggleShowHide");

//设置icon的大小和颜色
defineProps({
  size: {
    type: String,
    default: "16px",
  },
  color: {
    type: String,
    default: "#fff",
  },
});

function changeTab(m) {
  $(".shdswDiv .swDiv").removeClass("swDivSelect");
  $(".slideInUp").removeClass("z-crt");
  localStorage.setItem("tabName", m);
  // 使用ref获取子组件实例，并访问其数据
  if (m == "m_shik") {
    $("#m_shik").addClass("z-crt");
    ToggleShowHide(false);
    router.push({ path: "/zonglan" });
  }
  else if (m == "m_yubao") {
    ToggleShowHide(false);
    $("#m_yubao").addClass("z-crt");
    router.push({ path: "/yubao" });
  } 
  else if (m == "m_yuyan") {
    ToggleShowHide(false);
    $("#m_yuyan").addClass("z-crt");
    router.push({ path: "/yuyan" });
  } 
  else if (m == "m_shikZT") {
    ToggleShowHide(false);
    $("#m_shikZT").addClass("z-crt");
    router.push({ path: "/shuzidatingTFZT" });
  }
  else if(m=="m_shikSL"){
    ToggleShowHide(false);
    $("#m_shikSL").addClass("z-crt");
    router.push({ path: "/shuzidatingGQ" });    
  }
  else if(m=="m_shikPG"){
    ToggleShowHide(false);
    $("#m_shikPG").addClass("z-crt");
    router.push({ path: "/pinggu" });    
  }
  else if(m=="m_yujing"){
    ToggleShowHide(false);
    $("#m_yujing").addClass("z-crt");
    router.push({ path: "/yubaoyujing" });    
  }
  tabName.value = m;
}
// 临测鼠标移入事件：气象、水文
function handleMouseEnter() {
  Yubao.value = true;
  if (Yubao.value === true) {
    YubaoImg.value.style.display = "none";
    YubaoTitle.value.style.display = "none";
    QXWater.value.style.display = "block";
  }
}
// 临测鼠标移出事件
function handleMouseLeave() {
  Yubao.value = false;
  if (Yubao.value === false) {
    QXWater.value.style.display = "none";
    YubaoImg.value.style.display = "";
    YubaoTitle.value.style.display = "block";
  }
}
onMounted(() => {
  changeTab(window.location.pathname)
})
// 用于在 <script setup> 语法下显式暴露组件的公共属性和方法，处理子组件时，允许父组件访问子组件的特定属性或方法
defineExpose({ tabName });
</script>
<style scoped>
.justify-content_flex-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.display_flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  z-index: 2;
}

.iconleft,
.link-item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.iconleft {
  width: 3.5vh;
  height: 3.5vh;
}

.link-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-animation: turn 3s linear infinite;
  animation: turn 3s linear infinite;
}

.link-bg-none {
  position: absolute;
  width: 100%;
  height: 100%;
}

.link-item-img {
  position: relative;
  /*width: 60%;
    height: 60%;*/
  z-index: 1;
  padding-top: 0px;
  padding-top: 2px;
  padding-left: 1px;
}

.nameright {
  /*width: 2.2rem;
    font-size: 1rem;
    font-weight: 800;*/
  margin-left: 0.3rem;
  /*text-align: center;
    line-height: 1.2;
    white-space: pre-line;*/
}

@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1turn);
  }
}
</style>
