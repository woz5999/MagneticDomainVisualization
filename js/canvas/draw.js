var Draw = {
    // function to draw everything
    draw: function () {
        // check if the visualization is turned on
        if (Variables.visualizationEnabled()) {
            Canvas.clear();

            // determine if the canvas dimensions have changed
            if (Canvas.sizeChanged()) {

                // reset canvas
                Canvas.setVariables();
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

var Canvas = require("./canvas");
var Config = require("../config/config");
var FieldLines = require("../objects/field-lines");
var Graph = require("../objects/graph");
var Atoms = require("../objects/atoms");
var Speedometer = require("../objects/speedometer");
var Variables = require("../model/variables");
