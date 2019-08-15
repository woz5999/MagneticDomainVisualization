Atom = function (x, y, iSpin) {
    this.iSpin = iSpin;
    this.x = x;
    this.y = y;
    this.iMagnetization = 0;
    this.bMagnetizationChanged = false;
    this.color = Config.iAtomColor;

    // class draw function
    this.draw = function () {
        // draw the atom.
        this.drawAtom(x, y, this.iSpin);
    };

    this.drawAtom = function (x, y, iSpin) {
        if (this.bMagnetizationChanged) {
            this.color = Utils.updateAlpha(Config.iAtomColor, this.iMagnetization, Config.iParticleMinimumAlpha);
        }

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
        var iOldMagnetization = this.iMagnetization;
        if (deltaEnergy <= 0) {
            this.iMagnetization = 0;
        } else {
            this.iMagnetization = 1 - probability;
        }
        if (iOldMagnetization == this.iMagnetization) {
            this.bMagnetizationChanged = true;
        }
    };
};

module.exports = Atom;

var Arrow = require("./arrow");
var Config = require("../config/user-config");
var DrawFunctions = require("../canvas/draw-functions");
var Utils = require("../utils");
