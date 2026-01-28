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
let contextSwitch: any = {}; //to account for the number of context switches
let saveCounter = 0;  
const store = new Store();
let date = new Date();
let today = date.toLocaleDateString();
let lastUsedDate = store.get('last-used-date');
let state: any = null; 

console.log(today, lastUsedDate)

if(lastUsedDate === today) {
  todaySessionDetails = store.get('session-details'); 
  contextSwitch = store.get('context-switches'); 
} else {
  store.set('last-used-date', today)
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
    clearInterval(intervalId);
    setTimeout(() => {
    todaySessionDetails = {};
    contextSwitch = {};
    previousWindow = null; 
    const newDay = new Date().toLocaleDateString();
    store.set('session-details', todaySessionDetails);
    store.set('context-switches', contextSwitch);
    store.set('last-used-date', newDay)
    if (state === 'running') 
    {
    startSessionTracking(); 
    }
    scheduleMidnightReset(); 
    }, 10_000)
  }, msToMidnight);
}

scheduleMidnightReset();


app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    minWidth: 350,
    height: 600,  
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
    state = null; 
    clearInterval(intervalId);
    // todaySessionDetails["contextSwitch"] = contextSwitch;  
    store.set('session-details', todaySessionDetails); 
    store.set('context-switches' , contextSwitch)
    store.set('last-used-date', today);
    return {
    todaySessionDetails, 
    contextSwitch
    }
  })
  })


//hmr only works for react files. if you make any changes to the electron code then it needs to be restarted.
//the current problems which are left to be solved are. 
// - in terms of ui/Ux, tinker how the data needs to be displayed. is it going to be day wise, or it is going to be focus session wise, or is it going to be both. 
// - how do we show the app names with the icons.  
function startSessionTracking() { 
    state = "running"; 
    intervalId = setInterval(async () => {
      try {
        saveCounter++; 
        const presentWindow = await activeWindow(); 
        if(!presentWindow) return; 
        console.log(presentWindow)
        const cleanTitle: any = presentWindow.owner.name;
        if(!previousWindow) //this is the first time the interval is running, incrementing the screentime by 2 to account for the loss of the time the interval was absent.  
        {
          todaySessionDetails[cleanTitle] = ((todaySessionDetails[cleanTitle]) || 0) + 2;
          previousWindow = cleanTitle; 
          return; 
        }
        todaySessionDetails[cleanTitle] = ((todaySessionDetails[cleanTitle]) || 0) + 1; 
        if (previousWindow === cleanTitle) {
          return; 
        } else {
          const key = `From ${previousWindow} to ${cleanTitle}`
          contextSwitch[key] = (contextSwitch[key] || 0) + 1; 
          previousWindow = cleanTitle; 
        }
        if (saveCounter >= 12) {
          store.set('session-details', todaySessionDetails);
          store.set('context-switches', contextSwitch); 
          saveCounter = 0; 
        }
      } catch (error) { 
        console.error("failed to fetch active window", error); 
      }
    }, 5000)
}
