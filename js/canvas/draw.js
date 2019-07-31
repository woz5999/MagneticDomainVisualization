var Draw = {
    // function to draw everything
    draw: function () {
        // check if the visualization is turned on
        if (Global.bVisualizationEnabled) {
            CanvasSetup.clearCanvas();

            // determine if the canvas dimensions have changed
            if (CanvasSetup.canvasSizeChanged()) {

                // reset canvas
                CanvasSetup.setCanvasVariables();
                Atoms.addAtoms();
            }

            if (Config.bFieldLines) {
                FieldLines.drawFieldLines();
            }

            Variables.update();

            Atoms.refresh();

            if (Config.bSpeedometer) {
                Speedometer.drawSpeedometer();
            }

            if (Config.bGraph) {
                Graph.drawGraph();
            }
        }
    },
};

module.exports = Draw.draw;

var CanvasSetup = require("./canvas-setup");
var Config = require("../config/user-config");
var FieldLines = require("../objects/field-lines");
var Global = require("../config/global");
var Graph = require("../objects/graph");
var Atoms = require("../objects/atoms");
var Speedometer = require("../objects/speedometer");
var Variables = require("../model/variables");
