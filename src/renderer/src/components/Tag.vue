<script setup>
import { ref , inject } from 'vue'
const props = defineProps({
    cell: Object
  })
</script>

<template>
    <div class="tag-container">
        <img class="tag-img" draggable="false" :src="props.cell.path" :alt="modelValue"  />
        <div class="tag-text">
            {{ props.cell.name }}
        </div>
    </div>
</template>

<style lang="css" scoped>
.tag-container{
    height: 60px;
    width: 60px;

    align-items:center;/*垂直居中*/

}
.tag-img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    opacity: 0.8;
    /* -webkit-app-region: no-drag; */
    box-shadow: rgba(0, 0, 0, 0.571) 0px 0px 0px 3px ;
}
.tag-text{
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



}
.img:hover {
    opacity: 0.6;
}
</style>
