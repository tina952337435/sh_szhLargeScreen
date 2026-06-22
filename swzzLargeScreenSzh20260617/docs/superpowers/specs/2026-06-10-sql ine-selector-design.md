# SQLine.vue 站点选择下拉框改可输入关键字设计

## 一、需求背景

站点数量较多，当前 `el-cascader` 下拉框无法通过关键字快速定位站点，用户需滚动查找，体验不佳。

## 二、设计目标

将站点选择下拉框改为**可输入关键字搜索**的下拉框，支持**任意位置模糊匹配**。

## 三、方案选择

**方案一：el-select 替换 el-cascader**（推荐）

- Element Plus 的 `el-select` 内置 `filterable`，默认就是任意位置模糊匹配
- 代码改动最小，语义更准确——当前数据是扁平单层（children 永远为空），用 cascader 是误用
- 后续维护更清晰

## 四、详细设计

### 4.1 组件替换

**改动位置**：SQLine.vue:8

| 改动前 | 改动后 |
|--------|--------|
| `el-cascader` | `el-select` + `el-option` |

```html
<!-- 改动后 -->
<el-select style="max-width: 120px;" v-model="value" filterable placeholder="请选择站点" @change="handleChange">
    <el-option v-for="item in Liststnm" :key="item.value" :label="item.label" :value="item.value" />
</el-select>
```

### 4.2 数据结构

`Liststnm` 当前格式：
```js
{
    value: stcd,    // 站点编码
    label: stnm,    // 站点名称
    children: []    // 扁平数据，此处为空
}
```

替换后 `el-option` 直接遍历 `Liststnm`，**数据结构无需改动**。

### 4.3 样式适配

**改动位置**：SQLine.vue 706-738行（`<style lang="scss">` 块）

新增以下样式：

```scss
/* 站点选择 - el-select 适配 */
.el-select {
    height: 29px;
    
    .el-select__wrapper {
        min-height: 29px;
        height: 29px;
        background-color: transparent;
        box-shadow: 0 0 0 1px var(--popContentHeadbg) inset;
    }
    
    .el-select__selection {
        line-height: 27px;
    }
}

.el-select-dropdown {
    max-height: 300px;    /* 限制下拉高度 */
    overflow-y: auto;      /* 超出滚动 */
    
    .el-select-dropdown__item {
        padding: 0 10px;
        width: 118px;
        color: var(--widgetcolor);
        
        &.hover,
        &:hover {
            background: var(--popContentHeadbg);
        }
        
        &.selected {
            color: var(--swDivSelectcolor);
            font-weight: bold;
        }
    }
}

.el-popper.is-light.el-select-dropdown {
    border: 1px solid var(--popContentHeadbg);
    background: var(--boxtitlebg);
}
```

**样式复用**：
- 下拉框高度保持 29px（和现在 el-input 一致）
- 下拉项宽度 118px（复用原有 cascader 样式）
- 主题色变量复用已有配置

### 4.4 交互行为

| 行为 | 说明 |
|------|------|
| 点击下拉 | 显示完整站点列表（最大高度300px，超出滚动） |
| 输入关键字 | 实时过滤，任意位置模糊匹配 |
| 选择站点 | 触发 `handleChange(value)`，同原来逻辑 |
| placeholder | 显示"请选择站点"，主题色适配 |

### 4.5 handleChange 逻辑

逻辑保持不变：
```js
function handleChange(value) {
    stcd.value = value[0];  // 取站点编码
    // ...原有逻辑
}
```

## 五、需改动文件

- `src/components/danzhan/sq/SQLine.vue`

## 六、验收标准

1. 下拉框可输入关键字进行任意位置模糊搜索
2. 下拉列表最大高度300px，超出显示滚动条
3. 主题色与页面整体风格一致
4. 选择站点后行为与原来一致