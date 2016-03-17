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
                        var $this = $(this).hide(),
                        objWidth = $this.width(),
                        defaultVal = $this.val(),
                        minVal = $this.attr("min")
                        maxVal = $this.attr("max"),
                        areaX = (maxVal - defaultVal),
                        buttonX = defaultVal,

                        $sliderWrap = $("<div/>",{ "class" : "slider-wrapper" }).width(objWidth)
                        .insertBefore($this).append($this).on("mousedown",drag.dragable).on("change",".sliderKey",drag.change),
                        $sliderBar = $("<span/>",{
                            "class" : "slider-bar",
                            "data-value" : defaultVal,
                        }).appendTo($sliderWrap),
                        $sliderArea = $("<span/>",{
                            "class" : "slider-area"
                        }).width(objWidth).css("right",areaX+"%").appendTo($sliderBar),

                        $sliderBt = $("<div/>",{
                            "class" : "slider-bt"
                        }).css("left",buttonX+"%").appendTo($sliderWrap);
                    }
                })
            }
        },
        drag = {
            dragable: function(){
                var $this = $(this), 
                $bt = $this.find(".slider-bt");
                $bt.addClass("dragging");
                $this
                .on("mousemove",function(event){
                    drag.dragAction(event.pageX,$this,$bt);
                })
                .on("mouseleave",function(){
                    $this.off("mousemove");
                    $this.removeClass("dragging");
                })
                .on("mouseup","*",function(){ 
                    $this.off("mousemove");
                    $bt.removeClass("dragging"); 
                });
            },
            dragAction: function(mouseX,selector,btn){
                var $this = selector,
                $bt = btn,
                $input = $this.find(".sliderKey"),
                $bar = $this.find(".slider-bar"),
                $area = $this.find(".slider-bar > .slider-area"),
                width = $this.width(),
                mouseX = mouseX - $this.offset().left, objX;

                if(mouseX >= 0 && mouseX <= width) objX = mouseX;
                else if(mouseX < 0) objX = 0;
                else if(mouseX > width )objX = width;

                var ratio = width/objX,
                value = Math.floor($input.attr("max")/ratio);

                d.callback(value);
                $bt.css({ "left" : objX });
                $area.css({ "right" : width-objX});
                $bar.data("val",value);
                $input.val(value);
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