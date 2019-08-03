var DrawFunctions = {
    // function to draw a line
    drawLine: function (iStartX, iStartY, iEndX, iEndY) {
        Global.ctxContext.beginPath();
        Global.ctxContext.moveTo(iStartX, iStartY);
        Global.ctxContext.lineTo(iEndX, iEndY);
        Global.ctxContext.closePath();
        Global.ctxContext.stroke();
    },

    // function to draw a filled circle
    drawCircle: function (x, y, radius, color, outlineColor, outlineWidth) {
        Global.ctxContext.beginPath();
        Global.ctxContext.arc(x, y, radius, 0, Utils.Circle, true);
        Global.ctxContext.closePath();
        Global.ctxContext.fillStyle = color;
        Global.ctxContext.fill();
        Global.ctxContext.strokeStyle = outlineColor;
        Global.ctxContext.lineWidth = outlineWidth;
        Global.ctxContext.stroke();
    },

    // function to set the canvas text
    setText: function (fontColor, font, textAlign, textBaseline) {
        Global.ctxContext.fillStyle = fontColor;
        Global.ctxContext.font = font;
        Global.ctxContext.textAlign = textAlign;
        Global.ctxContext.textBaseline = textBaseline;
    },

    // function to set the canvas shadow
    setShadow: function (bShadow) {
        if (bShadow) {
            Global.ctxContext.shadowBlur = Config.iShadowSize;
            Global.ctxContext.shadowColor = Config.iShadowColor;
        } else {
            Global.ctxContext.shadowBlur = 0;
        }
    }
};

module.exports = DrawFunctions;

var Config = require("../config/user-config");
var Global = require("../config/global");
var Utils = require("../utils");
