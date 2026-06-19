<template>
  <div style="width:220px;float:left;height:100%; margin-right: 5px;background:white;">
    <div>
      <a class="buttonAdd" @click="addFuData()" plain="false">增加(节点)</a>
      <a class="buttonAdd" @click="addZidata()" plain="false">增加(子节点)</a><br />
      <a class="buttonAdd" @click="edit()" plain="false">编辑(节点)</a>
      <a class="buttonAdd" @click="delTree()" plain="false">删除</a>

    </div>
    <Treetable :data="TreeData" />
  </div>
  <div
    style="width:calc(100% - 230px);float:left;height: -webkit-calc(100% - 50px);height: -moz-calc(100% - 50px);height: calc(100% - 50px);">


  </div>
</template>
<script setup>
import Treetable from "@/components/Table/Treetable.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";
import { ref, onMounted, reactive, inject } from 'vue'
import { defaultNamespace } from "element-plus";
const TreeData = ref();
const treeData = [
  { label: '一级 1', children: [{ label: '二级 1-1' }] },
  { label: '一级 2', children: [{ label: '二级 2-1' }] }
]

function TreeSel() {
  var strParam = {};
  strParam["pathname"] = "站点关联配置";
  api
    .treeSel(strParam)
    .then((res) => {
      var strJson = res.result;

      const newArr = changeTree(strJson, '-1')
      // var result = [], resultList = [];
      // if (strJson.length > 0) {
      //   var result = strJson.filter(function (e) {
      //     return e.pid == "-1"
      //   });
      //   dataAll(strJson, result)
      // }
    })
}
function dataAll(strJson, result) {
  let newField = 'children';
  let newFieldValue = [];

  let updatedArray = result.map(obj => {
    return { ...obj, [newField]: newFieldValue };
  });
  var resultList = [];
  if (strJson.length > 0 && result.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      for (var i = 0; i < result.length; i++) {
        if (strJson[num].pid == result[i].id) {

          // var _strParam = {};
          // _strParam["id"] = result[i].id;
          // _strParam["orderbyid"] = result[i].orderbyid;
          // _strParam["pathname"] = result[i].pathname;
          // _strParam["pid"] = result[i].pid;
          // _strParam["title"] = result[i].title;
          // _strParam["tm"] = result[i].tm;
          // _strParam["children"] = strJson[num];
          resultList.push(strJson[num]);
        }
      }
    }


    // 将第二层拼进第一层
    var dataAll = result.forEach(item => {
      resultList.forEach(item2 => {
        if (item2.pid == item.id) {
          if (!item.isOn) {
            // item2.children.push(item)
            item.children.push(item2)
          }
        }
      })
    })
  }
}

function changeTree(list, rootValue) {
  const arr = []
  list.forEach((item) => {
    if (item.pid == rootValue) {
      arr.push(item)
      const children = changeTree(list, item.id)
      item.children = children
    }
  })
}
// 增加(节点)
function addFuData() {

}
// 增加(子节点)
function addZidata() {

}
// 编辑(节点)
function edit() {

}
// 删除
function delTree() {

}
onMounted(() => {
  TreeSel();
});
</script>
<style>
html,
body,
#app {
  background: #F5F5F5;
}

.buttonAdd {
  background-color: #3291F9;
  color: #ffffff;
  margin: 0px 10px 10px 0px;
  padding: 4px 10px 4px 10px;
  border-radius: 4px;

}
</style>
  
  