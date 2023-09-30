<script setup>
import { ref , reactive , onMounted  , computed  } from 'vue'
import ShowTag from './components/ShowTag.vue'
import CloseButton from './components/CloseButton.vue'
import { UploadOutlined } from '@ant-design/icons-vue';


const filelist = ref([])
onMounted(async () => {
  const files = await myApi.getFilelist()
  filelist.value = files
  console.log('onMounted_files',files)

  let initData = await window.myApi.getTableConfig()
  console.log('initData',initData)
  tableConfig.push(... initData)
  
})

const showImgTagClick = (imgItem) =>{
  const files = myApi.sendToMain({...imgItem})
  console.log('showImgTagClick',imgItem)
}

const activeKey = ref(0)

const closeWindow = () => {
  window.close()
}



const tableConfig = reactive([])

const add = async (index) =>{

  let res = await window.myApi.copyFiles()
  console.log('copyFiles',res,index)
  if (res.copy) {
    tableConfig[index-1].data.push( ...res.files )

    //将响应式对象转为字符串发送
    window.myApi.setTableConfig(JSON.stringify(tableConfig))
  }
}

const tableData = computed(() => {

  return fn(tableConfig)
})

function fn(arr) {
  const newArr = reactive([])
   //push全部图片所属对象
   newArr.push({
      "GroupName": "全部",
      "data": []
    })
    //将其他的都添加进去
  newArr.push(...arr)
  //遍历，将所有文件添加到全部内
  for(let item of arr){
    for(let file of item.data ){
      newArr[0].data.push(file)
    }
  }
  console.log('newArr',newArr)
  return newArr
}

  const open = ref(false);

  const showModal = () => {
    open.value = true;
  };

  const handleOk = e => {
    console.log(e);
    open.value = false;
  };

</script>

<template>
  <div class="tab-container">
    <a-tabs  v-model:activeKey="activeKey">
      <a-tab-pane :key="index" :tab="tab.GroupName" v-for="(tab,index) in tableData">
        <div v-for="(imgItem,imgIndex) in tab.data" >
          <ShowTag  :cell="imgItem"  @click="showImgTagClick(imgItem)" ></ShowTag>
        </div>
      </a-tab-pane>
      <template #rightExtra>
        <div class="table-container" >
          
          
          <a-button v-show="activeKey !== 0" type="primary" @click="showModal">Open Modal</a-button>
          <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">

            <a-button type="primary" shape="circle" @click="add(activeKey)" >
              <template #icon><UploadOutlined /></template>
            </a-button>


          </a-modal>
          <CloseButton  @closeEvent="closeWindow" ></CloseButton>
      </div>

      </template>
    </a-tabs>
  </div>

 
</template>

<style lang="css">
.tab-container{
  padding: 20px 20px 20px 20px;
}
.table-container{
  display:flex;
  width:100%;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
}
.row {
  display:flex;
  width:100%;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
  }
</style>
