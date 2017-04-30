const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

class SettingsWindow {
  load() {
    if(this.window) {
      return;
    }

    this.window = new BrowserWindow({width: 420, height: 680});

    this.window.loadURL(url.format({
      pathname: path.join(process.cwd(), 'www', 'html', 'windows', 'find.html'),
      protocol: 'file:',
      slashes: true
    }));

    this.window.on('close', function() {
      delete this.window;
    });
  }
}

module.exports = new SettingsWindow();
