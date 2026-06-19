<template>
  <div class="m-box" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p base-p1" id="title2">工情统计</p>
      <span class="spanTitle"></span>
    </div>
    <div class="txt" style="overflow-y: auto">
      <ul style="padding: 0px; margin: 10px 20px;" id="gqTable3">
        <li v-for="(item, index) in List" :key="index">
          <div @click="clickGQList(item.stcd)" class="ClassName" :id="item.stcd">
            <span class="View">{{ item.stnm }}</span>
            <span class="View2">{{ item.accpw }}/{{ item.accdw }}万方</span>
            <span class="View2">{{ item.texttm }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="bot"></div>
  </div>
  <!-- <ComZujian :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
    style="width: 70%; height: 700px">
    <TableGCTJ />
  </ComZujian> -->
</template>
<script setup>
import { useStore } from "vuex";
import ComZujian from "@/components/ComZujian.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";

import { ref, onMounted } from "vue";
// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);
const showDialog = ref(false);
const store = useStore();
const { viewer } = store.state;
const List = ref({});
const gcpid = ref(null);
const stime = ref("");
const etime = ref("");

function Weacontent() {
  var nowTM = new Date();
  etime.value = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  if (Number(dayjs(nowTM).format("HH")) > 7) {
    stime.value = dayjs(nowTM)
      .add(-24, "hour")
      .format("YYYY-MM-DD 08:00:00");
  }
  else {
    stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-48, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  var strParam = {};
  strParam["pid"] = "2024110511050067158";
  strParam["pathname"] = "NEW";
  strParam["stime"] = stime.value;
  strParam["etime"] = etime.value;
  api
    .stPptnGQTJ(strParam)
    .then((res) => {
      var strJson = res.result.filter(function (e) {
        return e.STCD != "2024110511063284151";
      });
      var result = [];
      strJson.forEach((item, idx) => {
        if (item.stim == "沿江水量") {
          strJson.splice(idx, 1)
          strJson.splice(0, 0, item)
        }
      })
      for (var num = 0; num < strJson.length; num++) {
        var item = strJson[num];
        var accdw = item.accdw != undefined ? Number(item.accdw).toFixed(1) : 0.0;
        var accpw = item.accpw != undefined ? Number(item.accpw).toFixed(1) : 0.0;
        item["accdw"] = accdw;
        item["accpw"] = accpw;
        if (item["STCD"] == "2024111100000001") {
          item["texttm"] = "昨日";
        }
        else {
          item["texttm"] = "实时";
        }
        // else if (item["STCD"] == "2024110511084138978") {
        //   item["texttm"] = "实时";
        // }
        //  else if (item["STCD"] == "2025031715294726929") {
        //   item["texttm"] = "实时";
        // }
        result.push(item)
      }
      List.value = result;
    })
    .catch((err) => { });
}
function clickGQList(e) {
  gcpid.value = e;
}
onMounted(() => {
  Weacontent();
});
// 用于在 <script setup> 语法下显式暴露组件的公共属性和方法，处理子组件时，允许父组件访问子组件的特定属性或方法
defineExpose({ gcpid });
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
/* 自定义滚动条样式 */
.txt::-webkit-scrollbar {
  width: 1px;
  /* 设置滚动条宽度 */
}

.txt::-webkit-scrollbar-track {
  /* 滚动条轨道 */
  /* background: rgb(49, 139, 167); */
}

.txt::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  border-radius: 50%;
  z-index: 2;
}

#gqTable3 li {
  list-style: none;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  margin-bottom: 15px;
}
 
.ClassName {
  background: var(--ClassNameBcak);
  font-weight: normal;
  color: #ccc;
  font-size: 14px;
  width: 100%;
}

.ClassNameSelect {
  background: var(--ClassNameBcakSelect);
}

#gqTable3 li div {
  display: inline-block;
  width: 100%;
  padding: 0px 20px;
}

.View {
  font-weight: bold;
  color: #fff;
  width: 33%;
  display: inline-block;
  text-decoration: underline;
  cursor: pointer;
}

.View2 {
  font-weight: bold;
  color: #fff;
  width: 33%;
  display: inline-block;
  text-align: center;
}
</style>
