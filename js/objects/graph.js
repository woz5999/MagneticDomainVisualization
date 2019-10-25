var Graph = {
    // function to draw the activity graph
    drawGraph: function () {
        // get starting midpoints of the graph
        var iGraphCenterX = Canvas.getCenterX();
        var iGraphCenterY = Canvas.getHeight() - (Config.iGraphThickness * 4);

        // calculate the max width of the graph
        var iGraphWidthMax = Canvas.getWidth() * (Config.iGraphWidth / 100);
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
                Canvas.getContext().fillStyle = Config.iGraphColorSouth;
            } else {
                Canvas.getContext().fillStyle = Config.iGraphColorNorth;
            }
            Canvas.getContext().fillRect(iGraphCenterX, iGraphCenterY, iWidth, iHeight);

            // outline graph
            Canvas.getContext().strokeStyle = Config.iGraphOutlineColor;
            Canvas.getContext().strokeRect(iGraphCenterX, iGraphCenterY, iWidth, iHeight);

            this.drawArrow(iGraphCenterX + iWidth, iGraphCenterY, Config.iGraphThickness * Math.sign(Variables.getMagnetization()));
        }

        this.drawLabels(iGraphCenterX, iGraphCenterY, iGraphWidthMax);
    },

    drawArrow: function (x, y, iThickness) {
        // draw an arrow head on the graph
        Canvas.getContext().beginPath();
        Canvas.getContext().moveTo(x, y + (Config.iGraphThickness * 2.5));
        Canvas.getContext().lineTo(x - (iThickness * 2), y + Config.iGraphThickness);
        Canvas.getContext().lineTo(x, y - Config.iGraphThickness);
        Canvas.getContext().closePath();
        Canvas.getContext().fill();
        Canvas.getContext().stroke();
    },

    drawLabels: function (x, y, maxWidth) {
        var iGraphSpacing = ((3 * Config.iGraphThickness) / 2);

        // set the color of the center line
        Canvas.getContext().strokeStyle = 'rgba(0, 0, 0, 1)';

        // set the dimensions for the labels
        var iLabelWidth = (Config.strLabelFontSize / 2 * Config.strGraphTitle.length);
        var iLabelStart = x - iLabelWidth;
        var iLabelEnd = x + iLabelWidth;
        var iLabelBuffer = (Config.strLabelFontSize + 10);
        var iLabelHeight = Config.strLabelFontSize * 2;
        var iLabelY = y + iLabelHeight + 10;
        var labelFont = Config.strPolarityLabelFontSize + 'px' + Config.strGraphFont;

        // draw a background behind the labels
        Canvas.getContext().fillStyle = Config.iGraphLabelBackgroundColor;
        Canvas.getContext().fillRect(iLabelStart - iLabelBuffer, y + Config.strLabelFontSize + 2, iLabelWidth * 2 + iLabelBuffer * 2, iLabelHeight);

        // set the text information for the graph labels
        DrawFunctions.setText(Config.iGraphFontColor, labelFont, 'center', 'bottom');

        if (Config.strGraphTitle) {
            Canvas.getContext().fillText(Config.strGraphTitle, x, iLabelY);
        }
        if (Config.strGraphCenterLabel) {
            Canvas.getContext().fillText(Config.strGraphCenterLabel, x, y + (iGraphSpacing / 2));
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

        Canvas.getContext().fillText(strLeftLabel, iLabelStart, iLabelY);

        if (strRightLabel == 'S') {
            DrawFunctions.setText(Config.iSouthPolarityFontColor, labelFont, 'center', 'bottom');
        } else {
            DrawFunctions.setText(Config.iNorthPolarityFontColor, labelFont, 'center', 'bottom');
        }
        Canvas.getContext().fillText(strRightLabel, iLabelEnd, iLabelY);
    },
};

module.exports = Graph;

var Canvas = require("../canvas/canvas");
var Config = require("../config/config");
var Calculations = require("../model/calculations");
var DrawFunctions = require("../canvas/draw-functions");
var Variables = require("../model/variables");
