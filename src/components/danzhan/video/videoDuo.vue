<template>
  <el-container style="width: 100%;height: 100%;">
    <el-row style="width:330px;">
      <el-tree style="max-width: 600px;width: 330px;height: 200px;" :data="treeResult.value" :props="defaultProps"
        :default-expand-all="true" ref="leftTreeRef" highlight-current="true" node-key="id"
        @node-click="handleNodeClick" />

    </el-row>
    <el-row style="width:calc(100% - 330px);height: calc(100% - 70px);">
      <div id="playerthem" style="width:930px;height:610px;"></div>
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
import { ref, onMounted, reactive, inject, getCurrentInstance, onUnmounted } from "vue";
import { ElContainer, ElInput, ElRow, ElButton, ElMessage, ElTree } from "element-plus";
import { FullScreen, Menu, CaretTop, Grid, CaretLeft, CaretRight, CaretBottom, RemoveFilled, CirclePlusFilled, VideoPause } from "@element-plus/icons-vue";
import api from "@/api/zonglan/videoIndex.js";
import { listToTree, SetNull } from "@/api/ComUnit";

// @node-click="handleNodeClick"

const playerview = ref(null);
const playerwsUrl = ref();
const treeResult = reactive([])
const CaretTopFlag = ref(false);
const MenuFlag = ref(false);
const TabSPname = inject("TabSPname");
const props = defineProps({
  id: {
    type: String,
    default: ""
  },
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

const stcd = ref("");
const videoList = ref([]);
const { proxy } = getCurrentInstance();

const defaultProps = {
  children: 'children',
  label: 'name',
}
onMounted(() => {
  createPlayer();
  // if (SetNull(videoList.value) != "" && props.videoList.length > 0) {
  //   videoList.value = props.videoList;
  // } else {
  //   videoList.value = inject("videoList");
  // }
  if (SetNull(stcd.value) != "") {
    stcd.value = props.stcd;
  } else {
    stcd.value = inject("id");
  }
  console.error(props, stcd.value)
  if (SetNull(stcd.value) != "") {
    setTimeout(function () {
      search(stcd.value);
    }, 1000)
  } else {
    setTimeout(function () {
      search();
    }, 500)
  }

})

function loadMoreVideo(spStcd) {
  var strParam = {};
  strParam["stcd"] = spStcd;
  api.videoPreview(strParam).then((res) => {
    var result = res["result"];
    for (var num = 0; num < result.length; num++) {
      if (result[num].ip != null) {
        var strJson = JSON.parse(result[num].ip);
        if (strJson["data"] != null) {
          playerwsUrl.value = strJson["data"]["url"];
          play(num);
        }
      }
    }
  })
}
/**
  * 初始化播放器
  */
function createPlayer() {
  playerview.value = new window.JSPlugin({
    // 需要英文字母开头 必填
    szId: 'playerthem',
    // 必填,引用H5player.min.js的js相对路径
    szBasePath: '/H5player',
    // 当容器div#play_window有固定宽高时，可不传iWidth和iHeight，窗口大小将自适应容器宽高
    iWidth: 600,
    iHeight: 400,
    // 分屏播放，默认最大分屏4*4
    iMaxSplit: 16,
    iCurrentSplit: 1,
    // 样式
    oStyle: {
      border: '#343434',
      borderSelect: '#FFCC00',
      background: '#000'
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
  var strParam = { pid: props.stcd };
  if (SetNull(stcd) != "") {
    strParam["pid"] = stcd;
  }
  api.videotreeSel(strParam).then((res) => {
    var listResult = res.result;
    var strJson = listToTree(listResult, "id", "pid")
    treeResult.value = strJson.filter(function (evt) {
      return SetNull(evt["children"]) != ""
    });
    console.error('treeResult', treeResult.value);
    var spStcd = "";
    for (var num = 0; num < 4; num++) {
      // console.error("channels---==", listResult[num].channels)
      if (listResult[num] != undefined) {
        spStcd += listResult[num].channels + ",";
      }
    }
    spStcd = spStcd != "" ? spStcd.substring(0, spStcd.length - 1) : "";

    loadMoreVideo(spStcd);

    // var fpnumTotal = (listResult.length - 1);
    // var fpnum = Math.ceil(Math.sqrt(fpnumTotal));

    arrangeWindow(2);
  })
}
function handleNodeClick(evt) {
  var item = evt;
  if (SetNull(item["children"]) == "") {
    console.error("channels---==", item)
    ElMessage.success(item["name"] + "预览取流");
    var strParam = {};
    strParam["stcd"] = item["channels"];
    // api.videoPreview(strParam,true,function(res){
    api.videoPreview(strParam).then((res) => {
      if (res["result"][0].ip != null) {
        var strJson = JSON.parse(res["result"][0].ip);
        if (strJson["data"] != null) {
          playerwsUrl.value = strJson["data"]["url"];
          // play();
          realplay();
        }
      }
    })
  }
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
      console.error(e)
      ElMessage.error("取流失败：" + e);
    }
  )
}
/**
* 获取取流连接
* @returns {*}
*/
function getPreviewUrl() {
  let tempCode = '61077001001320000018'

}
/**
* 监控点更新
* @param data
*/
function onChangeCode(data) {
  playerCode.value = data
  play()
}
/**
 * 播放
 */
function play(index) {
  let preUrl = playerwsUrl.value;
  const param = {
    playURL: preUrl,
    // 1：高级模式  0：普通模式，高级模式支持所有
    mode: 1
  }
  // 索引默认0
  if (!index) {
    index = 0
  }
  playerview.value.JS_Play(preUrl, param, index).then(() => {
    // 播放成功回调
    console.log('播放成功')
  })
  //   getPreviewUrl().then(res => {
  //     if (res.status !== 200) {
  //         ElMessage.warning('获取视频流失败！')
  //       return
  //     }
  //    ,
  //     (err) => {
  //       console.log('播放失败')
  //     })
  //   })
}
/**
 * 默认预览
 */
function onSubmit() {
  play()
}

/**
 * 分屏，这里我太懒了，就循环了一个视频流
 */

//分屏
function MenusplitNum() {
  MenuFlag.value = !MenuFlag.value;
  if (MenuFlag.value) {
    CaretTopFlag.value = false;
  }
}
function arrangeWindow(num) {
  // 这里的分屏，是以列来算的，如果这里参数2，那么就是横竖两列，就是4格
  ElMessage.success(num + "×" + num + "屏幕分屏");
  playerview.value.JS_ArrangeWindow(num).then(
    () => { console.error(`arrangeWindow to ${num}x${num} success`) },
    e => { console.error(e) }
  )
}
onUnmounted(() => {
  stopAllPlay();
})
function stopAllPlay() {
  playerview.value.JS_StopRealPlayAll().then(
    () => {
      console.log('stopAllPlay success')
    },
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

.el-tree {
  /* background: var(--el-fill-color-blank);*/
  color: var(--el-tree-text-colornew);
}

:deep(.el-tree-node__content:hover) {
  background-color: var(--popContentHeadbg);
  color: #fff;
}

:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: var(--popContentHeadbg);
  color: #fff;
}

:deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}
</style>