/* ===========================================================
 *
 *  Name:          lubyCheckbox.min.js
 *  Updated:       2016-05-12
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
            icon: "fa fa-check",
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

                        var $wrap = $("<div/>",{ "class" : "checkbox-wrapper " + type }).insertBefore($this);
                        if(d.switchs && type === "checkbox") $wrap.css({"width" : 50, "height" : 20});
                        else $wrap.css({"width" : 20, "height" : 20});

                        if(type === "checkbox") {
                            d.switchs ? 
                                pac.initSwitch.call($this,$wrap,id,name) : 
                                pac.initCheckbox.call($this,$wrap,id,name);
                        }
                        else if(type === "radio") pac.initRadio.call($this,$wrap,id,name);

                        $(".checkbox-btn > i").css({
                        });
                    }
                })
            },
            initSwitch: function(wrap,id,name){
                var $this = $(this),
                type = "switch";

                var $body = new Wrapper(id,name,type).appendTo(wrap).on("click",checkFn.checkbox).on("click",checkFn.swithcAnimation),
                button = $body.find(".checkbox-btn");

                button.css("width",d.height);
                $this.addClass("checkbox-input").prependTo($body).hide();
            },
            initCheckbox: function(wrap,id,name){
                var $this = $(this),
                type = "checkbox";

                var $body = new Wrapper(id,name,type).appendTo(wrap).on("click",checkFn.checkbox).on("click",checkFn.checkAnimation),
                button = $body.find(".checkbox-btn"),
                icon = $("<i/>",{ "class" : d.icon });

                if($this.prop("checked")) $body.addClass("selected");

                icon.appendTo(button);
                $this.addClass("checkbox-input").prependTo($body).hide();
            },
            initRadio: function(wrap,id,name){
                var $this = $(this),
                type = "radio";
                
                var $body = new Wrapper(id,name,type).appendTo(wrap).on("click",checkFn.radio).on("click",checkFn.checkAnimation),
                button = $body.find(".checkbox-btn"),
                label = $body.find(".checkbox-label"),
                icon = $("<i/>",{ "class" : d.icon });

                if($this.prop("checked")) $body.addClass("selected");

                icon.appendTo(button);
                $this.addClass("checkbox-input").prependTo($body).hide();
            }
        },
        checkFn = {
            checkbox: function(){
                event.preventDefault();
                var $this = $(this);
                
                if($this.hasClass("selected")) $this.removeClass("selected");
                else $this.addClass("selected");
            },
            radio: function(){
                event.preventDefault();
                var $this = $(this),
                groupName = $this.attr("name"),
                labels = $(document).find("label[name='" + groupName + "']");

                if($this.hasClass("selected")) return false;
                else {
                    labels.removeClass("selected");
                    $this.addClass("selected");
                }
            },
            swithcAnimation: function(){
                event.preventDefault();
                var $this = $(this),
                background = $this.find(".checkbox-innerbox"),
                button = $this.find(".checkbox-btn");

                if($this.hasClass("selected")) button.css({  "left" : "100%", "margin-left" : button.width()*-1+"px" });
                else button.css({ "left" : "0", "margin-left" : "0" });
            }
        },
        Wrapper = function(id,name,type){
            var body = $("<label/>",{ "class" : "checkbox-label " + type, "for" : id, "name" : name}),
            innerbox = $("<div/>", { "class" : "checkbox-innerbox" }).appendTo(body),
            button = $("<div/>", { "class" : "checkbox-btn" }).appendTo(innerbox);

            return body;
        },
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
