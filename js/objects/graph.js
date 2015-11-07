var Config = require("../config/user-config");
var DrawFunctions = require("../canvas/draw-functions");
var Global = require("../config/global");

var Graph = {
    //function to draw the activity graph
    drawGraph: function() {
        //get starting midpoints of the graph
        var iGraphCenterX = Global. iCanvasCenterX;
        var iGraphCenterY = Global.iCanvasHeight - (Config.iGraphThickness * 4);
        //save some math
        var iGraphSpacing = ((3 * Config. iGraphThickness) / 2);

        //calculate the width of the graph
        var iGraphWidthMax = Global.iCanvasWidth * (Config.iGraphWidth / 100);

        //determine if activity is 0
        if(0 !== Global.iMagnetization) {
            //set the color of the activity graph
            Global.ctxContext.fillStyle = Config.iGraphColor;

            //normalize the magnetization based on the number of particles
            var iTempMagnetization = (Global.iMagnetization /
                    (Global.iParticlesLong * Global.iParticlesHigh)) * 100;

            //determine if the graph width needs to be constrained
            if(iTempMagnetization > iGraphWidthMax) {
                //constrain the graph's width
                iTempMagnetization = iGraphWidthMax;
            }

            //normalize bar to overall graph size
            var iGraphMultipler = iGraphWidthMax / 200;

            var iStartX;
            var iStartY = iGraphCenterY;
            var iWidth = Math.abs(iTempMagnetization) * iGraphMultipler;
            var iHeight = (Config.iGraphThickness * 2) -
                (Config.iGraphThickness / 2);
            var iTempGraphThickness = Config.iGraphThickness;

            //determine if the magnetization is positive
            if((iTempMagnetization > 0 && Global.strPolarity == 'N') ||
                (iTempMagnetization < 0 && Global.strPolarity == 'S')) {

                //set values for drawing the arrow
                iStartX = iGraphCenterX - iWidth;
                iTempGraphThickness = -iTempGraphThickness;

                //draw the graph with the top left corner
                //starting at the top left of the graph
                Global.ctxContext.fillRect(iStartX, iStartY, iWidth, iHeight);

                //set outline color for graph
                Global.ctxContext.strokeStyle = Config.iGraphOutlineColor;

                //outline graph
                Global.ctxContext.strokeRect(iStartX, iStartY, iWidth, iHeight);
            } else {
                //set values for drawing the arrow
                iStartX = iGraphCenterX + iWidth;

                //draw the graph with the top left corner
                //starting at the graph's 0
                Global.ctxContext.fillRect(iGraphCenterX, iStartY,
                    iWidth, iHeight);

                //set outline color for graph
                Global.ctxContext.strokeStyle = Config.iGraphOutlineColor;

                //outline graph
                Global.ctxContext.strokeRect(iGraphCenterX, iStartY,
                    iWidth, iHeight);
            }//end check positive magnetization else

            //set arrow head color
            Global.ctxContext.fillStyle = Config.iGraphArrowColor;

            //draw an arrow head on the graph
            Global.ctxContext.beginPath();
            Global.ctxContext.moveTo(iStartX,
                iGraphCenterY + (Config.iGraphThickness  * 2.5));
            Global.ctxContext.lineTo(iStartX + (iTempGraphThickness * 2),
                iGraphCenterY + Config.iGraphThickness);
            Global.ctxContext.lineTo(iStartX,
                iGraphCenterY - (Config.iGraphThickness));
            Global.ctxContext.closePath();
            Global.ctxContext.fill();
            Global.ctxContext.stroke();
        }//end check 0 overall activity if

        //set the background color for the graph
        Global.ctxContext.fillStyle = Config.iGraphBackgroundColor;

        //draw the background for the graph
        Global.ctxContext.fillRect(iGraphCenterX - Config.iGraphSpacing,
            0,
            iGraphSpacing * 2,
            Global.iGraphCenterY * 2);

        //set the color of the center line
        Global.ctxContext.strokeStyle = 'rgba(0, 0, 0, 1)';

        //set the dimensions for the labels
        var iLabelStart = iGraphCenterX - (iGraphWidthMax / 2);
        var iLabelEnd = iGraphCenterX + (iGraphWidthMax / 2) - iGraphSpacing;
        var iLabelY = iGraphCenterY + 12;

        //set the text information for the graph labels
        DrawFunctions.setText(Config.iGraphFontColor,
            (Config.strLabelFontSize) + 'px' + Config.strGraphFont,
            'center',
            'bottom');

        //draw the graph labels
        Global.ctxContext.fillText(Config.strGraphTitle,
            iGraphCenterX, iLabelY + (Config.strLabelFontSize * 2));
        Global.ctxContext.fillText(Config.strGraphLeftLabel,
            iLabelStart, iLabelY);
        Global.ctxContext.fillText(Config.strGraphCenterLabel, iGraphCenterX ,
            iLabelY + (iGraphSpacing / 2));
        Global.ctxContext.fillText(Config.strGraphRightLabel,
            iLabelEnd, iLabelY);
    }//end drawGraph
};

module.exports = Graph;
