var Config = require("../config/user-config");
var Global = require("../config/global");
var Particles = require("../objects/particles");

var InterfaceUpdates = {
    //function to handle range changes
    rangeChange: function (caller) {
        var iValue = caller.value || this.value;
        var strName = caller.id || this.id;
        var el = document.getElementById(strName);

        //determine which slider was changed
        switch (strName) {
            case 'rnTemp':
                //sanity check
                if (parseInt(iValue) < Global.iTempMin) {
                    iValue = Global.iTempMin;
                } else if (parseInt(iValue) > Global.iTempMax) {
                    iValue = Global.iTempMax;
                }

                //set the energy level for the temperature
                Global.iTemp = iValue;
                break;

            case 'rnSize':
                //sanity check
                if (parseInt(iValue) < Global.iSizeMin) {
                    iValue = Global.iSizeMin;
                } else if (parseInt(iValue) > Global.iSizeMax) {
                    iValue = Global.iSizeMax;
                }

                //set the new radius
                Global.iSize = iValue;

                //reset particle array
                Particles.arrParticles = [];
                Particles.addParticles();
                break;

            case 'rnStrength':
                //sanity check
                if (parseInt(iValue) < Global.iStrengthMin) {
                    iValue = Global.iStrengthMin;
                } else if (parseInt(iValue) > Global.iStrengthMax) {
                    iValue = Global.iStrengthMax;
                }

                //set the activity level for the strength
                Global.iStrength = iValue;
                break;
        } //end switch

        //update the interface
        document.getElementById(strName + 'Value').innerHTML = iValue;
    },

    //function to handle polarity changes
    polarityChange: function () {
        left = document.getElementById('leftPolarityLabel')
        right = document.getElementById('rightPolarityLabel')
        if (Global.strPolarity == 'N') {
            left.innerHTML = 'S';
            left.classList.remove('north');
            left.classList.add('south');

            right.innerHTML = 'N';
            right.classList.remove('south');
            right.classList.add('north');
        } else {
            left.innerHTML = 'N';
            left.classList.remove('south');
            left.classList.add('north');

            right.innerHTML = 'S';
            right.classList.remove('north');
            right.classList.add('south');
        }
    }
};

module.exports = InterfaceUpdates;
