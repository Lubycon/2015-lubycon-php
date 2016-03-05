/* ===========================================================
 *
 *  Name:          lubySelector.min.js
 *  Updated:       2016-02-23
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
	$.fn.lubyAlert = function(option){
        var defaults = { 
            id: "",
            width: 170,
            height: 170,
            kind: "custom",//bookmark,like,success,cancel,confirm,prompt,custom
            inSpeed: 700,
            outSpeed: 700,
            customIcon: "",//font awesome
            customText: "",
            customAnimation: "",
            callback: $.nothing
        },
        d = {},
        pac = {
            create: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("alertKey")) return;
                    else {       
                        var $this = $(this);
                        $this.on("click touchend",pac.init);
                    }
                })
            },
            init: function() {
                var $this = $(this),
                windowHeight = $(window).height(),
                width = (typeof d.width == "number") ? d.width : "",
                height = (typeof d.height == "number") ? d.height : "",
                kind = d.kind,
                text = (kind=="custom"||"confirm"||"prompt") ? d.customText : "",
                icon = (kind=="custom"||"confirm"||"prompt") ? (d.customIcon +" "+ d.customAnimation) : "",

                objectY = ((windowHeight*0.5) - (d.height*0.5)),
                objectX = ((d.width*0.5)*-1),
                alertBody = $("<div/>",{
                    "class" : "lubyAlert " + d.kind,
                    "id" : d.id
                }).css({
                    "width":d.width,
                    "height":d.height,
                    "top": objectY,
                    "left": "50%",
                    "margin-left": objectX
                }).insertBefore("body").hide().stop().fadeIn(d.inSpeed,function(event){
                    pac.destroyAlert(alertBody,kind);
                }),
                alertInner = $("<div/>",{"class":"lubyWrapper"}).appendTo(alertBody),
                alertIcon = $("<i/>",{"class":"lubyAlertIcon " + icon}).appendTo(alertInner),
                alertText = $("<p/>",{"class":"lubyAlertText","html":text}).appendTo(alertInner),
                
                okBt = $("<div/>",{"class":"lubyOk lubyButton","html":"OK"}),
                cancelBt = $("<div/>",{"class":"lubyCancel lubyButton","html":"CANCEL"}),
                
                alertInput = d.kind=="prompt" ? 
                $("<input/>",{"type":"text","class":"lubyAlertInput"}).appendTo(alertInner).focus() 
                && okBt.appendTo(alertInner).on("click",pac.okCallBack) && cancelBt.appendTo(alertInner).on("click",pac.cancelCallBack) : "",
                
                alertConfirm = d.kind=="confirm" ?
                okBt.appendTo(alertInner).on("click",pac.okCallBack)
                && cancelBt.appendTo(alertInner).on("click",pac.cancelCallBack) : "",

                contentsAlign = alertInner.css({"top":(d.height*0.5) - (alertInner.height()*0.5)});

                pac.preset(kind,alertIcon,alertText);
            },
            preset: function(kind,icon,text) {
                switch(kind){
                    case "bookmark" :
                        icon.addClass("fa fa-star bounce animated");
                        text.text("Thanks");
                    break;
                    case "like" :
                        icon.addClass("fa fa-heart bounceIn animated");
                        text.text("Thanks");
                    break;
                    case "success" :
                        icon.addClass("fa fa-check-circle rotateIn animated");
                        text.text("Succeed");
                    break;
                    case "cancel" :
                        icon.addClass("fa fa-times tada animated");
                        text.text("Canceled")
                    break;
                    default : return; break;
                }
            },
            okCallBack: function(){
                var $this = $(this).parents(".lubyAlert");
                pac.destroyAlert($this);
                console.log("OK");
            },
            cancelCallBack: function(){
                var $this = $(this).parents(".lubyAlert");
                pac.destroyAlert($this);
                console.log("CANCEL");
            },
            destroyAlert: function(selector,kind) {
                var $this = selector,
                kind = kind;
                if(kind=="prompt"||kind=="confirm"){
                    return;
                }
                else if(kind==null){
                    $this.fadeOut(d.outSpeed,function(){$this.remove();});
                }
                else{ 
                    setTimeout(function(){ 
                        $this.fadeOut(d.outSpeed,function(){
                            $this.remove();
                        })
                    },500);
                    console.log("destroyAlert");
                } 
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
            ($.error('No such method "' + option + '" for the lubyAlert instance'), void 0) : 
            pac.create.apply(this, arguments);
    };
})(jQuery);
