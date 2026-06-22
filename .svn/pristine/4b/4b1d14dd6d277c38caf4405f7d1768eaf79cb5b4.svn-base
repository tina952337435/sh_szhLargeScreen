<template>
   <div :id="id" class="light">
    <div class="content" v-html="htmlContent"></div>
  </div>
  </template>
  
  <script setup>
import { onMounted, ref } from 'vue';
import $ from "jquery";
  const show=ref(true);
  const props = defineProps({
  id: {
    type: String,
    required: true,
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
onMounted(()=>{
    setTimeout(function () {
    $(".textName").css({ color: "#ffffff", textAlign: "center" });
    $(".textValue").css({ padding: "0px 8px", background: "#40FC00", textAlign: "center", borderRadius: "5px", lineHeight: "28px", fontSize: "16px", fontWeight: "bold", color: "#000" });
    $(".textValueWRZ").css({ padding: "0px 8px", background: "#F7B90B ", textAlign: "center", borderRadius: "5px", lineHeight: "28px", fontSize: "16px", fontWeight: "bold", color: "#000" });
    $(".textValueGRZ").css({ padding: "0px 8px", background: "#DE2424", textAlign: "center", borderRadius: "5px", lineHeight: "28px", fontSize: "16px", fontWeight: "bold", color: "#fff" });
    if (props.dir == "top") {
      $("#" + props.id).css({ bottom: "-75px" });
    }
    else if (props.dir == "bottom") {
      $("#" + props.id).css({ bottom: "-60px" });
    }
    else if (props.dir == "left") {
      $("#" + props.id).css({ bottom: "-80px" });
    }
    else if (props.dir == "right") {
      $("#" + props.id).css({ bottom: "-80px" });
    }
    else if (props.dir == "top_left" || props.dir == "top_right") {
      $("#" + props.id).css({ bottom: "-70px" });
    }
    else if (props.dir == "bottom_left" || props.dir == "bottom_right") {
      $("#" + props.id).css({ bottom: "-60px" });
    }
    
  }, 1);
})
  </script>
  
  <style lang="scss" scoped>
.light {
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

}

.content {
  background-color: #01cdd400 !important;
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
