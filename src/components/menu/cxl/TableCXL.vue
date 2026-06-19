<template>
    <div class="m-box m-box-1" style="position: relative">
        <div class="title display_flex justify-content_flex-start align-items_center leftTop-radius layout_title px-2" style="height:0px;border-bottom:0px;">
        </div>
        <div class="txt" style="height:calc(calc(100vh - 9.125rem)*(4 / 6));">
            <div style="height: 220px; width: 96%; margin-bottom: 5px; width: 100%">
                <div>
                    <div class="wqtitle title layout_title px-2  leftTop-radius" style="background: none;margin-top:0px;">
                        <div class="d1"></div>
                        <div class="d2"></div>
                            <p class="base-p1" id="title2" style="vertical-align: 4px;">预测蓄量</p>
                        <div>
                    </div>
                </div>
                <div style="width: 100%; height: 180px" class="two-list" id="SSXQList">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
                            <div class="text-sm text-purple-300">期初蓄量</div>
                            <div class="text-xl" @click="bootJY('jy')">
                                {{ycXSLStart}}
                                <span class="danwei"> 百万方 </span>
                                <!-- <span class="text-orange-400">-13.15%</span> -->
                            </div>
                        </div>
                        <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
                            <div class="text-sm text-purple-300">期末蓄量</div>
                            <div class="text-xl" @click="bootJY('csl')">
                                {{ycXSLEnd}}
                                <span class="danwei"> 百万方 </span>
                            </div>
                        </div>
                        <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
                            <div class="text-sm text-purple-300">期初水位</div>
                            <div class="text-xl">2.69 
                                <span class="danwei"> m </span>
                            </div>
                        </div>
                        <div class="bg-purple-900 bg-opacity-30 p-3 rounded-lg">
                            <div class="text-sm text-purple-300">期末水位</div>
                            <div class="text-xl">2.63
                                <span class="danwei"> m </span>
                                <!-- <span class="text-green-400">+128.07%</span> -->
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="tableWQ" style="height: calc(100% - 230px); width: 98%;">
                <!-- <div class="wqtitle">圩区信息</div> -->
                <div class="wqtitle title layout_title px-2  leftTop-radius" style="background: none;margin-top:0px;">
                <div class="d1"></div>
                <div class="d2"></div>
                <p class="base-p1" id="title2">出入水量</p>
                </div>
                <div class="tableWQDIV" style="height: calc(100% - 40px); width: 100%; overflow-y: auto">
                <Table :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table wq-table" :border="0"
                    :cellspacing="0" :cellpadding="0" @click="handleclick" />
                </div>
            </div>
        </div>
        <div class="bot leftBottom-radius"></div>
    </div>
</template>


