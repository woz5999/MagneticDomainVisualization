var FieldLines = {
    // function to draw field lines
    drawFieldLines: function () {
        // make sure the field strength is not 0
        if (Variables.getStrengthValue() !== 0) {
            // set the line count
            var iLineCount = (Canvas.getHeight() / 20) * (Variables.getStrengthValue() / 100);

            // determine how far to space the lines
            var iSpacing = Math.floor(Canvas.getHeight() / iLineCount);

            // set the line color
            Canvas.getContext().strokeStyle = Config.iFieldLineColor;

            // calculate arrow dimensions
            var iLength;
            var iHeight;

            // determine if the magnet strength is greater than half the max
            if (Variables.getStrengthValue() >= (Config.iStrengthRangeMax / 1.5)) {
                // dynamically set the arrow dimensions
                iLength = (Config.iStrengthRangeMax * 3) / iLineCount;
                iHeight = (Config.iStrengthRangeMax * 2) / iLineCount;
            } else {
                var iMaxD4 = Config.iStrengthRangeMax / 3;

                // manually set the arrow dimensions
                iLength = (Config.iStrengthRangeMax * 3) / iMaxD4;
                iHeight = (Config.iStrengthRangeMax * 2) / iMaxD4;
            }

            // determine if the center line should be drawn
            if (iLineCount != 0) {
                // draw the center line
                this.drawFieldLine(Canvas.getCenterY(), iHeight, iLength);
            }

            // iterate field lines for the strength, drawing from the center out
            for (i = 1; i <= iLineCount / 2; i++) {
                var iCurrentSpacing = iSpacing * i;

                // calculate the starting location for the upper and  lower lines
                var iLowerLocation = Canvas.getCenterY() + iCurrentSpacing;
                var iUpperLocation = Canvas.getCenterY() - iCurrentSpacing;

                // draw lines
                this.drawFieldLine(iUpperLocation, iHeight, iLength);
                this.drawFieldLine(iLowerLocation, iHeight, iLength);
            }
        }
    },

    // function to draw a field line
    drawFieldLine: function (iLocation, iHeight, iLength) {
        DrawFunctions.drawLine(0, iLocation, Canvas.getWidth(), iLocation);

        // determine polarity
        if (Math.sign(Variables.getPolarity()) > 0) {
            this.drawFieldArrowRight(iLocation, iHeight, iLength);
        } else {
            this.drawFieldArrowLeft(iLocation, iHeight, iLength);
        }
    },

    drawFieldArrowLeft: function (pos, iHeight, iLength) {
        DrawFunctions.drawLine(10, pos, iLength + 10,
            parseInt(pos) + iHeight);
        DrawFunctions.drawLine(10, pos, iLength + 10,
            parseInt(pos) - iHeight);
        DrawFunctions.drawLine(Canvas.getWidth() - iLength - 10,
            pos, Canvas.getWidth() - 10,
            parseInt(pos) + iHeight);
        DrawFunctions.drawLine(Canvas.getWidth() - iLength - 10,
            pos, Canvas.getWidth() - 10,
            parseInt(pos) - iHeight);
    },

    drawFieldArrowRight: function (pos, iHeight, iLength) {
        DrawFunctions.drawLine(iLength + 10, pos, 10,
            parseInt(pos) + iHeight);
        DrawFunctions.drawLine(iLength + 10, pos, 10,
            parseInt(pos) - iHeight);
        DrawFunctions.drawLine(Canvas.getWidth() - 10, pos,
            Canvas.getWidth() - iLength - 10,
            parseInt(pos) + iHeight);
        DrawFunctions.drawLine(Canvas.getWidth() - 10, pos,
            Canvas.getWidth() - iLength - 10,
            parseInt(pos) - iHeight);
    }
};

module.exports = FieldLines;

var Canvas = require("../canvas/canvas");
var Config = require("../config/config");
var DrawFunctions = require("../canvas/draw-functions");
var Variables = require("../model/variables");
