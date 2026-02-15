import { app, BrowserWindow } from 'electron'; 
import path from 'path'; 
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { ipcMain, powerMonitor, Notification } from 'electron';
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
app.setAppUserModelId('com.sarthak.visible'); 
app.setName('Visible');


if(lastUsedDate === today) {
  todaySessionDetails = store.get('session-details'); 
  contextSwitch = store.get('context-switches'); 
} else {
  store.set('last-used-date', today)
}

function showNotification() {
  const notification = {
    title: 'Focus Session Complete!',
    body: 'Please return to the app to view analytics or to start a new session.',
    icon: path.join(app.getAppPath(), 'desktopIcon.png')
  }
  new Notification(notification).show()
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
    minHeight: 600,
    width:350,
    height:600,
    title: "Visible", 
    //this tells to look from the root of the harddrive, we need to look from where this app is located. 
    icon: path.join(app.getAppPath(), 'desktopIcon.png'),  
  webPreferences: {
  preload: getPreloadPath(), 
}
});
mainWindow.setMenu(null)
mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
mainWindow.setAlwaysOnTop(true);
mainWindow.on("close", () => {
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
  });
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
  }
  ipcMain.handle('get-idle-time', () => {
    return powerMonitor.getSystemIdleTime(); 
  })
  ipcMain.handle('send-notification', showNotification);
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
          const key = `${previousWindow} → ${cleanTitle}`
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
