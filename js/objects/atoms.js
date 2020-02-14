var Atoms = {
    height: 0,
    width: 0,
    atomDiameter: 0,
    atomWidth: 0,

    getWidth: function () {
        return this.width;
    },

    getHeight: function () {
        return this.height;
    },

    getAtomDiameter: function () {
        if (!this.atomDiameter) {
            this.atomDiameter = Config.iAtomRadius * 2;
        }
        return this.atomDiameter;
    },

    getAtomWidth: function () {
        if (!this.atomWidth) {
            this.atomWidth = this.getAtomDiameter() + Config.iAtomSpacing;
        }
        return this.atomWidth;
    },

    // function to flip and draw all the atoms
    refresh: function () {
        for (i = 0; i < this.arrAtoms.length; i++) {
            // attempt to flip a random atom
            r = Atoms.getRandomAtom();
            Calculations.flip(r[0], r[1], r[2]);

            this.arrAtoms[i].draw();
        }
    },

    // function to add atoms
    addAtoms: function () {
        this.clear();

        // use the square root of the total atoms to determine the dimensions
        var iSideLength = Math.ceil(Math.sqrt(Variables.getAtomCount()));

        // set the particle dimensions
        this.width = iSideLength;
        this.height = iSideLength;

        var iTopLeftCornerXY = iSideLength * (this.getAtomWidth() / 2);

        // calculate the starting corner of the first particle
        var iStartX = Math.floor(Canvas.getCenterX() - iTopLeftCornerXY);
        var iStartY = Math.floor(Canvas.getCenterY() - iTopLeftCornerXY);

        // iterate through atoms for the height of the main particle
        for (var i = 0; i < this.getHeight(); i++) {
            // set the y coordinate for this row
            var y = this.getAtomYPosition(iStartY, i);

            // iterate through atoms for the width of the main particle
            for (ii = 0; ii < this.getWidth(); ii++) {
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
        if (i < 0 || i > this.getWidth() || j < 0 || j > this.getHeight()) {
            return null;
        }

        // calculate the index
        var ii = i * this.getWidth() + j;

        // make sure the atom is within the bounds of the array
        if (i >= this.arrAtoms.length) {
            return null;
        }

        return this.arrAtoms[ii];
    },

    // function to retrieve a random atom and return an array with [particle, i, j]
    getRandomAtom: function () {
        var i = Math.floor(Utils.random(0.0, 1) * this.getWidth());
        var j = Math.floor(Utils.random(0.0, 1) * this.getHeight());

        return [this.getSpecificAtom(i, j), i, j];
    },

    // function to get an atom's x coordinate based on its position in the row
    getAtomXPosition: function (firstAtomX, rowIndex) {
        return firstAtomX + this.getAtomDiameter() + (rowIndex * this.getAtomWidth());
    },

    // function to get a particle's y coordinate based on its position in the column
    getAtomYPosition: function (firstAtomY, colIndex) {
        return firstAtomY + this.getAtomDiameter() + (colIndex * this.getAtomWidth());
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

var Canvas = require("../canvas/canvas");
var Calculations = require("../model/calculations");
var Config = require("../config/config");
var Atom = require("./atom");
var Utils = require("../utils");
var Variables = require("../model/variables");
