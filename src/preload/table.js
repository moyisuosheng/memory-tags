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



contextBridge.exposeInMainWorld('myApi', {
  getFilelist,
  sendToMain,
})
