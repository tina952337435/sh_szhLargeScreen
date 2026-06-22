<template>
    <div class="boxdiv">
        <div class="box" v-for="(item,index) in tableData" :key="item.id">
			<div class="tit">{{index+1}}、{{item["wqnm"]}}</div>
			<div class="boxnav" style="height: auto;">
                <table class="table2" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <th style="width: 8%;">圩区站点水位</th>
                        <th style="width: 14%;">圩区站点规则</th>
                        <th style="width: 8%;">圩内站点水位</th>
                        <th style="width: 14%;">圩内站点规则</th> 
                        <th style="width: 8%;">堤防安全水位差</th> 
                        <th style="width: 14%;">堤防安全水位差规则</th> 
                        <th style="width: 14%;">调度措施</th> 
                    </tr>
                    <tr>
                        <td><div class="text-c">{{item["upz"]}}</div></td>
                        <td><div class="text-c">{{item["notew"]}}</div></td>
                        <td><div class="text-c">{{item["dwz"]}}</div></td>
                        <td><div class="text-c">{{item["noten"]}}</div></td>
                        <td><div class="text-c">{{item["cha"]}}</div></td>
                        <td><div class="text-c">{{item["chanote"]}}</div></td>
                        <td><div class="text-c">{{item["nt"]}}</div></td>
                    </tr>
                    
                </tbody>
                </table>
			</div>
        </div>
    </div>

</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from "@/api/zonglan/index.js";
import { sortObjectArray } from '@/api/ComUnit';

const tableData = ref([]);
const props = defineProps({
    planid: {
        type: String,
        default: ""
    },
    typeid: {
        type: String,
        default: "YB"
    }
});
onMounted(() => {
  Weacontent();
});
function Weacontent(){
    var strParam = {"pid":props.planid,"datasource":props.typeid,"strExp":"true"};
    console.error("strParam", strParam);
    api.wqbaseddgz(strParam).then(res => {
      console.error("res", res);
      tableData.value=sortObjectArray(res.result,["orderbyid"],"asc");
    })

}
</script>
<style>
.boxdiv{
    width: 100%;
    height: 100%; 
    overflow-y: auto;
} 
.text-c{
    text-align: center;
}
.box {
    border: 1px solid rgba(7, 118, 181, .5);
    box-shadow: inset 0 0 10px rgba(7,118,181,.4);
    margin-bottom: 12px;
    position: relative;
    color: white;
}
.box:before {
    top: -1px;
}
.tit {
    padding: 10px 10px 10px 25px;
    border-bottom: 1px solid rgba(7, 118, 181, .7);
    font-size: 16px;
    font-weight: 500;
    position: relative;
}
.tit:after, .box:before {
    width: 100%;
    height: 1px;
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    background: linear-gradient(to right, #076ead, #4ba6e0, #076ead);
    box-shadow: 0 0 5px rgba(131,189,227,1);
    opacity: .6;
}
.tit:before, .tit01:before {
    position: absolute;
    content: "";
    width: 6px;
    height: 6px;
    background: rgba(22, 214, 255, .9);
    box-shadow: 0 0 5px rgba(22,214,255,.9);
    border-radius: 10px;
    left: 10px;
    top: 18px;
}

.tit:after, .box:before {
    width: 100%;
    height: 1px;
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    background: linear-gradient(to right, #076ead, #4ba6e0, #076ead);
    box-shadow: 0 0 5px rgba(131,189,227,1);
    opacity: .6;
}
.boxnav {
    padding: 10px;
}
</style>