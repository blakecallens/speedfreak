class I18nService {
  constructor() {
    this.language = require('../../i18n/en-us');
  }

  getLocalizedString(key) {
    this.language = this.language || require('../../i18n/en-us');
    return this.language[key] || key;
  }
}

module.exports = new I18nService();
