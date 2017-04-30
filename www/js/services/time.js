let ipcRenderer = require('electron').ipcRenderer;

class TimeService {
  constructor() {
    this.reset();
  }

  reset() {
    this.startTime = null;
    this.splits = [];
  }

  split() {
    if(!this.startTime) {
      this.startTimer();
      return;
    }

    this.splits.push(this.getTotalTime());
  }

  startTimer() {
    this.startTime = new Date();
  }

  getTotalTime() {
    if(!this.startTime) {
      return 0;
    }

    let now = new Date().getTime();
    return (now - this.startTime) * .001;
  }

  getSplits() {
    return this.splits;
  }
}

let timeService = new TimeService();

ipcRenderer.on('split', () => {
  timeService.split();
});

ipcRenderer.on('reset', () => {
  timeService.reset();
});

module.exports = timeService;
