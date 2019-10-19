var UserConfig = {
  // customizeable parameters
  iArrowSize: 4, // size of the arrow arrows
  iArrowWidth: 8, // width of the arrow
  iDrawInterval: 255, // ms between redraws
  iGraphThickness: 10, // height of the activity bar graph
  iGraphWidth: 80, // width of graph, % of canvas width
  iAtomRadius: 8, // pixels
  iAtomSpacing: 2.5, // spacing between atoms
  iAtomBorderWidth: 1, // width of atom outline
  iSpeedometerDiameter: 180, // diamter of the speedometer dial in pixels

  // range settings
  iSizeRangeMin: 25, // minimum number of atoms
  iSizeRangeMax: 4800, // maximum number of atoms
  iSizeStart: 150, // number of atoms to start with
  iStrengthRangeMin: 0, // minimum field strength
  iStrengthRangeMax: 100, // maximum field strength
  iStrengthStart: 50, // field strength to starts with
  iTemperatureRangeMax: 2000, // kelvin
  iTemperatureRangeMin: 0, // kelvin
  iTemperatureStart: 290, // temperature to start at, room temp

  // labels
  strGaugeLeftLabel: 'Weaker', // leftmost label for the gauge
  strGaugeOffLabel: 'No Field', // display text when gauge is off
  strGaugeRightLabel: 'Stronger', // rightmost label for the gauge
  strGaugeTitle: 'Applied Field Strength', // title label for the speedometer
  strGraphCenterLabel: '', // center label for the graph
  strGraphTitle: 'Overall Magnetic Moment',

  // colors
  iArrowColorNorth: 'rgb(245, 60, 60)', // color of the polarity arrow when facing north
  iArrowColorSouth: 'rgb(60, 70, 245)', // color of the polarity arrow when facing south
  iFieldLineColor: 'rgba(50, 50, 50, .5)', // color of field lines
  iGaugeTitleBackgroundColor: 'rgba(255, 255, 255, 0)', // background color for gauge title
  iGraphColorNorth: 'rgb(245, 60, 60)', // color of the bar graph when facing north
  iGraphColorSouth: 'rgb(60, 70, 245)', // color of the bar graph when facing south
  iGraphOutlineColor: 'rgba(0, 0, 0, 1)', // outline color for graph
  iGraphLabelBackgroundColor: 'rgba(255, 255, 255, .75)', // background color for graph labels
  iAtomColor: 'rgba(200, 200, 215, 1)', // fill color of atoms
  iAtomBorderColor: 'rgb(0, 0, 0, .5)', // border color of atoms
  iSpeedometerBackgroundColor: 'rgba(228, 228, 228, 1)', // color of speedometer background
  iParticleMinimumAlpha: 0.20, // minimum alpha level to maintain when fading particles

  // font settings
  strLabelFontSize: 14, // font size for all labels
  iGaugeFontColor: 'rgba(0, 0, 0, 1)', // color of gauge text
  iGaugeOffFontColor: 'rgba(0, 0, 0, 1)', // color of display text when gauge is off
  iGaugeTitleFontColor: 'rgba(0, 0, 0, 1)', // color of display text when gauge is off
  iGraphFontColor: 'rgba(0, 0, 0, 1)', // color of magnet pole text
  strGaugeFont: '14px verdana, sans-serif', // font for gauge labels
  strGaugeOffFont: '14px verdana, sans-serif', // font for display text when gauge is off
  strGaugeTitleFont: '14px verdana, sans-serif', // font for display text when gauge is off
  strGraphFont: ' sans-serif', // font for graph labels
  strPolarityLabelFontSize: 20, // font size for polarity labels
  iSouthPolarityFontColor: 'rgba(60, 69, 245, 1)', // font color for S polarity label
  iNorthPolarityFontColor: 'rgba(245, 60, 60, 1)', // font color for S polarity label

  // keyboard bindings
  cSizeDown: 'a', // set the button to decrease size
  cSizeUp: 's', // set the button to increase size
  cStrengthDown: 'g', // set the button to decrease strength
  cStrengthUp: 'h', // set the button to increase strength
  cTempDown: 'k', // set the button to decrease temp
  cTempUp: 'l', // set the button to increase temp

  // embelishments to display
  bSpeedometer: false,
  bGraph: true,
  bFieldLines: true,

  // tweaks
  iMagnetStrength: 10,
  iTemperatureModifier: 1000,
  bShowTweaks: true
};

module.exports = UserConfig;