<script setup>    
    import '@/assets/styles/Table.css';
    import { ref, reactive, onMounted, provide, inject, defineAsyncComponent, onUnmounted, h } from "vue";
    
    import { sortObjectArray, groupBy, SumJson, SetNull } from "@/api/ComUnit.js";
    import Table from "@/components/Table/Table.vue";
    import apimode from "@/api/mode/index.js";

    const props = defineProps({
        sid: { type: String,default:"" },
    });

    const tableHeaders = ref(null);
    const tableData = ref();
    tableHeaders.value = [
        { name: "stnm", label: "名称" },
        { name: "accpw", label: "入水量" },
        { name: "accdw", label: "出水量" },
        { name: "jsl", label: "净水量" },
    ];
    const idStr=ref("");
    const zhanDian=ref([]);
    const zhanDianData=ref([]);
    const ycXSLStart=ref(0);
    const ycXSLEnd=ref(0);
    onMounted(() => {
        if(SetNull(props.sid)!=""){
            loadZhanDian();
            loadZhanDianData();
        }
    });

    function loadZhanDian(){
        var strParam = {
            pattem:"24,25",
        };
        apimode.loadjisuanzhanData(strParam)
            .then((res) => {
                zhanDian.value=res.data;
                idStr.value= zhanDian.value.map(item => item.id).join(',')+",81650,81651,81652,81653,81654";
                // alert(idStr.value);
                // console.error(zhanDian.value);
                loadZhanDianData();
            })
            .catch((err) => {
                console.error(err);
            });
    }
    function loadZhanDianData(){
        var strParam = {
            stcd:idStr.value
        };        
        apimode.findResultBDMSPREDICT(strParam)
            .then((res) => {
                zhanDianData.value=res.data;
                bindData();
            })
            .catch((err) => {
                console.error(err);
            });
    }
    function bindData(){
        var dataTempXSL=zhanDianData.value.filter(function (res) {
            return res.stcd== props.sid&& res.data_TYPE == "15";//蓄量
        });
        // alert(dataTempXSL.length);
        console.error(dataTempXSL);
        ycXSLStart.value=dataTempXSL.length>0?Number(dataTempXSL[0].data):0;
        ycXSLEnd.value=dataTempXSL.length>0?Number(dataTempXSL[dataTempXSL.length-1].data):0;

        var dataTemp = zhanDianData.value.filter(function (res) {
            return idStr.value.indexOf(res.stcd) > -1 && res.data_TYPE == "24";//入流
        });

        var dataTemp = zhanDianData.value.filter(function (res) {
            return idStr.value.indexOf(res.stcd) > -1 && res.data_TYPE == "24";//入流
        });
        // console.error('zhanDianData.value',zhanDianData.value);
        var totalRSL = SumJson(dataTemp, 'data');
        totalRSL = totalRSL * 0.36;//流量转水量，万方

        dataTemp = zhanDianData.value.filter(function (res) {
            return idStr.value.indexOf(res.stcd) > -1 && res.data_TYPE == "25";//出流
        });
        var totalCSL = SumJson(dataTemp, 'data');
        totalCSL = totalCSL * 0.36;//流量转水量，万方

        dataTemp = zhanDianData.value.filter(function (res) {
            return res.stcd == "81346";//嘉宝北片降雨产流
        });
        // console.error(dataTemp);
        var totalJYCL = SumJson(dataTemp, 'data');
        totalJYCL = Math.abs(totalJYCL) * 0.36;//流量转水量，万方

        var data=[];
        var jsl=Number(totalRSL)-Number(totalCSL);
        data.push({stnm:"累计",accpw:totalRSL.toFixed(1),accdw: totalCSL.toFixed(1),jsl:jsl.toFixed(1)});

        var jbbpNameArr = [
    "浦东片闵行区",
    "浦东片奉贤区",
    "浦东片浦东新区",
    "浦南西片",
    "太南片",
    "太北片",
    "青松片青浦区",
    "青松片松江区",
    "淀南片",
    "淀北片",
    "商榻片",
    "嘉宝北片",
    "蕴南片",
    "浦南东片"
];
        for (var num = 0; num < jbbpNameArr.length; num++) {
            var totalCSL = 0;
            var totalRSL = 0;
            var jsl=0;
            var name = jbbpNameArr[num];
            var zhanDianTemp = zhanDian.value.filter(function (res) {
                return res.name.indexOf(name) > -1 && res.type == "24";
            });
            var stcd =SetNull(zhanDianTemp[0].stcd)==""?zhanDianTemp[0].id:zhanDianTemp[0].stcd;
            var zhanDianDataTemp = zhanDianData.value.filter(function (res) {
                return res.stcd == stcd;
            });
            totalRSL = SumJson(zhanDianDataTemp, 'data');
            totalRSL = totalRSL * 0.36;//流量转水量，万方

            zhanDianTemp = zhanDian.value.filter(function (res) {
                 return res.name.indexOf(name) > -1 && res.type == "25";
            });
            stcd =SetNull( zhanDianTemp[0].stcd)==""?zhanDianTemp[0].id:zhanDianTemp[0].stcd;
            zhanDianDataTemp = zhanDianData.value.filter(function (res) {
                return res.stcd == stcd;
            });
            totalCSL = SumJson(zhanDianDataTemp, 'data');
            totalCSL = totalCSL * 0.36;//流量转水量，万方    

            jsl=Number(totalRSL)-Number(totalCSL);

            var center=[];
            if(name=="沿长江"){
                center = [121.425514, 31.458566];
            }
            else if(name=="沿浦东片"){
                center = [121.524556,31.22897];
            }
            else if(name=="沿浏河"){
                center = [121.201153, 31.471097];
            }
            else if(name=="沿太北太南片"){
                 center = [121.103014, 30.902706];
            }
            data.push({ 
                stnm: name, 
                accpw: totalRSL.toFixed(1), 
                accdw: totalCSL.toFixed(1), 
                jsl: jsl.toFixed(1),
                lgtd:center[0],
                lttd:center[1]
            });  
        }
        data.push({ stnm: "降雨产流", jsl: totalJYCL.toFixed(1)});
        tableData.value=data;
        // emit("parentMethods", tableData.value);
    }
    // const emit = defineEmits(['opencurrentComponentTanchu', 'parentMethods']);
</script>
<style scoped>
.grid {
    display: grid;
    padding:15px 25px;
;
}
.grid-cols-2 {
    grid-template-columns: repeat(2,minmax(0,1fr))
}
.gap-4 {
    gap: 0.85rem
}
.rounded-lg {
    border-radius: .5rem
}
.bg-blue-900 {
    --tw-bg-opacity: 1;
    background-color: rgba(30, 58, 138, var(--tw-bg-opacity));
}
.bg-opacity-30 {
    --tw-bg-opacity: 0.3;
}
.p-3 {
    padding:0.6rem .75rem
}
.text-sm {
    font-size: .875rem;
    line-height: 1.10rem;
}
.text-blue-300 {
    --tw-text-opacity: 1;
    color: rgba(147, 197, 253,var(--tw-text-opacity));
}
.text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
    /* color:white; */
    color: var(--titled1);
    cursor:pointer;
}
.font-bold {
    font-weight: 700;
}
.mt-1 {
    margin-top: .25rem;
}
.text-xs {
    font-size: .80rem;
    line-height: 1rem;
    color:white;
}
.text-green-400{
    font-size: .80rem;
    line-height: 1rem;
    color:#77F10A;
    padding-left:10px;
}
.text-orange-400{
    font-size: .80rem;
    line-height: 1rem;
    color:#FFA200;
    padding-left:10px;
}
.bg-green-900 {
    background-color: rgba(6, 78, 59, 0.3);
}
.bg-yellow-900 {
    background-color: rgba(120, 53, 15,0.3);
}
.bg-purple-900 {
    background-color: rgba(76, 29, 149,0);
    background-image: url(/images/zb_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.text-green-300 {
    color: rgba(110, 231, 183,1);
}
.text-yellow-300 {
    --tw-text-opacity: 1;
    color: rgba(252, 211, 77, var(--tw-text-opacity));
}
.text-purple-300 {
    --tw-text-opacity: 1;
    /* color: rgba(196, 181, 253, var(--tw-text-opacity)); */
    color: var(--mtablecolor);
}
.danwei{
     color: var(--mtablecolor);
     font-size:.875rem;
}
</style>