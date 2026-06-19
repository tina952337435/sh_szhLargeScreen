<template>
  <div class="index" id="particlesId">
    <div class="login-header">
      <img ondragstart="return false;" src="/images/BT1-2.png" />
    </div>
    <div class="wrapper">
      <div class="login-banner">
        <!-- <img ondragstart="return false;" src="/images/suzhoumap.png"> -->
      </div>
      <div class="login-content">
        <div class="login-model">
          <!--电脑端登录-->
          <div class="computer">
            <div class="pc-check">
              <div class="check-tabs">
                <div class="tab">
                  <div class="word">系统登录</div>
                  <div class="bottom-line"></div>
                </div>
              </div>
            </div>
            <div class="form-submit">
              <form action="#" class="message-login">
                <div class="fill-in-item">
                  <img src="/images/pwd.png" alt />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value
                    placeholder="请输入登录名"
                  />
                </div>
                <div class="fill-in-item">
                  <img src="/images/usr.png" alt class="icon-img" />
                  <input
                    type="password"
                    name="pwd"
                    id="pwd"
                    value
                    placeholder="请输入密码"
                  />
                  <!--<a onclick="sendMsg()">获取验证码</a>-->
                </div>
                <div class="action-button" @click="login()">登录</div>
              </form>
            </div>
          </div>

          <div id="downloadBtn" class="download-btn">
            <img
              ondragstart="return false;"
              src="/images/phone.png"
            />移动app下载
          </div>
          <div id="downloadWrapper" class="download-wrapper">
            <div class="download-item">
              <!-- <img ondragstart="return false;" src="/images/AndroidAPP.png"> -->
              <div>安卓App</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="graphics"
      id="particles-js"
      style="position: absolute; height: 100%; width: 100%; left: 0"
    ></div>
    <canvas id="wave" class="wave" width="100%" height="150"></canvas>

    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="data.options"
    />
  </div>
</template>

<script setup>
import "@/assets/styles/loginUser.css";
import $ from "jquery";
import { ref, onMounted, reactive, inject, provide, toRefs } from "vue";
//背景动画
import * as waterWave from "@/utils/share/waterWave.js";
import api from "@/api/login/index.js";
import md5 from "js-md5";
import { ElMessage } from "element-plus";

import { loadFull } from "tsparticles";
import { SetNull } from "../../api/ComUnit";

const data = reactive({
  options: {
    fpsLimit: 100,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.6,
          size: 10,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 60,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 3,
      },
    },
    detectRetina: true,
  },
});

// 粒子效果
const particlesInit = async (engine) => {
  await loadFull(engine);
};
const particlesLoaded = async (container) => {};

var user = ref({});
var rules = ref({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 1, max: 50, message: "长度在 1 到 20 个字符", trigger: "blur" },
  ],
});

onMounted(() => {
  $("#cesiumContainer").hide();
  // waterWave.initAll(); //水波
});

function login() {
  var pwd = document.getElementById("pwd");
  var username = document.getElementById("username");
  if (!username.value || !pwd.value) {
    ElMessage.error("请输入用户名和密码！");
    return;
  }
  

  var strParam = {
    qx_LOGIN: username.value,
    qx_PASSWORD: md5(pwd.value)
  }
  api.useLogin(strParam).then((res) => {
    // 判断登录请求是否成功
    if (res && res.data) {
      var strJson = res.data;
      var token = strJson["token"];
      if (SetNull(token) != "") {
        const hasChinese = /[\u4e00-\u9fff]/.test(token);
        if (hasChinese) {
          ElMessage.error("登录失败；用户名或者密码错误");
        } else {          
          if(strJson["groupid"]=="2022072016563745130"){  //其他区域
             ElMessage.error("您没有系统权限，请联系管理员！");
          }
          ElMessage.success("登录成功");
          localStorage.setItem("TOKEN", token);
          localStorage.setItem("token", token);
          localStorage.setItem("GROUPID", strJson["groupid"]);
          localStorage.setItem("USERNAME", strJson["name"]);
          localStorage.setItem("USERID", strJson["userid"]);
          localStorage.setItem("GROUPNAME", strJson["groupname"]);
          localStorage.setItem("loginname", strJson["qx_LOGIN"]);
          localStorage.setItem("loginTime", Date.now().toString());
          localStorage.setItem("loginFalse", true);
          if(strJson["groupid"]=="2017110800001"){
            window.location.href = "/swzzWeb";
          }
          else
          {
            window.location.href = "/zonglan";
          }
        }
      } else {
        ElMessage.error("账号或者密码错误 ");
      }
    } else {
      ElMessage.error("登录失败");
    }
  });
}
function SetCookie(name, value, Days) {
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
</script>
<style scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: azure url(/images/loginbj1.jpg) no-repeat fixed;
  background-size: 100% 100%;
}

.login-form {
  height: 550px;
  width: 800px;
  box-sizing: border-box;
  background-color: #fff;
  /* opacity: 0.8; */
  padding: 20px 50px;
}

#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
}
</style>
