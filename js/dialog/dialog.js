var Dialog = {
    show: function(text, buttonText, handler) {
        //set button text
        document.querySelector('#dialog-btn').innerHTML = buttonText;
        document.querySelector('#dialog-btn').title = buttonText;

        //set text and show dialog
        document.querySelector('#dialog-text').innerHTML = text;
        document.querySelector('#dialog').style.display = 'block';

        //attach event handler to dialog button
        document.querySelector('#dialog-btn').addEventListener('click',
            handler);
    },

    close: function() {
        document.querySelector('#dialog').style.display = 'none';
    }
};

module.exports = Dialog;
