var InterfaceUpdates = {
    // function to handle range changes
    rangeChange: function (caller) {
        var iValue = caller.value || this.value;
        var displayValue = iValue;
        var strName = caller.id || this.id;

        // determine which slider was changed
        switch (strName) {
            case 'rnTemp':
                // sanity check
                if (parseInt(iValue) < Global.iTemperatureRangeMin) {
                    iValue = Global.iTemperatureRangeMin;
                } else if (parseInt(iValue) > Global.iTemperatureRangeMax) {
                    iValue = Global.iTemperatureRangeMax;
                }

                // set the energy level for the temperature
                Variables.setTemperature(iValue);
                break;

            case 'rnSize':
                // sanity check
                if (parseInt(iValue) < Global.iSizeMin) {
                    iValue = Global.iSizeMin;
                } else if (parseInt(iValue) > Global.iSizeMax) {
                    iValue = Global.iSizeMax;
                }

                // set the new radius
                Global.iAtomCount = iValue;

                // reset atom array
                Atoms.addAtoms();
                Atoms.refresh();
                break;

            case 'rnStrength':
                half = Config.iStrengthRangeMax / 2;
                if (iValue == Config.iStrengthRangeMin) {
                    displayValue = 'Weakest';
                } else if (iValue == Config.iStrengthRangeMax) {
                    displayValue = 'Strongest';
                } else if (iValue < half) {
                    displayValue = 'Weaker';
                } else if (iValue > half) {
                    displayValue = 'Stronger';
                } else if (iValue == half) {
                    displayValue = 'Strong';
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
var Global = require("../config/global");
var Config = require("../config/user-config");
var Variables = require("../model/variables");
