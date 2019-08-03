var Graph = {
    // function to draw the activity graph
    drawGraph: function () {
        // get starting midpoints of the graph
        var iGraphCenterX = Global.iCanvasCenterX;
        var iGraphCenterY = Global.iCanvasHeight - (Config.iGraphThickness * 4);

        // calculate the max width of the graph
        var iGraphWidthMax = Global.iCanvasWidth * (Config.iGraphWidth / 100);
        var iGraphMultipler = iGraphWidthMax / 200;

        // determine if activity is 0
        if (0 !== Variables.getMagnetization()) {
            // normalize the magnetization based on the number of atoms
            var iMagnetization = Calculations.normalizeMagnetization(Variables.getMagnetization());

            // determine if the graph width needs to be constrained
            if (iMagnetization > iGraphWidthMax) {
                // constrain the graph's width
                iMagnetization = iGraphWidthMax;
            }

            // normalize bar to overall graph dimensions
            var iWidth = iMagnetization * iGraphMultipler;
            var iHeight = (Config.iGraphThickness * 2) - (Config.iGraphThickness / 2);

            // set the color of the activity graph
            if (Math.sign(iMagnetization) == Math.sign(Variables.getPolarity())) {
                Global.ctxContext.fillStyle = Config.iGraphColorSouth;
            } else {
                Global.ctxContext.fillStyle = Config.iGraphColorNorth;
            }
            Global.ctxContext.fillRect(iGraphCenterX, iGraphCenterY, iWidth, iHeight);

            // outline graph
            Global.ctxContext.strokeStyle = Config.iGraphOutlineColor;
            Global.ctxContext.strokeRect(iGraphCenterX, iGraphCenterY, iWidth, iHeight);

            this.drawArrow(iGraphCenterX + iWidth, iGraphCenterY, Config.iGraphThickness * Math.sign(Variables.getMagnetization()));
        }

        this.drawLabels(iGraphCenterX, iGraphCenterY, iGraphWidthMax);
    },

    drawArrow: function (x, y, iThickness) {
        // draw an arrow head on the graph
        Global.ctxContext.beginPath();
        Global.ctxContext.moveTo(x, y + (Config.iGraphThickness * 2.5));
        Global.ctxContext.lineTo(x - (iThickness * 2), y + Config.iGraphThickness);
        Global.ctxContext.lineTo(x, y - Config.iGraphThickness);
        Global.ctxContext.closePath();
        Global.ctxContext.fill();
        Global.ctxContext.stroke();
    },

    drawLabels: function (x, y, maxWidth) {
        var iGraphSpacing = ((3 * Config.iGraphThickness) / 2);

        // set the color of the center line
        Global.ctxContext.strokeStyle = 'rgba(0, 0, 0, 1)';

        // set the dimensions for the labels
        var iLabelStart = x - (Config.strLabelFontSize / 2 * Config.strGraphTitle.length);
        var iLabelEnd = x + (Config.strLabelFontSize / 2 * Config.strGraphTitle.length);
        var iLabelY = y + (Config.strLabelFontSize * 2) + 10;
        var labelFont = Config.strPolarityLabelFontSize + 'px' + Config.strGraphFont;

        // set the text information for the graph labels
        DrawFunctions.setText(Config.iGraphFontColor, labelFont, 'center', 'bottom');

        if (Config.strGraphTitle) {
            Global.ctxContext.fillText(Config.strGraphTitle, x, iLabelY);
        }
        if (Config.strGraphCenterLabel) {
            Global.ctxContext.fillText(Config.strGraphCenterLabel, x, y + (iGraphSpacing / 2));
        }

        if (Math.sign(Variables.getPolarity()) == 1) {
            strLeftLabel = 'N';
            strRightLabel = 'S';

        } else {
            strLeftLabel = 'S';
            strRightLabel = 'N';
        }

        if (strLeftLabel == 'S') {
            DrawFunctions.setText(Config.iSouthPolarityFontColor, labelFont, 'center', 'bottom');
        } else {
            DrawFunctions.setText(Config.iNorthPolarityFontColor, labelFont, 'center', 'bottom');
        }

        Global.ctxContext.fillText(strLeftLabel, iLabelStart, iLabelY);

        if (strRightLabel == 'S') {
            DrawFunctions.setText(Config.iSouthPolarityFontColor, labelFont, 'center', 'bottom');
        } else {
            DrawFunctions.setText(Config.iNorthPolarityFontColor, labelFont, 'center', 'bottom');
        }
        Global.ctxContext.fillText(strRightLabel, iLabelEnd, iLabelY);
    },
};

module.exports = Graph;

var Config = require("../config/user-config");
var Calculations = require("../model/calculations");
var DrawFunctions = require("../canvas/draw-functions");
var Global = require("../config/global");
var Variables = require("../model/variables");
