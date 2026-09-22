# topHead.vue 布局与样式 —— 移植说明

> 适用前提：目标项目与 KSWebVueNew 结构一致（**Vue3 + Vite + Element Plus + scoped CSS**）。
> 范围：只迁移 **顶部标题栏 + 「项目配置」卡片面板** 的布局与样式，不含任何业务逻辑；配置面板内容按骨架留空，自行填充。
> 源文件：[src/components/top/topHead.vue](src/components/top/topHead.vue)

---

## 一、整体结构

topHead 的视觉由两块组成，都在同一个 `<template>` 根节点下：

1. **顶部标题栏** `.top-head g-hd` —— 固定在页面顶部，含大标题 + 天气 + 时间。
2. **「项目配置」面板** —— 一个浮层，默认隐藏，点右上角「项目配置」按钮展开，内部是一组 `.config-card` 卡片。

```
<div class="top-head g-hd"> ... </div>          <!-- 标题栏 -->
<div class="config-panel">                        <!-- 配置面板（浮层） -->
    <div class="popupContentTitle"> ... </div>    <!-- 面板标题栏 + 关闭按钮 -->
    <div class="config-card"> ... </div>          <!-- 卡片，可复制 N 个 -->
    ...
</div>
```

---

## 二、顶部标题栏

### 2.1 结构（骨架）

```html
<div class="top-head g-hd">
  <div class="hreatitle title">
    <div class="titleText">
      <div id="titleTextName">平台标题</div>
    </div>
  </div>
  <div class="m-menu">
    <div class="zuo box-siz">
      <div class="weather">今天 · 多云</div>
    </div>
    <div class="you box-siz">
      <span>14:20:30</span> 星期三 <i>2026-09-15</i>
    </div>
  </div>
</div>
```

### 2.2 样式（核心）

```css
.top-head {
  background: var(--tophead);
  background-blend-mode: color-dodge;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background-size: auto 5rem;
  overflow: hidden;
}

.hreatitle {
  width: 40rem;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
}

.titleText {
  font-family: "largeFont";
  font-size: 34px;
  line-height: 57px;
  text-align: center;
  letter-spacing: 0.03em;
  /* 渐变文字：白 → 浅蓝 */
  background: linear-gradient(180deg, #ffffff 37.41%, #b4cff2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding-top: 8px;
}

.weather {
  float: left;
  padding-top: 8px;
  padding-left: 1rem !important;
}

.m-menu {
  margin-top: 0.5rem;
}

.m-menu .you span {
  font-size: 2rem;
  margin-right: 1rem;
  line-height: 1;
  font-family: number;
}

.m-menu .you i {
  margin-left: 1rem;
  line-height: 28px;
}
```

---

## 三、项目配置面板（卡片布局）

### 3.1 结构（骨架，一个卡片 = 一个布局单元）

```html
<div class="config-panel" style="display: none">
  <!-- 面板标题栏 -->
  <div class="popupContentTitle">
    <div class="popupContentTitleText">项目配置</div>
    <div class="popupContentTitleClose" title="关闭窗口"></div>
  </div>

  <!-- 卡片单元，复制多个即得到多组配置 -->
  <div class="config-card">
    <div class="config-card-head">分组标题</div>
    <div class="config-card-body">
      <!-- 内容自填：el-checkbox / el-radio-group / 自定义 grid -->
    </div>
  </div>
</div>
```

### 3.2 样式（核心）

```css
/* 面板标题栏 */
.popupContentTitle {
  position: relative;
  background: var(--popContentHeadbg);
  height: 56px;
  margin: 0 0 10px 0;
}

.popupContentTitleText {
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 56px;
  font-weight: 600;
}

.popupContentTitleClose {
  background: url(/images/popupClose.png) no-repeat;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

/* 卡片：边框 + 圆角 + 标题栏左侧竖条 */
.config-card {
  border: 1px solid color-mix(in srgb, var(--titled1) 25%, transparent);
  border-radius: 4px;
  margin: 0 10px 10px;
}

.config-card-head {
  border-left: 3px solid var(--titled1);
  background: color-mix(in srgb, var(--titled1) 8%, transparent);
  padding: 5px 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--widgetcolor);
  border-radius: 4px 4px 0 0;
}

.config-card-body {
  padding: 5px 12px;
}
```

> `color-mix()` 是较新的 CSS（现代浏览器支持）。若需兼容老浏览器，等价替换为：
> - `var(--titled1)` 默认是 `#00e4ff`（rgb 0,228,255）
> - `25%` → `rgba(0, 228, 255, 0.25)`
> - `8%` → `rgba(0, 228, 255, 0.08)`

### 3.3 可选布局辅助（内容密集时用）

