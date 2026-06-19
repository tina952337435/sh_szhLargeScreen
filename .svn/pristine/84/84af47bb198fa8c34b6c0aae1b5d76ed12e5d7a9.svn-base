<template>
    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    children: 'children',
    label: 'label',
    treeData: {
        type: Array,
        required: true,
    },
});
function handleNodeClick(data) {
    console.log(data);
}
</script>
