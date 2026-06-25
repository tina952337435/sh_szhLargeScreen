<template>
  <div class="station-list-dialog">
    <div class="m-box">
      <div class="txt">
        <customTable
          :headers="tableHeaders"
          :rows="tableData"
          class="m-table FirstTable"
          :border="0"
          :cellspacing="0"
          :cellpadding="0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import customTable from "@/components/Table/customTable.vue";
import { SetNull } from "@/api/ComUnit";
import dayjs from "dayjs";

const props = defineProps({
  stationList: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: "cj", // "cj" 超警, "cb" 超保
  },
});

const tableHeaders = computed(() => {
  if (props.type === "cj") {
    return [
      { name: "index", label: "序号" },
      { name: "stnm", label: "站名" },
      // { name: "stcd", label: "站码" },
      { name: "upz", label: "水位(m)" },
      { name: "wrz", label: "警戒水位(m)" },
      { name: "cjVal", label: "超警幅度(m)" },
      { name: "tm", label: "时间" },
    ];
  } else if (props.type === "cb") {
    return [
      { name: "index", label: "序号" },
      { name: "stnm", label: "站名" },
      // { name: "stcd", label: "站码" },
      { name: "upz", label: "水位(m)" },
      { name: "grz", label: "保证水位(m)" },
      { name: "cbVal", label: "超保幅度(m)" },
      { name: "tm", label: "时间" },
    ];
  } else if (props.type === "qc") {
    return [
      { name: "index", label: "序号" },
      { name: "stnm", label: "站名" },
      // { name: "stcd", label: "站码" },
      { name: "upz", label: "水位(m)" },
      { name: "wrz", label: "警戒水位(m)" },
      { name: "grz", label: "保证水位(m)" },
      { name: "tm", label: "时间" },
    ];
  } else {
    // zc 正常
    return [
      { name: "index", label: "序号" },
      { name: "stnm", label: "站名" },
      // { name: "stcd", label: "站码" },
      { name: "upz", label: "水位(m)" },
      { name: "wrz", label: "警戒水位(m)" },
      { name: "grz", label: "保证水位(m)" },
      { name: "tm", label: "时间" },
    ];
  }
});

const tableData = ref([]);

function buildTableData() {
  const list = props.stationList || [];
  // 排序逻辑
  const sorted = [...list].sort((a, b) => {
    const upzA = SetNull(a.upz) !== "" ? Number(a.upz) : -9999;
    const upzB = SetNull(b.upz) !== "" ? Number(b.upz) : -9999;
    if (props.type === "cj") {
      const wrzA = Number(a.wrz) === 0 || a.wrz === "—" ? 99 : Number(a.wrz);
      const wrzB = Number(b.wrz) === 0 || b.wrz === "—" ? 99 : Number(b.wrz);
      return upzB - wrzB - (upzA - wrzA);
    } else if (props.type === "cb") {
      const grzA = Number(a.grz) === 0 || a.grz === "—" ? 99 : Number(a.grz);
      const grzB = Number(b.grz) === 0 || b.grz === "—" ? 99 : Number(b.grz);
      return upzB - grzB - (upzA - grzA);
    } else if (props.type === "qc") {
      // 缺测：按站名排序
      const stnmA = SetNull(a.stnm) || "";
      const stnmB = SetNull(b.stnm) || "";
      return stnmA.localeCompare(stnmB);
    } else {
      // zc 正常：按水位从高到低排序
      return upzB - upzA;
    }
  });

  tableData.value = sorted.map((item, idx) => {
    const upz = SetNull(item.upz) !== "" ? Number(item.upz).toFixed(2) : "—";
    const wrz =
      Number(item.wrz) === 0 || item.wrz === "—"
        ? "—"
        : Number(item.wrz).toFixed(2);
    const grz =
      Number(item.grz) === 0 || item.grz === "—"
        ? "—"
        : Number(item.grz).toFixed(2);
    const tm =
      item.tm != null ? dayjs(item.tm).format("YYYY-MM-DD HH:mm") : "—";

    let colorCss = "";
    if (props.type === "cj" && wrz !== "—" && upz !== "—") {
      const diff = Number(Number(upz) - Number(wrz)).toFixed(2);
      if (Number(diff) > 0) colorCss = "#F9C33D";
    }
    if (props.type === "cb" && grz !== "—" && upz !== "—") {
      const diff = Number(Number(upz) - Number(grz)).toFixed(2);
      if (Number(diff) > 0) colorCss = "#F70019";
    }

    return {
      index: idx + 1,
      stnm: SetNull(item.stnm).replaceAll(" ", ""),
      stcd: SetNull(item.stcd),
      upz: upz,
      wrz: wrz,
      grz: grz,
      cjVal:
        wrz !== "—" && upz !== "—"
          ? Number(Number(upz) - Number(wrz)).toFixed(2)
          : "—",
      cbVal:
        grz !== "—" && upz !== "—"
          ? Number(Number(upz) - Number(grz)).toFixed(2)
          : "—",
      tm: tm,
      colorCss: colorCss,
    };
  });
}

onMounted(() => {
  buildTableData();
});
</script>

<style scoped>
@import "@/assets/styles/Table.css";

.station-list-dialog {
  width: 100%;
  height: 580px;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
}

.txt {
  width: 100%;
  height: 100% !important;
}

/* 自定义滚动条样式 */
.station-list-dialog::-webkit-scrollbar {
  width: 4px;
}

.station-list-dialog::-webkit-scrollbar-thumb {
  background: var(--mtabletrcolor);
  border-radius: 2px;
}
.m-box{
  width: 100%;
  height: 100%;
}
</style>
