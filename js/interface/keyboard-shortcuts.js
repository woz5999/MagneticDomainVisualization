var Config = require("../config/user-config");
var Global = require("../config/global");
var InterfaceUpdates = require("./interface-updates");

var KeyboardShortcuts = {
    //function to grab keyboard events and perform functions based on the key
    keyPress: function(e) {
        //determine if the visualization is turned on
        if(Global.bOn) {
            //grab the event
            var eEvent = window.event? event : e;

            //determine which key was pressed
            var iCharCode = eEvent.charCode? eEvent.charCode : eEvent.keyCode;

            //convert the character code to a letter
            var cKey = String.fromCharCode(iCharCode);

            var iNewSize;
            var rnSize;
            var rnStrength;
            var rnTemp;

            //determine which key was pressed
            switch (cKey) {
                case Config.cSizeDown:
                    this.changeSlider('rnSize', -100);
                    break;

                case Config.cSizeUp:
                    this.changeSlider('rnSize', 100);
                    break;

                case Config.cStrengthDown:
                    this.changeSlider('rnStrength', -5);
                    break;

                case Config.cStrengthUp:
                     this.changeSlider('rnStrength', 5);
                    break;

                case Config.cTempDown:
                    this.changeSlider('rnTemp', -10);
                    break;

                case Config.cTempUp:
                     this.changeSlider('rnTemp', 10);
                    break;
            }//end keypress switch
        }//end check visualization on if
    },//end keypress

    changeSlider: function(id, value) {
        el = document.getElementById(id);
        el.value = parseInt(el.value) + value;
        InterfaceUpdates.rangeChange(el);
    }
};

module.exports = KeyboardShortcuts;
