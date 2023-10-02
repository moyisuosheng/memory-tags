<script setup>
import { inject } from 'vue'
import { SaveOutlined } from '@ant-design/icons-vue'
const { saveMainConfig } = inject('seting')
</script>

<template>

    <div @click="saveMainConfig">
        <SaveOutlined style="color: white;"/>
    </div>

</template>

<style lang="css" scoped>

</style>
