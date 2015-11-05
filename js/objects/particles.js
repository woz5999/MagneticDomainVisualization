var Config = require("../config/user-config");
var Global = require("../config/global");
var Particle = require("./particle");
var Utils = require("../utils");

var particles = {
    //function to add particles
    addParticles: function() {
        //get the square root of the total particle number
        var iTempSize = Math.ceil(Math.sqrt(Global.iSize));

        Global.iParticlesLong = iTempSize;
        Global.iParticlesHigh = iTempSize;

        //reset the overall magnetization
        Global.iMagnetization = 0;

        var iCorner = iTempSize * ((Global.iParticleDiameter + Config.iParticleSpacing) / 2);

        //calculate the starting corner of the particle
        var iTempXMin = Math.floor(Global.iParticleCenterX - iCorner);
        var iTempYMin = Math.floor(Global.iParticleCenterY - iCorner);

        //iterate through particles for the length of the main particle
        for(var i = 0; i < Global.iParticlesHigh; i++) {
            //set the y coordinate for this row
            iTempYMin =  iTempYMin + (Global.iParticleDiameter) + Config.iParticleSpacing;
            var y = iTempYMin;

            //iterate through particles for the width of the main particle
            for(ii = 0; ii < Global.iParticlesLong; ii++) {
                var iCurrentRotation;

                //determine if a random number is greater than .5
                if (Utils.random(0.0, 1.0) > 0.5) {
                    //set the rotation as positive
                    iCurrentRotation = 1;

                    //increase overall magnetization
                    Global.iMagnetization++;
                } else {
                    //set the current rotation as negative
                    iCurrentRotation = -1;

                    //decrease overall magnetization
                    Global.iMagnetization--;
                }

                //set the coordinate for this particle
                var x = iTempXMin +
                    (ii * Global.iParticleDiameter) +
                    Global.iParticleDiameter +
                    (ii * Config.iParticleSpacing);

                //create the particle
                this.createParticle(x, y, iCurrentRotation, true);
            }//end inner for
        }//end outer for

        //set the overall energy for the system
        iEnergy = this.getEnergy(Global.iParticlesLong, Global.iParticlesHigh);
    },//end addParticles

    //function to add new particle
    createParticle: function(x, y, iRotation) {
        var particle = new Particle(x, y, iRotation);
        this.arrParticles.push(particle);
    },//end createParticle

    //function to get the spin of the specified particle
    getSpecificParticle: function(iIndex1, iIndex2) {
        //sanity check first index against length of material
        if(iIndex1 < 0) {
            iIndex1 = 0;
        } else if(iIndex1 >=Global. iSize) {
            iIndex1 = Global.iParticlesLong;
        }

        //sanity check second index against height of material
        if(iIndex2 < 0) {
            iIndex2 = 0;
        } else if(iIndex2 >= Global.iSize) {
            iIndex2 = Global.iParticlesHigh;
        }

        //calculate the index
        var iIndex = iIndex1 * Global.iParticlesLong + iIndex2;

        //make sure the particle is within the bounds of the array
        if(iIndex < this.arrParticles.length) {
            return iIndex;
        } else {
            return this.arrParticles.length - 1;
        }
    },//end getSpecificParticle

    //function to get the total energy in the system
    getEnergy: function() {
        //overall magnetization of neighbors
        var iNeighborCount = 0;

        //iterate longways through the material
        for(i = 0; i < Global.iParticlesLong; i++) {
            //iterate widthwise
            for(j = 0; j < Global.iParticlesHigh; j++) {
                //determine if the neighbor above's spin matches the current particle's spin
                if(this.arrParticles[this.getSpecificParticle(i, j)].iRotation ==
                    this.arrParticles[this.getSpecificParticle(i + 1, j)].iRotation) {

                    this.iNeighborCount++;
                } else {
                    this.iNeighborCount--;
                }

                //determine if the neighbor to the right's spin matches the current particle's spin
                if(this.arrParticles[this.getSpecificParticle(i, j)].iRotation ==
                    this.arrParticles[this.getSpecificParticle(i, j + 1)].iRotation) {

                    this.iNeighborCount++;
                } else {
                    this.iNeighborCount--;
                }
            }//end iterate widthwise for
        }//end iterate longways for

        //calculate the external magnetic force
        var iB = Math.abs(Config.iMagnetStrength * Global.iStrength);

        //set the system's overall energy
        return (-Global.iJStrength * this.iNeighborCount) -
            ((Global.iMoment * iB) *Global. iMagnetization);
    }, //end getEnergy

    //function to attempt to flip a random particle
    flip: function() {
        //pick a random particle
        var iIndex1 = Math.floor(Utils.random(0.0, 1.0) * Global.iParticlesLong);
        var iIndex2 = Math.floor(Utils.random(0.0, 1.0) * Global.iParticlesHigh);

        //get the index of the particle
        var i = this.getSpecificParticle(iIndex1, iIndex2);

        //calculate the potential change in magnetization
        var iDeltaMagnetization = -2 * this.arrParticles[i].iRotation;

        //store the combined magnetization of all four neighbors of the random particle
        var iDeltaNeighborCount =
            this.arrParticles[this.getSpecificParticle(iIndex1 - 1, iIndex2)].iRotation +
            this.arrParticles[this.getSpecificParticle(iIndex1 + 1, iIndex2)].iRotation +
            this.arrParticles[this.getSpecificParticle(iIndex1, iIndex2 - 1)].iRotation +
            this.arrParticles[this.getSpecificParticle(iIndex1, iIndex2 + 1)].iRotation;

        //calculate the potential change in neighboring magnetization
        iDeltaNeighborCount = -2 * this.arrParticles[i].iRotation *
            iDeltaNeighborCount;

        //calculate the external magnetic force
        var	iB = Math.abs(Config.iMagnetStrength * Global.iStrength);

        //calculate the potential change in overall energy
        var iDeltaEnergy =
        (-Global.iJStrength * iDeltaNeighborCount) -
            ((Global.iMoment * iB) * iDeltaMagnetization);

        var bFlipped = false;

        //determine if the possible change in energy is zero or less or if a random number is
        //less than the exponentional function of negative change in E divided by the temp
        if(iDeltaEnergy <= 0 || Utils.random(0.0, 1.0) <
            Math.exp(-iDeltaEnergy / Global.iTemp)) {

            //flip the value of the partice
            this.arrParticles[i].iRotation = this.arrParticles[i].iRotation * -1;

            //add the change in magnetization to the overall magnetization
            Global.iMagnetization = Global.iMagnetization + iDeltaMagnetization;

            //add the change in energy to the overall change in energy
            Global.iEnergy = Global.iEnergy + iDeltaEnergy;

            //show that the spin was flipped
            bFlipped = true;
        }//end check change if

        //determine if the field is on
        if(Global.bMagnetOn && Global.iStrength !== 0) {
            //set the magnetic activity for the particle
            this.arrParticles[i].iMagneticActivity = (iB * iDeltaEnergy) / (Global.iTemp + 0.1);
        } else {
            //determine if the magnetic activity should be decreased
            if((Global.strPolarity == 'N' && this.arrParticles[i].iRotation == 1) ||
                (Global.strPolarity == 'S' && this.arrParticles[i].iRotation == -1)) {

                //determine if the particle flipped
                if(bFlipped) {
                    //calculate the new magnetic activity
                    var iTempActivity = this.arrParticles[i].iMagneticActivity / 1.5;

                    //detemine if the magnetic activity will be sane
                    if(Math.abs(iTempActivity) > 0.001) {
                        //set reduced magneticactivity
                        this.arrParticles[i].iMagneticActivity =iTempActivity;
                    }//end check activity sanity if
                }//end check reduce activity if
            }//end check flipped if
        }//end check field off if
    },//end flip
};

module.exports = particles;
