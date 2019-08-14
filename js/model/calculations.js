var Calculations = {
  // function to calculate the global energy according to the ising model
  energy: function (iAdjacentSpinSum, iMagnetization) {
    E = (-1 * Constants.J * iAdjacentSpinSum) - (Constants.iMoment * Variables.getH() * iMagnetization);
    return E;
  },

  systemSpinSum: function () {
    var sum = 0;
    p = Atoms.getAtoms();
    for (var i = 0; i < p.length; i++) {
      sum += p[i].iSpin;
    }
    return sum;
  },

  systemSpinAlignmentSum: function () {
    var sum = 0;
    p = Atoms.getAtoms();

    //iterate longways through the material
    for (i = 0; i < Global.iAtomsWidth; i++) {
      //iterate widthwise
      for (j = 0; j < Global.iAtomsHeight; j++) {
        sum += this.atomAdjacentSpinInteraction(i, j);
      }
    }

    // divide by two to prevent duplicate pair counting
    return sum / 2;
  },

  magneticFieldStrength: function () {
    return Variables.getPolarity() * Config.iMagnetStrength * (Variables.getStrengthValue() / 100);
  },

  // function to get the combined spin of a atom's neighbords
  atomAdjacentSpinInteraction: function (i, j) {
    atoms = Atoms.getAtoms();
    p = Atoms.getSpecificAtom(i, j);
    s = p.iSpin;

    // populate an array of the atom's neighbors
    var neighbors = [
      Atoms.getSpecificAtom(i - 1, j),
      Atoms.getSpecificAtom(i + 1, j),
      Atoms.getSpecificAtom(i, j - 1),
      Atoms.getSpecificAtom(i, j + 1)
    ];

    var sum = 0;
    for (var ii = 0; ii < neighbors.length; ii++) {
      // if a given neighbor doesn't exist, it will be null
      if (null == neighbors[ii]) {
        continue;
      }
      if (neighbors[ii].iSpin == s) {
        sum += 1;
      } else {
        sum -= 1;
      }
      // sum += neighbors[ii].iSpin * s;
    }
    return sum;
  },

  normalizeMagnetization: function (magnetization) {
    return -(magnetization /
      (Global.iAtomsWidth * Global.iAtomsHeight)) * 100;
  },

  // function to attempt to flip a random atom
  flip: function () {
    // pick a random atom
    r = Atoms.getRandomAtom();
    p = r[0]; // set the particle object from the result

    // get the current system's total spin alignment sum
    systemSpinCurrent = Variables.getAdjacantSpinCount();

    // temporarily flip the atom and re-calculate the new total aligned spin
    p.iSpin *= -1;

    adjacentSpinDelta = this.atomAdjacentSpinInteraction(r[1], r[2]);

    systemSpinWithFlip = systemSpinCurrent + adjacentSpinDelta;

    // calculate the potential change in magnetization
    var iMagnetizationWithFlip = Variables.getMagnetization() + (p.iSpin);

    energy1 = this.energy(systemSpinCurrent, Variables.getMagnetization());
    energy2 = this.energy(systemSpinWithFlip, iMagnetizationWithFlip);
    iDeltaEnergy = energy1 - energy2;

    var flipProbability = this.flipProbability(iDeltaEnergy);

    // set the particle magnetization
    p.setMagnetization(iDeltaEnergy, flipProbability);

    if (this.atomShouldFlip(iDeltaEnergy, flipProbability)) {
      // update the system vars affected by this flip
      Variables.incrementMagnetization(p.iSpin);
      Variables.incrementAdjacantSpinCount(adjacentSpinDelta);
    } else {
      // if the atom didn't flip, undo the temporary flip we made earlier
      p.iSpin *= -1;
    }
  },

  // determine if the possible change in energy is zero or less or if a random number is
  // less than the exponentional function of negative change in E divided by the temp
  flipProbability: function (deltaEnergy) {
    return Math.exp(-deltaEnergy / Variables.getTemperature());
  },

  atomShouldFlip: function (deltaEnergy, P) {
    if (deltaEnergy <= 0) {
      return true;
    }

    return P > Utils.random(0.0, 1.0);
  },
};

module.exports = Calculations;

var Config = require("../config/user-config");
var Constants = require("./constants");
var Global = require("../config/global");
var Atoms = require("../objects/atoms");
var Utils = require("../utils");
var Variables = require("./variables");
