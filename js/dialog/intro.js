var Dialog = require("./dialog");

var Intro = {
    intro: function() {
        var introText = 'Intro text here';

        //check if the intro has already been displayed
        if(sessionStorage.introShown !== 'true') {
            Dialog.show(introText, 'Close', Intro.introOk);
        }
    },

    introOk: function(e) {
        //close dialog
        Dialog.close();

        //flag dialog as shown
        sessionStorage.introShown = 'true';
    }
};

module.exports = Intro.intro;
