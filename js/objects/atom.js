Atom = function (x, y, iSpin) {
    this.iSpin = iSpin;
    this.x = x;
    this.y = y;
    this.color = Config.iAtomColor;

    // class draw function
    this.draw = function () {
        // draw the atom.
        this.drawAtom(x, y, this.iSpin);
    };

    this.drawAtom = function (x, y, iSpin) {
        this.color = Utils.updateAlpha(Config.iAtomColor, this.iMagnetization, Config.iParticleMinimumAlpha);

        // draw an opaque white background behind the atoms
        if (Config.iParticleMinimumAlpha < 1 || this.iMagnetization < 1) {
            DrawFunctions.drawCircle(x, y, Config.iAtomRadius, 'rgba(255, 255, 255, 1)',
                Config.iAtomBorderColor, Config.iAtomBorderWidth
            );
        }

        DrawFunctions.drawCircle(x, y, Config.iAtomRadius, this.color,
            Config.iAtomBorderColor, Config.iAtomBorderWidth
        );

        var arrow = new Arrow.arrow(x, y, iSpin);
        arrow.draw();
    };

    this.setMagnetization = function (deltaEnergy, probability) {
        if (deltaEnergy <= 0) {
            this.iMagnetization = 0;
        } else {
            this.iMagnetization = 1 - probability;
        }
    };
};

module.exports = Atom;

var Arrow = require("./arrow");
var Config = require("../config/config");
var DrawFunctions = require("../canvas/draw-functions");
var Utils = require("../utils");
