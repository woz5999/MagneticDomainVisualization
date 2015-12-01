var Dialog = require('./dialog');

var Bio = {
    setup: function() {
        document.querySelector('#dave-bio').addEventListener('click', Bio.dave);
        document.querySelector('#jeff-bio').addEventListener('click', Bio.jeff);
    },

    jeff: function(e) {
        var bio = 'Jeff bio';
        Bio.setBio(bio, e);
    },

    dave: function(e) {
        var bio = 'Dave bio';
        Bio.setBio(bio, e);
    },

    setBio: function(bio, e) {
        e.preventDefault();

        Dialog.show(bio, 'Close', Dialog.close);
    }
};

module.exports = Bio;
