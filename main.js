const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const configService = require('./lib/services/config');
const findWindow = require('./lib/windows/find');

let mainWindow;

function loadMainWindow() {
  /*mainWindow = new BrowserWindow({width: 480, height: 640, frame: false});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'www', 'html', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('close', function() {
    delete mainWindow;
  });*/

  findWindow.load();
  //configService.loadConfig(mainWindow);
}

app.on('ready', loadMainWindow);

app.on('window-all-closed', function () {
  if(process.platform !== 'darwin') {
    //app.quit()
  }
});

app.on('activate', function () {
  if(mainWindow === null) {
    createWindow()
  }
});
