<template>
  <el-container style="width: 100%;height: 100%;">
    <el-row style="width:120px;display:none;">
      <el-input v-model="code" placeholder="输入监控点编码" @change="onChangeCode" style="display:none;"></el-input>
      <el-button @click="onSubmit">默认预览</el-button>
      <el-button @click="onTwoSubmit(2)">4分屏</el-button>
      <el-button @click="onTwoSubmit(4)">16分屏</el-button>
      <el-button @click="onTwoSubmit(8)">64分屏</el-button>

    </el-row>
    <el-row style="width:calc(100%);height: 100%;">
      <!-- <div id="player" style="width:100%;height:calc(100% - 30px);"></div> -->
      <div id="player" style="width:1260px;height:640px;"></div>
      <div
        style="width: 100%;height: 30px;text-align: right;background:var(--popContentHeadbg);padding-right: 10px;padding-top: 3px;">

        <span style="margin-right: 5px;">
          <div v-if="CaretTopFlag"
            style="position: absolute;bottom: 50px;right: 5px;width: 100px;background:var(--popContentHeadbg);padding: 5px; border-radius: 6px;height: 110px;line-height:30px;">
            <!-- <button @click="PTZInfo('GOTO_PRESET')">还原</button>
            <button @click="PTZInfo('STOP')">停止</button> -->

            <div>
              <div style="height: 22px;padding-right: 20px;">
                <el-icon @click="PTZInfo('UP')" title="上转">
                  <CaretTop style="color: white;width: 30px;cursor: pointer;margin-right: 5px;" />
                </el-icon>
              </div>
              <div style="height: 20px;margin-right: -2px;">
                <el-icon @click="PTZInfo('LEFT')" title="左转" style="margin-right: -8px;">
                  <CaretLeft style="color: white;width: 30px;cursor: pointer;margin-right: 5px;" />
                </el-icon>
                <el-icon @click="PTZInfo('STOP')" title="停止" style="vertical-align: 4px; margin-right: -3px;">
                  <VideoPause style="color: white;width: 20px;cursor: pointer;" />
                </el-icon>
                <el-icon @click="PTZInfo('RIGHT')" title="右转">
                  <CaretRight style="color: white;width: 30px;cursor: pointer;margin-right: 5px;" />
                </el-icon>
              </div>
              <div style="height: 36px;padding-right: 20px;">
                <el-icon @click="PTZInfo('DOWN')" title="下转">
                  <CaretBottom style="color: white;width: 30px;cursor: pointer;margin-right: 5px;" />
                </el-icon>
              </div>
            </div>
            <div style="margin-right: 10px;">
              <el-icon @click="PTZInfo('ZOOM_OUT')" title="焦距变小">
                <RemoveFilled style="color: white;width: 20px;cursor: pointer;margin-right: 5px;" />
              </el-icon>
              <el-icon @click="PTZInfo('ZOOM_IN')" title="焦距变大">
                <CirclePlusFilled style="color: white;width: 20px;cursor: pointer;margin-right: 5px;" />
              </el-icon>
            </div>
            <!-- <button>左转</button> -->
            <!-- <button @click="PTZInfo('RIGHT')">右转</button> -->
            <!-- <button @click="PTZInfo('UP')">上转</button>
            <button @click="PTZInfo('DOWN')">下转</button> -->
            <!-- <button >焦距变大</button>
            <button>焦距变小</button> -->
          </div>
          <CaretTop style="color: white;width: 20px;cursor: pointer;" @click="CaretTopPLC" />
        </span>
        <span style="margin-right: 5px;">
          <div v-if="MenuFlag"
            style="position: absolute;bottom: 50px;right: 5px; background: var(--popContentHeadbg);padding: 5px; border-radius: 6px;height: 30px;">
            <el-icon title="1×1" @click="arrangeWindow(1)">
              <FullScreen style="color: white;width: 20px;cursor: pointer;margin-right: 5px;" />
            </el-icon>
            <el-icon title="2×2" @click="arrangeWindow(2)">
              <Menu style="color: white;width: 20px;cursor: pointer;margin-right: 5px;" />
            </el-icon>
            <el-icon title="3×3" @click="arrangeWindow(3)">
              <Grid style="color: white;width: 20px;cursor: pointer;" />
            </el-icon>
          </div>
          <Menu style="color: white;width: 20px;cursor: pointer;" @click="MenusplitNum" />
        </span>
        <span>
          <FullScreen style="color: white;width: 20px;cursor: pointer;" @click="wholeFullScreen" />
        </span>
      </div>

    </el-row>
  </el-container>
