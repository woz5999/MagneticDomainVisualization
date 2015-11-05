var Arrow = require("./arrow");
var Config = require("../config/user-config");
var DrawFunctions = require("../canvas/draw-functions");
var Global = require("../config/global");

particle =function(x, y, iInitialRotation) {
    this.iRotation = iInitialRotation;
    this.iMagneticActivity =
        (Math.abs(Global.iParticleCenterX - x) +
            Math.abs(Global.iParticleCenterY - y)) / (Global.iSize * Config.iParticleRadius);
    this.x = x;
    this.y = y;

    //class draw function
    this.draw = function() {
        //draw the particle.
        this.drawParticle(x, y, this.iRotation, this.iMagneticActivity);
    }; //end this.draw

    //function to draw a particle gradient
    this.drawParticle = function(x, y, iRotation, iMagneticActivity) {
        //calculate the alpha for the gradient based on magnetic activity
        //and the particle's distance from the center
        var iAlpha = Math.abs(iMagneticActivity / Config.iFadeStrength);

        //make sure the alpha is sane
        if(iAlpha > 1) {
            iAlpha = 1;
        } else if(iAlpha < Config.iParticleMinimumAlpha) {
            iAlpha = Config.iParticleMinimumAlpha;
        }//end check alpha sanity

        //fade the gradient
        var iTempParticleColor =
            Config.iParticleColor.substr(0, Config.iParticleColor.lastIndexOf(',') + 2) +
            iAlpha + ')';

        DrawFunctions.drawCircle(x, y, Config.iParticleRadius, iTempParticleColor);

        var arrow = new Arrow.arrow(x, y, iRotation);
        arrow.draw();
    };
};

module.exports = particle;
