var Canvas = {
    height: 0,
    width: 0,
    centerX: 0,
    centerY: 0,
    context: null,

    getContext: function () {
        return this.context;
    },

    getWidth: function () {
        return this.width;
    },

    getHeight: function () {
        return this.height;
    },

    getCenterX: function () {
        return this.centerX;
    },

    getCenterY: function () {
        return this.centerY;
    },

    // function to construct canvas and assign variables based on its parameters
    setup: function () {
        var cCanvas = document.querySelector('#particleCanvas');

        // check if a canvas was found and if it has context
        if (cCanvas && cCanvas.getContext) {
            // retrieve the canvas context
            this.context = cCanvas.getContext('2d');

            // set the composite operation
            this.getContext().globalCompositeOperation = "source-over";

            // set canvas variables
            this.setVariables();
        }
    },

    // function to clear the canvas
    clear: function () {
        this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
    },

    // function that returns true if the canvas has been resized
    sizeChanged: function () {
        return (this.getHeight() != Math.trunc(document.querySelector('#particleCanvas').scrollHeight) ||
            this.getWidth() != Math.trunc(document.querySelector('#particleCanvas').scrollWidth)
        );
    },

    // function to dynamically set canvas variables based on canvas size
    setVariables: function () {
        // store the canvas dimensions
        this.height = Math.trunc(document.querySelector('#particleCanvas').scrollHeight);
        this.width = Math.trunc(document.querySelector('#particleCanvas').scrollWidth);

        this.getContext().canvas.height = this.getHeight();
        this.getContext().canvas.width = this.getWidth();

        // store the center of the canvas
        this.centerX = Math.floor(this.getWidth() / 2);
        this.centerY = Math.floor(this.getHeight() / 2);
    },
};

module.exports = Canvas;
