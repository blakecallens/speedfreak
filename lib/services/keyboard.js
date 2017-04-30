const {globalShortcut} = require('electron');

class KeyboardService {
  setKeyboardCommands(keyboardConfig, mainWindow) {
    globalShortcut.register(keyboardConfig.split, () => {
      mainWindow.webContents.send('split');
    });

    globalShortcut.register(keyboardConfig.reset, () => {
      mainWindow.webContents.send('reset');
    });
  }
}

module.exports = new KeyboardService();
