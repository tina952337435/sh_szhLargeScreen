<template>
   <!-- 侧边栏 -->
    <aside class="aside">
        <tabToggleZT />
    </aside>

    <!-- 全市汇总（参考GQ运行情况：地图左上悬浮列表） -->
    <div class="city-summary">
        <div class="summary-box">
            <div class="summary-title">
                <!-- <span class="summary-num">1</span> -->
                全市
                <span class="summary-info">
                    <svg viewBox="0 0 16 16" class="info-icon"><circle cx="8" cy="8" r="7" fill="none" stroke="#14a3a8" stroke-width="1.3"/><rect x="7.2" y="4" width="1.6" height="5" rx="0.8" fill="#14a3a8"/><rect x="7.2" y="10.6" width="1.6" height="1.6" rx="0.8" fill="#14a3a8"/></svg>
                    <div class="info-tooltip">
                        <div class="info-item"><b>蓄量</b>：当前蓄量</div>
                        <div class="info-item"><b>余量</b>：当前水位距保证水位可调蓄量</div>
                        <div class="info-item"><b>纳雨量</b>：24h最大纳雨能力</div>
                        <div class="info-formula">纳雨量 = (总余量 + 排涝能力÷100) ÷ (总面积 × 径流系数) × 1000</div>
                    </div>
                </span>
            </div>
            <div class="summary-row">蓄量<span class="summary-val">{{ citySummary.xsl }}<span class="summary-unit">百万m³</span></span></div>
            <div class="summary-row">余量<span class="summary-val">{{ citySummary.bxsl }}<span class="summary-unit">百万m³</span></span></div>
            <div class="summary-row">纳雨量<span class="summary-val">{{ citySummary.bzNyl }}<span class="summary-unit">mm</span></span></div>
        </div>
    </div>

    <div class="g-lside">
        <div style="width: 100%">
            <EchartZXSL :strJsonData="tableData" :sid="Drpswiper" :areaName="currentAreaName" :key="datekeyAllZXSL" />
        </div>

        <div style="width: 100%">
            <EchartCXLGC :strJsonData="modelTableData" :sid="Drpswiper" :areaName="currentAreaName" :key="datekeyModel"/>
        </div>

        <div style="width: 100%">
            <EchartCXLGX :strJsonData="tableData" :sid="Drpswiper" :areaName="currentAreaName" :key="datekeyAll"/>
        </div>
        
    </div>

    <!-- 右侧 -->
    <div class="g-rside">
        <div style="width: 100%">
            <TableSPXSL :strJsonData="tableData" :key="datekeyAll" />
        </div>
        <div style="width: 100%">
            <TableCXL :strJsonData="tableData" :sid="currentSid" :areaName="currentAreaName" :key="datekeyModel"/>
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

    <!-- 模型/实测 切换（时间条上方居中） -->
    <div class="tm-mode-toggle">
        <span :class="['tm-mode-item', { 'is-active': tmMode === 'model' }]" @click="switchTmMode('model')">模型</span>
        <span :class="['tm-mode-item', { 'is-active': tmMode === 'shice' }]" @click="switchTmMode('shice')">实测</span>
    </div>
    <div id="tmCenter" class="tmCenter">{{ tmCenter }}</div>
</template>

