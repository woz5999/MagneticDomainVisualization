var Config = require("../config/user-config");
var DrawFunctions = require("../canvas/draw-functions");
var Global = require("../config/global");

var FieldLines = {
    //function to draw field lines
    drawFieldLines: function() {
        //make sure the field strength is not 0
        if(Global.iStrength !== 0) {
            //set the line count
            var iLineCount = Math.ceil(Global.iStrength / 2);

            //set the maximum line density
            var iMaxDensity = Global.iCanvasHeight -
                (Global.iCanvasHeight / 1.1);

            //sanity check line density
            if(iLineCount > iMaxDensity) {
                iLineCount = iMaxDensity;
            }//end check line density if

            //determine how far to space the lines
            var iSpacing = Math.floor(Global.iCanvasHeight / iLineCount);

            //get half of the line count
            var iTempLineCount = iLineCount / 2;

            //set the line color
            Global.ctxContext.strokeStyle = Config.iFieldLineColor;

            //calculate arrow dimensions
            var iLength;
            var iHeight;

            //determine if the magnet strength is greater than half the max
            if(Global.iStrength >= (Config.iStrengthRangeMax / 1.5)) {
                //dynamically set the arrow dimensions
                iLength = (Config.iStrengthRangeMax * 3) / iLineCount;
                iHeight = (Config.iStrengthRangeMax * 2) / iLineCount;
            } else {
                var iMaxD4 = Config.iStrengthRangeMax / 3;

                //manually set the arrow dimensions
                iLength = (Config.iStrengthRangeMax * 3) / iMaxD4;
                iHeight = (Config.iStrengthRangeMax * 2) / iMaxD4;
            }

            //determine if the center line should be drawn
            if(iTempLineCount > 0) {
                //draw the center line
                this.drawFieldLine(Global.iParticleCenterY, iHeight, iLength);
            }//end check line draw if

            //iterate field lines for the strength, drawing from the center out
            for(i = 1; i <= iTempLineCount; i++) {
                var iCurrentSpacing = iSpacing * i;

                //calculate the starting location for the upper and  lower lines
                var iLowerLocation =  Global.iParticleCenterY + iCurrentSpacing;
                var iUpperLocation =  Global.iParticleCenterY - iCurrentSpacing;

                 //draw lines
                this.drawFieldLine(iUpperLocation, iHeight, iLength);
                this.drawFieldLine(iLowerLocation, iHeight, iLength);
            }//end iterate lines for
        }//end check strength if
    },//end drawFieldLines

    //function to draw a field line
    drawFieldLine: function(iLocation, iHeight, iLength) {
        DrawFunctions.drawLine(0, iLocation, Global.iCanvasWidth, iLocation);

        //determine polarity
        if(Global.strPolarity == 'N') {
            this.drawFieldArrowN(iLocation, iHeight, iLength);
        } else {
            this.drawFieldArrowS(iLocation, iHeight, iLength);
        }
    },//end drawFieldLine

    //function to draw a field arrow w/ North polarity
    drawFieldArrowN: function(pos, iHeight, iLength) {
        DrawFunctions.drawLine(10, pos, iLength + 10,
            parseInt(pos) + iHeight);
        DrawFunctions.drawLine(10, pos, iLength + 10,
            parseInt(pos) - iHeight);
        DrawFunctions.drawLine(Global.iCanvasWidth - iLength - 10,
            pos, Global.iCanvasWidth - 10,
            parseInt(pos) + iHeight);
        DrawFunctions.drawLine(Global.iCanvasWidth - iLength - 10,
            pos, Global.iCanvasWidth - 10,
            parseInt(pos) - iHeight);
    },

    //function to draw a field arrow w/ South polarity
    drawFieldArrowS: function(pos, iHeight, iLength) {
        DrawFunctions.drawLine(iLength + 10, pos, 10,
            parseInt(pos) + iHeight);
        DrawFunctions.drawLine(iLength + 10, pos, 10,
            parseInt(pos) - iHeight);
        DrawFunctions.drawLine(Global.iCanvasWidth - 10, pos,
            Global.iCanvasWidth - iLength - 10,
            parseInt(pos) + iHeight);
        DrawFunctions.drawLine(Global.iCanvasWidth - 10, pos,
            Global.iCanvasWidth - iLength - 10,
            parseInt(pos) - iHeight);
    }
};

module.exports = FieldLines;
