<script setup>
import { ref , reactive , onMounted  , computed , onBeforeMount} from 'vue'
import ShowTag from './components/ShowTag.vue'
import CloseButton from './components/CloseButton.vue'
import { UploadOutlined , DeleteOutlined , FolderOpenOutlined , EditOutlined , CloseOutlined , FileTextOutlined } from '@ant-design/icons-vue';

onBeforeMount(async () => {
  let initData = await window.myApi.getTableConfig()
  console.log('initData',initData)
  tableConfig.push(... initData)
  
})

onMounted(async () => {
  // let initData = await window.myApi.getTableConfig()
  // console.log('initData',initData)
  // tableConfig.push(... initData)
})

const showImgTagClick = (imgItem) =>{
  const files = myApi.sendToMain({...imgItem})
  //console.log('showImgTagClick',imgItem)
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
    //window.myApi.setTableConfig(JSON.stringify(tableConfig))
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
  //将响应式对象转为字符串发送
  window.myApi.setTableConfig(JSON.parse(JSON.stringify(tableConfig)))
};


const deleteImage = async ( activeKey , index) =>{
  tableConfig[ activeKey - 1].data.splice(index,1)
}

const openResourcesPath = () =>{
  window.myApi.openResourcesPath()
}

const openConfigPath = () =>{
  window.myApi.openConfigPath()
}
</script>

<template>
  <div class="tab-container">
    <a-tabs  v-model:activeKey="activeKey">
      <a-tab-pane :key="index" :tab="tab.GroupName" v-for="(tab,index) in tableData">
        <div class="tab-cell" v-for="(imgItem,imgIndex) in tab.data" >
            <ShowTag  :cell="imgItem"  @click="showImgTagClick(imgItem)" ></ShowTag>
            
        </div>
      </a-tab-pane>
      <template #rightExtra>
        <div class="table-container" >
          <a-space align="baseline">
            <a-button v-show="activeKey === 0" type="primary" shape="circle" @click="openConfigPath" >
              <template #icon><FileTextOutlined /></template>
            </a-button>

            <a-button v-show="activeKey !== 0" type="primary" shape="circle" @click="showModal" >
              <template #icon><EditOutlined /></template>
            </a-button>

            <a-button type="primary" shape="circle" style="background-color: red;" @click="closeWindow" >
              <template #icon><CloseOutlined style="color: white;background-color: transparent;"/></template>
            </a-button>
          </a-space>


          <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
            <a-list size="small" bordered :data-source="tableData[activeKey].data">
              <template #renderItem="{ item , index }">
                <a-list-item>
                  <ShowTag  :cell="item" ></ShowTag>
                  <span>
                    <a-button type="primary" shape="circle" style="background-color: red;" @click="deleteImage(activeKey,index)" >
                      <template #icon><DeleteOutlined style="color: white;background-color: transparent;" /></template>
                    </a-button>
                  </span>
                </a-list-item>
              </template>
              <template #header>
                <a-button type="primary" shape="circle" @click="add(activeKey)" >
                  <template #icon><UploadOutlined /></template>
                </a-button>
              </template>
              <template #footer>
                <a-button type="primary" shape="circle" @click="openResourcesPath" >
                  <template #icon><FolderOpenOutlined /></template>
                </a-button>
              </template>
            </a-list>
          </a-modal>


          <!-- <CloseButton  @closeEvent="closeWindow" ></CloseButton> -->
      </div>

      </template>
    </a-tabs>
  </div>

 
</template>

<style lang="css" scoped>
.tab-container{
  padding: 20px 20px 20px 20px;
}
.table-container :deep(.anticon){
  display:flex;
  width:100%;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
}
.tab-cell{
  margin-bottom: 15px;
}
.row {
  display:flex;
  width:100%;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
  }

</style>
