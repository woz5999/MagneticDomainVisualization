var Constants = {
  J: 0, // strength of exchange interaction
  moment: 1, // strength of spin-field interaction

  getJ: function () {
    if (!Config.bShowTweaks) {
      return this.J;
    }
    return Variables.getJ();
  },

  getMoment: function () {
    return this.moment;
  }
};

module.exports = Constants;

var Config = require('../config/config');
var Variables = require('../model/variables');
