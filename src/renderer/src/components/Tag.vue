<script setup>
import { ref , inject } from 'vue'
const props = defineProps({
    cell: Object
  })
</script>

<template>
        <img class="img" draggable="false" :src="props.cell.path" :alt="modelValue"  />
        <div>
            {{ props.cell.name }}
        </div>
</template>

<style lang="css">
.img{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    opacity: 0.8;
    /* -webkit-app-region: no-drag; */
}
.img:hover {
    opacity: 0.6;
}
</style>
