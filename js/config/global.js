var Config = require("./user-config");

var Global = {
    arrParticles: [], //array for holding particles
    bIsClicked: false,
    bMagnetOn: true, //flag for toggling magnet
    bOn: true, //flag for running/stopping visualization
    ctxContext: "",
    iJStrength: 100, //strength of exchange interaction
    iMoment: 1, //strength of spin-field interaction
    iSpeedLabelSize: Config.strLabelFontSize, //font size of the gauge labels
    iStrengthRangeMin: 0, //set the min distance to 0
    strPolarity: 'N', //set the initial polarity
};

module.exports = Global;
