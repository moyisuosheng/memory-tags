<script setup>
import { ref , reactive , provide , computed ,onMounted , onBeforeMount} from 'vue'

import Tag from './components/Tag.vue'

//列数
const columns  = ref(4)
//总数
const total = ref(16)

const list = reactive([])

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
        
const publishedBooksMessage = computed(() => {
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

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})

</script>

<template>
  <div v-for="(rows,rowIndex) in publishedBooksMessage">
    <div class="row">
      <div v-for="(cell,colIndex) in rows" id="tab" @mouseenter="appMouseEnter" @mouseleave="appMouseLeave" @click="appClick(cell)">
          <Tag  :cell="cell"   ></Tag>
        </div>
    </div>
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
