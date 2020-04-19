function init() {
    // determine whether or not to show the tweak controls
    if (Config.bShowTweaks) {
        setTweak('J', Constants.J);
        setTweak('H', Config.iMagnetStrength);
        setTweak('T', Config.iTemperatureModifier);
        setTweak('R', Config.iRemanenceModifier);

        document.querySelector('#tweaks').classList.remove('hide');
    }

    // grab the sliders
    rnTemp = document.querySelector('#rnTemp');
    rnSize = document.querySelector('#rnSize');
    rnStrength = document.querySelector('#rnStrength');

    // set the configured slider ranges
    rnSize.max = Config.iSizeRangeMax;
    rnSize.min = Config.iSizeRangeMin;
    rnStrength.max = Config.iStrengthRangeMax;
    rnStrength.min = Config.iStrengthRangeMin;
    rnTemp.max = Config.iTemperatureRangeMax;
    rnTemp.min = Config.iTemperatureRangeMin;

    // grab the buttons
    btnPolarity = document.querySelector('#btnPolarity');
    btnPause = document.querySelector('#btnPause');
    btnMagnet = document.querySelector('#btnMagnet');

    // set button event handlers
    btnPolarity.onclick = ButtonHandlers.polarityClick;
    btnPause.onclick = ButtonHandlers.pauseClick;
    btnMagnet.onclick = ButtonHandlers.magnetClick;

    // construct up the canvas
    Canvas.setup();

    // make sure there is context
    if (Canvas.getContext()) {
        // attach change events to the sliders
        rnTemp.onchange = InterfaceUpdates.rangeChange;
        rnSize.onchange = InterfaceUpdates.rangeChange;
        rnStrength.onchange = InterfaceUpdates.rangeChange;

        // attach key press event to keyboard buttons
        document.onkeypress = Keyboard.keyPress.bind(Keyboard);

        // set the default range values
        rnTemp.value = Config.iTemperatureStart;
        rnStrength.value = Config.iStrengthStart;
        rnSize.value = Config.iSizeStart;

        // update slider values
        InterfaceUpdates.rangeChange(rnTemp);
        InterfaceUpdates.rangeChange(rnStrength);
        InterfaceUpdates.rangeChange(rnSize);

        // set drawing update interval
        setInterval(Draw, Config.iDrawInterval);

        window.onresize = Canvas.setup;
    }
}

function setTweak(t, def) {
    T = document.querySelector('#' + t.toUpperCase());

    // attach change events to the sliders
    T.onchange = InterfaceUpdates.rangeChange;

    T.value = def;

    // force the initial label display
    InterfaceUpdates.rangeChange(T);
}

var ButtonHandlers = require('./interface/button-handlers');
var Canvas = require('./canvas/canvas');
var Constants = require('./model/constants');
var Config = require('./config/config');
var Draw = require('./canvas/draw');
var InterfaceUpdates = require('./interface/interface-updates');
var Keyboard = require('./interface/keyboard-shortcuts');

init();
