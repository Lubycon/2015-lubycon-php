/* ===========================================================
 *
 *  Name:          slider.js
 *  Updated:       2016-03-17
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
    $.fn.slider = function(option){
        var defaults = { 
            callback: null
        },
        d = {},
        slider = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("sliderKey")) $.error("The key for slider is not exist");
                    else {
                        console.log("slider is loaded");//function start
                        var $this = $(this),
                        objWidth = $this.width(),
                        defaultVal = $this.val(),
                        minVal = $this.attr("min")
                        maxVal = $this.attr("max"),
                        areaX = (maxVal - defaultVal) + "%",

                        $sliderWrap = $("<div/>",{ "class" : "slider-wrapper" }).width(objWidth).insertBefore($this).append($this),
                        $sliderBar = $("<span/>",{
                            "class" : "slider-bar",
                            "data-value" : defaultVal,
                        }).appendTo($sliderWrap),
                        $sliderArea = $("<span/>",{
                            "class" : "slider-area"
                        }).width(objWidth).css("right",areaX).appendTo($sliderBar),

                        $sliderBt = $("<div/>",{
                            "class" : "slider-bt"
                        }).css("right",areaX).appendTo($sliderWrap).drag({
                            callback: slider.dragging
                        });
                        

                    }
                })
            },
            dragging: function(mouseX,mouseY){
                var $this = $(".dragging"),
                inputBt = $this.parent(".slider-wrapper").find(".sliderKey");
                console.log(mouseX);
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
            slider.init.apply(this, arguments);
};
})(jQuery);