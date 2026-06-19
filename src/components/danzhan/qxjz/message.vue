<template>
    <div style="width:100%;height: 100%;padding: 0px 0px 20px 0px;margin: 0px; overflow: hidden;">
        <div style="display: inline-block;width:20%;height: 100%;overflow-y: auto;border: 1px solid var(--portal);margin-right: 10px;"
            class="tree">
            <el-tree ref="treeRef" :data="Phomedata" show-checkbox node-key="id" :default-expanded-keys="['2025011700002']"
                :props="defaultProps" @check="handleNodeClick" />
        </div>
        <div style="width:76%;display: inline-block;height: 100%;">
            <table cellspacing='0' cellpadding='0' border='0' class="table1" style="height: 100%;">
                <tr>

                    <td class="lie1" align="right" colspan="1">
                        发送到
                    </td>
                    <td class="lie2" colspan="3">
                        <textarea
                            style="float: left;font-size: 14px;color: var(--widgetcolor);background:transparent;border: 1px solid var(--portal);"
                            cols="126" rows="14" id="PHONE" name="PHONE"></textarea>
                    </td>

                </tr>
                <tr>
                    <td class="lie1" align="right">
                        内容
                    </td>
                    <td class="lie2">
                        <textarea
                            style="float: left;font-size: 14px;color: var(--widgetcolor);;background:transparent;border: 1px solid var(--portal);"
                            cols="126" rows="14" id="SMSTXT" name="SMSTXT"></textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" class="lie2" align="center" style="text-align:center;height:50px;line-height:50px; ">
                        <el-button type="primary"
                            style="margin-left: 20px;background:#0cdc0c !important;border-color: #0cdc0c;"
                            @click="send()">发送</el-button>
                        <el-button type="primary" style="margin-left: 20px" @click="reset()">重置</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script setup>
import MyDialog from "@/components/ComDialog.vue";
import messageList from "@/components/danzhan/qxjz/messageList.vue";
import { ref, onMounted, inject, nextTick } from "vue";
import { ElButton, ElTree,ElMessage } from "element-plus";
import dayjs from "dayjs";
import api from "@/api/zonglan/index.js";
import $ from "jquery";
import { SetNull } from "@/api/ComUnit";

const typeValue = inject("typeValue");
const typeValueM = inject("typeValueM");
const ALLmyPHONE = ref("");
const myPHONE = ref("");
const defaultExpandedKeys = ref([]);

const Phomedata = ref([]);
const defaultProps = {
    children: 'children',
    label: 'name',
}
const props = defineProps({
    closeLineDialogM: Function  //这里的closeLineDialog对应父页面中的 **:closeLineDialog**
});
// 获取当前主题
const _theme = localStorage.getItem("curTheme");

onMounted(() => {
    if (SetNull(inject("ALLmyPHONE")) != "") {
        ALLmyPHONE.value = inject("ALLmyPHONE").value;
    }
    if (SetNull(inject("myPHONE")) != "") {
        myPHONE.value = inject("myPHONE").value;
    }
    getPeople();
    if (_theme == "default") {
        $(".dialog").css("background", "#031426");
    }
    // console.error(typeValue.value.head + ":" + typeValue.value.contact)
    if (SetNull(typeValue.value) != "") {
        if (SetNull(typeValue.value.contact) != "") {
            if (containsNumber(typeValue.value.contact)) {
                if ((typeValue.value.contact).includes("/")) {
                    var telePhone = (typeValue.value.contact).split('/');
                    if (SetNull(telePhone[0]) != "") {
                        $("#PHONE").html(telePhone[0] + ":" + telePhone[1]);
                    } else {
                        ElMessage.error("缺少责任人")
                    }
                } else if ((typeValue.value.contact).includes("-")) {
                    var telePhone = divideByNumbers(typeValue.value.contact);
                    if (SetNull(telePhone[0]).trim() != "") {
                        $("#PHONE").html((telePhone[0]).trim() + ":" + telePhone[1] + telePhone[2] + telePhone[3]);
                    } else {
                        ElMessage.error("缺少责任人")
                    }
                } else {
                    var telePhone = divideByNumbers(typeValue.value.contact);
                    if (SetNull(telePhone[0]).trim() != "") {
                        $("#PHONE").html((telePhone[0]).trim() + ":" + telePhone[1]);
                    } else {
                        ElMessage.error("缺少责任人")
                    }
                }
            }
        }
        if (SetNull(typeValue.value.head) != "") {
            // console.error("head", typeValue.value)
            if (containsNumber(typeValue.value.head)) {
                if ((typeValue.value.head).includes("/")) {
                    var telePhone = (typeValue.value.head).split('/');
                    if (SetNull(telePhone[0]) != "") {
                        $("#PHONE").html(telePhone[0] + ":" + telePhone[1]);
                    } else {
                        ElMessage.error("缺少联系人")
                    }
                } else if ((typeValue.value.head).includes("-")) {
                    var telePhone = divideByNumbers(typeValue.value.head);
                    if (SetNull(telePhone[0]).trim() != "") {
                        $("#PHONE").html((telePhone[0]).trim() + ":" + telePhone[1] + telePhone[2] + telePhone[3]);
                    } else {
                        ElMessage.error("缺少联系人")
                    }
                } else {
                    var telePhone = divideByNumbers(typeValue.value.head);
                    if (SetNull(telePhone[0]).trim() != "") {
                        $("#PHONE").html((telePhone[0]).trim() + ":" + telePhone[1]);
                    } else {
                        ElMessage.error("缺少联系人")
                    }
                }
            }
            else {
                $("#PHONE").html(typeValue.value.head + ":" + typeValue.value.contact);
            }
            // Weacontent();
        }
        if (SetNull(typeValue.value.note) != "") {
            $("#SMSTXT").html(typeValue.value.note);
        }
    }
    if (SetNull(typeValueM) != "") {
        $("#PHONE").html(typeValueM.value.datasource);
        $("#SMSTXT").html(typeValueM.value.note);
    }
    if (SetNull(myPHONE.value) != "") {
        $("#PHONE").html(myPHONE.value);
    } else if (SetNull(ALLmyPHONE.value) != "") {
        $("#PHONE").html(ALLmyPHONE.value);
    }
});

