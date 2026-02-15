const electron = require('electron');
//this is being written in commonjs. Now these days we have ES Modules which use import/export. but before these, commonjs was used which used require and export. isse phele they used to use the global scope for the same.

electron.contextBridge.exposeInMainWorld("electron", {
//here we need to add the functions as key value pairs which we need  to use in the window
startSessionTimeTracking: () => electron.ipcRenderer.invoke('start-session-time-tracking'), 
getSessionDetails: () => electron.ipcRenderer.invoke('get-session-details'), 
sendNotification: () => electron.ipcRenderer.invoke('send-notification')
})
//appends whatever we are putting here in the mainWindow. 
//ipcRenderer is a custom protocol which is provided by electron. this is used to send and recieve data from the frontend and backend. 