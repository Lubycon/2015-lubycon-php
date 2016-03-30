/* ===========================================================
 *
 *  Name:          sticky.js
 *  Updated:       2016-03-30
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
    $.fn.sticky = function(option){
        var defaults = { 
            callback: null
        },
        d = {},
        sticky = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("sliderKey")) $.error("The key for slider is not exist");
                    else {
                        var $this = $(this);
                        console.log("loaded")

                    }
                })
            }
        },
        start = {
            test: function () {
                return this.each(function () {
                    console.log("tested");
                })
            }
        }
        return start[option] ? 
        start[option].apply(this, Array.prototype.slice.call(arguments, 1)) : 
        "object" != typeof option && option ? 
            ($.error('No such method "' + option + '" for the lubySlider instance'), void 0) : 
            sticky.init.apply(this, arguments);
};
})(jQuery);