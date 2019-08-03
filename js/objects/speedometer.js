var Speedometer = {
    // function to draw the dial gauge
    drawSpeedometer: function () {
        var iXOffset, iYOffset;

        // calcuate the radius
        var iSpeedometerRadius = Config.iSpeedometerDiameter / 2;

        // set the center of the speedometer
        // basically just a lot of work to move it inside of the field line arrows
        var iSpeedometerCenterX = Global.iCanvasWidth -
            (Config.iSpeedometerDiameter / 2) -
            (Config.iArrowSize * Config.iArrowSize) - Config.iArrowSize;
        var iSpeedometerCenterY = Global.iCanvasHeight -
            (Config.strLabelFontSize * 2);

        // draw the main speedometer half-circle
        Global.ctxContext.fillStyle = Config.iSpeedometerBackgroundColor;
        Global.ctxContext.beginPath();
        Global.ctxContext.arc(iSpeedometerCenterX, iSpeedometerCenterY,
            Config.iSpeedometerDiameter / 2, 0, Math.PI, true);
        Global.ctxContext.closePath();
        Global.ctxContext.fill();

        // draw black outline
        Global.ctxContext.fillStyle = 'rgba(0, 0, 0, 1)';
        Global.ctxContext.stroke();

        // draw the center circle
        DrawFunctions.drawCircle(iSpeedometerCenterX, iSpeedometerCenterY, Config.iSpeedometerDiameter / 25,
            'rgb(0, 0, 0)', '', 0
        );

        // determine if the needle should be drawn
        if (Variables.getStrengthValue() > 0) {
            // set the line color
            Global.ctxContext.strokeStyle = 'rgba(0, 0, 0, 1)';

            // get the rotation for the needle
            var iSpin = Math.abs(Math.PI +
                (Variables.getStrengthValue() / (Math.PI * 10)));

            // save the current context state
            Global.ctxContext.save();

            // normalize to the center of the dial
            Global.ctxContext.translate(
                iSpeedometerCenterX, iSpeedometerCenterY);

            // rotate the canvas
            Global.ctxContext.rotate(iSpin);

            // draw the needle
            DrawFunctions.drawLine(
                0, 0, (Config.iSpeedometerDiameter / 2) - 5, 0);

            // fill the arrow
            Global.ctxContext.stroke();

            // restore the canvas
            Global.ctxContext.restore();

            // calculate the distance to move the labels from center
            iXOffset = Config.iSpeedometerDiameter / 3.5;
            iYOffset = Config.strLabelFontSize / 1.5;

            // set the text information for the dial labels
            DrawFunctions.setText(Config.iGaugeFontColor,
                Config.strGaugeFont,
                'center',
                'bottom');

            // draw the graph labels
            Global.ctxContext.fillText(Config.strGaugeLeftLabel,
                iSpeedometerCenterX - iXOffset,
                iSpeedometerCenterY - iYOffset, iSpeedometerRadius);
            Global.ctxContext.fillText(Config.strGaugeRightLabel,
                iSpeedometerCenterX + iXOffset - 7,
                iSpeedometerCenterY - iYOffset, iSpeedometerRadius);
        } else {
            // calculate the distance to move the labels from center
            iXOffset = Config.iSpeedometerDiameter / 3.5;
            iYOffset = Config.strLabelFontSize / 1.5;

            // set the text information for the dial labels
            DrawFunctions.setText(Config.iGaugeOffFontColor,
                Config.strGaugeOffFont,
                'center',
                'bottom');

            // draw the graph labels
            Global.ctxContext.fillText(
                Config.strGaugeOffLabel, iSpeedometerCenterX,
                iSpeedometerCenterY - (iYOffset * 3), iSpeedometerRadius);
        }

        // set the color for the gauge title
        Global.ctxContext.fillStyle = Config.iGaugeTitleBackgroundColor;

        // draw background for gauge title
        Global.ctxContext.fillRect(
            iSpeedometerCenterX - Config.iSpeedometerDiameter / 2,
            iSpeedometerCenterY + iYOffset,
            Config.iSpeedometerDiameter, iYOffset * 2);

        // set the text information for the dial title
        DrawFunctions.setText(Config.iGaugeTitleFontColor,
            Config.strGaugeTitleFont,
            'center',
            'bottom');

        // draw the graph title
        Global.ctxContext.fillText(Config.strGaugeTitle, iSpeedometerCenterX,
            iSpeedometerCenterY + (iYOffset * 3), iSpeedometerRadius * 2);
    }
};

module.exports = Speedometer;

var Config = require("../config/user-config");
var DrawFunctions = require("../canvas/draw-functions");
var Global = require("../config/global");
var Variables = require("../model/variables");
