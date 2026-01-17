import { app, BrowserWindow } from 'electron'; 
import path from 'path'; 
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { ipcMain, powerMonitor } from 'electron';
// import '../ui/index.css'
// import { dialog } from 'electron'; 

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
  width: 350,
  height: 600,
  resizable: false,  
  webPreferences: {
  preload: getPreloadPath(), 
}
  });
  mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  mainWindow.setAlwaysOnTop(true);
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
  }
  ipcMain.handle('get-idle-time', () => {
    return powerMonitor.getSystemIdleTime(); 
  })
})

//hmr only works for react files. if you make any changes to the electron code then it needs to be restarted. 