# 路由快速切换竞态问题 — 细化实施方案

> 状态：待审批 | 日期：2026-07-01

---

## 一、问题复盘

### 1.1 触发路径

```
水情页面 onMounted → setTimeout(500ms) → Weacontent()
                                              │
                                              ├─ loadingShow()
                                              ├─ api.stPptnWater(params)        ← 异步
                                              │     │
  用户点击"雨情"tab ──────────────────────────┼──── 水情 onUnmounted 触发
  雨情页面 onMounted → setTimeout(500ms)      │       clearInterval(interVal)
                                              │       $(".light").remove()
                                              │       removeEntityByName()
                                              │     │
                                              │     └─ .then(res) → SWload()    ← 此时雨情已激活！
                                              │           └─ PointMark.addSWMark(viewer, ...)
                                              │              水位点标记到雨情地图上 ❌
                                              │
  雨情 Weacontent() → .then() → addYLMark()    ← 雨量点也标上
                                              │
  结果：地图上同时显示水位点 + 雨量点
```

### 1.2 根因链条

| 层级 | 问题 | 涉及文件 |
|------|------|----------|
| ① | API `.then()` 回调不检查组件是否已卸载 | 所有路由页面 |
| ② | `onMounted` 中的 `setTimeout` 没保存 ID，卸载时无法取消 | 水情/雨情/总览等 8 个组件 |
| ③ | `window.curDataRefresh` 是全局单例，旧路由的定时器可能触发到新路由 | 所有带自动刷新的页面 |
| ④ | jQuery 全局选择器 `$(".xxx")` 可能操作到新路由的 DOM | 水情/雨情等 |

### 1.3 环境确认

- **HTTP 库**：axios（`src/utils/request.js`）— 原生支持 `AbortController` 的 `signal` 参数
- **地图**：ArcGIS JS API 3.x（AMD 模块化，`window.myMap` 全局共享）
- **路由**：vue-router 4，无 keep-alive，`<router-view>` 直接渲染，切换即销毁

---

## 二、方案总览

采用 **请求 ID 序列号 + 组件活跃标志** 双重守卫策略，不用 AbortController 真正中断请求（保证后端不受影响），只在客户端丢弃过期响应。

```
API 发起前                        API 返回后
┌─────────────┐                   ┌─────────────────────┐
│ seq = next() │ ─────── 请求 ──→ │ if (!isActive) return │
│ isActive=true│                  │ if (seq !== current)  │
└─────────────┘                   │     return            │
                                  │ // 正常处理业务逻辑   │
                                  └─────────────────────┘
```

**选型理由**：Axios 的 `signal` 真正 abort 会进入 `.catch()` 分支，项目中 `.catch()` 有跳转登录页的逻辑（`request.js:24`），风险太大。用序列号在 `.then()` 入口静默丢弃更安全。

> **只有 axios 拦截器层的 `new AbortController().signal` 真正 abort HTTP 请求会进 reject，序列号检查不会**，完全避免了触发错误处理的风险。

### 改动范围统计

| 改动类型 | 文件数 | 说明 |
|----------|--------|------|
| 新增 | 1 | `src/utils/routeGuard.js` |
| 修改（路由页面） | 8 | 水情、雨情、总览、流量、工情、圩区、台风、气象雷达 |
| 修改（子组件） | 0 | 不需要改，令牌在页面级控制 |

---

## 三、新增工具模块

### 文件：`src/utils/routeGuard.js`

```js
/**
 * 路由页面竞态防护工具
 *
 * 解决问题：快速切换路由时，前一个页面的异步请求返回后
 * 仍在共享地图上绘制标记，导致数据污染。
 *
 * 用法：
 *   import { useRouteGuard } from "@/utils/routeGuard.js";
 *   const guard = useRouteGuard();
 *
 *   // 1. 发起请求前获取序列号
 *   const seq = guard.nextSeq();
 *
 *   // 2. 在 .then() 回调第一行检查
 *   api.xxx(params).then(res => {
 *     if (!guard.isValid(seq)) return;   // 已卸载或序列号过期 → 丢弃
 *     // 正常处理...
 *   });
 *
 *   // 3. onUnmounted 中销毁
 *   onUnmounted(() => {
 *     guard.destroy();
 *   });
 */

export function useRouteGuard() {
  let currentSeq = 0;
  let isActive = true;

  return {
    /** 获取新的请求序列号，每次调用自增 */
    nextSeq() {
      currentSeq += 1;
      return currentSeq;
    },

    /** 获取当前序列号（不递增） */
    current() {
      return currentSeq;
    },

    /**
     * 校验请求是否仍然有效
     * @param {number} seq - 发起请求时获取的序列号
     * @returns {boolean} true=有效，false=应丢弃
     */
    isValid(seq) {
      return isActive && seq === currentSeq;
    },

    /** 取消所有进行中的请求（废弃当前序列号） */
    cancelAll() {
      currentSeq += 1; // 递增序列号使所有旧回调失效
    },

    /** 组件卸载时调用 */
    destroy() {
      isActive = false;
      currentSeq += 1;
    },

    /** 获取当前活跃状态 */
    get active() {
      return isActive;
    }
  };
}
```

