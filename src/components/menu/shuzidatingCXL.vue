<template>
   <!-- 侧边栏 -->
    <aside class="aside">
        <tabToggleZT />
    </aside>
    <div class="g-lside">
        <div style="width: 100%">
            <EchartZXSL :strJsonData="tableData" :sid="Drpswiper" :key="datekeyAllZXSL" />
        </div>

        <div style="width: 100%">
            <EchartCXLGC :strJsonData="tableData" :sid="Drpswiper" :key="datekeyAll"/>
        </div>

        <div style="width: 100%">
            <EchartCXLGX :strJsonData="tableData" :sid="Drpswiper" :key="datekeyAll"/>
        </div>
        
    </div>

    <!-- 右侧 -->
    <div class="g-rside">
        <div style="width: 100%">
            <TableSPXSL :strJsonData="tableData" :key="datekeyAll" />
        </div>
        <div style="width: 100%">
            <TableCXL :strJsonData="tableData" :sid="Drpswiper" :key="datekeyAll"/>
        </div>        
    </div>

    <!-- 片区选择面板（底部居中） -->
    <div class="area-selector-bar" :class="{ 'is-open': panelOpen }">
        <div class="area-trigger" @click.stop="panelOpen = !panelOpen">
            <svg viewBox="0 0 24 24" fill="#14a3a8"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span class="area-trigger-text">{{ currentAreaName }}</span>
            <span class="area-trigger-arrow">▼</span>
        </div>
        <Transition name="panel">
            <div v-if="panelOpen" class="area-panel" @click.stop>
            <div class="area-panel-grid">
                <div
                    v-for="area in areaList"
                    :key="area.id"
                    class="area-panel-item"
                    :class="{ 'is-active': Drpswiper === area.id }"
                    @click="selectArea(area.id)"
                >{{ area.name }}</div>
            </div>
        </div>
        </Transition>
    </div>
    <!-- 点击外部关闭 -->
    <div v-if="panelOpen" class="area-overlay" @click="panelOpen = false"></div>
</template>

<script setup>
    import tabToggleZT from "@/components/tab/tabToggleZT.vue";
    import EchartZXSL from "@/components/menu/cxl/EchartZXSL.vue";
    import TableSPXSL from "@/components/menu/cxl/TableSPXSL.vue";
    import EchartCXLGC from "@/components/menu/cxl/EchartCXLGC.vue";

    import TableCXL from "@/components/menu/cxl/TableCXL.vue";


    import EchartCXLGX from "@/components/menu/cxl/EchartCXLGX.vue";

    import { ref, reactive, computed, onMounted, provide, inject, defineAsyncComponent, onUnmounted, h } from "vue";
    import { dyCenter, destroy, globallevel, globalalign, map, labels, setLayerToolTip, addAreaLineQS, removeEntityByName } from "@/utils/ArcGis/MapComm.js";

    import * as PointMark from "@/utils/ArcGis/PointMark.js";
    import { SetNull, groupBy, sortObjectArray } from "@/api/ComUnit.js";
    import apimode from "@/api/mode/index.js";
    import dayjs from "dayjs";

    import SHSLPArea from "@/assets/json/四片2000.json";

    const datekeyAll = ref(null);
    const datekeyAllZXSL=ref(null);

    const Drpswiper = ref("81653");

    // 片区列表（未来扩展只需在此追加）
    const areaList = ref([
        { id: "81653", name: "嘉宝北片", mc: "嘉宝北片" },
        { id: "81651", name: "淀北片",   mc: "淀北片" },
        { id: "81652", name: "蕰南片",   mc: "蕰南片" },
        { id: "81654", name: "青松片",   mc: "青松片" },
        { id: "81650", name: "苏州河",   mc: "" },
    ]);

    const panelOpen = ref(false);
    const currentAreaName = computed(() => {
        var found = areaList.value.find(function (a) { return a.id === Drpswiper.value; });
        return found ? found.name : "选择片区";
    });

    function selectArea(id) {
        Drpswiper.value = id;
        panelOpen.value = false;
        datekeyAll.value = new Date();
        var area = areaList.value.find(function (a) { return a.id === id; });
        if (area && area.mc) {
            PointMark.highlightXSLabel(area.mc);
        }
    }

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
        var idStr = areaList.value.map(function(a){ return a.id; }).join(",");
        var now = new Date();
        var etime = dayjs(now).add(0, "hour").format("YYYY-MM-DD HH:00:00");
        var stime = dayjs(dayjs(now).format("YYYY-MM-DD HH:00:00"))
            .add(-12, "hour")
            .format("YYYY-MM-DD HH:00:00");
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
                setTimeout(function () {
                    PointMark.highlightXSLabel("嘉宝北片");
                }, 500);

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
        PointMark.addXSLMarkNew(resSualt, true);
    }

    function parentMethodshowDynamicLayer(id) {
        Drpswiper.value = id;
        datekeyAll.value = new Date();
    }
</script>

<style scoped>
/* ===== 片区选择面板（底部居中） ===== */
.area-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
}
.area-selector-bar {
    position: fixed;
    bottom: 1.2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 101;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
}
.area-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(180deg, rgba(5,28,50,0.95), rgba(2,12,25,0.97));
    border: 1px solid rgba(0,180,210,0.35);
    border-radius: 6px;
    padding: 8px 22px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0,160,180,0.15);
    user-select: none;
    white-space: nowrap;
}
.area-trigger svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
}
.area-trigger-text {
    font-size: 14px;
    color: #b2ebf2;
    font-family: 'Microsoft YaHei', sans-serif;
}
.area-trigger-arrow {
    font-size: 10px;
    color: #4fc3f7;
    transition: transform 0.2s;
}
.area-selector-bar.is-open .area-trigger-arrow {
    transform: rotate(180deg);
}
.area-selector-bar.is-open .area-trigger {
    border-color: rgba(0,200,220,0.5);
    box-shadow: 0 0 25px rgba(0,180,210,0.25);
}

/* 展开/收起动画 */
.panel-enter-active {
    transition: all 0.2s ease-out;
}
.panel-leave-active {
    transition: all 0.15s ease-in;
}
.panel-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.panel-leave-to {
    opacity: 0;
    transform: translateY(4px);
}

/* 展开面板 */
.area-panel {
    margin-bottom: 8px;
    background: linear-gradient(180deg, rgba(3,20,40,0.98), rgba(2,8,20,0.99));
    border: 1px solid rgba(0,200,220,0.4);
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(0,160,200,0.1);
    max-width: 420px;
}
.area-panel-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
}

/* 选项 */
.area-panel-item {
    background: rgba(255,255,255,0.03);
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 7px 10px;
    text-align: center;
    color: #8899aa;
    font-size: 13px;
    font-family: 'Microsoft YaHei', sans-serif;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.area-panel-item:hover {
    background: rgba(0,180,210,0.08);
    border-color: rgba(0,180,210,0.2);
    color: #b0bec5;
}
.area-panel-item.is-active {
    background: rgba(0,180,210,0.15);
    border-color: #14a3a8;
    color: #b2ebf2;
}
</style>