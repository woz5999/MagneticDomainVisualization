var ButtonHandlers = {
    // function to play or pause the visualization
    pauseClick: function () {
        // set elements
        ButtonHandlers.disableButton(document.querySelector('#rnSize'), Global.bVisualizationEnabled);
        ButtonHandlers.disableButton(document.querySelector('#rnStrength'), Global.bVisualizationEnabled);
        ButtonHandlers.disableButton(document.querySelector('#rnTemp'), Global.bVisualizationEnabled);
        ButtonHandlers.disableButton(document.querySelector('#btnMagnet'), Global.bVisualizationEnabled);
        ButtonHandlers.disableButton(document.querySelector('#btnPolarity'), Global.bVisualizationEnabled);

        // set the butotn text
        if (Global.bVisualizationEnabled) {
            document.querySelector('#btnPause').innerHTML = 'Resume';
            document.querySelector('#btnPause').title = 'Resume the visualization';
        } else {
            document.querySelector('#btnPause').innerHTML = 'Pause';
            document.querySelector('#btnPause').title = 'Pause the visualization';
        }

        // toggle
        Global.bVisualizationEnabled = !Global.bVisualizationEnabled;
    },

    // function to toggle the magnet
    magnetClick: function () {
        var rnStrength = document.querySelector('#rnStrength');

        // determine if we're toggling on or off
        if (Variables.getMagnetOn()) {
            rnStrength.value = 0;

            // if the field is off, disable polarity button
            ButtonHandlers.disableButton(document.querySelector('#btnPolarity'), true);

        } else {
            // restore the value of the slider
            rnStrength.value = Variables.getPreviousStrengthValue();

            // if the field is off, disable polarity button
            ButtonHandlers.disableButton(document.querySelector('#btnPolarity'), false);
        }

        // set the magnetic field
        InterfaceUpdates.rangeChange(rnStrength);

        // toggle the slider
        document.querySelector('#rnStrength').disabled = Variables.getMagnetOn();

        // toggle
        Variables.toggleMagnetStatus();
    },

    // function to toggle polarity
    polarityClick: function () {
        Variables.reversePolarity();
    },

    disableButton: function (button, disabled) {
        button.disabled = disabled;

        if (disabled) {
            button.classList.add('disabled');
        } else {
            button.classList.remove('disabled');
        }
    }
};

module.exports = ButtonHandlers;

var Global = require("../config/global");
var InterfaceUpdates = require("./interface-updates");
var Variables = require("../model/variables");
