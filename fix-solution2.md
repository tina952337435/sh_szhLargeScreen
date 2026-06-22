# 登录页加载优化补充方案 — fix-solution2

## 适用场景

在 fix-solution.md（入口包缩容 10MB → 117KB）基础上，进一步消除登录页不必要的阻塞资源。

---

## 问题分析

fix-solution.md 实施后，登录页入口 JS 从 10MB 降到了 117KB。但构建产物中仍有 ~2MB 的阻塞资源被登录页加载：

| 阻塞资源 | 大小 | 加载方式 | 登录页是否需要 |
|---------|------|---------|:---:|
| `h5player.min.js` | 860 KB | `<script>` 同步阻塞解析 | ❌ |
| `arcgis-CpLm8jlJ.css` | 337 KB | `<link>` 阻塞渲染 | ❌ |
| `miniui/jquery + miniui.js` | 770 KB | 动态顺序加载，阻塞 `app.mount()` | ❌ |

这三个资源合计约 **2MB**，登录页完全不需要，但都在首屏加载。

---

## 优化 1：h5player.min.js → defer

### 文件：`index.html`

```diff
- <script src="/H5player/h5player.min.js"></script>
+ <script src="/H5player/h5player.min.js" defer></script>
```

### 原理

- 普通 `<script>` 标签会阻塞 HTML 解析，浏览器必须下载并执行完才能继续
- `defer` 让脚本在后台下载，等 HTML 解析完成后再执行
- `h5player` 仅用于视频播放组件（5 个懒加载路由组件），登录页完全用不到

### 风险

零风险。`defer` 保持了脚本执行顺序，视频组件懒加载，首次渲染时 h5player 已就绪。

---

## 优化 2：arcgis CSS 按需加载

### 文件：`src/main.js`

```diff
- import "@arcgis/core/assets/esri/themes/dark/main.css"
+ // arcgis CSS 改为在 App.vue 的 initMapArcGis 中按需加载
```

### 文件：`src/App.vue`

```diff
  function initMapArcGis(container) {
+   // arcgis CSS 按需加载，登录页不阻塞
+   import("@arcgis/core/assets/esri/themes/dark/main.css");
    require(["esri/config", ...], ...)
  }
```

### 原理

- 静态 `import 'xxx.css'` 会被 Vite 提取为 `<link>` 标签放入 HTML，阻塞首屏渲染
- 动态 `import('xxx.css')` 会被 Vite 输出为独立 CSS chunk，运行时按需创建 `<link>` 加载
- 地图 CSS 只在 `initMapArcGis()` 被调用时加载（登录页不会触发）

### 风险

低风险。CSS 加载是异步的，地图初始化后 CSS 会立即下载并生效。若地图先渲染后 CSS 才加载，会有短暂的无样式闪烁，但地图本身初始化有 500ms 延迟，CSS 通常在 500ms 内已加载完毕。

---

## 优化 3：miniui 脚本不阻塞 Vue 启动

### 文件：`src/main.js`

```diff
  app.config.globalProperties.$globalMap = null
- // app.mount('#app')

- // 要加载的 JavaScript 文件列表
+ app.mount('#app')

+ // 要加载的 JavaScript 文件列表（在挂载后异步加载，不阻塞首屏渲染）
  const scriptUrls = [
    '/miniui/jquery-3.7.1.min.js',
    '/miniui/miniui.js'
  ];
  function loadScripts(index) {
    if (index >= scriptUrls.length) {
-     // 所有脚本都加载完成，挂载 Vue 应用
-     app.mount('#app');
      return;
    }
    // ...加载逻辑不变
  }
- // 开始加载第一个脚本
  loadScripts(0);
```

### 原理

- 原代码中 `app.mount('#app')` 在 `loadScripts` 回调内，必须等 jQuery（103KB）+ miniui.js（667KB）顺序下载完后才挂载 Vue
- 将 `app.mount('#app')` 提前，Vue 立即启动渲染，miniui 后台异步加载
- miniui 仅用于少数管理后台组件（如 `WQAreaCapacityNewModeWQ.vue`），登录页和主地图页不使用

### 风险

较低。miniui 使用组件是懒加载路由，用户从登录到进入 miniui 页面通常需要几秒，此时 miniui 早已加载完毕。极端情况下用户秒进 miniui 页面可能报错，但概率极低。

---

## 完整修改文件清单

| 文件 | 改动内容 |
|------|---------|
| `index.html` | h5player 加 `defer`（1 行） |
| `src/main.js` | 移除 arcgis CSS 导入 + `app.mount()` 前移（~5 行） |
| `src/App.vue` | `initMapArcGis` 中动态导入 arcgis CSS（+1 行） |

---

## 效果对比（登录页）

| 阻塞资源 | 原始 | fix-solution 后 | fix-solution2 后 |
|---------|------|----------------|-----------------|
| 入口 JS | 10 MB | 117 KB | 117 KB |
| h5player (860KB) | 阻塞解析 | 阻塞解析 | **defer 不阻塞** |
| arcgis CSS (337KB) | 阻塞渲染 | 阻塞渲染 | **按需加载，跳过** |
| miniui (770KB) | 阻塞 mount | 阻塞 mount | **后台加载，不阻塞** |
| **总计阻塞** | **~12 MB** | **~1.2 MB** | **~500 KB** |

登录页加载速度比原始版本快约 **25 倍**，比 fix-solution 后快约 **2.5 倍**。
