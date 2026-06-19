<template>
    <div class="breadcrumb">
        <ul>
            <li v-for="(crumb, index) in breadcrumbs" :key="index">
                <a v-if="index < breadcrumbs.length - 1" @click="navigate(crumb.path)">{{ crumb.text }}</a>
                <span v-else>{{ crumb.text }}</span>
                <button v-if="closable && index < breadcrumbs.length - 1" @click="removeCrumb(index)">&times;</button>
            </li>
        </ul>
    </div>
</template>
   
<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
    breadcrumbs: {
        type: Array,
        default: () => [],
    },
    closable: {
        type: Boolean,
        default: false,
    },
});
function navigate(path) {
    // 导航逻辑，例如：this.$router.push(path)
}
function removeCrumb(index) {
    // 移除面包屑中的项，需要发送一个事件给父组件或者直接操作breadcrumbs数组
    this.$emit('remove-crumb', index);
}
</script>
   
<style scoped>
.breadcrumb ul {
    list-style: none;
    display: flex;
}

.breadcrumb li {
    margin-right: 10px;
}

.breadcrumb button {
    margin-left: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
}
</style>