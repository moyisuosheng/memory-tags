<script setup>
import { ref , inject } from 'vue'
const props = defineProps({
    cell: Object
  })
</script>

<template>
    <div class="show-tag-container">
        <img class="show-tag-img" draggable="false" :src="props.cell.fullPath" :alt="modelValue"  />
        <div class="show-tag-text">
            {{ props.cell.name }}
        </div>
    </div>
</template>

<style lang="css" scoped>
.show-tag-container{
    height: 60px;
    width: 60px;

    align-items: center; /*垂直居中*/
    
}
.show-tag-img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    opacity: 0.8;
    /* -webkit-app-region: no-drag; */
    box-shadow: rgb(40,45,85) 0px -2px 0px 0px inset,rgb(81,87,125) 0px 0px 1px 1px inset,rgba(3,4,9,0.3) 0px 2px 2px 0px;
}
.show-tag-text{
    background-color:dimgray;
    width: 60%;
    height: 20px;

    color:aliceblue;
    font-family: 'Courier New', Courier, monospace;

    text-align: center;
    line-height:20px;
    
    position: relative;
    top: -10px;
    left: 20%;
    border-radius: 5px 5px 5px 5px;
    opacity: 0.8;

    cursor: pointer;
    -webkit-user-seletct: none;
    -moz-user-seletct: none;
    user-select: none;
}
.img:hover {
    opacity: 0.6;
}
</style>
