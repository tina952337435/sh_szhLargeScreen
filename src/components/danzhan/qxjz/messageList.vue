<template>
    <!-- <div style="color: var(--widgetcolor);" id="inputlist" @click="handleClick">
    </div> -->
    <div style="color: var(--mtablecolor);">
        &nbsp;<input type="checkbox" id="Employ0" @click="GetAllCheck('Employ_', 'all');" name="Depart_id"
            class="all" />&nbsp;全选/取消全选
        <el-button type="primary" style="position:absolute; right:50%;margin-right:-42px" @click="onOK()">确认选择</el-button>
    </div>
    <div class="mini-fit" style="margin-top:1px;height:100%">
        <div id="checklist" style="height:100%;">
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { ElButton } from "element-plus";
import api from "@/api/zonglan/index.js";
import $ from "jquery";

const phoneList = ref(null);
const danweiData = ref([]);
const tableData = ref([])
const props = defineProps({
    closeLineDialog: Function  //这里的closeLineDialog对应父页面中的 **:closeLineDialog**
});
// 获取当前主题
const _theme = localStorage.getItem("curTheme");

onMounted(() => {
    if (_theme == "default") {
        $(".dialog").css("background", "#031426");
    }
    Weacontent();
});
function Weacontent() {
    var strParam = {};
    strParam["pid"] = "";
    api.Addressbook(strParam).then((res) => {
        var name = "";
        danweiData.value = res.result;
        var strJson = res.result;
        if (danweiData.value.length > 0) {
            var danweiLIST = danweiData.value.filter(function (e) {
                return e.pid == -1;
            })

            var Person_list = " <table class=\"table table-bordered table-striped\" width=100%>";
            if (danweiLIST.length > 0) {
                for (var num = 0; num < danweiLIST.length; num++) {
                    var strResult = danweiLIST[num];
                    var ID = strResult.id;
                    var tempJson = strJson.filter(function (e) {
                        return e.pid == ID;
                    });
                    var PathName = "SPHONE"
                    if (tempJson.length > 0) {
                        Person_list += "<thead><tr> <th style=\" text-align: left\"><input type=checkbox id=\"Depart_" + num + "\" @click=\"GetAllCheck( 'Employ_" + num + "_'," + strResult.id + ");\" name=Depart_id value=\"" + strResult.name + "\">&nbsp;" + strResult.name + "</th></tr>";
                        Person_list += "<tbody><tr>";
                        Person_list += "<td>";
                        Person_list += "<table width=98% border=0>";
                        Person_list += "<tr>";
                        var ct = 0;
                        for (var II = 0; II < tempJson.length; II++) {
                            var tempResult = tempJson[II];
                            if (II % 7 != 0) {
                                Person_list += "<td width='14%' style='line-height:30px;color: var(--mtablecolor);'>";
                                if (PathName == "emp") {
                                    Person_list += " <input id=\"Employ_" + num + "_" + II + "\" type=checkbox name=employee_id value=\"" + tempResult.name + "\">&nbsp;" + tempResult.name + "";
                                } else {
                                    Person_list += " <input id=\"Employ_" + num + "_" + II + "\" type=checkbox name=employee_id value=\"" + tempResult.mobile + ":" + tempResult.name + "\">&nbsp;" + tempResult.name + "";
                                }
                                Person_list += "</td>";

                                ct++;
                            }
                            else {
                                ct = 0;
                                Person_list += "</tr><tr>";
                                Person_list += "<td width='14%' style='line-height:30px;color: var(--mtablecolor);'>";
                                if (PathName == "emp") {
                                    Person_list += " <input id=\"Employ_" + num + "_" + II + "\" type=checkbox name=employee_id value=\"" + tempResult.name + "\">&nbsp;" + tempResult.name + "";
                                } else {
                                    Person_list += " <input id=\"Employ_" + num + "_" + II + "\" type=checkbox name=employee_id value=\"" + tempResult.mobile + ":" + tempResult.name + "\">&nbsp;" + tempResult.name + "";
                                }
                                Person_list += "</td>";
                            }
                        }
                        if (ct < 6 && ct > 0) {
                            for (var j = ct; j < 6; j++) {
                                Person_list += "<td width='14%' style='line-height:30px;color: var(--mtablecolor);'>&nbsp;</td>";
                            }
                        }

                        Person_list += "</tr> ";
                        Person_list += " </table>";
                        Person_list += "</td>";
                        Person_list += " </tr>";
                        Person_list += "</tbody> ";
                    }

                }
            }

            Person_list += " </table>";
            $("#checklist").html(Person_list)
        }
    }).catch((err) => { });

}
function GetAllCheck(s_str, obj) {
    if (obj == "all") {
        tableData.value = danweiData.value.filter(function (e) {
            return e.pid != -1;
        })
        var layerID = "";
        var items = document.getElementsByTagName("input");
        var s_tmp = "";

        for (var i = 0; i < items.length; i++) {
            s_tmp = items[i].name;
            if (s_tmp.indexOf("checkDanwei") > -1) {
                if (items[i].type == "checkbox" && items[i].checked) {
                    layerID += items[i].value + ",";
                }
            }
        }
        if (layerID.length > 0) {
            tableData.value = danweiData.value.filter(function (e) {
                return layerID.includes(e.pid) == true;
            })
        }
    } else {
        var layerID = "";
        var items = document.getElementsByTagName("input");
        var s_tmp = "";

        for (var i = 0; i < items.length; i++) {
            s_tmp = items[i].name;
            if (s_tmp.indexOf("checkDanwei") > -1) {
                if (items[i].type == "checkbox" && items[i].checked) {
                    layerID += items[i].value + ",";
                }
            }
        }
        if (layerID.length > 0) {
            tableData.value = danweiData.value.filter(function (e) {
                return layerID.includes(e.pid) == true;
            })
        }
    }
    // var items = document.getElementsByTagName("input");
    // var i_flag = 0;
    // var s_tmp = "";
    // var i_bool = false;

    // for (var i = 0; i < items.length; i++) {
    //     s_tmp = items[i].id;
    //     if (s_tmp.indexOf(s_str) > -1) {
    //         if (items[i].type == "checkbox") {
    //             items[i].checked = obj.checked;
    //         }
    //     }
    // }
    // GetData()
}
function GetData() {
    var items = document.getElementsByTagName("input")
    var phone = "";
    var i_flag = 0;
    var s_tmp = "";
    var i_bool = false;

    for (var i = 0; i < items.length; i++) {
        s_tmp = items[i].id;

        if (s_tmp.indexOf("Employ_") > -1) {
            if (items[i].type == "checkbox" && items[i].checked) {
                phone += items[i].value + ",";
            }
        }
    }
    if (phone.length > 0) {
        phone = phone.substr(0, phone.length - 1);
    }
    console.error(phone)
    return phone;
}
//表格筛选
function doSelectChange(evt) {
    var InputList = evt
    var phonedata = "";
    if (InputList.length > 0) {
        for (var num = 0; num < InputList.length; num++) {
            phonedata += InputList[num].name + ":" + InputList[num].mobile + ","
        }
        phoneList.value = phonedata;
    }
}
function onOK() {
    //  请关闭弹框
    props.closeLineDialog();
}

//这里需要暴露出去不然父组件调用不到这个方法
defineExpose({ phoneList })
</script>

<style src="@/assets/styles/qxjz.css"></style>
<style scoped>
.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
}

table.table {
    clear: both;
    margin-bottom: 6px !important;
    max-width: none !important;
    border-spacing: 0;
    border-collapse: collapse;
    background-color: transparent;
}

.table-bordered {
    border: 1px solid #EBEBEB;
}

thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
}

.table-bordered tr th,
.table-bordered tr td,
.table-bordered tbody tr td {
    border: 0px;
}

.table-bordered tr td {
    padding: 8px;
}
</style>
