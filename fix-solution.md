# 登录页加载慢 & 页面刷新 — 修复方案

## 适用场景

Vue 3 + Vite 项目中，GeoJSON / 大 JSON 文件被静态 `import` 打包进入口 chunk，导致首屏加载极慢。

---

## 问题根因

入口 chunk 包含 5 个大 GeoJSON 文件（共 16.4 MB，gzip 3.8 MB），占入口包的 98.5%。

追踪 import 链：

```
main.js
  └─ import App.vue
       └─ import ShelterArea.js
            ├─ import SHBJ2000.json       (1.4 MB)
            ├─ import 四片边界2000.json    (261 KB)
            ├─ import 苏州河.json          (1.2 MB)
            ├─ import 一级河流_Buffer50m.json (12.4 MB) ← 最大
            └─ import 四片2000.json        (472 KB)
```

这 5 个 JSON 仅在 ArcGIS 地图初始化时用到，但被 Vite/Rollup 内联到入口 chunk，导致所有页面（包括登录页）都要先下载这 16.4 MB 数据才能渲染。

---

## 修复策略

**只改 1 个文件**：`src/utils/share/ShelterArea.js`

将 5 个 GeoJSON 从**模块顶部的静态 import** 改为**函数内的动态 import()**。

### 原理

- **静态 import** → Vite 将 JSON 内联到入口 chunk（打包在一起）
- **动态 import()** → Vite 将 JSON 单独输出为一个 chunk，运行时按需加载

### 核心步骤

#### 步骤 1：删除模块顶部的静态 import

```diff
- import SHBJArea from "@/assets/json/SHBJ2000.json";
- import SHSLPBJArea from "@/assets/json/四片边界2000.json";
- import szhRiverData from "@/assets/json/苏州河.json";
- import Buffer50m from "@/assets/json/一级河流_Buffer50m.json";
- import SHSLPArea from "@/assets/json/四片2000.json";
```

替换为注释（可选，方便维护）：

```js
// GeoJSON 数据改为函数内动态 import，避免打包入入口 chunk
//   SHBJArea → addSHOutRings / addSHAreaPolygonSZH 内动态加载
//   SHSLPBJArea → addSHAreaPolygonSZH 内动态加载
//   szhRiverData → queryCompleteSZH 内动态加载
//   Buffer50m → readJosnRiver 内动态加载
//   SHSLPArea → addSHAreaPolygon 内动态加载
```

#### 步骤 2：在每个使用函数内部改为动态 import

**⚠️ 关键：动态 `import()` 返回的是 ES 模块命名空间对象，JSON 数据在 `.default` 属性上！**

##### readJosnRiver（使用 Buffer50m）

```js
// 改前
function readJosnRiver(layer) {
  require([...], function(Graphic, ...) {
    var features = Buffer50m.features;
    // ...
  });
}

// 改后
async function readJosnRiver(layer) {
  const Buffer50m = (await import("@/assets/json/一级河流_Buffer50m.json")).default;
  require([...], function(Graphic, ...) {
    var features = Buffer50m.features;  // 闭包捕获，用法不变
    // ...
  });
}
```

##### addSHOutRings（使用 SHBJArea）

```js
// 改前
function addSHOutRings(layer, infoType) {
  var AllPath = [];
  if (infoType == "上海市") {
    require([...], function(...) {
      var features = SHBJArea.features;
      // ...
    });
  }
}

// 改后
async function addSHOutRings(layer, infoType) {
  var AllPath = [];
  if (infoType == "上海市") {
    const SHBJArea = (await import("@/assets/json/SHBJ2000.json")).default;
    require([...], function(...) {
      var features = SHBJArea.features;
      // ...
    });
  }
}
```

##### addSHAreaPolygon（使用 SHSLPArea）

```js
// 改前
function addSHAreaPolygon(layer) {
  require([...], function(...) {
    var features = SHSLPArea.features;
    // ...
  });
}

// 改后
async function addSHAreaPolygon(layer) {
  const SHSLPArea = (await import("@/assets/json/四片2000.json")).default;
  require([...], function(...) {
    var features = SHSLPArea.features;
    // ...
  });
}
```

##### addSHAreaPolygonSZH（使用 SHBJArea + SHSLPBJArea）

```js
// 改前
function addSHAreaPolygonSZH(layer, mapType = "上海市") {
  require([...], function(...) {
    var features = {};
    if (mapType == "上海市") { features = SHBJArea.features; }
    else if (mapType == "苏州河") { features = SHSLPBJArea.features; }
    // ...
  });
}

// 改后
async function addSHAreaPolygonSZH(layer, mapType = "上海市") {
  const SHBJArea = (await import("@/assets/json/SHBJ2000.json")).default;
  const SHSLPBJArea = (await import("@/assets/json/四片边界2000.json")).default;
  require([...], function(...) {
    var features = {};
    if (mapType == "上海市") { features = SHBJArea.features; }
    else if (mapType == "苏州河") { features = SHSLPBJArea.features; }
    // ...
  });
}
```

##### queryCompleteSZH（使用 szhRiverData）

```js
// 改前
function queryCompleteSZH(layer) {
  require([...], function(...) {
    var features = szhRiverData.features;
    // ...
  });
}

// 改后
async function queryCompleteSZH(layer) {
  const szhRiverData = (await import("@/assets/json/苏州河.json")).default;
  require([...], function(...) {
    var features = szhRiverData.features;
    // ...
  });
}
```

---

## ⚠️ 踩坑记录

### 坑：动态 import JSON 忘记加 `.default`

| 方式 | 代码 | 返回值 |
|------|------|--------|
| 静态 import | `import data from './file.json'` | `{ features: [...] }` — JSON 对象本身 |
| 动态 import（正确） | `(await import('./file.json')).default` | `{ features: [...] }` — JSON 对象 |
| 动态 import（**错误**） | `await import('./file.json')` | `{ default: {...}, __esModule: true }` — 模块命名空间 |

如果忘记 `.default`，`Buffer50m.features` 返回 `undefined`，后续 `.forEach()` 抛出 `TypeError`，导致页面崩溃刷新。

### 函数签名变化

函数从 `function` 改为 `async function`，调用方无需改动（fire-and-forget，不依赖返回值）。

---

## 效果对比

| 指标 | 改前 | 改后 |
|------|------|------|
| 入口 JS | **10 MB** (gzip 3.8 MB) | **117 KB** (gzip 43 KB) |
| 缩减比例 | — | **↓ 98.8%（缩小 ~85 倍）** |
| 一级河流_Buffer50m.json | 内联在入口包 | 独立 chunk（7.5 MB），按需加载 |
| SHBJ2000.json | 内联在入口包 | 独立 chunk（937 KB），按需加载 |
| 苏州河.json | 内联在入口包 | 独立 chunk（709 KB），按需加载 |
| 四片2000.json | 内联在入口包 | 独立 chunk（279 KB），按需加载 |
| 四片边界2000.json | 内联在入口包 | 独立 chunk（159 KB），按需加载 |
| 修改文件数 | — | **1 个** |
| 调用方改动 | — | **0 处** |

---

## 适用范围

这个方案适用于任何 Vue 3 + Vite 项目中有大 JSON/数据文件被静态 import 打入入口包的场景：

1. GeoJSON 地图数据
2. 大型配置 JSON
3. 静态数据字典
4. i18n 翻译文件

只要数据文件**不是在模块顶层立即使用**，而是在某个函数/回调中用到，都可以用这个方法将其从入口包中分离出去。

---

## 完整修改文件

只修改 `src/utils/share/ShelterArea.js` 一个文件，改动约 15 行。
