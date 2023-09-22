<script setup>
import { ref ,onMounted} from 'vue'


</script>

<template>
        <img class="img" name="showImgTag" draggable="false" alt="image"  />
</template>

<style lang="css">
.img{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    /* -webkit-app-region: no-drag; */
}
.img:hover {
    opacity: 0.6;
}

</style>
