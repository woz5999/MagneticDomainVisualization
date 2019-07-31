var InterfaceUpdates = {
    // function to handle range changes
    rangeChange: function (caller) {
        var iValue = caller.value || this.value;
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
                // set the activity level for the strength
                Variables.setStrengthValue(iValue);
                break;
        }

        // update the interface
        document.getElementById(strName + 'Value').innerHTML = iValue;
    }
};

module.exports = InterfaceUpdates;

var Global = require("../config/global");
var Atoms = require("../objects/atoms");
var Variables = require("../model/variables");
