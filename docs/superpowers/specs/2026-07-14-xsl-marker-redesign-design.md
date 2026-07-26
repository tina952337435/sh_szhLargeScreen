# 苏州河水利片蓄量标注视觉优化 — 设计文档

**日期:** 2026-07-14  
**状态:** 已确认  
**范围:** `addXSLMark` 地图标注视觉重设计

---

## 1. 背景与问题

`shuzidatingCXL.vue` 中的 `addXSLMap` 方法调用 `PointMark.addXSLMark` 在地图上展示苏州河4个水利片（嘉宝北片、蕴南片、青松片、淀北片）的蓄量数据。

### 当前问题

1. **无定位标记**：只有 HTML 文本卡片（MapText），没有实际的地图点位图标（PictureMarkerSymbol），用户不知道数据归属哪个坐标
2. **依赖外部背景图**：使用 `/images/cockpit__bottommenu4.png` 做 140×140px 固定尺寸背景，无法自适应内容
3. **硬编码偏移**：标签位置偏移 `lttd-0.012`，不同缩放级别可能错位
4. **视觉层级不清**：所有数据行同样大小，没有突出重点指标（蓄量余量）
5. **客户反馈难看**：整体设计陈旧，不符合数字孪生大屏的科技感定位

---

## 2. 设计目标

- 增加精准的地图定位标记，明确数据归属
- 用纯 CSS/SVG 替代外部背景图，减少资源依赖
- 建立清晰的视觉层级：标题 > 关键数据（余量）> 辅助数据
- 保持与项目深色大屏主题一致的科技感风格
- 沿用现有 `MapText` + `_align` 机制，最小化改动范围

---

## 3. 视觉设计

### 3.1 整体结构

```
┌─────────────────────────┐
│ 💧 嘉宝北片              │  ← 标题栏：SVG小水滴图标 + 片区名
├─────────────────────────┤
│ 💧 水位      3.25 m     │  ← 辅助数据（灰色标签）
│ 📊 蓄量   1234.5 万方   │  ← 主要数据（蓝色高亮）
│ ✅ 余量    567.8 万方   │  ← 关键数据（绿色高亮 + 微背景）
└──────────┬──────────────┘
           │  (虚线连接)
           ▼
     🔵 水滴定位锚点  ← 落在实际坐标 (lgtd, lttd)
```

### 3.2 配色规范

| 元素 | 颜色 | 用途 |
|---|---|---|
| 卡片背景 | `rgba(5,25,45,0.94)` → `rgba(2,12,25,0.97)` 渐变 | 深色玻璃拟态 |
| 卡片边框 | `rgba(0,180,210,0.35)` | 青色半透明边框 |
| 标题文字 | `#b2ebf2` | 片区名称 |
| 标签文字 | `#78909c` | "水位"/"蓄量"/"余量" |
| 数值（水位） | `#e0e0e0` | 一般数据 |
| 数值（蓄量） | `#4fc3f7` | 重点数据，蓝色 |
| 数值（余量） | `#69f0ae` | 关键数据，绿色 |
| 余量行背景 | `rgba(105,240,174,0.08)` | 微妙的绿色高亮 |
| 水滴图标 | `#00e5ff` → `#006064` 渐变 | SVG linearGradient |
| 连接线 | `rgba(0,200,220,0.35)` dashed | 半透明虚线 |
| 卡片阴影 | `rgba(0,160,180,0.12)` | 微弱的青色辉光 |

### 3.3 定位锚点

用 SVG 水滴形状图标标记精确坐标，替代原来"无标记"的问题：

```svg
<svg width="22" height="28" viewBox="0 0 24 32">
  <defs>
    <linearGradient id="xsl-water-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#00e5ff"/>
      <stop offset="100%" stop-color="#006064"/>
    </linearGradient>
  </defs>
  <path d="M12 0C12 0 0 12 0 20c0 6.6 5.4 12 12 12s12-5.4 12-12C24 12 12 0 12 0z" fill="url(#xsl-water-grad)"/>
</svg>
```

### 3.4 4片区对齐方式（沿用现有逻辑）

| 片区 | align | 说明 |
|---|---|---|
| 嘉宝北片 | top | 卡片在点位上方 |
| 蕴南片 | right | 卡片在点位右侧 |
| 青松片 | left | 卡片在点位左侧 |
| 淀北片 | left | 卡片在点位左侧 |

连接线方向随 align 自适应：top/bottom 使用竖虚线，left/right 使用横虚线。

---

## 4. 技术方案

### 4.1 实现方式

沿用 `MapText` 组件生成 HTML overlay，将完整 HTML 结构传入 `text` 参数。`MapText` 检测到 `</` 字符会自动使用 `domConstruct.toDom()` 渲染 DOM。

### 4.2 文件改动

