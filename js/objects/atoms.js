var Atoms = {
    // function to flip and draw all the atoms
    refresh: function () {
        for (i = 0; i < this.arrAtoms.length; i++) {
            // attempt to flip a random atom
            Calculations.flip();

            this.arrAtoms[i].draw();
        }
    },

    // function to add atoms
    addAtoms: function () {
        this.clear();

        // use the square root of the total atoms to determine the dimensions
        var iSideLength = Math.ceil(Math.sqrt(Global.iAtomCount));

        // set the particle dimensions
        Global.iAtomsWidth = iSideLength;
        Global.iAtomsHeight = iSideLength;

        var iTopLeftCornerXY = iSideLength * (Global.iParticleTotalWidth / 2);

        // calculate the starting corner of the first particle
        var iStartX = Math.floor(Global.iParticleCenterX - iTopLeftCornerXY);
        var iStartY = Math.floor(Global.iParticleCenterY - iTopLeftCornerXY);

        // iterate through atoms for the height of the main particle
        for (var i = 0; i < Global.iAtomsHeight; i++) {
            // set the y coordinate for this row
            var y = this.getAtomYPosition(iStartY, i);

            // iterate through atoms for the width of the main particle
            for (ii = 0; ii < Global.iAtomsWidth; ii++) {
                // set the coordinate for this atom
                var x = this.getAtomXPosition(iStartX, ii);

                // create the atom with an initial random spin
                this.createAtom(x, y, Utils.coinFlip(), true);
            }
        }
    },

    // function to add new atom
    createAtom: function (x, y, iSpin) {
        this.arrAtoms.push(new Atom(x, y, iSpin));
    },

    // function to get the spin of the atom specified by it's x,y coord within the particle
    getSpecificAtom: function (i, j) {
        // sanity check x against width of material
        if (i < 0 || i > Global.iAtomsWidth || j < 0 || j > Global.iAtomsHeight) {
            return null;
        }

        // calculate the index
        var ii = i * Global.iAtomsWidth + j;

        // make sure the atom is within the bounds of the array
        if (i >= this.arrAtoms.length) {
            return null;
        }

        return this.arrAtoms[ii];
    },

    // function to retrieve a random atom and return an array with [particle, i, j]
    getRandomAtom: function () {
        var i = Math.floor(Utils.random(0.0, 1) * Global.iAtomsWidth);
        var j = Math.floor(Utils.random(0.0, 1) * Global.iAtomsHeight);

        return [this.getSpecificAtom(i, j), i, j];
    },

    // function to get an atom's x coordinate based on its position in the row
    getAtomXPosition: function (firstAtomX, rowIndex) {
        return firstAtomX + Global.iParticleDiameter + (rowIndex * Global.iParticleTotalWidth);
    },

    // function to get a particle's y coordinate based on its position in the column
    getAtomYPosition: function (firstAtomY, colIndex) {
        return firstAtomY + Global.iParticleDiameter + (colIndex * Global.iParticleTotalWidth);
    },

    // function to clear all atoms
    clear: function () {
        this.arrAtoms = [];

        // reset the overall magnetization and energy
        Variables.reset();
    },

    // function to return the array of atoms
    getAtoms: function () {
        return this.arrAtoms;
    },
};

module.exports = Atoms;

var Calculations = require("../model/calculations");
var Global = require("../config/global");
var Atom = require("./atom");
var Utils = require("../utils");
var Variables = require("../model/variables");
