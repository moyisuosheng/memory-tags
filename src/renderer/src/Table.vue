<script setup>
import { ref ,reactive,onMounted ,unref} from 'vue'
import ShowTag from './components/ShowTag.vue'
import CloseButton from './components/CloseButton.vue'


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

const activeKey = ref('1')

const closeWindow = () => {
  window.close()
}


</script>

<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Tab 1">
      <div v-for="(imgItem,imgIndex) in filelist" >
        <ShowTag :id="imgIndex"  :src="imgItem.fullPath"  @click="showImgTagClick(imgItem)" ></ShowTag>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2">Content of tab 2</a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3">Content of tab 3</a-tab-pane>
    <template #tabBarExtraContent>
      <CloseButton  @closeEvent="closeWindow" ></CloseButton>
    </template>
  </a-tabs>
 
</template>

<style lang="css">
.row {
  display:flex;
  width:100%;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
  }
</style>