### 设计要点

1. **两层守卫**：`isActive`（防止卸载后执行）+ `seq`（防止同页面内多次请求互相覆盖）
2. **纯客户端**：不真正 abort HTTP 请求，不触发 axios 的错误拦截器
3. **零依赖**：纯 JS，不依赖 Vue / axios / 任何框架

---

## 四、逐文件改动详情

### 4.1 `src/components/menu/zonglan.vue`（总览页）

这是最复杂的页面，同时请求水位和雨量数据，作为核心示例。

#### 4.1.1 改动点一览

| 序号 | 位置 | 改动内容 |
|------|------|----------|
| ① | `<script setup>` 顶部 | `import { useRouteGuard }` + `const guard = useRouteGuard()` |
| ② | `onMounted` 内 | `setTimeout` 保存 ID，回调内首行 `if (!guard.active) return` |
| ③ | `Weacontent()` | 序列号守卫 `.then()` 入口 + `loadingHide` 移到 `.finally()` |
| ④ | `WeacontentLL()` | 同上 |
| ⑤ | `WeacontentYL()` | 同上 |
| ⑥ | `refreshData()` | `if (!guard.active) return` |
| ⑦ | `window.curDataRefresh` | 函数体内 `if (!guard.active) return`，并在 `refreshData` 调用前检查 |
| ⑧ | `onUnmounted()` | 增加 `guard.destroy()` + `clearTimeout(mountTimer)` |

#### 4.1.2 具体 diff

**① import + 变量声明区域**

```diff
// <script setup> 区域，在 import 块末尾追加：
+ import { useRouteGuard } from "@/utils/routeGuard.js";

// 在现有 const route = useRoute(); 等变量声明区域追加：
+ const guard = useRouteGuard();
+ let mountTimer = null;
```

**② onMounted 改造**

```diff
  onMounted(() => {
    $(".light").parent().remove();
    $("#tabzl").addClass("swDivSelect swDiv");
    // ...
    etime.value = dayjs(now).add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
      .add(-2, "hour")
      .format("YYYY-MM-DD HH:mm:ss");

-   setTimeout(function () {
+   mountTimer = setTimeout(function () {
+     if (!guard.active) return;          // ★ 组件可能已卸载
      clearALL();
      addAreaLineQS();
      Weacontent();
      WeacontentYL();
      window.curDataRefresh();
    }, 800);
  });
```

**③ Weacontent() 改造**

```diff
  function Weacontent() {
    $(".light").parent().remove();
    var now = new Date();
    etime.value = dayjs(now).add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
    stime.value = dayjs(dayjs(now).format("YYYY-MM-DD HH:mm:ss"))
      .add(-2, "hour")
      .format("YYYY-MM-DD HH:mm:ss");

    window.loadingShow();
    var strParam = {};
    strParam["pid"] = "2026031114184492913-3";
    strParam["stime"] = stime.value;
    strParam["etime"] = etime.value;
+   const seq = guard.nextSeq();          // ★ 发起请求前获取序列号

    api.stPptnWater(strParam).then((res) => {
-     strJsonData.value = res.data;
-     datekeyAll.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"))
-       .add(6, "hour")
-       .format("YYYY-MM-DD HH:mm:ss");
-     SWload();
-     setTimeout(function () {
-       if (riverLX.value) {
-         PointMark.readJosn(viewer);
-       }
-     }, 100);
-     window.loadingHide();
+     if (!guard.isValid(seq)) return;    // ★ 组件已卸载或发起新请求 → 丢弃

+     strJsonData.value = res.data;
+     datekeyAll.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"))
+       .add(6, "hour")
+       .format("YYYY-MM-DD HH:mm:ss");
+     SWload();
+     setTimeout(function () {
+       if (!guard.isValid(seq)) return;  // ★ setTimeout 回调内也要检查
+       if (riverLX.value) {
+         PointMark.readJosn(viewer);
+       }
+     }, 100);
+   }).finally(() => {
+     window.loadingHide();               // ★ loadingHide 放 finally，无论成功/丢弃都关闭
-   });
+   });
  }
```

