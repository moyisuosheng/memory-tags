import {  is  } from '@electron-toolkit/utils'
const { ipcMain , app , dialog , BrowserWindow , shell } = require('electron')
const fs = require('fs')
const { readdir } = require('fs/promises')
const path = require('path')
import { ref, reactive } from 'vue'

//本地存储
const Store = require('electron-store')
const store = new Store()


//初始化配置文件
function initConfig(){

    try{
      //表格页面配置
      if(store.get('tableConfig') === undefined){
        let initData = [
          {
            "GroupName": "好鹅",
            "data": []
          },
          {
            "GroupName": "坏鸭",
            "data": []
          },
          {
            "GroupName": "中立",
            "data": []
          }
        ]
        store.set('tableConfig', initData);
        console.log('已成功初始化表格配置文件!');
      }
    }
    catch(e){
      console.log('表格配置文件初始化失败!', e );
    }

    try{
      //主页面配置
      if(store.get('mainConfig') === undefined){
        let initData = {
          top: 30,
          left: 30,
          width: 60,
          height: 60,
          total: 16,
        }
        store.set('mainConfig', initData);
        console.log('已成功初始化主页面配置文件!');
      }
    }
    catch(e){
      console.log('主页面配置文件初始化失败!', e );
    }
}

initConfig()

console.log('app.getPath("userData")',app.getPath("userData"))
console.log('app.getPath("appData")',app.getPath("appData"))
console.log('app.getPath("cache")',app.getPath("cache"))
console.log('app.getPath("temp")',app.getPath("temp"))
console.log('app.getPath("exe")',app.getPath("exe"))

//图片默认保存地址
const resourcesPath = ref(undefined)

//获取图片默认存储地址
// win：图片存储地址 C:\Users\moyis\AppData\Local\Programs\memory-tags\resources\app.asar.unpacked\resources
const getDefaultImagePath = () =>{
  if(resourcesPath.value === undefined){
    if( is.dev ){
      resourcesPath.value = path.resolve(__dirname, '../../resources/')
      return resourcesPath.value
    }else{
      resourcesPath.value = process.resourcesPath + '\\app.asar.unpacked\\resources\\'
      return resourcesPath.value
    }
  }else{
    return resourcesPath.value
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
  console.log('paths',paths)
  return paths
})


//通过dialog打开文件夹选中多个文件
const selectFiles = async () =>{
  let win = BrowserWindow.getFocusedWindow();
  let files = await dialog.showOpenDialog(win,{
      defaultPath : getDefaultImagePath() ,
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: [ 'png' ] },
      ]
    }) 
  console.log('selectFiles',files)
  return files
  // return new Promise(path.resolve => {
    
  // })
}

const selectFile = async() =>{
  let files = await dialog.showOpenDialog({
      defaultPath : getDefaultImagePath() ,
      properties: [ 'openFile' ],
      filters: [
        { name: 'Images', extensions: [ 'png' ] },
      ]
    }) 
  console.log('selectFile',files)
  return files
  // return new Promise(path.resolve => {
    
  // })
}


ipcMain.handle('select-files', async (e, arg) => {
  // win：图片存储地址 C:\Users\moyis\AppData\Local\Programs\memory-tags\resources\app.asar.unpacked\resources
  return selectFile()
})


ipcMain.handle('copy-files', async () => {

  const sourceFiles = await selectFiles()
  const defaultPath = getDefaultImagePath()
  
  let result = {
    'copy': false,
    'files' : []
  }

  if(sourceFiles.canceled === false){
    for(let file of sourceFiles.filePaths ){
      //获取文件名
      let fileName = getFileName(file)
      //获取目标文件路径
      let targetFile  = defaultPath + '\\' + fileName
      console.log('targetFile',targetFile)

      
      fs.copyFile(file, targetFile,(err) => {
        if (err) {
          isCopySuccess = false
          throw err;
        }
        else{
          console.log('File copied successfully!');
        }

      });
      //往返回值添加文件信息
      result.files.push({
        "fullPath": targetFile,
        "path": defaultPath + '\\',
        "name": getName(file),
        "fileName": fileName,
      })
    }
    
    //设置拷贝状态
    result.copy = true
    console.log('result',result)
    return result
  }
  else{
    return result
  }


});


function copyFileCallback(err,result) {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
  return result
}

//获取路径中文件名（含后缀）
function getFileName(path){
  var pos1 = path.lastIndexOf('/');
  var pos2 = path.lastIndexOf('\\');
  var pos  = Math.max(pos1, pos2)
  if( pos<0 )
      return path;
  else
      return path.substring(pos+1);
}
//获取路径中文件名（无后缀）
function getName(path) {
  var pos1 = path.lastIndexOf('/')
  var pos2 = path.lastIndexOf('\\')
  var pos = Math.max(pos1, pos2)
  if (pos < 0) {
    return path
  }
  else {
    let tempPath = path.substring(pos + 1);
    return tempPath.substring(0, tempPath.lastIndexOf("."));
  }
}


ipcMain.handle('get-table-config', async () => {
  return store.get('tableConfig')
});

ipcMain.handle('set-table-config', async (event,obj) => {
  //接收到字符串后，再转换为对象
  store.set('tableConfig',obj)
});

ipcMain.handle('open-resources-path', async () => {
  //接收到字符串后，再转换为对象
  shell.openPath(getDefaultImagePath())
});


ipcMain.handle('get-main-config', async () => {
  return store.get('mainConfig')
});

ipcMain.handle('set-main-config', async (event,obj) => {
  store.set('mainConfig',obj)
});
