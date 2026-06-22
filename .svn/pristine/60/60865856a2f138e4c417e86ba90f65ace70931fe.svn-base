<template>
  <div :id="id" :class="className">
    <div class="content" v-html="htmlContent"></div>
  </div>
</template>
<script setup>
import {  onMounted, ref } from "vue";
import $ from "jquery";// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const className = ref("light");
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  typeid: {
    type: String,
    required: false,
  },
  dir: {
    type: String,
    required: false,
  },
  htmlContent: {
    type: String,
    required: true,
  },
});
onMounted(() => {
  setTimeout(function () {
    if (props.typeid.includes("YQ")) {
      $(".light").css({ bottom: "-90px" });
    }
    else if (props.typeid.includes("LL")) {
      className.value = "light lightLL"
      if (props.dir == "top") {
        $("#" + props.id).css({ bottom: "-90px" });
      }
      else if (props.dir == "bottom") {
        $("#" + props.id).css({ bottom: "-70px" });
      }
      else if (props.dir == "left") {
        $("#" + props.id).css({ bottom: "-100px" });
      }
      else if (props.dir == "right") {
        $("#" + props.id).css({ bottom: "-100px" });
      }
      else if (props.dir == "top_left" || props.dir == "top_right") {
        $("#" + props.id).css({ bottom: "-130px" });
      }
      else if (props.dir == "bottom_left" || props.dir == "bottom_right") {
        $("#" + props.id).css({ bottom: "-170px" });
      }
    } else if (props.typeid.includes("SL")) {
      $(".light").css({ bottom: "-90px" });
      className.value = "light lightSL"
    } else if (props.typeid.includes("SZ")) {
      $(".light").css({ bottom: "-85px" });
    } else if (props.typeid.includes("Xialijiao")) {
      $(".light").css({ bottom: "-90px" });
      className.value = "light lightXialijiao"
    } else if (props.typeid.includes("Jishuidian")) {
      $(".light").css({ bottom: "-90px" });
      className.value = "light lightJishuidian"
    } else if (props.typeid.includes("DayYanghu")) {
      $(".light").css({ bottom: "-90px" });
      className.value = "light lightDayYanghu"
    } else if (props.typeid.includes("Guanwang")) {
      $(".light").css({ bottom: "-90px" });
      className.value = "light lightGuanwang"
    } else if (props.typeid.includes("SP")) {
      $(".light").css({ bottom: "-90px" });
    } else if (props.typeid.includes("Car")) {
      $(".light").css({ bottom: "-90px" });
    }else if (props.typeid.includes("WSJ")) {
      $(".light").css({ bottom: "-20px" });
      className.value = "light light"
    }


    if (_theme == "BlueTheme") {
      $(".content").css({ background: "#3284f2d6" });
      $(".textNameLL").css({ color: "#ffffff", fontSize: "18px" });
    } else if (_theme == "default") {
      $(".content").css({ background: "#036e9ce8" });
    } else if (_theme == "VioletTheme") {
      $(".content").css({ background: "#7e73e9" });
    }
  }, 1);
});


</script>
<style lang="scss" scoped>
.light {
  width: auto;
  position: relative;
  bottom: -60px;
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

  .content {
    padding: 2px 8px;
    background: #01cdd4d6;
    text-align: center;
    border-radius: 10px;
    font-size: 16px;
  }
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

.light .border {
  position: absolute;
}

.light .border1 {
  width: 100%;
  height: 2px;
  top: 0;
  left: -100%;
  // background: linear-gradient(to right, transparent, #03e9f4);
  // animation: animate1 1s linear infinite;
}

.light .border2 {
  width: 2px;
  height: 100%;
  top: -100%;
  right: 0;
  // background: linear-gradient(to bottom, transparent, #03e9f4);
  // animation: animate2 1s linear infinite;
  // animation-delay: 0.25s;
}

.light .border3 {
  width: 100%;
  height: 2px;
  bottom: 0;
  right: -100%;
  // background: linear-gradient(to left, transparent, #03e9f4);
  // animation: animate3 1s linear infinite;
  // animation-delay: 0.5s;
}

.light .border4 {
  width: 2px;
  height: 100%;
  bottom: -100%;
  left: 0;
  // background: linear-gradient(to top, transparent, #03e9f4);
  // animation: animate4 1s linear infinite;
  // animation-delay: 0.75s;
}

@keyframes animate1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

@keyframes animate2 {
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
}

@keyframes animate3 {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

@keyframes animate4 {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}
</style>
