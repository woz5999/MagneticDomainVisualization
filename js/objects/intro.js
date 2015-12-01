var Intro = {
    intro: function() {
        //check if the intro has already been displayed
        if(sessionStorage.introShown !== true) {
            //show dialog
            document.querySelector('#intro-dialog').style.display = 'block';

            //attach event handler to dialog button
            document.querySelector('#intro-btn').addEventListener('click',
                Intro.dialogOk);
        }
    },

    dialogOk: function(e) {
        //close dialog
        document.querySelector('#intro-dialog').remove();

        //flag dialog as shown
        sessionStorage.introShown = true;
    }
};

module.exports = Intro.intro;
