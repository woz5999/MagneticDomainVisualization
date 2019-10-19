var InterfaceUpdates = {
    // function to handle range changes
    rangeChange: function (caller) {
        var iValue = caller.value || this.value;
        var displayValue = iValue;
        var strName = caller.id || this.id;

        // determine which slider was changed
        switch (strName) {
            case 'rnTemp':
                // set the energy level for the temperature
                Variables.setTemperature(iValue);
                break;

            case 'rnSize':
                // set the new radius
                Variables.setAtomCount(iValue);

                // reset atom array
                Atoms.addAtoms();
                Atoms.refresh();
                break;

            case 'rnStrength':
                sixth = Config.iStrengthRangeMax / 6;
                if (iValue == 0) {
                    displayValue = 'Off';
                } else if (iValue < 5 || iValue == Config.iStrengthRangeMin) {
                    displayValue = 'Weakest';
                } else if (iValue < sixth * 1.5) {
                    displayValue = 'Weaker';
                } else if (iValue < sixth * 3) {
                    displayValue = 'Weak';
                } else if (iValue < sixth * 4.5) {
                    displayValue = 'Strong';
                } else if (iValue < sixth * 6) {
                    displayValue = 'Stronger';
                } else if (iValue == Config.iStrengthRangeMax) {
                    displayValue = 'Strongest';
                }

                // set the activity level for the strength
                Variables.setStrengthValue(iValue);

                if (iValue == 0) {
                    // if the field is off, disable polarity button
                    ButtonHandlers.disableButton(document.querySelector('#btnPolarity'), true);
                } else {
                    // if the field is off, disable polarity button
                    ButtonHandlers.disableButton(document.querySelector('#btnPolarity'), false);
                }
                break;
        }

        // update the interface
        document.getElementById(strName + 'Value').innerHTML = displayValue;
    }
};

module.exports = InterfaceUpdates;

var Atoms = require("../objects/atoms");
var ButtonHandlers = require("./button-handlers");
var Config = require("../config/user-config");
var Variables = require("../model/variables");
