<script setup>
import { ref ,reactive,onMounted ,unref} from 'vue'
import ShowTag from './components/ShowTag.vue'



const filelist = ref([])
onMounted(async () => {
  const files = await myApi.getFilelist()
  filelist.value = files
  console.log('onMounted_files',files)

  
})

const showImgTagClick = (imgItem) =>{
  const files = myApi.sendToMain({...imgItem})
  console.log('showImgTagClick',imgItem)
}

const imgList = reactive([
  {
    "path":"icon.png"
  },
  {
    "path":"miao.png"
  }
])

</script>

<template>
  <div v-for="(imgItem,imgIndex) in filelist" >
    <ShowTag :id="imgIndex"  :src="imgItem.fullPath"  @click="showImgTagClick(imgItem)" ></ShowTag>
  </div>
</template>

<style lang="css">
.row {
  display:flex;
  width:100%;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
  }
</style>
