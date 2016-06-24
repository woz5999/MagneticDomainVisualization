var Toggle = {
    //function to mimic jquery slideup/slidedown
    slide: function(el) {
        var el_max_height = 0;

        if(el.getAttribute('data-max-height')) {
            //we've already used this before, so everything is setup
            if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
                el.style.maxHeight = el.getAttribute('data-max-height');
            } else {
                el.style.maxHeight = '0';
            }
        } else {
            el_max_height = Toggle.getHeight(el) + 'px';
            el.style.transition = 'max-height 0.5s ease-in-out';
            el.style.overflowY = 'hidden';
            el.style.maxHeight = '0';
            el.setAttribute('data-max-height', el_max_height);
            el.style.display = 'block';

            //we use setTimeout to modify maxHeight later than display
            //to we have the transition effect
            setTimeout(function() {
                el.style.maxHeight = el_max_height;
            }, 10);
        }
    },//end toggle
    arrow: function(el) {
        if(escape(el.innerHTML) == '%u25BC') {
            el.innerHTML = '&#x25B2;';
        } else if(escape(el.innerHTML) == '%u25B2') {
            el.innerHTML = '&#x25BC;';
        }
    },

    getHeight: function(el) {
        var el_style      = window.getComputedStyle(el),
            el_display    = el_style.display,
            el_position   = el_style.position,
            el_visibility = el_style.visibility,
            el_max_height = el_style.maxHeight.replace('px', '')
                .replace('%', ''),

            wanted_height = 0;

        // if its not hidden we just return normal height
        if(el_display !== 'none' && el_max_height !== '0') {
            return el.offsetHeight;
        }

        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        el.style.position   = 'absolute';
        el.style.visibility = 'hidden';
        el.style.display    = 'block';

        wanted_height     = el.offsetHeight;

        // reverting to the original values
        el.style.display    = el_display;
        el.style.position   = el_position;
        el.style.visibility = el_visibility;

        return wanted_height;
    }//end getHeight
};

module.exports = Toggle;