<script setup>
    import tabToggleZT from "@/components/tab/tabToggleZT.vue";
    import EchartZXSL from "@/components/menu/cxl/EchartZXSL.vue";
    import TableSPXSL from "@/components/menu/cxl/TableSPXSL.vue";
    import EchartCXLGC from "@/components/menu/cxl/EchartCXLGC.vue";

    import TableCXL from "@/components/menu/cxl/TableCXL.vue";


    import EchartCXLGX from "@/components/menu/cxl/EchartCXLGX.vue";

    import { ref, reactive, computed, onMounted, provide, inject, defineAsyncComponent, onUnmounted, h } from "vue";
    import { setZOOM, dyCenter, destroy, globallevel, globalalign, map, labels, setLayerToolTip, addAreaLineQS, removeEntityByName } from "@/utils/ArcGis/MapComm.js";

    import * as PointMark from "@/utils/ArcGis/PointMark.js";
    import { SetNull, groupBy, sortObjectArray } from "@/api/ComUnit.js";
    import apimode from "@/api/mode/index.js";
    import dayjs from "dayjs";

    const datekeyAll = ref(null);
    const datekeyAllZXSL=ref(null);
    const datekeyModel = ref(null);   // 模型数据专用 key（切换实测时不变化）

    const Drpswiper = ref("81653");

    
    const tmCenter = ref(null);
    const tmMode = ref('model'); // 'model' 模型（默认） / 'shice' 实测
    function switchTmMode(mode) {
        if (tmMode.value === mode) return;
        tmMode.value = mode;
        loadXsl(); // 切换后按对应接口重新拉取数据
    }

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

    // 片区名 -> 老接口片区站码（供出入水量/关系曲线等旧接口使用）
    const sidMap = {
        "嘉宝北片": "81653",
        "淀北片": "81651",
        "蕰南片": "81652",
        "青松片": "81654",
        "苏州河": "81650",
        "吴淞江-苏州河": "81650"
    };
    const currentSid = computed(() => sidMap[Drpswiper.value] || Drpswiper.value);

    function selectArea(id) {
        Drpswiper.value = id;
        panelOpen.value = false;
        datekeyAll.value = new Date();
        datekeyModel.value = new Date();
        var area = areaList.value.find(function (a) { return a.id === id; });
        if (area && area.mc) {
            PointMark.highlightXSLabel(area.mc);
        }
        // 定位到片区中心
        var row = tableData.value.find(function (e) { return e.slpName === id; });
        if (row && row.lgtd != null && row.lttd != null) {
            setZOOM(11);
            setTimeout(function () {
                dyCenter(row.lgtd, row.lttd);
            }, 200);
        }
    }

    onMounted(() => {
        setTimeout(function () {
            addAreaLineQS();
            clearALL();
            loadXsl();
            PointMark.addWaterDistrictMark(""); // 叠加全部水利片区边界
        }, 10)
        $("#tabcxl").addClass("swDivSelect swDiv");
        $("#swDivMoreUL ul #tabcxl").css("color", "var(--swDivSelectcolor)");
        $("#m_shikZT").addClass("z-crtitem z-crt wow slideInUp link-item");
    });
    onUnmounted(() => {
        PointMark.removeRiverDistrictLayers(); // 切路由时清掉水利片区图层
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
        // 正式时间：结束=当前整点，开始=结束前24小时
        var now = dayjs();
        var etime = now.format("YYYY-MM-DD HH:00:00");
        var stime = now.add(-24, "hour").format("YYYY-MM-DD HH:00:00");
        var strParam = {
            stime: stime,
            etime: etime,
            typhoonCode: "2613"
        };

        window.loadingShow();
        // 模型走 SWZZ_CSXSL/query，实测走 SWZZ_SLP_FORECAST/query（都带 stime/etime 时间参数）
        var api = tmMode.value === 'shice' ? apimode.findResultSlpForecast : apimode.findResultCxl;
        api(strParam)
            .then((res) => {
                allData.value = res.data || [];
                // 没有水位、面积为空、或算不出纳雨量的片区先不展示
                tableData.value = allData.value.filter(function (e) {
                    return e.sw != null && e.area != null && e.bzNyl != null;
                });
                // 模型数据单独存一份供 EchartCXLGC 用；实测时不更新它，保证过程曲线/出入水量不刷新
                if (tmMode.value === 'model') {
                    modelTableData.value = tableData.value;
                    datekeyModel.value = new Date();
                }
                buildAreaList();
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
    const allData = ref([]);
    const modelTableData = ref([]);  // 模型数据（EchartCXLGC 始终用模型）
    // 全市汇总：蓄量 / 余量 / 纳雨量（口径同 CaoXuLiang.html 的“全市合计”）
    const citySummary = computed(() => {
        var xsl = 0, bxsl = 0, area = 0, plnl = 0, jlxs2 = null;
        allData.value.forEach(function (e) {
            if (e.xsl != null) xsl += Number(e.xsl);
            if (e.bxsl != null) bxsl += Number(e.bxsl);
            if (e.area != null) area += Number(e.area);
            if (e.plnl != null) plnl += Number(e.plnl);
            if (jlxs2 == null && e.jlxs2 != null) jlxs2 = Number(e.jlxs2);
        });
        // 全市纳雨量(mm) = (Σ剩余库容 + Σ排涝能力/100) ÷ (Σ面积 × 径流系数) × 1000，径流系数取第一个非空片区
        var bzNyl = 0;
        if (area > 0 && jlxs2 != null && jlxs2 !== 0) {
            bzNyl = (bxsl + plnl / 100) / (area * jlxs2) * 1000;
        }
        return {
            xsl: xsl.toFixed(1),
            bxsl: bxsl.toFixed(1),
            bzNyl: bzNyl.toFixed(1)
        };
    });
    // 用接口返回的片区重建选择面板（只保留有水位数据的片区）
    function buildAreaList() {
        var list = tableData.value.map(function (e) {
            return { id: e.slpName, name: e.slpName, mc: e.slpName };
        });
        areaList.value = list;
        var has = list.some(function (a) { return a.id === Drpswiper.value; });
        if (!has) {
            var jbb = list.find(function (a) { return a.id === "嘉宝北片"; });
            Drpswiper.value = jbb ? "嘉宝北片" : (list.length ? list[0].id : "");
        }
    }
    const addXSLMap = () => {
        var resSualt=[];
        tableData.value.forEach(function (e) {
            if (e.lgtd == null || e.lttd == null) {
                return;
            }
            
            tmCenter.value = dayjs(new Date(e.swTm)).format("YYYY-M-D HH:mm");
            resSualt.push({
                MC: e.slpName,
                lgtd: e.lgtd,
                lttd: e.lttd,
                sl: (e.xsl != null) ? parseFloat(e.xsl).toFixed(1) : "—",
                ssl: (e.bxsl != null) ? parseFloat(e.bxsl).toFixed(1) : "—",
                drp: e.bzNyl,
                z: (e.sw != null) ? e.sw : "—"
            });
        });
        PointMark.addXSLMarkNew(resSualt, true);
    }

    function parentMethodshowDynamicLayer(id) {
        Drpswiper.value = id;
        datekeyAll.value = new Date();
    }
</script>

<style scoped>
/* ===== 模型/实测 切换（时间条上方居中） ===== */
.tm-mode-toggle {
    position: fixed;
    top: 150px;
    left: 29rem;
    z-index: 120;
    display: flex;
    align-items: center;
    padding: 3px;
    background: rgba(5, 28, 50, 0.92);
    border: 1px solid rgba(0, 180, 210, 0.35);
    border-radius: 18px;
    box-shadow: 0 0 16px rgba(0, 160, 180, 0.15);
}
.tm-mode-item {
    padding: 6px 20px;
    font-size: 18px;
    color: #8899aa;
    border-radius: 20px;
    cursor: pointer;
    user-select: none;
    transition: all 0.15s;
    font-family: 'Microsoft YaHei', sans-serif;
}
.tm-mode-item.is-active {
    background: linear-gradient(180deg, rgba(0, 180, 210, 0.35), rgba(0, 140, 170, 0.35));
    color: #b2ebf2;
    box-shadow: 0 0 8px rgba(0, 200, 220, 0.4);
}

/* ===== 全市汇总（地图左上悬浮列表） ===== */
.city-summary {
    position: fixed;
    top: calc(12.5rem);
    left: 29rem;
    z-index: 120;
    pointer-events: none;
}
.summary-box {
    width: 170px;
    background: linear-gradient(180deg, rgba(5, 28, 50, 0.95), rgba(2, 12, 25, 0.97));
    /* border: 1px solid rgba(0, 180, 210, 0.35); */
    border-radius: 10px;
    padding: 10px 14px 12px;
    box-shadow: 0 0 20px rgba(0, 160, 180, 0.15);
}
.summary-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    color: #b2ebf2;
    margin-bottom: 6px;
    font-family: 'Microsoft YaHei', sans-serif;
}
.summary-info {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    margin-left: auto;
}
.info-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}
.info-tooltip {
    position: absolute;
    top: 26px;
    left: 0;
    width: 320px;
    background: rgba(2, 12, 25, 0.98);
    border: 1px solid rgba(0, 180, 210, 0.35);
    border-radius: 6px;
    padding: 12px 14px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
    display: none;
    z-index: 200;
    color: #d5eef2;
    font-size: 15px;
    font-weight: normal;
    line-height: 1.7;
    text-align: left;
}
.summary-info:hover .info-tooltip {
    display: block;
}
.info-item b {
    color: #4fc3f7;
    font-weight: 600;
}
.info-formula {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px dashed rgba(0, 180, 210, 0.3);
    color: #aab7c4;
    font-family: 'Consolas', monospace;
    font-size: 13px;
}
.summary-num {
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    text-align: center;
    background: rgba(0, 180, 210, 0.3);
    color: #14a3a8;
    font-size: 14px;
    flex-shrink: 0;
}
.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    line-height: 32px;
    font-size: 15px;
    color: #8899aa;
    font-family: 'Microsoft YaHei', sans-serif;
}
.summary-val {
    color: #42F700;
    font-family: 'Consolas', monospace;
    font-size: 17px;
}
.summary-unit {
    color: #546e7a;
    font-size: 12px;
    margin-left: 3px;
    font-weight: 400;
}

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