```css
/* 勾选项多、要分多列时用 grid */
.layer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 6px;
  column-gap: 6px;
}

/* 分组内的小标题（跨整行） */
.layer-subtitle {
  grid-column: 1 / -1;
  color: var(--titled1);
  font-size: 13px;
  font-weight: 600;
  background: color-mix(in srgb, var(--titled1) 8%, transparent);
  padding: 4px 8px;
  margin-top: 4px;
  border-radius: 2px;
}

/* 天气类单选，4 列 */
.weather-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 8px;
  column-gap: 6px;
  margin-top: 4px;
}

/* 地图类型选择块（图片+文字，可选中高亮） */
.switch-img,
.switch-imgSelect {
  width: 88px;
}
```

---

## 四、Element Plus 勾选/单选样式（深色主题）

这些是对 Element Plus 内部类名的覆写，需写在 **scoped 样式里并用 `:deep()`**（或写到全局样式不带 `:deep()`）。

```css
:deep(.el-radio) {
  margin-right: 16px;
  --el-radio-input-bg-color: #d5141400;
}

:deep(.el-checkbox__label) {
  padding-left: 5px;
}

:deep(.el-checkbox) {
  height: 24px;
}

/* 选中后的文字/勾选块颜色 */
:deep(.el-checkbox__input.is-checked + .el-checkbox__label),
:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: var(--swDivSelectcolor);
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner),
:deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: var(--swDivSelectcolor);
  border-color: var(--swDivSelectcolor);
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner:after) {
  border-width: 2px;
  left: 34%;
  top: 10%;
}

:deep(.el-radio__input.is-checked .el-radio__inner:after) {
  top: 60%;
}
```

---

## 五、依赖清单（迁移前要齐）

| 依赖 | 说明 | 目标项目是否已有 |
|---|---|---|
| **CSS 变量** | `--tophead` / `--titled1` / `--widgetcolor` / `--popContentHeadbg` / `--swDivSelectcolor` / `--dialogColor` | 需确认，见下 |
| **Element Plus** | `el-checkbox` / `el-radio` / `el-radio-group`（面板里用到） | 需有 |
| **字体** | `largeFont`（标题）、`number`（时间数字） | 需有，否则替换成系统字体 |
| **图片** | `/images/popupClose.png`（关闭按钮）、`/images/indexNew2-2.png`（标题栏背景，在 `--tophead` 里） | 需有或替换 |

### 5.1 CSS 变量默认值（default 主题）

目标项目若无这些变量，可在自己的主题样式里补上（值取自 `public/styles/default.css`）：

```css
:root {
  --tophead: linear-gradient(to bottom,
      rgb(9 27 44) 20%,
      rgb(9 26 48 / 0.9) 30%,
      rgb(10 28 44 / 0.8) 80%),
    url(/images/indexNew2-2.png) no-repeat top center;
  --widgetcolor: #fff;          /* 卡片标题文字 */
  --titled1: #00e4ff;           /* 卡片竖条 / 边框 / 小标题 */
  --popContentHeadbg: #00a3ff99; /* 面板标题栏背景 */
  --swDivSelectcolor: #0cdc0c;  /* 勾选/单选选中色（绿） */
  --dialogColor: #031426e6;     /* 面板整体背景 */
}
```

> 换主题（蓝/紫）其实就是换这几个变量的值，布局与结构不变。

---

## 六、迁移步骤（照着做）

1. **补 CSS 变量**：把第五节的 `:root` 变量（或目标已有的等价主题变量）确认齐全，缺则补。
2. **搭标题栏骨架**：复制第二节结构 + 样式，改 `titleTextName` 文字为你的平台名，去掉/替换 weather、time 的绑定为你的数据。
3. **搭面板骨架**：复制第三节结构 + 样式，`config-card` 按需复制，`config-card-head` 写分组名，`config-card-body` 里填你的 `el-checkbox`/`el-radio-group`。
4. **粘 Element Plus 覆写样式**：第四节整段照抄（注意 `:deep()` 只在 scoped 样式里有效）。
5. **处理资源**：字体 `largeFont`/`number`、图片 `popupClose.png`/`indexNew2-2.png` 换成目标项目自己的（或直接删背景图，用纯色渐变）。
6. **显隐逻辑**：面板默认 `display:none`，右上角加一个「项目配置」按钮，点击 `show()`/`hide()` 即可（这是逻辑，不属于本次范围，自己接）。

---

## 七、注意事项

1. **`:deep()` 只在 `<style scoped>` 里有效**。如果你的样式写在不加 scoped 的全局 CSS 里，直接去掉 `:deep()` 前缀即可。
2. **`color-mix()` 兼容性**：老浏览器不支持就换成 `rgba()` 等价写法（见 3.2）。
3. **标题栏背景**：`--tophead` 里带了背景图 `indexNew2-2.png`；不要背景图就把 `url(...)` 去掉，只留 `linear-gradient(...)`。
4. **字体**：`largeFont`/`number` 是项目自定义字体，目标没有时 `font-family` 会回退，最省事是直接删掉这两行 `font-family`，用默认字体。
5. **面板定位**：面板是浮层，位置用外层容器控制（绝对定位 + 右上角），本文未含定位样式，按目标项目布局自行加 `position`。
