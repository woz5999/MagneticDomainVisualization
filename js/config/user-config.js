var UserConfig = {
    //customizeable parameters
    iArrowSize: 4, //size of the arrow arrows
    iArrowWidth: 1.5, //width of the arrow
    iDrawInterval: 255, //time between redraws
    iGraphThickness: 10, //height of the activity bar graph
    iGraphWidth: 80, //width of graph, % of canvas width
    iParticleRadius: 8, //pixels
    iParticleSpacing: 1.5, //spacing between particles
    iSpeedometerDiameter: 180, //diamter of the speedometer dial in pixels

    //range settings
    iSizeRangeMin: 25, //minimum number of particles
    iSizeStart: 150, //number of particles to start with
    iStrengthRangeMin: 0, //minimum field strength
    iStrengthRangeMax: 100, //maximum field strength
    iStrengthStart: 50, //field strength to starts with
    iTempRangeMax: 1100, //kelvin
    iTempRangeMin: 0, //kelvin
    iTempStart: 290, //temperature to start at, room temp

    //labels
    strGaugeLeftLabel: 'Weaker', //leftmost label for the gauge
    strGaugeOffLabel: 'No Field', //display text when gauge is off
    strGaugeRightLabel: 'Stronger', //rightmost label for the gauge
    strGaugeTitle: 'Applied Field Strength', //title label for the speedometer
    strGraphCenterLabel: '', //center label for the graph
    strGraphLeftLabel: '', //leftmost label for the graph
    strGraphRightLabel: '', //rightmost label for the graph
    strGraphTitle: 'Direction of Magnetic Moment',

    //colors
    iArrowColor: 'rgba(0, 0, 0, 1)', //color of the polarity arrow
    iFieldLineColor: 'rgba(50, 50, 50, 1)', //color of field lines
    iGaugeTitleBackgroundColor: 'rgba(255, 255, 255, 0)', //background color for gauge title
    iGraphColor: 'rgb(51, 153, 255)', //color of the bar graph
    iGraphOutlineColor: 'rgba(0, 0, 0, 1)', //outline color for graph
    iParticleColor: 'rgba(0, 128, 255, 1)', //left color of particle
    iSpeedometerBackgroundColor: 'rgba(228, 228, 228, 1)', //color of speedometer background

    //font settings
    strLabelFontSize: 14, //font size for all labels
    iGaugeFontColor: 'rgba(0, 0, 0, 1)', //color of gauge text
    iGaugeOffFontColor: 'rgba(0, 0, 0, 1)', //color of display text when gauge is off
    iGaugeTitleFontColor: 'rgba(0, 0, 0, 1)', //color of display text when gauge is off
    iGraphFontColor: 'rgba(0, 0, 0, 1)', //color of magnet pole text
    strGaugeFont: '14px verdana, sans-serif', //font for gauge labels
    strGaugeOffFont: '14px verdana, sans-serif', //font for display text when gauge is off
    strGaugeTitleFont: '14px verdana, sans-serif', //font for display text when gauge is off
    strGraphFont: ' sans-serif', //font for graph labels, 'bold --px' is dynamically generated below, assign this   accordingly

    //keyboard bindings
    cSizeDown: 'a', //set the button to decrease size
    cSizeUp: 's', //set the button to increase size
    cStrengthDown: 'g', //set the button to decrease strength
    cStrengthUp: 'h', //set the button to increase strength
    cTempDown: 'k', //set the button to decrease temp
    cTempUp: 'l', //set the button to increase temp

    //tweaks
    iFadeStrength: 20, //amount to fade particles with less magnetism
    iMagnetStrength: 1, //G?
    iParticleMinimumAlpha: 0.18, //minimum alpha level to maintain when fading particles
};

module.exports = UserConfig;
