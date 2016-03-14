/* ===========================================================
 *
 *  Name:          lubyPictool.min.js
 *  Updated:       2016-03-13
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
    $.fn.lubyPictool = function(option){
        var defaults = { 
            height: $(window).height(),
            minHeight: null,
            fileUpload: true,
            imageUpload: true,
            tools: {
                a: true
            },
            callback: null
        },
        d = {},
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("lubyPictoolKey")) $.error("lubySelector is already exists");
                    else {
                        console.log("lubyPictool is loaded");//function start
                        var $this = $(this),
                        $wrapper = $("<div/>",{
                            "class" : "lubypic-wrapper"
                        }).appendTo($this),
                        $header = $("<div/>",{
                            "class" : "lubypic-header"
                        }).appendTo($wrapper),
                        $body = $("<div/>",{
                            "class" : "lubypic-body"
                        }).appendTo($wrapper),
                        $aside = $("<div/>",{
                            "class" : "lubypic-aside"
                        }).height(d.height).appendTo($body),
                        $editingArea = $("<div/>",{
                            "class" : "editing-area"
                        }).appendTo($body),
                        $canvas = $("<div/>",{
                            "class" : "editing-canvas"
                        }).appendTo($editingArea);
                    }
                })
            },//init end
            databind: function(){

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
            ($.error('No such method "' + option + '" for the lubyPictool instance'), void 0) : 
            pac.init.apply(this, arguments);
};
})(jQuery);