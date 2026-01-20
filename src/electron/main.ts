import { app, BrowserWindow } from 'electron'; 
import path from 'path'; 
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { ipcMain, powerMonitor } from 'electron';
import  activeWindow  from 'active-win'; 
let intervalId: any;  
const screenTime: any = {}
let previousWindow: any = null; 
let contextSwitch: any = 0; //to account for the number of context switches 

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
  ipcMain.handle('start-session-time-tracking',  startSessionTracking); 
  ipcMain.handle('get-screen-time', () => {
    clearInterval(intervalId);
    screenTime["contextSwitch"] = contextSwitch;  
    return screenTime;
  })
  })


//hmr only works for react files. if you make any changes to the electron code then it needs to be restarted.
// //the current problems which are left to be solved are. 
// - how do we calculate the data of the entire day 
// - how do you store it in an object such that a new object is created each day. once this is resolved, we can move on to how to display the data. 
// - in terms of ui/Ux, tinker how the data needs to be displayed. is it going to be day wise, or it is going to be focus session wise, or is it going to be both. 
// - how do we show the app names with the icons.  
function startSessionTracking() { 
    intervalId = setInterval(async () => {
      try {
        console.log(screenTime)
        const presentWindow = await activeWindow(); 
        if(!presentWindow) return; 
        if(!previousWindow) //this is the first time the interval is running, incrementing the screentime by 2 to account for the loss of the time the interval was absent.  
        {
          const cleanTitle: any = presentWindow.title.split(' - ').pop(); 
          screenTime[cleanTitle] = ((screenTime[cleanTitle]) || 0) + 2;
          previousWindow = cleanTitle; 
          return; 
        }
        console.log(presentWindow) //remove this after testing is complete
        const cleanTitle: any = presentWindow.title.split(' - ').pop(); 
        screenTime[cleanTitle] = ((screenTime[cleanTitle]) || 0) + 1; 
        if (previousWindow === cleanTitle) {
          return; 
        } else {
          contextSwitch++; 
          previousWindow = cleanTitle; 
        }
      } catch (error) { 
        console.error("failed to fetch active window", error); 
      }
    }, 5000)
}