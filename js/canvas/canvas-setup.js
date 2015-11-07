var Config = require("../config/user-config");
var Global = require("../config/global");
var InterfaceUpdates = require("../interface/interface-updates");

var CanvasSetup = {
    //function to construct canvas and assign variables based on its parameters
    setupCanvas: function() {
        var cCanvas = document.getElementById('particleCanvas');

        //check if a canvas was found and if it has context
        if(cCanvas && cCanvas.getContext) {
            //retrieve the canvas context
            Global.ctxContext = cCanvas.getContext('2d');

            //set the composite operation
            Global.ctxContext.globalCompositeOperation = "source-over";

            //set canvas variables
            this.setCanvasVariables();
        }
    },

    //function to dynamically set canvas variables based on canvas size
    setCanvasVariables: function() {
        //store the canvas dimensions
        Global.iCanvasHeight = document.getElementById('particleCanvas').height;
        Global.iCanvasWidth =  document.getElementById('particleCanvas').width;
        Global.ctxContext.canvas.height = Global.iCanvasHeight;
        Global.ctxContext.canvas.width = Global.iCanvasWidth;

        //store the center of the canvas
        Global.iCanvasCenterX = Math.floor(Global.iCanvasWidth / 2);
        Global.iCanvasCenterY = Math.floor(Global.iCanvasHeight / 2);

        //store the center point of the particle
        Global.iParticleCenterX = Global.iCanvasCenterX;
        Global.iParticleCenterY = Global.iCanvasCenterY;

        //save calculations by saving the diameter of the particle
        Global.iParticleDiameter = Config.iParticleRadius * 2;
    },

    //function to dynamically set relevant parameters
    setParameters: function(iValue, obj, strParam) {
        //determine if the param is a min or a max
        if(strParam.indexOf('Min') != -1) {
            obj.min = iValue;
        } else if(strParam.indexOf('Max') != -1) {
            obj.max = iValue;
        }
    }
};

module.exports = CanvasSetup;
