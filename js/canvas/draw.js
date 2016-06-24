var CanvasSetup = require("./canvas-setup");
var Config = require("../config/user-config");
var DrawFunctions = require("./draw-functions");
var FieldLines = require("../objects/field-lines");
var Global = require("../config/global");
var Graph = require("../objects/graph");
var Particles = require("../objects/particles");
var Speedometer = require("../objects/speedometer");

var Draw = {
    //function to draw everything
    draw: function() {
        //check if the visualization is turned on
        if(Global.bOn) {
            //clear the canvas
            Global.ctxContext.clearRect(0, 0,
                Global.iCanvasWidth, Global.iCanvasHeight);

            //determine if the canvas dimensions have changed
            if(Global.iCanvasHeight !=
                document.querySelector('#particleCanvas').height ||
                Global.iCanvasWidth !=
                document.querySelector('#particleCanvas').width) {

                //reset canvas variables
                CanvasSetup.setCanvasVariables();

                //reset the particle array
                Particles.arrParticles = [];
                Particles.addParticles();
            }

            //iterate through particle array
            for(i = 0; i < Particles.arrParticles.length; i++) {
                //flip flop
                Particles.flip();

                //draw the current particle
                var particle = Particles.arrParticles[i];
                particle.draw();
            }
            if(Config.bFieldLines) {
                FieldLines.drawFieldLines();
            }
            if(Config.bSpeedometer) {
                Speedometer.drawSpeedometer();
            }
            if(Config.bGraph) {
                Graph.drawGraph();
            }
        }//end check on/off if
    },
};

module.exports = Draw.draw;