</template>
<script setup>
import { ref, onMounted, reactive, onUnmounted, inject } from "vue";
import { ElContainer, ElInput, ElRow, ElButton, ElMessage, ElTree } from "element-plus";
import { FullScreen, Menu, CaretTop, Grid, CaretLeft, CaretRight, CaretBottom, RemoveFilled, CirclePlusFilled, VideoPause } from "@element-plus/icons-vue";
import api from "@/api/zonglan/videoIndex.js";
import { previewURLs } from "@/api/video/index.js";
import { listToTree, SetNull } from "@/api/ComUnit";
const props = defineProps({
  stcd: {
    type: String,
    default: ""
  },
  stnm: {
    type: String,
    default: ""
  },
  items: {
    type: Object,
    default: {}
  },
  videoList: {
    type: Array,
    default: []
  }
});
const videoList = ref([]);
const playerview = ref(null);
const playerwsUrl = ref();
const treeResult = reactive([])
const CaretTopFlag = ref(false);
const MenuFlag = ref(false);
const IS_MOVE_DEVICE = document.body.clientWidth < 992 // 是否移动设备
onMounted(() => {
  createPlayer();
  if (SetNull(videoList.value) != "" && props.videoList.length > 0) {
    videoList.value = props.videoList;
  } else {
    videoList.value = inject("videoList");
  }
  if (SetNull(videoList.value) != "" && videoList.value.length > 0) {
    props.stcd = videoList.value[0]["indexCode"];
    props.stnm = videoList.value[0]["name"];

    setTimeout(function () {
      search(videoList.value[0]["indexCode"]);
    }, 1000)
  } else {
    setTimeout(function () {
      search();
    }, 500)
  }

})

//创建窗口
function createPlayer() {
  playerview.value = new window.JSPlugin({
    szId: 'player',
    szBasePath: "/H5player",
    iMaxSplit: 32,
    iCurrentSplit: 1,
    iWidth: 1260,
    iHeight: 640,
    openDebug: true,
    oStyle: {
      borderSelect: IS_MOVE_DEVICE ? '#000' : '#FFCC00',
    }
  })
  // 事件回调绑定
  playerview.value.JS_SetWindowControlCallback({
    windowEventSelect: function (iWndIndex) {  //插件选中窗口回调
      // console.log('windowSelect callback: ', iWndIndex);
    },
    pluginErrorHandler: function (iWndIndex, iErrorCode, oError) {  //插件错误回调
      // console.log('pluginError callback: ', iWndIndex, iErrorCode, oError);
    },
    windowEventOver: function (iWndIndex) {  //鼠标移过回调
      //console.log(iWndIndex);
    },
    windowEventOut: function (iWndIndex) {  //鼠标移出回调
      //console.log(iWndIndex);
    },
    windowEventUp: function (iWndIndex) {  //鼠标mouseup事件回调
      //console.log(iWndIndex);
    },
    windowFullCcreenChange: function (bFull) {  //全屏切换回调
      // console.log('fullScreen callback: ', bFull);
    },
    firstFrameDisplay: function (iWndIndex, iWidth, iHeight) {  //首帧显示回调
      // console.log('firstFrame loaded callback: ', iWndIndex, iWidth, iHeight);
    },
    performanceLack: function () {  //性能不足回调
      // console.log('performanceLack callback: ');
    }
  });
}
//获取数据
function search(stcd) {
  var strParam = {};
  strParam["stcd"] = props.stcd;
  if (SetNull(stcd) != "") {
    strParam["stcd"] = stcd;
  }
  api.videoPreview(strParam).then((res) => {
    if (res["result"][0].ip != null) {
      var strJson = JSON.parse(res["result"][0].ip);
      if (strJson["data"] != null) {
        playerwsUrl.value = strJson["data"]["url"];
        realplay();
      }
    }
  })

  // var strJson=previewURLs(strParam);
  // api.previewURLs(strParam).then((res)=>{
  //   console.error("---===",res)
  // })
}
function mode() {
  return 1;
}
/* 预览&对讲 */
function realplay() {
  let index = playerview.value.currentWindowIndex;
  let playURL = playerwsUrl.value;
  playerview.value.JS_Play(playURL, { playURL, mode }, index).then(
    () => { console.log('realplay success') },
    e => {
      ElMessage.error("取流失败：" + e);
    }
  )
}

