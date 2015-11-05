var Config = require("../config/user-config");
var Global = require("../config/global");

var Arrow = {
    //arrow class
    arrow: function(x, y, iMagneticActivity) {
        //cut down on repetitive computations to save some cpu
        var iLengthShort = Config.iParticleRadius - (Config.iArrowSize * 1.5);
        var iLengthLong = Config.iParticleRadius - (Config.iArrowSize / 1.5);

        //function to draw the arrow
        this.draw = function(){
            //set the line parameters
            Global.ctxContext.lineWidth = Config.iarrowWidth;
            Global.ctxContext.lineJoin = 'miter';
            Global.ctxContext.strokeStyle = Config.iarrowColor;

            //determine if polarity is flipped
            if(Global.strPolarity == 'S') {
                //reverse the magnetic activity
                Global.iMagneticActivity = -Global.iMagneticActivity;
            }

            //determine if rotation is positive or negative
            if(iMagneticActivity != 1) {
                iLengthLong =  -iLengthLong;
                iLengthShort = -iLengthShort;
            }

            this.drawArrow(x, y, iLengthLong, iLengthShort, Config.iArrowSize);
        };//end this.draw

        //function to draw the arrow
        this.drawArrow = function(iX, iY, iLong, iShort, iSize) {
            //save a tiny bit of math
            var iXMShort = iX - iShort;
            var iXMLong = iX - iLong;

            //draw the arrow
            Global.ctxContext.beginPath();
            Global.ctxContext.moveTo(iX, iY);
            Global.ctxContext.lineTo(iX + iLong, iY);
            Global.ctxContext.lineTo(iXMLong, iY);
            Global.ctxContext.lineTo(iXMShort, iY + iSize);
            Global.ctxContext.moveTo(iXMLong, iY);
            Global.ctxContext.lineTo(iXMShort, iY - iSize);
            Global.ctxContext.closePath();
            Global.ctxContext.stroke();
        };
    }//end arrow
};

module.exports = Arrow;
