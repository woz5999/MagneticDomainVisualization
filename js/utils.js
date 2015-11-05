var Utils = {
    //pseudo random number generator
    random: function(iLowerBound, iUpperBound) {
        return (Math.random() * (iUpperBound - iLowerBound)) + iLowerBound;
    },//end random

    Circle: Math.PI * 2, //2pi for drawing circles
};

module.exports = Utils;
