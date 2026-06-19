<template>
    <Table
    :headers="tableHeaders"
    :rows="tableData"
    :key="datekey"
    class="tableYQ"
    :border="0"
    :cellspacing="0"
    :cellpadding="0"
    @click="handleclick"
  />
</template>

<script setup>
import Table from "@/components/Table/Table.vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import { SetNull, groupBy, Getmtype, sortObjectArray } from "@/api/ComUnit.js";
import Dialog from "@/api/utils/Dialog.js";
import { ref, onMounted, reactive, inject,defineAsyncComponent,h } from "vue";
const stime = ref({});
const etime = ref({});
const tableData = ref();
const props = defineProps({
  strJsonData: {
    type: String,
    default: "",
  },
});

const datekey = ref(null);
const tableHeaders = [
  { name: "num", label: "序号" },
  { name: "stnm", label: "站名" },
  { name: "wndv", label: "风速(m³/s)" },
  { name: "wnddir", label: "风向" },
  { name: "wndpwr", label: "风力" },
];
onMounted(() => {
  if (props.strJsonData != undefined) {
    Weacontent();
  }
});
function Weacontent() {    
    for(var num=0;num<props.strJsonData.length;num++){
        props.strJsonData[num].num=(num+1);
        props.strJsonData[num].wndpwr=props.strJsonData[num].wndpwr+"级";
    }
    tableData.value=props.strJsonData;
}

function handleclick(evt) {
  var nowTM = new Date();
  etime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss"))
      .add(1, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  stime.value = dayjs(dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");

  const name = evt.target.innerText;
  const strJson = tableData.value.find(item => item.stnm === name);
  if(strJson==undefined){
    return;
  }
  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/sq/DanZHanSel.vue")
  );
  const strWhere = {};
  strWhere["stcd"] = strJson["stcd"];
  strWhere["stime"] = stime.value;
  strWhere["etime"] = etime.value;
  strWhere["mtype"] = strJson["mtype"];
  strWhere["type"]="风场过程";
  //ChildVue为弹窗中嵌入的slot
  Dialog.open({ title: strJson["stnm"], widh: 1500, heig: 700 }, h(ChildVue, strWhere)).then(() => { console.log('弹窗关闭了') })

}
</script>