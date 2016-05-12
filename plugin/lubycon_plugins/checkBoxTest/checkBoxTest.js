/* ===========================================================
 *
 *  Name:          lubySelector.min.js
 *  Updated:       2016-04-30
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
	$.fn.lubyCheckbox = function(option){
        var defaults = { 
            id: "",
            width: 50,
            height: 50,
            switchs: true,
            callback: null
        },
        d = {},
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if ($(this).hasClass("checkKey")) $.error("lubyChecker is already exists");
                    else {
                        var $this = $(this),
                        id = $this.attr("id"),
                        name = $this.attr("name"),
                        type = $this.attr("type");

                        var $wrap = $("<div/>",{ "class" : "checkbox-wrapper " + type })
                        .css({"width" : d.width, "height" : d.height}).insertBefore($this);

                        if(type === "checkbox") {
                            d.switchs ? 
                                pac.initSwitch.call($this,$wrap,id,name) : 
                                pac.initCheckbox.call($this,$wrap,id,name);
                        }
                        else if(type === "radio") pac.initRadio.call($this,$wrap,id,name);
                    }
                })
            },
            initSwitch: function(wrap,id,name){
                var $this = $(this),
                type = "switch";

                var $body = new pac.Wrapper(id,name,type).appendTo(wrap).on("click",checkFn.checkbox);
                $this.addClass("checkbox-input").prependTo($body).hide();
            },
            initCheckbox: function(wrap,id,name){
                var $this = $(this),
                type = "checkbox";

                var $body = new pac.Wrapper(id,name,type).appendTo(wrap).on("click",checkFn.checkbox);
                $this.addClass("checkbox-input").prependTo($body).hide();
            },
            initRadio: function(wrap,id,name){
                var $this = $(this),
                type = "radio";
                
                var $body = new pac.Wrapper(id,name,type).appendTo(wrap);
                $this.addClass("checkbox-input").prependTo($body).hide();
            },
            Wrapper: function(id,name,type){
                var body = $("<label/>",{ "class" : "checkbox-label " + type, "for" : id }),
                innerbox = $("<div/>", { "class" : "checkbox-innerbox" }).appendTo(body),
                button = $("<div/>", { "class" : "checkbox-btn" }).appendTo(innerbox);

                return body;
            }
        },
        checkFn = {
            checkbox: function(){
                event.preventDefault();

                var $this = $(this);
                console.log($this);
                if($this.hasClass("selected")) $this.removeClass("selected");
                else $this.addClass("selected");
            },
            radio: function(){
                var $this = $(this),
                group = $this.attr("name");
            }
        }
        method = {
            destroy: function(){
                return this.each(function(){
                    var $this = $(this);
                    $this.remove();
                })
            },
            disable: function(){
                return this.each(function(){
                    var $this = $(this);
                    $this.addClass("disabled").off("click").off("focusin").off("change");
                })
            },
            enable: function(){
                return this.each(function(){
                    var $this = $(this);
                    $this.removeClass("disabled")
                    .on("click", pac.boxClick).on("focusin", pac.boxFocus)
                    .on("click", ".ls_option", pac.optionClick)
                    .on("change","select",pac.changeOption);
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
