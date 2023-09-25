<script setup>
import { ref , reactive , computed ,onMounted , onBeforeMount } from 'vue'

import Show from './Show.vue'
import Stat from './State.vue'



</script>

<template>
  <div class="fix-box">
    <div class="block">
        <Show  ></Show>
    </div>
    <div class="block">
        <Stat  ></Stat>
    </div>

  </div>
</template>

<style lang="css">
.block{
    width: 25px;
    height: 25px;
}


.fix-box{
  top: 0px;
  left: 50px;
  height: 35px;
  width: 60px;
  background-color: aqua;
  border-radius: 0px 0px 10px 10px;
  text-align: center;
  position:fixed;
  z-index:101;

  display:flex;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/


  box-shadow: rgba(0,0,0,0.15) 0px 0px 8px 0px;
}
</style>
