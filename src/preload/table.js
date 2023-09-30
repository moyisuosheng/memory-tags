import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// window.addEventListener('DOMContentLoaded', () => {
//   const els = document.getElementsByName('showImgTag')
//   for (const el of els) {
//     el.addEventListener('click', async (event) => {
//       console.log('click')
//       ipcRenderer.send('forward-send-to-main-service', imgItem)
      
//     })
//   }
// })

//向主进程发送消息
const sendToMain = async(imgItem)  => {
  ipcRenderer.send('forward-send-to-main-service', imgItem)
}


const getFilelist = async () => {
  const filelist = await ipcRenderer.invoke('on-getfiles-event')
  console.log('filelist',filelist)
  return filelist
}

const copyFiles = async() =>{
  return await ipcRenderer.invoke('copy-files')
}


 const getTableConfig = async() =>{
  return await ipcRenderer.invoke('get-table-config')
}
const setTableConfig = async(obj) =>{
  console.log('setTableConfig',obj)
  return await ipcRenderer.invoke('set-table-config',obj)
}

contextBridge.exposeInMainWorld('myApi', {
  getFilelist,
  sendToMain,
  copyFiles,
  getTableConfig,
  setTableConfig,
})
