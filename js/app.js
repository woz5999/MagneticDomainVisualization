var ButtonHandlers = require("./interface/button-handlers");
var CanvasSetup = require("./canvas/canvas-setup");
var Config = require("./config/user-config");
var Draw = require("./canvas/draw");
var Global = require("./config/global");
var InterfaceUpdates = require("./interface/interface-updates");
var Keyboard = require("./interface/keyboard-shortcuts");

function init() {
    //grab the sliders
    rnTemp = document.getElementById('rnTemp');
    rnSize = document.getElementById('rnSize');
    rnStrength = document.getElementById('rnStrength');

    iSizeMin = rnSize.min;
    iSizeMax = rnSize.max;
    iTempMin = rnTemp.min;
    iTempMax = rnTemp.max;
    iStrengthMin = rnStrength.min;
    iStrengthMax = rnStrength.max;

    //grab the buttons
    btnPolarity = document.getElementById('btnPolarity');
    btnPause = document.getElementById('btnPause');
    btnMagnet = document.getElementById('btnMagnet');

    //set button event handlers
    btnPolarity.onclick = ButtonHandlers.polarityClick;
    btnPause.onclick = ButtonHandlers.pauseClick;
    btnMagnet.onclick = ButtonHandlers.magnetClick;

    //construct up the canvas
    CanvasSetup.setupCanvas();

    //make sure there is context
    if(Global.ctxContext) {
        //attach change events to the sliders
        rnTemp.onchange = InterfaceUpdates.rangeChange;
        rnSize.onchange = InterfaceUpdates.rangeChange;
        rnStrength.onchange = InterfaceUpdates.rangeChange;

        //grab the button
        var btnPause = document.getElementById('btnPause');

        //attach key press event to keyboard buttons
        document.onkeypress = Keyboard.keyPress.bind(Keyboard);

        //get max number of particles
        //(canvas height /(particle width + spacing))^2)
        Global.iSizeRangeMax = Math.floor(Math.pow(Global.iCanvasHeight /
            ((Config.iParticleRadius * 2) + Config.iParticleSpacing), 2));

        //round particles to nearest 100
        Global.iSizeRangeMax = Math.round(Global.iSizeRangeMax / 100) * 100;

        //set initial parameters
        CanvasSetup.setParameters(Config.iTempRangeMin,
            rnTemp, 'rnTempMin');
        CanvasSetup.setParameters(Config.iTempRangeMax,
             rnTemp, 'rnTempMax');
        CanvasSetup.setParameters(Config.iStrengthRangeMin,
            rnStrength, 'rnStrengthMin');
        CanvasSetup.setParameters(Config.iStrengthRangeMax,
            rnStrength, 'rnStrengthMax');
        CanvasSetup.setParameters(Config.iSizeRangeMin,
            rnSize, 'rnSizeMin');
        CanvasSetup.setParameters(Global.iSizeRangeMax,
            rnSize, 'rnSizeMax');

        //set the default range values
        rnTemp.value = Config. iTempStart;
        rnStrength.value = Config.iStrengthStart;
        rnSize.value = Config.iSizeStart;

        //update slider values
         InterfaceUpdates.rangeChange(rnTemp);
         InterfaceUpdates.rangeChange(rnStrength);
         InterfaceUpdates.rangeChange(rnSize);

        //set drawing update interval
        setInterval(Draw, Config.iDrawInterval);
    }//end check context if
}
init();
