//TODO
// * !! ADD SUPPORT FOR TEMPLATES B AND C, remove description + SKU
// * !! fix small bug when changing descriptions, clear batch # history
// * !! IMPLMENET PRINTING
// * !! IMPLEMENT BATCH FIXING AUTO-POPULATION
//* !! ADD CSV CONVERSIONS
//* !!HAVE LABEL #S GET PULLED FROM SHEET
//* !!REMOVE TOP BAR
//!!ADD LOGO
// * !!IF TIME ALLOWS, PRINTER DROPDOWN
//* !!REMOVE DEV TOOLS




const { app, BrowserWindow, dialog, ipcMain} = require('electron');
const path = require('node:path');
const fs = require('fs')
const log = require('electron-log/main')
log.transports.console.format =`{h}:{i}:{s} {text}`
log.info("program beginning")


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  log.info("creating window")


  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  log.info("loading main html file")


  mainWindow.removeMenu()
  log.info("removing top bar")
  // Open the DevTools.

  // mainWindow.webContents.openDevTools()

  ipcMain.on('set-labels', (event, option) => {
    mainWindow.webContents.send('update-labels', option)
    log.info("updating label information")
})

};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  log.info("app is read")
  createWindow();
  log.info("window has been created")


  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});






// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

import './utils.js'