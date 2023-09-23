import {  is } from '@electron-toolkit/utils'
const { ipcMain } = require('electron')
const fs = require('fs')
const { readdir } = require('fs/promises')
const path = require('path')

const getDefaultImagePath = () =>{
  if( is.dev ){
    const resourcesPath = path.resolve(__dirname, '../../resources/')
    return resourcesPath
  }else{
    // win：图片存储地址 C:\Users\moyis\AppData\Local\Programs\memory-tags\resources\app.asar.unpacked\resources
    const resourcesPath = process.resourcesPath + '/app.asar.unpacked/resources/'
    return resourcesPath
  }
}


//通过主进程获取默认图片地址
ipcMain.handle('get-default-image-path', async () => {
  return getDefaultImagePath()
})


ipcMain.handle('on-getfiles-event', async (e, arg) => {

  // win：图片存储地址 C:\Users\moyis\AppData\Local\Programs\memory-tags\resources\app.asar.unpacked\resources
  const resourcesPath = getDefaultImagePath()
  const files = await readdir(resourcesPath)
  // console.log('resourcesPath',resourcesPath)
  // console.log('files',files)
  let paths = []
  for(let file of files){
    paths.push({
       "fullPath": resourcesPath + '\\' + file,
       "path": resourcesPath + '\\',
       'name' : file.substring(0, file.lastIndexOf(".")),
       "fileName" : file
    })
  }
  return paths
})