| 文件 | 改动类型 | 说明 |
|---|---|---|
| `src/utils/ArcGis/PointMark.js` | **新增** | 新增 `addXSLMarkNew` 函数，保留原 `addXSLMark` 不动 |
| `src/utils/ArcGis/PointMark.js` | **修改** | export 中增加 `addXSLMarkNew` |
| `src/components/menu/shuzidatingCXL.vue` | **修改** | `addXSLMap` 中调用 `PointMark.addXSLMarkNew` |
| `public/ArcGis/3.31/style/ledcss.css` | **新增样式** | 新增 `.xsl-marker-wrapper`、`.xsl-card`、`.xsl-connector`、`.xsl-anchor` 等 CSS 类 |

**不需要修改的文件：**
- `src/components/menu/shuzidatingCXL.vue` — `addXSLMap` 调用方式不变
- `public/ArcGis/3.31/myJs/MapText.js` — 通用组件，无需改动

### 4.3 HTML 模板结构

```html
<div class="xsl-marker-wrapper">
  <!-- 信息卡片 -->
  <div class="xsl-card">
    <div class="xsl-card-header">
      <svg>...</svg>  <!-- 标题栏小水滴图标 -->
      <span class="xsl-card-title">{MC}</span>
    </div>
    <div class="xsl-row">
      <span class="xsl-label">💧 水位</span>
      <span class="xsl-value">{z} <small>m</small></span>
    </div>
    <div class="xsl-row">
      <span class="xsl-label">📊 蓄量</span>
      <span class="xsl-value xsl-value--primary">{sl} <small>万方</small></span>
    </div>
    <div class="xsl-row xsl-row--highlight">
      <span class="xsl-label">✅ 余量</span>
      <span class="xsl-value xsl-value--accent">{ssl} <small>万方</small></span>
    </div>
  </div>
  <!-- 连接线 -->
  <div class="xsl-connector"></div>
  <!-- 定位锚点 -->
  <div class="xsl-anchor">
    <svg>...</svg>  <!-- 水滴定位图标 -->
  </div>
</div>
```

### 4.4 CSS 核心样式

卡片核心样式（写入 `ledcss.css`）：
- `.xsl-marker-wrapper` — flex 容器，根据 align 类名切换 flex-direction
- `.xsl-card` — 深色渐变背景 + 青色边框 + 圆角 + box-shadow 辉光
- `.xsl-card-header` — flex 行，border-bottom 分隔线
- `.xsl-row--highlight` — 余量行特有微绿色背景
- `.xsl-connector` — 虚线连接（border-left/border-top dashed）
- `.xsl-anchor` — 水滴 SVG 容器 + filter:drop-shadow 辉光

### 4.5 坐标处理

- 定位点坐标使用原始 `lgtd`/`lttd`（不再 `-0.012` 偏移）
- 卡片位置由 `MapText.setOffset()` 根据 `_align` 参数自动计算偏移
- `_align` 取值沿用现有逻辑（"top"/"bottom"/"left"/"right"）
- `offset` 参数传入 12（与原逻辑一致）

---

## 5. 数据流

```
shuzidatingCXL.vue addXSLMap()
  │
  ├─ 遍历 SHSLPArea.features (GeoJSON 4片区)
  ├─ 匹配 tableData (API返回的蓄量数据)
  ├─ 拼装 properties: {MC, lgtd, lttd, z, sl, ssl, drp}
  │
  └─→ PointMark.addXSLMark(resSualt, true)
        │
        ├─ CreateLayer("addXSLMark")
        ├─ require(["myJs/MapText", ...])
        ├─ 遍历 strJson:
        │   ├─ 构建 HTML 模板字符串 (纯 CSS/SVG)
        │   ├─ 根据 MC 确定 _align
        │   └─ new MapText(map, point, props, htmlStr, globallevel, _align, "", 12)
        └─ labels.push(label)
```

---

## 6. 边界情况

| 场景 | 处理方式 |
|---|---|
| 数据缺失（z/sl/ssl 为空） | 显示 "—"（沿用 `SetNull` 工具函数） |
| 无法匹配片区数据 | `properties` 不会被 push 到 `resSualt`，不渲染标注 |
| 缺少坐标（lgtd/lttd） | 跳过并 console.error（沿用现有逻辑） |
| 地图缩放级别 < globallevel | MapText 自动隐藏标签 |
| 纳雨能力 drp | 本期不展示（已在模板中移除，之前注释掉的第1782行） |

---

## 7. 风险与回滚

- **风险**：极低。新增独立方法 `addXSLMarkNew`，原 `addXSLMark` 不动
- **回滚**：`shuzidatingCXL.vue` 中改回调用 `PointMark.addXSLMark` 即可
- **测试**：在浏览器中打开 CXL 面板，确认4个片区标注正常显示
