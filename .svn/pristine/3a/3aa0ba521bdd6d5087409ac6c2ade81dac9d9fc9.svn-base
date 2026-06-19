<template>
  <el-container>
    <el-row>
      <el-tree style="max-width: 600px;width: 200px;height: 200px;" :data="treeResult.value" :props="defaultProps"
        @node-click="handleNodeClick" />
      <el-input v-model="code" placeholder="输入监控点编码" @change="onChangeCode"></el-input>
      <el-button @click="onSubmit">默认预览</el-button>
      <el-button @click="onTwoSubmit(2)">4分屏</el-button>
      <el-button @click="onTwoSubmit(4)">16分屏</el-button>
      <el-button @click="onTwoSubmit(8)">64分屏</el-button>
    </el-row>
    <el-row>
      <div id="player" style="width: 800px;height: 800px;"></div>
    </el-row>
  </el-container>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { ElContainer, ElInput, ElRow, ElButton, ElMessage, ElTree } from "element-plus";
import api from "@/api/zonglan/videoIndex.js";
import { listToTree, SetNull } from "@/api/ComUnit";

const playerview = ref(null);
const playerwsUrl = ref();
const treeResult = reactive([])
const defaultProps = {
  children: 'children',
  label: 'name',
}
// const treeResult=[{
//     name: 'Level one 1',
//     children: [
//       {
//         name: 'Level two 1-1',
//         children: [
//           {
//             name: 'Level three 1-1-1',
//           },
//         ],
//       },
//     ],
//   }]
onMounted(() => {
  api.videoSel({}).then((res) => {
    var listResult = res.result.filter(function (evt) {
      return SetNull(evt["pid"]) != "1"
    })
    var strJson = listToTree(listResult, "id", "pid")
    treeResult.value = strJson.filter(function (evt) {
      return SetNull(evt["children"]) != ""
    });

  })
  createPlayer();
})
/**
    * 初始化播放器
    */
function createPlayer() {
  playerview.value = new window.JSPlugin({
    // 需要英文字母开头 必填
    szId: 'player',
    // 必填,引用H5player.min.js的js相对路径
    szBasePath: './H5player',
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
}
function handleNodeClick(evt) {
  var item = evt;
  if (SetNull(item["children"]) == "") {
    var strParam = {};
    strParam["stcd"] = item["channels"];
    // api.videoPreview(strParam,false,function(e){}).then((res) => {
      api.videoPreview(strParam).then((res) => {
        var strJson = JSON.parse(res["result"][0].ip);
      playerwsUrl.value = strJson["data"]["url"];
      play();

    })
  }

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
function onTwoSubmit(num) {
  // 这里的分屏，是以列来算的，如果这里参数2，那么就是横竖两列，就是4格
  playerview.value.JS_ArrangeWindow(num).then(
    () => {
      // 循环取流
      for (let i = 0; i < num * num; i++) {
        play(i)
      }
    },
    e => { console.error(e) }
  )
}

</script>
<style scoped>
:deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}
</style>