//分屏
function MenusplitNum() {
  MenuFlag.value = !MenuFlag.value;
  if (MenuFlag.value) {
    CaretTopFlag.value = false;
  }
}
function arrangeWindow(splitNum) {
  // let splitNum = this.splitNum
  ElMessage.success(splitNum + "×" + splitNum + "屏幕分屏");
  playerview.value.JS_ArrangeWindow(splitNum).then(
    () => { console.error(`arrangeWindow to ${splitNum}x${splitNum} success`) },
    e => { console.error(e) }
  )
}
//远控
function CaretTopPLC() {
  CaretTopFlag.value = !CaretTopFlag.value;
  if (CaretTopFlag.value) {
    MenuFlag.value = false;
  }
}
function PTZInfo(valCode) {
  var strMsg = "";
  if (valCode === "UP") {
    strMsg = "向上转操作成功";
  }
  else if (valCode === "LEFT") {
    strMsg = "向左转操作成功";
  }
  else if (valCode === "RIGHT") {
    strMsg = "向右转操作成功";
  }
  else if (valCode === "DOWN") {
    strMsg = "向下转操作成功";
  }
  else if (valCode === "ZOOM_OUT") {
    strMsg = "焦距变小操作成功";
  }
  else if (valCode === "ZOOM_IN") {
    strMsg = "焦距变大操作成功";
  }
  if (SetNull(strMsg) != "") {
    ElMessage.success(strMsg);
  }
  var strParam = {};
  strParam["stcd"] = props.stcd;
  strParam["key"] = valCode;
  strParam["pathname"] = 10;
  strParam["datasource"] = playerview.value.currentWindowIndex;
  api.getptzsInfo(strParam).then((evt) => {
    if (valCode != "STOP" && valCode != "GOTO_PRESET") {
      setTimeout(function () {
        strParam["key"] = "STOP";
        api.getptzsInfo(strParam).then((res) => {

        })
      }, 500)
    }
  });
}
function init() {
  // 设置播放容器的宽高并监听窗口大小变化
  window.addEventListener('resize', () => {
    playerview.value.JS_Resize()
  })
}
//全屏
function wholeFullScreen() {
  playerview.value.JS_FullScreenDisplay(false).then(
    () => {
      console.error(`wholeFullScreen success`)
      // playerview.value.JS_Resize();
    },
    e => { console.error(e) }
  )
}
onUnmounted(() => {
  stopAllPlay();
})
function stopAllPlay() {
  playerview.value.JS_StopRealPlayAll().then(
    () => {
      console.error('stopAllPlay success')
    },
    e => { console.error(e) }
  )
}
</script>
<style scoped>
.el-row {
  display: table;
}

.el-button.el-button {
  margin-left: 0px;
  width: 100px;
  margin-bottom: 10px;
}

:deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}
</style>