// 如何判断字符串是否包含数字
function containsNumber(str) {
    return /\d/.test(str);
}

// 如何根据字符串存在数字进行划分
function divideByNumbers(str) {
    // 使用正则表达式匹配数字和非数字
    const pattern = /\d+|\D+/g;
    // 使用exec方法找到所有匹配
    let match;
    const result = [];
    while ((match = pattern.exec(str))) {
        result.push(match[0]);
    }
    return result;
}

function getPeople() {
    var strParam = {};
    strParam["pid"] = "";
    api.Addressbook(strParam).then((res) => {
        var strJson = res.result;
        if (strJson.length > 0) {
            const mergedData = transData(strJson, 'id', 'pid', 'children');
            Phomedata.value = mergedData;
        }
    }).catch((err) => { });
}

function transData(jsonArr, idStr, pidStr, childrenStr) {
    // 存放的最终结果树数组
    const result = [];
    const id = idStr;
    const pid = pidStr;
    const children = childrenStr;
    const len = jsonArr.length;

    // 遍历得到以id为键名的对象(建立整棵树的索引)
    const hash = {};
    jsonArr.forEach(item => {
        hash[item[id]] = item;
    });
    // console.error("jsonArr",jsonArr);
    // console.error('hash',hash);
    for (let j = 0; j < len; j++) {
        const jsonArrItem = jsonArr[j];
        const hashItem = hash[jsonArrItem[pid]];
        if (hashItem) {
            // console.error('hashItem',hashItem);
            // 如果当前项还没有children属性，则添加该属性并设置为空数组
            !hashItem[children] && (hashItem[children] = []);
            hashItem[children].push(jsonArrItem);
        } else {
            result.push(jsonArrItem);
        }
    }
    console.error(result)
    return result;
};
function send() {
    // 获取发送内容
    var strExp = document.getElementsByName("SMSTXT")[0].value;
    // 获取发送人员
    var datasource = document.getElementsByName("PHONE")[0].value;
    var strParam = {};
    strParam["pathname"] = "短信通知";
    strParam["key"] = "管理员";
    strParam["strExp"] = strExp;
    strParam["datasource"] = datasource;
    api
        .MessageSMSSend(strParam)
        .then((res) => {
            // if (res.result.success == "true") {
                ElMessage.success("短信发送成功");
                nextTick(() => {
                    if (SetNull(typeValueM) != "") {
                        props.closeLineDialogM();
                    }
                })
            // }
        })
        .catch((err) => { });
}
const treeRef = ref(null);
const phoneList = ref([]);
function handleNodeClick() {
    // 在这里处理点击事件
    var phonedata = "";
    const checkedNodes = treeRef.value.getCheckedNodes();
    if (checkedNodes.length > 0) {
        var data = checkedNodes.filter(function (e) {
            return e.pid != "-1";
        });
        if (data.length > 0) {
            for (var num = 0; num < data.length; num++) {
                if (SetNull(data[num].mobile) != '') {
                    phonedata += data[num].name + ":" + data[num].mobile + ","
                }
            }
        }
    }
    phoneList.value = phonedata;
    $("#PHONE").html(phonedata);
};

// 重置
function reset() {
    document.getElementById("PHONE").value = "";
    document.getElementById("SMSTXT").value = "";
}
</script>

<style src="@/assets/styles/qxjz.css"></style>
<style scoped>
:deep(.el-button) {
    background-color: var(--popContentHeadbg);
    border-color: var(--popContentHeadbg);
    color: #fff;
}

:deep(textarea:focus-visible) {
    outline: 1px solid var(--swDivSelectcolor);
}

.lie1 {
    min-width: 100px;
}

textarea::-webkit-scrollbar {
    width: 6px;
    /* 设置滚动条宽度 */
}

textarea::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    border: 30%;
    background: var(--mtabletrcolor);
    z-index: 2;
}

:deep(.el-tree-node__label) {
    color: var(--mtablecolor);
}



:deep(.el-tree-node__content) {
    height: auto;
}

:deep(.el-tree-node) {
    outline: none;
    white-space: normal;
    height: auto;
}

:deep(.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content) {
    background-color: transparent;
}

:deep(.el-tree .el-tree-node .el-tree-node__content:hover) {
    background-color: transparent;
}

:deep(.el-tree-node:focus>.el-tree-node__content) {
    background-color: transparent;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: var(--popupContentTitlebg);
    border-color: var(--popupContentTitlebg);
}

.tree::-webkit-scrollbar {
    width: 6px;
    /* 设置滚动条宽度 */
}

.tree::-webkit-scrollbar-thumb::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    border: 30%;
    background: var(--mtabletrcolor);
    z-index: 2;
}
</style>