**④ WeacontentLL() 改造**

```diff
  function WeacontentLL() {
    window.loadingShow();
    var strParam = {};
    strParam["pid"] = "2026031114184492913-4";
    strParam["stime"] = stime.value;
    strParam["etime"] = etime.value;
+   const seq = guard.nextSeq();

    api.stFlowJC(strParam).then((res) => {
+     if (!guard.isValid(seq)) return;
      strJsonDataLL.value = res.data;
      PointMark.addLLMark(strJsonDataLL.value, riverMarker.value);
-     window.loadingHide();
+   }).finally(() => {
+     window.loadingHide();
    });
  }
```

**⑤ WeacontentYL() 改造**

```diff
  function WeacontentYL() {
    window.loadingShow();
    // ...
    var strParam = { /* ... */ };
+   const seq = guard.nextSeq();

    api.stPptnRain(strParam).then((res) => {
+     if (!guard.isValid(seq)) return;
      strJsonDataYL.value = res.data;
      datekeyAllYL.value = new Date();
      YLload();
+   }).finally(() => {
+     window.loadingHide();
    });
  }
```

**⑥ refreshData() 改造**

```diff
  function refreshData() {
+   if (!guard.active) return;            // ★ 组件已卸载，跳过刷新
    var _curDataRefresh = localStorage.getItem("curDataRefresh");
    if (_curDataRefresh == true || _curDataRefresh == "true") {
      Weacontent();
    } else {
      if (interVal != null && interVal != undefined) {
        clearInterval(interVal);
      }
    }
  }
```

**⑦ window.curDataRefresh 改造**

```diff
  window.curDataRefresh = function () {
+   if (!guard.active) return;            // ★ 组件已卸载，跳过
    if (interVal != null) {
      clearInterval(interVal);
    }
    if (localStorage.getItem("curDataRefresh") == "true") {
      interVal = setInterval(function () {
+       if (!guard.active) {              // ★ 定时器回调也要检查
+         clearInterval(interVal);
+         return;
+       }
        refreshData();
      }, 180000);
    }
  };
```

**⑧ onUnmounted 改造**

```diff
  onUnmounted(() => {
+   guard.destroy();                      // ★ 标记组件已卸载，所有守卫失效
+   if (mountTimer != null) {
+     clearTimeout(mountTimer);           // ★ 取消延迟初始化
+     mountTimer = null;
+   }
    clearALL();
    $(".light").parent().remove();
    if (interVal != null) {
      clearInterval(interVal);
+     interVal = null;
    }
  });
```

---

### 4.2 `src/components/menu/shuzidatingSQ.vue`（水情页）

改动项与 zonglan.vue 基本一致，按模板套用：

| 改动项 | 说明 |
|--------|------|
| ① 导入 guard | `import { useRouteGuard }` + `const guard = useRouteGuard()` + `let mountTimer = null` |
| ② `onMounted` setTimeout | 保存 ID + 回调首行 `if (!guard.active) return` |
| ③ `Weacontent()` | `const seq = guard.nextSeq()` + `.then()` 入口 `if (!guard.isValid(seq)) return` + `loadingHide` 移 `.finally()` |
| ④ `refreshData()` | 首行 `if (!guard.active) return` |
| ⑤ `window.curDataRefresh` | 同 zonglan 模板 |
| ⑥ `onUnmounted()` | 增加 `guard.destroy()` + `clearTimeout(mountTimer)` |

---

### 4.3 `src/components/menu/shuzidatingYQ.vue`（雨情页）

| 改动项 | 说明 |
|--------|------|
| ① 导入 guard | 同上模板 |
| ② `onMounted` setTimeout | 同上模板 |
| ③ `Weacontent()` | `const seq = guard.nextSeq()` + `.then()` 入口检查 + `loadingHide` 移 `.finally()` |
| ④ `refreshData()` | 首行 `if (!guard.active) return` |
| ⑤ `window.curDataRefresh` | 同上模板 |
| ⑥ `onUnmounted()` | 增加 `guard.destroy()` + `clearTimeout(mountTimer)` |

特殊注意：`Weacontent()` → `YLload()` → `PointMark.addYLMark()` + `MapRainfall()`。`YLload` 不是异步的，但内部调用的 `PointMark.addYLMark` 内部有 `setTimeout`（在 PointMark.js 第 43 行）。`MapRainfall` 又链式调用 `apidzxm.rainfallMultiIsosurfaces()`，这个也要加守卫。

