import { app, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ref , reactive , inject } from 'vue'
const path = require('path')



//记忆标签的id
const tagId = ref(null)

const index = ref(null)


//回调函数
let callbackFun = null
// window.addEventListener('DOMContentLoaded', () => {
//   const els = document.getElementsByName('imgTag')
//   for (const el of els) {
//     el.addEventListener('mouseenter', () => {
//       ipcRenderer.send('set-ignore-mouse-events', false)
//     })
//     el.addEventListener('mouseleave', () => {
//       ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
//     })

//     el.addEventListener('click', async (event) => {
//       ipcRenderer.send('set-click-mouse-events', event.target.id)
//       console.log('e.target.id', event.target.id)
//       //设置当前标签id
//       tagId.value = event.target.id
//       //console.log('res',res,(event.target).id)
//       //event.target.src = './src/public/miao.jpg'
//     })
//   }
// })

//接收消息
ipcRenderer.on('receive-messages', (event, data) => {
  callbackFun(index.value,data)
  console.log('主渲染程序', index.value)
  // console.log('主渲染程序', tagId.value, data)
  // let obj = document.getElementById(tagId.value)
  // obj.src = data //能设置
  
})

// Custom APIs for renderer
// const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', electronAPI)
//     contextBridge.exposeInMainWorld('api', api)
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   window.electron = electronAPI
//   window.api = api
// }



const appMouseEnter = async () => {
  ipcRenderer.send('set-ignore-mouse-events', false)
}

const appMouseLeave = async () => {
  ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
}

const appClick = (num) => {
  index.value = num
  console.log('appClick', index.value)
  ipcRenderer.send('set-click-mouse-events', event.target.id)
}

//获取默认图片路径
const getDefaultImage = async() => {
  const defaultPath = await ipcRenderer.invoke('get-default-image-path')
  return defaultPath
}

const inntFun = (fun) => {
  callbackFun = fun
}

contextBridge.exposeInMainWorld('myApi', {
  appMouseEnter,
  appMouseLeave,
  appClick,
  inntFun,
  getDefaultImage,
})