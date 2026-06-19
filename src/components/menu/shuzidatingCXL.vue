<template>
   <!-- 侧边栏 -->
    <aside class="aside">
        <tabToggleZT />
    </aside>
    <div class="g-lside">
        <div style="wistrresulth: 100%">
            <EchartZXSL :strJsonData="tableData" :key="datekeyAllZXSL" @parentMethodshowDynamicLayers="parentMethodshowDynamicLayer"/>
        </div>    
        
        <div style="wistrresulth: 100%">
            <EchartCXLGC :strJsonData="tableData" :sid="Drpswiper" :key="datekeyAll"/>
        </div> 

        <div style="wistrresulth: 100%">
            <TableSPXSL :strJsonData="tableData" :key="datekeyAll" />
        </div>
    </div>

    <!-- 右侧 -->
    <div class="g-rside">    
        <div style="wistrresulth: 100%">            
            <TableCXL :strJsonData="tableData" :sid="Drpswiper" :key="datekeyAll"/>
        </div>
        <div style="wistrresulth: 100%">
            <EchartCXLGX :strJsonData="tableData" :sid="Drpswiper" :key="datekeyAll"/>
        </div> 
    </div>
</template>

<script setup>    
    import tabToggleZT from "@/components/tab/tabToggleZT.vue";
    import EchartZXSL from "@/components/menu/cxl/EchartZXSL.vue";
    import TableSPXSL from "@/components/menu/cxl/TableSPXSL.vue";
    import EchartCXLGC from "@/components/menu/cxl/EchartCXLGC.vue"; 

    import TableCXL from "@/components/menu/cxl/TableCXL.vue";

    
    import EchartCXLGX from "@/components/menu/cxl/EchartCXLGX.vue"; 

    import { ref, reactive, onMounted, provide, inject, defineAsyncComponent, onUnmounted, h } from "vue";
    import { dyCenter, destroy, globallevel, globalalign, map, labels, setLayerToolTip, addAreaLineQS, removeEntityByName } from "@/utils/ArcGis/MapComm.js";

    import * as PointMark from "@/utils/ArcGis/PointMark.js";
    import { SetNull, groupBy, sortObjectArray } from "@/api/ComUnit.js";
    import apimode from "@/api/mode/index.js";
    import dayjs from "dayjs";
    
    import SHSLPArea from "@/assets/json/四片2000.json";

    const datekeyAll = ref(null);
    const datekeyAllZXSL=ref(null);

    
    const Drpswiper = ref("81653");

    onMounted(() => {
        setTimeout(function () {
            addAreaLineQS();
            clearALL();
            loadXsl();
        }, 10)
        $("#tabcxl").addClass("swDivSelect swDiv");  
        $("#swDivMoreUL ul #tabcxl").css("color", "var(--swDivSelectcolor)");
        $("#m_shikZT").addClass("z-crtitem z-crt wow slideInUp link-item");
    });
    function clearALL() {
        try {
            removeEntityByName();
        } catch (ex) {
            console.error("clearALL",ex.Message);
        }
    }
    //蓄水量
    function loadXsl(){
        var idStr="81650,81651,81652,81653,81654";
        var now = new Date();
        var etime = dayjs(now).add(0, "hour").format("YYYY-MM-DD HH:mm:ss");
        var stime = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
            .add(-24, "hour")
            .format("YYYY-MM-DD HH:mm:ss");
        var strParam = {
            startdate: stime,
            enddate: etime,
            pid: idStr
        };

        // strParam.startdate = "2025-05-03 14:00:00";
        // strParam.enddate = "2025-05-04 14:00:00";

        window.loadingShow();
        apimode
            .findResultModeXSL(strParam)
            .then((res) => {
                tableData.value = res.data;                
                addXSLMap();

                datekeyAll.value = new Date();
                datekeyAllZXSL.value = new Date();

                window.loadingHide();
            })
            .catch((err) => {
                console.error(err);
        });
    }
    const tableData = ref([]);
    const addXSLMap = () => {
        var resSualt=[];
        var features = SHSLPArea.features;
        features.forEach(function (feature) {
            var properties = feature.properties;
            var mc=properties.MC;
            var temp=tableData.value.filter(function(e){
                return e.name.replace("槽蓄容量", "")==mc;
            });
            // console.error('temp',temp);
            if(temp.length>0){
                properties.sl=temp[temp.length-1].xsl.toFixed(1);
                properties.ssl=parseFloat(temp[temp.length-1].bxsl).toFixed(1);
                properties.drp=temp[temp.length-1].yl;
                properties.z=temp[temp.length-1].upz;
                resSualt.push(properties);
            }
        });
        PointMark.addXSLMark(resSualt, true);
    }

    function parentMethodshowDynamicLayer(id) { 
        // alert(id);
        Drpswiper.value=id;
        datekeyAll.value = new Date();
    }
</script>