**雨情 Weacontent 详细改造：**

```diff
  function Weacontent() {
    var strParam = {};
    strParam["pid"] = pid.value;
    strParam["stime"] = stime.value;
    strParam["etime"] = etime.value;
    strParam["pathname"] = "SUM";

+   const seq = guard.nextSeq();

    apizonglan.stPptnRain(strParam).then((res) => {
+     if (!guard.isValid(seq)) return;
      strJsonData.value = res.data;
      datekeyAll.value = dayjs(dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"))
        .add(6, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
      YLload();
    });
  }

  // YLload 中调用的 MapRainfall 也有异步请求：
  function MapRainfall() {
+   const seq = guard.nextSeq();
    var strParam = { /* ... */ };
    apidzxm.rainfallMultiIsosurfaces(strParam).then((res) => {
+     if (!guard.isValid(seq)) return;
      MapRainfallData(res);
    });
  }
```

---

### 4.4 其余路由页面（模板化改造）

以下 5 个页面改造模式完全一致，不再展开：

| 文件 | 需要守卫的 API |
|------|---------------|
| `shuzidatingLL.vue`（流量） | `stFlowJC` → `addLLMark` |
| `shuzidatingGQ.vue`（工情） | 对应工情 API + `window.curDataRefresh` |
| `shuzidatingWQ.vue`（圩区） | 对应圩区 API + `window.curDataRefresh` |
| `shuzidatingTyphoon.vue`（台风） | 对应台风 API + `window.curDataRefresh` |
| `qixiang.vue`（气象雷达） | 对应气象 API |

每个页面改造 6 步：导入 guard → mountTimer → Weacontent 守卫 → refreshData 守卫 → curDataRefresh 守卫 → onUnmounted 清理。

---

### 4.5 `src/components/menu/shuzidatingTFZT.vue`（台风专题）

如果也用了 `window.curDataRefresh` 或在地图上绘制，按模板改；否则至少加上 mountTimer 清理。

---

## 五、不需要改的文件

| 文件 | 原因 |
|------|------|
| `src/utils/request.js` | 不改 axios，避免影响全局错误处理 |
| `src/utils/ArcGis/PointMark.js` | 不改，由调用方（路由页面）控制是否调用 |
| `src/utils/ArcGis/MapComm.js` | 不改，clear/remove 逻辑不变 |
| `src/components/tab/tabToggleSQ.vue` | 不改，路由跳转本身没有问题 |
| `src/App.vue` | 不改，`window.loadingShow/Hide` 保持不变 |
| 所有子 ECharts/Table 组件 | 不改，数据由页面级 prop 传递，页面不更新数据自然不传 |

---

## 六、风险与影响详析

### 6.1 loading 遮罩残留

**风险场景**：guard 拦截后直接 return，`loadingHide` 不执行 → loading 遮罩永远不消失。

**解决**：所有 `loadingHide` 移到 `.finally()` 中，无论成功/废弃/报错都关闭。

**审计清单**（所有出现 `loadingHide` 在 `.then()` 内的路由页面）：

- [x] zonglan.vue — `Weacontent`、`WeacontentLL`、`WeacontentYL`
- [x] shuzidatingSQ.vue — `Weacontent`
- [x] shuzidatingYQ.vue — `Weacontent`
- [x] shuzidatingLL.vue — 需逐一检查

### 6.2 同页面连续两次请求

**场景**：用户在雨情页面快速切换"1小时→3小时→6小时"，`Weacontent()` 被连续调用三次。

```
T1: click 1小时 → seq=1, API1 发出
T2: click 3小时 → seq=2, API2 发出（seq=1 自动过期）
T3: API1 返回 → isValid(1) 比较 seq=1 !== currentSeq=2 → 丢弃 ✓
T4: click 6小时 → seq=3, API3 发出（seq=2 自动过期）
T5: API2 返回 → isValid(2) 比较 seq=2 !== currentSeq=3 → 丢弃 ✓
T6: API3 返回 → isValid(3) → 通过 ✓
```

**预期行为**：只有最后一次（6小时）的请求结果会渲染。这正是我们需要的。

### 6.3 window.curDataRefresh 全局污染

**现状**（来自 App.vue 第 283 行）：
```js
// App.vue 中的全局倒计时定时器
interVal = setInterval(function () {
  totalSeconds--;
  if (totalSeconds <= 0) {
    totalSeconds = 300;
    window.curDataRefresh();   // ← 调用的是当前路由挂载的版本
  }
}, 1000);
```

