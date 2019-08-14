var Utils = {
    // pseudo random number generator
    random: function (iLowerBound, iUpperBound) {
        return (Math.random() * (iUpperBound - iLowerBound)) + iLowerBound;
    },

    coinFlip: function () {
        if (Utils.random(0.0, 1.0) > 0.5) {
            return 1;
        }
        return -1;
    },

    updateAlpha: function (color, newAlpha, minAlpha) {
        if (newAlpha < minAlpha) {
            newAlpha = minAlpha;
        }
        return color.substr(0, color.lastIndexOf(',') + 2) + newAlpha + ')';
    },

    Circle: Math.PI * 2, // 2pi for drawing circles
};

module.exports = Utils;
