<script setup>
import { ref , reactive , computed ,onMounted , onBeforeMount , provide} from 'vue'
import Seting from './components/Seting.vue'
import Tag from './components/Tag.vue'

//列数
const columns  = ref(4)
//总数
const total = ref(16)

const list = reactive([])


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



function fn(arr, num) {
    let newArr = []
    arr.forEach((it,idx) => {
        const total = Math.floor(idx / num) //判断当前在第几个数组内
        if(!(newArr[total])){ //判断当前是否有数组
            newArr[total]=[]  //如果没有赋值一个空
        }
        newArr[total].push(it) // 并且把当前对应的索引里面进行添加
    });
    return newArr
}
        
const calculatedTags = computed(() => {
  return fn(list,columns.value)
})

onMounted(async () => {
  const defaultImagePath = (await window.myApi.getDefaultImage()) + '/' + defaultImgName.value
  console.log('defaultImagePath', defaultImagePath )
  let array = []
  for(let i = 0; i < total.value ; i++){
    array.push({
      "path": defaultImagePath,
      'name':'待定',
      "index": i,
    })
  }
  //填充数据
  list.push(...array)
})

//将函数暴露给预加载脚本
onBeforeMount(async () => {
  window.myApi.inntFun(callback)
})

const width = ref(60)
const height = ref(60)

//显示图片组件
const showTagsStyleTopAndLeft = reactive({
  top: 30,
  left: 30

})

const showTagsStyle = computed(() => {
  return {
    top: showTagsStyleTopAndLeft.top + '%',
    left: showTagsStyleTopAndLeft.left + '%',
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

provide('seting', {
  switchDisplay,
  switchDisplayStatus
})

//将竖直 滑动输入条置反
const reverse = ref(true);
</script>

<template >
  <div class="container">
    <div  class="fix-box-seting" >
      <div @mouseenter="appMouseEnter" @mouseleave="appMouseLeave" >
        <!-- <Show @updateShowEvent = "switchDisplay"></Show>
        <Stat  @updateStateEvent="switchDisplayStatus" ></Stat> -->

        <Seting ></Seting>
      </div>
    </div>

    <div v-show="isShowConfig && isShow" class="slider-horizontal" >
      <div @mouseenter="appMouseEnter" @mouseleave="appMouseLeave">
        <a-slider v-model:value="showTagsStyleTopAndLeft.left" max="100" />
        <a-slider v-model:value="width" max="500" />
        
      </div>
    </div>

    <div v-show="isShowConfig && isShow" class="slider-vertical" @mouseenter="appMouseEnter" @mouseleave="appMouseLeave" >
      <div style="display: inline-block; height: 100%; margin-left: 70px"  >
        <a-slider vertical v-model:value="showTagsStyleTopAndLeft.top" max="100" :reverse="reverse"/>
      </div>
      <div style="display: inline-block; height: 100%;" >
        <a-slider vertical v-model:value="height" max="500" :reverse="reverse"/>
      </div>
    </div>

    <div v-show="isShow" class="fix-box-tags" :style="showTagsStyle">
      <a-space :size="height" direction="vertical">
        <div v-for="rows in calculatedTags">
          <div class="row">
            <a-space :size="width">
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

<style lang="css">
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
  top: 10px;
  left: 50px;
  text-align: center;
  position:fixed;
  z-index:100;

  display:flex;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
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
