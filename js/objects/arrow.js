var Arrow = {
    // arrow class
    arrow: function (x, y, iSpin) {
        // cut down on repetitive computations to save some cpu
        var iLengthShort = Config.iAtomRadius - (Config.iArrowSize * 1.5);
        var iLengthLong = Config.iAtomRadius - (Config.iArrowSize / 1.5);

        // function to draw the arrow
        this.draw = function () {
            // set the line parameters
            Global.ctxContext.lineWidth = Config.iarrowWidth;
            Global.ctxContext.lineJoin = 'miter';
            iLengthLong *= iSpin;
            iLengthShort *= iSpin;

            // set arrow color
            if (Variables.getPolarity() == iSpin) {
                Global.ctxContext.strokeStyle = Config.iArrowColorNorth;
            } else {
                Global.ctxContext.strokeStyle = Config.iArrowColorSouth;
            }

            this.drawArrow(x, y, iLengthLong, iLengthShort, Config.iArrowSize);
        };

        this.drawArrow = function (iX, iY, iLong, iShort, iAtomCount) {

            // save a tiny bit of math
            var iXMShort = iX - iShort;
            var iXMLong = iX - iLong;

            // draw the arrow
            Global.ctxContext.beginPath();
            Global.ctxContext.moveTo(iX, iY);
            Global.ctxContext.lineTo(iX + iLong, iY);
            Global.ctxContext.lineTo(iXMLong, iY);
            Global.ctxContext.lineTo(iXMShort, iY + iAtomCount);
            Global.ctxContext.moveTo(iXMLong, iY);
            Global.ctxContext.lineTo(iXMShort, iY - iAtomCount);
            Global.ctxContext.closePath();
            Global.ctxContext.stroke();
        };
    }, // end
};

module.exports = Arrow;

var Config = require("../config/user-config");
var Global = require("../config/global");
var Variables = require("../model/variables");
