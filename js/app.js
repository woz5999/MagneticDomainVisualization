var ButtonHandlers = require('./interface/button-handlers');
var CanvasSetup = require('./canvas/canvas-setup');
var Config = require('./config/user-config');
var Draw = require('./canvas/draw');
var Global = require('./config/global');
var Intro = require('./dialog/intro');
var InterfaceUpdates = require('./interface/interface-updates');
var Keyboard = require('./interface/keyboard-shortcuts');
var Toggle = require('./interface/toggle');

function init() {
    //display intro dialog
    Intro();

    //grab the sliders
    rnTemp = document.querySelector('#rnTemp');
    rnSize = document.querySelector('#rnSize');
    rnStrength = document.querySelector('#rnStrength');

    iSizeMin = rnSize.min;
    iSizeMax = rnSize.max;
    iTempMin = rnTemp.min;
    iTempMax = rnTemp.max;
    iStrengthMin = rnStrength.min;
    iStrengthMax = rnStrength.max;

    //grab the buttons
    btnPolarity = document.querySelector('#btnPolarity');
    btnPause = document.querySelector('#btnPause');
    btnMagnet = document.querySelector('#btnMagnet');

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
        var btnPause = document.querySelector('#btnPause');

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

         //set event listeners for supplement buttons
         document.querySelector('#btn-legend').addEventListener('click',
            function(e) {
                Toggle.slide(document.querySelector('#legend'));
                Toggle.arrow(document.querySelector('#legend-arrow'));
         });

         document.querySelector('#btn-plan').addEventListener('click',
            function(e) {
                Toggle.slide(document.querySelector('#plan'));
                Toggle.arrow(document.querySelector('#plan-arrow'));
         });

        //set drawing update interval
        setInterval(Draw, Config.iDrawInterval);

        window.onresize = CanvasSetup.setupCanvas;
    }//end check context if
}
init();
