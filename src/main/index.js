import { app, shell, BrowserWindow , ipcMain  } from 'electron'
import  {  join } from 'path'
const path = require('path')
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

// import icon from '../../resources/icon.png?asset'
import { ref, reactive } from 'vue'
// 应用图标
import appIcon from '../../build/icon.ico?asset'

// import {} from '../../src/renderer/src/controller/getFilelist'

// console.log('is.dev',is.dev ? true : false)

// console.log('__dirname',__dirname) 




require('./getFilelist.js')



//父渲染页面id
const mainWinId = ref(null)
//子渲染页面id
const childWinId = ref(null)

//创建主窗口
function createWindow() {
  // We cannot require the screen module until the app is ready.
  const { screen } = require('electron')
  
  // Create a window that fills the screen's available work area.
  const primaryDisplay = screen.getPrimaryDisplay()
  //获取屏幕大小
  const { width, height } = primaryDisplay.workAreaSize
  // Create the browser window.


  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon:path.join(__dirname,'src/renderer/src/assets/icons.svg') } : {}),
    //icon:path.join(__dirname,'src/renderer/src/assets/miao.ico'),

    icon: appIcon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })
  //
  
  //鼠标穿透
  mainWindow.setIgnoreMouseEvents(true, { forward: true })
  //窗体置顶，窗体级别（由低到高）：normal, floating, torn-off-menu, modal-panel, main-menu, status, pop-up-menu, screen-saver
  mainWindow.setAlwaysOnTop(true, 'screen-saver')

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])

    // 打开开发工具
    //mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // mainWindow.webContents.openDevTools()

  mainWinId.value = mainWindow.id
  
  return mainWindow
}

//创建子窗口
function createChildWindow() {
  // We cannot require the screen module until the app is ready.
  const { screen } = require('electron')

  // Create a window that fills the screen's available work area.
  const primaryDisplay = screen.getPrimaryDisplay()
  //获取屏幕大小
  const { width, height } = primaryDisplay.workAreaSize

  // 获取焦点窗口
  const top = BrowserWindow.getFocusedWindow()
  // 创建模态窗口
  const child = new BrowserWindow({
    width: width,
    height: height,
    parent: top,
    modal: true,
    frame:false,
    transparent: true,
    autoHideMenuBar: true,
    show: true,
    icon: appIcon,
    webPreferences: {
      preload: join(__dirname, '../preload/table.js'),
      sandbox: false,
      webSecurity: false
    }
  })
  // 模态窗口加载页面
  child.once('ready-to-show', () => {
    child.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    child.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/table.html')
    // 打开开发工具
    child.webContents.openDevTools()
    //console.log(process.env['ELECTRON_RENDERER_URL'] + '/table.html')
  } else {
    child.loadFile(join(__dirname, '../renderer/table.html'))
  }
  childWinId.value = child.id

  // child.webContents.openDevTools()
  return child
}

//鼠标穿透
ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win.setIgnoreMouseEvents(ignore, options)
})

//主渲染进程点击事件
ipcMain.on('set-click-mouse-events', () => {
  //创建子窗口
  createChildWindow()
  //将选中值保存在常量中
  //console.log('click-mouse',num)
})

//子渲染进程通过主进程将数据转发给主渲染进程
ipcMain.on('forward-send-to-main-service', (event,data) => {
  //console.log('clo',data)
  //获取子窗口
  let mainWindow = BrowserWindow.fromId(mainWinId.value)
  mainWindow.webContents.send('receive-messages', data)

  const childWindow = BrowserWindow.fromId(childWinId.value)
  //关闭子窗口
  childWindow.close()
})



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
