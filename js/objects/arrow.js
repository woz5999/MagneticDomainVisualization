var Arrow = {
    // arrow class
    arrow: function (x, y, iSpin) {
        // cut down on repetitive computations to save some cpu
        var iLengthShort = Config.iAtomRadius - (Config.iArrowSize * 1.5);
        var iLengthLong = Config.iAtomRadius - (Config.iArrowSize / 1.5);

        // function to draw the arrow
        this.draw = function () {
            // set the line parameters
            Canvas.getContext().lineWidth = Config.iarrowWidth;
            Canvas.getContext().lineJoin = 'miter';
            iLengthLong *= iSpin;
            iLengthShort *= iSpin;

            // set arrow color
            if (Variables.getPolarity() == iSpin) {
                Canvas.getContext().strokeStyle = Config.iArrowColorNorth;
            } else {
                Canvas.getContext().strokeStyle = Config.iArrowColorSouth;
            }

            this.drawArrow(x, y, iLengthLong, iLengthShort, Config.iArrowSize);
        };

        this.drawArrow = function (iX, iY, iLong, iShort, iAtomCount) {

            // save a tiny bit of math
            var iXMShort = iX - iShort;
            var iXMLong = iX - iLong;

            // draw the arrow
            Canvas.getContext().beginPath();
            Canvas.getContext().moveTo(iX, iY);
            Canvas.getContext().lineTo(iX + iLong, iY);
            Canvas.getContext().lineTo(iXMLong, iY);
            Canvas.getContext().lineTo(iXMShort, iY + iAtomCount);
            Canvas.getContext().moveTo(iXMLong, iY);
            Canvas.getContext().lineTo(iXMShort, iY - iAtomCount);
            Canvas.getContext().closePath();
            Canvas.getContext().stroke();
        };
    }, // end
};

module.exports = Arrow;

var Canvas = require("../canvas/canvas");
var Config = require("../config/config");
var Variables = require("../model/variables");
