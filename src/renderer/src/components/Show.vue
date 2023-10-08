<script setup>
import { inject } from 'vue'
const { switchDisplay } = inject('seting')
</script>

<template>
  <label class="show" >
  <input  type="checkbox" @click="switchDisplay">
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" ><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>
</label>
  
</template>

<style lang="css" scoped>

.show {
  --color: #fff;
  --size: 100%;
  height: 100%;
  width: 100%;
  cursor: pointer;
  fill: var(--color);
  font-size: var(--size);
  }
  
  .show input {
    display: none;
    
  }
  
  .show svg {
    /* The size of the SVG defines the overall size */
    height: 100%;
    /* Define the transition for transforming the SVG */
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);

  }
  
  .line {
    fill: none;
    stroke: white;
    
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    /* Define the transition for transforming the Stroke */
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
                stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .line-top-bottom {
    stroke-dasharray: 12 63;
    
  }
  
  .show input:checked + svg {
    transform: rotate(-180deg);
  }
  
  .show input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
    
  }
  
</style>