每个路由组件在 `onMounted` 时覆盖 `window.curDataRefresh`。改造后每个函数体都有 `if (!guard.active) return`，所以：

- 如果旧路由的 curDataRefresh 在卸载后恰好被 App.vue 的定时器调起 → guard 已销毁 → 直接返回 ✅
- 最终只有当前活跃路由的 curDataRefresh 执行 ✅

**这个全局模式是技术债，但本次改动不重构它**（范围太大，风险不可控），只加防御。

### 6.4 jQuery 全局 DOM 操作

**现状**：多个位置使用 `$(".LabelPlotBeautifulDRP").remove()`、`$(".light").remove()` 等全局选择器。

**影响**：如果在 onUnmounted 后仍有旧路由的 `.then()` 回调通过 guard 检查（理论上不会），执行到 jQuery 全局操作时可能误删新路由的 DOM 元素。

**风险等级**：低 — guard 的双层检查已经拦截了 99.9% 的情况。剩下的 0.1% 是极端时序（用户卸载后又快速挂回同一路由），此时 guard 已 destroy，理论上也无法通过。

### 6.5 ArcGIS require 回调中的 setTimeout

PointMark.js 中有这种模式：
```js
// PointMark.js:43
setTimeout(function () {
  require(["esri/geometry/Point", ...], function(Point, ...) {
    // 在地图上绘制标记
  });
}, 0);
```

这个 `setTimeout` + `require` 是异步的，但目前 **无法从路由页面直接拦截**。解决方案：

- 路由页面 `onUnmounted` 中调用 `removeEntityByName(layerId)` 做兜底清除
- 因为 guard 已经拦截了调用 `PointMark.addSWMark()` 的入口，所以这个 setTimeout 根本不会被执行到
- 唯一例外：API 返回极快（<1ms），guard 检查通过后进入 SWload→addSWMark，此时用户恰好切换路由。这种概率极低，由 layer 清理兜底。

---

## 七、实施步骤

### 阶段 1：基础设施（1 文件新增）

```
步骤 1.1：创建 src/utils/routeGuard.js
         → 内容见第三章
         → 验证：import 不报错
```

### 阶段 2：核心页面改造（2 文件）

```
步骤 2.1：zonglan.vue（总览）
         → 按 4.1 节模板改造
         → 验证：正常进入/切换/刷新 loading 正常开关

步骤 2.2：shuzidatingSQ.vue（水情）
         → 按 4.2 节模板改造
         → 验证：水情 ↔ 雨情 快速切换不残留标记
```

### 阶段 3：其余页面铺开（6 文件）

```
步骤 3.1：shuzidatingYQ.vue（雨情）
步骤 3.2：shuzidatingLL.vue（流量）
步骤 3.3：shuzidatingGQ.vue（工情）
步骤 3.4：shuzidatingWQ.vue（圩区）
步骤 3.5：shuzidatingTyphoon.vue（台风）
步骤 3.6：shuzidatingTFZT.vue（台风专题）
```

### 阶段 4：验证

```
验证场景 1：正常进入各路由 → 数据正常加载
验证场景 2：各路由间慢速切换（等加载完再切）→ 正常
验证场景 3：各路由间快速切换（<500ms）→ 无残留标记
验证场景 4：同页面内切换查询条件（如雨情的 1h/3h/6h）→ 最后选择生效
验证场景 5：自动刷新（curDataRefresh=true）→ 正常刷新，切换路由后不刷旧路由
验证场景 6：loading 遮罩 → 每次操作后能正常关闭
验证场景 7：全屏切换 → 不影响全屏功能
```

---

## 八、回滚方案

如果出现不可预期的问题：

```bash
# 方案 A：只回滚某个页面
git checkout -- src/components/menu/shuzidatingSQ.vue

# 方案 B：全部回滚
git checkout -- src/utils/routeGuard.js
git checkout -- src/components/menu/*.vue

# 方案 C：临时禁用 guard（在每个文件中将 guard 替换为始终返回 true 的 mock）
# 不推荐，因为会回到原始问题
```

---

## 九、后续优化建议（不在本次范围）

1. **重构 `window.curDataRefresh`**：改为 provide/inject 或 Vuex，消除全局单例
2. **统一 loading 管理**：改为 Vuex 中的计数器，避免 `window.loadingShow/Hide` 全局调用
3. **jQuery 全局选择器消除**：改为 Vue ref + scoped selector
4. **ArcGIS 地图图层生命周期**：在 MapComm.js 中增加 layer 所有权追踪
5. **axios 统一错误处理**：区分业务错误和请求取消，避免取消也跳转登录页
