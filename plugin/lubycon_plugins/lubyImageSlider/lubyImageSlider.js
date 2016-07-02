/* ===========================================================
 *
 *  Name:          imageSlider.js
 *  Updated:       2016-06-10
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
	$.fn.lubyImageSlider = function(option){
        var defaults = { 
            customClass : "",
            arrow : true,
            arrowLeftIcon : "fa-angle-left",
            arrowRightIcon : "fa-angle-right",
            enabledNavigator : true,
            enabledAnimation : true,
            animationSpeed : 500, //ms
            autoPlay : true,
            autoPlayInterval : 3000, //ms
            sliderWidth : "100%",
            sliderHeight : "auto",
            gridWidth : 5
        },
        d = {},
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("lubyImageSlider")) $.error("THERE IS NO LUBY IMG SLIDER");
                    else {

                        var $this = $(this),
                            sliderInnerWrapper = $("<div/>",{ "class" : "img-slider-item-wrapper"}),
                            listWrapper = $this.find("ul");

                        $this.addClass(d.customClass);
                        $this.css({
                            "width" : d.sliderWidth,
                            "height" : d.sliderHeight
                        });
                        $this.attr("data-autoplay",d.autoPlay);
                        $this.hover(function(){
                            $this.attr("data-autoplay",false);
                        },function(){
                            $this.attr("data-autoplay",true);
                        });

                        sliderInnerWrapper.prependTo($this);

                        listWrapper.addClass("img-slider-list-wrapper");
                        listWrapper.each(function(){ $(this).appendTo(sliderInnerWrapper) });

                        pac.setIndex.call(listWrapper);
                        listWrapper.each(function(){
                            var list = $(this).find("li");
                            pac.setIndex.call(list);
                        });

                        pac.setGrid.call($this);

                        if(d.enabledAnimation) sliderInnerWrapper.css("transition","left " + (d.animationSpeed/1000) + "s");
                        if(d.arrow) pac.initArrow.call($this);
                        if(d.autoPlay) func.initAutoPlay.call($this);
                    }
                })
            },
            initArrow: function(){
                var arrowWrapper = $("<div/>",{ "class" : "img-slider-arrow-wrapper"}),
                    arrow = $("<i/>",{ "class" : "img-slider-arrow fa" }).on("click",enableArrowAction),
                    leftArrow = arrow.clone(true).addClass(d.arrowLeftIcon).attr("data-value","left"),
                    rightArrow = arrow.clone(true).addClass(d.arrowRightIcon).attr("data-value","right");

                    leftArrow.appendTo(arrowWrapper);
                    rightArrow.appendTo(arrowWrapper);

                    arrowWrapper.appendTo($(this));
                function enableArrowAction(){
                    var data = $(this).data("value");
                    if(data === "left") func.sliderMove("left");
                    else if(data === "right") func.sliderMove("right");
                    else return false;  
                }
            },
            initNavigator: function(){
                //JULY 2nd 2016.....
            }
            setIndex: function(){
                $(this).each(function(){ $(this).attr("data-index",$(this).index()) });
            },
            setGrid: function(){
                var gridSize = $(this).width() / d.gridWidth;
                $(this).find("li").css({
                    "width" : gridSize,
                    "height" : gridSize 
                });
            }
        },
        func = {
            sliderMove: function(direction){
                var target = $(document).find(".img-slider-item-wrapper"),
                    targetWidth = target.width(),
                    targetPadding = target.parent(".lubyImageSlider").css("padding").replace("px","") * 2,
                    currentPosition = target.css("left").replace("px","") * 1,
                    moveLength = targetWidth + targetPadding,
                    maxPosition = moveLength * (target.find(".img-slider-list-wrapper").length - 1) * -1; //2400
                    
                if(!Number.isInteger(currentPosition)) return false;

                if(direction === "left") {
                    if(currentPosition === 0) target.css("left",maxPosition);
                    else target.css("left", currentPosition + moveLength);
                }
                else if(direction === "right") {
                    if(currentPosition === maxPosition) target.css("left",0);
                    else target.css("left", currentPosition - moveLength);
                }
            },
            initAutoPlay: function(){
                var $this = $(this);
                setInterval(function(){
                    var bool = $this.attr("data-autoplay");
                    if(bool === "true") func.sliderMove("right");
                    else return false;
                },d.autoPlayInterval);
            }
        },
        method = {
            destroy: function(){
                return this.each(function(){
                    var $this = $(this);
                    $this.remove();
                })
            }
        }
        return method[option] ? 
        method[option].apply(this, Array.prototype.slice.call(arguments, 1)) : 
        "object" != typeof option && option ? 
            ($.error('No such method "' + option + '" for the lubySelector instance'), void 0) : 
            pac.init.apply(this, arguments);
    };
})(jQuery);
