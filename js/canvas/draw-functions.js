var DrawFunctions = {
    // function to draw a line
    drawLine: function (iStartX, iStartY, iEndX, iEndY) {
        Canvas.getContext().beginPath();
        Canvas.getContext().moveTo(iStartX, iStartY);
        Canvas.getContext().lineTo(iEndX, iEndY);
        Canvas.getContext().closePath();
        Canvas.getContext().stroke();
    },

    // function to draw a filled circle
    drawCircle: function (x, y, radius, color, outlineColor, outlineWidth) {
        Canvas.getContext().beginPath();
        Canvas.getContext().arc(x, y, radius, 0, Utils.Circle, true);
        Canvas.getContext().closePath();
        Canvas.getContext().fillStyle = color;
        Canvas.getContext().fill();
        Canvas.getContext().strokeStyle = outlineColor;
        Canvas.getContext().lineWidth = outlineWidth;
        Canvas.getContext().stroke();
    },

    // function to set the canvas text
    setText: function (fontColor, font, textAlign, textBaseline) {
        Canvas.getContext().fillStyle = fontColor;
        Canvas.getContext().font = font;
        Canvas.getContext().textAlign = textAlign;
        Canvas.getContext().textBaseline = textBaseline;
    },

    // function to set the canvas shadow
    setShadow: function (bShadow) {
        if (bShadow) {
            Canvas.getContext().shadowBlur = Config.iShadowSize;
            Canvas.getContext().shadowColor = Config.iShadowColor;
        } else {
            Canvas.getContext().shadowBlur = 0;
        }
    }
};

module.exports = DrawFunctions;

var Canvas = require("./canvas");
var Config = require("../config/config");
var Utils = require("../utils");
