var Variables = {


  // external magnetic force
  H: 0,

  // atom count
  AtomCount: 0,

  // total magnetization
  Magnetization: 0,

  // temperature
  Temperature: 0,

  // stored value of the field strength slider
  StrengthValue: 0,

  Enabled: true,

  MagnetOn: true,

  Polarity: 1,

  visualizationEnabled: function () {
    return this.Enabled;
  },

  toggleVisualizationEnabled: function () {
    this.Enabled = !this.Enabled;
  },

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

  setAtomCount: function (v) {
    this.AtomCount = v;
  },

  getAtomCount: function () {
    return this.AtomCount;
  },

  setMagnetization: function (v) {
    this.Magnetization = v;
  },

  getMagnetization: function () {
    return this.Magnetization;
  },

  setStrengthValue: function (v) {
    if (v > 0) {
      this.MagnetOn = true;
    }

    this.previousStrengthValue = this.StrengthValue;
    this.StrengthValue = v;
    this.updateExternalMagneticFieldStrength();
  },

  getStrengthValue: function () {
    return parseInt(this.StrengthValue);
  },

  getPreviousStrengthValue: function () {
    return parseInt(this.previousStrengthValue);
  },

  setTemperature: function (v) {
    this.Temperature = parseInt(v);
  },

  getTemperature: function () {
    return this.Temperature;
  },

  toggleMagnetStatus: function () {
    this.MagnetOn = !this.MagnetOn;
  },

  getMagnetOn: function () {
    if (this.getStrengthValue() == 0) {
      return false;
    }
    return this.MagnetOn;
  },

  getPolarity: function () {
    return this.Polarity;
  },

  getAdjacantSpinCount: function () {
    return this.AdjacantSpinCount;
  },

  getStrengthModifier: function () {
    if (!Config.bShowTweaks) {
      return Config.iMagnetStrength;
    }
    return document.querySelector('#H').value;
  },

  getTemperatureModifier: function () {
    if (!Config.bShowTweaks) {
      return Config.iTemperatureModifier;
    }
    return document.querySelector('#T').value;
  },

  getJ: function () {
    return document.querySelector('#J').value;
  }
};

module.exports = Variables;

var Calculations = require("./calculations");
var Config = require("../config/config");
