<style scoped>
.progressTime {
  height: 50px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  /* background-color: rgba(0, 0, 0, 0.7); */
  background: transparent;
  min-width: 500px;
  border-radius: 3px;
  user-select: none;
}

.progressTime .progressTime-left {
  width: 48px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.progressTime .progressTime-left .progressTime-left-t {
  /* height: 18px; */
  background-color: transparent;
  position: relative;
}

.progressTime .progressTime-left .progressTime-left-t .progressTime-left-now {
  height: 18px;
  line-height: 18px;
  width: 80%;
  position: absolute;
  top: 2px;
  right: 10%;
  bottom: 0;
  left: 10%;
  margin: auto;
  border-radius: 5px;
  background-color: #18b9ff;
  text-align: center;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}

.progressTime .progressTime-left .progressTime-left-t .progressTime-left-now:hover {
  background-color: #40cae2;
}

.progressTime .progressTime-left .progressTime-left-b {
  flex: 1;
  position: relative;
}

.progressTime .progressTime-left .progressTime-left-b .progressTime-left-b-start {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border: 6px solid;
  border-color: #fff #fff transparent transparent;
  transform: rotate(45deg);
  margin-left: -9px;
  margin-top: -6px;
  cursor: pointer;
}

.progressTime .progressTime-left .progressTime-left-b .progressTime-left-b-start.stop {
  width: 16px;
  height: 12px;
  border: none;
  transform: rotate(0deg);
  cursor: pointer;
  margin-left: 0px;
}

.progressTime .progressTime-left .progressTime-left-b .progressTime-left-b-start.stop::before {
  content: "";
  position: absolute;
  width: 4px;
  height: 12px;
  margin-left: -4px;
  background-color: #fff;
}

.progressTime .progressTime-left .progressTime-left-b .progressTime-left-b-start.stop::after {
  content: "";
  position: absolute;
  width: 4px;
  height: 12px;
  background-color: #fff;
  margin-left: 3px;
}

.progressTime-center {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.progressTime-center .progressTime-center-t {
  height: 8px;
  background-color: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}

.progressTime-center .progressTime-center-t .progressTime-center-t-bar {
  background-image: linear-gradient(to right,
      rgba(37, 208, 150, 1),
      rgba(45, 182, 205, 1));
  height: 100%;
  background-image: linear-gradient(to right,
      var(--mtabletrcolor),
      var(--popupContentTitleColor));
}

.progressTime-center .progressTime-center-t .progressTime-center-t-tooltip,
.progressTime-center .progressTime-center-t .progressTime-center-t-tooltipTemp {
  position: absolute;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  top: -35px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  background-color: #05c7c7;
  border-radius: 3px;
  transform: translateX(-50%);
  min-width: 20px;
  white-space: nowrap;
  background: var(--popupContentTitleColor);
  color: var(--sel_wraplabelcolorSel);
}

.progressTime-center .progressTime-center-t .progressTime-center-t-tooltip::after,
.progressTime-center .progressTime-center-t .progressTime-center-t-tooltipTemp::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -8px;
  border: 8px solid;
  border-color: #05c7c7 transparent transparent transparent;
  border-color: var(--popupContentTitleColor) transparent transparent transparent;
}

.progressTime-center .progressTime-center-t .progressTime-center-t-tooltipTemp {
  background-color: #05c7c7;
  background-color: var(--popupContentTitleColor);
}

.progressTime-center .progressTime-center-t .progressTime-center-t-tooltipTemp::after {
  border-color: #05c7c7 transparent transparent transparent;
  border-color: var(--popupContentTitleColor) transparent transparent transparent;
}

.progressTime-center .progressTime-center-t .progressTime-center-t-ul {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  height: 100%;
  list-style: none;
}

.progressTime-center .progressTime-center-t .progressTime-center-t-ul li {
  float: left;
  border-left: 1px solid #999;
  box-sizing: border-box;
  height: 100%;
}

.progressTime-center .progressTime-center-t .progressTime-center-t-ul::after {
  content: "";
  display: block;
  clear: both;
}

.progressTime-center-c {
  height: 15px;
  line-height: 15px;
}

.progressTime-center-c .progressTime-center-c-ul {
  height: 100%;
  padding-inline-start: 0px;
  list-style: none;
}

.progressTime-center-c .progressTime-center-c-ul .progressTime-center-c-ul-li {
  float: left;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  list-style: none;
}

.progressTime-center-c .progressTime-center-c-ul .progressTime-center-c-ul-li span {
  position: absolute;
  color: #fff;
  font-size: 12px;
  transform: translateX(-50%) scale(0.9);
}

.progressTime-center-c .progressTime-center-c-ul .progressTime-center-c-ul-li span::after {
  content: "";
  position: absolute;
  width: 1px;
  top: -90%;
  background-color: #fff;
  height: 9px;
  transform: translateX(-50%);
  left: 50%;
}

.progressTime-center-b {
  flex: 1;
}

.progressTime-center-b .progressTime-center-b-ul {
  height: 100%;
  padding-inline-start: 0px;
}

.progressTime-center-b .progressTime-center-b-ul .progressTime-center-b-ul-li {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  height: 100%;
}

.progressTime-center-b .progressTime-center-b-ul .progressTime-center-b-ul-li span {
  white-space: nowrap;
  transform: scale(0.8);
}

.progressTime-right {
  height: 100%;
  width: 10px;
  position: relative;
  border-left: 1px solid #999;
  display: flex;
  flex-direction: column;
}

.progressTime-right .progressTime-right-t {
  height: 18px;
  line-height: 18px;
  background-color: transparent;
  display: inline-block;
  color: #fff;
  display: none;
}

.progressTime-right .progressTime-right-t .progressTime-right-t-radio {
  background: transparent;
}

.progressTime-right .progressTime-right-b {
  flex-flow: 1;
  display: none;
}

.progressTime-right .progressTime-right-b .progressTime-right-b-input {
  outline: none;
  width: 80px;
  margin: 10px auto 0;
  border-radius: 3px;
  border: 1px solid #18b9ff;
  inset-inline: none;
  background-color: transparent;
  color: #fff;
}
</style>
 
<template>
  <div class="progressTime">
    <div class="progressTime-left">
      <div class="progressTime-left-t">
        <!-- <span class="progressTime-left-now" @click="timeNow">现在</span> -->
      </div>
      <div class="progressTime-left-b">
        <span :class="['progressTime-left-b-start', isPlay ? 'stop' : '']" @click="timePlay"></span>
      </div>
    </div>
    <div class="progressTime-center">
      <div class="progressTime-center-t">
        <div class="progressTime-center-t-bar" ref="bar"></div>
        <div class="progressTime-center-t-tooltip" ref="tooltip">{{ formatTooltipText }}</div>
        <div class="progressTime-center-t-tooltipTemp" ref="tempTooltip" v-show="isTempTooltip">{{ formatTempTooltipText
        }}</div>
        <ul class="progressTime-center-t-ul" @click="timeClick" @mousemove="timeMouseEnter" @mouseleave="timeMouseLeave">
          <li v-for="item in items" :key="item.time" :style="{ width: item.width }"></li>
        </ul>
      </div>
      <div class="progressTime-center-c">
        <ul class="progressTime-center-c-ul">
          <li class="progressTime-center-c-ul-li" v-for="item in items" :key="item.time" :style="{ width: item.width }">
            <span v-show="selPeriod == 'h'" v-for="hour in item.hours" :key="hour.id" :style="{ left: hour.left }">{{
              hour.text }}</span>
          </li>
        </ul>
      </div>
      <div class="progressTime-center-b">
        <ul class="progressTime-center-b-ul">
          <li class="progressTime-center-b-ul-li" v-for="item in items" :key="item.time" :style="{ width: item.width }">
            <span>{{ item.time }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="progressTime-right">
      <div class="progressTime-right-t">
        <input class="progressTime-right-t-radio" name="datetype" type="radio" v-model="selPeriod" value="d"
          @change="periodChange">日
        <input class="progressTime-right-t-radio" name="datetype" type="radio" v-model="selPeriod" value="h"
          @change="periodChange">时
      </div>
      <div class="progressTime-right-b">
        <input class="progressTime-right-b-input" placeholder="请输入时间" title="日期格式为 yyyy-mm-dd，小时格式为 yyyy-mm-dd HH"
          v-model="formatTooltipText">
      </div>
    </div>
  </div>
</template>
 
<script setup>

import dayjs from "dayjs";
import {
  onMounted,
  ref,
  provide,
  defineAsyncComponent,
  reactive,
  watch
} from "vue";

var bar = ref(null);
var tooltip = ref(null);
var tempTooltip = ref(null);

const props = defineProps({
  progesstimeObj: {
    type: String,
    default: ""
  }
});

var interval = 6;
var isAnimate = false; // 动画是否完成
var isTempTooltip = false; // 是否显示暂时的tooltip
var currentTempTime = null; // 当前时间
var hoverTime = null; // 时间移动过去的tooltip
var isPlay = ref(false);
var timeTimeout = null;
var selPeriod = ref("h");
var items = ref([]);


watch(props.progesstimeObj, () => {
  console.error(props.progesstimeObj);
  if (props.progesstimeObj.startTime != undefined) {

  }
});

var formatTooltipText = ref(""), formatTempTooltipText = ref("");

onMounted(() => {
  if (props.progesstimeObj.startTime != undefined) {
    currentTempTime = props.progesstimeObj.startTime;
    hoverTime = props.progesstimeObj.startTime;
    formatTooltipText.value = selPeriod.value == "d" ? dayjs(currentTempTime).format(props.progesstimeObj.formatTooltipDay) : dayjs(currentTempTime).format(props.progesstimeObj.formatTooltip);
    formatTempTooltipText.value = selPeriod.value == "d" ? dayjs(hoverTime).format(props.progesstimeObj.formatTooltipDay) : dayjs(hoverTime).format(props.progesstimeObj.formatTooltip);

    items.value = getitems();
    var width = getWidth();
    autoMove(width);
  }
});
function getitems() {
  let result = [];
  let hours = 3600 * 1000;
  let daysTimestamp = hours * 24;
  let time = dayjs(props.progesstimeObj.startTime).valueOf();
  let _items = dayjs(props.progesstimeObj.endTime).diff(dayjs(props.progesstimeObj.startTime), "days") + 1;
  // console.error("items.value", props.progesstimeObj.endTime, props.progesstimeObj.startTime, _items)
  let width = 100 / _items + "%";
  let left = 100 / (24 / interval);

  for (let i = 0; i < _items; i++) {
    //循环起止时间的每一天
    let tempArr = [];
    let count = 0;
    for (let j = 1; j < 24; j++) {
      //循环一天24小时
      if (j % interval === 0) {
        //按照预设的刻度
        count++;
        tempArr.push({
          text: j,
          left: left * count + "%",
          id: Math.random()
        });
      }
    }
    result.push({
      hours: tempArr,
      time: dayjs(time).format(props.progesstimeObj.formatFooter),
      width: width
    });
    time += daysTimestamp;
  }
  return result;
}
function animate(el, json, callback) {
  // 动画
  el.timerInterval && clearInterval(el.timerInterval);
  let iCur, iSpeed;
  el.timerInterval = setInterval(function () {
    var isOver = true;
    for (var prop in json) {
      //el为bar则prop=width，el为tooltip则prop=left
      iCur = parseInt(el.style[prop] || 0); //当前位置
      iSpeed = (json[prop] - iCur) / 7; //移动距离
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      el.style[prop] = iSpeed + iCur + "%";
      if (iSpeed + iCur !== Math.floor(json[prop])) {
        isOver = false;
      }
    }
    if (isOver) {
      el.style[prop] = json[prop] + "%";
      el.timerInterval && clearInterval(el.timerInterval);
      typeof callback === "function" && callback();
    }
  }, 10);
}
function autoMove(width, event) {
  width = width || getWidth(); //获取启动的时候的宽度，即当前时间进度条已经运行的宽度
  if (width >= 100) {//跑过头了，取消定时器  
    // console.error('currentTempTime',currentTempTime,width);
    timeTimeout && clearTimeout(timeTimeout);
    isPlay.value = false;
    return;

    // console.error('width',width,currentTempTime);
  }
  // 自动播放
  !event && isPlay.value && addTime(currentTempTime); //计算需要增加的时间刻度
  let els = [bar.value, tooltip.value]; //时间进度条bar和提示框tooltip，进度条的宽度参与计算，提示框的left位置参与计算
  let jsonArr = [{ width: width }, { left: width }];


  hoverTime = currentTempTime;
  formatTooltipText.value = selPeriod.value == "d" ? dayjs(currentTempTime).format(props.progesstimeObj.formatTooltipDay) : dayjs(currentTempTime).format(props.progesstimeObj.formatTooltip);
  formatTempTooltipText.value = selPeriod.value == "d" ? dayjs(hoverTime).format(props.progesstimeObj.formatTooltipDay) : dayjs(hoverTime).format(props.progesstimeObj.formatTooltip);

  for (let i = 0; i < els.length; i++) {
    // 循环进度条和提示框，分别计算宽度和left位移 
    animate(els[i], jsonArr[i], () => {
      if (i === els.length - 1) {
        //动画执行完毕的回调函数
        props.progesstimeObj.animateAfter &&
          props.progesstimeObj.animateAfter({
            time: currentTempTime,
            event,
            left: width
          });
        if (isPlay.value) {
          timeTimeout && clearTimeout(timeTimeout);
          timeTimeout = setTimeout(autoMove, props.progesstimeObj.delay);
        }
      }
    });
  }
}

function getWidth() {
  // 时间转换为宽度计算，计算当前已经运行的时间进度条占总时间进度条的宽度百分比
  let startEndDiffer = dayjs(props.progesstimeObj.endTime).valueOf() - dayjs(props.progesstimeObj.startTime).valueOf(); //起止时间
  let currentEndDiffer =
    dayjs(props.progesstimeObj.endTime).valueOf() - dayjs(currentTempTime).valueOf(); //当前时间到结束时间，即还没有运行的时间
  currentEndDiffer = startEndDiffer - currentEndDiffer; //已经运行的时间
  let percentDiffer = (currentEndDiffer / startEndDiffer) * 100; //已经运行的宽度百分比
  return percentDiffer;
}
function getConfig(event) {
  // 宽度转换为时间计算
  let el = event.currentTarget;
  let x = event.layerX + 1;
  let width = el.offsetWidth;
  let percent = x / width;
  let startEndDiffer = dayjs(props.progesstimeObj.endTime).valueOf() - dayjs(props.progesstimeObj.startTime).valueOf();
  let time = dayjs(props.progesstimeObj.startTime).valueOf() + dayjs(startEndDiffer * percent).valueOf();
  time = dayjs(time).format("YYYY-MM-DD HH:00:00");
  percent = percent * 100;
  return {
    time,
    percent
  };
}
function timeClick(event) {
  // 时间轴点击
  isPlay.value = false;
  let { time, percent } = getConfig(event);
  changeTime(time);
  autoMove(percent, event);
}
function changeTime(time) {
  // 改变时间
  currentTempTime = dayjs(time).format("YYYY-MM-DD HH:00:00");
  hoverTime = currentTempTime;
  formatTooltipText.value = selPeriod.value == "d" ? dayjs(currentTempTime).format(props.progesstimeObj.formatTooltipDay) : dayjs(currentTempTime).format(props.progesstimeObj.formatTooltip);
  formatTempTooltipText.value = selPeriod.value == "d" ? dayjs(hoverTime).format(props.progesstimeObj.formatTooltipDay) : dayjs(hoverTime).format(props.progesstimeObj.formatTooltip);
}
function addTime(time) {
  if (selPeriod.value == "d") {
    currentTempTime = dayjs(time).add(1, "day");
  } else if (selPeriod.value == "h") {
    currentTempTime = dayjs(time).add(1, "hour");
  }
}
function timeMouseEnter(event) {
  // 鼠标移入
  var config = getConfig(event);
  tempTooltip.value.style.left = config.percent + "%";
  hoverTime = config.time;
  isTempTooltip = true;
}
function timeMouseLeave() {
  // 鼠标移出
  isTempTooltip = false;
}
function timePlay() {
  // 播放
  isPlay.value = !isPlay.value;
  if (isPlay.value) {
    timeTimeout && clearTimeout(timeTimeout);
    timeTimeout = setTimeout(autoMove, props.progesstimeObj.delay);
  }
}
function timeNow() {
  // 回到当前
  changeTime(currentTime);
  autoMove();
}
function periodChange() {
  if (selPeriod.value == "d") {
    interval = 24;
  } else if ((selPeriod.value = "h")) {
    interval = 6;
  }
}
const emit = defineEmits(['progresstime']);
function reviceProgessTime(msg) {
  emit("progresstime", msg);
}
</script>