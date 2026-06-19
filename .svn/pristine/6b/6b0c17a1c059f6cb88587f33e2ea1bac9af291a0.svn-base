<template>
  <div class="navbar">
    <div class="navbar-header">
      <div
        id="divlogo"
        style="
          position: absolute;
          height: 78px;
          width: 490px;
          top: 10px;
          background-repeat: no-repeat;
        "
      ></div>
    </div>
    <div class="nav navbar-nav top-menu">
      <div v-html="mainMenu"></div>
    </div>
    <ul class="nav navbar-nav navbar-right" id="navbar-right">
      <li style="line-height: 75px; width: 50px; display: none">
        <i
          class="menu-icon fa fa-desktop"
          title="一体化大屏"
          style="cursor: pointer"
          onclick="JavaScript:window.open('/LargeScreen/shuzidating.html')"
        ></i>
      </li>
      <li class="dropdown">
        <a class="dropdown-toggle userinfo" id="openUserinfo">
          <img
            class="user-img"
            id="btnPHOTOS"
            src="/images/index/user.jpg"
          /><span id="userinfo">个人资料</span><i class="fa fa-angle-down"></i>
        </a>
        <ul class="dropdown-menu pull-right" id="divXTQH">
          <li>
            <a href="login.html"><i class="fa fa-key"></i>注销</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { onMounted, ref, defineAsyncComponent, nextTick } from "vue";
import { Coin, House, Calendar, Wallet, Monitor } from "@element-plus/icons-vue";
import { format } from "date-fns";
import api_json from "@/assets/json/api.json";
const currentComponent = ref(null);
const props = defineProps({
  mainMenu: String,
});
const mainMenu = ref();

function getChildData() {
  var dataJson = api_json.data;
  var str = dataJson.filter(function (res) {
    return res.QX_PARENT != "-1" && res.QX_PARENT == dataJson[0].QX_ID;
  });
  var strMsg = "";
  strMsg = ' <ul class="menu">';
  var qid = "2021080114350041623"; //"qid=2021080114350041623";
  var mokuai = "NO14";
  if (str.length > 0) {
    var screenWidth = window.screen.width;
    for (var num = 0; num < str.length; num++) {
      var cls = "";
      if (mokuai == "NO14") {
        if (num == 1) {
          cls = "activeLi";
          //   $.data(myData, "qx_URL", str[num].QX_URL);
          //   $.data(myData, "id", str[num].QX_ID);
          //   $.data(myData, "iconCls", str[num].QX_ICON);
          //   $.data(myData, "text", str[num].QX_NAME);
        }
      } else {
        if (num == 0 && undefined == qid) {
          cls = "activeLi";
          //   $.data(myData, "qx_URL", str[num].QX_URL);
          //   $.data(myData, "id", str[num].QX_ID);
          //   $.data(myData, "iconCls", str[num].QX_ICON);
          //   $.data(myData, "text", str[num].QX_NAME);
        } else if (str[num].QX_ID == qid) {
          cls = "activeLi";
          //   $.data(myData, "qx_URL", str[num].QX_URL);
          //   $.data(myData, "id", str[num].QX_ID);
          //   $.data(myData, "iconCls", str[num].QX_ICON);
          //   $.data(myData, "text", str[num].QX_NAME);
        }
      }
      //没做的功能，暂时灰掉
      var color = "#c1bfbf";
      color = "#fff";
      if (num < 7) {
        strMsg +=
          '<li style="cursor:pointer;" id="menuLi' +
          num +
          '" class="' +
          cls +
          '" onclick="OnClickTitle(\'' +
          str[num].QX_ICON +
          "','" +
          str[num].QX_NAME +
          "','" +
          str[num].QX_URL +
          "','menuLi" +
          num +
          "','" +
          str[num].QX_ID +
          "')\">";
        strMsg += '<span class="menuSpan">';
        strMsg +=
          '<i class="menu-icon fa ' +
          str[num].QX_ICON +
          '"  style="color:' +
          color +
          ';"></i><span class="menutext" style="color:' +
          color +
          ';">' +
          str[num].QX_NAME +
          "</span>";
        strMsg += "</span>";
        strMsg += "</li>";
      } else if (num == 8) {
        strMsg +=
          '<li style="cursor:pointer;" class="menuLiSLH ' +
          cls +
          '" onclick="menuLiSLH()">';
        strMsg +=
          '<span class="menuSpan"><span class="menutext" style="font-size: 30px;line-height: 22px;">...</span></span>';
        strMsg += "</li>";
        strMsg += '<div id="boteTitle"> <ul class="pull-right noti"></ul></div>';
      }
    }
  }

  strMsg += '<div id="boteTitleSP"> <ul class="pull-right notiSP"></ul></div>';
  strMsg += "     </ul>";
  //   $("#mainMenu").html(strMsg);
  mainMenu.value = strMsg;
}
onMounted(() => {
  getChildData();
});
</script>
<style src="@/assets/styles/navbar.css"></style>
<style scoped>
</style>
