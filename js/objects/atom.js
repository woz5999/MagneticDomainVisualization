Atom = function (x, y, iSpin) {
    this.iSpin = iSpin;
    this.x = x;
    this.y = y;

    // class draw function
    this.draw = function () {
        // draw the atom.
        this.drawAtom(x, y, this.iSpin);
    };

    this.drawAtom = function (x, y, iSpin) {
        DrawFunctions.drawCircle(x, y, Config.iAtomRadius, Config.iAtomColor,
            Config.iAtomBorderColor, Config.iAtomBorderWidth
        );

        var arrow = new Arrow.arrow(x, y, iSpin);
        arrow.draw();
    };
};

module.exports = Atom;

var Arrow = require("./arrow");
var Config = require("../config/user-config");
var DrawFunctions = require("../canvas/draw-functions");
