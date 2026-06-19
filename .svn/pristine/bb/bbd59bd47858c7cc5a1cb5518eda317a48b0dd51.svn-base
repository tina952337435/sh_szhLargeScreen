<template>
  <div class="m-box m-box-3" style="position: relative">
    <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2">
      <div class="d1"></div>
      <div class="d2"></div>
      <p class="base-p1" id="title2">视频列表信息</p>
      <span class="spanTitle"></span>
    </div>

    <div class="txt"> 
      <div style="height: 40px; line-height:40px; width: 96%;width: 100%;color:var(--mtablecolor) !important;">
        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 名称：&nbsp;
        <input id="textbox1" name="username" class="textbox" style="width:200px">
        <el-button type="primary" style="margin-left: 20px" @click="stcdChanged()">
          查询
        </el-button>
      </div>
      <div class="tableWQ" style="height: calc(100% - 40px); width: 98%;">
        <!-- <div class="wqtitle">视频列表</div> -->
        <div class="tableWQDIV" style="height: calc(100% - 40px); width: 100%; overflow-y: auto;padding:10px 10px;">
          <el-tree style="width: 100%;height: 200px;" :data="treeResult.value" :props="defaultProps"
            @node-click="handleNodeClick" :default-expand-all="true" />
        </div>
      </div>
    </div>
    <div class="bot leftBottom-radius"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, inject } from "vue";
import {
  ElContainer,
  ElInput,
  ElRow,
  ElButton,
  ElMessage,
  ElTree
} from "element-plus";
import api from "@/api/zonglan/videoIndex.js";
import { listToTree, SetNull, jsonToList } from "@/api/ComUnit";
import $ from "jquery";

const defaultProps = {
  children: "children",
  label: "name"
};
const treeResult = reactive([]);
const treeResultAll = reactive([]);

//注入父组件提供的方法
const parentMethodTable = inject('parentMethodTable');


onMounted(() => {
  Weacontent();
});
function Weacontent() {
  var keyvalue = $("#textbox1").val();
  if (parentMethodTable) {
    parentMethodTable(keyvalue);
  }
  var strParam = { key: keyvalue, "datasource": "1" };
  api
    .videoSel(strParam)
    .then(res => {
      var strJson = res.result.filter(function (evt) {
        return SetNull(evt["lgtd"]) != "" && SetNull(evt["lttd"]) != "" || SetNull(evt["pid"]) == "-1" ;
      });
      var stcdLists = "";
      if (strJson.length > 0) {
        for (var num = 0; num < strJson.length; num++) {
          if (SetNull(strJson[num]["channels"]) != "" && SetNull(strJson[num]["lgtd"]) != "" && SetNull(strJson[num]["lttd"]) != "") {
            if (SetNull(stcdLists) != "") {
              stcdLists += "," + strJson[num]["channels"];
            }
            else {
              stcdLists = strJson[num]["channels"];
            }
          }
        }
      }
      var apiParam = {};
      apiParam["stcd"] = stcdLists;

      api.videoOnline(apiParam)
        .then((ett) => {
          treeResultAll.value = strJson.filter(function (evt) {
            var tempList = [];
            if (SetNull(evt["channels"]) != "") {
              tempList = ett.result.filter(function (ttt) {
                return ttt["indexCode"] == evt["channels"]
              })
            }
            if (tempList.length > 0) {
              evt["state"] = tempList[0]["online"];
            }
            else {
              evt["state"] = evt["online"];
            }
            evt["online"] = evt["state"];
            return true;
          });
          bindData();
        }).error(err => {
          treeResultAll.value = strJson;
          bindData();
        });
    })
    .catch(err => { });
}
function bindData() {
  var listResult = treeResultAll.value;

  var strJson = listToTree(listResult, "id", "pid");
  // console.error("strJson", strJson);
  if (strJson.length > 0) {
    for (var num = 0; num < strJson.length; num++) {
      var itemList = strJson[num];
      if (SetNull(itemList["children"]) != "") {
        if (itemList["children"].length > 0) {
          for (var i = 0; i < itemList["children"].length; i++) {
            if (itemList["children"][i]["online"] != "1") {
              itemList["children"][i]["name"] = itemList["children"][i]["name"] + "（离线）"
            }
          }
        }
        var subJson = itemList["children"].filter(function (evt) {
          return evt["online"] == "1";
        })
        itemList["name"] = itemList["name"] + "（" + subJson.length + "/" + itemList["children"].length + "）"
        var ListCode = [];
        ListCode = jsonToList(itemList["children"], "id");
        var oneResult = treeResultAll.value.filter(function (evt) {
          if (evt["pid"] != "-1" && evt["pid"] != "1") {
            if ($.inArray(evt["pid"], ListCode) > -1) {
              return true;
            }
            else {
              return false;
            }
          }
          else {
            return false;
          }
        })
        // var subResult = oneResult.filter(function (evt) {
        //   return evt["online"] == "1";
        // })
        // strJson[num]["name"] = strJson[num]["name"] + "（" + subResult.length + "/" + oneResult.length + "）"

      }

    }
  }

  treeResult.value = strJson.filter(function (evt) {
    return SetNull(evt["children"]) != "";
  });
}
function handleNodeClick(evt) {
  var item = evt;
  if (SetNull(item["children"]) == "") {
    var strParam = {};
    strParam["stcd"] = item["channels"];
    if (SetNull(item["lgtd"]) == "" && SetNull(item["lttd"]) == "") {
    } else {
      let _lgtd = Number(item["lgtd"]);
      let _lttd = Number(item["lttd"]);
      
    }
  }
}
// 站点
function stcdChanged(e) {
  Weacontent();
}
</script>
<style src="@/assets/styles/Table.css"></style>
<style scoped>
im
.wqtitle {
  /* display: flex; */
  margin: 0px 10px;
  color: var(--title2);
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-bottom: 1px solid var(--wqtitleline);
  position: relative;
}

.el-tree {
  /* background: var(--el-fill-color-blank);*/
  color: var(--el-tree-text-colornew);
}
:deep(.el-tree .el-text){
  color: var(--el-tree-text-colornew);
}
:deep(.el-tree-node__content:hover) {
  background: none !important;/*var(--popupContentTitleColor);*/
  color: #fff;
}

:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background: none !important;/*var(--popupContentTitleColor);*/
  color: #fff;
}

.tableWQDIV::-webkit-scrollbar {
  width: 2px;
  /* 设置滚动条宽度 */
}

.tableWQDIV::-webkit-scrollbar-thumb {
  /* 滚动条手柄 */
  width: 10px;
  height: 10px;
  position: absolute;
  right: -4px;
  top: 0px;
  background: var(--mtabletrcolor);
  z-index: 2;
}

.textbox {
  background: none;
  border: var(--portalborder);
  padding-left: 6px;
  padding-right: 6px;
  height: 26px;
  border-radius: 4px;
  margin-left: -1px;
  color: #fff;
  /* color: var(--widgetcolor); */
}

.textbox:fous-visible {
  background: var(--portal) !important;
  border: var(--portalborder) !important;
  color: var(--widgetcolor);
}

/* :deep(.el-tree-node .el-tree-node__children){
  color: white;
} */
:deep(.el-tree-node .el-tree-node__children .el-tree-node__children) {
  color: var(--title2);
}

:deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}
</style>
