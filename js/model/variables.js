var Variables = {
  // external magnetic force
  H: 0,

  // total magnetization
  Magnetization: 0,

  // temperature
  Temperature: 0,

  // stored value of the field strength slider
  StrengthValue: 0,

  Polarity: 1,

  reset: function () {
    this.Magnetization = 0;
    this.AdjacantSpinCount = 0;
  },

  update: function () {
    this.updateMagnetization();
    this.updateAdjacentSpinCount();
  },

  updateExternalMagneticFieldStrength: function () {
    this.H = Calculations.magneticFieldStrength();
  },

  updateMagnetization: function () {
    this.Magnetization = Calculations.systemSpinSum();
  },

  updateAdjacentSpinCount: function () {
    this.AdjacantSpinCount = Calculations.systemSpinAlignmentSum();
  },

  incrementAdjacantSpinCount: function (i) {
    this.AdjacantSpinCount += i;
  },

  incrementMagnetization: function (i) {
    this.Magnetization += i;
  },

  reversePolarity: function () {
    this.Polarity *= -1;
    this.updateExternalMagneticFieldStrength();
  },

  getH: function () {
    return this.H;
  },

  setMagnetization: function (v) {
    this.Magnetization = v;
  },

  getMagnetization: function () {
    return this.Magnetization;
  },

  setStrengthValue: function (v) {
    this.StrengthValue = v;
    this.updateExternalMagneticFieldStrength();
  },

  getStrengthValue: function () {
    return parseInt(this.StrengthValue);
  },

  setTemperature: function (v) {
    this.Temperature = parseInt(v);
  },

  getTemperature: function () {
    return this.Temperature;
  },

  getPolarity: function () {
    return this.Polarity;
  },

  getAdjacantSpinCount: function () {
    return this.AdjacantSpinCount;
  },
};

module.exports = Variables;

var Calculations = require("./calculations");
var Config = require("../config/user-config");
