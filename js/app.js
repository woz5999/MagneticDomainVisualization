function init() {
    // determine whether or not to show the tweak controls
    if (Config.bShowTweaks) {
        J = document.querySelector('#J');
        H = document.querySelector('#H');
        T = document.querySelector('#T');

        // attach change events to the sliders
        J.onchange = InterfaceUpdates.rangeChange;
        H.onchange = InterfaceUpdates.rangeChange;
        T.onchange = InterfaceUpdates.rangeChange;

        J.value = Constants.J;
        H.value = Config.iMagnetStrength;
        T.value = Config.iTemperatureModifier;

        // force the initial label display
        InterfaceUpdates.rangeChange(J);
        InterfaceUpdates.rangeChange(H);
        InterfaceUpdates.rangeChange(T);

        document.querySelector('#tweaks').classList.remove('hide');
    }

    // grab the sliders
    rnTemp = document.querySelector('#rnTemp');
    rnSize = document.querySelector('#rnSize');
    rnStrength = document.querySelector('#rnStrength');

    // grab the buttons
    btnPolarity = document.querySelector('#btnPolarity');
    btnPause = document.querySelector('#btnPause');
    btnMagnet = document.querySelector('#btnMagnet');

    // set button event handlers
    btnPolarity.onclick = ButtonHandlers.polarityClick;
    btnPause.onclick = ButtonHandlers.pauseClick;
    btnMagnet.onclick = ButtonHandlers.magnetClick;

    // construct up the canvas
    CanvasSetup.setupCanvas();

    // make sure there is context
    if (Global.ctxContext) {
        // attach change events to the sliders
        rnTemp.onchange = InterfaceUpdates.rangeChange;
        rnSize.onchange = InterfaceUpdates.rangeChange;
        rnStrength.onchange = InterfaceUpdates.rangeChange;

        // attach key press event to keyboard buttons
        document.onkeypress = Keyboard.keyPress.bind(Keyboard);

        // set initial parameters
        CanvasSetup.setParameters(Config.iTemperatureRangeMin,
            rnTemp, 'rnTempMin');
        CanvasSetup.setParameters(Config.iTemperatureRangeMax,
            rnTemp, 'rnTempMax');
        CanvasSetup.setParameters(Config.iStrengthRangeMin,
            rnStrength, 'rnStrengthMin');
        CanvasSetup.setParameters(Config.iStrengthRangeMax,
            rnStrength, 'rnStrengthMax');
        CanvasSetup.setParameters(Config.iSizeRangeMin,
            rnSize, 'rnSizeMin');
        CanvasSetup.setParameters(Config.iSizeRangeMax,
            rnSize, 'rnSizeMax');

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

        window.onresize = CanvasSetup.setupCanvas;
    }
}

var ButtonHandlers = require('./interface/button-handlers');
var CanvasSetup = require('./canvas/canvas-setup');
var Constants = require('./model/constants');
var Config = require('./config/user-config');
var Draw = require('./canvas/draw');
var Global = require('./config/global');
var InterfaceUpdates = require('./interface/interface-updates');
var Keyboard = require('./interface/keyboard-shortcuts');
var Variables = require('./model/variables');

init();
