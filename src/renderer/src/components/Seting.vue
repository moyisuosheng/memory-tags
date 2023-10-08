<script setup>
import Show from './Show.vue'
import Stat from './State.vue'
import SaveConfig from './SaveConfig.vue'
</script>

<template>
  <div class="seting-box">
    <div class="seting-block">
      <Show></Show>
    </div>
    <div class="seting-block">
      <Stat></Stat>
    </div>
    <div class="seting-block">
      <SaveConfig></SaveConfig>
    </div>
  </div>
</template>

<style lang="css" scoped>
.seting-block{
  flex: 1;
  width: 25px;
  height: 25px;
}
.seting-box{
  top: 0px;
  left: 50px;
  height: 35px;
  width: 90px;
  background-color: aqua;
  border-radius: 0px 0px 10px 10px;
  text-align: center;
  position: fixed;
  z-index: 101;

  display: flex;
  align-items: center;/*垂直居中*/
  justify-content: space-between;/*水平居中*/

  box-shadow: rgba(0,0,0,0.15) 0px 0px 8px 0px;
}


</style>
