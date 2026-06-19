<template>
  <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" @tab-click="handleTabClick"
    @tab-remove="removeTab">
    <el-tab-pane v-for="item in props.listReust" :key="item.name" :label="item.title" :name="item.name">
      <!-- {{ item.content }} -->
      <!-- 动态组件，其组件由is属性指定 -->
      <component :is="currentModule"></component>
    </el-tab-pane>
  </el-tabs>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, watch, defineAsyncComponent, inject } from 'vue'
import type { TabPaneName } from 'element-plus'
const props = defineProps({
  listReust: {
    type: Array,
    default: [],
  },
});

const currentModule = ref(null);

const editableTabsValue = ref('')
// 注入父组件提供的方法
const parentMethod = inject('parentMethod');


//监听数据信息
watch(
  () => props.listReust,
  () => {
    if (props.listReust.length > 0) {
      const itemList = props.listReust;
      editableTabsValue.value = itemList[itemList.length - 1]["name"];
      currentModule.value = defineAsyncComponent(() =>
        import(`../../../components/menu/logging/${editableTabsValue.value}.vue`)
      );
    }
  },
  {
    deep: true,
    immediate: true,
  }
)
onMounted(() => {
  setTimeout(function () {
    if (props.listReust.length > 0) {
      editableTabsValue.value = props.listReust[props.listReust.length - 1]["name"];
      currentModule.value = defineAsyncComponent(() =>
        import(`../../../components/menu/logging/${editableTabsValue.value}.vue`)
      );
    }
  }, 1000)

})
const removeTab = (targetName) => {
  const tabs = props.listReust
  var oneResult = tabs.filter((tab) => {
    return tab.name !== targetName;
  })
  if (parentMethod) {
    parentMethod(targetName);
  }
  props.listReust.length = 0;
  if (oneResult.length > 0) {
    for (let num = 0; num < oneResult.length; num++) {
      props.listReust.push(oneResult[num])
    }
  }
}

const handleTabClick = (tab, event) => {
  var item = tab.props;
  let myUril = item["name"];
  // myUril=myUril;.
    currentModule.value = defineAsyncComponent(() =>
      import(`../../../components/menu/logging/${myUril}.vue`)
    );
}


</script>
  
<style>
.demo-tabs>.el-tabs__content {
  padding: 5px;
  font-size: 32px;
  font-weight: 600;
  color: var(--sel_wraplabelcolorSel);
  border: var(--portalborder);
  background: var(--portal);
}

.el-tabs__item {
  color: var(--widgetcolor);
}
</style>