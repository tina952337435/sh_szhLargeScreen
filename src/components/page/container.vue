<template>
    <div class="container">
        <div id="mainTabs" class="mini-tabs" activeIndex="0" style="height:100%;" plain="false" buttons="#tabsButtons"
            arrowPosition="side" showHeader="false">
        </div>
        <div id="tabsButtons" style="display:none;">
            <a class="tabsBtn" onclick="loadTab()"><i class="fa fa-refresh"></i></a>
            <a class="tabsBtn" onclick="RemoveTab()"><i class="fa fa-remove"></i></a>
            <a class="tabsBtn" onclick="AllTab()"><i class="fa fa-arrows-alt"></i></a>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from "vue";

import { Coin, House, Calendar, Wallet, Monitor } from "@element-plus/icons-vue";
import { format } from "date-fns";
</script>