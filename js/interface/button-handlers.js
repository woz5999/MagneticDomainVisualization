var Global = require("../config/global");
var InterfaceUpdates = require("./interface-updates");

var ButtonHandlers = {
    //function to play or pause the visualization
    pauseClick: function () {
        //set elements
        ButtonHandlers.disableButton(
            document.querySelector('#rnSize'), Global.bOn);
        ButtonHandlers.disableButton(
            document.querySelector('#rnStrength'), Global.bOn);
        ButtonHandlers.disableButton(
            document.querySelector('#rnTemp'), Global.bOn);
        ButtonHandlers.disableButton(
            document.querySelector('#btnMagnet'), Global.bOn);
        ButtonHandlers.disableButton(
            document.querySelector('#btnPolarity'), Global.bOn);

        //set the butotn text
        if (Global.bOn) {
            document.querySelector('#btnPause').innerHTML =
                'Continue';
            document.querySelector('#btnPause').title =
                'Continue the visualization';
        } else {
            document.querySelector('#btnPause').innerHTML =
                'Pause';
            document.querySelector('#btnPause').title =
                'Pause the visualization';
        }

        //toggle
        Global.bOn = !Global.bOn;
    },

    //function to toggle the magnet
    magnetClick: function () {
        var rnStrength = document.querySelector('#rnStrength');

        //determine if we're toggling on or off
        if (Global.bMagnetOn) {
            //store the current value of the slider
            Global.iTempStrength = Global.iStrength;
            rnStrength.value = 0;
        } else {
            //restore the value of the slider
            rnStrength.value = Global.iTempStrength;
        }

        //set the magnetic field
        InterfaceUpdates.rangeChange(rnStrength);

        //toggle the slider
        document.querySelector('#rnStrength').disabled = Global.bMagnetOn;

        //toggle
        Global.bMagnetOn = !Global.bMagnetOn;
    },

    //function to toggle polarity
    polarityClick: function () {
        Global.strPolarity = (Global.strPolarity == 'N') ? 'S' : 'N';
        InterfaceUpdates.polarityChange()
    },

    disableButton: function (button, disabled) {
        button.disable = disabled;

        if (disabled) {
            button.classList.add('disabled');
        } else {
            button.classList.remove('disabled');
        }
    } //end disableButton
};

module.exports = ButtonHandlers;
