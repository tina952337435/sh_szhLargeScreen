<template>
  <div class="tableDiv" style="height:630px;width:100%;">
    <customTable :headers="tableHeaders" :rows="tableData" :key="datekey" class="m-table wqgq-table" :border="0"
      :cellspacing="0" :cellpadding="0" @click="handleclick" />
  </div>
</template>

<script setup>
import $ from "jquery";
import customTable from "@/components/Table/customTable.vue";
import { ref, onMounted, defineAsyncComponent, inject, h } from "vue";
import { ElInput, ElTable, ElTableColumn } from "element-plus";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import { SetNull, groupBy } from "@/api/ComUnit.js";
import Dialog from "@/api/utils/Dialog.js";

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
const datekey = ref(null);

var props = inject("props");
const tableData = ref([]);
console.error('props', props);
const tableHeaders = ref([
  { name: "index", label: "序号" },
  { name: "stnm", label: "名称" },
  { name: "imageUrls", label: "闸门/泵站" },
  { name: "plsjpum", label: "设计流量" },
  { name: "q", label: "实时流量" },
  { name: "tm", label: "时间" },
]);
onMounted(() => {
  Weacontent();
});

function Weacontent() {
  var nowTM = new Date();
  var etime = dayjs(nowTM).format("YYYY-MM-DD HH:mm:ss");
  var stime = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  if (Number(dayjs(nowTM).format("HH")) > 7) {
    stime = dayjs(nowTM).format("YYYY-MM-DD 08:00:00");
  }
  else {
    stime = dayjs(dayjs(nowTM).format("YYYY-MM-DD 08:00:00"))
      .add(-24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  var strParam = {};
  strParam["pid"] = "2025041114281595968";
  strParam["pathname"] = "NEW";
  strParam["stime"] = stime;
  strParam["etime"] = etime;
  api
    .stPptnGQTable(strParam)
    .then((res) => {
      var strJson = groupBy(res.result, "stnm");
      var result = [];
      for (var num = 0; num < strJson.length; num++) {
        var item = strJson[num];
        var stnm = item[0].stnm;
        var gtqTotal = 0;
        var stcdzm = "", stcdbz = "", mtype = "", flpqNum = 0, grqNum = 0;
        var flow = SetNull(item[0].flow) == "" ? "-" : Number(item[0].flow).toFixed(2);

        if (item[0].stcd = "320508000001") {
          item[0].flow = 20
        } else if (item[0].stcd = "320508000005") {
          item[0].flow = 1
        }
        if (item[0].stGateR != undefined) {
          var tm = dayjs(item[0].stGateR[0].tm).format('MM-DD HH:mm')
        } else {
          var tm = "—"
        }
        for (var i = 0; i < item.length; i++) {
          var stateHtml = [], imgUrl = "";
          var bzdataALL = item.filter(function (e) {
            return e.mtype == "泵站";
          });
          flpqNum = bzdataALL.length;
          var zmdataALL = item.filter(function (e) {
            return e.mtype == "闸站";
          });
          grqNum = zmdataALL.length;
          if (bzdataALL.length > 0) {
            var bzdataNUM = bzdataALL[0].num;
            if (bzdataALL[0].stGateR != undefined) {
              bzdataNUM = bzdataALL[0].stGateR.length;
            }
            for (var i = 0; i < bzdataNUM; i++) {
              if (bzdataALL[0].stGateR != undefined) {
                var bzdata = bzdataALL[0].stGateR;
                if (bzdata[i] != undefined) {
                  stcdbz = bzdata[0].stcd;
                  if (Number(bzdata[i].gtq) > 0) {
                    imgUrl = "/images/gqgc/bz_open.png";
                    if (_theme == "BlueTheme") {
                      imgUrl = "/images/gqgc/bz_green.png";
                    }
                    if (bzdataALL[0].stcd = "320508000001") {
                      bzdata[i].insflow = 5
                    } else if (bzdataALL[0].stcd = "320508000005") {
                      bzdata[i].insflow = 1
                    }
                    if (SetNull(bzdata[i].insflow) != "") {
                      gtqTotal += Number(bzdata[i].insflow);
                    }
                  } else {
                    imgUrl = "/images/gqgc/bz_close.png";
                    if (_theme == "BlueTheme") {
                      imgUrl = "/images/gqgc/bz_gray.png";
                    }
                  }
                }
              } else {
                imgUrl = "/images/gqgc/bz_close.png";
                if (_theme == "BlueTheme") {
                  imgUrl = "/images/gqgc/bz_gray.png";
                }
              }
              stateHtml.push(imgUrl);
            }
          }
          if (zmdataALL.length > 0) {
            var zmdataBUM = zmdataALL[0].num;
            if (zmdataALL[0].stGateR != undefined) {
              zmdataBUM = zmdataALL[0].stGateR.length;
            }
            for (var i = 0; i < zmdataBUM; i++) {
              if (zmdataALL[0].stGateR != undefined) {
                var zmdata = zmdataALL[0].stGateR;
                if (zmdata[i] != undefined) {
                  stcdzm = zmdata[0].stcd;
                  if (Number(zmdata[i].gtq) > 0) {
                    imgUrl = "/images/gqgc/sz_open.png";
                    if (_theme == "BlueTheme") {
                      imgUrl = "/images/gqgc/sz_green.png";
                    }
                  } else {
                    imgUrl = "/images/gqgc/sz_close.png";
                    if (_theme == "BlueTheme") {
                      imgUrl = "/images/gqgc/sz_gray.png";
                    }
                  }
                }
              } else {
                imgUrl = "/images/gqgc/sz_close.png";
                if (_theme == "BlueTheme") {
                  imgUrl = "/images/gqgc/sz_gray.png";
                }
              }
              stateHtml.push(imgUrl);
            }

          }
        }
        if (stateHtml.length == 0) {
          stateHtml = "—"
        }


        var _strParam = {};
        _strParam["index"] = num + 1;
        _strParam["stnm"] = stnm;
        _strParam["imageUrls"] = stateHtml;
        _strParam["tm"] = tm;
        _strParam["plsjpum"] = flow;
        _strParam["q"] = gtqTotal;
        _strParam["stime"] = stime;
        _strParam["etime"] = etime;
        _strParam["stcdbz"] = stcdbz;
        _strParam["stcdzm"] = stcdzm;
        _strParam["flpq"] = flpqNum;
        _strParam["grq"] = grqNum;
        _strParam["stcd"] = item[0].stcd;
        _strParam["lgtd"] = item[0].lgtd;
        _strParam["lttd"] = item[0].lttd;
        result.push(_strParam);

        tableData.value = result;
        // result.push({ stnm: stnm, imageUrls: stateHtml, tm: tm, });
        // tableData.value = result;
      }
    })
    .catch((err) => { });

}
function handleclick(evt) {
  const _rowindex = evt.target.className;
  const item = tableData.value[_rowindex];
  console.error(item)


  const ChildVue = defineAsyncComponent(() =>
    import("@/components/danzhan/gq/DanZHanSelBin.vue")
  );
  const props = {};
  props["stcd"] = item["stcd"]
  props["stnm"] = SetNull(item["stnm"]).replaceAll(" ", "");
  props["stcdzm"] = item["stcdzm"]
  props["stcdbz"] = item["stcdbz"]
  props["mtype"] = item["mtype"]
  props["stime"] = item["stime"]
  props["etime"] = item["etime"]
  props["flpq"] = item["flpq"]
  props["grq"] = item["grq"]
  //ChildVue为弹窗中嵌入的slot
  Dialog.open({ title: item["stnm"] + "工情监视", widh: 1400, heig: 800 }, h(ChildVue, props)).then(() => { console.log('弹窗关闭了') })
}
</script>
<style src="@/assets/styles/style.css"></style>
<style src="@/assets/styles/Table.css"></style>

<style scoped>
:deep(.el-table) {
  background-color: var(--el-table-bg-colornew);
  border-bottom: 0px;
}

:deep(.el-table th.el-table__cell) {
  background-color: var(--el-table-tr-bg-colornew);
}

:deep(.el-table tr) {
  background-color: var(--el-table-tr-bg-colornew);
  display: revert;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  border-bottom: 0px;
}

:deep(.el-table td.el-table__cell) {
  border-bottom: 0px;
}

:deep(.el-table th.el-table__cell.is-leaf) {
  border-bottom: 0px;
  font-size: 1rem;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background: none;
}

:deep(.el-table tr:nth-child(even)) {
  background: var(--mtabletrcolorgc);
}

:deep(.el-input__wrapper) {
  background-color: var(--el-inputbg);
  box-shadow: 0 0 0 0 rgba(0, 163, 255, 0.6) !important;
  border: 1px solid var(--el-inputbox-shadow);
}

:deep(.el-input__inner) {
  color: var(--conter-nayulabel) !important;
}

.div-swiper {
  line-height: 26px;
  margin: 0 auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
  position: relative;
  width: 25%;
  height: 1.875rem;
  font-size: 0.875rem;
  color: var(--mtablethcolor);
  white-space: nowrap;
  line-height: 2rem;
  text-align: center;
  cursor: pointer;
  background: var(--swiperSlide) no-repeat top center;
  background-size: 100% 1.875rem;
  display: inline-block;
  font-family: arial, "Hiragino Sans GB";
}

.swiper-slide-thumb-active {
  font-size: 0.875rem;
  /* color: var(--mtablethcolor); */
  color: #ffffff;
  background: var(--swiperSlideActive) no-repeat top center;
  background-size: 100% 1.875rem;
}

.dialog .div-swiper {
  line-height: 34px;
  margin: 0 auto;
  max-width: 60%;
}

:deep(.el-button) {
  background-color: var(--popContentHeadbg);
  border-color: var(--popContentHeadbg);
  color: #fff;
}
</style>