<script setup>
import { ref , reactive , computed ,onMounted , onBeforeMount , provide , watch } from 'vue'
import Seting from './components/Seting.vue'
import Tag from './components/Tag.vue'

import { message } from 'ant-design-vue';
//列数
const columns = ref(4)

const list = reactive([])

//默认地址
const defaultImagePath = ref(undefined)


const mainConfig = reactive({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  total: 0,
  setingLeft: 5,
})

//默认图片名称
const defaultImgName = ref('待定.png')


//点击时，调用注册的点击事件
const appClick =  (cell) =>{
  console.log('vue-appClick',cell)
   window.myApi.appClick(cell.index)
}

const appMouseEnter = async () =>{
  await window.myApi.appMouseEnter()
}

const appMouseLeave = async () =>{
  await window.myApi.appMouseLeave()
}

const callback =  (index,data) => {
  console.log('callback',index,data)
  list[index].path = data.fullPath
  list[index].name = data.name
}


//当总数发生改变时，改变list
watch(
  () => mainConfig.total,
  async (newValue) => {
    if (defaultImagePath.value === undefined) {
      defaultImagePath.value = (await window.myApi.getDefaultImage()) + '/' + defaultImgName.value
      console.log('defaultImagePath.value',defaultImagePath.value)
    }
    
    const len = list.length
    for (let index = len; index < newValue; index++) {
      list.push({
        path: defaultImagePath.value,
        name: '待定',
        index: index,
        display: true
      })
      
    }
    console.log('watch-list',list)
  }
)

//侦听默认图片路径，修改源数据
// watch(defaultImagePath, (newDefaultImagePath) => {
//   for (let index = 0; index < list.length; index++) {
//     list[index].path = newDefaultImagePath
//     console.log('list['+index+']',list[index])
//   }
//   console.log('watch-defaultImagePath',list)
// })

        
const calculatedTags = computed(() => {
  return fn(list, columns.value, mainConfig.total)
})


function fn(arr, columns, numTotal) {
  let newArr = []
  let array = arr.slice(0,numTotal)
  array.forEach((it,idx) => {
    const rows = Math.floor(idx / columns) //判断当前在第几个数组内
    if(!(newArr[rows])){ //判断当前是否有数组
        newArr[rows]=[]  //如果没有赋值一个空
    }
    newArr[rows].push(it) // 并且把当前对应的索引里面进行添加
  });
  // console.log('newArr',newArr)
  return newArr
}


onMounted(async () => {

})

onBeforeMount(async () => {
  //将函数暴露给预加载脚本
  window.myApi.inntFun(callback)
  //获取配置
  let config = await window.myApi.getMainConfig()
  mainConfig.top = config.top
  mainConfig.left = config.left
  mainConfig.width = config.width
  mainConfig.height = config.height
  mainConfig.total = config.total
  mainConfig.setingLeft = config.setingLeft
})



//显示图片组件


const showTagsStyle = computed(() => {
  return {
    top: mainConfig.top + '%',
    left: mainConfig.left + '%',
  }
})

const setingStyle = computed(() => {
  return {
    left: mainConfig.setingLeft + '%',
  }
})

//控制整体是否显示
const isShow = ref(true)

//控制设置条是否显示
const isShowConfig = ref(false)

//切换整体显示状态
const switchDisplay = () =>{
  isShow.value = !isShow.value
  console.log('switchDisplay',isShow.value)
}
//切换设置条显示状态
const switchDisplayStatus = () =>{
  isShowConfig.value = !isShowConfig.value
  console.log('switchDisplayStatus',isShowConfig.value)
}

const saveMainConfig = async() =>{
  await window.myApi.setMainConfig(JSON.parse(JSON.stringify(mainConfig)))
  message.success('页面配置已保存！');
}

provide('seting', {
  switchDisplay,
  switchDisplayStatus,
  saveMainConfig,
})

//将竖直 滑动输入条置反
const reverse = ref(true);
</script>

<template >
  <div class="container">
    <div  class="fix-box-seting" :style="setingStyle" >
      <div @mouseenter="appMouseEnter" @mouseleave="appMouseLeave" >
        <Seting ></Seting>
      </div>
    </div>

    <div v-show="isShowConfig && isShow" class="slider-horizontal" >
      <div @mouseenter="appMouseEnter" @mouseleave="appMouseLeave">
        <a-slider v-model:value="mainConfig.setingLeft" :max="95" />
        <a-slider v-model:value="mainConfig.left" :max="100" />
        <a-slider v-model:value="mainConfig.width" :max="500" />
        <a-input-number size="small" :min="1" :max="16" v-model:value="mainConfig.total" />
      </div>
    </div>

    <div v-show="isShowConfig && isShow" class="slider-vertical" @mouseenter="appMouseEnter" @mouseleave="appMouseLeave" >
      <div style="display: inline-block; height: 100%; margin-left: 70px"  >
        <a-slider vertical v-model:value="mainConfig.top" :max="100" :reverse="reverse"/>
      </div>
      <div style="display: inline-block; height: 100%;" >
        <a-slider vertical v-model:value="mainConfig.height" :max="500" :reverse="reverse"/>
      </div>
    </div>

    <div v-show="isShow" class="fix-box-tags" :style="showTagsStyle">
      <a-space :size="mainConfig.height" direction="vertical" align="start">
        <div v-for="rows in calculatedTags">
          <div class="row">
            <a-space :size="mainConfig.width">
              <div v-for="cell in rows" id="tab" @mouseenter="appMouseEnter" @mouseleave="appMouseLeave" @click="appClick(cell)">
                  <Tag  :cell="cell" ></Tag>
              </div>
            </a-space>
          </div>
        </div>
      </a-space>
    </div>
  </div>


</template>

<style lang="css" scoped>
.slider-vertical{
  height: 80%;
  text-align: center;
  top:10%;
  right: 10%;
  position:fixed;
  z-index:101;
}
.slider-horizontal{
  width: 80%;
  text-align: center;
  top:35px;
  right: 10%;
  position:fixed;
  z-index:101;
}
a-slider{
  handleColor: red;
}
.container{
  height: 100%;
  width: 100%;

}
.fix-box-seting{
  top: 0px;
  left: 80%;
  position:fixed;
  z-index:100;
  display:flex; 
}
.fix-box-tags{
  text-align: center;
  position:fixed;
  z-index:100;
}
.fix-box-height{
  height: 100%;
  width: 80%;
  top:10%;
  right: 10%;
  position:fixed;
  z-index:101;
}
.row {
  display:flex;
  width:100%;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
}
</style>
