const Datastore = require('nedb');
const path = require('path');

const keyboardService = require('./keyboard');

let config;

class ConfigService {
  loadConfig(mainWindow) {
    let db = new Datastore({
      filename: path.join(process.cwd(), 'db', 'config.db'),
      autoload: true
    });
    db.find({}, (err, docs) => {
      if(!docs.length) {
        config = require(path.join(process.cwd(), 'res', 'default.config'));
        //db.insert(config);
      }
      else {
        config = docs[0];
      }

      console.log(config);

      keyboardService.setKeyboardCommands(config.keyboard, mainWindow);
    });
  }
}

module.exports = new ConfigService();
