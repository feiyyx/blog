<script setup lang="ts">
import { useGlobalValueStore } from '@/stores/common.store';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

const globalValueStore = useGlobalValueStore();

onMounted(async () => {
    await globalValueStore.getTagMapAction();
});
</script>

<template>
    <RouterView />
</template>

<style scoped>
</style>
