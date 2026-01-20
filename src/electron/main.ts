import { app, BrowserWindow } from 'electron'; 
import path from 'path'; 
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { ipcMain, powerMonitor } from 'electron';
import  activeWindow  from 'active-win'; 
import Store from 'electron-store'
let intervalId: any;  
let todaySessionDetails: any = {}
let previousWindow: any = null; 
let contextSwitch: any = 0; //to account for the number of context switches
let saveCounter = 0;  
const store = new Store();
//for the logic of which object we will return to the renderer process. ]
//we have two sub problems here
//the next part is about how to reset it automatically at midnight.
//also there is one nuance as to what will happen if the user pauses or ends the session. 
let date = new Date();
let today = date.toLocaleDateString();
let currentdate = store.get('current-date');
console.log(today, currentdate)
if(currentdate === today) {
  console.log(store.get('session-details'))
  todaySessionDetails = store.get('session-details')
  console.log(todaySessionDetails)
}

function scheduleMidnightReset() {
  const now = new Date();
  const night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0, 0, 0 
  );
  const msToMidnight = night.getTime() - now.getTime();

  setTimeout(() => {
    todaySessionDetails;
    store.set('session-details', todaySessionDetails);
    store.set('current-date', today);
  }, msToMidnight);
}

scheduleMidnightReset();


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
  ipcMain.handle('get-session-details', () => {
    clearInterval(intervalId);
    todaySessionDetails["contextSwitch"] = contextSwitch;  
    store.set('session-details', todaySessionDetails)
    return todaySessionDetails;
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
        saveCounter++; 
        const presentWindow = await activeWindow(); 
        if(!presentWindow) return; 
        if(!previousWindow) //this is the first time the interval is running, incrementing the screentime by 2 to account for the loss of the time the interval was absent.  
        {
          const cleanTitle: any = presentWindow.title.split(' - ').pop(); 
          todaySessionDetails[cleanTitle] = ((todaySessionDetails[cleanTitle]) || 0) + 2;
          previousWindow = cleanTitle; 
          return; 
        }
        const cleanTitle: any = presentWindow.title.split(' - ').pop(); 
        todaySessionDetails[cleanTitle] = ((todaySessionDetails[cleanTitle]) || 0) + 1; 
        if (previousWindow === cleanTitle) {
          return; 
        } else {
          contextSwitch++; 
          previousWindow = cleanTitle; 
        }
        if (saveCounter >= 12) {
          store.set('session-details', todaySessionDetails);
          saveCounter = 0; 
        }
      } catch (error) { 
        console.error("failed to fetch active window", error); 
      }
    }, 5000)
}
        store.set('current-date', today);
