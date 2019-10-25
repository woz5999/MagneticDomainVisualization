var Speedometer = {
    // function to draw the dial gauge
    drawSpeedometer: function () {
        var iXOffset, iYOffset;

        // calcuate the radius
        var iSpeedometerRadius = Config.iSpeedometerDiameter / 2;

        // set the center of the speedometer
        // basically just a lot of work to move it inside of the field line arrows
        var iSpeedometerCenterX = Canvas.getWidth() -
            (Config.iSpeedometerDiameter / 2) -
            (Config.iArrowSize * Config.iArrowSize) - Config.iArrowSize;
        var iSpeedometerCenterY = Canvas.getHeight() -
            (Config.strLabelFontSize * 2);

        // draw the main speedometer half-circle
        Canvas.getContext().fillStyle = Config.iSpeedometerBackgroundColor;
        Canvas.getContext().beginPath();
        Canvas.getContext().arc(iSpeedometerCenterX, iSpeedometerCenterY,
            Config.iSpeedometerDiameter / 2, 0, Math.PI, true);
        Canvas.getContext().closePath();
        Canvas.getContext().fill();

        // draw black outline
        Canvas.getContext().fillStyle = 'rgba(0, 0, 0, 1)';
        Canvas.getContext().stroke();

        // draw the center circle
        DrawFunctions.drawCircle(iSpeedometerCenterX, iSpeedometerCenterY, Config.iSpeedometerDiameter / 25,
            'rgb(0, 0, 0)', '', 0
        );

        // determine if the needle should be drawn
        if (Variables.getStrengthValue() > 0) {
            // set the line color
            Canvas.getContext().strokeStyle = 'rgba(0, 0, 0, 1)';

            // get the rotation for the needle
            var iSpin = Math.abs(Math.PI +
                (Variables.getStrengthValue() / (Math.PI * 10)));

            // save the current context state
            Canvas.getContext().save();

            // normalize to the center of the dial
            Canvas.getContext().translate(
                iSpeedometerCenterX, iSpeedometerCenterY);

            // rotate the canvas
            Canvas.getContext().rotate(iSpin);

            // draw the needle
            DrawFunctions.drawLine(
                0, 0, (Config.iSpeedometerDiameter / 2) - 5, 0);

            // fill the arrow
            Canvas.getContext().stroke();

            // restore the canvas
            Canvas.getContext().restore();

            // calculate the distance to move the labels from center
            iXOffset = Config.iSpeedometerDiameter / 3.5;
            iYOffset = Config.strLabelFontSize / 1.5;

            // set the text information for the dial labels
            DrawFunctions.setText(Config.iGaugeFontColor,
                Config.strGaugeFont,
                'center',
                'bottom');

            // draw the graph labels
            Canvas.getContext().fillText(Config.strGaugeLeftLabel,
                iSpeedometerCenterX - iXOffset,
                iSpeedometerCenterY - iYOffset, iSpeedometerRadius);
            Canvas.getContext().fillText(Config.strGaugeRightLabel,
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
            Canvas.getContext().fillText(
                Config.strGaugeOffLabel, iSpeedometerCenterX,
                iSpeedometerCenterY - (iYOffset * 3), iSpeedometerRadius);
        }

        // set the color for the gauge title
        Canvas.getContext().fillStyle = Config.iGaugeTitleBackgroundColor;

        // draw background for gauge title
        Canvas.getContext().fillRect(
            iSpeedometerCenterX - Config.iSpeedometerDiameter / 2,
            iSpeedometerCenterY + iYOffset,
            Config.iSpeedometerDiameter, iYOffset * 2);

        // set the text information for the dial title
        DrawFunctions.setText(Config.iGaugeTitleFontColor,
            Config.strGaugeTitleFont,
            'center',
            'bottom');

        // draw the graph title
        Canvas.getContext().fillText(Config.strGaugeTitle, iSpeedometerCenterX,
            iSpeedometerCenterY + (iYOffset * 3), iSpeedometerRadius * 2);
    }
};

module.exports = Speedometer;

var Canvas = require("../canvas/canvas");
var Config = require("../config/config");
var DrawFunctions = require("../canvas/draw-functions");
var Variables = require("../model/variables");
